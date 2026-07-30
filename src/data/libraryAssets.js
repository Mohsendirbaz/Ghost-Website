/**
 * libraryAssets.js
 * Canonical data model for Ghost Autonomy Library of Assets
 *
 * Contains 109 high-value files identified from analysis:
 * - TIER 0 (CRITICAL): 38 files - Foundational corpus (2026), core PICAPD ISA and strategic documents
 * - TIER 1 (HIGH): 71 files - Technical content (45 Notion + 26 Root)
 *
 * Structure: Tier → Category → Asset
 * Each asset is independently addressable and includes bilingual metadata
 *
 * June–July 2026 refresh: the "Foundational Corpus (2026)" category publishes the
 * program's public research corpus. Internal syntheses, confidential/trade-secret
 * documentation, and parameter-level hardware specifications are intentionally
 * NOT published on the public site.
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

// ─── TIER 0: CRITICAL ASSETS (38 files) ────────────────────────────────────

export const CRITICAL_ASSETS = {
    id: LIBRARY_TIERS.CRITICAL,
    name: { en: 'CRITICAL', fa: 'بحرانی' },
    count: 38,
    priority: 'P0',
    timeline: 'Weeks 1-2',
    description: {
        en: 'Core Ghost Autonomy IP - the 2026 foundational corpus, PICAPD ISA specifications and strategic analysis',
        fa: 'مالکیت معنوی اصلی Ghost Autonomy - پیکره بنیادین ۲۰۲۶، مشخصات PICAPD ISA و تحلیل استراتژیک'
    },
    categories: [
        {
            id: 'foundational-corpus-2026',
            name: { en: 'Foundational Corpus (2026)', fa: 'پیکره بنیادین (۲۰۲۶)' },
            count: 10,
            assets: [
                {
                    id: 'ten-articles-corpus',
                    filename: 'Ten_Articles_Corrected.pdf',
                    slug: 'ten-foundational-articles',
                    title: {
                        en: 'Provably Bounded Autonomous Driving — Ten Foundational Articles',
                        fa: 'رانندگی خودران با کران‌های اثبات‌پذیر — ده مقاله بنیادین'
                    },
                    description: {
                        en: '89-page consolidated project corpus (May 2026): constraint propagation from epistemology to actuation, the fidelity gate as a trusted scalar, risk-monotone actuation, and the timing-contracted analog veto — with explicit limitations and what remains to be built.',
                        fa: 'پیکره تلفیقی ۸۹ صفحه‌ای پروژه (مه ۲۰۲۶): انتشار قید از معرفت‌شناسی تا عملگر، دروازه وفاداری به‌مثابه اسکالر مورد اعتماد، جبر عملگری یکنوا با ریسک، و وتوی آنالوگ با قرارداد زمانی — همراه با محدودیت‌های صریح و آنچه هنوز باید ساخته شود.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: '89 pages',
                    targetUrl: '/docs/pdf/Ten_Articles_Corrected.pdf',
                    cover: '/covers/Ten_Articles_Corrected.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['corpus', 'bounded-autonomy', 'safety', 'synthesis'],
                    priority: 1
                },
                {
                    id: 'revised-manuscript-2026',
                    filename: 'Special_Function_Feature_Maps_Manuscript.pdf',
                    slug: 'special-function-feature-maps-manuscript',
                    title: {
                        en: 'Special-Function Feature Maps for Reduced-Order Surrogate Modeling (Revised Manuscript)',
                        fa: 'نگاشت‌های ویژگیِ توابع خاص برای مدل‌سازی جایگزین مرتبه‌کاسته (دست‌نوشته بازنگری‌شده)'
                    },
                    description: {
                        en: 'Revised manuscript (June 2026): a deterministic five-stage feature-map pipeline with provable AGM convergence, explicit conservation verification, R² ≈ 0.78–0.87 within the demonstrated envelope — and a stated non-claims section.',
                        fa: 'دست‌نوشته بازنگری‌شده (ژوئن ۲۰۲۶): خط لوله قطعی پنج‌مرحله‌ای نگاشت ویژگی با همگرایی اثبات‌پذیر AGM، راستی‌آزمایی صریح پایستگی، و R² ≈ ۰٫۷۸–۰٫۸۷ در محدوده نشان‌داده‌شده — همراه با بخش صریح «آنچه ادعا نمی‌شود».'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Special_Function_Feature_Maps_Manuscript.pdf',
                    cover: '/covers/Special_Function_Feature_Maps_Manuscript.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['manuscript', 'surrogate-modeling', 'elliptic-integrals', 'agm'],
                    priority: 2
                },
                {
                    id: 'quantum-info-research-statement',
                    filename: 'Quantum_Information_Research_Statement.pdf',
                    slug: 'computational-structures-research-statement',
                    title: {
                        en: 'Computational Structures and the Quantum Information Architecture of Spacetime — Research Statement',
                        fa: 'ساختارهای محاسباتی و معماری اطلاعات کوانتومی فضازمان — بیانیه پژوهشی'
                    },
                    description: {
                        en: '90-page research statement (June 2026): an explicitly exploratory, falsifiable investigation of numerical structures aligning with fundamental cosmological parameters. Presented as open research, not established result.',
                        fa: 'بیانیه پژوهشی ۹۰ صفحه‌ای (ژوئن ۲۰۲۶): کاوشی صراحتاً اکتشافی و ابطال‌پذیر درباره هم‌راستایی ساختارهای عددی با پارامترهای بنیادی کیهان‌شناختی. به‌عنوان پژوهش باز ارائه شده است، نه یافته تثبیت‌شده.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: '90 pages',
                    targetUrl: '/docs/pdf/Quantum_Information_Research_Statement.pdf',
                    cover: '/covers/Quantum_Information_Research_Statement.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['research-statement', 'elliptic-integrals', 'information-theory', 'exploratory'],
                    priority: 3
                },
                {
                    id: 'algorithm-methodology-chapter',
                    filename: 'Algorithm_Methodology_Chapter.pdf',
                    slug: 'methodology-algorithm-derivation',
                    title: {
                        en: 'Methodology — Full Algorithm Derivation and Biomass Datasets',
                        fa: 'روش‌شناسی — استخراج کامل الگوریتم و داده‌های زیست‌توده'
                    },
                    description: {
                        en: '55-page methodology chapter: canonical correlation analysis of biomass properties, the complete derivation of the special-function pipeline, and the compiled experimental datasets.',
                        fa: 'فصل روش‌شناسی ۵۵ صفحه‌ای: تحلیل همبستگی متعارف ویژگی‌های زیست‌توده، استخراج کامل خط لوله توابع خاص، و داده‌های تجربی گردآوری‌شده.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: '55 pages',
                    targetUrl: '/docs/pdf/Algorithm_Methodology_Chapter.pdf',
                    cover: '/covers/Algorithm_Methodology_Chapter.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['methodology', 'cca', 'datasets', 'derivation'],
                    priority: 4
                },
                {
                    id: 'autonomous-driving-considerations',
                    filename: 'Autonomous_Driving_Considerations_EN.md',
                    slug: 'autonomous-driving-considerations',
                    title: {
                        en: 'Autonomous Driving Considerations — Complete English Corpus',
                        fa: 'ملاحظات رانندگی خودران — پیکره کامل انگلیسی'
                    },
                    description: {
                        en: 'A 45,000-word corpus of source argumentation on autonomous-driving complexity: build-time versus runtime agents, path-narrating dust, sensing regimes, and the operational edges where autonomy is actually won or lost.',
                        fa: 'پیکره‌ای ۴۵هزار کلمه‌ای از استدلال‌های بنیادی درباره پیچیدگی رانندگی خودران: عامل‌های زمانِ ساخت در برابر زمانِ اجرا، غبار روایتگر مسیر، رژیم‌های حسگری، و لبه‌های عملیاتی‌ای که خودرانی به‌واقع در آنها برد یا باخت می‌شود.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/md/Autonomous_Driving_Considerations_EN.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['corpus', 'autonomous-driving', 'argumentation', 'sensing'],
                    priority: 5
                },
                {
                    id: 'metabolic-memory-architecture',
                    filename: 'Metabolic_Memory_Architecture.md',
                    slug: 'metabolic-memory-architecture',
                    title: {
                        en: 'The Metabolic Memory Architecture',
                        fa: 'معماری حافظه متابولیک'
                    },
                    description: {
                        en: 'Residence-time-stratified learning policy: memory as a governed metabolic organ — admission, retention, and eviction under budget, with verification burden strengthening monotonically with residence time.',
                        fa: 'سیاست یادگیری لایه‌بندی‌شده بر اساس زمان اقامت: حافظه به‌مثابه اندام متابولیکِ حاکمیت‌شده — پذیرش، نگهداشت و حذف تحت بودجه، با بار راستی‌آزمایی‌ای که با زمان اقامت به‌طور یکنوا سنگین‌تر می‌شود.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/md/Metabolic_Memory_Architecture.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['memory', 'safety', 'learning-policy', 'governance'],
                    priority: 6
                },
                {
                    id: 'arc-sensory-architecture',
                    filename: 'ARC_Sensory_Architecture_EN.md',
                    slug: 'arc-sensory-architecture',
                    title: {
                        en: 'ARC Sensory Architecture — Reception Continuity and Fibrous Receptors',
                        fa: 'معماری حسی ARC — پیوستگی دریافت و گیرنده‌های رشته‌ای'
                    },
                    description: {
                        en: 'The reception-continuity thesis: receptors as continuous, velocity-sensitive absorption surfaces — fiber-like filaments recording momentum at different speeds without rupturing phenomenon–sensor–model synchronization.',
                        fa: 'تز پیوستگی دریافت: گیرنده‌ها به‌مثابه سطوح جذب پیوسته و حساس به سرعت — رشته‌هایی الیاف‌گونه که تکانه را در سرعت‌های مختلف ثبت می‌کنند، بی‌آنکه هم‌زمانی پدیده–حسگر–مدل گسسته شود.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/md/ARC_Sensory_Architecture_EN.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['sensing', 'receptors', 'architecture', 'continuity'],
                    priority: 7
                },
                {
                    id: 'phd-dissertation-asset',
                    filename: 'PhD_Dissertation_Neural_Network_Biomass_Gasification.pdf',
                    slug: 'phd-dissertation',
                    title: {
                        en: 'PhD Dissertation — Neural-Network Modeling of Biomass Gasification (IIT)',
                        fa: 'رسالهٔ دکتری — مدل‌سازی شبکهٔ عصبی گازی‌سازی زیست‌توده (IIT)'
                    },
                    description: {
                        en: 'The original doctoral research (Illinois Institute of Technology): the empirical and methodological taproot from which the entire program grows. Published in full as a public academic record.',
                        fa: 'پژوهش اصیل دکتری (مؤسسه فناوری ایلینوی): ریشهٔ تجربی و روش‌شناختی‌ای که کل برنامه از آن روییده است. به‌عنوان سند علمی عمومی به‌طور کامل منتشر شده است.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/PhD_Dissertation_Neural_Network_Biomass_Gasification.pdf',
                    cover: '/covers/PhD_Dissertation_Neural_Network_Biomass_Gasification.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['dissertation', 'iit', 'gasification', 'neural-networks'],
                    priority: 8
                },
                {
                    id: 'special-function-framework-asset',
                    filename: 'Physics_Informed_Special_Function_Framework.pdf',
                    slug: 'special-function-framework',
                    title: {
                        en: 'A Special-Function-Parameterized Heuristic Reduced-Order Model (Revised)',
                        fa: 'مدل مرتبه‌کاستهٔ اکتشافی با پارامتری‌سازی توابع خاص (بازنگری‌شده)'
                    },
                    description: {
                        en: 'The theoretical core, revised edition (2026): AGM/elliptic-integral parameterizations of a learned reduced model, validated on biomass gasification — with an explicit scope statement of what is and is not claimed; conservation is checked separately, not assumed from the form.',
                        fa: 'هستهٔ نظری، ویراست بازنگری‌شده (۲۰۲۶): پارامتری‌سازی AGM/بیضوی یک مدل کاستهٔ آموخته، اعتبارسنجی‌شده بر گازی‌سازی زیست‌توده — با بیانیهٔ صریح دامنهٔ ادعا؛ پایستگی جداگانه بررسی می‌شود، نه مفروض از فرم.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Physics_Informed_Special_Function_Framework.pdf',
                    cover: '/covers/Physics_Informed_Special_Function_Framework.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['elliptic-integrals', 'agm', 'framework', 'conservation'],
                    priority: 9
                },
                {
                    id: 'permanently-in-transient',
                    filename: 'Permanently_in_Transient.pdf',
                    slug: 'permanently-in-transient',
                    title: {
                        en: 'Permanently in Transient — Operationalizing Long-Memory Dynamics',
                        fa: 'برای همیشه در گذرا — عملیاتی‌سازی دینامیک حافظه‌بلند'
                    },
                    description: {
                        en: 'July 2026, the newest document in the corpus: long-memory filter dynamics turned from pathology into instrument for the AV sensory suite, with numerical demonstrations. Third companion in the elliptic/Kalman series.',
                        fa: 'ژوئیه ۲۰۲۶، تازه‌ترین سند پیکره: دینامیک حافظه‌بلند فیلترها از یک آسیب به یک ابزار برای مجموعهٔ حسی خودرو تبدیل می‌شود، همراه با نمایش‌های عددی. سومین هم‌نشین در سری بیضوی/کالمن.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/pdf/Permanently_in_Transient.pdf',
                    cover: '/covers/Permanently_in_Transient.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['filters', 'kalman', 'sensing', 'signal-processing'],
                    priority: 10
                },
                {
                    id: 'climate-policy-benefit-distribution',
                    filename: 'Climate_Policy_Benefit_Distribution.pdf',
                    slug: 'climate-policy-benefit-distribution',
                    title: {
                        en: 'Benefit Distribution in Climate Investment (Revised)',
                        fa: 'توزیع منافع در سرمایه‌گذاری اقلیمی (بازنگری‌شده)'
                    },
                    description: {
                        en: 'Allocation architecture and a techno-economic assessment of distributed biomass-to-hydrogen pathways (revised, July 2026): institutional economics, policy guardrails against categorical framing, and modeled levelized costs stated with their financing assumptions — evidence graded strong / moderate / suggestive throughout.',
                        fa: 'معماری تخصیص و ارزیابی فنی-اقتصادی مسیرهای توزیع‌شدهٔ زیست‌توده به هیدروژن (بازنگری، ژوئیهٔ ۲۰۲۶): اقتصاد نهادی، ریل‌های محافظ سیاستی در برابر قاب‌بندی مقوله‌ای، و هزینه‌های ترازشدهٔ مدل‌شده همراه با مفروضات تأمین مالی — شواهد در سراسر متن درجه‌بندی شده‌اند.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Climate_Policy_Benefit_Distribution.pdf',
                    cover: '/covers/Climate_Policy_Benefit_Distribution.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['climate-policy', 'techno-economics', 'hydrogen', 'gasification', 'allocation'],
                    priority: 9
                }
            ]
        },
        {
            id: 'safety-control-papers-2026',
            name: { en: 'Safety & Control Papers (2026)', fa: 'مقالات ایمنی و کنترل (۲۰۲۶)' },
            count: 5,
            assets: [
                {
                    id: 'l4-consolidated-solution',
                    filename: 'Provably_Bounded_L4_Consolidated_Solution.md',
                    slug: 'provably-bounded-l4-consolidated-solution',
                    title: {
                        en: 'Provably-Bounded L4 — Consolidated Solution',
                        fa: 'L4 با کران‌های اثبات‌پذیر — راه‌حل تلفیقی'
                    },
                    description: {
                        en: 'Maps six engineering surveys onto the constraint-propagation chain, with six formal acceptance criteria (G1–G6) and an explicit Established / Proposed / Notional standing for every claim.',
                        fa: 'نگاشت شش پیمایش مهندسی بر زنجیرهٔ انتشار قید، با شش معیار پذیرش صوری (G1–G6) و جایگاه صریح تثبیت‌شده/پیشنهادی/تصوری برای هر ادعا.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/md/Provably_Bounded_L4_Consolidated_Solution.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['safety', 'l4', 'acceptance-criteria', 'synthesis'],
                    priority: 1
                },
                {
                    id: 'architecture-of-refusal-summary',
                    filename: 'Architecture_of_Refusal_Summary.md',
                    slug: 'architecture-of-refusal-summary',
                    title: {
                        en: 'The Architecture of Refusal — One-Page Summary',
                        fa: 'معماری امتناع — خلاصهٔ یک‌صفحه‌ای'
                    },
                    description: {
                        en: 'The consequence law in one page: bound the error, don\'t eliminate it; the S0–S4 refusal chain; and the evidentiary seam between measured, projected, proposed, and notional.',
                        fa: 'قانون پیامد در یک صفحه: خطا را کران‌دار کن، نه حذف؛ زنجیرهٔ امتناع S0–S4؛ و درز اثباتی میان اندازه‌گیری‌شده، پیش‌بینی‌شده، پیشنهادی و تصوری.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'small',
                    targetUrl: '/docs/md/Architecture_of_Refusal_Summary.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['safety', 'refusal', 'summary', 'monotonicity'],
                    priority: 2
                },
                {
                    id: 'rmaa-paper',
                    filename: 'Risk_Monotone_Action_Algebra.pdf',
                    slug: 'risk-monotone-action-algebra',
                    title: {
                        en: 'Risk-Monotone Action Algebra (RMAA)',
                        fa: 'جبر عملگری یکنوا با ریسک (RMAA)'
                    },
                    description: {
                        en: 'A hardware-enforceable action envelope for highway driving: projection calculus, exactness-and-ordering result for the two-stage clamp, envelope-contraction guarantee, an unrepresentability theorem, and a determinism contract.',
                        fa: 'پوش عملگری قابل‌اجرای سخت‌افزاری برای رانندگی بزرگراهی: حساب تصویر، نتیجهٔ دقت-و-ترتیب برای گیرهٔ دومرحله‌ای، تضمین انقباض پوش، قضیهٔ بازنمایی‌ناپذیری و قرارداد جبرگرایی.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Risk_Monotone_Action_Algebra.pdf',
                    cover: '/covers/Risk_Monotone_Action_Algebra.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['safety', 'actuation', 'theorems', 'hardware'],
                    priority: 3
                },
                {
                    id: 'trusted-scalar-paper',
                    filename: 'Trusted_Scalar_Fidelity_Gate.pdf',
                    slug: 'trusted-scalar-fidelity-gate',
                    title: {
                        en: 'Trusted Scalar — A Qualification Calculus for Safety-Critical Reduced-Order Scalars',
                        fa: 'اسکالر مورد اعتماد — حساب صلاحیت برای اسکالرهای مرتبه‌کاستهٔ ایمنی‌بحرانی'
                    },
                    description: {
                        en: 'Self-contained formulation treating reduced-order model outputs as certificate-like quantities: contracts, a composition algebra, invariance-preservation theorems, failure modes, and a normative specification.',
                        fa: 'صورت‌بندی خوداتکا که خروجی‌های مدل مرتبه‌کاسته را کمیت‌هایی گواهی‌گونه می‌داند: قراردادها، جبر ترکیب، قضایای حفظ ناوردایی، حالت‌های خرابی و مشخصات هنجاری.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Trusted_Scalar_Fidelity_Gate.pdf',
                    cover: '/covers/Trusted_Scalar_Fidelity_Gate.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['safety', 'fidelity-gate', 'theorems', 'rom'],
                    priority: 4
                },
                {
                    id: 'invariant-structured-control',
                    filename: 'Invariant_Structured_Online_Control_Phase_First.pdf',
                    slug: 'invariant-structured-online-control',
                    title: {
                        en: 'Invariant-Structured Online Control (Phase-First)',
                        fa: 'کنترل برخط با ساختار ناوردا (فاز-نخست)'
                    },
                    description: {
                        en: 'Publication-grade paper: three orthogonal invariants (ξ, S, sct) composed as constraints in MPC and control-barrier safety filters — the bridge between the mathematics and the safety chain.',
                        fa: 'مقاله‌ای در تراز انتشار: سه ناوردای متعامد (ξ، S، sct) به‌صورت قید در MPC و فیلترهای ایمنی مبتنی بر توابع سد — پل میان ریاضیات و زنجیرهٔ ایمنی.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Invariant_Structured_Online_Control_Phase_First.pdf',
                    cover: '/covers/Invariant_Structured_Online_Control_Phase_First.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['control', 'invariants', 'mpc', 'safety'],
                    priority: 5
                }
            ]
        },
        {
            id: 'methods-meta-research-2026',
            name: { en: 'Methods & Meta-Research (2026)', fa: 'روش‌ها و فراپژوهش (۲۰۲۶)' },
            count: 3,
            assets: [
                {
                    id: 'prior-art-map',
                    filename: 'External_Assessment_Prior_Art_Map.md',
                    slug: 'external-assessment-prior-art-map',
                    title: {
                        en: 'External Assessment & Prior-Art Map',
                        fa: 'ارزیابی بیرونی و نقشهٔ پیشینه‌پژوهی'
                    },
                    description: {
                        en: 'An adversarial audit of the program\'s discovery framework, published unedited: component-by-component verdicts against the prior art (Boden, TRIZ, structure-mapping, quantum cognition) — including where our own framings are judged decorative.',
                        fa: 'ممیزی سخت‌گیرانهٔ چارچوب اکتشافی برنامه، بدون ویرایش منتشر شده: حکم مؤلفه‌به‌مؤلفه در برابر پیشینهٔ علمی (بودن، TRIZ، نگاشت ساختار، شناخت کوانتومی) — از جمله جاهایی که صورت‌بندی‌های خود ما تزئینی ارزیابی شده‌اند.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/md/External_Assessment_Prior_Art_Map.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['audit', 'prior-art', 'methods', 'meta-research'],
                    priority: 1
                },
                {
                    id: 'six-layer-framework',
                    filename: 'Six_Layer_Linguistic_Framework_v1.pdf',
                    slug: 'six-layer-linguistic-framework',
                    title: {
                        en: 'The Six-Layer Linguistic Framework v1.0',
                        fa: 'چارچوب زبانی شش‌لایه — نسخهٔ ۱٫۰'
                    },
                    description: {
                        en: 'The program\'s writing standard, issued for routine use: six layers of prose quality with one non-negotiable boundary — fidelity. Elevation may never alter what a claim says.',
                        fa: 'استاندارد نگارش برنامه، برای استفادهٔ روزمره: شش لایهٔ کیفیت نثر با یک مرز غیرقابل‌مذاکره — وفاداری. ارتقا هرگز نباید آنچه ادعا می‌گوید را تغییر دهد.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/pdf/Six_Layer_Linguistic_Framework_v1.pdf',
                    cover: '/covers/Six_Layer_Linguistic_Framework_v1.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['writing', 'quality', 'methods', 'standard'],
                    priority: 2
                },
                {
                    id: 'extraction-structured-derivatives-protocol',
                    filename: 'Extraction_of_Structured_Derivatives_Protocol_V3.pdf',
                    slug: 'extraction-structured-derivatives-protocol',
                    title: {
                        en: 'Extraction of Structured Derivatives from Intertwined Texts — Protocol v3',
                        fa: 'استخراج مشتقات ساخت‌یافته از متن‌های درهم‌تنیده — پروتکل نسخهٔ ۳'
                    },
                    description: {
                        en: 'The knowledge-transformation protocol in full: a comprehensive framework for decomposing dense, multi-concept prose into modular, queryable, reusable knowledge units while preserving internal coherence — the working method behind the corpus.',
                        fa: 'پروتکل تبدیل دانش به‌تمامی: چارچوبی جامع برای تجزیهٔ نثر متراکم و چندمفهومی به واحدهای دانشی ماژولار، پرسش‌پذیر و بازمصرف‌پذیر با حفظ انسجام درونی — روش کاریِ پشت پیکره.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: 'large',
                    targetUrl: '/docs/pdf/Extraction_of_Structured_Derivatives_Protocol_V3.pdf',
                    cover: '/covers/Extraction_of_Structured_Derivatives_Protocol_V3.png',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['kte', 'protocol', 'knowledge-engineering', 'methods'],
                    priority: 3
                },
                {
                    id: 'epistemic-gearbox-overview',
                    filename: 'AV_Epistemic_Gearbox_Architecture_Overview.md',
                    slug: 'av-epistemic-gearbox-overview',
                    title: {
                        en: 'AV Epistemic Gearbox — Architecture Overview (v0.1)',
                        fa: 'گیربکس معرفتی خودرو — مرور معماری (نسخهٔ ۰٫۱)'
                    },
                    description: {
                        en: 'Steerable computation for collision avoidance: five epistemic stances ordered into 325 formulation routes, selection with hysteresis, and integration with the safety chain. Module timing budgets are design targets, labeled as such.',
                        fa: 'محاسبات قابل‌هدایت برای اجتناب از برخورد: پنج موضع معرفتی در ۳۲۵ مسیر صورت‌بندی، انتخاب با پس‌ماند، و یکپارچگی با زنجیرهٔ ایمنی. بودجه‌های زمانی ماژول‌ها هدف طراحی‌اند و با همین عنوان برچسب خورده‌اند.'
                    },
                    type: 'md',
                    lang: 'en',
                    size: 'medium',
                    targetUrl: '/docs/md/AV_Epistemic_Gearbox_Architecture_Overview.md',
                    status: ASSET_STATUS.READY,
                    processingEstimate: 'published',
                    tags: ['gearbox', 'formulation', 'architecture', 'methods'],
                    priority: 3
                }
            ]
        },
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
                    targetUrl: '/library/picapd/en/PICAPD%20INSTRUCTION%20SET%20ARCHITECTURE.md',
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
                        en: '54-page technical reference manual v1.0; the benchmark figures it reports are the document\u2019s own projections, not measured silicon',
                        fa: 'راهنمای مرجع فنی ۵۴ صفحه‌ای نسخه ۱.۰؛ ارقام بنچمارک آن برآوردهای خود سند است، نه سیلیکون اندازه‌گیری‌شده'
                    },
                    type: 'pdf',
                    lang: 'en',
                    size: '54 pages',
                    targetUrl: '/library/picapd/en/Hardware%20ISA.pdf',
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
                    targetUrl: '/library/picapd/en/PICAPD_Silicon.md',
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
                    targetUrl: '/library/misc/ISA.pdf',
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
                    targetUrl: '/library/picapd/en/PICAPD_compressed.pdf',
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
                    targetUrl: '/library/picapd/en/PICAPD_ISA_Rectification_Main_Context.md',
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
                    targetUrl: '/library/picapd/en/PICAPD_v1_0_1_Errata_PatchText.md',
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
                    targetUrl: '/library/picapd/en/PICAPD_v1_1_Annex_Drafts.md',
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
                    targetUrl: '/library/picapd/fa/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D9%87%20%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%84%D8%B9%D9%85%D9%84%20PICAPD.md',
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
                    targetUrl: '/library/picapd/fa/PICAPD%D8%B3%DB%8C%D9%84%DB%8C%DA%A9%D9%88%D9%86%20%D9%81%D8%A7%D8%B1%D8%B3%DB%8C.md',
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
                    targetUrl: '/library/strategic/%D8%AA%D8%AD%D9%84%DB%8C%D9%84%20%D8%B1%D9%82%D8%A7%D8%A8%D8%AA%DB%8C%20%D9%81%D9%86%DB%8C%20%DB%8C%DA%A9%D9%BE%D8%A7%D8%B1%DA%86%D9%87.md',
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
                    targetUrl: '/library/picapd/fa/%D8%B3%DB%8C%D9%84%DB%8C%DA%A9%D9%88%D9%86.pdf',
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
                    targetUrl: '/library/picapd/fa/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%84%D8%B9%D9%85%D9%84.pdf',
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
                    targetUrl: '/library/strategic/Ghost_Autonomy_Unified_Technical_Analysis_V4.md',
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
                    targetUrl: '/library/strategic/Ghost%20Autonomy%20-%20Unified%20Technical%20Competitive%20Analysis%20V4.pdf',
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
                    targetUrl: '/library/picapd/en/Highest-impact%20spec%20fixes%20for%20ISA.md',
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
                    targetUrl: '/library/picapd/en/PICAPD_Platform_Profile_STOP5_Automotive_Perception.md',
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
                    targetUrl: '/library/picapd/en/STOP_5_Bitvector_Index.md',
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
                    status: ASSET_STATUS.QUEUED,
                    processingEstimate: '2 hours',
                    tags: ['forensic-analysis', 'tesla', 'case-study', 'autonomous-driving'],
                    priority: 6
                }
            ]
        }
    ]
};

// ─── TIER 1: HIGH PRIORITY ASSETS (71 files) ───────────────────────────────

export const HIGH_ASSETS = {
    id: LIBRARY_TIERS.HIGH,
    name: { en: 'HIGH', fa: 'بالا' },
    count: 75,
    priority: 'P1-P2',
    timeline: 'Weeks 3-8',
    description: {
        en: 'Technical content - Autonomous vehicles research and L4 AV applications',
        fa: 'محتوای فنی - تحقیقات خودروهای خودران و کاربردهای L4 AV'
    },
    categories: [
        {
            id: 'governed-knowledge-systems',
            name: { en: 'Memory Module — Governed Knowledge Systems', fa: 'ماژول حافظه — نظام‌های دانش حاکمیت‌دار' },
            count: 4,
            source: 'Memory Module (July 2026)',
            assets: [
                {
                    id: 'symbiotic-search-fabric-thesis',
                    filename: 'Symbiotic_Search_Fabric_Thesis.pdf',
                    slug: 'symbiotic-search-fabric-thesis',
                    title: {
                        en: 'The Symbiotic Search Fabric — Thesis',
                        fa: 'بافت جست\u200cوجوی هم\u200cزیست — تز'
                    },
                    description: {
                        en: 'A co-adaptive, multi-coupled-tenant, client-owned, agent-operated, time-bounded architecture for search: retrieval reframed as a governed fabric. Companion instruments run in the Exhibition\u2019s Memory Wing.',
                        fa: 'معماری هم\u200cسازگار، چندمستأجری هم\u200cبسته، در مالکیت کارفرما، عامل\u200cگردان و زمان\u200cکران\u200cدار برای جست\u200cوجو: بازیابی در قالب بافتی حاکمیت\u200cدار. ابزارهای همراه در «بال حافظه» نمایشگاه اجرا می\u200cشوند.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/Symbiotic_Search_Fabric_Thesis.pdf',
                    cover: '/covers/Symbiotic_Search_Fabric_Thesis.png',
                    status: ASSET_STATUS.READY,
                    tags: ['memory-module', 'search-fabric', 'architecture', 'thesis'],
                    priority: 1
                },
                {
                    id: 'retrieval-covenant-thesis',
                    filename: 'Retrieval_Covenant_Thesis_II.pdf',
                    slug: 'retrieval-covenant-thesis',
                    title: {
                        en: 'The Retrieval Covenant — Thesis II',
                        fa: 'میثاق بازیابی — تز دوم'
                    },
                    description: {
                        en: 'A contract calculus for warranted recall: what a memory system owes the caller, and what the caller owes the memory \u2014 Governed Knowledge Systems companion series.',
                        fa: 'حساب قراردادی برای فراخوانی ضمانت\u200cدار: آنچه نظام حافظه به فراخواننده بدهکار است و آنچه فراخواننده به حافظه — از مجموعهٔ همراه «نظام\u200cهای دانش حاکمیت\u200cدار».'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/Retrieval_Covenant_Thesis_II.pdf',
                    cover: '/covers/Retrieval_Covenant_Thesis_II.png',
                    status: ASSET_STATUS.READY,
                    tags: ['memory-module', 'retrieval', 'contracts', 'thesis'],
                    priority: 2
                },
                {
                    id: 'price-of-recall-thesis',
                    filename: 'Price_of_Recall_Thesis_III.pdf',
                    slug: 'price-of-recall-thesis',
                    title: {
                        en: 'The Price of Recall — Thesis III',
                        fa: 'بهای فراخوانی — تز سوم'
                    },
                    description: {
                        en: 'Shadow-priced cost optimization for contracted recall: remembering as a priced act, the economic face of metabolic memory\u2019s verification inversion.',
                        fa: 'بهینه\u200cسازی هزینه با قیمت سایه برای فراخوانی قراردادی: به\u200cیادآوردن به\u200cمثابه کنشی بهادار — چهرهٔ اقتصادی وارونگی راستی\u200cآزمایی در حافظهٔ متابولیک.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/Price_of_Recall_Thesis_III.pdf',
                    cover: '/covers/Price_of_Recall_Thesis_III.png',
                    status: ASSET_STATUS.READY,
                    tags: ['memory-module', 'price-of-recall', 'optimization', 'thesis'],
                    priority: 3
                },
                {
                    id: 'symbiotic-search-fabric-white-paper',
                    filename: 'Symbiotic_Search_Fabric_White_Paper.pdf',
                    slug: 'symbiotic-search-fabric-white-paper',
                    title: {
                        en: 'The Symbiotic Search Fabric — White Paper No. 1',
                        fa: 'بافت جست\u200cوجوی هم\u200cزیست — وایت\u200cپیپر شمارهٔ ۱'
                    },
                    description: {
                        en: 'The architecture-series white paper: the mature end-to-end framework distilled from the thesis line, written for an engineering audience.',
                        fa: 'وایت\u200cپیپر مجموعهٔ معماری: چارچوب سرتاسری بالیده، برگرفته از خط تز، نوشته\u200cشده برای مخاطب مهندسی.'
                    },
                    type: 'pdf',
                    lang: 'en',
                    targetUrl: '/docs/pdf/Symbiotic_Search_Fabric_White_Paper.pdf',
                    cover: '/covers/Symbiotic_Search_Fabric_White_Paper.png',
                    status: ASSET_STATUS.READY,
                    tags: ['memory-module', 'search-fabric', 'white-paper'],
                    priority: 4
                }
            ]
        },
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
                    status: ASSET_STATUS.QUEUED,
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
                    targetUrl: '/library/notion/Physics-Informed%20Architecture%20Equation-Sensor-Cont%2097d2931724e84e649d5d6aab025efa35.md',
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
                    targetUrl: '/library/notion/Adaptive%20Signal%20Multiplexer%20with%20Dynamic%20Problem%20F%207615112ab78b4713aa2f5b4703746ba4.md',
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
                    status: ASSET_STATUS.QUEUED,
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
                    status: ASSET_STATUS.QUEUED,
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
                    status: ASSET_STATUS.QUEUED,
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
    totalAssets: 109,
    critical: 38,
    high: 71,
    bilingualPairs: 21,
    readyAssets: 35,
    inProgressAssets: 3,
    needsReviewAssets: 5
};
