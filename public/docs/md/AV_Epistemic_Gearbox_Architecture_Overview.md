# Steerable Computation for Collision Avoidance
### An autonomous-vehicle actuation architecture steered by an epistemic-multiplex route-selector

**System-architecture overview · v0.1**

---

## Abstract

Every collision-avoidance episode is a *novel optimization instance*: a highway merge, a four-way stop, an unprotected left, and an emergency evasive on ice are different problems, not one problem at different operating points. A monolithic planner that solves a single fixed optimization either over-constrains the easy cases or under-constrains the hard ones. This document specifies a **steerable computation engine** that selects *which problem to pose* before posing it. The selector — the navigational knob — is a **generalized discrete selection over 325 ordered "framework routes"** built from five philosophy-of-mathematics stances {P, F, S, I, E}, governed by a **conditional probability assessed multilinearly over a nested multiplex** of three descriptive subspaces. The selected route configures the entire proposer chain through to the **actuation module**, while a non-negotiable safety boundary bounds what any gear is permitted to command.

The architecture is presented as an integrated whole across the canonical autonomous-vehicle modules — perception, fusion, localization, prediction, formulation, planning, actuation — aligned to an 8-step manifold navigation pipeline on a shared mathematical-foundations substrate. Per the agreed scope, the *form* of the selection is specified precisely; the *fuzzy gear-engagement boundaries* are deliberately left uncalibrated and handled structurally (admissibility + hysteresis) rather than by hard thresholds.

---

## 1. Premise: actuation is downstream of a formulation choice

The dominant failure mode of autonomous-driving stacks is treating planning and control as fixed programs. The Archipelago doctrine reframes the task: *most of the difficulty is posing the problem, not solving it.* We therefore insert a **problem-formulation selector** between the trusted scene and the planner. Each control cycle it emits a well-posed specification `𝒫 = ⟨J, 𝒞, ℱ, σ, τ⟩` — objective, constraint set, model class, solver, time budget — which the planner solves and the safety boundary verifies.

The selector's degree of freedom is an **epistemic stance ordering**: a ranking of *what the computation should treat as authoritative for this instant*. The five stances and their load-bearing meaning:

| Code | School | Ontology (what objects are) | Epistemic basis (how justified) | Rank meaning in context |
|------|--------|-----------------------------|---------------------------------|-------------------------|
| **P** | Platonic | mathematical objects are real | objects grasped as such | **objectivity** — mathematical reality / objecthood |
| **F** | Formalism | symbols in a formal system | derivation and proof | **proof** — symbolic derivation, certificate control |
| **S** | Structuralist | positions in a structure | invariant relations | **structure** — invariant relations |
| **I** | Instrumentalism | useful fictions | predictive/practical success | **use** — practical model success |
| **E** | Empiricism | abstractions from measurement | observation and computation | **observation** — measurement, empirical regularity |

A **gear** is an ordered selection of these without repetition, leftmost strongest, ranks weakening rightward (e.g., `E → F → P → S → I`). This is precisely the combinatorial object enumerated in the brief: 5 + 20 + 60 + 120 + 120 = **325 ordered routes**.

---

## 2. The integrated stack

The autonomous-vehicle modules and the 8-step manifold navigation pipeline are two views of one system. The selector sits at the formulation step; the actuation module is its terminal consumer; the EPU substrate stages S₀…S₄ bound the whole.

| AV module | Pipeline step | Primary skill / owner | EPU stage | Budget |
|-----------|---------------|-----------------------|-----------|--------|
| Perception (vision) | ① raw → scene | AD-PERC | — (proposer) | 1–10 ms |
| Radar / Doppler | ① raw → range-rate | AD-RDR | — (proposer) | 1–10 ms |
| **Sensor fusion** | ② trusted substrate | **AD-FUSE** | **S₀** | — |
| Tuple inference | ② encode | MA-COMB-001 (lattice) | S₀ | < 2 ms |
| Localization / embedding | ③ pose on `M` | AD-LOC + MA-GEO-001/002 | — | < 3 ms |
| ROM + conservation | ④ next-state | ST-ROM + MA-GEO-003 | — | < 5 ms |
| Phase identification | ⑤ safe/transition/hazard | MA-TOP-001/002 | — | < 2 ms |
| Prediction | → bounded futures | AD-PRED | — | — |
| **Formulation (selector)** | → pose the problem | **AD-FORM (this engine)** | — | — |
| Planning | ⑥ trajectory | AD-PLAN | — | < 10 ms |
| Safety verification | ⑦ filter | riemannian-cbf-integrator | S₃ | < 10 ms |
| **Actuation** | ⑧ command | **AD-CTRL** | **S₃ → S₄** | inner loop |

