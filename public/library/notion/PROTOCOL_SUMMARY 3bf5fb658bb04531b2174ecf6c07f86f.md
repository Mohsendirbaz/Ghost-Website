# PROTOCOL_SUMMARY

# PROTOCOL SUMMARY: Tone-Weighted Compositional Analysis for Journal Article Development

## Purpose

This protocol enables systematic conversion of comprehensive book TOC into journal article format while maintaining argumentative coherence, appropriate tone distribution, and compositional precision.

## Core Methodology

### 1. Tone Mode Definitions

**Academic (A)**: Scholarly, balanced, intellectually rigorous, citation-heavy
- Use for: Theoretical frameworks, literature synthesis, methodological justification
- Markers: Third-person, hedging language, extensive citations, counterarguments acknowledged

**Technical (T)**: Precise, methodological, empirically grounded, quantitative
- Use for: Process descriptions, cost analysis, scaling equations, sensitivity studies
- Markers: Equations, tables, specific numerical claims, units, error bounds

**General (G)**: Accessible, narrative-driven, morally engaged, broader appeal
- Use for: Crisis documentation, case studies, human impact, accessibility
- Markers: First/second person occasional, vivid examples, moral framing, minimal jargon

**Policy (P)**: Authoritative, action-oriented, pragmatic, prescriptive
- Use for: Guardrail proposals, implementation roadmaps, institutional design
- Markers: “Should,” “must,” “requires,” normative claims, clear recommendations

### 2. Allocation Methodology

**Step 1**: Establish global target (e.g., 13,000-word journal article)

**Step 2**: Assign Part-level allocations based on argument structure:
- Part I (Crisis Context): 27-30%
- Part II (Policy Architecture): 18-22%
- Part III (Technical Pathways): 24-28%
- Part IV (Integration): 15-18%
- Part V (Synthesis/Action): 10-13%

**Step 3**: Distribute within Parts to chapters (±0.5% precision)

**Step 4**: Subdivide chapters to subsections (±0.3% precision)

**Step 5**: Assign tone composition to each subsection [A:X% | T:Y% | G:Z% | P:W%]

**Step 6**: Verify total = 100.0% ± 0.5%

### 3. Tone Assignment Rules

**Dominance Principle**: Primary tone should be ≥40% unless deliberate balance required

**Complementarity Principle**:
- Academic + Technical for rigorous analysis
- General + Policy for accessible advocacy
- Technical + Policy for implementation detail
- Academic + General for moral philosophy

**Progression Principle**:
- Part I: Shift from General (hook) → Academic (analysis) → Technical (quantification)
- Part II: Policy-dominant with Academic grounding
- Part III: Technical-dominant with Academic methodology
- Part IV: Balanced mix showing feasibility
- Part V: General + Policy for impact and action

**Avoid Mismatches**:
- Don’t use high General% for cost equations
- Don’t use high Technical% for moral arguments
- Don’t use high Policy% without establishing need first

### 4. Quality Compliance Framework

### Toulmin Model (Argument Structure)

Every substantive section must include:
- **Claim**: Central assertion (thesis sentence)
- **Grounds**: Evidence/data supporting claim (citations, statistics, analysis)
- **Warrant**: Reasoning linking grounds to claim (made explicit, not assumed)
- **Backing**: Support for warrant (literature, precedent, theory)
- **Qualifier**: Scope limitations (“generally,” “under these conditions,” “in most cases”)

### Bloom’s Taxonomy (Cognitive Depth)

Sections should demonstrate progressive cognitive engagement:
1. Knowledge (recall facts)
2. Comprehension (explain concepts)
3. Application (use in new situations)
4. Analysis (draw connections)
5. Synthesis (combine elements)
6. Evaluation (justify positions)

Policy recommendations require Level 6 (Evaluation).
Technical pathways require Level 3-4 (Application-Analysis).
Crisis documentation requires Level 1-3 (Knowledge-Application).

### Coherence Mechanisms

**Global Coherence**:
- Clear overall progression: Problem → Architecture → Proof → Integration → Action
- Consistent topical thread maintained across parts
- Logical section sequencing with explicit bridges
- Effective paragraph transitions using:
- Forward references (“As we will demonstrate in Section X…”)
- Backward references (“Building on the evidence from Section Y…”)
- Contrast markers (“However,” “Conversely,” “In contrast”)
- Causation markers (“Therefore,” “Consequently,” “As a result”)

**Entity Continuity**:
- Key concepts introduced with definition + context
- Important entities persist (e.g., “reusable capital” defined once, used throughout)
- New entities connected to established ones before independence
- Avoid orphan concepts (terms appearing once without context)

**Local Cohesion**:
- Topic sentences announce paragraph content
- Supporting sentences develop topic
- Concluding sentences transition or synthesize
- No paragraph > 8 sentences (general sections) or >12 sentences (technical sections)

### 5. Tone Adjustment Procedure

When user requests tone shift (e.g., “increase technical emphasis by 10%”):

**Algorithm**:

```
NEW_TONE_X = OLD_TONE_X + DELTA_X
For each OTHER_TONE:
    REDUCTION = DELTA_X × (OLD_OTHER_TONE / SUM_OTHER_TONES)
    NEW_OTHER_TONE = OLD_OTHER_TONE - REDUCTION

Reallocate word count:
    PRIORITY_PARTS = Parts where TONE_X naturally dominates
    Expand those parts proportionally
    Contract other parts proportionally
    Maintain global 100% total
```

**Example**: +10% Technical
- Reduce Academic: -3% (distributed across Parts I, II, V)
- Reduce General: -4% (distributed across Parts I, IV, V)
- Reduce Policy: -3% (distributed across Parts II, IV)
- Expand Part III: +8% (add detail to Chapters 15-17)
- Expand Part IV (technical sections): +2%

### 6. Implementation Workflow

**Phase 1: Structural Planning**
1. Load full book TOC
2. Identify essential vs. condensable chapters
3. Determine Part-level allocations
4. Assign preliminary chapter allocations
5. Subdivide to subsection level

**Phase 2: Tone Assignment**
1. Classify each subsection by primary content type
2. Assign dominant tone (≥40%)
3. Assign complementary tones
4. Verify distribution against reader journey expectations
5. Calculate global weighted average

**Phase 3: Writing Execution**
1. Write to target allocations (don’t obsess over precision in first draft)
2. Mark completed sections with actual word count
3. Flag sections deviating >20% from target for revision
4. Maintain running tone assessment

**Phase 4: Quality Verification**
1. Check Toulmin structure (claim-grounds-warrant-backing-qualifier)
2. Verify Bloom’s taxonomy progression
3. Test entity continuity (search for orphan concepts)
4. Assess transition quality
5. Measure tone compliance (should be within ±5% of target)

**Phase 5: Rebalancing**
1. Identify sections over/under allocation
2. Redistribute content or compress/expand as needed
3. Verify global total remains 100%
4. Final tone distribution check

### 7. Measurement and Verification

**Word Count Tracking**:

```
SECTION_PERCENTAGE = (SECTION_WORDS / TOTAL_WORDS) × 100
DEVIATION = |TARGET_PERCENTAGE - ACTUAL_PERCENTAGE|
If DEVIATION > 1.0%: Flag for revision
If DEVIATION > 2.0%: Mandatory revision
```

**Tone Assessment**:
Manual coding of representative paragraphs:
- Sample 3-5 paragraphs per subsection
- Code each sentence for dominant tone
- Calculate percentage distribution
- Compare to target ± 5%

**Coherence Audit**:
- Check forward/backward references present
- Verify no orphan concepts (use text search)
- Confirm transition sentences between major sections
- Test readability (Flesch-Kincaid or similar)

### 8. Common Pitfalls and Corrections

**Pitfall**: Technical sections drift too academic (excessive hedging)
**Correction**: Increase declarative statements, reduce “may,” “might,” “could”

**Pitfall**: Policy sections become preachy (excessive General tone)
**Correction**: Add empirical grounding, cite precedent, show mechanism

**Pitfall**: General sections oversimplify
**Correction**: Maintain analytical rigor while improving accessibility

**Pitfall**: Part III becomes impenetrable
**Correction**: Add worked examples, visual aids, plain-language summaries

**Pitfall**: Uneven pacing (some parts dense, others thin)
**Correction**: Redistribute content to match cognitive load expectations

### 9. Hyperparameter Tuning

**Conservative Composition** (Academic Journal):
- Academic: 35%, Technical: 30%, General: 15%, Policy: 20%
- Longer Part III, shorter Part V

**Policy Brief Adaptation**:
- Academic: 20%, Technical: 15%, General: 25%, Policy: 40%
- Compress Part III, expand Part II and V

**Public Intellectual Style**:
- Academic: 25%, Technical: 15%, General: 40%, Policy: 20%
- Expand Part I (crisis documentation), compress Part III

**Engineering Conference**:
- Academic: 15%, Technical: 55%, General: 10%, Policy: 20%
- Massively expand Part III, minimize Part I

### 10. Key Success Metrics

**Argumentative Integrity**:
- Every claim has explicit grounds
- Every warrant made visible
- Qualifiers prevent overstatement

**Cognitive Progression**:
- Reader can follow logic without gaps
- New concepts build on established ones
- Complexity increases gradually

**Tone Consistency**:
- Voice remains stable within sections
- Transitions don’t jar
- Register appropriate to content

**Compositional Precision**:
- Actual allocations within ±1% of target
- No section bloated or stunted
- Global balance maintained

**Reader Comprehension**:
- Target audience can follow argument
- Technical content accessible where needed
- Policy recommendations actionable

---

## Protocol Versioning

**Version**: 1.0
**Status**: Active
**Governance**: Update when systematic issues identified
**Application**: All journal article derivatives from book TOC

## Integration with Project Workflow

1. This protocol lives in project knowledge base
2. Referenced during article composition
3. Used for quality control before submission
4. Guides revision based on reviewer feedback

## Customization Notes

This framework is tunable:
- Adjust Part allocations based on journal requirements
- Modify tone distributions based on target audience
- Scale up/down based on word count constraints
- Adapt to different article types (review, original research, perspective)

---

**End of Protocol Summary**