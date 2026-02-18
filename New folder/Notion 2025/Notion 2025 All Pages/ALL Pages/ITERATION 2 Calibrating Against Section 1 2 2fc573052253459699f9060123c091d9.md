# ITERATION 2: Calibrating Against Section 1.2

# Iteration 2: Calibrating Against Ground Truth 2 (Section 1.2)

## Ground Truth Text

**Source**: [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)

**Section**: 1.2 (Demographics and the Cultural Fabric)

**Word Count**: ~2,800 words

**Target State**: Framework₂ produces 0 deficiencies on GT1 + GT2

---

## Input State

**Starting point**: Framework₁ (calibrated on Preface + 1.1)

**Current manuscript diagnosis**: ~268 deficiencies (down from 301)

**GT1 validation status**: ✅ 0 deficiencies on Preface + 1.1

**New challenge**: Section 1.2 introduces **demographic data presentation** patterns not seen in GT1

---

## Step 1: Apply Framework₁ to Ground Truth 2

### Expected Deficiencies

**Estimated**: 15-25 new deficiency types

**Why fewer than GT1?** Framework₁ already learned basic authorial style; GT2 adds new **content-type patterns**

**Predicted new categories**:

- **Data citation format**: How author presents demographic statistics
- **Numeric precision**: Decimal places, percentage formats, rounding conventions
- **Data source attribution**: How frequently sources are cited inline vs. in footnotes
- **Comparative structure**: How author handles before/after, baseline/treatment comparisons
- **Visual reference patterns**: How author refers to tables/figures (if any)
- **Hedging language**: Uncertainty qualifiers when presenting estimates

---

## Step 2: Deficiency Triage Focused on Data Presentation

### New Triage Categories

**Category: DATA_CITATION**

- Author's preferred format: "According to the 2020 Census, X% of..." vs. "X% of... (Census 2020)"
- Action: Add template to recognize both as acceptable

**Category: NUMERIC_STYLE**

- Decimal precision: "23.7%" vs. "24%"
- Large numbers: "1,234,567" vs. "1.23 million"
- Action: Learn author's consistency rules

**Category: QUALIFIER_DENSITY**

- Universal framework may flag "approximately," "roughly," "about" as redundancy
- For data sections, these are precision markers, not redundancy
- Action: Reduce redundancy weight for numeric contexts

**Category: PARAGRAPH_DENSITY**

- Data-heavy paragraphs may have different structure: more facts, fewer transitions
- Action: Create "data_paragraph" subtype with relaxed discourse marker requirements

---

## Step 3: Framework Adjustments - Data Presentation Layer

### New Adjustment Type: Context-Dependent Rules

**Concept**: Some measures should behave differently in **data-heavy contexts** vs. **narrative contexts**

**Implementation**:

```python
class ContextAwareMeasure:
    def evaluate(self, text, context_type):
        if context_type == 'data_presentation':
            return self.thresholds['data_mode']
        elif context_type == 'narrative':
            return self.thresholds['narrative_mode']
        else:
            return self.thresholds['default']
```

**Example: Discourse Marker Density**

- **Narrative mode** (learned from GT1): 1.0-2.0 markers per 100 words
- **Data mode** (learned from GT2): 0.6-1.5 markers per 100 words
- **Rationale**: Dense data presentation uses fewer transitional markers

---

## Step 4: Predicted Adjustments from GT2 Analysis

### New Adjustments

| Measure ID | Measure Name | Adjustment Type | GT1 Threshold | GT2 Addition | Context |
| --- | --- | --- | --- | --- | --- |
| M-59 | Data Citation Format | Template addition | N/A | Recognize "(Source YYYY)" pattern | Data paragraphs |
| M-60 | Numeric Precision | Consistency rule | N/A | Percentages: 1 decimal; Large numbers: "X million" | All numbers |
| M-04 | Discourse Marker Density | Context threshold | 1.0-2.0/100 | **Data mode**: 0.6-1.5/100 | Data vs. narrative |
| M-33 | Redundancy Detection | Context weight | 0.8 | **Data mode**: 0.3 (qualifiers OK) | Near numbers |
| M-25 | Paragraph Length | Context threshold | 3-9 sentences | **Data mode**: 3-11 sentences | Dense data |
| M-45 | Evidence Density | Threshold expansion | 1 citation/para | **Data mode**: 3-5 citations/para | Statistical sections |

**Total new adjustments**: 6 major + 8 minor = 14 framework modifications

**Cumulative adjustments**: 34 (20 from Iteration 1 + 14 from Iteration 2)

---

## Step 5: Validation

