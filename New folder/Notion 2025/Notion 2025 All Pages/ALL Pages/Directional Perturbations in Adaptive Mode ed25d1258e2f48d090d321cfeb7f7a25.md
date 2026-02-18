# Directional Perturbations in Adaptive Mode

## Overview

Adaptive Mode enables **measure perturbations** that can flow in multiple directions across the hierarchical structure. Unlike Forward Mode (strictly top-down) and Reverse Mode (strictly bottom-up), Adaptive Mode supports **lateral**, **local**, **cross-scale**, and **compositional** adjustments while maintaining measure-theoretic constraints.

This document catalogs all possible directional flows for perturbations in the measure-theoretic multi-scale compositional framework.

---

## The Four Primary Perturbation Directions

### 1. Lateral Perturbations (Sibling-to-Sibling)

**Direction**: Horizontal within a single scale level

**Structure**: Among children $\{C_1, C_2, \ldots, C_m\}$ sharing parent $P \in \mathcal{F}_{k-1}$

**Word Count Redistribution**:

$$
\mu_w^{\text{new}}(C_i) = \mu_w^{\text{old}}(C_i) + \Delta\mu_w(C_i)
$$

**Conservation Constraint**:

$$
\sum_{i=1}^{m} \Delta\mu_w(C_i) = 0
$$

This ensures the parent measure remains unchanged:

$$
\mu_w(P) = \sum_{i=1}^{m} \mu_w^{\text{new}}(C_i) = \sum_{i=1}^{m} \mu_w^{\text{old}}(C_i)
$$

**Use Cases**:

- Balancing chapter lengths while keeping total part word count fixed
- Redistributing resources among parallel sections
- Rebalancing workload across team members at same level

**Example**: Three chapters in a part

- Chapter 1: 5000 words → 4500 words (Δ = -500)
- Chapter 2: 3000 words → 3800 words (Δ = +800)
- Chapter 3: 4000 words → 3700 words (Δ = -300)
- Part total: 12000 words → 12000 words (unchanged)

---

### 2. Vertical Perturbations (Parent-Child)

**Direction**: Up or down the scale hierarchy

**Downward Perturbations** (Parent → Children):

**Structure**: Parent $P \in \mathcal{F}_{k-1}$ changes, propagates to children $\{C_1, \ldots, C_m\} \subset \mathcal{F}_k$

$$
\mu_w^{\text{new}}(P) = \mu_w^{\text{old}}(P) + \Delta\mu_w(P)
$$

**Propagation Rule**: Maintain allocation fractions $\alpha_i$

$$
\mu_w^{\text{new}}(C_i) = \alpha_i \cdot \mu_w^{\text{new}}(P)
$$

where $\sum_{i=1}^{m} \alpha_i = 1$

**Constraint**: Parent's perturbation must satisfy conservation at grandparent level (this is actually a lateral constraint at the parent's scale)

**Use Cases**:

- Expanding a chapter and proportionally expanding all sections
- Scaling a subtree uniformly

---

**Upward Perturbations** (Children → Parent):

This is **automatic** due to countable additivity:

$$
\mu_w(P) = \sum_{i=1}^{m} \mu_w(C_i)
$$

If children change (via lateral or other perturbations), parent automatically adjusts.

**Key Insight**: Upward perturbations are not independent—they are **consequences** of changes at finer scales.

---

### 3. Cross-Subtree Perturbations

**Direction**: Between nodes in different branches of the hierarchy

**Structure**: Transfer measure between nodes $A \in \mathcal{F}_k$ and $B \in \mathcal{F}_k$ that do not share an immediate parent

**Constraint**: Must find the **lowest common ancestor** (LCA) node $L$ such that $A, B \subset L$

**Decomposition**: This is equivalent to a composition of:

1. Upward aggregation from $A$ to LCA $L$
2. Lateral redistribution at LCA children level
3. Downward propagation to $B$

**Conservation**: Total measure at LCA is preserved

$$
\mu_w(L) = \text{constant}
$$

**Use Cases**:

- Moving content from one chapter to another in different parts
- Rebalancing across distant sections of document
- Cross-departmental resource reallocation

