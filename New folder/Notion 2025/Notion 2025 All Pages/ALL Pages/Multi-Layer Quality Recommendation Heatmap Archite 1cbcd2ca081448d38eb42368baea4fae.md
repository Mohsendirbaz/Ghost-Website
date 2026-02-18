# Multi-Layer Quality Recommendation Heatmap: Architecture & Implementation Plan

# Multi-Layer Quality Recommendation Heatmap

## Architecture & Implementation Plan

> **Design Goal**: Create a traceable, entity-grid-based heatmap where every text location shows the *density* and *source* of quality recommendations across all measures and layers.
> 

---

## I. The Core Problem (Schematic)

### A. Measure Output Taxonomy

Your 60+ measure inventory produces outputs along **two complementary dimensions**:

### Dimension 1: Evaluation Scope

**Fixed-Cell Measures** (Types 1-3):

- Evaluate specific (sentence, entity) grid cells
- Output describes quality at precise locations
- Grid-aligned: Each cell receives independent evaluation

**Span-Based Measures** (Type 4):

- Evaluate functional regions (paragraph, section, page, chapter)
- Output describes density/frequency over a span
- Aggregated: Multiple cells contribute to single measurement

### Dimension 2: Output Format

**Type 1: Continuous Score** (0.0–1.0 or 0–100)

- Quantitative quality rating
- Example: Readability score = 68.5, Coherence score = 0.82
- Threshold-based flagging: Score < threshold → recommendation
- **Scope**: Typically fixed-cell (evaluates specific sentence-entity pair)

**Type 2: Binary Indicator** (0 | 1)

- Presence/absence detection
- Example: Missing transition = 1, Passive voice = 1
- Direct flagging: 1 → recommendation
- **Scope**: Typically fixed-cell (flags specific location)

**Type 3: Ordinal Level** (Low | Medium | High)

- Categorical rating
- Example: Complexity = High, Evidence density = Low
- Conditional flagging: Undesired level → recommendation
- **Scope**: Typically fixed-cell (rates specific location)

**Type 4: Count/Frequency** (0, 1, 2, 3, ...)

- Occurrence enumeration with functional density ranges
- Example: Discourse markers per paragraph = 3, Citations per section = 0, Acronyms per page = 12
- Range-based flagging: Count outside optimal range [min, max] → recommendation
- **Scope**: Span-based (aggregates over region, then assesses density)
- **Critical distinction**: Not cell-centric; evaluates whether a *region* has appropriate density

### Design Implication: Dual-Mode Heatmap Architecture

This complementary taxonomy requires the heatmap to support **two evaluation paradigms**:

1. **Cell-Level Density** (for Types 1-3)
    - Each cell accumulates recommendations from fixed-cell measures
    - Heatmap color intensity = count of measures flagging that specific (sentence, entity) pair
    - Direct visualization: Cell[i, j] shows convergence at precise location
2. **Region-Level Projection** (for Type 4)
    - Span-based measures evaluate regions (e.g., "paragraph P₅ has 0 discourse markers, optimal is 2-4")
    - Must project regional flagging onto constituent cells
    - Visualization strategy: All cells within flagged span inherit regional recommendation
    - Traceback distinguishes: "This cell flagged because containing paragraph P₅ has suboptimal marker density"

**Example of Complementarity**:

```
Paragraph P₅ (Sentences 45-52):

Fixed-Cell Measures:
  Cell[47, 12]: Entity stability score = 0.32 < 0.60 → Flag
  Cell[49, 8]:  Missing transition marker = 1 → Flag
  Cell[51, 12]: Passive voice = 1 → Flag

Span-Based Measure:
  Paragraph P₅: Discourse marker count = 0, optimal [2-4] → Flag
    → Projects onto ALL cells in sentences 45-52

Heatmap Cell[47, 12] Density = 2:
  [1] Layer 3 | Critical | Entity stability (fixed-cell)
  [2] Layer 4 | Major | Discourse marker deficit (span-based, from paragraph)
```

This dual-mode architecture ensures:

- **Fixed-cell measures**: Pinpoint specific problematic locations
- **Span-based measures**: Reveal systemic deficiencies across regions
- **Convergence detection**: Cells where both paradigms flag issues are highest priority

### C. Interpretability Through Categorical Color Encoding

The basic density-to-intensity mapping (count → color gradient) reveals *how many* measures flag each cell, but obscures *what kind* of overlap exists. Categorical alignment of color schemes addresses this interpretability gap.

### The Interpretability Problem

**Scenario**: Two cells both show density = 4

- **Cell A**: All 4 from Layer 1 (lexical issues) → Homogeneous, surface-level problems
- **Cell B**: 1 each from Layers 1, 3, 4, 5 → Heterogeneous, deep structural convergence

With density-only coloring, both cells appear identical (same orange intensity). But Cell B represents a more fundamental quality breakdown requiring cross-layer remediation.

### Categorical Encoding Dimensions

**Dimension 1: Layer Composition**

- **Encoding**: Hue represents dominant layer(s), saturation represents density
- **Color scheme**:
    - Pure L1 (Lexical) → Blue tones
    - Pure L2 (Structural) → Green tones
    - Pure L3 (Semantic) → Yellow tones
    - Pure L4 (Discourse) → Orange tones
    - Pure L5 (Argumentative) → Red tones
    - Pure L6 (Meta) → Purple tones
    - **Mixed layers** → Interpolated hues (e.g., L1+L4 = Cyan, L4+L5 = Vermillion)
- **Advantage**: Immediately reveals whether problems are localized to one layer or span multiple
- **Use case**: Identify whether revision needs single-layer fix or multi-layer redesign

**Dimension 2: Evaluation Paradigm Mix**

- **Encoding**: Pattern/texture overlays
    - Fixed-cell only → Solid fill
    - Span-based only → Diagonal stripes
    - Mixed (both paradigms) → Crosshatch
