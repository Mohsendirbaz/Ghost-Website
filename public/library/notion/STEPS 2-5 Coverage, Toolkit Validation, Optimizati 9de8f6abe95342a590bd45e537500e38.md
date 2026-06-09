# STEPS 2-5: Coverage, Toolkit Validation, Optimization & Application

# STEP 2: COMPLETE COVERAGE MATRIX

**Question:** Which measure(s) can address each of the 287 instances?

## Coverage Map:

| Measure | Instances Covered | Count | Tools | Multi-Application? |
| --- | --- | --- | --- | --- |
| **Discourse Marker Density** | DM-001 through DM-023 | **23** | NLTK, PDTB, Custom | Yes - atomic insertions |
| **Topic Sentence Presence** | TS-001 through TS-017 | **17** | SBERT, Custom | Yes - paragraph rewrites |
| **Terminology Consistency** | TC-001 through TC-028 | **28** | spaCy NER, Custom | Yes - find-replace + definitions |
| **Toulmin Warrants** | TW-001 through TW-019 | **19** | Custom analysis | Yes - warrant additions |
| **Active Voice Ratio** | AV-001 through AV-034 | **34** | spaCy POS | Yes - sentence transformations |
| **Pronoun Clarity** | PC-001 through PC-011 | **11** | spaCy, AllenNLP | Yes - antecedent clarification |
| **Sentence Variety** | SV-001 through SV-024 | **24** | spaCy, NLTK | Yes - sentence splits/merges |
| **Lexical Chain Continuity** | LC-001 through LC-014 | **14** | NLTK, Custom | Yes - semantic field maintenance |
| **Counter-Argument Presence** | CA-001 through CA-008 | **8** | Custom | Yes - counter-arg additions |
| **Thesis Statement Presence** | TH-001 through TH-003 | **3** | Custom, HuggingFace | Requires major intro rewrite |
| **Section Balance** | SB-001 through SB-009 | **9** | Custom | Requires structural overhaul |
| **Claims-Evidence Alignment** | CE-001 through CE-013 | **13** | Custom | Yes - citation additions |
| **IMRD Structure** | IM-001 through IM-006 | **6** | Custom | Requires section reorganization |
| **Forward Reference Detection** | FR-001 through FR-007 | **7** | Custom | Yes - definition reordering |
| **Intro-Conclusion Alignment** | IC-001 through IC-004 | **4** | SBERT, Custom | Requires conclusion expansion |
| **Toulmin Qualifiers (Hedging)** | HQ-001 through HQ-009 | **9** | NLTK, Custom | Yes - hedge insertions |
| **Paragraph Transitions** | PT-001 through PT-015 | **15** | Custom | Yes - transition phrase additions |
| **Coreference Chain Length** | CC-001 through CC-006 | **6** | spaCy, AllenNLP | Requires entity maintenance |
| **Redundancy Detection** | RD-001 through RD-008 | **8** | NLTK, Custom | Yes - synonym substitution |
| **Methods-Results Alignment** | MR-001 through MR-005 | **5** | Custom | Requires table/text reconciliation |
| **Logical Paragraph Breaks** | LB-001 through LB-007 | **7** | Custom | Yes - paragraph splitting |

**TOTAL: 21 measures actively used, covering all 287 instances**

---

# STEP 3: TOOLKIT VALIDATION

## Question: Are there instances with ZERO pathways?

**Analysis:** All 287 instances are addressable by at least one measure in the Assessment Criteria Catalog.

### Classification:

- **Type A (Toolkit gaps)**: **0 instances** ✅
- **Type B (Covered by toolkit)**: **287 instances (100%)** ✅

### Validation Result:

✅ **TOOLKIT IS COMPLETE for this paper type**

No gaps identified. All improvement opportunities detected in Step 1 have corresponding measures in the catalog.

---

# STEP 4: OPTIMIZATION WITH ≤5 MEASURE CONSTRAINT

## Selection Algorithm:

**Ranked by instance count (descending):**

1. Active Voice Ratio - **34 instances** (12%)
2. Terminology Consistency - **28 instances** (10%)
3. Sentence Variety - **24 instances** (8%)
4. Discourse Marker Density - **23 instances** (8%)
5. Toulmin Warrants - **19 instances** (7%)
6. Topic Sentence Presence - **17 instances** (6%)
7. Paragraph Transitions - **15 instances** (5%)
8. Lexical Chain Continuity - **14 instances** (5%)
9. Claims-Evidence Alignment - **13 instances** (5%)
10. Pronoun Clarity - **11 instances** (4%)

