# Baseline Defining Moments: Mathematical Extraction from Ground Truth

# Baseline Defining Moments: Mathematical Extraction from Ground Truth

**Core Problem**: When transforming Universal Framework₀ into Manuscript-Specific Framework₄, how do we ensure we preserve **cognitive continuity**—the intellectual context, research awareness, and narrative flow that makes ground truth passages "ideal"?

**User Insight**: "Figure out a way to extract baseline defining moments (in mathematical form) then we can construct the integration in an ad hoc manner."

**Goal**: Develop rigorous mathematical characterization of ground truth quality that exerts **bounded constraints** on universal framework thresholds, preventing loss of intellectual context during calibration.

---

## Part 1: The Cognitive Continuity Problem

### What Gets Lost in Ad Hoc Calibration

Current approach ([ITERATION 1: Calibrating Against Preface + Section 1.1](ITERATION%201%20Calibrating%20Against%20Preface%20+%20Section%20%204af2755085a74dbaaab38f83e42d9c7e.md)):

```
1. Apply Framework₀ to Ground Truth 1
2. Flag 50 "deficiencies"
3. Manually triage: "This looks like style, not error"
4. Adjust threshold: "Expand from 1.5-2.0 to 1.0-2.0"
5. Hope this preserves what makes GT1 good
```

**Problem**: Step 3-4 are **subjective and disconnected from the underlying quality structure**.

**Risk**: We might adjust a threshold that accidentally destroys the very quality we're trying to preserve.

**Example**:

- GT1 has discourse marker density of 1.2/100 words
- We expand threshold to 1.0-2.0 to accept this
- **But**: The 1.2 density isn't arbitrary—it emerges from GT1's **argument structure**
- GT1 uses fewer markers because it has **strong entity continuity** (compensating mechanism)
- If we just expand the threshold without understanding this **relationship**, we might accept text with 1.1 markers but WEAK entity continuity
- **Result**: Threshold adjustment loses the cognitive structure

### The Baseline Defining Moment Concept

**Definition**: A baseline defining moment is a **mathematically extractable invariant** from ground truth that captures a fundamental quality constraint.

**Not just**: "GT1 has X value for measure M"

**But rather**: "GT1 maintains invariant relationship I between measures M₁, M₂, M₃"

**Example invariants**:

- **Coherence budget**: `entity_continuity + discourse_markers + topic_sentence_strength ≥ θ`
- **Evidence density**: `claims_per_paragraph ≤ evidence_items_per_paragraph × α`
- **Cognitive load**: `sentence_complexity × paragraph_density ≤ β`

These are **structural relationships** that define quality, not just threshold values.

---

## Part 2: Mathematical Framework for Extraction

### Step 1: Represent Ground Truth as Feature Vector

For ground truth passage GT with n sentences, m entities, k measures:

**Measure outputs**:

$$mathbf{x} = [x_1, x_2, ..., x_k]$$

Where $x_i$ = output of measure $m_i$ on GT

**Example** (Preface from [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)):

```python
x = [
    0.68,    # x₁: Lexical diversity (TTR)
    1.47,    # x₂: Discourse marker density (per 100 words)
    0.71,    # x₃: Entity stability (void fraction continuity)
    24.3,    # x₄: Mean sentence length
    0.42,    # x₅: American exceptionalism entity continuity
    0.58,    # x₆: Founding population entity continuity
    ...,
    1.2      # x₆₁: Some other measure
]
```

### Step 2: Extract Invariant Relationships

**Hypothesis**: Quality emerges from **relationships between measures**, not absolute values.

### Method A: Linear Constraints

Find linear combinations that remain constant:

$$sum_{i=1}^{k} a_i x_i = c$$

Where $a_i$ are weights, $c$ is constant.

**Interpretation**: This defines a hyperplane in measure-space that GT must lie on.

**Example**:

```
0.5 × discourse_markers + 0.3 × entity_stability + 0.2 × topic_strength = 1.8
```

This says: GT achieves coherence through a **weighted combination** of mechanisms, not just any single one.

### Method B: Ratio Constraints

Find ratios that must be maintained:

$$frac{x_i}{x_j} in [r_{min}, r_{max}]$$

