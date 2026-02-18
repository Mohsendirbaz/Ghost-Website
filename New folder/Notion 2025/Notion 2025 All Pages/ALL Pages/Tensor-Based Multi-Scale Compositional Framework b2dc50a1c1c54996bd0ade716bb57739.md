# Tensor-Based Multi-Scale Compositional Framework

## Purpose

Generalized mathematical formulation for deterministic multi-scale compositional quantification, enabling tracking, calculation, and monitoring of compositional changes under varying starting conditions.

---

## Nomenclature

### Sets and Spaces

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $\Phi$ | Scale hierarchy set | Set |
| $\phi_k$ | Scale level $k$ in the hierarchy | Scale level |
| $\phi_0$ | Root scale (total document) | Scale level |
| $\phi_1$ | Major divisions (Parts) | Scale level |
| $\phi_2$ | Secondary divisions (Chapters) | Scale level |
| $\phi_3$ | Tertiary divisions (Sections) | Scale level |
| $\phi_n$ | Maximum scale level | Scale level |
| $\mathcal{T}$ | Compositional space (set of tone types) | Set |
| $\tau_j$ | Tone type $j$ (basis vector in compositional space) | Tone type |
| $\tau_1, \tau_2, \tau_3, \tau_4$ | Academic, Technical, General, Policy (in application) | Tone types |
| $\tau_A$ | Academic tone | Tone type |
| $\tau_T$ | Technical tone | Tone type |
| $\tau_G$ | General tone | Tone type |
| $\tau_P$ | Policy tone | Tone type |
| $\mathcal{N}$ | Generic node in the hierarchical tree | Node |
| $\mathcal{N}_{i,k}$ | Node $i$ at scale level $k$ | Node |

### Indices and Dimensions

| **Symbol** | **Description** | **Range/Type** |
| --- | --- | --- |
| $i$ | Node index within a scale level | Positive integer |
| $j$ | Tone type index | $1 \leq j \leq m$ |
| $k$ | Scale level index | $0 \leq k \leq n$ |
| $m$ | Number of tone types (dimension of compositional space) | Positive integer (e.g., 4) |
| $n$ | Maximum scale level in hierarchy | Positive integer |
| $s$ | Segment index or sibling node index | Positive integer |

### State Tensors and Vectors

| **Symbol** | **Description** | **Dimension** |
| --- | --- | --- |
| $\mathbf{C}_{i,k}$ | Compositional state tensor at node $i$, scale $k$ | $m \times 1$ vector |
| $c_{i,k}^{(j)}$ | Fractional composition of tone $\tau_j$ at node $\mathcal{N}_{i,k}$ | Scalar, $[0,1]$ |
| $\mathbf{C}_{i,k}^{\text{target}}$ | Target composition at node $i$, scale $k$ | $m \times 1$ vector |
| $\mathbf{C}_{i,k}^{\text{actual}}$ | Actual (measured) composition at node $i$, scale $k$ | $m \times 1$ vector |
| $\mathbf{C}_{i,k}^{\text{new}}$ | New composition after adjustment | $m \times 1$ vector |
| $\mathbf{C}_{i,k}^{\text{old}}$ | Old composition before adjustment | $m \times 1$ vector |
| $\Delta \mathbf{C}_{i,k}$ | Compositional change tensor | $m \times 1$ vector |
| $\mathbf{C}_{\text{global}}$ | Global (aggregate) composition across entire document | $m \times 1$ vector |
| $\mathbf{C}_{\phi_k}$ | Scale-specific composition at scale level $\phi_k$ | $m \times 1$ vector |
| $\mathbf{C}_{\text{parent}(i),k-1}$ | Composition of parent node at scale $k-1$ | $m \times 1$ vector |
| $\mathbf{C}_{0,0}$ | Root composition tensor | $m \times 1$ vector |
| $\mathbf{Q}_{i,k}$ | Quality tensor (extension) | Vector |
| $c^{(T)}$ | Technical composition vector | Vector |

### Shear and Gradient Quantities

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $\boldsymbol{\tau}_{i,k \to k+1}$ | Compositional gradient between scales $k$ and $k+1$ | Vector |
| $\tau_{i,k}^{(j)}$ | Component-wise shear for tone $j$ at node $i$, scale $k$ | Scalar |
| $\boldsymbol{\tau}^{\text{vert}}_{i,k}$ | Vertical shear (scale hierarchy deviation) | $m \times 1$ vector |
| $\boldsymbol{\tau}^{\text{horiz}}_{i,k}$ | Horizontal shear (sibling variance) | $m \times 1$ vector |
| $\lVert \boldsymbol{\tau}_{i,k} \rVert$ | Magnitude of shear (compositional deviation norm) | Scalar, $\geq 0$ |
| $\Delta \phi$ | Scale separation (unit scale separation = 1) | Scalar |

