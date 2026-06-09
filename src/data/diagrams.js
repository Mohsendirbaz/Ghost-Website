/**
 * PICAPD Architecture Diagram Library
 * Source documents: Doc01 (Reconstruction Plan), Doc02 (ISA Spec), Doc03 (Visualization Suite)
 *
 * Each entry: id, collection, type, category, claims[], en{title,description}, fa{title,description}, mermaid source
 */

export const COLLECTIONS = {
  doc01: { en: 'Architecture Reconstruction', fa: 'بازسازی معماری' },
  doc02: { en: 'ISA Specification',            fa: 'مشخصات ISA' },
  doc03: { en: 'Operational Visualization',    fa: 'تجسم عملیاتی' },
};

export const CATEGORIES = {
  overview:       { en: 'System Overview',           fa: 'نمای کلی سیستم' },
  hierarchy:      { en: 'Processing Hierarchy',       fa: 'سلسله‌مراتب پردازش' },
  constraints:    { en: 'Constraint Lifecycle',       fa: 'چرخه عمر محدودیت' },
  governance:     { en: 'Constitutional Governance',  fa: 'حاکمیت قانون اساسی' },
  resources:      { en: 'Resource Management',        fa: 'مدیریت منابع' },
  errors:         { en: 'Error & Fault Handling',     fa: 'مدیریت خطا و نقص' },
  deployment:     { en: 'Deployment Topology',        fa: 'توپولوژی استقرار' },
  isa:            { en: 'ISA & Instructions',         fa: 'ISA و دستورالعمل‌ها' },
};

export const CLAIMS = {
  'power-efficiency':   { en: 'Power Efficiency',      fa: 'بهره‌وری انرژی' },
  'safety':             { en: 'Safety by Design',       fa: 'ایمنی از طراحی' },
  'latency':            { en: 'Ultra-Low Latency',      fa: 'تأخیر فوق‌کم' },
  'scalability':        { en: 'Scalability',            fa: 'مقیاس‌پذیری' },
  'physics-enforced':   { en: 'Physics-Enforced',       fa: 'اجرای فیزیکی' },
  'fault-tolerance':    { en: 'Fault Tolerance',        fa: 'تحمل خطا' },
};

export const DIAGRAM_TYPES = {
  flowchart:    { en: 'Flowchart',        fa: 'نمودار جریان' },
  stateDiagram: { en: 'State Diagram',    fa: 'نمودار حالت' },
  sequence:     { en: 'Sequence Diagram', fa: 'نمودار توالی' },
  graph:        { en: 'Graph',            fa: 'گراف' },
  pie:          { en: 'Pie Chart',        fa: 'نمودار دایره‌ای' },
  gantt:        { en: 'Gantt Chart',      fa: 'نمودار گانت' },
};

