## Prompt 1 — EPU “Physics Enforced at Hardware Substrate” Landing Page + Pillars (Level-5 narrative, but technically constrained)     

```text
Build a single responsive “EPU” demonstration landing page that matches the attached hero poster aesthetic,
but stays technically honest and grounded in the technical documents.

TITLE / POSITIONING
- Title: “EPU — Event Processing Unit”
- Subtitle: “Physics enforced at the hardware substrate”
- Add a visible “What this demo is / is not” disclaimer: conceptual + architecture demonstration; not a certified safety case.

HERO VISUAL + 5 PILLARS (use icon cards)
Implement five pillar cards that map directly to the technical documents (no vague marketing):
1) General Relativity / Time Transfer
   - Mention gravitational redshift + time dilation as the anchor relations (for time/frequency transfer, calibration, clock networks).
2) Continuum / Computational Fluids
   - Explain “continuum-aware sensing” (medium and propagation matter; sensing as an operator over trajectories).
3) Quantum Sensing Dynamics
   - Label as “roadmapped / reserved for expansion” but show the stated intended structure (quantum measurement model + decoherence + networks).
4) Real-Time Agentic Optimization
   - Explain Worker→Manager→Queen hierarchy and pre-fusion verification governance (agreement is not warrant).
5) Celestial Mechanics Integrals
   - Explain why elliptic integrals/AGM appear: universal integrator for conservation-law systems; ties to celestial mechanics and stable transfer functions.

CORE CONTENT SECTIONS
A) “10-Gate Forced-Convergence” (interactive)
- Show the 10 gates as a left-to-right pipeline with 3 macro bands:
  REPRESENTATION (G1–G4), ACTIVATION (G5–G6), INFERENCE (G7–G10).
- Each gate card: modality, reversibility, domain-specific knobs vs invariant form.
- Clicking a gate opens a drawer with:
  • purpose, witness/invariant, failure meaning, and what evidence artifact is emitted.

B) “Absorbing state ⊥ → Minimal Risk Condition (MRC)”
- Include a bold diagram: all paths either PASS or route to ⊥ (absorbing) which maps to MRC.
- Explain: ⊥ is a topological sink; once entered, cannot escape without external reset.

C) “Thermodynamic irreversibility and timing bounds”
- Gate 9 section must explicitly show:
  • irreversibility as information loss + entropy generation,
  • Landauer bound framing,
  • how a hardware watchdog routes to MRC on WCET violation.

D) “Exact integration into a transfer function”
- Gate 10 section must show:
  • AGM iteration (small fixed iteration count),
  • transfer function H(s) built from poles/zeros/gain,
  • stability check concept (e.g., poles location) and why that is treated as a conservation guarantee.

E) “Constitutional verification before fusion” (policy-grade)
- Add a section titled “Verification is constitutionally prior to fusion”
- Summarize the pre-fusion admissibility conditions:
  integrity, alignment, scope, replay lineage.
- Add a “Unknown Register” widget: a list of assumptions/unknowns that travels with versions.
- Add a “Challenger requirement” widget: at least one independent challenger pathway (disconfirmation/boundary probing).

INTERACTIONS
- A “Choose scenario” selector (Normal / Degraded sensing / Compute overload).
- Each scenario shows:
  • which gates fail,
  • which admissibility conditions fail,
  • what evidence is excluded (not “averaged in”),
  • the resulting SAFE vs MRC route.
- Provide an “Export trace.json” button.

STYLE / UX
- Visual language inspired by the poster (strong hero, iconography), but content reads like engineering documentation.
- No external APIs; use mocked packets and deterministic toggles.
```

---

## Prompt 2 — Technical Deep-Dive Demo: Temporal State Management + Continuum-Aware Sensing + Constraint-Stress EPU     

