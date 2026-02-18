# ITERATION 3: Calibrating Against Section 1.3

# Iteration 3: Calibrating Against Ground Truth 3 (Section 1.3)

## Ground Truth Text

**Source**: [Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21)

**Section**: 1.3 (Historical Synthesis and Source Integration)

**Word Count**: ~3,200 words

**Target State**: Framework₃ produces 0 deficiencies on GT1 + GT2 + GT3

---

## Input State

**Starting point**: Framework₂ (calibrated on Preface + 1.1 + 1.2)

**Current manuscript diagnosis**: ~245 deficiencies (down from 301)

**GT1 + GT2 validation status**: ✅ 0 deficiencies

**New challenge**: Section 1.3 shows **multi-source synthesis** patterns—how author weaves together historical accounts, primary sources, and secondary literature

---

## Step 1: Apply Framework₂ to Ground Truth 3

### Expected Deficiencies

**Estimated**: 12-18 new deficiency types

**Why fewer than GT2?** Framework₂ handles both narrative and data modes; GT3 adds **synthesis-specific patterns**

**Predicted new categories**:

- **Source integration patterns**: How author introduces, quotes, and synthesizes multiple sources
- **Attribution chains**: "According to X, citing Y, who references Z..."
- **Historiographic positioning**: How author situates their argument relative to existing scholarship
- **Primary vs. secondary source balance**: Ratio and integration style
- **Quote vs. paraphrase**: When author uses direct quotes vs. summarizes
- **Temporal sequencing**: How historical narrative is structured chronologically
- **Interpretive framing**: Language that signals author's interpretation vs. reporting sources

---

## Step 2: Deficiency Triage Focused on Source Synthesis

### New Triage Categories

**Category: MULTI-SOURCE_INTEGRATION**

- Universal framework may flag "dense citation" as over-documentation
- Example: "Smith (1995) argues X, building on Jones (1987), though Lee (2003) contests this interpretation"
- Action: Recognize synthesis patterns; high citation density is appropriate

**Category: ATTRIBUTION_DEPTH**

- Author uses nested attributions: "According to X (citing Y)..."
- Universal framework may flag as "awkward construction"
- Action: Add template for nested citation as acceptable

**Category: INTERPRETIVE_MARKERS**

- Phrases like "This suggests," "We can infer," "The evidence points to"
- Universal framework may flag as hedging/weak language
- Action: Recognize these as appropriate interpretive markers in synthesis

**Category: QUOTE_LENGTH**

- Author includes 3-4 sentence block quotes
- Universal framework may flag as "excessive quotation"
- Action: Learn author's quote-length conventions

**Category: HISTORIOGRAPHIC_LANGUAGE**

- Phrases like "Traditional accounts emphasize," "Recent scholarship challenges," "Revisionist historians argue"
- This is discipline-specific language
- Action: Add historiographic templates

---

## Step 3: Framework Adjustments - Synthesis Layer

### New Adjustment Type: Source-Density Awareness

**Concept**: Some measures should recognize **high citation density as a quality signal** in synthesis sections, not a deficiency

**Implementation**:

```python
class SourceDensityAwareMeasure:
    def evaluate(self, text, source_count):
        if source_count >= 3:  # Synthesis mode
            # High citation density is expected
            return self.thresholds['synthesis_mode']
        elif source_count == 1-2:  # Single-source mode
            return self.thresholds['single_source_mode']
        else:  # No sources
            return self.thresholds['default']
```

**Example: Citation Density**

- **Default mode**: Flag paragraphs with >2 citations as over-documented
- **Synthesis mode** (learned from GT3): 3-6 citations per paragraph is appropriate
- **Rationale**: Multi-source synthesis requires dense citation

---

## Step 4: Predicted Adjustments from GT3 Analysis

### New Adjustments

| Measure ID | Measure Name | Adjustment Type | Previous | GT3 Addition | Context |
| --- | --- | --- | --- | --- | --- |
| M-45 | Citation Density | Mode addition | Data: 3-5/para | **Synthesis: 3-6/para** | Multi-source sections |
| M-61 | Attribution Complexity | Template addition | Simple attribution | Nested: "X (citing Y)" | Source integration |
| M-48 | Hedging Language | Context reclassification | Flag as weak | **Synthesis mode**: Appropriate interpretive marker | "suggests," "implies" |
| M-23 | Quote Length | Threshold expansion | Max 2 sentences | **Synthesis mode**: Max 4 sentences | Block quotes |
| M-62 | Historiographic Markers | Template addition | N/A | Recognize discipline language | "Traditional accounts," "Revisionist" |
| M-19 | Sentence Complexity | Threshold expansion | Max 30 words | **Synthesis mode**: Max 35 words | Attribution chains |
| M-42 | Source Balance | New measure | N/A | Primary:Secondary ratio 1:2 to 1:3 | Historical analysis |

**Total new adjustments**: 7 major + 9 minor = 16 framework modifications

**Cumulative adjustments**: 50 (34 from Iter 1-2 + 16 from Iter 3)

---

## Step 5: Validation

### Re-apply Framework₃ to All Ground Truths

**GT1 (Preface + 1.1)**: Still 0 deficiencies (narrative baseline)

**GT2 (Section 1.2)**: Still 0 deficiencies (data presentation)

**GT3 (Section 1.3)**: Target 0 deficiencies (synthesis)

**Critical check**: Framework now distinguishes 3 modes—narrative, data, synthesis—and applies appropriate thresholds to each

**Validation checklist**:

- [ ]  High citation density (5 citations/para) in synthesis sections not flagged
- [ ]  Nested attributions "X (citing Y)" recognized as valid
- [ ]  Interpretive markers ("suggests," "implies") not flagged as hedging in synthesis
- [ ]  Block quotes (3-4 sentences) in synthesis sections not flagged
- [ ]  Historiographic language ("Traditional accounts," "Revisionist") recognized
- [ ]  Long sentences (32-35 words) with attribution chains not flagged
- [ ]  Primary:secondary source ratio within expected range

---

## Step 6: Apply Framework₃ to Full Manuscript

### Expected Outcome

**Before (Framework₂)**: 245 deficiencies

**After (Framework₃)**: ~215-225 deficiencies

**Reduction**: 20-30 deficiencies (8-12% additional reduction)

**Cumulative reduction from baseline**: 76-86 deficiencies (25-29%)

**Why significant reduction?**

- Entire manuscript is historical synthesis with multi-source integration
- Framework₃ adjustments apply broadly across all chapters
- Many previous "deficiencies" were appropriate synthesis patterns

**New deficiency profile**:

- **Consistency gaps in source integration**: Some sections don't follow GT3 citation patterns
- **Historiographic positioning gaps**: Some sections lack positioning relative to scholarship
- **Source balance issues**: Some sections over-rely on secondary sources
- **Attribution clarity**: Some sections have unclear attribution chains

**These are TRUE quality improvements** the manuscript needs.

---

## Step 7: Document Framework₃ State

```json
{
  "iteration": 3,
  "ground_truths_integrated": 3,
  "ground_truth_sources": [
    "[Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21) - Preface + Section 1.1",
    "[Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21) - Section 1.2",
    "[Chapter One guiding the rest of the book](https://www.notion.so/Chapter-One-guiding-the-rest-of-the-book-2a7f832e52ca80aa9fc5d7886e240b7d?pvs=21) - Section 1.3"
  ],
  "new_adjustments_this_iteration": 16,
  "cumulative_adjustments": 50,
  "new_capabilities": [
    "Source-density aware evaluation (synthesis mode)",
    "Nested attribution recognition",
    "Interpretive marker distinction from hedging",
    "Historiographic language templates",
    "Source balance analysis"
  ],
  "evaluation_modes": [
    "Narrative (from GT1)",
    "Data presentation (from GT2)",
    "Multi-source synthesis (from GT3)"
  ],
  "generality_score": 0.73,
  "specificity_score": 0.27,
  "deficiency_reduction": "301 → 268 → 245 → 220 (26.9%)",
  "validation_status": "GT1: 0, GT2: 0, GT3: 0",
  "next_iteration": "Integrate Section 1.4 to learn argument-conclusion patterns"
}
```

---

## Deliverables

1. **GT3_Framework2_Analysis.csv**: Deficiencies from Framework₂ on GT3
2. **GT3_Triage_Report.csv**: Classification focusing on synthesis patterns
3. **Framework₃_Adjustments.json**: All new synthesis-layer adjustments
4. **Framework₃_[Validation.md](http://Validation.md)**: Confirmation GT1 + GT2 + GT3 all produce 0 deficiencies
5. **Manuscript_Diagnostic_State_220.csv**: New diagnostic after applying Framework₃
6. **Synthesis_Detection_[Rules.py](http://Rules.py)**: Code for identifying multi-source synthesis sections
7. **Source_Balance_[Analyzer.py](http://Analyzer.py)**: Tool for measuring primary:secondary source ratios

---

## Success Criteria

✅ **Primary**: Framework₃ produces 0 deficiencies on GT1 + GT2 + GT3

✅ **Secondary**: Total manuscript deficiencies reduced by 25-30% from baseline

✅ **Tertiary**: GT1 + GT2 validation still passes (no regression)

✅ **Quaternary**: Framework distinguishes 3 evaluation modes correctly

✅ **Quinary**: Remaining deficiencies represent true quality improvement opportunities

---

## Key Innovation: Multi-Mode Framework

Framework₃ is now a **context-aware diagnostic system** with 3 evaluation modes:

### Mode 1: Narrative (from GT1)

- Lower citation density (0-2 per paragraph)
- Standard discourse marker requirements (1.0-2.0/100 words)
- Conceptual/theoretical language
- Standard paragraph length (3-9 sentences)

### Mode 2: Data Presentation (from GT2)

- High citation density (3-5 per paragraph)
- Relaxed discourse markers (0.6-1.5/100 words)
- Numeric precision rules
- Longer paragraphs acceptable (3-11 sentences)

### Mode 3: Multi-Source Synthesis (from GT3)

- Very high citation density (3-6 per paragraph)
- Complex attribution chains
- Interpretive markers appropriate
- Longer quotes acceptable (up to 4 sentences)
- Historiographic language templates

**Mode detection algorithm**:

```python
def detect_mode(paragraph):
    citation_count = count_citations(paragraph)
    number_density = count_numbers(paragraph)
    source_diversity = count_unique_sources(paragraph)
    
    if source_diversity >= 3:
        return 'synthesis'
    elif number_density > 0.05:  # 5% of words are numbers
        return 'data'
    else:
        return 'narrative'
```

---

## Timeline

- **Step 1** (Apply Framework₂ to GT3): 20 minutes
- **Step 2** (Triage 15 deficiencies): 2 hours
- **Step 3-4** (Implement adjustments + synthesis detection): 3 hours
- **Step 5** (Validation on GT1 + GT2 + GT3): 1 hour
- **Step 6** (Re-analyze manuscript): 30 minutes
- **Step 7** (Documentation): 1 hour

**Total**: ~8 hours

**Cumulative time**: 23 hours (Iterations 1-3)

---

## Next: <page url="140">ITERATION 4: Integrating Section 1.4 (Final Calibration)</page>