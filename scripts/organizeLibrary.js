/**
 * scripts/organizeLibrary.js
 *
 * [DEPRECATED] Previously classified and copied serveable files into
 * public/library/[category]/ and generated public/library/manifest.json.
 * Source directory has been removed; library files are now maintained directly.
 *
 * Run: node scripts/organizeLibrary.js
 */

const path = require('path');
const fs   = require('fs');

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT      = path.resolve(__dirname, '..');
const SOURCE    = path.join(ROOT, 'New folder');
const DEST      = path.join(ROOT, 'public', 'library');
const MANIFEST  = path.join(DEST, 'manifest.json');

// ─── Limits ───────────────────────────────────────────────────────────────────

const MAX_BYTES = 95 * 1024 * 1024;  // 95 MB

// ─── Allowed extensions (browser-serveable) ───────────────────────────────────

const ALLOWED = new Set(['.pdf', '.md', '.html', '.htm']);

// ─── Directories to skip entirely ────────────────────────────────────────────

const SKIP_DIRS = new Set([
    'node_modules', '.git', '.idea',
    'SAMSUNG', 'Passport Renewal',
    'Multiplex', 'multiplex-demo',
    'Claude Projects 2025',
    'Hardware Architecture Starting Point',
    'TeaSpace-Codebase',
]);

// ─── Category classification ──────────────────────────────────────────────────
// Rules checked in order; first match wins. Catch-all is 'misc'.

const RULES = [
    {
        category: 'picapd',
        keywords: [
            'picapd', 'مجموعه دستورالعمل', 'picapdسیلیکون',
            'hardware isa', 'stop_5', 'stop5', 'bitvector',
            'errata', 'annex_draft', 'annex draft',
            'isa_rectification', 'highest-impact spec',
            'دستورالعمل.pdf', 'سیلیکون.pdf', 'silicon.pdf',
            'platform_profile', 'platform profile stop',
        ],
    },
    {
        category: 'strategic',
        keywords: [
            'ghost_autonomy_unified', 'ghost autonomy - unified',
            'ghost autonomy profile',
            'epu_initiative', 'epu autonomous', 'epu_document',
            'samsung_letter', 'نامه رسمی', 'تحلیل رقابتی',
            'implementation_readiness', 'summary of projects',
            'nasdaq_pathways', 'nasdaq pathways', 'ipo_process',
            'visitor_retention', 'trusted scalar',
        ],
    },
    {
        category: 'av-research',
        keywords: [
            'constraint_stress', 'constraint stress',
            'architecture_of_trust', 'architecture of trust',
            'truth_governance', 'truth governance',
            'bilinear coupling', 'continuation_bet', 'continuation bet',
            'quantum sensing for autonomous', 'r1-quantum', 'r2-evolutionary',
            'qs for av', 'qs_for_av', 'overlay collection',
            'overlay-archipelago', 'overlay archipelago',
            'overlay-master', 'overlay master',
            'نرم‌افزار و الکترونیک', 'تحلیل خستگی', 'روش سیستماتیک',
            'functional safety', 'numerical methods', 'processor',
            'automotive-specific', 'automotive specific',
            'sensors & sensing', 'advanced and emerging',
            'automated evaluation tools', 'deepseek',
            'سند تبدیل دانش', 'document_pdf',
        ],
    },
    {
        category: 'climate',
        keywords: ['climate'],
    },
    {
        category: 'thesis-research',
        keywords: [
            'postdoc', 'fellowship report', 'kte',
            'comprehenisve research plan', 'comprehensive research plan',
            'knowledge transformation engineering', 'knowledge_transformation',
            'measure-theoretic', 'master refinement table',
            'functionally-driven refinement', 'ga_impl_2026',
            'research_statement', 'research statement',
            'r1-quantum', 'r2-evolutionary',
            'chip manufacturing', 'chip_manufacturing',
            'cpu inside', 'exploring cpus',
            'سی‌پی‌یو داخل', 'کاوش در سی‌پی‌یو',
            'چگونه ترانزیستورها',
        ],
    },
    {
        category: 'application',
        keywords: ['cv 2026', 'cv_2026'],
    },
    {
        category: 'knowledge',
        keywords: [
            'coherence assessment', 'quality assurance checklists',
            'rubric-based scoring', 'rubric based scoring',
            'linguistic frameworks', 'multi-layer quality',
            'master_tools_table', 'master tools table',
            'eval 1', 'eval 2', 'eval_1', 'eval_2',
            'data_compression_specialist', 'text_compression_specialist',
            'defficiencies of compositional', 'superficial layer metrics',
            'tortuosity edge cases', 'fp.md', 'gp.md',
            'refined_prompt_queue', 'refined prompt queue',
            'three specific cases', 'truth_governance_matrix',
            'fpud', 'multi-agent', 'multiagent',
            'memories-claude', 'memories claude',
            'epd', 'epu_alignment', 'epu initiative alignment',
        ],
    },
];

