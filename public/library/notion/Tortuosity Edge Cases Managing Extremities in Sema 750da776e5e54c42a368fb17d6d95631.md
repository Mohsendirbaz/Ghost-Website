# Tortuosity Edge Cases: Managing Extremities in Semantic Path Visualization

# Tortuosity Edge Cases: Managing Extremities in Semantic Path Visualization

## Overview

Tortuosity τ_narr = (actual path)/(direct path) is a dimensionless ratio that can exhibit extreme values when semantic trajectories display degenerate or pathological behavior. This page documents **edge case taxonomy** and **visualization strategies** to render extremities interpretable without distorting the continuous-discrete mediation that makes tortuosity valuable.

**Core Principle**: Edge cases are not errors—they are **diagnostic signals** that reveal specific pathologies in text structure. Proper visualization converts numerical extremities into actionable perceptual categories.

---

## Edge Case Taxonomy

### Type 1: Infinite Tortuosity (τ → ∞)

**Mathematical Condition**:

$$
\tau_{\text{narr}} = \frac{\sum_{j=i}^{i+k-1} d(s_j, s_{j+1})}{d(s_i, s_{i+k})} \to \infty \quad \text{when } d(s_i, s_{i+k}) \to 0
$$

**Semantic Interpretation**: Path wanders extensively but returns to starting point—**zero net semantic displacement** despite local motion.

**Example Passage**:

> "The policy was debated. Critics questioned its merit. Proponents defended the approach. After discussion, the policy was debated."
> 
- **Path length**: $\sum d(s_j, s_{j+1}) = 0.6 + 0.5 + 0.4 = 1.5$ (substantial local variation)
- **Direct distance**: d(s₁, s₄) ≈ 0.01 (nearly identical start/end states)
- **Tortuosity**: τ = 1.5/0.01 = 150 (effectively infinite)

**Physical Analog**: Brownian motion—particle travels long path but net displacement is zero (random walk).

**Diagnostic Value**: Indicates **circular reasoning**, **repetitive content**, or **failure to progress** argumentatively.

### Type 2: Stationary Tortuosity (0/0 Indeterminate)

**Mathematical Condition**:

$$
\lim_{\text{path\_length} \to 0} \frac{\text{path\_length}}{\text{direct\_distance}} = \frac{0}{0} \quad \text{(indeterminate)}
$$

**Semantic Interpretation**: Text is **semantically stationary**—composition c unchanged across window.

**Example Passage**:

> "The data shows. The data indicates. The data reveals. The data demonstrates."
> 
- All sentences have identical composition c (pure technical tone, entity-free)
- **Path length**: ≈ 0 (no tonal motion)
- **Direct distance**: ≈ 0 (identical endpoints)
- **Tortuosity**: Undefined (0/0)

**Physical Analog**: Particle at rest—no motion, no displacement.

**Diagnostic Value**: Indicates **redundancy**, **lack of development**, or **stylistic monotony**.

### Type 3: Near-Zero Direct Distance with Moderate Path

**Mathematical Condition**:

$$
d(s_i, s_{i+k}) \approx \epsilon \quad \text{where } \epsilon \ll 1 \quad \text{but } \text{path\_length} \sim O(1)
$$

**Semantic Interpretation**: Text **explores semantic space** but returns near origin—meandering with eventual return.

**Example Passage**:

> "The framework is robust. However, critics note limitations. Nevertheless, the approach has merit. On balance, the framework is sound."
> 
- **Path**: Policy → Technical → Academic → Policy (exploration)
- **Endpoints**: c₁ ≈ c₅ (similar policy framing)
- **Tortuosity**: High but finite (τ ≈ 10–50)

**Physical Analog**: Tethered particle—explores region but returns to anchor point.

**Diagnostic Value**: Indicates **dialectical structure** (thesis → antithesis → synthesis) or **exploratory writing** that ultimately returns to main theme.

