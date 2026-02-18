# 6-Layer Linguistic Framework - Inter-Layer Relationship Map

# Framework Architecture

This page documents the **bidirectional inter-layer relationships** of the integrated 6-layer linguistic quality framework used in measure-driven diagnostics. All relationships are **symmetric** (order-independent) and represent functional dependencies where quality at one layer depends on or influences quality at another.

---

## Layer Definitions

**Layer 1 (L1): Lexical-Syntactic**

- Grammar category (7 measures)
- Style category (6 measures)
- **Function:** Surface-level correctness and expression quality

**Layer 2 (L2): Structural-Organizational**

- Structural category (13 measures)
- **Function:** Document architecture and hierarchy

**Layer 3 (L3): Semantic-Entity**

- Semantics category (3 measures)
- Entity-Based category (5 measures)
- **Function:** Meaning consistency and entity tracking

**Layer 4 (L4): Discourse-Pragmatic**

- Discourse category (4 measures)
- Coherence category (10 measures)
- **Function:** Textual connection and flow

**Layer 5 (L5): Argumentative-Rhetorical**

- Argumentation category (12 measures)
- **Function:** Logical structure and persuasion

**Layer 6 (L6): Meta-Textual**

- Cross-layer integration and global document properties
- **Function:** Holistic quality coordination

---

## Inter-Layer Relationship Map

### L1 ↔ L2: Lexical-Syntactic ↔ Structural-Organizational

**L1 works with L2 in capacity of:**

- **C1.2-A:** Active voice ratio (L1-Style) constrains topic sentence clarity (L2-Structural)
- **C1.2-B:** Sentence variety (L1-Style) enables logical paragraph breaks (L2-Structural)
- **C1.2-C:** Paragraph length balance (L2-Structural) requires sentence variety (L1-Style)

**Conditions:**

- **C1.2-A.1:** When passive voice exceeds 30%, topic sentences lose prominence
- **C1.2-B.1:** When sentence variety is low, paragraph boundaries become arbitrary
- **C1.2-C.1:** When paragraphs exceed 200 words, syntactic complexity must decrease

---

### L1 ↔ L3: Lexical-Syntactic ↔ Semantic-Entity

**L1 works with L3 in capacity of:**

- **C1.3-A:** Vocabulary sophistication (L1-Style) determines entity salience encoding (L3-Entity)
- **C1.3-B:** Terminology consistency (L1-Grammar) maintains semantic field coherence (L3-Semantics)
- **C1.3-C:** Pronoun clarity (L1-Grammar) enables coreference chain continuity (L3-Entity)

**Conditions:**

- **C1.3-A.1:** When vocabulary is too simple, entity distinctions collapse
- **C1.3-B.1:** When terms vary inconsistently, semantic topics fragment
- **C1.3-C.1:** When pronouns are ambiguous, entity chains break after 3-4 sentences

---

### L1 ↔ L4: Lexical-Syntactic ↔ Discourse-Pragmatic

**L1 works with L4 in capacity of:**

- **C1.4-A:** Redundancy (L1-Style) interferes with lexical chain continuity (L4-Coherence)
- **C1.4-B:** Sentence variety (L1-Style) supports discourse marker effectiveness (L4-Discourse)
- **C1.4-C:** Readability scores (L1-Style) constrain paragraph transition complexity (L4-Coherence)

**Conditions:**

- **C1.4-A.1:** When key terms repeat >8 times, lexical chains become monotonic
- **C1.4-B.1:** When sentences are uniform length, discourse markers lose contrastive function
- **C1.4-C.1:** When Flesch score <30, transitions require explicit markers every 2-3 paragraphs

---

### L1 ↔ L5: Lexical-Syntactic ↔ Argumentative-Rhetorical

**L1 works with L5 in capacity of:**

- **C1.5-A:** Active voice ratio (L1-Style) strengthens Toulmin warrant force (L5-Argumentation)
- **C1.5-B:** Sentence variety (L1-Style) distinguishes claims from evidence (L5-Argumentation)
- **C1.5-C:** Vocabulary sophistication (L1-Style) enables cognitive level encoding (L5-Argumentation)

**Conditions:**

- **C1.5-A.1:** When passive voice >40%, warrants lose agent accountability
- **C1.5-B.1:** When sentence structures are uniform, claim-evidence boundaries blur
- **C1.5-C.1:** When vocabulary is below grade 14, Analysis/Evaluation levels become inaccessible

