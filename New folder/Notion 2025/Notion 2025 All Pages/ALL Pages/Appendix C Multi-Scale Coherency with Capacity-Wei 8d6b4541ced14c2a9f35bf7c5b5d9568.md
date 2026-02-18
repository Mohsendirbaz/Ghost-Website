# Appendix C Multi-Scale Coherency with Capacity-Weighted Scoring

# Appendix C: Multi-Scale Coherency with Capacity-Weighted Scoring

**Supplementary Document to New Analyst Onboarding LectureStatus:** Corrective Enhancement
**Dependencies:** Appendix B (Capacity & Multihoming), Main Onboarding Lecture (Simple Coherency Measure)
**Purpose:** Strengthen coherency scoring by integrating segment size weighting within the capacity framework

---

## Â§1. Context and Motivation

### 1.1 Original Simple Measure (from Onboarding Lecture)

The baseline coherency function introduced in the main lecture is:

```python
def simple_coherence(entity_a, entity_b):
 """ Simple Jaccard-based coherency with depth weighting Based on shared chapter references only """ shared = set(entity_a.refs) & set(entity_b.refs)
 total = set(entity_a.refs) | set(entity_b.refs)
# Jaccard similarity jaccard = len(shared) / len(total) if total else 0# Depth weighting (more shared refs = deeper connection) depth_factor = 1 + math.log(1 + len(shared))
# Combined score return jaccard * (depth_factor / 10)
```

**Limitations:**

1. **Size-agnostic**: Treats all references equally regardless of segment size
2. **Scale-independent**: No consideration of hierarchical position in task tree
3. **Binary membership**: Either a reference exists or it doesn’t (no weighting)
4. **Loose multi-scale**: No formal connection to capacity framework
    
    ### 1.2 Why Capacity-Weighted Scoring?
    
    The capacity framework (Appendix B) defines a precise hierarchical structure:
    
    ```
    Task Level (depth=0): 1024 words
    Subtask L1 (depth=1): 512 words (1024/2Â¹)
    Subtask L2 (depth=2): 256 words (1024/2Â²)
    Subtask L3 (d=3): 128 words (1024/2Â³)
    Subtask L4 (d=4): 64 words (1024/2â´)
    Subtask L5 (d=5): 32 words (1024/2âµ)
    ```
    
    A coherency measure that **ignores segment sizes** treats a 1024-word task reference the same as a 32-word subtask reference. This is theoretically unsound and practically misleading.
    

---

## Â§2. Capacity Framework Formal Definition

### 2.1 Grid Structure

**Horizontal Dimension:** 5 levels of nested subtasks (depth 1-5)
**Vertical Dimension:** Up to 10 subtasks per level
**Total Grid:** 50 subtasks per parent task (10 rows Ã— 5 columns)

### 2.2 Capacity Function

For any entity at depth `d` from its parent task:

```
capacity(entity, d) = BASE_CAPACITY / 2^d
where:
 BASE_CAPACITY = 1024 words (task level)
 d âˆˆ {0, 1, 2, 3, 4, 5}
```

**Example Grid:**

```
Task (1024w)
â”œâ”€ Subtask_1.1 (512w)
â”‚ â”œâ”€ Subtask_1.1.1 (256w)
â”‚ â”‚ â”œâ”€ Subtask_1.1.1.1 (128w)
â”‚ â”‚ â”‚ â”œâ”€ Subtask_1.1.1.1.1 (64w)
â”‚ â”‚ â”‚ â”‚ â””â”€ Subtask_1.1.1.1.1.1 (32w)
â”‚ â”œâ”€ Subtask_1.1.2 (256w)
â”‚ â””â”€ ... (up to 10 at this level)
â”œâ”€ Subtask_1.2 (512w)
â””â”€ ... (up to 10 at level 1)
```

### 2.3 Horizontal Uniformity Constraint

**Current Design:** No vertical variation in capacity at same depth level.
All entities at depth `d` have identical capacity regardless of vertical position in grid. This simplifies computation and maintains theoretical elegance.
**Future Consideration:** Vertical heterogeneity could be introduced via custom field overrides, but is not currently implemented.

