# Neo4j subgraph queries

Input Type: Graphs
Loss Level: Low
Notes: Lazy evaluation
Optimal Input / Best Practices: D: LIMIT subgraph to 100-10K nodes per query; BP: Use APOC for path expansion, limit hops to 2-5; paginate large result sets
Philosophy of Design: On-demand loading; store relationships, fetch context
Reduction Max %: 95
Reduction Min %: 0
Semantic Blind: Yes
Size Reduction Description: Variable
Tier: Tier 5: Hierarchical/Adaptive