---

### L1 ↔ L6: Lexical-Syntactic ↔ Meta-Textual

**L1 works with L6 in capacity of:**

- **C1.6-A:** Readability scores (L1-Style) determine audience accessibility (L6-Meta)
- **C1.6-B:** Redundancy patterns (L1-Style) signal structural repetition at document level (L6-Meta)
- **C1.6-C:** Active voice distribution (L1-Style) reveals authorial stance consistency (L6-Meta)

**Conditions:**

- **C1.6-A.1:** When Gunning Fog >18, target audience narrows to specialists only
- **C1.6-B.1:** When redundancy >15% of content, document-level revision needed
- **C1.6-C.1:** When active voice varies >20% across sections, stance inconsistency detected

---

### L2 ↔ L3: Structural-Organizational ↔ Semantic-Entity

**L2 works with L3 in capacity of:**

- **C2.3-A:** Section ordering (L2-Structural) constrains topic consistency (L3-Semantics)
- **C2.3-B:** Forward references (L2-Structural) enable entity salience planning (L3-Entity)
- **C2.3-C:** IMRD conformity (L2-Structural) determines semantic field distribution (L3-Semantics)

**Conditions:**

- **C2.3-A.1:** When sections are misordered, topic models fragment (cosine similarity <0.4)
- **C2.3-B.1:** When forward references >12, entity introduction becomes premature
- **C2.3-C.1:** When IMRD is violated, semantic fields mix inappropriately (Methods in Results)

---

### L2 ↔ L4: Structural-Organizational ↔ Discourse-Pragmatic

**L2 works with L4 in capacity of:**

- **C2.4-A:** Topic sentences (L2-Structural) anchor paragraph transitions (L4-Coherence)
- **C2.4-B:** Section ordering (L2-Structural) determines discourse marker type distribution (L4-Discourse)
- **C2.4-C:** Intro-conclusion alignment (L2-Structural) requires lexical chain closure (L4-Coherence)

**Conditions:**

- **C2.4-A.1:** When topic sentences are missing, transitions cannot establish backward reference
- **C2.4-B.1:** When sections follow chronological order, temporal markers dominate; when logical order, causal markers dominate
- **C2.4-C.1:** When intro-conclusion misalignment >30%, lexical chains fail to close

---

### L2 ↔ L5: Structural-Organizational ↔ Argumentative-Rhetorical

**L2 works with L5 in capacity of:**

- **C2.5-A:** Section ordering (L2-Structural) constrains Toulmin structure sequencing (L5-Argumentation)
- **C2.5-B:** IMRD conformity (L2-Structural) determines evidence distribution (L5-Argumentation)
- **C2.5-C:** Cross-references (L2-Structural) enable warrant triangulation (L5-Argumentation)

**Conditions:**

- **C2.5-A.1:** When Claim precedes Methods, Grounds/Evidence become inaccessible
- **C2.5-B.1:** When Results section is missing, Claims-Evidence alignment fails
- **C2.5-C.1:** When cross-references <5, warrant support cannot accumulate across sections

---

### L2 ↔ L6: Structural-Organizational ↔ Meta-Textual

**L2 works with L6 in capacity of:**

- **C2.6-A:** IMRD conformity (L2-Structural) signals genre adherence (L6-Meta)
- **C2.6-B:** Forward reference density (L2-Structural) indicates document self-reference load (L6-Meta)
- **C2.6-C:** Section balance (L2-Structural) reveals content distribution strategy (L6-Meta)

**Conditions:**

- **C2.6-A.1:** When IMRD is violated, genre expectations fail (engineering paper read as essay)
- **C2.6-B.1:** When forward references >10% of sentences, self-reference burden becomes high
- **C2.6-C.1:** When one section >50% of document, content imbalance signals structural flaw

---

### L3 ↔ L4: Semantic-Entity ↔ Discourse-Pragmatic

**L3 works with L4 in capacity of:**

- **C3.4-A:** Topic consistency (L3-Semantics) enables lexical chain continuity (L4-Coherence)
- **C3.4-B:** Entity salience (L3-Entity) determines discourse marker selection (L4-Discourse)
- **C3.4-C:** Coreference chains (L3-Entity) support paragraph transitions (L4-Coherence)

