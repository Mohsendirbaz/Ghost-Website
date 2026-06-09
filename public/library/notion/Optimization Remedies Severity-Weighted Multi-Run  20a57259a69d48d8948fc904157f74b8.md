# Optimization Remedies: Severity-Weighted Multi-Run Framework

# Optimization Remedies: Addressing the Trivial-Volume vs Critical-Impact Gap

## The Identified Flaw

**Prompt vulnerability:** Coverage power optimization (`maximize deficiencies fixed per measure`) fails when:

- 10 trivial deficiencies each appear 50 times = 500 total instances
- 1 critical deficiency appears 1 time = 1 instance
- Algorithm selects measures addressing 500 trivial instances, ignoring the 1 critical deficiency

**Real-world analog:** Fixing 50 instances of "missing Oxford comma" while ignoring "conclusions contradict evidence"

---

## Solution Framework: Multi-Dimensional Optimization

### Baseline Parameters (Default Values)

```yaml
default_configuration:
  measures_per_run: 10
  total_runs: 1
  severity_weighting: enabled  # NEW: not in original prompt
  redundancy_policy: minimize  # allow/minimize/prohibit
  optimization_criterion: weighted_impact  # coverage_count/severity_weighted/hybrid
  
severity_weights:
  critical: 100   # Structural integrity issues
  high: 25       # Major coherence problems  
  medium: 5      # Moderate quality issues
  low: 1         # Minor stylistic improvements

reasonable_ranges:
  measures_per_run: [5, 15]      # Practical constraint
  total_runs: [1, 5]             # Iterative refinement
  severity_weights:
    critical: [50, 200]          # Domain-dependent
    high: [10, 50]
    medium: [2, 10]
    low: [0.5, 2]
```

---

## Remedy 1: Severity-Weighted Scoring

### Modified Optimization Function

**Original (flawed):**

```python
optimization_score = Σ(deficiencies_fixed_by_measure)
```

**Corrected:**

```python
optimization_score = Σ(deficiency_count × severity_weight)

Example:
  Measure A: fixes 50 low-severity issues
    = 50 × 1 = 50 points
  
  Measure B: fixes 1 critical issue  
    = 1 × 100 = 100 points
  
  Result: Measure B selected despite lower count
```

### Implementation

```python
def compute_weighted_impact(measure, deficiency_map, severity_map):
    """
    Compute severity-weighted impact score for a measure.
    
    Args:
        measure: Linguistic measure from catalog
        deficiency_map: {deficiency_id: count}
        severity_map: {deficiency_id: severity_weight}
    
    Returns:
        weighted_score: float
    """
    total_score = 0
    
    for deficiency_id in measure.addresses:
        count = deficiency_map[deficiency_id]
        severity = severity_map[deficiency_id]
        total_score += count × severity
    
    return total_score

# Ranking
measures_ranked = sorted(
    all_measures,
    key=lambda m: compute_weighted_impact(m, deficiency_map, severity_map),
    reverse=True
)

top_10 = measures_ranked[:10]
```

---

## Remedy 2: Multi-Run Iterative Framework

### Strategy

Instead of single 10-measure run, use multiple runs targeting different optimization criteria:

**Run 1: Critical-First (Measures 1-10)**

- Optimization: `maximize severity_weight` (ignore count)
- Ensures all critical deficiencies addressed
- May leave trivial high-count deficiencies

**Run 2: Coverage-Maximization (Measures 11-20)**

- Optimization: `maximize deficiency_count × medium_severity`
- Fills remaining high/medium severity gaps
- Addresses volume issues

**Run 3: Completion Pass (Measures 21-25)**

- Optimization: `maximize uncovered_deficiencies`
- Mops up remaining low-severity issues
- Optional based on remaining budget

### Multi-Run Configuration

```python
run_configurations = [
    {
        "run_id": 1,
        "measures": 10,
        "criterion": "severity_only",
        "weights": {"critical": 1, "high": 0.5, "medium": 0, "low": 0},
        "constraint": "select_at_least_one_per_category"
    },
    {
        "run_id": 2,
        "measures": 10,
        "criterion": "weighted_coverage",
        "weights": {"critical": 100, "high": 25, "medium": 5, "low": 1},
        "constraint": "exclude_measures_from_run_1"
    },
    {
        "run_id": 3,
        "measures": 5,
        "criterion": "remaining_coverage",
        "weights": {"critical": 0, "high": 0, "medium": 10, "low": 5},
        "constraint": "only_if_coverage_below_90_percent"
    }
]
```

