# Master Compression Tools Table

## All 40 Tools - Quick Reference

| Tool | Application | Input Type | Reduction | Loss | Best For | Training | Latency |
|------|-------------|-----------|-----------|------|----------|----------|---------|
| **TIER 1: SEMANTIC TEXT** | | | | | | | |
| Anthropic Prompt Caching | Reuse static context across queries | Text prefix + suffix | 0% (time savings) | None | Repeated RAG queries, chatbot system prompts | No | 10–100× faster |
| AutoCompressor | Dense embedding of long text | Text (4K–100K tokens) | 95%+ | Medium | Static knowledge bases, reused contexts | Yes (2–10m) | Instant |
| LLMLingua | Token importance pruning via perplexity | Text (500–6K tokens) | 70–90% | Medium | Prompt compression, RAG context reduction | No | 5–10s |
| LLMLingua-2 | Learned extractive compression | Text (200–10K tokens) | 70–85% | Medium | Production systems, <500ms latency requirement | Yes (task-specific) | 100–500ms |
| Cohere Rerank | Relevance filtering for retrieval | Text (50–200 passages) | 80–95% | High | RAG filtering, passage deduplication | No | <500ms |
| LangChain ConversationSummaryMemory | Recursive summarization of conversations | Text (multi-turn) | 60–80% | Low-Medium | Multi-turn chatbots, long conversation history | No | Latency varies |
| LlamaIndex SummaryIndex | Hierarchical tree-structured summaries | Text (512–2048 token chunks) | 70–90% | Medium | Document hierarchies, multi-granularity search | No | Minimal |
| Selective Context | Query-aware information-theoretic filtering | Text (1K–16K tokens) | 50–80% | Low-Medium | Redundant input, query-informed selection | No | Minimal |
| **TIER 2: EMBEDDING/VECTOR** | | | | | | | |
| FAISS + Scalar Quantization (SQ) | Float32 → Int8 quantization | Vectors (any dim) | 75% | Low | Immediate deployment, <1M vectors | No | Minimal |
| FAISS + Product Quantization (PQ) | Codebook-based vector encoding | Vectors (768d, 1536d typical) | 87.5–96.9% | Medium | Large-scale (100K+), maximum compression | Yes (5–30s) | O(1) |
| PCA / TruncatedSVD | Linear projection, variance maximization | Vectors (high-dim) | 50–90% | Medium-High | Dimensionality reduction, visualization | Yes | O(1) |
| UMAP | Manifold learning, local topology preservation | Vectors (768d → 64d common) | 50–90% | Medium | Visualization, clustering, moderate reduction | Yes | O(1) |
| Hnswlib | Hierarchical navigable small-world graphs | Vectors (embeddings) | 50–66.7% | Low | Tunable recall ANN, real-time systems | No (online) | O(log n) |
| Milvus / Weaviate | Production vector DB (IVF + HNSW) | Vectors (embeddings) | 75–93.75% | Low-Medium | Production RAG, hybrid search, 100K–1M docs | Index-dependent | O(1) to O(log n) |
| Sentence-Transformers Pooling | Token embeddings → sentence vector | Text (128–512 token chunks) | 99% | High | Sentence-level representation, doc embeddings | No | Minimal |
| **TIER 3: STRUCTURED DATA** | | | | | | | |
| Protocol Buffers | Schema-driven binary serialization | Structured (messages <2MB) | 30–70% | None | RPC, microservices, gRPC | No | Minimal |
| MessagePack | Binary JSON, type-efficient | Structured (<10MB typical) | 20–40% | None | Caching, APIs, schema-flexible | No | Minimal |
| Apache Avro | Row-oriented streaming binary | Structured (>1GB datasets) | 30–60% | None | Kafka, streaming ETL, schema evolution | No | O(1) per record |
| FlatBuffers | Zero-copy random-access binary | Structured (<1MB buffers) | 20–50% | None | Game state, sensor data, frequent random access | No | O(1) pointer |
| Pydantic exclude_unset | Sparse object serialization | Structured (sparse objects) | 10–50% | None | Config deltas, sparse configs | No | Minimal |
| datasketch MinHash | Probabilistic set similarity | Text/sets | 90–99% | High | Deduplication, clustering, near-duplicates | No | Minimal |
| simhash | 64-bit locality-sensitive hash | Text | 99%+ | Very High | Web crawl dedup, plagiarism detection | No | Minimal |
| xxhash / blake3 | Content-addressable hashing | Any data | 99.9%+ | Very High | Dedup, caching keys, lineage tracking | No | Minimal |
| **TIER 4: TIME-SERIES** | | | | | | | |
| Gorilla Compression | Delta-of-delta + XOR encoding | Time-series (monotonic metrics) | 90–95% | Low | Production metrics (Prometheus, InfluxDB) | No | O(1) append |
| PAA (Piecewise Aggregate) | Segment averaging, temporal smoothing | Time-series | 70–95% | Medium | Trend analysis, anomaly detection, downsampling | No | O(1) per segment |
| pandas rolling() | Windowed aggregation statistics | Time-series | 80–99% | Medium-High | Real-time alerts, summary stats | No | O(window_size) |
| tslearn TimeSeriesResampler | Downsampling, rate reduction | Time-series | 50–95% | Medium-High | Visualization, 10:1 to 100:1 reduction | No | Minimal |
| Redis Streams XTRIM | Bounded log with hard limit | Any (streams) | 0% (bounded) | High | Audit logs, recency windows | No | O(1) |
| collections.deque(maxlen) | FIFO circular buffer | Any | 0% (bounded) | High | Recent event windows, fixed-size buffers | No | O(1) |
| **TIER 5: HIERARCHICAL/ADAPTIVE** | | | | | | | |
| MemGPT | Tiered memory (main + recursive + archive) | Text (multi-turn) | 50–90% | Adaptive | Long-running agents, persistent memory | No | Minimal |
| Redis TTL Tiers | Time-based decay (hot/warm/cold) | Any | 0–95% | Adaptive | Session state, multi-tier caching | No | O(1) |
| Haystack DocumentStore | Hybrid retrieval (full-text + dense) | Text documents | 30–70% | Low-Medium | Document search, RAG preprocessing | No | <100ms to 500ms |
| Neo4j Subgraph Queries | Lazy evaluation, on-demand loading | Graphs | 0–95% | None | Knowledge graphs, relationship queries | No | O(hops × edges) |
| graph-tool Compression | Stochastic block models | Graphs (>1K nodes) | 50–90% | Medium | Community detection, large graphs | Yes | O(n × iterations) |
| **TIER 6: TOKEN BUDGET / MEASUREMENT** | | | | | | | |
| llm-trim | Rule-based boilerplate removal | Text | 20–50% | Low | Web scrapes, PDFs, input cleanup | No | Minimal |
| langchain TokenTextSplitter | Smart chunking, token-aware | Text | 0% | None | RAG preprocessing, fine-tuning prep | No | Minimal |
| tiktoken | Accurate token counting (GPT models) | Text | 0% | None | Token budget measurement, truncation prevention | No | Minimal |
| transformers AutoTokenizer | Model-specific tokenization | Text | 0% | None | HuggingFace models, exact budget enforcement | No | Minimal |
| NetworkX Node Contraction | Graph simplification via merging | Graphs (sparse, >1K nodes) | 20–80% | Medium | Visualization, network simplification | No | O(n log n) |

