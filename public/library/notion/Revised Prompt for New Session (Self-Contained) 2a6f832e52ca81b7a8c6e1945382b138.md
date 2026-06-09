# Revised Prompt for New Session (Self-Contained)

# Revised Prompt (Standalone Version)

---

## Prompt Text

```
Apply linguistic frameworks to improve the abstract in [document link], with a strict constraint of utilizing ≤10 measures.

IMPORTANT WORKFLOW:

Step 1: EXHAUSTIVE INDEPENDENT DIAGNOSIS (unconstrained)
Without looking at the linguistic framework catalog yet, identify ALL shortcomings and deficiencies in the abstract. Do NOT artificially limit findings to fit the 10-measure constraint. Report:
- Total deficiency count
- Category distribution (structural/cohesion/semantic/lexical)
- Severity ratings (high/medium/low)

Step 2: COMPLETE PATHWAY MAPPING
Now examine the Linguistic Frameworks page and ALL 6 subpages:
1. Coherence Assessment Procedures
2. Assessment Criteria Catalog (database)
3. Automated Evaluation Tools
4. Genre-Specific Assessment Protocols
5. Rubric-Based Scoring Protocols
6. Quality Assurance Checklists

For EACH deficiency from Step 1, document:
- Which measure(s) from the Catalog can address it
- Which additional layers (Rubric/Genre/QA/Automated) provide rules, calibration, or workflows
- Whether the measure can fix multiple deficiencies (multi-application)
- Total coverage power for each measure

Output a coverage matrix: deficiencies × measures, showing which measures address which deficiencies.

Step 3: TOOLKIT VALIDATION
Identify any deficiencies with ZERO pathways across all 6 layers → these are toolkit gaps.
Classify all findings:
- Type A: Toolkit gap (no measure exists in any layer)
- Type B: Covered by toolkit (at least 1 pathway exists)

This serves the first purpose: validating toolkit completeness on a need-based basis.

Step 4: OPTIMIZATION WITH EXPLICIT PREFERENCES
Given the ≤10 measure constraint, optimize selection by:
- Preference: Multi-application strategy (maximize deficiencies fixed per measure)
- Rank measures by coverage power
- Select top 10 that maximize total deficiencies addressed

For any deficiencies NOT covered by selected 10:
- Classify as "Constraint artifact" (toolkit has a pathway, but excluded due to limit)
- Document which measure could address it and why it was excluded

Step 5: APPLICATION
Apply the selected 10 measures to improve the abstract.
This serves the second purpose: applying coherency and cohesiveness measures to the academic article.

Output:
1. Diagnosis summary (Step 1 findings)
2. Coverage matrix (Step 2)
3. Gap analysis report (Step 3) - specifically note if toolkit is complete or has gaps
4. Selected measures with justification (Step 4)
5. Revised abstract in LaTeX format (Step 5)
6. Coherence metrics before/after

CRITICAL: Do NOT work backward from the 10-measure constraint. Diagnosis must be exhaustive and independent. The constraint applies only at Step 4 optimization, not Step 1 diagnosis.
```

---

## Why This Revision Works

### Preserves Original Intent:

- ✅ "without reaching into linguistic framework first" → Step 1 diagnosis is independent
- ✅ "identify shortcomings" → Step 1 exhaustive diagnosis
- ✅ "then I wanna see if we have THE MOST SUITABLE ASSESSMENT TOOL" → Step 2-3 pathway mapping and toolkit validation
- ✅ "two purposes" → explicitly labeled as first purpose (Step 3) and second purpose (Step 5)
- ✅ "need/demand basis" → deficiencies drive tool selection, not vice versa
- ✅ "10 measures" → constraint applied at Step 4, not Step 1

### Adds Immunity Mechanisms:

- **Against backward reasoning:** "Do NOT work backward from the 10-measure constraint"
- **Against catalog-centric view:** "examine ALL 6 subpages"
- **Against 1-to-1 mapping:** "multi-application strategy (maximize deficiencies fixed per measure)"
- **Against false gaps:** "Classify as Type A (toolkit gap) vs Type B (covered)"
- **Against hidden optimization:** "Rank measures by coverage power"

### Self-Contained Instructions:

- Lists all 6 layers explicitly
- Defines coverage matrix
- Explains gap classification taxonomy
- States optimization criterion clearly
- Specifies output format

### Validation Checkpoints:

The revised prompt forces the LLM to answer these questions explicitly:

1. **Step 1 output:** "Total deficiency count = ?"
    - If 10-15: likely backward reasoning
    - If 20-30: genuine exhaustive diagnosis ✓
2. **Step 2 output:** "Checked layers: [list all 6]"
    - If 1 layer (Catalog only): catalog-centric assumption
    - If 6 layers: correct architecture ✓
3. **Step 3 output:** "Toolkit gaps found: X"
    - Explicit gap count prevents ambiguity