### Type 4: Perfectly Straight Long Path (τ = 1, Large L)

**Mathematical Condition**:

$$
\tau = 1 \quad \text{but } \text{path\_length} = L \gg 1
$$

**Semantic Interpretation**: Text progresses in **perfectly linear trajectory** through semantic space—monotonic tonal shift.

**Example Passage** (10 sentences):

> "The policy began with public support. Initial data was encouraging. Technical assessments confirmed feasibility. Academic analysis validated assumptions. ..."
> 
- Composition shifts linearly: Policy → General → Technical → Academic (no backtracking)
- **Path**: Straight line in Δₘ₋₁ simplex
- **Tortuosity**: τ = 1 (perfectly efficient)
- **Length**: Large (many sentences)

**Physical Analog**: Ballistic trajectory—particle moves in straight line at constant velocity.

**Diagnostic Value**: Indicates **well-structured progression**, **clear narrative arc**, or **systematic development** of argument.

### Type 5: Discontinuous Jump (High Local γ_sem)

**Mathematical Condition**:

$$
d(s_i, s_{i+1}) \gg \text{typical distance} \quad \text{(outlier)}
$$

**Semantic Interpretation**: **Abrupt topic/tone shift** mid-window inflates path length.

**Example Passage**:

> "Economic indicators remained stable. Sudden geopolitical crisis erupted. Markets responded with volatility."
> 
- d(s₁, s₂) ≈ 0.2 (economic, policy tone)
- d(s₂, s₃) ≈ 1.5 (crisis = technical + urgent tone, huge shift)
- d(s₃, s₄) ≈ 0.3 (return to economic framing)
- **Path length**: 0.2 + 1.5 + 0.3 = 2.0
- **Direct distance**: ≈ 0.4 (net change moderate)
- **Tortuosity**: τ = 2.0/0.4 = 5.0 (inflated by single discontinuity)

**Physical Analog**: Particle trajectory with collision—smooth path interrupted by sharp deflection.

**Diagnostic Value**: Indicates **intrusive digression**, **poorly integrated evidence**, or **editorial insertion**.

### Type 6: Multi-Scale Divergence

**Mathematical Condition**:

$$
\tau(\text{window}=5) \ll \tau(\text{window}=10) \ll \tau(\text{window}=20)
$$

**Semantic Interpretation**: Tortuosity **increases with scale**—fractional/recursive meandering.

**Example**: Chapter oscillates between two themes at paragraph scale but each paragraph is internally coherent.

- **Window = 5 sentences** (within paragraph): τ ≈ 1.1 (locally efficient)
- **Window = 20 sentences** (across paragraphs): τ ≈ 2.5 (global meandering)

**Physical Analog**: Fractal coastline—measured length increases with ruler precision.

**Diagnostic Value**: Indicates **multi-scale structural issue**—local coherence masks global disorganization.

---

## Visualization Strategies for Edge Cases

### Strategy 1: Logarithmic Compression for τ → ∞

**Problem**: Linear color scale saturates—τ = 10 and τ = 100 both render as "max red."

**Solution**: Map τ to log scale for color/width encoding:

```python
def tortuosity_visual_scale(tau: float) -> float:
    """
    Map τ ∈ [1, ∞) to visual scale ∈ [0, 1] using log compression.
    
    Args:
        tau: Raw tortuosity value
    
    Returns:
        visual_intensity ∈ [0, 1] for color mapping
    """
    if tau < 1:
        return 0.0  # Invalid (should not occur)
    elif tau == 1:
        return 0.0  # Perfect efficiency
    elif tau < 1.5:
        return (tau - 1) / 0.5  # Linear in [1, 1.5] → [0, 0.5]
    else:
        # Logarithmic in [1.5, ∞) → [0.5, 1]
        log_tau = np.log10(tau)
        log_threshold = np.log10(1.5)  # ≈ 0.176
        log_saturation = np.log10(100)  # τ = 100 maps to visual = 1
        
        visual = 0.5 + 0.5 * (log_tau - log_threshold) / (log_saturation - log_threshold)
        return np.clip(visual, 0.5, 1.0)
```

