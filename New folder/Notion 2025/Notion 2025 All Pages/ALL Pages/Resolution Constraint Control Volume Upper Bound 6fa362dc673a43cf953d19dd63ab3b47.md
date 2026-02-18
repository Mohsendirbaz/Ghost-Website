# Resolution Constraint: Control Volume Upper Bound

## Statement of Constraint

**Critical Limitation**: When using the **control volume approach** (Approach B), the size of the discrete compositional unit $w_{\text{mwt}}$ cannot exceed the size of the **smallest natural scale level** in the existing document.

$$
w_{\text{mwt}} \leq \min_{i,k} w_{i,k} \quad \text{where } \mathcal{N}_{i,k} \text{ is a leaf node}
$$

**Implication**: The control volume approach's resolution is **bounded from above** by the document's natural structure, creating an unexpected dependency on the very structure it was designed to ignore.

---

## The Problem

### Scenario: Coarse Control Volumes, Fine Document Structure

**Document structure**:

- 10,000-word article
- Divided into 50 subsections
- Average subsection size: 200 words
- Smallest subsection: 150 words

**Proposed control volume size**: $w_{\text{mwt}} = 500$ words

**Issue**: You cannot subdivide a 150-word subsection into 500-word control volumes.

---

## Mathematical Formulation

### Control Volume Discretization (from parent page)

For a node $\mathcal{N}_{i,k}$ with word count $w_{i,k}$, the number of control volumes is:

$$
N_{\text{cv}} = \left\lfloor \frac{w_{i,k}}{w_{\text{mwt}}} \right\rfloor
$$

### The Breakdown Condition

**Problem occurs when**:

$$
w_{i,k} < w_{\text{mwt}} \quad \Rightarrow \quad N_{\text{cv}} = \left\lfloor \frac{w_{i,k}}{w_{\text{mwt}}} \right\rfloor = 0
$$

**Result**: Node $\mathcal{N}_{i,k}$ contains **zero control volumes** and cannot be analyzed.

---

## Implications for Framework Flexibility

### 1. Resolution is Document-Dependent

**Irony**: The control volume approach was intended to provide **structure-independent** measurements, but its maximum resolution is **constrained by document structure**.

**The constraint**:

- **Fine-grained documents** (many small sections) → Allow small $w_{\text{mwt}}$ (high resolution)
- **Coarse-grained documents** (few large sections) → Allow large $w_{\text{mwt}}$ (low resolution OK)
- **Mixed-granularity documents** → Constrained by smallest section

### 2. Cannot Arbitrarily Increase Control Volume Size

Unlike the boundary condition approach (where $w_{\text{mwt}}$ is just a lower threshold), the control volume approach **cannot use coarse control volumes** if the document has fine structure.

**Example failure**:

- Goal: Reduce computational cost by using $w_{\text{mwt}} = 1000$ words
- Document: Contains 200-word subsections
- Result: **Cannot apply control volume approach**

### 3. Cross-Document Comparison Limitations

**Original motivation** for control volume approach: Enable comparison across documents with different structures by using uniform resolution.

**Reality**: If documents have different minimum scale sizes, they require **different** $w_{\text{mwt}}$ values:

| **Document** | **Smallest section** | **Maximum** $w_{\text{mwt}}$ | **Comparable?** |
| --- | --- | --- | --- |
| Article A | 150 words | 150 words | ✅ Only at 100-word resolution or finer |
| Article B | 300 words | 300 words |  |
| Article C | 100 words | 100 words |  |

**Conclusion**: To compare Articles A, B, and C, you must use $w_{\text{mwt}} \leq 100$ words (the global minimum).

---

## Detailed Example

### Document: Mixed Granularity

**Structure**:

- Part I: 5,000 words
    - Chapter 1: 2,000 words
        - Section 1.1: 800 words
        - Section 1.2: 600 words
        - Section 1.3: 600 words
    - Chapter 2: 3,000 words
        - Section 2.1: 1,200 words
        - Section 2.2: 1,000 words
        - Section 2.3: 800 words
- Part II: 5,000 words
    - Chapter 3: 2,500 words
        - Section 3.1: 500 words
        - Section 3.2: 1,000 words
        - Section 3.3: 1,000 words
    - Chapter 4: 2,500 words
        - Section 4.1: **200 words** ← **smallest**
        - Section 4.2: 1,300 words
        - Section 4.3: 1,000 words

