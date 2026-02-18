# Revised Prompt: Assumption-Immune Linguistic Framework Application

# Revised Prompt Structure

## Original Prompt (Vulnerable to Assumptions)

> "apply linguistic frameworks to improve it. with strict constraint of only utilizing 10 measures. without reaching into linguistic framework first identify shortcomings of the paper. then I wanna see if we have THE MOST SUITABLE ASSESSMENT TOOL to fix it."
> 

**Vulnerabilities exposed:**

- No instruction to separate diagnosis from constraint
- No specification of measure-to-deficiency mapping strategy
- No requirement to document cross-layer pathways
- No transparency requirement for optimization criteria
- No explicit instruction to check toolkit completeness

---

## Revised Prompt (Assumption-Immune)

### Phase 1: Unconstrained Diagnosis

```
Perform exhaustive diagnosis of the abstract WITHOUT applying the 10-measure constraint.

Output format:
{
  "structural_deficiencies": [
    {"id": "S1", "description": "...", "severity": "high|medium|low"},
    {"id": "S2", "description": "...", "severity": "high|medium|low"},
    ...
  ],
  "cohesion_deficiencies": [...],
  "semantic_deficiencies": [...],
  "lexical_deficiencies": [...],
  "total_count": N,
  "category_distribution": {"structural": X, "cohesion": Y, ...}
}

Do NOT artificially balance categories.
Do NOT limit findings to fit any constraint.
Document EVERY identifiable deficiency.
```

---

### Phase 2: Multi-Pathway Mapping

```
For EACH deficiency identified in Phase 1, map ALL available toolkit pathways that could address it.

For each deficiency, document:
1. Primary pathway (most direct measure from Catalog)
2. Secondary pathways (alternative measures from Catalog)
3. Cross-layer pathways (measures requiring integration across 2+ layers)
4. Multi-application potential (can this measure fix other deficiencies?)
5. Layer composition (which of the 6 layers does each pathway use?)

Output format:
{
  "deficiency_id": "S1",
  "pathways": [
    {
      "type": "primary",
      "measure": "RST Relation Patterns",
      "source_layer": "Coherence Assessment",
      "catalog_entry": "notion-URL",
      "implementation": "discopy RST parser",
      "fixes_also": ["S3", "S6", "Sem2"],
      "cross_layer_dependencies": null
    },
    {
      "type": "cross-layer",
      "measure_combination": ["Toulmin Warrants", "SOLO Taxonomy", "Limitation Rule"],
      "layers_used": ["Catalog", "Rubric-Based", "Genre-Specific"],
      "workflow": "QA Checklist",
      "fixes_also": [],
      "cross_layer_dependencies": [
        "Toulmin provides base measure",
        "SOLO provides calibration",
        "Genre provides application rule"
      ]
    }
  ]
}

Document pathways for ALL deficiencies before proceeding.
```

---

### Phase 3: Coverage Matrix Construction

```
Construct a bipartite graph:
- Left nodes: All deficiencies (from Phase 1)
- Right nodes: All unique measures (from Phase 2 pathways)
- Edges: Measure M addresses deficiency D
- Edge weights: effectiveness score

Compute:
1. Measure coverage power: |{deficiencies addressed by measure M}|
2. Deficiency pathway redundancy: |{measures that address deficiency D}|
3. Cross-layer pathway count: |{pathways requiring >1 layer}|
4. Multi-application measures: {M : coverage_power(M) > 1}

Output:
- Coverage matrix (deficiencies × measures)
- Measure ranking by coverage power
- Deficiencies addressable by single measure vs requiring measure combinations
- Orphan deficiencies (coverage = 0) ← THESE ARE TOOLKIT GAPS
```

---

### Phase 4: Optimization with Explicit Preferences

```
Given the constraint: select ≤10 measures

You must document the following optimization preferences EXPLICITLY:

Preference Set A: Measure Employment Strategy
□ 1-to-1 mapping (each measure fixes exactly 1 deficiency)
□ Multi-application preferred (maximize deficiencies per measure)
□ No preference (optimize by other criteria)

Preference Set B: Coverage Goals
□ Maximize total deficiencies fixed
□ Maximize high-severity deficiencies fixed
□ Balance across all 4 categories
□ Prioritize specific category: [specify]

Preference Set C: Overlap Handling
□ Allow multiple measures on single deficiency (redundancy)
□ Minimize overlap (1 measure per deficiency when possible)
□ No preference

Preference Set D: Cross-Layer Complexity
□ Prefer single-layer measures (Catalog only)
□ Prefer cross-layer pathways (demonstrates integration)
□ No preference (optimize by coverage)

Preference Set E: Toolkit Gap Identification
□ Primary goal (identify gaps even if paper improvement suffers)
□ Secondary goal (optimize paper fix, note gaps if found)
□ Simultaneous (equal weight to both goals)

Based on the preferences selected above, solve the optimization problem:

maximize: Σ (coverage_power(M) × selected(M))
subject to:
  Σ selected(M) ≤ 10
  [additional constraints based on preferences]

Output:
1. Selected measures with justification
2. Deficiencies NOT covered (if any)
3. Redundancy report (deficiencies covered by >1 selected measure)
4. Optimization score
5. Alternative top-10 sets (if multiple optimal solutions exist)
```