### Stopping Criteria

```python
def should_continue_runs(current_run, total_coverage, critical_coverage):
    """
    Determine if additional runs are needed.
    """
    if critical_coverage < 1.0:
        return True  # Continue until all critical addressed
    
    if current_run < 2:
        return True  # Minimum 2 runs
    
    if total_coverage < 0.85:
        return True  # Continue until 85% total coverage
    
    return False
```

---

## Remedy 3: Redundancy Control Knob

### Problem Statement

Some deficiencies can be addressed by multiple measures:

- Deficiency D1: addressable by Measures A, B, C
- Should we apply all 3 (redundancy) or just 1 (efficiency)?

### Control Policies

**Policy 1: Prohibit Redundancy (Efficiency)**

```python
redundancy_policy = "prohibit"

# Once deficiency is addressed by selected measure,
# remove it from consideration for other measures

for measure in ranked_measures:
    if measure already in selected_set:
        continue
    
    # Calculate impact only on UNCOVERED deficiencies
    uncovered_deficiencies = [
        d for d in measure.addresses 
        if d not in already_covered
    ]
    
    impact = compute_weighted_impact(
        measure, 
        uncovered_deficiencies,
        severity_map
    )
    
    if impact > threshold:
        selected_set.add(measure)
        already_covered.update(uncovered_deficiencies)
```

**Policy 2: Minimize Redundancy (Balanced)**

```python
redundancy_policy = "minimize"

# Apply redundancy penalty but allow for critical deficiencies

redundancy_penalty = 0.5  # 50% penalty for redundant coverage

for measure in ranked_measures:
    covered = [d for d in measure.addresses if d in already_covered]
    uncovered = [d for d in measure.addresses if d not in already_covered]
    
    # Penalize redundant coverage
    impact = (
        compute_weighted_impact(measure, uncovered, severity_map)
        + redundancy_penalty × compute_weighted_impact(measure, covered, severity_map)
    )
    
    # Still select if impact justifies redundancy
    if impact > threshold:
        selected_set.add(measure)
```

**Policy 3: Allow Redundancy (Quality)**

```python
redundancy_policy = "allow"

# For critical deficiencies, apply multiple measures for robustness

critical_deficiencies = [d for d in all_deficiencies if severity[d] == "critical"]

for deficiency in critical_deficiencies:
    applicable_measures = [
        m for m in all_measures 
        if deficiency in m.addresses
    ]
    
    # Select TOP 2-3 measures for each critical deficiency
    selected_set.update(applicable_measures[:2])
```

### Tracking Redundancy

```python
redundancy_report = {
    "deficiency_id": "S1",
    "severity": "critical",
    "description": "Missing thesis statement",
    "addressed_by": [
        {"measure": "Thesis Statement Presence", "run": 1},
        {"measure": "Toulmin Claim Presence", "run": 2},
        {"measure": "Topic Sentence Presence", "run": 2}
    ],
    "redundancy_count": 3,
    "justification": "Critical structural deficiency warrants multi-measure validation"
}
```

---

## Remedy 4: Hybrid Optimization Strategies

### Strategy Matrix

| Strategy | Optimization Criterion | Use Case | Strengths | Weaknesses |
| --- | --- | --- | --- | --- |
| **Pure Coverage** | Maximize deficiency count | High-volume trivial fixes | Simple, intuitive | Ignores severity |
| **Pure Severity** | Maximize severity weight | Critical-only focus | Addresses worst problems | Leaves volume untouched |
| **Weighted Hybrid** | count × severity weight | Balanced approach | Optimal for most cases | Requires weight tuning |
| **Tiered Sequential** | Critical→High→Medium→Low | Guaranteed critical coverage | Methodical | May be inefficient |
| **Pareto Frontier** | Multi-objective optimization | Research/comprehensive | Optimal trade-offs | Computationally expensive |

### Implementation: Weighted Hybrid (Recommended Default)

