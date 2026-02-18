# FAISS + PQ

Input Type: Vectors/Embeddings
Loss Level: Medium
Notes: 768d → 96 bytes typical
Optimal Input / Best Practices: D: Train on ≥10K vectors, deploy on 100K+; BP: M=8-96 subvectors (M=dim/8 typical), nbits=8 for 768d embeddings
Philosophy of Design: Product quantization; approximate vectors with codebooks
Reduction Max %: 96.9
Reduction Min %: 87.5
Semantic Blind: Yes
Size Reduction Description: 8-32× reduction
Tier: Tier 2: Embedding