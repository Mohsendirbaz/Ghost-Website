/**
 * Multi-Agent System Data Model
 * Multi-Agent Research Laboratory — Event-Sourced Research Operating Substrate
 *
 * Replaces the earlier TWIN IDE-plugin catalogue (June 2026 content refresh).
 * Sources: the laboratory upgrade plan, the F26 integration charter, and the
 * laboratory manual. Content is deliberately concept-level: step-level
 * specifications, latency tables, and internal hyperparameter values from the
 * communication-bundle documents are intentionally NOT published here.
 *
 * Status legend: ✅ implemented in the working prototype · 🔄 in progress · ⏳ planned
 */

// Category IDs
export const CATEGORIES = {
    LAB_MODEL: 'core-multiagent-system',
    EVENT_STREAM: 'event-stream',
    TYPED_CONTRACTS: 'typed-contracts',
    AGENT_ROLES: 'agent-roles',
    GOVERNANCE: 'governance-checkpoints',
    LAB_OBJECTS: 'laboratory-objects',
    INTEGRATION: 'integration-validation'
};

// System Overview
export const SYSTEM_INFO = {
    totalFiles: 53,
    systemName: 'Multi-Agent Research Laboratory',
    systemDescription: {
        en: 'An event-sourced research operating substrate: every meaningful mutation is recorded as an append-only event, the visible canvas is a projection of that stream, and agents occupy single-tenant cells where they run experiments, produce evidence, vote, trigger checkpoints, and update institutional memory. This page documents the laboratory object model at concept level; the working prototype is available in the Artifact Gallery.',
        fa: 'یک بستر عملیاتی پژوهشیِ رویدادمحور: هر تغییر معنادار به‌صورت یک رویداد افزایشی ثبت می‌شود، بومِ دیداری صرفاً بازتابی از همان جریان رویداد است، و عامل‌ها در سلول‌های تک‌مستأجره مستقر می‌شوند؛ آزمایش اجرا می‌کنند، شواهد تولید می‌کنند، رأی می‌دهند، ایست‌بازرسی ثبت می‌کنند و حافظه نهادی را به‌روز می‌کنند. این صفحه مدل اشیاء آزمایشگاه را در سطح مفهومی مستند می‌کند؛ نمونه اولیه کارا در گالری آرتیفکت‌ها در دسترس است.'
    },
    architecturalLayers: {
        en: [
            'Event Stream Layer: an append-only event log is the single source of truth — the canvas is a projection, not the state',
            'Canvas Substrate Layer: lanes for agents and research functions, columns for causal phases, single-tenant execution cells',
            'Contract Layer: edges are typed agreements — dependency, support, contradiction, routing, feedback, quorum, recovery, lineage',
            'Agent Role Layer: named roles with allowed inputs, required outputs, handoff rules, and explicit authority limits',
            'Governance Layer: governed checkpoints, explicit authority-change events, and quorum/escalation rules for disagreement',
            'Memory Layer: field memory promoted, under gates, into reusable institutional research memory',
            'Validation Layer: schema-validated imports, replayable state, and round-trip export discipline'
        ],
        fa: [
            'لایه جریان رویداد: دفتر رویدادِ صرفاً افزایشی، یگانه منبع حقیقت است — بوم، بازتابی از آن است نه خودِ وضعیت',
            'لایه بستر بوم: لِین‌ها برای عامل‌ها و کارکردهای پژوهشی، ستون‌ها برای فازهای علّی، سلول‌های اجرای تک‌مستأجره',
            'لایه قرارداد: یال‌ها توافق‌های نوع‌دارند — وابستگی، پشتیبانی، تناقض، مسیردهی، بازخورد، حدنصاب، بازیابی و تبار شواهد',
            'لایه نقش عامل‌ها: نقش‌های نام‌دار با ورودی‌های مجاز، خروجی‌های الزامی، قواعد تحویل کار و حدود صریح اختیار',
            'لایه حاکمیت: ایست‌بازرسی‌های حاکمیت‌شده، رویدادهای صریح تغییر اختیار، و قواعد حدنصاب و تشدید برای اختلاف نظر',
            'لایه حافظه: ارتقای دروازه‌بانی‌شده حافظه میدانی به حافظه نهادی و بازاستفاده‌پذیر پژوهش',
            'لایه اعتبارسنجی: واردسازی با اعتبارسنجی طرح‌واره، وضعیت بازپخش‌پذیر و انضباط رفت‌وبرگشتی برون‌بری'
        ]
    },
    keyTechnologies: {
        en: [
            'Event Sourcing',
            'Single-Tenant Execution Compartments',
            'Typed Contract Edges',
            'Governed Experiment Streams',
            'Replayable Checkpoints',
            'Quorum-Based Governance',
            'Importable Lab Packages (JSON)',
            'Institutional Research Memory'
        ],
        fa: [
            'رویدادمحوری (Event Sourcing)',
            'محفظه‌های اجرای تک‌مستأجره',
            'یال‌های قراردادی نوع‌دار',
            'جریان‌های آزمایشی حاکمیت‌شده',
            'ایست‌بازرسی‌های بازپخش‌پذیر',
            'حاکمیت مبتنی بر حدنصاب',
            'بسته‌های آزمایشگاهی واردشدنی (JSON)',
            'حافظه نهادی پژوهش'
        ]
    }
};

