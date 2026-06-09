# Practical Guide: Severity-Weighted Optimization Algorithm

# Severity-Weighted Multi-Dimensional Optimization Algorithm

**Intelligent Resource Allocation for Constrained Selection Problems**

---

## What It Does

This algorithm selects the most impactful set of actions when you face constraints on how many you can take. It ensures critical issues get addressed first, even when trivial issues vastly outnumber them.

**Core capability:** Rank and select k items from a larger set by intelligently weighing both frequency and importance, guaranteeing that high-priority items are never overlooked due to volume of low-priority items.

---

## When to Use It

Apply this algorithm when you need to:

- **Select a limited number of corrective measures** from a larger set of possible interventions
- **Prioritize by impact** rather than just counting occurrences
- **Guarantee critical coverage** while maximizing overall effectiveness
- **Balance multiple objectives** (severity, coverage, category distribution)
- **Work within resource constraints** (budget, time, personnel)

**Key requirement:** Your items must have both a frequency dimension (how often they occur) and a severity dimension (how important they are).

---

## Input Requirements

**Deficiencies (Items to Address):**

- Set of items D = {d₁, d₂, ..., dₙ}
- Frequency function f: how many times each item occurs
- Severity function s: importance weight for each item
- Category labels (structural, semantic, etc.)

**Measures (Actions Available):**

- Set of actions M = {m₁, m₂, ..., mₘ}
- Coverage relation: which deficiencies each measure addresses
- Category labels
- Optional: resource cost per measure

**Constraints:**

- Maximum number of measures k
- Optional: minimum/maximum per category
- Optional: target coverage threshold

**Example:**

```yaml
deficiencies:
  - {id: "S1", frequency: 1, severity: 100, category: "structural"}
  - {id: "L1", frequency: 50, severity: 1, category: "lexical"}
  - {id: "L2", frequency: 50, severity: 1, category: "lexical"}

measures:
  - {id: "Fix_S1", covers: ["S1"], category: "structural"}
  - {id: "Fix_Lexical", covers: ["L1", "L2"], category: "lexical"}

constraints:
  max_measures: 10
  min_per_category: {"structural": 2, "lexical": 1}
```

---

## How It Works

### 1. Severity-Weighted Scoring

Each measure receives a score based on the weighted impact of deficiencies it addresses:

```
score(measure) = Σ(frequency × severity) for all deficiencies it covers
```

This ensures a measure fixing 1 critical issue (1 × 100 = 100 points) outranks a measure fixing 50 trivial issues (50 × 1 = 50 points).

### 2. Adaptive Strategy Profiles

The algorithm automatically adjusts its selection strategy based on current coverage state:

**Critical Focus** (α=0.9, β=0.1)

- When: Critical deficiencies remain unaddressed
- Strategy: Prioritize severity almost exclusively
- Result: Guarantees all critical items addressed first

**Balanced** (α=0.7, β=0.3)

- When: Critical items covered, moderate overall coverage
- Strategy: Weight severity heavily but consider breadth
- Result: Optimal mix of impact and coverage

**High Volume** (α=0.4, β=0.6)

- When: High-severity items done, many medium items remain
- Strategy: Favor breadth of coverage
- Result: Efficient cleanup of mid-tier issues

**Completion** (α=0.2, β=0.8)

- When: Approaching target coverage threshold
- Strategy: Maximize remaining item count
- Result: Comprehensive final coverage

### 3. Category-Aware Selection

Enforces minimum and maximum representation per category:

**Phase 1:** Select enough measures from each category to meet minimums

**Phase 2:** Fill remaining slots by overall rank while respecting maximums

This prevents all selections clustering in one category.

### 4. Redundancy Control

Three policies for handling overlap when multiple measures address the same deficiency:

**Prohibit** (γ=0): Once covered, remove deficiency from consideration—maximizes distinct coverage

**Minimize** (γ=0.5): Apply 50% penalty to redundant coverage—discourages waste while allowing justified overlap

**Allow** (γ=∞): For critical deficiencies, intentionally select multiple measures—ensures robustness

### 5. Multi-Run Iteration

If one pass doesn't achieve target coverage, run multiple iterations with different strategies:

**Run 1:** Critical-first pass (ensure all high-severity items covered)

**Run 2:** Balanced pass on remaining items

**Run 3:** Completion pass if needed

Each run excludes already-selected measures and updates coverage state.

