#!/usr/bin/env node
/**
 * verifyNav — checks the sitemap against the primary menu, one page at a time.
 *
 * Rules:
 *   • Every nav route in src/data/navConfig.js must be a page in
 *     scripts/generateSitemap.js PAGES.
 *   • Every PAGES entry must be reachable from the menu, EXCEPT the
 *     footer-only legal pages listed in FOOTER_ONLY.
 * Exits non-zero (and prints the offending pages) if anything is missing,
 * so CI catches a menu/sitemap drift before it ships.
 */
const fs = require('fs');
const path = require('path');

const FOOTER_ONLY = ['privacy', 'terms'];

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

// PAGES from the sitemap generator
const sitemapSrc = read('scripts/generateSitemap.js');
const pagesBlock = sitemapSrc.match(/const PAGES = \[([\s\S]*?)\];/)[1];
const pages = [...pagesBlock.matchAll(/'([^']*)'/g)].map((m) => m[1]);

// Nav routes from navConfig — strip the `/${lang}` prefix to bare page keys
const navSrc = read('src/data/navConfig.js');
const navRoutes = [...navSrc.matchAll(/to:\s*`\/\$\{lang\}(\/[^`]*)?`/g)]
  .map((m) => (m[1] ? m[1].replace(/^\//, '') : ''));

const navSet = new Set(navRoutes);
const pageSet = new Set(pages);

let ok = true;
console.log('— Menu → sitemap (every menu item must be a real page) —');
for (const r of navRoutes) {
  const present = pageSet.has(r);
  if (!present) ok = false;
  console.log(`  ${present ? '✓' : '✗ MISSING'}  /${r || '(home)'}`);
}

console.log('\n— Sitemap → menu (every page must be reachable, except footer-only) —');
for (const p of pages) {
  const reachable = navSet.has(p) || FOOTER_ONLY.includes(p);
  if (!reachable) ok = false;
  const tag = navSet.has(p) ? '✓ in menu' : (FOOTER_ONLY.includes(p) ? '· footer-only' : '✗ ORPHAN');
  console.log(`  ${tag.padEnd(14)} /${p || '(home)'}`);
}

console.log(`\nnav ↔ sitemap: ${ok ? 'CONSISTENT ✓' : 'MISMATCH ✗'}  (${navRoutes.length} menu routes, ${pages.length} sitemap pages)`);
process.exit(ok ? 0 : 1);