// Category 1: The Laboratory Model (7 objects)
export const LAB_MODEL_CATEGORY = {
    id: CATEGORIES.LAB_MODEL,
    name: { en: 'The Laboratory Model', fa: 'مدل آزمایشگاه' },
    description: {
        en: 'The constitutional primitives of the canvas: what lanes, columns, cells, nodes, streams, and checkpoints mean once the canvas is treated as a research operating substrate rather than a drawing surface.',
        fa: 'اصول بنیادین بوم: معنای لِین‌ها، ستون‌ها، سلول‌ها، گره‌ها، جریان‌ها و ایست‌بازرسی‌ها هنگامی که بوم نه یک سطح ترسیم، بلکه بستر عملیاتی پژوهش تلقی شود.'
    },
    count: 7,
    icon: '🧭',
    components: [
        {
            id: 'lab-canvas-projection',
            title: { en: 'Canvas as Event Projection', fa: 'بوم به‌مثابه بازتاب رویدادها' },
            component: 'canvas = project(eventStream)',
            path: 'laboratory.model.projection',
            status: '✅',
            tags: ['event-sourcing', 'projection', 'canvas']
        },
        {
            id: 'lab-lanes',
            title: { en: 'Lanes — Agents, Teams & Functions', fa: 'لِین‌ها — عامل‌ها، تیم‌ها و کارکردها' },
            component: 'Lane',
            path: 'laboratory.model.lane',
            status: '✅',
            tags: ['canvas', 'agents', 'structure']
        },
        {
            id: 'lab-columns',
            title: { en: 'Columns — Causal Workflow Phases', fa: 'ستون‌ها — فازهای علّی گردش کار' },
            component: 'Column',
            path: 'laboratory.model.column',
            status: '✅',
            tags: ['canvas', 'causality', 'phases']
        },
        {
            id: 'lab-cells',
            title: { en: 'Single-Tenant Execution Cells', fa: 'سلول‌های اجرای تک‌مستأجره' },
            component: 'ExecutionCell',
            path: 'laboratory.model.cell',
            status: '✅',
            tags: ['compartment', 'scheduling', 'execution']
        },
        {
            id: 'lab-typed-nodes',
            title: { en: 'Typed Research Nodes', fa: 'گره‌های پژوهشی نوع‌دار' },
            component: 'TypedNode',
            path: 'laboratory.model.node',
            status: '✅',
            tags: ['objects', 'typing', 'canvas']
        },
        {
            id: 'lab-streams',
            title: { en: 'Streams — Governed Experimental Worldlines', fa: 'جریان‌ها — خطوط جهانی آزمایشیِ حاکمیت‌شده' },
            component: 'Stream',
            path: 'laboratory.model.stream',
            status: '✅',
            tags: ['branching', 'experiments', 'worldline']
        },
        {
            id: 'lab-checkpoints',
            title: { en: 'Checkpoints — Replay Anchors', fa: 'ایست‌بازرسی‌ها — لنگرهای بازپخش' },
            component: 'Checkpoint',
            path: 'laboratory.model.checkpoint',
            status: '✅',
            tags: ['checkpoint', 'replay', 'recovery']
        }
    ]
};

