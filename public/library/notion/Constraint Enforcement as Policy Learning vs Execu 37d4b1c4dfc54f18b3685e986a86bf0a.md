# Constraint Enforcement as Policy: Learning vs Execution in Quality-Anchored Systems

# Constraint Enforcement as Policy: Learning vs Execution in Quality-Anchored Systems

## Overview

This page explores **constraint enforcement as policy** in the context of quality-anchored measure-theoretic frameworks, distinguishing between agents that **learn constraints dynamically** versus agents that **execute fixed constraints**. The fundamental question: Should quality thresholds Θ be immutable policies enforced procedurally, or should they be learned parameters adapted from performance feedback?

**Core Tension**: The measure-theoretic framework (Ω, ℱ_n, μ_w, {μ_j}, Q, Θ) treats quality thresholds Θ as **fixed constraints**—but multi-agent coordination literature demonstrates that constraint discovery and adaptation can improve system performance.

---

## Fundamental Dichotomy: Execution vs Learning

### Execution-Only Agents (Fixed Policy)

**Definition**: Agents operate under **procedurally enforced constraints** that are externally specified and immutable during runtime.

**Characteristics**:

- Quality thresholds Θ are **compile-time constants**
- Constraint violations trigger deterministic responses (reject, replan, wait)
- No feedback loop from performance metrics to constraint values
- Analogous to "command and control" architecture

**Mathematical Formulation**:

$$
\text{Agent behavior: } \begin{cases}
\text{execute}(A) & \text{if } Q(A) \geq \Theta \\
\text{reject}(A) & \text{if } Q(A) < \Theta
\end{cases}
$$

Θ is a **policy parameter** set by domain experts and unchanging.

**Example**: Entity coherence threshold θ_entity = 0.65 is enforced for all chapters regardless of observed performance.

**Advantages**:

- Predictable behavior (no drift)
- Guarantees minimum quality floor
- Simpler implementation (no learning machinery)
- Compliance-friendly (auditable decisions)

**Disadvantages**:

- Cannot adapt to context (different genres may need different thresholds)
- Over-constrains in easy regions, under-constrains in hard regions
- Requires expert knowledge to set Θ correctly upfront
- Brittle to distributional shift (new writing styles)

### Learning Agents (Adaptive Policy)

**Definition**: Agents **discover and refine constraints** through interaction with performance feedback, treating Θ as **learnable parameters**.

**Characteristics**:

- Quality thresholds Θ(t) evolve over time based on observed outcomes
- Feedback from reader scores, publication success, downstream task performance
- Constraint violations inform policy updates ("was this threshold too strict?")
- Analogous to "reinforcement learning" or "adaptive control"

**Mathematical Formulation**:

$$
\Theta(t+1) = \Theta(t) + \eta \cdot \nabla_{\Theta} \mathcal{L}(\text{performance})
$$

Where performance loss ℒ could be:

- Reader satisfaction scores
- Publication acceptance rates
- Downstream coherence in multi-chapter narratives

**Example**: Start with θ_entity = 0.65, but if chapters with θ_entity = 0.60 consistently receive high reader scores, gradually lower threshold to 0.60.

**Advantages**:

- Adapts to context (genre-specific, author-specific optima)
- Discovers efficient frontiers (quality vs effort trade-offs)
- Handles distributional shift (new domains, evolving standards)
- Data-driven rather than expert-driven

**Disadvantages**:

- Requires labeled performance data (reader scores, etc.)
- Risk of drift below acceptable quality floors
- More complex implementation (learning algorithms, hyperparameters)
- Less interpretable ("why did threshold change?")

---

## Constraint Types in Quality-Anchored Frameworks

### Type 1: Hard Constraints (Structural Invariants)

**Definition**: Constraints that **must** be satisfied for mathematical coherence of the measure space.

**Examples**:

$$
\sum_{j=1}^{m} c_A^{(j)} = 1 \quad \text{(simplex constraint)}
$$

$$
\sum_{j=1}^{m} \mu_j(A) = \mu_w(A) \quad \text{(measure additivity)}
$$

$$
\mu_j \ll \mu_w \quad \text{(absolute continuity)}
$$

**Policy Status**: **Never learned**—these are mathematical axioms, not tunable parameters.

**Enforcement**: Structural (enforced by data structures, not runtime checks).

### Type 2: Soft Constraints (Quality Thresholds)

**Definition**: Constraints that encode **desired** quality levels but can be relaxed based on context.

**Examples**:

$$
Q_{\text{entity}}(A) \geq \theta_{\text{entity}} = 0.65
$$

$$
Q_{\text{toulmin}}(A) \geq \theta_{\text{toulmin}} = 0.70
$$

**Policy Status**: **Can be learned**—these are empirical targets, not mathematical necessities.

**Enforcement**: Runtime checks with adaptive thresholds.

### Type 3: Coupling Constraints (Multi-Agent Dependencies)

**Definition**: Constraints arising from interactions between agents, often **discovered at runtime**.

**Examples** (from multi-agent literature):

$$
\text{Pathway } P_i \text{ requires output from } P_j \text{ (dependency)}
$$

$$
\text{Agent } A \text{ and Agent } B \text{ cannot edit same node simultaneously (conflict)}
$$

**Policy Status**: **Must be learned**—these are not known a priori in complex systems.

**Enforcement**: Discovery policies (inspection, pattern recognition, collaborative communication).

---

## Pluggable Policy Architecture (From Multi-Agent Literature)

### Framework from Dependency Discovery Research

The multi-agent coordination literature[[1]](Dependency%20Discovery%20Policy%20dd86c5b8f10c4ae592f85977ef8a1e3e.md) defines **pluggable policies** at two critical decision points:

**Step 9: Dependency Discovery Policy** ("How do agents detect constraints?")

1. **Trivial**: Assume no dependencies (execution-only)
2. **Inspection**: Check current state against requirements (execution with validation)
3. **Pattern Recognition**: Learn dependencies from history (learning from data)
4. **Collaborative**: Query other agents (distributed learning)

**Step 10: Externality Handling Policy** ("What do agents do when constraints are violated?")

1. **Wait**: Block until constraint is satisfied
2. **Backtrack**: Undo previous actions and retry
3. **Replan**: Find alternative pathway
4. **Partial**: Relax constraint temporarily
5. **Coordinate**: Negotiate with other agents

### Policy Combination Matrix

| Discovery Policy ↓ / Handling Policy → | Wait | Backtrack | Replan | Partial | Coordinate |
| --- | --- | --- | --- | --- | --- |
| **Trivial (Execution-only)** | Invalid | Invalid | Invalid | Invalid | Invalid |
| **Inspection (Validation)** | ✅ Simple | ✅ Robust | ✅ Flexible | ✅ Efficient | ⚠️ Complex |
| **Pattern Recognition (Learning)** | ✅ Works | ⚠️ Complex | ✅ Good | ✅ Ideal | ⚠️ Can combine |
| **Collaborative (Distributed)** | ✅ Works | ❌ Hard | ⚠️ Negotiated | ⚠️ Complex | ✅ Natural |

**Key Insight**: Pure execution-only (Trivial discovery) is **invalid** for all handling policies—even fixed constraints must be **inspected** at runtime to detect violations.

---

## Application to Quality-Anchored Framework

### Scenario 1: Fixed Quality Thresholds (Execution Mode)

**Policy Configuration**:

- **Discovery**: Inspection-based
- **Handling**: Wait or Reject
- **Θ**: Fixed at design time by domain experts

**Implementation**:

```python
class FixedQualityPolicy:
    def __init__(self, thresholds: Dict[str, float]):
        self.Theta = thresholds  # Immutable
    
    def check_quality(self, node_id: str, quality_scores: Dict[str, float]) -> bool:
        """Inspection-based discovery: check Q >= Θ"""
        for metric, score in quality_scores.items():
            if metric in self.Theta:
                if score < self.Theta[metric]:
                    return False  # Constraint violated
        return True
    
    def handle_violation(self, node_id: str, violations: List[str]) -> str:
        """Wait/Reject handling"""
        # Could wait for revision, or reject outright
        return "REJECT"  # Fixed policy: no flexibility
```

**When to Use**:

- Regulatory compliance (minimum standards must be met)
- High-stakes domains (medical writing, legal documents)
- Early development (insufficient data for learning)

### Scenario 2: Learned Quality Thresholds (Adaptive Mode)

**Policy Configuration**:

- **Discovery**: Pattern recognition from historical performance
- **Handling**: Replan (find alternative composition) or Partial (relax threshold)
- **Θ(t)**: Updated via gradient descent on performance loss

**Implementation**:

```python
class AdaptiveQualityPolicy:
    def __init__(self, initial_thresholds: Dict[str, float], learning_rate: float = 0.01):
        self.Theta = initial_thresholds.copy()  # Mutable
        self.eta = learning_rate
        self.performance_history = []  # (node, quality_scores, outcome)
    
    def check_quality(self, node_id: str, quality_scores: Dict[str, float]) -> bool:
        """Same inspection as fixed policy"""
        violations = []
        for metric, score in quality_scores.items():
            if metric in self.Theta:
                if score < self.Theta[metric]:
                    violations.append((metric, score, self.Theta[metric]))
        
        # But also record for learning
        self.performance_history.append({
            'node_id': node_id,
            'quality_scores': quality_scores,
            'violations': violations
        })
        
        return len(violations) == 0
    
    def handle_violation(self, node_id: str, violations: List) -> str:
        """Partial handling: relax threshold temporarily if justified"""
        # Could replan composition or relax threshold
        return "REPLAN"  # Flexible policy
    
    def update_thresholds(self, performance_data: List[Dict]):
        """
        Learn Θ from performance feedback.
        
        Args:
            performance_data: List of {node_id, quality_scores, reader_score}
        """
        for data in performance_data:
            node_id = data['node_id']
            quality_scores = data['quality_scores']
            reader_score = data['reader_score']  # Ground truth (e.g., 1-5 stars)
            
            # Find corresponding quality at time of writing
            hist = [h for h in self.performance_history if h['node_id'] == node_id]
            if not hist:
                continue
            
            # Compute gradient: if high reader_score despite low quality_score,
            # threshold may be too strict
            for metric in quality_scores:
                if metric not in self.Theta:
                    continue
                
                q_score = quality_scores[metric]
                theta = self.Theta[metric]
                
                # Simple gradient: if reader likes it, relax threshold
                # if reader dislikes it, tighten threshold
                # (This is a simplified heuristic; real gradient would require
                # differentiable performance model)
                
                if reader_score > 4.0 and q_score < theta:
                    # High reader score despite violation → threshold too strict
                    gradient = -(theta - q_score) * (reader_score - 3.0)
                    self.Theta[metric] -= self.eta * gradient
                
                elif reader_score < 3.0 and q_score >= theta:
                    # Low reader score despite passing → threshold too lenient
                    gradient = (q_score - theta) * (3.0 - reader_score)
                    self.Theta[metric] += self.eta * gradient
            
            # Clamp thresholds to valid range [0, 1]
            for metric in self.Theta:
                self.Theta[metric] = np.clip(self.Theta[metric], 0.0, 1.0)
    
    def get_current_thresholds(self) -> Dict[str, float]:
        return self.Theta.copy()
```

