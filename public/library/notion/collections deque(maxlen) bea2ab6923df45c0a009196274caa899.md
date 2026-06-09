# collections.deque(maxlen)

Input Type: Any
Loss Level: High
Notes: Recency bias
Optimal Input / Best Practices: BP: maxlen=100-10K depending on frequency; 100 for high-freq events, 10K for low-freq; O(1) append and pop
Philosophy of Design: FIFO buffer; drop oldest, no compression
Reduction Max %: 0
Reduction Min %: 0
Semantic Blind: Yes
Size Reduction Description: 0% (bounded)
Tier: Tier 4: Time-Series