### Word Count Fields

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $w_{i,k}$ | Word count at node $\mathcal{N}_{i,k}$ | Positive integer |
| $w_{\text{mwt}}$ | Minimum word threshold for tone assignment | Positive integer (e.g., 50 or 100) |
| $W_{\text{total}}$ | Total word count (entire document) | Positive integer |
| $w_{0,0}$ | Root word count (equals $W_{\text{total}}$) | Positive integer |
| $w_s$ | Word count of segment $s$ | Positive integer |
| $w_{\text{parent}(i),k-1}$ | Word count of parent node | Positive integer |
| $w_{i,k}^{\text{target}}$ | Target word count at node $i$, scale $k$ | Positive integer |
| $w_{i,k}^{\text{actual}}$ | Actual (measured) word count at node $i$, scale $k$ | Positive integer |
| $w_{i,k}^{\text{new}}$ | New word count after adjustment | Positive integer |
| $w_{i,k}^{\text{old}}$ | Old word count before adjustment | Positive integer |
| $\Delta w$ | Word count change | Integer |
| $w(\mathcal{N})$ | Word count function for node $\mathcal{N}$ | Positive integer |
| $w_{\text{sub}}$ | Word count per subsection | Positive integer |
| $w$ | Generic word count | Positive integer |

### Allocation and Adjustment Parameters

| **Symbol** | **Description** | **Range** |
| --- | --- | --- |
| $\alpha_{i,k}$ | Fractional allocation at node $i$, scale $k$ (fraction of parent) | $[0,1]$ |
| $\beta_{i,k}$ | Growth/shrinkage factor for word count adjustment | Real number |

### Intensity and Metrics

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $I_{i,k}^{(j)}$ | Tone intensity field (absolute word count for tone $\tau_j$) | Positive integer |
| $D_{i,k}$ | Deviation from target at node $i$, scale $k$ | Scalar, $\geq 0$ |
| $D_{\text{total}}$ | Aggregate compliance metric (root mean square deviation) | Scalar, $\geq 0$ |
| $\sigma^2_{\phi_k}(\tau_j)$ | Compositional variance for tone $\tau_j$ at scale $\phi_k$ | Scalar, $\geq 0$ |
| $\sigma^2$ | Variance (generic) | Scalar, $\geq 0$ |
| $\sigma$ | Standard deviation | Scalar, $\geq 0$ |
| $\bar{c}_{\phi_k}^{(j)}$ | Mean composition of tone $\tau_j$ at scale $\phi_k$ | Scalar, $[0,1]$ |
| $\bar{c}^{(j)}$ | Mean composition of tone $j$ (generic) | Scalar, $[0,1]$ |
| $N_k$ | Number of nodes at scale level $k$ | Positive integer |
| $N_{\text{siblings}}$ | Number of sibling nodes at a given scale | Positive integer |
| $N_{\text{nodes}}$ | Total number of nodes in hierarchy | Positive integer |
| $N$ | Total number of nodes (used in compliance metric) | Positive integer |

### Optimization and Penalty Parameters

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $\lambda$ | Shear penalty parameter in optimization objective | Positive scalar |

### Special Functions and Operators

| **Symbol** | **Description** | **Output** |
| --- | --- | --- |
| $\mathbb{1}_{\tau_j}(s)$ | Indicator function: equals 1 if segment $s$ has tone $\tau_j$, 0 otherwise | $\{0, 1\}$ |
| $\text{parent}(i)$ | Parent node of node $i$ | Node index |
| $\text{children}(\mathcal{N}_{i,k})$ | Set of child nodes of $\mathcal{N}_{i,k}$ | Set of nodes |
| $\text{siblings}(i)$ | Set of sibling nodes of node $i$ | Set of nodes |
| $\lVert \cdot \rVert$ | Norm (typically Euclidean/L2 norm) | Scalar, $\geq 0$ |
| $\lVert \cdot \rVert_2$ | L2 (Euclidean) norm | Scalar, $\geq 0$ |
| $\min$ | Minimization operator | Various |
| $\max$ | Maximization operator | Various |

### Partial Derivatives and Calculus

| **Symbol** | **Meaning** |
| --- | --- |
| $\partial$ | Partial derivative symbol |
| $\frac{\partial \mathbf{C}}{\partial \phi}$ | Partial derivative of composition with respect to scale |
| $\frac{\partial c^{(j)}}{\partial \phi_k}$ | Partial derivative of tone $j$ composition with respect to scale $k$ |
| $\frac{\partial v}{\partial y}$ | Velocity gradient (transport phenomena analogy) |
| $`left. cdot right | *{phi_k to phi*{k+1}}`$ |

### Mathematical Symbols and Logical Operators

| **Symbol** | **Meaning** |
| --- | --- |
| $\forall$ | For all, universal quantifier |
| $\in$ | Element of, belongs to |
| $\subset$ | Subset of (proper or improper) |
| $\sum$ | Summation operator |
| $\displaystyle \sum$ | Summation (display style) |
| $\prod$ | Product operator |
| $\iff$ | If and only if, logical equivalence |
| $\geq$ | Greater than or equal to |
| $\leq$ | Less than or equal to |
| $>$ | Strictly greater than |
| $<$ | Strictly less than |
| $\approx$ | Approximately equal to |
| $=$ | Equals, equality |
| $\Rightarrow$ | Implies, logical implication |
| $\longleftrightarrow$ | Corresponds to, bidirectional mapping |
| $\checkmark$ | Verification passed, correct |
| $\times$ | Multiplication, Cartesian product |