---

## Quick Selection by Use Case

### RAG System
| Stage | Best Tools | Reduction | Notes |
|-------|-----------|-----------|-------|
| Ingestion | llm-trim | 20–50% | Remove boilerplate |
| Chunking | langchain TokenTextSplitter | 0% | Token-aware splitting |
| Embedding | FAISS PQ or Sentence-Transformers | 87–99% | Dense vectors |
| Retrieval | FAISS SQ + Hnswlib | 50–75% | Fast ANN |
| Reranking | Cohere Rerank | 80–95% | Filter top-5 to top-10 |
| Final context | LLMLingua or Selective Context | 50–80% | Optional final compression |

### Multi-Turn Chatbot (100+ turns)
| Component | Best Tools | Reduction | Notes |
|-----------|-----------|-----------|-------|
| Recent turns | LangChain ConversationSummaryMemory | 60–80% | Recursive abstraction |
| Archive | MemGPT or Redis TTL | 50–95% | Tiered, adaptive |
| Retrieval | Selective Context or simhash | 50–99% | Query-aware or dedup |

### Production Metrics (Billions/day)
| Component | Best Tools | Reduction | Notes |
|-----------|-----------|-----------|-------|
| Time-series storage | Gorilla | 90–95% | Delta-of-delta + XOR |
| Downsampling | PAA or tslearn | 70–95% | Configurable rate |
| Windowing | pandas rolling() | 80–99% | Summary stats |
| Bounded logs | Redis XTRIM | 0% (bounded) | Hard limits |

### Document Search (10K–10M docs)
| Component | Best Tools | Reduction | Notes |
|-----------|-----------|-----------|-------|
| Storage | Haystack (BM25 + dense) | 30–70% | Hybrid index |
| Dense vectors | FAISS PQ or Milvus | 87–93% | Large scale |
| Deduplication | simhash or MinHash | 99%+ | Near-duplicate detection |
| Token counting | tiktoken or AutoTokenizer | 0% | Budget measurement |