*Of the EPU substrate stages, only S₀ (the fusion/trusted-substrate gate), S₃ (the risk-monotone actuation algebra) and S₄ (the non-programmable terminal guard) are fixed by the source skills; the intermediate rows are the substrate between them. Latencies are per the 8-step pipeline budgets and sum to roughly a 30–40 ms sense→actuate path.*

**Dataflow.** Cameras, radar, LiDAR, ultrasonic and IMU feed the proposer-side sensing modules. **AD-FUSE (S₀)** is the *trusted-substrate gate*: it fuses conservatively (covariance intersection — never reporting less uncertainty than is justified), preserves provenance, and rejects inadmissible inputs. Everything downstream may believe only what S₀ certifies. The trusted scene is embedded as a point `x(t)` on the **4–6D Riemannian navigation manifold `M`** (never a Euclidean embedding); a reduced-order model advances it under a live conservation certificate; topological data analysis labels the local phase (safe / transition / hazard) and proximity to bifurcations. Prediction bounds what other agents may do. These feed the **selector**, which emits `𝒫`; the planner returns a trajectory; the Riemannian-CBF filter and the actuation inner loop turn it into a friction-feasible command; and **S₃/S₄** bound what is actually delivered to the vehicle. A **mathematical-foundations substrate** (combinatorics, geometry, topology, Riemannian-CBF) underlies every layer.

---

## 3. The five stances as control priorities

The gearbox is meaningful only because each stance maps to a concrete, distinct posture of the planning-and-control computation. The *ordering* sets the lexicographic priority among these postures for the instant.

| Stance | What the controller treats as authoritative | Concrete locus in the stack |
|--------|----------------------------------------------|-----------------------------|
| **P** Platonic | the geometric objects are *real ground truth* | trust the manifold `M`, the reachable set, the friction circle as actual physical boundaries; plan on the geometry |
| **F** Formalism | act only inside what is *provably* safe | certificate-first: Riemannian-CBF forward-invariance proof, conservation certificate, commuting-diagram pipeline correctness, the S₃ algebra |
| **S** Structuralist | preserve *invariant relations* | conservation laws, symmetry-reduced coordinates, stability structure, the lateral↔longitudinal authority ordering in the friction circle |
| **I** Instrumentalism | use whatever *model works and is fast* | kinematic-vs-dynamic bicycle choice, the empirically-best ROM, performance-tuned feedforward |
| **E** Empiricism | trust *live measurement* over prior | measured μ (road friction), slip β, tracking error, radar range-rate; downweight model priors |

The point of *ordering* rather than weighting alone: under hard real-time budgets and a contracting safety box, priorities must resolve **lexically** when they conflict. A gear led by `E` resolves a model-vs-measurement disagreement in favor of measurement; a gear led by `F` refuses any command lacking a current certificate, even a comfortable one.

---

## 4. The route space and the nested multiplex

**Route space.** The 325 routes form a length-graded space `R₁ ⊂ R₂ ⊂ R₃ ⊂ R₄ ⊂ R₅`, nested by **prefix**: a length-`k` route extends a length-`(k-1)` route by appending one not-yet-used stance. A short route is a *committed core* (the dominant priorities only); a longer route *refines the tail*. The leftmost-strongest convention is exactly a descent of this nesting — commit the dominant stance first, extend only as the scene demands finer discrimination. (Combinatorially this is the rooted route tree; algebraically it is a graded poset amenable to lattice/Möbius accounting and symmetry reduction, per MA-COMB-001 and MA-GEO-002.)

**Multiplex.** The brief's three descriptive variables become three **layers** over the *same* node set `V = {P, F, S, I, E}`:

- **L₁ ontological** — what the objects are taken to be;
- **L₂ epistemic** — how knowledge is justified;
- **L₃ applicability** — how it relates to practice, structure, and measurement.

Each layer carries its own intra-layer affinity among the five stances; the layers are **connected** by inter-layer coupling of the shared nodes. Same nodes, multiple coupled layers = a **multiplex**. It is **nested** in two senses simultaneously: the *route space* is nested by prefix (above), and the *layers* are hierarchically nested by abstraction (ontology ⊃ epistemology ⊃ practice). Selection descends both nestings together.

This is the "multi-linear connected subspaces — a nested multiplex space" of the brief, made precise.

---

## 5. The selection law

This is the core mechanism: a **generalized discrete selection of a framework route, by conditional probability, assessed multilinearly over the nested multiplex.**