**Visual Encoding**:

- τ = 1.0 → Green (visual = 0)
- τ = 1.5 → Yellow (visual = 0.5)
- τ = 10 → Orange (visual = 0.85)
- τ = 100 → Red (visual = 1.0)
- τ > 100 → Red (saturated, but hover shows exact value)

**Interpretability Preservation**: User sees continuous color gradient (green → red) but extreme values don't collapse to indistinguishable red.

### Strategy 2: Symbolic Annotation for Degenerate Cases

**Problem**: 0/0 and ∞ lack perceptual encoding—what color represents undefined?

**Solution**: Overlay **symbolic markers** on vertical tortuosity bars:

```python
def add_degenerate_markers(
    fig: go.Figure,
    tortuosity: Dict[str, float],
    path_lengths: Dict[str, float],
    direct_distances: Dict[str, float]
):
    """
    Add symbolic markers for edge cases.
    
    Symbols:
        ∞ : Infinite tortuosity (circular path)
        ⊘ : Undefined (stationary, 0/0)
        ↻ : Near-circular (τ > 10)
    """
    annotations = []
    
    for sent_id in tortuosity.keys():
        tau = tortuosity[sent_id]
        path_len = path_lengths[sent_id]
        direct_dist = direct_distances[sent_id]
        
        row_idx = self._get_row_index(sent_id)
        
        # Check for degenerate cases
        if direct_dist < 1e-6 and path_len < 1e-6:
            # Stationary (0/0)
            symbol = "⊘"
            color = 'rgb(128, 128, 128)'  # Gray
            hover_text = "Stationary: No semantic motion"
            
        elif direct_dist < 1e-6 and path_len > 0.1:
            # Circular (∞)
            symbol = "∞"
            color = 'rgb(128, 0, 128)'  # Purple
            hover_text = f"Circular: path={path_len:.2f}, τ→∞"
            
        elif tau > 10:
            # Near-circular
            symbol = "↻"
            color = 'rgb(255, 0, 0)'  # Red
            hover_text = f"Highly tortuous: τ={tau:.1f}"
            
        else:
            continue  # Normal case, no annotation needed
        
        annotations.append(dict(
            x=-0.035,
            y=row_idx,
            xref='paper',
            yref='y',
            text=symbol,
            showarrow=False,
            font=dict(size=14, color=color, family='Arial Unicode MS'),
            hovertext=hover_text
        ))
    
    fig.update_layout(
        annotations=fig.layout.annotations + tuple(annotations)
    )
```

**Visual Result**:

- **Gray ⊘**: User sees "no motion" (stationary)
- **Purple ∞**: User sees "circular path" (returns to start)
- **Red ↻**: User sees "highly meandering" (τ > 10)

**Discrete Symbols on Continuous Field**: Combines categorical diagnosis (symbol) with quantitative hover detail.

### Strategy 3: Multi-Scale Comparison View

**Problem**: τ depends on window size—is high tortuosity local or global?

**Solution**: Compute τ at multiple scales and display as **stacked margin bars**:

```python
def compute_multiscale_tortuosity(
    self,
    sentence_range: List[str],
    window_sizes: List[int] = [3, 5, 10]
) -> Dict[int, Dict[str, float]]:
    """
    Compute tortuosity at multiple window scales.
    
    Returns:
        {window_size: {sentence_id: τ}}
    """
    results = {}
    
    for window_size in window_sizes:
        results[window_size] = self.compute_narrative_tortuosity(
            sentence_range,
            window_size=window_size,
            metric='compositional'
        )
    
    return results

def visualize_multiscale_tortuosity(
    self,
    fig: go.Figure,
    multiscale_data: Dict[int, Dict[str, float]]
):
    """
    Render multi-scale tortuosity as nested bars.
    
    Visual encoding:
        - Innermost bar (leftmost): window=3 (local)
        - Middle bar: window=5 (medium)
        - Outermost bar (rightmost): window=10 (global)
    
    Color intensity = τ value at that scale
    """
    shapes = []
    window_sizes = sorted(multiscale_data.keys())
    bar_width = 0.01  # Width of each bar segment
    
    for idx, window_size in enumerate(window_sizes):
        tortuosity_data = multiscale_data[window_size]
        
        for sent_id, tau in tortuosity_data.items():
            row_idx = self._get_row_index(sent_id)
            
            # Position: stack bars left to right
            x0 = -0.05 - idx * bar_width
            x1 = x0 + bar_width
            
            shapes.append(dict(
                type='rect',
                xref='paper',
                yref='y',
                x0=x0,
                y0=row_idx - 0.4,
                x1=x1,
                y1=row_idx + 0.4,
                fillcolor=self._tortuosity_color(tau),
                line=dict(width=0.5, color='black'),
                opacity=0.8
            ))
    
    fig.update_layout(shapes=fig.layout.shapes + tuple(shapes))
```

**Visual Result**:

- **Three nested bars** per sentence row
- **Color divergence** across scales → multi-scale pathology visible
- Example: Green (w=3) | Yellow (w=5) | Red (w=10) → "Locally coherent, globally meandering"

**Interpretability**: User sees **scale-dependence** without understanding fractals—just observes color pattern.

### Strategy 4: Path Trajectory Overlay (Drill-Down)

**Problem**: High τ gives diagnosis but not remedy—where exactly does path deviate?

**Solution**: On click, show **2D simplex projection** with actual path traced:

```python
def render_simplex_trajectory(
    self,
    window_sentences: List[str],
    compositions: Dict[str, np.ndarray]
) -> go.Figure:
    """
    Project high-dimensional compositions onto 2D simplex and trace path.
    
    Uses PCA or barycentric projection for m > 3 tones.
    
    Returns:
        Interactive plotly figure showing path through simplex
    """
    # Extract composition vectors for window
    c_vectors = [compositions[sent_id] for sent_id in window_sentences]
    c_array = np.array(c_vectors)  # Shape: (n_sentences, m_tones)
    
    # Project to 2D (use first 2 PCA components)
    from sklearn.decomposition import PCA
    pca = PCA(n_components=2)
    c_2d = [pca.fit](http://pca.fit)_transform(c_array)
    
    # Compute direct path
    direct_path = np.array([c_2d[0], c_2d[-1]])
    
    # Create figure
    fig = go.Figure()
    
    # Add simplex boundary (if m=3, can show exact triangle)
    if len(c_vectors[0]) == 3:
        # Barycentric coordinates for ternary plot
        # (Specialized rendering for 3-tone case)
        pass
    
    # Add actual path (tortuous)
    fig.add_trace(go.Scatter(
        x=c_2d[:, 0],
        y=c_2d[:, 1],
        mode='lines+markers',
        line=dict(color='red', width=2),
        marker=dict(size=8, color='red'),
        name='Actual path',
        text=[f"Sentence {i+1}" for i in range(len(c_2d))],
        hoverinfo='text'
    ))
    
    # Add direct path (ideal)
    fig.add_trace(go.Scatter(
        x=direct_path[:, 0],
        y=direct_path[:, 1],
        mode='lines',
        line=dict(color='green', width=3, dash='dash'),
        name='Direct path',
        showlegend=True
    ))
    
    # Compute and display tortuosity
    path_length = np.sum([
        np.linalg.norm(c_2d[i+1] - c_2d[i])
        for i in range(len(c_2d) - 1)
    ])
    direct_distance = np.linalg.norm(c_2d[-1] - c_2d[0])
    tau = path_length / direct_distance if direct_distance > 1e-6 else float('inf')
    
    fig.update_layout(
        title=f"Semantic Path Trajectory (τ = {tau:.2f})",
        xaxis_title="PC1 (Tonal Variation)",
        yaxis_title="PC2 (Tonal Variation)",
        width=600,
        height=600,
        hovermode='closest'
    )
    
    return fig
```