// Category 2: Event Stream (8 event families)
export const EVENT_STREAM_CATEGORY = {
    id: CATEGORIES.EVENT_STREAM,
    name: { en: 'Event Stream', fa: 'جریان رویداد' },
    description: {
        en: 'Every meaningful mutation emits an append-only event; the stream — not the picture — is the source of truth. The families below are the laboratory’s public event vocabulary.',
        fa: 'هر تغییر معنادار، رویدادی افزایشی صادر می‌کند؛ منبع حقیقت، جریان رویداد است نه تصویر. خانواده‌های زیر واژگان عمومی رویدادهای آزمایشگاه‌اند.'
    },
    count: 8,
    icon: '📜',
    components: [
        {
            id: 'ev-node-lifecycle',
            title: { en: 'Node Lifecycle Events', fa: 'رویدادهای چرخه حیات گره' },
            component: 'node.created · node.updated · node.deleted',
            path: 'events.node',
            status: '✅',
            tags: ['events', 'nodes', 'lifecycle']
        },
        {
            id: 'ev-edge-contracts',
            title: { en: 'Edge Contract Events', fa: 'رویدادهای قرارداد یال' },
            component: 'edge.created · edge.updated',
            path: 'events.edge',
            status: '✅',
            tags: ['events', 'edges', 'contracts']
        },
        {
            id: 'ev-guard-evaluations',
            title: { en: 'Guard Evaluations', fa: 'ارزیابی نگهبان‌ها' },
            component: 'guard.evaluated',
            path: 'events.guard',
            status: '✅',
            tags: ['events', 'guards', 'validation']
        },
        {
            id: 'ev-agent-runs',
            title: { en: 'Agent Run Events', fa: 'رویدادهای اجرای عامل' },
            component: 'agent.run.started · agent.run.completed',
            path: 'events.agent',
            status: '✅',
            tags: ['events', 'agents', 'runs']
        },
        {
            id: 'ev-votes',
            title: { en: 'Vote Events', fa: 'رویدادهای رأی' },
            component: 'vote.cast',
            path: 'events.vote',
            status: '✅',
            tags: ['events', 'governance', 'votes']
        },
        {
            id: 'ev-memory-promotion',
            title: { en: 'Memory Promotion Events', fa: 'رویدادهای ارتقای حافظه' },
            component: 'memory.promoted',
            path: 'events.memory',
            status: '✅',
            tags: ['events', 'memory', 'promotion']
        },
        {
            id: 'ev-checkpoint-family',
            title: { en: 'Checkpoint & Recovery Events', fa: 'رویدادهای ایست‌بازرسی و بازیابی' },
            component: 'checkpoint.* · recovery.*',
            path: 'events.checkpoint',
            status: '🔄',
            tags: ['events', 'checkpoint', 'recovery']
        },
        {
            id: 'ev-import-export',
            title: { en: 'Import & Export Events', fa: 'رویدادهای واردسازی و برون‌بری' },
            component: 'import.* · export.*',
            path: 'events.transfer',
            status: '⏳',
            tags: ['events', 'import', 'export']
        }
    ]
};

