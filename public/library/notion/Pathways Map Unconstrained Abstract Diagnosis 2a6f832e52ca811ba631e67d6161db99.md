# Pathways Map: Unconstrained Abstract Diagnosis

# Pathways Map: Root Cause Analysis

## Ground Truth: Unconstrained Diagnosis

### Category 1: Structural Deficiencies (7 issues, not 3)

1. **Missing problem-statement framing** → Opens with method before motivation
2. **Weak inter-sentence connectivity** → Sentence 2→3 lacks bridging
3. **Unclear logical progression** → Four claims appear flat, no hierarchy
4. **No thesis statement** → Abstract lacks explicit contribution claim
5. **Missing section signposting** → No "First/Second/Finally" structure
6. **Implicit causal structure** → "while" suggests temporal, not causal
7. **Weak conclusion framing** → No circular return to opening problem

**Optimal measure pathway (1 measure fixes 4 issues):**

```
RST Relation Patterns (1 measure)
  ├─ Fixes #1 (adds Purpose relation at opening)
  ├─ Fixes #3 (explicit Elaboration→Evidence→Result hierarchy) 
  ├─ Fixes #6 (replaces implicit "while" with explicit Condition)
  └─ Fixes #7 (adds Result relation at conclusion)
```

**Additional measures needed:**

- Discourse Connective Count → fixes #2, #5
- Thesis Statement Presence → fixes #4

---

### Category 2: Cohesion Deficiencies (5 issues, not 3)

1. **Absent discourse markers** → No "however/therefore/specifically"
2. **Ambiguous reference chains** → "The analysis" unclear antecedent
3. **Undefined technical anchors** → "investable frontier" never defined
4. **Pronoun ambiguity** → "while" pronoun reference unclear
5. **Weak paragraph bridging** → Policy→TEA shift abrupt

**Optimal measure pathway (1 measure fixes 3 issues):**

```
Pronoun Clarity + Coreference Chain Length (1 measure)
  ├─ Fixes #2 (resolves "The analysis" → explicit referent)
  ├─ Fixes #4 (clarifies pronoun antecedents)
  └─ Fixes #5 (establishes entity continuity across transitions)
```

**Additional measures needed:**

- Discourse Connective Count → fixes #1 (already counted in Category 1)
- Terminology Consistency → fixes #3

---

### Category 3: Semantic Deficiencies (6 issues, not 3)

1. **Vague causal relationships** → "while" obscures causal logic
2. **Flat information hierarchy** → All claims equal weight
3. **Weak conclusion framing** → "demonstrates that" lacks epistemic force
4. **Implicit relationships** → Policy-economics connection unclear
5. **Missing claim prioritization** → No "Specifically/Most importantly"
6. **Ambiguous scope** → "The analysis" could mean TEA, policy, or both

**Optimal measure pathway (1 measure fixes 4 issues):**

```
Claims-Evidence Alignment + Toulmin Structure (1 measure)
  ├─ Fixes #2 (hierarchical Claim→Grounds→Warrant)
  ├─ Fixes #3 (strengthens epistemic framing)
  ├─ Fixes #4 (explicit warrants connect policy→economics)
  └─ Fixes #5 (Toulmin hierarchy signals primary claims)
```

**Already covered by other pathways:**

- #1 → RST Relation Patterns (Category 1)
- #6 → Pronoun Clarity (Category 2)

---

### Category 4: Lexical Deficiencies (8 issues, not 3)

1. **Noun-phrase density** → 16-word noun cluster
2. **Inconsistent terminology** → pathways/networks/systems undefined
3. **Passive framing** → "can amplify" weakens action
4. **Hedging mismatch** → "can" vs evidence strength
5. **Synonym variation** → Same concept, different terms
6. **Vague quantifiers** → No specific numbers in original
7. **Missing definitions** → "reusable capital" undefined
8. **Jargon density** → Multiple technical terms front-loaded

**Optimal measure pathway (1 measure fixes 5 issues):**

```
Terminology Consistency (1 measure)
  ├─ Fixes #2 (standardizes pathway/network/system)
  ├─ Fixes #5 (eliminates synonym variation)
  ├─ Fixes #7 (flags undefined terms for definition)
  ├─ Fixes #8 (measures technical term density)
  └─ Fixes #1 (indirectly: consistent terms reduce phrase density)
```

**Additional measures needed:**

- Active Voice Ratio → fixes #3
- Toulmin Grounds/Evidence → fixes #4 (evidence strength calibrates hedging)

---

## Total Ground Truth: 26 Deficiencies (not 12)

**My artificial 4×3 structure hid 14 additional deficiencies.**