---

## Algorithm Execution

### Single-Pass Selection

```python
# Compute scores for all measures
for measure in measures:
    score[measure] = sum(
        frequency[d] × severity[d] 
        for d in measure.covers
    )

# Rank by score
ranked = sort(measures, by=score, descending=True)

# Apply category constraints and select top k
selected = constrained_selection(ranked, k, category_limits)

# Return selected measures and coverage achieved
return selected, coverage_metrics
```

### Multi-Pass Iterative

```python
selected_all = []
covered = set()
iteration = 0

while not stopping_criteria_met():
    # Determine strategy profile
    profile = select_profile(critical_coverage, total_coverage)
    
    # Score uncovered deficiencies only
    uncovered = all_deficiencies - covered
    scores = compute_hybrid_scores(measures, uncovered, profile)
    
    # Select next batch
    ranked = sort(measures, by=scores, descending=True)
    batch = constrained_selection(ranked, k, category_limits)
    
    # Update state
    selected_all.extend(batch)
    covered.update(deficiencies_covered_by(batch))
    iteration += 1

return selected_all, coverage_metrics
```

---

## Guarantees and Properties

### Correctness

✓ **Critical coverage guarantee:** All critical deficiencies will be addressed (if measures exist for them)

✓ **Monotonic improvement:** Each iteration increases weighted coverage

✓ **Finite termination:** Algorithm completes in bounded iterations

✓ **Constraint satisfaction:** All category limits and cardinality bounds respected

### Performance

- **Time complexity:** O(iterations × measures × deficiencies)
- **Space complexity:** O(measures × deficiencies)
- **Typical runtime:** Polynomial in input size

### Optimality

- Provides heuristic (greedy) optimization
- NP-hard problem (no polynomial exact algorithm exists)
- Guarantees critical coverage while maximizing weighted impact
- No global optimality guarantee on total weighted coverage

---

## Configuration Options

### Severity Weights

Standard configuration:

```yaml
severity_weights:
  critical: 100    # Must-fix issues
  high: 25         # Major problems
  medium: 5        # Moderate issues
  low: 1           # Minor improvements
```

Adjust ratios based on domain requirements. Key principle: critical weight should be ≥ (max_frequency × high_weight) to ensure dominance.

### Category Constraints

```yaml
category_constraints:
  structural: {min: 2, max: 4}
  cohesion: {min: 2, max: 4}
  semantic: {min: 2, max: 4}
  lexical: {min: 1, max: 3}
```

Set minimums to ensure balanced coverage. Set maximums to prevent over-concentration.

### Redundancy Policy

```yaml
redundancy_policy: "minimize"  # prohibit | minimize | allow
redundancy_penalty: 0.5        # if policy = minimize
```

Choose based on whether you value efficiency (prohibit), balance (minimize), or robustness (allow).

### Multi-Run Parameters

```yaml
measures_per_run: 10
max_runs: 5
target_coverage: 0.95
min_runs: 2
```

### Profile Customization

Override automatic profile selection:

```yaml
force_profile: "balanced"
alpha: 0.7
beta: 0.3
```

---

## Output Format

The algorithm returns:

### Selected Measures

```json
{
  "selected": [
    {"id": "m1", "category": "structural", "run": 1, "score": 245.8},
    {"id": "m2", "category": "cohesion", "run": 1, "score": 189.3}
  ]
}
```

### Coverage Metrics

```json
{
  "critical_coverage": 1.0,           # All critical items addressed
  "weighted_coverage": 0.94,          # 94% of total weighted impact
  "count_coverage": 0.87,             # 87% of total item count
  "measures_used": 18,                # Across all runs
  "iterations": 2
}
```

### Gap Analysis

```json
{
  "uncovered": [
    {"id": "L5", "severity": "low", "reason": "constraint_artifact"},
    {"id": "S7", "severity": "high", "reason": "toolkit_gap"}
  ]
}
```

**Constraint artifacts:** Items with available measures that weren't selected due to k limit

**Toolkit gaps:** Items with no available measures at all

---

## Practical Workflow

### Step 1: Prepare Input Data

Catalog all deficiencies with frequencies and severity assignments. List all available measures with their coverage relations.

### Step 2: Set Constraints

Determine k (measure limit) and optional category constraints based on resources.

### Step 3: Configure Algorithm

