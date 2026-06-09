/**
 * Multi-Agent System Data Model
 * TWIN IDE Plugin - Comprehensive Component Library
 *
 * Contains all 101 TWIN system components organized into 9 logical categories
 */

// Category IDs
export const CATEGORIES = {
    CORE_MULTIAGENT: 'core-multiagent-system',
    COMMUNICATION: 'communication-messaging',
    TRUST_REPUTATION: 'trust-reputation-system',
    HISTORY_AUDIT: 'history-audit-system',
    MEMORY_MANAGEMENT: 'memory-management',
    STATION_MANAGEMENT: 'station-management',
    CLAUDE_AI: 'claude-ai-services',
    UI_COMPONENTS: 'ui-components',
    PLUGIN_SETTINGS: 'plugin-settings',
    TASK_WORKFLOW: 'task-workflow'
};

// System Overview
export const SYSTEM_INFO = {
    totalFiles: 101,
    systemName: 'TWIN Multi-Agent IDE Plugin',
    systemDescription: {
        en: 'A sophisticated IntelliJ IDEA plugin implementing a multi-agent autonomous development system with trust-based coordination, distributed memory, secure communication, and AI-powered code assistance through Claude integration',
        fa: 'یک پلاگین پیشرفته IntelliJ IDEA که سیستم توسعه خودکار چند-عامله با هماهنگی مبتنی بر اعتماد، حافظه توزیع‌شده، ارتباطات امن و کمک کدنویسی هوش مصنوعی از طریق یکپارچه‌سازی کلود را پیاده‌سازی می‌کند'
    },
    architecturalLayers: {
        en: [
            'UI Layer: IntelliJ IDE integration with tool windows, panels, and status bars',
            'Service Layer: Claude AI integration, multi-agent orchestration, and core services',
            'Communication Layer: Message bus, secure channels, and inter-agent messaging',
            'Trust Layer: Distributed trust management, reputation, and consensus validation',
            'Memory Layer: Tiered distributed memory with persistence and state management',
            'History Layer: Immutable event ledger and comprehensive audit trails',
            'Station Layer: Agent deployment infrastructure and resource allocation'
        ],
        fa: [
            'لایه رابط کاربری: یکپارچه‌سازی IDE IntelliJ با پنجره‌های ابزار، پانل‌ها و نوار وضعیت',
            'لایه سرویس: یکپارچه‌سازی هوش مصنوعی کلود، هماهنگ‌سازی چند-عامله و سرویس‌های هسته',
            'لایه ارتباطات: باس پیام، کانال‌های امن و پیام‌رسانی بین-عامله',
            'لایه اعتماد: مدیریت اعتماد توزیع‌شده، اعتبار و اعتبارسنجی اجماعی',
            'لایه حافظه: حافظه توزیع‌شده لایه‌ای با ماندگاری و مدیریت وضعیت',
            'لایه تاریخچه: دفتر رویداد تغییرناپذیر و ردیابی حسابرسی جامع',
            'لایه ایستگاه: زیرساخت استقرار عامل و تخصیص منابع'
        ]
    },
    keyTechnologies: {
        en: [
            'IntelliJ Platform SDK',
            'Claude AI API Integration',
            'Multi-Agent Systems',
            'Distributed Trust & Consensus',
            'Cryptographic Security',
            'Tiered Memory Architecture',
            'Event Sourcing & CQRS',
            'Real-time Monitoring'
        ],
        fa: [
            'SDK پلتفرم IntelliJ',
            'یکپارچه‌سازی API هوش مصنوعی کلود',
            'سیستم‌های چند-عامله',
            'اعتماد و اجماع توزیع‌شده',
            'امنیت رمزنگاری',
            'معماری حافظه لایه‌ای',
            'رویدادمحوری و CQRS',
            'نظارت بلادرنگ'
        ]
    }
};