**Example**:

```
claims_per_paragraph / evidence_per_paragraph ≤ 0.8
```

GT never makes more claims than it can support with evidence.

### Method C: Functional Relationships

Find nonlinear dependencies:

$$x_i = f(x_j, x_k, ...)$$

**Example**:

```
sentence_complexity = g(paragraph_density, discourse_markers)
```

When paragraphs are dense, GT compensates with simpler sentences OR more discourse markers.

### Step 3: Validation - Multi-GT Extraction

**Problem**: Single GT might have idiosyncratic features.

**Solution**: Extract invariants that hold across ALL ground truths.

Given GT₁, GT₂, GT₃, GT₄:

```python
# Extract candidate invariants from each GT
invariants_1 = extract_invariants(GT_1)
invariants_2 = extract_invariants(GT_2)
invariants_3 = extract_invariants(GT_3)
invariants_4 = extract_invariants(GT_4)

# Keep only invariants that hold across all GTs
baseline_invariants = invariants_1 ∩ invariants_2 ∩ invariants_3 ∩ invariants_4
```

**These are the "baseline defining moments"**—structural properties that define this manuscript's quality across all ideal passages.

---

## Part 3: Concrete Extraction Algorithm

### Algorithm: Statistical Invariant Discovery

**Input**:

- Ground truth passages: {GT₁, GT₂, ..., GT_n}
- Measure set: {m₁, m₂, ..., m_k}

**Output**:

- Set of invariant relationships I
- Each invariant includes: type (linear/ratio/functional), coefficients, bounds

**Steps**:

```python
def extract_baseline_invariants(ground_truths, measures):
    """
    Extract mathematical invariants from ground truth passages
    """
    # Step 1: Compute measure outputs for all GTs
    feature_matrix = np.zeros((len(ground_truths), len(measures)))
    for i, gt in enumerate(ground_truths):
        for j, measure in enumerate(measures):
            feature_matrix[i, j] = measure.evaluate(gt)
    
    # Step 2: Discover linear invariants
    linear_invariants = discover_linear_constraints(feature_matrix)
    
    # Step 3: Discover ratio invariants  
    ratio_invariants = discover_ratio_constraints(feature_matrix)
    
    # Step 4: Discover functional dependencies
    functional_invariants = discover_functional_relationships(feature_matrix)
    
    # Step 5: Validate across all GTs
    validated_invariants = validate_across_gts([
        linear_invariants,
        ratio_invariants, 
        functional_invariants
    ], feature_matrix)
    
    return validated_invariants

def discover_linear_constraints(X):
    """
    Find linear combinations that are approximately constant across GTs
    
    Uses Principal Component Analysis to find directions of low variance
    """
    from sklearn.decomposition import PCA
    
    # Standardize features
    X_std = (X - X.mean(axis=0)) / X.std(axis=0)
    
    # PCA to find low-variance directions
    pca = PCA()
    [pca.fit](http://pca.fit)(X_std)
    
    # Components with low variance are potential invariants
    invariants = []
    for i, variance in enumerate(pca.explained_variance_):
        if variance < 0.1:  # Low variance threshold
            # This component is approximately constant
            coefficients = pca.components_[i]
            constant = np.mean(X_std @ coefficients)
            
            invariant = {
                'type': 'linear',
                'coefficients': coefficients,
                'constant': constant,
                'variance': variance,
                'interpretation': interpret_linear(coefficients, measure_names)
            }
            invariants.append(invariant)
    
    return invariants

def discover_ratio_constraints(X):
    """
    Find ratios between measures that remain bounded
    """
    invariants = []
    n_measures = X.shape[1]
    
    for i in range(n_measures):
        for j in range(i+1, n_measures):
            # Compute ratio for all GTs
            ratios = X[:, i] / (X[:, j] + 1e-10)  # Avoid division by zero
            
            # Check if ratio is stable
            ratio_std = np.std(ratios)
            ratio_mean = np.mean(ratios)
            
            if ratio_std / ratio_mean < 0.2:  # Coefficient of variation < 20%
                invariant = {
                    'type': 'ratio',
                    'numerator': i,
                    'denominator': j,
                    'mean_ratio': ratio_mean,
                    'std_ratio': ratio_std,
                    'bounds': [ratio_mean - 2*ratio_std, ratio_mean + 2*ratio_std]
                }
                invariants.append(invariant)
    
    return invariants

def discover_functional_relationships(X):
    """
    Find nonlinear dependencies using regression
    """
    from sklearn.ensemble import RandomForestRegressor
    
    invariants = []
    n_measures = X.shape[1]
    
    for target_idx in range(n_measures):
        # Try to predict target from other measures
        y = X[:, target_idx]
        X_other = np.delete(X, target_idx, axis=1)
        
        model = RandomForestRegressor(max_depth=3, random_state=42)
        [model.fit](http://model.fit)(X_other, y)
        
        # If prediction is accurate, we found a dependency
        y_pred = model.predict(X_other)
        r2 = 1 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)
        
        if r2 > 0.8:  # Strong relationship
            invariant = {
                'type': 'functional',
                'target': target_idx,
                'predictors': [i for i in range(n_measures) if i != target_idx],
                'model': model,
                'r2': r2,
                'interpretation': f"Measure {target_idx} is predictable from others"
            }
            invariants.append(invariant)
    
    return invariants

def validate_across_gts(invariant_sets, X):
    """
    Keep only invariants that hold for ALL ground truths
    """
    validated = []
    
    for invariant_set in invariant_sets:
        for invariant in invariant_set:
            # Check if invariant holds for each GT
            violations = 0
            for i in range(X.shape[0]):
                if not check_invariant(invariant, X[i]):
                    violations += 1
            
            # Keep if holds for ≥80% of GTs
            if violations / X.shape[0] <= 0.2:
                invariant['validity'] = 1 - violations / X.shape[0]
                validated.append(invariant)
    
    return validated
```