// Category 3: Typed Contract Edges (8 types)
export const TYPED_CONTRACTS_CATEGORY = {
    id: CATEGORIES.TYPED_CONTRACTS,
    name: { en: 'Typed Contract Edges', fa: 'یال‌های قراردادی نوع‌دار' },
    description: {
        en: 'Edges are not lines — they are agreements. Each edge type carries different obligations for the nodes it connects and different consequences when it is violated.',
        fa: 'یال‌ها خط نیستند — توافق‌اند. هر نوع یال، تعهدات متفاوتی برای گره‌های متصل و پیامدهای متفاوتی هنگام نقض دارد.'
    },
    count: 8,
    icon: '🔗',
    components: [
        {
            id: 'edge-dependency',
            title: { en: 'Dependency Edge', fa: 'یال وابستگی' },
            component: 'edge:dependency',
            path: 'contracts.dependency',
            status: '✅',
            tags: ['contracts', 'ordering', 'dependency']
        },
        {
            id: 'edge-support',
            title: { en: 'Support Edge', fa: 'یال پشتیبانی' },
            component: 'edge:support',
            path: 'contracts.support',
            status: '✅',
            tags: ['contracts', 'evidence', 'support']
        },
        {
            id: 'edge-contradiction',
            title: { en: 'Contradiction Edge', fa: 'یال تناقض' },
            component: 'edge:contradiction',
            path: 'contracts.contradiction',
            status: '✅',
            tags: ['contracts', 'evidence', 'contradiction']
        },
        {
            id: 'edge-route',
            title: { en: 'Route Edge', fa: 'یال مسیردهی' },
            component: 'edge:route',
            path: 'contracts.route',
            status: '🔄',
            tags: ['contracts', 'routing', 'workflow']
        },
        {
            id: 'edge-feedback',
            title: { en: 'Feedback Loop Edge', fa: 'یال حلقه بازخورد' },
            component: 'edge:feedback',
            path: 'contracts.feedback',
            status: '🔄',
            tags: ['contracts', 'feedback', 'iteration']
        },
        {
            id: 'edge-quorum',
            title: { en: 'Quorum Requirement Edge', fa: 'یال الزام حدنصاب' },
            component: 'edge:quorum',
            path: 'contracts.quorum',
            status: '⏳',
            tags: ['contracts', 'governance', 'quorum']
        },
        {
            id: 'edge-recovery',
            title: { en: 'Recovery Path Edge', fa: 'یال مسیر بازیابی' },
            component: 'edge:recovery',
            path: 'contracts.recovery',
            status: '⏳',
            tags: ['contracts', 'recovery', 'resilience']
        },
        {
            id: 'edge-lineage',
            title: { en: 'Evidence Lineage Edge', fa: 'یال تبار شواهد' },
            component: 'edge:lineage',
            path: 'contracts.lineage',
            status: '✅',
            tags: ['contracts', 'provenance', 'lineage']
        }
    ]
};

