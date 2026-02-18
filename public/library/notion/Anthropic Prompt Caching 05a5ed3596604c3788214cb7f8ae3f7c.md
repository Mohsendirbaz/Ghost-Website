# Anthropic Prompt Caching

Input Type: Text
Loss Level: None
Notes: Time savings, not space
Optimal Input / Best Practices: D: Cache prefix ≥1024 tokens, ≤32K tokens; BP: Put static context in prefix (docs, examples), queries in suffix
Philosophy of Design: Reuse prefix computations; architectural optimization
Reduction Max %: 0
Reduction Min %: 0
Semantic Blind: Yes
Size Reduction Description: 0% (logical)
Tier: Tier 1: Semantic