// ─── Farsi Unicode detection ──────────────────────────────────────────────────

const FARSI_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

function isFarsi(str) {
    return FARSI_RE.test(str);
}

// ─── Classify a file ──────────────────────────────────────────────────────────

function classify(absPath, relPath) {
    const rel   = relPath.toLowerCase().replace(/\\/g, '/');
    const fname = path.basename(absPath).toLowerCase();

    // Path-based priority rules
    if (rel.includes('notion 2025'))                return 'notion';
    if (rel.includes('climate paper'))              return 'climate';
    if (rel.includes('thesis paper incremental'))   return 'thesis-research';
    if (rel.includes('/proposal/') || rel.startsWith('proposal/'))  return 'strategic';
    if (rel.includes('/research/') || rel.startsWith('research/'))  return 'thesis-research';
    if (rel.includes('/application/') || rel.startsWith('application/')) return 'application';

    // Keyword matching
    for (const rule of RULES) {
        for (const kw of rule.keywords) {
            if (fname.includes(kw) || rel.includes(kw)) {
                return rule.category;
            }
        }
    }

    return 'misc';
}

// ─── Derive subcategory (picapd only) ────────────────────────────────────────

function subdir(category, filename) {
    if (category === 'picapd') {
        return isFarsi(filename) ? 'fa' : 'en';
    }
    return null;
}

// ─── Human-readable title from filename ──────────────────────────────────────