```text
Build a 3-tab interactive technical demo page:
(1) Temporal State, (2) Sensing & Medium, (3) Constraints as Stress Fields.
This page is an “engineer’s deep dive” companion to the EPU landing page.

TAB 1 — TEMPORAL STATE (T◦ as state manager)
- Teach the T◦ model as a state management protocol:
  • temporal anchor t0,
  • temporal state space (t, y(t)),
  • flow map Φ^t_t0(y0) with identity/composition properties,
  • equivalence between flow-based vs integral-based representations.
- Provide an interactive timeline widget:
  • user selects an “aspectual lens”: rate / state / displacement / field.
  • the UI changes how a mock vehicle state is summarized (instantaneous dy/dt, y(t), Δy, rate-field over interval).
- Map this directly to autonomy:
  • “tracking” uses rate + field views,
  • “history FIFO / replay” uses integral accumulation,
  • “admissibility depends on spatiotemporal coherence” (tie to pre-fusion admissibility).

TAB 2 — CONTINUUM-AWARE SENSING (medium matters)
- Explain sensing as propagation along characteristic curves; medium and regime shifts are first-class.
- Show the two-event round-trip measurement primitive (emit at τ_out, receive at τ_in, Δτ invariant).
- Provide three modality cards:
  • EM (radar/lidar/vision): null-characteristic + medium effects
  • Acoustic/ultrasonic: depends on sound speed c_s(x,t) and flow field u(x,t)
  • Diffusive/thermal: parabolic operators encode lag + smoothing
- Include an interactive “medium slider” (clear air → fog/rain → heavy scatter) that changes:
  • admissibility flags,
  • expected staleness,
  • which gates become conservative (e.g., trigger earlier MRC).

TAB 3 — CONSTRAINTS AS STRESS FIELDS (EPU as stress computer)
- Teach the continuum reformulation:
  • constraints generate stress fields σ_C(x,t) that propagate and concentrate.
- Show a 3-tier hierarchy simulation:
  Workers → Managers → Queen, with stress aggregation and failure cascades.
- Must include:
  • local stress concentration example (single worker anomaly),
  • critical stress cascade (multiple worker failures → Queen risk),
  • stress diffusion recovery via lateral coupling / context-flow rerouting.
- Provide a visualization:
  • heatmap over “capability space” (stress intensity),
  • and a “stress moment” summary panel (Σ0, Σ1, Σ2) to show why moments are used for O(n) summaries.
- Tie to Gate 10 stability:
  • non-realizable / active behavior corresponds to unstable dynamics (conceptually linked to pole locations),
  • EPU prevents those states via gate-level constraints.

CROSS-TAB FEATURE: MEMORY / ERASURE & IRREVERSIBILITY
- Add a side panel “Memory & Erasure Criteria”
- Show the three erasure notions:
  • correlation decay threshold,
  • mutual information → 0,
  • entropy production + Landauer heat bound.
- Connect this explicitly to:
  • staleness-driven confidence decay (activation pressure),
  • Gate 9 irreversibility/WCET enforcement.

EXPORTS
- “Export evidence bundle” button that generates:
  trace.json (timeline of gates + admissibility flags),
  stress.json (stress + moments),
  temporal.json (state lens outputs).
No external APIs.
```

---

## Prompt 3 — Verification & Traceability Workbench: Universal Filtration Primitive + Evidence Constitution + Fault Campaign     

