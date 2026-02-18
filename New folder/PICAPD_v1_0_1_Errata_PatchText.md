# PICAPD ISA v1.0.1 — Errata Patch Text (paste-ready)

**Purpose**: Provide minimal, surgical corrections that (a) remove true contradictions, and (b) make instruction decoding/assembly unambiguous without re-laying the ISA.

**Input baseline**: *PICAPD Instruction Set Architecture (ISA) v1.0* (`ISA.pdf`).

---

## Patch 1 — Unify `tol` semantics (CRITICAL)

### 1A) §2.2 Immediate Formats — replace the `tol` bullet

**Find** (in §2.2 Immediate Formats):

> `tol: 7-bit tolerance specification (0=strict to 127=disabled)`

**Replace with**:

> `tol: 7-bit tolerance parameter.`
> 
> `tol = 0` **disables** the associated tolerance check (the instruction behaves as if the check passes).
> 
> `tol ∈ [1, 127]` encodes a numeric tolerance threshold `ε` as:
> 
> `ε = 10^(-tol/16)`.
> 
> **Monotonicity**: larger `tol` values enforce stricter checks (smaller `ε`).

### 1B) §4.6 CONS.CHK — clarify the bypass case

**Find** (in CONS.CHK operation):

> `X[rd] ← 1 if |Σinputs - Σoutputs| < 10^{-tol/16}, else 0`

**Replace with**:

> If `tol = 0`: `X[rd] ← 1` and no conservation comparison is performed.
> 
> If `tol ∈ [1,127]`: `X[rd] ← 1` iff `|Σinputs - Σoutputs| < 10^{-tol/16}`, else `0`.

### 1C) Appendix (Immediate Encoding Reference) — replace the `tol` paragraph

**Find** (Appendix `tol (7-bit tolerance)` block):

> `Encodes tolerance as 10^{-tol/16}`
> 
> `tol=0: 10⁻⁰ = 1 (disabled)`
> 
> `...`

**Replace with**:

> `tol (7-bit tolerance)`:
> 
> *Bits 6:0 in Type-S instructions.*
> 
> `tol = 0` disables the check (instruction behaves as if the check passes).
> 
> `tol ∈ [1,127]` encodes `ε = 10^{-tol/16}`.
> 
> **Examples** (approx.):
> 
> - `tol=32` → `ε = 10^-2 = 0.01`
> - `tol=64` → `ε = 10^-4 = 0.0001`
> - `tol=96` → `ε = 10^-6 = 0.000001`
> - `tol=127` → `ε ≈ 1.28×10^-8` (strictest)

### Conformance check (recommended add to test suite)

- `CONS.CHK rd, rs1, rs2, 0` **must always return** `X[rd]=1`.
- For `tol=32`, the pass/fail boundary must match `ε=0.01`.

---

## Patch 2 — Fix ESET encoding ambiguity (HIGH)

### Target: §4.1 Event Control Instructions — ESET entry

**Find** (ESET entry):

- `Format:   ESET rs1, imm12`
- `Encoding: [0000011][rs1][000][rs1][imm12]`

**Replace with**:

- `Format:   ESET rd, imm12`
- `Encoding: [0000011][rd][000][00000][imm12]`

**Replace the Operation text with**:

> `event[imm12[8:0]] ← 1`.
> 
> **Wake semantics (architectural)**: any EPU stalled in `EWAIT imm12` must be eligible to resume after the event becomes 1.
> 
> **Broadcast semantics (masked)**: if `X[rd] != 0`, the implementation shall additionally initiate a wake/broadcast to EPUs selected by the bitmask `X[rd]` (platform-defined transport). If `X[rd] == 0`, no masked broadcast is required beyond waking `EWAIT` waiters.

**Notes**:
- This resolves the duplicated-field encoding by using the existing `rd` field as the mask operand and forcing `rs1=0`.
- The assembly example `ESET x5, 42` remains valid (the first operand is now `rd`).
- `EBCAST imm12, rs1` remains the explicit “broadcast state to mask” operation.

---

## Patch 3 — Resolve Type-S vs TMR.VOTE field collision (CRITICAL)

