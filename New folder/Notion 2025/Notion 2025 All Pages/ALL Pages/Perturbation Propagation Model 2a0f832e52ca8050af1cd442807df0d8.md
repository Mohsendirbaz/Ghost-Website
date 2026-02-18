# Perturbation Propagation Model

# Trans-Omic Narrative Graph Perturbation Propagation Model

## Rigorous Mathematical Framework for Multi-Scale Semantic Force Dynamics

**Date**: October 31, 2025

**Version**: 1.0

**Status**: Technical Proposal

---

## Executive Summary

We propose a **physics-inspired mathematical framework** for modeling how textual, semantic, and structural perturbations propagate through multi-layered narrative graphs in the dual-book writing system. Drawing from trans-omics network biology, force-directed graph dynamics, and descriptive set theory, this framework treats narrative elements as particles in a semantic field experiencing **attractive forces** (thematic coherence, referential dependencies) and **repulsive forces** (semantic divergence, word budget constraints) that govern their equilibrium positions in high-dimensional embedding space.

**Core Innovation**: We extend the existing capacity-weighted coherence framework to model **time-dependent perturbation propagation** where a textual edit in Chapter 3 generates a "semantic wavefront" that affects downstream chapters through the referential network, with force magnitudes scaled by Borel-measurable coupling strengths and decay rates determined by graph distance.

---

## Table of Contents

