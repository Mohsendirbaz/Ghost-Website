# The Architecture of Refusal — One-Page Summary

**Scope.** Within the Ghost Autonomy / EPU program, the *Architecture of Refusal* names the **consequence law** of a safety co-processor for autonomous driving: the bottom-up cascade that governs what an error is permitted to *do* on its way to the wheels. It originated as a standalone specification (*Architecture of Refusal v2.0*) and now lives as the structural spine ("Lane B," stages S0–S4) of the current *EPU v3.0 (AD-only)* design. It is the counterpart to the **authority law** — the top-down question of *who may decide*, which changes with the SAE autonomy level — whereas the consequence law is invariant across all levels.

**Central thesis: bound the error, don't eliminate it.** The program rejects the goal of a perception-and-planning stack that never errs, treating it as statistically unreachable and as exactly the gap ISO 21448 (SOTIF) calls *the unknown unsafe*. It substitutes a different commitment: make the consequences of error **bounded by construction**. Safety is reframed from a property of representational *accuracy* into a property of *constraint propagation*.

**The one invariant — monotonicity (antitone in risk).** Everything rests on a single law: as warrant for a benign interpretation falls and estimated risk rises, the set of permitted actuator commands may only ever **contract, never expand**. Formally, `R₁ ≤ R₂ ⟹ U_ad(R₂) ⊆ U_ad(R₁)`. Each layer is the same law in its own vocabulary — perception shrinks the admissible action set, memory shrinks the admissible interpretation set, actuation shrinks the convex command box. Lose monotonicity anywhere and the distinction between disciplined conservatism and a hallucinating stack collapses.

**The refusal chain (S0–S4).** The cascade is a single pipeline in which *each stage can only narrow what the next is permitted to do*:

| Stage | Function | Guarantee |
|---|---|---|
| **S0** | Trusted sensing & numerics | Every number feeding a safety margin is honest; rounding is biased to the safe side (Posit/quire, symplectic prediction, physics-diverse sensors) |
| **S1** | Fidelity gate (trusted scalar φ) | Discarded perceptual detail can only *shrink* the admissible set; φ is one-sided and over-estimates risk on error |
| **S2** | Layered safety filter | A guarantee proven cheaply on a reduced model projects onto the physical vehicle (CBF / RTF / Poisson) |
| **S3** | Risk-monotone actuation algebra | A convex (1-Lipschitz) projection, `MEET`-composed, with the rate-clamp applied **last** for bounded jerk |
| **S4** | Timing-contracted analog veto | A hardwired, electrically isolated guard that enforces narrowing *with electricity, not code*, and reaches the actuator first |

A slow-loop **governance overlay (Gov)** guards against silent policy drift on software updates but, by explicit disclosure, cannot stop a real-time hallucination — only the S4 guard does. A conjunctive, fail-closed **conformance gate** ANDs the stage guarantees into a single bit; any missing guarantee forces the **minimum-risk condition (MRC)**, a terminal absorbing safe state.

**Load-bearing design commitments.** (1) A **memoryless contraction hierarchy** (Worker → Manager → Queen) so no stored optimistic state survives for a hallucination to exploit downstream. (2) **Meet-only composition** — constraints combine by intersection, never union or average, so conservatism stacks. (3) **Terminal enforcement in physics, not software** — the last narrowing has no programmable path a compromised stack can reach. (4) **Fail-closed by default** to the MRC envelope.

**Evidentiary discipline.** The program preserves a strict seam between *measured*, *projected*, *proposed*, and *notional*. The **only measured timing in the entire corpus is the FPGA ≈ 32 ns intervention**; every ASIC latency, power, FIT, cost, and PICAPD opcode figure is projected or notional and labeled as such. Certification is targeted at ISO 26262 ASIL-D, ISO 21448 SOTIF, and UL 4600.

**The wager.** *Autonomous driving becomes certifiable rather than merely tested — not by proving the stack never errs, but by proving, in hardwired logic no software fault can reach past, that when it does err, the error has nowhere unsafe to go.*

---
*Sources: `EPU_v3.0_AD_ONLY_Design.md`; `Bounded_Autonomy_Memristive_Substrate_Technical_Reference.md` (§1, §2.2); `chap_05_09_safety_architecture.tex`. Within the Foundational Documents corpus.*