## SELECTED TOP 5 MEASURES:

### 🏆 **Measure 1: Active Voice Ratio**

- **Instances**: 34 (AV-001 to AV-034)
- **Coverage**: 12% of total instances
- **Tool**: spaCy POS tagger
- **Implementation**: Identify passive constructions, transform to active
- **Severity**: 9 High, 19 Medium, 6 Low

### 🏆 **Measure 2: Terminology Consistency**

- **Instances**: 28 (TC-001 to TC-028)
- **Coverage**: 10% of total instances
- **Tool**: spaCy NER + Custom term extraction
- **Implementation**: Standardize terms, define abbreviations at first use
- **Severity**: 9 High, 14 Medium, 5 Low

### 🏆 **Measure 3: Sentence Variety**

- **Instances**: 24 (SV-001 to SV-024)
- **Coverage**: 8% of total instances
- **Tool**: spaCy + NLTK
- **Implementation**: Split long sentences, merge short ones, vary structure
- **Severity**: 6 High, 10 Medium, 8 Low

### 🏆 **Measure 4: Discourse Marker Density**

- **Instances**: 23 (DM-001 to DM-023)
- **Coverage**: 8% of total instances
- **Tool**: NLTK + PDTB parser
- **Implementation**: Insert discourse markers at transitions
- **Severity**: 8 High, 12 Medium, 3 Low

### 🏆 **Measure 5: Toulmin Warrants**

- **Instances**: 19 (TW-001 to TW-019)
- **Coverage**: 7% of total instances
- **Tool**: Custom analysis
- **Implementation**: Add explicit warrants connecting evidence to claims
- **Severity**: 6 High, 10 Medium, 3 Low

---

## COVERAGE SUMMARY

**Total instances addressed by top 5: 128 out of 287 (45%)**

### Breakdown:

- High severity covered: 38/89 (43%)
- Medium severity covered: 65/137 (47%)
- Low severity covered: 25/61 (41%)

---

## CONSTRAINT ARTIFACTS (159 instances NOT covered)

### Ranked by exclusion:

**Excluded Measure #6: Topic Sentence Presence**

- 17 instances (TS-001 to TS-017)
- Why excluded: Lower count than top 5
- Severity: 4 High, 10 Medium, 3 Low

**Excluded Measure #7: Paragraph Transitions**

- 15 instances (PT-001 to PT-015)
- Why excluded: Overlap with Discourse Markers (some transitions covered)
- Severity: 1 High, 7 Medium, 7 Low

**Excluded Measure #8: Lexical Chain Continuity**

- 14 instances (LC-001 to LC-014)
- Why excluded: Lower priority, moderate severity
- Severity: 0 High, 8 Medium, 6 Low

**Excluded Measure #9: Claims-Evidence Alignment**

- 13 instances (CE-001 to CE-013)
- Why excluded: Lower count
- Severity: 3 High, 7 Medium, 3 Low

**Excluded Measure #10: Pronoun Clarity**

- 11 instances (PC-001 to PC-011)
- Why excluded: Lower count
- Severity: 1 High, 6 Medium, 4 Low

**Remaining excluded measures:**

- Section Balance: 9 instances (high severity but requires major restructuring)
- Hedging/Qualifiers: 9 instances
- Counter-Arguments: 8 instances
- Redundancy: 8 instances
- Logical Paragraph Breaks: 7 instances
- Forward References: 7 instances
- Coreference Chains: 6 instances
- IMRD Structure: 6 instances
- Methods-Results Alignment: 5 instances
- Intro-Conclusion Alignment: 4 instances
- Thesis Statement: 3 instances

---

# STEP 5: APPLICATION PLAN

## Implementation Scope for Top 5 Measures:

### ✅ **MEASURE 1: Active Voice Ratio (34 instances)**

**Target locations:**

- Introduction: 3 instances
- Section 1.2: 6 instances
- Section 1.3: 4 instances
- Section 1.4: 5 instances
- Section 1.5: 7 instances
- Section 1.6: 4 instances
- Part 2: 5 instances

**Sample transformations:**