**Smallest leaf node**: Section 4.1 with 200 words

---

### Attempt 1: $w_{\text{mwt}} = 500$ words

**Analysis**:

- Most sections (e.g., 800, 1,000, 1,200 words) subdivide cleanly:
    - 800 words → 1 CV (500) + 300 remainder
    - 1,000 words → 2 CV's (500 each)
    - 1,200 words → 2 CV's (500 each) + 200 remainder
- **Problem**: Section 4.1 (200 words)
    
    $$
    N_{\text{cv}} = \left\lfloor \frac{200}{500} \right\rfloor = 0
    $$
    
    **Zero control volumes** → **Cannot measure composition**
    

**Failure mode**: Section 4.1 is invisible to the framework.

---

### Attempt 2: $w_{\text{mwt}} = 200$ words

**Analysis**:

- All sections can now be analyzed:
    - Section 4.1: 200 words → 1 CV ✅
    - Section 3.1: 500 words → 2 CV's (200 each) + 100 remainder
    - Section 1.1: 800 words → 4 CV's (200 each)
    - Section 2.2: 1,000 words → 5 CV's (200 each)

**Success**: All nodes have at least one control volume.

**Cost**: Higher computational expense (5× more CV's than $w_{\text{mwt}} = 1000$ would yield).

---

### Constraint Formula

For a document with leaf nodes $\mathcal{L}$, the maximum permissible control volume size is:

$$
w_{\text{mwt}}^{\text{max}} = \min_{\mathcal{N} \in \mathcal{L}} w(\mathcal{N})
$$

**In this example**:

$$
w_{\text{mwt}}^{\text{max}} = \min\{800, 600, 600, 1200, 1000, 800, 500, 1000, 1000, 200, 1300, 1000\} = 200 \text{ words}
$$

---

## Handling Strategies

### Strategy 1: Adaptive Control Volumes (Hybrid)

**Concept**: Use variable-size control volumes that respect document structure.

**Implementation**:

- For nodes with $w \geq w_{\text{mwt}}$: subdivide into uniform CV's of size $w_{\text{mwt}}$
- For nodes with $w < w_{\text{mwt}}$: treat entire node as a single "undersize" CV

**Formula**:

$$
N_{\text{cv}} = \max\left(1, \left\lfloor \frac{w_{i,k}}{w_{\text{mwt}}} \right\rfloor\right)
$$

**Trade-off**: No longer truly uniform resolution, but at least all nodes are included.

---

### Strategy 2: Aggregation Across Scale Boundaries

**Concept**: When a node is too small, aggregate it with siblings or adjacent nodes to form a complete CV.

**Example**:

- Section 4.1: 200 words (too small for 500-word CV)
- Section 4.2: 1,300 words
- **Aggregate**: Combine into a single 1,500-word meta-node → 3 CV's of 500 words each

**Issue**: Violates the scale hierarchy (merges siblings into a new virtual node).

---

### Strategy 3: Accept the Upper Bound Constraint

**Concept**: Simply acknowledge that $w_{\text{mwt}} \leq w_{\text{mwt}}^{\text{max}}$ and choose resolution accordingly.

**Recommendation**:

- Analyze document structure first
- Identify $w_{\text{mwt}}^{\text{max}}$
- Choose $w_{\text{mwt}} \leq w_{\text{mwt}}^{\text{max}}$
- Accept computational cost

**Advantage**: Clean, theoretically sound, no special cases.

**Disadvantage**: May force very fine resolution (high computational cost) even when coarser resolution would suffice for most of the document.

---

## Comparison: Boundary Condition vs. Control Volume

### Boundary Condition (Approach A)

**Resolution constraint**:

$$
w_{\text{mwt}} \leq w(\mathcal{N}) \quad \text{for node to be toneable}
$$

- $w_{\text{mwt}}$ is a **lower bound** (minimum size)
- **No upper bound**: can be arbitrarily small
- Flexibility: Can set $w_{\text{mwt}} = 50$ words and all nodes ≥ 50 are toneable

---

### Control Volume (Approach B)

**Resolution constraint**:

$$
w_{\text{mwt}} \leq \min_{\mathcal{N} \in \mathcal{L}} w(\mathcal{N})
$$

- $w_{\text{mwt}}$ is both a **unit size** and **upper bound** (cannot exceed smallest node)
- **Inflexible**: Constrained by document structure
- Penalty: Fine document structure forces fine control volumes → high computational cost

---

## Summary Table

| **Property** | **Boundary Condition** | **Control Volume** |
| --- | --- | --- |
| **Role of** $w_{\text{mwt}}$ | Lower bound (minimum threshold) | Unit size **and** upper bound |
| **Constraint type** | $w_{\text{mwt}} \leq w(\mathcal{N})$ (per-node) | $w_{\text{mwt}} \leq \min w(\mathcal{N})$ (global) |
| **Resolution flexibility** | High (can set very small $w_{\text{mwt}}$) | **Low (bounded by smallest node)** |
| **Structure dependence** | Yes (respects natural segments) | **Yes (constrained by smallest segment)** |
| **Computational cost control** | Easy (larger $w_{\text{mwt}}$ excludes small nodes) | **Difficult (cannot increase if small nodes exist)** |
| **Failure mode** | Small nodes excluded (acceptable) | **Small nodes yield zero CV's (unacceptable)** |

---

## Practical Recommendations

### 1. Pre-Analysis is Mandatory

Before committing to control volume approach:

$$
\text{Compute: } w_{\text{mwt}}^{\text{max}} = \min_{\mathcal{N} \in \mathcal{L}} w(\mathcal{N})
$$

**Decision logic**:

- If $w_{\text{mwt}}^{\text{max}} \geq w_{\text{desired}}$ → Control volume approach is feasible
- If $w_{\text{mwt}}^{\text{max}} < w_{\text{desired}}$ → Either:
    - Accept finer resolution: set $w_{\text{mwt}} = w_{\text{mwt}}^{\text{max}}$
    - Use boundary condition approach instead

---

### 2. When Control Volume Approach is Viable

**Best case**: Document has uniform, coarse structure

- Example: 10,000-word article, 20 sections, all 400–600 words
- $w_{\text{mwt}}^{\text{max}} = 400$ words
- Can choose $w_{\text{mwt}} \in [100, 400]$ with reasonable flexibility

---

### 3. When Control Volume Approach Fails

**Worst case**: Document has highly variable structure

- Example: 10,000-word article, 100 sections, ranging from 20 to 2,000 words
- $w_{\text{mwt}}^{\text{max}} = 20$ words
- Forced to use $w_{\text{mwt}} \leq 20$ → 500 control volumes → computationally prohibitive

**Recommendation**: Abandon control volume approach; use boundary condition with $w_{\text{mwt}} = 100$ words.

---

### 4. Hybrid Recommendation

**Strategy**: Use control volumes **only** at scales where all nodes exceed desired $w_{\text{mwt}}$.

**Example**:

- Chapter level: all chapters ≥ 2,000 words → use $w_{\text{mwt}} = 500$ words ✅
- Section level: some sections < 500 words → use boundary condition ✅

**Result**: Uniform resolution where viable, adaptive resolution where necessary.

---

## Conclusion

**Key Insight**: The control volume approach's flexibility is **fundamentally constrained** by the smallest natural scale in the document.

**Constraint formula**:

$$
w_{\text{mwt}} \leq \min_{i,k} w_{i,k}
$$

**Implications**:

1. **Not structure-independent**: Despite design intent, control volume resolution depends on document structure
2. **Computational cost cannot be arbitrarily reduced**: Fine structure forces fine control volumes
3. **Cross-document comparison requires alignment**: Documents must share a common minimum scale
4. **Boundary condition approach is more flexible**: No upper bound constraint

**Recommendation**:

- Document structure analysis is **mandatory** before choosing control volume approach
- Use boundary condition approach as the default unless uniform resolution is **essential** and document structure permits it
- Hybrid strategies (control volumes at coarse scales, boundary condition at fine scales) offer best of both worlds

---

**Status**: ⚠️ **Critical constraint documented**

This constraint significantly reduces the practical applicability of the control volume approach and strengthens the case for the boundary condition approach as the primary framework mode.