---

### Phase 5: Gap Analysis

```
For deficiencies NOT covered by selected measures:

Classify each as:
A. Toolkit gap (no pathway exists in any of 6 layers)
B. Constraint artifact (pathway exists but excluded by 10-measure limit)
C. Preference artifact (pathway exists but excluded by preference choices)

For Type A (toolkit gaps):
  Document:
  - Deficiency description
  - Why existing measures fail to address it
  - Recommended new measure specification
  - Which layer(s) it should belong to

For Type B & C:
  Document:
  - Which existing pathway could address it
  - Why it was excluded from top-10
  - What constraint/preference change would include it

Output gap classification report.
```

---

### Phase 6: Revision Implementation

```
Using the selected measures from Phase 4:

1. Apply each measure to its mapped deficiencies
2. Document before/after for each fix
3. Compute coherence metrics (as in original work)
4. Generate revised LaTeX abstract
5. Cross-validate: check if any unintended deficiencies were introduced

Output:
- Revised abstract (LaTeX)
- Measure-by-measure improvement log
- Coherence metric comparison table
- Validation report
```

---

## Default Preferences (If User Doesn't Specify)

**Use these ONLY if user provides no preference guidance:**

```yaml
default_preferences:
  measure_employment: multi-application  # Maximize efficiency
  coverage_goal: maximize_total         # Fix most deficiencies
  overlap_handling: minimize            # Avoid redundancy
  cross_layer: no_preference            # Coverage drives choice
  gap_identification: simultaneous      # Equal weight to both goals
```

**CRITICAL: When using defaults, explicitly state:**

"Applying default preferences: [list]. User can override by specifying alternatives."

---

## Explicit Assumption Documentation

```
Before beginning Phase 1, state:

"I will operate under the following assumptions unless corrected:

1. Toolkit Architecture:
   - Assumption: 6-layer integrated system (not Catalog-only)
   - Validation: Will reference all 6 layers during pathway mapping

2. Measure-Deficiency Mapping:
   - Assumption: Multi-application allowed (1 measure can fix N deficiencies)
   - Validation: Will document coverage power for each measure

3. Pathway Completeness:
   - Assumption: Must check cross-layer pathways, not just Catalog
   - Validation: Will document layer composition for each pathway

4. Gap Definition:
   - Assumption: Gap = deficiency with 0 pathways across all 6 layers
   - Validation: Will classify uncovered deficiencies as gap vs constraint artifact

5. Optimization Criteria:
   - Assumption: [state default preferences from above]
   - Validation: Will compute optimization score and show alternatives

Please confirm or correct these assumptions before I proceed."
```

---

## Worked Example with Revised Prompt

### User Input:

```
"Apply linguistic frameworks to improve the Climate Policy abstract.
Constraint: ≤10 measures.
Preferences: 
  - Multi-application strategy
  - Prioritize high-severity deficiencies
  - Simultaneous gap identification and paper improvement"
```

### Phase 1 Output:

```json
{
  "structural": 7,
  "cohesion": 5,
  "semantic": 6,
  "lexical": 8,
  "total": 26,
  "deficiencies": [...]
}
```

### Phase 2 Output:

```json
{
  "S1": {
    "pathways": [
      {"measure": "Topic Sentence Presence", "coverage": 1},
      {"measure": "RST Relation Patterns", "coverage": 6}
    ]
  },
  ...
}
```

### Phase 3 Output:

```
Coverage Matrix:
  RST Relation Patterns: fixes [S1, S3, S6, Sem1, Sem4, Sem5] = 6
  Terminology Consistency: fixes [L2, L5, L7, L8, Coh3] = 5
  ...

Orphan deficiencies: NONE (all have ≥1 pathway)
Toolkit gaps: 0
```

### Phase 4 Output:

```
Optimal selection (coverage = 25/26):
1. RST Relation Patterns (6 fixes)
2. Terminology Consistency (5 fixes)
3. Claims-Evidence Alignment (5 fixes)
...

Uncovered: L6 (vague quantifiers) - Constraint artifact
  Available pathway: Quantitative Claim Validation [Catalog]
  Excluded because: rank #11 by coverage power
```

### Phase 5 Output:

```
Gap Analysis:
Type A (toolkit gaps): 0
Type B (constraint artifacts): 1 [L6]
Type C (preference artifacts): 0

Conclusion: Toolkit is complete. 
Uncovered deficiency is due to 10-measure limit, not missing measure.
```

### Phase 6 Output:

```latex
% Revised abstract with 25/26 deficiencies addressed
\begin{abstract}
...
\end{abstract}
```

---

## Comparison: Original vs Revised Prompt

| Aspect | Original Prompt | Revised Prompt |
| --- | --- | --- |
| **Diagnosis scope** | Implicit (led to 4×3 symmetry) | Explicit unconstrained (found 26) |
| **Pathway mapping** | Not required | Required for ALL deficiencies |
| **Coverage matrix** | Not computed | Explicit bipartite graph |
| **Optimization transparency** | Hidden | Explicit preferences + scoring |
| **Gap classification** | Ambiguous | 3-way: toolkit/constraint/preference |
| **Cross-layer integration** | Not specified | Required documentation |
| **Assumption documentation** | None | Explicit validation before start |
| **Result format** | Freeform | Structured JSON + LaTeX |

---

## Immunity Guarantees

### Against Catalog-Centric Assumption:

✅ Phase 2 requires documenting layer composition

✅ Cross-layer pathways explicitly tracked

✅ Phase 5 checks all 6 layers for gaps

### Against 1-to-1 Mapping Bias:

✅ Phase 3 computes coverage power

✅ Phase 4 offers multi-application as explicit preference

✅ Overlap handling documented in Phase 4

### Against Backward Reasoning:

✅ Phase 1 diagnosis precedes constraint application

✅ Coverage matrix built before optimization

✅ Alternative solutions documented

### Against Hidden Optimization:

✅ Preferences explicitly declared

✅ Optimization score computed

✅ Justification required for each selection

### Against False Gap Identification:

✅ Phase 5 classifies uncovered deficiencies

✅ Distinguishes toolkit gap from constraint artifact

✅ Documents excluded pathways

---

## Minimal Viable Prompt

If user wants shortest version that still provides immunity:

```
Improve the abstract using ≤10 linguistic measures.

Required workflow:
1. Exhaustive diagnosis (no constraint) → report total deficiency count
2. Map ALL pathways for each deficiency → document coverage matrix
3. Optimize measure selection → state preferences explicitly
4. Classify uncovered deficiencies → toolkit gap vs constraint artifact
5. Apply measures → generate revised abstract

Default preferences: multi-application, maximize coverage, simultaneous goals.
Document assumptions before starting.
```

---

## Validation Questions for LLM

Before starting work, LLM should answer:

1. "How many deficiencies did I find in unconstrained diagnosis?"
    - If answer = 10-15: likely backward reasoning from constraint
    - If answer = 20-30: likely genuine exhaustive diagnosis
2. "How many toolkit layers am I checking for pathways?"
    - If answer = 1 (Catalog): catalog-centric assumption
    - If answer = 6: correct architecture understanding
3. "What is my optimization criterion?"
    - If answer = "balance categories": symmetry bias
    - If answer = "maximize coverage power": efficiency optimization
4. "How do I define a toolkit gap?"
    - If answer = "not in Catalog": catalog-centric
    - If answer = "0 pathways across all 6 layers": correct definition
5. "Can one measure fix multiple deficiencies?"
    - If answer = "depends on constraint": backward reasoning
    - If answer = "yes, documented in coverage matrix": correct understanding

---

## Summary

The revised prompt provides immunity by:

1. **Separating diagnosis from constraint** (Phase 1 before Phase 4)
2. **Requiring complete pathway documentation** (Phase 2)
3. **Making optimization transparent** (Phase 4 preferences)
4. **Classifying gaps rigorously** (Phase 5 taxonomy)
5. **Documenting assumptions explicitly** (validation before start)
6. **Providing structured outputs** (JSON schemas prevent ambiguity)

User can adjust preferences without changing workflow structure.

LLM cannot hide assumptions because workflow forces their exposure.

Gap vs constraint artifact distinction prevents false toolkit gap claims.