**Example**: Transfer words from Chapter 2.3 (Part 2) to Chapter 5.1 (Part 5)

- LCA = Document root $\Omega$
- This affects: Chapter 2.3, Chapter 2, Part 2, Root, Part 5, Chapter 5, Chapter 5.1
- All intermediate parents adjust via countable additivity

---

### 4. Compositional Perturbations (Tone Reallocation)

**Direction**: Within the compositional space $\mathcal{T} = \{\tau_1, \ldots, \tau_m\}$ at a fixed node

**Structure**: At node $A$, reallocate tone measures while keeping word count fixed

**Fixed Word Count**:

$$
\mu_w(A) = \text{constant}
$$

**Tone Measure Adjustments**:

$$
\mu_j^{\text{new}}(A) = \mu_j^{\text{old}}(A) + \Delta\mu_j(A)
$$

**Compositional Constraint** (completeness):

$$
\sum_{j=1}^{m} \Delta\mu_j(A) = 0
$$

This ensures:

$$
\sum_{j=1}^{m} \mu_j^{\text{new}}(A) = \mu_w(A) = \sum_{j=1}^{m} \mu_j^{\text{old}}(A)
$$

**Composition Changes**:

$$
c_A^{(j),\text{new}} = \frac{\mu_j^{\text{new}}(A)}{\mu_w(A)} = c_A^{(j),\text{old}} + \frac{\Delta\mu_j(A)}{\mu_w(A)}
$$

**Use Cases**:

- Shifting tone from analytical to narrative without changing length
- Rebalancing emotional vs technical content
- Adjusting formality without rewriting length

**Example**: 1000-word segment

- Analytical tone: 700 words → 600 words (Δ = -100)
- Narrative tone: 200 words → 250 words (Δ = +50)
- Descriptive tone: 100 words → 150 words (Δ = +50)
- Total: 1000 words (unchanged)

---

## Compound Perturbation Directions

### 5. Simultaneous Word Count + Compositional Perturbation

**Direction**: Both structural (word count) and compositional (tone) changes at a node

**Word Count Change**:

$$
\mu_w^{\text{new}}(A) = \mu_w^{\text{old}}(A) + \Delta\mu_w(A)
$$

**Tone Measure Changes**:

$$
\mu_j^{\text{new}}(A) = \mu_j^{\text{old}}(A) + \Delta\mu_j(A)
$$

**Decomposition**: Can be viewed as sequence of:

1. Pure word count perturbation (maintaining composition)
2. Pure compositional perturbation (at new word count)

**Composition Target Formulation**:

$$
\mu_j^{\text{new}}(A) = c_A^{(j),\text{target}} \cdot \mu_w^{\text{new}}(A)
$$

**Constraints**:

- Lateral conservation: $\sum_{\text{siblings}} \Delta\mu_w = 0$
- Completeness: $\sum_{j=1}^{m} c_A^{(j),\text{target}} = 1$

**Use Cases**:

- Expanding a section and changing its tone
- Shrinking a chapter while making it more technical

---

### 6. Cascading Perturbations

**Direction**: Multi-scale propagation

**Structure**: Initial perturbation at scale $k$ triggers adjustments at multiple scales

**Downward Cascade**:

1. Perturb parent $P \in \mathcal{F}_{k-1}$
2. Children $\{C_i\} \subset \mathcal{F}_k$ adjust proportionally
3. Grandchildren $\{G_{ij}\} \subset \mathcal{F}_{k+1}$ adjust proportionally
4. Continue to atomic segments

**Upward Cascade**:

1. Perturb atomic segment $S \in \mathcal{F}_n$
2. Parent $P_{n-1} \supset S$ adjusts (via countable additivity)
3. Grandparent $P_{n-2} \supset P_{n-1}$ adjusts
4. Continue to affected ancestor at highest level where lateral conservation permits

**Use Cases**:

- Document-wide restructuring
- Propagating local edits through hierarchy

---

### 7. Conditional Perturbations

**Direction**: Perturbations conditioned on scale-dependent rules

