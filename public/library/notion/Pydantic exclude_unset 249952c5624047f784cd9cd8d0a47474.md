# Pydantic exclude_unset

Input Type: Structured Data
Loss Level: None
Notes: Depends on sparsity
Optimal Input / Best Practices: BP: Most effective when <30% of fields are set; combine with MessagePack; use for sparse configs and deltas
Philosophy of Design: Drop default values; only serialize changed fields
Reduction Max %: 50
Reduction Min %: 10
Semantic Blind: Yes
Size Reduction Description: 10-50% reduction
Tier: Tier 3: Structured State