- **Advantage**: Distinguishes precise defects from regional density issues
- **Use case**: Determine whether fix is local (rewrite sentence) or contextual (restructure paragraph)

**Dimension 3: Severity Distribution**

- **Encoding**: Color temperature
    - Critical-heavy → Warm (red/orange), regardless of density
    - Major-heavy → Neutral (yellow/tan)
    - Minor-heavy → Cool (blue/green)
- **Formula**: Weighted severity score = (Critical × 10 + Major × 5 + Minor × 1) / density
- **Advantage**: Prioritizes by impact, not just count
- **Use case**: Triage high-impact cells even if low density

**Dimension 4: Conflict Presence**

- **Encoding**: Border/outline styling
    - No conflict → No border
    - Low conflict (0.3–0.5) → Dotted yellow border
    - High conflict (>0.5) → Thick red border
- **Advantage**: Flags cells requiring expert adjudication
- **Use case**: Route conflicting recommendations to senior reviewers

**Dimension 5: Pathway Diversity**

- **Encoding**: Symbol overlay
    - Direct pathways only → Circle (●)
    - Cascading pathways present → Triangle (▲)
    - Convergent pathways present → Star (★)
    - Cross-entity pathways present → Diamond (◆)
- **Advantage**: Reveals interaction complexity
- **Use case**: Understand whether problems are independent or causally linked

### Recommended Multi-Dimensional Encoding

Combine dimensions for maximum interpretability:

```
Cell Visual = Base_Color(Layer) + Saturation(Density) + 
              Pattern(Paradigm) + Border(Conflict) + 
              Symbol(Pathway)
```

**Example Encoding**:

```
Cell[47, 12]:
  Base: Orange (L4 dominant with L3 contribution)
  Saturation: High (density = 5)
  Pattern: Crosshatch (2 fixed-cell + 3 span-based)
  Border: Thick red (conflict score = 0.72)
  Symbol: Star (convergent pathways from L3→L4→L5)
  
Interpretation: High-priority cell with cross-layer discourse issues,
                 conflicting recommendations, requires expert review
```

### Implementation Strategy: Toggleable Encoding Modes

**Mode 1: Density-Only (Default)**

- Simple white → yellow → orange → red gradient
- Fastest cognitive processing
- Best for: Initial overview, identifying hotspots

**Mode 2: Layer-Aware**

- Hue encodes layer composition
- Saturation encodes density
- Best for: Understanding which layers need attention

**Mode 3: Paradigm-Aware**

- Base color for density
- Pattern overlay for fixed-cell vs span-based
- Best for: Distinguishing local vs regional problems

**Mode 4: Priority-Aware**

- Color temperature encodes severity-weighted priority
- Border indicates conflict
- Best for: Triage and work prioritization

**Mode 5: Full Multi-Dimensional**

- All dimensions encoded simultaneously
- Highest information density, highest cognitive load
- Best for: Expert deep-dive analysis

### User Control Panel

```
┌─────────────────────────────────────────────┐
│ Heatmap Encoding Controls                   │
├─────────────────────────────────────────────┤
│                                             │
│ Color Encoding:                             │
│   ○ Density Only (simple)                   │
│   ● Layer Composition (recommended)         │
│   ○ Severity Priority                       │
│                                             │
│ Pattern Overlay:                            │
│   ☑ Show fixed-cell vs span-based          │
│   ☐ Show pathway types                      │
│                                             │
│ Borders:                                    │
│   ☑ Highlight conflicts                     │
│   ☐ Highlight critical severity             │
│                                             │
│ Legend: [Show/Hide]                         │
└─────────────────────────────────────────────┘
```

### Categorical Alignment for Sampling

**Stratification by Category, Not Just Density**

Instead of simple density quartiles, stratify by categorical patterns:

```python
def stratify_by_category(heatmap: np.ndarray) -> Dict[str, List]:
    """
    Stratify sentences by categorical overlap patterns
    """
    strata = {
        'homogeneous_low': [],      # Single layer, density 1-2
        'homogeneous_high': [],     # Single layer, density 3+
        'cross_layer_moderate': [], # 2-3 layers, density 2-4
        'cross_layer_severe': [],   # 4+ layers, density 5+
        'conflict_zones': [],       # Any density, conflict > 0.5
        'span_heavy': [],           # >70% span-based measures
        'critical_any': []          # Any critical severity present
    }
    
    for i in range(heatmap.shape[0]):
        sentence_cells = heatmap[i, :]
        
        # Aggregate sentence-level metrics
        total_density = sum(cell.density for cell in sentence_cells)
        layers_involved = set(layer for cell in sentence_cells 
                             for layer in cell.layer_distribution.keys())
        max_conflict = max(cell.conflict_score for cell in sentence_cells)
        has_critical = any('Critical' in cell.severity_breakdown 
                          for cell in sentence_cells)
        span_ratio = sum(1 for cell in sentence_cells 
                        if cell.has_span_based) / len(sentence_cells)
        
        # Categorize
        if has_critical:
            strata['critical_any'].append(i)
        elif max_conflict > 0.5:
            strata['conflict_zones'].append(i)
        elif span_ratio > 0.7:
            strata['span_heavy'].append(i)
        elif len(layers_involved) >= 4 and total_density >= 5:
            strata['cross_layer_severe'].append(i)
        elif len(layers_involved) >= 2:
            strata['cross_layer_moderate'].append(i)
        elif len(layers_involved) == 1 and total_density >= 3:
            strata['homogeneous_high'].append(i)
        else:
            strata['homogeneous_low'].append(i)
    
    return strata
```

**Neyman Allocation with Categorical Weights**

