# Superficial Layer Metrics: Surface Tension & Tortuosity

## Overview

This page documents **superficial overlay metrics** designed for minimal cognitive load while preserving mathematical rigor. The term "superficial" follows topological convention: boundary measures (∂A) rather than interior/volume measures (int(A))—carrying no pejorative implication.

**Design Philosophy**: The analytics core computes full measure-theoretic state (σ-algebras, Radon-Nikodym derivatives, conditional expectations), but visualization overlays **project onto cognitive subspaces** matched to user depth requirements.

---

## Cognitive Depth Stratification

### Measure Group Hierarchy

| **Overlay Layer** | **Measure Group** | **Cognitive Requirement** | **Physical Analog** |
| --- | --- | --- | --- |
| **Superficial (1)** | Boundary measures: γ_sem, τ_narr, ∂coherence | Pattern recognition | Surface phenomena |
| **Intermediate (2)** | Aggregate measures: c_chapter, w_ij | Graph topology | Interface coupling |
| **Deep (3)** | Violation measures: {Q_i < θ_i} | Multi-attribute reasoning | Bulk properties |
| **Deepest (4)** | Dynamic measures: ψ(i,t), spectral decomposition | Temporal + spectral intuition | Field evolution |

**Key Architectural Principle**: Each layer **filters** the holistic measure space to measures appropriate for its cognitive depth. Superficial layer requires only **immediate perception**—no mathematical machinery visible to user.

---

## Metric 1: Surface Tension (γ_sem)

### Physical Context

**Shear Stress** (τ): Volume phenomenon requiring full 3D strain field knowledge across depth.

$$tau = mu frac{partial u}{partial z}$$

Requires:

- Velocity gradient through entire volume
- Viscosity coefficient
- Boundary condition integration

**Surface Tension** (γ): Boundary phenomenon, 2D interface energy.

$$gamma = frac{partial E}{partial A}$$

Requires:

- Only interface configuration
- Local energy balance
- No interior knowledge

### Semantic Translation

**Full Shear (Deep Layer)**: Requires conditional expectation machinery:

$$tau^{text{vert}}*A = c_A - mathbb{E}[c*{text{children}} mid mathcal{F}_A]$$

This needs:

- Filtration knowledge (ℱ₀ ⊃ ℱ₁ ⊃ ... ⊃ ℱₙ)
- Capacity-weighted aggregation
- Full compositional hierarchy

**Surface Tension (Superficial Layer)**: Boundary discontinuity only:

$$gamma_{text{sem}}(i, i+1) = sum_{j=1}^{m} |c_i^{(j)} - c_{i+1}^{(j)}| cdot w_j$$

This is the **L¹ compositional distance** between adjacent sentences.

**Interpretation**:

- γ_sem = 0: Perfectly smooth tonal transition
- γ_sem > threshold: Abrupt shift requiring smoothing "energy"
- User sees: Thick colored borders between sentence rows in Entity Grid Heatmap

### Implementation Notes

```python
def compute_surface_tension(
    self,
    sentence_i: str,
    sentence_j: str,
    tone_weights: Optional[Dict[str, float]] = None
) -> float:
    """
    Compute L¹ compositional discontinuity between adjacent sentences.
    
    Args:
        sentence_i: First sentence ID
        sentence_j: Adjacent sentence ID
        tone_weights: Optional weights {tone: w_j} (default: uniform)
    
    Returns:
        γ_sem ∈ [0, 2] (max when compositions are disjoint)
    """
    c_i = self.export.compositions.get(sentence_i)
    c_j = self.export.compositions.get(sentence_j)
    
    if c_i is None or c_j is None:
        return 0.0
    
    # L¹ distance with optional weighting
    if tone_weights is None:
        gamma_sem = np.sum(np.abs(c_i - c_j))
    else:
        weights = np.array([tone_weights.get(tone, 1.0) for tone in sorted(tone_weights.keys())])
        gamma_sem = np.sum(weights * np.abs(c_i - c_j))
    
    return gamma_sem
```

**Visualization**: Add to `entity_[heatmap.py](http://heatmap.py)`:

```python
def _add_surface_tension_borders(
    self,
    fig: go.Figure,
    matrix: pd.DataFrame,
    threshold: float = 0.3
):
    """
    Add thick colored borders where compositional discontinuity exceeds threshold.
    """
    sentence_ids = matrix.index
    shapes = []
    
    for idx in range(len(sentence_ids) - 1):
        sent_i = sentence_ids[idx]
        sent_j = sentence_ids[idx + 1]
        
        gamma_sem = self.compute_surface_tension(sent_i, sent_j)
        
        if gamma_sem > threshold:
            # Horizontal line between sentence rows
            shapes.append(dict(
                type='line',
                xref='paper',
                yref='y',
                x0=0,
                y0=idx + 0.5,
                x1=1,
                y1=idx + 0.5,
                line=dict(
                    color=self._tension_color(gamma_sem),
                    width=min(gamma_sem * 10, 5),  # Cap at 5px
                    dash='solid'
                )
            ))
    
    fig.update_layout(shapes=fig.layout.shapes + tuple(shapes))

def _tension_color(self, gamma: float) -> str:
    """Map tension to color: green → yellow → red."""
    if gamma < 0.3:
        return 'rgb(0, 255, 0)'  # Green (smooth)
    elif gamma < 0.6:
        return 'rgb(255, 255, 0)'  # Yellow (moderate)
    else:
        return 'rgb(255, 0, 0)'  # Red (abrupt)
```

