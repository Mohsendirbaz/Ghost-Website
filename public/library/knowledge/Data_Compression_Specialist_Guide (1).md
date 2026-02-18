# Data Compression Specialist Guide

## Overview

This document provides rigorous technical guidance for compression across non-text data domains: embeddings, structured data, time-series metrics, and graphs. It synthesizes 18 specialized tools with empirically validated approaches for production deployment.

---

## Part I: Embedding Compression

Embeddings represent the most common high-dimensional compression challenge. Modern systems routinely manage 100K–100M vectors; compression directly impacts retrieval latency, memory footprint, and operational cost.

### Tier 2A: Quantization-Based Vector Compression

**Applicable Domain:** Dense embeddings (768d, 1536d typical)
**Design Philosophy:** Reduce numerical precision and dimensionality while preserving semantic relationships

#### FAISS + Scalar Quantization (SQ)

**Mechanism:** Float32 → Int8 via linear scaling to [0, 255] range

**Specifications:**
- Reduction: 75% (4× compression)
- Loss: Low (minimal accuracy degradation from int8 quantization)
- Training required: None
- Inference latency: Minimal overhead

**Deployment Parameters:**
- SQ8: <1M vectors (8-bit quantization)
- SQ4: >10M vectors (4-bit) if accuracy tolerance permits
- No minimum corpus size; suitable for immediate deployment

**Production Constraints:**
- Best for moderately distributed embeddings; poor performance on highly skewed data
- Typical accuracy loss: 2-5% recall@10 versus float32
- Scaling: Linear; no training overhead

**Practical Use Case:** Search systems where inference speed dominates cost (web-scale retrieval, <100ms SLA)

---

#### FAISS + Product Quantization (PQ)

**Mechanism:** Partition high-dimensional space into M subspaces; learn K-means codebooks per subspace; encode each vector as M bytes

**Specifications:**
- Reduction: 87.5–96.9% (8–32× compression)
- Loss: Medium (quantization + approximation)
- Training required: Yes (≥10K vectors)
- Inference latency: O(1) lookup after encoding

**Deployment Parameters:**
- M = 8–96 subvectors; typical rule: M ≈ dim/8
- For 768d embeddings: M=96 → 96 bytes (8× reduction)
- For 1536d: M=192 → 192 bytes (8× reduction)
- Train on ≥10K vectors; deploy ≥100K

**Training Dynamics:**
- Training cost: ~5–30 seconds for 1M vectors
- Training stability: Improves with corpus size; converges reliably ≥100K
- Codebook learning: Sensitive to outliers; standardize embeddings before training

**Practical Use Case:** Large-scale vector databases (Milvus, Weaviate); 100M+ vectors where storage dominates cost

---

#### PCA / Truncated SVD (Linear Projection)

**Mechanism:** Project high-dimensional vectors to lower-dimensional subspace while maximizing explained variance

**Specifications:**
- Reduction: 50–90% (2–10× compression)
- Loss: Medium-High (linear projection; lossy for non-Gaussian distributions)
- Training required: Yes (full dataset)
- Inference latency: O(1) matrix multiplication

**Deployment Parameters:**
- Retain 80–95% explained variance (typical target)
- 768d → 256d (90% var), → 128d (80% var), → 64d (70% var)
- Training: O(n × d²) for SVD; suitable for ≤10M vectors on GPU

**Theoretical Justification:**
- Optimal for Euclidean distance preservation under Gaussian assumption
- Suboptimal for cosine distance (inner product); recalibrate metrics post-projection
- Variance retention indicates distortion bounds; lower variance = higher approximation error

**Practical Use Case:** Dimensionality reduction for downstream ML tasks; visualization and clustering pipelines

---

#### Hnswlib (Hierarchical Navigable Small World Graphs)

**Mechanism:** Build multi-layer proximity graph; layer indexing enables log(n) search

**Specifications:**
- Reduction: 50–66.7% (2–3× compression)
- Loss: Low (ANN approximation; highly tunable recall)
- Training required: No (online graph construction)
- Inference latency: O(log n) graph traversal