### Matrix and Vector Notation

| **Symbol** | **Meaning** |
| --- | --- |
| $\begin{bmatrix} \cdot \end{bmatrix}$ | Column vector or matrix |
| $\mathbf{bold}$ | Bold notation indicates vector or tensor |
| $\vdots$ | Vertical ellipsis (continuation) |
| $m \times 1$ | Dimensions: $m$ rows, 1 column (column vector) |
| $2 \times 2$ | Dimensions: 2 rows, 2 columns (square matrix) |

### Set Notation

| **Symbol** | **Meaning** |
| --- | --- |
| $\{\cdot\}$ | Set brackets |
| $\{a, b, c\}$ | Set containing elements $a, b, c$ |
| $\{a_0, a_1, \ldots, a_n\}$ | Set with indexed elements |

### Subscripts and Superscripts

| **Notation** | **Meaning** |
| --- | --- |
| $x_i$ | Subscript $i$ (typically node or element index) |
| $x_k$ | Subscript $k$ (typically scale level) |
| $x^{(j)}$ | Superscript $(j)$ in parentheses (typically tone type index) |
| $x^{\text{label}}$ | Superscript with text label (target, actual, new, old, vert, horiz) |
| $x_{i,k}$ | Double subscript (node $i$ at scale $k$) |
| $x_{i,k}^{(j)}$ | Combined subscript and superscript |

### Text Subscripts (Descriptive Labels)

| **Subscript** | **Meaning** |
| --- | --- |
| $\text{mwt}$ | Minimum word threshold |
| $\text{total}$ | Total (entire document) |
| $\text{global}$ | Global aggregate |
| $\text{target}$ | Target value |
| $\text{actual}$ | Actual measured value |
| $\text{new}$ | New value after adjustment |
| $\text{old}$ | Old value before adjustment |
| $\text{parent}(i)$ | Parent of node $i$ |
| $\text{children}$ | Children nodes |
| $\text{siblings}$ | Sibling nodes |
| $\text{vert}$ | Vertical (scale hierarchy) |
| $\text{horiz}$ | Horizontal (sibling variance) |
| $\text{nodes}$ | Nodes |
| $\text{sub}$ | Subsection |
| $\text{scale-scale}$ | Scale-to-scale component |
| $\text{scale-tone}$ | Scale-to-tone component |
| $\text{tone-scale}$ | Tone-to-scale component |
| $\text{tone-tone}$ | Tone-to-tone component |

### Greek Letters

| **Symbol** | **Name** | **Usage** |
| --- | --- | --- |
| $\Phi$ | Capital Phi | Scale hierarchy set |
| $\phi$ | Lowercase phi | Scale level |
| $\tau$ | Lowercase tau | Tone type, shear stress |
| $\alpha$ | Lowercase alpha | Fractional allocation, phase |
| $\beta$ | Lowercase beta | Growth/shrinkage factor, phase |
| $\gamma$ | Lowercase gamma | Phase |
| $\sigma$ | Lowercase sigma | Standard deviation |
| $\sigma^2$ | Sigma squared | Variance |
| $\lambda$ | Lowercase lambda | Penalty parameter |
| $\Delta$ | Capital Delta | Change, difference |

### Calligraphic Letters

| **Symbol** | **Name** | **Usage** |
| --- | --- | --- |
| $\mathcal{T}$ | Calligraphic T | Compositional space (tone type set) |
| $\mathcal{N}$ | Calligraphic N | Node in hierarchical tree |

### Blackboard Bold

| **Symbol** | **Name** | **Usage** |
| --- | --- | --- |
| $\mathbb{1}$ | Blackboard bold 1 | Indicator function |

### Transport Phenomena Analogy Terms

| **Term** | **Compositional Analog** |
| --- | --- |
| Shear stress | Compositional gradient |
| Phase | Scale level |
| Volume fraction | Word fraction |
| Conservation of mass | Conservation of word count |
| Viscosity | Compositional rigidity |
| Interfacial tension | Transition cost |
| Velocity gradient | Compositional gradient across scales |

### Extensions (Future Directions)

| **Symbol** | **Description** | **Type** |
| --- | --- | --- |
| $\mathbf{C}_{i,k}(t)$ | Time-dependent compositional tensor | Function of time |
| $t$ | Time variable (for version tracking) | Continuous or discrete time |
| $\mathbf{Q}_{i,k}$ | Multi-dimensional quality tensor | Vector |
| $c$ | Generic composition variable | Scalar, $[0,1]$ |
| $v$ | Velocity (transport phenomena) | Vector |
| $y$ | Spatial coordinate (transport phenomena) | Scalar |

### Abbreviations

| **Abbreviation** | **Full Form** |
| --- | --- |
| mwt | Minimum word threshold |

### Algorithm Notation (Pseudocode)

| **Notation** | **Meaning** |
| --- | --- |
| $\leftarrow$ | Assignment operator |
| `//` | Comment delimiter |

---

