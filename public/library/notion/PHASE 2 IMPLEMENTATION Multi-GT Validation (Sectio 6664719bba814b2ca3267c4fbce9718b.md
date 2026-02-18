# PHASE 2 IMPLEMENTATION: Multi-GT Validation (Sections 1.2-1.4)

# PHASE 2 IMPLEMENTATION: Multi-GT Validation

**Building on**: [PHASE 1 IMPLEMENTATION: Invariant Extraction from Preface](PHASE%201%20IMPLEMENTATION%20Invariant%20Extraction%20from%20P%20d0721e6a91804ae9b8d48efb83d169ea.md)

**Objective**: Test the 6 invariants discovered from Preface (GT1) against Sections 1.2, 1.3, 1.4 to determine which hold manuscript-wide vs. which are section-specific.

**Status**: Phase 1 Complete ✅ | Phase 2 Ready for Full Text Access

---

## Phase 2 Overview: Cross-GT Validation Strategy

### The Scientific Method Applied to Invariants

**Phase 1 Output** (from Preface only):

- I1: Coherence Budget constraint [1.77, 2.49]
- I2b: Context-dependent evidence ratios (data/method/concept)
- I3: Cognitive load bound ≤ 107
- I4: Controlled sentence variety (mean ~24, high variance)
- I5: Entity continuity floor ≥ 0.42
- I6: Narrative progression pattern

**Phase 2 Question**: Do these invariants **generalize** to GT2-4, or are they Preface-specific?

**Validation Criterion**:

- **Strong Invariant**: Holds across ≥3 GTs with ≤10% violations
- **Moderate Invariant**: Holds across ≥2 GTs with ≤15% violations
- **Weak/Section-Specific**: Holds only in 1 GT or >15% violations

---

## Section 1.2: "Europe's Unwanted" (GT2)

### Text Characteristics (From Search Results)

**Word Count**: ~900 words (from search excerpt)

**Paragraph Count**: ~9 paragraphs

**Dominant Mode**: **Data-heavy** (quantitative demographic evidence)

**Sample Paragraphs**:

**Para 1** (Data paragraph):

> "The Transportation Act of 1718 formalized what had been informal practice for decades: Britain would solve its criminal justice crisis by shipping convicts to America. The numbers are staggering. Conservative estimates place transported convicts at 50,000 between 1718 and 1775. More aggressive calculations reach 120,000. Even the lower figure represents a significant proportion of early American population—in a colonial America of perhaps 2 million by 1775, convict transportation had contributed between 2.5% and 6% of the total population directly, with multigenerational descendants multiplying that impact."
> 

**Para 2** (Evidence detail):

> "These were not white-collar criminals or political prisoners romanticized in retrospect. Court records from the Old Bailey reveal the spectrum: thieves, pickpockets, burglars, forgers, prostitutes, violent offenders. The typical transported convict was young (late teens to early twenties), male, urban, and skilled in little beyond survival by illicit means. They arrived in America shackled, sold at dockside auctions to the highest bidder, and bound to seven or fourteen years of servitude depending on offense severity."
> 

**Para 5** (Comparative evidence):

> "The colonial sex ratio tells its own story. In early Virginia, men outnumbered women six to one. This was not the demographic profile of families seeking better lives; it was the profile of desperate single men, many bound to servitude, many criminals, few with prospects of returning home."
> 

### Expected Feature Profile for Section 1.2

**Predicted Differences from Preface**:

1. **Higher Entity Density** (more names, dates, numbers)
    - Preface: 2.8-4.1 entities/sentence
    - Section 1.2: Likely 3.5-5.0 entities/sentence (data-heavy)
2. **Higher Citation Density**
    - Preface: 0.67 citations/para (excluding intro/conclusion)
    - Section 1.2: Likely 1.2-1.8 citations/para (historical claims)
3. **Higher Evidence-to-Claims Ratio** (per I2b data paragraph standard)
    - Preface data paragraphs: 4:1 ratio
    - Section 1.2: Likely 3:1 to 5:1 ratio consistently
4. **Potentially Lower Discourse Marker Density**
    - Data presentation may use fewer explicit markers
    - Numbers and evidence create implicit coherence

### Validation Tests to Run on Section 1.2

**Test 1: Coherence Budget (I1)**

```python
# Extract features from each paragraph in Section 1.2
for para in section_1_2_paragraphs:
    budget = (
        0.51 * discourse_marker_density(para) +
        0.45 * entity_continuity(para) +
        0.38 * entity_density(para) +
        0.35 * evidence_strength(para)
    )
    
    # Test against Preface bounds
    if 1.77 <= budget <= 2.49:
        result = "PASS"
    elif 1.60 <= budget <= 2.70:  # Expanded 15% margin
        result = "MARGINAL PASS"
    else:
        result = "FAIL"
        violations.append((para_id, budget))

# Validation outcome
violation_rate = len(violations) / total_paragraphs

if violation_rate <= 0.10:
    I1_status = "✅ STRONG - Generalizes to GT2"
elif violation_rate <= 0.15:
    I1_status = "⚠️ MODERATE - May need adjustment"
else:
    I1_status = "❌ WEAK - Section-specific invariant"
```

**Expected Outcome for I1 on Section 1.2**:

**Hypothesis**: Coherence budget will PASS but with **different component weights**.

- **Entity density** will be HIGHER (more numbers, names, dates)
- **Discourse markers** may be LOWER (data creates implicit structure)
- **Evidence strength** will be HIGHER (citations, statistics)

**Predicted Adjusted Budget**:

```
GT2_budget = (
    0.40 * DiscMark +    # Weight DOWN (less needed with data)
    0.40 * EntityCont +   # Weight stable
    0.45 * EntityDens +   # Weight UP (compensates for fewer markers)
    0.45 * Evidence       # Weight UP (data section has more)
)
```

If this adjusted budget maintains low CV across GT2 paragraphs, we've discovered that **the CONCEPT of a coherence budget generalizes, but the WEIGHTS are mode-dependent**.

---

**Test 2: Context-Dependent Evidence Standards (I2b)**

**Section 1.2 Prediction**: Should be **predominantly data paragraphs**, so evidence/claims ratio should be ≥3.0 for most paragraphs.

```python
for para in section_1_2_paragraphs:
    context = classify_paragraph_mode(para)
    ratio = evidence_items / claims
    
    if context == 'data':
        threshold = 3.0
        expected = "High ratio (≥3.0) for data paragraphs"
    
    if ratio >= threshold:
        result = "PASS"
    else:
        result = "FAIL"
        violations.append((para_id, context, ratio, threshold))
```

**Expected Outcome**: **HIGH PASS RATE** (≥80% of paragraphs should meet data paragraph standard)

If Section 1.2 violates the data paragraph evidence standard, this would indicate one of:

a) The standard is too strict

