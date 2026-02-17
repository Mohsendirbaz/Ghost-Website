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
    dashboard:      { en: 'Dashboard',              fa: 'داشبورد'             },
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

    // ── Signal Multiplexer Interactive Visualization ──────────────────────────

    {
        id: 'signal-multiplexer-viz',
        slug: 'signal-multiplexer-viz',
        category: 'interactive',
        tags: ['signal-processing', 'multiplexing', 'optimization', 'real-time', 'TDM', 'FDM', 'CDM', 'PICAPD-ISA', 'physics-enforced'],
        localFile: {
            type: 'html',
            // Single technical visualization — same file for both languages
            paths: {
                en: '/docs/html/signal-multiplexer-viz.html',
                fa: '/docs/html/signal-multiplexer-viz.html',
            },
            filenames: {
                en: 'Signal_Multiplexer_Viz.html',
                fa: 'Signal_Multiplexer_Viz.html',
            },
        },
        en: {
            title: 'Adaptive Signal Multiplexer Visualization',
            description:
                'Interactive real-time simulation of the Ghost Autonomy adaptive signal multiplexer — a 7-step optimization loop (OBSERVE → FORMULATE → DETECT → SELECT → SYNTHESIZE → SOLVE → APPLY) for dynamic bandwidth allocation across TDM, FDM, and CDM channels with physics-enforced constraints.',
        },
        fa: {
            title: 'تصویرسازی مالتی‌پلکسر سیگنال تطبیقی',
            description:
                'شبیه‌سازی تعاملی و بلادرنگ مالتی‌پلکسر سیگنال تطبیقی Ghost Autonomy — یک حلقه بهینه‌سازی ۷ مرحله‌ای برای تخصیص پویای پهنای باند با محدودیت‌های اجبارشده توسط فیزیک در کانال‌های TDM، FDM و CDM.',
        },
    },

    // ── HTML Dashboards (bilingual) ───────────────────────────────────────────

    {
        id: 'dashboard-av-data-stream',
        slug: 'av-data-stream-architecture',
        category: 'dashboard',
        tags: ['architecture', 'data-stream', 'sensors', 'real-time', 'autonomous-vehicle'],
        localFile: {
            type: 'html',
            paths: {
                en: '/docs/html/Dashboard1-English.html',
                fa: '/docs/html/Dashboard1-Farsi.html',
            },
            filenames: {
                en: 'AV_Data_Stream_Architecture_EN.html',
                fa: 'AV_Data_Stream_Architecture_FA.html',
            },
        },
        en: {
            title: 'Autonomous Vehicle Data Stream Architecture',
            description: 'Complete data pipeline from sensor to actuator with real-time constraints — visualizing the full AV information flow across perception, planning, and control layers.',
        },
        fa: {
            title: 'معماری جریان داده خودروی خودران',
            description: 'خط لوله داده کامل از حسگر تا محرک با محدودیت‌های بلادرنگ — تصویرسازی جریان اطلاعات در لایه‌های ادراک، برنامه‌ریزی و کنترل.',
        },
    },

    {
        id: 'dashboard-av-info-architecture',
        slug: 'av-information-architecture',
        category: 'dashboard',
        tags: ['architecture', 'information', 'autonomous-vehicle', 'PICAPD', 'system-design'],
        localFile: {
            type: 'html',
            paths: {
                en: '/docs/html/Dashboard2-English.html',
                fa: '/docs/html/Dashboard2-Farsi.html',
            },
            filenames: {
                en: 'AV_Information_Architecture_EN.html',
                fa: 'AV_Information_Architecture_FA.html',
            },
        },
        en: {
            title: 'Autonomous Vehicle Information Architecture',
            description: 'System-level information architecture for autonomous vehicles, detailing data flows, processing layers, and control hierarchies within the Ghost Autonomy framework.',
        },
        fa: {
            title: 'معماری اطلاعات خودروی خودران',
            description: 'معماری اطلاعات در سطح سیستم برای خودروهای خودران، شامل جریان‌های داده، لایه‌های پردازش و سلسله‌مراتب کنترل در چارچوب Ghost Autonomy.',
        },
    },

    {
        id: 'dashboard-race-condition-mitigation',
        slug: 'race-condition-mitigation-framework',
        category: 'dashboard',
        tags: ['safety', 'race-condition', 'real-time', 'fault-tolerance', 'formal-verification'],
        localFile: {
            type: 'html',
            paths: {
                en: '/docs/html/Dashboard3-English.html',
                fa: '/docs/html/Dashboard3-Farsi.html',
            },
            filenames: {
                en: 'Race_Condition_Mitigation_EN.html',
                fa: 'Race_Condition_Mitigation_FA.html',
            },
        },
        en: {
            title: 'Race Condition Mitigation Framework',
            description: 'Framework for identifying and mitigating race conditions in autonomous vehicle control systems, with formal verification strategies and temporal constraint analysis.',
        },
        fa: {
            title: 'چارچوب کاهش شرایط مسابقه',
            description: 'چارچوبی برای شناسایی و کاهش شرایط مسابقه در سیستم‌های کنترل خودروی خودران، با استراتژی‌های تأیید رسمی و تحلیل محدودیت‌های زمانی.',
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