// Category 4: Agent Roles (10 roles)
export const AGENT_ROLES_CATEGORY = {
    id: CATEGORIES.AGENT_ROLES,
    name: { en: 'Agent Roles', fa: 'نقش‌های عامل‌ها' },
    description: {
        en: 'Coordination without ambiguity: each role has allowed inputs, required outputs, handoff rules, failure modes, and authority limits. No role may expand its own authority; disagreement is resolved by quorum and escalation rules.',
        fa: 'هماهنگی بدون ابهام: هر نقش، ورودی‌های مجاز، خروجی‌های الزامی، قواعد تحویل، حالت‌های خرابی و حدود اختیار مشخص دارد. هیچ نقشی نمی‌تواند اختیار خود را گسترش دهد؛ اختلاف با قواعد حدنصاب و تشدید حل می‌شود.'
    },
    count: 10,
    icon: '🤝',
    components: [
        {
            id: 'role-planner',
            title: { en: 'Planner', fa: 'برنامه‌ریز' },
            component: 'role:planner',
            path: 'roles.planner',
            status: '🔄',
            tags: ['roles', 'planning', 'coordination']
        },
        {
            id: 'role-researcher',
            title: { en: 'Researcher', fa: 'پژوهشگر' },
            component: 'role:researcher',
            path: 'roles.researcher',
            status: '🔄',
            tags: ['roles', 'research', 'evidence']
        },
        {
            id: 'role-verifier',
            title: { en: 'Verifier', fa: 'راستی‌آزما' },
            component: 'role:verifier',
            path: 'roles.verifier',
            status: '🔄',
            tags: ['roles', 'verification', 'quality']
        },
        {
            id: 'role-critic',
            title: { en: 'Critic', fa: 'منتقد' },
            component: 'role:critic',
            path: 'roles.critic',
            status: '🔄',
            tags: ['roles', 'critique', 'adversarial']
        },
        {
            id: 'role-synthesizer',
            title: { en: 'Synthesizer', fa: 'ترکیب‌گر' },
            component: 'role:synthesizer',
            path: 'roles.synthesizer',
            status: '🔄',
            tags: ['roles', 'synthesis', 'integration']
        },
        {
            id: 'role-router',
            title: { en: 'Router', fa: 'مسیریاب' },
            component: 'role:router',
            path: 'roles.router',
            status: '⏳',
            tags: ['roles', 'routing', 'workflow']
        },
        {
            id: 'role-memory-curator',
            title: { en: 'Memory Curator', fa: 'متولی حافظه' },
            component: 'role:memory-curator',
            path: 'roles.memoryCurator',
            status: '⏳',
            tags: ['roles', 'memory', 'curation']
        },
        {
            id: 'role-governance-reviewer',
            title: { en: 'Governance Reviewer', fa: 'بازبین حاکمیت' },
            component: 'role:governance-reviewer',
            path: 'roles.governanceReviewer',
            status: '⏳',
            tags: ['roles', 'governance', 'review']
        },
        {
            id: 'role-recovery-coordinator',
            title: { en: 'Recovery Coordinator', fa: 'هماهنگ‌کننده بازیابی' },
            component: 'role:recovery-coordinator',
            path: 'roles.recoveryCoordinator',
            status: '⏳',
            tags: ['roles', 'recovery', 'resilience']
        },
        {
            id: 'role-integrator',
            title: { en: 'Integrator (Final Integration)', fa: 'یکپارچه‌ساز (یکپارچه‌سازی نهایی)' },
            component: 'role:integrator',
            path: 'roles.integrator',
            status: '⏳',
            tags: ['roles', 'integration', 'documentation']
        }
    ]
};

// Category 5: Governance & Checkpoints (6 mechanisms)
export const GOVERNANCE_CATEGORY = {
    id: CATEGORIES.GOVERNANCE,
    name: { en: 'Governance & Checkpoints', fa: 'حاکمیت و ایست‌بازرسی‌ها' },
    description: {
        en: 'Checkpoints are reconstructable laboratory states, not screenshots; authority changes are explicit, logged events; and disagreement follows defined quorum and escalation paths. Silent drift is treated as a failure mode.',
        fa: 'ایست‌بازرسی‌ها وضعیت‌های بازسازی‌پذیر آزمایشگاه‌اند، نه تصویر لحظه‌ای؛ تغییرات اختیار، رویدادهای صریح و ثبت‌شده‌اند؛ و اختلاف نظر از مسیرهای تعریف‌شده حدنصاب و تشدید پیش می‌رود. رانش خاموش، خود یک حالت خرابی است.'
    },
    count: 6,
    icon: '🏛️',
    components: [
        {
            id: 'gov-checkpoint-semantics',
            title: { en: 'Governed Checkpoint Semantics', fa: 'معناشناسی حاکمیت‌شده ایست‌بازرسی' },
            component: 'CheckpointGovernor',
            path: 'governance.checkpoints',
            status: '✅',
            tags: ['governance', 'checkpoint', 'state']
        },
        {
            id: 'gov-replay',
            title: { en: 'Replay & State Reconstruction', fa: 'بازپخش و بازسازی وضعیت' },
            component: 'ReplayEngine',
            path: 'governance.replay',
            status: '🔄',
            tags: ['replay', 'event-sourcing', 'audit']
        },
        {
            id: 'gov-authority-events',
            title: { en: 'Explicit Authority-Change Events', fa: 'رویدادهای صریح تغییر اختیار' },
            component: 'AuthorityLedger',
            path: 'governance.authority',
            status: '✅',
            tags: ['governance', 'authority', 'audit']
        },
        {
            id: 'gov-quorum-rules',
            title: { en: 'Quorum Rules for Disagreement', fa: 'قواعد حدنصاب برای اختلاف نظر' },
            component: 'QuorumRules',
            path: 'governance.quorum',
            status: '⏳',
            tags: ['governance', 'quorum', 'consensus']
        },
        {
            id: 'gov-escalation',
            title: { en: 'Escalation Paths', fa: 'مسیرهای تشدید' },
            component: 'EscalationPolicy',
            path: 'governance.escalation',
            status: '⏳',
            tags: ['governance', 'escalation', 'conflict']
        },
        {
            id: 'gov-evidence-ledger',
            title: { en: 'Evidence Ledger', fa: 'دفتر شواهد' },
            component: 'EvidenceLedger',
            path: 'governance.evidence',
            status: '🔄',
            tags: ['evidence', 'provenance', 'audit']
        }
    ]
};