**Deployment Parameters:**
- M = 16–48 edge connections per node
  - M=16 for <1M vectors (memory-efficient)
  - M=32 for >1M vectors (balanced recall/space)
  - M=48 for critical retrieval (maximum recall)
- ef_construction = 100–500 (training parameter; higher = better index, slower build)
- ef_search = 100–1000 (inference parameter; higher = better recall, slower query)

**Scaling Characteristics:**
- Index build: O(n log n) with M, ef_construction tuning
- Memory: ~8 bytes per edge × M × n vectors
- Recall tuning: Linear in ef_search; no reindexing required

**Practical Use Case:** Real-time ANN systems with recall tuning requirements; systems requiring progressive accuracy/latency trade-offs

---

#### UMAP (Manifold Learning with Local Topology Preservation)

**Mechanism:** Construct high-dimensional neighborhood graph; learn lower-dimensional representation preserving local topology

**Specifications:**
- Reduction: 50–90% (768d → 64d typical; 2–10× compression)
- Loss: Medium (local topology preserved; global structure approximate)
- Training required: Yes (manifold learning; GPU-friendly)
- Inference latency: O(1) matrix multiplication post-training

**Deployment Parameters:**
- n_neighbors = 5–50 (local connectivity; lower = more local, higher = more global)
- min_dist = 0.0–0.99 (cluster tightness; 0.0 = tight clusters, 0.99 = spread)
- Output dimension: 768d → 128d (low loss), → 64d (moderate), → 32d (high loss, fast)

**Comparison to PCA:**
- UMAP: Nonlinear; preserves local topology; better for manifold data
- PCA: Linear; optimal for Gaussian distributions; faster training
- UMAP advantage: Handles non-Euclidean manifolds; visualizes better

**Training Dynamics:**
- Training cost: O(n log n) with GPU; faster than PCA for visualization
- Scalability: Suitable for >100K vectors
- Stability: More robust to outliers than PCA

**Practical Use Case:** Visualization, clustering, manifold exploration where local structure matters

---

**Mechanism:** Database-native compression combining quantization, indexing, and distributed storage

**Specifications:**
- Reduction: 75–93.75% (4–16× compression)
- Loss: Low-Medium (depends on indexing strategy)
- Training required: Index-dependent (IVF requires cluster initialization)
- Inference latency: O(log n) to O(1) depending on index

**Deployment Parameters:**
- Milvus IVF: nlist = √N to 4√N (partitions/buckets)
  - nlist = √(corpus_size) for balanced probes
  - Increase nlist for massive corpora (>10M)
- Weaviate: efConstruction = 128–512
- Segment at 100K–1M docs (memory optimization)

**Index Strategies:**
- IVF (Inverted File): Partition space; reasonable compression, moderate recall
- HNSW: Full graph; better recall, higher memory
- Hybrid: Combine IVF + HNSW for balanced performance

**Practical Use Case:** Production RAG systems, hybrid search, multi-modal retrieval

---

### Summary: Embedding Compression Decision Tree

```
Embedding Scale & Constraints
├─ <1M vectors, need immediate deployment → FAISS SQ (75%, no training)
├─ 1M–100M, can tolerate training overhead → FAISS PQ (87.5–96.9%, 5–30s training)
├─ Need flexible recall tuning → Hnswlib (50–66.7%, logarithmic search)
├─ Production system, multi-modal → Milvus/Weaviate (75–93.75%)
└─ Dimensionality reduction for ML → PCA/TruncatedSVD (50–90%, linear projection)
```

---

## Part II: Structured Data Compression

Structured data encompasses serialized objects, configuration records, and database payloads. Compression strategies diverge based on access patterns (write-once vs. frequent random access) and payload size.

### Tier 3A: Binary Serialization (Schema-Driven)

**Applicable Domain:** Configuration, RPC, database records; <2MB typical payloads

#### Protocol Buffers (protobuf)

**Mechanism:** Schema-driven variable-length integer encoding; field names eliminated from payload

**Specifications:**
- Reduction: 30–70% (depends on field distribution)
- Loss: None (lossless, schema-backed)
- Training required: No (schema defined a priori)
- Deserialization latency: O(field_count) with random access

