# The Metabolic Memory Architecture

## A Residence-Time-Stratified Learning Policy for Provably Bounded Autonomous Driving

---

## 0. Reading Note

This document promotes the four-part sketch — temporal half-lives, optimization-triggered retrieval, enforced-causality fidelity, and the immune-system synthesis — into a complete subsystem specification, and binds it to the two governing bodies of prior work in the program: the **architecture of refusal** (the unbroken constraint-propagation chain that terminates in an analog veto) and the **L2–L5 capability constitution** (the four authority regimes built on one shared primitive substrate). The thesis is that memory is not a service the autonomy stack calls; it is a *metabolic organ* of the stack, and like every other organ in this architecture it must be governed, budgeted, and bounded rather than merely sized.

---

## 1. Executive Thesis

The conventional autonomy data plane treats memory as storage: capture everything, index it, and retrieve on demand under a soft latency target. That assumption — *infinite data, free recall* — is the data-plane analogue of the statistical-safety fallacy the program already rejects on the control side. Just as the architecture of refusal abandons "the statistically impossible goal of creating a perception and planning stack that never errs" in favor of structurally bounding what an error *can do*, the memory subsystem must abandon the goal of remembering everything in favor of structurally bounding what the system is *allowed to learn from* and *when it is allowed to forget*.

The reframing is therefore exact:

> **The autonomous vehicle does not store and retrieve. It metabolizes. Data is admitted, held, or evicted according to temporal half-lives; the decision to retrieve a datum is mathematically inseparable from the cost of processing it; and fidelity is redefined from accuracy of representation to enforcement of safe causal structure.**

Three consequences follow, and they are the spine of this specification.

First, the data plane is **stratified by residence time**, not by data type. A LiDAR return, a tracked agent, and a map prior are not classified by what they are but by how long they remain action-relevant — milliseconds, seconds, or days. Each stratum carries its own definition of a "valid" signal, because validity at $100\ \text{ms}$ (does it violate kinematics?) is a different predicate than validity at five days (do independent modalities agree?).

Second, **retrieval is an optimization act under a fixed budget.** Querying memory is never free and never arbitrary; it is a resource-constrained pull request emitted by the learning gradient and gated by a shadow price. This is the same discipline the cognition allocator (Main Brain / Tailored Brain / Gate) already imposes on *compute* — spend the expensive resource only when the expected regret of not spending it exceeds the cost — applied now to *recall*.

Third, **fidelity is enforced causality.** The metabolic subsystem does not prize a pixel-perfect world model. It prizes data that reinforces safe state transitions, and it will deliberately discard high-accuracy detail (the exact texture of the ball) to preserve a rigid causal link (low-trajectory object $\rightarrow$ arm the braking manifold). This is the data-plane mirror of the risk-monotone actuation algebra: as warrant for benign interpretation falls, the admissible interpretation set only ever contracts.

Taken together these produce a learning policy that behaves less like a database and more like an **artificial immune system**: aggressive, cheap filtering at the fast scale; selective consolidation at the mid scale; and rare, heavily-gated structural rewriting of the system's own weights at the slow scale.

---

## 2. Design Principle

The subsystem rests on one rule, stated to parallel the roadmap's governing rule ("share primitives across levels, but do not confuse shared substrate with shared authority law"):

> **Share one eviction-and-retrieval calculus across all time scales, but do not confuse a longer residence time with a weaker safety predicate. Slower memory is not safer memory; it is memory whose errors are more expensive and therefore more heavily verified.**

This rule has teeth because of an inversion that distinguishes this architecture from ordinary caching hierarchies. In a cache, the fast tier is the trusted, authoritative copy and the slow tiers are derived. Here the relationship is reversed in *authority over the vehicle's future behavior*: the reflexive tier governs only the next actuator command and is overwritten instantly, whereas the strategic tier can rewrite the network weights that govern *every* future drive. The blast radius of a corrupt datum therefore *grows* with residence time. Consequently the verification burden, the provenance requirement, and the anti-silent-drift governance must all **strengthen monotonically with $\tau$** — precisely the inverse of how conventional systems treat their slow, "archival" storage.