### Knowledge Graph
| Component | Best Tools | Reduction | Notes |
|-----------|-----------|-----------|-------|
| Storage | Neo4j | 0–95% | Lazy evaluation |
| Compression | graph-tool | 50–90% | Statistical models |
| Simplification | NetworkX | 20–80% | Hub-preserving |

---

## Loss vs. Reduction Matrix

| Loss Level | Reduction | Tools | Use Cases |
|-----------|-----------|-------|-----------|
| **None (Lossless)** | 0–70% | Caching, TokenTextSplitter, FlatBuffers, Avro, protobuf, MessagePack | Exact reconstruction required |
| **Low** | 50–75% | FAISS SQ, Gorilla, Hnswlib, Annoy, LLMLingua-2 | Minimal accuracy loss tolerated |
| **Low-Medium** | 50–80% | Selective Context, Haystack, LangChain Summary | Small-to-moderate abstraction acceptable |
| **Medium** | 50–96.9% | FAISS PQ, UMAP, LlamaIndex, LLMLingua, MemGPT | Moderate information loss acceptable |
| **Medium-High** | 50–99% | PCA, pandas rolling(), tslearn | Significant abstraction acceptable |
| **High** | 80–99% | Cohere Rerank, Sentence-Transformers, MinHash | Major filtering/filtering acceptable |
| **Very High** | 99%+ | simhash, xxhash, blake3 | Only structural/identity preserved |

---

## Training Requirements

| Training Type | Tools | Typical Time | When Needed |
|---------------|-------|--------------|------------|
| **None** | FAISS SQ, Hnswlib, Gorilla, Cohere Rerank, llm-trim, Anthropic Caching, simhash, xxhash | <100ms | Immediate deployment |
| **Online** | Hnswlib graph construction | Proportional to corpus | During indexing |
| **Per-context** | AutoCompressor | 2–10 minutes (GPU) | Once per static context |
| **Per-task** | LLMLingua-2 | ~1–2 epochs | Domain-specific optimization |
| **Per-corpus** | FAISS PQ | 5–30 seconds (1M vectors) | One-time setup |
| **Full dataset** | PCA, UMAP, graph-tool | Depends on size | Batch processing |

---

## Latency Profile

| Latency Tier | Tools | SLA Context |
|--------------|-------|-------------|
| **<1ms** | Token splitting, llm-trim, simhash, xxhash, deque, Redis XTRIM | Preprocessing, hashing |
| **1–10ms** | FAISS SQ, BM25 retrieval, FlatBuffers, Gorilla append | Online retrieval |
| **10–100ms** | FAISS PQ, Hnswlib, Cohere Rerank, embedding pooling | Real-time search |
| **100–500ms** | LLMLingua-2, tslearn downsampling, Milvus/Weaviate | User-facing queries |
| **1–10 seconds** | LLMLingua (perplexity scoring), graph-tool | Batch processing |
| **2–10 minutes** | AutoCompressor training, PCA/UMAP training | Offline setup |

---

## Integration Patterns (Production Tested)

### Pattern 1: RAG Compression Pipeline
```
Raw docs → llm-trim (20–50%) 
  → TokenTextSplitter (token-aware chunks)
  → Sentence-Transformers (99% to vectors)
  → FAISS PQ (87–96.9%)
  → Retrieve top-50 (ANN)
  → Cohere Rerank → top-5 (80–95%)
  → [Optional: LLMLingua final pass (50–80%)]
Final context: 2K–4K tokens from potential 100K+ original
Cumulative reduction: ~50–99×
```

### Pattern 2: Long Conversation Compression
```
Recent turns (T1–T5) → Full text
  Middle turns (T6–T20) → LangChain Summary (60–80%)
  Old turns (T21–T100) → MemGPT archive (50–95%)
  
On query: Retrieve archived summaries (Selective Context or simhash match)
Composition: Recent (2K) + Summary (1K) + Retrieved (1K) = 4K final
Cumulative reduction: ~10–20×
```

### Pattern 3: Metrics Pipeline
```
Raw metrics (billions/day) 
  → Gorilla (90–95%) storage
  → PAA or tslearn (70–95%) for downsampling
  → pandas rolling() (80–99%) for aggregates
  → Redis TTL tiers (0–95%) for aging
Multi-tier reduction: 99%+ for aged data
```

### Pattern 4: Deduplication & Storage
```
Web crawl or large document set
  → simhash fingerprinting (99.9% reduction)
  → xxhash/blake3 for caching keys (99.9%)
  → MinHash for near-duplicate detection (90–99%)
  → MessagePack serialization (20–40%)
Cumulative: 99.9%+ with lineage preservation
```