Scope: this framework does not intend to solve every problem in the world. it only concerns itself with scale and tone (quality attributes such as coherency and rigor (i.e. argument structure and cognitive depth supported by **Toulmin Model and Bloom's Taxonomy,** respectively) are treated as **compliance constraints** rather than quantified metric, the framework assumes that meeting compositional targets does not degrade the existing quality of any passage) . The framework further constrains its scope by: e**xcluding hybrid tones**: only single, well-defined tones are considered at the minimum compositional unit.  it is intended to help us iterate faster on an existing article by having complete control on its composition therefore it should clearly specify the mode in which the framework will be operationalized (modifying existing passage). that means initial compositional state is known and can be measured which yields initial values for variables such as parts, chapters, sections etc. its not a matter of fixed or variable per se but the initial value of a variable that depending on target desirable tones at varying scale can take different sizes (i.e. word counts). so excluding writing a new passage with pre specified attributes should reduce the burden of defining multiple initial state and boundary conditioning.

The framework defines a minimum word threshold $w_{\text{mwt}}$ but does not explicitly specify whether this represents:

**A)** A **boundary condition** (minimum threshold for eligibility)

**B)** A **discrete control volume** (fixed uniform unit size for analysis)

This distinction has profound implications for measurement protocols, computational complexity, resolution consistency, and the physical interpretation of the framework.

The distinction between these two interpretations is **fundamental to operational determinism**. The boundary condition approach prioritizes **semantic coherence** and **computational efficiency** at the cost of **structure-dependent** measurements. The control volume approach prioritizes **uniform resolution** and **reproducibility** at the cost of **computational expense** and **loss of semantic boundaries**.

## 1. Fundamental Definitions

### 1.1 Scale Hierarchy

Define discrete scale levels analogous to phases in multi-phase flow:

$$
\Phi = \{\phi_0, \phi_1, \phi_2, \ldots, \phi_n\}
$$

where:

- $\phi_0$ = Root scale (total document)
- $\phi_1$ = Major divisions (Parts)
- $\phi_2$ = Secondary divisions (Chapters)
- $\phi_3$ = Tertiary divisions (Sections)
- $\phi_k$ = Scale level $k$ in the hierarchy

**Scale Containment Property**:

$$
\phi_k \subset \phi_{k-1} \quad \forall\, k > 0
$$

nuance with multi phase flow formulation is that in multi scale each scale level points to the same entity in its entirety. sum of all parts encompass everything that sum of chapters do, and so forth whereas in multi phase, sum of phase fractions are the canonical divisions.

### 1.2 Compositional Space

Define tone types as orthogonal basis vectors in compositional space:

$$
\mathcal{T} = \{\tau_1, \tau_2, \tau_3, \ldots, \tau_m\}
$$

In the compositional analysis application, we instantiate this as $m = 4$ with labels: $\tau_1 =$ Academic, $\tau_2 =$ Technical, $\tau_3 =$ General, $\tau_4 =$ Policy. This is a **design choice**; the framework supports arbitrary $m$-dimensional bases.

**Single-Tone Constraint** (current formulation):

At the minimum compositional unit, only one $\tau_i$ is active.

### 1.3 Minimum Compositional Unit

Define minimum word threshold for tone assignment:

$$
w_{\text{mwt}} = \text{minimum word count eligible for tone assignment}
$$

Example: $w_{\text{mwt}} = 50$ words.

**Eligibility Criterion**:

$$
\text{Node } \mathcal{N} \text{ is toneable} \iff w(\mathcal{N}) \geq w_{\text{mwt}}
$$

---

## 2. State Tensor Formulation

### 2.1 Compositional State Tensor

At each node $\mathcal{N}_{i,k}$ (node $i$ at scale $\phi_k$), define the state tensor:

$$
\mathbf{C}_{i,k} =
\begin{bmatrix}
  c_{i,k}^{(1)} \\
  c_{i,k}^{(2)} \\
  \vdots \\
  c_{i,k}^{(m)}
\end{bmatrix}
$$

where $c_{i,k}^{(j)}$ is the fractional composition of tone $\tau_j$ at node $\mathcal{N}_{i,k}$.

**Normalization Constraint**:

$$
\sum_{j=1}^{m} c_{i,k}^{(j)} = 1.0
$$

**Non-negativity**:

$$
c_{i,k}^{(j)} \geq 0 \quad \forall j
$$

### 2.2 Word Allocation Field

Define word count field:

$$
w_{i,k} = \text{word count at node } \mathcal{N}_{i,k}
$$

with root constraint:

$$
w_{0,0} = W_{\text{total}}
$$

**Conservation Law (multi-linear sum)**:

$$
w_{i,k} = \sum_{j \in \text{children}(\mathcal{N}_{i,k})} w_{j,k+1}
$$

---

## 3. Shear Tensor Analogy

### 3.1 Compositional Gradient (Shear)

Define compositional gradient between adjacent scales, analogous to shear stress:

$$
\boldsymbol{\tau}_{i,\,k \to k+1} = \left.\frac{\partial \mathbf{C}}{\partial \phi}\right|_{\phi_k \to \phi_{k+1}}
$$