---

## Part 4: From Invariants to Bounded Thresholds

### How Invariants Constrain Threshold Adjustment

**Current ad hoc approach**:

```
GT has discourse_markers = 1.2
Universal threshold: [1.5, 2.0]
→ Adjust to: [1.0, 2.0]  (just expand to include GT value)
```

**Invariant-based approach**:

```
Invariant discovered: 
  0.5 × discourse_markers + 0.3 × entity_stability = 1.8
  
GT values:
  discourse_markers = 1.2
  entity_stability = 0.71
  0.5 × 1.2 + 0.3 × 0.71 = 0.6 + 0.213 = 0.813 ≠ 1.8 ???
  
Hmm, let me recalculate with proper scaling...
```

Actually, let me reformulate this more clearly:

**Invariant**: The ground truths maintain a **coherence budget**:

$$C = w_1 cdot text{discourse_markers} + w_2 cdot text{entity_stability} + w_3 cdot text{topic_strength}$$

Where $C \in [C_{min}, C_{max}]$ across all GTs.

**Implication for threshold adjustment**:

When adjusting threshold for discourse_markers, we cannot simply expand it arbitrarily. We must ensure:

$$text{For any accepted text: } w_1 cdot x_1 + w_2 cdot x_2 + w_3 cdot x_3 geq C_{min}$$

So if we relax discourse marker threshold (lower $x_1$), the text must compensate with higher $x_2$ or $x_3$.

### Formal Bounded Threshold Adjustment

**Given**:

- Universal threshold for measure $m_i$: $T_i^{(0)} = [t_{i,min}^{(0)}, t_{i,max}^{(0)}]$
- Ground truth values: $\{x_i^{(1)}, x_i^{(2)}, ..., x_i^{(n)}\}$ from n GTs
- Extracted invariants: $\{I_1, I_2, ..., I_k\}$

**Goal**: Find manuscript-specific threshold $T_i^{(M)}$ that:

1. Includes all GT values: $x_i^{(j)} \in T_i^{(M)}$ for all j
2. Respects all invariants involving $m_i$
3. Minimizes expansion from universal threshold

**Optimization problem**:

$$
\begin{aligned}
\min_{t_{i,min}, t_{i,max}} \quad & (t_{i,max} - t_{i,min}) \\
\text{s.t.} \quad & t_{i,min} \leq x_i^{(j)} \leq t_{i,max}, \quad \forall j \\
& I_k(t_{i,min}, t_{i,max}, \text{other measures}) \text{ holds}, \quad \forall k \\
& t_{i,min} \geq 0, \quad t_{i,max} \leq \infty
\end{aligned}
$$

The invariant constraints $I_k$ prevent arbitrary expansion.

**Example**:

Suppose we have invariant:

$$text{discourse_markers} times text{entity_stability} geq 0.8$$

And we want to adjust discourse_marker threshold from [1.5, 2.0] to include GT value of 1.2.

We cannot just set new threshold to [1.2, 2.0] because:

- If a text has discourse_markers = 1.2 and entity_stability = 0.5
- Then 1.2 × 0.5 = 0.6 < 0.8 (violates invariant)

So the proper adjustment is:

$$text{discourse_markers} geq frac{0.8}{text{entity_stability}}$$

This creates a **conditional threshold**: the acceptable discourse marker value depends on entity stability.

---

## Part 5: Integration Strategy

### Ad Hoc Construction from Baseline Moments

The user suggests "construct the integration in an ad hoc manner" after extracting baseline moments.

**Interpretation**: Once we have mathematical invariants, we can flexibly integrate them into the framework based on:

1. Which invariants are most critical
2. Which are easiest to implement
3. Which provide most diagnostic value

Not all invariants need to be enforced equally—we prioritize based on practical impact.

### Integration Workflow

```
Step 1: Extract all candidate invariants from GTs
  → Result: 20-30 mathematical relationships
  
Step 2: Rank by importance
  → Criteria:
    - How consistent across GTs (validity score)
    - How much variance they explain
    - How interpretable they are
  → Result: Top 8-10 invariants
  
Step 3: For each invariant, design enforcement mechanism
  → Linear invariant → Add as compound measure
  → Ratio invariant → Add as conditional threshold
  → Functional invariant → Add as compensatory rule
  
Step 4: Integrate into Framework incrementally
  → Test each addition
  → Verify it reduces false positives without masking true errors
  → Accept if net quality improves
  
Step 5: Iterate until convergence
  → Framework₁, Framework₂, ..., Framework_final
  → Stop when GT passages produce 0 flags
```

### Example Integration: Coherence Budget Invariant

**Extracted invariant**:

```python
coherence_budget = (
    0.4 × discourse_marker_density +
    0.3 × entity_stability_score +
    0.2 × topic_sentence_strength +
    0.1 × paragraph_transition_quality
)

# All GTs satisfy: coherence_budget ∈ [1.5, 2.2]
```

**Integration as new compound measure**:

```python
class CoherenceBudgetMeasure:
    def __init__(self):
        self.weights = [0.4, 0.3, 0.2, 0.1]
        self.threshold = [1.5, 2.2]
    
    def evaluate(self, text):
        # Compute component measures
        dm_density = discourse_marker_measure.evaluate(text)
        entity_stab = entity_stability_measure.evaluate(text)
        topic_strength = topic_sentence_measure.evaluate(text)
        transition_qual = transition_measure.evaluate(text)
        
        # Compute weighted sum
        budget = (
            self.weights[0] * dm_density +
            self.weights[1] * entity_stab +
            self.weights[2] * topic_strength +
            self.weights[3] * transition_qual
        )
        
        # Flag if below threshold
        if budget < self.threshold[0]:
            return {
                'flagged': True,
                'value': budget,
                'message': f"Coherence budget {budget:.2f} below minimum {self.threshold[0]}",
                'recommendation': self._generate_recommendation(dm_density, entity_stab, topic_strength, transition_qual)
            }
        
        return {'flagged': False, 'value': budget}
    
    def _generate_recommendation(self, dm, es, ts, tq):
        # Identify which component is weakest
        components = [
            ('discourse markers', dm, self.weights[0]),
            ('entity stability', es, self.weights[1]),
            ('topic strength', ts, self.weights[2]),
            ('transitions', tq, self.weights[3])
        ]
        
        # Sort by weighted contribution
        contributions = [(name, val * weight) for name, val, weight in components]
        weakest = min(contributions, key=lambda x: x[1])
        
        return f"Improve {weakest[0]} to raise coherence budget"
```