**Encoding Details:**
- Varint: Integers encoded in 1–10 bytes (small integers = 1–2 bytes)
- Repeated fields: Packed wire format for arrays
- Nested messages: Hierarchical encoding with length prefixes

**Practical Parameters:**
- Message size: <2MB recommended; >2MB requires streaming or chunking
- Field distribution: Sparse fields (many defaults) compress better
- Integer ranges: Small integers (0–127) compress to 1 byte; unbounded integers to 5+ bytes

**Deployment Characteristics:**
- Serialization overhead: ~5–20% CPU cost for encoding/decoding
- Schema evolution: Forward/backward compatible with careful versioning
- Language coverage: Mature implementations in Python, Go, C++, Java

**Practical Use Case:** Microservice RPC, message queues, inter-process communication (Kafka, gRPC)

---

#### MessagePack (Binary JSON)

**Mechanism:** Compact JSON-like representation; type information encoded in format bytes

**Specifications:**
- Reduction: 20–40% (less aggressive than protobuf)
- Loss: None (lossless, schema-free)
- Training required: No
- Deserialization latency: O(1) random access for typed fields

**Encoding Details:**
- Format prefix: 1 byte encodes type (int, string, array, map) + length
- Strings: Length-prefixed UTF-8
- Arrays: Element count + sequential elements
- Maps: Key-value pairs with length prefix

**Practical Parameters:**
- Payload size: <10MB acceptable; combine with zlib for 50–80% total compression
- Sparsity: Effective for dense objects; less gain on sparse structures
- Serialization overhead: ~10–30% CPU cost; faster than JSON parsing

**Comparison to protobuf:**
- MessagePack: Schema-free, schemaless evolution, slower compression
- protobuf: Schema-required, strict versioning, aggressive compression (especially for small integers)

**Practical Use Case:** Caching layers (Redis), message queues, API payloads where schema flexibility needed

---

#### Apache Avro (Streaming Binary)

**Mechanism:** Row-oriented binary format with schema evolution and batch optimization

**Specifications:**
- Reduction: 30–60% (schema-dependent)
- Loss: None (lossless)
- Training required: No (schema defined)
- Batch write latency: O(1) per record in batches

**Deployment Parameters:**
- Ideal for >1GB datasets (streaming focus)
- Batch write: 1K–10K records per transaction
- Schema evolution: Field addition/removal supported; defaults for missing fields
- Compression pairing: Combine with Snappy for additional 20–30% reduction

**Streaming Characteristics:**
- Integration: Native support in Kafka, Spark, Hadoop
- Chunking: Natural alignment with distributed storage (HDFS blocks)
- Schema registry: Decentralized schema management; versioning

**Comparison to protobuf:**
- Avro: Streaming-optimized, batch-friendly, natural Hadoop integration
- protobuf: RPC-optimized, single-record focus, simpler serialization

**Practical Use Case:** Data lakes, streaming ETL (Kafka → Spark → HDFS), event sourcing

---

#### FlatBuffers (Zero-Copy Deserialization)

**Mechanism:** In-situ structured data access without unpacking; binary layout mirrors in-memory structure

**Specifications:**
- Reduction: 20–50% (focus on access, not compression)
- Loss: None (lossless)
- Training required: No
- Random access latency: O(1) pointer arithmetic; no unpacking

**Access Pattern Optimization:**
- Root table: Offset table at buffer start enables field lookup without traversal
- Nested structures: Pointers enable in-situ traversal
- Strings: UTF-8 stored inline; no copy on access

**Practical Parameters:**
- Buffer size: Optimized for <1MB buffers; larger buffers can exceed CPU cache
- Access patterns: Excellent for frequent random field access; poor for sequential unpacking
- Write overhead: Slower to write than protobuf; faster to read

**Deployment Characteristics:**
- Memory footprint: No unpacking overhead; buffer and pointer overhead only
- Serialization CPU: 10–40% higher than protobuf (recursive offsets)
- Language support: C++, Java, Python, Go; well-optimized

**Practical Use Case:** Game engines (state serialization), real-time sensor data, frequent random field access

---

#### Pydantic exclude_unset (Sparse Object Serialization)

**Mechanism:** Drop unset fields from serialization; only encode fields explicitly assigned

