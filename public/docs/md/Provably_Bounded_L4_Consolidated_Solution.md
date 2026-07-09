# Consolidating the L4 Project Findings into a Provably Bounded Autonomous-Driving Solution

**Mapping the Sensing, Numerics, Compute, and Functional-Safety Surveys onto the Constraint-Propagation Goal**

*Document type:* Project consolidation / solution architecture
*Status:* Synthesis of the six L4 technical surveys against the dissertation goal (*Constraint Propagation from Epistemology to Actuation*) and the consolidation corpus.
*Companions:* the Ten-Article corpus (Chapters 1–10); the six project surveys — Advanced & Emerging Technologies, Automotive-Specific Systems, Functional Safety & Standards, Numerical Methods & Precision, Sensors & Sensing, Processor & Computing Architectures.

---

## 0. Purpose and the discipline this document inherits

The dissertation goal asks for one thing: that safety be engineered as an **unbroken chain of constraint propagation**, in which the set of actuator commands a stage may authorize can only *contract* as control flows toward the wheels and as estimated risk rises, with the final contraction enforced by physics rather than software. The Ten-Article corpus has already developed that goal into four proposed contributions — a trusted-scalar fidelity gate, a risk-monotone actuation algebra, a timing-contracted analog veto, and a conjunctive conformance checklist — and has consolidated several internal artifacts (the EPU/Queen-Bee hierarchy, the conservation-manifold compiler, the coordination framework) against it.

What that corpus could not supply from its own materials was a **verified engineering substrate**: a faithful account of which sensors, numeric formats, compute fabrics, and functional-safety mechanisms actually exist, at what maturity, and under what certification posture. The six L4 project surveys supply exactly that. The consolidating act of this document is therefore to recognize that **the surveys are the established foundation the chain was missing**, and to bind each survey domain to its link in the chain — discharging substrate obligations, naming the ones that remain open, and preserving without exception the corpus's central methodological commitment: *the seam between what is known, what is proposed, and what is unverified is never blurred.*

Three standings are used throughout, as in the corpus:

- **Established** — independently attested engineering or theory; in this document, drawn from the surveys' cited literature.
- **Proposed** — a defensible synthesis advanced as a hypothesis, carrying an explicit verification obligation.
- **Notional / unverified** — a requirements sketch or a figure presented as built but not demonstrated; treated as a specification of *required properties*, never as a measured result.

---

## 1. The goal, restated as acceptance criteria

The goal is not "make perception more accurate." It is a monotonicity property over admissible actuator commands, restated here as six criteria a build can be tested against:

- **G1 — One-sided error.** Every safety-bearing scalar errs only conservatively: it may underclaim safety, never overclaim it.
- **G2 — Antitone admissibility.** The admissible-command set is an antitone function of estimated risk: higher risk, strictly smaller set.
- **G3 — Non-expansive enforcement.** Projection of any proposed command onto the admissible set is firmly non-expansive (1-Lipschitz), so the enforcer cannot amplify an upstream oscillation.
- **G4 — Physical fail-closed.** On corrupted data, a missed deadline, or a tampered path, an independent hardwired layer forces the minimal-risk envelope within bounded latency, beneath any software fault.
- **G5 — Legible policy.** Any online change in what a learned component "knows" is detectable and recordable as a challengeable event, not silently absorbed.
- **G6 — Conjunctive release.** Actuation is authorized only if every discharge obligation is simultaneously met; the absence of a discharged guarantee is itself a fault.

G1–G4 are real-time and structural; G5 is a slower assurance layer; G6 is the integrating gate. The remainder specifies how each is built from the project findings and what remains owed.

---

## 2. The consolidating claim

The dissertation and the project surveys are not two programs; they are one architecture described from its two ends. The dissertation specifies, top-down, *what property the chain must have*. The surveys describe, bottom-up, *the verified components that can physically realize each link*. Stated as a single sentence with the rest of the document as its proof:

> The six L4 surveys supply the **established substrate** — deterministic numerics, redundant sensing, deterministic low-latency compute, and the ISO-26262/SOTIF safety machinery — that grounds Stages S0, S2, and S4 of the constraint chain and supplies the runtime physics-check that seeds the trusted scalar of S1; what they do *not* supply — the one-sided-bound proof, the exactness theorem off the box, and the liveness frontier — is precisely the dissertation's owed contribution and the program worth funding.

