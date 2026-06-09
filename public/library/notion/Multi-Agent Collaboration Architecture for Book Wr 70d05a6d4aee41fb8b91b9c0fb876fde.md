# Multi-Agent Collaboration Architecture for Book Writing

```mermaid
graph LR
 Theory[Raft/PBFT Theory] --> Asana[Asana Approvals]
 Theory --> Trust[Trust Score Weighting]
 Asana --> Workflow[2-of-3 Editor Approval]
 Trust --> Byzantine[Byzantine Agent Detection]
 Workflow --> Book[Chapter Approval Gates]
 Byzantine --> Quality[Quality Score Validation]
 style Theory fill:#FFE5B4
 style Book fill:#90EE90
```

```mermaid
graph TD
 subgraph Events[Event Sources]
 A[Asana Stories API]
 O[Obsidian Git History]
 N[Notion Page History]
 end
 subgraph Stream[Event Stream]
 Collector[Event Collector Service]
 Normalizer[Event Normalizer]
 Store[(Unified Event Store)]
 end
 subgraph Queries[Query Layer]
 Current[Current State View]
 Historical[Historical Queries]
 Replay[State Replay Engine]
 end
 A --> Collector
 O --> Collector
 N --> Collector
 Collector --> Normalizer
 Normalizer --> Store
 Store --> Current
 Store --> Historical
 Store --> Replay
 style Store fill:#FFD700
```

```mermaid
graph TB
 subgraph Write_Path[Write Path - CP]
 Agent[Claude Agent]
 Asana[Asana API<br/>Primary Source]
 EventStore[(Event Store<br/>Audit Log)]
 end
 subgraph Read_Path[Read Path - AP]
 ObsidianLocal[Obsidian Vault<br/>Local Cache]
 NotionCache[Notion Pages<br/>Cached Views]
 end
 subgraph Sync[Eventual Consistency Sync]
 Reconciler[Reconciliation Service]
 ConflictResolver[Conflict Resolver]
 end
 Agent -->|1. Write| Asana
 Asana -->|2. Log Event| EventStore
 EventStore -->|3. Propagate| Reconciler
 Reconciler -->|4. Update| ObsidianLocal
 Reconciler -->|5. Update| NotionCache
 ObsidianLocal -.conflicts.-> ConflictResolver
 ConflictResolver -->|Last-Write-Wins| Asana
 style Asana fill:#FFD700
 style EventStore fill:#90EE90
```

```mermaid
graph TB
 subgraph User_Layer[ðŸ‘¥ User Interfaces]
 AsanaUI[Asana Web/Mobile<br/>Task Management]
 ObsidianUI[Obsidian Desktop<br/>Knowledge Graph]
 NotionUI[Notion Web<br/>Documentation]
 end
 subgraph Agent_Layer[ðŸ¤– Agent Intelligence]
 ClaudeAPI[Claude API<br/>Primary Reasoning]
 ChatGPT[ChatGPT API<br/>Specialized Tasks]
 LocalLLM[Local LLM<br/>Privacy-Sensitive]
 end
 subgraph Integration_Layer[ðŸ”— Integration Services]
 WebhookHub[Webhook Hub<br/>Event Router]
 SyncEngine[Sync Engine<br/>State Reconciliation]
 APIGateway[API Gateway<br/>Rate Limiting]
 end
 subgraph Data_Layer[ðŸ’¾ Persistent Storage]
 AsanaDB[(Asana Database<br/>Source of Truth)]
 ObsidianVault[(Obsidian Vault<br/>Git Repository)]
 EventStore[(Event Store<br/>PostgreSQL)]
 VectorDB[(Vector DB<br/>Embeddings)]
 end
 subgraph Monitoring[ðŸ“Š Observability]
 Metrics[Prometheus Metrics]
 Logs[Structured Logs]
 Traces[Distributed Tracing]
 Alerts[Alert Manager]
 end
 AsanaUI --> AsanaDB
 ObsidianUI --> ObsidianVault
 NotionUI -.sync.-> AsanaDB
 ClaudeAPI --> APIGateway
 ChatGPT --> APIGateway
 LocalLLM --> APIGateway
 APIGateway --> WebhookHub
 WebhookHub --> SyncEngine
 SyncEngine --> AsanaDB
 SyncEngine --> ObsidianVault
 SyncEngine --> EventStore
 ClaudeAPI -.embeddings.-> VectorDB
 ObsidianVault -.index.-> VectorDB
 WebhookHub --> Metrics
 SyncEngine --> Logs
 APIGateway --> Traces
 Metrics --> Alerts
 style AsanaDB fill:#FFD700
 style ClaudeAPI fill:#B4D7FF
 style EventStore fill:#90EE90
```

