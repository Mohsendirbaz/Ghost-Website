# Annoy

Input Type: Vectors/Embeddings
Loss Level: Low-Medium
Notes: Space-time tradeoff
Optimal Input / Best Practices: D: n_trees=10-100 (more trees = better recall); BP: 50-100 trees for <1M vectors, scale to 200+ for 10M+
Philosophy of Design: Tree-based ANN; memory-mapped files with shared structure
Reduction Max %: 75
Reduction Min %: 50
Semantic Blind: Yes
Size Reduction Description: 2-4× reduction
Tier: Tier 2: Embedding