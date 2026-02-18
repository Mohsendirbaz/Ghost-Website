# Conceptual Review: Minimum Compositional Unit — Boundary Condition vs. Discrete Control Volume

## Issue Summary

The framework defines a minimum word threshold $w_{\text{mwt}}$ but does not explicitly specify whether this represents:

**A)** A **boundary condition** (minimum threshold for eligibility)

**B)** A **discrete control volume** (fixed uniform unit size for analysis)

This distinction has profound implications for measurement protocols, computational complexity, resolution consistency, and the physical interpretation of the framework.

---

## Core Distinction

### Approach A: Minimum Threshold (Boundary Condition)

**Conceptual Model**: Eligibility criterion

- $w_{\text{mwt}}$ defines the **minimum size** below which tone classification is unreliable
- Segments **above** this threshold can be **any size**
- Variable-resolution analysis: large sections analyzed as wholes; small sections may be aggregated
- **Analogy**: Temperature threshold for phase change — defines a boundary, not a discrete state

**Eligibility Rule**:

$$
\text{Node } \mathcal{N} \text{ is toneable} \iff w(\mathcal{N}) \geq w_{\text{mwt}}
$$

**Key Properties**:

- **Granularity**: Variable (adaptive to natural text structure)
- **Resolution**: Non-uniform (respects document hierarchy)
- **Sampling**: Opportunistic (classify whatever units exist)
- **Determinism**: Moderate (depends on how text is pre-segmented)

---

### Approach B: Fixed Control Volume (Discrete Unit)

**Conceptual Model**: Uniform mesh cell

- $w_{\text{mwt}}$ defines a **standard unit size** for compositional measurement
- All analysis performed on **uniformly-sized** segments of exactly $w_{\text{mwt}}$ words
- Comparable to control volumes in computational fluid dynamics meshing
- **Analogy**: Pixel in digital imaging — fixed resolution cells

**Discretization Rule**:

$$
\text{Node } \mathcal{N} \text{ with } w(\mathcal{N}) \text{ words} \rightarrow \left\lfloor \frac{w(\mathcal{N})}{w_{\text{mwt}}} \right\rfloor \text{ control volumes}
$$

**Key Properties**:

- **Granularity**: Fixed (uniform across entire document)
- **Resolution**: Uniform (constant measurement scale)
- **Sampling**: Systematic (regular grid)
- **Determinism**: High (independent of text structure)

---

## Detailed Comparison

### 1. Measurement Protocol

| **Aspect** | **Approach A: Boundary Condition** | **Approach B: Control Volume** |
| --- | --- | --- |
| **Sampling strategy** | Classify natural segments (paragraphs, subsections) if they exceed $w_{\text{mwt}}$ | Subdivide all text into fixed $w_{\text{mwt}}$-word chunks regardless of structure |
| **Handling large sections** | Classify entire section as single unit (one tone assignment per 5,000-word chapter) | Subdivide into multiple control volumes (50 units if $w_{\text{mwt}} = 100$) |
| **Handling small sections** | Skip if below threshold, or aggregate with neighbors | Combine with adjacent text to form complete control volume |
| **Example**: 850-word section, $w_{\text{mwt}} = 100$ | Classify as **1 unit** (one tone for entire 850 words) | Classify as **8 control volumes** of 100 words + 50-word remainder |

---

### 2. Compositional Calculation

### Approach A: Weighted by Natural Segments

For a node with heterogeneous natural segments:

$$
c_{i,k}^{(j)} = \frac{\displaystyle \sum_{\substack{s \subset \mathcal{N}_{i,k} \\ w_s \geq w_{\text{mwt}}}} \mathbb{1}_{\tau_j}(s) \cdot w_s}{\displaystyle \sum_{\substack{s \subset \mathcal{N}_{i,k} \\ w_s \geq w_{\text{mwt}}}} w_s}
$$

**Interpretation**:

- If a 1,000-word section contains two natural subsections (700 Academic, 300 Technical)
- Result: $c^{(A)} = 0.7, \; c^{(T)} = 0.3$
- **Coarse-grained**: Two measurements

### Approach B: Uniform Control Volume Grid

For the same node subdivided into control volumes:

$$
c_{i,k}^{(j)} = \frac{1}{N_{\text{cv}}} \sum_{\text{cv}=1}^{N_{\text{cv}}} \mathbb{1}_{\tau_j}(\text{cv})
$$

where $N_{\text{cv}} = \lfloor w_{i,k} / w_{\text{mwt}} \rfloor$ is the number of control volumes.

**Interpretation**:

- Same 1,000-word section subdivided into 10 control volumes of 100 words each
- Result: $c^{(A)} = 0.75, \; c^{(T)} = 0.25$ (if 7.5 CV's are Academic, 2.5 are Technical)
- **Fine-grained**: Ten measurements

**Critical Difference**: Control volumes can reveal **internal heterogeneity** that boundary-condition approach averages over.

---

### 3. Resolution and Information Content

| **Property** | **Approach A** | **Approach B** |
| --- | --- | --- |
| **Spatial resolution** | Variable (coarse at high scales, fine at low scales) | Uniform ($w_{\text{mwt}}$ everywhere) |
| **Measurements per 10,000-word document** ($w_{\text{mwt}} = 100$) | Depends on structure (maybe 20–50 natural segments) | Exactly 100 control volumes |
| **Can detect micro-transitions?** | No (averaged within large segments) | Yes (each CV measured independently) |
| **Respects semantic boundaries?** | Yes (paragraph, section breaks preserved) | No (cuts across natural boundaries) |
| **Statistical variance** | Lower (fewer, larger samples) | Higher (more, smaller samples) |

**Trade-off**:

- **Boundary condition** preserves document structure but sacrifices resolution
- **Control volume** gains uniform resolution but ignores semantic structure

---

### 4. Implications for Framework Determinism

### Approach A: Structure-Dependent Determinism

**Advantages**:

- Respects authorial intent (paragraph boundaries, section divisions)
- Natural units align with how humans perceive document structure
- Computationally efficient (fewer classification calls)

**Disadvantages**:

- Non-reproducible across different document structures
- Two documents with identical content but different formatting yield different compositions
- Example: A 500-word passage as one paragraph vs. five 100-word paragraphs may yield different tone fractions

**Determinism Level**: **Moderate** — depends on pre-existing segmentation

---

### Approach B: Structure-Independent Determinism

**Advantages**:

- Reproducible regardless of formatting
- Uniform sampling density across all scales
- Directly comparable metrics (every measurement is a 100-word unit)
- Enables pixel-like "composition heatmaps"

**Disadvantages**:

- Computationally expensive (10× more classifications for same document)
- May split semantically coherent passages mid-sentence
- Arbitrary boundaries can misrepresent tone (a sentence split across two CV's)
- Ignores natural document structure

**Determinism Level**: **High** — independent of document structure

---

### 5. Physical/Operational Interpretation

| **Interpretation** | **Approach A** | **Approach B** |
| --- | --- | --- |
| $w_{\text{mwt}}$ **means...** | "Don't classify anything smaller than this" (exclusion rule) | "Measure everything in units of this size" (discretization grid) |
| **Compositional tensor** $\mathbf{C}_{i,k}$ **represents...** | Weighted average of heterogeneous natural segments | Fraction of control volumes with each tone |
| **Shear** $\boldsymbol{\tau}_{i,k}$ **measures...** | Deviation of aggregate segment composition from parent | Deviation of averaged CV composition from parent |
| **Heterogeneity** $\sigma^2$ **reflects...** | Variance among large natural chunks | Variance among uniform small cells |
| **"Intensity field"** $I_{i,k}^{(j)}$ **is...** | Total words of tone $\tau_j$ in eligible segments | Number of CV's with tone $\tau_j$ times $w_{\text{mwt}}$ |

---

### 6. Numerical Example: 1,200-Word Chapter

**Setup**:

- Chapter structure: Introduction (200 words, Academic) + Method (400 words, Technical) + Results (400 words, Technical) + Discussion (200 words, General)
- $w_{\text{mwt}} = 100$ words

### Approach A: Boundary Condition

**Natural segments** (all ≥ 100, so all classified):

- 4 segments: 200A, 400T, 400T, 200G

**Composition**:

$$
c^{(A)} = \frac{200}{1200} = 0.167, \quad
c^{(T)} = \frac{800}{1200} = 0.667, \quad
c^{(G)} = \frac{200}{1200} = 0.167
$$

**Measurements**: 4 tone classifications

---

### Approach B: Control Volume

**Uniform grid**: 12 control volumes of 100 words each

Assuming tone boundaries align with CV boundaries (for simplicity):

- CV 1–2: Academic (200 words)
- CV 3–6: Technical (400 words)
- CV 7–10: Technical (400 words)
- CV 11–12: General (200 words)

**Composition**:

$$
c^{(A)} = \frac{2}{12} = 0.167, \quad
c^{(T)} = \frac{8}{12} = 0.667, \quad
c^{(G)} = \frac{2}{12} = 0.167
$$

**Measurements**: 12 tone classifications

**Result**: Same composition (because natural boundaries aligned with CV grid in this example), but **3× more computational cost**.

---

### Non-Aligned Scenario

Now suppose the Introduction has a 150-word Academic passage followed by a 50-word Technical transition.

**Approach A**: Still classifies entire 200-word intro as one segment → dominant tone **Academic**

**Approach B**:

- CV 1: 100 words Academic
- CV 2: 50 Academic + 50 Technical → classification depends on which dominates this specific 100-word window

Result: **Different compositions** because Approach B detects the micro-transition.

---

## Implications for Framework Design

### If We Choose Approach A (Boundary Condition)

**Framework becomes**:

- **Adaptive resolution**: respects document hierarchy
- **Structure-preserving**: maintains semantic units
- **Efficient**: fewer classification calls
- **Operationalizable**: works with existing documents as-is

**Required clarifications**:

1. Explicitly state that $w_{\text{mwt}}$ is a **minimum threshold**, not a **unit size**
2. Define rules for handling segments below threshold (skip? aggregate?)
3. Acknowledge that composition depends on pre-existing segmentation
4. Add note that different document structures yield non-comparable metrics

**Update to Section 1.3**:

> **Minimum Compositional Unit**: $w_{\text{mwt}}$ defines the **minimum word count** for reliable tone classification. Segments smaller than this threshold are excluded from analysis or aggregated with adjacent segments. Toneable segments may be **any size** ≥ $w_{\text{mwt}}$, and natural document structure (paragraphs, subsections) is preserved during measurement.
> 

---

### If We Choose Approach B (Control Volume)

**Framework becomes**:

- **Fixed resolution**: uniform measurement grid
- **Structure-agnostic**: reproducible across formats
- **High-resolution**: detects fine-grained transitions
- **Computationally intensive**: many more classifications

**Required clarifications**:

1. Explicitly state that $w_{\text{mwt}}$ defines a **standard control volume size**
2. Define rules for handling remainders (final partial CV)
3. Acknowledge that natural boundaries may be split mid-sentence
4. Justify why uniform grid is worth the computational cost

**Update to Section 1.3**:

> **Minimum Compositional Unit**: $w_{\text{mwt}}$ defines a **fixed control volume size** for compositional measurement. All text is subdivided into uniform segments of exactly $w_{\text{mwt}}$ words, analogous to mesh cells in computational fluid dynamics. Composition is measured by classifying each control volume independently, yielding uniform spatial resolution across the entire document hierarchy.
> 

---

## Current Framework Status

### ✅ As Written (Section 1.3)

> "Define minimum word threshold for tone assignment: $w_{\text{mwt}} = \text{minimum word count eligible for tone assignment}$"
> 

**Interpretation**: Leans toward **Approach A** (boundary condition), but ambiguous.

### ✅ Section 4.2 (Reverse Mode)

Step 2: "Sample text at each toneable node."

Step 3: "Classify dominant tone for segments with length ≥ $w_{\text{mwt}}$."

**Interpretation**: Treats natural "nodes" as units → **Approach A**.

But Step 4 mentions "segments $s \subset \mathcal{N}_{i,k}$" without specifying whether these are:

- Natural subsections (Approach A)
- Fixed control volumes (Approach B)

### ⚠️ Ambiguity in Equation (Section 4.2)

$$
c_{i,k}^{(j)} = \frac{\displaystyle \sum_{\text{segments } s \subset \mathcal{N}_{i,k}} \mathbb{1}_{\tau_j}(s) \cdot w_s}{w_{i,k}}
$$

**Question**: Are "segments $s$" :

- Natural subsections of varying sizes? (Approach A)
- Uniform control volumes of size $w_{\text{mwt}}$? (Approach B)

The formula **works for either**, but the **interpretation differs**.

---

## Recommendations

### 1. Explicitly Choose an Approach

The framework **must** specify which interpretation is canonical.

**Recommendation**: **Choose Approach A (Boundary Condition)** for initial implementation because:

1. **Aligns with stated scope**: "modifying existing passages" (Section before §1) — works with existing document structure
2. **Computationally feasible**: fewer classification calls
3. **Semantically meaningful**: respects authorial divisions
4. **Current equations already assume it**: "toneable node" suggests natural segments

---

### 2. Add Explicit Definition to Section 1.3

Replace current text with:

---

**Section 1.3: Minimum Compositional Unit**

Define minimum word threshold for tone assignment:

$$
w_{\text{mwt}} = \text{minimum word count for reliable tone classification}
$$

Example: $w_{\text{mwt}} = 50$ or $100$ words.

**Interpretation**: $w_{\text{mwt}}$ serves as a **boundary condition** (eligibility threshold), not a **fixed discretization unit**.

**Eligibility Criterion**:

$$
\text{Segment } s \text{ is toneable} \iff w(s) \geq w_{\text{mwt}}
$$

**Segmentation Protocol**:

- Text is segmented according to **natural document structure** (paragraphs, subsections, sections)
- Each natural segment with $w \geq w_{\text{mwt}}$ is classified for tone
- Segments below threshold are either:
    - **Excluded** from composition calculation (conservative), or
    - **Aggregated** with adjacent segments to form toneable units (inclusive)
- Toneable segments may be **any size** ≥ $w_{\text{mwt}}$; uniformity is **not** required

**Implication**: Composition measurements are **structure-dependent**. Documents with different segmentations (e.g., many short paragraphs vs. few long paragraphs) may yield different $\mathbf{C}_{i,k}$ values even if the raw text is similar.

**Alternative Interpretation (Control Volume Model)**: See Conceptual Review: Boundary Condition vs. Control Volume for discussion of a fixed-resolution discretization approach.

---

### 3. Update Section 4.2 (Reverse Mode)

Clarify Step 2:

> **2. Segment and classify:**
> 

> FOR each node $\mathcal{N}_{i,k}$:
> 

> - Identify natural subsegments (paragraphs, subsections) within the node
> 

> - FOR each subsegment $s$ with $w_s \geq w_{\text{mwt}}$:
> 

> - Classify dominant tone: $\text{tone}(s) \in \mathcal{T}$
> 

> - Subsegments with $w_s < w_{\text{mwt}}$ are skipped (or aggregated with neighbors)
> 

---

### 4. Add Discussion of Control Volume Alternative

In **Section 9 (Extensions and Future Directions)**, add:

**9.5 Control Volume Discretization**

The current framework treats $w_{\text{mwt}}$ as a boundary condition (minimum eligibility threshold) and preserves natural document structure. An **alternative formulation** would treat $w_{\text{mwt}}$ as a **fixed control volume size**, subdividing all text into uniform $w_{\text{mwt}}$-word cells for analysis.

**Trade-offs**:

- **Gains**: Uniform resolution, structure-independent determinism, fine-grained transition detection
- **Costs**: Higher computational expense, loss of semantic boundaries, potential mid-sentence splits

**When control volumes are preferable**:

- Comparing documents with vastly different structures
- Generating composition "heatmaps" at pixel-like resolution
- Studying micro-scale tone transitions within passages

**Implementation**: Replace natural segmentation with uniform grid:

$$
N_{\text{cv}} = \left\lfloor \frac{w_{i,k}}{w_{\text{mwt}}} \right\rfloor, \quad
c_{i,k}^{(j)} = \frac{1}{N_{\text{cv}}} \sum_{\text{cv}=1}^{N_{\text{cv}}} \mathbb{1}_{\tau_j}(\text{cv})
$$

See Conceptual Review: Boundary Condition vs. Control Volume for detailed comparison.

---

## Summary Table: Decision Matrix

| **Criterion** | **Approach A: Boundary Condition** | **Approach B: Control Volume** | **Recommended** |
| --- | --- | --- | --- |
| **Respects document structure** | ✅ Yes | ❌ No | A |
| **Reproducible across formats** | ❌ No | ✅ Yes | B |
| **Computational efficiency** | ✅ High | ❌ Low | A |
| **Detects micro-transitions** | ❌ No | ✅ Yes | B |
| **Aligns with stated scope** | ✅ Yes ("modifying existing passages") | ⚠️ Partial | A |
| **Uniform spatial resolution** | ❌ No | ✅ Yes | B |
| **Semantically meaningful units** | ✅ Yes | ❌ No | A |
| **Easy to implement** | ✅ Yes | ⚠️ Moderate | A |

**Overall Recommendation**: **Approach A (Boundary Condition)** as the primary framework, with Approach B documented as an extension for specialized use cases.

---

## Conclusion

**Status**: ⚠️ **Framework currently ambiguous**

**Action Required**:

1. ✏️ **Explicit choice** in Section 1.3: $w_{\text{mwt}}$ is a **boundary condition** (threshold), not a **control volume** (fixed unit)
2. ✏️ **Clarify segmentation protocol** in Section 4.2: natural subsegments, not uniform grid
3. ✏️ **Document alternative** in Section 9.5: control volume approach as future extension
4. ✏️ **Update nomenclature** if needed: "minimum compositional unit" → "minimum toneable segment size"

The distinction between these two interpretations is **fundamental to operational determinism**. The boundary condition approach prioritizes **semantic coherence** and **computational efficiency** at the cost of **structure-dependent** measurements. The control volume approach prioritizes **uniform resolution** and **reproducibility** at the cost of **computational expense** and **loss of semantic boundaries**.

For the stated scope ("modifying existing passages with known initial compositional state"), the **boundary condition model** is the natural choice.

[Resolution Constraint: Control Volume Upper Bound](Resolution%20Constraint%20Control%20Volume%20Upper%20Bound%206fa362dc673a43cf953d19dd63ab3b47.md)