---

## 3. The Temporal-Hierarchical Partitions

The data plane is divided into three partitions indexed by the residence-time bound $\tau$. Each partition is paired with the layer of the control stack it serves and the layer of the refusal chain that verifies it.

| Partition | Time bound $\tau$ | Verification predicate | Residence strategy | Control-stack peer | Refusal-chain verifier |
|---|---|---|---|---|---|
| **Reflexive** | $\tau < 100\ \text{ms}$ | **Physical admissibility** — does the datum violate kinematics or actuator limits? | Ring buffers; overwritten immediately unless pulled by the optimizer | Deterministic safety reflex / EPU | Analog guard + risk-monotone clamp |
| **Tactical** | $100\ \text{ms} \le \tau < 5\ \text{s}$ | **Trajectory consensus** — does it agree with predictive models of surrounding agents? | Short-term key-value store; retained only while the tracked object remains in the ODD | Steward + routine maneuver policy | Monosemantic SAE gate on the policy |
| **Strategic** | $\tau \ge 5\ \text{s}$ | **Cross-modality confirmation** — do independent subsystems (map priors + aggregate sensing) agree? | Persistent graph; feeds off-board / low-priority weight updates | Mission layer + off-board training substrate | Proposer / verifier / adjudicator + LLC drift monitor |

### 3.1 Reflexive partition ($\tau < 100\ \text{ms}$)

The reflexive partition exists to feed the fastest, non-negotiable layer of the control stack. Its verification predicate is purely physical: a candidate datum is admissible only if it is consistent with kinematics, actuator sanity, and the current friction envelope. This is the data-plane face of the deterministic safety reflex and the analog veto. Residence is implemented as **ring buffers**: a sample that the optimizer does not pull within the window is overwritten without ceremony, because at this scale the cost of holding a stale sample exceeds any conceivable learning value it could carry. The numerical substrate here is non-negotiable — every scalar that gates actuation must be computed in a format whose rounding error is bounded on the conservative side (see §7), so that a reflexive datum can only ever cause the vehicle to *over*-estimate risk.

This partition is also the natural home for the instantaneous ego-state observables described in the program's acoustic-continuum work (Document D1): the microsecond-level slip-angle and true-ground-speed vector recovered by inverting the convective Doppler relation
$$f_{\text{received}} = f_{\text{transmitted}}\!\left(\frac{c_s + \bm{w}\cdot\hat{n} - \bm{v}_r\cdot\hat{n}}{c_s + \bm{w}\cdot\hat{n} - \bm{v}_t\cdot\hat{n}}\right)$$
is exactly a reflexive-tier signal: it is action-relevant for tens of milliseconds, it is verified against physical limits, and it is overwritten as soon as the control loop has consumed it. Its value is feed-forward disturbance rejection, not memory.

### 3.2 Tactical partition ($100\ \text{ms} \le \tau < 5\ \text{s}$)

The tactical partition serves the steward and the routine-maneuver policy. Its verification predicate is **trajectory consensus**: a datum is retained only insofar as it coheres with the forward-simulated trajectories of the dynamic agents the vehicle is tracking. This binds the partition directly to the symplectic prediction machinery: tactical entries are the cached forward rollouts of surrounding agents, and because those rollouts are produced by structure-preserving integrators whose energy error is bounded rather than drifting, a tactical datum cannot quietly accumulate the unphysical "teleportation" artifacts that would let a phantom agent appear to gain kinetic energy across the horizon. Residence is a **short-term key-value store** keyed by tracked-object identity; an entry's lease is the object's tenure inside the operational design domain. When the object exits the ODD, its tactical record is evicted — the data-plane realization of ODD-exit detection.

