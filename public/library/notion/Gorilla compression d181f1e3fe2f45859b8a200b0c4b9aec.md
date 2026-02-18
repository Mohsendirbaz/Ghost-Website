# Gorilla compression

Input Type: Time-Series
Loss Level: Low
Notes: Timestamps + values
Optimal Input / Best Practices: D: 2-hour blocks (Facebook production); BP: Timestamps with <1ms jitter; best for monotonic metrics (counters, gauges)
Philosophy of Design: Delta-of-delta + XOR; exploit temporal patterns
Reduction Max %: 95
Reduction Min %: 90
Semantic Blind: Yes
Size Reduction Description: 90-95% reduction
Tier: Tier 4: Time-Series