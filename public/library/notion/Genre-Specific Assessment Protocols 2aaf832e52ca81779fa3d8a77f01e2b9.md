# Genre-Specific Assessment Protocols

# Genre-Specific Assessment Protocols

Tailored coherence and quality assessment procedures for different text genres.

---

## Fiction/Narrative

### Coherence Dimensions

**Plot Coherence**:

- Consistent story progression
- Clear causal chains (Event A → Event B)
- No unexplained jumps in timeline
- Resolutions for introduced conflicts

**Character Consistency**:

- Stable personality traits (unless development shown)
- Consistent motivations
- Believable character arcs
- No contradictory actions without explanation

**Temporal Flow**:

- Clear time markers ("The next day," "Meanwhile")
- Logical chronology or deliberate flashbacks
- Consistent tense usage within scenes
- Smooth transitions between time periods

**Spatial Consistency**:

- Clear location descriptions
- Logical movement through space
- Consistent world-building details
- No contradictory settings

### Assessment Metrics

**Entity-Based (High Priority)**:

- **Protagonist-centeredness**: Main character should appear in 60-80% of scenes
- **Entity continuity**: Track character mentions across chapters
- **Coreference resolution**: Ensure pronouns clearly reference characters

**Metric**: Compute entity grid focusing on character entities; higher Continue transitions = better

**Event Graphs**:

- Extract (Action, Subject, Object, Time) tuples
- Build event sequence graph
- Check for:
    - Logical event ordering
    - No dangling plot threads
    - Proper setup for payoffs

**Tool**: Custom event extraction + dependency parsing

**Narrative Schema Alignment**:

- Check if story follows recognizable patterns:
    - Hero's Journey
    - Three-Act Structure
    - Mystery structure (setup → investigation → revelation)

**Semantic Coherence**:

- Thematic consistency (recurring motifs, symbols)
- Tone maintenance (unless deliberate shift)
- Voice consistency (POV, narrative style)

### Genre-Specific Weights

```python
fiction_coherence = (
    0.35 * entity_continuity +      # Character tracking most important
    0.25 * plot_coherence +          # Event sequencing
    0.20 * semantic_coherence +      # Thematic unity
    0.10 * temporal_flow +           # Timeline clarity
    0.10 * discourse_markers         # Transitions
)
```

### Common Issues

**Red flags**:

- Character appears, then vanishes without explanation
- Time jumps without transition markers
- Contradictory descriptions of same location
- Action sequence unclear ("He grabbed it" - what?)
- Sudden tense shifts

**Automated detection**:

1. Entity mention frequency drop-off (disappearing characters)
2. Tense inconsistency patterns
3. Missing referent pronouns ("it" with no clear antecedent)
4. Time markers missing in scene transitions

---

## Argumentative/Persuasive

### Coherence Dimensions

**Logical Structure**:

- Clear thesis statement
- Premises support conclusion
- No logical fallacies
- Counter-arguments addressed

**Claim-Evidence Links**:

- Every claim backed by evidence
- Evidence relevant to claim
- Warrants explicit (connect evidence to claim)
- Strength of evidence assessed

**Rhetorical Effectiveness**:

- Appropriate appeals (ethos, pathos, logos)
- Strategic concessions
- Effective refutations
- Strong opening and closing

### Assessment Metrics

**Toulmin Structure Analysis (High Priority)**:

Automated extraction:

1. **Claims**: Identify assertion sentences (linguistic patterns)
2. **Grounds**: Detect evidence markers ("Research shows," "For example")
3. **Warrants**: Find reasoning connectives ("because," "therefore")
4. **Qualifiers**: Spot hedge words ("likely," "may")
5. **Rebuttals**: Identify counter-argument markers ("However," "Critics argue")

**Scoring**:

- Presence of all elements: +1
- Balanced Claims:Evidence ratio (1:1 to 1:3 optimal): +1
- Explicit warrants: +1
- Counter-arguments addressed: +1
- **Total**: 0-4 scale

**Discourse Relations (High Priority)**:

Expected patterns:

- **Support/Elaboration**: Should follow claims (frequent)
- **Cause/Result**: For explanatory arguments
- **Contrast**: For presenting alternatives
- **Concession**: Before rebuttals

**Metric**: Compute relation type frequencies; compare to argumentative corpus norms

**Argument Mining**:

Classify sentences:

- **Claim** (major/minor)
- **Evidence** (data, expert opinion, example)
- **Counter-claim**
- **Rebuttal**

Visualize argument structure:

```
Thesis: X is the best approach
├─ Claim 1: X is effective
│  ├─ Evidence 1a: Study shows Y
│  └─ Evidence 1b: Expert Z agrees
├─ Claim 2: X is feasible
│  └─ Evidence 2a: Cost analysis
└─ Counter-claim: X has limitations
   └─ Rebuttal: But limitations are manageable
```