```text
Build a small multi-route demo site:
/primitive, /inventory, /constitution, /reports, /faults
This is a verification-oriented “workbench” that connects the filtration taxonomy to the EPU safety narrative.

ROUTE /primitive — Universal Filtration Primitive
- Explain the primitive as the required fields:
  Domain, typed discrimination criterion Φ, partition rule Γ, substrate, separation mode.
- Explain two separation modes: DirectSelection vs DecompositionBased.
- Show the staged interface:
  Represent z=R(x) → Discriminate s=Φ(z) → Select y=Γ(s) → optional Compose x̂=C(y,z).
- Include an “atom-resolved” section:
  decomposition-based paths emit Atom Patch Set Δ as the canonical deliverable.

ROUTE /inventory — 10-path Filter Inventory (agent-facing)
- Interactive table for the 10 paths with:
  geometry, selectivity signal, fidelity proxy, footprint, and default failure modes.
- Include “standard agent deliverables” panel:
  gate decision, mask, scores/labels, Atom Patch Set Δ, audit report.
- Include universal metrics vector P=(Fidelity, Selectivity, Throughput, Efficiency)
  and a verification suite checklist (monotonicity, reconstruction, robustness, regime adequacy, calibration).
- Include a complexity table viewer (per-path training/setup, per-element cost, memory, tuning cost).

ROUTE /constitution — Constitutional verification before fusion (driverless perception)
- Render the constitutional rules as a checklist UI that can be applied to a mock sensor claim:
  • sensors as witnesses; every assertion must have lineage,
  • pre-fusion admissibility conditions: integrity, alignment, scope, replay,
  • independence/corroboration requirements (correlated witnesses count as one),
  • “inadmissible evidence is excluded, not averaged in,”
  • safety monotonicity under uncertainty (less warrant → more conservative behavior).
- Also include:
  • Admissibility + warrant rules (traceable origin, legible transformation, revisability, scoped meaning),
  • anti-silent-drift clause (truth changes must become explicit events),
  • Unknown Register + Challenger requirement widgets.

ROUTE /reports — Traceability Report Builder (exportable)
- Form-driven report that outputs:
  • selected filtration path(s) + declared mode,
  • R/Φ/Γ/C definitions (even if Identity),
  • assumptions + regime adequacy checks,
  • evidence lineage and admissibility decisions,
  • metrics P=(F,S,T,E) + verification checklist results,
  • connection to EPU gates (which gate produced which artifact).
- Export JSON.

ROUTE /faults — Fault Injection Campaign (demo)
- Create a fault catalog UI with:
  • sensor faults, processing faults, environmental faults,
  • expected behavior: every fault routes to an appropriate MRC,
  • bounded response time target,
  • detection coverage / false positive targets (displayed as demo placeholders).
- Each fault “run” generates:
  an admissibility decision trace + gate failures + final SAFE/MRC route.
- Export fault_trace.json.

GLOBAL REQUIREMENTS
- Tone: verification-first, evidence-first.
- No external APIs; deterministic mocked data.
- Everything is auditable: every displayed claim has “why admitted / why excluded” metadata.
```


## Prompt 4 — Agent Roles (LLM-in-hardware governance + Worker→Manager→Queen + constitutional offices)