---

## Â§3. Capacity-Weighted Coherency Function

### 3.1 Theoretical Foundation

**Assumption:** We are at a mid-process stage where:

1. True relational information has been populated in custom fields
2. References between entities are explicitly recorded
3. Word counts are known or estimable from capacity function
**Goal:** Compute coherency that reflects both:
- **Topological similarity** (shared references)
- **Magnitude similarity** (weighted by segment sizes)
    
    ### 3.2 Weighted Reference Set
    
    For entity `e` with reference set `R(e) = {râ‚, râ‚‚, ..., râ‚™}`, define the **weighted reference multiset**:
    
    ```
    W(e) = {(râ‚, wâ‚), (râ‚‚, wâ‚‚), ..., (râ‚™, wâ‚™)}
    where:
    wáµ¢ = capacity(ráµ¢) = 1024 / 2^depth(ráµ¢)
    ```
    
    ### 3.3 Capacity-Weighted Jaccard
    
    Standard Jaccard treats all elements equally. We extend it:
    
    ```
    weighted_jaccard(A, B) = Î£(min_weights) / Î£(max_weights)
    where:
    min_weights = Î£ min(wâ‚(r), wáµ¦(r)) for r in (A âˆ© B)
    max_weights = Î£ max(wâ‚(r), wáµ¦(r)) for r in (A âˆª B)
    ```
    
    **Intuition:** If both A and B reference a 1024-word task, that contributes more to their similarity than both referencing a 32-word subtask.
    
    ### 3.4 Scale-Aware Depth Factor
    
    Replace the simple `log(1 + |shared|)` with a **capacity-scaled depth factor**:
    
    ```
    depth_factor(A, B) = 1 + log(1 + total_shared_capacity / BASE_CAPACITY)
    where:
    total_shared_capacity = Î£ capacity(r) for r in (A âˆ© B)
    ```
    
    This ensures that:
    
- Two entities sharing high-capacity references get higher depth scores
- The factor scales naturally with the capacity framework
- Normalization by `BASE_CAPACITY` keeps values in reasonable range
    
    ### 3.5 Final Capacity-Weighted Coherency
    
    ```python
    def capacity_weighted_coherence(entity_a, entity_b, capacity_func):
    """Robust multi-scale coherency with capacity weighting
    ```
    

Args:
entity_a: First entity with .refs attribute
entity_b: Second entity with .refs attribute
capacity_func: Function mapping entity_id -> word_count

Returns:
float: Coherency score in [0, 1]
““”
refs_a = set(entity_a.refs)
refs_b = set(entity_b.refs)

# Shared and total reference sets

shared = refs_a & refs_b
total = refs_a | refs_b

if not total:
return 0.0

# Compute weighted Jaccard

min_weights = sum(
min(capacity_func(r, entity_a), capacity_func(r, entity_b))
for r in shared
)
max_weights = sum(
max(capacity_func(r, entity_a), capacity_func(r, entity_b))
for r in total
)

weighted_jaccard = min_weights / max_weights if max_weights > 0 else 0

# Compute capacity-scaled depth factor

total_shared_capacity = sum(capacity_func(r, entity_a) for r in shared)
depth_factor = 1 + math.log(1 + total_shared_capacity / 1024)

# Combined score with normalization

return weighted_jaccard * (depth_factor / 10)

```
---
## Â§4. Multi-Scale Coherency Computation
### 4.1 Scale Stratification
Define three coherency scales based on entity depth:
**Coarse Scale (Book/Project Level):**
- Entities at depth 0-1
- Capacity range: 512-1024 words
- Long-range thematic coherence
**Medium Scale (Chapter/Task Level):**
- Entities at depth 2-3
- Capacity range: 128-256 words
- Mid-range plot coherence
**Fine Scale (Scene/Subtask Level):**
- Entities at depth 4-5
- Capacity range: 32-64 words
- Line-level detail coherence
### 4.2 Scale-Specific Coherency
For entities at different scales, apply **cross-scale penalty**:
```python
def cross_scale_penalty(depth_a, depth_b):
 """
 Penalize coherency between entities at very different scales

Returns multiplicative factor in (0, 1]
 """
 depth_diff = abs(depth_a - depth_b)