b) The manuscript is inconsistent in its evidentiary rigor

c) The paragraph classification is wrong

---

**Test 3: Cognitive Load Bound (I3)**

```python
for para in section_1_2_paragraphs:
    load = mean_sentence_length * entity_density
    
    if load <= 107:
        result = "PASS"
    elif load <= 120:  # 12% expanded margin
        result = "MARGINAL PASS"
    else:
        result = "FAIL"
        violations.append((para_id, load))
```

**Expected Outcome**: **MARGINAL PASS with expanded bounds**

Section 1.2 has HIGHER entity density (more numbers, names). If sentence length stays ~24 words, cognitive load will be:

- Preface: 24 × 3.08 = 73.9
- Section 1.2: 24 × 4.5 = **108** ← Just over bound!

This suggests **either**:

a) Sentence length will DROP to compensate (to ~23 words)

b) The bound should expand to ~120 to accommodate data sections

c) The multiplicative model needs refinement

---

**Test 4: Entity Continuity Floor (I5)**

```python
# Extract all primary entities from Section 1.2
entities = extract_primary_entities(section_1_2)

for entity in entities:
    continuity = calculate_continuity(entity, section_1_2)
    
    if continuity >= 0.42:
        result = "PASS"
    elif continuity >= 0.35:  # 17% expanded margin
        result = "MARGINAL PASS"
    else:
        result = "FAIL - Entity thread broken"
```

**Expected Outcome**: **PASS**

Section 1.2 should maintain:

- "Convicts" / "criminals" (primary entity)
- "Britain" / "British colonies" (secondary entity)
- "Virginia" / "Maryland" (geographic entities)
- "Transportation Act" (policy entity)

All should exceed 0.42 continuity threshold.

---

## Section 1.3: "Genealogical Inheritance Hypothesis" (GT3)

**Expected Mode**: **Theory/conceptual** (explaining mechanisms)

**Predicted Feature Profile**:

- **Lower entity density** than Section 1.2 (fewer concrete examples)
- **Higher discourse marker density** (theory requires explicit connections)
- **Moderate evidence/claims ratio** (conceptual paragraphs per I2b)
- **More hedging** (theoretical claims less certain)