### 3.3 Strategic partition ($\tau \ge 5\ \text{s}$)

The strategic partition is the only tier that can alter the vehicle's fundamental weights, and it is therefore the most heavily governed. Its verification predicate is **cross-modality confirmation**: a candidate may persist only if independent subsystems — historical map priors, aggregate sensor statistics, and the slowly-varying environmental state — agree. This is where Document D1's *micro-weather* products belong: the comparison of wind-immune radar range against convective acoustic time-of-flight, which yields local air-mass temperature ($c_s \propto \sqrt{T}$) and a pre-visual warning of black-ice formation, is a slow, cross-modal, persistent inference, not a reflex. Residence is a **persistent graph structure** consumed by the off-board training substrate. Because residence here is effectively unbounded, the fixed budget is applied to *offline* processing, and the governance overlay (§6) is at its strongest: every structural update is a challengeable event.

---

## 4. The Intertwined Retrieval–Optimization Scheme

Retrieval is not a database primitive in this architecture; it is the solution to a constrained optimization problem, re-solved continuously, under a fixed budget per partition. This is the formal content of the claim that *the trigger to retrieve cannot be separated from the optimization scheme*.

For partition $k$, let $B_k$ be the fixed compute/bandwidth budget, $x_i \in \{0,1\}$ the decision to retrieve datum $d_i$, $C(d_i)$ its processing cost, and $\Delta J(d_i)$ the expected marginal improvement it offers the learning objective (i.e. the projection of $d_i$ onto the optimization gradient). The retrieval set is the solution of a 0–1 knapsack:
$$\max_{x}\ \sum_i \Delta J(d_i)\,x_i \qquad \text{subject to}\qquad \sum_i C(d_i)\,x_i \le B_k.$$

Because the policy runs in real time, the global problem is never solved exactly. Instead the trigger is governed by the **shadow price** of the budget constraint — the Lagrange multiplier $\lambda_k$ — yielding a purely local admission test:
$$\frac{\Delta J(d_i)}{C(d_i)} \ \ge\ \lambda_k.$$

A datum is retrieved if and only if its optimization value per unit cost clears the partition's shadow price. A datum that never clears the bar simply ages out at the end of its residence window and is dropped. The database structure thus *literally dictates what the vehicle is capable of remembering to learn from*.

### 4.1 The shadow price is the same lever as the cognition gate

This calculus is not a new idea bolted onto the stack; it is the *recall*-side instance of the program's existing *compute*-side allocator. The Main Brain / Tailored Brain / Gate design already invokes expensive cognition "only when the expected loss of staying cheap exceeds the additional latency and compute burden." Replacing "latency and compute burden" with $C(d_i)$ and "expected loss of staying cheap" with $\Delta J(d_i)$ recovers exactly the same inequality. Operationally this means the gate and the retrieval test should share one accounting: a deep-cognition escalation and a strategic-partition recall are two draws on the same scarce budget, and $\lambda_k$ is the single price that rations both.

### 4.2 Per-partition shadow prices encode the half-life

The three partitions carry three distinct multipliers, $\lambda_{\text{reflex}} \gg \lambda_{\text{tactical}} > \lambda_{\text{strategic}}$. The reflexive price is set extremely high so that almost nothing earns persistence past the ring-buffer window — the fast tier *wants* to forget. The strategic price is lowest because the budget there is amortized offline and the value of a datum that forces a genuine structural correction is large. This ordering is what makes residence time and admission stringency move together rather than independently.

### 4.3 Safe-side pricing

One asymmetry must be enforced: errors in estimating $\Delta J(d_i)$ and $C(d_i)$ must round in the conservative direction. When uncertain, the system should *under*-state learning value and *over*-state cost, so that ambiguous data is dropped rather than admitted. This is the budget-side echo of the actuation algebra's meet rule — when constraints overlap, take the intersection, never the average — because averaging destroys the worst-case bound. A retrieval policy that splits the difference on a borderline datum has, in effect, averaged two envelopes and lost the guarantee.

