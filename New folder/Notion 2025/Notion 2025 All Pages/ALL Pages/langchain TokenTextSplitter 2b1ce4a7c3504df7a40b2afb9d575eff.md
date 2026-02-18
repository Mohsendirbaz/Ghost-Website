# langchain TokenTextSplitter

Input Type: Text
Loss Level: None
Notes: Organizational tool
Optimal Input / Best Practices: D: chunk_size=500-4000 tokens, chunk_overlap=10-20%; BP: 1024 chunks for RAG, 512 for fine-tuning, 200-500 for embeddings
Philosophy of Design: Smart chunking; split on token boundaries, not chars
Reduction Max %: 0
Reduction Min %: 0
Semantic Blind: Yes
Size Reduction Description: 0% (logical)
Tier: Tier 6: Token Budget