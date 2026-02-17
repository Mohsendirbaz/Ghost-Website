/**
 * src/data/artifacts.js
 * Registry of public Claude artifacts embedded in the Ghost Autonomy asset library.
 *
 * Each entry references a publicly shareable Claude artifact by its ID.
 * The viewer renders the artifact at:
 *   https://claude.ai/public/artifacts/<id>
 *
 * ── How to add a new artifact ────────────────────────────────────────────────
 * 1. Share the Claude artifact publicly (Share → Make public → Copy link).
 * 2. Extract the UUID from the URL:
 *      https://claude.ai/public/artifacts/<uuid>
 * 3. Append an entry to ARTIFACTS below, following the existing shape.
 * 4. Run `npm run build` — no other changes required.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Canonical viewer URL for a given artifact ID */
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

    // ── Add further entries here ──────────────────────────────────────────────
    // {
    //   id: '<uuid>',
    //   slug: '<url-friendly-slug>',
    //   category: '<key from ARTIFACT_CATEGORIES>',
    //   tags: ['tag1', 'tag2'],
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
