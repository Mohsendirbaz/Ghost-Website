# Milvus/Weaviate

Input Type: Vectors/Embeddings
Loss Level: Low-Medium
Notes: Production-grade
Optimal Input / Best Practices: BP: Milvus IVF nlist=sqrt(N) to 4*sqrt(N); Weaviate efConstruction=128-512; segment at 100K-1M docs
Philosophy of Design: Database-native compression; quantization + indexing
Reduction Max %: 93.75
Reduction Min %: 75
Semantic Blind: Yes
Size Reduction Description: 4-16× reduction
Tier: Tier 2: Embedding