In discrete form (component-wise):

$$
\tau_{i,k}^{(j)} = \frac{\mathbf{C}^{(j)}_{\text{parent}(i),\,k-1} - \mathbf{C}^{(j)}_{i,k}}{\Delta \phi}
$$

where $\Delta \phi = 1$ (unit scale separation).

**Physical Interpretation**:

- High $\lVert \boldsymbol{\tau}_{i,k} \rVert$ indicates strong compositional deviation from parent.
- Low $\lVert \boldsymbol{\tau}_{i,k} \rVert$ indicates compositional inheritance.

### 3.2 Two-Axis Shear Decomposition

Decompose shear into perpendicular components.

**Vertical Shear** (scale hierarchy):

$$
\boldsymbol{\tau}^{\text{vert}}_{i,k} = \mathbf{C}_{i,k} - \mathbf{C}_{\text{parent}(i),\,k-1}
$$

**Horizontal Shear** (sibling variance):

$$
\boldsymbol{\tau}^{\text{horiz}}_{i,k} = \mathbf{C}_{i,k} - \frac{1}{N_{\text{siblings}}} \sum_{s \in \text{siblings}(i)} \mathbf{C}_{s,k}
$$

where $N_{\text{siblings}}$ is the number of sibling nodes at scale $\phi_k$.

### 3.3 Shear Magnitude (Compositional Deviation)

$$
\lVert \boldsymbol{\tau}_{i,k} \rVert = \sqrt{\sum_{j=1}^{m} \left(\tau_{i,k}^{(j)}\right)^2}
$$

---

## 4. Multi-Scale Tracking Framework

### 4.1 Forward Mode (Target Composition → Allocation)

**Use Case**: Planning a document to be written.

**Procedure**:

1. Specify $W_{\text{total}}$ and $w_{text{mwt}}$.
2. Define scale hierarchy $\Phi$ and tree structure.
3. Assign target compositions $\mathbf{C}_{i,k}^{\text{target}}$ at each node.
4. Propagate allocations:
    
    $$
    w_{i,k} = \alpha_{i,k} \cdot w_{\text{parent}(i),\,k-1}
    $$
    
    where $\alpha_{i,k}$ is the fractional allocation, and
    
    $$
    \sum_{j \in \text{children}(\mathcal{N}_{i,k})} \alpha_{j,k+1} = 1.0
    $$
    
5. Verify:
    
    $$
    w_{i,k} \geq w_{\text{mwt}} \quad \forall \text{ leaf nodes.}
    $$
    

**Tone Intensity Field**:

$$
I_{i,k}^{(j)} = c_{i,k}^{(j)} \cdot w_{i,k}
$$

(absolute word count for tone $\tau_j$ at node $\mathcal{N}_{i,k}$).

### 4.2 Reverse Mode (Existing Text → Analysis)

**Use Case**: Analyzing a completed document.

**Procedure**:

1. Measure $w_{i,k}$ for all nodes (actual word counts).
2. Sample text at each toneable node.
3. Classify dominant tone for segments with length $\geq w_{\text{mwt}}$.
4. Compute empirical composition:
    
    $$
    c_{i,k}^{(j)} =
    \frac{\displaystyle \sum_{\text{segments } s \subset \mathcal{N}_{i,k}}
      \mathbb{1}_{\tau_j}(s) \cdot w_s}
         {w_{i,k}}
    $$
    
    where $\mathbb{1}_{\tau_j}(s) = 1$ if segment $s$ is classified as tone $\tau_j$, and $0$ otherwise.
    
5. Compute shear fields to identify deviations.

### 4.3 Adaptive Mode (Real-Time Adjustment)

**Use Case**: Mid-writing rebalancing.

**Rebalancing Operator**:

$$
\mathbf{C}_{i,k}^{\text{new}} = \mathbf{C}_{i,k}^{\text{old}} + \Delta \mathbf{C}_{i,k}
$$

subject to normalization:

$$
\sum_{j=1}^{m} c_{i,k}^{(j),\,\text{new}} = 1.0.
$$

**Word Redistribution**:

$$
w_{i,k}^{\text{new}} = w_{i,k}^{\text{old}} \cdot (1 + \beta_{i,k})
$$

where $\beta_{i,k}$ is a growth/shrinkage factor constrained by:

$$
\sum_{i \in \text{children}(\mathcal{N}_{\text{parent}})} w_{i,k}^{\text{new}} = w_{\text{parent},\,k-1}.
$$

---

## 5. Deterministic Quantification Metrics

### 5.1 Global Composition (Aggregate)

$$
\mathbf{C}_{\text{global}} =
  \frac{1}{W_{\text{total}}} \sum_{i,k} w_{i,k} \cdot \mathbf{C}_{i,k}
$$

### 5.2 Scale-Specific Composition

At scale level $\phi_k$:

$$
\mathbf{C}_{\phi_k} =
  \frac{\displaystyle \sum_{i \in \phi_k} w_{i,k} \cdot \mathbf{C}_{i,k}}
       {\displaystyle \sum_{i \in \phi_k} w_{i,k}}
$$