// Category 1: Core Multi-Agent System (15 files)
export const CORE_MULTIAGENT_CATEGORY = {
    id: CATEGORIES.CORE_MULTIAGENT,
    name: { en: 'Core Multi-Agent System', fa: 'سیستم هسته چند-عامله' },
    description: {
        en: 'Core orchestration, lifecycle management, and coordination infrastructure for the multi-agent system',
        fa: 'هماهنگ‌سازی هسته، مدیریت چرخه حیات و زیرساخت هماهنگی برای سیستم چند-عامله'
    },
    count: 15,
    icon: '🤖',
    components: [
        {
            id: 'multi-agent-orchestrator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 17c0d390af6d44e8b3065d7f204a03d3.md',
            title: { en: 'Multi-Agent Orchestrator', fa: 'هماهنگ‌کننده چند-عامله' },
            component: 'MultiAgentOrchestrator',
            path: 'com.IDE.plugin.ai.multiagent.MultiAgentOrchestrator',
            status: '✅',
            tags: ['orchestration', 'core', 'coordination']
        },
        {
            id: 'agent-lifecycle-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent a91c3d3a5f21495791cc567a6382f3da.md',
            title: { en: 'Agent Lifecycle Manager', fa: 'مدیر چرخه حیات عامل' },
            component: 'AgentLifecycleManager',
            path: 'com.IDE.plugin.ai.multiagent.AgentLifecycleManager',
            status: '✅',
            tags: ['lifecycle', 'management', 'agent']
        },
        {
            id: 'agent-management-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent f4baa1bdaac04f3a9eba5cada6a39b83.md',
            title: { en: 'Agent Management Service', fa: 'سرویس مدیریت عامل' },
            component: 'AgentManagementService',
            path: 'com.IDE.plugin.ai.multiagent.AgentManagementService',
            status: '✅',
            tags: ['service', 'management', 'agent']
        },
        {
            id: 'agent-deployment-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 76dbe48a7c8a4d71aedd1cd441f1d1ef.md',
            title: { en: 'Agent Deployment Manager', fa: 'مدیر استقرار عامل' },
            component: 'AgentDeploymentManager',
            path: 'com.IDE.plugin.ai.multiagent.AgentDeploymentManager',
            status: '✅',
            tags: ['deployment', 'management', 'agent']
        },
        {
            id: 'agent-configuration',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 83ebeac9a23a49b6a842cfd0ad961b1f.md',
            title: { en: 'Agent Configuration', fa: 'پیکربندی عامل' },
            component: 'AgentConfiguration',
            path: 'com.IDE.plugin.ai.multiagent.AgentConfiguration',
            status: '✅',
            tags: ['configuration', 'agent', 'settings']
        },
        {
            id: 'agent-role-definition',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 8640e68afa0e4e0e8c92171f4f81b6b2.md',
            title: { en: 'Agent Role Definition', fa: 'تعریف نقش عامل' },
            component: 'AgentRole',
            path: 'com.IDE.plugin.ai.multiagent.AgentRole',
            status: '✅',
            tags: ['role', 'agent', 'definition']
        },
        {
            id: 'agent-state',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 865361ea0ae54ed6938748024b862bc8.md',
            title: { en: 'Agent State', fa: 'وضعیت عامل' },
            component: 'AgentState',
            path: 'com.IDE.plugin.ai.multiagent.AgentState',
            status: '✅',
            tags: ['state', 'agent', 'status']
        },
        {
            id: 'agent-monitoring-data',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 8d095901a3f8457aab05f9bdbfc730e6.md',
            title: { en: 'Agent Monitoring Data', fa: 'داده‌های نظارت عامل' },
            component: 'AgentMonitoringData',
            path: 'com.IDE.plugin.ai.multiagent.AgentMonitoringData',
            status: '✅',
            tags: ['monitoring', 'data', 'agent']
        },
        {
            id: 'agent-metrics',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 966a23f964174a4cb508571442a809dc.md',
            title: { en: 'Agent Metrics', fa: 'معیارهای عامل' },
            component: 'AgentMetrics',
            path: 'com.IDE.plugin.ai.multiagent.AgentMetrics',
            status: '✅',
            tags: ['metrics', 'monitoring', 'agent']
        },
        {
            id: 'system-monitor',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 9c79de66963d4d50bec7a7377c6f2b17.md',
            title: { en: 'System Monitor', fa: 'ناظر سیستم' },
            component: 'SystemMonitor',
            path: 'com.IDE.plugin.ai.multiagent.SystemMonitor',
            status: '✅',
            tags: ['monitoring', 'system', 'health']
        },
        {
            id: 'system-health-status',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 023f57abeb9447e78f02f4d78121e04b.md',
            title: { en: 'System Health Status', fa: 'وضعیت سلامت سیستم' },
            component: 'SystemHealthStatus',
            path: 'com.IDE.plugin.ai.multiagent.SystemHealthStatus',
            status: '✅',
            tags: ['health', 'status', 'system']
        },
        {
            id: 'health-severity',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 02ecef5659494e0cadbb28c966c1a318.md',
            title: { en: 'Health Severity', fa: 'شدت سلامت' },
            component: 'HealthSeverity',
            path: 'com.IDE.plugin.ai.multiagent.core.HealthSeverity',
            status: '✅',
            tags: ['health', 'severity', 'enum']
        },
        {
            id: 'agent-task-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent b5102d07155c46be8adb1d3513e06b0f.md',
            title: { en: 'Agent Task Manager', fa: 'مدیر وظایف عامل' },
            component: 'AgentTaskManager',
            path: 'com.IDE.plugin.ai.multiagent.AgentTaskManager',
            status: '✅',
            tags: ['task', 'management', 'agent']
        },
        {
            id: 'task-queue-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent b5491e5e07e6440e800abb8c7207784f.md',
            title: { en: 'Task Queue Manager', fa: 'مدیر صف وظایف' },
            component: 'TaskQueueManager',
            path: 'com.IDE.plugin.ai.multiagent.TaskQueueManager',
            status: '✅',
            tags: ['queue', 'task', 'management']
        },
        {
            id: 'agent-capability',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent b72e55d7fdc84746ac321ae43d83f012.md',
            title: { en: 'Agent Capability', fa: 'قابلیت عامل' },
            component: 'AgentCapability',
            path: 'com.IDE.plugin.ai.multiagent.AgentCapability',
            status: '✅',
            tags: ['capability', 'agent', 'feature']
        }
    ]
};