// Category 6: Laboratory Objects (8 typed node kinds)
export const LAB_OBJECTS_CATEGORY = {
    id: CATEGORIES.LAB_OBJECTS,
    name: { en: 'Laboratory Objects', fa: 'اشیاء آزمایشگاه' },
    description: {
        en: 'The typed research objects that occupy cells: hypotheses, experiments, runs, evidence, votes, critiques, synthesis notes, and playbooks. Agents do not leave loose notes — they produce typed objects with lineage.',
        fa: 'اشیاء پژوهشی نوع‌داری که سلول‌ها را اشغال می‌کنند: فرضیه‌ها، آزمایش‌ها، اجراها، شواهد، رأی‌ها، نقدها، یادداشت‌های ترکیبی و دفترچه‌های راهبرد. عامل‌ها یادداشت پراکنده نمی‌گذارند — اشیاء نوع‌دارِ دارای تبار تولید می‌کنند.'
    },
    count: 8,
    icon: '🧪',
    components: [
        {
            id: 'obj-hypothesis',
            title: { en: 'Hypothesis', fa: 'فرضیه' },
            component: 'node:hypothesis',
            path: 'objects.hypothesis',
            status: '✅',
            tags: ['objects', 'hypothesis', 'research']
        },
        {
            id: 'obj-experiment',
            title: { en: 'Experiment', fa: 'آزمایش' },
            component: 'node:experiment',
            path: 'objects.experiment',
            status: '✅',
            tags: ['objects', 'experiment', 'design']
        },
        {
            id: 'obj-run',
            title: { en: 'Run', fa: 'اجرا' },
            component: 'node:run',
            path: 'objects.run',
            status: '✅',
            tags: ['objects', 'run', 'execution']
        },
        {
            id: 'obj-evidence',
            title: { en: 'Evidence', fa: 'شواهد' },
            component: 'node:evidence',
            path: 'objects.evidence',
            status: '✅',
            tags: ['objects', 'evidence', 'provenance']
        },
        {
            id: 'obj-vote',
            title: { en: 'Vote', fa: 'رأی' },
            component: 'node:vote',
            path: 'objects.vote',
            status: '✅',
            tags: ['objects', 'vote', 'governance']
        },
        {
            id: 'obj-critique',
            title: { en: 'Critique', fa: 'نقد' },
            component: 'node:critique',
            path: 'objects.critique',
            status: '🔄',
            tags: ['objects', 'critique', 'review']
        },
        {
            id: 'obj-synthesis-note',
            title: { en: 'Synthesis Note', fa: 'یادداشت ترکیبی' },
            component: 'node:synthesis',
            path: 'objects.synthesis',
            status: '🔄',
            tags: ['objects', 'synthesis', 'integration']
        },
        {
            id: 'obj-playbook',
            title: { en: 'Playbook', fa: 'دفترچه راهبرد' },
            component: 'node:playbook',
            path: 'objects.playbook',
            status: '⏳',
            tags: ['objects', 'playbook', 'operations']
        }
    ]
};