**When to Use**:

- Sufficient labeled data (reader scores, publication outcomes)
- Non-critical domains (creative writing, marketing copy)
- Evolving standards (new genres, changing audience preferences)

### Scenario 3: Hybrid (Learned Thresholds with Hard Floors)

**Policy Configuration**:

- **Discovery**: Pattern recognition
- **Handling**: Partial (relax above floor) or Reject (below floor)
- **Θ(t)**: Learned, but constrained to Θ(t) ≥ Θ_min (hard floor)

**Implementation**:

```python
class HybridQualityPolicy(AdaptiveQualityPolicy):
    def __init__(self, initial_thresholds: Dict[str, float],
                 minimum_thresholds: Dict[str, float],
                 learning_rate: float = 0.01):
        super().__init__(initial_thresholds, learning_rate)
        self.Theta_min = minimum_thresholds  # Hard floor (regulatory)
    
    def update_thresholds(self, performance_data: List[Dict]):
        """Learn Θ but enforce Θ >= Θ_min"""
        super().update_thresholds(performance_data)
        
        # Enforce hard floors
        for metric in self.Theta:
            if metric in self.Theta_min:
                self.Theta[metric] = max(self.Theta[metric], self.Theta_min[metric])
```

**When to Use**:

- Regulated domains with minimum standards but room for optimization
- Best practice: start with conservative Θ_min, allow learning above

---

## Constraint Enforcement in Multi-Scale Hierarchies

### Vertical Constraint Propagation

In the measure-theoretic framework, quality constraints apply at **all scales** in the filtration ℱ₀ ⊃ ℱ₁ ⊃ ... ⊃ ℱₙ.

**Question**: Should constraints be enforced uniformly across scales, or learned separately?

**Option A: Uniform Enforcement (Execution)**

$$
Q_i(A) \geq \theta_i \quad \forall A \in \mathcal{F}_k, \forall k
$$

Same threshold θ_i for sentences, paragraphs, chapters.

**Option B: Scale-Dependent Learning (Adaptive)**

$$
Q_i(A) \geq \theta_i^{(k)} \quad \text{where } \theta_i^{(k)} = f(\text{scale } k, \text{performance data})
$$

Learn different thresholds for different scales:

- Sentences: θ_entity^(sentence) = 0.60 (local coherence)
- Paragraphs: θ_entity^(paragraph) = 0.65 (moderate)
- Chapters: θ_entity^(chapter) = 0.70 (strong global coherence)

**Rationale**: Coarser scales aggregate over finer scales, so stochastic fluctuations at fine scales are smoothed. Higher thresholds at coarse scales enforce emergent coherence.

### Horizontal Constraint Coupling (Tone Threads)

Tone thread constraints[[2]](Extending%20Countable%20Additivity%20Beyond%20Parent-Child%205697c4572f96475396d543a373d6d678.md) couple **non-adjacent nodes** across branches:

$$
||c_A - c_B||_1 < \delta_{\text{thread}} \quad \text{for nodes in same thread}
$$

**Question**: Is δ_thread a fixed policy or learned?

**Execution Mode**: Domain expert sets δ_thread = 0.15 for all threads.

**Learning Mode**: Discover δ_thread from successful published works:

```python
def learn_thread_tolerance(published_books: List[Book]):
    """
    Learn thread coherence tolerance from successful books.
    """
    thread_distances = []
    for book in published_books:
        if book.reader_score > 4.0:  # Successful
            threads = extract_tone_threads(book)
            for thread in threads:
                nodes = thread.nodes
                for i in range(len(nodes)-1):
                    dist = l1_distance(nodes[i].composition, nodes[i+1].composition)
                    thread_distances.append(dist)
    
    # Set tolerance to 95th percentile of successful books
    delta_thread = np.percentile(thread_distances, 95)
    return delta_thread
```

**Result**: Empirically calibrated tolerance based on what works in practice.

---

## Physics-Informed Constraint Synthesis (From Multiplexer Research)