// Category 2: Communication & Messaging (12 files)
export const COMMUNICATION_CATEGORY = {
    id: CATEGORIES.COMMUNICATION,
    name: { en: 'Communication & Messaging', fa: 'ارتباطات و پیام‌رسانی' },
    description: {
        en: 'Message bus, secure communication channels, and inter-agent messaging infrastructure',
        fa: 'باس پیام، کانال‌های ارتباطی امن و زیرساخت پیام‌رسانی بین-عامله'
    },
    count: 12,
    icon: '📡',
    components: [
        {
            id: 'message-bus',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent bc8e8c467df342d4bdc5185554129db0.md',
            title: { en: 'Message Bus', fa: 'باس پیام' },
            component: 'MessageBus',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessageBus',
            status: '✅',
            tags: ['messaging', 'bus', 'communication']
        },
        {
            id: 'trusted-message-bus',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent bee64f1b60994305b7e809446ca3a3db.md',
            title: { en: 'Trusted Message Bus', fa: 'باس پیام مورد اعتماد' },
            component: 'TrustedMessageBus',
            path: 'com.IDE.plugin.ai.multiagent.communication.TrustedMessageBus',
            status: '✅',
            tags: ['messaging', 'trust', 'secure']
        },
        {
            id: 'message-handler',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent bfe6401c33404601b3b2ef01372a0961.md',
            title: { en: 'Message Handler', fa: 'مدیریت‌کننده پیام' },
            component: 'MessageHandler',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessageHandler',
            status: '✅',
            tags: ['handler', 'message', 'processing']
        },
        {
            id: 'message',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent c132b9546a034c49bfb4d089ebf228be.md',
            title: { en: 'Message', fa: 'پیام' },
            component: 'Message',
            path: 'com.IDE.plugin.ai.multiagent.communication.Message',
            status: '✅',
            tags: ['message', 'data', 'model']
        },
        {
            id: 'message-type',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent c196e24ff36047c4b50a4f867df0adec.md',
            title: { en: 'Message Type', fa: 'نوع پیام' },
            component: 'MessageType',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessageType',
            status: '✅',
            tags: ['message', 'type', 'enum']
        },
        {
            id: 'message-priority',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent c7616a09126f4d31b744d5b68c6c4feb.md',
            title: { en: 'Message Priority', fa: 'اولویت پیام' },
            component: 'MessagePriority',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessagePriority',
            status: '✅',
            tags: ['priority', 'message', 'enum']
        },
        {
            id: 'message-validator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent c8d8f97e23ec46a1971999eff188d1a3.md',
            title: { en: 'Message Validator', fa: 'اعتبارسنج پیام' },
            component: 'MessageValidator',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessageValidator',
            status: '✅',
            tags: ['validation', 'message', 'security']
        },
        {
            id: 'message-router',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent ccfd6e3376bf4ef3918be594946ee32b.md',
            title: { en: 'Message Router', fa: 'مسیریاب پیام' },
            component: 'MessageRouter',
            path: 'com.IDE.plugin.ai.multiagent.communication.MessageRouter',
            status: '✅',
            tags: ['routing', 'message', 'distribution']
        },
        {
            id: 'communication-protocol',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent cf5e5e1a7db34edba7db6b9c824abcac.md',
            title: { en: 'Communication Protocol', fa: 'پروتکل ارتباطی' },
            component: 'CommunicationProtocol',
            path: 'com.IDE.plugin.ai.multiagent.communication.CommunicationProtocol',
            status: '✅',
            tags: ['protocol', 'communication', 'standard']
        },
        {
            id: 'event-bus',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent d2a4f45a1e4641db9d4523b317f46ae6.md',
            title: { en: 'Event Bus', fa: 'باس رویداد' },
            component: 'EventBus',
            path: 'com.IDE.plugin.ai.multiagent.communication.EventBus',
            status: '✅',
            tags: ['event', 'bus', 'publish-subscribe']
        },
        {
            id: 'communication-channel',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent d6dfa96229fc4851b34d10ec3f72dcee.md',
            title: { en: 'Communication Channel', fa: 'کانال ارتباطی' },
            component: 'CommunicationChannel',
            path: 'com.IDE.plugin.ai.multiagent.communication.CommunicationChannel',
            status: '✅',
            tags: ['channel', 'communication', 'transport']
        },
        {
            id: 'secure-message-encryptor',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent d8bb7efdb95a4c7c9c0d3fc761e116f8.md',
            title: { en: 'Secure Message Encryptor', fa: 'رمزگذار پیام امن' },
            component: 'SecureMessageEncryptor',
            path: 'com.IDE.plugin.ai.multiagent.communication.SecureMessageEncryptor',
            status: '✅',
            tags: ['encryption', 'security', 'message']
        }
    ]
};

// Category 3: Trust & Reputation System (14 files)
export const TRUST_REPUTATION_CATEGORY = {
    id: CATEGORIES.TRUST_REPUTATION,
    name: { en: 'Trust & Reputation System', fa: 'سیستم اعتماد و اعتبار' },
    description: {
        en: 'Distributed trust management, reputation scoring, consensus validation, and security mechanisms',
        fa: 'مدیریت اعتماد توزیع‌شده، امتیازدهی اعتبار، اعتبارسنجی اجماعی و مکانیزم‌های امنیتی'
    },
    count: 14,
    icon: '🔐',
    components: [
        {
            id: 'trust-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent e2f4f7409e0e45a489ccbd80024d269e.md',
            title: { en: 'Trust Manager', fa: 'مدیر اعتماد' },
            component: 'TrustManager',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustManager',
            status: '✅',
            tags: ['trust', 'management', 'security']
        },
        {
            id: 'trust-score',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent e526509cd773463595532e479988ec22.md',
            title: { en: 'Trust Score', fa: 'امتیاز اعتماد' },
            component: 'TrustScore',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustScore',
            status: '✅',
            tags: ['score', 'trust', 'metrics']
        },
        {
            id: 'trust-level',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent ea7383a5f829494a95c2e4b36155b6f5.md',
            title: { en: 'Trust Level', fa: 'سطح اعتماد' },
            component: 'TrustLevel',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustLevel',
            status: '✅',
            tags: ['level', 'trust', 'classification']
        },
        {
            id: 'reputation-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 0606ff9bd79d40bfb0df914ef8a26637.md',
            title: { en: 'Reputation Manager', fa: 'مدیر اعتبار' },
            component: 'ReputationManager',
            path: 'com.IDE.plugin.ai.multiagent.trust.ReputationManager',
            status: '✅',
            tags: ['reputation', 'management', 'scoring']
        },
        {
            id: 'consensus-coordinator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 11dc01d50af84ec58910aa5576560a33.md',
            title: { en: 'Consensus Coordinator', fa: 'هماهنگ‌کننده اجماع' },
            component: 'ConsensusCoordinator',
            path: 'com.IDE.plugin.ai.multiagent.trust.ConsensusCoordinator',
            status: '✅',
            tags: ['consensus', 'coordination', 'distributed']
        },
        {
            id: 'consensus-algorithm',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 12906a9db437443196fb4c782afb87a9.md',
            title: { en: 'Consensus Algorithm', fa: 'الگوریتم اجماع' },
            component: 'ConsensusAlgorithm',
            path: 'com.IDE.plugin.ai.multiagent.trust.ConsensusAlgorithm',
            status: '✅',
            tags: ['algorithm', 'consensus', 'validation']
        },
        {
            id: 'signature-validator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 140e025cd2f84e60a0467c2f9f155619.md',
            title: { en: 'Signature Validator', fa: 'اعتبارسنج امضا' },
            component: 'SignatureValidator',
            path: 'com.IDE.plugin.ai.multiagent.trust.SignatureValidator',
            status: '✅',
            tags: ['signature', 'validation', 'cryptography']
        },
        {
            id: 'trust-policy',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 1ceef98c93f54db2ba26dbd37c11dec1.md',
            title: { en: 'Trust Policy', fa: 'سیاست اعتماد' },
            component: 'TrustPolicy',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustPolicy',
            status: '✅',
            tags: ['policy', 'trust', 'rules']
        },
        {
            id: 'trust-verification-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 1e0f8e2991f444b9bcc7703760a01a87.md',
            title: { en: 'Trust Verification Service', fa: 'سرویس تأیید اعتماد' },
            component: 'TrustVerificationService',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustVerificationService',
            status: '✅',
            tags: ['verification', 'service', 'trust']
        },
        {
            id: 'reputation-score',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 277cbde78f0f497eb47bee50d7cdc9a0.md',
            title: { en: 'Reputation Score', fa: 'امتیاز اعتبار' },
            component: 'ReputationScore',
            path: 'com.IDE.plugin.ai.multiagent.trust.ReputationScore',
            status: '✅',
            tags: ['score', 'reputation', 'metrics']
        },
        {
            id: 'trust-update-event',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 2a37bcfcf829407898a569c17fa13a1b.md',
            title: { en: 'Trust Update Event', fa: 'رویداد به‌روزرسانی اعتماد' },
            component: 'TrustUpdateEvent',
            path: 'com.IDE.plugin.ai.multiagent.trust.TrustUpdateEvent',
            status: '✅',
            tags: ['event', 'update', 'trust']
        },
        {
            id: 'security-context',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 2cba8fd047964be3a7d169d92806110d.md',
            title: { en: 'Security Context', fa: 'زمینه امنیتی' },
            component: 'SecurityContext',
            path: 'com.IDE.plugin.ai.multiagent.trust.SecurityContext',
            status: '✅',
            tags: ['security', 'context', 'session']
        },
        {
            id: 'authentication-token',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3d5c022e03934170bd5d746394161f16.md',
            title: { en: 'Authentication Token', fa: 'توکن احراز هویت' },
            component: 'AuthenticationToken',
            path: 'com.IDE.plugin.ai.multiagent.trust.AuthenticationToken',
            status: '✅',
            tags: ['authentication', 'token', 'security']
        },
        {
            id: 'cryptographic-signature',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3e49f0b487b447f79e2ab3f89695058a.md',
            title: { en: 'Cryptographic Signature', fa: 'امضای رمزنگاری' },
            component: 'CryptographicSignature',
            path: 'com.IDE.plugin.ai.multiagent.trust.CryptographicSignature',
            status: '✅',
            tags: ['cryptography', 'signature', 'security']
        }
    ]
};

