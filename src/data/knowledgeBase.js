/**
 * knowledgeBase.js
 * Canonical data model for the Ghost Autonomy Knowledge Base module.
 *
 * Structure: Document → Part → Chapter → Section → Subsection
 * Every node is independently addressable via its `slug` chain.
 * Page numbers sourced from the authoritative PDF TOC (11-page source package).
 *
 * URL convention (enforced by React Router):
 *   /en/knowledge-base                              → browse index
 *   /en/knowledge-base/:partSlug                    → part landing
 *   /en/knowledge-base/:partSlug/:chapterSlug        → chapter reader
 *   /en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug → section reader
 */

// ─── Utility ────────────────────────────────────────────────────────────────

/**
 * Flattens the entire TOC tree into a searchable list of nodes.
 * Each node carries breadcrumb metadata for display and JSON-LD.
 */
export function flattenNodes(parts) {
    const nodes = [];

    parts.forEach((part) => {
        nodes.push({ ...part, nodeType: 'part', breadcrumb: [part.title] });

        (part.chapters || []).forEach((chapter) => {
            nodes.push({
                ...chapter,
                nodeType: 'chapter',
                partSlug: part.slug,
                breadcrumb: [part.title, chapter.title],
            });

            (chapter.sections || []).forEach((section) => {
                nodes.push({
                    ...section,
                    nodeType: 'section',
                    partSlug: part.slug,
                    chapterSlug: chapter.slug,
                    breadcrumb: [part.title, chapter.title, section.title],
                });

                (section.subsections || []).forEach((sub) => {
                    nodes.push({
                        ...sub,
                        nodeType: 'subsection',
                        partSlug: part.slug,
                        chapterSlug: chapter.slug,
                        sectionSlug: section.slug,
                        breadcrumb: [part.title, chapter.title, section.title, sub.title],
                    });
                });
            });
        });
    });

    return nodes;
}

/** Build a URL path for any node from its slugs */
export function buildPath(lang, partSlug, chapterSlug, sectionSlug) {
    let path = `/${lang}/knowledge-base`;
    if (partSlug) path += `/${partSlug}`;
    if (chapterSlug) path += `/${chapterSlug}`;
    if (sectionSlug) path += `/${sectionSlug}`;
    return path;
}

// ─── Tag taxonomy ───────────────────────────────────────────────────────────
export const TAG_GROUPS = {
    domain: ['autonomous-driving', 'semiconductor', 'AI', 'robotics'],
    technical: [
        'PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance',
        'bilinear-form', 'physics-computing', 'control-theory',
        'signal-processing', 'neural-networks', 'moment-compression',
        'uncertainty-quantification', 'ASIL-D',
    ],
    business: ['strategy', 'market', 'IPO', 'IP', 'funding', 'valuation'],
    regional: ['India', 'South-Korea', 'Iran', 'US', 'Europe', 'Middle-East'],
    content: ['architecture', 'validation', 'benchmark', 'simulation', 'derivation'],
};

// ─── Knowledge Base parts ───────────────────────────────────────────────────