### 5.3 Compositional Variance (Heterogeneity)

For tone $\tau_j$ at scale $\phi_k$:

$$
\sigma^2_{\phi_k}(\tau_j) =
  \frac{1}{N_k} \sum_{i=1}^{N_k}
    \left(c_{i,k}^{(j)} - \bar{c}_{\phi_k}^{(j)}\right)^2
$$

where $N_k$ is the number of nodes at scale $\phi_k$ and $\bar{c}_{\phi_k}^{(j)}$ is the mean composition of tone $\tau_j$ at that scale.

- Low $\sigma^2$ : homogeneous composition across the scale.
- High $\sigma^2$ : heterogeneous composition (specialized nodes).

### 5.4 Compliance Metric

Deviation from target at each node:

$$
D_{i,k} = \lVert \mathbf{C}_{i,k}^{\text{actual}} - \mathbf{C}_{i,k}^{\text{target}} \rVert_2
$$

**Aggregate Compliance**:

$$
D_{\text{total}} =
  \sqrt{\frac{1}{N_{\text{nodes}}} \sum_{i,k} D_{i,k}^2}
$$

---

## 6. Examples: Variety of Situations

### Example 6.1: Three-Scale Hierarchy

**Setup**:

- $W_{\text{total}} = 10{,}000$ words
- $w_{\text{mwt}} = 100$ words
- $\Phi = \{\phi_0, \phi_1, \phi_2\}$ (Document → Parts → Chapters)
- $\mathcal{T} = \{\tau_A, \tau_T\}$ (Academic, Technical)

**Root**:

$$
w_{0,0} = 10{,}000, \quad
\mathbf{C}_{0,0} =
  \begin{bmatrix}
    0.6 \\
    0.4
  \end{bmatrix}
$$

**Parts** ($\phi_1$): 3 parts with allocations $[0.3, 0.5, 0.2]$.

$$
w_{1,1} = 3{,}000, \quad
w_{2,1} = 5{,}000, \quad
w_{3,1} = 2{,}000.
$$

$$
\mathbf{C}_{1,1} =
  \begin{bmatrix} 0.7 \\ 0.3 \end{bmatrix}, \quad
\mathbf{C}_{2,1} =
  \begin{bmatrix} 0.4 \\ 0.6 \end{bmatrix}, \quad
\mathbf{C}_{3,1} =
  \begin{bmatrix} 0.8 \\ 0.2 \end{bmatrix}.
$$

**Shear (Part 2)**:

$$
\boldsymbol{\tau}^{\text{vert}}_{2,1} =
  \mathbf{C}_{2,1} - \mathbf{C}_{0,0} =
  \begin{bmatrix} 0.4 \\ 0.6 \end{bmatrix} -
  \begin{bmatrix} 0.6 \\ 0.4 \end{bmatrix} =
  \begin{bmatrix} -0.2 \\ +0.2 \end{bmatrix}.
$$

Interpretation: Part 2 is 20% less Academic and 20% more Technical than the global target.

**Verification** (Academic words):

$$
3{,}000(0.7) + 5{,}000(0.4) + 2{,}000(0.8)
  = 2{,}100 + 2{,}000 + 1{,}600 = 5{,}700.
$$

$$
\frac{5{,}700}{10{,}000} = 0.57 \approx 0.6 \quad (\text{rounding effects}).
$$

### Example 6.2: Minimum Word Threshold Violation Detection

**Setup**:

- Chapter with $w = 800$ words, divided into 10 subsections.
- Proposed equal division: $w_{\text{sub}} = 80$ words each.
- $w_{\text{mwt}} = 100$ words.

**Check**:

$$
w_{\text{sub}} = 80 < w_{\text{mwt}} = 100
\quad \Rightarrow \quad \text{VIOLATION}.
$$

**Correction**: Reduce to 8 subsections.

$$
w_{\text{sub}}^{\text{new}} = \frac{800}{8} = 100 \geq w_{\text{mwt}} \quad (\checkmark).
$$

### Example 6.3: Adaptive Rebalancing

**Scenario**: During writing, Part 2 runs 15% over target.

**Initial**:

$$
w_{2,1}^{\text{target}} = 5{,}000, \quad
w_{2,1}^{\text{actual}} = 5{,}750.
$$

**Overage**:

$$
\Delta w_2 = +750.
$$

**Redistribute** (proportional shrinkage of other parts):

$$
w_1^{\text{new}} =
  3{,}000 - 3{,}000 \cdot \frac{750}{3{,}000 + 2{,}000}
  = 3{,}000 - 450 = 2{,}550,
$$

$$
w_3^{\text{new}} =
  2{,}000 - 2{,}000 \cdot \frac{750}{3{,}000 + 2{,}000}
  = 2{,}000 - 300 = 1{,}700.
$$

**Check**:

$$
2{,}550 + 5{,}750 + 1{,}700 = 10{,}000 \quad (\checkmark).
$$

### Example 6.4: Heterogeneity Analysis

**Four chapters at** $\phi_2$ **with Technical composition**:

$$
c^{(T)} = [0.2, 0.8, 0.7, 0.3].
$$

