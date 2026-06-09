/**
 * src/utils/jsonld.js
 * JSON-LD / Schema.org injection utility for the Ghost Autonomy Knowledge Base.
 *
 * Generates and injects structured data into <head> at route-render time.
 * Handles three injection patterns:
 *   A) KnowledgeBase index (Book + WebSite SearchAction)
 *   B) Part landing (BookSection)
 *   C) Chapter/Section reader (Chapter or Article + BreadcrumbList + ReadAction)
 *
 * Usage: call injectJsonLd(payload) on component mount; it replaces the
 *   <script id="kb-jsonld"> tag if it already exists (prevents duplicates
 *   during client-side navigation).
 */

const BASE_URL = 'https://ghostautonomy.com';
const ORG_ID   = `${BASE_URL}/#organization`;
const SITE_ID  = `${BASE_URL}/#website`;
const BOOK_ID  = `${BASE_URL}/docs/#book`;

// ─── Core injector ──────────────────────────────────────────────────────────

export function injectJsonLd(graph) {
    const existing = document.getElementById('kb-jsonld');
    const script = existing || document.createElement('script');
    script.id = 'kb-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
    if (!existing) document.head.appendChild(script);
}

export function removeJsonLd() {
    const el = document.getElementById('kb-jsonld');
    if (el) el.remove();
}

// ─── URL builders ────────────────────────────────────────────────────────────

export function partUrl(partSlug)                         { return `${BASE_URL}/en/knowledge-base/${partSlug}/`; }
export function chapterUrl(partSlug, chapterSlug)         { return `${BASE_URL}/en/knowledge-base/${partSlug}/${chapterSlug}/`; }
export function sectionUrl(partSlug, chapterSlug, secSlug){ return `${BASE_URL}/en/knowledge-base/${partSlug}/${chapterSlug}/${secSlug}/`; }

// ─── Shared node: Organization ───────────────────────────────────────────────

const ORG = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Ghost Autonomy Inc.',
    url: BASE_URL,
};

// ─── Pattern A: Knowledge base index page ───────────────────────────────────

/**
 * @param {Array} parts  — KB_PARTS array
 */
export function buildIndexGraph(parts) {
    return [
        ORG,
        {
            '@type': 'WebSite',
            '@id': SITE_ID,
            url: BASE_URL,
            name: 'Ghost Autonomy',
            alternateName: 'گوست آتونومی',
            inLanguage: ['fa', 'en'],
            publisher: { '@id': ORG_ID },
            potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/en/knowledge-base?q={search_term_string}` },
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': 'Book',
            '@id': BOOK_ID,
            name: 'مستندات Ghost Autonomy',
            alternateName: 'Ghost Autonomy Master Document',
            inLanguage: 'fa',
            url: `${BASE_URL}/en/knowledge-base/`,
            publisher: { '@id': ORG_ID },
            keywords: [
                'autonomous driving', 'PICAPD ISA', 'Queen Bee architecture',
                'Byzantine fault tolerance', 'physics-inspired computing', 'bilinear form',
                'ASIL-D', 'EPU silicon',
            ],
            hasPart: parts.map((p) => ({ '@id': `${partUrl(p.slug)}#part` })),
        },
        {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/en/knowledge-base/#page`,
            url: `${BASE_URL}/en/knowledge-base/`,
            name: 'Knowledge Base — Ghost Autonomy',
            isPartOf: { '@id': SITE_ID },
            about: { '@id': BOOK_ID },
            breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Knowledge Base', item: `${BASE_URL}/en/knowledge-base/` }],
            },
        },
    ];
}

// ─── Pattern B: Part landing page ───────────────────────────────────────────

/**
 * @param {object} part  — a KB_PARTS entry
 */