// Category 4: History & Audit System (8 files)
export const HISTORY_AUDIT_CATEGORY = {
    id: CATEGORIES.HISTORY_AUDIT,
    name: { en: 'History & Audit System', fa: 'سیستم تاریخچه و حسابرسی' },
    description: {
        en: 'Immutable event ledger, history management, audit trails, and compliance tracking',
        fa: 'دفتر رویداد تغییرناپذیر، مدیریت تاریخچه، ردیابی حسابرسی و پیگیری انطباق'
    },
    count: 8,
    icon: '📜',
    components: [
        {
            id: 'history-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3f22d276b0be4caf86c18de2dfb64d7f.md',
            title: { en: 'History Manager', fa: 'مدیر تاریخچه' },
            component: 'HistoryManager',
            path: 'com.IDE.plugin.ai.multiagent.history.core.HistoryManager',
            status: '✅',
            tags: ['history', 'management', 'audit']
        },
        {
            id: 'immutable-event-ledger',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 4086abc085dc4983bf38d6fc17b5e219.md',
            title: { en: 'Immutable Event Ledger', fa: 'دفتر رویداد تغییرناپذیر' },
            component: 'ImmutableEventLedger',
            path: 'com.IDE.plugin.ai.multiagent.history.ImmutableEventLedger',
            status: '✅',
            tags: ['ledger', 'immutable', 'blockchain']
        },
        {
            id: 'event-record',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 40ae43d1b86c46f086b218b2401d25df.md',
            title: { en: 'Event Record', fa: 'رکورد رویداد' },
            component: 'EventRecord',
            path: 'com.IDE.plugin.ai.multiagent.history.EventRecord',
            status: '✅',
            tags: ['record', 'event', 'data']
        },
        {
            id: 'event-query',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 465c8c37b12540318c11a9d531216af2.md',
            title: { en: 'Event Query', fa: 'پرسمان رویداد' },
            component: 'EventQuery',
            path: 'com.IDE.plugin.ai.multiagent.history.EventQuery',
            status: '✅',
            tags: ['query', 'event', 'search']
        },
        {
            id: 'event-type',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 4ac778b2b3d04666b930b609b1f952e9.md',
            title: { en: 'Event Type', fa: 'نوع رویداد' },
            component: 'EventType',
            path: 'com.IDE.plugin.ai.multiagent.history.EventType',
            status: '✅',
            tags: ['type', 'event', 'enum']
        },
        {
            id: 'event-metadata',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 56efc76d8e9e49e597871e261015aa85.md',
            title: { en: 'Event Metadata', fa: 'ابردیتای رویداد' },
            component: 'EventMetadata',
            path: 'com.IDE.plugin.ai.multiagent.history.EventMetadata',
            status: '✅',
            tags: ['metadata', 'event', 'data']
        },
        {
            id: 'audit-logger',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 591f04ce77c946b1807279a72900934b.md',
            title: { en: 'Audit Logger', fa: 'ثبت‌کننده حسابرسی' },
            component: 'AuditLogger',
            path: 'com.IDE.plugin.ai.multiagent.history.AuditLogger',
            status: '✅',
            tags: ['audit', 'logging', 'compliance']
        },
        {
            id: 'event-handler',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 5f4c7aa2f7ad46bbb6cf37ec971260bf.md',
            title: { en: 'Event Handler', fa: 'مدیریت‌کننده رویداد' },
            component: 'EventHandler',
            path: 'com.IDE.plugin.ai.multiagent.history.EventHandler',
            status: '✅',
            tags: ['handler', 'event', 'processing']
        }
    ]
};

