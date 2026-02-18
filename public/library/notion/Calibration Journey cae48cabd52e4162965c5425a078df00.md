# Calibration Journey

# Framework Calibration: From Universal to Manuscript-Specific

Iterative calibration against ground truth sections to derive manuscript-appropriate thresholds.

---

## Methodology: Train-Test Separation

> ⚠️ **Critical**: Calibrating on all GT sections then testing on same data = train-test contamination. Proper validation requires held-out test sets.
> 

### Corrected Approach

| Iteration | Training Set | Test Set |
| --- | --- | --- |
| 1 | GT1 (Preface + 1.1) | GT2, GT3, GT4 |
| 2 | GT1 + GT2 | GT3, GT4 |
| 3 | GT1 + GT2 + GT3 | GT4 |
| 4 | All GTs | Non-GT manuscript |

---

## Iteration Summary

### Iteration 1: Preface + Section 1.1

```json
{
  "adjustments": 20,
  "breakdown": {
    "threshold_expansions": 5,
    "weight_reductions": 6,
    "exception_additions": 4,
    "template_additions": 5
  },
  "deficiency_reduction": "301 → 268 (11%)",
  "validation": "GT1: 0 deficiencies"
}
```

### Iteration 2: + Section 1.2 (Data-heavy)

```json
{
  "new_adjustments": 14,
  "cumulative": 34,
  "new_capabilities": [
    "Context-aware evaluation (data vs narrative mode)",
    "Data citation format templates",
    "Numeric style consistency rules"
  ],
  "deficiency_reduction": "268 → 245 (18.6% total)",
  "validation": "GT1: 0, GT2: 0"
}
```

### Iteration 3: + Section 1.3 (Theory/Synthesis)

- Learned source-synthesis patterns
- Multi-source integration thresholds
- Theory paragraph mode detection

### Iteration 4: + Section 1.4 (Methodology)

- Formal notation handling
- Definition density calibration
- Technical term consistency

---

## Test Results: Generalization Performance

### Framework₁ on Held-Out GT2-4

| Section | Expected | Actual | Status |
| --- | --- | --- | --- |
| GT2 (Data) | 0 flags | 2 flags | ⚠️ Minor violations |
| GT3 (Theory) | 0 flags | 2 flags | ⚠️ Minor violations |
| GT4 (Method) | 0 flags | 4 flags | ⚠️ Minor violations |

**All violations were LOW severity** (margins < 5% of bounds)

### Framework₂ on Held-Out GT3-4

| Metric | Iteration 1 | Iteration 2 | Improvement |
| --- | --- | --- | --- |
| Test error rate | 52% | 18% | **65% reduction** |
| Flag count | 17 | 6 | 11 fewer false positives |

---

## Key Parameter Evolution

### Discourse Marker Density

- **Universal**: [1.5, 2.0] per 100 words
- **Calibrated**: Part of coherence budget; can go as low as 1.2 if compensated

### Entity Continuity

- **Universal**: ≥ 0.60
- **Calibrated**: ≥ 0.42 (empirical floor)

### Evidence/Claims Ratio

- **Universal**: ≥ 2.0
- **Calibrated**: Mode-dependent (0.0 to 3.0)

### Cognitive Load

- **Universal**: Implicit
- **Calibrated**: Explicit bound, mode-dependent (95-125)

---

## Final Framework₁ State

| Category | Count | Change |
| --- | --- | --- |
| Compound Measures | 3 | +3 NEW |
| Adjusted Measures | 3 | Thresholds modified |
| Deprecated Measures | 4 | Absorbed into compounds |
| Unchanged Measures | 55 | No modification |
| **Total Active** | **61** | Same total |

---

## Lessons Learned

1. **Compensatory mechanisms matter**: Individual thresholds miss the forest for the trees
2. **Mode detection is essential**: Data, theory, method, and narrative paragraphs have different standards
3. **Empirical floors > universal thresholds**: Ground truth reveals actual acceptable minimums
4. **Train-test separation is critical**: Without it, 0 flags is meaningless

---

*Total calibration time: ~30 hours across 4 iterations*