---

## Metric 2: Narrative Tortuosity (τ_narr)

### Physical Context

In porous media, **tortuosity** measures path efficiency:

$$tau_{text{tort}} = frac{L_{text{actual}}}{L_{text{straight}}}$$

- τ = 1: Perfectly straight diffusion path (efficient)
- τ > 1: Tortuous path through pores (inefficient)
- Appears in effective diffusivity: D_eff = D₀/τ²

### Semantic Translation

**Narrative tortuosity** measures how efficiently a text progresses through semantic space over a window [i, i+k]:

$$tau_{text{narr}}(i, i+k) = frac{sum_{j=i}^{i+k-1} d(s_j, s_{j+1})}{d(s_i, s_{i+k})}$$

where d(sᵢ, sⱼ) is a **shallow distance metric** requiring no deep analysis.

### Three Distance Metric Options

### Option A: Entity Transition Distance (Recommended for Superficial Layer)

$$d_{text{entity}}(s_i, s_j) = 1 - frac{|E_i cap E_j|}{|E_i cup E_j|}$$

where Eᵢ is the set of entities in sentence i.

**Advantages**:

- Purely syntactic (entity extraction is shallow NLP)
- Directly visible in Entity Grid Heatmap
- No compositional knowledge required

**Interpretation**: High τ_narr = entities keep appearing/disappearing/reappearing (wandering focus).

### Option B: Compositional Distance (Connects to Measure Framework)

$$d_{text{comp}}(s_i, s_j) = ||c_i - c_j||*1 = sum*{j=1}^{m} |c_i^{(j)} - c_j^{(j)}|$$

**Advantages**:

- Uses existing c_A from analytics core
- Measures tone wandering in simplex space
- Natural extension of surface tension

**Interpretation**: High τ_narr = tone keeps shifting back and forth instead of smooth progression.

### Option C: Lexical Cohesion Distance (Pure Semantics)

$$d_{text{lex}}(s_i, s_j) = 1 - cos(text{tfidf}_i, text{tfidf}_j)$$

**Advantages**:

- Captures topic drift
- No entity or composition dependency

**Interpretation**: High τ_narr = topic keeps veering away and returning.

### Recommended Implementation

**Use compositional distance** (Option B) because:

1. Analytics core already computes c_A for all nodes
2. Directly measures tone wandering
3. Connects naturally to measure-theoretic foundation
4. But requires **no understanding** of that foundation to **see** the result

```python
def compute_narrative_tortuosity(
    self,
    sentence_range: List[str],
    window_size: int = 5,
    metric: str = 'compositional'
) -> Dict[str, float]:
    """
    Compute narrative tortuosity for sliding windows.
    
    Args:
        sentence_range: Ordered list of sentence IDs
        window_size: Length of path to measure (default: 5 sentences)
        metric: 'entity' | 'compositional' | 'lexical'
    
    Returns:
        {sentence_id: τ_narr} for each sentence that starts a window
    """
    tortuosity = {}
    
    for i in range(len(sentence_range) - window_size):
        window = sentence_range[i:i+window_size+1]
        
        # Actual path length (sum of adjacent steps)
        path_length = sum(
            self._distance(window[j], window[j+1], metric)
            for j in range(window_size)
        )
        
        # Straight-line distance (start to end)
        direct_distance = self._distance(window[0], window[-1], metric)
        
        # Compute tortuosity
        if direct_distance > 1e-6:  # Avoid division by zero
            tortuosity[window[0]] = path_length / direct_distance
        else:
            # No movement in semantic space
            tortuosity[window[0]] = 1.0 if path_length < 1e-6 else float('inf')
    
    return tortuosity

def _distance(self, sent_i: str, sent_j: str, metric: str) -> float:
    """Compute shallow distance between sentences."""
    if metric == 'entity':
        # Jaccard distance on entity sets
        entities_i = self._get_entities(sent_i)
        entities_j = self._get_entities(sent_j)
        intersection = len(entities_i & entities_j)
        union = len(entities_i | entities_j)
        return 1 - (intersection / union if union > 0 else 0)
    
    elif metric == 'compositional':
        # L¹ compositional distance
        c_i = self.export.compositions.get(sent_i)
        c_j = self.export.compositions.get(sent_j)
        if c_i is not None and c_j is not None:
            return np.sum(np.abs(c_i - c_j))
        return 0.0
    
    elif metric == 'lexical':
        # TF-IDF cosine distance
        vec_i = self._get_tfidf_vector(sent_i)
        vec_j = self._get_tfidf_vector(sent_j)
        norm_i = np.linalg.norm(vec_i)
        norm_j = np.linalg.norm(vec_j)
        if norm_i > 0 and norm_j > 0:
            cosine_sim = [np.dot](http://np.dot)(vec_i, vec_j) / (norm_i * norm_j)
            return 1 - cosine_sim
        return 0.0
    
    else:
        raise ValueError(f"Unknown metric: {metric}")
```

