# NetworkX node contraction

Input Type: Graphs
Loss Level: Medium
Notes: Topology-dependent
Optimal Input / Best Practices: BP: Contract low-degree nodes (degree=1-2); use betweenness centrality to preserve hubs; best for graphs >1K nodes
Philosophy of Design: Graph simplification; merge similar nodes
Reduction Max %: 80
Reduction Min %: 20
Semantic Blind: Yes
Size Reduction Description: 20-80% reduction
Tier: Tier 5: Hierarchical/Adaptive