This compound measure **enforces the structural relationship** discovered in ground truths, not just individual thresholds.

---

## Part 6: Preserving Cognitive Continuity

### How Invariants Preserve Context

**The problem**: When we adjust individual measure thresholds independently, we lose the **relational structure** that makes ground truth cognitively coherent.

**The solution**: Invariants capture **compensatory mechanisms** and **structural constraints** that must be maintained.

**Example: Argument Density vs. Evidence Depth**

Suppose ground truths show:

- GT1: 2 claims/paragraph, 4 evidence items/claim → Ratio 1:2
- GT2: 3 claims/paragraph, 6 evidence items/claim → Ratio 1:2
- GT3: 1 claim/paragraph, 2 evidence items/claim → Ratio 1:2

**Invariant extracted**: `evidence_items ≥ 2 × claims`

This captures the **intellectual rigor** of the manuscript—never make a claim without at least 2 pieces of supporting evidence.

If we adjust thresholds without this invariant:

- Might accept paragraph with 3 claims, 4 evidence items
- Ratio 1:1.33 violates the standard
- **Cognitive continuity lost**: Reader expects 2:1 ratio, gets confused

With invariant-based adjustment:

- When calibrating "claims per paragraph," must simultaneously ensure evidence density scales
- Maintains the manuscript's intellectual standards
- **Cognitive continuity preserved**: Consistent evidentiary rigor throughout

### Narrative Flow Preservation

**Example: Entity Progression Invariant**

Ground truths might show:

- Primary entities introduced in order: E1 (para 1), E2 (para 3), E3 (para 5)
- Entity density increases gradually: 2 → 3 → 4 → 5 entities per paragraph
- No entity appears without prior mention of related entities

**Extracted invariant**:

```
entity_density[i+1] ≤ entity_density[i] + 2
New entities must reference existing entities within 2 paragraphs
```

This captures the **narrative scaffolding** strategy.

Without this invariant:

- Might accept abrupt entity introduction
- Violates the carefully constructed cognitive progression
- Reader gets lost

With invariant:

- Framework flags paragraphs that introduce entities too rapidly
- Maintains the manuscript's pedagogical structure
- **Narrative flow preserved**

---

## Part 7: Practical Implementation on Preface

### Applying to [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)

**Step 1: Extract feature vector from Preface**

```python
from demonstration import analyze_preface

preface_features = analyze_preface(preface_text)
# Returns: [x₁, x₂, ..., x₆₁] where xᵢ = measure i output
```

**Step 2: Extract single-GT invariants (preliminary)**

Even with one GT, we can find **internal consistency patterns**:

```python
# Paragraph-level analysis
for paragraph in preface.paragraphs:
    features_p = extract_features(paragraph)
    
# Find relationships that hold across all paragraphs
intra_gt_invariants = find_paragraph_level_invariants(preface.paragraphs)
```

**Example discovered invariant**:

```
Across all 9 paragraphs in Preface:
  sentence_length_mean ∈ [20, 28] words
  sentence_length_std ∈ [8, 14] words
  
Invariant: Author maintains "controlled variety" in sentence length
  Mean stays in narrow band
  But std is high (high variety)
  → Pattern: Consistent average with deliberate variation
```

**Step 3: When we add GT2, GT3, GT4...**

```python
gt1_features = analyze_preface(preface_text)
gt2_features = analyze_section(section_1_2_text)
gt3_features = analyze_section(section_1_3_text)
gt4_features = analyze_section(section_1_4_text)

X = np.array([gt1_features, gt2_features, gt3_features, gt4_features])

invariants = extract_baseline_invariants(X, measures)
```

**Step 4: Generate bounded thresholds**

```python
for measure in measures:
    universal_threshold = measure.threshold
    
    # Collect GT values
    gt_values = [gt_features[[measure.id](http://measure.id)] for gt_features in X]
    
    # Find relevant invariants
    relevant_invariants = [inv for inv in invariants if [measure.id](http://measure.id) in inv.involved_measures]
    
    # Optimize threshold subject to invariants
    manuscript_threshold = optimize_threshold(
        universal_threshold,
        gt_values,
        relevant_invariants
    )
    
    measure.set_manuscript_threshold(manuscript_threshold)
```

