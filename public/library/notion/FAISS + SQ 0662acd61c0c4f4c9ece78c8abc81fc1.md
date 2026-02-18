# FAISS + SQ

Input Type: Vectors/Embeddings
Loss Level: Low
Notes: Minimal accuracy loss
Optimal Input / Best Practices: D: No minimum corpus size; BP: Use SQ8 (int8) for <1M vectors, SQ4 (4-bit) for >10M if accuracy allows
Philosophy of Design: Scalar quantization; reduce float32 to int8
Reduction Max %: 75
Reduction Min %: 75
Semantic Blind: Yes
Size Reduction Description: 4× reduction
Tier: Tier 2: Embedding