**(a) Scene → layer demands.** The trusted scene `𝒮` (S₀ output, phase label, bounded prediction, ego state on `M`) produces a per-layer *demand vector* over the five stances:

```
bᵒⁿᵗ, bᵉᵖⁱ, bᵃᵖᵖ  ∈  ℝ⁵≥0
```

`bᵉᵖⁱ` rises on `E` when the nominal model has just failed (e.g., a low-μ surprise) and on `F` when a certificate must bind; `bᵃᵖᵖ` falls on `I` when instrumental model success is no longer credible; and so on. The demands live on the curved scene context, so they are read with the manifold metric (a natural-gradient read), not a flat dot product.

**(b) Multilinear contraction.** A stance-salience field `φ ∈ ℝ⁵` is a **trilinear** read of the multiplex: for each stance `s`, take its slice `𝒲_s ∈ ℝ⁵ˣ⁵` of an inter-layer coupling tensor `𝒲 ∈ ℝ⁵ˣ⁵ˣ⁵`, couple the epistemic and applicability demands through it, and gate by the ontological demand:

```
φ_s(𝒮) = bᵒⁿᵗ_s · (bᵉᵖⁱ)ᵀ 𝒲_s bᵃᵖᵖ ,   s ∈ {P, F, S, I, E}
```

This is genuinely trilinear in `(bᵒⁿᵗ, bᵉᵖⁱ, bᵃᵖᵖ)`, leaves the stance index free (so the output is a salience *per stance*, not a scalar), and uses all three connected subspaces jointly rather than scoring layers independently. `𝒲` encodes which stances reinforce across layers — the multiplex coupling.

**(c) Route score.** An ordered route `r = (s₁, …, s_k)` is scored with rank weights `w₁ > w₂ > … > w_k` (leftmost strongest) plus a sequential-coherence term `T` (some orderings are internally coherent, e.g., `P` then `F`; others are not):

```
Φ(r | 𝒮) = Σᵢ wᵢ · φ_sᵢ(𝒮)  +  λ Σᵢ T(sᵢ, sᵢ₊₁)  −  γ·len(r)
```

**(d) Conditional probability and discrete selection.** Over the *admissible* routes, a Gibbs/softmax conditional distribution and its argmax:

```
P(r | 𝒮)  ∝  𝟙[ r ∈ R_adm(𝒮) ] · exp( β · Φ(r | 𝒮) )
r*(𝒮)     =  argmax_r  P(r | 𝒮)          (or a sample, for deliberate exploration)
```

"Generalized" covers both the MAP gear and the stochastic (Boltzmann/Thompson) reading, and the *variable route length* — selection ranges over the entire nested space `R₁…R₅`.

**(e) Admissibility (`R_adm`).** Not every gear is compatible with every scene. The categorical-architecture layer (MA-COMB-002) rules out routes whose `(Equation-class · Sensor-regime · Control-regime)` *Trichotomy triple* has no valid morphism — an incompatible triple is excluded *a priori* (probability zero), so the distribution never spends mass on a gear that cannot be realized. This is where domain knowledge enters as hard structure rather than tuning.

**(f) Selection as symmetry breaking.** With no scene information the demand vectors are flat, `Φ` is near-degenerate, and `P(r)` is diffuse over the residual-symmetric set — a *metastable, indecisive* configuration. The scene demands are the **symmetry-breaking field**; the inverse temperature `β` is the **control parameter**. Below a critical `β_c` the distribution stays diffuse (deliberately undecided); at/above `β_c` it **collapses onto a committed gear** `r*` — the broken ground state. An **order parameter** `η ∈ [0,1]` measures commitment (0 symmetric, 1 committed). Residual symmetry (the unbroken tail of the route) is kept as soft modes for adaptation.

**(g) Fuzzy boundaries, by design.** We do **not** pin the exact scene→demand thresholds or the phase boundaries at which gears switch. They are deliberately uncalibrated. Two structural mechanisms make this safe without them: **admissibility** removes impossible gears regardless of threshold values, and **hysteresis** — a Schmitt-trigger / dwell on `η` — prevents gear *chatter* near a boundary even when the boundary itself is fuzzy. Calibration of the boundaries is a later step, owned by the phase-mapper (MA-TOP-001) and bifurcation analyst (MA-TOP-002), and is out of scope here.

---

## 6. The actuation module under a selected gear