### Visualization in Entity Grid Heatmap

**Add vertical bar in left margin**:

```python
def _add_tortuosity_bars(
    self,
    fig: go.Figure,
    tortuosity: Dict[str, float],
    threshold: float = 1.2
):
    """
    Add vertical colored bars in left margin showing narrative tortuosity.
    
    Args:
        fig: Plotly figure
        tortuosity: {sentence_id: τ_narr}
        threshold: Only show bars where τ > threshold
    """
    shapes = []
    annotations = []
    
    for sent_id, tau in tortuosity.items():
        if tau > threshold:
            # Find row index
            row_idx = self._get_row_index(sent_id)
            
            # Vertical bar in margin (x = -0.05 in paper coordinates)
            bar_height = min(tau - 1, 1.0)  # Excess path, capped at 1.0
            
            shapes.append(dict(
                type='rect',
                xref='paper',
                yref='y',
                x0=-0.05,
                y0=row_idx - 0.4,
                x1=-0.02,
                y1=row_idx + 0.4,
                fillcolor=self._tortuosity_color(tau),
                line=dict(width=0)
            ))
            
            # Add hover annotation
            annotations.append(dict(
                x=-0.035,
                y=row_idx,
                xref='paper',
                yref='y',
                text=f"τ={tau:.2f}",
                showarrow=False,
                font=dict(size=8, color='white'),
                bgcolor=self._tortuosity_color(tau)
            ))
    
    fig.update_layout(
        shapes=fig.layout.shapes + tuple(shapes),
        annotations=fig.layout.annotations + tuple(annotations),
        margin=dict(l=60)  # Extra left margin for bars
    )

def _tortuosity_color(self, tau: float) -> str:
    """Map tortuosity to color."""
    if tau < 1.2:
        return 'rgb(0, 255, 0)'  # Green (efficient)
    elif tau < 1.5:
        return 'rgb(255, 255, 0)'  # Yellow (moderate)
    else:
        return 'rgb(255, 0, 0)'  # Red (highly tortuous)
```

---

## Combined Interpretation: Surface Tension + Tortuosity

### Four Quadrant Characterization

|  | **Low Tortuosity (τ ≈ 1)** | **High Tortuosity (τ >> 1)** |
| --- | --- | --- |
| **Low Tension (γ_sem small)** | **Ideal**: Smooth & direct flow | **Meandering**: No clear direction, but gentle |
| **High Tension (γ_sem large)** | **Decisive**: Sharp but purposeful turns | **Disorganized**: Abrupt & wandering |

**Example Passages**:

**Ideal (Low γ, Low τ)**:

> "The policy was introduced in 2020. It aimed to reduce emissions. Initial results showed promise. By 2022, targets were met."
> 
- Smooth tonal transitions (low γ_sem)
- Direct progression (low τ_narr)

**Decisive (High γ, Low τ)**:

> "The policy succeeded. However, critics argue it came at too high a cost. Nevertheless, public support remains strong."
> 
- Sharp transitions (high γ_sem at "However", "Nevertheless")
- But direct argumentative path (low τ_narr)

**Meandering (Low γ, High τ)**:

> "The policy was discussed. Earlier proposals had been debated. Some advocated alternative approaches. The policy was eventually introduced. Initial reactions were mixed."
> 
- Gentle transitions (low γ_sem)
- But inefficient path—keeps circling back (high τ_narr)

**Disorganized (High γ, High τ)**:

> "The policy failed. It reduced emissions significantly. Critics praise its design. However, costs exceeded projections. Public support is strong."
> 
- Abrupt contradictory transitions (high γ_sem)
- Plus wandering, no clear through-line (high τ_narr)

---

## Relationship to Deeper Layers

### Cognitive Filtration

Just as the measure framework uses spatial filtration ℱ₀ ⊃ ℱ₁ ⊃ ... ⊃ ℱₙ to control granularity, we use **cognitive filtration** 𝒞_superficial ⊃ 𝒞_intermediate ⊃ 𝒞_deep:

**Superficial Layer (𝒞_superficial)**:

- γ_sem = projection of τ^vert onto boundary measure
- τ_narr = path integral over local distances
- **Mathematical container**: Full measure space (Ω, ℱₙ, μ_w, {μ_j})
- **User sees**: Colored borders and margin bars

**Deep Layer (𝒞_deep)**:

- Full shear decomposition: τ^vert = τ_forced + τ_voluntary
- Quality-constrained simplex geometry: Δ_A^Q
- Conditional expectation machinery: 𝔼[c | ℱ]
- **Mathematical container**: Same measure space
- **User sees**: Vector diagrams, simplex visualizations, formulae

**Key Insight**: Both layers operate on the **same holistic measure state**—the difference is in **projection and presentation**, not in underlying data.

Surface tension in Layer 1 is the **conditional expectation of shear given the superficial σ-algebra**:

$$gamma_{text{sem}}(i, i+1) = mathbb{E}[tau^{text{vert}} mid mathcal{C}_{text{superficial}}]$$

where 𝒞_superficial = σ({boundary discontinuities}).

---

## Implementation Checklist

**For Entity Grid Heatmap (Layer 1: Superficial)**:

- [ ]  Compute γ_sem for all adjacent sentence pairs
- [ ]  Add horizontal colored borders where γ_sem > threshold
- [ ]  Compute τ_narr for sliding 5-sentence windows
- [ ]  Add vertical colored bars in left margin where τ_narr > threshold
- [ ]  Add legend explaining border/bar colors
- [ ]  Add hover tooltips with exact values
- [ ]  Ensure no mathematical notation visible to end user

**For Quality Layer Distribution (Layer 3: Deep)**:

- [ ]  Move full shear decomposition visualization here
- [ ]  Show τ^vert = τ_forced + τ_voluntary breakdown
- [ ]  Display feasible simplex Δ_A^Q geometry
- [ ]  Include mathematical formulae for interested users
- [ ]  Link to superficial layer: "γ_sem is the boundary projection of τ^vert"

---

## Design Rationale Summary

**Why "Superficial" is Not Pejorative**:

In topology and differential geometry, boundary measures (∂A) are no less rigorous than interior measures (int(A))—they capture different aspects of the same space:

- **Superficial = ∂A**: Interface phenomena, immediate perception, pattern recognition
- **Deep = int(A)**: Volume phenomena, integration required, analytical reasoning

The Stokes theorem family shows their equivalence:

$$int_{partial A} omega = int_A domega$$

Boundary integrals (superficial) equal volume integrals (deep) of derivatives.

Similarly, in our framework:

- Surface tension γ_sem (superficial) captures the same flow disruption as
- Shear stress τ^vert (deep), but projected onto boundary measure

**Advantage of Layered Architecture**:

1. **Accessibility**: Users with minimal mathematical background can use Layer 1
2. **Depth on Demand**: Advanced users can drill down to Layers 3-4
3. **Unified Foundation**: All layers share the same measure-theoretic state
4. **Honest Presentation**: No false simplification—just selective projection

The analytics core preserves full rigor (σ-algebras, conditional expectations, Radon-Nikodym derivatives), but the visualization overlays meet users at their cognitive depth.

---

## References to Framework Components

**Analytics Core** (measure-theoretic foundation):

- [Measure-Theoretic Multi-Scale Compositional Framework](Measure-Theoretic%20Multi-Scale%20Compositional%20Framew%202a05559a88b34fe3a843b86ce53ac63b.md)
- [Directional Flows in the Multi-Scale Compositional Framework](Directional%20Flows%20in%20the%20Multi-Scale%20Compositional%20579a4b73e01a479c9221089dbcb67db1.md)
- [Directional Perturbations in Adaptive Mode](Directional%20Perturbations%20in%20Adaptive%20Mode%20ed25d1258e2f48d090d321cfeb7f7a25.md)

**Visualization Implementation**:

- [implementation_guide](https://www.notion.so/implementation_guide-2c5f832e52ca814aa78ef915f80003e8?pvs=21)
- [quality_visualization_integration](https://www.notion.so/quality_visualization_integration-2c5f832e52ca81258e0ce0be8cc012d7?pvs=21)

**Quality Metrics Catalog**:

- [](Untitled%20ef5b3d68ccdc475195379e44f2c5fdfb.md)

---

## Future Extensions

**Additional Superficial Metrics** (candidates for Layer 1):

1. **Semantic Viscosity**: Resistance to tonal change (dγ/dc)
2. **Entity Diffusivity**: Rate of entity introduction/removal
3. **Lexical Surface Area**: Vocabulary diversity at boundaries
4. **Narrative Curvature**: Rate of change of direction (d²s/dt²)

All would share the property: **immediate perception without mathematical prerequisites**.