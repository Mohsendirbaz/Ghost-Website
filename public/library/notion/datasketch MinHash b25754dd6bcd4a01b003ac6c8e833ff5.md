# datasketch MinHash

Input Type: Text
Loss Level: High
Notes: Set membership only
Optimal Input / Best Practices: D: num_perm=128-256 (more = accurate, slower); BP: Use for doc deduplication, clustering; 128 perms gives ~2% error
Philosophy of Design: Probabilistic similarity; Jaccard estimation with fixed size
Reduction Max %: 99
Reduction Min %: 90
Semantic Blind: No
Size Reduction Description: 90-99% reduction
Tier: Tier 3: Structured State