// Category 5: Memory Management (13 files)
export const MEMORY_MANAGEMENT_CATEGORY = {
    id: CATEGORIES.MEMORY_MANAGEMENT,
    name: { en: 'Memory Management', fa: 'مدیریت حافظه' },
    description: {
        en: 'Distributed memory system with tiered storage, persistence, state management, and contextual memory',
        fa: 'سیستم حافظه توزیع‌شده با ذخیره‌سازی لایه‌ای، ماندگاری، مدیریت وضعیت و حافظه متنی'
    },
    count: 13,
    icon: '💾',
    components: [
        {
            id: 'memory-state-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 607afc1fe0604d799883ac0e437211da.md',
            title: { en: 'Memory State Manager', fa: 'مدیر وضعیت حافظه' },
            component: 'MemoryStateManager',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryStateManager',
            status: '✅',
            tags: ['memory', 'state', 'management']
        },
        {
            id: 'state-persistence-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 638bc2c450a14308a14253564f0f964b.md',
            title: { en: 'State Persistence Service', fa: 'سرویس ماندگاری وضعیت' },
            component: 'StatePersistenceService',
            path: 'com.IDE.plugin.ai.multiagent.memory.persistence.StatePersistenceService',
            status: '✅',
            tags: ['persistence', 'state', 'storage']
        },
        {
            id: 'memory-tier',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 66c13fef4ebb4ac48763609313d4200a.md',
            title: { en: 'Memory Tier', fa: 'لایه حافظه' },
            component: 'MemoryTier',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryTier',
            status: '✅',
            tags: ['tier', 'memory', 'architecture']
        },
        {
            id: 'memory-state',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 6743e2253cc44033966933ea2d7d965d.md',
            title: { en: 'Memory State', fa: 'وضعیت حافظه' },
            component: 'MemoryState',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryState',
            status: '✅',
            tags: ['state', 'memory', 'data']
        },
        {
            id: 'memory-type',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 6ca8c992c50d4bdf8a4663c5e7d6e7af.md',
            title: { en: 'Memory Type', fa: 'نوع حافظه' },
            component: 'MemoryType',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryType',
            status: '✅',
            tags: ['type', 'memory', 'enum']
        },
        {
            id: 'memory-access-control',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 6f80ade3b473410c9050335e6a3ae94a.md',
            title: { en: 'Memory Access Control', fa: 'کنترل دسترسی حافظه' },
            component: 'MemoryAccessControl',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryAccessControl',
            status: '✅',
            tags: ['access', 'control', 'security']
        },
        {
            id: 'contextual-memory',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 05514573943d4a96809e3e511b88d50a.md',
            title: { en: 'Contextual Memory', fa: 'حافظه متنی' },
            component: 'ContextualMemory',
            path: 'com.IDE.plugin.ai.multiagent.memory.ContextualMemory',
            status: '✅',
            tags: ['context', 'memory', 'semantic']
        },
        {
            id: 'memory-cache',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3a55fcaa0948460e94ea2a36c115c3c7.md',
            title: { en: 'Memory Cache', fa: 'کش حافظه' },
            component: 'MemoryCache',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryCache',
            status: '✅',
            tags: ['cache', 'memory', 'performance']
        },
        {
            id: 'memory-synchronization',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 44cb8524198845fba464438b5c6f9d24.md',
            title: { en: 'Memory Synchronization', fa: 'همگام‌سازی حافظه' },
            component: 'MemorySynchronization',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemorySynchronization',
            status: '✅',
            tags: ['sync', 'memory', 'distributed']
        },
        {
            id: 'memory-query-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 58cb56be82b048bb84301436448b8421.md',
            title: { en: 'Memory Query Service', fa: 'سرویس پرسمان حافظه' },
            component: 'MemoryQueryService',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryQueryService',
            status: '✅',
            tags: ['query', 'memory', 'search']
        },
        {
            id: 'distributed-memory-coordinator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 74f1e31da1c146d99581f0d2e2a34cf9.md',
            title: { en: 'Distributed Memory Coordinator', fa: 'هماهنگ‌کننده حافظه توزیع‌شده' },
            component: 'DistributedMemoryCoordinator',
            path: 'com.IDE.plugin.ai.multiagent.memory.DistributedMemoryCoordinator',
            status: '✅',
            tags: ['distributed', 'coordinator', 'memory']
        },
        {
            id: 'memory-eviction-policy',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 82b825ee46014aeea13b23ecbc9668fd.md',
            title: { en: 'Memory Eviction Policy', fa: 'سیاست اخراج حافظه' },
            component: 'MemoryEvictionPolicy',
            path: 'com.IDE.plugin.ai.multiagent.memory.MemoryEvictionPolicy',
            status: '✅',
            tags: ['eviction', 'policy', 'memory']
        },
        {
            id: 'wal-writer',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 30b95f1c4655481f8e912a919c75ae94.md',
            title: { en: 'WAL Writer', fa: 'نویسنده لاگ پیش‌نوشت' },
            component: 'WALWriter',
            path: 'com.IDE.plugin.ai.multiagent.memory.persistence.WALWriter',
            status: '✅',
            tags: ['wal', 'persistence', 'durability']
        }
    ]
};

