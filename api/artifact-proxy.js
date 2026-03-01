/**
 * api/artifact-proxy.js
 * Vercel Serverless Function — server-side proxy for Claude public artifacts.
 *
 * Problem: claude.ai sends  X-Frame-Options: DENY  and
 *          Content-Security-Policy: frame-ancestors 'none'
 *          which prevent any cross-origin iframe embed.
 *
 * Solution: fetch the artifact HTML server-to-server (no CORS restriction),
 *           strip the frame-hostile headers, inject a <base> tag so relative
 *           sub-resources still load from claude.ai, and re-serve the page
 *           from our own origin — the browser now considers the iframe
 *           same-host and no longer blocks it.
 *
 * Security:
 *  - UUID format is validated before use (prevents SSRF path traversal).
 *  - Only requests to https://claude.ai/public/artifacts/{uuid} are made.
 *  - Response content-type must be text/html; otherwise a 502 is returned.
 *  - A 1-hour Cache-Control is set to avoid hammering Claude's servers.
 */

const UPSTREAM_BASE = 'https://claude.ai/public/artifacts/';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CACHE_TTL = 3600; // seconds

// Headers the upstream sends that must NOT be forwarded to the browser.
const STRIP_RESPONSE_HEADERS = new Set([
  'x-frame-options',
  'content-security-policy',
  'content-security-policy-report-only',
  'transfer-encoding', // Vercel manages its own chunking
  'connection',
]);

module.exports = async function handler(req, res) {
  // ── 1. Method guard ─────────────────────────────────────────────────────────
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── 2. Validate the artifact ID ──────────────────────────────────────────────
  const { id } = req.query;
  if (!id || !UUID_RE.test(id)) {
    return res.status(400).json({ error: 'Missing or invalid artifact ID (must be a UUID).' });
  }

  // ── 3. Fetch upstream ────────────────────────────────────────────────────────
  const upstreamUrl = `${UPSTREAM_BASE}${id}`;
  let upstreamRes;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      headers: {
        // Present ourselves as a browser so Claude doesn't reject the request.
        'User-Agent':
          'Mozilla/5.0 (compatible; GhostAutonomyProxy/1.0; +https://ghostautonomy.com)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
  } catch (networkErr) {
    console.error('[artifact-proxy] network error:', networkErr);
    return res.status(502).json({ error: 'Failed to reach claude.ai', detail: networkErr.message });
  }

  // ── 4. Upstream error passthrough ────────────────────────────────────────────
  if (!upstreamRes.ok) {
    return res
      .status(upstreamRes.status)
      .json({ error: `Upstream returned ${upstreamRes.status}` });
  }

  // ── 5. Guard: must be HTML ───────────────────────────────────────────────────
  const upstreamContentType = upstreamRes.headers.get('content-type') || '';
  if (!upstreamContentType.includes('text/html')) {
    return res.status(502).json({
      error: 'Upstream did not return HTML',
      contentType: upstreamContentType,
    });
  }

  // ── 6. Get body ──────────────────────────────────────────────────────────────
  let html = await upstreamRes.text();

  // ── 7. Inject <base href> so relative assets resolve against claude.ai ───────
  if (!/<base\s/i.test(html)) {
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${UPSTREAM_BASE.replace(/\/public\/artifacts\/$/, '/')}">`,
    );
    // Fallback: if there's no <head>, prepend the base tag.
    if (!/<head/i.test(html)) {
      html = `<base href="https://claude.ai/">\n` + html;
    }
  }

  // ── 8. Forward safe response headers ────────────────────────────────────────
  upstreamRes.headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });

  // ── 9. Set our own caching + permissive framing headers ──────────────────────
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=60`);
  // Explicitly allow this response to be framed by our own origin.
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // A permissive but not wildcard CSP for the proxy response itself.
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self'",
  );

  return res.status(200).send(html);
}