```text
Build a multi-route demonstration site titled:
“Agent Roles in the EPU: Constitutional Governance + Real-Time Hierarchy”

This site is SOLELY about agent roles: who is allowed to do what, what artifacts each role must emit, and how hardware-enforced constraints prevent role/authority violations.

ROUTES
1) /roles (operational hierarchy)
2) /constitution (epistemic separation of powers)
3) /runtime (LLM-in-hardware: bounded authority + interfaces)
4) /artifacts (traceability outputs + audit objects)
5) /simulator (interactive “claim lifecycle” + failure cascades)

GLOBAL RULES (must be visible on every route)
- Show “Degrees of reliance” states as a badge on every claim: Hypothesis → Provisional → Canon → Retraction.
- No role may upgrade a claim’s reliance level without the required constitutional pathway (enforced in the UI logic).
- Correlated pathways count as one witness; independence is required for high-consequence claims.
- Inadmissible evidence is excluded (not averaged in); under uncertainty, behavior becomes more conservative.

ROUTE 1 — /roles : Operational Hierarchy (Worker → Manager → Queen)
A) Role cards (click-to-expand)
- Worker (many):
  • owns local sensing / feature extraction / invariant checks
  • emits: “witness packet” (raw reference + transforms + integrity flags) and local votes
  • constraints shown on card: memory + latency budgets (demo placeholders)
- Manager (few):
  • aggregates Workers; must preserve aggregation consistency
  • emits: agreement bits, ensemble confidence, decision-path metadata
  • can shed/redistribute load when stress is high (show a simple “context reroute” diagram)
- Queen (one):
  • final action authority; safety constraint is primary
  • emits: final binary decision SAFE/UNSAFE and reason bits
  • show “memoryless decision” mode: each frame is decided without hidden cross-frame state
  • if unsafe/insufficient warrant → route to MRC (absorbing safe mode)

B) “Stress propagation” explainer (interactive)
- Provide 3 buttons:
  1) Single Worker anomaly (localized stress)
  2) Multi-Worker failure (Manager primary violation)
  3) Recovery via diffusion/load shedding
- Each button animates: Worker stress → Manager aggregate stress → Queen stress outcome,
  and shows what changes in routing (Normal vs Emergency mode).

C) “Hardware struct view” (demo-friendly, not vendor-specific)
- Show a readable struct-like panel for the hierarchy message:
  fields: nn votes, ensemble_confidence, agreement_bits, queen_decision, reason_bits, trace_scores.
- Add tooltips explaining each field and which role is responsible.

ROUTE 2 — /constitution : Constitutional Governance of Truth (roles as institutions)
Implement role tiles and flows for the constitutional offices:

A) Offices (tiles)
- The Archive (Custody of Canon):
  • maintains canon, scope, and versioned history
  • forbids untracked erasure; every revision is a lineage event
- The Proposers (Hypothesis and Interpretation):
  • generates hypotheses, plans, interpretations
  • has NO authority to canonize its own outputs
- The Verifiers (Warrant and Admissibility):
  • tests admissibility + warrant
  • must be structurally capable of disagreeing with Proposers
- The Adjudicators (Conflict Resolution):
  • resolves conflicts among warrants/claims by admissible evidence + declared standards
  • preserves ambiguity when evidence is insufficient
- The Auditor-General (Integrity Oversight):
  • audits constitutional compliance; can challenge canonizations and adaptations
- The Office of Blind-Spot Discovery:
  • protected challenger; cannot be penalized for raising credible challenges
  • owns the Unknown Register and enforces the Challenger Requirement
- Unknown Register (constitutional artifact):
  • records thin-evidence domains, untested assumptions, recurrent failure classes, degraded independence
  • travels across versions

B) Constitutional clauses (UI checklist)
Show the system’s “rights/duties” as enforceable checks:
- provenance / contestability / correction / scope / non-deception
- duty of restraint (don’t canonize when warrant is insufficient)
- anti-amplification (no “verified” posture without verification)
- anti-silent-drift (truth changes must appear as explicit constitutional events)
- self-reference constraint (internal agreement is not warrant)

ROUTE 3 — /runtime : LLM-in-hardware (bounded authority interfaces)
This route demonstrates how an LLM can exist in the stack WITHOUT becoming the safety authority.

A) Role assignment diagram (explicit)
- LLM role defaults to: Proposer (hypothesis/plan generation) and optionally Manager-assist (summarization for aggregation),
  but never Archive, never sole Verifier, never sole Adjudicator for high-consequence decisions.
- Hardware EPU roles:
  • Verifier primitives (invariants, admissibility gates, timing bounds) run in deterministic logic.
  • Queen authority can be implemented as a hardware state machine that only accepts admissible evidence.

B) “Interfaces” panel
- Define 4 typed interfaces (with example JSON messages):
  1) ProposeClaim (LLM → system): claim + scope + confidence + references
  2) SubmitEvidence (Worker/Manager → Verifier): witness packet + lineage
  3) VerifyClaim (Verifier → Adjudicator): admissible? warrant strength? dissent record?
  4) CanonizeOrRoute (Adjudicator/Queen → Archive/Control): canon update OR MRC routing
- Enforce: a claim cannot reach “Canon” unless VerifyClaim returns admissible + sufficient warrant.

C) “Timing + irreversibility boundary” explainer
- A small widget showing: if compute budget / watchdog bound is exceeded, the system bypasses deliberation and routes to MRC,
  and the event is logged for later adjudication (reviewable emergency power).

ROUTE 4 — /artifacts : What each role must output (traceability-first)
A) Agent output types library
- Gate decision (route/retain/drop)
- Mask over representation
- Scores/labels
- Atom Patch Set Δ (for decomposition-based interventions)
- Audit report + decision log table

B) Traceability Report Builder (role-aware)
- The form changes based on role:
  • Worker: evidence lineage fields + integrity/alignment/scope/replay flags
  • Manager: decision path (branching trace), composition operator (serial/parallel/gating), order justification
  • Verifier: admissibility verdict, warrant strength, independence/corroboration notes
  • Adjudicator: ruling + standard used + ambiguity preserved (if any)
  • Archive: canon version, scope, retraction rationale (if applicable)
- Export buttons:
  trace.json, report.json, delta.json (when Atom Patch Set Δ is involved)

ROUTE 5 — /simulator : Interactive “Claim Lifecycle”
A) Scenario picker (3 scenarios)
1) Clean sensing (independent corroboration exists)
2) Correlated sensors (corroboration collapses to one witness)
3) Drift + compute pressure (forces emergency routing)

B) Stepper: Hypothesis → Verification → Adjudication → Canon/MRC → Audit
- At each step show:
  • which role acted
  • what artifact was emitted
  • which constitutional checks passed/failed
  • resulting “degree of reliance” state

C) Failure demonstrations (must include)
- “Consensus is not warrant” test: multiple internal components agree but verification fails → cannot canonize.
- “Inadmissible evidence exclusion”: evidence fails integrity/alignment/scope/replay → excluded; system becomes conservative.
- “Challenger intervention”: Blind-Spot Office flags an Unknown Register entry → forces a challenge event and blocks canonization.

DESIGN / UX
- Engineering-doc aesthetic with clear diagrams, role cards, and state-machine badges.
- No external APIs; mocked data only; deterministic behavior.
- Every screen has a persistent “Why this was allowed / blocked” panel for transparency.
```