A crucial corollary, and the place where this consolidation is most honest: **the surveys also constrain the corpus's stronger claims.** Where the corpus asserts dramatic figures (e.g. a single-precision EKF diverging within hundreds of seconds while a Posit-with-quire path tracks double precision), the numerics survey supports only the weaker, defensible version — that *numeric format is a safety variable* and that fixed-point/Posit offer bit-exact determinism, while noting FP32 is often sufficient and ill-conditioned cases simply need more bits. The consolidation adopts the survey's calibrated version and treats the corpus's sharper number as motivation, not evidence.

---

## 3. The constraint chain, link by link, grounded in the project findings

The chain runs: perception/fusion → fidelity scalar → layered control → actuation algebra → analog veto, with a parallel slow-loop governance overlay and a terminating conformance gate. For each link below: the dissertation demand, the project finding that grounds it, and the residual obligation.

### S0 — Trusted sensing and numerics (the substrate)

**Demand.** Every number feeding a safety margin must be honest, with rounding bounded on the safe side; sensing must offer a physics-diverse failure surface.

**What the surveys supply (Established).**

- *Numeric format as a safety variable.* The numerics survey establishes that fixed-point (Qm.n) and Posit arithmetic implemented in integer logic are **bit-exact and fully deterministic**, with predictable latency that aids worst-case-execution-time analysis and ISO-26262 verification, and that fixed-point avoids the NaN/Inf exceptions that can silently break safety comparisons. It establishes the covariance update in a Kalman filter as the precision-critical path — small values quantize first — which is exactly where S0's "safe-side rounding" requirement must bite. This grounds the chain's numerical honesty floor without needing the corpus's sharper EKF-divergence anecdote.
- *Physics-diverse redundancy.* The sensing survey establishes event-driven Dynamic Vision Sensors with **microsecond latency and ~120 dB dynamic range**, FMCW-radar FFT pipelines, and multi-modal suites that give a redundant, physics-diverse failure surface — the robustness-over-minimalism substrate S0 demands. Runtime plausibility (dual-channel sensors that must agree within tolerance, falling back to back-EMF/back-physics estimation) is established in the functional-safety survey.
- *Energy-bounded prediction.* The numerics survey establishes symplectic (Verlet) integration as bounded-energy and even **bitwise-reversible in fixed-point**, with no energy drift — the structure-preserving discipline the predictive step requires.

**Residual obligation.** A format-level proof, for the chosen safe-set scalar, that its arithmetic cannot round in the optimistic direction. The surveys make this *cheap to discharge* (fixed-point/Posit determinism is in hand) but do not discharge it.

### S1 — The fidelity gate as a trusted scalar φ

**Demand.** Not an L2 reconstruction error but a single qualified scalar that answers "can the discarded detail only ever shrink, never enlarge, the admissible action set?" — denoting a genuine barrier-margin quantity, bounded and saturating, erring only toward higher risk, feeding only constraint-tightening maps, re-qualified continuously.

**What the surveys supply (Established → seeds a Proposal).** The functional-safety survey's **"Safety Verification via Physics Models"** is the closest established instantiation of φ in the project corpus. It computes a *safe following distance* from current speeds and braking capability via energy/momentum conservation, derives runtime thresholds for "time to safety" and "minimum braking capacity," and triggers a minimum-risk maneuver when the actual margin falls below them. This is structurally a barrier-margin witness computed against a physics-constrained model: a margin whose error structure is principled rather than arbitrary. It is the raw material for a one-sided bound.