```python
allocation = {
    'critical_any': 0.25,          # Highest priority (25% of sample)
    'conflict_zones': 0.20,        # Needs expert adjudication
    'cross_layer_severe': 0.20,    # Deep structural issues
    'span_heavy': 0.15,            # Regional density problems
    'cross_layer_moderate': 0.10,  # Multi-layer coordination
    'homogeneous_high': 0.05,      # Single-layer concentrated
    'homogeneous_low': 0.05        # Baseline sampling
}
```

This ensures sampling captures qualitatively different types of problems, not just high-density cells.

### Trade-offs and Recommendations

| **Encoding Approach** | **Information Density** | **Cognitive Load** | **Best For** |
| --- | --- | --- | --- |
| Density-only gradient | Low | Very low | Quick scans, presentations |
| Layer composition hue | Medium | Low-Medium | Understanding layer distribution |
| Paradigm patterns | Medium | Medium | Fixed-cell vs span distinction |
| Severity temperature | Medium | Low | Prioritization, triage |
| Full multi-dimensional | Very High | High | Expert analysis, debugging |

**Recommended Default**: Layer composition hue + Conflict borders

- Balances interpretability and cognitive load
- Reveals cross-layer convergence (most critical pattern)
- Flags conflicting recommendations (requires human judgment)
- Users can toggle to other modes as needed

**For Engineering/Data-Analysis Background**:

- Start with layer composition (familiar from multi-variate visualization)
- Provide explicit legend mapping layer combinations to hues
- Include numerical overlays (density count) for precise readings

### B. The Overlap Problem

```
                 TEXT SEGMENT [Sentence 47, Chapter 3]
                            |
     +----------------------+----------------------+
     |                      |                      |
 LAYER 1               LAYER 3               LAYER 4
(Lexical)            (Semantic)           (Discourse)
     |                      |                      |
Measure A            Measure P            Measure X
Score: 0.42          Binary: 1            Count: 0
Threshold: 0.60      Flag: "Missing"      Optimal: 1-2
     |                      |                      |
     v                      v                      v
RECOMMENDATION       RECOMMENDATION       RECOMMENDATION
"Increase variety"   "Add entity anchor"  "Insert marker"
     |                      |                      |
     +----------------------+----------------------+
                            |
                            v
                 CONVERGENCE POINT
                 Density = 3 recommendations
                 Conflict potential = HIGH
```

**The Challenge**: A segment maintaining high *local* standards may still accumulate multiple recommendations from different analytical perspectives. The heatmap must reveal these convergence zones.

---

## II. Abstract Framework Schematic

### Multi-Layer Pathway Origins

```
┌─────────────────────────────────────────────────────────────┐
│                    DOCUMENT CORPUS                          │
│                   (Hierarchical Text)                       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Parsing & Annotation
             │
             v
┌─────────────────────────────────────────────────────────────┐
│              ENTITY-ROLE GRID (Base Layer)                  │
│                                                             │
│  Rows: Sentences (S₁, S₂, ..., Sₙ)                        │
│  Cols: Linguistic Entities (E₁, E₂, ..., Eₘ)              │
│  Cell: Role (Subject, Object, Absent, ...)                 │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Multi-Layer Analysis
             │
    +────────┼────────┬────────┬────────┬────────┬────────+
    │        │        │        │        │        │        │
    v        v        v        v        v        v        v
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│LAYER 1 ││LAYER 2 ││LAYER 3 ││LAYER 4 ││LAYER 5 ││LAYER 6 │
│        ││        ││        ││        ││        ││        │
│Form/   ││Struct/ ││Meaning/││Connect/││Argument││Quality/│
│Surface ││Organize││Entity  ││Flow    ││Logic   ││Meta    │
└───┬────┘└───┬────┘└───┬────┘└───┬────┘└───┬────┘└───┬────┘
    │         │         │         │         │         │
    │ K₁      │ K₂      │ K₃      │ K₄      │ K₅      │ K₆
    │measures │measures │measures │measures │measures │measures
    │         │         │         │         │         │
    v         v         v         v         v         v
┌──────────────────────────────────────────────────────────┐
│          MEASURE EVALUATION MATRIX                       │
│                                                          │
│  Each measure evaluates relevant cells in entity grid   │
│  Produces: Score | Binary | Ordinal | Count             │
│  Threshold comparison → Flag generation                 │
└────────────┬─────────────────────────────────────────────┘
             │
             │ Aggregation
             v
┌──────────────────────────────────────────────────────────┐
│      RECOMMENDATION CONVERGENCE MAP (Heatmap)            │
│                                                          │
│  Rows: Sentences × Entities (Sᵢ, Eⱼ) pairs             │
│  Value: Recommendation density ρ(i,j)                   │
│  Color: Intensity from 0 (white) to ρ_max (red)         │
│  Interaction: Click → Traceback to all contributing     │
│                      measures + their pathways          │
└──────────────────────────────────────────────────────────┘
```

### Pathway Taxonomy

**Direct Pathways** (Layer → Cell):

- Single measure evaluates single cell
- Example: Measure M₁₇ @ Layer 2 evaluates sentence S₄₇ for structural property

**Cascading Pathways** (Layer₁ → Layer₂ → Cell):

- Measure at Layer A depends on result from Layer B
- Example: Argument strength (L5) depends on discourse connectivity (L4)

**Convergent Pathways** (Multiple Layers → Same Cell):

- Multiple measures from different layers target same location
- **This creates the overlap problem**

**Cross-Entity Pathways** (Entity E₁ → Entity E₂):

- Measure evaluates relationship between entities
- Example: Coreference consistency across entity mentions

---

## III. Heatmap Architecture

### A. Data Model

### 1. Base Entity Grid (Storage)