This prompt explicitly encodes:

* **Worker–Manager–Queen** hierarchy and stress/cascade behavior  
* The **hardware-oriented Worker→Manager→Queen decision struct** (votes, agreement bits, reason bits, queen decision, trace scores; “memoryless” framing) 
* The **constitutional separation of epistemic powers** (Archive, Proposers, Verifiers, Adjudicators) and independence requirement  
* **Admissibility + anti-amplification + anti-silent-drift** and emergency powers constraints  
* **Blind-spot discovery office, Unknown Register, Challenger requirement, self-reference constraint** 
* **Verification-before-fusion** for driverless perception (sensors as witnesses; integrity/alignment/scope/replay; inadmissible evidence excluded; safety monotonicity under uncertainty) 
* Role-linked **traceability artifacts** (decision path, Atom Patch Set Δ, audit report, decision log)   

  Below is a **fifth (wild-card) Lovable prompt** focused on the “missing layer” across the set: **operationalization**—how the narrative becomes an **ISA + runbook-grade monitoring/controls + diagrammatic ops views**, via the KTE reconstruction pipeline and PICAPD operational visualization suite.     

  ```text
  Build a standalone, complementary demonstration site titled:
  “PICAPD Ops Console: From Architecture → ISA → Live Monitoring”
  
  This site is NOT a repeat of the EPU gates, filtration taxonomy, or agent-role constitution pages.
  It exists to show the operational substrate: KTE reconstruction workflow, the PICAPD instruction set,
  and the monitoring/alerting/telemetry views that make the system run in production.
  
  ROUTES
  1) /kte-reconstruction
  2) /isa-explorer
  3) /microprograms
  4) /ops-console
  5) /diagram-gallery
  
  ROUTE 1 — /kte-reconstruction (Narrative → Operational System)
  Goal: make explicit the reconstruction pipeline:
  Extract → Synthesize → Validate → Compose → Route-to-deployment-context.
  
  Required content:
  - A “Transformation Principle” panel: financial narrative metrics are replaced with operational capacity metrics.
  - An interactive KTE pipeline diagram:
    Extract (core technical claims) → Synthesize (operational primitives) → Validate (physics-grounded units)
    → Compose (instruction set) → Router (deployment context).
  - Router selector with three contexts:
    (a) Autonomous systems (agent governance ISA),
    (b) scientific computing (variational computing ISA),
    (c) real-time control (constraint enforcement ISA).
  Switching context changes which operational objectives/thresholds are highlighted.
  
  Include KTE process design:
  - Phase 1 (specification): objective selection (safety/performance/energy) and constraint targets.
  - Phase 2 (synthesis): conservative/balanced/high-throughput operational paths.
  - Phase 3 (optimization): multi-objective weighting and a simple “Pareto tradeoff” visualization.
  All values can be illustrative placeholders, but the structure must be faithful and auditable.
  
  ROUTE 2 — /isa-explorer (PICAPD ISA as the executable layer)
  Goal: show the ISA as a readable, searchable, engineer-facing reference.
  
  Must include:
  - Instruction categories:
    1) Lagrangian operations (variational / action evaluation),
    2) constraint operations (set/clear/wait/test + register/unregister),
    3) population operations (spawn/terminate/aggregate/check realizability),
    4) event operations (broadcast/subscribe/filter/sync + queue ops),
    5) memory operations (LSM load/store, cache, flush/fetch/prefetch).
  - For each instruction:
    mnemonic, operands, function, nominal cycles/latency, nominal power (use doc values where present),
    and “side effects” (broadcast, rollback, unknown-registry logging).
  - Instruction encoding viewer:
    show the fixed-width encoding fields and an interactive “bitfield inspector”
    that highlights opcode, rd/rs fields, and immediate/extended payload.
  
  ROUTE 3 — /microprograms (How higher-level behaviors compile)
  Goal: demonstrate that high-level governance/constraint behavior is implementable as instruction sequences.
  
  Provide a library of short “microprograms” (each 6–20 instructions) with step-through execution:
  - Constraint lifecycle microprogram:
    register → test → wait → set/clear → timeout → recovery/escalation.
  - Event propagation microprogram:
    subscribe → filter threshold → broadcast → query/clear queue → multi-domain sync.
  - Population governance microprogram:
    spawn agent → aggregate moment μ0/μ1/μ2 → realizability check → adjust/terminate.
  - Memory provenance microprogram:
    MLOAD/MSTORE hot state in LSM → MCACHE shared state → MFLUSH archive/unknown entry.
  Each microprogram must:
  - produce an execution trace table,
  - emit a “why this instruction exists” explanation,
  - and generate exportable JSON (program.json + trace.json).
  
  ROUTE 4 — /ops-console (Monitoring, control, and runbook behaviors)
  Goal: show the production-facing control plane.
  
  Implement an interactive dashboard with these panels:
  A) State variables:
  - active cores / total cores
  - population size
  - constraint satisfaction percentage
  - current power vs peak envelope
  B) Performance metrics:
  - decisions/sec
  - average latency
  - unknown registry count + growth rate
  - archive growth rate
  C) Alert status:
  - warning/critical/emergency state machine view
  - example triggers (latency drift, power surge, temperature, constraint violations, constitutional breach)
  D) Next actions:
  - recommended hibernation/activation
  - trigger “increase validation depth” or “reduce throughput”
  - queue “arbiter review” or “unknown cluster validation”
  
  Include an “Alert Management” page section:
  - visual state machine for Normal → Warning → Critical → Emergency → Recovery → Shutdown,
  - table of corrective actions (what is automatic vs what is not overrideable).
  
  ROUTE 5 — /diagram-gallery (Operational visualizations as first-class artifacts)
  Goal: provide a browsable library of the mermaid diagrams used by ops and debugging.
  
  Gallery requirements:
  - Provide categories:
    System overview, sensor-to-decision dataflow, power state machine,
    hierarchical decision pipeline, worker/manager/queen internal flows,
    constraint lifecycle and dependency graphs, resource management (core activation, memory hierarchy),
    deployment topology maps (autonomy integration).
  - Each diagram card must:
    render the diagram,
    show the underlying mermaid source in a copy box,
    and include a “parameterize” mode where mock telemetry values update labels (e.g., cores active, power, latency).
  
  SIMULATION (shared across site)
  - Include a top-level “Run a simulated minute” control:
    it generates plausible telemetry and updates ops console + diagrams.
  - Include fault toggles:
    latency drift, unknown registry surge, constraint violation burst, event storm, memory pressure.
  Faults must visibly drive alerts and recommended actions.
  
  DESIGN / UX
  - Engineering-ops aesthetic: clear typography, card panels, trace tables, downloadable artifacts.
  - No external APIs; everything runs on mock telemetry and deterministic toggles.
  - A persistent “Auditability” ribbon:
    every displayed metric or decision has an “origin” (simulated source, rule, or microprogram trace).
  
  OUTPUT FILES
  - Allow exporting:
    kte_summary.json (selected objectives/weights/path),
    isa_selection.json (instructions referenced by microprograms),
    ops_snapshot.json (dashboard state),
    diagram_sources.zip (or a single downloadable JSON bundle of all mermaid sources).
  ```