**Specifications:**
- Reduction: 10–50% (depends on sparsity)
- Loss: None (defaults reconstructed on deserialization)
- Training required: No
- Serialization latency: O(set_field_count)

**Sparsity Characteristics:**
- Most effective: <30% of fields set (typical for configs, deltas)
- Neutral: ~50% fields set (marginal gain)
- Suboptimal: >70% fields set (payload grows from excludes metadata)

**Practical Parameters:**
- Field defaults: Must be carefully defined; exclusion assumes defaults exist
- Delta encoding: Excellent for change deltas (only modified fields)
- Combination: MessagePack + exclude_unset yields 30–60% reduction on sparse objects

**Practical Use Case:** Configuration management, API request/response deltas, sparse ML feature vectors

---

#### simhash (Locality-Sensitive Hashing for Near-Duplicates)

**Mechanism:** Generate 64/128-bit fingerprints; near-identical documents have small Hamming distances

**Specifications:**
- Reduction: 99%+ (text → 64–128 bits)
- Loss: Very High (only similarity preserved, not content)
- Training required: None
- Inference latency: O(text_length)

**Fingerprinting Strategy:**
- Shingles: Extract k-grams (tokens)
- Hash each shingle
- Reduce via dimension: Keep top bits; XOR for fingerprint
- Near-duplicate threshold: Hamming distance ≤ 3 for 64-bit (tunable)

**Practical Parameters:**
- f = 64 bits: Standard web crawl dedup
- f = 128 bits: Higher precision for plagiarism detection
- Hamming distance: ≤3 = near-duplicate (tunable threshold)

**Loss Characteristics:**
- Suitable for: Web crawl deduplication, plagiarism detection, document clustering
- Unsuitable for: Content recovery, fine-grained similarity
- False positive rate: ~2–5% depending on threshold

**Practical Use Case:** Web crawl deduplication, dataset cleaning, plagiarism detection

---

#### xxhash / blake3 (Content-Addressable Hashing)

**Mechanism:** Generate deterministic fixed-size hashes (64–256 bits); collision-resistant content IDs

**Specifications:**
- Reduction: 99.9%+ (any size → 64–256 bits)
- Loss: Very High (content not recoverable; only identity preserved)
- Training required: None
- Inference latency: O(data_length); very fast

**Hash Variants:**

| Hash | Speed | Cryptographic | Use Case |
|------|-------|---------------|----------|
| xxhash64 | Fastest | No | Dedup, caching, lineage (non-security) |
| blake3 | Fast + crypto | Yes | Security-critical dedup, signatures |

**Practical Parameters:**
- Collision resistance: xxhash (speed-optimized); blake3 (security)
- Hash size: 64-bit (xxhash64) or 256-bit (blake3) depending on collision tolerance
- Content-addressable storage: Use hash as key; retrieve by hash

**Use Cases:**
- Deduplication: Hash files; disk usage optimization
- Caching: Hash URLs/queries; cache lookups
- Lineage tracking: Hash intermediate results; DAG provenance

**Practical Use Case:** Distributed dedup, content-addressable storage, cache key generation, provenance tracking

---

### Summary: Structured Data Compression Decision Tree

```
Structured Data Scenario
├─ RPC/Microservice, small integers, strict schema → Protocol Buffers (30–70%)
├─ Schema-free, flexible evolution → MessagePack (20–40%) + optional zlib
├─ Streaming >1GB, Hadoop integration → Apache Avro (30–60%) + Snappy
├─ Game state, frequent random access → FlatBuffers (20–50%, zero-copy)
├─ Sparse objects, delta encoding → Pydantic exclude_unset (10–50%)
├─ Near-duplicate detection, web crawl → simhash (99%+)
└─ Content-addressable dedup, lineage → xxhash/blake3 (99.9%+)
```

---

## Part III: Time-Series Compression

Time-series data presents unique compression opportunities through temporal regularity, monotonicity, and predictability. Production systems manage billions of metric points daily.

### Tier 4A: Domain-Optimized Time-Series Compression

**Applicable Domain:** Metrics, logs, sensor streams; temporal patterns exploit δ-encoding and predictive models