```python
# Core structure
EntityGrid = {
  'sentences': List[Sentence],  # n sentences
  'entities': List[Entity],      # m entities
  'grid': np.ndarray,            # shape (n, m)
  'metadata': Dict
}

# Cell structure
Cell(sentence_id, entity_id) = {
  'role': Enum[Subject, Object, Indirect, Possessive, Modifier, Absent],
  'token_span': (start_idx, end_idx),
  'syntactic_features': Dict,
  'semantic_features': Dict
}
```

### 2. Measure Evaluation Record

```python
MeasureEvaluation = {
  'measure_id': str,
  'layer': int,                    # 1-6
  'output_type': Enum[Score, Binary, Ordinal, Count],
  'value': Union[float, int, str],
  'threshold': Optional[Union[float, Tuple]],
  'flagged': bool,
  'target_cells': List[Tuple[sentence_id, entity_id]],
  'recommendation': Optional[str],
  'severity': Enum[Critical, Major, Minor],
  'pathway_type': Enum[Direct, Cascading, Convergent, CrossEntity]
}
```

### 3. Convergence Heatmap (Derived)

```python
HeatmapCell(i, j) = {
  'sentence_id': i,
  'entity_id': j,
  'density': int,                    # Count of recommendations
  'contributing_measures': List[measure_id],
  'layer_distribution': Dict[layer → count],
  'severity_breakdown': Dict[severity → count],
  'recommendations': List[str],
  'conflict_score': float,           # Measure of recommendation incompatibility
  'priority_score': float            # Weighted by severity × density × capacity
}

# Matrix representation
Heatmap = np.ndarray[shape=(n_sentences, m_entities), dtype=HeatmapCell]
```

### B. Computation Pipeline

```
INPUT: Document
  |
  v
STEP 1: Entity Grid Construction
  • Parse document into sentences
  • Extract entities (named entities, concepts, key terms)
  • Assign grammatical roles per sentence
  • Build n×m grid
  |
  v
STEP 2: Measure Evaluation (Parallel)
  • For each of 60+ measures:
    - Evaluate target cells
    - Compute output (score/binary/ordinal/count)
    - Apply threshold logic
    - Generate flag if triggered
    - Create recommendation if flagged
  • Store all evaluations
  |
  v
STEP 3: Convergence Aggregation
  • For each cell (i, j):
    - Collect all measures targeting (i, j)
    - Count density = |measures|
    - Group by layer and severity
    - Detect conflicts (contradictory recommendations)
    - Calculate priority score
  • Populate heatmap matrix
  |
  v
STEP 4: Visualization Rendering
  • Color mapping: density → RGB
  • Hierarchical grouping (by chapter/section)
  • Interactive layer toggling
  • Drill-down capability
  |
  v
OUTPUT: Interactive Heatmap + Traceback System
```

---

## IV. Implementation Plan

### Phase 1: Foundation (Weeks 1-2)

### Milestone 1.1: Entity Grid Construction

**Objective**: Build the base entity-role grid from document

**Components**:

1. **Sentence Tokenizer**
    - Parse document into sentences with hierarchical metadata (chapter, section, paragraph)
    - Extract sentence-level features (length, complexity, position)
2. **Entity Extractor**
    - Named Entity Recognition (spaCy, Stanford NER)
    - Key term extraction (TF-IDF, TextRank)
    - Concept identification (domain-specific ontology)
    - Pronominal reference resolution
3. **Role Assigner**
    - Dependency parsing (spaCy, Stanza)
    - Map entities to grammatical roles per sentence
    - Categories: Subject, Object, Indirect Object, Possessive, Modifier, Absent
4. **Storage Schema**
    - Database: PostgreSQL with JSON support
    - Tables:
        - `documents` (id, title, metadata)
        - `sentences` (id, doc_id, text, position, features)
        - `entities` (id, doc_id, text, type, canonical_form)
        - `grid_cells` (sentence_id, entity_id, role, token_span, features)

**Deliverable**: Populated entity grid for test document (1,200 pages)

**Validation**:

- Grid completeness: All sentences × All entities accounted
- Role accuracy: Manual verification on 100 random cells (target: 90%+ agreement)
- Performance: Grid construction < 30 minutes for 1,200 pages

---

### Milestone 1.2: Measure Registry & Evaluation Engine

**Objective**: Systematize the 60+ measures with standardized evaluation interface

**Components**:

1. **Measure Registry**

```python
class Measure:
    id: str
    name: str
    layer: int
    output_type: OutputType
    threshold: Union[float, Tuple, Dict]
    severity_if_flagged: Severity
    
    def evaluate(self, cell: Cell, context: Context) -> MeasureEvaluation:
        """Standardized evaluation interface"""
        pass
    
    def get_recommendation(self, evaluation: MeasureEvaluation) -> str:
        """Generate actionable recommendation"""
        pass
```

1. **Evaluation Engine**

```python
class EvaluationEngine:
    def __init__(self, measures: List[Measure], grid: EntityGrid):
        self.measures = measures
        self.grid = grid
    
    def evaluate_all(self) -> List[MeasureEvaluation]:
        """Parallel evaluation of all measures"""
        results = []
        with ThreadPoolExecutor(max_workers=12) as executor:
            futures = []
            for measure in self.measures:
                future = executor.submit(self._evaluate_measure, measure)
                futures.append(future)
            
            for future in as_completed(futures):
                results.extend(future.result())
        
        return results
    
    def _evaluate_measure(self, measure: Measure) -> List[MeasureEvaluation]:
        """Evaluate single measure on all target cells"""
        evaluations = []
        target_cells = measure.get_target_cells(self.grid)
        
        for cell in target_cells:
            context = [self.build](http://self.build)_context(cell)
            evaluation = measure.evaluate(cell, context)
            evaluations.append(evaluation)
        
        return evaluations
```