**Mean**:

$$
\bar{c}^{(T)} = \frac{0.2 + 0.8 + 0.7 + 0.3}{4} = 0.5.
$$

**Variance**:

$$
\sigma^2 =
  \frac{1}{4}\Big[(0.2-0.5)^2 + (0.8-0.5)^2 + (0.7-0.5)^2 + (0.3-0.5)^2\Big]
$$

$$
= \frac{1}{4}\big[0.09 + 0.09 + 0.04 + 0.04\big]
= \frac{0.26}{4} = 0.065.
$$

**Standard Deviation**:

$$
\sigma \approx 0.255.
$$

Interpretation: Moderate heterogeneity—some chapters are technical-heavy, others are not.

---

## 7. Implementation Algorithms

### 7.1 Forward Mode Algorithm

```jsx
INPUT: W_total, w_mwt, tree structure, target compositions C_target[i,k]

1. Initialize root:
   w[0,0] ← W_total
   C[0,0] ← C_target[0,0]

2. FOR each scale k from 0 to n-1:
   FOR each node i at scale k:
      children ← get_children(i, k)
      allocations ← get_allocation_fractions(children)  // sums to 1.0
      
      FOR each child j in children:
         w[j, k+1] ← allocations[j] × w[i, k]
         C[j, k+1] ← C_target[j, k+1]
         
         IF w[j, k+1] < w_mwt AND is_leaf(j, k+1):
            FLAG violation
            SUGGEST merge or reallocation

3. Compute global metrics:
   C_global ← weighted_average(C[i,k], w[i,k])
   tau[i,k] ← compute_shear(C[i,k], C[parent(i), k-1])

4. OUTPUT: allocation table, intensity fields, shear fields
```

### 7.2 Reverse Mode Algorithm

```jsx
INPUT: text corpus, w_mwt, tree structure

1. FOR each node i,k:
   w[i,k] ← measure_word_count(node[i,k])

2. FOR each leaf node i at deepest scale:
   IF w[i,k] >= w_mwt:
      segments ← segment_text(node[i,k], w_mwt)
      FOR each segment s:
         tone[s] ← classify_tone(s)  // returns dominant tone

      FOR each tone tau_j:
         c[i,k,j] ← count_words_with_tone(tau_j) / w[i,k]

3. Propagate compositions up hierarchy:
   FOR each scale k from (n-1) down to 1:
      FOR each node i at scale k-1:
         children ← get_children(i, k-1)
         FOR each tone tau_j:
            c[i, k-1, j] ← SUM(w[child, k] × c[child, k, j]) / w[i, k-1]
                           FOR child in children

4. Compute shear fields:
   FOR each node i,k where k > 0:
      tau_vert[i,k] ← C[i,k] - C[parent(i), k-1]
      tau_horiz[i,k] ← C[i,k] - mean(C[siblings(i), k])

5. OUTPUT: empirical compositions, shear fields, deviation metrics
```

---

## 8. Arbitrary Mapping Decisions

### 8.1 Mapping: Transport Phenomena → Composition

| <strong>Transport Concept</strong> | <strong>Compositional Analog</strong> | <strong>Rationale</strong> |
| --- | --- | --- |
| Shear stress $(\tau)$ | Compositional gradient | Measures deviation between scales |
| Two perpendicular axes | Vertical (scale) &amp; Horizontal (sibling) | Captures hierarchy and peer variance |
| Phase $(\alpha, \beta, \gamma)$ | Scale levels $(\phi_k)$ | Discrete hierarchical levels |
| Volume fraction | Word fraction $(\alpha_{i,k})$ | Allocation within parent |
| Conservation of mass | Conservation of word count | $\sum w_{\text{children}} = w_{\text{parent}}$ |
| Viscosity | Compositional rigidity | How strongly child inherits parent tone |
| Interfacial tension | Transition cost | Penalty for abrupt tone shifts |

### 8.2 Alternative Mappings (for Future Extension)

**Option A: Velocity Gradient**

$$
\frac{\partial v}{\partial y} \longleftrightarrow
\frac{\partial c^{(j)}}{\partial \phi_k}
$$

**Option B: Stress Tensor (full** $2 \times 2$**)**

$$
\begin{bmatrix}
  \tau_{\text{scale-scale}} & \tau_{\text{scale-tone}} \\
  \tau_{\text{tone-scale}} & \tau_{\text{tone-tone}}
\end{bmatrix}
$$

Allows coupling between scale changes and tone changes.

### 8.3 Phase as Scale: Justification

In multi-phase flow:

- Each phase has distinct properties (density, viscosity).
- Phases interact at interfaces.
- Volume fractions sum to 1.0.

In composition:

- Each scale has distinct granularity.
- Scales interact via parent-child allocation.
- Fractional allocations sum to 1.0.

**Direct Correspondence**:

$$
\alpha_{\text{phase}} \longleftrightarrow \alpha_{\text{scale}}.
$$

---

## 9. Extensions and Future Directions

### 9.1 Complementary Tones (Relaxing Single-Tone Constraint)

Replace indicator function with a continuous blend:

$$
c_{i,k}^{(j)} = c \in [0,1] \quad \text{such that} \quad \sum_j c_{i,k}^{(j)} = 1.
$$

This requires:

- Weighted classification (for example, "60% Technical, 30% Academic, 10% Policy").
- More sophisticated text analysis.

### 9.2 Temporal Evolution (Version Tracking)

Extend to a time-dependent tensor:

$$
\mathbf{C}_{i,k}(t)
$$

Track how composition evolves across draft versions.

### 9.3 Multi-Dimensional Quality Metrics

Introduce a quality tensor:

$$
\mathbf{Q}_{i,k} = [\text{coherence},\; \text{rigor},\; \text{accessibility},\; \text{impact}]
$$

Cross-correlate with the compositional tensor.

### 9.4 Optimization Framework

Define objective function:

$$
\min_{\{w_{i,k},\, \mathbf{C}_{i,k}\}}
\left[
\sum_{i,k}
  \lVert \mathbf{C}_{i,k} - \mathbf{C}_{i,k}^{\text{target}} \rVert^2
+
\lambda \sum_{i,k} \lVert \boldsymbol{\tau}_{i,k} \rVert^2
\right]
$$

subject to:

- Conservation constraints.
- Minimum word thresholds.
- Continuity preferences.

Here $\lambda$ penalizes high shear (encourages smooth transitions).

---

## 10. Summary of Key Relations

**Conservation Law**

$$
\sum_{j \in \text{children}(i)} w_{j,k+1} = w_{i,k}.
$$

**Normalization**

$$
\sum_{j=1}^{m} c_{i,k}^{(j)} = 1.0.
$$

**Intensity Field**

$$
I_{i,k}^{(j)} = c_{i,k}^{(j)} \cdot w_{i,k}.
$$

**Vertical Shear**

$$
\boldsymbol{\tau}^{\text{vert}}_{i,k} =
  \mathbf{C}_{i,k} - \mathbf{C}_{\text{parent}(i),\,k-1}.
$$

**Global Composition**

$$
\mathbf{C}_{\text{global}} =
  \frac{1}{W_{\text{total}}} \sum_{i,k} w_{i,k} \cdot \mathbf{C}_{i,k}.
$$

**Compliance Metric**

$$
D_{\text{total}} =
  \sqrt{\frac{1}{N}\sum_{i,k}
    \big\lVert \mathbf{C}_{i,k}^{\text{actual}} - \mathbf{C}_{i,k}^{\text{target}} \big\rVert^2}
$$

where $N$ is the total number of nodes.

---

## 11. Integration with Existing Framework

This tensor formulation provides a **mathematical container** that can represent the existing protocol in [PROTOCOL SUMMARY](PROTOCOL%20SUMMARY%202b5f832e52ca81738cadf0c3769cb9d1.md) and structure in [ARTICLE COMPOSITION FRAMEWORK](ARTICLE%20COMPOSITION%20FRAMEWORK%202b5f832e52ca810995b2c0ff34d09a56.md) as a **specific configuration**.

**Mapping**:

- "Parts" → Scale $\phi_1$.
- "Chapters" → Scale $\phi_2$.
- "Subsections" → Scale $\phi_3$.
- Tone percentages → $c_{i,k}^{(j)}$ values.
- Word count allocations → $w_{i,k}$ values.
- "Dominance Principle" → constraint $\max_j c_{i,k}^{(j)} \geq 0.4$.

**How the protocol relates to the framework**:

1. The protocol's planning phase aligns conceptually with the Forward Mode workflow.
2. The protocol's progression rules can be represented as vertical shear patterns (though shear is not computed in practice).
3. The protocol's tone adjustment recipes are metaphorically aligned with Adaptive Mode (though not yet implemented as explicit $\Delta \mathbf{C}$ tensor operations).
4. The protocol's quality verification mirrors Reverse Mode at a workflow level (though using sampling rather than full segmentation).
5. Some protocol elements (Toulmin/Bloom checks, coherence audits) live outside the tensor structure and interact through separate constraints.

---

**Framework Version**: 1.0

**Status**: Generalized formulation ready for implementation

**Arbitrary Mappings**: Documented in Section 8

**Numeric Examples**: Sections 6.1–6.4 demonstrate a variety of situations

This framework provides the mathematical structure for deterministic multi-scale compositional quantification. Actual determinism depends on operational choices (atomic unit definition, sampling procedures, normalization steps) made during implementation.

[Conceptual Review: Multi-Scale vs Multi-Phase Analogy](Conceptual%20Review%20Multi-Scale%20vs%20Multi-Phase%20Analo%20ec63d04f7f6542eebc9084db25aa209e.md)

[Conceptual Review: Minimum Compositional Unit — Boundary Condition vs. Discrete Control Volume](Conceptual%20Review%20Minimum%20Compositional%20Unit%20%E2%80%94%20Bou%203dc7561bce634e13af14be26f941f15f.md)

[**Derivatives and disintegration of Borel measures on constrained simplices with integer-valued fields**](Derivatives%20and%20disintegration%20of%20Borel%20measures%20o%20aba943e67b3149108f41e347daa95664.md)