**User Workflow**:

1. See high τ (red bar) in main heatmap
2. Click red bar → popup shows simplex trajectory
3. See exactly where path deviates from ideal
4. Identify problematic sentence(s) for revision

**Interpretability**: Converts abstract ratio into **visible path geometry**.

### Strategy 5: Capping with Overflow Indicator

**Problem**: Very high τ (e.g., 1000) makes bar too tall—breaks visual layout.

**Solution**: Cap visual height but indicate overflow:

```python
def _add_tortuosity_bars_with_capping(
    self,
    fig: go.Figure,
    tortuosity: Dict[str, float],
    visual_cap: float = 5.0
):
    """
    Render tortuosity bars with capped height and overflow indicator.
    
    Args:
        visual_cap: Max τ value for visual height (e.g., 5.0)
                   Values > cap get same height but special marker
    """
    shapes = []
    annotations = []
    
    for sent_id, tau in tortuosity.items():
        row_idx = self._get_row_index(sent_id)
        
        # Compute visual height (capped)
        visual_tau = min(tau, visual_cap)
        bar_height = (visual_tau - 1) / (visual_cap - 1)  # Normalize to [0, 1]
        
        # Color based on log scale (uncapped)
        color = self._tortuosity_color_log(tau)
        
        # Add bar
        shapes.append(dict(
            type='rect',
            xref='paper',
            yref='y',
            x0=-0.05,
            y0=row_idx - 0.4,
            x1=-0.02,
            y1=row_idx - 0.4 + bar_height * 0.8,
            fillcolor=color,
            line=dict(width=1, color='black')
        ))
        
        # Add overflow indicator if capped
        if tau > visual_cap:
            annotations.append(dict(
                x=-0.035,
                y=row_idx + 0.45,  # Above bar
                xref='paper',
                yref='y',
                text="⬆",  # Up arrow = overflow
                showarrow=False,
                font=dict(size=10, color='red'),
                hovertext=f"τ = {tau:.1f} (exceeds display cap {visual_cap})"
            ))
        
        # Always show exact value on hover
        annotations.append(dict(
            x=-0.035,
            y=row_idx,
            xref='paper',
            yref='y',
            text=f"{tau:.1f}" if tau < 10 else f"{tau:.0f}",
            showarrow=False,
            font=dict(size=8, color='white'),
            bgcolor=color
        ))
    
    fig.update_layout(
        shapes=fig.layout.shapes + tuple(shapes),
        annotations=fig.layout.annotations + tuple(annotations)
    )
```

**Visual Result**:

- Bar height saturates at τ = 5
- Color continues to deepen (via log scale)
- **⬆ arrow** indicates "exceeds visual range"
- Hover always shows exact numerical value

**Preserves Layout**: No bars extend beyond margin, but extremes remain distinguishable.

---

## Diagnostic Interpretation Table

| **τ Range** | **Symbol** | **Color** | **Diagnosis** | **Recommended Action** |
| --- | --- | --- | --- | --- |
| 1.0 - 1.2 | (none) | Green | Ideal: Efficient path | No action needed |
| 1.2 - 1.5 | (none) | Yellow | Moderate meandering | Review for unnecessary digressions |
| 1.5 - 3.0 | (none) | Orange | Significant wandering | Restructure for clearer progression |
| 3.0 - 10 | (none) | Red | High tortuosity | Major restructuring needed |
| 10 - 100 | ↻ | Deep red | Near-circular | Check for circular reasoning |
| > 100 | ∞ | Purple | Circular path | Zero net progress—rewrite section |
| 0/0 | ⊘ | Gray | Stationary | Redundant content—condense or remove |