#### Gorilla Compression (Facebook Production)

**Mechanism:** Delta-of-delta encoding for timestamps; XOR-based bit packing for values

**Specifications:**
- Reduction: 90–95% (extreme compression)
- Loss: Low (preserves metric semantics)
- Training required: None (heuristic algorithm)
- Inference latency: O(1) per point for append; O(log n) for read

**Encoding Strategy:**
- Timestamp compression: Store delta between timestamps; then store δ(delta)
  - First point: Absolute timestamp (64 bits)
  - Second point: Delta from first (typically 32–64 bits)
  - Subsequent: δ(delta) encoded in 1–5 bits per point (for regular streams)
- Value compression: Leading/trailing zero bits in XOR of consecutive values
  - Exploit patterns where consecutive values similar (counters, gauges)
  - Variable-length blocks; average ~1 byte per value for typical metrics

**Production Parameters:**
- Block size: 2-hour windows (Facebook standard)
- Timestamp precision: <1ms jitter; monotonic timestamps critical
- Metric types: Optimized for counters, gauges; poor for sparse/irregular data

**Scaling Characteristics:**
- Compression ratio improves with:
  - Regularity: Monotonic, predictable values
  - Density: High sampling frequency
- Degrades with:
  - Irregular timestamps (>10% jitter)
  - Sparse data (gaps > block size)

**Practical Use Case:** Production metric systems (billions of points/day); real-time dashboards; TSDB backends (InfluxDB, Prometheus)

---

#### PAA (Piecewise Aggregate Approximation)

**Mechanism:** Divide time-series into segments; average each segment; reduce temporal resolution

**Specifications:**
- Reduction: 70–95% (segment-size dependent)
- Loss: Medium (temporal smoothing; high-frequency details lost)
- Training required: None (parameter: segment size)
- Inference latency: O(1) per segment

**Segment Dynamics:**
- Segment width w: 3–20 typical
  - w=5: Smooth minor noise; preserve major trends
  - w=10: Moderate smoothing; good for daily/hourly metrics
  - w=20: Heavy smoothing; suitable for long-term patterns
- Output: Single value per segment (average or other statistic)

**Loss Analysis:**
- Suitable for: Trends, anomaly detection, seasonal patterns
- Unsuitable for: Precise spike detection, microsecond-scale events
- Comparison to Gorilla: PAA reduces temporal resolution; Gorilla preserves precision

**Practical Use Case:** Time-series database downsampling, anomaly detection with coarse resolution, long-term trend analysis

---

#### pandas rolling() Aggregation (Windowed Statistics)

**Mechanism:** Compute running statistics (mean, std, min, max) over fixed-size windows; replace raw series with summaries

**Specifications:**
- Reduction: 80–99% (window-size dependent)
- Loss: Medium-High (summary statistics; raw values discarded)
- Training required: None
- Inference latency: O(window_size) amortized O(1) with incremental updates

**Window Parameters:**
- Real-time (5–10 events): High-frequency application metrics, network packets
- Hourly/daily (50–100 events): Business metrics, sensor aggregates
- Scaling: Window size inversely proportional to temporal resolution

**Summary Statistics Options:**
- Mean: Overall trend
- Std: Volatility measure
- Min/Max: Extreme values
- Quantiles (p50, p95, p99): Distribution shape

**Practical Use Case:** Real-time monitoring dashboards, alert thresholds, time-series feature engineering

---

#### Redis Streams XTRIM & Deque (Bounded Buffers)

**Mechanism:** Cap log size via hard limit; evict oldest entries when threshold exceeded

**Specifications (XTRIM):**
- Reduction: 0% (bounded, not compressed)
- Loss: High (oldest entries permanently dropped)
- Inference latency: O(1) append; O(1) trim
- Memory model: Hard limit; predictable footprint

**Parameters:**
- MAXLEN: 10K entries (debugging), 1M entries (audit trails)
- MINID: Time-based expiry (entries older than timestamp)

**Specifications (deque):**
- Reduction: 0% (bounded)
- Loss: High (FIFO recency bias)
- Inference latency: O(1) append/pop
- Memory model: Circular buffer; no GC overhead