# No penalty for same scale or adjacent scales
 if depth_diff <= 1:
 return 1.0

# Exponential decay for large differences
 return math.exp(-0.5 * (depth_diff - 1))
```

**Rationale:** A task-level reference and a deep subtask reference should have diminished coherency contributionâ€”they operate at different scales of the narrative.

### 4.3 Full Multi-Scale Coherency

```python
def multi_scale_coherence(entity_a, entity_b, capacity_func, depth_func):
 """ Complete coherency measure with scale awarenessArgs: entity_a, entity_b: Entities to compare capacity_func: Maps entity_id -> capacity depth_func: Maps entity_id -> depth from rootReturns: float: Multi-scale coherency score """ # Base capacity-weighted coherency base_coherency = capacity_weighted_coherence(entity_a, entity_b, capacity_func)
# Apply cross-scale penalty depth_a = depth_func(entity_a.id)
 depth_b = depth_func(entity_b.id)
 scale_penalty = cross_scale_penalty(depth_a, depth_b)
return base_coherency * scale_penalty
```

---

## Â§5. Example Calculation

### 5.1 Setup

**Entity A (Task-level, depth=0):**

- Capacity: 1024 words
- References: {Task_B (1024w), Subtask_C1 (512w), Subtask_D2 (256w)}
**Entity B (Subtask-level, depth=1):**
- Capacity: 512 words
- References: {Task_B (1024w), Subtask_C2 (512w), Subtask_E3 (128w)}
    
    ### 5.2 Computation
    
    **Shared references:**
    
- Task_B: 1024 words
**Total references:**
- Task_B (1024w), Subtask_C1 (512w), Subtask_C2 (512w), Subtask_D2 (256w), Subtask_E3 (128w)
**Weighted Jaccard:**
    
    ```
    min_weights = min(1024_A, 1024_B) = 1024
    max_weights = 1024 + max(512_C1, 512_C2) + 256 + 128
    = 1024 + 512 + 256 + 128 = 1920
    weighted_jaccard = 1024 / 1920 = 0.533
    ```
    
    **Depth factor:**
    
    ```
    total_shared_capacity = 1024
    depth_factor = 1 + log(1 + 1024/1024) = 1 + log(2) = 1.693
    ```
    
    **Base coherency:**
    
    ```
    base = 0.533 Ã— (1.693 / 10) = 0.090
    ```
    
    **Cross-scale penalty:**
    
    ```
    depth_diff = |0 - 1| = 1
    penalty = 1.0 (adjacent scales)
    ```
    
    **Final coherency:**
    
    ```
    coherence(A, B) = 0.090 Ã— 1.0 = 0.090
    ```
    
    ### 5.3 Comparison with Simple Measure
    
    Using the original simple measure:
    
    ```python
    shared = {Task_B}
    total = {Task_B, Subtask_C1, Subtask_C2, Subtask_D2, Subtask_E3}
    jaccard = 1 / 5 = 0.2depth_factor = 1 + log(1 + 1) = 1.693simple_coherence = 0.2 Ã— (1.693 / 10) = 0.034
    ```
    
    **Result:** The capacity-weighted measure gives a **higher score** (0.090 vs 0.034) because it recognizes that the shared reference is a high-capacity task, not a trivial subtask.
    

---

## Â§6. Implementation Considerations

### 6.1 Capacity Function Implementation

```python
def get_capacity(entity_id, entity_registry):
 """ Retrieve capacity from Asana custom field or compute from depthArgs: entity_id: Asana GID of entity entity_registry: Dict mapping GID to entity metadataReturns: int: Capacity in words """ entity = entity_registry.get(entity_id)
if not entity:
 return 0# Try to get from custom field first if 'capacity' in entity.custom_fields:
 return entity.custom_fields['capacity']
# Fallback: compute from depth depth = entity.depth_from_root
 return 1024 // (2 ** depth)