---

## 5. Fidelity as Enforced Causality

The subsystem's most consequential departure from ordinary machine learning is its definition of fidelity. Standard practice equates fidelity with **accuracy/integrity** — how perfectly the internal representation matches the world, e.g. a pixel-perfect bounding box. This architecture instead leans fidelity toward **enforced causality** — how reliably the data stream reinforces safe state transitions — and in doing so converts the learning policy from an epistemological instrument into a control-theoretic one.

The distinction is operational, not philosophical:

- **Natural causality (passive):** the vehicle observes that a ball entering the roadway is often followed by a child, and the policy *learns the correlation* if and when enough examples accumulate.
- **Enforced causality (active):** the policy *manipulates the importance weight* of the low-trajectory object on ingestion, inflating its threat value before any classifier has resolved what the object is. Fidelity here deliberately discards the object's exact texture and size (low accuracy) to guarantee a rigid causal link: *detection of a low-trajectory object $\rightarrow$ enforce the braking manifold* (high enforced causality).

### 5.1 Enforced causality is the data-plane image of the refusal chain

This is not a heuristic; it is the ingestion-time projection of mechanisms already present downstream:

- **Boundary flux as importance weight.** The Poisson/Laplace safety field encodes semantic risk by assigning a high boundary flux $b(\mathbf{y})$ — a steep repulsive gradient — to high-risk surfaces like pedestrians and a low flux to curbs. Enforced-causality fidelity is the same modulation moved one stage upstream: the importance weight applied to an incoming datum is the data-plane analogue of $b(\mathbf{y})$. A high-threat ingest weight and a high obstacle flux are the same conservatism expressed at two points in the chain.
- **Monosemantic gating as the tactical predicate.** The tactical partition's "trajectory consensus" check is enforced by the sparse-autoencoder fidelity gate: a "pedestrian" admission must be driven by human morphological features rather than the texture of an adjacent crosswalk. The SAE's trusted scalar $\xi$ is precisely the metric that decides whether a tactical datum is *causally honest* enough to inform the maneuver policy, independent of how visually accurate the underlying detection appears.
- **Antitone admission.** As the warrant for a benign interpretation falls, the set of admissible interpretations of a datum only ever shrinks — a direct lift of the actuation algebra's law $R_1 \le R_2 \implies U_{\text{ad}}(R_2) \subseteq U_{\text{ad}}(R_1)$ into the fidelity domain. Enforced causality is monotone the same way the actuation envelope is monotone.

### 5.2 The fidelity balance shifts with the partition

Fidelity is not a global constant; its accuracy-versus-causality mix is tuned per tier:

- **Reflexive:** tuned essentially 100% toward enforced causality. The tier does not attempt high-integrity scene reconstruction; it spends budget only on data that might violate a safety bound.
- **Tactical:** a deliberate mixture. The policy now needs enough accuracy to distinguish vehicle classes and resolve right-of-way, but it still enforces rigid causal rules about who must yield.
- **Strategic:** accuracy reasserts itself, because a structural weight update must be grounded in a faithful picture; but even here causality remains the veto — an accurate datum that would weaken a safe transition is refused consolidation.

---

## 6. Anti-Silent-Drift Coupling

Because the strategic partition is the only path to the vehicle's fundamental weights, it is the natural attack surface for *silent capability mutation* — the failure mode the program guards against with the proposer/verifier/adjudicator framework and the Local Learning Coefficient monitor. The metabolic subsystem must therefore make eviction and consolidation events first-class governed transactions.