### 3A) §2.1.6 Type‑S (Safety/Constraint) — add a specialization rule

**Add the following paragraph under the Type‑S diagram**:

> **Type‑S tail field interpretation**:
> 
> - For `funct3 != 011`, bits `[6:0]` are interpreted as `tol`.
> - For `funct3 == 011` (**TMR.VOTE**), bits `[4:0]` are interpreted as `rs3` and bits `[6:5]` are reserved and must be `00`.

### 3B) §4.6 TMR.VOTE — replace encoding line + add reserved-bits requirement

**Find**:

> `Encoding: [0101011][rd][011][rs1][rs2][rs3]`

**Replace with**:

> `Encoding: [0101011][rd][011][rs1][rs2][00|rs3]`
> 
> where `rs3` is encoded in bits `[4:0]` and bits `[6:5]` must be `00`.

**Add** (under Exceptions/Notes):

> If bits `[6:5] != 00`, the instruction shall trap as `IllegalInstruction`.

---

## Patch 4 — Resolve Type‑V vs VERLET/HAMILT operand count (CRITICAL)

The v1.0 text currently refers to `rs3:rs4` inside the Type‑V `funct7` field, which cannot encode two 5‑bit register indices.

### 4A) §7.2.3 PICAPD‑Specific CSRs — add bitfields to `mvariational` (0x806)

**Under the CSR table entry for `0x806 mvariational`**, add:

> `mvariational` (0x806) — Variational mechanics control
> 
> - Bits `[4:0]`   `vrs3` : additional source register index (bank implied by instruction)
> - Bits `[9:5]`   `vrs4` : additional source register index (bank implied by instruction)
> - Bits `[15:10]` reserved (0)
> - Bits `[31:16]` implementation-defined / reserved

**Bank rule** (normative):
- For `VERLET`, `vrs3` refers to an **M-register index** and `vrs4` refers to an **F-register index**.
- For `HAMILT`, `vrs3` and `vrs4` both refer to **M-register indices**.

### 4B) §4.7 Variational Mechanics — VERLET encoding + operand sourcing

**Find** (VERLET entry):

- `Format:   VERLET rd, rs1, rs2, rs3, rs4`
- `Encoding: [0111011][rd][100][rs1][rs2][rs3:rs4]`

**Replace with**:

- `Format:   VERLET rd, rs1, rs2`
- `Encoding: [0111011][rd][100][rs1][rs2][0000000]`

**Replace Operation text with**:

> Let `rs3 = CSR[mvariational].vrs3` and `rs4 = CSR[mvariational].vrs4`.
> 
> `M[rd] ← 2·M[rs1] − M[rs2] + M^{-1}[rs3] · F · (Δt)^2`, where `Δt = F[rs4]`.

### 4C) §4.7 Variational Mechanics — HAMILT encoding + operand sourcing

**Find** (HAMILT entry):

- `Format:   HAMILT rd, rs1, rs2, rs3, rs4`
- `Encoding: [0111011][rd][101][rs1][rs2][rs3:rs4]`

**Replace with**:

- `Format:   HAMILT rd, rs1, rs2`
- `Encoding: [0111011][rd][101][rs1][rs2][0000000]`

**Replace Operation text with**:

> Let `rs3 = CSR[mvariational].vrs3` and `rs4 = CSR[mvariational].vrs4`.
> 
> `F[rd] ← H = ½ q̇ᵀ·M₀·q̇ + ½ qᵀ·K₀·q`, where `q=M[rs1]`, `q̇=M[rs2]`, `M₀=M[rs3]`, `K₀=M[rs4]`.

### Conformance check (recommended add)

- If `mvariational.vrs3/vrs4` are not set (implementation may reset to 0), then a program that relies on nonzero values must explicitly write them before `VERLET/HAMILT`.
- `VERLET/HAMILT` must trap `IllegalInstruction` if the `funct7` field is nonzero.

---

## Patch index (what this unblocks)

- **Assembler/compiler correctness**: single `tol` convention + well-defined bypass.
- **Decoder correctness**: ESET encoding no longer duplicates fields.
- **Implementability**: TMR.VOTE and VERLET/HAMILT become representable under fixed 32-bit encoding.

