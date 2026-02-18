# FlatBuffers

Input Type: Structured Data
Loss Level: None
Notes: Fast random access
Optimal Input / Best Practices: D: Optimized for <1MB buffers; BP: Best for game state, sensor data, frequent access; slower to write than read
Philosophy of Design: Zero-copy deserialization; access without unpacking
Reduction Max %: 50
Reduction Min %: 20
Semantic Blind: Yes
Size Reduction Description: 20-50% reduction
Tier: Tier 3: Structured State