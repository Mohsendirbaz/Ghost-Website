/**
 * libraryAssets.js
 * Canonical data model for Ghost Autonomy Library of Assets
 *
 * Contains 89 high-value files identified from analysis:
 * - TIER 0 (CRITICAL): 18 files - Core PICAPD ISA and strategic documents
 * - TIER 1 (HIGH): 71 files - Technical content (45 Notion + 26 Root)
 *
 * Structure: Tier → Category → Asset
 * Each asset is independently addressable and includes bilingual metadata
 */

export const LIBRARY_TIERS = {
    CRITICAL: 'tier-0-critical',
    HIGH: 'tier-1-high',
    MEDIUM: 'tier-2-medium',
    ARCHIVE: 'tier-3-archive'
};

export const ASSET_STATUS = {
    READY: 'ready',
    IN_PROGRESS: 'in-progress',
    QUEUED: 'queued',
    NEEDS_REVIEW: 'needs-review',
    BLOCKED: 'blocked'
};

export const STATUS_ICONS = {
    [ASSET_STATUS.READY]: '✅',
    [ASSET_STATUS.IN_PROGRESS]: '🔄',
    [ASSET_STATUS.QUEUED]: '⏳',
    [ASSET_STATUS.NEEDS_REVIEW]: '⚠️',
    [ASSET_STATUS.BLOCKED]: '❌'
};

// ─── TIER 0: CRITICAL ASSETS (20 files) ────────────────────────────────────