**Parameters:**
- maxlen = 100–10K depending on frequency
- 100 for high-freq (1000s/sec)
- 10K for low-freq (<10/sec)

**Practical Use Case:** Audit logs, recent event windows, memory-constrained environments

---

#### tslearn TimeSeriesResampler (Configurable Rate Downsampling)

**Mechanism:** Reduce sampling frequency via configurable downsampling; maintains temporal shape

**Specifications:**
- Reduction: 50–95% (10:1 to 100:1 typical)
- Loss: Medium-High (temporal resolution reduced; shape preserved)
- Training required: None
- Inference latency: O(downsample_rate) per series

**Downsampling Strategies:**
- Mean aggregation: Smooth signals, general averaging
- Max aggregation: Spike preservation; useful for outliers
- Min aggregation: Floor detection
- Resample with interpolation: Smoother transitions

**Practical Parameters:**
- Visualization: 10:1 to 100:1 reduction acceptable
- Aggregation method: Mean for smooth signals, max for spikes
- Nyquist preservation: Ensure sampling rate ≥ 2× signal frequency

**Loss Analysis:**
- Suitable for: Trend analysis, visualization, dimensionality reduction
- Unsuitable for: High-frequency details, microsecond-scale events
- Effectiveness: Improves with regularity and smoothness

**Practical Use Case:** Dashboard downsampling, visualization preprocessing, frequency-domain analysis

---

```
Time-Series Scenario
├─ Production metrics, monotonic, <1ms jitter → Gorilla (90–95%)
├─ Trend analysis, anomaly detection, coarse → PAA (70–95%, tune w)
├─ Windowed statistics, real-time alerts → pandas rolling() (80–99%)
└─ Bounded logs, recency bias → Redis XTRIM / deque (bounded)
```

---

## Part IV: Graph Compression

Graph compression targets structural redundancy; algorithms range from lossless topology-preserving approaches to lossy statistical models.

### Tier 5A: Graph Compression Techniques

#### Neo4j Subgraph Queries (Lazy Evaluation)

**Mechanism:** Store full graph relationships; on-demand load and filter subgraphs

**Specifications:**
- Reduction: 0–95% (subgraph-dependent)
- Loss: None (on-demand filtering preserves semantics)
- Training required: None
- Query latency: O(hops × edges_per_node) for subgraph traversal

**Deployment Parameters:**
- Query scope: Limit subgraph to 100–10K nodes per request
- Hop depth: Limit to 2–5 hops (exponential growth in nodes)
- Pagination: Large result sets; stream results incrementally
- Path expansion: Use APOC library for efficient path queries

**Practical Use Case:** Knowledge graphs, recommendation systems, relationship queries; avoids loading full graph into memory

---

#### graph-tool Compression (Statistical Block Models)

**Mechanism:** Learn nested stochastic block models; compress graph structure via statistical equivalence

**Specifications:**
- Reduction: 50–90% (topology-dependent)
- Loss: Medium (structural approximation; community detection)
- Training required: Yes (stochastic block model inference)
- Inference latency: O(n × iterations) for model learning

