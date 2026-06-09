# Framework Overview

# 6-Layer Linguistic Framework

A comprehensive framework for text quality assessment integrating surface-level correctness through holistic document quality.

---

## Layer Definitions

| Layer | Name | Function | Key Measures |
| --- | --- | --- | --- |
| **L1** | Lexical-Syntactic | Surface form, vocabulary, sentence structure | Grammar (7), Style (6) |
| **L2** | Structural-Organizational | Document hierarchy, section logic | Structural (13) |
| **L3** | Semantic-Entity | Meaning stability, concept tracking | Semantics (3), Entity (5) |
| **L4** | Discourse-Pragmatic | Textual connection, flow markers | Discourse (4), Coherence (10) |
| **L5** | Argumentative-Rhetorical | Logical structure, persuasion | Argumentation (12) |
| **L6** | Meta-Textual | Global integration, holistic quality | Cross-layer synthesis |

---

## Inter-Layer Relationships

### Critical Paths (Highest Impact)

1. **L4 → L5 → L6**: Discourse quality → Argumentative success → Persuasive impact *(coupling: 0.82)*
2. **L2 → L4 → L5**: Structure → Discourse → Argument
3. **L3 → L4 → L6**: Meaning → Flow → Coherence *(failure propagation: 0.76)*

### Integration Principles

**Bottom-Up Constraint Propagation**

- Lower layer deficiencies propagate upward
- Grammar errors → structural ambiguity → semantic confusion → discourse breakdown

**Top-Down Requirement Flow**

- Upper layer goals impose constraints downward
- Persuasion goal → argument needs → discourse patterns → lexical selection

**Horizontal Coherence**

- Adjacent layers must align (L2↔L3, L3↔L4, L4↔L5)

---

## Key Pairwise Interactions

### L1 ↔ L5: Form Carries Force

- Active voice assigns agency and responsibility
- Sentence variety distinguishes claim types
- Vocabulary sophistication signals authority

### L2 ↔ L5: Structure Sequences Argument

- Section ordering constrains claim-evidence sequencing
- Structural hierarchy reflects argumentative importance
- Reference systems enable warrant triangulation

### L4 ↔ L5: Connection Scaffolds Argument

- Discourse markers signal logical relationships (*"therefore" = warrant→claim*)
- Transition quality enables warrant bridging
- Lexical chains support evidence grounding

---

## Deficiency Distribution (Climate Policy Paper)

| Layer | Count | Percentage |
| --- | --- | --- |
| L1 (Lexical-Syntactic) | 42 | 11% |
| L2 (Structural) | 71 | 19% |
| L3 (Semantic-Entity) | 19 | 5% |
| L4 (Discourse-Pragmatic) | 164 | **43%** |
| L5 (Argumentative) | 86 | 22% |

> **Key Finding**: L4 failures cascade to L5 with 0.76 propagation rate. Priority: fix L4 first.
> 

---

## Optimization Strategy

**Recommended Order**: L1 → L3 → L2 → L4 → L5 → L6

**Rationale**: Fix foundations before building upward; minimize upward propagation.

---

*Framework Version: 2.0 | Total measures: 61 across 8 categories*