The mechanism is the LLC. As an online-updating policy consolidates strategic data, it does not gain capability smoothly; it passes through discrete developmental phase transitions, reliably signalled by a simultaneous drop in regret and a sharp jump in the learning coefficient $\lambda(U)$ — the "opposing staircases." Estimating the LLC in real time via preconditioned SGLD,
$$w_{t+1} = w_t - \frac{\epsilon}{2}A\!\left(\beta^\* \nabla \hat{L}_n(w_t) + \gamma (w_t - w^\*)\right) + \xi_t,\qquad \xi_t \sim \mathcal{N}(0,\epsilon A),$$
gives a measurable trigger. The governance rule for the metabolic subsystem is then explicit:

> **A strategic-partition consolidation that induces an LLC jump is not committed. It is flagged, logged as a challengeable event, and quarantined between drives until formally verified.**

This closes the loop the roadmap demands — capability gains must not silently reduce provenance, contestability, or auditability — at the exact point where memory turns into learning. The training/inference separation maps cleanly onto the partitions: the off-board training substrate consumes the strategic graph and may *propose* weight changes; the on-board inference substrate executes only signed, verified artifacts and is forbidden from committing a quarantined update mid-drive.

---

## 7. Numerical and Physical Guarantees

The metabolic subsystem inherits, rather than re-litigates, the program's numerical and physical safety substrate, but it places specific demands on each.

**Posit/quire for persistent state.** Any scalar that survives into the tactical or strategic tier and can later gate actuation must be carried in a format whose rounding error is bounded on the conservative side. The Kalman covariance recursion $P^-_k = F_{k-1}P^+_{k-1}F_{k-1}^\top + Q_{k-1}$ loses positive-definiteness under IEEE-754 single precision after a few hundred seconds — a horizon that lands squarely inside the strategic partition's lifetime. A 32-bit Posit with quire accumulation tracks a double-precision reference indefinitely, so the persistence tiers must use it. The payoff is directional: a numerical error in retained state can only ever cause the system to *over*-estimate risk, never under-estimate it, preserving the integrity of the minimum-risk condition across the entire residence window.

**Symplectic integrators for tactical rollouts.** The tactical partition's cached agent trajectories must come from structure-preserving integrators (Størmer/Velocity-Verlet). Their bounded — rather than drifting — energy error is what makes "trajectory consensus" a meaningful verification predicate: it guarantees that a cached forward simulation of a neighboring vehicle does not artificially gain kinetic energy or bypass a physical constraint over the $5\ \text{s}$ horizon, so that consensus failures indicate genuine disagreement rather than integrator drift.

**Finite-time recurrence for eviction stability.** Eviction and re-admission must not chatter. The relevant guarantee is the recurrent-tracking relaxation: rather than requiring memory state to decay monotonically toward a target (a Lyapunov condition the data plane cannot honor under bursty input), the subsystem requires only $\beta$-exponential $\tau$-recurrence — transient excursions are permitted provided the retained-state error returns to a strictly decreasing envelope within the bound $\tau$. Document D2's PMP-optimized, multi-agent finite-time recurrence is the right scheduling model for the eviction process itself: costates act as eviction priorities (an entry's adjoint sensitivity to a race or lock-ordering condition), and Hamiltonian maximization selects which entries to consolidate or drop so that the collective memory state returns to its safe set $S_r$ in finite time despite per-agent latency.

---

## 8. Mapping Across the L2–L5 Authority Regimes

The invariant consequence law of the refusal chain is identical across authority regimes; only the recovery target shifts. The metabolic subsystem follows the same discipline — one calculus, four tunings — by re-pricing the budgets and re-balancing fidelity as machine authority rises.