---

## Part 8: Comparison to Ad Hoc Approach

### Ad Hoc Calibration (Current)

**Process**:

1. Apply measures to GT
2. "This looks wrong" (subjective)
3. Adjust threshold (arbitrary)
4. Hope it works

**Risks**:

- Lose structural relationships
- Create inconsistent framework
- Miss compensatory mechanisms
- Destroy cognitive continuity

**Advantages**:

- Fast
- Intuitive
- Works for simple cases

### Invariant-Based Calibration (Proposed)

**Process**:

1. Extract mathematical invariants from GT
2. Identify structural relationships
3. Optimize thresholds subject to invariants
4. Validate preservation of invariants

**Risks**:

- Computationally intensive
- May overfit to GT (false invariants)
- Requires multiple GTs for validation
- Implementation complexity

**Advantages**:

- **Preserves cognitive continuity** (main goal)
- Systematic and reproducible
- Captures relational structure
- Provides mathematical guarantees

---

## Part 9: Summary & Next Steps

### What We've Defined

**Baseline Defining Moments**: Mathematical invariants extracted from ground truth that capture:

1. **Linear relationships**: Weighted combinations that remain constant
2. **Ratio constraints**: Proportional relationships between measures
3. **Functional dependencies**: How measures predict each other

**Bounded Threshold Adjustment**: Using invariants as constraints when calibrating:

- Cannot arbitrarily expand thresholds
- Must preserve structural relationships
- Ensures cognitive continuity

**Integration Strategy**: Ad hoc incorporation of invariants:

- Rank by importance
- Implement incrementally
- Test each addition
- Accept if net quality improves

### Implementation Roadmap

**Phase 1: Single GT Analysis** (Preface)

1. Extract 61-dimensional feature vector
2. Find intra-GT patterns (paragraph-level invariants)
3. Generate initial hypothesis about relationships

**Phase 2: Multi-GT Analysis** (Add Sections 1.2, 1.3, 1.4)

1. Extract features from all 4 GTs
2. Run invariant discovery algorithms
3. Validate across GTs
4. Rank by importance and interpretability

**Phase 3: Framework Modification**

1. For top 8-10 invariants:
    - Design enforcement mechanism
    - Integrate into framework
    - Test on GTs (should produce 0 flags)
    - Test on full manuscript
2. Iterate until convergence

**Phase 4: Validation**

1. Verify GT passages produce 0 flags
2. Verify remaining manuscript flags are true inconsistencies
3. Demonstrate cognitive continuity preservation

### Open Questions

1. **How many invariants are "enough"?**
    - Too few: Lose important structure
    - Too many: Overfit to GT, lose diagnostic value
2. **How to handle conflicting invariants?**
    - GT1 might suggest one relationship
    - GT2 might contradict it
    - Need principled resolution
3. **How to make invariants interpretable?**
    - Mathematical relationships need semantic meaning
    - "0.4×m₁ + 0.3×m₂ = 1.8" needs translation to quality concept
4. **How to integrate with validation loop?**
    - Invariants constrain threshold adjustment
    - But validation loop requires re-running measures
    - Need efficient implementation

---

## Conclusion

You're right that ad hoc calibration risks losing **cognitive continuity**—the intellectual structure that makes ground truth passages ideal.

**The solution**: Extract **baseline defining moments** as mathematical invariants, then use these as **bounded constraints** on threshold adjustment.

This preserves:

- Structural relationships between quality dimensions
- Compensatory mechanisms (trade-offs)
- Narrative scaffolding patterns
- Intellectual rigor standards

**Next step**: Implement Phase 1 (single GT analysis on Preface) to demonstrate invariant extraction in practice.

---

**Status**: Methodology defined ✅

**Ready for**: Implementation on [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)

**Integration point**: [ITERATION 1: Calibrating Against Preface + Section 1.1](ITERATION%201%20Calibrating%20Against%20Preface%20+%20Section%20%204af2755085a74dbaaab38f83e42d9c7e.md) + ‣