```python
def hybrid_optimization(
    measures,
    deficiency_map,
    severity_map,
    alpha=0.7,  # Severity weight
    beta=0.3    # Coverage weight
):
    """
    Balanced optimization considering both severity and coverage.
    
    Args:
        alpha: Weight for severity (0-1)
        beta: Weight for coverage (0-1), typically 1-alpha
    
    Returns:
        ranked_measures: List sorted by hybrid score
    """
    scores = []
    
    for measure in measures:
        # Severity component
        severity_score = sum(
            deficiency_map[d] × severity_map[d]
            for d in measure.addresses
        )
        
        # Coverage component  
        coverage_score = sum(
            deficiency_map[d]
            for d in measure.addresses
        )
        
        # Normalize to [0,1]
        severity_norm = severity_score / max_severity_score
        coverage_norm = coverage_score / max_coverage_score
        
        # Hybrid score
        hybrid_score = alpha × severity_norm + beta × coverage_norm
        
        scores.append((measure, hybrid_score))
    
    return sorted(scores, key=lambda x: x[1], reverse=True)
```

### Tuning Alpha/Beta

```python
use_case_profiles = {
    "critical_focus": {"alpha": 0.9, "beta": 0.1},
    "balanced": {"alpha": 0.7, "beta": 0.3},
    "high_volume": {"alpha": 0.4, "beta": 0.6},
    "completion": {"alpha": 0.2, "beta": 0.8}
}

# Select profile based on current state
if critical_coverage < 1.0:
    profile = use_case_profiles["critical_focus"]
elif total_coverage < 0.5:
    profile = use_case_profiles["balanced"]
else:
    profile = use_case_profiles["completion"]
```

---

## Remedy 5: Category-Aware Allocation

### Problem

All 10 selected measures might come from one category (e.g., all Lexical), ignoring Structural/Cohesion/Semantic deficiencies.

### Solution: Minimum Representation Constraint

```python
category_constraints = {
    "structural": {"min": 2, "max": 4},
    "cohesion": {"min": 2, "max": 4},
    "semantic": {"min": 2, "max": 4},
    "lexical": {"min": 1, "max": 3}
}

def constrained_selection(
    ranked_measures,
    k=10,
    category_constraints=None
):
    """
    Select top k measures while respecting category constraints.
    """
    selected = []
    category_counts = defaultdict(int)
    
    # Phase 1: Ensure minimums
    for category, constraints in category_constraints.items():
        category_measures = [
            m for m in ranked_measures 
            if m.category == category
        ][:constraints["min"]]
        
        selected.extend(category_measures)
        category_counts[category] += len(category_measures)
    
    # Phase 2: Fill remaining slots by rank
    remaining_slots = k - len(selected)
    
    for measure in ranked_measures:
        if measure in selected:
            continue
        
        if remaining_slots == 0:
            break
        
        category = measure.category
        if category_counts[category] >= category_constraints[category]["max"]:
            continue
        
        selected.append(measure)
        category_counts[category] += 1
        remaining_slots -= 1
    
    return selected
```

---

## Remedy 6: Algorithmic Finish-the-Job Workflow

### Multi-Pass Completion Algorithm