**Conditions:**

- **C3.4-A.1:** When topic cosine similarity <0.5, lexical chains cannot bridge sections
- **C3.4-B.1:** When entity salience is high, contrast markers ("however") become ineffective; continuity markers ("moreover") required
- **C3.4-C.1:** When coreference chains break, paragraph transitions require full entity re-introduction

---

### L3 ↔ L5: Semantic-Entity ↔ Argumentative-Rhetorical

**L3 works with L5 in capacity of:**

- **C3.5-A:** Topic consistency (L3-Semantics) constrains thesis scope (L5-Argumentation)
- **C3.5-B:** Entity salience (L3-Entity) determines claim-making authority (L5-Argumentation)
- **C3.5-C:** Semantic similarity (L3-Semantics) enables counter-argument detection (L5-Argumentation)

**Conditions:**

- **C3.5-A.1:** When topic consistency <0.6, thesis becomes too broad to support
- **C3.5-B.1:** When low-salience entities make claims, warrant burden increases 2×
- **C3.5-C.1:** When semantic similarity to prior arguments >0.8, redundant argumentation detected

---

### L3 ↔ L6: Semantic-Entity ↔ Meta-Textual

**L3 works with L6 in capacity of:**

- **C3.6-A:** Topic consistency (L3-Semantics) determines document coherence rating (L6-Meta)
- **C3.6-B:** Entity salience distribution (L3-Entity) reveals focus balance (L6-Meta)
- **C3.6-C:** Semantic field stability (L3-Semantics) indicates domain expertise level (L6-Meta)

**Conditions:**

- **C3.6-A.1:** When topic consistency <0.5 across sections, document coherence rated "poor"
- **C3.6-B.1:** When one entity accounts for >40% salience, focus imbalance detected
- **C3.6-C.1:** When semantic fields mix domain-specific and general vocabulary inconsistently, expertise credibility weakens

---

### L4 ↔ L5: Discourse-Pragmatic ↔ Argumentative-Rhetorical

**L4 works with L5 in capacity of:**

- **C4.5-A:** Discourse markers (L4-Discourse) signal Toulmin structure boundaries (L5-Argumentation)
- **C4.5-B:** Paragraph transitions (L4-Coherence) enable warrant accumulation (L5-Argumentation)
- **C4.5-C:** Lexical chains (L4-Coherence) support evidence grounding (L5-Argumentation)

**Conditions:**

- **C4.5-A.1:** When "therefore" markers are used, Warrant → Claim transitions expected
- **C4.5-A.2:** When "however" markers are used, Counter-Argument → Rebuttal transitions expected
- **C4.5-B.1:** When paragraph transitions are weak, warrants cannot bridge to subsequent claims
- **C4.5-C.1:** When lexical chains break, evidence loses connection to claims across distance >2 paragraphs

---

### L4 ↔ L6: Discourse-Pragmatic ↔ Meta-Textual

**L4 works with L6 in capacity of:**

- **C4.6-A:** Discourse marker density (L4-Discourse) determines reader guidance load (L6-Meta)
- **C4.6-B:** Paragraph transition quality (L4-Coherence) affects document readability perception (L6-Meta)
- **C4.6-C:** Lexical chain density (L4-Coherence) indicates document integration level (L6-Meta)

**Conditions:**

- **C4.6-A.1:** When discourse markers <1 per 5 paragraphs, reader guidance rated "insufficient"
- **C4.6-A.2:** When discourse markers >1 per paragraph, reader guidance rated "excessive"
- **C4.6-B.1:** When >50% transitions are weak, document readability perception drops by grade level
- **C4.6-C.1:** When lexical chain density <0.3, document integration rated "fragmented"

---

### L5 ↔ L6: Argumentative-Rhetorical ↔ Meta-Textual

**L5 works with L6 in capacity of:**

- **C5.6-A:** Toulmin completeness (L5-Argumentation) determines persuasiveness rating (L6-Meta)
- **C5.6-B:** Cognitive level (L5-Argumentation) constrains target audience (L6-Meta)
- **C5.6-C:** Claims-evidence ratio (L5-Argumentation) signals rhetorical strategy (L6-Meta)

**Conditions:**