// Category 7: Integration & Validation (6 disciplines)
export const INTEGRATION_CATEGORY = {
    id: CATEGORIES.INTEGRATION,
    name: { en: 'Integration & Validation', fa: 'یکپارچه‌سازی و اعتبارسنجی' },
    description: {
        en: 'The final-integration discipline: a canonical protocol ledger, an importable JSON lab-package schema with strict validation, round-trip import/export tests, a complete event dictionary, and a documented coordination handbook — so the laboratory can be revised, exported, re-imported, and improved repeatedly.',
        fa: 'انضباط یکپارچه‌سازی نهایی: دفتر رسمی پروتکل، طرح‌واره JSON بسته آزمایشگاهیِ واردشدنی با اعتبارسنجی سخت‌گیرانه، آزمون‌های رفت‌وبرگشتی واردسازی/برون‌بری، واژه‌نامه کامل رویدادها و کتابچه مدون هماهنگی — تا آزمایشگاه بتواند بارها بازبینی، برون‌بری، بازواردسازی و بهبود یابد.'
    },
    count: 6,
    icon: '🧰',
    components: [
        {
            id: 'int-lab-package-schema',
            title: { en: 'Importable Lab Package Schema', fa: 'طرح‌واره بسته آزمایشگاهی واردشدنی' },
            component: 'LabPackage(JSON)',
            path: 'integration.package',
            status: '⏳',
            tags: ['integration', 'schema', 'import']
        },
        {
            id: 'int-schema-validator',
            title: { en: 'Strict Schema Validation', fa: 'اعتبارسنجی سخت‌گیرانه طرح‌واره' },
            component: 'SchemaValidator',
            path: 'integration.validation',
            status: '⏳',
            tags: ['validation', 'schema', 'quality']
        },
        {
            id: 'int-roundtrip-tests',
            title: { en: 'Round-Trip Import/Export Tests', fa: 'آزمون‌های رفت‌وبرگشتی واردسازی/برون‌بری' },
            component: 'RoundTripSuite',
            path: 'integration.roundtrip',
            status: '⏳',
            tags: ['testing', 'import', 'export']
        },
        {
            id: 'int-event-dictionary',
            title: { en: 'Event Dictionary', fa: 'واژه‌نامه رویدادها' },
            component: 'EventDictionary',
            path: 'integration.events',
            status: '🔄',
            tags: ['events', 'documentation', 'schema']
        },
        {
            id: 'int-coordination-handbook',
            title: { en: 'Agent Coordination Handbook', fa: 'کتابچه هماهنگی عامل‌ها' },
            component: 'CoordinationHandbook',
            path: 'integration.handbook',
            status: '⏳',
            tags: ['documentation', 'roles', 'coordination']
        },
        {
            id: 'int-revision-loop',
            title: { en: 'Revision & Improvement Loop', fa: 'حلقه بازبینی و بهبود' },
            component: 'RevisionLoop',
            path: 'integration.revision',
            status: '🔄',
            tags: ['iteration', 'improvement', 'process']
        }
    ]
};

// All categories in display order
export const ALL_CATEGORIES = [
    LAB_MODEL_CATEGORY,
    EVENT_STREAM_CATEGORY,
    TYPED_CONTRACTS_CATEGORY,
    AGENT_ROLES_CATEGORY,
    GOVERNANCE_CATEGORY,
    LAB_OBJECTS_CATEGORY,
    INTEGRATION_CATEGORY
];

// Utility function to flatten all components from all categories
export function getAllComponents() {
    return ALL_CATEGORIES.flatMap(category =>
        category.components.map(component => ({
            ...component,
            categoryId: category.id,
            categoryName: category.name,
            categoryIcon: category.icon
        }))
    );
}

// Utility function to get category by ID
export function getCategoryById(categoryId) {
    return ALL_CATEGORIES.find(cat => cat.id === categoryId);
}

// Utility function to search components
export function searchComponents(query, lang = 'en') {
    const lowerQuery = query.toLowerCase();
    return getAllComponents().filter(component => {
        const title = component.title[lang].toLowerCase();
        const componentName = component.component.toLowerCase();
        const tags = component.tags.join(' ').toLowerCase();
        return title.includes(lowerQuery) ||
               componentName.includes(lowerQuery) ||
               tags.includes(lowerQuery);
    });
}

// Utility function to filter components by tag
export function filterComponentsByTag(tag) {
    return getAllComponents().filter(component =>
        component.tags.includes(tag)
    );
}
