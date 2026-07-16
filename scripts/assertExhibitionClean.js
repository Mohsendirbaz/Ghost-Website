#!/usr/bin/env node
/**
 * assertExhibitionClean — the pre-deploy guardrail mandated by the
 * visual-overhaul plan v2 (§2.3, §5): grep the emitted exhibition bundle
 * for coverage/gap-analysis strings before every deploy. Fails the build
 * if the internal Program Coverage dataset (or its view chrome) is found
 * in anything under public/exhibition/.
 *
 * Run directly:      npm run assert:exhibition
 * Runs automatically: as the last step of npm run build:exhibition
 */
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, '..', 'public', 'exhibition');

/* Specific to the internal dataset and its view — chosen so that innocent
   uses of the word "coverage" in shipped views do not false-positive. */
const MARKERS = [
  'Program Coverage Map',
  'programCoverage',
  'ProgramCoverageMap',
  'GapClosure',
  'ValidationFrontier',
  'coverage:"',
  "coverage:'",
  'main(8).tex',
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

if (!fs.existsSync(TARGET)) {
  console.error(`assertExhibitionClean: ${TARGET} does not exist — build the exhibition first.`);
  process.exit(1);
}

const files = walk(TARGET).filter((f) => /\.(js|css|html|json|map)$/i.test(f));
const hits = [];
for (const f of files) {
  const body = fs.readFileSync(f, 'utf8');
  for (const m of MARKERS) {
    if (body.includes(m)) hits.push({ file: path.relative(process.cwd(), f), marker: m });
  }
}

if (hits.length) {
  console.error('✗ EXHIBITION BUNDLE IS NOT CLEAN — internal coverage/gap data found:');
  hits.forEach((h) => console.error(`   ${h.file}  ←  "${h.marker}"`));
  console.error('\nRebuild with the curated flag: VITE_EXHIBITION=1 (npm run build:exhibition does this).');
  process.exit(1);
}

console.log(`✓ exhibition bundle clean — ${files.length} files checked, no coverage/gap markers found.`);