// Category 6: Station Management (11 files)
export const STATION_MANAGEMENT_CATEGORY = {
    id: CATEGORIES.STATION_MANAGEMENT,
    name: { en: 'Station Management', fa: 'مدیریت ایستگاه' },
    description: {
        en: 'Station lifecycle, configuration, resource allocation, and agent deployment infrastructure',
        fa: 'چرخه حیات ایستگاه، پیکربندی، تخصیص منابع و زیرساخت استقرار عامل'
    },
    count: 11,
    icon: '🏢',
    components: [
        {
            id: 'station-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3a9cb87e0ffd411ca1a4f8f15676c103.md',
            title: { en: 'Station Manager', fa: 'مدیر ایستگاه' },
            component: 'StationManager',
            path: 'com.IDE.plugin.ai.multiagent.station.StationManager',
            status: '✅',
            tags: ['station', 'management', 'infrastructure']
        },
        {
            id: 'station',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 10dc7fe6844b4d6ebafb8cfa28eeb827.md',
            title: { en: 'Station', fa: 'ایستگاه' },
            component: 'Station',
            path: 'com.IDE.plugin.ai.multiagent.station.Station',
            status: '✅',
            tags: ['station', 'entity', 'model']
        },
        {
            id: 'station-configuration',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 42d3c08fd5b140d7ad297d80d3e534cb.md',
            title: { en: 'Station Configuration', fa: 'پیکربندی ایستگاه' },
            component: 'StationConfiguration',
            path: 'com.IDE.plugin.ai.multiagent.station.StationConfiguration',
            status: '✅',
            tags: ['configuration', 'station', 'settings']
        },
        {
            id: 'station-status',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 47af3107bb2742d3ad7f94f14e132ece.md',
            title: { en: 'Station Status', fa: 'وضعیت ایستگاه' },
            component: 'StationStatus',
            path: 'com.IDE.plugin.ai.multiagent.station.StationStatus',
            status: '✅',
            tags: ['status', 'station', 'state']
        },
        {
            id: 'station-metrics',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent e50f21b0d9954447b82b488f2edcfb7d.md',
            title: { en: 'Station Metrics', fa: 'معیارهای ایستگاه' },
            component: 'StationMetrics',
            path: 'com.IDE.plugin.ai.multiagent.station.StationMetrics',
            status: '✅',
            tags: ['metrics', 'monitoring', 'station']
        },
        {
            id: 'station-resource-allocator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 8650bd786d2f42f180b0e0bfd3beb255.md',
            title: { en: 'Station Resource Allocator', fa: 'تخصیص‌دهنده منابع ایستگاه' },
            component: 'StationResourceAllocator',
            path: 'com.IDE.plugin.ai.multiagent.station.StationResourceAllocator',
            status: '✅',
            tags: ['resource', 'allocation', 'management']
        },
        {
            id: 'station-agent-coordinator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 8fbfd771a0c74cc8bb0820751e2544b6.md',
            title: { en: 'Station Agent Coordinator', fa: 'هماهنگ‌کننده عامل ایستگاه' },
            component: 'StationAgentCoordinator',
            path: 'com.IDE.plugin.ai.multiagent.station.StationAgentCoordinator',
            status: '✅',
            tags: ['coordinator', 'agent', 'station']
        },
        {
            id: 'station-health-monitor',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 2be033d947f94c01a46bdb3f8a798f80.md',
            title: { en: 'Station Health Monitor', fa: 'ناظر سلامت ایستگاه' },
            component: 'StationHealthMonitor',
            path: 'com.IDE.plugin.ai.multiagent.station.StationHealthMonitor',
            status: '✅',
            tags: ['health', 'monitoring', 'station']
        },
        {
            id: 'station-lifecycle-manager',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent ff68869314a243799bc4c4c130a0a039.md',
            title: { en: 'Station Lifecycle Manager', fa: 'مدیر چرخه حیات ایستگاه' },
            component: 'StationLifecycleManager',
            path: 'com.IDE.plugin.ai.multiagent.station.StationLifecycleManager',
            status: '✅',
            tags: ['lifecycle', 'management', 'station']
        },
        {
            id: 'station-event',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent ff93b76d32064827974ac504aeb34b32.md',
            title: { en: 'Station Event', fa: 'رویداد ایستگاه' },
            component: 'StationEvent',
            path: 'com.IDE.plugin.ai.multiagent.station.StationEvent',
            status: '✅',
            tags: ['event', 'station', 'notification']
        },
        {
            id: 'station-registry',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent fbb22f794ccd4b9daac787084b83ff9b.md',
            title: { en: 'Station Registry', fa: 'ثبت ایستگاه' },
            component: 'StationRegistry',
            path: 'com.IDE.plugin.ai.multiagent.station.StationRegistry',
            status: '✅',
            tags: ['registry', 'station', 'directory']
        }
    ]
};

// Category 7: Claude AI Services (12 files)
export const CLAUDE_AI_CATEGORY = {
    id: CATEGORIES.CLAUDE_AI,
    name: { en: 'Claude AI Services', fa: 'سرویس‌های هوش مصنوعی کلود' },
    description: {
        en: 'Claude API integration, request/response handling, tool calling, and AI-powered code assistance',
        fa: 'یکپارچه‌سازی API کلود، مدیریت درخواست/پاسخ، فراخوانی ابزار و کمک کدنویسی هوش مصنوعی'
    },
    count: 12,
    icon: '🤖',
    components: [
        {
            id: 'claude-response-handler',
            filename: 'TWIN_MD src main java com IDE plugin ai services C a0ae4c1db9cb481d9a5a3a8c8792dc30.md',
            title: { en: 'Claude Response Handler', fa: 'مدیریت‌کننده پاسخ کلود' },
            component: 'ClaudeResponseHandler',
            path: 'com.IDE.plugin.ai.services.ClaudeResponseHandler',
            status: '✅',
            tags: ['claude', 'handler', 'response']
        },
        {
            id: 'claude-response',
            filename: 'TWIN_MD src main java com IDE plugin ai services C d492b95730714d9090c62b16f3b5092c.md',
            title: { en: 'Claude Response', fa: 'پاسخ کلود' },
            component: 'ClaudeResponse',
            path: 'com.IDE.plugin.ai.services.ClaudeResponse',
            status: '✅',
            tags: ['claude', 'response', 'data']
        },
        {
            id: 'claude-request',
            filename: 'TWIN_MD src main java com IDE plugin ai services C 4041f1321a314a5baea7591592322525.md',
            title: { en: 'Claude Request', fa: 'درخواست کلود' },
            component: 'ClaudeRequest',
            path: 'com.IDE.plugin.ai.services.ClaudeRequest',
            status: '✅',
            tags: ['claude', 'request', 'api']
        },
        {
            id: 'tool-call',
            filename: 'TWIN_MD src main java com IDE plugin ai services T e4595a03cb8042c4b6716d48ade0060c.md',
            title: { en: 'Tool Call', fa: 'فراخوانی ابزار' },
            component: 'ToolCall',
            path: 'com.IDE.plugin.ai.services.ToolCall',
            status: '✅',
            tags: ['tool', 'call', 'function']
        },
        {
            id: 'claude-code-bridge',
            filename: 'TWIN_MD src main java com IDE plugin ai services C 48231bb3d09c4a26bda026ab162e9d03.md',
            title: { en: 'Claude Code Bridge', fa: 'پل کد کلود' },
            component: 'ClaudeCodeBridge',
            path: 'com.IDE.plugin.ai.services.ClaudeCodeBridge',
            status: '✅',
            tags: ['bridge', 'integration', 'claude']
        },
        {
            id: 'claude-task-adapter',
            filename: 'TWIN_MD src main java com IDE plugin ai services C 027712b7b03f47dfaaecccaf23066e5e.md',
            title: { en: 'Claude Task Adapter', fa: 'آداپتور وظیفه کلود' },
            component: 'ClaudeTaskAdapter',
            path: 'com.IDE.plugin.ai.services.ClaudeTaskAdapter',
            status: '✅',
            tags: ['adapter', 'task', 'claude']
        },
        {
            id: 'claude-code-integration-service',
            filename: 'TWIN_MD src main java com IDE plugin ai services C 3cdbb127d03649298dacc042ce7ee38c.md',
            title: { en: 'Claude Code Integration Service', fa: 'سرویس یکپارچه‌سازی کد کلود' },
            component: 'ClaudeCodeIntegrationService',
            path: 'com.IDE.plugin.ai.services.ClaudeCodeIntegrationService',
            status: '✅',
            tags: ['integration', 'service', 'claude']
        },
        {
            id: 'conversation-message',
            filename: 'TWIN_MD src main java com IDE plugin ai services C 9327881f5ad84a61a6f8e2d9f3d3dc81.md',
            title: { en: 'Conversation Message', fa: 'پیام مکالمه' },
            component: 'ConversationMessage',
            path: 'com.IDE.plugin.ai.services.ConversationMessage',
            status: '✅',
            tags: ['conversation', 'message', 'chat']
        },
        {
            id: 'ai-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 2a26c495e6e44bbb9174527326135010.md',
            title: { en: 'AI Service', fa: 'سرویس هوش مصنوعی' },
            component: 'AIService',
            path: 'com.IDE.plugin.ai.services.AIService',
            status: '✅',
            tags: ['ai', 'service', 'interface']
        },
        {
            id: 'code-generator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 6f866280603146e0ab7ec2c493562a51.md',
            title: { en: 'Code Generator', fa: 'تولیدکننده کد' },
            component: 'CodeGenerator',
            path: 'com.IDE.plugin.ai.services.CodeGenerator',
            status: '✅',
            tags: ['generator', 'code', 'ai']
        },
        {
            id: 'code-analyzer',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 59521a925db94d1dbf7879ecefadac7f.md',
            title: { en: 'Code Analyzer', fa: 'تحلیلگر کد' },
            component: 'CodeAnalyzer',
            path: 'com.IDE.plugin.ai.services.CodeAnalyzer',
            status: '✅',
            tags: ['analyzer', 'code', 'ai']
        },
        {
            id: 'processing-result',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent ab60ff9580364014bc17eebf23bab0e1.md',
            title: { en: 'Processing Result', fa: 'نتیجه پردازش' },
            component: 'ProcessingResult',
            path: 'com.IDE.plugin.ai.services.ProcessingResult',
            status: '✅',
            tags: ['result', 'processing', 'response']
        }
    ]
};

