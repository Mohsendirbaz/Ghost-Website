# Selective Context

Input Type: Text
Loss Level: Low-Medium
Notes: Query-aware compression
Optimal Input / Best Practices: D: 1K-16K tokens; BP: Requires query context; best when input has redundancy; diminishing returns >8K
Philosophy of Design: Information-theoretic relevance; keep only tokens that inform target task
Reduction Max %: 80
Reduction Min %: 50
Semantic Blind: No
Size Reduction Description: 50-80% reduction
Tier: Tier 1: Semantic