function humanTitle(filename) {
    return path.basename(filename, path.extname(filename))
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// ─── Stable ID ───────────────────────────────────────────────────────────────

function makeId(category, sub, filename) {
    const base = path.basename(filename, path.extname(filename))
        .toLowerCase()
        .replace(/[^\w\u0600-\u06FF]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
    const prefix = sub ? `${category}-${sub}` : category;
    return `${prefix}-${base}`;
}

// ─── Detect language ─────────────────────────────────────────────────────────

function detectLang(filename, sub) {
    if (sub === 'fa') return 'fa';
    if (isFarsi(filename)) return 'fa';
    return 'en';
}

// ─── Walk source tree ─────────────────────────────────────────────────────────

function walk(dir, baseDir, cb) {
    let entries;
    try { entries = fs.readdirSync(dir); } catch { return; }

    for (const entry of entries) {
        const abs = path.join(dir, entry);
        let stat;
        try { stat = fs.statSync(abs); } catch { continue; }

        if (stat.isDirectory()) {
            if (SKIP_DIRS.has(entry)) continue;
            walk(abs, baseDir, cb);
        } else if (stat.isFile()) {
            const rel = path.relative(baseDir, abs);
            cb(abs, rel, stat.size);
        }
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
    fs.mkdirSync(DEST, { recursive: true });

    const entries   = [];
    const counters  = {};
    let   skipped   = 0;
    let   copied    = 0;

    walk(SOURCE, SOURCE, (abs, rel, size) => {
        const ext = path.extname(abs).toLowerCase();

        // Skip non-serveable or oversized
        if (!ALLOWED.has(ext)) { skipped++; return; }
        if (size > MAX_BYTES)  { skipped++; console.log(`[SKIP >95MB] ${rel}`); return; }

        const filename = path.basename(abs);
        const cat      = classify(abs, rel);
        const sub      = subdir(cat, filename);
        const destDir  = sub
            ? path.join(DEST, cat, sub)
            : path.join(DEST, cat);

        fs.mkdirSync(destDir, { recursive: true });

        const destFile = path.join(destDir, filename);

        // Idempotent — skip if already copied
        if (!fs.existsSync(destFile)) {
            try {
                fs.copyFileSync(abs, destFile);
                copied++;
                console.log(`[COPY] ${cat}${sub ? '/' + sub : ''}/${filename} (${(size/1024).toFixed(0)} KB)`);
            } catch (e) {
                console.error(`[ERROR] ${filename}: ${e.message}`);
                skipped++;
                return;
            }
        }

        const id   = makeId(cat, sub, filename);
        const lang = detectLang(filename, sub);
        const type = ext === '.htm' ? 'html' : ext.slice(1);
        const servePath = '/library/' + [cat, sub, filename]
            .filter(Boolean)
            .join('/')
            // encode non-ASCII for safe URL
            .split('/').map(s => encodeURIComponent(s)).join('/');

        entries.push({
            id,
            filename,
            path:      servePath,
            type,
            category:  cat,
            ...(sub ? { subcategory: sub } : {}),
            lang,
            sizeBytes: size,
            title:     humanTitle(filename),
        });

        counters[cat] = (counters[cat] || 0) + 1;
    });

    // Build category summary
    const categories = {};
    for (const [cat, count] of Object.entries(counters)) {
        categories[cat] = {
            count,
            label: {
                en: CAT_LABELS[cat]?.en || cat,
                fa: CAT_LABELS[cat]?.fa || cat,
            },
            icon: CAT_LABELS[cat]?.icon || '📁',
        };
    }

    const manifest = {
        generated:   new Date().toISOString(),
        totalFiles:  entries.length,
        categories,
        files:       entries,
    };

    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');

    console.log('\n── Summary ────────────────────────────────');
    for (const [cat, count] of Object.entries(counters)) {
        console.log(`  ${cat.padEnd(20)} ${count}`);
    }
    console.log(`  ${'TOTAL'.padEnd(20)} ${entries.length}`);
    console.log(`  ${'Skipped'.padEnd(20)} ${skipped}`);
    console.log(`  ${'Newly copied'.padEnd(20)} ${copied}`);
    console.log(`\nManifest → ${MANIFEST}`);
}

const CAT_LABELS = {
    picapd:            { en: 'PICAPD ISA',             fa: 'مشخصات PICAPD ISA',       icon: '⚙️'  },
    strategic:         { en: 'Strategic Analysis',      fa: 'تحلیل استراتژیک',         icon: '📊'  },
    'av-research':     { en: 'AV Research',             fa: 'تحقیقات خودرو خودران',    icon: '🚗'  },
    climate:           { en: 'Climate Research',         fa: 'تحقیقات آب‌وهوا',         icon: '🌍'  },
    'thesis-research': { en: 'Thesis & Research',       fa: 'پایان‌نامه و تحقیق',      icon: '📚'  },
    application:       { en: 'Application Docs',        fa: 'مدارک درخواست',            icon: '📋'  },
    knowledge:         { en: 'Knowledge Frameworks',    fa: 'چارچوب‌های دانش',          icon: '🧠'  },
    notion:            { en: 'Notion 2025 Exports',     fa: 'خروجی‌های Notion 2025',   icon: '📝'  },
    misc:              { en: 'Miscellaneous',            fa: 'متفرقه',                  icon: '📁'  },
};

main();