The actuation inner loop (AD-CTRL) is the route's terminal consumer. Its base workflow is fixed: select a vehicle model matched to the regime; compute a feedforward-plus-feedback tracking command for the planned trajectory; **project the requested tire forces onto the friction circle** (`κ = √(Fₓ² + Fᵧ²)/(μ F_z) ≤ 1`, with margin); allocate across actuators within their rate limits; and emit toward the safety boundary. What the **selected gear `r*` changes** is the *priority discipline* inside that loop:

- **Model regime (I vs P/E).** An `I`-led gear runs the fast instrumental model (kinematic bicycle when adequate); a `P`-led gear insists on the physically faithful dynamic model and the true friction circle; an `E`-led gear re-estimates μ and slip from live measurement before trusting any model.
- **Friction-circle priority axis (S).** When lateral and longitudinal demands jointly exceed the circle, an `S`-led gear preserves the *structural* authority ordering (e.g., steering authority over throttle in avoidance; braking authority in a straight-line stop), holding the invariant relation even as the values saturate.
- **Certificate gating (F).** An `F`-led gear refuses any command outside the provably forward-invariant Riemannian-CBF envelope, accepting a less comfortable but certified command; the certificate, not the objective, has the casting vote.
- **Measurement trust (E).** An `E`-led gear weights the measured tracking error, slip, and range-rate above the model prediction — the correct posture exactly when the model has just been surprised.

**Illustrative gear engagements** (illustrative only — *not* calibrated thresholds):

| Episode | Illustrative gear | Reading |
|---------|-------------------|---------|
| Nominal highway cruise | `I → S → E → P → F` | use the fast model, hold structure, track measurement; geometry and proof in reserve — smooth and efficient |
| Emergency evasive on ice (low-μ surprise) | `E → F → P → S → I` | measurement first (the model just failed), bind the CBF certificate, treat the contracting reachable set as real, preserve stability structure, trust the instrumental model least |
| Unprotected left, multi-modal traffic | `F → S → P → E → I` | worst-case certificate and interaction structure lead; geometry and live observation refine; instrumental optimism last |

These show the *form* of how a gear reorders the actuation priorities; the brief's instruction to leave the engagement boundaries fuzzy is respected — none of these is a committed switching rule.

---

## 7. The central safety invariant

> **The gearbox ranks the admissible set; it never enlarges it.**

This is the architecture's non-negotiable. The epistemic route is a *preference selector over safe options*. It can change which certified, friction-feasible command is preferred; it cannot authorize a command the safety boundary forbids. Concretely: regardless of `r*`, every command still passes **S₃**, the risk-monotone actuation algebra whose admissible-command box `𝒰(ρ)` is *antitone in risk* (it contracts as risk rises, composed by MEET so the binding limit is always the most conservative active one), and then **S₄**, the non-programmable terminal guard that can force the minimum-risk envelope. The selector lives entirely on the proposer side of this boundary. This mirrors the discipline at every layer: fusion may only *lower* authority (S₀ meet-only), the objective ranks but never enlarges the feasible set (AD-FORM), and control proposes within contracting authority (AD-CTRL). Steerability is bought without ever renting out the safety guarantee.

---

## 8. Scope and open calibration

Specified here (the *form*): the route space and its nesting; the three-layer multiplex and its coupling tensor; the multilinear conditional-probability selection and its admissibility carve-out; selection-as-symmetry-breaking with hysteresis; the stance→control-priority mapping; and the safety invariant.

Deliberately deferred (the *fuzzy boundaries*, per the agreed steer): the numerical scene→demand maps `bˡ(𝒮)`; the coupling tensor `𝒲`, coherence matrix `T`, and weights `w, λ, γ, β`; and the phase boundaries at which gears engage. These are calibration objects, to be fit later from trajectory data by the phase-mapper and bifurcation analyst and verified against the safety boundary. None of them is required to state the architecture, and none can relax the S₃/S₄ guarantee.

---

### Provenance

This overview integrates the connected stack skills: AD-FUSE (S₀ trusted substrate), AD-PERC / AD-RDR (sensing), AD-LOC (localization on `M`), AD-PRED (bounded prediction), AD-FORM (problem-formulation dispatcher — host of this selector), AD-PLAN (planning), AD-CTRL (actuation, S₃/S₄); the mathematical foundations MA-COMB-001 (route lattice / cardinality), MA-COMB-002 (Trichotomy admissibility), MA-GEO-001/002/003 (manifold metric, symmetry reduction, conservation), MA-TOP-001/002 (phase map, bifurcation boundaries); the riemannian-cbf-integrator (S₃ safety verification); the manifold-navigation-stack (8-step pipeline); and the spontaneous-symmetry-breaking doctrine (selection as a committed broken ground state).