```

### 6.2 Depth Function Implementation

```python
def get_depth(entity_id, entity_registry):
 """ Get hierarchical depth from root taskReturns: int: Depth level (0 = task, 1-5 = subtasks) """ entity = entity_registry.get(entity_id)
if not entity:
 return 0# Traverse parent chain depth = 0 current = entity
while current.parent_id:
 depth += 1 current = entity_registry.get(current.parent_id)
if depth > 5: # Safety check breakreturn depth
```

### 6.3 Custom Field Schema

To support this measure, ensure the following custom fields exist:
**At All Levels (Task, Subtask):**

- `referential_links`: Multi-reference field â†’ list of entity GIDs
- `capacity_override`: Number field â†’ manual capacity (optional)
- `calculated_depth`: Number field â†’ auto-computed depth
- `coherency_score`: Number field â†’ cached coherency (computed)
**Reference Tracking:**
Each entity maintains a `referential_links` custom field containing GIDs of related entities. This is the foundation of the reference set `R(e)`.

---

## Â§7. Integration with Multi-Homing (Future)

### 7.1 Multi-Homing Concept (from Appendix B)

Tasks can exist in multiple sections across different projects via “Move to Another Project” AI Rules. Since rules run **per project**, different pathways can branch based on project context.

### 7.2 Coherency Implications

When task T exists in projects Pâ‚ and Pâ‚‚:
**Challenge:** Does coherency change based on project context?
**Solution:** Coherency is computed **project-specific** if the reference set depends on project:

```python
def project_specific_coherence(entity_a, entity_b, project_id, capacity_func):
 """ Compute coherency within specific project contextArgs: project_id: Current project GID (affects which refs are "visible") """ # Filter references to only those visible in this project refs_a_proj = filter_by_project(entity_a.refs, project_id)
 refs_b_proj = filter_by_project(entity_b.refs, project_id)
# Rest of computation remains the same # ...
```

### 7.3 Cross-Project Coherency

For global coherency (across all projects where entities appear):

```python
def global_coherence(entity_a, entity_b, all_projects, capacity_func):
 """ Aggregate coherency across all projectsReturns: dict: {project_id: coherency_score} """ results = {}
for proj in all_projects:
 results[proj] = project_specific_coherence(
 entity_a, entity_b, proj, capacity_func
 )
return results
```

## This enables tracking how coherency varies across different organizational views of the same content.

## Â§8. Algorithmic Complexity

### 8.1 Time Complexity

For entities A and B:

```
|R(A)| = nâ‚ (number of references from A)
|R(B)| = náµ¦ (number of references from B)
```

**Operations:**

1. Set intersection/union: O(nâ‚ + náµ¦)
2. Capacity lookups: O(|A âˆª B|) = O(nâ‚ + náµ¦)
3. Weight summations: O(|A âˆª B|) = O(nâ‚ + náµ¦)
**Total:** O(nâ‚ + náµ¦) per pair
For N entities in graph:
- All-pairs coherency: O(NÂ² Â· (nâ‚ + náµ¦))
- With average degree dÌ„: O(NÂ² Â· dÌ„)
    
    ### 8.2 Space Complexity
    
    **Storage:**
    
- Entity registry: O(N)
- Capacity cache: O(N)
- Depth cache: O(N)
- Coherency matrix: O(NÂ²)
**Optimization:** For sparse graphs (dÌ„ << N), store coherency as adjacency list: O(N Â· dÌ„)
    
    ### 8.3 Caching Strategy
    
    Since capacities are static (change rarely) and depths are structural:
    
    ```python
    class CoherencyCache:
    """Cache for expensive computations"""def __init__(self):
    self.capacity_cache = {} # entity_id -> capacityself.depth_cache = {} # entity_id -> depthself.coherency_cache = {} # (id_a, id_b) -> score
    ```
    

def get_coherency(self, a, b):
key = tuple(sorted([a.id, b.id])) # Symmetric

if key not in self.coherency_cache:
self.coherency_cache[key] = multi_scale_coherence(a, b, …)

return self.coherency_cache[key]

def invalidate_entity(self, entity_id):
““”
Invalidate cache when entity references change
““”

# Remove all coherency entries involving this entity

keys_to_remove = [
k for k in self.coherency_cache.keys()
if entity_id in k
]

for key in keys_to_remove:
del self.coherency_cache[key]

```
---
## Â§9. Validation and Testing
### 9.1 Correctness Properties
A valid coherency measure must satisfy:
1. **Symmetry:** `coherence(A, B) = coherence(B, A)`
2. **Boundedness:** `0 â‰¤ coherence(A, B) â‰¤ 1`
3. **Identity:** `coherence(A, A) = 1` (if self-references allowed)
4. **Monotonicity:** More shared refs â†’ higher coherency (capacity-weighted)
### 9.2 Unit Tests
```python
def test_symmetry():
 assert coherence(A, B) == coherence(B, A)
def test_boundedness():
 score = coherence(A, B)
 assert 0 <= score <= 1
def test_capacity_weighting():
 # A and B share one high-capacity ref
 score_high = coherence(A_high_cap, B_high_cap)

# C and D share one low-capacity ref
 score_low = coherence(C_low_cap, D_low_cap)

assert score_high > score_low
def test_scale_penalty():
 # Task-level and deep subtask should have reduced coherency
 score_cross = coherence(Task, Deep_Subtask)
 score_same = coherence(Task, Other_Task)

assert score_cross < score_same # Penalty applied
```