- **C5.6-A.1:** When Warrants present for <60% of claims, persuasiveness rated "weak"
- **C5.6-B.1:** When cognitive level is Analysis, target audience = advanced undergrad+
- **C5.6-B.2:** When cognitive level is Evaluation, target audience = graduate+
- **C5.6-C.1:** When claims:evidence ratio >2:1, rhetorical strategy rated "assertion-heavy"
- **C5.6-C.2:** When claims:evidence ratio <1:2, rhetorical strategy rated "data-heavy"

---

## Cross-Layer Dependencies (Tertiary)

### Three-Layer Interactions

**L1 × L3 × L5:**

- Vocabulary sophistication (L1) + Entity salience (L3) → Claim authority (L5)
- *Condition:* When vocab is high AND entity is salient, claim requires less warrant support

**L2 × L4 × L5:**

- Section ordering (L2) + Discourse markers (L4) → Argumentative progression (L5)
- *Condition:* When IMRD is followed AND markers are dense, Toulmin structure emerges naturally

**L3 × L4 × L6:**

- Topic consistency (L3) + Lexical chains (L4) → Document coherence (L6)
- *Condition:* When topics are stable AND chains are continuous, global coherence >0.8

**L1 × L2 × L6:**

- Readability (L1) + Structure conformity (L2) → Genre recognition (L6)
- *Condition:* When Flesch is appropriate AND IMRD conforms, genre is correctly identified

**L4 × L5 × L6:**

- Transitions (L4) + Warrants (L5) → Persuasive force (L6)
- *Condition:* When transitions are strong AND warrants are complete, persuasiveness >0.85

---

## Integration Principles

### Principle 1: Bottom-Up Constraint Propagation

**Lower layers constrain upper layers**

- L1 errors propagate to L2-L6
- Grammar errors → structural ambiguity → semantic confusion → discourse breakdown → argumentative failure

### Principle 2: Top-Down Requirement Flow

**Upper layers impose requirements on lower layers**

- L6 goals → L5 argumentative needs → L4 discourse patterns → L3 entity tracking → L2 structural choices → L1 lexical selection

### Principle 3: Horizontal Coherence

**Adjacent layers must maintain consistency**

- L2-L3: Structure must support semantic organization
- L3-L4: Semantics must enable discourse flow
- L4-L5: Discourse must scaffold argumentation

### Principle 4: Diagonal Dependencies

**Non-adjacent layers interact through mediation**

- L1 affects L5 through L3 (vocabulary → entities → claims)
- L2 affects L6 through L4 (structure → discourse → global impression)

---

## Measurement Framework

### Layer Health Scores

**L1 Score** = f(Grammar defects, Style issues)

**L2 Score** = f(Structural defects, Organizational issues)

**L3 Score** = f(Semantic inconsistencies, Entity tracking failures)

**L4 Score** = f(Discourse marker gaps, Coherence breaks)

**L5 Score** = f(Toulmin incompleteness, Evidence deficiencies)

**L6 Score** = f(L1, L2, L3, L4, L5) via weighted integration

### Inter-Layer Coupling Strength

Coupling(Li, Lj) = number of active capacity relationships × average condition satisfaction rate

**Empirical Findings (Climate Policy Paper):**

- Strongest coupling: L4 ↔ L5 (0.82)
- Weakest coupling: L1 ↔ L6 (0.43)
- Most critical path: L2 → L4 → L5 → L6
- Highest failure propagation: L3 breaks → L4 failures (0.76 correlation)

---

## Application to Diagnostic Analysis

The 382 deficiencies identified in the parent page distribute across layers:

- **L1:** 42 deficiencies (11%)
- **L2:** 71 deficiencies (19%)
- **L3:** 19 deficiencies (5%)
- **L4:** 164 deficiencies (43%)
- **L5:** 86 deficiencies (22%)
- **L6:** Computed from propagation (not directly measured)

**Critical Path Analysis:**

L4 (Discourse-Pragmatic) failures cascade to L5 (Argumentation) with 0.76 propagation rate. Priority: fix L4 first to prevent L5 degradation.

**Optimization Strategy:**

Address deficiencies in order: L1 → L3 → L2 → L4 → L5 → L6

Rationale: Minimize upward propagation before addressing dependent layers.

---

**Framework Version:** 1.0

**Date:** November 10, 2025

**Source:** Measure-Driven Exhaustive Diagnosis (62 measures, 8 categories → 6 layers)