// Category 8: UI Components (9 files)
export const UI_COMPONENTS_CATEGORY = {
    id: CATEGORIES.UI_COMPONENTS,
    name: { en: 'User Interface Components', fa: 'اجزای رابط کاربری' },
    description: {
        en: 'IntelliJ UI integration including tool windows, panels, status bars, and monitoring dashboards',
        fa: 'یکپارچه‌سازی رابط کاربری IntelliJ شامل پنجره‌های ابزار، پانل‌ها، نوار وضعیت و داشبوردهای نظارتی'
    },
    count: 9,
    icon: '🖥️',
    components: [
        {
            id: 'autoagents-tool-window-factory',
            filename: 'TWIN_MD src main java com IDE plugin ui AutoAgents 84ece7941715404abee14da3c28e24f7.md',
            title: { en: 'AutoAgents Tool Window Factory', fa: 'کارخانه پنجره ابزار AutoAgents' },
            component: 'AutoAgentsToolWindowFactory',
            path: 'com.IDE.plugin.ui.AutoAgentsToolWindowFactory',
            status: '✅',
            tags: ['ui', 'factory', 'tool-window']
        },
        {
            id: 'agent-status-bar',
            filename: 'TWIN_MD src main java com IDE plugin ui AgentStatu 8800ed7ae249463387d2abcc7b0c8f26.md',
            title: { en: 'Agent Status Bar', fa: 'نوار وضعیت عامل' },
            component: 'AgentStatusBar',
            path: 'com.IDE.plugin.ui.AgentStatusBar',
            status: '✅',
            tags: ['ui', 'status-bar', 'monitoring']
        },
        {
            id: 'station-management-panel',
            filename: 'TWIN_MD src main java com IDE plugin ui station St dce897a226a943bba8f520853e487bdf.md',
            title: { en: 'Station Management Panel', fa: 'پانل مدیریت ایستگاه' },
            component: 'StationManagementPanel',
            path: 'com.IDE.plugin.ui.station.StationManagementPanel',
            status: '✅',
            tags: ['ui', 'panel', 'station']
        },
        {
            id: 'agent-deployment-panel',
            filename: 'TWIN_MD src main java com IDE plugin ui station Ag 4f13c8acaa734535921fa6a6e94796b5.md',
            title: { en: 'Agent Deployment Panel', fa: 'پانل استقرار عامل' },
            component: 'AgentDeploymentPanel',
            path: 'com.IDE.plugin.ui.station.AgentDeploymentPanel',
            status: '✅',
            tags: ['ui', 'panel', 'deployment']
        },
        {
            id: 'station-monitoring-panel',
            filename: 'TWIN_MD src main java com IDE plugin ui station St 4ec4c4bfe08242e0b9eb33bd8d15fd3f.md',
            title: { en: 'Station Monitoring Panel', fa: 'پانل نظارت ایستگاه' },
            component: 'StationMonitoringPanel',
            path: 'com.IDE.plugin.ui.station.StationMonitoringPanel',
            status: '✅',
            tags: ['ui', 'panel', 'monitoring']
        },
        {
            id: 'station-control-panel',
            filename: 'TWIN_MD src main java com IDE plugin ui station St 6092da476a644d02b2a725051d53c2ab.md',
            title: { en: 'Station Control Panel', fa: 'پانل کنترل ایستگاه' },
            component: 'StationControlPanel',
            path: 'com.IDE.plugin.ui.station.StationControlPanel',
            status: '✅',
            tags: ['ui', 'panel', 'control']
        },
        {
            id: 'station-configuration-panel',
            filename: 'TWIN_MD src main java com IDE plugin ui station St 9c37f1a4d5184da68d87effdd618e94d.md',
            title: { en: 'Station Configuration Panel', fa: 'پانل پیکربندی ایستگاه' },
            component: 'StationConfigurationPanel',
            path: 'com.IDE.plugin.ui.station.StationConfigurationPanel',
            status: '✅',
            tags: ['ui', 'panel', 'configuration']
        },
        {
            id: 'agent-dashboard',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 5b4b85a5a74f4d5baf4bbdc6661ce195.md',
            title: { en: 'Agent Dashboard', fa: 'داشبورد عامل' },
            component: 'AgentDashboard',
            path: 'com.IDE.plugin.ui.AgentDashboard',
            status: '✅',
            tags: ['ui', 'dashboard', 'agent']
        },
        {
            id: 'monitoring-dashboard',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 5b78bc13d93e4f038d71bf797061a74b.md',
            title: { en: 'Monitoring Dashboard', fa: 'داشبورد نظارتی' },
            component: 'MonitoringDashboard',
            path: 'com.IDE.plugin.ui.MonitoringDashboard',
            status: '✅',
            tags: ['ui', 'dashboard', 'monitoring']
        }
    ]
};