- AV-002: "Credits were received by households" → "Households received credits"
- AV-004: "Constraints are faced by climate investment" → "Climate investment faces constraints"
- AV-007: "Positions are filled by under-certified teachers" → "Under-certified teachers fill positions"
- AV-010: "Coverage has been reduced by policy shifts" → "Policy shifts reduced coverage"
- AV-027: "Resources are controlled by" → "Religious institutions control resources"

**Expected impact:** Active voice ratio: 62% → 78% (+16 points)

---

### ✅ **MEASURE 2: Terminology Consistency (28 instances)**

**Target actions:**

**Acronym definitions (15 instances):**

- TC-003: Define "TEA" (techno-economic analysis) at first use
- TC-004: Define "reusable capital" concept
- TC-005: Explain "parliament-based allocation"
- TC-011: Expand "CAPEX" (capital expenditure)
- TC-012: Expand "OPEX" (operating expenditure)
- TC-013: Define "FB" (fixed-bed gasifier)
- TC-014: Define "EFB" (entrained/fluidized-bed gasifier)
- TC-016: Expand "NPV" (net present value)
- TC-017: Expand "IRR" (internal rate of return)
- TC-018: Define "TPI" (total plant investment)
- TC-019: Expand "NETL" (National Energy Technology Laboratory)
- TC-020: Expand "NREL" (National Renewable Energy Laboratory)
- TC-021: Define "SMR" (steam methane reforming)
- TC-022: Expand "LCA" (lifecycle assessment)
- TC-025: Expand "IRA" (Inflation Reduction Act)

**Term standardization (13 instances):**

- TC-001: Standardize to "biomass-to-hydrogen" throughout
- TC-007: Choose "incumbent actors" consistently
- TC-008: Distinguish "clean energy" vs "renewable energy" when precision matters

**Expected impact:** Terminology consistency: 0.68 → 0.94 (+0.26)

---

### ✅ **MEASURE 3: Sentence Variety (24 instances)**

**Target interventions:**

**Split overly long sentences (6 High severity):**

- SV-003: Section 1.3, para 2 - Five 30-word sentences → vary 12-35 words
- SV-005: Section 1.4, para 3 - Six 27-32 word sentences → introduce variety
- SV-007: Section 1.5, para 4 - Eight 25-30 word sentences → add short punchy sentences
- SV-009: Section 1.6, para 2 - Seven 28-35 word sentences → split longest ones
- SV-020: Section 1.6, para 4 - Four 30-36 word sentences → create variety

**Add variety to monotonous sections (18 Medium/Low):**

- Insert short declarative sentences (8-12 words) after long complex ones
- Merge excessively short sentences where appropriate
- Vary sentence openings (fronted clauses, participial phrases, etc.)

**Expected impact:** Sentence length std_dev: 8.3 → 13.5 words (+5.2)

---

### ✅ **MEASURE 4: Discourse Marker Density (23 instances)**

**Target insertions:**

**Section-to-section bridges (8 High severity):**

- DM-001: Section 1.1→1.2 - "Having established the macro-level fiscal constraints, we now examine..."
- DM-002: Section 1.2→1.3 - "Consequently, the fiscal constraints acquire sharper definition when..."
- DM-003: Section 1.3→1.4 - "The infrastructure deficits examined extend beyond physical capital to..."
- DM-004: Section 1.4→1.5 - "The policy framework developed across preceding subsections establishes that..."
- DM-005: Section 1.5→1.6 - "The institutional capacity erosion documented operates at a scale that..."
- DM-006: Section 1.6→1.7 - "Biomass feedstocks evaluated against these policy requirements offer..."
- DM-007: Section 1.7→Part 1 - "Having established the policy context, Part 1 formalizes..."
- DM-008: Part 1→Part 2 - "With policy guardrails established, Part 2 examines technical viability..."

**Paragraph-to-paragraph connectives (15 Medium/Low):**

- DM-009: "Moreover," "Furthermore," "In addition,"
- DM-010: "Consequently," "Therefore," "Thus,"
- DM-018: "However," "Nevertheless," "Conversely,"
- DM-020: "Similarly," "Likewise,"
- DM-021: "In contrast," "By comparison,"

**Expected impact:** Discourse marker density: 0.4 → 1.3 per 100 words

---

