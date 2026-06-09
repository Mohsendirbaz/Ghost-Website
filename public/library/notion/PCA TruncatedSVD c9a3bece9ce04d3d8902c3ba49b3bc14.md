# PCA/TruncatedSVD

Input Type: Vectors/Embeddings
Loss Level: Medium-High
Notes: Fast, deterministic
Optimal Input / Best Practices: BP: Retain 80-95% explained variance; typically 768d → 256d (90% var), → 128d (80% var), → 64d (70% var)
Philosophy of Design: Linear projection; maximize variance retention
Reduction Max %: 90
Reduction Min %: 50
Semantic Blind: Yes
Size Reduction Description: 2-10× reduction
Tier: Tier 2: Embedding