export const CRITICAL_ASSETS = {
    id: LIBRARY_TIERS.CRITICAL,
    name: { en: 'CRITICAL', fa: 'بحرانی' },
    count: 20,
    priority: 'P0',
    timeline: 'Weeks 1-2',
    description: {
        en: 'Core Ghost Autonomy IP - PICAPD ISA specifications and strategic analysis',
        fa: 'مالکیت معنوی اصلی Ghost Autonomy - مشخصات PICAPD ISA و تحلیل استراتژیک'
    },
    categories: [
        {
            id: 'picapd-isa-en',
            name: { en: 'PICAPD ISA (English)', fa: 'PICAPD ISA (انگلیسی)' },
            count: 8,
            assets: [
                {
                    id: 'picapd-isa-core',
                    filename: 'PICAPD INSTRUCTION SET ARCHITECTURE.md',
                    slug: 'picapd-isa-core-specification',
                    title: {
                        en: 'PICAPD Instruction Set Architecture',
                        fa: 'معماری مجموعه دستورالعمل PICAPD'
                    },
                    description: {
                        en: 'Complete ISA specification with 175+ instructions for 24-core EPU architecture',
                        fa: 'مشخصات کامل ISA با بیش از ۱۷۵ دستورالعمل برای معماری EPU ۲۴ هسته‌ای'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'large',
                    tableCount: 175,
                    targetUrl: '/en/library/assets/picapd-isa-core-specification',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '3 days',
                    bilateralPair: 'مجموعه دستورالعمل PICAPD.md',
                    tags: ['PICAPD-ISA', 'core-architecture', 'instructions', 'EPU'],
                    priority: 1
                },
                {
                    id: 'hardware-isa-pdf',
                    filename: 'Hardware ISA.pdf',
                    slug: 'hardware-isa-reference',
                    title: {
                        en: 'Hardware ISA Reference Manual',
                        fa: 'راهنمای مرجع سخت‌افزار ISA'
                    },
                    description: {
                        en: '54-page technical reference manual v1.0 with 247× GPU speedup benchmarks',
                        fa: 'راهنمای مرجع فنی ۵۴ صفحه‌ای نسخه ۱.۰ با معیارهای ۲۴۷ برابر سرعت بیشتر از GPU'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: '54 pages',
                    targetUrl: '/en/library/assets/hardware-isa-reference',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '2 days',
                    tags: ['PICAPD-ISA', 'hardware', 'benchmarks', 'GPU-comparison'],
                    priority: 2
                },
                {
                    id: 'picapd-silicon',
                    filename: 'PICAPD_Silicon.md',
                    slug: 'picapd-silicon-implementation',
                    title: {
                        en: 'PICAPD Silicon Implementation',
                        fa: 'پیاده‌سازی سیلیکونی PICAPD'
                    },
                    description: {
                        en: '28nm process technology, 24-core layout, physical design details',
                        fa: 'فناوری فرآیند ۲۸ نانومتری، طرح ۲۴ هسته‌ای، جزئیات طراحی فیزیکی'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/en/library/assets/picapd-silicon-implementation',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '2 days',
                    bilateralPair: 'PICAPDسیلیکون فارسی.md',
                    tags: ['PICAPD-ISA', 'silicon', '28nm', 'physical-design'],
                    priority: 3
                },
                {
                    id: 'isa-pdf-alt',
                    filename: 'ISA.pdf',
                    slug: 'isa-specification-alternate',
                    title: {
                        en: 'ISA Specification (Alternate)',
                        fa: 'مشخصات ISA (جایگزین)'
                    },
                    description: {
                        en: 'Alternative ISA version for cross-reference',
                        fa: 'نسخه جایگزین ISA برای مرجع متقابل'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/en/library/assets/isa-specification-alternate',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '1 day',
                    bilateralPair: 'دستورالعمل.pdf',
                    tags: ['PICAPD-ISA', 'reference'],
                    priority: 4
                },
                {
                    id: 'picapd-compressed',
                    filename: 'PICAPD_compressed.pdf',
                    slug: 'picapd-compressed-reference',
                    title: {
                        en: 'PICAPD Compressed Reference',
                        fa: 'مرجع فشرده PICAPD'
                    },
                    description: {
                        en: 'Compressed distribution format for quick reference',
                        fa: 'فرمت توزیع فشرده برای مرجع سریع'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/en/library/assets/picapd-compressed-reference',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '1 day',
                    tags: ['PICAPD-ISA', 'quick-reference'],
                    priority: 5
                },
                {
                    id: 'isa-rectification',
                    filename: 'PICAPD_ISA_Rectification_Main_Context.md',
                    slug: 'isa-rectification-context',
                    title: {
                        en: 'ISA Rectification Context',
                        fa: 'زمینه اصلاح ISA'
                    },
                    description: {
                        en: 'ISA corrections and evolution history',
                        fa: 'تاریخچه اصلاحات و تکامل ISA'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/isa-rectification-context',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '4 hours',
                    tags: ['PICAPD-ISA', 'errata', 'evolution'],
                    priority: 6
                },
                {
                    id: 'isa-v1-0-1-errata',
                    filename: 'PICAPD_v1_0_1_Errata_PatchText.md',
                    slug: 'isa-v1-0-1-errata',
                    title: {
                        en: 'PICAPD v1.0.1 Errata',
                        fa: 'اشکالات PICAPD نسخه ۱.۰.۱'
                    },
                    description: {
                        en: 'Official errata for PICAPD ISA version 1.0.1',
                        fa: 'اشکالات رسمی برای PICAPD ISA نسخه ۱.۰.۱'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/isa-v1-0-1-errata',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '4 hours',
                    tags: ['PICAPD-ISA', 'errata', 'v1.0.1'],
                    priority: 7
                },
                {
                    id: 'isa-v1-1-annex',
                    filename: 'PICAPD_v1_1_Annex_Drafts.md',
                    slug: 'isa-v1-1-annex-drafts',
                    title: {
                        en: 'PICAPD v1.1 Annex Drafts',
                        fa: 'پیش‌نویس ضمائم PICAPD نسخه ۱.۱'
                    },
                    description: {
                        en: 'Draft annexes for next ISA version roadmap',
                        fa: 'پیش‌نویس ضمائم برای نقشه راه نسخه بعدی ISA'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/isa-v1-1-annex-drafts',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '4 hours',
                    tags: ['PICAPD-ISA', 'roadmap', 'v1.1'],
                    priority: 8
                }
            ]
        },
        {
            id: 'picapd-isa-fa',
            name: { en: 'PICAPD ISA (Persian)', fa: 'PICAPD ISA (فارسی)' },
            count: 5,
            assets: [
                {
                    id: 'picapd-isa-core-fa',
                    filename: 'مجموعه دستورالعمل PICAPD.md',
                    slug: 'picapd-isa-core-specification-fa',
                    title: {
                        en: 'PICAPD Instruction Set (Persian)',
                        fa: 'مجموعه دستورالعمل PICAPD'
                    },
                    description: {
                        en: 'Complete PICAPD ISA in Persian with RTL layout',
                        fa: 'PICAPD ISA کامل به فارسی با چیدمان راست‌به‌چپ'
                    },
                    type: 'md',
                    lang: 'fa',
                    size: 'large',
                    targetUrl: '/fa/library/assets/picapd-isa-core-specification-fa',
                    status: ASSET_STATUS.IN_PROGRESS,
                    processingEstimate: '3 days',
                    bilateralPair: 'PICAPD INSTRUCTION SET ARCHITECTURE.md',
                    tags: ['PICAPD-ISA', 'persian', 'RTL'],
                    priority: 1
                },
                {
                    id: 'picapd-silicon-fa',
                    filename: 'PICAPDسیلیکون فارسی.md',
                    slug: 'picapd-silicon-implementation-fa',
                    title: {
                        en: 'PICAPD Silicon (Persian)',
                        fa: 'سیلیکون PICAPD'
                    },
                    description: {
                        en: 'Silicon implementation documentation in Persian',
                        fa: 'مستندات پیاده‌سازی سیلیکونی به فارسی'
                    },
                    type: 'md',
                    lang: 'fa',
                    targetUrl: '/fa/library/assets/picapd-silicon-implementation-fa',
                    status: ASSET_STATUS.IN_PROGRESS,
                    processingEstimate: '2 days',
                    bilateralPair: 'PICAPD_Silicon.md',
                    tags: ['PICAPD-ISA', 'silicon', 'persian', 'RTL'],
                    priority: 2
                },
                {
                    id: 'competitive-analysis-fa',
                    filename: 'تحلیل رقابتی فنی یکپارچه.md',
                    slug: 'competitive-analysis-fa',
                    title: {
                        en: 'Competitive Analysis (Persian)',
                        fa: 'تحلیل رقابتی فنی یکپارچه'
                    },
                    description: {
                        en: 'Unified competitive technical analysis in Persian',
                        fa: 'تحلیل رقابتی فنی یکپارچه به فارسی'
                    },
                    type: 'md',
                    lang: 'fa',
                    targetUrl: '/fa/library/assets/competitive-analysis-fa',
                    status: ASSET_STATUS.IN_PROGRESS,
                    processingEstimate: '2 days',
                    bilateralPair: 'Ghost_Autonomy_Unified_Technical_Analysis_V4.md',
                    tags: ['strategy', 'competitive-analysis', 'persian', 'RTL'],
                    priority: 3
                },
                {
                    id: 'silicon-pdf-fa',
                    filename: 'سیلیکون.pdf',
                    slug: 'silicon-reference-fa',
                    title: {
                        en: 'Silicon Reference (Persian PDF)',
                        fa: 'مرجع سیلیکون (PDF فارسی)'
                    },
                    description: {
                        en: 'Silicon documentation PDF in Persian',
                        fa: 'مستندات سیلیکون PDF به فارسی'
                    },
                    type: 'pdf',
                    lang: 'fa',
                    targetUrl: '/fa/library/assets/silicon-reference-fa',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '1 day',
                    tags: ['PICAPD-ISA', 'silicon', 'persian'],
                    priority: 4
                },
                {
                    id: 'instruction-manual-fa',
                    filename: 'دستورالعمل.pdf',
                    slug: 'instruction-manual-fa',
                    title: {
                        en: 'Instruction Manual (Persian PDF)',
                        fa: 'دستورالعمل (PDF فارسی)'
                    },
                    description: {
                        en: 'PICAPD instruction manual PDF in Persian',
                        fa: 'راهنمای دستورالعمل PICAPD PDF به فارسی'
                    },
                    type: 'pdf',
                    lang: 'fa',
                    targetUrl: '/fa/library/assets/instruction-manual-fa',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '1 day',
                    bilateralPair: 'ISA.pdf',
                    tags: ['PICAPD-ISA', 'instruction-manual', 'persian'],
                    priority: 5
                }
            ]
        },
        {
            id: 'strategic-analysis',
            name: { en: 'Strategic Analysis', fa: 'تحلیل استراتژیک' },
            count: 7,
            assets: [
                {
                    id: 'competitive-analysis-v4',
                    filename: 'Ghost_Autonomy_Unified_Technical_Analysis_V4.md',
                    slug: 'competitive-analysis-v4',
                    title: {
                        en: 'Unified Technical Competitive Analysis V4',
                        fa: 'تحلیل رقابتی فنی یکپارچه نسخه ۴'
                    },
                    description: {
                        en: 'Latest unified competitive analysis covering market positioning and technical advantages',
                        fa: 'آخرین تحلیل رقابتی یکپارچه شامل موقعیت بازار و مزایای فنی'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/en/library/assets/competitive-analysis-v4',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '2 days',
                    bilateralPair: 'تحلیل رقابتی فنی یکپارچه.md',
                    tags: ['strategy', 'competitive-analysis', 'market'],
                    priority: 1
                },
                {
                    id: 'competitive-analysis-v4-pdf',
                    filename: 'Ghost Autonomy - Unified Technical Competitive Analysis V4.pdf',
                    slug: 'competitive-analysis-v4-pdf',
                    title: {
                        en: 'Competitive Analysis V4 (PDF)',
                        fa: 'تحلیل رقابتی نسخه ۴ (PDF)'
                    },
                    description: {
                        en: 'PDF distribution format of V4 competitive analysis',
                        fa: 'فرمت توزیع PDF از تحلیل رقابتی نسخه ۴'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/en/library/assets/competitive-analysis-v4-pdf',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '1 day',
                    tags: ['strategy', 'competitive-analysis', 'PDF'],
                    priority: 2
                },
                {
                    id: 'isa-priority-improvements',
                    filename: 'Highest-impact spec fixes for ISA.md',
                    slug: 'isa-priority-improvements',
                    title: {
                        en: 'ISA Priority Improvements',
                        fa: 'بهبودهای اولویت‌دار ISA'
                    },
                    description: {
                        en: 'High-impact specification fixes and improvements for PICAPD ISA',
                        fa: 'اصلاحات و بهبودهای با تاثیر بالا برای مشخصات PICAPD ISA'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/isa-priority-improvements',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '4 hours',
                    tags: ['PICAPD-ISA', 'technical-debt', 'roadmap'],
                    priority: 3
                },
                {
                    id: 'stop-5-automotive-perception',
                    filename: 'PICAPD_Platform_Profile_STOP5_Automotive_Perception.md',
                    slug: 'stop-5-automotive-perception',
                    title: {
                        en: 'STOP-5 Automotive Perception',
                        fa: 'ادراک خودرویی STOP-5'
                    },
                    description: {
                        en: 'STOP-5 automotive perception use case with PICAPD platform integration',
                        fa: 'مورد استفاده ادراک خودرویی STOP-5 با یکپارچه‌سازی پلتفرم PICAPD'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/stop-5-automotive-perception',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '6 hours',
                    tags: ['autonomous-driving', 'perception', 'STOP-5', 'use-case'],
                    priority: 4
                },
                {
                    id: 'stop-5-bitvector',
                    filename: 'STOP_5_Bitvector_Index.md',
                    slug: 'stop-5-bitvector-indexing',
                    title: {
                        en: 'STOP-5 Bitvector Indexing',
                        fa: 'نمایه‌سازی بیت‌برداری STOP-5'
                    },
                    description: {
                        en: 'Bitvector indexing algorithm for STOP-5 perception pipeline',
                        fa: 'الگوریتم نمایه‌سازی بیت‌برداری برای خط لوله ادراک STOP-5'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/stop-5-bitvector-indexing',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'bitvector', 'STOP-5', 'algorithm'],
                    priority: 5
                },
                {
                    id: 'forensic-case-tesla',
                    filename: 'forensic_case_of_Tesla.pdf',
                    slug: 'forensic-case-tesla',
                    title: {
                        en: 'Forensic Case of Tesla',
                        fa: 'مورد پزشکی قانونی تسلا'
                    },
                    description: {
                        en: 'Forensic analysis and case study of Tesla autonomous driving systems',
                        fa: 'تحلیل پزشکی قانونی و مطالعه موردی سیستم‌های رانندگی خودکار تسلا'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/forensic_case_of_Tesla.pdf',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '2 hours',
                    tags: ['forensic-analysis', 'tesla', 'case-study', 'autonomous-driving'],
                    priority: 6
                },
                {
                    id: 'still-a-worm',
                    filename: 'Still a Worm.pdf',
                    slug: 'still-a-worm',
                    title: {
                        en: 'Still a Worm',
                        fa: 'هنوز یک کرم'
                    },
                    description: {
                        en: 'Technical analysis and research on worm malware and cybersecurity implications',
                        fa: 'تحلیل فنی و تحقیق در مورد بدافزار کرم و پیامدهای امنیت سایبری'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/Still a Worm.pdf',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '2 hours',
                    tags: ['security', 'malware', 'worm', 'cybersecurity', 'analysis'],
                    priority: 7
                }
            ]
        }
    ]
};

// ─── TIER 1: HIGH PRIORITY ASSETS (71 files) ───────────────────────────────

export const HIGH_ASSETS = {
    id: LIBRARY_TIERS.HIGH,
    name: { en: 'HIGH', fa: 'بالا' },
    count: 71,
    priority: 'P1-P2',
    timeline: 'Weeks 3-8',
    description: {
        en: 'Technical content - Autonomous vehicles research and L4 AV applications',
        fa: 'محتوای فنی - تحقیقات خودروهای خودران و کاربردهای L4 AV'
    },
    categories: [
        {
            id: 'av-core-decision-making',
            name: { en: 'AV Core Decision-Making', fa: 'تصمیم‌گیری اصلی خودرو خودران' },
            count: 3,
            source: 'Notion 2025',
            assets: [
                {
                    id: 'av-research-note',
                    filename: 'Autonomous Vehicles — Research Note.md',
                    slug: 'av-research-note',
                    title: {
                        en: 'Autonomous Vehicles — Research Note',
                        fa: 'خودروهای خودران — یادداشت تحقیقاتی'
                    },
                    description: {
                        en: 'Dynamic problem formulation, collision avoidance, reasoning stack architecture, real-time optimization',
                        fa: 'فرمول‌بندی پویای مسئله، اجتناب از برخورد، معماری پشته استدلال، بهینه‌سازی زمان‌واقعی'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/av-research-note',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '6 hours',
                    tags: ['autonomous-driving', 'decision-making', 'optimization', 'collision-avoidance'],
                    priority: 1
                },
                {
                    id: 'physics-informed-architecture',
                    filename: 'Physics-Informed Architecture Equation-Sensor-Cont 97d2931724e84e649d5d6aab025efa35.md',
                    slug: 'physics-informed-architecture',
                    title: {
                        en: 'Physics-Informed Architecture: Equation-Sensor-Control Trichotomy',
                        fa: 'معماری فیزیک-محور: سه‌گانگی معادله-حسگر-کنترل'
                    },
                    description: {
                        en: 'PICAPD-aligned architecture with hyperbolic/parabolic PDEs, sensor modalities, MPC',
                        fa: 'معماری هم‌راستا با PICAPD با معادلات دیفرانسیل هذلولوی/سهموی، روش‌های حسگری، MPC'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/physics-informed-architecture',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '8 hours',
                    tags: ['physics-computing', 'architecture', 'PDEs', 'sensors', 'MPC'],
                    priority: 2
                },
                {
                    id: 'adaptive-signal-multiplexer',
                    filename: 'Adaptive Signal Multiplexer with Dynamic Problem F 7615112ab78b4713aa2f5b4703746ba4.md',
                    slug: 'adaptive-signal-multiplexer',
                    title: {
                        en: 'Adaptive Signal Multiplexer with Dynamic Problem Formulation',
                        fa: 'چندسازی سیگنال تطبیقی با فرمول‌بندی پویای مسئله'
                    },
                    description: {
                        en: 'Real-time optimization, structure detection, solver selection, physics-informed constraints',
                        fa: 'بهینه‌سازی زمان‌واقعی، تشخیص ساختار، انتخاب حل‌کننده، محدودیت‌های فیزیک-محور'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/adaptive-signal-multiplexer',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '8 hours',
                    tags: ['optimization', 'signal-processing', 'adaptive-systems', 'real-time'],
                    priority: 3
                }
            ]
        },
        {
            id: 'mathematical-foundations',
            name: { en: 'Mathematical Foundations', fa: 'مبانی ریاضی' },
            count: 3,
            source: 'Notion 2025',
            assets: [
                {
                    id: 'invariant-discovery',
                    filename: 'Invariant Discovery & Validation 9866838a120b4a9284715fb7f20f817a.md',
                    slug: 'invariant-discovery',
                    title: {
                        en: 'Invariant Discovery & Validation',
                        fa: 'کشف و اعتبارسنجی ناوردا'
                    },
                    description: {
                        en: 'Mathematical invariants, cross-GT validation, framework calibration, coherence budget',
                        fa: 'ناورداهای ریاضی، اعتبارسنجی متقابل GT، کالیبراسیون چارچوب، بودجه انسجام'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/invariant-discovery',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '6 hours',
                    tags: ['mathematics', 'validation', 'invariants', 'calibration'],
                    priority: 1
                },
                {
                    id: 'severity-weighted-optimization',
                    filename: 'Optimization Algorithm Leaving no stone unturned 2a6f832e52ca80089370ffe01876d4af.md',
                    slug: 'severity-weighted-optimization',
                    title: {
                        en: 'Optimization Algorithm: Leaving No Stone Unturned',
                        fa: 'الگوریتم بهینه‌سازی: بررسی همه جوانب'
                    },
                    description: {
                        en: 'Severity-weighted multi-dimensional optimization with critical dominance property',
                        fa: 'بهینه‌سازی چندبعدی وزن‌دار شدت با ویژگی سلطه بحرانی'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/severity-weighted-optimization',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '6 hours',
                    tags: ['optimization', 'algorithms', 'severity-weighting', 'multi-dimensional'],
                    priority: 2
                },
                {
                    id: 'predictive-temporal-framework',
                    filename: 'A mathematical framework with predictive temporal  2b9f832e52ca80558e27d58907cf130e.md',
                    slug: 'predictive-temporal-framework',
                    title: {
                        en: 'Mathematical Framework with Predictive Temporal Elements',
                        fa: 'چارچوب ریاضی با عناصر زمانی پیش‌بینی‌کننده'
                    },
                    description: {
                        en: 'Physics-informed special functions, conservation laws, reduced-order modeling, AGM algorithm',
                        fa: 'توابع ویژه فیزیک-محور، قوانین بقا، مدل‌سازی مرتبه کاهش‌یافته، الگوریتم AGM'
                    },
                    type: 'md',
                    lang: 'en',
                    targetUrl: '/en/library/assets/predictive-temporal-framework',
                    status: ASSET_STATUS.READY,
                    processingEstimate: '8 hours',
                    tags: ['mathematics', 'physics-computing', 'conservation-laws', 'AGM'],
                    priority: 3
                }
            ]
        },
        {
            id: 'l4-av-documentation',
            name: { en: 'L4 Autonomous Vehicle Documentation', fa: 'مستندات خودروی خودران سطح ۴' },
            count: 6,
            source: 'Root Directory',
            assets: [
                {
                    id: 'l4-emerging-technologies',
                    filename: 'Advanced and Emerging Technologies for L4 Autonomous Vehicles.docx',
                    slug: 'l4-emerging-technologies',
                    title: {
                        en: 'Advanced and Emerging Technologies for L4 Autonomous Vehicles',
                        fa: 'فناوری‌های پیشرفته و نوظهور برای خودروهای خودران سطح ۴'
                    },
                    description: {
                        en: 'Comprehensive overview of emerging technologies for L4 autonomous driving',
                        fa: 'بررسی جامع فناوری‌های نوظهور برای رانندگی خودکار سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-emerging-technologies',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'emerging-tech', 'overview'],
                    priority: 1
                },
                {
                    id: 'l4-computing-architectures',
                    filename: 'Processor & Computing Architectures for L4 Autonomous Vehicles.docx',
                    slug: 'l4-computing-architectures',
                    title: {
                        en: 'Processor & Computing Architectures for L4 Autonomous Vehicles',
                        fa: 'پردازنده و معماری‌های محاسباتی برای خودروهای خودران سطح ۴'
                    },
                    description: {
                        en: 'Computing architecture requirements and options for L4 autonomous systems',
                        fa: 'نیازمندی‌ها و گزینه‌های معماری محاسباتی برای سیستم‌های خودران سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-computing-architectures',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'computing', 'architecture'],
                    priority: 2
                },
                {
                    id: 'l4-sensor-fusion',
                    filename: 'Sensors & Sensing Technologies for Level 4 Autonomous Vehicles.docx',
                    slug: 'l4-sensor-fusion',
                    title: {
                        en: 'Sensors & Sensing Technologies for Level 4 Autonomous Vehicles',
                        fa: 'حسگرها و فناوری‌های حسگری برای خودروهای خودران سطح ۴'
                    },
                    description: {
                        en: 'Sensor modalities, fusion strategies, and perception systems for L4 AVs',
                        fa: 'روش‌های حسگری، استراتژی‌های ترکیب، و سیستم‌های ادراک برای خودروهای خودران سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-sensor-fusion',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'sensors', 'fusion', 'perception'],
                    priority: 3
                },
                {
                    id: 'l4-functional-safety',
                    filename: 'Functional Safety & Standards for L4 Autonomous Systems.docx',
                    slug: 'l4-functional-safety',
                    title: {
                        en: 'Functional Safety & Standards for L4 Autonomous Systems',
                        fa: 'ایمنی عملکردی و استانداردها برای سیستم‌های خودران سطح ۴'
                    },
                    description: {
                        en: 'Safety standards, certification requirements, and functional safety for L4 systems',
                        fa: 'استانداردهای ایمنی، نیازمندی‌های گواهی، و ایمنی عملکردی برای سیستم‌های سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-functional-safety',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'safety', 'standards', 'ASIL-D'],
                    priority: 4
                },
                {
                    id: 'l4-automotive-systems',
                    filename: 'Automotive-Specific Systems & Applications for L4 Autonomy.docx',
                    slug: 'l4-automotive-systems',
                    title: {
                        en: 'Automotive-Specific Systems & Applications for L4 Autonomy',
                        fa: 'سیستم‌ها و کاربردهای ویژه خودرویی برای خودمختاری سطح ۴'
                    },
                    description: {
                        en: 'Automotive-specific systems integration for L4 autonomous vehicles',
                        fa: 'یکپارچه‌سازی سیستم‌های ویژه خودرویی برای خودروهای خودران سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-automotive-systems',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'automotive', 'systems-integration'],
                    priority: 5
                },
                {
                    id: 'l4-numerical-methods',
                    filename: 'Numerical Methods & Precision in L4 Autonomous Systems.docx',
                    slug: 'l4-numerical-methods',
                    title: {
                        en: 'Numerical Methods & Precision in L4 Autonomous Systems',
                        fa: 'روش‌های عددی و دقت در سیستم‌های خودران سطح ۴'
                    },
                    description: {
                        en: 'Numerical computation methods and precision requirements for L4 systems',
                        fa: 'روش‌های محاسبات عددی و نیازمندی‌های دقت برای سیستم‌های سطح ۴'
                    },
                    type: 'docx',
                    lang: 'en',
                    targetUrl: '/en/library/assets/l4-numerical-methods',
                    status: ASSET_STATUS.NEEDS_REVIEW,
                    processingEstimate: '4 hours',
                    tags: ['autonomous-driving', 'L4', 'numerical-methods', 'precision'],
                    priority: 6
                }
            ]
        }
    ]
};

// Note: Remaining 59 HIGH assets (from Notion 2025) can be added incrementally
// Full list available in: notion-2025-analysis-for-ghost-autonomy-website.md

// ─── Utility Functions ──────────────────────────────────────────────────────

/**
 * Flatten all assets across tiers and categories into a searchable array
 */
export function flattenAssets(tiers) {
    const assets = [];
    tiers.forEach(tier => {
        tier.categories.forEach(category => {
            (category.assets || []).forEach(asset => {
                assets.push({
                    ...asset,
                    tierId: tier.id,
                    tierName: tier.name,
                    categoryId: category.id,
                    categoryName: category.name,
                    categorySource: category.source
                });
            });
        });
    });
    return assets;
}

/**
 * Build URL path for any asset
 */
export function buildAssetPath(lang, slug) {
    return `/${lang}/library/assets/${slug}`;
}

/**
 * Get asset by ID from all tiers
 */
export function getAssetById(id, tiers = [CRITICAL_ASSETS, HIGH_ASSETS]) {
    const allAssets = flattenAssets(tiers);
    return allAssets.find(asset => asset.id === id);
}

/**
 * Get bilateral pair for an asset (if exists)
 */
export function getBilateralPair(asset, tiers = [CRITICAL_ASSETS, HIGH_ASSETS]) {
    if (!asset.bilateralPair) return null;
    const allAssets = flattenAssets(tiers);
    return allAssets.find(a => a.filename === asset.bilateralPair);
}

/**
 * Filter assets by status
 */
export function filterByStatus(assets, status) {
    return assets.filter(asset => asset.status === status);
}

/**
 * Filter assets by language
 */
export function filterByLanguage(assets, lang) {
    return assets.filter(asset => asset.lang === lang);
}

/**
 * Filter assets by tags
 */
export function filterByTags(assets, tags) {
    return assets.filter(asset =>
        asset.tags && asset.tags.some(tag => tags.includes(tag))
    );
}

// Export all tiers for easy import
export const ALL_TIERS = [CRITICAL_ASSETS, HIGH_ASSETS];

// Export summary statistics
export const LIBRARY_STATS = {
    totalAssets: 91,
    critical: 20,
    high: 71,
    bilingualPairs: 21,
    readyAssets: 17,
    inProgressAssets: 3,
    needsReviewAssets: 5
};