1. **Measure Configuration Database**
    - Table: `measures`
        - Fields: id, name, layer, output_type, threshold_config, severity, implementation_class
    - Table: `measure_dependencies`
        - Fields: measure_id, depends_on_measure_id, dependency_type

**Deliverable**:

- All 60+ measures registered with standardized interface
- Evaluation engine completing full analysis in < 2 hours for 1,200 pages

**Validation**:

- Measure coverage: All 6 layers represented
- Output type distribution: Verify count of each type (Score/Binary/Ordinal/Count)
- Evaluation correctness: Manual verification on 50 samples per measure

---

### Phase 2: Heatmap Generation (Weeks 3-4)

### Milestone 2.1: Convergence Aggregation

**Objective**: Build the recommendation density matrix

**Algorithm**:

```python
def build_convergence_heatmap(grid: EntityGrid, 
                              evaluations: List[MeasureEvaluation]) -> np.ndarray:
    """
    Aggregate measure evaluations into density heatmap
    
    Returns: (n_sentences × m_entities) matrix of HeatmapCell objects
    """
    n_sentences = len(grid.sentences)
    m_entities = len(grid.entities)
    
    # Initialize empty heatmap
    heatmap = np.empty((n_sentences, m_entities), dtype=object)
    for i in range(n_sentences):
        for j in range(m_entities):
            heatmap[i, j] = HeatmapCell(
                sentence_id=i,
                entity_id=j,
                density=0,
                contributing_measures=[],
                layer_distribution={},
                severity_breakdown={},
                recommendations=[],
                conflict_score=0.0,
                priority_score=0.0
            )
    
    # Aggregate flagged evaluations
    flagged_evals = [e for e in evaluations if e.flagged]
    
    for eval in flagged_evals:
        for (sent_id, ent_id) in [eval.target](http://eval.target)_cells:
            cell = heatmap[sent_id, ent_id]
            
            # Increment density
            cell.density += 1
            
            # Track contributing measure
            cell.contributing_measures.append(eval.measure_id)
            
            # Update layer distribution
            layer = eval.layer
            cell.layer_distribution[layer] = cell.layer_distribution.get(layer, 0) + 1
            
            # Update severity breakdown
            severity = eval.severity
            cell.severity_breakdown[severity] = cell.severity_breakdown.get(severity, 0) + 1
            
            # Store recommendation
            if eval.recommendation:
                cell.recommendations.append({
                    'measure_id': eval.measure_id,
                    'text': eval.recommendation,
                    'severity': eval.severity,
                    'layer': eval.layer
                })
    
    # Post-processing: Calculate conflict and priority scores
    for i in range(n_sentences):
        for j in range(m_entities):
            cell = heatmap[i, j]
            
            # Conflict detection
            cell.conflict_score = detect_conflicts(cell.recommendations)
            
            # Priority scoring
            sentence = grid.sentences[i]
            capacity = 1024 / (2 ** sentence.depth)
            
            severity_weight = (
                cell.severity_breakdown.get('Critical', 0) * 10 +
                cell.severity_breakdown.get('Major', 0) * 5 +
                cell.severity_breakdown.get('Minor', 0) * 1
            )
            
            cell.priority_score = cell.density * severity_weight * capacity
    
    return heatmap

def detect_conflicts(recommendations: List[Dict]) -> float:
    """
    Detect contradictory recommendations
    
    Returns: Conflict score from 0.0 (no conflicts) to 1.0 (high conflict)
    """
    if len(recommendations) < 2:
        return 0.0
    
    # Semantic similarity between recommendation texts
    texts = [r['text'] for r in recommendations]
    embeddings = encode_texts(texts)  # Use sentence-transformers
    
    # Pairwise similarity
    similarities = cosine_similarity(embeddings)
    
    # Low similarity = potential conflict
    # (If recommendations are very different, they might be contradictory)
    avg_similarity = np.mean(similarities[np.triu_indices_from(similarities, k=1)])
    
    conflict_score = 1.0 - avg_similarity
    
    return conflict_score
```

**Deliverable**:

- Heatmap matrix populated with density and priority scores
- Conflict detection operational
- Storage in database (`heatmap_cells` table)

**Validation**:

- Density correctness: Manual count vs computed density for 100 random cells
- Priority ranking: Expert review of top 50 priority cells
- Conflict detection: Precision/recall on manually labeled conflict cases

---

### Milestone 2.2: Visualization Layer

**Objective**: Interactive web-based heatmap interface

**Technology Stack**:

- Frontend: React + D3.js for heatmap rendering
- Backend: FastAPI (Python) serving heatmap data
- State management: Redux for filter/zoom state
- Styling: Tailwind CSS

**Features**:

1. **Main Heatmap View**

```
┌─────────────────────────────────────────────────────────────┐
│  Recommendation Density Heatmap                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Entities →  E₁    E₂    E₃    E₄    E₅   ...   Eₘ        │
│  ┌────────────────────────────────────────────────────┐    │
│  │ S₁     [0]  [2]  [1]  [0]  [0]  ...  [0]          │    │
│  │ S₂     [1]  [4]  [3]  [0]  [1]  ...  [0]  ← High  │    │
│  │ S₃     [0]  [0]  [1]  [2]  [0]  ...  [1]  density │    │
│  │ S₄     [3]  [1]  [5]  [1]  [0]  ...  [0]  (red)   │    │
│  │ ...                                                 │    │
│  │ Sₙ     [0]  [1]  [0]  [0]  [2]  ...  [1]          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Color Scale: [0] → White, [1-2] → Yellow, [3-5] → Orange, │
│               [6+] → Red                                    │
└─────────────────────────────────────────────────────────────┘
```

1. **Hierarchical Navigation**
    - Top level: Chapter overview (aggregated heatmap)
    - Zoom in: Section-level detail
    - Maximum zoom: Sentence × Entity cells