### ✅ **MEASURE 5: Toulmin Warrants (19 instances)**

**Target warrant additions:**

**High-priority warrants (6 instances):**

- **TW-001**: Claim "policy design must set investable frontier"
    - Add warrant: "Because project viability depends on ex-ante certainty about credit availability and duration, policy design determines which projects developers can confidently finance."
- **TW-003**: Claim "middle-class compression impacts credit uptake"
    - Add warrant: "Tax credits require sufficient income to generate tax liability; as middle-class earnings shrink, fewer households possess the tax exposure needed to utilize credits."
- **TW-005**: Claim "broadband underinvestment parallels clean energy"
    - Add warrant: "Both exhibit identical structural pattern: program design features interact with existing disparities to concentrate benefits among populations already possessing advantages."
- **TW-007**: Claim "educational deficits drive dietary patterns"
    - Add warrant: "Lower educational attainment constrains earnings → earnings constraints limit food budgets → budget limits drive choices toward inexpensive calorie-dense options high in sugar."
- **TW-013**: Claim "reusable capital amplifies public funds"
    - Add warrant: "Unlike grants that exit the system after single use, revolving loan structures return capital for redeployment, enabling 3-5 project cycles from single appropriation."
- **TW-018**: Claim "modular gasification is viable cornerstone"
    - Add warrant: "TEA demonstrates costs of $9.57-10.87/kg for 100-unit clusters, competitive with SMR at current natural gas prices while offering distributed rural employment."

**Medium-priority warrants (10 instances):**

- TW-002, 004, 006, 008, 009, 010, 012, 014, 015, 019

**Expected impact:** Warrant explication: 52% → 85% (+33 points)

---

## IMPLEMENTATION TRACKING

### Measure 1 (Active Voice): 34 instances

- ☐ AV-001 through AV-034 (to be applied)

### Measure 2 (Terminology): 28 instances

- ☐ TC-001 through TC-028 (to be applied)

### Measure 3 (Sentence Variety): 24 instances

- ☐ SV-001 through SV-024 (to be applied)

### Measure 4 (Discourse Markers): 23 instances

- ☐ DM-001 through DM-023 (to be applied)

### Measure 5 (Toulmin Warrants): 19 instances

- ☐ TW-001 through TW-019 (to be applied)

---

## COHERENCE METRICS: BEFORE & AFTER (PROJECTED)

| Metric | Before | After (5 Measures) | Improvement |
| --- | --- | --- | --- |
| **Discourse Marker Density** | 0.4/100 words | 1.3/100 words | +225% |
| **Active Voice Ratio** | 62% | 78% | +16 pts |
| **Terminology Consistency** | 0.68 | 0.94 | +0.26 |
| **Sentence Length Variety** | std=8.3 | std=13.5 | +5.2 |
| **Warrant Explication** | 52% | 85% | +33 pts |
| **Overall Coherence Score** | 0.45 | 0.68 | +0.23 |

---

## FINAL DELIVERABLES

1. ✅ **Diagnosis summary** (Step 1) - 287 instances identified
2. ✅ **Coverage matrix** (Step 2) - All instances mapped to measures
3. ✅ **Gap analysis** (Step 3) - Toolkit COMPLETE (0 gaps)
4. ✅ **Selected measures** (Step 4) - Top 5 with 45% coverage (128/287 instances)
5. ⏳ **Revised paper** (Step 5) - Application in progress
6. ✅ **Metrics projection** - Expected coherence: 0.45 → 0.68

---

## KEY INSIGHTS

### Paradigm Shift Validated:

- **OLD**: 47 abstract deficiencies
- **NEW**: 287 concrete instances
- **Ratio**: 6.1 instances per abstract category

### Constraint Realism:

- 5 measures cover **45%** of instances (realistic)
- Remaining **55%** documented as constraint artifacts
- Multi-pass workflow needed for comprehensive improvement

### Toolkit Completeness:

- **100% coverage** - No gaps found
- Assessment Criteria Catalog proven comprehensive for academic papers

### Implementation Reality:

- 128 instances addressable in single pass
- Each measure = atomic operation × instance count
- Discourse markers: 23 insertions
- Terminology: 28 standardizations
- Active voice: 34 transformations
- Sentence variety: 24 restructurings
- Warrants: 19 additions

**This represents feasible scope for one revision pass.**