---

## Optimal Measure Selection (Priority: Fix Paper)

### Constraint: Use ≤10 measures

**Optimization Strategy:** Maximize deficiencies fixed per measure

**Ranked by Multi-Application Power:**

| Rank | Measure | Deficiencies Fixed | Category Coverage |
| --- | --- | --- | --- |
| 1 | **RST Relation Patterns** | 6 | Structural (4), Semantic (2) |
| 2 | **Terminology Consistency** | 5 | Lexical (5) |
| 3 | **Claims-Evidence Alignment** | 5 | Semantic (4), Lexical (1) |
| 4 | **Pronoun Clarity** | 4 | Cohesion (3), Semantic (1) |
| 5 | **Discourse Connective Count** | 3 | Structural (2), Cohesion (1) |
| 6 | **Active Voice Ratio** | 2 | Lexical (2) |
| 7 | **Thesis Statement Presence** | 1 | Structural (1) |
| 8 | **Intro-Conclusion Alignment** | 1 | Structural (1) |
| 9 | **Lexical Chain Continuity** | 1 | Cohesion (1) |
| 10 | **Topic Sentence Presence** | 1 | Structural (1) |

**Total deficiencies covered: 29 instances across 26 unique deficiencies**

*(Overlap occurs when one deficiency is addressed by multiple measures)*

---

## Why I Claimed "3 Gaps" — Root Cause

### Gap 1: "Keyword-Abstract Alignment"

**What I said:** "Toolkit lacks this measure"

**Ground truth pathways:**

```
Primary pathway:
  Terminology Consistency (already selected in my top 10)
    └─ Application: keywords = term set to check for consistency

Secondary pathway:
  Lexical Chain Continuity (already selected in my top 10)
    └─ Application: keywords should form chains in abstract

Tertiary pathway (from Genre-Specific):
  Summary-Body Coherence
    └─ Extract key points → verify keyword coverage

Quaternary pathway (from Catalog):
  Topic Consistency (LDA)
    └─ Keywords = expected topics → measure divergence
```

**Actual gap: ZERO**

**Root cause of my error:**

- I treated "keyword alignment" as NEW problem requiring NEW measure
- Failed to see Terminology Consistency applies to keyword set
- Operated under "1 measure = 1 deficiency type" assumption

---

### Gap 2: "Abstract-Body Traceability"

**What I said:** "Toolkit lacks this measure"

**Ground truth pathways:**

```
Primary pathway (from Catalog):
  Methods-Results Alignment
    └─ Already identified correctly

Secondary pathway (from Catalog):
  Claims-Evidence Alignment (already in my top 10)
    └─ Application: abstract claims → backward reference to body

Tertiary pathway (from Catalog):
  Cross-Reference Validity
    └─ Abstract citations to tables/figures → verify existence

Quaternary pathway (from Genre-Specific):
  Section Coherence (IMRD)
    └─ Abstract = compressed IMRD → check mapping

Quinary pathway (from Automated Tools):
  e-rater Organization features
    └─ Thesis statement → logical paragraph correspondence
```

**Actual gap: ZERO**

**Root cause of my error:**

- I correctly identified Methods-Results Alignment
- But then claimed it was "missing" from my 10-measure set
- Failed to see Claims-Evidence Alignment (already selected) ALSO addresses this
- Confused "not in my initial 10" with "not in toolkit"

---

### Gap 3: "Hedging Appropriateness"

**What I said:** "Toolkit lacks Evidence-Claim Modality Alignment"

**Ground truth pathways:**

```
Primary pathway (from Catalog):
  Toulmin Grounds/Evidence
    └─ "Evidence quality rating" → calibrates modal strength

Secondary pathway (from Catalog):
  Toulmin Warrants
    └─ Warrant strength determines epistemic certainty

Tertiary pathway (from Rubric-Based):
  SOLO Taxonomy Level
    └─ Evidence integration level → modal appropriateness
    └─ Extended Abstract = "will", Multi-structural = "may"

Quaternary pathway (from Genre-Specific Academic):
  Limitation Discussion Presence
    └─ No limitations → MUST hedge
    └─ Limitations acknowledged → definitive modals allowed

Quinary pathway (from QA Checklist):
  Toulmin Structure: "Qualifiers used appropriately"
    └─ Explicit workflow for modal calibration

Senary pathway (from Automated Tools):
  BARTScore
    └─ P(modal | evidence) probabilistic validation
```

**Actual gap: ZERO**

**Root cause of my error:**