```python
class IterativeOptimizer:
    def __init__(
        self,
        deficiencies,
        measures,
        severity_map,
        measures_per_run=10,
        max_runs=5,
        target_coverage=0.95
    ):
        self.deficiencies = deficiencies
        self.measures = measures
        self.severity_map = severity_map
        self.measures_per_run = measures_per_run
        self.max_runs = max_runs
        [self.target](http://self.target)_coverage = target_coverage
        
        self.selected_measures = []
        self.covered_deficiencies = set()
        [self.run](http://self.run)_history = []
    
    def run_optimization(self):
        """
        Execute multi-pass optimization until completion criteria met.
        """
        for run_num in range(1, self.max_runs + 1):
            # Check stopping criteria
            coverage = self.compute_coverage()
            critical_coverage = self.compute_critical_coverage()
            
            if coverage >= [self.target](http://self.target)_coverage and critical_coverage == 1.0:
                print(f"Target achieved after {run_num-1} runs")
                break
            
            # Select measures for this run
            run_config = self.get_run_config(run_num, coverage, critical_coverage)
            selected = [self.select](http://self.select)_measures_for_run(run_config)
            
            # Update state
            self.selected_measures.extend(selected)
            self.update_covered_deficiencies(selected)
            
            # Record run
            [self.run](http://self.run)_history.append({
                "run": run_num,
                "measures": [[m.name](http://m.name) for m in selected],
                "coverage_before": coverage,
                "coverage_after": self.compute_coverage(),
                "critical_before": critical_coverage,
                "critical_after": self.compute_critical_coverage()
            })
    
    def get_run_config(self, run_num, coverage, critical_coverage):
        """
        Adaptive configuration based on current state.
        """
        if critical_coverage < 1.0:
            return {
                "criterion": "critical_only",
                "weights": {"critical": 1, "high": 0, "medium": 0, "low": 0}
            }
        elif coverage < 0.50:
            return {
                "criterion": "weighted_hybrid",
                "weights": {"critical": 100, "high": 25, "medium": 5, "low": 1}
            }
        elif coverage < 0.85:
            return {
                "criterion": "remaining_coverage",
                "weights": {"critical": 0, "high": 50, "medium": 10, "low": 2}
            }
        else:
            return {
                "criterion": "completion",
                "weights": {"critical": 0, "high": 0, "medium": 20, "low": 5}
            }
    
    def compute_coverage(self):
        """
        Weighted coverage considering severity.
        """
        total_weight = sum(
            self.severity_map[[d.id](http://d.id)] 
            for d in self.deficiencies
        )
        
        covered_weight = sum(
            self.severity_map[[d.id](http://d.id)]
            for d in self.covered_deficiencies
        )
        
        return covered_weight / total_weight
    
    def compute_critical_coverage(self):
        """
        Binary: 1.0 if all critical covered, else < 1.0.
        """
        critical_deficiencies = [
            d for d in self.deficiencies 
            if self.severity_map[[d.id](http://d.id)] >= 100
        ]
        
        critical_covered = [
            d for d in critical_deficiencies
            if d in self.covered_deficiencies
        ]
        
        if len(critical_deficiencies) == 0:
            return 1.0
        
        return len(critical_covered) / len(critical_deficiencies)
```

---

## Complete Optimization Workflow

### Phase 1: Diagnosis and Severity Assignment

```python
# Step 1: Exhaustive diagnosis (unchanged)
deficiencies = diagnose_abstract(abstract_text)

# Step 2: Assign severity (NEW)
for deficiency in deficiencies:
    deficiency.severity = assign_severity(
        deficiency,
        severity_guidelines={
            "critical": [
                "contradicts evidence",
                "missing thesis",
                "incoherent structure"
            ],
            "high": [
                "weak transitions",
                "ambiguous references",
                "inconsistent terminology"
            ],
            "medium": [
                "passive voice",
                "sentence variety",
                "paragraph length"
            ],
            "low": [
                "oxford comma",
                "em-dash vs en-dash",
                "serial comma consistency"
            ]
        }
    )
```

### Phase 2: Multi-Pathway Mapping (unchanged)

```python
pathway_map = map_all_pathways(
    deficiencies,
    linguistic_toolkit_6_layers
)
```

### Phase 3: Severity-Weighted Coverage Matrix

```python
# Build weighted coverage matrix
coverage_matrix = build_weighted_coverage_matrix(
    deficiencies,
    measures,
    severity_map
)

# Example output:
#                           S1(crit) S2(high) S3(med) L1(low)
# RST Relation Patterns      100      0        5       1     = 106
# Terminology Consistency    0        25       5       5     = 35
# Oxford Comma Fixer         0        0        0       50    = 50
```

### Phase 4: Optimization with Policy Selection

```python
optimizer = IterativeOptimizer(
    deficiencies=deficiencies,
    measures=all_measures,
    severity_map=severity_map,
    measures_per_run=10,
    max_runs=3,
    target_coverage=0.95,
    redundancy_policy="minimize",
    category_constraints=category_constraints
)

[optimizer.run](http://optimizer.run)_optimization()

# Output
print(f"Total measures selected: {len(optimizer.selected_measures)}")
print(f"Final coverage: {optimizer.compute_coverage():.1%}")
print(f"Critical coverage: {optimizer.compute_critical_coverage():.1%}")
print(f"Runs executed: {len([optimizer.run](http://optimizer.run)_history)}")
```

### Phase 5: Gap Classification (enhanced)