**Structure**: Different perturbation types at different scales

**Example Rule Set**:

- At scale $k=n$ (segments): Pure compositional perturbations only
- At scale $k=2$ (chapters): Lateral word count perturbations
- At scale $k=1$ (parts): Fixed word counts
- At scale $k=0$ (root): Fixed

**Use Cases**:

- Enforcing document-level constraints
- Preserving high-level structure while allowing low-level flexibility

---

## Constraint-Defined Perturbation Spaces

### Degrees of Freedom at Each Scale

**At scale** $k$ **with** $N_k$ **nodes**:

**Word Count Perturbation Space**:

- Dimension = $N_k - N_{k-1}$ (siblings can trade, but parent totals fixed)
- Each sibling group contributes $(m-1)$ degrees of freedom where $m$ = number of siblings

**Compositional Perturbation Space**:

- Dimension per node = $(m-1)$ where $m$ = number of tone types
- Constraint: $\sum_{j=1}^{m} c^{(j)} = 1$
- Total dimension = $N_k \cdot (m-1)$

**Total Degrees of Freedom**:

$$
\text{DOF} = (N_k - N_{k-1}) + N_k \cdot (m_{\text{tones}} - 1)
$$

---

## Mathematical Constraints on Perturbation Directions

### 1. Conservation Constraints

**Sibling Conservation**:

$$
\forall P \in \mathcal{F}_{k-1}: \quad \sum_{C \subset P} \Delta\mu_w(C) = 0
$$

**Global Tone Conservation** (optional, depending on model):

$$
\sum_{A \in \mathcal{F}_n} \Delta\mu_j(A) = 0 \quad \forall j
$$

Or allow global tone totals to change:

$$
\mu_j(\Omega)^{\text{new}} \neq \mu_j(\Omega)^{\text{old}}
$$

### 2. Non-Negativity Constraints

**Word Count Lower Bound**:

$$
\mu_w^{\text{new}}(S) \geq w_{\text{mwt}} \quad \forall S \in \mathcal{F}_n
$$

**Tone Measure Non-Negativity**:

$$
\mu_j^{\text{new}}(A) \geq 0 \quad \forall A, \forall j
$$

**Composition Bounds**:

$$
0 \leq c_A^{(j),\text{new}} \leq 1 \quad \forall A, \forall j
$$

### 3. Structural Constraints

**Partition Preservation**:

Each $\mathcal{F}_k$ remains a valid partition:

- Nodes are disjoint: $A_i \cap A_j = \emptyset$ for $i \neq j$
- Nodes cover space: $\bigcup_{i} A_i = \Omega$

**Filtration Preservation**:

$$
\mathcal{F}_0 \supset \mathcal{F}_1 \supset \cdots \supset \mathcal{F}_n
$$

Perturbations cannot violate containment relationships.

### 4. Feasibility Constraints

**Sibling Perturbation Bounds**:

For siblings ${C_1, ldots, C_m}$:

$$
\Delta\mu_w(C_i) \geq -\mu_w^{\text{old}}(C_i) + w_{\text{mwt}}
$$

$$
\Delta\mu_w(C_i) \leq \sum_{j \neq i} (\mu_w^{\text{old}}(C_j) - w_{\text{mwt}})
$$

You can only take from siblings what they can afford to give.

---

## Perturbation Algorithms

### Algorithm 1: Pure Lateral Word Count Perturbation

**Input**: Siblings ${C_1, ldots, C_m}$, target changes $\{\Delta_1, \ldots, \Delta_m\}$ with $\sum \Delta_i = 0$

**Procedure**:

1. **Validate feasibility**:
    - Check $\mu_w^{\text{old}}(C_i) + \Delta_i \geq w_{\text{mwt}}$ for all $i$
    - If infeasible, adjust $\{\Delta_i\}$ or reject
2. **Apply perturbations**:
    
    $$
    \mu_w^{\text{new}}(C_i) = \mu_w^{\text{old}}(C_i) + \Delta_i
    $$
    