```mermaid
graph TB
 subgraph Asana[Asana Platform]
 AW[Asana Webhooks]
 end
 subgraph WriteModel[Write Model - Command Side]
 WH[Webhook Hub<br/>Event Receiver]
 Validator[Event Validator]
 EventStore[(Event Store<br/>Append-Only Log)]
 end
 subgraph ReadModel[Read Model - Query Side]
 Projector1[Obsidian Projector]
 Projector2[Notion Projector]
 Projector3[Analytics Projector]
 ObsidianView[(Obsidian Vault<br/>Materialized View)]
 NotionView[(Notion Pages<br/>Materialized View)]
 AnalyticsView[(Metrics Store<br/>Materialized View)]
 end
 subgraph Reconciliation[Async Reconciliation]
 StreamProcessor[Event Stream Processor]
 ConflictDetector[Conflict Detector]
 CompensationLog[(Compensation Log)]
 end
 AW -->|1. Push Event| WH
 WH -->|2. Validate| Validator
 Validator -->|3. Append| EventStore
 EventStore -->|4. Stream| StreamProcessor
 StreamProcessor -->|5a. Project| Projector1
 StreamProcessor -->|5b. Project| Projector2
 StreamProcessor -->|5c. Project| Projector3
 Projector1 --> ObsidianView
 Projector2 --> NotionView
 Projector3 --> AnalyticsView
 StreamProcessor -->|6. Check| ConflictDetector
 ConflictDetector -->|7. Log Compensation| CompensationLog
 style EventStore fill:#90EE90
 style WH fill:#FFD700
 style StreamProcessor fill:#87CEEB
```

```mermaid
graph TB
 subgraph AsanaPlatform[Asana Platform]
 AW[Asana Webhooks]
 end
 subgraph SagaOrchestrator[Saga Orchestrator]
 Router[Event Router]
 SagaEngine[Saga Coordinator]
 StateTracker[Saga State Tracker]
 end
 subgraph Participants[Saga Participants]
 ObsidianAdapter[Obsidian Adapter]
 NotionAdapter[Notion Adapter]
 VectorDBAdapter[Vector DB Adapter]
 EventLogAdapter[Event Log Adapter]
 end
 subgraph CompensationLayer[Compensation Layer]
 CompensationEngine[Compensation Engine]
 RollbackLog[(Rollback Log)]
 end
 AW -->|1. Webhook| Router
 Router -->|2. Start Saga| SagaEngine
 SagaEngine -->|3a. Step 1| EventLogAdapter
 EventLogAdapter -->|Success| SagaEngine
 SagaEngine -->|3b. Step 2| ObsidianAdapter
 ObsidianAdapter -->|Success| SagaEngine
 SagaEngine -->|3c. Step 3| NotionAdapter
 NotionAdapter -->|Failure| SagaEngine
 SagaEngine -->|4. Trigger Compensation| CompensationEngine
 CompensationEngine -->|5. Rollback| ObsidianAdapter
 CompensationEngine -->|6. Rollback| EventLogAdapter
 CompensationEngine -->|7. Log| RollbackLog
 SagaEngine -.track.-> StateTracker
 style SagaEngine fill:#FFD700
 style CompensationEngine fill:#FFB4B4
 style EventLogAdapter fill:#90EE90
```