Choose redundancy policy, severity weights, and stopping criteria appropriate to your domain.

### Step 4: Execute

Run the algorithm (single-pass or multi-run based on complexity).

### Step 5: Review Output

Examine selected measures, coverage achieved, and any gaps identified.

### Step 6: Apply Measures

Implement the selected measures in priority order (by run, then by score within run).

### Step 7: Validate

Measure actual improvement and compare to predicted coverage metrics.

---

## Domain Applications

### Software Quality Assurance

- **Deficiencies:** Code issues identified by analysis tools
- **Measures:** Refactoring operations, fixes, improvements
- **Constraint:** Developer time available
- **Result:** Prioritize security-critical bugs over style issues

### Security Management

- **Deficiencies:** System vulnerabilities with CVSS scores
- **Measures:** Patches, configuration changes, mitigations
- **Constraint:** Maintenance window duration
- **Result:** Ensure critical vulnerabilities patched first

### Healthcare Resource Allocation

- **Deficiencies:** Patient conditions by prevalence and risk
- **Measures:** Treatment protocols, interventions
- **Constraint:** Budget and capacity
- **Result:** Optimize mortality risk reduction per dollar

### Infrastructure Maintenance

- **Deficiencies:** Component failures by frequency and consequence
- **Measures:** Maintenance tasks, replacements
- **Constraint:** Maintenance budget
- **Result:** Prevent catastrophic failures while managing costs

### Document Quality Improvement

- **Deficiencies:** Writing issues (structural, semantic, lexical)
- **Measures:** Linguistic framework interventions
- **Constraint:** Maximum 10 measures to apply
- **Result:** Fix critical coherence issues before minor style problems

---

## Key Advantages

**Intelligent Prioritization:** Never overlooks critical issues due to volume of trivial ones

**Adaptive Strategy:** Automatically adjusts approach based on current coverage state

**Balanced Coverage:** Prevents over-concentration in single category through constraints

**Transparent Decisions:** Every selection justified by quantified weighted impact score

**Flexible Configuration:** Tune to domain requirements via weights, policies, and profiles

**Provable Guarantees:** Mathematical proofs ensure critical coverage and termination

**Efficient Execution:** Polynomial time complexity suitable for real-world instances

**Gap Identification:** Distinguishes toolkit limitations from resource constraint trade-offs

---

## Usage Example

```python
from optimizer import SeverityWeightedOptimizer

# Initialize
optimizer = SeverityWeightedOptimizer(
    deficiencies=deficiency_list,
    measures=measure_catalog,
    severity_weights={"critical": 100, "high": 25, "medium": 5, "low": 1},
    measures_per_run=10,
    max_runs=3,
    target_coverage=0.95,
    redundancy_policy="minimize",
    category_constraints={
        "structural": {"min": 2, "max": 4},
        "cohesion": {"min": 2, "max": 4}
    }
)

# Execute
result = optimizer.optimize()

# Review
print(f"Critical coverage: {result.metrics.critical_coverage}")
print(f"Total coverage: {result.metrics.weighted_coverage}")
print(f"Selected {len(result.selected)} measures across {result.metrics.iterations} runs")

# Apply
for measure in result.selected:
    apply_measure(measure)
```

---

## Configuration Templates

### Conservative (Critical-Only Focus)

```yaml
severity_weights: {critical: 200, high: 10, medium: 1, low: 0.1}
redundancy_policy: allow
force_profile: critical_focus
```

### Balanced (General Purpose)

```yaml
severity_weights: {critical: 100, high: 25, medium: 5, low: 1}
redundancy_policy: minimize
target_coverage: 0.90
```

### Aggressive (Maximum Coverage)

```yaml
severity_weights: {critical: 50, high: 20, medium: 8, low: 3}
redundancy_policy: prohibit
target_coverage: 0.98
max_runs: 5
```

---

## Summary

This algorithm solves the constrained selection problem when both frequency and severity matter. It guarantees critical issues are addressed first, adapts its strategy as coverage improves, and respects category balance requirements—all while operating in polynomial time with provable correctness properties.

**Use it when:** You need to select k items from n options, where importance and frequency don't correlate, and missing high-importance items would be catastrophic.

**Key insight:** Multiply frequency by severity to get weighted impact, then optimize for weighted impact rather than raw counts.

**Result:** Critical coverage guarantee with near-optimal total weighted coverage under constraints.