3. **Propagate to descendants** (if maintaining composition):
    - For each descendant $D subset C_i$:
        
        $$
        \mu_w^{\text{new}}(D) = \mu_w^{\text{old}}(D) \cdot \frac{\mu_w^{\text{new}}(C_i)}{\mu_w^{\text{old}}(C_i)}
        $$
        
4. **Verify**: Check parent measure unchanged via countable additivity

---

### Algorithm 2: Pure Compositional Perturbation

**Input**: Node $A$, target composition $\mathbf{c}_A^{\text{target}}$

**Procedure**:

1. **Validate**: Check $\sum_{j=1}^{m} c_A^{(j),\text{target}} = 1$ and $c_A^{(j),\text{target}} \geq 0$
2. **Compute new tone measures**:
    
    $$
    \mu_j^{\text{new}}(A) = c_A^{(j),\text{target}} \cdot \mu_w(A)
    $$
    
3. **Propagate to parent** (check conservation):
    - If parent composition is constrained, verify:
        
        $$
        \sum_{C \subset P} \mu_j^{\text{new}}(C) = \mu_j^{\text{target}}(P)
        $$
        
    - If not, adjust siblings or accept parent composition change
4. **Propagate to children** (if applicable):
    - Option A: Maintain child compositions (scale tone measures proportionally)
    - Option B: Cascade target composition to children

---

### Algorithm 3: Cross-Subtree Transfer

**Input**: Source $A in mathcal{F}_k$, target $B in mathcal{F}_k$, transfer amount $\delta > 0$

**Procedure**:

1. **Find lowest common ancestor** $L$ of $A$ and $B$
2. **Identify paths**:
    - Path $\pi_A = \{A, P_A^{(k-1)}, P_A^{(k-2)}, \ldots, L\}$
    - Path $\pi_B = \{B, P_B^{(k-1)}, P_B^{(k-2)}, \ldots, L\}$
3. **Apply perturbations along paths**:
    - Decrease $A$ and all ancestors on $\pi_A$ (except $L$) by $\delta$
    - Increase $B$ and all ancestors on $\pi_B$ (except $L$) by $\delta$
    - $L$ remains unchanged
4. **Rebalance siblings**:
    - At each scale, ensure sibling groups maintain conservation
5. **Propagate to descendants**:
    - Scale descendants of $A$ and $B$ proportionally

---

### Algorithm 4: Simultaneous Structural + Compositional

**Input**: Node $A$, word count change $Deltamu_w$, target composition $\mathbf{c}_A^{\text{target}}$

**Procedure**:

1. **Apply lateral word count perturbation**:
    - Find siblings, apply Algorithm 1
    - New word count: $\mu_w^{\text{new}}(A)$
2. **Apply compositional perturbation**:
    - Use $\mathbf{c}_A^{\text{target}}$ and $\mu_w^{\text{new}}(A)$
    - Apply Algorithm 2
3. **Verify all constraints**:
    - Parent word count unchanged
    - Tone completeness maintained
    - Non-negativity satisfied

---

## Special Cases and Edge Conditions

### Perturbations at Root Scale ($k=0$)

**Word Count**: Can change total document word count

$$
\mu_w^{\text{new}}(\Omega) \neq \mu_w^{\text{old}}(\Omega)
$$

**No Conservation Constraint**: Root has no siblings

**Composition**: Can change global tone distribution

---

### Perturbations at Atomic Scale ($k=n$)

**Word Count**: Subject to minimum threshold

$$
\mu_w(S) \geq w_{\text{mwt}} \quad \forall S \in \mathcal{F}_n
$$

**Composition**: Often constrained by single-tone assumption in empirical analysis

**Aggregation**: Any change automatically propagates upward through all ancestors

---

### Zero-Measure Sets

For sets $A$ with $mu_w(A) = 0$:

- Composition $\mathbf{c}_A$ is **undefined**
- Radon-Nikodym derivative does not exist
- Cannot perform compositional perturbations
- Can increase word count from zero (creation)

---

### Boundary of Toneable Domain

Segments at threshold $mu_w(S) = w_{text{mwt}}$:

- Cannot decrease word count further
- May transition out of $\Omega_{\text{toneable}}$ if word count drops
- Special handling required for near-threshold perturbations