### 9.3 Integration Testing

Test against real Asana data:

1. Load project hierarchy via API
2. Populate `referential_links` custom fields
3. Compute all-pairs coherency matrix
4. Validate ranges and relationships
5. Compare with manual spot-checks

---

## Â§10. Relationship to Descriptive Set Theory

### 10.1 Polish Space Structure

In the descriptive set-theoretic framework (as introduced in other project documents), entities live in a Polish space (X, d) where:

```
d(x, y) = 1 - coherence(x, y)
```

The capacity-weighted coherency provides a **Borel-measurable** distance metric that:

1. Is complete (Cauchy sequences converge)
2. Is separable (has countable dense subset)
3. Respects the hierarchical structure of the task tree
    
    ### 10.2 Lebesgue Measure of Coherency
    
    Define the **total coherency measure** over all pairs:
    
    ```
    Î¼(coherent_pairs) = âˆ«âˆ« coherence(x, y) dÎ»(x) dÎ»(y)
    ```
    
    Where Î» is Lebesgue measure over the entity space. This quantifies **global entanglement** of the referential fabric.
    The capacity weighting ensures this integral is **dominated by high-capacity relationships**, which is theoretically desirable (coarse-scale coherency matters more than fine-scale noise).
    
    ### 10.3 Chromatic Bounds with Capacity
    
    The chromatic number Ï‡(G) of the entity graph gains additional structure:
    **Theorem (Capacity-Weighted Chromatic Bound):**
    
    ```
    If G = (V, E) where edge (u,v) âˆˆ E when coherence(u,v) > Î¸,
    then Ï‡(G) â‰¤ Î”(G) + 1
    ```
    
    But now **Î”(G)** (max degree) can be computed with capacity thresholding:
    
- High-capacity edges are “stronger” conflicts
- May enable tighter bounds via weighted graph theory
This connects the coherency measure back to agent assignment and coloring problems discussed in the onboarding lecture.

---

## Â§11. Practical Workflow

### 11.1 Initial Setup

1. **Define base capacity:** Set `BASE_CAPACITY = 1024` in project settings
2. **Create custom fields:**
    - `referential_links` (multi-reference)
    - `capacity_override` (number, optional)
    - `calculated_depth` (number, auto)
    - `coherency_scores` (JSON, cached)