2. **Interactive Controls**
    - **Layer Filter**: Toggle visibility by layer (L1-L6 checkboxes)
    - **Severity Filter**: Show only Critical/Major/Minor
    - **Density Threshold**: Slider to hide cells below threshold
    - **Search**: Find specific entity or sentence
3. **Cell Interaction** (Click Handler)

```
OnClick(cell[i, j]):
  → Open side panel with:
     • Sentence text with entity highlighted
     • Density: X recommendations
     • Layer breakdown: L1(2), L3(1), L4(3), ...
     • Severity: Critical(1), Major(2), Minor(3)
     • Conflict score: 0.67 (Medium)
     • Priority score: 145.2
     
     • Recommendation List (expandable):
       [1] Layer 4 | Major | "Insert discourse marker"
           → Measure: M₂₃ (Output: Binary = 1)
           → Pathway: Direct (L4 → Cell)
           → Traceback: [Show measure details]
       
       [2] Layer 3 | Critical | "Resolve entity ambiguity"
           → Measure: M₁₈ (Output: Score = 0.32, Threshold = 0.60)
           → Pathway: Cascading (L1 → L3 → Cell)
           → Traceback: [Show measure details]
       
       [...]
     
     • Actions:
       - Mark as reviewed
       - Defer to later
       - Add custom note
       - Export cell report
```

1. **Traceback System**

```
OnClick(recommendation traceback):
  → Expand to show:
     • Measure ID and name
     • Layer origin
     • Output type and value
     • Threshold logic
     • Pathway visualization:
       
       L1: Measure M₀₅ (Lexical diversity)
        ↓  Cascading dependency
       L3: Measure M₁₈ (Entity stability)
        ↓  Direct evaluation
       Cell[47, 12]: Flagged (Score 0.32 < 0.60)
     
     • Related measures in same layer
     • Historical performance (if available)
```

**Deliverable**:

- Fully interactive heatmap application
- Deployed locally or on internal server
- Documentation for end-user interaction

**Validation**:

- Usability testing with 3-5 domain experts
- Performance: < 2 second load time for 1,200 page heatmap
- Traceback accuracy: 100% correct measure attribution

---

### Phase 3: Sampling Integration (Week 5)

### Milestone 3.1: Priority-Driven Sampling

**Objective**: Use heatmap to guide sampling decisions

**Integration Points**:

1. **Stratified Sampling by Density Quartiles**

```python
def stratify_by_density(heatmap: np.ndarray) -> Dict[str, List]:
    """
    Stratify sentences by recommendation density
    """
    # Aggregate density per sentence (sum across all entities)
    sentence_densities = np.sum(heatmap['density'], axis=1)
    
    # Create quartile bins
    q1, q2, q3 = np.percentile(sentence_densities, [25, 50, 75])
    
    strata = {
        'low': [],      # density < q1
        'medium': [],   # q1 <= density < q2
        'high': [],     # q2 <= density < q3
        'critical': []  # density >= q3
    }
    
    for i, density in enumerate(sentence_densities):
        if density < q1:
            strata['low'].append(i)
        elif density < q2:
            strata['medium'].append(i)
        elif density < q3:
            strata['high'].append(i)
        else:
            strata['critical'].append(i)
    
    return strata

def sample_by_strata(strata: Dict, total_n: int = 300) -> List[int]:
    """
    Neyman optimal allocation weighted by density variance
    """
    # Over-sample high-density strata
    allocation = {
        'low': 0.10,      # 10% of sample
        'medium': 0.20,   # 20%
        'high': 0.35,     # 35%
        'critical': 0.35  # 35%
    }
    
    sample = []
    for stratum_name, sentence_ids in strata.items():
        n_sample = int(total_n * allocation[stratum_name])
        sampled = np.random.choice(sentence_ids, size=n_sample, replace=False)
        sample.extend(sampled)
    
    return sample
```

1. **Conflict-Aware Sampling**

```python
def sample_conflicts(heatmap: np.ndarray, n: int = 50) -> List[Tuple[int, int]]:
    """
    Prioritize cells with high conflict scores for expert review
    """
    # Flatten heatmap to list of cells
    cells = [(i, j, heatmap[i, j].conflict_score) 
             for i in range(heatmap.shape[0]) 
             for j in range(heatmap.shape[1])
             if heatmap[i, j].density > 0]
    
    # Sort by conflict score (descending)
    cells_sorted = sorted(cells, key=lambda x: -x[2])
    
    # Return top n cells
    return [(i, j) for i, j, _ in cells_sorted[:n]]
```

1. **Active Learning Query Strategy**

```python
class HeatmapGuidedActiveLearn:
    def query(self, heatmap: np.ndarray, unlabeled_pool: List, k: int = 25):
        """
        Select samples with highest uncertainty × priority
        """
        scores = []
        for sample_id in unlabeled_pool:
            sentence_id = sample_id
            
            # Aggregate priority across entities for this sentence
            priority = np.mean([heatmap[sentence_id, j].priority_score 
                               for j in range(heatmap.shape[1])])
            
            # Model uncertainty (from neural model)
            uncertainty = self.model.predict_uncertainty(sample_id)
            
            # Combined score
            score = priority * uncertainty
            scores.append((sample_id, score))
        
        # Return top-k
        scores_sorted = sorted(scores, key=lambda x: -x[1])
        return [sample_id for sample_id, _ in scores_sorted[:k]]
```

**Deliverable**:

- Sampling algorithms integrated with heatmap data
- Comparative analysis: Heatmap-guided vs random sampling

**Validation**:

- Defect detection rate: Heatmap-guided should achieve 90%+ recall with 25-30% sample
- Conflict resolution efficiency: Time to resolve conflicts in heatmap-guided sample vs full corpus

---

### Milestone 3.2: Iterative Refinement Loop

**Objective**: Update heatmap after recommendations are applied

