# Apache Avro

Input Type: Structured Data
Loss Level: None
Notes: Streaming-friendly
Optimal Input / Best Practices: BP: Ideal for streaming datasets >1GB; batch write 1K-10K records at a time; combine with Snappy compression
Philosophy of Design: Row-oriented binary; schema evolution support
Reduction Max %: 60
Reduction Min %: 30
Semantic Blind: Yes
Size Reduction Description: 30-60% reduction
Tier: Tier 3: Structured State