**Tools**: Argument mining models (Stab & Gurevych), BERT fine-tuned on argumentative corpora

### Genre-Specific Weights

```python
argumentative_coherence = (
    0.30 * toulmin_structure +       # Argument completeness
    0.25 * discourse_relations +     # Logical connectives
    0.20 * claim_evidence_links +    # Support quality
    0.15 * logical_consistency +     # No contradictions
    0.10 * entity_coherence          # Term consistency
)
```

### Common Issues

**Red flags**:

- Claims without evidence
- Evidence without clear claim
- Missing warrants (evidence doesn't clearly support claim)
- Ignored counter-arguments
- Logical fallacies (ad hominem, straw man, false dichotomy)
- Circular reasoning

**Automated detection**:

1. Claim sentences not followed by evidence markers
2. Assertion:Support ratio imbalance
3. Missing discourse markers for logical flow
4. Contradiction detection (claim X in para 1, not-X in para 5)

---

## Technical/Expository

### Coherence Dimensions

**Terminological Consistency**:

- Same concept = same term throughout
- Acronyms defined at first use
- Technical terms used correctly
- Minimal ambiguity

**Progressive Disclosure**:

- Simple concepts before complex
- Prerequisites established
- No forward references to undefined terms
- Logical information ordering

**Structural Clarity**:

- Clear section hierarchy
- Signposting ("First," "In this section")
- Consistent formatting
- Effective headings

**Precision**:

- Specific language (avoid vague terms)
- Quantitative where appropriate
- Clear definitions
- Explicit relationships

### Assessment Metrics

**Lexical Cohesion (High Priority)**:

**Term repetition analysis**:

- Extract domain-specific terms
- Track usage frequency
- Flag synonyms used inconsistently ("database" vs. "data store" interchangeably)
- Check definition consistency

**Metric**:

- Term consistency ratio = (repeated terms) / (total unique terms)
- Target: >0.7 for technical writing

**Domain Ontology Alignment**:

If domain ontology available:

1. Extract terms from text
2. Map to ontology concepts
3. Check relationships match ontology
4. Flag incorrect relationships

**Example**: If ontology says "A is-a B" but text says "A is-part-of B" → error

**Dependency Structure**:

Build concept dependency graph:

- Node = concept/term
- Edge = "requires understanding of"

Check:

- No forward dependencies (term used before explained)
- Topological ordering possible
- Clear learning path

**Readability + Specificity Balance**:

```python
# Not too simple (for technical audience)
flesch_reading_ease < 60  # College level

# Not too vague
avg_word_length > 5 characters
modifier_ratio > 0.15  # Descriptive precision
```

### Genre-Specific Weights

```python
technical_coherence = (
    0.35 * term_consistency +        # Most critical
    0.25 * progressive_disclosure +  # Logical ordering
    0.20 * structural_clarity +      # Headings, signposts
    0.10 * reference_topology +      # Cross-references
    0.10 * discourse_markers         # Transitions
)
```

### Common Issues

**Red flags**:

- Term used before defined
- Inconsistent terminology
- Vague referents ("this approach" - which one?)
- Complex concept without buildup
- Missing transitions between topics
- Ambiguous pronouns in technical context

**Automated detection**:

1. First mention without definition
2. Synonym variation for technical terms
3. Readability metrics (Flesch, Gunning Fog)
4. Forward references in dependency graph
5. Missing section headers for major transitions

---

## Academic/Research

### Coherence Dimensions

**Conventional Structure**:

- IMRD (Introduction, Methods, Results, Discussion) or equivalent
- Appropriate sections for discipline
- Logical flow between sections
- Clear contribution statement

**Citation Coherence**:

- Related work appropriately cited
- Citation patterns form "story"
- No contradictory citations
- Proper attribution

**Methodological Clarity**:

- Replicable descriptions
- Justified choices
- Clear procedure
- Limitations acknowledged

**Argumentation**:

- Claims supported by results
- Limitations discussed
- Alternative explanations considered
- Conclusions warranted by evidence

### Assessment Metrics

**Section Coherence**:

Check expected content per section:

- **Introduction**: Problem → Gap → Contribution
- **Related Work**: Compare/contrast with prior work
- **Methods**: Detailed procedure, reproducible
- **Results**: Findings with evidence (tables, figures)
- **Discussion**: Interpret, implications, limitations

**Metric**: Classify sentences by section function; flag misplaced content

**Citation Network Coherence**:

Build citation graph:

- Node = cited paper
- Edge = co-citation

Metrics:

- **Clustering coefficient**: Are citations related to each other?
- **Bibliographic coupling**: Do cited papers share references?
- **Chronological flow**: Cited papers form progression?

**Higher clustering** = more coherent literature review

**Methods-Results Alignment**:

- Extract methods (procedures, measures)
- Extract results (findings, statistics)
- Check 1:1 correspondence
- Flag "orphan" results (not connected to method)

**Claims-Evidence Checking**:

- Identify claim sentences ("We show that," "Our results indicate")
- Check backward reference to results/data
- Flag unsupported claims

### Genre-Specific Weights

```python
academic_coherence = (
    0.25 * structure_conformity +    # IMRD adherence
    0.25 * claims_evidence_links +   # Support for assertions
    0.20 * citation_coherence +      # Literature integration
    0.15 * methods_results_align +   # Internal consistency
    0.15 * discourse_flow            # Section transitions
)
```

### Common Issues

**Red flags**:

- Methods not matching results reported
- Claims without evidence in same paper
- Contradictory statements in intro vs. discussion
- Literature review as disconnected list
- Missing limitations discussion
- Results section with interpretation (belongs in discussion)

---

## Business/Professional

### Coherence Dimensions

**Actionable Clarity**:

- Clear recommendations
- Explicit next steps
- Responsibility assignment
- Timelines specified

**Executive Summary Alignment**:

- Summary captures key points
- No contradictions with body
- Standalone comprehensibility

**Audience Appropriateness**:

- Jargon level suitable
- Background knowledge assumed correctly
- Appropriate detail level

### Assessment Metrics

**Summary-Body Coherence**:

- Extract key points from body
- Compare with executive summary
- Compute semantic similarity
- Flag missing key points

**Action Item Extraction**:

- Identify imperative sentences
- Check for: Who, What, When
- Flag vague actions ("improve process")

**Metric**: Proportion of action items fully specified

---

## Coefficient Adjustments

### Applying Genre Weights

```python
def compute_genre_weighted_coherence(text, genre, base_metrics):
    """
    Apply genre-specific weights to base metrics.
    
    Args:
        text: Input text
        genre: 'fiction', 'argumentative', 'technical', 'academic', 'business'
        base_metrics: Dict with {metric_name: score}
    
    Returns:
        Weighted coherence score (0-1)
    """
    weights = GENRE_WEIGHTS[genre]
    
    score = sum(
        weights.get(metric, 0) * value 
        for metric, value in base_metrics.items()
    )
    
    # Apply genre-specific boosters
    if genre == 'fiction' and base_metrics['entity_continuity'] > 0.8:
        score *= 1.1  # Reward strong character tracking
    
    if genre == 'argumentative' and base_metrics['toulmin_score'] == 4:
        score *= 1.15  # Reward complete argumentation
    
    if genre == 'technical' and base_metrics['term_consistency'] < 0.5:
        score *= 0.85  # Penalize inconsistent terminology
    
    return min(score, 1.0)  # Cap at 1.0
```

### Genre Detection

**Automatic classification**:

1. Lexical features (technical terms, narrative past tense, etc.)
2. Structural features (section headers, presence of citations)
3. Discourse markers ("However" vs. "Meanwhile")

**Or**: User-specified metadata tag

---

## Cross-Genre Considerations

**Universally important**:

- Clear transitions
- Logical progression
- Consistent terminology within text
- No internal contradictions

**Genre-variable**:

- Acceptable entity discontinuity (high in technical, low in fiction)
- Pronoun clarity requirements (very high in technical, moderate in fiction)
- Discourse marker density (high in argumentative, low in narrative)
- Structural rigidity (very high in academic, flexible in fiction)

---

## Implementation Priority

**For your dual book project**:

**"Prosecuting Inequity (Climate)"** - likely argumentative/academic:

- Priority: Toulmin structure, discourse relations, claims-evidence
- Tools: Argument mining, citation coherence, BERT-based

**"Dishonest AI is Dangerous AI"** - likely argumentative/technical:

- Priority: Term consistency, logical structure, technical precision
- Tools: Ontology alignment, argument structure, lexical cohesion

**Recommended approach**:

1. Start with base metrics (all genres)
2. Add argumentative-specific (both books need this)
3. Add technical-specific (AI book)
4. Add academic-specific if scholarly tone (Climate book)

---

## References

- Plot coherence: Narrative schema research (Chambers & Jurafsky)
- Argument mining: Stab & Gurevych (2017), Wachsmuth et al.
- Technical writing: Terminology extraction, domain ontologies
- Academic structure: Argumentative zoning (Teufel), Citation network analysis
- Genre classification: Stamatatos (2009), Kessler et al.