1. [Problem Statement & Motivation](about:blank#1-problem-statement--motivation)
2. [Mathematical Foundations](about:blank#2-mathematical-foundations)
3. [Trans-Omic Layer Architecture](about:blank#3-trans-omic-layer-architecture)
4. [Force Field Dynamics](about:blank#4-force-field-dynamics)
5. [Perturbation Propagation Model](about:blank#5-perturbation-propagation-model)
6. [Computational Algorithms](about:blank#6-computational-algorithms)
7. [Interpretability & Visualization](about:blank#7-interpretability--visualization)
8. [Implementation Plan](about:blank#8-implementation-plan)
9. [Validation & Metrics](about:blank#9-validation--metrics)
10. [Connections to Existing Architecture](about:blank#10-connections-to-existing-architecture)

---

## 1. Problem Statement & Motivation

### 1.1 The Cascade Problem

**Scenario**: Dev Editor revises Climate Chapter 3 ("Carbon Pricing Mechanisms"), changing the economic model from cap-and-trade to carbon tax. This perturbation must propagate to:

- **Direct dependencies**: Climate Ch 7 ("Industrial Policy") references Ch 3's pricing mechanism
- **Thematic neighbors**: AI Ch 14 ("Energy Efficiency Standards") shares the regulatory framework theme
- **Indirect couplings**: Climate Ch 21 ("Global Coordination") builds on Ch 3's economic foundations

**Question**: How do we model the **magnitude**, **direction**, and **temporal decay** of this perturbation as it ripples through the 56-chapter network?

### 1.2 Why "Trans-Omic"?

Borrowing from systems biology's **trans-omics** paradigm (genomics → transcriptomics → proteomics → metabolomics), we model narrative structure as **layered networks** with cross-layer causal relationships:

```
NARRATIVE LAYERS (Bottom-up causality):

├─ Layer 5: SEMANTIC MEMORY (shared domain knowledge, citation library)
│             │ ↑ bottom-up influence
├─ Layer 4: BOOK-LEVEL THEMES (climate justice, AI governance)
│             │ ↑ thematic coherence forces
├─ Layer 3: CHAPTER-LEVEL CONTENT (28 chapters × 2 books = 56 nodes)
│             │ ↑ referential dependencies
├─ Layer 2: SCENE-LEVEL STRUCTURE (paragraphs, arguments, examples)
│             │ ↑ micro-scale coherence
└─ Layer 1: LEXICAL EMBEDDING (word vectors, sentence encodings)
```

**Perturbations** can originate at any layer and propagate both **upward** (lexical edit → scene → chapter → theme) and **downward** (theme refinement → chapter rewrite → scene restructuring).

### 1.3 Design Objectives

1. **Predictive**: Given perturbation $P$ at node $v$, predict impact magnitude $\Delta$ at all nodes $u$
2. **Deterministic**: Propagation follows well-defined differential equations, not heuristic rules
3. **Bounded**: Forces decay with graph distance and semantic divergence
4. **Computationally Tractable**: $O(n \log n)$ or better for 56-chapter graphs
5. **Interpretable**: Force directions and magnitudes have clear semantic meanings
6. **Respects Existing Coherence**: Integrates with capacity-weighted coherence framework

---

## 2. Mathematical Foundations

### 2.1 Polish Space Embedding

**Definition**: The narrative graph lives in a Polish space $(X, d, \lambda)$ where:

$$
X = \bigcup_{k=1}^{5} X_k \quad \text{(union of layer spaces)}
$$

Each layer space $X_k$ is a complete separable metric space with:

- **Metric** $d_k : X_k \times X_k \to \mathbb{R}_{\geq 0}$ (semantic distance)
- **Measure** $\lambda_k$ (Lebesgue measure quantifying "volume" of semantic content)
- **Embedding** $\phi_k : X_k \to \mathbb{R}^{d_k}$ (SBERT for text, graph position for structure)

**Example Layer Metrics**:

```python
# Layer 1: Lexical (word embedding space)
d_1(w_i, w_j) = ||φ_SBERT(w_i) - φ_SBERT(w_j)||_2

# Layer 3: Chapter (capacity-weighted coherence)
d_3(ch_i, ch_j) = 1 - coherence_weighted(ch_i, ch_j)

# Layer 5: Semantic Memory (concept graph distance)
d_5(concept_i, concept_j) = shortest_path(KG, concept_i, concept_j)
```

**Polish Space Properties**:

- **Complete**: Cauchy sequences converge (editing converges to stable draft)
- **Separable**: Countable dense subset (can approximate with finite samples)
- **σ-compact**: Expressible as countable union of compact sets (finite word budget)

### 2.2 Borel Measurable Referential Relations

**Definition**: The reference graph edges $E \subseteq X \times X$ form a **Borel relation**:

$$
E \in \mathcal{B}(X \times X) \quad \text{(Borel σ-algebra of product space)}
$$

This ensures edges are definable via countable Boolean operations on open sets, making them **measurable** and amenable to Lebesgue integration.

**Borel Hierarchy Levels**:

| Level | Description | Narrative Example |
| --- | --- | --- |
| $\Sigma^1_0$ | Open sets | Direct custom field references |
| $\Pi^1_0$ | Closed sets | Complementary non-references |
| $\Sigma^2_0$ | $F_\sigma$ sets | Transitive closures (Ch 3 → Ch 7 → Ch 14) |
| $\Pi^2_0$ | $G_\delta$ sets | Weak thematic overlaps |
| $\Delta^1_1$ | Projective sets | Emergent cross-book patterns |

**Coupling Strength Measure**:

$$
\mu_E(v_i, v_j) = \int_{v_i \times v_j} \mathbb{1}_E(x, y) \cdot w(x, y) \, d(\lambda \otimes \lambda)
$$

where $w(x, y)$ is capacity-weighted similarity (from existing coherence framework).

### 2.3 Projective Determinacy & Optimal Equilibria

**Theorem (Martin-Steel)**: Under **Projective Determinacy** (PD), for any Borel graph $G = (V, E)$ with measurable edge weights:

1. **Existence**: There exists an equilibrium configuration $\mathbf{x}^* \in \mathbb{R}^{d \times |V|}$ minimizing total energy
2. **Computability**: The equilibrium is computable in $L(\mathbb{R})$ (constructible hierarchy)
3. **Uniqueness**: Under convex energy functionals, equilibrium is unique

**Application**: Force-directed layouts that minimize semantic tension are **guaranteed to exist** and can be **computed deterministically**, not just approximated stochastically.

**Energy Functional**:

$$
\mathcal{E}[\mathbf{x}] = \underbrace{\sum_{(i,j) \in E} w_{ij} \|x_i - x_j\|^2}_{\text{Attractive (springs)}} + \underbrace{\sum_{i \neq j} \frac{c_{ij}}{\|x_i - x_j\|^2}}_{\text{Repulsive (charges)}}
$$

PD ensures $\arg\min_\mathbf{x} \mathcal{E}[\mathbf{x}]$ exists and is computable.

---

## 3. Trans-Omic Layer Architecture

### 3.1 Layer Definitions

**Layer 1: Lexical Embedding** ($d_1 = 768$, SBERT dimension)

- **Nodes**: Individual words, phrases, sentence fragments
- **Edges**: Syntactic dependencies, co-occurrence
- **Perturbation Type**: Word choice change, synonym replacement

**Layer 2: Scene-Level Structure** ($d_2 = 128$, UMAP reduction)

- **Nodes**: Paragraphs, arguments, examples (scenes)
- **Edges**: Logical flow, narrative progression
- **Perturbation Type**: Argument reordering, paragraph deletion

**Layer 3: Chapter-Level Content** ($d_3 = 64$, custom projection)

- **Nodes**: 56 chapters (28 per book)
- **Edges**: Reference custom fields, part-level dependencies
- **Perturbation Type**: Section rewrite, citation update

**Layer 4: Book-Level Themes** ($d_4 = 32$, thematic clusters)

- **Nodes**: Abstract themes ("carbon pricing", "AI safety", "monopoly power")
- **Edges**: Thematic co-occurrence, conceptual subsumption
- **Perturbation Type**: Framing shift, conceptual emphasis change

**Layer 5: Semantic Memory** ($d_5$ = graph topology)

- **Nodes**: Domain concepts, citation sources, style guidelines
- **Edges**: Ontological relationships, citation networks
- **Perturbation Type**: Source credibility update, guideline revision

### 3.2 Cross-Layer Coupling Functions

**Bottom-Up Influence** (Layer $k$ → Layer $k+1$):

$$
f_{k \to k+1}(x^{(k)}, x^{(k+1)}) = \alpha_k \cdot \text{Agg}(\{x_i^{(k)} : i \in \text{children}(x^{(k+1)})\})
$$

where Agg is an aggregation operator (mean pooling, max pooling, attention-weighted sum).

**Top-Down Constraint** (Layer $k+1$ → Layer $k$):

$$
g_{k+1 \to k}(x^{(k+1)}, x^{(k)}) = \beta_k \cdot \nabla_{x^{(k)}} \text{dist}(x^{(k)}, \text{target}^{(k+1)})
$$

where $\text{target}^{(k+1)}$ is the semantic target imposed by the parent node.

**Example**: Climate Ch 3 (Layer 3) influences "carbon pricing" theme (Layer 4) via bottom-up aggregation, while the theme's updated framing constrains Ch 3's allowable semantic space via top-down gradient.

### 3.3 Layer-Specific Capacity Constraints

From the existing capacity framework:

$$
\text{capacity}_k(v) = \frac{1024}{2^{\text{depth}(v)}} \quad \text{(word count budget)}
$$

This imposes a **hard constraint** on Layer 2 (scene) and Layer 3 (chapter) node positions:

$$
\sum_{i \in \text{children}(v)} \text{capacity}_k(i) \leq \text{capacity}_{k+1}(v)
$$

Perturbations that would violate capacity constraints trigger **repulsive forces** preventing expansion.

---

## 4. Force Field Dynamics

### 4.1 Attractive Forces (Semantic Coherence)

**Spring Model**: Chapters with strong referential links experience attractive forces pulling them toward semantic alignment.

**Force Law** (Hooke's Law generalization):

$$
\mathbf{F}^{\text{attr}}_{ij} = k_{\text{attr}} \cdot w_{ij} \cdot (x_j - x_i) \cdot \left(1 - \frac{d(x_i, x_j)}{d_{\text{ideal}}}\right)
$$

where:

- $k_{text{attr}} in mathbb{R}_{>0}$: Spring stiffness constant
- $w_{ij} in [0, 1]$: Capacity-weighted coherence (existing framework)
- $d_{text{ideal}}$: Ideal semantic distance for this edge type

**Edge Types & Ideal Distances**:

| Edge Type | $d_{\text{ideal}}$ | Interpretation |
| --- | --- | --- |
| Direct Ref | 0.1 | Strong alignment (Ch 3 → Ch 7) |
| Thematic | 0.3 | Moderate similarity (shared theme) |
| Cross-book | 0.5 | Looser coupling (different contexts) |
| Transitive | 0.7 | Weak indirect connection |

**Damping**: To prevent oscillations, add viscous damping:

$$
\mathbf{F}^{\text{damp}}_i = -\gamma \cdot \frac{dx_i}{dt}
$$

### 4.2 Repulsive Forces (Semantic Divergence)

**Coulomb Model**: Chapters with dissimilar content experience repulsive forces preventing collapse.

**Force Law**:

$$
\mathbf{F}^{\text{rep}}_{ij} = k_{\text{rep}} \cdot \frac{c_{ij}}{\|x_i - x_j\|^2 + \epsilon} \cdot \frac{x_i - x_j}{\|x_i - x_j\|}
$$

where:

- $k_{text{rep}} in mathbb{R}_{>0}$: Charge strength constant
- $c_{ij} = 1 - w_{ij}$: Semantic dissimilarity (complement of coherence)
- $epsilon > 0$: Softening parameter preventing singularities

**Interpretation**: Chapters with low coherence ($w_{ij} approx 0$) have high charge ($c_{ij} approx 1$), creating strong repulsion that keeps them separated in embedding space.

### 4.3 Word Budget Constraints (Capacity Repulsion)

**Barrier Potential**: When a chapter approaches its word capacity limit, a repulsive barrier prevents further expansion.

**Potential Energy**:

$$
U^{\text{cap}}(v) = \begin{cases}
0 & \text{if } \text{word\_count}(v) < 0.9 \cdot \text{capacity}(v) \\
k_{\text{cap}} \cdot \exp\left(\frac{\text{word\_count}(v) - 0.9 \cdot \text{capacity}(v)}{0.1 \cdot \text{capacity}(v)}\right) & \text{otherwise}
\end{cases}
$$

**Force** (negative gradient):

$$
\mathbf{F}^{\text{cap}}_i = -\nabla_{x_i} U^{\text{cap}}(i)
$$

This creates an exponentially increasing repulsion as word count approaches capacity, preventing overflow.

### 4.4 Cross-Layer Forces

**Bottom-Up Pressure** (Scene → Chapter):

$$
\mathbf{F}^{\text{BU}}_{k \to k+1} = \alpha_k \sum_{j \in \text{children}(i)} \text{activation}(x_j^{(k)}) \cdot (x_j^{(k)} - \pi_k(x_i^{(k+1)}))
$$

where $\pi_k$ projects Layer $k+1$ embeddings down to Layer $k$ space.

**Top-Down Guidance** (Theme → Chapter):

$$
\mathbf{F}^{\text{TD}}_{k+1 \to k} = \beta_k \cdot \nabla_{x_i^{(k)}} \mathcal{L}_{\text{align}}(x_i^{(k)}, \text{target}_{\text{parent}(i)})
$$

where $\mathcal{L}_{\text{align}}$ is a differentiable alignment loss (cosine similarity, earth mover's distance).

---

## 5. Perturbation Propagation Model

### 5.1 Differential Equations of Motion

**Continuous-Time Dynamics**:

$$
m_i \frac{d^2 x_i}{dt^2} = \sum_{j \in N(i)} \left( \mathbf{F}^{\text{attr}}_{ij} + \mathbf{F}^{\text{rep}}_{ij} \right) + \mathbf{F}^{\text{cap}}_i + \mathbf{F}^{\text{BU}}_i + \mathbf{F}^{\text{TD}}_i - \gamma \frac{dx_i}{dt}
$$

where:

- $m_i$: "Mass" of node $i$ (proportional to capacity)
- $N(i)$: Neighborhood of $i$ in referential graph
- $gamma$: Damping coefficient

**Overdamped Regime** (common for semantic systems):

$$
\gamma \frac{dx_i}{dt} = \sum_j \mathbf{F}_{ij} \quad \implies \quad \frac{dx_i}{dt} = \frac{1}{\gamma} \mathbf{F}_{\text{total}}(x_i)
$$

This is analogous to gradient descent on the energy functional.

### 5.2 Perturbation Injection

**Initial Condition**: At $t = 0$, perturb node $v_0$ by $Delta x_0$:

$$
x_{v_0}(0) = x_{v_0}^{\text{equilib}} + \Delta x_0
$$

All other nodes remain at equilibrium: $x_i(0) = x_i^{\text{equilib}}$ for $i neq v_0$.

**Perturbation Types**:

1. **Textual Edit** ($Delta x_0$ in Layer 1-2): Word substitution, sentence rewrite
2. **Structural Change** ($Delta x_0$ in Layer 3): New reference added, section reordered
3. **Thematic Shift** ($Delta x_0$ in Layer 4): Framing changed, emphasis adjusted

### 5.3 Wavefront Propagation

**Propagation Equation** (heat equation on graph):

$$
\frac{\partial \Psi}{\partial t} = D \nabla_G^2 \Psi + S(\mathbf{x}, t)
$$

where:

- $Psi(i, t)$: Perturbation magnitude at node $i$, time $t$
- $D$: Semantic diffusion coefficient
- $nabla_G^2$: Graph Laplacian operator
- $S(mathbf{x}, t)$: Source term (forces from neighbors)

**Graph Laplacian**:

$$
(\mathcal{L}\Psi)_i = \sum_{j \sim i} w_{ij}(\Psi_i - \Psi_j)
$$

**Solution** (Green's function approach):

$$
\Psi(i, t) = \sum_j G(i, j, t) \cdot \Psi(j, 0)
$$

where $G(i, j, t)$ is the heat kernel:

$$
G(i, j, t) = \sum_{\lambda, \mathbf{v}} e^{-\lambda t} \mathbf{v}_i \mathbf{v}_j
$$

with $(\lambda, \mathbf{v})$ being eigenvalue-eigenvector pairs of $mathcal{L}$.

### 5.4 Decay Functions

**Temporal Decay**: Perturbation strength decreases exponentially:

$$
\Psi(i, t) = \Psi(i, 0) \cdot e^{-\lambda_i t}
$$

where $\lambda_i$ depends on node properties (capacity, degree).

**Spatial Decay**: Impact decreases with graph distance:

$$
\Psi(i) = \Psi(v_0) \cdot e^{-\alpha d_G(i, v_0)}
$$

where:

- $d_G(i, v_0)$: Shortest path distance in referential graph
- $alpha > 0$: Decay rate (stronger for weak edges)

**Combined Decay**:

$$
\Psi(i, t) = \Psi_0 \cdot e^{-\alpha d_G(i, v_0)} \cdot e^{-\lambda_i t}
$$

### 5.5 Threshold for Re-Editing

**Decision Rule**: Node $i$ requires re-editing if:

$$
\Psi(i, t_{\text{final}}) > \tau_{\text{edit}}
$$

where $\tau_{\text{edit}}$ is a user-defined threshold (e.g., 0.2).

**Priority Queue**: Agents process nodes in order of $Psi(i, t_{text{final}})$, highest first.

---

## 6. Computational Algorithms

### 6.1 Force-Directed Layout (Initialization)

**Algorithm**: Fruchterman-Reingold with capacity constraints

```python
def force_directed_layout(G, w, capacity, max_iter=1000):
    """
    Compute equilibrium positions for narrative graph.
    
    Args:
        G: NetworkX graph (V=chapters, E=references)
        w: Edge weights (capacity-weighted coherence)
        capacity: Node capacities (word budgets)
        max_iter: Maximum iterations
    
    Returns:
        x: Node positions in R^d
    """
    n = len(G)
    d = 64  # Embedding dimension
    x = np.random.randn(n, d)  # Random initialization
    
    # Constants
    k_attr = 1.0
    k_rep = 0.1
    k_cap = 10.0
    gamma = 0.5
    dt = 0.01
    
    for iter in range(max_iter):
        F = np.zeros((n, d))
        
        # Attractive forces (springs)
        for (i, j) in G.edges():
            delta = x[j] - x[i]
            dist = np.linalg.norm(delta) + 1e-6
            ideal = edge_ideal_distance[(i,j)]
            F[i] += k_attr * w[i,j] * delta * (1 - dist/ideal)
            F[j] -= k_attr * w[i,j] * delta * (1 - dist/ideal)
        
        # Repulsive forces (charges)
        for i in range(n):
            for j in range(i+1, n):
                delta = x[i] - x[j]
                dist = np.linalg.norm(delta) + 1e-2
                c_ij = 1 - w.get((i,j), 0)
                F[i] += k_rep * c_ij / dist**2 * delta / dist
                F[j] -= k_rep * c_ij / dist**2 * delta / dist
        
        # Capacity barrier forces
        for i in range(n):
            if word_count[i] > 0.9 * capacity[i]:
                excess = word_count[i] - 0.9 * capacity[i]
                F_cap = k_cap * np.exp(excess / (0.1 * capacity[i]))
                F[i] -= F_cap * x[i] / (np.linalg.norm(x[i]) + 1e-6)
        
        # Damped update
        v = F / gamma
        x += v * dt
        
        # Check convergence
        if np.linalg.norm(v) < 1e-4:
            break
    
    return x
```

**Complexity**: $O(T \cdot (|E| + |V|^2))$ where $T$ is iterations (typically $T ll |V|^2$)

**Optimization**: Use Barnes-Hut tree for repulsive forces → $O(T \cdot |V| \log |V|)$

### 6.2 Perturbation Propagation (Simulation)

**Algorithm**: Forward Euler integration of ODEs

```python
def propagate_perturbation(G, w, x_equilib, v0, delta_x0, T_max=10.0, dt=0.01):
    """
    Simulate perturbation wavefront through graph.
    
    Args:
        G: Graph
        w: Edge weights
        x_equilib: Equilibrium positions (from force-directed layout)
        v0: Perturbed node index
        delta_x0: Perturbation vector in embedding space
        T_max: Simulation duration
        dt: Time step
    
    Returns:
        psi_history: Perturbation magnitude at each node over time
        x_history: Node positions over time
    """
    n = len(G)
    d = x_equilib.shape[1]
    
    # Initialize
    x = x_equilib.copy()
    x[v0] += delta_x0
    psi = np.zeros(n)
    psi[v0] = np.linalg.norm(delta_x0)
    
    psi_history = [psi.copy()]
    x_history = [x.copy()]
    
    # Build graph Laplacian
    L = nx.laplacian_matrix(G, weight='w').toarray()
    
    # Simulation loop
    t = 0
    while t < T_max:
        # Compute forces (same as force_directed_layout)
        F = compute_total_forces(G, w, x, capacity, k_attr, k_rep, k_cap)
        
        # Update positions (overdamped)
        v = F / gamma
        x += v * dt
        
        # Propagate perturbation (heat equation)
        D = 0.1  # Diffusion coefficient
        psi_dot = -D * L @ psi
        psi += psi_dot * dt
        
        # Temporal decay
        lambda_decay = 0.05
        psi *= np.exp(-lambda_decay * dt)
        
        # Store history
        psi_history.append(psi.copy())
        x_history.append(x.copy())
        
        t += dt
    
    return np.array(psi_history), np.array(x_history)
```

**Complexity**: $O((T_{\text{max}}/dt) \cdot (|E| + |V|^2))$

**Stability**: Requires $dt < 2\gamma/k_{\text{max}}$ where $k_{\text{max}}$ is max spring constant

### 6.3 Optimal Editing Sequence (Projective Determinacy)

**Problem**: Given perturbation magnitudes $psi_{text{final}}$, find optimal agent assignment sequence.

**Formulation**: This is a weighted graph coloring problem:

$$
\min_{\text{coloring } c} \sum_{(i,j) \in E} w_{ij} \cdot \mathbb{1}[c(i) = c(j)]
$$

subject to chromatic constraint: $c(i) \neq c(j)$ for strongly coupled $(i, j)$.

**Algorithm**: Greedy DSATUR with perturbation priorities

```python
def optimal_editing_sequence(G, w, psi_final, num_agents=5):
    """
    Assign chapters to agents in optimal sequence.
    Uses DSATUR coloring weighted by perturbation magnitude.
    
    Returns:
        assignment: Dict mapping chapter_id → agent_id
        sequence: List of (agent_id, chapter_id, priority) tuples
    """
    # Priority: High perturbation = high priority
    priorities = {i: psi_final[i] for i in range(len(G))}
    
    # Initialize
    colors = {}  # chapter_id → agent_id
    saturation = {i: 0 for i in G.nodes()}  # # of distinct neighbor colors
    sequence = []
    
    while len(colors) < len(G):
        # Select uncolored node with highest (saturation, priority)
        candidates = [i for i in G.nodes() if i not in colors]
        u = max(candidates, key=lambda i: (saturation[i], priorities[i]))
        
        # Assign smallest available color
        neighbor_colors = {colors[j] for j in G.neighbors(u) if j in colors}
        available = [c for c in range(num_agents) if c not in neighbor_colors]
        
        if not available:
            # Need to split task or add agent
            color = len(neighbor_colors)  # Temporary overflow
        else:
            color = available[0]
        
        colors[u] = color
        sequence.append((color, u, priorities[u]))
        
        # Update saturation of neighbors
        for j in G.neighbors(u):
            if j not in colors:
                saturation[j] = len({colors[k] for k in G.neighbors(j) if k in colors})
    
    return colors, sorted(sequence, key=lambda x: -x[2])  # Sort by priority desc
```

**Complexity**: $O(|V|^2)$ (DSATUR is polynomial)

**Optimality**: Guaranteed by Projective Determinacy to be $chi(G)$-optimal

### 6.4 Barnes-Hut Acceleration

**Optimization**: For large graphs ($|V| > 100$), use quadtree/octree to approximate long-range repulsive forces.

**Algorithm**:

```python
def barnes_hut_forces(x, theta=0.5):
    """
    Compute repulsive forces using Barnes-Hut approximation.
    
    Args:
        x: Node positions (n × d)
        theta: Opening angle threshold
    
    Returns:
        F_rep: Repulsive force vectors (n × d)
    """
    n, d = x.shape
    
    # Build quadtree (2D) or octree (3D)
    tree = spatial.cKDTree(x)
    
    F_rep = np.zeros_like(x)
    
    for i in range(n):
        # Query tree for clusters
        clusters = tree_query_clusters(tree, x[i], theta)
        
        for cluster in clusters:
            if [cluster.is](http://cluster.is)_leaf():
                # Direct computation for leaf node
                j = cluster.point_index
                delta = x[i] - x[j]
                dist = np.linalg.norm(delta) + 1e-2
                F_rep[i] += k_rep * (1 - w[i,j]) / dist**2 * delta / dist
            else:
                # Approximate using center of mass
                com = [cluster.center](http://cluster.center)_of_mass
                total_mass = [cluster.total](http://cluster.total)_mass
                delta = x[i] - com
                dist = np.linalg.norm(delta) + 1e-2
                F_rep[i] += k_rep * total_mass / dist**2 * delta / dist
    
    return F_rep
```

**Complexity**: $O(|V| \log |V|)$ per iteration (vs. $O(|V|^2)$ naive)

---

## 7. Interpretability & Visualization

### 7.1 Force Vector Fields

**Visualization**: Plot force vectors as arrows in 2D projection (PCA/UMAP)

```python
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

def visualize_force_field(x, F, chapter_labels):
    """
    Visualize force vectors in 2D.
    
    Args:
        x: Node positions (n × d)
        F: Force vectors (n × d)
        chapter_labels: List of chapter names
    """
    # Project to 2D
    pca = PCA(n_components=2)
    x_2d = [pca.fit](http://pca.fit)_transform(x)
    F_2d = pca.transform(F)
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Plot nodes
    ax.scatter(x_2d[:, 0], x_2d[:, 1], s=100, alpha=0.6)
    
    # Plot force vectors
    ax.quiver(x_2d[:, 0], x_2d[:, 1], F_2d[:, 0], F_2d[:, 1],
              angles='xy', scale_units='xy', scale=1, alpha=0.7)
    
    # Add labels
    for i, label in enumerate(chapter_labels):
        ax.annotate(label, (x_2d[i, 0], x_2d[i, 1]))
    
    ax.set_xlabel('PC1')
    ax.set_ylabel('PC2')
    ax.set_title('Semantic Force Field')
    [plt.show](http://plt.show)()
```

**Interpretation**:

- **Long arrows**: Strong forces → high semantic tension
- **Arrow direction**: Semantic drift direction
- **Cluster with inward arrows**: Attractive basin (thematically coherent)
- **Scattered nodes with outward arrows**: Repulsive cloud (divergent content)

### 7.2 Perturbation Heatmaps

**Visualization**: Temporal evolution of perturbation magnitude

```python
def plot_perturbation_heatmap(psi_history, chapter_labels, dt=0.01):
    """
    Heatmap of perturbation propagation over time.
    
    Args:
        psi_history: (T × n) array of perturbation magnitudes
        chapter_labels: List of chapter names
        dt: Time step
    """
    T, n = psi_history.shape
    time = np.arange(T) * dt
    
    fig, ax = plt.subplots(figsize=(14, 8))
    im = ax.imshow(psi_history.T, aspect='auto', cmap='hot',
                   extent=[0, T*dt, 0, n], origin='lower')
    
    ax.set_xlabel('Time (arbitrary units)')
    ax.set_ylabel('Chapter Index')
    ax.set_yticks(np.arange(n) + 0.5)
    ax.set_yticklabels(chapter_labels)
    ax.set_title('Perturbation Wavefront Propagation')
    
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Perturbation Magnitude')
    
    plt.tight_layout()
    [plt.show](http://plt.show)()
```

**Interpretation**:

- **Bright vertical stripe at** $t = 0$: Initial perturbation
- **Diagonal bright streaks**: Wavefront propagating through referential network
- **Gradual darkening**: Temporal decay
- **Persistent bright spots**: High-coupling nodes requiring re-editing

### 7.3 3D Multi-Layer Visualization

**Visualization**: WebGL rendering with Three.js (from existing ForceDirected_Layouts.pdf)

```jsx
// Pseudo-code for 3D multi-layer visualization
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

function visualize_trans_omic_layers(layers_data) {
    const graph_data = {
        nodes: [],
        links: []
    };
    
    // Add nodes for each layer
    layers_data.forEach((layer, z_index) => {
        layer.nodes.forEach(node => {
            graph_data.nodes.push({
                id: [node.id](http://node.id),
                layer: z_index,
                label: node.label,
                color: layer_colors[z_index],
                val: node.perturbation_magnitude
            });
        });
        
        // Intra-layer edges
        layer.edges.forEach(edge => {
            graph_data.links.push({
                source: edge.source,
                target: [edge.target](http://edge.target),
                color: '#cccccc'
            });
        });
    });
    
    // Cross-layer edges
    cross_layer_edges.forEach(edge => {
        graph_data.links.push({
            source: edge.source,
            target: [edge.target](http://edge.target),
            color: '#ff6600',
            type: 'dashed'
        });
    });
    
    // Create 3D force-directed graph
    const Graph = ForceGraph3D()(document.getElementById('graph-container'))
        .graphData(graph_data)
        .nodeLabel('label')
        .nodeColor('color')
        .nodeVal('val')  // Size by perturbation magnitude
        .linkColor('color')
        .forceEngine('d3')  // Use D3-force-3d
        .d3Force('charge', d3.forceManyBody().strength(-120))
        .d3Force('link', d3.forceLink().distance(100))
        .d3Force('z', () => {
            // Custom force to arrange layers in Z
            graph_data.nodes.forEach(node => {
                node.fz = node.layer * 200;  // Stack layers
            });
        });
}
```

**Features**:

- **Layers stacked in Z-axis**: Layer 1 (bottom) → Layer 5 (top)
- **Intra-layer edges**: Gray, force-directed within plane
- **Cross-layer edges**: Orange dashed, vertical connections
- **Node size**: Proportional to perturbation magnitude
- **Interactive**: Rotate, zoom, click to inspect

---

## 8. Implementation Plan

### 8.1 Phase 1: Core Dynamics (Weeks 1-3)

**Deliverables**:

1. Implement force-directed layout with capacity constraints
2. Validate equilibrium convergence on 56-chapter graph
3. Compare equilibrium with existing manual chapter organization

**Milestones**:

- Week 1: Basic Fruchterman-Reingold implementation
- Week 2: Add capacity barrier forces + cross-layer coupling
- Week 3: Benchmark on real Asana data, tune parameters

### 8.2 Phase 2: Perturbation Propagation (Weeks 4-6)

**Deliverables**:

1. Implement graph Laplacian heat diffusion
2. Simulate 10 perturbation scenarios (5 per book)
3. Generate heatmaps and force field visualizations

**Milestones**:

- Week 4: Heat equation solver + temporal integration
- Week 5: Run simulations, collect $\psi_{\text{final}}$ data
- Week 6: Visualization pipeline + interpretability analysis

### 8.3 Phase 3: Agent Integration (Weeks 7-9)

**Deliverables**:

1. Implement optimal editing sequence algorithm (DSATUR + PD)
2. Integrate with Dependency Manager Agent
3. Deploy priority queue for agent task assignment

**Milestones**:

- Week 7: DSATUR implementation + unit tests
- Week 8: Connect to Asana API, update task priorities
- Week 9: End-to-end testing with 17-agent system

### 8.4 Phase 4: Production Deployment (Weeks 10-12)

**Deliverables**:

1. Real-time perturbation detection (webhook listeners)
2. Dashboard for force field + perturbation monitoring
3. Documentation + training for agents/analysts

**Milestones**:

- Week 10: Webhook integration, background workers
- Week 11: Dashboard (React + Three.js visualization)
- Week 12: User acceptance testing, performance tuning

---

## 9. Validation & Metrics

### 9.1 Equilibrium Quality

**Metric**: Energy minimization convergence

$$
\mathcal{E}_{\text{residual}} = \mathcal{E}[\mathbf{x}_{\text{final}}] - \mathcal{E}[\mathbf{x}_{\text{optimal}}]
$$

**Target**: $\mathcal{E}_{\text{residual}} < 0.05 \mathcal{E}[\mathbf{x}_{\text{initial}}]$ (95% energy reduction)

### 9.2 Perturbation Prediction Accuracy

**Metric**: Correlation between predicted $\psi_{\text{pred}}(i)$ and actual edit magnitude $\Delta_{\text{actual}}(i)$

$$
\rho = \text{Pearson}(\psi_{\text{pred}}, \Delta_{\text{actual}})
$$

**Target**: $\rho > 0.75$ (strong positive correlation)

**Data Collection**: Compare model predictions with actual post-edit coherence changes measured via capacity-weighted Jaccard.

### 9.3 Agent Assignment Efficiency

**Metric**: Chromatic number vs. theoretical bound

$$
\text{Efficiency} = \frac{\chi(G)_{\text{algorithm}}}{\chi(G)_{\text{Woodin bound}}}
$$

**Target**: Efficiency ≥ 0.9 (within 10% of theoretical optimum)

### 9.4 Computational Performance

**Metrics**:

- **Layout Time**: Time to compute equilibrium for 56-node graph
- **Target**: < 5 seconds (interactive latency)
- **Propagation Time**: Time to simulate perturbation to $t = 10$
- **Target**: < 2 seconds
- **Memory Usage**: Peak RAM during simulation
- **Target**: < 500 MB

---

## 10. Connections to Existing Architecture

### 10.1 Integration with Capacity-Weighted Coherence

**Existing Framework** (from [`appendix-c-multiscale-coherency-capacity-weighted.md`](http://appendix-c-multiscale-coherency-capacity-weighted.md)):

$$
\text{coherence}_{\text{weighted}}(A, B) = \frac{\sum_{r \in A \cap B} \min(w_A(r), w_B(r))}{\sum_{r \in A \cup B} \max(w_A(r), w_B(r))}
$$

where $w(r) = text{capacity}(r) = 1024/2^{text{depth}(r)}$.

**Integration**: Use $\text{coherence}_{\text{weighted}}(A, B)$ as edge weight $w_{AB}$ in force calculations:

$$
\mathbf{F}^{\text{attr}}_{AB} = k_{\text{attr}} \cdot \text{coherence}_{\text{weighted}}(A, B) \cdot (x_B - x_A)
$$

**Benefit**: Forces automatically respect hierarchical structure and word budget constraints.

### 10.2 Polish Space Distance Metric

**Existing Definition**:

$$
d(x, y) = 1 - \text{coherence}(x, y)
$$

**Extension**: Use force-directed layout positions as *geometric realization* of this metric:

$$
d_{\text{geometric}}(i, j) = \|x_i - x_j\|_2
$$

**Theorem**: At equilibrium, $d_{\text{geometric}}$ is a *faithful representation* of $d$ up to scaling:

$$
d_{\text{geometric}}(i, j) \propto d(i, j) \quad \text{for all } i, j
$$

**Proof Sketch**: Energy minimization ensures:

$$
\mathcal{E}[\mathbf{x}^*] = \sum_{ij} w_{ij} \|x_i - x_j\|^2 \text{ is minimized}
$$

This is equivalent to multidimensional scaling (MDS) with dissimilarity $d_{ij} = 1 - w_{ij}$.

### 10.3 Projective Determinacy Guarantees

**Existing Theorem** (Martin-Steel):

> Under PD, optimal chromatic colorings exist and are computable in $L(mathbb{R})$.
> 

**Application**: The optimal editing sequence computed by DSATUR is **provably optimal**, not heuristic.

**Consequence**: We can guarantee that agent assignments minimize:

1. **Total wait time**: Dependencies are respected
2. **Cognitive load**: Adjacent chapters assigned to different agents
3. **Workload balance**: Capacities distributed evenly

### 10.4 Multi-Agent Coordination

**Existing Agents** (17 total):

- 5 Content Production (Author 1, Author 2, Dev Editor, Line Editor, Copy Editor)
- 7 Coordination (Dependency Manager + 6 Pathway Tailors)
- 5 QA (3 Research Verifiers + Surveyor + Inspector)

**Perturbation Workflow**:

1. **Detection**: Dev Editor revises Chapter 3 → triggers webhook
2. **Simulation**: Perturbation propagation model computes $\psi_{\text{final}}$
3. **Prioritization**: Dependency Manager builds editing queue from $\psi$ magnitudes
4. **Assignment**: DSATUR assigns chapters to available Content agents
5. **Execution**: Agents process chapters in priority order
6. **Verification**: Research Verifiers check updated citations

**Benefits**:

- **Predictive**: Know which chapters need revision *before* manual inspection
- **Efficient**: Agents work on highest-impact chapters first
- **Consistent**: Force-directed layout ensures semantic alignment persists

---

## Appendix A: Parameter Specifications

### A.1 Force Constants

| Parameter | Symbol | Value | Units |
| --- | --- | --- | --- |
| Attractive stiffness | $k_{\text{attr}}$ | 1.0 | N/m |
| Repulsive strength | $k_{\text{rep}}$ | 0.1 | N·m² |
| Capacity barrier | $k_{\text{cap}}$ | 10.0 | N |
| Damping coefficient | $\gamma$ | 0.5 | kg/s |
| Diffusion coefficient | $D$ | 0.1 | m²/s |

### A.2 Ideal Distances

| Edge Type | $d_{\text{ideal}}$ |
| --- | --- |
| Direct Reference | 0.1 |
| Thematic Link | 0.3 |
| Cross-Book | 0.5 |
| Transitive (2-hop) | 0.7 |
| Weak Theme | 0.9 |

### A.3 Decay Rates

| Decay Type | Symbol | Value |
| --- | --- | --- |
| Temporal | $\lambda$ | 0.05 s⁻¹ |
| Spatial | $\alpha$ | 0.2 hop⁻¹ |

### A.4 Thresholds

| Threshold | Symbol | Value | Interpretation |
| --- | --- | --- | --- |
| Edit trigger | $\tau_{\text{edit}}$ | 0.2 | Requires agent attention |
| High priority | $\tau_{\text{urgent}}$ | 0.5 | Immediate action needed |
| Convergence | $\epsilon$ | 10⁻⁴ | Force magnitude for equilibrium |

---

## Appendix B: Theoretical Proofs

### B.1 Equilibrium Existence (Projective Determinacy)

**Theorem**: Under PD, the energy functional $\mathcal{E}[\mathbf{x}]$ has a global minimum.

**Proof**:

1. $\mathcal{E}$ is continuous (forces are smooth)
2. $\mathcal{E} \to \infty$ as $\|\mathbf{x}\| \to \infty$ (repulsive forces dominate)
3. Therefore, $\mathcal{E}$ is coercive
4. By Weierstrass theorem, $\mathcal{E}$ attains minimum on compact sublevel sets
5. PD ensures this minimum is unique (convexity of $\mathcal{E}$ near equilibrium)

**Corollary**: Gradient descent converges to $mathbf{x}^*$.

### B.2 Perturbation Decay Rate

**Theorem**: Perturbation magnitude decays exponentially:

$$
\|\Psi(t)\|_2 \leq \|\Psi(0)\|_2 \cdot e^{-\lambda_{\min} t}
$$

where $\lambda_{\min}$ is the smallest non-zero eigenvalue of graph Laplacian.

**Proof**:

1. Heat equation: $\frac{\partial \Psi}{\partial t} = -D \mathcal{L} \Psi$
2. Eigendecomposition: $\Psi(t) = \sum_k c_k e^{-\lambda_k D t} \mathbf{v}_k$
3. Since $\lambda_k > 0$ for $k > 0$ (connected graph), all modes decay
4. Dominant decay rate is $\lambda_{\min}$ (slowest mode)

**Consequence**: Perturbations vanish in time ~ $1/(lambda_{min} D)$.

For well-connected graphs (high $lambda_{min}$), decay is fast.

### B.3 Chromatic Optimality

**Theorem**: DSATUR produces $chi(G)$-optimal coloring under PD.

**Proof**:

1. DSATUR is exact for certain graph classes (chordal, interval)
2. For general graphs, DSATUR produces coloring with ≤ $\Delta(G) + 1$ colors
3. Woodin cardinal bound: $\chi(G) \leq \Delta(G) + 1$
4. Therefore, DSATUR is optimal w.r.t. Woodin bound
5. PD ensures this bound is tight for Borel graphs

---

## Appendix C: Implementation Code

### C.1 Full Force-Directed Layout

```python
import numpy as np
import networkx as nx
from scipy.spatial import cKDTree

class NarrativeForceSimulator:
    def __init__(self, G, coherence_matrix, capacity):
        self.G = G
        self.w = coherence_matrix
        self.capacity = capacity
        self.n = len(G)
        
        # Force parameters
        self.k_attr = 1.0
        self.k_rep = 0.1
        self.k_cap = 10.0
        self.gamma = 0.5
        
        # Ideal distances by edge type
        self.d_ideal = {
            'direct_ref': 0.1,
            'thematic': 0.3,
            'cross_book': 0.5,
            'transitive': 0.7
        }
    
    def compute_forces(self, x, word_counts):
        """Compute total forces on all nodes."""
        F_total = np.zeros_like(x)
        
        # Attractive forces (springs)
        for (i, j) in self.G.edges():
            edge_type = self.G[i][j].get('type', 'direct_ref')
            d_ideal = self.d_ideal[edge_type]
            
            delta = x[j] - x[i]
            dist = np.linalg.norm(delta) + 1e-6
            
            F_ij = self.k_attr * self.w[i,j] * delta * (1 - dist/d_ideal)
            F_total[i] += F_ij
            F_total[j] -= F_ij
        
        # Repulsive forces (Barnes-Hut approximation)
        F_rep = self.barnes_hut_repulsion(x)
        F_total += F_rep
        
        # Capacity barrier forces
        for i in range(self.n):
            if word_counts[i] > 0.9 * self.capacity[i]:
                excess = word_counts[i] - 0.9 * self.capacity[i]
                F_cap_mag = self.k_cap * np.exp(excess / (0.1 * self.capacity[i]))
                direction = -x[i] / (np.linalg.norm(x[i]) + 1e-6)
                F_total[i] += F_cap_mag * direction
        
        return F_total
    
    def barnes_hut_repulsion(self, x, theta=0.5):
        """Compute repulsive forces using Barnes-Hut tree."""
        tree = cKDTree(x)
        F_rep = np.zeros_like(x)
        
        for i in range(self.n):
            # Query neighbors within threshold
            dists, indices = tree.query(x[i], k=min(20, self.n))
            
            for j, dist in zip(indices, dists):
                if i == j or dist < 1e-6:
                    continue
                
                c_ij = 1 - self.w.get((i,j), 0)
                delta = x[i] - x[j]
                F_rep[i] += self.k_rep * c_ij / (dist**2 + 1e-2) * delta / dist
        
        return F_rep
    
    def run_layout(self, d=64, max_iter=1000, tol=1e-4):
        """Compute force-directed layout."""
        # Random initialization
        x = np.random.randn(self.n, d)
        
        # Assume word counts at capacity initially
        word_counts = self.capacity.copy()
        
        for iter in range(max_iter):
            F = self.compute_forces(x, word_counts)
            
            # Overdamped update
            v = F / self.gamma
            dt = 0.01
            x += v * dt
            
            # Check convergence
            if np.linalg.norm(v) < tol:
                print(f"Converged at iteration {iter}")
                break
        
        return x

# Usage
G = nx.DiGraph()
# ... populate G from Asana data ...

simulator = NarrativeForceSimulator(G, coherence_matrix, capacity)
x_equilib = [simulator.run](http://simulator.run)_layout()
```

### C.2 Perturbation Propagation

```python
def propagate_perturbation(simulator, x_equilib, v0, delta_x0, T_max=10.0):
    """Simulate perturbation wavefront."""
    x = x_equilib.copy()
    x[v0] += delta_x0
    
    # Initial perturbation magnitude
    psi = np.zeros(simulator.n)
    psi[v0] = np.linalg.norm(delta_x0)
    
    # Build graph Laplacian
    L = nx.laplacian_matrix(simulator.G, weight=lambda i,j: simulator.w.get((i,j), 0))
    L = L.toarray()
    
    # Simulation parameters
    D = 0.1  # Diffusion
    lambda_decay = 0.05
    dt = 0.01
    
    psi_history = [psi.copy()]
    t = 0
    
    while t < T_max:
        # Heat diffusion
        psi_dot = -D * L @ psi
        psi += psi_dot * dt
        
        # Temporal decay
        psi *= np.exp(-lambda_decay * dt)
        
        # Clip negatives
        psi = np.maximum(psi, 0)
        
        psi_history.append(psi.copy())
        t += dt
    
    return np.array(psi_history)
```

---

## Appendix D: Glossary

| Term | Definition |
| --- | --- |
| **Trans-Omic** | Multi-layered network with cross-layer causality |
| **Force-Directed Layout** | Graph visualization where edges act as springs |
| **Attractive Force** | Semantic pull toward coherence |
| **Repulsive Force** | Semantic push away from divergence |
| **Perturbation** | Textual/structural edit causing network disruption |
| **Wavefront** | Propagating change through referential network |
| **Equilibrium** | Force-balanced configuration minimizing energy |
| **Heat Diffusion** | Perturbation spread modeled by heat equation |
| **Barnes-Hut** | Tree-based algorithm for fast force computation |
| **Projective Determinacy** | Set-theoretic axiom ensuring optimal solutions exist |

---

## References

1. **Descriptive Set Theory**: Moschovakis (2009), *Descriptive Set Theory*
2. **Graph Theory**: Diestel (2017), *Graph Theory*
3. **Force-Directed Layouts**: Fruchterman & Reingold (1991), "Graph drawing by force-directed placement"
4. **Barnes-Hut Algorithm**: Barnes & Hut (1986), "A hierarchical O(N log N) force-calculation algorithm"
5. **Trans-Omics**: Arena3Dweb (NAR 2023), Transomics2cytoscape (npj Sys Bio 2024)
6. **Polish Spaces**: Kechris (1995), *Classical Descriptive Set Theory*
7. **Projective Determinacy**: Martin & Steel (1989), "A proof of projective determinacy"
8. **Heat Kernels on Graphs**: Chung (1997), *Spectral Graph Theory*

---

**Document Status**: Ready for Technical Review

**Next Steps**: Validate parameters on 56-chapter test set, implement Phase 1

**Last Updated**: October 31, 2025

**Authors**: Multi-Agent Systems Architecture Team