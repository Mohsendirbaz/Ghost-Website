# Sentence-Transformers pooling

Input Type: Text
Loss Level: High
Notes: Full doc → 1 vector
Optimal Input / Best Practices: D: Chunk size 128-512 tokens; BP: Use mean pooling for general text, CLS token for trained models, max pooling rarely
Philosophy of Design: Aggregate token embeddings; sentence-level representation
Reduction Max %: 99
Reduction Min %: 99
Semantic Blind: No
Size Reduction Description: ~100× reduction
Tier: Tier 2: Embedding