**Critical Tests**:

1. **I2b Evidence Standards**: Should see **conceptual paragraph mode** dominate, with ratio ≥0.0 (claims can be unsupported)
2. **I1 Coherence Budget**: Should see **discourse markers weighted UP** to compensate for lower entity density

---

## Section 1.4: "Void Fraction Framework" (GT4)

**Expected Mode**: **Methodological** (introducing formal framework)

**Predicted Feature Profile**:

- **High technical density** (formulas, definitions)
- **Very high citation density** (methodology requires sourcing)
- **Balanced evidence/claims** (method paragraph mode, ~0.8 ratio per I2b)
- **High lexical precision** (technical terms defined)

**Critical Tests**:

1. **I2b Evidence Standards**: Should see **method paragraph mode**, with ratio ≥0.8
2. **I3 Cognitive Load**: May VIOLATE bound due to technical complexity requiring both high entity density AND longer sentences

---

## Phase 2 Synthesis: What We Expect to Learn

### Scenario A: Strong Cross-GT Invariants (Best Case)

**If I1, I2b, I3 all pass with ≤10% violations across GT2-4:**

✅ We have discovered **manuscript-wide structural invariants**

✅ These can be implemented as compound measures in the framework

✅ Threshold adjustments are **constrained by these relationships**

✅ Proceed directly to Phase 3 (framework integration)

---

### Scenario B: Mode-Dependent Weight Adjustments (Expected Case)

**If invariants pass but with DIFFERENT WEIGHTS per section:**

⚠️ The CONCEPT generalizes, but WEIGHTS are mode-dependent

⚠️ Need to implement **mode detection** first

⚠️ Then apply mode-specific weights:

```python
def evaluate_coherence_budget(paragraph):
    mode = detect_mode(paragraph)  # Returns: 'narrative', 'data', 'concept', 'method'
    
    if mode == 'narrative':
        weights = {'DiscMark': 0.51, 'EntityCont': 0.45, 'Entities': 0.38, 'Evidence': 0.35}
        bounds = [1.77, 2.49]
    elif mode == 'data':
        weights = {'DiscMark': 0.40, 'EntityCont': 0.40, 'Entities': 0.45, 'Evidence': 0.45}
        bounds = [2.20, 3.10]  # Higher overall due to density
    elif mode == 'concept':
        weights = {'DiscMark': 0.60, 'EntityCont': 0.45, 'Entities': 0.25, 'Evidence': 0.20}
        bounds = [1.50, 2.20]  # Lower overall, markers critical
    elif mode == 'method':
        weights = {'DiscMark': 0.45, 'EntityCont': 0.35, 'Entities': 0.50, 'Evidence': 0.40}
        bounds = [2.00, 2.80]  # Balanced but technical
    
    budget = sum(weights[feat] * paragraph[feat] for feat in weights)
    
    return bounds[0] <= budget <= bounds[1]
```

This is MORE SOPHISTICATED than Phase 1, but preserves the core insight: **coherence emerges from weighted combination, not individual thresholds**.

---

### Scenario C: Section-Specific Invariants (Weak Case)

**If invariants fail (>15% violations) on GT2-4:**

❌ Invariants are **Preface-specific**, not manuscript-wide

❌ Cannot use them to constrain threshold adjustments globally

❌ Must either:

- Find NEW invariants that DO generalize, or
- Accept that threshold adjustment will be more ad hoc

---

## Implementation Roadmap for Phase 2

### Step 1: Obtain Full Text of GT2-4 ✅

**Status**: Search results provided Section 1.2 text. Need full Section 1.3 and 1.4.

**Action Required**:

- Extract full text from [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)
- Currently showing unknown blocks - may need to view sub-pages or use alternative source

---

### Step 2: Extract Features from GT2-4

```python
# For each section
for section in [section_1_2, section_1_3, section_1_4]:
    paragraphs = extract_paragraphs(section)
    
    for para in paragraphs:
        features = {
            'sentence_length': calculate_mean_sentence_length(para),
            'sentence_std': calculate_sentence_length_std(para),
            'entity_density': count_entities(para) / sentence_count(para),
            'discourse_marker_density': count_discourse_markers(para) / word_count(para) * 100,
            'citations': count_citations(para),
            'claims': count_claims(para),
            'evidence': count_evidence_items(para),
            'entity_continuity': calculate_entity_continuity(para, section)
        }
        
        section_features.append(features)
```

---

### Step 3: Test Each Invariant

