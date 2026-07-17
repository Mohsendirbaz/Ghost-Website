#!/usr/bin/env node
/**
 * rebuildLibraryManifest — derive public/library/manifest.json from the
 * actual files on disk (replaces the deprecated organizeLibrary.js, whose
 * source folder no longer exists and which therefore wrote empty manifests).
 *
 * The manifest is the single source of truth for the Document Archive:
 * counts shown anywhere on the site should come from totalFiles here.
 *
 * Metadata (titles, langs, ids, category labels) is carried over from the
 * existing manifest when the same file path is already described there, so
 * curated names survive regeneration.
 *
 * Run: npm run organize-library   (or: node scripts/rebuildLibraryManifest.js)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEST = path.join(ROOT, 'public', 'library');
const MANIFEST = path.join(DEST, 'manifest.json');

const ALLOWED = new Set(['.pdf', '.md', '.html', '.htm']);
const FARSI_RE = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const DEFAULT_LABELS = {
  application: { label: { en: 'Application Docs', fa: 'مدارک درخواست' }, icon: '📋' },
  'av-research': { label: { en: 'AV Research', fa: 'تحقیقات خودرو خودران' }, icon: '🚗' },
  knowledge: { label: { en: 'Knowledge Engineering', fa: 'مهندسی دانش' }, icon: '🧠' },
  misc: { label: { en: 'Miscellaneous', fa: 'متفرقه' }, icon: '📁' },
  notion: { label: { en: 'Notion 2025 Exports', fa: 'خروجی‌های Notion 2025' }, icon: '📝' },
  picapd: { label: { en: 'PICAPD ISA', fa: 'معماری PICAPD' }, icon: '🔬' },
  strategic: { label: { en: 'Strategic Analysis', fa: 'تحلیل استراتژیک' }, icon: '📊' },
  'thesis-research': { label: { en: 'Thesis Research', fa: 'پژوهش رساله' }, icon: '🎓' },
};

function humanTitle(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === '.DS_Store') return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

// Carry-over metadata from the existing manifest, keyed by URL path.
let previous = {};
let prevCategories = {};
try {
  const old = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  (old.files || []).forEach((f) => { previous[f.path] = f; });
  prevCategories = old.categories || {};
} catch (e) { /* fresh build */ }

const files = walk(DEST)
  .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
  .map((abs) => {
    const rel = path.relative(DEST, abs).replace(/\\/g, '/');
    const urlPath = '/library/' + rel.split('/').map(encodeURIComponent).join('/');
    const category = rel.includes('/') ? rel.split('/')[0] : 'misc';
    const prev = previous[urlPath] || {};
    const name = path.basename(abs);
    return {
      id: prev.id || `${category}-${name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9؀-ۿ]+/gi, '-').replace(/^-|-$/g, '')}`,
      filename: name,
      path: urlPath,
      type: path.extname(abs).slice(1).toLowerCase().replace('htm', 'html'),
      category,
      lang: prev.lang || (FARSI_RE.test(name) ? 'fa' : 'en'),
      sizeBytes: fs.statSync(abs).size,
      title: prev.title || humanTitle(name),
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const categories = {};
files.forEach((f) => {
  if (!categories[f.category]) {
    const meta = prevCategories[f.category] || DEFAULT_LABELS[f.category] ||
      { label: { en: humanTitle(f.category), fa: humanTitle(f.category) }, icon: '📄' };
    categories[f.category] = { count: 0, label: meta.label, icon: meta.icon };
  }
  categories[f.category].count += 1;
});

const manifest = {
  generated: new Date().toISOString(),
  totalFiles: files.length,
  categories,
  files,
};

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Manifest rebuilt from disk → ${MANIFEST}`);
console.log(`totalFiles: ${manifest.totalFiles} across ${Object.keys(categories).length} categories`);
Object.entries(categories).forEach(([k, v]) => console.log(`  ${k}: ${v.count}`));
