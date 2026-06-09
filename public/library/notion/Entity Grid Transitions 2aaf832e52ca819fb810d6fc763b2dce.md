# Entity Grid Transitions

Category: Entity-Based
Complexity: O(n² × e)
Description: Probability of entity role transitions (S→S, S→O, etc.) across consecutive sentences
Formula/Method: P(r_i→r_j) = count(r_i→r_j) / total_transitions
Framework Source: Entity Grid
Implementation Status: Planned
Level: Multi-scale, Sentence
Performance (ρ): 0.65
Research Dataset: ASAP, GCDC
Tools: sklearn, spaCy
Type: Quantitative