| Regime | Dominant partition | Budget posture ($\lambda_k$) | Fidelity balance | What memory must guarantee |
|---|---|---|---|---|
| **L2 — driver-supervised** | Reflexive | High prices everywhere; minimal persistence | Almost pure enforced causality | Honest, instantaneous denial; standing-preference continuity; cheap field validation of the primitives |
| **L3 — conditional** | Reflexive + Tactical | Tactical price lowered to support self-judgment of continued admissibility | Mixed; causality still vetoes | Continuity of world-state validity inside the ODD; clean ODD-exit eviction; replayable takeover/MRC rationale |
| **L4 — bounded** | Tactical + Strategic | Strategic price lowered; persistent graph fully active within the service area | Accuracy rises for domain completeness | Machine-owned continuity without a fallback driver; fleet-scale replay and challenger loops inside the domain |
| **L5 — universal** | All three, adaptively | Prices become context-formed rather than fixed | Accuracy and causality both maximal, jointly bounded | Adaptive *domain formation* rather than narrow domain selection; truth governance stable under continuous novelty |

Two observations discipline the roadmap. First, the hard pivots in the data plane mirror the hard pivots in authority: **L2$\to$L3** is where the tactical partition first acquires real authority over continuation (the machine must now police its own admissibility from retained state), and **L4$\to$L5** is where fixed per-partition prices must give way to *learned, context-dependent* pricing — the budget itself becomes a function of the formed domain. Second, the L5 acknowledgment of "the price of implicit bias" applies directly here: the geometric bias of the retrieval optimizer must be aligned with the geometry of the safety threat model, or the metabolic subsystem will systematically forget exactly the tail events universal autonomy most needs.

---

## 9. Implementation Phases and Validation Burden

The build order parallels the program's existing phasing — substrate first, then commercialize at L2, then reconstitute authority for L3, then complete a bounded L4 domain — so that the memory subsystem matures alongside the authority regime it serves.

**Phase 0 — Calculus and partitions.** Implement the three partitions with their verification predicates, the per-partition shadow-price admission test, and the Posit/quire numerical substrate for the persistence tiers. *Validation:* prove safe-side rounding of $\Delta J$ and $C$; prove ring-buffer overwrite never strands an action-relevant reflexive datum; prove tactical leases release exactly at ODD exit.

**Phase 1 — L2 productization.** Run the subsystem reflex-heavy under driver supervision. *Validation:* denial precision and false-admission control on the reflexive tier; honest display of admissibility tracking real retained-state admissibility; demonstrable conservatism of the fidelity gate under sensor degradation.

**Phase 2 — L3 reconstitution.** Activate the tactical partition as the substrate for self-judgment of continued autonomy. *Validation:* lawful continuation inside the ODD from retained state; correct, replayable eviction at ODD exit driving takeover/MRC; proof the subsystem does not become *less* conservative as warrant deteriorates.

**Phase 3 — L4 domain completion.** Activate the strategic graph and the off-board consolidation loop within one bounded domain, fully under the LLC/proposer–verifier governance. *Validation:* every consolidation that moves the LLC is quarantined and adjudicated; fleet replay reproduces eviction and admission decisions deterministically; no silent capability drift across signed releases.

**Phase 4 — L4 expansion / L5 research.** Generalize fixed pricing toward context-formed pricing and adaptive domain formation. *Validation:* the retrieval optimizer's geometric bias is measured against the threat-model geometry and corrected; tail-event retention is demonstrated to survive budget pressure.

---

## 10. Positioning Statement

> **Build a metabolic memory subsystem whose three residence-time partitions each carry their own definition of a valid signal; whose retrieval is a budgeted optimization act priced by a per-partition shadow price; whose fidelity enforces safe causal structure rather than representational accuracy; and whose only path to the vehicle's fundamental weights is gated by anti-silent-drift governance. Verification must strengthen as residence time grows, because the blast radius of a corrupt datum grows with the authority it is allowed to acquire.**

This is the data-plane completion of the program's central commitment. The architecture of refusal makes the *control* plane legitimate by bounding what an error can do to the actuators. The metabolic memory architecture makes the *data* plane legitimate by bounding what an error can do to what the system remembers, retrieves, and learns. A vehicle governed by both does not merely perceive and act well — it is **legitimate in how it knows, decides, forgets, and learns.**