```python
for deficiency in deficiencies:
    if deficiency not in optimizer.covered_deficiencies:
        # Determine why uncovered
        if has_no_pathway(deficiency):
            gap_type = "A: Toolkit gap"
        elif deficiency.severity == "low" and coverage > 0.90:
            gap_type = "B: Constraint artifact (acceptable)"
        elif deficiency.severity >= 50:
            gap_type = "C: CRITICAL MISS (optimization failure)"
        else:
            gap_type = "B: Constraint artifact"
        
        gap_report.add({
            "deficiency": [deficiency.id](http://deficiency.id),
            "severity": deficiency.severity,
            "gap_type": gap_type,
            "available_pathways": len(find_pathways(deficiency)),
            "recommendation": get_recommendation(gap_type, deficiency)
        })
```

---

## Validation: Outlier Scenario Test

### Test Case Setup

```python
test_deficiencies = [
    # 10 trivial deficiencies, 50 instances each
    *[Deficiency(id=f"L{i}", severity=1, count=50) for i in range(1, 11)],
    
    # 1 critical deficiency, 1 instance  
    Deficiency(id="S1", severity=100, count=1)
]

measures = [
    Measure(id="Trivial_Fixer", addresses=[f"L{i}" for i in range(1, 11)]),
    Measure(id="Critical_Fixer", addresses=["S1"])
]
```

### Original Prompt Result (WRONG)

```python
# Pure coverage optimization
scores = {
    "Trivial_Fixer": sum([50] * 10) = 500,
    "Critical_Fixer": 1
}

# Selection: Trivial_Fixer chosen, Critical_Fixer ignored
# FAILURE: Critical deficiency unaddressed
```

### Corrected Framework Result (CORRECT)

```python
# Severity-weighted optimization
scores = {
    "Trivial_Fixer": sum([50 × 1] * 10) = 500,
    "Critical_Fixer": 1 × 100 = 100
}

# With multi-run critical-first:
run_1_config = {"weights": {"critical": 1, "others": 0}}
run_1_selection = ["Critical_Fixer"]  # Selected in first run

run_2_config = {"weights": {"critical": 0, "high": 25, "medium": 5, "low": 1}}
run_2_selection = ["Trivial_Fixer"]  # Selected in second run

# SUCCESS: Critical deficiency addressed in Run 1, 
#          trivial deficiencies addressed in Run 2
```

---

## Summary: Revised Prompt Addition

### Insert After "Step 4: Optimization" Section

```markdown
### Step 4.1: Severity Assignment (CRITICAL NEW STEP)

Before optimization, assign severity weights to each deficiency:

Severity Scale:
- Critical (100): Structural integrity, logical coherence, evidence-conclusion alignment
- High (25): Major coherence issues, ambiguous references, weak transitions  
- Medium (5): Style improvements, sentence variety, voice consistency
- Low (1): Minor formatting, punctuation preferences, stylistic polish

Document severity assignments in diagnosis output.

### Step 4.2: Multi-Dimensional Optimization

Optimization criterion: **Severity-weighted hybrid score**

Formula: `score = Σ(deficiency_count × severity_weight)`

Constraints:
- All critical deficiencies MUST be addressed (hard constraint)
- Each category (structural/cohesion/semantic/lexical) must have ≥2 measures
- Minimize redundancy (same deficiency addressed by <2 measures unless critical)

### Step 4.3: Multi-Run Framework (if needed)

If 10 measures insufficient for 95% weighted coverage:
- Run 1 (measures 1-10): Critical + high-severity optimization
- Run 2 (measures 11-20): Remaining high/medium coverage
- Run 3 (measures 21-25): Completion pass if needed

Document: Which run each measure belongs to, coverage after each run.
```

---

## Final Remedies Checklist

✅ **Remedy 1:** Severity-weighted scoring prevents trivial-volume dominance

✅ **Remedy 2:** Multi-run framework guarantees critical coverage

✅ **Remedy 3:** Redundancy control knob balances efficiency vs quality

✅ **Remedy 4:** Hybrid strategies adapt to different optimization goals

✅ **Remedy 5:** Category-aware allocation prevents single-category dominance

✅ **Remedy 6:** Algorithmic finish-the-job ensures completion

**Result:** Framework now robust against outlier scenarios where high-frequency trivial issues would otherwise dominate low-frequency critical issues.