**Residual obligation (the program's largest debt).** The survey's physics check is validated as *accurate*, not as *conservative*. Re-deploying it as a safety gate means re-deriving the margin as a proven **one-sided lower bound** on the true barrier margin under stated assumptions (G1), computed in the S0 safe-rounding format. Until both hold, φ is a candidate, not a guarantee — exactly the dissertation's Contribution-I obligation, now sharply scoped because the estimator already exists.

### S2 — Layered control and the subordination of coordination

**Demand.** Layered reduced-order/full-order control with control-barrier and recurrent-tracking functions; any multi-agent coordination layer must be *subordinated* — its outputs are proposals, never actuator authority.

**What the surveys supply (Established).** The functional-safety and processor surveys establish the building blocks: deterministic, certifiable control substrates (lockstep cores, safety islands with private power/clock/memory) and the runtime physics-model checks above. The corpus's prior consolidation (Chapter 6) already showed how a trust-and-consensus coordination framework must be demoted to a *proposer* whose consensus enters S3 as the argument to a projection, with averaging replaced by a conservative join and failure paths routed to raise the S4 envelope. The surveys reinforce this with the **Freedom-from-Interference (FFI)** principle: a coordination or QM-grade component must be isolated so it cannot disturb the ASIL-D path, which is precisely "coordination proposes, it does not actuate."

**Residual obligation.** The reduced-order → full-order tracking bound (recurrent-tracking function) is accepted as established control theory; its instantiation for the specific vehicle remains an integration task, not a research one.

### S3 — The risk-monotone actuation algebra

**Demand.** A family of admissible-command sets indexed by a normalized risk band, antitone in risk (G2); each set a closed convex axis-aligned box so projection is firmly non-expansive (G3); implemented as a two-stage clamp — magnitude then **rate last** — so a risk spike yields bounded jerk rather than a step-lurch; multiple envelopes compose by **intersection (meet), never union or average**; band switching uses **asymmetric hysteresis** (tighten instantly, loosen only after dwell).

**What the surveys supply (Established → Proposed).** The functional-safety survey establishes the **ODD-transition** behavior the algebra must produce: as conditions degrade (clear → rain ODD), previously safe distances become unsafe and the controller must increase following distance or begin a minimum-risk maneuver — i.e. the admissible envelope must contract smoothly, not snap. The survey's derived per-ODD thresholds are exactly the risk-banded envelope indices the algebra consumes. The mathematical core — that box projection is separable and 1-Lipschitz, and that sequential clamping equals Euclidean projection in the feasible regime — is discharged in the corpus (Chapter 4) by elementary convex analysis.

**Residual obligation (owed theorem).** Real actuator limits — coupled steering/acceleration, the friction circle — are **not axis-aligned boxes**. Non-expansion survives (any closed convex set projects non-expansively, so G3 holds), but the *separable clamp implementation* does not. The program must either extend the exactness theorem to the non-box geometry or prove a box inner-approximation is itself conservative. This is the binding mathematical obligation on S3.

### S4 — The timing-contracted analog veto

**Demand.** An independent layer enforcing S3 under the timing contract *intervention latency ≪ sensor-consistency window ≪ digital decision window*, built from hardwired comparators/latches with **no programmable logic in the guard path**, fail-closed to the minimal-risk envelope (maximal safe braking, zero positive acceleration) on corrupted data, missed deadline, or tamper.

**What the surveys supply (Established).** This is the chain's strongest substrate match, and it is where the project findings most directly discharge a dissertation requirement:

- The functional-safety survey establishes the full hardwired guard toolkit: **dual/triple-core lockstep** comparison every cycle (the standard ASIL-D path), **memory ECC** with >99% single-point coverage, **windowed watchdog timers** for program-sequence monitoring, **safety islands** with isolated power/clock/memory, and **FFI by physical separation** — every property the dissertation lists for a guard channel that a compromised stack cannot reach past.
- The processor survey establishes a **deterministic, low-latency compute fabric** (e.g. AMD Versal AI Edge-class SoCs) at TRL ~8–9 and FMCW silicon-photonic LiDAR delivering deterministic per-pixel velocity — credible, *shipping-class* substrates for the reflexive layer, alongside lockstep RISC-V.
- The fail-closed default itself — deactivate the failing channel, fall back to a physics-plausibility estimate, trigger the minimum-risk maneuver — is established in the functional-safety survey's runtime-monitor and FFI sections.

**Residual obligation (honesty boundary).** The surveys are explicit that **neuromorphic and event-driven processors are not yet ISO-26262/ASIL-certified** (TRL ~3–5; usable only for non-safety pre-filtering), and that novel architectures generally lag in certification. Therefore: event sensing may feed S0 but **must not sit in the guard path**; any EPU/PICAPD-style ISA must be presented as a *requirements sketch* (privilege isolation, deterministic bounded latency, jitter-bounded execution, architectural rollback) and never as built silicon — with lockstep RISC-V plus FPGA-accelerated kernels named as the realizable near-term substrate, exactly as the corpus insists.

### S5 — Learning governance (cross-cutting, slow loop)

**Demand.** Online detection that a learned component has acquired a new behavior, feeding an anti-silent-drift overlay structured as proposer / verifier / adjudicator, with capabilities quarantined *between drives* rather than vetoed in real time.

**What the surveys supply.** The surveys supply the **governance scaffolding and the timescale honesty**, not the detector. The functional-safety survey establishes that every dynamic/adaptive parameter change must itself be safety-verified and included in the safety case — the engineering form of "no silent drift." The OTA/continuous-improvement path (raising accuracy over fleet life) is exactly the silent-drift hazard; it must be wrapped so an independent verifier checks proposed thresholds against the physics-certified constraint set and the envelope-conformance suite before an adjudicator canonizes or quarantines. The detector itself — the LLC / stagewise-transition signal estimable via SGLD — is established *elsewhere* (the learning-theory corpus) and should be adopted rather than reinvented.

**Timescale honesty (non-negotiable).** The detector runs on slow-loop/training timescales; the S4 veto runs in microseconds. Governance can only quarantine a capability *between drives* — it cannot prevent a hallucinated command in real time. Conflating the two would overstate the result.

### S6 — The conjunctive conformance gate

**Demand.** A single fail-closed release gate: actuation is authorized only if, simultaneously, φ is a qualified one-sided scalar (1); every fused input passed pre-fusion admissibility with provenance (2); RoM→FoM tracking is within its recurrent bound (3); the command lies in or is non-expansively projected into the intersection of active envelopes, rate-clamp last (4); no averaging/union/less-conservative-meet appears on any safety path (5); the producing computation respected its compute/latency budget (6); no online update silently revised ground truth (7); any failed check has already forced the minimal-risk envelope (8). The clauses are conjunctive — a missing guarantee is itself a fault.

**What the surveys supply.** The mechanizing primitives are established: ECC/parity provenance and integrity on buses and memory; watchdog enforcement of the latency-budget clause (6); FFI isolation for clause (5); and the physics-model trigger that already places the system in the minimum-risk maneuver for clause (8). The gate is the artifact that converts "we tested hard" into "every command carries a discharged guarantee."

---

## 4. Standards crosswalk, grounded in the project findings

| Standard | What it demands | How the consolidated stack answers it (project finding) |
|---|---|---|
| **ISO 26262 (ASIL-D)** | Mitigate E/E faults; freedom from interference | S4 hardwired veto on a **lockstep** substrate with **ECC** (>99% coverage), **watchdog**, **safety island**, and **FFI by physical separation**; S0 deterministic (fixed-point/Posit) numerics |
| **ISO 21448 (SOTIF) / UL 4600** | Bound the "unknown unsafe" with no hardware fault | S1 physics-model trusted scalar + S3 risk-monotone projection make unsafe commands **structurally unrepresentable**, converting SOTIF from a statistical claim about error rate into a structural claim about error consequence |
| **IEEE 2846 / RSS / SFF** | Reasonable assumptions; safe behavior across ODD transitions | S3 **rate-clamp-last** bounded-jerk entry into stricter per-ODD envelopes; **asymmetric hysteresis**; the survey's derived per-ODD thresholds as envelope indices |
| **AEC-Q100 / ISO 16750-3** | Thermomechanical and vibration survivability | The sensing survey's MEMS **vibration/noise floor** sets the real lower bound on any safety threshold (S0); format/precision choices preserve covariance positive-definiteness |

The decisive claim the chain licenses, now resting on a verified substrate: **even under severe perception/planning hallucination, the actuation-boundary forms force the vehicle into a provable Minimum Risk Condition** — and do so without violent braking at ODD transitions, because the same rate-clamp-last discipline that prevents lurching carries the vehicle smoothly into the more conservative parameters that fog or rain demand.

---

## 5. What the project findings discharge, sharpen, and leave open

**Discharged or substantially grounded.**

- The S4 guard substrate (lockstep / ECC / watchdog / safety island / FFI) is established engineering, not aspiration.
- The S0 numerical-determinism prerequisite is in hand (fixed-point/Posit); the safe-rounding format is a specification item, not a research program.
- The S1 seed exists: a validated runtime physics check that already triggers minimum-risk maneuvers.
- The S3 ODD-transition behavior and per-band thresholds are established practice.

**Sharpened but not closed.**

- The **one-sided-bound proof** for φ — the survey's physics margin is accurate, not yet proven conservative. *Largest debt.*
- The **exactness theorem off the box** — non-expansion survives for the friction circle; separable clamping does not.

**Open, and unchanged by the surveys.**

- **Liveness / feasibility.** A scalar that always reports maximum risk satisfies every clause and parks the vehicle forever. The trade-off frontier between worst-case bound and ordinary drivability is the central empirical question and is open.
- **Notional-vs-built honesty.** Any EPU/PICAPD-style figures (cycle counts, FIT, per-die cost) remain projections until silicon; the surveys reinforce this by documenting that the relevant novel architectures are not yet ASIL-certified.

---

## 6. A phased program of work

Sequenced so load-bearing proofs precede the claims that depend on them; the two research items (exactness theorem, liveness) run as parallel workstreams from Month 0 because they gate the *validity* of the claim, not the *fabrication* of the chip.

1. **Substrate and gate (S0, S1).** Fix the safe-side numeric format (fixed-point/Posit) for all safety scalars; re-derive the survey's physics margin as a one-sided bound for one defined safe set. *Exit: a φ that is a proven one-sided bound in a non-optimistically-rounding format.*
2. **Actuation algebra (S3).** Implement the antitone box family, non-expansive rate-clamp-last projection, intersection-meet, asymmetric hysteresis; prove exactness for the box and characterize the friction-circle regime. *Exit: a projection enforcer with a proven exactness/conservatism property.*
3. **Analog veto (S4).** Build the hardwired guard on FPGA + lockstep-RISC-V; validate the timing-contract ordering and fail-closed behavior under injected corruption, deadline miss, and tamper. *Exit: measured bounded intervention latency beneath the digital decision window.*
4. **Subordinate coordination (S2→S3).** Type any consensus/coordination output as a proposal; insert φ at the aggregation boundary; replace averaging with conservative join; route failures to raise the S4 envelope. *Exit: no path to actuation except through the projection enforcer.*
5. **Learning governance (S5).** Stand up the LLC/SGLD drift detector behind a proposer/verifier/adjudicator log; treat optimizer-bias / threat-geometry alignment as a first-class design constraint. *Exit: online capability changes are logged and quarantinable between drives.*
6. **Conformance gate and certification (S6, §4).** Wire the conjunctive checklist as the release gate; assemble the ISO-26262 / SOTIF / UL-4600 evidence package against a defined ODD. *Exit: a fail-closed gate and a structural SOTIF argument.*
7. **Liveness frontier (parallel, Month 0+).** Map the worst-case-bound-versus-drivability frontier empirically; pair the envelope-conformance suite with a false-veto / drivability baseline. *This is where the program's risk concentrates.*

---

## 7. Provenance ledger

| Claim or construct | Standing | Treatment in this solution |
|---|---|---|
| Lockstep cores, ECC, watchdog, safety island, FFI (functional-safety survey) | Established | S4 guard substrate; S6 integrity/provenance |
| Runtime physics-model safe-distance check → minimum-risk maneuver | Established | Seeds the S1 trusted scalar; one-sided proof owed |
| Fixed-point/Posit determinism; covariance is the precision-critical path | Established | S0 safe-side numeric substrate |
| Symplectic/Verlet, energy-bounded (and reversible fixed-point) | Established | S0 energy-bounded prediction |
| Event/DVS sensing (µs latency, ~120 dB); FMCW radar FFT; deterministic low-latency fabric | Established | S0 sensing substrate; deterministic fabric a candidate S4 substrate |
| ODD-transition thresholds; SOTIF "unknown unsafe"; RSS/SFF/IEEE 2846 | Established | S3 envelope indexing; §4 crosswalk |
| Convex/box projection 1-Lipschitz; feasible-case exactness | Established (corpus Ch. 4) | Grounds G3 and S3 feasible regime |
| LLC / stagewise-transition detector (SGLD-estimable) | Established (elsewhere) | S5 drift detector — adopt, not invent |
| Guarded-Swarms analog-veto principle | Established (verified) | Basis of S4 |
| Trusted-scalar contract; risk-monotone algebra; conformance checklist | Proposed | Contributions I/II/IV; one-sidedness and exactness owed |
| EPU / Queen-Bee / "PICAPD" ISA (latency, FIT, cost, core counts) | Notional / not ASIL-certified per surveys | Requirements sketch only; FPGA + lockstep-RISC-V named as substrate; never cited as built |
| FP32-EKF-diverges-in-hundreds-of-seconds figure | Unverified by surveys | Demoted to motivation; survey's "format is a safety variable" adopted instead |
| Neuromorphic/event processors in the guard path | Excluded (TRL 3–5, uncertified) | Confined to S0 pre-filtering; barred from S4 |

---

## Conclusion

The consolidation reaches a clean result. The six L4 project surveys do not compete with the dissertation goal; they **supply the verified substrate it lacked**. The functional-safety findings furnish the hardwired, fail-closed, freedom-from-interference guard the analog veto requires; the numerics findings furnish the deterministic, safe-side arithmetic the trusted scalar's honesty demands; the sensing and processor findings furnish the physics-diverse, deterministic-latency front end; and the survey's own runtime physics check is the first concrete seed of the trusted scalar. What the surveys cannot supply — the one-sided-bound proof, the exactness theorem off the box, and above all a proof of liveness — is exactly the dissertation's owed contribution and exactly the program worth funding.

The wager is unchanged, only now resourced from a real engineering base: make autonomous driving certifiable rather than merely tested — not by proving the stack never errs, but by proving, in hardwired logic that no software fault can reach past, that when it does err, the error has nowhere unsafe to go. Every load-bearing claim above carries its standing, and the seam between what is known, what is proposed, and what is unverified is never blurred.
