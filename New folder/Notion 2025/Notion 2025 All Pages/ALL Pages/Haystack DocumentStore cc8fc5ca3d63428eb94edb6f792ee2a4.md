# Haystack DocumentStore

Input Type: Text
Loss Level: Low-Medium
Notes: Multi-modal index
Optimal Input / Best Practices: BP: Store full-text for <10K docs, embeddings for 10K-10M, BM25 index for sparse retrieval; chunk docs to 256-512 tokens
Philosophy of Design: Hybrid retrieval; full-text + metadata + embeddings
Reduction Max %: 70
Reduction Min %: 30
Semantic Blind: No
Size Reduction Description: 30-70% reduction
Tier: Tier 5: Hierarchical/Adaptive