**Multi-Scale Patterns**:

| **τ(w=3)** | **τ(w=10)** | **Pattern** | **Diagnosis** |
| --- | --- | --- | --- |
| Green | Green | Efficient at all scales | Well-structured |
| Green | Red | Local coherence, global meandering | Paragraph-level OK, chapter-level issue |
| Red | Green | Local chaos, global coherent | Sentence-level issues, overall arc OK |
| Red | Red | Multi-scale chaos | Systemic structural failure |

---

## Implementation Checklist

**Core Edge Case Handling**:

- [ ]  Implement logarithmic τ compression for color mapping
- [ ]  Add symbolic markers (⊘, ∞, ↻) for degenerate cases
- [ ]  Cap visual bar height with overflow indicator (⬆)
- [ ]  Compute multi-scale τ for windows [3, 5, 10]
- [ ]  Render nested bars for multi-scale comparison

**Drill-Down Features**:

- [ ]  On click: Render 2D simplex trajectory with path overlay
- [ ]  Show actual path (red) vs direct path (green dashed)
- [ ]  Highlight sentence where max deviation occurs
- [ ]  Display path_length and direct_distance numerically

**Hover Detail**:

- [ ]  Show exact τ value (even if > visual cap)
- [ ]  Show path_length and direct_distance
- [ ]  For circular: "Returns to start, net displacement ≈ 0"
- [ ]  For stationary: "No semantic motion detected"

**Legend**:

- [ ]  Color scale: Green (1.0) → Red (10+) with log mapping
- [ ]  Symbol key: ⊘ = stationary, ∞ = circular, ↻ = highly tortuous
- [ ]  Multi-scale: "Inner/middle/outer bars = window size 3/5/10"

---

## Case Study: Extremity in Practice

### Document: Policy Brief (Pathological Example)

**Excerpt** (sentences 12-22, window size = 10):

> "The reform addresses healthcare access. Previous attempts failed to gain support. Stakeholders raised numerous concerns. The reform addresses healthcare access. Economic impacts remain uncertain. Technical feasibility requires assessment. The reform addresses healthcare access. Public opinion surveys show mixed results. Legislative prospects depend on coalition-building. The reform addresses healthcare access. Implementation timelines need clarification."
> 

**Computed Metrics**:

- **Path length**: 6.2 (lots of local tonal variation)
- **Direct distance**: 0.05 (s₁₂ ≈ s₂₂, almost identical)
- **τ**: 6.2/0.05 = 124 → **Circular/infinite**

**Visualization**:

- **Main heatmap**: Purple ∞ symbol on vertical bar at row 12
- **Hover text**: "Circular path: τ = 124, returns to start"
- **On click**: Simplex trajectory shows:
    - Path loops through Technical → Policy → General → Policy
    - Returns to nearly identical starting composition
    - Max deviation at sentence 17 (technical assessment)

**Diagnosis**: Repetitive structure ("The reform addresses healthcare access" repeated 4× verbatim) with intervening digressions that don't advance argument.

**Recommended Fix**:

1. Consolidate repetitive opening phrase to single statement
2. Group related concerns (economic + technical + legislative)
3. Provide synthesis or conclusion rather than circular return

**After Revision**:

> "The reform addresses healthcare access through three mechanisms. First, economic impacts require cost-benefit analysis. Second, technical feasibility studies are underway. Third, legislative prospects depend on coalition-building. Stakeholders acknowledge both promise and challenges."
> 
- **New τ**: 1.3 (efficient progression)
- **Visual**: Yellow bar (acceptable efficiency)

---

## Theoretical Justification: Why Tortuosity Handles Edge Cases

### Robustness to Outliers

**Path integral formulation**:

$$
\text{path\_length} = \sum_{j=i}^{i+k-1} d(s_j, s_{j+1})
$$

is **additive**—single outlier contributes proportionally, doesn't dominate.

