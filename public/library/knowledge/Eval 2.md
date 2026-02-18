Eval 2



### Verdict (using the same “ISA-upgrade” lens)

This design-team “conversation doc” is **not usable as a spec input directly**, but it _is_ **contributive enough to keep**—because it contains a few concrete semantic kernels that can _directly_ inform PICAPD’s most underspecified areas (especially Context Flow and Safety/Constraint semantics).

The highest-value parts are where it:

* Replaces Boolean-style composition with a **bilinear coupling / witness object** (outer-product → characteristic matrix → invariant projection).

* Defines a **null-set tolerance** using trusted scalar functionals (trace/eigen summaries, etc.) and uses that as a hardware accept/reject boundary.

* Uses **domain restriction (admissible pairs)** based on conserved coordinates, i.e., “unsafe computation is non-representable because the operation is undefined / rejected when constraints fail.”

* Frames a **world-model coordinate map** built from invariants (trace/spectrum), which is exactly the kind of stable “programmer-visible meaning” you want behind moments/context.

### Why it matters for PICAPD specifically

PICAPD’s Context Flow is currently specified in a way that reads **Boolean-centric** (aggregate via OR/AND/MAJORITY/WEIGHT; synthesize via a Boolean decision function), and the selection/meaning of those functions is underspecified.  
Your design doc supplies a credible alternative: treat “aggregation/decision” as **invariant-bearing witness construction + invariant checks**, not truth tables.

Separately, the design doc’s null-set/tolerance framing gives you a clean way to rationalize and tighten tolerance semantics—especially since PICAPD already encodes `tol` as a numeric tolerance ladder with `tol=0` acting as “disabled” and `tol=127` strictest.

* * *

Pre-processing steps to turn it into ISA-upgrade material (keep + transform)
----------------------------------------------------------------------------

Think of the output as a **“Spec Supplement Pack”**: small, testable, ISA-mappable nuggets.

### 1) Strip it into “normative atoms”

Create three bins:

* **Normative candidates** (“MUST/SHALL” behavior you’re willing to commit to)

* **Non-normative rationale** (math analogies, motivation, citations)

* **Open parameters** (things the ISA must pin down)

Example normative atoms you can extract almost verbatim:

* Swap-defect admissible iff it lands in the null set under trusted invariants.

* Coupling is defined only on admissible pairs (domain restriction).

### 2) Build a one-page glossary + symbol table (and freeze names)

Right now the doc mixes Π/Φ/Ψ/μ/σ/τ/N informally across chat turns. You want a single canonical page:

* **μ**: coupling (outer product / symmetrized version)

* **Φ**: invariant coordinate map (trace/spectrum features)

* **N**: null set (tolerance band)

* **Adm**: admissible pair condition on conserved coordinates

### 3) Force every concept to map to programmer-visible state

For each atom, require: **inputs (regs/mem) → outputs (regs/mem) → flags/exceptions → determinism**.

This doc does _not_ currently specify:

* vector/matrix dimensions,

* numeric formats (float/fixed),

* deterministic eigen/trace computation rules,

* where “witness objects” live (Moment regs? Context regs? memory region?).

So pair it with a “likely project doc” (or create one) that pins down:

* witness vector length `n`,

* matrix layout (row/col major), alignment,

* allowed approximations (e.g., which spectral moments, which eigensolver, bounds),

* how `tol` maps to ε or to an interval [k_inf, k_sup].

### 4) Convert into an ISA delta focused on two hotspots

**Hotspot A — Context Flow:** replace underspecified Boolean aggregation/decision with a _modeful_ design:

* either extend CTX.AGG/CTX.SYNTH with a mode/CSR selecting “bilinear witness” vs legacy Boolean, or

* define a new instruction family for `WITNESS.COUPLE / WITNESS.PROJ / WITNESS.CHK`.

This is directly motivated by the doc’s “μ(a,b):=Π(a⊗b)” and “logic becomes invariant-preserving coupling rules.”

**Hotspot B — Safety/Constraint:** upgrade CONS.CHK-style checks from “single scalar sum” to “trusted functional(s) τ + null-set acceptance,” consistent with the doc’s enforcement boundary.

### 5) Produce a reference test harness before you touch opcode tables

A minimal test suite that makes the doc “real”:

* **Swap tests:** verify μ(a,b) vs σμ(b,a) differs only within N (or triggers Reject).

* **Admissibility tests:** pairs outside conserved-coordinate agreement must trap/return failure deterministically.

* **Coordinate stability tests:** Φ invariants stable under allowed representation changes (basis/symmetry transforms), per the world-model intent.

* * *