```mermaid
graph TB
 subgraph Source[Event Source]
 AW[Asana Webhooks]
 WH[Webhook Receiver]
 end
 subgraph StreamProcessing[Reactive Stream Pipeline]
 Buffer[Bounded Buffer<br/>Queue Depth: 1000]
 Splitter[Event Splitter]
 subgraph ParallelStreams[Parallel Processing Streams]
 Stream1[Obsidian Stream<br/>Rate: 10/sec]
 Stream2[Notion Stream<br/>Rate: 5/sec]
 Stream3[Vector DB Stream<br/>Rate: 20/sec]
 end
 Merger[Result Merger]
 end
 subgraph BackpressureControl[Backpressure Control]
 RateLimiter[Rate Limiter]
 Throttle[Dynamic Throttle]
 Circuit[Circuit Breaker]
 end
 subgraph Targets[Target Systems]
 Obsidian[(Obsidian Vault)]
 Notion[(Notion API)]
 VectorDB[(Vector DB)]
 end
 AW -->|Push| WH
 WH -->|Offer| Buffer
 Buffer -->|Poll| Splitter
 Splitter -->|Fan Out| Stream1
 Splitter -->|Fan Out| Stream2
 Splitter -->|Fan Out| Stream3
 Stream1 -->|Backpressure Signal| RateLimiter
 Stream2 -->|Backpressure Signal| RateLimiter
 Stream3 -->|Backpressure Signal| RateLimiter
 RateLimiter -.adjust.-> Throttle
 Throttle -.control.-> WH
 Stream1 -->|Write| Obsidian
 Stream2 -->|Write| Notion
 Stream3 -->|Write| VectorDB
 Obsidian -->|Ack| Stream1
 Notion -->|Ack| Stream2
 VectorDB -->|Ack| Stream3
 Stream1 -->|Result| Merger
 Stream2 -->|Result| Merger
 Stream3 -->|Result| Merger
 Stream2 -.failure rate.-> Circuit
 Circuit -.trip.-> Throttle
 style Buffer fill:#FFD700
 style RateLimiter fill:#FFB4B4
 style Circuit fill:#FF6B6B
```

```mermaid
graph TB
 subgraph Producers[Event Producers]
 AW[Asana Webhooks]
 OW[Obsidian Changes]
 NW[Notion Changes]
 end
 subgraph DistributedLog[Distributed Log - Partitioned]
 Partition0[Partition 0<br/>Climate Book Events]
 Partition1[Partition 1<br/>AI Ethics Book Events]
 Partition2[Partition 2<br/>Meta Events]
 end
 subgraph ConsumerGroups[Consumer Groups]
 subgraph Group1[Obsidian Sync Group]
 Consumer1A[Consumer 1A]
 Consumer1B[Consumer 1B]
 end
 subgraph Group2[Notion Sync Group]
 Consumer2A[Consumer 2A]
 end
 subgraph Group3[Analytics Group]
 Consumer3A[Consumer 3A]
 Consumer3B[Consumer 3B]
 end
 end
 subgraph OffsetTracking[Offset Management]
 OffsetStore[(Offset Store)]
 Checkpointing[Checkpoint Manager]
 end
 AW -->|Produce| Partition0
 AW -->|Produce| Partition1
 OW -->|Produce| Partition2
 NW -->|Produce| Partition2
 Partition0 -->|Read| Consumer1A
 Partition1 -->|Read| Consumer1B
 Partition0 -->|Read| Consumer2A
 Partition1 -->|Read| Consumer2A
 Partition0 -->|Read| Consumer3A
 Partition1 -->|Read| Consumer3B
 Consumer1A -.commit offset.-> OffsetStore
 Consumer1B -.commit offset.-> OffsetStore
 Consumer2A -.commit offset.-> OffsetStore
 Consumer3A -.commit offset.-> OffsetStore
 Consumer3B -.commit offset.-> OffsetStore
 Checkpointing -.manage.-> OffsetStore
 style Partition0 fill:#FFD700
 style Partition1 fill:#FFD700
 style OffsetStore fill:#90EE90
```

```mermaid
graph TB
subgraph Primary[Primary Path - Saga Orchestrator]
WH[Webhook Hub]
SagaEngine[Saga Engine]
ObsidianSync[Obsidian Sync]
NotionSync[Notion Sync]
end
subgraph Audit[Audit Path - Event Sourcing]
EventLog[(Event Store

Complete History)]
Analytics[Analytics Engine]
end
WH –>|1. Start Saga| SagaEngine
WH –>|2. Append| EventLog
SagaEngine –>|3a. Sync| ObsidianSync
SagaEngine –>|3b. Sync| NotionSync
EventLog -.query.-> Analytics
style SagaEngine fill:#FFD700
style EventLog fill:#90EE90