**Workflow**:

```
1. Generate initial heatmap from draft document
   ↓
2. Use heatmap to guide sampling (select 300 sentences)
   ↓
3. Expert review of sampled sentences
   ↓
4. Apply recommendations (revise text)
   ↓
5. Re-evaluate measures on revised sections
   ↓
6. Update heatmap (delta computation)
   ↓
7. Visualize improvement:
   - Overlay: Before (red) vs After (green)
   - Metrics: Average density reduction
   - New hotspots revealed
   ↓
8. Repeat if needed (typically 2-3 iterations)
```

**Delta Computation**:

```python
def compute_heatmap_delta(heatmap_before: np.ndarray,
                          heatmap_after: np.ndarray) -> Dict:
    """
    Track changes in recommendation density
    """
    delta = {
        'cells_improved': 0,
        'cells_worsened': 0,
        'cells_unchanged': 0,
        'avg_density_change': 0.0,
        'resolved_conflicts': 0,
        'new_conflicts': 0
    }
    
    n, m = heatmap_before.shape
    density_changes = []
    
    for i in range(n):
        for j in range(m):
            before = heatmap_before[i, j]
            after = heatmap_after[i, j]
            
            density_change = after.density - before.density
            density_changes.append(density_change)
            
            if density_change < 0:
                delta['cells_improved'] += 1
            elif density_change > 0:
                delta['cells_worsened'] += 1
            else:
                delta['cells_unchanged'] += 1
            
            # Conflict tracking
            if before.conflict_score > 0.5 and after.conflict_score < 0.5:
                delta['resolved_conflicts'] += 1
            elif before.conflict_score < 0.5 and after.conflict_score > 0.5:
                delta['new_conflicts'] += 1
    
    delta['avg_density_change'] = np.mean(density_changes)
    
    return delta
```

**Deliverable**:

- Before/after comparison view in heatmap UI
- Iteration history tracking
- Convergence metrics

**Validation**:

- Iterative improvement: Each iteration should reduce avg density by 20-40%
- Diminishing returns: Iterations stop when improvement < 5%

---

### Phase 4: Advanced Features (Weeks 6-8)

### Milestone 4.1: Layer Interaction Visualization

**Objective**: Show how measures from different layers converge on same location

**Sankey Diagram** (Layer → Measure → Cell):

```
Layer 1 ────┬──── Measure M₀₃ ───┐
            │                    │
            └──── Measure M₀₇ ───┤
                                 ├──→ Cell[47, 12]
Layer 3 ────┬──── Measure M₁₈ ───┤     (Density: 5)
            │                    │
            └──── Measure M₂₁ ───┘
                                 
Layer 4 ───────── Measure M₃₅ ────┘
```

**Implementation**:

- Use D3-sankey for flow visualization
- Width of flow = number of flagged cells for that measure
- Click on flow → highlight corresponding cells in heatmap

---

### Milestone 4.2: Export & Reporting

**Formats**:

1. **CSV Export**: Full heatmap matrix with metadata
2. **JSON Export**: Structured data for external tools
3. **PDF Report**: Executive summary with:
    - Overall density statistics
    - Top 20 priority cells
    - Layer distribution chart
    - Conflict hotspots
    - Sampling recommendations

---

### Milestone 4.3: Performance Optimization

**For large documents (3,000+ pages)**:

1. **Sparse Matrix Storage**
    - Most cells have density = 0
    - Use scipy.sparse for memory efficiency
2. **Incremental Evaluation**
    - Cache measure evaluations
    - Re-evaluate only changed sections on revision
3. **Progressive Rendering**
    - Load heatmap in chunks (chapter by chapter)
    - Virtual scrolling for large matrices
4. **Parallel Processing**
    - Distribute measure evaluation across CPU cores
    - GPU acceleration for neural measures

---

## V. Integration with Sampling Methods

### How Heatmap Enhances Sampling

1. **Identify High-Variance Strata**
    - Stratified Neyman allocation uses density variance
    - Allocate more samples to high-density strata
2. **Guide Network Analysis**
    - Weight PageRank by cell priority scores
    - Hub chapters = those with high aggregate priority
3. **Inform Active Learning**
    - Query sentences with high uncertainty × priority product
    - Avoid wasting labels on low-priority samples
4. **Validate Coverage**
    - After sampling, visualize which layers/entities are covered
    - Ensure no critical gaps in sample distribution
5. **Conflict Resolution**
    - Prioritize conflict cells for expert adjudication
    - Reduces cognitive load by showing competing recommendations upfront

### Sampling Cost Reduction

With heatmap guidance:

- **Baseline**: Review 100% of corpus (1,500 sentences × 5 min = 125 hours)
- **Random sampling**: Review 25% (375 sentences = 31 hours), but miss critical hotspots
- **Heatmap-guided**: Review 25% (375 sentences = 31 hours), **capture 92%+ of critical issues**

**Key Insight**: Heatmap reveals where recommendations *converge*, indicating structural problems that affect multiple quality dimensions. These convergence zones are exactly what you want to sample.

---

## VI. Technical Specifications

### System Requirements

**Hardware**:

- CPU: 8+ cores (for parallel measure evaluation)
- RAM: 32GB+ (for large entity grids in memory)
- Storage: 100GB+ (for grid, evaluations, heatmap storage)
- GPU: Optional but recommended for neural measures

**Software**:

- Python 3.9+
- PostgreSQL 13+
- Node.js 16+ (for frontend)
- Docker (for containerized deployment)

### Libraries & Dependencies

**Python**:

```
spacy>=3.0
stanza
networkx
scipy
numpy
pandas
scikit-learn
sentence-transformers
fastapi
uvicorn
sqlalchemy
psycopg2
```

**JavaScript/React**:

```
react
d3
d3-sankey
redux
axios
tailwindcss
```