// Category 9: Plugin Settings (3 files)
export const PLUGIN_SETTINGS_CATEGORY = {
    id: CATEGORIES.PLUGIN_SETTINGS,
    name: { en: 'Plugin Settings & Configuration', fa: 'تنظیمات و پیکربندی پلاگین' },
    description: {
        en: 'Plugin configuration, API settings, preferences, and persistent state management',
        fa: 'پیکربندی پلاگین، تنظیمات API، ترجیحات و مدیریت وضعیت ماندگار'
    },
    count: 3,
    icon: '⚙️',
    components: [
        {
            id: 'autoagents-settings',
            filename: 'TWIN_MD src main java com IDE plugin settings Auto 2456a4be42d44da69bff08213b77d19b.md',
            title: { en: 'AutoAgents Settings', fa: 'تنظیمات AutoAgents' },
            component: 'AutoAgentsSettings',
            path: 'com.IDE.plugin.settings.AutoAgentsSettings',
            status: '✅',
            tags: ['settings', 'configuration', 'plugin']
        },
        {
            id: 'plugin-configuration',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent f8ef427e208740fd96abf40e37966b9f.md',
            title: { en: 'Plugin Configuration', fa: 'پیکربندی پلاگین' },
            component: 'PluginConfiguration',
            path: 'com.IDE.plugin.settings.PluginConfiguration',
            status: '✅',
            tags: ['configuration', 'plugin', 'settings']
        },
        {
            id: 'api-configuration',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 2bae065ae5bc431dbcaaab818da78826.md',
            title: { en: 'API Configuration', fa: 'پیکربندی API' },
            component: 'APIConfiguration',
            path: 'com.IDE.plugin.settings.APIConfiguration',
            status: '✅',
            tags: ['api', 'configuration', 'settings']
        }
    ]
};

// Category 10: Task & Workflow (7 files)
export const TASK_WORKFLOW_CATEGORY = {
    id: CATEGORIES.TASK_WORKFLOW,
    name: { en: 'Task & Workflow Management', fa: 'مدیریت وظیفه و گردش کار' },
    description: {
        en: 'Task execution, workflow coordination, priority queuing, and collaborative task distribution',
        fa: 'اجرای وظیفه، هماهنگی گردش کار، صف‌بندی اولویت و توزیع وظیفه مشارکتی'
    },
    count: 7,
    icon: '📋',
    components: [
        {
            id: 'task',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 4bca62c0deb646a2bd1c75a5bf81372a.md',
            title: { en: 'Task', fa: 'وظیفه' },
            component: 'Task',
            path: 'com.IDE.plugin.ai.multiagent.task.Task',
            status: '✅',
            tags: ['task', 'model', 'entity']
        },
        {
            id: 'task-executor',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 611d269196224855bea930df90094d6b.md',
            title: { en: 'Task Executor', fa: 'اجراکننده وظیفه' },
            component: 'TaskExecutor',
            path: 'com.IDE.plugin.ai.multiagent.task.TaskExecutor',
            status: '✅',
            tags: ['executor', 'task', 'execution']
        },
        {
            id: 'task-coordinator',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 734d31985e2246f4a2537c8c19560bfd.md',
            title: { en: 'Task Coordinator', fa: 'هماهنگ‌کننده وظیفه' },
            component: 'TaskCoordinator',
            path: 'com.IDE.plugin.ai.multiagent.task.TaskCoordinator',
            status: '✅',
            tags: ['coordinator', 'task', 'workflow']
        },
        {
            id: 'task-priority',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 97b122edd00449ca8e07169497b5704f.md',
            title: { en: 'Task Priority', fa: 'اولویت وظیفه' },
            component: 'TaskPriority',
            path: 'com.IDE.plugin.ai.multiagent.task.TaskPriority',
            status: '✅',
            tags: ['priority', 'task', 'enum']
        },
        {
            id: 'task-status',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 6ca8c992c50d4bdf8a4663c5e7d6e7af.md',
            title: { en: 'Task Status', fa: 'وضعیت وظیفه' },
            component: 'TaskStatus',
            path: 'com.IDE.plugin.ai.multiagent.task.TaskStatus',
            status: '✅',
            tags: ['status', 'task', 'enum']
        },
        {
            id: 'workflow-engine',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 3f22d276b0be4caf86c18de2dfb64d7f.md',
            title: { en: 'Workflow Engine', fa: 'موتور گردش کار' },
            component: 'WorkflowEngine',
            path: 'com.IDE.plugin.ai.multiagent.workflow.WorkflowEngine',
            status: '✅',
            tags: ['workflow', 'engine', 'orchestration']
        },
        {
            id: 'task-distribution-service',
            filename: 'TWIN_MD src main java com IDE plugin ai multiagent 8d095901a3f8457aab05f9bdbfc730e6.md',
            title: { en: 'Task Distribution Service', fa: 'سرویس توزیع وظیفه' },
            component: 'TaskDistributionService',
            path: 'com.IDE.plugin.ai.multiagent.task.TaskDistributionService',
            status: '✅',
            tags: ['distribution', 'service', 'task']
        }
    ]
};

// Export all categories as array
export const ALL_CATEGORIES = [
    CORE_MULTIAGENT_CATEGORY,
    COMMUNICATION_CATEGORY,
    TRUST_REPUTATION_CATEGORY,
    HISTORY_AUDIT_CATEGORY,
    MEMORY_MANAGEMENT_CATEGORY,
    STATION_MANAGEMENT_CATEGORY,
    CLAUDE_AI_CATEGORY,
    UI_COMPONENTS_CATEGORY,
    PLUGIN_SETTINGS_CATEGORY,
    TASK_WORKFLOW_CATEGORY
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