---

## Directional Summary Table

| **Perturbation Type** | **Direction** | **Conservation Constraint** | **Primary Use** |
| --- | --- | --- | --- |
| Lateral (Sibling) | Horizontal within scale | Parent total fixed | Rebalancing parallel nodes |
| Downward Cascade | Parent → Children → Descendants | Proportional scaling | Uniform subtree expansion/contraction |
| Upward Cascade | Children → Parent → Ancestors | Automatic via additivity | Consequence of child changes |
| Cross-Subtree | Between distant branches | LCA total fixed | Inter-branch resource transfer |
| Compositional | Within tone space at node | Word count fixed, tones sum to 1 | Tone rebalancing without length change |
| Compound | Structural + Compositional | Both constraints apply | Simultaneous length and tone adjustment |
| Root-Level | Global document | None (no siblings) | Document-wide expansion/composition shift |
| Conditional | Scale-dependent rules | Rule-specific | Enforcing hierarchical policies |

---

## Optimization Perspectives

### Perturbations as Constrained Optimization

**Objective**: Minimize distance between current and target state

$$
\min_{\{\mu_w^{\text{new}}, \{\mu_j^{\text{new}}\}\}} \sum_{A \in \mathcal{F}_k} \left\| \mathbf{c}_A^{\text{new}} - \mathbf{c}_A^{\text{target}} \right\|^2
$$

**Subject to**:

- Sibling conservation: $\sum_{C \subset P} \mu_w(C) = \mu_w(P)$
- Completeness: $\sum_j \mu_j(A) = \mu_w(A)$
- Non-negativity: $\mu_w(A), \mu_j(A) \geq 0$
- Minimum threshold: $\mu_w(S) \geq w_{\text{mwt}}$ for $S \in \mathcal{F}_n$

**Solution Space**: The set of all feasible perturbations forms a **convex polytope** in the space of measures.

---

### Gradient-Based Perturbation

**Compositional Gradient**:

$$
\nabla_{\mu_w} \mathbf{c}_A = \nabla_{\mu_w} \frac{\boldsymbol{\mu}(A)}{\mu_w(A)} = \frac{1}{\mu_w(A)^2} \left( \mu_w(A) \cdot \mathbf{I} - \boldsymbol{\mu}(A) \mathbf{1}^T \right)
$$

where $\mathbf{I}$ is the identity and $\mathbf{1}$ is the all-ones vector.

**Perturbation Direction**: Move in direction of steepest descent toward target composition.

---

## Connections to Other Frameworks

### Network Flow Perspective

Perturbations can be viewed as **flows** on a directed graph:

- Nodes = measurable sets $\{A \in \bigcup_k \mathcal{F}_k\}$
- Edges = parent-child relationships
- Flow = measure perturbations $\Delta\mu_w$
- Conservation = Kirchhoff's current law at each node

**Lateral perturbation** = horizontal flow between sibling nodes

**Vertical perturbation** = flow along parent-child edges

**Cross-subtree perturbation** = flow through LCA (multi-hop path)

---

### Stochastic Perturbations

Extend to **random perturbations**:

$$
\Delta\mu_w(A) \sim \mathcal{N}(0, \sigma^2)
$$

subject to constraints. This connects to:

- **Langevin dynamics** on measure spaces
- **Stochastic gradient descent** for compositional optimization
- **Random walk on constrained polytopes**

---

**Framework Version**: 2.0 (Measure-Theoretic)

**Related Pages**: [Measure-Theoretic Multi-Scale Compositional Framework](Measure-Theoretic%20Multi-Scale%20Compositional%20Framew%202a05559a88b34fe3a843b86ce53ac63b.md), [Directional Flows in the Multi-Scale Compositional Framework](Directional%20Flows%20in%20the%20Multi-Scale%20Compositional%20579a4b73e01a479c9221089dbcb67db1.md)

**Key Insight**: Adaptive Mode enables multidirectional perturbations constrained by measure-theoretic laws—lateral, vertical, cross-subtree, and compositional adjustments form a rich space of document transformations.