### Performance Targets

| Operation | Target | Notes |
| --- | --- | --- |
| Entity grid construction | < 30 min | For 1,200 pages |
| Measure evaluation (all 60+) | < 2 hours | Parallel execution |
| Heatmap aggregation | < 5 min | Numpy operations |
| Visualization load | < 3 sec | First render |
| Cell click response | < 0.5 sec | Traceback retrieval |
| Export (CSV) | < 1 min | Full matrix |

---

## VII. Expected Outcomes

### Quantitative Benefits

1. **Recommendation Transparency**
    - Before: 60+ measures produce opaque list of 500+ recommendations
    - After: Visual heatmap shows exactly where recommendations converge
2. **Cognitive Load Reduction**
    - Before: Review 500+ recommendations linearly (20+ hours)
    - After: Focus on 50 high-density cells (5-8 hours)
3. **Conflict Detection**
    - Before: Discover contradictions during implementation (costly rework)
    - After: Flag conflicts upfront with traceback to measure logic
4. **Sampling Efficiency**
    - Before: Random sampling misses 30-40% of critical issues
    - After: Heatmap-guided sampling captures 90-95% with same sample size
5. **Iterative Improvement Tracking**
    - Before: Subjective assessment ("document feels better")
    - After: Quantitative density reduction ("avg density decreased 35%")

### Qualitative Benefits

1. **Cross-Disciplinary Communication**
    - Engineers understand density/priority/convergence concepts
    - Reduces linguistic terminology barrier
2. **Audit Trail**
    - Every recommendation traceable to specific measure + threshold
    - Supports quality assurance and process documentation
3. **Measure Validation**
    - Identify measures that always fire vs rarely fire
    - Refine thresholds based on empirical density distributions
4. **Pattern Discovery**
    - Recurring high-density patterns reveal systematic issues
    - Example: Entity E₁₇ always high-density → definition problem

---

## VIII. Risks & Mitigations

### Risk 1: Computational Complexity

**Problem**: 1,500 sentences × 50 entities × 60 measures = 4.5M evaluations

**Mitigation**:

- Parallel processing (12 cores → 12x speedup)
- Selective evaluation (measures target specific cell types)
- Caching intermediate results
- Progressive computation (evaluate on-demand for visible cells)

### Risk 2: Heatmap Visual Clutter

**Problem**: 1,500 × 50 matrix too large to display meaningfully

**Mitigation**:

- Hierarchical aggregation (chapter → section → sentence drill-down)
- Density threshold filtering (hide cells below threshold)
- Layer toggling (show only specific layers)
- Search/filter by entity type

### Risk 3: Conflict Resolution Ambiguity

**Problem**: Multiple valid recommendations, unclear which to apply

**Mitigation**:

- Conflict score calculation (semantic similarity)
- Expert annotation of preferred resolution
- Machine learning to predict preferred resolution pattern
- User feedback loop to refine conflict detection

### Risk 4: Measure Output Heterogeneity

**Problem**: Comparing scores (0.0-1.0) vs counts (0-10) vs binary (0/1)

**Mitigation**:

- Normalization scheme (all to 0-1 scale)
- Weighted aggregation by output type
- Display raw values alongside normalized priority

---

## IX. Success Metrics

### Implementation Success

- ✓ Entity grid construction: < 30 minutes for 1,200 pages
- ✓ Measure evaluation: < 2 hours for all 60+ measures
- ✓ Heatmap rendering: < 3 seconds initial load
- ✓ Traceback accuracy: 100% correct measure attribution

### User Adoption

- ✓ User training: < 1 hour to proficiency
- ✓ Daily usage: 3+ reviews per week
- ✓ User satisfaction: ≥ 4.0/5.0 rating
- ✓ Recommendation acceptance rate: ≥ 70%

### Quality Impact

- ✓ Sampling efficiency: 90%+ critical issue detection with 25% sample
- ✓ Iterative improvement: 30%+ density reduction per iteration
- ✓ Conflict resolution: 80%+ conflicts resolved before implementation
- ✓ Final document quality: 15-25% fewer post-publication defects

---

## X. Next Steps

### Immediate (Week 1)

1. Review this plan with project stakeholders
2. Set up development environment (Python, PostgreSQL, React)
3. Select test document (one chapter, ~100 pages)
4. Begin entity grid construction prototype

### Short-term (Weeks 2-4)

1. Implement measure registry for 10 representative measures
2. Build basic heatmap visualization (static, non-interactive)
3. Validate density computation on test document
4. Iterate based on feedback

### Medium-term (Weeks 5-8)

1. Scale to full 60+ measure inventory
2. Add interactivity (click, filter, traceback)
3. Integrate with sampling methods
4. Deploy on full 1,200 page document

### Long-term (Months 3-6)

1. Advanced features (Sankey diagrams, conflict resolution)
2. Performance optimization for 3,000+ page documents
3. Multi-document portfolio support
4. Export and reporting automation

---

## Conclusion

This heatmap architecture addresses the core **measure overlap problem** by:

1. **Visualizing convergence**: Where multiple measures target the same location
2. **Quantifying density**: How many recommendations affect each cell
3. **Enabling traceability**: Click any cell → see all contributing measures and pathways
4. **Guiding sampling**: Focus effort on high-density, high-priority regions
5. **Tracking improvement**: Iterative density reduction over revisions

For an engineering-trained academic, this system provides:

- **Quantitative metrics** (density, priority, conflict scores)
- **Visual clarity** (heatmap, color intensity)
- **Systematic workflow** (evaluate → visualize → sample → refine → iterate)
- **Audit trail** (every recommendation traceable)

The result: Transform the overwhelming task of applying 60+ linguistic measures into a **structured, data-driven quality improvement process** with clear priorities and measurable outcomes.