**Contrast with variance-based metrics** (e.g., σ² of distances):

- Outliers get squared → disproportionate weight
- Single bad sentence can make entire window look pathological

**Tortuosity's linear aggregation** means:

- One bad transition (large d) increases τ moderately
- Must be **consistently tortuous** to achieve very high τ
- More robust diagnostic than max-based or variance-based measures

### Dimensionless Invariance

**τ is scale-free**:

$$
\tau(\alpha \cdot d) = \frac{\sum \alpha \cdot d(s_j, s_{j+1})}{\alpha \cdot d(s_i, s_{i+k})} = \frac{\alpha \cdot \text{path}}{\alpha \cdot \text{direct}} = \tau(d)
$$

**Implication**: Works across different distance metrics (entity, compositional, lexical) without recalibration.

**Edge case handling**: Even if distance scale changes (e.g., switching from L¹ to L²), relative tortuosity patterns preserve—extremities remain extremities.

### Multi-Scale Fractality Detection

**Brownian motion** has $\tau(\text{window}) \sim \sqrt{\text{window}}$ scaling.

**Ballistic motion** has $tau(text{window}) = text{constant}$.

**Fractal paths** have $\tau(\text{window}) \sim \text{window}^H$ where H is Hurst exponent.

**By computing τ at multiple scales**, we can fit:

$$
\log(\tau) = H \cdot \log(\text{window}) + C
$$

and extract **Hurst exponent H**:

- H = 0: Perfectly efficient at all scales
- H = 0.5: Brownian (random walk)
- H > 0.5: Super-diffusive (accelerating divergence)

**Edge case diagnostic**: If H > 0.5, text has **self-similar meandering** at all scales—pathology is fractal, not just local.

---

## Summary: Extremities as Diagnostic Signals

**Core Insight**: Edge cases are not failures of the metric—they are **revealing diagnoses**:

| **Extremity** | **Mathematical** | **Semantic** | **Visualization** |
| --- | --- | --- | --- |
| τ → ∞ | Zero direct distance, positive path | Circular reasoning, no progress | Purple ∞, simplex loop |
| τ = 0/0 | Stationary in semantic space | Redundancy, no development | Gray ⊘, no bar |
| τ >> 10 | High path, moderate direct | Extreme meandering | Red ↻, capped bar with ⬆ |
| τ(w₁) << τ(w₂) | Scale-dependent | Local OK, global chaos | Nested bars, color divergence |

**Why Visualization Handles This**:

1. **Logarithmic compression** prevents saturation
2. **Symbolic markers** discretize degenerate cases
3. **Multi-scale comparison** reveals fractal pathology
4. **Drill-down trajectory** shows exact geometric deviation
5. **Capping + overflow** preserves layout while indicating extremes

**Advantage over Purely Numerical**: A table of τ values loses interpretability at extremes ("Is 124 bad?" → Yes, circular). Colored bars + symbols give immediate perceptual diagnosis.

**Preservation of Discrete-Continuous Duality**: Even at extremes, visualization maintains:

- **Discrete anchors**: Sentence rows, window boundaries, symbolic markers
- **Continuous fields**: Color gradients, bar heights, path trajectories

Extremities don't break this duality—they exploit it to make pathological structure interpretable.

---

## References

**Parent Framework**:

- [Superficial Layer Metrics: Surface Tension & Tortuosity](Superficial%20Layer%20Metrics%20Surface%20Tension%20&%20Tortuo%206641e1ca4c6b49409d89e8abf8ccf232.md)

**Analytics Core**:

- [Measure-Theoretic Multi-Scale Compositional Framework](Measure-Theoretic%20Multi-Scale%20Compositional%20Framew%202a05559a88b34fe3a843b86ce53ac63b.md)

**Visualization Implementation**:

- [quality_visualization_integration](https://www.notion.so/quality_visualization_integration-2c5f832e52ca81258e0ce0be8cc012d7?pvs=21)