3. **Populate hierarchy:** Ensure all tasks/subtasks are properly nested
    
    ### 11.2 Reference Population
    
    **Manual:** Content creators add references via custom field UI
    **Semi-automated:** LLM analysis suggests references based on content
    **Validated:** QA team (see QA Intervention Guide) reviews and approves
    
    ### 11.3 Coherency Computation
    
    **Batch mode:**
    
    ```python
    # Compute all-pairs coherency matrixcoherency_matrix = {}
    for entity_a in all_entities:
    for entity_b in all_entities:
    if entity_a.id < entity_b.id: # Avoid duplicatesscore = multi_scale_coherence(entity_a, entity_b, ...)
    coherency_matrix[(entity_a.id, entity_b.id)] = score
    ```
    
    **Incremental mode:**
    
    ```python
    # When entity X's references changeaffected_entities = get_neighbors(X)
    for entity in affected_entities:
    score = multi_scale_coherence(X, entity, ...)
    coherency_cache.update((X.id, entity.id), score)
    ```
    
    ### 11.4 Monitoring and Alerting
    
    **Low coherency alert:** If critical entities (e.g., main plot chapters) have coherency < 0.3, flag for review.
    **Scale mismatch alert:** If high cross-scale penalties are common, may indicate poor reference hygiene.
    **Capacity violation alert:** If actual word counts deviate significantly from capacity framework, flag for correction.
    

---

## Â§12. Future Extensions

### 12.1 Dynamic Capacity Allocation

Allow vertical variation within same depth level:

```python
def dynamic_capacity(entity, position_in_level):
 """ Allocate extra capacity to "key" subtasks """ base = 1024 / (2 ** entity.depth)
if entity.is_key_scene:
 return base * 1.5 # 50% boostreturn base
```

This requires updating the coherency function to handle heterogeneous capacities at same depth.

### 12.2 Temporal Coherency

Track how coherency evolves over time:

```python
def temporal_coherence_series(entity_a, entity_b, time_points):
 """ Coherency as function of time (e.g., across draft revisions)Returns: List[Tuple[timestamp, coherency_score]] """ series = []
for t in time_points:
 snapshot_a = get_entity_snapshot(entity_a, t)
 snapshot_b = get_entity_snapshot(entity_b, t)
score = multi_scale_coherence(snapshot_a, snapshot_b, ...)
 series.append((t, score))
return series
```

Enables tracking: “Did coherency improve after revision?” (See Appendix: Storage for versioning details)

### 12.3 Weighted Reference Types

Not all references are equal. Introduce **reference types**:

```
REF_NARRATIVE = 1.0 # Core plot reference
REF_THEMATIC = 0.7 # Theme/motif reference
REF_CHARACTER = 0.8 # Character arc reference
REF_WORLDBUILD = 0.5 # Background/setting reference
```

Update weighted Jaccard:

```python
min_weights = sum(
 min(capacity(r) * ref_type_weight(r, A),
capacity(r) * ref_type_weight(r, B))
 for r in shared
)
```

## This allows fine-grained control over what “counts” as coherent.

## Â§13. Conclusion

This appendix provides a **mathematically rigorous** and **practically implementable** coherency measure that:

1. âœ… **Respects capacity framework:** Weights references by segment size (1024/2^n)
2. âœ… **Multi-scale aware:** Applies cross-scale penalties for depth mismatches
3. âœ… **Improves on baseline:** Addresses all limitations of simple Jaccard measure
4. âœ… **Integrates with theory:** Compatible with Polish space / Borel measure formalism
5. âœ… **Cacheable and efficient:** O(NÂ·dÌ„) space, O(NÂ²Â·dÌ„) time for all-pairs
6. âœ… **Extensible:** Supports future enhancements (multi-homing, temporal, typed refs)
**Key Takeaway:** By weighting references by their capacity (word count), we ensure that coherency scores reflect the true **magnitude of shared content**, not just the **topology of shared connections**. This makes the measure robust, meaningful, and directly applicable to content quality assessment in the book-writing workflow.

---

## References

- **Main Document:** New Analyst Onboarding Lecture (baseline coherency definition)
- **Appendix B:** Capacity & Multihoming Corrections (capacity framework, grid structure)
- **Appendix Storage:** Auditability & Versioning (temporal coherency support)
- **QA Intervention Guide:** Quality assurance protocols (coherency thresholds)
- **Descriptive Set-Theoretic Engine:** Mathematical foundations (Polish space, Borel measures)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-29
**Author:** Technical Architecture Team
**Status:** Ready for Implementation