4. **Step 4 output:** "Constraint artifacts: Y deficiencies excluded"
    - Distinguishes toolkit completeness from constraint limitation

---

## Comparison to Original

| Element | Original Prompt | Revised Prompt |
| --- | --- | --- |
| **Diagnosis scope** | "identify shortcomings" | "EXHAUSTIVE... do NOT limit to 10" |
| **Framework reference** | "without reaching into linguistic framework first" | "Step 1 independent, Step 2 examine all 6 layers" |
| **Toolkit validation** | "see if we have THE MOST SUITABLE ASSESSMENT TOOL" | "Step 3: document pathways, classify gaps" |
| **Constraint timing** | Implicit | "Constraint applies at Step 4, not Step 1" |
| **Two purposes** | Mentioned but not structured | Explicitly labeled in Steps 3 and 5 |
| **Output format** | Not specified | 6 deliverables listed |
| **Immunity safeguards** | None | 5 explicit guards added |

---

## Usage Instructions for New Session

**Paste this prompt into a new session with:**

1. The Climate Policy Design paper (or link to it)
2. Access to the Linguistic Frameworks page [Linguistic Frameworks](Linguistic%20Frameworks%202a3f832e52ca806ba576d30cd8f4e2a5.md)

**Expected timeline:**

- Step 1: 5-10 minutes (exhaustive diagnosis)
- Step 2: 15-20 minutes (pathway mapping across 6 layers)
- Step 3: 2-3 minutes (gap classification)
- Step 4: 5 minutes (optimization)
- Step 5: 10-15 minutes (application and LaTeX generation)

**Total: ~40-50 minutes for complete workflow**

---

## Minimal Version (If Character Limit Is Issue)

```
Improve the abstract using ≤10 linguistic measures.

Workflow:
1. Exhaustive diagnosis (ignore the 10 limit) → report total deficiency count
2. Check ALL 6 Linguistic Framework layers → document which measures address each deficiency
3. Find orphan deficiencies (0 pathways) → toolkit gaps
4. Optimize: select top 10 by coverage power → classify excluded deficiencies as constraint artifacts
5. Apply measures → revised LaTeX abstract

Output: diagnosis, coverage matrix, gap report, selected measures, revised abstract, metrics.

Critical: Diagnosis first, constraint second. Multi-application preferred.
```

---

## Alternative: If User Wants More Control

Add preference specification section:

```
[After Step 3, before Step 4:]

Optimization Preferences:
- Measure employment: [multi-application / 1-to-1 / no preference]
- Coverage goal: [maximize total / prioritize high-severity / balance categories]
- Overlap handling: [allow redundancy / minimize overlap]
- Goal priority: [toolkit validation / paper improvement / simultaneous]

[Default: multi-application, maximize total, minimize overlap, simultaneous]
```

This allows customization while maintaining the workflow structure.

---

## Expected Output Structure

The LLM should produce:

**1. Step 1 Report:**

```json
{
  "total_deficiencies": 26,
  "categories": {
    "structural": 7,
    "cohesion": 5,
    "semantic": 6,
    "lexical": 8
  },
  "deficiency_list": [...]
}
```

**2. Step 2 Coverage Matrix:**

```
                          S1 S2 S3 C1 C2 Sem1 L1 L2 ...
RST Relation Patterns     X  .  X  .  .  X    .  .  ...
Terminology Consistency   .  .  .  .  X  .    X  X  ...
...

Coverage power:
  RST Relation Patterns: 6
  Terminology Consistency: 5
  ...
```

**3. Step 3 Gap Report:**

```
Toolkit Status: COMPLETE
  Type A (toolkit gaps): 0
  Type B (covered): 26

Conclusion: All identified deficiencies have at least one pathway.
```

**4. Step 4 Selection:**

```
Selected 10 measures (coverage = 25/26):
1. RST Relation Patterns (6 deficiencies)
2. Terminology Consistency (5 deficiencies)
...

Constraint artifacts (excluded):
- L6: Vague quantifiers → Quantitative Claim Validation exists but ranked #11
```

**5. Step 5 Output:**

```latex
\begin{abstract}
% Revised abstract
\end{abstract}
```

**6. Metrics:**

```
Coherence score: 0.47 → 0.82 (74% improvement)
```

---

## Final Notes

**This revised prompt:**

- ✅ Is self-contained (no reference to our discussion)
- ✅ Maintains your original intent and phrasing
- ✅ Forces correct workflow (diagnosis → mapping → optimization)
- ✅ Prevents the 3 assumption errors I made
- ✅ Distinguishes toolkit gaps from constraint artifacts
- ✅ Documents both purposes explicitly
- ✅ Can be copied directly into a new session

**Key improvement over original:**

Original prompt was vulnerable to backward reasoning (finding 12 deficiencies to fit 10+2 structure).

Revised prompt forces exhaustive diagnosis first, then optimization.

The phrase "Do NOT work backward from the 10-measure constraint" is the critical safeguard.