export function buildPartGraph(part) {
    const url = partUrl(part.slug);
    return [
        {
            '@type': 'BookSection',
            '@id': `${url}#part`,
            name: part.title.fa,
            alternateName: `Part ${part.number}: ${part.title.en}`,
            inLanguage: 'fa',
            position: parseInt(part.number, 10) || part.number,
            url,
            isPartOf: { '@id': BOOK_ID },
            publisher: { '@id': ORG_ID },
            description: part.description?.en,
            keywords: (part.tags || []).join(', '),
            hasPart: (part.chapters || []).map((ch) => ({
                '@id': `${chapterUrl(part.slug, ch.slug)}#chapter`,
            })),
        },
        {
            '@type': 'WebPage',
            '@id': `${url}#page`,
            url,
            name: `${part.title.en} — Ghost Autonomy Knowledge Base`,
            isPartOf: { '@id': SITE_ID },
            breadcrumb: buildBreadcrumbList([
                { name: 'Knowledge Base', url: `${BASE_URL}/en/knowledge-base/` },
                { name: `Part ${part.number}: ${part.title.en}`, url },
            ]),
        },
    ];
}

// ─── Pattern C: Chapter reader page ─────────────────────────────────────────

/**
 * @param {object} part     — parent KB_PARTS entry
 * @param {object} chapter  — the chapter node
 */
export function buildChapterGraph(part, chapter) {
    const url = chapterUrl(part.slug, chapter.slug);
    return [
        {
            '@type': 'Chapter',
            '@id': `${url}#chapter`,
            name: chapter.title.fa,
            alternateName: `Chapter ${chapter.number}: ${chapter.title.en}`,
            inLanguage: 'fa',
            position: parseInt(chapter.number, 10) || chapter.number,
            url,
            isPartOf: { '@id': `${partUrl(part.slug)}#part` },
            publisher: { '@id': ORG_ID },
            description: chapter.description?.en,
            keywords: (chapter.tags || []).join(', '),
            hasPart: (chapter.sections || []).map((s) => ({
                '@id': `${sectionUrl(part.slug, chapter.slug, s.slug)}#section`,
            })),
            potentialAction: { '@type': 'ReadAction', target: url },
        },
        {
            '@type': 'WebPage',
            '@id': `${url}#page`,
            url,
            name: `${chapter.title.en} — Ghost Autonomy`,
            isPartOf: { '@id': SITE_ID },
            breadcrumb: buildBreadcrumbList([
                { name: 'Knowledge Base', url: `${BASE_URL}/en/knowledge-base/` },
                { name: `Part ${part.number}: ${part.title.en}`, url: partUrl(part.slug) },
                { name: `${chapter.number}. ${chapter.title.en}`, url },
            ]),
        },
    ];
}

// ─── Pattern C (section): Section reader page ────────────────────────────────

/**
 * @param {object} part
 * @param {object} chapter
 * @param {object} section
 */
export function buildSectionGraph(part, chapter, section) {
    const url = sectionUrl(part.slug, chapter.slug, section.slug);
    return [
        {
            '@type': 'Article',
            '@id': `${url}#section`,
            name: section.title.fa,
            alternateName: `§${section.number} ${section.title.en}`,
            inLanguage: 'fa',
            position: section.number,
            url,
            isPartOf: { '@id': `${chapterUrl(part.slug, chapter.slug)}#chapter` },
            publisher: { '@id': ORG_ID },
            keywords: (section.tags || []).join(', '),
            potentialAction: { '@type': 'ReadAction', target: url },
        },
        {
            '@type': 'WebPage',
            '@id': `${url}#page`,
            url,
            name: `§${section.number} ${section.title.en} — Ghost Autonomy`,
            isPartOf: { '@id': SITE_ID },
            breadcrumb: buildBreadcrumbList([
                { name: 'Knowledge Base', url: `${BASE_URL}/en/knowledge-base/` },
                { name: `Part ${part.number}: ${part.title.en}`, url: partUrl(part.slug) },
                { name: `${chapter.number}. ${chapter.title.en}`, url: chapterUrl(part.slug, chapter.slug) },
                { name: `${section.number} ${section.title.en}`, url },
            ]),
        },
    ];
}

// ─── BreadcrumbList helper ───────────────────────────────────────────────────

function buildBreadcrumbList(items) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}