### Re-apply Framework₂ to Both Ground Truths

**GT1 (Preface + 1.1)**: Still 0 deficiencies (confirm no regression)

**GT2 (Section 1.2)**: Target 0 deficiencies

**Critical check**: Data-mode thresholds don't apply to narrative sections of GT1

**Validation checklist**:

- [ ]  Data citations in "(Source YYYY)" format recognized
- [ ]  Percentages with 1 decimal place accepted
- [ ]  Large numbers in "X million" format accepted
- [ ]  Lower discourse marker density in data paragraphs not flagged
- [ ]  Qualifier words ("approximately") near numbers not flagged as redundancy
- [ ]  Data-heavy paragraphs (10-11 sentences) not flagged
- [ ]  High citation density (4 citations/para) in data sections not flagged as over-documentation

---

## Step 6: Apply Framework₂ to Full Manuscript

### Expected Outcome

**Before (Framework₁)**: 268 deficiencies

**After (Framework₂)**: ~240-250 deficiencies

**Reduction**: 18-28 deficiencies (7-10% additional reduction)

**Cumulative reduction from baseline**: 51-61 deficiencies (17-20%)

**Why the reduction?**

- Manuscript has other data-heavy sections similar to 1.2
- Those sections will benefit from data-mode thresholds
- Example: Chapter 3 demographic analysis, Chapter 5 economic data

**New deficiency profile**:

- Inconsistencies in data presentation now visible (some sections don't follow GT2 patterns)
- Example: Chapter 4 cites sources differently than GT2 established
- These are TRUE inconsistencies to fix

---

## Step 7: Document Framework₂ State

```json
{
  "iteration": 2,
  "ground_truths_integrated": 2,
  "ground_truth_sources": [
    "[Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21) - Preface + Section 1.1",
    "[Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21) - Section 1.2"
  ],
  "new_adjustments_this_iteration": 14,
  "cumulative_adjustments": 34,
  "new_capabilities": [
    "Context-aware evaluation (data vs. narrative mode)",
    "Data citation format templates",
    "Numeric style consistency rules",
    "Qualifier-as-precision-marker recognition"
  ],
  "generality_score": 0.85,
  "specificity_score": 0.15,
  "deficiency_reduction": "301 → 268 → 245 (18.6%)",
  "validation_status": "GT1: 0, GT2: 0",
  "next_iteration": "Integrate Section 1.3 to learn source-synthesis patterns"
}
```

---

## Deliverables

1. **GT2_Framework1_Analysis.csv**: Deficiencies from Framework₁ on GT2
2. **GT2_Triage_Report.csv**: Classification focusing on data presentation patterns
3. **Framework₂_Adjustments.json**: All new threshold, weight, and template changes
4. **Framework₂_[Validation.md](http://Validation.md)**: Confirmation GT1 + GT2 both produce 0 deficiencies
5. **Manuscript_Diagnostic_State_245.csv**: New diagnostic after applying Framework₂
6. **Context_Detection_[Rules.py](http://Rules.py)**: Code for identifying data vs. narrative paragraphs

---

## Success Criteria

✅ **Primary**: Framework₂ produces 0 deficiencies on GT1 + GT2

✅ **Secondary**: Total manuscript deficiencies reduced by 15-20% from baseline

✅ **Tertiary**: GT1 validation still passes (no regression)

✅ **Quaternary**: Context-aware rules properly distinguish data vs. narrative sections

---

## Key Innovation: Context Detection

Framework₂ introduces **automatic context detection** to apply different thresholds:

**Data paragraph indicators**:

- Contains 3+ numbers with units (%, $, million, etc.)
- Contains 2+ citations to data sources
- Uses comparative language ("compared to," "whereas," "in contrast")
- Low narrative marker density

**Narrative paragraph indicators**:

- Few or no numbers
- Conceptual/theoretical language
- High use of discourse markers
- Introduces new concepts or arguments

**Implementation**: Simple classifier trained on GT1 (narrative) + GT2 (data)

---

## Timeline

- **Step 1** (Apply Framework₁ to GT2): 20 minutes
- **Step 2** (Triage 20 deficiencies): 2 hours
- **Step 3-4** (Implement adjustments + context detection): 3 hours
- **Step 5** (Validation on GT1 + GT2): 45 minutes
- **Step 6** (Re-analyze manuscript): 30 minutes
- **Step 7** (Documentation): 1 hour

**Total**: ~7.5 hours

**Cumulative time**: 15 hours (Iteration 1 + 2)

---

## Next: <page url="139">ITERATION 3: Integrating Section 1.3</page>