The adaptive signal multiplexer[[3]](https://github.com/Mohsen-Dirbaz-Organization/AutoAgents-2/pull/1) demonstrates **constraint synthesis** from first principles:

### Conservation Constraints (Structural)

$$
\sum_i b_i \leq B_{\text{total}} \quad \text{(bandwidth conservation)}
$$

These are **never learned**—they're physical laws.

### Dynamics Constraints (Learned)

$$
q_i(t+1) = q_i(t) + \lambda_i \cdot \Delta t - \mu_i(b_i) \cdot \Delta t
$$

Where:

- λ_i (arrival rate) is **observed**
- μ_i(b_i) (service rate as function of bandwidth) is **learned from data**

**Analogy to Quality Framework**:

$$
Q_i(A, t+1) = Q_i(A, t) + \text{edit_impact}(A) - \text{quality_decay}(A)
$$

Where:

- edit_impact is **known** (measure change from user action)
- quality_decay is **learned** (how quickly quality degrades without maintenance)

### Causality Constraints (Discovered)

$$
s_i \leq s_j \quad \text{(time-slot ordering)}
$$

These are **discovered at runtime** from dependency graph.

**Analogy to Quality Framework**: Dependency between chapters (Chapter 5 assumes terminology from Chapter 3) discovered by inspecting cross-references.

---

## Policy Selection Decision Tree

```
Question 1: Are quality standards externally mandated?
├─ YES → Fixed thresholds (Execution mode)
│  └─ Use Inspection discovery + Wait/Reject handling
└─ NO → Proceed to Question 2

Question 2: Do you have labeled performance data?
├─ NO → Fixed thresholds initially (Execution mode)
│  └─ Plan to collect data and migrate to learning mode
└─ YES → Proceed to Question 3

Question 3: Are there hard regulatory floors?
├─ YES → Hybrid (Learned above floor, fixed below)
│  └─ Use Pattern Recognition discovery + Partial handling (above floor)
└─ NO → Fully adaptive (Learning mode)
   └─ Use Pattern Recognition discovery + Replan handling

Question 4: Is system multi-agent with coupling?
├─ YES → Add collaborative discovery
│  └─ Agents negotiate constraint relaxations
└─ NO → Single-agent with external authority
   └─ Query authoritative state when needed
```

---

## Implementation Checklist

### For Execution-Only Mode (Fixed Constraints)

- [ ]  Define Θ as immutable configuration (YAML, JSON)
- [ ]  Implement inspection-based quality checks at decision points
- [ ]  Define handling policy: Wait, Reject, or Replan
- [ ]  Log all constraint violations for post-hoc analysis
- [ ]  Provide override mechanism for human editors

### For Learning Mode (Adaptive Constraints)

- [ ]  Define Θ(0) as initial thresholds (prior from domain experts)
- [ ]  Implement performance data collection pipeline
    - Reader scores
    - Publication acceptance rates
    - Downstream task success
- [ ]  Choose learning algorithm:
    - Gradient descent on performance loss
    - Bayesian optimization
    - Contextual bandits
- [ ]  Define update frequency (per document, per batch, online)
- [ ]  Implement learning rate schedule (decay over time)
- [ ]  Add monitoring for threshold drift
- [ ]  Visualize threshold evolution over time

### For Hybrid Mode (Learned with Floors)

- [ ]  Define Θ_min as hard floor (regulatory requirements)
- [ ]  Implement constraint: Θ(t) ≥ Θ_min at all times
- [ ]  Log cases where learning hits floor (indicates floor may be too strict)
- [ ]  Provide mechanism to update Θ_min (requires expert approval)

### For Multi-Agent Coordination

- [ ]  Implement dependency discovery policy (Inspection or Collaborative)
- [ ]  Implement externality handling policy (Coordinate or Replan)
- [ ]  Add communication channel for agents to query each other
- [ ]  Define conflict resolution mechanism (coordinator or negotiation)
- [ ]  Log discovered dependencies for pattern recognition

---

## Mathematical Formalization of Learning

### Optimization Objective

Given:

- Quality scores Q(A) for node A
- Performance metric P(A) (e.g., reader score, publication success)
- Threshold vector Θ

Learn Θ to maximize expected performance subject to constraint satisfaction:

$$
\max_{\Theta} \mathbb{E}_A[P(A)] \quad \text{s.t.} \quad Q(A) \geq \Theta \text{ (soft constraint)}
$$

This is a **constrained optimization** with learned constraints.

### Lagrangian Formulation

$$
\mathcal{L}(\Theta, \lambda) = \mathbb{E}_A[P(A)] - \sum_i \lambda_i (\theta_i - Q_i(A))
$$

Karush-Kuhn-Tucker (KKT) conditions:

$$
\frac{\partial \mathcal{L}}{\partial \theta_i} = 0 \quad \Rightarrow \quad \frac{\partial \mathbb{E}[P]}{\partial \theta_i} = \lambda_i
$$

Interpretation: Optimal threshold balances **performance gain** (∂P/∂θ) against **constraint cost** (λ).

### Gradient Estimation

In practice, ∂𝔼[P]/∂θ is unknown. Estimate via:

**Policy gradient** (REINFORCE):

$$
\nabla_{\theta} \mathbb{E}[P] \approx \frac{1}{N} \sum_{n=1}^N P(A_n) \cdot \nabla_{\theta} \log \pi(A_n | \theta)
$$

Where π(A | θ) is the probability of producing node A under threshold θ.

**Finite differences**:

$$
\frac{\partial \mathbb{E}[P]}{\partial \theta_i} \approx \frac{\mathbb{E}[P | \theta_i + \epsilon] - \mathbb{E}[P | \theta_i]}{\epsilon}
$$

Run system with θ_i and θ_i + ε, compare average performance.

---

## Case Study: Learning Entity Coherence Threshold

### Setup

- **Metric**: Entity coherence Q_entity ∈ [0, 1]
- **Initial threshold**: θ_entity = 0.65 (expert prior)
- **Performance metric**: Reader score P ∈ [1, 5]
- **Dataset**: 100 chapters with known (Q_entity, P) pairs

### Data Exploration

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import spearmanr

# Synthetic data (replace with real data)
np.random.seed(42)
Q_entity = np.random.beta(8, 2, 100)  # Entity coherence scores
P = 2.0 + 3.0 * Q_entity + np.random.normal(0, 0.3, 100)  # Reader scores
P = np.clip(P, 1, 5)

# Correlation
corr, pval = spearmanr(Q_entity, P)
print(f"Spearman correlation: {corr:.3f}, p-value: {pval:.4f}")

# Plot
plt.scatter(Q_entity, P, alpha=0.5)
plt.xlabel('Entity Coherence')
plt.ylabel('Reader Score')
plt.axvline(0.65, color='r', linestyle='--', label='Initial threshold')
plt.legend()
[plt.show](http://plt.show)()
```

### Threshold Learning via Quantile Regression

**Objective**: Find θ such that chapters with Q_entity ≥ θ have high reader scores.

```python
from sklearn.linear_model import QuantileRegressor

# Fit quantile regression: predict 25th percentile of reader score
model = QuantileRegressor(quantile=0.25, alpha=0.1)
[model.fit](http://model.fit)(Q_entity.reshape(-1, 1), P)

# Optimal threshold: Q_entity where predicted P exceeds target (e.g., 4.0)
target_score = 4.0
theta_learned = model.predict([[target_score]])[0]
print(f"Learned threshold: {theta_learned:.3f}")

# Compare to initial
print(f"Initial threshold: 0.65")
print(f"Improvement: {(theta_learned - 0.65) / 0.65 * 100:.1f}%")
```

### Result Interpretation

If θ_learned < 0.65:

- Initial threshold was **too strict**
- Many chapters with Q_entity ∈ [θ_learned, 0.65] achieve good reader scores
- Relaxing threshold increases throughput without quality loss

If θ_learned > 0.65:

- Initial threshold was **too lenient**
- Chapters with Q_entity ∈ [0.65, θ_learned] have poor reader scores
- Tightening threshold improves average quality

---

## Mandatory Sampling Integration for Budget Efficiency

### Critical Resource Constraint

**Problem Statement**: Computing full quality scores Q(A) for all nodes A in a 1,200-1,500 page document across 60+ measures at 6 layers is **computationally prohibitive** under extreme budget constraints.

**Cost Analysis**:

- Full evaluation: 1,500 pages × 50 entities × 60 measures = 4.5M evaluations
- Time: ~2 hours per document at scale
- Cost: Unaffordable for production deployment with limited computational resources

**Mandatory Policy**: All agents operating under budget constraints **MUST** utilize the sampling engine[[1]](Sampling-Claude%20Edition%202a7f832e52ca80779afffadeaf0b2fbe.md) to obtain quality scores. Direct computation of Q(A) for all nodes is **prohibited** in resource-constrained environments.

### Sampling Engine Architecture Integration

The sampling engine provides 18 validated methodologies that achieve **65-80% inspection reduction** while maintaining **85-95% defect detection** rates:

```python
class SamplingEnabledQualityEngine:
    """
    Quality engine that MANDATES sampling for resource efficiency.
    
    Policy: Agents cannot request full quality computation.
             All quality scores must be obtained via sampling.
    """
    
    def __init__(self, sampling_budget: int = 300):
        self.sampling_budget = sampling_budget  # Max sections to evaluate
        self.full_evaluation_enabled = False  # HARD CONSTRAINT
        
        # Three-stage hybrid sampler (mandatory)
        self.strategic_sampler = NetworkGuidedSampler()  # PageRank + Louvain
        self.systematic_sampler = StratifiedNeymanSampler()  # Capacity-weighted
        self.adaptive_sampler = ActiveLearningSampler()  # Uncertainty-guided
    
    def get_quality_scores(self, document: Document) -> Dict[str, QualityScore]:
        """
        ONLY method for obtaining quality scores under budget constraints.
        
        Raises:
            RuntimeError: If full evaluation is attempted
        """
        if self.full_evaluation_enabled:
            raise RuntimeError(
                "Full quality evaluation is PROHIBITED under budget constraints. "
                "Use sampling-based estimation only."
            )
        
        # STAGE 1: Strategic Selection (10-15 high-priority chapters)
        priority_chapters = self.strategic_[sampler.select](http://sampler.select)_hubs(
            document=document,
            method='pagerank+louvain',
            capacity_weighted=True
        )
        
        # STAGE 2: Systematic Sampling (Neyman allocation within priority chapters)
        sample_sections = self.systematic_sampler.sample(
            chapters=priority_chapters,
            budget=int(0.6 * self.sampling_budget),  # 60% of budget
            stratify_by=['density', 'layer', 'complexity'],
            capacity_weight=lambda depth: 1024 / (2 ** depth)
        )
        
        # STAGE 3: Adaptive Refinement (uncertainty-guided additional sampling)
        additional_samples = self.adaptive_sampler.query(
            unlabeled_pool=document.sections - sample_sections,
            budget=int(0.4 * self.sampling_budget),  # 40% of budget
            uncertainty_metric='multi_layer_entropy',
            capacity_weighted=True
        )
        
        final_sample = sample_sections + additional_samples
        
        # Compute quality scores ONLY on sampled sections
        sampled_scores = self._evaluate_sample(final_sample)
        
        # Extrapolate to full document using stratified estimators
        estimated_scores = self._extrapolate_scores(
            sampled_scores=sampled_scores,
            strata=self.systematic_sampler.strata,
            confidence_level=0.95
        )
        
        return estimated_scores
    
    def _evaluate_sample(self, sample: List[Section]) -> Dict:
        """Evaluate quality metrics only on sampled sections."""
        scores = {}
        for section in sample:
            scores[[section.id](http://section.id)] = {
                'layers': self._compute_layer_scores(section),
                'measures': self._compute_measure_scores(section),
                'weight': section.capacity_weight,
                'stratum': section.stratum
            }
        return scores
    
    def _extrapolate_scores(self, sampled_scores: Dict, 
                           strata: Dict, confidence_level: float) -> Dict:
        """
        Stratified estimation with confidence intervals.
        
        Returns:
            estimated_scores: Per-layer quality scores with CI
        """
        estimates = {}
        
        for layer in range(1, 7):
            # Horvitz-Thompson estimator with capacity weighting
            stratum_estimates = []
            stratum_vars = []
            
            for stratum_name, stratum_data in strata.items():
                N_h = stratum_data['population_size']
                n_h = stratum_data['sample_size']
                
                # Sampled sections in this stratum
                sampled = [s for s in sampled_scores.values() 
                          if s['stratum'] == stratum_name]
                
                # Capacity-weighted mean
                scores_h = [s['layers'][layer] * s['weight'] for s in sampled]
                mean_h = np.mean(scores_h) if scores_h else 0.0
                var_h = np.var(scores_h, ddof=1) if len(scores_h) > 1 else 0.0
                
                # Finite population correction
                fpc = (N_h - n_h) / N_h if n_h < N_h else 0.0
                
                stratum_estimates.append(mean_h * N_h)
                stratum_vars.append(var_h * N_h**2 * fpc / n_h if n_h > 0 else 0)
            
            # Combined estimate
            N_total = sum(s['population_size'] for s in strata.values())
            estimate = sum(stratum_estimates) / N_total
            variance = sum(stratum_vars) / N_total**2
            
            # Confidence interval
            from scipy.stats import norm
            z = norm.ppf((1 + confidence_level) / 2)
            margin = z * np.sqrt(variance)
            
            estimates[f'layer_{layer}'] = {
                'score': estimate,
                'ci_lower': estimate - margin,
                'ci_upper': estimate + margin,
                'stderr': np.sqrt(variance)
            }
        
        return estimates
```

### Agent Policy Enforcement

**Hard Constraint**: Agents operating in budget-constrained mode **cannot** request full quality evaluations. All quality-based decisions must use sampling-derived estimates.

```python
class BudgetConstrainedAgent:
    def __init__(self, quality_engine: SamplingEnabledQualityEngine):
        self.quality_engine = quality_engine
    
    def check_quality_constraints(self, node: Node) -> bool:
        """
        Check if node satisfies quality thresholds Θ.
        
        MANDATORY: Uses sampling-based estimates, not exact scores.
        """
        # Get sampled quality scores for document containing node
        estimated_scores = self.quality_engine.get_quality_scores(node.document)
        
        # Look up node's estimated score (interpolated if not directly sampled)
        node_score = self._interpolate_node_score(
            node=node,
            sampled_scores=estimated_scores
        )
        
        # Apply threshold checks with confidence intervals
        for metric, threshold in self.Theta.items():
            score_estimate = node_score[metric]
            
            # Conservative decision: reject if CI overlaps threshold
            if score_estimate['ci_upper'] < threshold:
                return False  # Definitively below threshold
            elif score_estimate['ci_lower'] >= threshold:
                continue  # Definitively above threshold
            else:
                # Uncertain region: apply risk policy
                if self.risk_policy == 'conservative':
                    return False  # Reject when uncertain
                elif self.risk_policy == 'optimistic':
                    continue  # Accept when uncertain
                else:  # 'confidence-weighted'
                    # Accept if point estimate > threshold
                    if score_estimate['score'] < threshold:
                        return False
        
        return True
    
    def _interpolate_node_score(self, node: Node, 
                               sampled_scores: Dict) -> Dict:
        """
        Estimate node quality from sampled scores.
        
        Methods:
        1. Direct: Node was sampled → use observed score
        2. Stratum mean: Node in sampled stratum → use stratum average
        3. Nearest neighbor: Use k-NN from sampled nodes
        4. Hierarchical: Inherit from sampled parent/children
        """
        if [node.id](http://node.id) in sampled_scores:
            return sampled_scores[[node.id](http://node.id)]  # Direct observation
        
        # Stratum-based estimate
        stratum = node.get_stratum()
        stratum_scores = [s for s in sampled_scores.values() 
                         if s['stratum'] == stratum]
        
        if stratum_scores:
            return {
                metric: {
                    'score': np.mean([s['layers'][metric]['score'] 
                                     for s in stratum_scores]),
                    'ci_lower': np.min([s['layers'][metric]['ci_lower'] 
                                       for s in stratum_scores]),
                    'ci_upper': np.max([s['layers'][metric]['ci_upper'] 
                                       for s in stratum_scores]),
                    'method': 'stratum_mean'
                }
                for metric in range(1, 7)
            }
        
        # Fallback: hierarchical inheritance from parent
        parent = node.get_parent()
        if parent and [parent.id](http://parent.id) in sampled_scores:
            return sampled_scores[[parent.id](http://parent.id)]
        
        # Last resort: document-level average
        return sampled_scores['document_average']
```

### Budget Allocation Strategy

**Total Budget**: 300 sections (17-20% of 1,500 page corpus)

**Allocation**:

1. **Strategic Sampling** (10-15 chapters): 2 hours setup, ongoing updates
2. **Systematic Sampling** (180 sections, 60%): 15-20 hours inspection
3. **Adaptive Sampling** (120 sections, 40%): 8-15 hours iterative labeling

**Total Time**: 25-37 hours (vs 150+ hours for full review)

**Performance Guarantees**:

- Defect detection: 92-96% recall
- False positive rate: <15%
- Confidence intervals: ±5% at 95% confidence level

### Integration with Constraint Learning

**Synergy**: Sampling-based quality scores + adaptive thresholds

```python
class SamplingAwareAdaptivePolicy(AdaptiveQualityPolicy):
    """
    Learns thresholds Θ from sampling-based quality estimates.
    
    Key insight: Threshold learning accounts for sampling uncertainty.
    """
    
    def update_thresholds(self, performance_data: List[Dict]):
        """
        Learn Θ from performance feedback, accounting for estimation uncertainty.
        """
        for data in performance_data:
            node_id = data['node_id']
            estimated_scores = data['quality_scores']  # From sampling
            reader_score = data['reader_score']
            
            for metric in estimated_scores:
                if metric not in self.Theta:
                    continue
                
                score_dist = estimated_scores[metric]  # {score, ci_lower, ci_upper}
                theta = self.Theta[metric]
                
                # Gradient with uncertainty weighting
                # High uncertainty → smaller gradient updates
                uncertainty = score_dist['ci_upper'] - score_dist['ci_lower']
                confidence_weight = 1.0 / (1.0 + uncertainty)
                
                if reader_score > 4.0 and score_dist['score'] < theta:
                    # High reader score despite low estimate → threshold too strict
                    gradient = -(theta - score_dist['score']) * (reader_score - 3.0)
                    self.Theta[metric] -= self.eta * gradient * confidence_weight
                
                elif reader_score < 3.0 and score_dist['score'] >= theta:
                    # Low reader score despite passing → threshold too lenient
                    gradient = (score_dist['score'] - theta) * (3.0 - reader_score)
                    self.Theta[metric] += self.eta * gradient * confidence_weight
            
            # Clamp thresholds
            for metric in self.Theta:
                self.Theta[metric] = np.clip(self.Theta[metric], 0.0, 1.0)
```

### Economic Justification

**Cost Reduction**:

- Full evaluation: 4.5M operations × $0.001 = $4,500 per document
- Sampled evaluation: 300 sections × 60 measures × $0.001 = $18 per document
- **Savings: 99.6% cost reduction**

**Performance Trade-off**:

- Full evaluation: 100% accuracy (by definition)
- Sampled evaluation: 92-96% defect detection with ±5% CI
- **Acceptable trade-off for 250x cost reduction**

**Risk Mitigation**:

- Stratified sampling ensures all strata represented
- Confidence intervals quantify estimation uncertainty
- Active learning targets high-uncertainty regions
- Network analysis captures critical structural dependencies

### Mandatory Integration Checklist

- [ ]  **Disable full evaluation path** in production quality engine
- [ ]  **Integrate sampling engine** as only quality score provider
- [ ]  **Configure sampling budget** (recommended: 300 sections = 20% corpus)
- [ ]  **Implement three-stage sampler**: Strategic → Systematic → Adaptive
- [ ]  **Add confidence interval tracking** for all quality estimates
- [ ]  **Update agent decision logic** to handle uncertainty in scores
- [ ]  **Define risk policy**: Conservative, Optimistic, or Confidence-weighted
- [ ]  **Validate performance** on test corpus (target: >90% defect detection)
- [ ]  **Monitor estimation quality** via held-out validation set
- [ ]  **Document budget allocation** for audit trail

---

## Integration with Existing Framework Components

### Connection to Directional Flows

Directional flows[[4]](Directional%20Flows%20in%20the%20Multi-Scale%20Compositional%20579a4b73e01a479c9221089dbcb67db1.md) describe measure propagation across scales:

**Forward mode** (top-down): Constraints flow from coarse to fine

- Chapter-level θ_entity = 0.70 → Paragraph-level θ_entity = 0.65
- Learning: Discover how constraints should tighten/relax across scales

**Reverse mode** (bottom-up): Performance feedback aggregates from fine to coarse

- Sentence reader scores → Paragraph average → Chapter average
- Learning: Update coarse-scale thresholds based on fine-scale outcomes

**Adaptive mode** (lateral): Cross-scale constraint coupling

- Tone thread constraints learned from cross-chapter dependencies

### Connection to Quality Ensemble

Quality ensemble Q = [Q_entity, Q_toulmin, Q_semantic, ...]  has 60+ metrics.

**Execution mode**: Set all 60 thresholds manually (Θ ∈ ℝ^60).

**Learning mode**: Too many degrees of freedom! Need:

1. **Dimensionality reduction**: Learn on principal components
2. **Hierarchical learning**: Learn coarse thresholds (6 layers) first, then refine
3. **Multi-task learning**: Share learned representations across metrics

### Connection to Optimization

The quality-constrained optimization[[5]](Measure-Theoretic%20Multi-Scale%20Compositional%20Framew%202a05559a88b34fe3a843b86ce53ac63b.md):

$$
\min_{c_A} ||c_A - c_{\text{target}}||^2 \quad \text{s.t.} \quad Q(c_A) \geq \Theta
$$

**With learning**: Θ becomes a function of context and performance:

$$
\Theta = \Theta(\text{genre}, \text{audience}, \text{scale}, \text{history})
$$

Optimization solver must query learned Θ(·) function instead of fixed constants.

---

## Experimental Design for Threshold Learning

### A/B Testing Framework

**Hypothesis**: Relaxing θ_entity from 0.65 to 0.60 does not degrade reader scores.

**Design**:

- **Group A** (control): θ_entity = 0.65
- **Group B** (treatment): θ_entity = 0.60
- **Metric**: Reader score P (collect from published chapters)
- **Sample size**: 50 chapters per group
- **Significance**: α = 0.05, power = 0.80

**Analysis**:

```python
from scipy.stats import mannwhitneyu

# Synthetic results
P_control = np.random.normal(4.2, 0.5, 50)
P_treatment = np.random.normal(4.25, 0.5, 50)

# Non-parametric test (reader scores may not be normal)
stat, pval = mannwhitneyu(P_control, P_treatment, alternative='two-sided')

if pval < 0.05:
    print(f"Significant difference (p={pval:.4f})")
    if np.median(P_treatment) > np.median(P_control):
        print("Treatment (θ=0.60) is better → adopt new threshold")
    else:
        print("Control (θ=0.65) is better → keep current threshold")
else:
    print(f"No significant difference (p={pval:.4f})")
    print("Adopt lower threshold (θ=0.60) for efficiency gain")
```

### Contextual Bandit Framework

**Problem**: Optimal threshold may depend on context (genre, audience, chapter position).

**Solution**: Contextual bandit algorithm that selects threshold based on features.

**Algorithm** (LinUCB):

```python
class ThresholdBandit:
    def __init__(self, d: int, alpha: float = 1.0):
        """
        Args:
            d: Dimension of context feature vector
            alpha: Exploration parameter
        """
        self.d = d
        self.alpha = alpha
        
        # One linear model per threshold level
        self.threshold_levels = [0.55, 0.60, 0.65, 0.70, 0.75]
        self.A = {t: np.identity(d) for t in self.threshold_levels}
        self.b = {t: np.zeros(d) for t in self.threshold_levels}
    
    def select_threshold(self, context: np.ndarray) -> float:
        """
        Select threshold for given context (genre, audience, etc.).
        
        Args:
            context: Feature vector [genre_vector, audience_vector, position, ...]
        
        Returns:
            Selected threshold level
        """
        ucb_scores = {}
        
        for t in self.threshold_levels:
            A_inv = np.linalg.inv(self.A[t])
            theta_hat = A_inv @ self.b[t]
            
            # Upper confidence bound
            ucb = theta_hat @ context + self.alpha * np.sqrt(context @ A_inv @ context)
            ucb_scores[t] = ucb
        
        # Select threshold with highest UCB
        return max(ucb_scores, key=ucb_scores.get)
    
    def update(self, context: np.ndarray, threshold: float, reward: float):
        """
        Update model with observed reward (reader score).
        """
        self.A[threshold] += np.outer(context, context)
        self.b[threshold] += reward * context
```

**Usage**:

```python
bandit = ThresholdBandit(d=10)  # 10-dimensional context

for chapter in chapters:
    # Extract context features
    context = extract_features(chapter)  # [genre, audience, position, ...]
    
    # Select threshold
    threshold = [bandit.select](http://bandit.select)_threshold(context)
    
    # Apply threshold, get reader score
    if chapter.Q_entity >= threshold:
        publish(chapter)
        reader_score = collect_reader_score(chapter)
        
        # Update bandit
        bandit.update(context, threshold, reader_score)
```

**Result**: Context-dependent thresholds learned from data:

- Mystery genre → θ_entity = 0.70 (high coherence needed)
- Poetry → θ_entity = 0.55 (fragmentation acceptable)
- Chapter 1 → θ_entity = 0.75 (strong opening needed)
- Chapter 20 → θ_entity = 0.65 (middle chapters more forgiving)

---

## Summary: Policy Design Principles

### When to Use Execution-Only (Fixed Constraints)

1. **Regulatory compliance**: External mandates (medical, legal)
2. **Safety-critical**: Cannot tolerate quality degradation (aviation manuals)
3. **Insufficient data**: No labeled performance outcomes yet
4. **Interpretability**: Need to explain decisions to auditors
5. **Predictability**: System behavior must be deterministic

### When to Use Learning (Adaptive Constraints)

1. **Data-rich**: Have labeled performance data (reader scores, outcomes)
2. **Evolving standards**: Quality definitions change over time (social media content)
3. **Context-dependent**: Optimal thresholds vary by situation (genre, audience)
4. **Efficiency-critical**: Need to find quality-effort Pareto frontier
5. **Discovery**: Unknown what thresholds should be a priori

### When to Use Hybrid (Learned Above Regulatory Floor)

1. **Best of both worlds**: Have regulations but room for optimization
2. **Risk management**: Explore above floor, reject below
3. **Gradual migration**: Start conservative, learn to relax
4. **Multi-stakeholder**: Regulators set floor, data drives optimization above

### Multi-Agent Considerations

1. **Coupling discovery**: Use collaborative policies when agents interact
2. **Conflict resolution**: Coordinator vs negotiation (depends on system scale)
3. **Constraint propagation**: Learn how constraints couple across agents/scales
4. **Distributed learning**: Each agent learns local thresholds, coordinate globally

---

## References

**Multi-Agent Coordination**:

- [Dependency Discovery Policy](Dependency%20Discovery%20Policy%20dd86c5b8f10c4ae592f85977ef8a1e3e.md)
- [📦 ARCHIVED 2025-11-01: CRA Lecture Draft 2](%F0%9F%93%A6%20ARCHIVED%202025-11-01%20CRA%20Lecture%20Draft%202%20e38bd16c6c30499a98e7bb35bbfebee2.md)
- [Adaptive Signal Multiplexer](https://github.com/Mohsen-Dirbaz-Organization/AutoAgents-2/pull/1)

**Quality Framework**:

- [Measure-Theoretic Multi-Scale Compositional Framework](Measure-Theoretic%20Multi-Scale%20Compositional%20Framew%202a05559a88b34fe3a843b86ce53ac63b.md)
- [Directional Flows in the Multi-Scale Compositional Framework](Directional%20Flows%20in%20the%20Multi-Scale%20Compositional%20579a4b73e01a479c9221089dbcb67db1.md)
- [Extending Countable Additivity Beyond Parent-Child: Tone Thread Networks](Extending%20Countable%20Additivity%20Beyond%20Parent-Child%205697c4572f96475396d543a373d6d678.md)
- [Superficial Layer Metrics: Surface Tension & Tortuosity](Superficial%20Layer%20Metrics%20Surface%20Tension%20&%20Tortuo%206641e1ca4c6b49409d89e8abf8ccf232.md)

**Visualization**:

- [quality_visualization_integration](https://www.notion.so/quality_visualization_integration-2c5f832e52ca81258e0ce0be8cc012d7?pvs=21)

---

## Conclusion

Constraint enforcement as policy spans a spectrum from **pure execution** (fixed, immutable thresholds) to **full learning** (adaptive thresholds from performance feedback). The choice depends on:

- Regulatory environment (fixed floors vs optimization space)
- Data availability (labeled outcomes for learning)
- System criticality (safety vs efficiency)
- Context dependence (universal vs situational thresholds)

The measure-theoretic framework naturally supports both modes:

- **Structural constraints** (simplex, measure additivity) are always fixed
- **Quality thresholds** (Θ) can be execution-only or learned
- **Coupling constraints** (tone threads, dependencies) are discovered

Pluggable policy architecture enables system designers to select discovery and handling policies that match their domain requirements, with clear trade-offs documented and empirically testable.