- I recognized Toulmin Grounds/Warrants
- But didn't see SOLO Taxonomy (Rubric-Based) provides the CALIBRATION
- Didn't see Genre-Specific provides the RULE (limitations → hedging)
- Didn't see QA Checklist provides the WORKFLOW
- Concluded "toolkit lacks this" when I actually lacked the **cross-layer integration**

---

## The Real Root Cause

### My Operating Assumption (Incorrect):

```
Toolkit = Assessment Criteria Catalog
         └─ If measure not in Catalog → "gap exists"
```

### Actual Toolkit Architecture:

```
Toolkit = 6-Layer System
  ├─ Layer 1: Coherence Assessment (theory)
  ├─ Layer 2: Catalog (atomic measures)
  ├─ Layer 3: Automated Tools (implementation)
  ├─ Layer 4: Genre-Specific (application rules)
  ├─ Layer 5: Rubric-Based (calibration)
  └─ Layer 6: QA Checklists (workflows)

Pathway = Cross-layer integration
  Example: Modal calibration
    = Toulmin (Catalog)
    + SOLO (Rubric)
    + Limitations rule (Genre)
    + Qualifiers workflow (QA)
    + BARTScore (Automated)
```

---

## Corrected Pathways Map

### For "Keyword-Abstract Alignment" (0 gaps):

```mermaid
Terminology Consistency [Catalog]
  ↓
Lexical Chain Continuity [Catalog]  
  ↓
Topic Consistency (LDA) [Catalog]
  ↓
Summary-Body Coherence [Genre-Specific]
  ↓
Multi-application pathway: 4 measures, 0 gaps
```

### For "Abstract-Body Traceability" (0 gaps):

```mermaid
Claims-Evidence Alignment [Catalog] (already in my 10)
  ↓
Methods-Results Alignment [Catalog]
  ↓  
Cross-Reference Validity [Catalog]
  ↓
Section Coherence IMRD [Genre-Specific]
  ↓
e-rater Organization [Automated Tools]
  ↓
Multi-application pathway: 5 measures, 0 gaps
```

### For "Modal Calibration" (0 gaps):

```mermaid
Toulmin Grounds [Catalog]
  +
Toulmin Warrants [Catalog]
  ↓
SOLO Taxonomy [Rubric-Based] ← CALIBRATION
  ↓
Limitation Discussion [Genre-Specific] ← RULE
  ↓
Qualifiers workflow [QA Checklist] ← PROCEDURE
  ↓
BARTScore [Automated Tools] ← VALIDATION
  ↓
Cross-layer integration: 6 components, 0 gaps
```

---

## Conclusion: Why I Said "3 Gaps"

**Not because toolkit lacked measures.**

**Because I operated under false assumptions:**

1. **Catalog-centric view:** Toolkit = Catalog only
2. **Single-application bias:** 1 measure = 1 deficiency
3. **Layer blindness:** Didn't integrate Rubric/Genre/QA/Automated layers
4. **Backward reasoning:** Artificially constrained diagnosis to fit 10-measure limit

**The "gaps" were gaps in MY reasoning, not the toolkit.**

---

## Optimal Pathway (Priority: Fix Paper)

If I prioritize **fixing the paper** over **checking toolkit completeness**:

**Top 6 High-Leverage Measures** (fix 25/26 deficiencies):

1. **RST Relation Patterns** → 6 fixes
2. **Terminology Consistency** → 5 fixes
3. **Claims-Evidence Alignment** → 5 fixes
4. **Pronoun Clarity** → 4 fixes
5. **Discourse Connective Count** → 3 fixes
6. **Active Voice Ratio** → 2 fixes

**Remaining 4 measures** for edge cases:

1. Thesis Statement Presence
2. Intro-Conclusion Alignment
3. Lexical Chain Continuity
4. Topic Sentence Presence

**This is a different selection order than what I initially chose** because I was optimizing for "1 measure per category" (symmetry) rather than "maximum fixes per measure" (efficiency).

---

## Lesson Learned

**The 10-measure constraint should drive PRIORITIZATION, not DIAGNOSIS.**

**Correct workflow:**

1. Exhaustive diagnosis (unconstrained) → 26 deficiencies
2. Map all available pathways (multi-application)
3. Rank measures by coverage power
4. Select top 10 by optimization criterion
5. Validate cross-layer integration

**My actual workflow:**

1. Constrained diagnosis → artificially found 12 deficiencies (4×3)
2. Selected 10 measures (1-to-1 mapping)
3. Found 2 "leftover" deficiencies → called them "gaps"
4. Missed 14 additional deficiencies
5. Missed cross-layer integration

**The toolkit was complete. My methodology was incomplete.**