export const diagrams = [
  /* ─────────────────────────────── DOC 01 ─────────────────────────────── */
  {
    id: 'meta-architecture-transformation',
    collection: 'doc01',
    type: 'graph',
    category: 'overview',
    claims: ['physics-enforced', 'scalability'],
    en: {
      title: 'Meta-Architecture Transformation',
      description: 'KTE extraction and synthesis pipeline mapping financial narrative to operational architecture — from Trust Architecture through ISA to deployment contexts.',
    },
    fa: {
      title: 'تبدیل معماری متا',
      description: 'خط لوله استخراج و سنتز KTE از روایت مالی به معماری عملیاتی — از معماری اعتماد از طریق ISA به زمینه‌های استقرار.',
    },
    mermaid: `graph TD
    A[Trust Architecture<br/>Financial Narrative] -->|Extract E| B[Core Technical Claims]
    B -->|Synthesize S| C[Operational Primitives]
    C -->|Validate V| D[Physics-Grounded Units]
    D -->|Compose C| E[PICAPD Instruction Set]
    E -->|Router Rt| F{Deployment Context}
    F -->|Autonomous Systems| G[Agent Governance ISA]
    F -->|Scientific Computing| H[Variational Computing ISA]
    F -->|Real-time Control| I[Constraint Enforcement ISA]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#9f9,stroke:#333,stroke-width:2px
    style D fill:#99f,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'structural-pattern-extraction',
    collection: 'doc01',
    type: 'flowchart',
    category: 'overview',
    claims: ['physics-enforced', 'physics-enforced'],
    en: {
      title: 'Structural Pattern: Physics → Compute → Hardware',
      description: 'Isomorphic mapping between physical population dynamics (particle conservation), computational agent governance, and EPU hardware primitives.',
    },
    fa: {
      title: 'الگوی ساختاری: فیزیک → محاسبه → سخت‌افزار',
      description: 'نگاشت ایزومورفیک بین دینامیک جمعیتی فیزیکی، حاکمیت عامل محاسباتی و اولیه‌های سخت‌افزاری EPU.',
    },
    mermaid: `flowchart TB
    subgraph Physical Layer
        P1[Particle Population n of L,t]
        P2[Conservation: δn/δt + ∇·G = B-D]
        P3[Hausdorff Constraints]
    end
    subgraph Computational Layer
        C1[Agent Population n of κ,t]
        C2[Conservation: Budget+Memory]
        C3[Realizability Gates]
    end
    subgraph Hardware Layer
        H1[Worker-Manager-Queen]
        H2[Context Flow: 10000:1]
        H3[Event Propagation Network]
    end
    P1 <-->|Isomorphism| C1
    P2 <-->|Isomorphism| C2
    P3 <-->|Isomorphism| C3
    C1 --> H1
    C2 --> H2
    C3 --> H3
    style Physical Layer fill:#fee,stroke:#333,stroke-width:2px
    style Computational Layer fill:#efe,stroke:#333,stroke-width:2px
    style Hardware Layer fill:#eef,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'operational-building-blocks',
    collection: 'doc01',
    type: 'flowchart',
    category: 'isa',
    claims: ['latency', 'physics-enforced'],
    en: {
      title: 'Core Operational Building Blocks',
      description: 'Constraint operations (SET/CLEAR/WAIT/TEST), hierarchical processing latencies (Worker 1.4 ns, Manager 7.2 ns, Queen 4.9 ns), and memory operations.',
    },
    fa: {
      title: 'بلوک‌های سازنده عملیاتی اصلی',
      description: 'عملیات محدودیت (SET/CLEAR/WAIT/TEST)، تأخیرهای پردازش سلسله‌مراتبی (کارگر ۱.۴ ns، مدیر ۷.۲ ns، ملکه ۴.۹ ns) و عملیات حافظه.',
    },
    mermaid: `flowchart TD
    subgraph Operational Primitives
        OP1[CSET constraint_id - Mark satisfied, broadcast]
        OP2[CCLEAR constraint_id - Mark violated, rollback]
        OP3[CWAIT constraint_id - Block until satisfied]
        OP4[CTEST constraint_id - Query without blocking]
    end
    subgraph Hierarchical Operations
        HO1[Worker Process: 100-bit → 1-bit, 1.4ns]
        HO2[Manager Aggregate: 10 workers → 1 output, 7.2ns]
        HO3[Queen Decide: 10 managers → binary, 4.9ns]
    end
    subgraph Memory Operations
        MO1[LSM Read: Local State Memory, 1 cycle]
        MO2[ADM Monitor: Action Detection, 50mW]
        MO3[SI Execute: Symplectic Integration, 5-15W]
    end
    OP1 --> HO1
    OP2 --> HO1
    OP3 --> HO2
    OP4 --> HO3
    HO1 -.->|Access| MO1
    HO2 -.->|Trigger| MO2
    HO3 -.->|Activate| MO3
    style Operational Primitives fill:#fcf,stroke:#333,stroke-width:2px
    style Hierarchical Operations fill:#cff,stroke:#333,stroke-width:2px
    style Memory Operations fill:#ffc,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'constraint-system-architecture',
    collection: 'doc01',
    type: 'stateDiagram',
    category: 'constraints',
    claims: ['power-efficiency', 'physics-enforced'],
    en: {
      title: 'Constraint System: Core Lifecycle',
      description: 'State machine showing how a variational core transitions from Hibernated (10–100 mW) through Monitoring → Evaluating → Computing → Resolving, then returns to sleep.',
    },
    fa: {
      title: 'سیستم محدودیت: چرخه عمر هسته',
      description: 'ماشین حالت نشان‌دهنده انتقال هسته از Hibernated (۱۰-۱۰۰ mW) از طریق نظارت → ارزیابی → محاسبه → حل، سپس بازگشت به خواب.',
    },
    mermaid: `stateDiagram-v2
    [*] --> Hibernated
    Hibernated --> Monitoring: |ΔS| > ε_wake
    Monitoring --> Evaluating: Gradient exceeds threshold
    Evaluating --> Allocating: Constraint violation detected
    Allocating --> Computing: Channel allocated
    Computing --> Resolving: Perturbation computation
    Resolving --> Deallocating: Resolution complete
    Deallocating --> Monitoring: Channel released
    Monitoring --> Hibernated: |ΔS| < ε_hibernate
    note right of Hibernated
        Power: 10-100mW
        Action Detection Module active
        Trajectory cached in LSM
    end note
    note right of Computing
        Power: 5-15W peak
        Symplectic Integrator active
        Variational channel allocated
    end note`,
  },

  {
    id: 'constitutional-governance-synthesis',
    collection: 'doc01',
    type: 'flowchart',
    category: 'governance',
    claims: ['safety', 'fault-tolerance'],
    en: {
      title: 'Constitutional Governance: Archive–Processing–Decision',
      description: 'Three-layer governance model: Archive (facts, unknowns, temporal index), Processing (Proposer, Validator, Arbiter), and Decision (consensus → archive or unknown registry).',
    },
    fa: {
      title: 'حاکمیت قانون اساسی: آرشیو–پردازش–تصمیم',
      description: 'مدل حاکمیت سه لایه: آرشیو (حقایق، مجهولات، فهرست زمانی)، پردازش (پیشنهاددهنده، اعتبارسنج، داور) و تصمیم (اجماع → آرشیو یا ثبت مجهولات).',
    },
    mermaid: `flowchart TB
    subgraph Archive Layer
        A1[Persistent Memory: Facts + Provenance]
        A2[Unknown Registry: Known Unknowns]
        A3[Temporal Index: Event Timeline]
    end
    subgraph Processing Layer
        P1[Proposer: Generate Candidates]
        P2[Validator: Independent Verification]
        P3[Arbiter: Conflict Resolution]
    end
    subgraph Decision Layer
        D1{Consensus Achieved?}
        D2[Accept to Archive]
        D3[Flag as Unknown]
        D4[Arbiter Review]
    end
    P1 --> D1
    P2 --> D1
    D1 -->|Yes| D2
    D1 -->|No| D3
    D1 -->|Conflict| D4
    D2 --> A1
    D3 --> A2
    D4 --> P3
    P3 --> D1
    A1 -.->|Query| P2
    A2 -.->|Priority Learning| P1
    A3 -.->|Temporal Ordering| P3
    style Archive Layer fill:#ffe,stroke:#333,stroke-width:2px
    style Processing Layer fill:#efe,stroke:#333,stroke-width:2px
    style Decision Layer fill:#eef,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'isa-category-hierarchy',
    collection: 'doc01',
    type: 'graph',
    category: 'isa',
    claims: ['physics-enforced', 'latency'],
    en: {
      title: 'PICAPD ISA v1.0 — Instruction Category Hierarchy',
      description: 'Full instruction taxonomy: Lagrangian Ops (LEVAL, LGRAD, ACTION), Constraint Ops (CSET, CCLEAR, CWAIT, CTEST), Population, Event, and Memory ops.',
    },
    fa: {
      title: 'سلسله‌مراتب دسته‌بندی دستورالعمل PICAPD ISA v1.0',
      description: 'طبقه‌بندی کامل دستورالعمل: عملیات لاگرانژ (LEVAL, LGRAD, ACTION)، عملیات محدودیت (CSET, CCLEAR, CWAIT, CTEST)، عملیات جمعیت، رویداد و حافظه.',
    },
    mermaid: `graph TD
    ISA[PICAPD ISA v1.0]
    ISA --> CAT1[Lagrangian Operations]
    ISA --> CAT2[Constraint Operations]
    ISA --> CAT3[Population Operations]
    ISA --> CAT4[Event Operations]
    ISA --> CAT5[Memory Operations]
    CAT1 --> L1[LEVAL: Evaluate L q,q-dot]
    CAT1 --> L2[LGRAD_Q: δL/δq]
    CAT1 --> L3[LGRAD_V: δL/δq-dot]
    CAT1 --> L4[ACTION: Compute ΔS]
    CAT2 --> C1[CSET: Mark constraint satisfied]
    CAT2 --> C2[CCLEAR: Mark constraint violated]
    CAT2 --> C3[CWAIT: Block on constraint]
    CAT2 --> C4[CTEST: Query constraint state]
    CAT3 --> P1[PSPAWN: Create agent instance]
    CAT3 --> P2[PTERM: Terminate agent]
    CAT3 --> P3[PAGG: Aggregate population moment]
    CAT4 --> E1[EBROADCAST: Propagate event]
    CAT4 --> E2[ESUBSCRIBE: Register for events]
    CAT4 --> E3[EFILTER: Set event threshold]
    CAT5 --> M1[MLOAD: Load from LSM]
    CAT5 --> M2[MSTORE: Store to LSM]
    CAT5 --> M4[MFLUSH: Write persistent memory]
    style ISA fill:#f99,stroke:#333,stroke-width:3px
    style CAT1 fill:#9f9,stroke:#333,stroke-width:2px
    style CAT2 fill:#99f,stroke:#333,stroke-width:2px
    style CAT3 fill:#f9f,stroke:#333,stroke-width:2px
    style CAT4 fill:#9ff,stroke:#333,stroke-width:2px
    style CAT5 fill:#ff9,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'three-layer-operational-model',
    collection: 'doc01',
    type: 'flowchart',
    category: 'overview',
    claims: ['physics-enforced', 'safety', 'scalability'],
    en: {
      title: 'Three-Layer Operational Model',
      description: 'Physics Foundation (conservation laws, realizability, variational mechanics) → Computational Substrate (EPU, event network, persistent memory) → Governance Protocol (constitutional, population dynamics, arbiter).',
    },
    fa: {
      title: 'مدل عملیاتی سه لایه',
      description: 'بنیاد فیزیکی (قوانین بقا، تحقق‌پذیری، مکانیک تغییری) → بستر محاسباتی (EPU، شبکه رویداد، حافظه پایدار) → پروتکل حاکمیت (قانون اساسی، دینامیک جمعیت، داور).',
    },
    mermaid: `flowchart TB
    subgraph Layer 1 Physics Foundation
        direction LR
        PH1[Conservation Laws]
        PH2[Realizability Constraints]
        PH3[Variational Mechanics]
    end
    subgraph Layer 2 Computational Substrate
        direction LR
        CS1[EPU Hardware Primitives]
        CS2[Event Propagation Network]
        CS3[Persistent Memory System]
    end
    subgraph Layer 3 Governance Protocol
        direction LR
        GP1[Constitutional Framework]
        GP2[Agent Population Dynamics]
        GP3[Unknown Registry and Arbiter]
    end
    PH1 --> CS1
    PH2 --> CS2
    PH3 --> CS3
    CS1 --> GP1
    CS2 --> GP2
    CS3 --> GP3
    style Layer 1 Physics Foundation fill:#fee,stroke:#333,stroke-width:2px
    style Layer 2 Computational Substrate fill:#efe,stroke:#333,stroke-width:2px
    style Layer 3 Governance Protocol fill:#eef,stroke:#333,stroke-width:2px`,
  },

  /* ─────────────────────────────── DOC 02 ─────────────────────────────── */
  {
    id: 'three-tier-hierarchy',
    collection: 'doc02',
    type: 'flowchart',
    category: 'hierarchy',
    claims: ['latency', 'power-efficiency'],
    en: {
      title: 'Three-Tier Hierarchical Processing',
      description: '10,000-bit sensor context partitioned across 100 Workers → 10 Managers → 1 Queen. Total 3.4 ns end-to-end latency with 10,000:1 compression.',
    },
    fa: {
      title: 'پردازش سلسله‌مراتبی سه لایه',
      description: 'زمینه حسگر ۱۰,۰۰۰ بیتی در ۱۰۰ کارگر → ۱۰ مدیر → ۱ ملکه تقسیم می‌شود. تأخیر کلی ۳.۴ ns با فشرده‌سازی ۱۰,۰۰۰:۱.',
    },
    mermaid: `flowchart TB
    subgraph Input Context Layer
        IC[10,000-bit Sensor/Context Stream]
    end
    subgraph Worker Tier 100 Units
        direction LR
        W1[W1: 100b to 1b] --> W2[W2: 100b to 1b]
        W2 --> W3[W3: 100b to 1b]
        W3 --> W4[...]
        W4 --> W100[W100: 100b to 1b]
    end
    subgraph Manager Tier 10 Units
        direction LR
        M1[M1: 10b to 1b] --> M2[M2: 10b to 1b]
        M2 --> M3[...]
        M3 --> M10[M10: 10b to 1b]
    end
    subgraph Queen Tier 1 Unit
        Q[Queen: 10b to 1b - Final Decision]
    end
    subgraph Persistent Memory Layer
        PM1[Archive: Validated Facts]
        PM2[Unknown Registry: Known Unknowns]
        PM3[Temporal Index: Event Log]
    end
    IC -.->|Partition| W1
    W1 --> M1
    W100 --> M10
    M1 --> Q
    M10 --> Q
    Q --> PM1
    Q --> PM2
    Q -.->|Timestamp| PM3
    style Input Context Layer fill:#ffe,stroke:#333,stroke-width:2px
    style Worker Tier 100 Units fill:#dfd,stroke:#333,stroke-width:2px
    style Manager Tier 10 Units fill:#ddf,stroke:#333,stroke-width:2px
    style Queen Tier 1 Unit fill:#fdd,stroke:#333,stroke-width:2px
    style Persistent Memory Layer fill:#ffd,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'kte-specification-phase',
    collection: 'doc02',
    type: 'flowchart',
    category: 'isa',
    claims: ['safety', 'power-efficiency', 'latency'],
    en: {
      title: 'KTE Specification Phase — Objective Mapping',
      description: 'Three primary objective paths: Safety-Critical (FNR < 10⁻⁹, latency < 5 ns), Performance-Critical (10⁶ decisions/sec), and Energy-Critical (<20 W average), each with their constraints and success metrics.',
    },
    fa: {
      title: 'مرحله مشخصه‌سازی KTE — نگاشت اهداف',
      description: 'سه مسیر هدف اصلی: ایمنی بحرانی (FNR < 10⁻⁹، تأخیر < 5 ns)، عملکرد بحرانی (10⁶ تصمیم/ثانیه) و انرژی بحرانی (<20 W میانگین).',
    },
    mermaid: `flowchart TD
    Start[Agent Population Governance Task]
    Start --> Spec1{Primary Objective}
    Spec1 -->|Safety-Critical| Safe[Maximize Decision Reliability - FNR less than 1e-9]
    Spec1 -->|Performance-Critical| Perf[Maximize Throughput - 1M decisions/sec]
    Spec1 -->|Energy-Critical| Energy[Minimize Power - less than 20W average]
    Safe --> Constr1[Latency less than 5ns - No false negatives]
    Perf --> Constr2[Accuracy more than 95% - Power less than 50W]
    Energy --> Constr3[Accuracy more than 90% - Latency less than 100ns]
    Constr1 --> Metrics1[DPPM less than 1 - Audit Trail Complete]
    Constr2 --> Metrics2[Sustained 1M ops/sec - 99.9% uptime]
    Constr3 --> Metrics3[Joules/decision less than 1e-6 - Battery life extended]
    style Start fill:#f99,stroke:#333,stroke-width:2px
    style Safe fill:#9f9,stroke:#333,stroke-width:2px
    style Perf fill:#99f,stroke:#333,stroke-width:2px
    style Energy fill:#ff9,stroke:#333,stroke-width:2px`,
  },

  /* ─────────────────────────────── DOC 03 ─────────────────────────────── */
  {
    id: 'complete-architecture-stack',
    collection: 'doc03',
    type: 'flowchart',
    category: 'overview',
    claims: ['scalability', 'physics-enforced'],
    en: {
      title: 'Complete Architecture Stack',
      description: 'Five-layer stack: Application (vehicles, robotics, scientific computing) → Agent Governance → Computational Substrate (24 variational cores) → Hardware (7 nm, 250 mm²) → Physical (sensors/actuators).',
    },
    fa: {
      title: 'پشته معماری کامل',
      description: 'پشته پنج لایه: کاربرد (وسایل نقلیه، رباتیک، محاسبات علمی) → حاکمیت عامل → بستر محاسباتی (۲۴ هسته تغییری) → سخت‌افزار (۷ nm، ۲۵۰ mm²) → فیزیکی (حسگرها/محرک‌ها).',
    },
    mermaid: `flowchart TB
    subgraph Application Layer
        direction LR
        App1[Autonomous Vehicles]
        App2[Industrial Robotics]
        App3[Scientific Computing]
    end
    subgraph Agent Governance Layer
        direction LR
        AG1[LLM Agent Population]
        AG2[Constitutional Framework]
        AG3[Unknown Registry]
    end
    subgraph Computational Substrate Layer
        direction LR
        CS1[24 Variational Cores]
        CS2[Event Dispatch Network]
        CS3[Persistent Memory]
    end
    subgraph Hardware Layer
        direction LR
        HW1[7nm TSMC 250mm2 Die]
        HW2[HBM3 Memory]
        HW3[PCIe 5.0 Interface]
    end
    subgraph Physical Layer
        direction LR
        PH1[Sensor Inputs]
        PH2[Actuator Outputs]
        PH3[Power Management]
    end
    App1 & App2 & App3 --> AG1 & AG2 & AG3
    AG1 & AG2 & AG3 --> CS1 & CS2 & CS3
    CS1 & CS2 & CS3 --> HW1 & HW2 & HW3
    HW1 & HW2 & HW3 --> PH1 & PH2 & PH3
    style Application Layer fill:#fee,stroke:#333,stroke-width:3px
    style Agent Governance Layer fill:#efe,stroke:#333,stroke-width:3px
    style Computational Substrate Layer fill:#eef,stroke:#333,stroke-width:3px
    style Hardware Layer fill:#ffe,stroke:#333,stroke-width:3px
    style Physical Layer fill:#fef,stroke:#333,stroke-width:3px`,
  },

  {
    id: 'data-flow-sensors-to-decisions',
    collection: 'doc03',
    type: 'flowchart',
    category: 'hierarchy',
    claims: ['latency', 'physics-enforced', 'safety'],
    en: {
      title: 'Data Flow: Sensors → Decision',
      description: 'Camera/LiDAR/Radar/IMU/GPS → Sensor Fusion (64 Kalman filters) → Generalized Coordinates → Variational Processing → 100 Workers → 10 Managers → Queen → Binary decision with provenance archive.',
    },
    fa: {
      title: 'جریان داده: حسگرها → تصمیم',
      description: 'دوربین/LiDAR/Radar/IMU/GPS → ادغام حسگر (۶۴ فیلتر کالمن) → مختصات تعمیم‌یافته → پردازش تغییری → ۱۰۰ کارگر → ۱۰ مدیر → ملکه → تصمیم دوتایی با آرشیو منشأ.',
    },
    mermaid: `flowchart LR
    subgraph Physical Sensors
        S1[Camera 30 fps]
        S2[LiDAR 10 Hz]
        S3[Radar 20 Hz]
        S4[IMU 100 Hz]
        S5[GPS 10 Hz]
    end
    subgraph Sensor Fusion
        SF[SFSPU - 64 Kalman Filters - Temporal Sync]
    end
    subgraph Generalized Coordinates
        GC[q in R-k - q-dot in R-k - Inverse Problem Solved]
    end
    subgraph Variational Processing
        VP1[Lagrangian Evaluation]
        VP2[Action Gradient Filtering]
        VP3[Constraint Checking]
    end
    subgraph Agent Hierarchy
        AH1[100 Workers - Context Partitioning]
        AH2[10 Managers - Aggregation]
        AH3[1 Queen - Decision]
    end
    subgraph Decision Output
        DO1[Binary Decision: Brake/Accelerate]
        DO2[Provenance: Archive Entry]
        DO3[Uncertainty: Unknown Registry]
    end
    S1 & S2 & S3 & S4 & S5 --> SF
    SF --> GC
    GC --> VP1 --> VP2 --> VP3
    VP3 --> AH1 --> AH2 --> AH3
    AH3 --> DO1 & DO2 & DO3
    style Physical Sensors fill:#dfd,stroke:#333,stroke-width:2px
    style Sensor Fusion fill:#ddf,stroke:#333,stroke-width:2px
    style Agent Hierarchy fill:#dff,stroke:#333,stroke-width:2px
    style Decision Output fill:#fdf,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'power-state-diagram',
    collection: 'doc03',
    type: 'stateDiagram',
    category: 'resources',
    claims: ['power-efficiency'],
    en: {
      title: 'Power State Machine',
      description: 'Hibernation (0.2–2.3 W, 22–23 cores sleeping) → Light Load (17–44 W, 1–2 active) → Medium Load (100–150 W, 5–10 active) → Peak Load (250–300 W, all 24 cores).',
    },
    fa: {
      title: 'ماشین حالت توان',
      description: 'خواب زمستانی (۰.۲–۲.۳ W، ۲۲–۲۳ هسته خواب) → بار سبک (۱۷–۴۴ W، ۱–۲ فعال) → بار متوسط (۱۰۰–۱۵۰ W، ۵–۱۰ فعال) → بار اوج (۲۵۰–۳۰۰ W، همه ۲۴ هسته).',
    },
    mermaid: `stateDiagram-v2
    [*] --> Cold_Boot
    Cold_Boot --> Initialization: Power On
    Initialization --> Hibernation: Cores Idle
    Hibernation --> Light_Load: Action Signal Detected
    Light_Load --> Hibernation: Action Signal Cleared
    Light_Load --> Medium_Load: Load Increase
    Medium_Load --> Light_Load: Load Decrease
    Medium_Load --> Peak_Load: Emergency
    Peak_Load --> Medium_Load: Emergency Resolved
    Hibernation --> Shutdown: System Halt
    Peak_Load --> Emergency_Shutdown: Safety Violation
    Shutdown --> [*]
    Emergency_Shutdown --> [*]
    note right of Hibernation
        Power: 0.2-2.3W
        Cores: 22-23 sleeping
        ADM: Monitoring
    end note
    note right of Light_Load
        Power: 17-44W
        Cores: 1-2 active
        Typical operation
    end note
    note right of Peak_Load
        Power: 250-300W
        Cores: All 24 active
        Emergency response
    end note`,
  },

  {
    id: 'complete-decision-pipeline',
    collection: 'doc03',
    type: 'flowchart',
    category: 'hierarchy',
    claims: ['latency', 'safety', 'physics-enforced'],
    en: {
      title: 'Complete Decision Pipeline',
      description: 'End-to-end flow from 10,000-bit input through input processing, worker partitioning, manager aggregation, queen decision, constitutional validation, and persistence to archive/unknown registry.',
    },
    fa: {
      title: 'خط لوله تصمیم کامل',
      description: 'جریان انتها به انتها از ورودی ۱۰,۰۰۰ بیتی از طریق پردازش ورودی، تقسیم‌بندی کارگر، تجمع مدیر، تصمیم ملکه، اعتبارسنجی قانون اساسی و ماندگاری در آرشیو/ثبت مجهولات.',
    },
    mermaid: `flowchart TB
    START([10,000-bit Context Input])
    subgraph Input Processing
        IP1[Temporal Synchronization]
        IP2[Kalman Filtering]
        IP3[Coordinate Transform]
    end
    subgraph Worker Tier Processing
        direction LR
        WT1[Worker 1: bits 0-99]
        WT2[Worker 2: bits 100-199]
        WT3[Worker 3: bits 200-299]
        WT100[Worker 100: bits 9900-9999]
    end
    subgraph Manager Tier Processing
        direction LR
        MT1[Manager 1: workers 1-10]
        MT2[Manager 2: workers 11-20]
        MT10[Manager 10: workers 91-100]
    end
    subgraph Queen Tier Processing
        QT1[Queen Unit: managers 1-10]
        QT1 --> QTO[1-bit decision]
    end
    subgraph Validation
        VAL1{Constitutional Check}
        VAL2{Constraint Satisfaction}
    end
    subgraph Persistence
        PERS1[Archive: Facts]
        PERS2[Unknown: Uncertainties]
    end
    START --> IP1 --> IP2 --> IP3
    IP3 -.->|Partition| WT1 & WT2 & WT3 & WT100
    WT1 & WT2 & WT3 & WT100 --> MT1 & MT2 & MT10
    MT1 & MT2 & MT10 --> QT1
    QTO --> VAL1
    VAL1 -->|Pass| VAL2
    VAL1 -->|Fail| PERS2
    VAL2 -->|Pass| PERS1
    VAL2 -->|Fail| PERS2
    style Input Processing fill:#fee,stroke:#333,stroke-width:2px
    style Worker Tier Processing fill:#efe,stroke:#333,stroke-width:2px
    style Manager Tier Processing fill:#eef,stroke:#333,stroke-width:2px
    style Queen Tier Processing fill:#ffe,stroke:#333,stroke-width:2px
    style Validation fill:#fef,stroke:#333,stroke-width:2px
    style Persistence fill:#ffd,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'constraint-dependency-graph',
    collection: 'doc03',
    type: 'flowchart',
    category: 'constraints',
    claims: ['physics-enforced', 'safety'],
    en: {
      title: 'Constraint Dependency Graph',
      description: 'Primary (Physics, Safety, Resource), Secondary (Velocity, Actuator, Memory) and Tertiary (Comfort, Efficiency, Predictability) constraints — hard vs. soft boundaries.',
    },
    fa: {
      title: 'گراف وابستگی محدودیت',
      description: 'محدودیت‌های اولیه (فیزیک، ایمنی، منابع)، ثانویه (سرعت، محرک، حافظه) و ثالثی (راحتی، کارایی، پیش‌بینی‌پذیری) — مرزهای سخت در مقابل نرم.',
    },
    mermaid: `flowchart TB
    subgraph Primary Constraints
        C1[C1: Physics - Conservation Laws]
        C2[C2: Safety - Boundary Conditions]
        C3[C3: Resource - Budget Limits]
    end
    subgraph Secondary Constraints
        C4[C4: Velocity Constraints]
        C5[C5: Actuator Saturation]
        C6[C6: Memory Availability]
    end
    subgraph Tertiary Constraints
        C7[C7: Comfort Constraints]
        C8[C8: Efficiency Targets]
        C9[C9: Predictability Requirements]
    end
    C1 --> C4
    C1 --> C7
    C2 --> C4
    C2 --> C5
    C2 --> C7
    C3 --> C6
    C3 --> C8
    C4 --> C8
    C5 --> C7
    C6 --> C9
    C1 -.->|Hard Constraint| BLOCK1[Cannot Violate]
    C2 -.->|Hard Constraint| BLOCK1
    C3 -.->|Soft Constraint| PREFER1[Prefer to Satisfy]
    style Primary Constraints fill:#fdd,stroke:#333,stroke-width:3px
    style Secondary Constraints fill:#ffd,stroke:#333,stroke-width:2px
    style Tertiary Constraints fill:#dff,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'three-branch-constitutional',
    collection: 'doc03',
    type: 'flowchart',
    category: 'governance',
    claims: ['safety', 'fault-tolerance'],
    en: {
      title: 'Three-Branch Constitutional Architecture',
      description: 'Legislative (Archive/persistent memory), Executive (Proposer→Validator→Execution), and Judicial (Arbiter, Unknown Registry, Human Escalation) — separation of powers in silicon.',
    },
    fa: {
      title: 'معماری قانون اساسی سه شاخه',
      description: 'قانون‌گذاری (آرشیو/حافظه پایدار)، اجرایی (پیشنهاددهنده→اعتبارسنج→اجرا) و قضایی (داور، ثبت مجهولات، تصعید انسانی) — تفکیک قوا در سیلیکون.',
    },
    mermaid: `flowchart TB
    subgraph Legislative Branch Archive
        LEG1[Persistent Memory - Validated Facts]
        LEG2[Constitutional Rules - Domain-Specific]
        LEG3[Provenance Database - Complete Audit Trail]
    end
    subgraph Executive Branch Proposer-Validator
        EXE1[Proposer: Generate Claims]
        EXE2[Validator: Independent Verification]
        EXE3[Execution: Actuator Commands]
    end
    subgraph Judicial Branch Arbiter
        JUD1[Conflict Resolution - Evidence Weighing]
        JUD2[Unknown Registry - Epistemic Humility]
        JUD3[Human Escalation - Final Authority]
    end
    LEG2 --> EXE1
    EXE1 --> EXE2
    EXE2 --> EXE3
    EXE2 -->|Validation Failed| JUD1
    JUD1 -->|Cannot Resolve| JUD2
    JUD2 -->|High Priority| JUD3
    JUD1 -->|Resolution| LEG1
    EXE3 -.->|Outcome| LEG3
    LEG1 -.->|Query for Validation| EXE2
    style Legislative Branch Archive fill:#fee,stroke:#333,stroke-width:3px
    style Executive Branch Proposer-Validator fill:#efe,stroke:#333,stroke-width:3px
    style Judicial Branch Arbiter fill:#eef,stroke:#333,stroke-width:3px`,
  },

  {
    id: 'proposer-workflow',
    collection: 'doc03',
    type: 'sequence',
    category: 'governance',
    claims: ['safety', 'latency'],
    en: {
      title: 'Proposer Workflow (Sequence)',
      description: 'Sequence: Sensor Stream → Worker Tier (local constraint checks) → Manager Tier (population moment aggregation) → Proposer (archive query, claim generation with provenance).',
    },
    fa: {
      title: 'جریان کاری پیشنهاددهنده (توالی)',
      description: 'توالی: جریان حسگر → لایه کارگر (بررسی محدودیت محلی) → لایه مدیر (تجمع لحظه جمعیت) → پیشنهاددهنده (جستجوی آرشیو، تولید ادعا با منشأ).',
    },
    mermaid: `sequenceDiagram
    participant Sensor as Sensor Stream
    participant Worker as Worker Tier
    participant Manager as Manager Tier
    participant Proposer as Proposer Module
    participant Archive as Archive Query
    Sensor->>Worker: Raw 10,000-bit context
    Worker->>Worker: Local constraint checks
    Worker->>Manager: 100 compressed outputs
    Manager->>Manager: Aggregate population moments
    Manager->>Proposer: 10 high-level summaries
    Proposer->>Archive: Query: Similar past scenarios?
    Archive-->>Proposer: Historical precedents
    Proposer->>Proposer: Generate claim with confidence
    Proposer->>Proposer: Attach provenance metadata
    Note over Proposer: Claim: Object at x,y - Type: Vehicle - Confidence: 0.87 - Basis: Sensors 2,3,5`,
  },

  {
    id: 'core-activation-strategy',
    collection: 'doc03',
    type: 'flowchart',
    category: 'resources',
    claims: ['power-efficiency', 'scalability'],
    en: {
      title: 'Core Activation Strategy',
      description: 'Workload-driven core scaling: <10k ops/sec → 1 core (hibernate 23); up to >500k ops/sec → 9–24 cores. Continuous latency and power monitoring with automatic up/downscale.',
    },
    fa: {
      title: 'استراتژی فعال‌سازی هسته',
      description: 'مقیاس‌بندی هسته بر اساس بار کاری: <10k عملیات/ثانیه → 1 هسته (23 در خواب)؛ تا >500k عملیات/ثانیه → ۹–۲۴ هسته. نظارت مداوم تأخیر و توان با مقیاس‌بندی خودکار.',
    },
    mermaid: `flowchart TB
    START[System Boot]
    START --> ASSESS[Assess Workload]
    ASSESS --> DECISION{Workload Level?}
    DECISION -->|less than 10k ops/sec| MINIMAL[Activate 1 Core - Hibernate 23]
    DECISION -->|10k-100k ops/sec| LIGHT[Activate 1-2 Cores - Hibernate 22-23]
    DECISION -->|100k-500k ops/sec| MEDIUM[Activate 3-8 Cores - Hibernate 16-21]
    DECISION -->|more than 500k ops/sec| HEAVY[Activate 9-24 Cores - Hibernate 0-15]
    MINIMAL --> MONITOR[Monitor Performance]
    LIGHT --> MONITOR
    MEDIUM --> MONITOR
    HEAVY --> MONITOR
    MONITOR --> CHECK{Latency OK?}
    CHECK -->|Yes| POWER{Power OK?}
    CHECK -->|No| UPSCALE[Activate More Cores]
    POWER -->|Yes| STABLE[Maintain Configuration]
    POWER -->|No| DOWNSCALE[Hibernate Cores]
    UPSCALE --> MONITOR
    DOWNSCALE --> MONITOR
    STABLE --> ASSESS
    style MINIMAL fill:#dfd,stroke:#333,stroke-width:2px
    style LIGHT fill:#ffd,stroke:#333,stroke-width:2px
    style MEDIUM fill:#fdd,stroke:#333,stroke-width:2px
    style HEAVY fill:#ddf,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'power-budget-typical',
    collection: 'doc03',
    type: 'pie',
    category: 'resources',
    claims: ['power-efficiency'],
    en: {
      title: 'Power Budget — Typical Operation (22 W)',
      description: 'Power breakdown at typical load: ~10 W active cores, ~5 W PCIe/HBM interface, ~3 W channel router, ~2 W L2 cache, ~1 W hibernated cores, ~0.5 W event network.',
    },
    fa: {
      title: 'بودجه توان — عملکرد معمولی (۲۲ W)',
      description: 'تفکیک توان در بار معمولی: ~10 W هسته‌های فعال، ~5 W رابط PCIe/HBM، ~3 W مسیریاب کانال، ~2 W کش L2، ~1 W هسته‌های خواب، ~0.5 W شبکه رویداد.',
    },
    mermaid: `pie
    title Power Budget Distribution Typical 22W
    "Active Cores (1-2)" : 10
    "PCIe/HBM Interface" : 5
    "Channel Router" : 3
    "L2 Cache" : 2
    "Hibernated Cores (22-23)" : 1
    "Sensor Fusion SFSPU" : 1
    "Event Dispatch Network" : 0.5`,
  },

  {
    id: 'power-budget-peak',
    collection: 'doc03',
    type: 'pie',
    category: 'resources',
    claims: ['power-efficiency', 'scalability'],
    en: {
      title: 'Power Budget — Peak Operation (300 W)',
      description: 'Full-system power at peak: 240 W for all 24 active cores, 25 W PCIe/HBM, 15 W channel router, 10 W L2 cache, 5 W sensor fusion, 5 W event dispatch.',
    },
    fa: {
      title: 'بودجه توان — عملکرد اوج (۳۰۰ W)',
      description: 'توان کامل سیستم در اوج: ۲۴۰ W برای همه ۲۴ هسته فعال، ۲۵ W رابط PCIe/HBM، ۱۵ W مسیریاب کانال، ۱۰ W کش L2، ۵ W ادغام حسگر، ۵ W ارسال رویداد.',
    },
    mermaid: `pie
    title Power Budget Distribution Peak 300W
    "Active Cores (24)" : 240
    "PCIe/HBM Interface" : 25
    "Channel Router" : 15
    "L2 Cache" : 10
    "SFSPU Sensor Fusion" : 5
    "Event Dispatch Network" : 5`,
  },

  {
    id: 'error-classification-response',
    collection: 'doc03',
    type: 'flowchart',
    category: 'errors',
    claims: ['fault-tolerance', 'safety'],
    en: {
      title: 'Error Classification & Response',
      description: 'Four error categories: Transient (retry with backoff), Persistent (isolate → reroute → degraded mode), Byzantine (multi-path cross-validate → majority vote), Safety-Critical (immediate halt → operator alert).',
    },
    fa: {
      title: 'طبقه‌بندی خطا و پاسخ',
      description: 'چهار دسته خطا: گذرا (تلاش مجدد با تأخیر)، مداوم (جداسازی → مسیریابی مجدد → حالت کاهش‌یافته)، بیزانسی (اعتبارسنجی چند مسیر)، ایمنی بحرانی (توقف فوری → هشدار اپراتور).',
    },
    mermaid: `flowchart TB
    ERROR[Error Detected]
    ERROR --> CLASS{Error Category?}
    CLASS -->|Transient| TRANS[Retry with backoff]
    CLASS -->|Persistent| PERS[Isolate faulty component]
    CLASS -->|Byzantine| BYZ[Multi-path verification]
    CLASS -->|Safety-Critical| SAFE[Immediate halt]
    TRANS --> RETRY{Retry Success?}
    RETRY -->|Yes| RESUME[Resume operation]
    RETRY -->|No| PERS
    PERS --> ISOLATE[Mark component faulty]
    ISOLATE --> REROUTE[Reroute workload]
    REROUTE --> DEGRADE[Degraded mode]
    BYZ --> VERIFY[Cross-validate with redundant paths]
    VERIFY --> VOTE{Majority Agreement?}
    VOTE -->|Yes| RESUME
    VOTE -->|No| SAFE
    SAFE --> HALT[Emergency stop]
    HALT --> NOTIFY[Alert operator]
    NOTIFY --> DIAG[Diagnostic mode]
    style TRANS fill:#dfd,stroke:#333,stroke-width:2px
    style PERS fill:#ffd,stroke:#333,stroke-width:2px
    style BYZ fill:#ddf,stroke:#333,stroke-width:2px
    style SAFE fill:#fdd,stroke:#333,stroke-width:3px`,
  },

  {
    id: 'graceful-degradation',
    collection: 'doc03',
    type: 'flowchart',
    category: 'errors',
    claims: ['fault-tolerance', 'safety'],
    en: {
      title: 'Graceful Degradation Strategy',
      description: 'Full Capability (24 cores) → Degraded L1 (20–23) → Degraded L2 (15–19) → Degraded L3 (10–14) → Emergency Mode (5–9, limp home) → Safe Stop (controlled shutdown).',
    },
    fa: {
      title: 'استراتژی کاهش تدریجی',
      description: 'ظرفیت کامل (۲۴ هسته) → کاهش L1 (۲۰–۲۳) → کاهش L2 (۱۵–۱۹) → کاهش L3 (۱۰–۱۴) → حالت اضطراری (۵–۹، حرکت محدود) → توقف ایمن (خاموش کردن کنترل‌شده).',
    },
    mermaid: `flowchart LR
    subgraph Full Capability
        FC[24 Cores Active - All Features - Peak Performance]
    end
    subgraph Degraded Level 1
        D1[20-23 Cores - Reduced Throughput - Full Safety]
    end
    subgraph Degraded Level 2
        D2[15-19 Cores - Limited Throughput - Core Safety Only]
    end
    subgraph Degraded Level 3
        D3[10-14 Cores - Minimal Throughput - Emergency Functions]
    end
    subgraph Emergency Mode
        EM[5-9 Cores - Limp Home - Human Takeover]
    end
    subgraph Safe Stop
        SS[Controlled Shutdown - Log State - Notify Operator]
    end
    FC -->|Minor Fault| D1
    D1 -->|Minor Fault| D2
    D2 -->|Minor Fault| D3
    D3 -->|Minor Fault| EM
    EM -->|Critical Fault| SS
    FC -->|Major Fault| D2
    D2 -->|Major Fault| EM
    FC -->|Critical Fault| SS
    style FC fill:#dfd,stroke:#333,stroke-width:3px
    style D1 fill:#ffd,stroke:#333,stroke-width:2px
    style D2 fill:#fed,stroke:#333,stroke-width:2px
    style D3 fill:#fdd,stroke:#333,stroke-width:2px
    style EM fill:#fcc,stroke:#333,stroke-width:3px
    style SS fill:#ccc,stroke:#333,stroke-width:3px`,
  },

  {
    id: 'vehicle-system-integration',
    collection: 'doc03',
    type: 'flowchart',
    category: 'deployment',
    claims: ['scalability', 'safety', 'physics-enforced'],
    en: {
      title: 'Autonomous Vehicle System Integration',
      description: 'Full AV integration: 8 cameras + 4 LiDARs + 6 radars + IMU/GPS → preprocessing → SFSPU → vEPU-24 (constraint processing) → Safety Monitor watchdog → Steering/Brake/Throttle.',
    },
    fa: {
      title: 'یکپارچه‌سازی سیستم خودروی خودران',
      description: 'یکپارچه‌سازی کامل AV: ۸ دوربین + ۴ LiDAR + ۶ رادار + IMU/GPS → پیش‌پردازش → SFSPU → vEPU-24 (پردازش محدودیت) → نگهبان ایمنی → فرمان/ترمز/گاز.',
    },
    mermaid: `flowchart TB
    subgraph Vehicle Sensors
        CAM[8 Cameras 2MP at 30fps]
        LID[4 LiDARs 128-channel]
        RAD[6 Radars 77 GHz]
        IMU[IMU 100 Hz]
        GPS[GPS/GNSS 10 Hz]
    end
    subgraph Sensor Preprocessing
        CAMPROC[Camera ISP JPEG compression]
        LIDPROC[LiDAR Point Cloud Voxel grid]
        RADPROC[Radar Doppler FFT]
    end
    subgraph PICAPD System
        SFSPU[Sensor Fusion - Kalman Filtering - Temporal Sync]
        EPU[vEPU-24 - Constraint Processing - Agent Governance]
        PERSIST[Persistent Memory - Archive + Unknown]
    end
    subgraph Vehicle Control
        STEER[Steering Controller 100 Hz]
        BRAKE[Brake Controller 100 Hz]
        THROTTLE[Throttle Controller 100 Hz]
    end
    subgraph Safety Monitor
        SAFETY[Watchdog - Redundant Checker - Emergency Override]
    end
    CAM --> CAMPROC
    LID --> LIDPROC
    RAD --> RADPROC
    IMU --> SFSPU
    GPS --> SFSPU
    CAMPROC --> SFSPU
    LIDPROC --> SFSPU
    RADPROC --> SFSPU
    SFSPU --> EPU
    EPU --> PERSIST
    EPU --> SAFETY
    SAFETY --> STEER & BRAKE & THROTTLE
    SAFETY -.->|Override| EPU
    style Vehicle Sensors fill:#fee,stroke:#333,stroke-width:2px
    style PICAPD System fill:#eef,stroke:#333,stroke-width:3px
    style Safety Monitor fill:#fdd,stroke:#333,stroke-width:3px`,
  },

  {
    id: 'single-die-configuration',
    collection: 'doc03',
    type: 'flowchart',
    category: 'deployment',
    claims: ['scalability', 'power-efficiency'],
    en: {
      title: 'vEPU-24 Single-Die Configuration',
      description: '250 mm² die layout: 6 quads × 4 cores, 10 mm² Event Dispatch Network, 20 mm² L2 Cache, 30 mm² SFSPU, 15 mm² Channel Router, plus HBM3 64 GB at 819 GB/s and PCIe 5.0.',
    },
    fa: {
      title: 'پیکربندی تک‌قرصی vEPU-24',
      description: 'طرح قرص ۲۵۰ mm²: ۶ چهارتایی × ۴ هسته، شبکه ارسال رویداد ۱۰ mm²، کش L2 ۲۰ mm²، SFSPU ۳۰ mm²، مسیریاب کانال ۱۵ mm²، به علاوه HBM3 64 GB در 819 GB/s و PCIe 5.0.',
    },
    mermaid: `flowchart TB
    subgraph External Interfaces
        PCIE[PCIe 5.0 x16 Host]
        SENSOR[Sensor I/O 64 channels]
    end
    subgraph vEPU-24 Die 250mm2
        direction TB
        subgraph Quad 0
            C0[Core 0] & C1[Core 1] & C2[Core 2] & C3[Core 3]
        end
        subgraph Quad 1
            C4[Core 4] & C5[Core 5] & C6[Core 6] & C7[Core 7]
        end
        subgraph Quad 2-5
            C8_23[Cores 8-23]
        end
        EDN[Event Dispatch Network 10mm2]
        L2[L2 Cache 16MB 20mm2]
        SFSPU[Sensor Fusion and State Projection 30mm2]
        Router[Channel Router 24x24 Crossbar 15mm2]
    end
    subgraph Memory
        HBM[HBM3 64GB 819 GB/s]
    end
    PCIE <--> Router
    SENSOR <--> SFSPU
    SFSPU --> C0 & C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8_23
    C0 & C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8_23 <--> EDN
    EDN <--> L2
    L2 <--> Router
    Router <--> HBM
    style External Interfaces fill:#fee,stroke:#333,stroke-width:2px
    style vEPU-24 Die 250mm2 fill:#efe,stroke:#333,stroke-width:3px
    style Memory fill:#eef,stroke:#333,stroke-width:2px`,
  },

  {
    id: 'multi-die-system',
    collection: 'doc03',
    type: 'flowchart',
    category: 'deployment',
    claims: ['scalability'],
    en: {
      title: 'Multi-Die System: vEPU-96',
      description: '4× vEPU-24 dies connected via PCIe 5.0 switch (x64 aggregate bandwidth), each with 64 GB HBM3. Inter-die coherence ring enables 96-core coordinated operation.',
    },
    fa: {
      title: 'سیستم چند قرصی: vEPU-96',
      description: '۴× قرص vEPU-24 از طریق سوئیچ PCIe 5.0 متصل (پهنای باند x64)، هر کدام با 64 GB HBM3. حلقه انسجام بین‌قرصی عملکرد هماهنگ ۹۶ هسته‌ای را فعال می‌کند.',
    },
    mermaid: `flowchart LR
    subgraph Host System
        CPU[Host CPU Xeon/EPYC]
        DRAM[System DRAM]
    end
    subgraph PCIe Switch
        SWITCH[PCIe 5.0 Switch x64 aggregate]
    end
    subgraph Die 0
        D0[vEPU-24 Cores 0-23]
        HBM0[HBM3 64GB]
    end
    subgraph Die 1
        D1[vEPU-24 Cores 24-47]
        HBM1[HBM3 64GB]
    end
    subgraph Die 2
        D2[vEPU-24 Cores 48-71]
        HBM2[HBM3 64GB]
    end
    subgraph Die 3
        D3[vEPU-24 Cores 72-95]
        HBM3[HBM3 64GB]
    end
    CPU <--> SWITCH
    DRAM <--> CPU
    SWITCH <--> D0 & D1 & D2 & D3
    D0 <--> HBM0
    D1 <--> HBM1
    D2 <--> HBM2
    D3 <--> HBM3
    D0 <-.->|Inter-die coherence| D1
    D1 <-.->|Inter-die coherence| D2
    D2 <-.->|Inter-die coherence| D3
    D3 <-.->|Inter-die coherence| D0
    style Host System fill:#fee,stroke:#333,stroke-width:2px
    style Die 0 fill:#dfd,stroke:#333,stroke-width:2px
    style Die 1 fill:#ddf,stroke:#333,stroke-width:2px
    style Die 2 fill:#ffd,stroke:#333,stroke-width:2px
    style Die 3 fill:#fdd,stroke:#333,stroke-width:2px`,
  },
];