```python
invariant_results = {
    'I1_coherence_budget': test_invariant_I1(all_ground_truths),
    'I2b_evidence_standards': test_invariant_I2b(all_ground_truths),
    'I3_cognitive_load': test_invariant_I3(all_ground_truths),
    'I4_sentence_variety': test_invariant_I4(all_ground_truths),
    'I5_entity_floor': test_invariant_I5(all_ground_truths),
    'I6_progression': test_invariant_I6(all_ground_truths)
}

for invariant_id, result in invariant_results.items():
    if result['violation_rate'] <= 0.10:
        status = '✅ STRONG'
    elif result['violation_rate'] <= 0.15:
        status = '⚠️ MODERATE'
    else:
        status = '❌ WEAK'
    
    print(f"{invariant_id}: {status} ({result['violation_rate']*100:.1f}% violations)")
```

---

### Step 4: Refine or Discard

**For each invariant:**

**If STRONG** → Keep as-is, proceed to Phase 3

**If MODERATE** → Investigate violations:

- Are they clustered in one GT?
- Are they in a specific paragraph type?
- Can bounds be expanded slightly?
- Can weights be adjusted?

**If WEAK** → Two options:

1. **Discard** if violations are random (not a true invariant)
2. **Make mode-specific** if violations cluster by section type

---

### Step 5: Document Cross-GT Validated Invariants

**Output**:

- Final list of 3-8 manuscript-wide invariants
- For each: formula, bounds, violation rate across all 4 GTs
- Mode-specific adjustments (if needed)
- Confidence level for using in framework calibration

---

## Expected Timeline

**Phase 2 Steps**:

1. ✅ **Conceptual framework designed** (this page)
2. ⏳ **Obtain full GT2-4 text** (requires viewing source pages)
3. ⏳ **Extract features** (manual or semi-automated)
4. ⏳ **Run validation tests** (compare to Phase 1 bounds)
5. ⏳ **Refine invariants** (adjust bounds/weights as needed)
6. ⏳ **Document results** (create validation summary)

**Estimated Completion**: Depends on text access

---

## What Phase 2 Enables

### If Successful:

✅ **Mathematically rigorous constraints** on threshold adjustment

✅ **Cognitive continuity preserved** (not ad hoc changes)

✅ **Compound measures** that replace individual thresholds

✅ **Mode-aware quality model** (different standards for different contexts)

✅ **Predictive framework** (can forecast flags on new text)

### Concrete Example:

**Instead of this ad hoc adjustment**:

> "The Preface has discourse marker density 1.47, below threshold [1.5, 2.0], so let's expand to [1.0, 2.0]."
> 

**We get this bounded adjustment**:

> "The Preface maintains coherence budget 2.13 ± 0.18 through compensatory mechanisms (high entity continuity + evidence strength offset lower markers). Applying this invariant: discourse markers can go as low as 1.2 IF entity continuity ≥ 0.60 AND evidence strength ≥ 1.5. This preserves the structural relationship that defines quality in this manuscript."
> 

**The second approach**:

- ✅ Explains WHY the adjustment is valid
- ✅ Constrains HOW MUCH adjustment is allowed
- ✅ Preserves RELATIONSHIPS between measures
- ✅ Maintains COGNITIVE CONTINUITY

---

## Next Actions

**To proceed with Phase 2 implementation:**

1. **Access full text** of Sections 1.2, 1.3, 1.4
    - May need to view individual sub-pages
    - Or use alternative source (e.g., [America's Skeleton in the Closet: The Commitment Void Fraction (11-10-2025) 28820 words](https://www.notion.so/America-s-Skeleton-in-the-Closet-The-Commitment-Void-Fraction-11-10-2025-28820-words-2a7f832e52ca80e5af6bdda48eaa0f44?pvs=21) which has complete text)
2. **Extract paragraph-level features** from each section
3. **Run validation battery** on all 6 invariants
4. **Document results** in comprehensive validation table
5. **Proceed to Phase 3** (framework integration) once invariants are validated

---

**Status**: Phase 2 Framework Complete ✅

**Blocker**: Need full text access to GT2-4 to proceed with validation

**Alternative**: Use [America's Skeleton in the Closet: The Commitment Void Fraction (11-10-2025) 28820 words](https://www.notion.so/America-s-Skeleton-in-the-Closet-The-Commitment-Void-Fraction-11-10-2025-28820-words-2a7f832e52ca80e5af6bdda48eaa0f44?pvs=21) as source for GT2-4 text if Chapter One page remains inaccessible.