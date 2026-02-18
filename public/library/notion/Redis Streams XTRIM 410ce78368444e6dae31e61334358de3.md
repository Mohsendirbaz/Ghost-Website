# Redis Streams XTRIM

Input Type: Any
Loss Level: High
Notes: Hard limit
Optimal Input / Best Practices: D: MAXLEN ~10K-1M entries; BP: Trim to last 10K for debugging, 1M for audit trails; use MINID for time-based expiry
Philosophy of Design: Bounded log; cap-based eviction
Reduction Max %: 0
Reduction Min %: 0
Semantic Blind: Yes
Size Reduction Description: 0% (bounded)
Tier: Tier 4: Time-Series