**Deployment Parameters:**
- Applicable: >1K nodes (too small graphs don't compress well)
- Scaling: Compression ratio improves with graph size
- Model selection: minimize_blockmodel_dl (description-length criterion)

**Compression Logic:**
- Identify structural modules (communities, equivalence classes)
- Encode graph as:
  - Block model (template structure)
  - Block assignments per node
  - Within-block edges (sparse)
- Reconstruction: Applies template + variations; lossless for structure

**Practical Use Case:** Large-scale social networks, organization charts, biological networks; structural analysis and visualization

---

#### NetworkX Node Contraction (Graph Simplification)

**Mechanism:** Merge low-degree nodes; use centrality metrics to preserve hubs

**Specifications:**
- Reduction: 20–80% (topology-dependent)
- Loss: Medium (merging nodes loses granularity)
- Training required: None
- Inference latency: O(n log n) for contraction

**Contraction Strategy:**
- Contract low-degree nodes (degree 1–2); preserve hubs
- Use betweenness centrality to identify critical nodes
- Merge semantically similar nodes (application-dependent)

**Scaling Characteristics:**
- Best for >1K nodes (visible reduction)
- Poor for dense graphs (most nodes have degree >10)
- Suitable for sparse, hierarchical graphs (trees, DAGs)

**Practical Use Case:** Network visualization, simplification for human interpretation, routing optimization

---

### Summary: Graph Compression Decision Tree

```
Graph Scenario
├─ Knowledge graph, relationship queries → Neo4j subgraph (lazy eval, 0–95%)
├─ Community detection, >10K nodes → graph-tool (50–90%, statistical)
└─ Network simplification, sparse → NetworkX (20–80%, hub-preserving)
```

---

## Part V: Integration Patterns

### Multi-Stage Compression Pipelines

**RAG System (Text + Embeddings):**
1. Text storage: Haystack DocumentStore (30–70% reduction)
2. Chunk embeddings: FAISS PQ (87.5–96.9%)
3. Retrieval: Annoy or HNSW (50–75% with indexed storage)
4. Reranking: Cohere Rerank (80–95% filtering)

**Streaming Data Pipeline (>1GB):**
1. Serialization: Apache Avro (30–60%)
2. Optional: Snappy compression (+20–30%)
3. Time-series metrics: Gorilla (90–95% for temporal data)

**Production Vector Database:**
1. Vectors: FAISS PQ or Milvus (75–93.75%)
2. Metadata: MessagePack (20–40%)
3. Indexing: HNSW or IVF (inherent compression from clustering)

**Configuration Management:**
1. Sparse fields: Pydantic exclude_unset (10–50%)
2. Serialization: Protocol Buffers (30–70%)
3. Optional: MessagePack if schema flexibility needed

---

## Part VI: Selection Criteria & Trade-offs

### Decision Framework by Constraint

**If compression ratio is primary (>80% reduction required):**
- FAISS PQ (87.5–96.9%, embeddings)
- Gorilla (90–95%, time-series)
- LlamaIndex SummaryIndex (70–90%, text)
- graph-tool (50–90%, graphs)

**If latency is primary (<10ms query SLA):**
- FAISS SQ (75%, no training, O(1))
- Hnswlib (50–67%, O(log n) ANN)
- FlatBuffers (20–50%, O(1) random access)
- Gorilla (90–95%, O(1) append, O(log n) read)

**If training overhead is constraint (no GPU, <24h available):**
- FAISS SQ (no training)
- Hnswlib (online index construction)
- Protocol Buffers (schema-defined, no training)
- Gorilla (heuristic algorithm)

**If semantic fidelity is paramount (no meaningful loss):**
- Protocol Buffers (lossless)
- FlatBuffers (lossless)
- Anthropic Prompt Caching (0% size change; time savings only)
- Neo4j subgraph queries (semantics preserved via lazy load)

---

## Part VII: Monitoring & Validation

**Metrics to track post-deployment:**

1. **Compression ratio:** (original_size − compressed_size) / original_size
2. **Accuracy loss:** Domain-specific (recall@K for retrieval, RMSE for regression, etc.)
3. **Inference latency:** p50, p95, p99 query times
4. **CPU cost:** Serialization/deserialization overhead
5. **Memory footprint:** Peak heap during compression

**Validation checklist:**
- [ ] Compression ratio meets target (e.g., >80%)
- [ ] Accuracy loss within tolerance (e.g., <2% recall degradation)
- [ ] Query latency acceptable for SLA
- [ ] Training overhead acceptable or amortized
- [ ] Scaling behavior validated at 10× expected corpus size
- [ ] Failure modes identified (e.g., highly skewed data for FAISS PQ)

---

## References & Further Reading

1. **FAISS:** Johnson et al., "Billion-scale similarity search with GPUs" (IEEE TPAMI 2019)
2. **Gorilla:** Pelkonen et al., "Gorilla: A fast, scalable, in-memory time series database" (VLDB 2015)
3. **graph-tool:** Peixoto, "Efficient Bayesian inference of network models" (SIAM Review 2024)
4. **Protocol Buffers:** Google Protocol Buffers documentation
5. **FlatBuffers:** Google FlatBuffers documentation

