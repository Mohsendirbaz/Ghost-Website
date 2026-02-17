/**
 * src/data/artifacts.js
 * Registry of artifacts in the Ghost Autonomy asset library.
 *
 * Artifacts can be one of two kinds:
 *
 *   Claude artifact — rendered from a public claude.ai URL
 *     { id: '<uuid>', ... }
 *
 *   Local document — a Markdown or PDF file served from /public/docs/
 *     { localFile: { type: 'markdown'|'pdf', path: '/docs/...', filename: '...' }, ... }
 *     Use a descriptive slug as the id; the id field is still required for routing.
 *
 * ── How to add a new artifact ────────────────────────────────────────────────
 * Claude:  id = UUID from https://claude.ai/public/artifacts/<uuid>
 * Local:   place file in public/docs/md/ or public/docs/pdf/, add localFile block
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Canonical viewer URL for a Claude artifact ID */
export const artifactUrl = (id) => `https://claude.ai/public/artifacts/${id}`;

// ─── Artifact categories ─────────────────────────────────────────────────────

export const ARTIFACT_CATEGORIES = {
    visualization:  { en: 'Visualization',         fa: 'تصویرسازی'          },
    diagram:        { en: 'Diagram',                fa: 'نمودار'              },
    analysis:       { en: 'Analysis',               fa: 'تحلیل'               },
    simulation:     { en: 'Simulation',             fa: 'شبیه‌سازی'           },
    specification:  { en: 'Specification',          fa: 'مشخصات'              },
    reference:      { en: 'Reference Card',         fa: 'کارت مرجع'           },
    interactive:    { en: 'Interactive',            fa: 'تعاملی'              },
};

// ─── Artifact registry ───────────────────────────────────────────────────────

export const ARTIFACTS = [
    {
        id: '9ebadeed-28af-4a83-8630-117421863003',
        slug: 'picapd-architecture-overview',
        category: 'visualization',
        tags: ['PICAPD-ISA', 'architecture', 'Queen-Bee', 'overview'],
        // Rendered from local Markdown document
        localFile: {
            type: 'markdown',
            path: '/docs/md/truth_governance_matrix.md',
        },
        en: {
            title: 'PICAPD Architecture Overview',
            description:
                'Interactive visualization of the PICAPD ISA and Queen Bee architecture, illustrating the principal components of Ghost Autonomy\'s physics-enforced computing stack.',
        },
        fa: {
            title: 'مرور کلی معماری PICAPD',
            description:
                'تصویرسازی تعاملی از ISA PICAPD و معماری کندوی ملکه، که اجزای اصلی پشته محاسباتی اجبارشده توسط فیزیک Ghost Autonomy را نشان می‌دهد.',
        },
    },

    {
        id: 'postdoc-fellowship-report',
        slug: 'postdoctoral-fellowship-report',
        category: 'reference',
        tags: ['research', 'postdoctoral', 'fellowship', 'report'],
        // Rendered from local PDF document
        localFile: {
            type: 'pdf',
            path: '/docs/pdf/postdoc-fellowship-report.pdf',
            filename: 'Postdoctoral_Fellowship_Final_Report.pdf',
        },
        en: {
            title: 'Postdoctoral Fellowship Final Report',
            description:
                'Final report from the postdoctoral fellowship, covering research outcomes, methodology, and findings.',
        },
        fa: {
            title: 'گزارش نهایی فرصت مطالعاتی پسادکتری',
            description:
                'گزارش نهایی دوره فرصت مطالعاتی پسادکتری، شامل نتایج پژوهشی، روش‌شناسی و یافته‌ها.',
        },
    },

    // ── Add further entries here ──────────────────────────────────────────────
    // {
    //   id: '<uuid-or-slug>',
    //   slug: '<url-friendly-slug>',
    //   category: '<key from ARTIFACT_CATEGORIES>',
    //   tags: ['tag1', 'tag2'],
    //   // For Claude artifact:
    //   //   (no localFile field — id must be a UUID)
    //   // For local document:
    //   //   localFile: { type: 'markdown'|'pdf', path: '/docs/...', filename: '...' },
    //   en: { title: '...', description: '...' },
    //   fa: { title: '...', description: '...' },
    // },
];

// ─── Derived lookups ─────────────────────────────────────────────────────────

export const ARTIFACT_BY_SLUG = Object.fromEntries(
    ARTIFACTS.map((a) => [a.slug, a])
);

export const ARTIFACT_BY_ID = Object.fromEntries(
    ARTIFACTS.map((a) => [a.id, a])
);

export const ALL_ARTIFACT_TAGS = [
    ...new Set(ARTIFACTS.flatMap((a) => a.tags || [])),
].sort();
