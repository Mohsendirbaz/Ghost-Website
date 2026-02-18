# Protocol Buffers

Input Type: Structured Data
Loss Level: None
Notes: Requires schema
Optimal Input / Best Practices: D: Message size <2MB recommended; BP: Use for RPC, not large documents; varint encoding saves space for small integers
Philosophy of Design: Schema-driven serialization; no field names in payload
Reduction Max %: 70
Reduction Min %: 30
Semantic Blind: Yes
Size Reduction Description: 30-70% reduction
Tier: Tier 3: Structured State