export const KB_PARTS = [

    // ══════════════════════════════════════════════════════════════════════════
    //  PART I — Executive & Strategic
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-i',
        slug: 'executive-strategic',
        number: 'I',
        pageStart: 13,
        title: { en: 'Executive & Strategic', fa: 'اجرایی و استراتژیک' },
        description: {
            en: 'Market positioning, business strategy, competitive advantage, roadmap, team, and risk management.',
            fa: 'جایگاه‌یابی بازار، استراتژی کسب‌وکار، مزیت رقابتی، نقشه راه، تیم و مدیریت ریسک.',
        },
        tags: ['strategy', 'market', 'business'],
        accentColor: 'var(--kb-accent-executive)',
        chapters: [
            {
                id: 'ch-1',
                slug: 'executive-summary',
                number: '1',
                pageStart: 15,
                title: { en: 'Executive Summary', fa: 'خلاصه اجرایی' },
                description: {
                    en: 'Vision, strategic goals, value proposition, and technical summary of the PICAPD ISA, Queen Bee architecture, and Byzantine Fault Tolerance.',
                    fa: 'چشم‌انداز، اهداف کلان، پیشنهاد ارزش، و خلاصه فنی معماری PICAPD ISA، کندوی ملکه، و تحمل خطای بیزانسی.',
                },
                tags: ['strategy', 'PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance'],
                sections: [
                    {
                        id: 'sec-1-1', slug: 'vision', number: '1.1', pageStart: 15,
                        title: { en: 'Vision', fa: 'چشم‌انداز' },
                        tags: ['strategy'],
                        subsections: [
                            { id: 'sub-1-1-1', slug: 'mathematical-universality', number: '1.1.1', pageStart: 15, title: { en: 'Mathematical Universality', fa: 'جهانی بودن ریاضی' }, tags: ['physics-computing'] },
                            { id: 'sub-1-1-2', slug: 'computational-efficiency', number: '1.1.2', pageStart: 15, title: { en: 'Computational Efficiency', fa: 'کارایی محاسباتی' }, tags: ['physics-computing'] },
                            { id: 'sub-1-1-3', slug: 'physical-validation', number: '1.1.3', pageStart: 15, title: { en: 'Physical Validation', fa: 'اعتبارسنجی فیزیکی' }, tags: ['validation'] },
                        ],
                    },
                    {
                        id: 'sec-1-2', slug: 'strategic-goals', number: '1.2', pageStart: 16,
                        title: { en: 'Strategic Goals', fa: 'اهداف کلان' },
                        tags: ['strategy'],
                        subsections: [],
                    },
                    {
                        id: 'sec-1-3', slug: 'value-proposition', number: '1.3', pageStart: 16,
                        title: { en: 'Value Proposition', fa: 'پیشنهاد ارزش' },
                        tags: ['strategy', 'business'],
                        subsections: [],
                    },
                    {
                        id: 'sec-1-4', slug: 'technical-summary', number: '1.4', pageStart: 16,
                        title: { en: 'Technical Summary', fa: 'خلاصه فنی' },
                        tags: ['PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance'],
                        subsections: [
                            { id: 'sub-1-4-1', slug: 'picapd-isa-architecture', number: '1.4.1', pageStart: 16, title: { en: 'PICAPD ISA Architecture', fa: 'معماری PICAPD ISA' }, tags: ['PICAPD-ISA', 'architecture'] },
                            { id: 'sub-1-4-2', slug: 'queen-bee-architecture', number: '1.4.2', pageStart: 16, title: { en: 'Queen Bee Architecture', fa: 'معماری Queen Bee' }, tags: ['Queen-Bee', 'architecture'] },
                            { id: 'sub-1-4-3', slug: 'byzantine-fault-tolerance', number: '1.4.3', pageStart: 17, title: { en: 'Byzantine Fault Tolerance', fa: 'تحمل خطای بیزانسی' }, tags: ['Byzantine-fault-tolerance'] },
                        ],
                    },
                ],
            },
            {
                id: 'ch-2', slug: 'market-analysis', number: '2', pageStart: 19,
                title: { en: 'Market Analysis', fa: 'تحلیل بازار' },
                description: { en: 'Market size, competitive landscape, trends, and opportunities in autonomous computing.', fa: 'اندازه بازار، رقبا، روندها و فرصت‌ها در محاسبات خودران.' },
                tags: ['market', 'strategy'],
                sections: [
                    { id: 'sec-2-1', slug: 'market-size', number: '2.1', pageStart: 19, title: { en: 'Market Size', fa: 'اندازه بازار' }, tags: ['market'], subsections: [] },
                    { id: 'sec-2-2', slug: 'competitive-landscape', number: '2.2', pageStart: 20, title: { en: 'Competitive Landscape', fa: 'رقبا' }, tags: ['market'], subsections: [] },
                    { id: 'sec-2-3', slug: 'trends', number: '2.3', pageStart: 21, title: { en: 'Trends', fa: 'روندها' }, tags: ['market'], subsections: [] },
                    { id: 'sec-2-4', slug: 'opportunities', number: '2.4', pageStart: 22, title: { en: 'Opportunities', fa: 'فرصت‌ها' }, tags: ['market'], subsections: [] },
                ],
            },
            {
                id: 'ch-3', slug: 'product-strategy', number: '3', pageStart: 25,
                title: { en: 'Product Strategy', fa: 'استراتژی محصول' },
                description: { en: 'Product roadmap, positioning, and go-to-market strategy.', fa: 'نقشه راه محصول، جایگاه‌یابی و استراتژی ورود به بازار.' },
                tags: ['strategy', 'business'],
                sections: [],
            },
            {
                id: 'ch-4', slug: 'competitive-advantage', number: '4', pageStart: 27,
                title: { en: 'Competitive Advantage', fa: 'مزیت رقابتی' },
                description: { en: 'Defensible moats derived from physics-enforced architecture and proprietary IP.', fa: 'مزیت‌های دفاع‌پذیر از معماری اجبارشده توسط فیزیک و مالکیت معنوی اختصاصی.' },
                tags: ['strategy', 'IP'],
                sections: [],
            },
            {
                id: 'ch-5', slug: 'roadmap', number: '5', pageStart: 29,
                title: { en: 'Roadmap', fa: 'نقشه راه' },
                description: { en: 'Phased development timeline from silicon tape-out to OEM deployment.', fa: 'جدول زمانی توسعه مرحله‌ای از tape-out سیلیکون تا استقرار OEM.' },
                tags: ['strategy'],
                sections: [],
            },
            {
                id: 'ch-6', slug: 'team', number: '6', pageStart: 31,
                title: { en: 'Team', fa: 'تیم' },
                description: { en: 'Core team, advisors, and institutional affiliations.', fa: 'تیم اصلی، مشاوران و وابستگی‌های نهادی.' },
                tags: ['strategy'],
                sections: [],
            },
            {
                id: 'ch-7', slug: 'risk-management', number: '7', pageStart: 33,
                title: { en: 'Risk Management', fa: 'مدیریت ریسک' },
                description: { en: 'Identified risks, mitigation strategies, and contingency plans.', fa: 'ریسک‌های شناسایی‌شده، استراتژی‌های کاهش و برنامه‌های احتیاطی.' },
                tags: ['strategy', 'business'],
                sections: [],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART II — Philosophy, Design & Conception (PDC)
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-ii',
        slug: 'philosophy-design-conception',
        number: 'II',
        pageStart: 37,
        title: { en: 'Philosophy, Design & Conception', fa: 'فلسفه طراحی و مفهوم‌سازی' },
        description: {
            en: 'The conceptual foundation that precedes and governs all architecture decisions. Design principles, abstraction layers, uncertainty handling, and documentation as a formal artifact.',
            fa: 'پایه مفهومی که مقدم بر تمام تصمیمات معماری است و آن‌ها را هدایت می‌کند.',
        },
        tags: ['architecture', 'strategy'],
        accentColor: 'var(--kb-accent-philosophy)',
        chapters: [
            {
                id: 'ch-8', slug: 'pdc', number: '8', pageStart: 39,
                title: { en: 'Philosophy, Design & Conception (PDC)', fa: 'فلسفه طراحی و مفهوم‌سازی' },
                description: { en: 'Design philosophy, conceptual system model, layered guarantees, traceability, and the bridge to technical foundations.', fa: 'فلسفه طراحی، مدل مفهومی سامانه، تضمین‌های لایه‌ای، ردیابی‌پذیری و پل به مبانی فنی.' },
                tags: ['architecture', 'ASIL-D'],
                sections: [
                    {
                        id: 'sec-8-1', slug: 'motivation-scope', number: '8.1', pageStart: 39,
                        title: { en: 'Motivation, Scope, and the Reader Contract', fa: 'انگیزه، دامنه و قرارداد خواننده' },
                        tags: ['architecture'],
                        subsections: [
                            { id: 'sub-8-1-1', slug: 'why-design-philosophy', number: '8.1.1', pageStart: 40, title: { en: 'Why Design Philosophy Precedes Architecture', fa: 'چرا فلسفه طراحی پیش‌نیاز معماری است' }, tags: ['architecture'] },
                            { id: 'sub-8-1-2', slug: 'scope-boundaries', number: '8.1.2', pageStart: 40, title: { en: 'Scope Boundaries and Non-Goals', fa: 'مرزهای دامنه و غیرهدف‌ها' }, tags: ['architecture'] },
                            { id: 'sub-8-1-3', slug: 'reader-contract', number: '8.1.3', pageStart: 40, title: { en: 'Reader Contract: How to Read This Document', fa: 'قرارداد خواننده: چگونه این سند را بخوانیم' }, tags: [] },
                            { id: 'sub-8-1-4', slug: 'alignment-implementation', number: '8.1.4', pageStart: 40, title: { en: 'Alignment with the Implementation Map', fa: 'هم‌ترازی با نقشه پیاده‌سازی' }, tags: ['architecture'] },
                        ],
                    },
                    {
                        id: 'sec-8-2', slug: 'conceptual-system-model', number: '8.2', pageStart: 40,
                        title: { en: 'Conceptual System Model: Agent, World, and Causality', fa: 'مدل مفهومی سامانه: عامل، جهان و علیت' },
                        tags: ['control-theory', 'architecture'],
                        subsections: [
                            { id: 'sub-8-2-1', slug: 'autonomy-control-problem', number: '8.2.1', pageStart: 41, title: { en: 'Autonomy as a Control Problem', fa: 'تعریف سامانه خودمختار به‌عنوان مسئله کنترل' }, tags: ['control-theory'] },
                            {
                                id: 'sub-8-2-2', slug: 'system-boundary', number: '8.2.2', pageStart: 41,
                                title: { en: 'System Boundary: Observation/Action Contracts', fa: 'مرز سامانه و محیط: قراردادهای مشاهده و عمل' },
                                tags: ['architecture'],
                            },
                        ],
                    },
                    {
                        id: 'sec-8-3', slug: 'design-principles', number: '8.3', pageStart: 41,
                        title: { en: 'Design Principles: CSS', fa: 'اصول طراحی: سازگاری، سادگی و مقیاس‌پذیری' },
                        tags: ['architecture'],
                        subsections: [
                            { id: 'sub-8-3-1', slug: 'separation-of-concerns', number: '8.3.1', pageStart: 42, title: { en: 'Separation of Concerns and Responsibility Boundaries', fa: 'تفکیک نگرانی‌ها و مرزبندی مسئولیت‌ها' }, tags: ['architecture'] },
                            { id: 'sub-8-3-2', slug: 'contract-first', number: '8.3.2', pageStart: 42, title: { en: 'Contract-First Interfaces', fa: 'قرارداد-محور: تعریف دقیق ورودی/خروجی' }, tags: ['architecture'] },
                            { id: 'sub-8-3-3', slug: 'determinism-reproducibility', number: '8.3.3', pageStart: 42, title: { en: 'Determinism and Reproducibility', fa: 'قطعیّت و بازتولیدپذیری' }, tags: ['architecture', 'validation'] },
                        ],
                    },
                    {
                        id: 'sec-8-4', slug: 'mid-layer-contracts', number: '8.4', pageStart: 43,
                        title: { en: 'Mid-Layer Contracts: Perception–Prediction–Decision', fa: 'قراردادهای میانی: ادراک–پیش‌بینی–تصمیم' },
                        tags: ['architecture', 'signal-processing'],
                        subsections: [
                            { id: 'sub-8-4-1', slug: 'perception-outputs', number: '8.4.1', pageStart: 43, title: { en: 'Perception Outputs and Latency', fa: 'خروجی ادراک و تأخیر' }, tags: ['signal-processing'] },
                            { id: 'sub-8-4-2', slug: 'prediction-horizon', number: '8.4.2', pageStart: 44, title: { en: 'Prediction Horizon and Memory', fa: 'افق پیش‌بینی و حافظه' }, tags: ['control-theory'] },
                            { id: 'sub-8-4-3', slug: 'decision-outputs-safety', number: '8.4.3', pageStart: 44, title: { en: 'Decision Outputs and Safety', fa: 'خروجی تصمیم و ایمنی' }, tags: ['ASIL-D'] },
                        ],
                    },
                    {
                        id: 'sec-8-5', slug: 'layered-guarantees', number: '8.5', pageStart: 44,
                        title: { en: 'Layered Guarantees and Interfaces', fa: 'تضمین‌های لایه‌ای و طبقه‌بندی‌شده' },
                        tags: ['ASIL-D', 'architecture'],
                        subsections: [
                            { id: 'sub-8-5-1', slug: 'timing-guarantees', number: '8.5.1', pageStart: 45, title: { en: 'Timing Guarantees', fa: 'تضمین‌های زمانی' }, tags: ['ASIL-D'] },
                            { id: 'sub-8-5-2', slug: 'safety-guarantees', number: '8.5.2', pageStart: 45, title: { en: 'Safety Guarantees', fa: 'تضمین‌های ایمنی' }, tags: ['ASIL-D'] },
                        ],
                    },
                    {
                        id: 'sec-8-6', slug: 'traceability', number: '8.6', pageStart: 45,
                        title: { en: 'Traceability: Requirements → Design → Implementation', fa: 'قابلیت رهگیری: نیازمندی→طراحی→پیاده‌سازی' },
                        tags: ['architecture', 'validation'],
                        subsections: [
                            { id: 'sub-8-6-1', slug: 'evidence-packs', number: '8.6.1', pageStart: 46, title: { en: 'Evidence Packs', fa: 'بسته‌های شواهد' }, tags: ['validation'] },
                            { id: 'sub-8-6-2', slug: 'auditability', number: '8.6.2', pageStart: 46, title: { en: 'Auditability', fa: 'قابلیت بازرسی' }, tags: ['validation'] },
                        ],
                    },
                    {
                        id: 'sec-8-7', slug: 'physics-inspired-foundations', number: '8.7', pageStart: 46,
                        title: { en: 'Why Physics-Inspired Foundations Come Next', fa: 'چرا مبانی فیزیک‌الهام‌گرفته در ادامه می‌آید' },
                        tags: ['physics-computing'],
                        subsections: [
                            { id: 'sub-8-7-1', slug: 'abstraction-to-physics', number: '8.7.1', pageStart: 47, title: { en: 'From Abstraction to Implementable Physics', fa: 'از انتزاع به فیزیک قابل پیاده‌سازی' }, tags: ['physics-computing'] },
                        ],
                    },
                    {
                        id: 'sec-8-8', slug: 'conceptual-bridge', number: '8.8', pageStart: 45,
                        title: { en: 'Conceptual Bridge to the Technical Foundations', fa: 'پل مفهومی به مبانی فنی' },
                        tags: ['physics-computing'],
                        subsections: [],
                    },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART III — Strategic Assets & Global Partnerships (SAGP)
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-iii',
        slug: 'strategic-assets-global-partnerships',
        number: 'III',
        pageStart: 49,
        title: { en: 'Strategic Assets & Global Partnerships', fa: 'دارایی‌های استراتژیک و مشارکت‌های جهانی' },
        description: {
            en: 'Geopolitical context, vertical integration through HPSA silica, bilateral partnerships with India and South Korea, and the Quad-Plus alliance framework.',
            fa: 'زمینه ژئوپلیتیکی، یکپارچه‌سازی عمودی از طریق سیلیس HPSA، مشارکت‌های دوجانبه با هند و کره جنوبی، و چارچوب اتحاد چهارجانبه.',
        },
        tags: ['strategy', 'India', 'South-Korea', 'Iran', 'US'],
        accentColor: 'var(--kb-accent-strategic)',
        chapters: [
            {
                id: 'ch-9', slug: 'sagp', number: '9', pageStart: 51,
                title: { en: 'Strategic Assets & Global Partnerships', fa: 'دارایی‌های استراتژیک و مشارکت‌های جهانی' },
                description: { en: 'Definition of strategic assets and mapping the global partner landscape.', fa: 'تعریف دارایی‌های استراتژیک و نقشه‌برداری از چشم‌انداز شرکای جهانی.' },
                tags: ['strategy'],
                sections: [
                    { id: 'sec-9-1', slug: 'strategic-asset-definition', number: '9.1', pageStart: 51, title: { en: 'Strategic Asset Definition', fa: 'تعریف دارایی استراتژیک' }, tags: ['strategy'], subsections: [] },
                    { id: 'sec-9-2', slug: 'global-partner-landscape', number: '9.2', pageStart: 53, title: { en: 'Global Partner Landscape', fa: 'چشم‌انداز شرکای جهانی' }, tags: ['strategy'], subsections: [] },
                ],
            },
            {
                id: 'ch-10', slug: 'geopolitical-context', number: '10', pageStart: 57,
                title: { en: 'Geopolitical Context', fa: 'زمینه ژئوپلیتیکی' },
                description: { en: 'US export control regime, China semiconductor stack, and implications for Ghost Autonomy\'s supply chain and market access.', fa: 'رژیم کنترل صادرات آمریکا، پشته نیمه‌هادی چین و پیامدها برای زنجیره تأمین و دسترسی بازار.' },
                tags: ['US', 'strategy', 'semiconductor'],
                sections: [
                    { id: 'sec-10-1', slug: 'us-export-controls', number: '10.1', pageStart: 57, title: { en: 'US and Export Controls', fa: 'آمریکا و کنترل صادرات' }, tags: ['US'], subsections: [] },
                    { id: 'sec-10-2', slug: 'china-semiconductor-stack', number: '10.2', pageStart: 60, title: { en: 'China and the Semiconductor Stack', fa: 'چین و پشته نیمه‌هادی' }, tags: ['semiconductor'], subsections: [] },
                ],
            },
            {
                id: 'ch-11', slug: 'global-partnerships', number: '11', pageStart: 65,
                title: { en: 'Global Partnerships', fa: 'مشارکت‌های جهانی' },
                description: { en: 'European and Middle Eastern partnership frameworks, co-development proposals, and talent pipelines.', fa: 'چارچوب‌های مشارکت اروپایی و خاورمیانه، پیشنهادات توسعه مشترک و خطوط استعداد.' },
                tags: ['Europe', 'Middle-East', 'strategy'],
                sections: [
                    { id: 'sec-11-1', slug: 'europe', number: '11.1', pageStart: 65, title: { en: 'Europe', fa: 'اروپا' }, tags: ['Europe'], subsections: [] },
                    { id: 'sec-11-2', slug: 'middle-east', number: '11.2', pageStart: 68, title: { en: 'Middle East', fa: 'خاورمیانه' }, tags: ['Middle-East'], subsections: [] },
                ],
            },
            {
                id: 'ch-12', slug: 'south-korea-semiconductor', number: '12', pageStart: 71,
                title: { en: "South Korea's Semiconductor & Ghost Autonomy", fa: 'برتری نیمه‌هادی کره جنوبی و Ghost Autonomy' },
                description: { en: "Korea's memory and foundry position, HBM for AI, the US–Korea–Iran export control trilemma, and collaboration opportunities.", fa: 'جایگاه حافظه و فاندری کره، HBM برای هوش مصنوعی، معضل سه‌گانه و فرصت‌های همکاری.' },
                tags: ['South-Korea', 'semiconductor'],
                sections: [
                    { id: 'sec-12-1', slug: 'korea-position', number: '12.1', pageStart: 71, title: { en: "Korea's Position: Memory, Foundry, HBM for AI", fa: 'جایگاه کره: حافظه، فاندری، HBM برای هوش مصنوعی' }, tags: ['South-Korea', 'semiconductor'], subsections: [] },
                    { id: 'sec-12-2', slug: 'korea-us-iran-trilemma', number: '12.2', pageStart: 72, title: { en: 'The Korea–US–Iran Trilemma: Export Controls', fa: 'معضل سه‌گانه کره–آمریکا–ایران: کنترل صادرات' }, tags: ['South-Korea', 'US', 'Iran'], subsections: [] },
                    { id: 'sec-12-3', slug: 'collaboration-opportunities', number: '12.3', pageStart: 73, title: { en: 'Collaboration Opportunities', fa: 'فرصت‌های همکاری' }, tags: ['South-Korea'], subsections: [] },
                    { id: 'sec-12-4', slug: 'value-proposition-korea', number: '12.4', pageStart: 74, title: { en: 'Value Proposition for South Korea', fa: 'ارزش پیشنهادی برای کره جنوبی' }, tags: ['South-Korea'], subsections: [] },
                ],
            },
            {
                id: 'ch-13', slug: 'quad-plus-alliance', number: '13', pageStart: 77,
                title: { en: 'The Quad-Plus Alliance: India–Korea–US–Iran', fa: 'اتحاد چهارجانبه: هند–کره–آمریکا–ایران' },
                description: { en: 'Synthesis of complementary national strengths, multilateral initiatives, and a 2026–2028 pilot project roadmap.', fa: 'ترکیب نقاط قوت مکمل ملی، ابتکارات چندجانبه و نقشه راه پروژه آزمایشی ۲۰۲۶–۲۰۲۸.' },
                tags: ['India', 'South-Korea', 'US', 'Iran', 'strategy'],
                sections: [
                    { id: 'sec-13-1', slug: 'complementary-strengths', number: '13.1', pageStart: 77, title: { en: 'Synthesis of Complementary Strengths', fa: 'ترکیب نقاط قوت مکمل' }, tags: ['strategy'], subsections: [] },
                    { id: 'sec-13-2', slug: 'multilateral-initiatives', number: '13.2', pageStart: 78, title: { en: 'Proposed Multi-lateral Initiatives', fa: 'ابتکارات چندجانبه پیشنهادی' }, tags: ['strategy'], subsections: [] },
                    { id: 'sec-13-3', slug: 'pilot-roadmap', number: '13.3', pageStart: 79, title: { en: 'Roadmap to a Pilot Project (2026–2028)', fa: 'نقشه راه پروژه آزمایشی (۲۰۲۸–۲۰۲۶)' }, tags: ['strategy'], subsections: [] },
                ],
            },
            {
                id: 'ch-14', slug: 'closing-strategic-outlook', number: '14', pageStart: 81,
                title: { en: 'Closing Strategic Outlook', fa: 'جمع‌بندی استراتژیک' },
                description: { en: 'Synthesis of the strategic landscape and forward-looking conclusions.', fa: 'جمع‌بندی چشم‌انداز استراتژیک و نتیجه‌گیری رو به جلو.' },
                tags: ['strategy'],
                sections: [],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART IV — Technical Foundation
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-iv',
        slug: 'technical-foundation',
        number: 'IV',
        pageStart: 83,
        title: { en: 'Technical Foundation', fa: 'مبانی فنی' },
        description: {
            en: 'Physics-inspired computing, bilinear forms, tensor calculus, uncertainty quantification, realizability constraints, and the control-theoretic bridge.',
            fa: 'محاسبات فیزیک‌الهام‌گرفته، فرم‌های دوخطی، حساب تنسور، کمی‌سازی عدم‌قطعیت و ارتباط به نظریه کنترل.',
        },
        tags: ['physics-computing', 'bilinear-form', 'uncertainty-quantification', 'control-theory'],
        accentColor: 'var(--kb-accent-technical)',
        chapters: [
            {
                id: 'ch-15', slug: 'epu-foundations', number: '15', pageStart: 85,
                title: { en: 'EPU Foundations', fa: 'مبانی EPU' },
                description: { en: 'Rationale for the EPU design and the system model it is built on.', fa: 'دلیل طراحی EPU و مدل سامانه‌ای که بر آن بنا شده است.' },
                tags: ['physics-computing', 'architecture'],
                sections: [
                    { id: 'sec-15-1', slug: 'epu-rationale', number: '15.1', pageStart: 85, title: { en: 'EPU Rationale', fa: 'دلیل EPU' }, tags: ['physics-computing'], subsections: [] },
                    { id: 'sec-15-2', slug: 'system-model', number: '15.2', pageStart: 86, title: { en: 'System Model', fa: 'مدل سامانه' }, tags: ['physics-computing', 'control-theory'], subsections: [] },
                ],
            },
            {
                id: 'ch-16', slug: 'realizability-constraints', number: '16', pageStart: 97,
                title: { en: 'Realizability & Constraints', fa: 'محقق‌پذیری و محدودیت‌ها' },
                description: { en: 'Physics consistency, realizability criteria, hardware implementation, and uncertainty quantification at the constraint layer.', fa: 'سازگاری فیزیکی، معیارهای محقق‌پذیری، پیاده‌سازی سخت‌افزاری و کمی‌سازی عدم‌قطعیت.' },
                tags: ['physics-computing', 'uncertainty-quantification'],
                sections: [
                    { id: 'sec-16-1', slug: 'physics-consistency', number: '16.1', pageStart: 98, title: { en: 'Physics Consistency', fa: 'سازگاری فیزیکی' }, tags: ['physics-computing'], subsections: [] },
                    { id: 'sec-16-2', slug: 'realizability-criteria', number: '16.2', pageStart: 99, title: { en: 'Realizability Criteria', fa: 'معیارهای محقق‌پذیری' }, tags: ['physics-computing'], subsections: [] },
                    { id: 'sec-16-3', slug: 'hardware-implementation', number: '16.3', pageStart: 99, title: { en: 'Hardware Implementation', fa: 'پیاده‌سازی سخت‌افزاری' }, tags: ['architecture'], subsections: [] },
                    { id: 'sec-16-4', slug: 'uncertainty-quantification', number: '16.4', pageStart: 101, title: { en: 'Uncertainty Quantification', fa: 'کمی‌سازی عدم‌قطعیت' }, tags: ['uncertainty-quantification'], subsections: [] },
                ],
            },
            {
                id: 'ch-17', slug: 'epistemic-uncertainty', number: '17', pageStart: 101,
                title: { en: 'Epistemic Uncertainty', fa: 'عدم‌قطعیت Epistemic' },
                description: { en: 'Model-based epistemic uncertainty: sources, representation, and calibration.', fa: 'عدم‌قطعیت معرفتی مبتنی بر مدل: منابع، نمایش و کالیبراسیون.' },
                tags: ['uncertainty-quantification'],
                sections: [
                    { id: 'sec-17-1', slug: 'modeling', number: '17.1', pageStart: 102, title: { en: 'Modeling', fa: 'مدل‌سازی' }, tags: ['uncertainty-quantification'], subsections: [] },
                    { id: 'sec-17-2', slug: 'calibration', number: '17.2', pageStart: 103, title: { en: 'Calibration', fa: 'کالیبراسیون' }, tags: ['uncertainty-quantification'], subsections: [] },
                ],
            },
            {
                id: 'ch-18', slug: 'aleatoric-uncertainty', number: '18', pageStart: 105,
                title: { en: 'Aleatoric Uncertainty', fa: 'عدم‌قطعیت Aleatoric' },
                description: { en: 'Irreducible stochastic uncertainty and noise modelling.', fa: 'عدم‌قطعیت تصادفی غیرقابل‌کاهش و مدل‌سازی نویز.' },
                tags: ['uncertainty-quantification'],
                sections: [
                    { id: 'sec-18-1', slug: 'noise', number: '18.1', pageStart: 106, title: { en: 'Noise', fa: 'نویز' }, tags: ['uncertainty-quantification', 'signal-processing'], subsections: [] },
                ],
            },
            {
                id: 'ch-19', slug: 'bilinear-forms', number: '19', pageStart: 109,
                title: { en: 'Bilinear Forms', fa: 'فرم‌های دوخطی' },
                description: { en: 'Geometry, meaning, and the mapping that bridges IIT mathematical foundations to implementable silicon.', fa: 'هندسه، معنا و نگاشتی که پایه‌های ریاضی IIT را به سیلیکون قابل پیاده‌سازی پیوند می‌دهد.' },
                tags: ['bilinear-form', 'physics-computing'],
                sections: [
                    { id: 'sec-19-1', slug: 'geometry-meaning', number: '19.1', pageStart: 110, title: { en: 'Geometry and Meaning', fa: 'هندسه و معنا' }, tags: ['bilinear-form'], subsections: [] },
                    { id: 'sec-19-2', slug: 'mapping', number: '19.2', pageStart: 112, title: { en: 'Mapping', fa: 'نگاشت' }, tags: ['bilinear-form'], subsections: [] },
                ],
            },
            {
                id: 'ch-20', slug: 'tensor-calculus', number: '20', pageStart: 115,
                title: { en: 'Tensor Calculus', fa: 'حساب تنسور' },
                description: { en: 'Tensor notation, index conventions, and the calculus underpinning the bilinear form machinery.', fa: 'نمادگذاری تنسور، قراردادهای اندیس و حسابی که زیربنای ماشینری فرم دوخطی است.' },
                tags: ['bilinear-form', 'physics-computing'],
                sections: [
                    { id: 'sec-20-1', slug: 'notation', number: '20.1', pageStart: 116, title: { en: 'Notation', fa: 'نمادگذاری' }, tags: ['bilinear-form'], subsections: [] },
                ],
            },
            {
                id: 'ch-21', slug: 'control-theoretic-bridge', number: '21', pageStart: 121,
                title: { en: 'Control-Theoretic Bridge', fa: 'پل نظریه کنترل' },
                description: { en: 'The bridge from physics-derived mathematics to control theory, with a focus on stability guarantees.', fa: 'پل از ریاضیات مشتق‌شده از فیزیک به نظریه کنترل، با تمرکز بر تضمین‌های پایداری.' },
                tags: ['control-theory', 'physics-computing'],
                sections: [
                    { id: 'sec-21-1', slug: 'stability', number: '21.1', pageStart: 122, title: { en: 'Stability', fa: 'پایداری' }, tags: ['control-theory', 'ASIL-D'], subsections: [] },
                ],
            },
            {
                id: 'ch-22', slug: 'simulation-requirements', number: '22', pageStart: 125,
                title: { en: 'Simulation Requirements', fa: 'نیازمندی‌های شبیه‌سازی' },
                description: { en: 'Requirements specification for the simulation environment that validates the technical foundation.', fa: 'مشخصات نیازمندی برای محیط شبیه‌سازی که پایه فنی را اعتبارسنجی می‌کند.' },
                tags: ['validation'],
                sections: [],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART V — Architecture
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-v',
        slug: 'architecture',
        number: 'V',
        pageStart: 129,
        title: { en: 'Architecture', fa: 'معماری' },
        description: {
            en: 'PICAPD ISA specification, Queen Bee distributed architecture, dynamic population routing, bilinear consensus, EPU silicon design, Byzantine Fault Tolerance, and safety architecture.',
            fa: 'مشخصات ISA PICAPD، معماری توزیع‌شده کندوی ملکه، مسیریابی جمعیت پویا، اجماع دوخطی، طراحی سیلیکون EPU، تحمل خطای بیزانسی و معماری ایمنی.',
        },
        tags: ['PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance', 'architecture', 'ASIL-D'],
        accentColor: 'var(--kb-accent-architecture)',
        chapters: [
            {
                id: 'ch-23', slug: 'picapd-isa', number: '23', pageStart: 133,
                title: { en: 'PICAPD ISA Specification', fa: 'مشخصات ISA PICAPD' },
                description: { en: 'Instruction set overview, variational mechanics instructions, memory model, and programming model for the PICAPD ISA.', fa: 'مروری بر مجموعه دستورات، دستورات مکانیک تغییرات، مدل حافظه و مدل برنامه‌نویسی برای ISA PICAPD.' },
                tags: ['PICAPD-ISA', 'architecture'],
                sections: [
                    { id: 'sec-23-1', slug: 'instruction-set-overview', number: '23.1', pageStart: 134, title: { en: 'Instruction Set Overview', fa: 'مرور مجموعه دستورات' }, tags: ['PICAPD-ISA'], subsections: [] },
                    { id: 'sec-23-2', slug: 'variational-mechanics', number: '23.2', pageStart: 136, title: { en: 'Variational Mechanics Instructions', fa: 'دستورات مکانیک تغییرات' }, tags: ['PICAPD-ISA', 'physics-computing'], subsections: [] },
                    { id: 'sec-23-6', slug: 'memory-model-isa', number: '23.6', pageStart: 136, title: { en: 'Memory Model', fa: 'مدل حافظه' }, tags: ['PICAPD-ISA', 'architecture'], subsections: [] },
                    { id: 'sec-23-7', slug: 'programming-model', number: '23.7', pageStart: 137, title: { en: 'Programming Model', fa: 'مدل برنامه‌نویسی' }, tags: ['PICAPD-ISA'], subsections: [] },
                ],
            },
            {
                id: 'ch-24', slug: 'queen-bee-architecture', number: '24', pageStart: 141,
                title: { en: 'Queen Bee Architecture', fa: 'معماری Queen Bee' },
                description: { en: 'Roles, components, and the Worker–Manager–Queen hierarchy of the distributed Queen Bee architecture.', fa: 'نقش‌ها، اجزا و سلسله‌مراتب Worker–Manager–Queen در معماری توزیع‌شده کندوی ملکه.' },
                tags: ['Queen-Bee', 'architecture'],
                sections: [
                    { id: 'sec-24-1', slug: 'roles-components', number: '24.1', pageStart: 142, title: { en: 'Roles and Components', fa: 'نقش‌ها و اجزا' }, tags: ['Queen-Bee', 'architecture'], subsections: [] },
                ],
            },
            {
                id: 'ch-25', slug: 'dynamic-population-routing', number: '25', pageStart: 147,
                title: { en: 'Dynamic Population Routing', fa: 'مسیریابی پویای جمعیت' },
                description: { en: 'Population-based dynamic routing protocol for distributed autonomous systems.', fa: 'پروتکل مسیریابی پویای مبتنی بر جمعیت برای سامانه‌های خودران توزیع‌شده.' },
                tags: ['Queen-Bee', 'architecture'],
                sections: [
                    { id: 'sec-25-1', slug: 'routing-protocol', number: '25.1', pageStart: 148, title: { en: 'Routing Protocol', fa: 'پروتکل مسیریابی' }, tags: ['Queen-Bee'], subsections: [] },
                ],
            },
            {
                id: 'ch-26', slug: 'bilinear-consensus', number: '26', pageStart: 151,
                title: { en: 'Bilinear Consensus', fa: 'اجماع دوخطی' },
                description: { en: 'Moment compression, population decision-making, and fault-tolerant consensus using bilinear forms.', fa: 'فشرده‌سازی گشتاور، تصمیم‌گیری جمعیت و اجماع مقاوم به خطا با استفاده از فرم‌های دوخطی.' },
                tags: ['bilinear-form', 'Queen-Bee', 'Byzantine-fault-tolerance'],
                sections: [
                    { id: 'sec-26-1', slug: 'moment-compression-a', number: '26.1', pageStart: 152, title: { en: 'Moment Compression', fa: 'فشرده‌سازی گشتاور' }, tags: ['bilinear-form'], subsections: [] },
                    { id: 'sec-26-2', slug: 'moment-compression-b', number: '26.2', pageStart: 153, title: { en: 'Moment Compression (continued)', fa: 'فشرده‌سازی گشتاور (ادامه)' }, tags: ['bilinear-form'], subsections: [] },
                    { id: 'sec-26-3', slug: 'population-decision', number: '26.3', pageStart: 153, title: { en: 'Population Decision', fa: 'تصمیم‌گیری جمعیت' }, tags: ['Queen-Bee', 'bilinear-form'], subsections: [] },
                    { id: 'sec-26-4', slug: 'fault-tolerant-consensus', number: '26.4', pageStart: 154, title: { en: 'Fault-Tolerant Consensus Using Bilinear Forms', fa: 'اجماع مقاوم به خطا با فرم‌های دوخطی' }, tags: ['Byzantine-fault-tolerance', 'bilinear-form'], subsections: [] },
                ],
            },
            {
                id: 'ch-27', slug: 'epu-silicon-design', number: '27', pageStart: 157,
                title: { en: 'EPU Silicon Design', fa: 'طراحی سیلیکون EPU' },
                description: { en: 'Physical silicon implementation of the Event Processing Unit.', fa: 'پیاده‌سازی فیزیکی سیلیکون واحد پردازش رویداد (EPU).' },
                tags: ['architecture', 'semiconductor'],
                sections: [],
            },
            {
                id: 'ch-28', slug: 'byzantine-fault-tolerance', number: '28', pageStart: 159,
                title: { en: 'Byzantine Fault Tolerance', fa: 'تحمل خطای بیزانسی' },
                description: { en: 'Three-phase BFT protocol, message complexity, memory model, and timing guarantees.', fa: 'پروتکل BFT سه‌مرحله‌ای، پیچیدگی پیام، مدل حافظه و تضمین‌های زمانی.' },
                tags: ['Byzantine-fault-tolerance', 'ASIL-D'],
                sections: [
                    { id: 'sec-28-1', slug: 'three-phase-protocol', number: '28.1', pageStart: 159, title: { en: '3-Phase Protocol', fa: 'پروتکل ۳-مرحله‌ای' }, tags: ['Byzantine-fault-tolerance'], subsections: [] },
                    { id: 'sec-28-2', slug: 'message-complexity', number: '28.2', pageStart: 160, title: { en: 'Message Complexity', fa: 'پیچیدگی پیام' }, tags: ['Byzantine-fault-tolerance'], subsections: [] },
                    { id: 'sec-28-3', slug: 'memory-model-bft', number: '28.3', pageStart: 161, title: { en: 'Memory Model', fa: 'مدل حافظه' }, tags: ['Byzantine-fault-tolerance'], subsections: [] },
                    { id: 'sec-28-4', slug: 'timing-guarantees-bft', number: '28.4', pageStart: 162, title: { en: 'Timing Guarantees', fa: 'تضمین‌های زمانی' }, tags: ['Byzantine-fault-tolerance', 'ASIL-D'], subsections: [] },
                ],
            },
            {
                id: 'ch-29', slug: 'safety-architecture', number: '29', pageStart: 165,
                title: { en: 'Safety Architecture', fa: 'معماری ایمنی' },
                description: { en: 'Non-Encodable, Non-Routable, Non-Authorizable safety constraints enforced at the architectural level.', fa: 'محدودیت‌های ایمنی غیرقابل‌رمزگذاری، غیرقابل‌مسیریابی و غیرقابل‌مجوز که در سطح معماری اعمال می‌شوند.' },
                tags: ['ASIL-D', 'architecture'],
                sections: [
                    { id: 'sec-29-1', slug: 'non-encodable', number: '29.1', pageStart: 165, title: { en: 'Non-Encodable', fa: 'غیرقابل‌رمزگذاری' }, tags: ['ASIL-D'], subsections: [] },
                    { id: 'sec-29-2', slug: 'non-routable', number: '29.2', pageStart: 166, title: { en: 'Non-Routable', fa: 'غیرقابل‌مسیریابی' }, tags: ['ASIL-D'], subsections: [] },
                    { id: 'sec-29-3', slug: 'non-authorizable', number: '29.3', pageStart: 166, title: { en: 'Non-Authorizable', fa: 'غیرقابل‌مجوز' }, tags: ['ASIL-D'], subsections: [] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART VI — Financial & Business
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-vi',
        slug: 'financial-business',
        number: 'VI',
        pageStart: 169,
        title: { en: 'Financial & Business', fa: 'مالی و کسب‌وکار' },
        description: {
            en: 'Business model, funding strategy, IPO pathways, valuation analysis, and intellectual property framework.',
            fa: 'مدل کسب‌وکار، استراتژی تأمین مالی، مسیرهای IPO، تحلیل ارزش‌گذاری و چارچوب مالکیت معنوی.',
        },
        tags: ['business', 'funding', 'IPO', 'valuation', 'IP'],
        accentColor: 'var(--kb-accent-financial)',
        chapters: [
            { id: 'ch-30', slug: 'business-model', number: '30', pageStart: 171, title: { en: 'Business Model', fa: 'مدل کسب‌وکار' }, description: { en: 'Revenue streams, go-to-market motion, and customer archetypes.', fa: 'جریان‌های درآمدی، حرکت ورود به بازار و الگوهای مشتری.' }, tags: ['business'], sections: [] },
            { id: 'ch-31', slug: 'funding-strategy', number: '31', pageStart: 173, title: { en: 'Funding Strategy', fa: 'استراتژی تأمین مالی' }, description: { en: 'Staged financing milestones, investor targeting, and round structure.', fa: 'نقاط عطف تأمین مالی مرحله‌ای، هدف‌گذاری سرمایه‌گذار و ساختار دور.' }, tags: ['funding', 'business'], sections: [] },
            { id: 'ch-32', slug: 'ipo-pathways', number: '32', pageStart: 175, title: { en: 'IPO Pathways', fa: 'مسیرهای IPO' }, description: { en: 'NASDAQ, NYSE, and dual-listing scenarios with regulatory analysis.', fa: 'سناریوهای NASDAQ، NYSE و فهرست‌بندی دوگانه با تحلیل نظارتی.' }, tags: ['IPO', 'business'], sections: [] },
            { id: 'ch-33', slug: 'valuation-analysis', number: '33', pageStart: 177, title: { en: 'Valuation Analysis', fa: 'تحلیل ارزش‌گذاری' }, description: { en: 'DCF, comparable transactions, and precedent analysis.', fa: 'DCF، تراکنش‌های قابل مقایسه و تحلیل سوابق.' }, tags: ['valuation', 'business'], sections: [] },
            { id: 'ch-34', slug: 'intellectual-property', number: '34', pageStart: 179, title: { en: 'Intellectual Property', fa: 'مالکیت معنوی' }, description: { en: 'Patent portfolio, trade secrets, licensing strategy, and freedom-to-operate analysis.', fa: 'پرتفوی ثبت اختراع، اسرار تجاری، استراتژی مجوزدهی و تحلیل آزادی عمل.' }, tags: ['IP', 'business'], sections: [] },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART VII — Validation & Results
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-vii',
        slug: 'validation-results',
        number: 'VII',
        pageStart: 185,
        title: { en: 'Validation & Results', fa: 'اعتبارسنجی و نتایج' },
        description: {
            en: 'ISA conformance testing, benchmark suite, comparative analysis, experimental silicon and simulation results, safety validation, and system integration.',
            fa: 'آزمون انطباق ISA، مجموعه بنچمارک، تحلیل مقایسه‌ای، نتایج سیلیکون و شبیه‌سازی، اعتبارسنجی ایمنی و یکپارچه‌سازی سامانه.',
        },
        tags: ['validation', 'benchmark', 'ASIL-D', 'simulation'],
        accentColor: 'var(--kb-accent-validation)',
        chapters: [
            {
                id: 'ch-35', slug: 'economic-impact', number: '35', pageStart: 181,
                title: { en: 'Economic Impact', fa: 'تأثیر اقتصادی' },
                description: { en: 'Quantified economic impact across the autonomous-computing value chain.', fa: 'تأثیر اقتصادی کمی‌شده در سرتاسر زنجیره ارزش محاسبات خودران.' },
                tags: ['business', 'strategy'],
                sections: [],
            },
            {
                id: 'ch-36', slug: 'isa-conformance-testing', number: '36', pageStart: 187,
                title: { en: 'ISA Conformance Testing', fa: 'آزمون انطباق ISA' },
                description: { en: 'Instruction tests, memory model tests, Byzantine tests, and golden vectors.', fa: 'آزمون دستورات، آزمون مدل حافظه، آزمون‌های بیزانسی و بردارهای طلایی.' },
                tags: ['PICAPD-ISA', 'validation'],
                sections: [
                    { id: 'sec-36-1', slug: 'instruction-tests', number: '36.1', pageStart: 187, title: { en: 'Instruction Tests', fa: 'آزمون دستورات' }, tags: ['PICAPD-ISA', 'validation'], subsections: [] },
                    { id: 'sec-36-2', slug: 'memory-model-tests', number: '36.2', pageStart: 188, title: { en: 'Memory Model Tests', fa: 'آزمون‌های مدل حافظه' }, tags: ['PICAPD-ISA', 'validation'], subsections: [] },
                    { id: 'sec-36-3', slug: 'byzantine-tests', number: '36.3', pageStart: 189, title: { en: 'Byzantine Tests', fa: 'آزمون‌های Byzantine' }, tags: ['Byzantine-fault-tolerance', 'validation'], subsections: [] },
                    { id: 'sec-36-4', slug: 'golden-vectors', number: '36.4', pageStart: 190, title: { en: 'Golden Vectors', fa: 'بردارهای طلایی' }, tags: ['validation'], subsections: [] },
                ],
            },
            {
                id: 'ch-37', slug: 'benchmark-suite', number: '37', pageStart: 193,
                title: { en: 'Benchmark Suite', fa: 'مجموعه Benchmark' },
                description: { en: 'Perception, decision, and safety benchmarks against comparable architectures.', fa: 'بنچمارک‌های ادراک، تصمیم و ایمنی در مقابل معماری‌های قابل مقایسه.' },
                tags: ['benchmark', 'validation'],
                sections: [
                    { id: 'sec-37-1', slug: 'perception-benchmarks', number: '37.1', pageStart: 193, title: { en: 'Perception Benchmarks', fa: 'بنچمارک‌های ادراک' }, tags: ['benchmark', 'signal-processing'], subsections: [] },
                    { id: 'sec-37-2', slug: 'decision-benchmarks', number: '37.2', pageStart: 194, title: { en: 'Decision Benchmarks', fa: 'بنچمارک‌های تصمیم' }, tags: ['benchmark', 'control-theory'], subsections: [] },
                    { id: 'sec-37-3', slug: 'safety-benchmarks', number: '37.3', pageStart: 195, title: { en: 'Safety Benchmarks', fa: 'بنچمارک‌های ایمنی' }, tags: ['benchmark', 'ASIL-D'], subsections: [] },
                ],
            },
            {
                id: 'ch-38', slug: 'comparative-analysis', number: '38', pageStart: 197,
                title: { en: 'Comparative Analysis', fa: 'تحلیل مقایسه‌ای' },
                description: { en: 'Competitor comparison, architecture comparison, and tensor analysis.', fa: 'مقایسه با رقبا، مقایسه معماری و تحلیل تنسور.' },
                tags: ['benchmark', 'validation'],
                sections: [
                    { id: 'sec-38-1', slug: 'competitor-comparison', number: '38.1', pageStart: 197, title: { en: 'Competitor Comparison', fa: 'مقایسه با رقبا' }, tags: ['benchmark'], subsections: [] },
                    { id: 'sec-38-2', slug: 'architecture-comparison', number: '38.2', pageStart: 198, title: { en: 'Architecture Comparison', fa: 'مقایسه معماری' }, tags: ['benchmark', 'architecture'], subsections: [] },
                    { id: 'sec-38-3', slug: 'tensor-analysis', number: '38.3', pageStart: 199, title: { en: 'Tensor Analysis', fa: 'تحلیل تنسور' }, tags: ['bilinear-form', 'validation'], subsections: [] },
                ],
            },
            {
                id: 'ch-39', slug: 'experimental-results', number: '39', pageStart: 201,
                title: { en: 'Experimental Results', fa: 'نتایج تجربی' },
                description: { en: 'Silicon results, simulation results, field validation, bilinear form mapping validation on IIT dataset, and EPU hardware emulation.', fa: 'نتایج سیلیکون، نتایج شبیه‌سازی، اعتبارسنجی میدانی، اعتبارسنجی نگاشت فرم دوخطی بر داده IIT و شبیه‌سازی سخت‌افزاری EPU.' },
                tags: ['validation', 'simulation', 'bilinear-form'],
                sections: [
                    { id: 'sec-39-1', slug: 'silicon-results', number: '39.1', pageStart: 201, title: { en: 'Silicon Results', fa: 'نتایج سیلیکون' }, tags: ['validation', 'semiconductor'], subsections: [] },
                    { id: 'sec-39-2', slug: 'simulation-results', number: '39.2', pageStart: 202, title: { en: 'Simulation Results', fa: 'نتایج شبیه‌سازی' }, tags: ['simulation', 'validation'], subsections: [] },
                    { id: 'sec-39-3', slug: 'field-validation', number: '39.3', pageStart: 203, title: { en: 'Field Validation', fa: 'اعتبارسنجی میدانی' }, tags: ['validation'], subsections: [] },
                    { id: 'sec-39-4', slug: 'bilinear-iit-validation', number: '39.4', pageStart: 204, title: { en: 'Validation of the Bilinear Form Mapping on IIT Dataset', fa: 'اعتبارسنجی نگاشت فرم دوخطی بر داده IIT' }, tags: ['bilinear-form', 'validation'], subsections: [] },
                    { id: 'sec-39-5', slug: 'epu-emulation-results', number: '39.5', pageStart: 205, title: { en: 'EPU Hardware Emulation Results', fa: 'نتایج شبیه‌سازی سخت‌افزاری EPU' }, tags: ['validation', 'simulation'], subsections: [] },
                ],
            },
            {
                id: 'ch-40', slug: 'safety-validation', number: '40', pageStart: 207,
                title: { en: 'Safety Validation', fa: 'اعتبارسنجی ایمنی' },
                description: { en: 'ASIL-D compliance verification and fault injection test results.', fa: 'تأیید انطباق ASIL-D و نتایج آزمون تزریق خطا.' },
                tags: ['ASIL-D', 'validation'],
                sections: [
                    { id: 'sec-40-1', slug: 'asil-d-compliance', number: '40.1', pageStart: 207, title: { en: 'ASIL-D Compliance', fa: 'تطابق ASIL-D' }, tags: ['ASIL-D'], subsections: [] },
                    { id: 'sec-40-2', slug: 'fault-injection', number: '40.2', pageStart: 208, title: { en: 'Fault Injection', fa: 'آزمون‌های تزریق خطا' }, tags: ['ASIL-D', 'validation'], subsections: [] },
                ],
            },
            {
                id: 'ch-41', slug: 'system-integration', number: '41', pageStart: 211,
                title: { en: 'System Integration', fa: 'یکپارچه‌سازی سامانه' },
                description: { en: 'OEM integration pilot, software-defined vehicle compatibility, deployment readiness, and customer feedback.', fa: 'پایلوت یکپارچه‌سازی OEM، سازگاری با خودروی نرم‌افزارمحور، آمادگی استقرار و بازخورد مشتری.' },
                tags: ['validation', 'autonomous-driving'],
                sections: [
                    { id: 'sec-41-1', slug: 'oem-integration-pilot', number: '41.1', pageStart: 211, title: { en: 'OEM Integration Pilot', fa: 'پایلوت یکپارچه‌سازی OEM' }, tags: ['autonomous-driving'], subsections: [] },
                    { id: 'sec-41-2', slug: 'sdv-compatibility', number: '41.2', pageStart: 212, title: { en: 'Software-Defined Vehicle Compatibility', fa: 'سازگاری با خودروی نرم‌افزارمحور' }, tags: ['autonomous-driving'], subsections: [] },
                    { id: 'sec-41-3', slug: 'deployment-readiness', number: '41.3', pageStart: 213, title: { en: 'Deployment Readiness Assessment', fa: 'ارزیابی آمادگی استقرار' }, tags: ['validation'], subsections: [] },
                    { id: 'sec-41-4', slug: 'customer-feedback', number: '41.4', pageStart: 214, title: { en: 'Customer Feedback and Lessons Learned', fa: 'بازخورد مشتری و درس‌آموخته‌ها' }, tags: ['business'], subsections: [] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    //  PART VIII — Appendices & References
    // ══════════════════════════════════════════════════════════════════════════
    {
        id: 'part-viii',
        slug: 'appendices-references',
        number: 'VIII',
        pageStart: 217,
        title: { en: 'Appendices & References', fa: 'پیوست‌ها و مراجع' },
        description: {
            en: 'Source code, diagrams, mathematical derivations, raw data, full reference list, and research coverage analysis.',
            fa: 'کد منبع، نمودارها، مشتقات ریاضی، داده‌های خام، فهرست کامل مراجع و تحلیل پوشش تحقیقات.',
        },
        tags: ['content'],
        accentColor: 'var(--kb-accent-appendices)',
        chapters: [
            { id: 'ch-42', slug: 'appendix-a-code', number: 'A', pageStart: 219, title: { en: 'Appendix A: Code', fa: 'پیوست الف: کدها' }, isAppendix: true, appendixLetter: 'A', description: { en: 'Source code listings referenced throughout the document.', fa: 'فهرست‌های کد منبع ارجاع‌شده در سرتاسر سند.' }, tags: ['content'], sections: [] },
            { id: 'ch-43', slug: 'appendix-b-diagrams', number: 'B', pageStart: 221, title: { en: 'Appendix B: Diagrams', fa: 'پیوست ب: نمودارها' }, isAppendix: true, appendixLetter: 'B', description: { en: 'Full-resolution architectural and technical diagrams.', fa: 'نمودارهای معماری و فنی با وضوح کامل.' }, tags: ['content'], sections: [] },
            { id: 'ch-44', slug: 'appendix-c-derivations', number: 'C', pageStart: 223, title: { en: 'Appendix C: Derivations', fa: 'پیوست ج: مشتقات' }, isAppendix: true, appendixLetter: 'C', description: { en: 'Full mathematical derivations for theorems and equations cited in the main text.', fa: 'مشتقات ریاضی کامل برای قضایا و معادلات ارجاع‌شده در متن اصلی.' }, tags: ['content', 'bilinear-form'], sections: [] },
            { id: 'ch-45', slug: 'appendix-d-raw-data', number: 'D', pageStart: 225, title: { en: 'Appendix D: Raw Data', fa: 'پیوست د: داده‌ها' }, isAppendix: true, appendixLetter: 'D', description: { en: 'Raw experimental and simulation data sets.', fa: 'مجموعه داده‌های تجربی و شبیه‌سازی خام.' }, tags: ['content', 'simulation'], sections: [] },
            { id: 'ch-46', slug: 'appendix-e-references', number: 'E', pageStart: 227, title: { en: 'Appendix E: References', fa: 'پیوست ه: مراجع' }, isAppendix: true, appendixLetter: 'E', description: { en: 'Complete bibliography and citation list.', fa: 'کتاب‌نامه و فهرست استنادات کامل.' }, tags: ['content'], sections: [] },
            { id: 'ch-47', slug: 'appendix-f-research-coverage', number: 'F', pageStart: 229, title: { en: 'Appendix F: Research Coverage Analysis', fa: 'پیوست و: تحلیل پوشش تحقیقات' }, isAppendix: true, appendixLetter: 'F', description: { en: 'Systematic analysis of research coverage across all technical chapters.', fa: 'تحلیل سیستماتیک پوشش تحقیقات در تمام فصل‌های فنی.' }, tags: ['content'], sections: [] },
        ],
    },
];

// ─── Derived lookups (computed once at module load) ──────────────────────────

export const ALL_NODES = flattenNodes(KB_PARTS);

/** Fast lookup: slug → part */
export const PART_BY_SLUG = Object.fromEntries(KB_PARTS.map((p) => [p.slug, p]));

/** Fast lookup: partSlug → chapterSlug → chapter */
export const CHAPTER_BY_SLUG = {};
KB_PARTS.forEach((part) => {
    CHAPTER_BY_SLUG[part.slug] = {};
    (part.chapters || []).forEach((ch) => {
        CHAPTER_BY_SLUG[part.slug][ch.slug] = ch;
    });
});

/** All unique tags across the entire corpus */
export const ALL_TAGS = [...new Set(ALL_NODES.flatMap((n) => n.tags || []))].sort();

/** Total page count (last chapter end page approximation) */
export const TOTAL_PAGES = 229;