#!/usr/bin/env node
/**
 * generateSitemap — writes public/sitemap.xml for both languages.
 * Runs automatically before every build (npm "prebuild" hook).
 * Route list is intentionally explicit: add a line when you add a page.
 */
const fs = require('fs');
const path = require('path');

const SITE = process.env.REACT_APP_SITE_URL || 'https://ghost-website-kappa.vercel.app';

const PAGES = [
  '', 'technology', 'safety', 'contact', 'memory', 'simulation', 'careers',
  'perspective', 'methods', 'exhibition', 'architecture', 'knowledge-base',
  'artifacts', 'library', 'library/assets', 'multi-agent-system', 'bio',
  'privacy', 'terms', 'epu',
];

const urls = [];
for (const page of PAGES) {
  for (const lang of ['en', 'fa']) {
    const loc = `${SITE}/${lang}${page ? `/${page}` : ''}`;
    const alt = (l) => `${SITE}/${l}${page ? `/${page}` : ''}`;
    urls.push(
      `  <url>\n    <loc>${loc}</loc>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${alt('en')}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="fa" href="${alt('fa')}"/>\n` +
      `  </url>`
    );
  }
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  urls.join('\n') + '\n</urlset>\n';

const out = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(out, xml);
console.log(`sitemap: ${urls.length} URLs → ${out}`);
