# Diagnostic Workflow Guide

# Granular Instance-Based Diagnostic Workflow

A practical guide to applying the linguistic framework for text quality assessment.

---

## The Paradigm Shift

### OLD: Abstract Categories

- "Paper has weak transitions" = **1 deficiency**
- Vague, unactionable

### NEW: Granular Instances

- "Section 1.2→1.3 needs discourse marker" = **1 instance**
- Specific, locatable, actionable

> **Undercount factor: 6.1×** — 47 abstract deficiencies → 287 concrete instances
> 

---

## 5-Step Workflow

### Step 1: Diagnosis

Scan paper with each of 61 Assessment Criteria measures.

**Example Output**:

- 287 total instances across 21 active measures
- Severity: 89 High (31%), 137 Medium (48%), 61 Low (21%)

### Step 2: Coverage Matrix

Map all instances to applicable measures.

| Measure | Instances | Coverage |
| --- | --- | --- |
| Active Voice | 34 | 12% |
| Terminology Consistency | 28 | 10% |
| Sentence Variety | 24 | 8% |
| Discourse Markers | 23 | 8% |
| Toulmin Warrants | 19 | 7% |

### Step 3: Toolkit Validation

**Question**: Are there instances with NO applicable measure?

**Result**: 0 gaps — toolkit is complete for academic papers.

### Step 4: Optimization (Top 5 Selection)

Given ≤5 measure constraint, select by weighted instance count:

1. 🥇 **Active Voice Ratio** — 34 instances → 62% → 78%
2. 🥈 **Terminology Consistency** — 28 instances → 0.68 → 0.94
3. 🥉 **Sentence Variety** — 24 instances → σ=8.3 → σ=13.5
4. 🏆 **Discourse Markers** — 23 instances → 0.4 → 1.3/100 words
5. 🏆 **Toulmin Warrants** — 19 instances → 52% → 85%

**Total coverage**: 128/287 instances (45%)

### Step 5: Application

Execute atomic operations:

- 34 passive→active transformations
- 28 term standardizations
- 24 sentence restructurings
- 23 discourse marker insertions
- 19 warrant additions

---

## Projected Impact

| Metric | Before | After | Improvement |
| --- | --- | --- | --- |
| Discourse Markers | 0.4/100 | 1.3/100 | **+225%** |
| Active Voice | 62% | 78% | **+16 pts** |
| Terminology | 0.68 | 0.94 | **+0.26** |
| Sentence Variety | σ=8.3 | σ=13.5 | **+5.2** |
| Warrants | 52% | 85% | **+33 pts** |
| **Overall Coherence** | **0.45** | **0.68** | **+0.23** |

---

## Constraint Artifacts

**What 5 measures CAN'T fix** (159 instances / 55%):

- Topic Sentences: 17 instances
- Paragraph Transitions: 15 instances
- Lexical Chains: 14 instances
- Claims-Evidence: 13 instances
- +11 additional measures: 89 instances

> **Reality**: Multi-pass workflow needed for comprehensive improvement
> 

---

## Mode Detection Rules

```python
def detect_mode(paragraph):
    features = extract_quick_features(paragraph)
    
    if features['citations'] >= 1.0 and features['entity_density'] >= 4.0:
        return 'data'
    elif features['discourse_markers'] >= 1.6 and features['entity_density'] <= 3.0:
        return 'theory'
    elif features['technical_terms'] >= 3 and features['formulas'] >= 1:
        return 'method'
    else:
        return 'narrative'
```

---

## Quick Reference: Severity Hierarchy

| Tier | Score Range | Priority |
| --- | --- | --- |
| Critical | 100+ | **Must fix** |
| High | 25-99 | Should fix |
| Medium | 5-24 | Consider fixing |
| Low | 0-4 | Optional |

---

*Diagnostic methodology: Granular Instance-Based | Constraint: ≤5 measures*