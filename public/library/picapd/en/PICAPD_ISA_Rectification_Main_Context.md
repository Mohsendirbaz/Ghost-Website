# PICAPD ISA Rectification & Upgrade: Unified Main Context

**Document Purpose**: Synthesize insights from 5 project domains to provide actionable ISA rectification guidance  
**Target Audience**: ISA specification authors, ASIC/FPGA implementers, compiler developers  
**Scope**: PICAPD v1.0 → v1.1/v2.0 normative improvements  
**Date**: February 2026

---

## Executive Summary

This document consolidates findings from cross-domain analysis of Ghost Autonomy's technical architecture, mathematical foundations, and implementation requirements to identify **highest-impact rectifications** for the PICAPD Instruction Set Architecture. The analysis spans:

1. **Ghost/PICAPD ISA Foundation** (Stop 1): Core ISA spec, bilinear coupling framework, Byzantine consensus
2. **Signal Processing & Tensor Frameworks** (Stop 2): Elliptic filters, governing equation compatibility, diffusion gaps
3. **EPU/Ghost Architecture** (Stop 3): Worker→Manager→Queen hierarchy, Byzantine protocol, pipeline specs
4. **Harmonic Analysis** (Stop 4): Transform dimension contracts, topological vector spaces, AGM foundations
5. **Bitvector Data Contracts** (Stop 5): Fixed-point formats, perception pipeline stages, ASIC boundaries

**Key Finding**: PICAPD v1.0 contains solid architectural vision but suffers from **underspecified semantics** in critical areas. The ISA can achieve implementability and certification-readiness through targeted normative additions without major opcode reallocation.

---

## Part I: Critical Gaps & Recommended Fixes

### 1. Tolerance Semantic Inversion (§2.2 vs Appendix A.2)

**Problem**: Contradictory `tol` encoding conventions
- Main text (§2.2): "0=strict to 127=disabled"
- Appendix A.2: `tol` encodes as `10^(-tol/16)` with "tol=0 disabled, tol=127 strictest"

**Impact**: Assemblers, compilers, and hardware will implement opposite semantics  
**Priority**: **CRITICAL** (breaks binary compatibility)

**Recommended Fix**:
```
Single-source-of-truth convention (choose one):
Option A (Appendix semantics - RECOMMENDED):
  tol=0   → tolerance disabled (constraint check bypassed)
  tol=127 → strictest (ε ≈ 1.28×10⁻⁸)
  
Normative formula:
  ε = 10^(-tol/16)  for tol > 0
  ε = ∞             for tol = 0 (check disabled)

Monotonicity guarantee:
  "Larger tol values enforce stricter tolerances (smaller ε)"
```

**Implementation Note**: Add CSR bit to select tolerance-disabled behavior if needed for debugging.

---

### 2. Type-E ESET Operand Field Mismatch

**Problem**: Type-E format has both `rd` and `rs1` fields, but ESET encoding description uses `rs1` for both positions

**Encoding Ambiguity**:
```
Type-E format:  [opcode][rd][funct3][rs1][imm12]
ESET described: rs1 occupies rd slot, imm12 is event register index
```

**Impact**: Assembler/decoder disagreement on operand meaning  
**Priority**: **HIGH** (affects all event control instructions)

**Recommended Fix** (Option A - Preferred):
```
Redefine ESET assembly syntax:
  ESET rd, imm12
  
Where:
  rd    = broadcast mask register (X[rd] contains EPU mask)
  imm12 = event register index (0-511)
  rs1   = forced to 0 (unused)

Semantic:
  Set event[imm12] ← 1
  Broadcast wake signal to EPUs where (X[rd] & EPU_mask) != 0
```

**Alternative (Option B)**: Add explicit Type-EB (Event Broadcast) format with dedicated fields.

---

### 3. Multi-Source Register Encoding Conflicts

**Problem**: Type-S and Type-V formats allocate tail bits differently than actual instructions require

**Specific Conflicts**:
- **Type-S**: Allocates bits [6:0] to `tol`, but `TMR.VOTE` claims `rs3` in that position
- **Type-V**: Allocates bits [31:25] to `funct7`, but `VERLET`/`HAMILT` claim `rs3, rs4` there

**Impact**: Cannot decode 3+ source instructions; impossible to implement as specified  
**Priority**: **CRITICAL** (affects safety-critical TMR voting)

**Recommended Fix**:
```
Introduce extended formats:

Type-S3 (Safety with 3 sources):
  31    25 24  20 19  15 14  10 9   7 6      0
  ┌───────┬─────┬─────┬─────┬─────┬────────┐
  │  rs3  │ rs2 │ rs1 │  rd │func3│ opcode │
  └───────┴─────┴─────┴─────┴─────┴────────┘
  
  tol field moved to CSR or immediate variant

Type-V4 (Variational with 4 sources):
  31    27 26  25 24  20 19  15 14  10 9   7 6      0
  ┌───────┬─────┬─────┬─────┬─────┬─────┬────────┐
  │  rs4  │ rs3 │ rs2 │ rs1 │  rd │func3│ opcode │
  └───────┴─────┴─────┴─────┴─────┴─────┴────────┘

Usage:
  TMR.VOTE  rd, rs1, rs2, rs3  (Type-S3)
  VERLET    rd, rs1, rs2, rs3, rs4  (Type-V4)
```

**Alternative**: Use CSR to specify extra operands (slower but preserves 32-bit encoding).

---

### 4. Context Flow Selection Rules Underspecified

**Problem**: CTX.AGG and CTX.SYNTH reference aggregation/decision functions without defining:
- How function `f ∈ {OR, AND, MAJORITY, WEIGHT}` is selected
- Slice-to-EPU mapping determinism
- Slice count (implied 10 from 1024-bit ÷ 100-bit, but padding unspecified)

**Impact**: Non-portable implementations; behavioral divergence across EPUs  
**Priority**: **HIGH** (core to population-governed architecture)

**Recommended Fix**:
```
Add Context Control CSR (CTXCTL):
  Bits [3:0]   = AGG_MODE   (0=OR, 1=AND, 2=MAJORITY, 3=WEIGHT)
  Bits [7:4]   = SYNTH_MODE (0=FIRST, 1=VOTE, 2=WEIGHT, 3=MIN_RISK)
  Bits [15:8]  = SLICE_COUNT (number of valid slices, ≤10)
  Bits [23:16] = EPU_STRIDE (for non-contiguous EPU allocation)

Slice partitioning (normative):
  1024-bit context → 10 slices of 100 bits (24 bits padding at end)
  Slice i → EPUs [i×EPU_STRIDE : (i+1)×EPU_STRIDE - 1]

Aggregation semantics:
  OR:       bitwise OR across slices
  AND:      bitwise AND across slices
  MAJORITY: bit set if >50% of slices set it
  WEIGHT:   weighted sum using slice-specific weights from M-regs
```

---

### 5. AGM/Elliptic Category Lacks Normative Definitions

**Problem**: Opcode 0010011 allocated to AGM.ITER, ELI.COMP, TXF.PASS but no instruction semantics provided

**Missing Specifications**:
- Complete elliptic integral K(k) evaluation method
- Numerical precision requirements
- Valid modulus domain (typically 0 < k < 1)
- Pole-zero computation for elliptic filters
- Transfer function passivity check algorithm

**Impact**: Cannot implement; category appears as placeholder  
**Priority**: **MEDIUM** (not critical path if deferred to software)

**Recommended Fix** (based on Stop 2 mathematical analysis):
```
AGM.ITER rd, rs1, rs2
  Arithmetic-Geometric Mean iteration:
    a_new = (a + g) / 2
    g_new = sqrt(a × g)
  
  Input:  A[rs1] = {a}, A[rs2] = {g}
  Output: A[rd]  = {a_new, g_new}
  
  Convergence: Stop when |a - g| < ε (ε from tolerance CSR)

ELI.COMP rd, k_modulus
  Compute complete elliptic integral K(k):
    K(k) = ∫₀¹ dt / √[(1-t²)(1-k²t²)]
  
  Algorithm: AGM-based (Landen transformation)
    K(k) = π / (2 × AGM(1, √(1-k²)))
  
  Input:  F[k_modulus] ∈ (0, 1)
  Output: F[rd] = K(k)
  Precision: Relative error < 10⁻¹² (double precision)
  Exception: Trap if k ≥ 1 (singularity)

TXF.PASS rd, num_ptr, den_ptr, order
  Transfer function passivity check:
    H(s) = N(s) / D(s) is passive iff Re[H(jω)] ≥ 0 for all ω
  
  Input:  
    M[num_ptr] = numerator coefficients (n+1 values)
    M[den_ptr] = denominator coefficients (n+1 values)
    order = polynomial degree n
  Output:
    X[rd] = 1 if passive, 0 otherwise
  
  Method: Frequency sweep on Nyquist plot or root locus analysis
```

---

### 6. Byzantine Consensus State Machine Unspecified

**Problem**: BYZ.CONS instruction claims "Execute 3-phase Byzantine consensus" but:
- No participant count register
- No message buffer format
- No phase transition semantics
- No timeout/termination conditions
- No memory layout for consensus state

**Impact**: Cannot implement; appears to require full distributed systems protocol in one instruction  
**Priority**: **MEDIUM-HIGH** (core differentiator but may belong in platform spec)

**Recommended Fix** (re-scope as primitive + software protocol):
```
Option A: ISA Primitive Approach
  BYZ.CONS provides minimal hardware support:
  
  BYZ.SEND phase, msg_ptr, participant_mask
    Broadcast message to participants
    Hardware ensures authenticated delivery
  
  BYZ.RECV phase, msg_buf, timeout
    Collect messages from current phase
    Returns count of valid messages received
  
  BYZ.VOTE threshold, msg_buf
    Apply threshold rule (2f+1 for Byzantine)
    Returns consensus value or CONFLICT flag
  
  Software implements 175-step protocol using these primitives

Option B: Full State Machine (if hardware-accelerated)
  Add Byzantine Consensus Unit (BCU) with:
    - Participant registry (up to 256 agents)
    - Message buffer (ring queue, authenticated)
    - Phase counter (0=broadcast, 1=echo, 2=ready)
    - Timeout timer
    - Consensus result register
  
  BYZ.CONS becomes multi-cycle operation (1.5μs typical)
  Requires platform spec chapter defining BCU architecture
```

**Recommendation**: Option A for v1.1 (keep ISA minimal), Option B for v2.0 if ASIC includes BCU.

---

### 7. Moment Operations Lack Memory Layouts

**Problem**: MOM.* instructions reference distributions and moment vectors without specifying:
- Element stride and ordering
- Numerical format (float64? fixed-point?)
- Distribution normalization requirements
- Realizability constraint formulas

**Impact**: Implementations will diverge on data layout; interoperability broken  
**Priority**: **HIGH** (core to population balance framework)

**Recommended Fix**:
```
Canonical Moment Data Layouts:

Distribution format (at X[rs1]):
  struct distribution {
    uint32_t count;        // number of samples
    uint32_t stride;       // bytes between samples
    uint64_t samples[];    // FP64 values (normalized)
  };
  
  Normalization: Σ samples[i] = 1.0 (probability distribution)

Moment vector format (M-registers):
  M[i]   = μ₀  (zeroth moment, mass/count)
  M[i+1] = μ₁  (first moment, mean)
  M[i+2] = μ₂  (second moment, variance)
  M[i+3] = μ₃  (third moment, skewness)
  
  Each moment: FP64 or Q32.32 fixed-point

Realizability constraints (Hausdorff conditions):
  μ₀ ≥ 0                    (non-negative mass)
  μ₁² ≤ μ₀ · μ₂              (Cauchy-Schwarz)
  |μ₃| ≤ μ₂^(3/2)            (higher-order bound)

MOM.REAL instruction:
  Check all realizability constraints
  Return bitmask: bit[i]=1 if constraint i violated
```

---

### 8. Fixed-Point Formats Informal

**Problem**: Documents mention Q16.16, Q10.6, Q8.8 but PICAPD ISA doesn't normatively define:
- Encoding semantics
- Overflow/underflow behavior (saturate vs wrap)
- Rounding modes
- Range and precision tables

**Impact**: Arithmetic operations produce platform-dependent results  
**Priority**: **MEDIUM-HIGH** (affects numerical stability)

**Recommended Fix** (Add Annex B: Fixed-Point Arithmetic):
```
Qm.n Format Definition:
  Total bits: m + n
  Integer bits: m (includes sign bit for signed)
  Fractional bits: n
  
  Value interpretation (signed):
    value = (int32_t)bits × 2^(-n)
  
  Range (signed Qm.n):
    [-2^(m-1), 2^(m-1) - 2^(-n)]

Standard Formats:
  Q16.16: [-32768, 32767.999985], precision = 1/65536
  Q10.6:  [-512, 511.984375],     precision = 1/64
  Q8.8:   [0, 255.99609375],      precision = 1/256 (unsigned)
  Q7.9:   [-64, 63.998],          precision = 1/512
  Q3.13:  [-4, 3.999878],         precision = 1/8192

Overflow Behavior (CSR-selectable):
  Mode 0: Saturate (clamp to [min, max])
  Mode 1: Wrap (modulo arithmetic)
  Mode 2: Trap (raise exception)

Rounding Modes:
  Mode 0: Truncate (toward zero)
  Mode 1: Round-to-nearest (tie to even)
  Mode 2: Round-toward-positive-infinity
  Mode 3: Round-toward-negative-infinity
```

---

## Part II: Architectural Enhancements from Domain Analysis

### A. Bilinear Coupling & Witness Objects (from Stop 1)

**Concept**: Replace Boolean composition (A AND B) with admissible bilinear coupling based on conserved coordinates

**Relevance to PICAPD**:
- Context Flow (CTX.AGG) currently uses Boolean operators
- Bilinear witness framework provides rigorous basis for regime composition
- Admissibility = conserved-coordinate compatibility

**Proposed Enhancement**:
```
Add witness object coupling instructions:

WITNESS.COUPLE rd, rs1, rs2
  Compute outer product: μ(i,j) = a_i ⊗ a_j^T
  Input:  A[rs1] = witness vector i
          A[rs2] = witness vector j
  Output: M[rd] = coupled characteristic matrix
  
  Admissibility check: 
    Compare conserved coordinates c_i vs c_j
    Trap if |c_i - c_j| > tolerance (null-set violation)

WITNESS.PROJ rd, rs1
  Project coupled object onto invariant coordinates:
    z = Ψ(μ) extracts basis-invariant features
  Input:  M[rs1] = coupled matrix μ
  Output: M[rd] = invariant coordinate vector z
  
  Method: Spectral decomposition (trace, eigenvalues)

Conserved Coordinate Comparison:
  c_i = (c_shared, u_i)  // split into conserved + free
  Admissible iff: c_shared matches exactly (or within tolerance)
```

**Benefit**: Provides principled alternative to Boolean context aggregation; blocks unsafe compositions by construction.

---

### B. Governing Equation × Control Compatibility (from Stops 2-3)

**Finding**: PICAPD's equation-control alignment is theoretically sound but underspecified

**Compatibility Matrix Validation**:
```
Hyperbolic + MPC:  ✓✓✓  (finite propagation → predictable horizons)
Parabolic + MPC:   ✓✓✓  (smoothing → stable gradients)
Transport + MPC:   ✓✓✓  (advection → trajectory optimization)
ODE + RL:          ✓✓✓  (low-dim state → sample efficiency)
```

**Recommendation**: Add normative equation-control pairing constraints
```
Add Instruction Attribute Tags:
  Each instruction declares:
    - Primary equation class: {H, P, T, O}
    - Compatible control regime: {MPC, RL, Topology}
  
  Constraint checker (optional CSR-enabled):
    Warns if instruction sequence mixes incompatible pairs
    Example: Hyperbolic sensor fusion feeding RL controller
             (loses predictability guarantees)
```

---

### C. Diffusion Borrowing Gaps (from Stop 2)

**Problem**: Parabolic operations (Learning D₅, Compliance D₁₀) risk importing "diffusion" metaphor without physics dependencies

**Missing Dependencies When Borrowing Diffusion**:
- No defined diffusing field u(x,t)
- No domain geometry (metric space)
- No empirically fitted diffusivity α
- No boundary conditions
- No source/sink terms
- No calibration/falsifiability

**Recommended Additions**:
```
For any Parabolic-tagged instruction, require:

1. Diffusivity CSR (DIFF_ALPHA):
   Material-specific or learned diffusion constant

2. Boundary Condition Register (BNDRY_COND):
   Encodes: Dirichlet, Neumann, Robin, Periodic

3. Source Term Specification:
   Optional register for injection/decay rates

4. Domain Specification:
   Physical extent, discretization, metric

Example: Gradient Diffusion in Learning
  GRAD.DIFFUSE rd, gradient_field, timestep
    Applies: ∂u/∂t = α∇²u
    
    Requires:
      DIFF_ALPHA = learning rate / stability constant
      BNDRY_COND = periodic (parameter space wraps)
      Domain = parameter manifold geometry
```

---

### D. Transform Dimension Contracts (from Stop 4)

**Finding**: 2D separable transforms require explicit dimension matching

**Key Constraint**:
```
For F = A_M · f · A_N^T:
  - A_M must be M×M (acts on M rows of f)
  - A_N must be N×N (acts on N columns of f)
  - f is M×N (not necessarily square)
```

**Recommended Instruction Enhancement**:
```
TXF.2D rd, matrix_M, matrix_N, data_ptr, M_dim, N_dim
  
  Validates:
    matrix_M.rows == matrix_M.cols == M_dim
    matrix_N.rows == matrix_N.cols == N_dim
    data[data_ptr] is M_dim × N_dim
  
  Computes:
    result = matrix_M · data · matrix_N^T
  
  Exception:
    Trap if dimension mismatch detected
```

**FFT Convolution Padding Rule**:
```
For linear convolution via FFT:
  f (length P) * g (length Q) requires N ≥ P+Q-1 padding
  
CONV.FFT rd, f_ptr, g_ptr, P, Q, N
  
  Precondition check:
    if (N < P + Q - 1) trap(INSUFFICIENT_PADDING)
  
  Algorithm:
    F = FFT(f, N)
    G = FFT(g, N)
    H = F .* G  (element-wise multiply)
    h = IFFT(H, N)
    return h[0 : P+Q-2]  (trim to valid range)
```

---

### E. Moment Operations in Tempered Setting (from Stop 4)

**Finding**: Population moments should live in tempered distribution space 𝒮' for Fourier stability

**Topological Requirement**:
```
Schwartz space hierarchy:
  𝒮(ℝⁿ) = rapid decay functions (test functions)
  𝒮'(ℝⁿ) = tempered distributions (dual space)
  
Key property:
  Fourier transform: ℱ: 𝒮' → 𝒮' (continuous isomorphism)
  Convolution: 𝒮' * 𝒮 → 𝒮' (closed operation)
```

**Normative Addition**:
```
All moment distributions shall be tempered:
  |f(x)| ≤ C(1 + |x|)^N for some C, N
  
This ensures:
  - Fourier transform exists and is tempered
  - Convolution stability (fusion operations)
  - Polynomial growth bounds (no exponential blow-up)

MOM.CALC validation:
  Check distribution tail behavior
  Warn if |f(x)| grows faster than polynomial
  (Indicates non-tempered distribution → may violate assumptions)
```

---

### F. Rank-1 Constraint Projection (from Stop 4)

**Finding**: Many constraints form rank-1 or low-rank manifolds; use pseudoinverse for projection

**Application to CONS.CHK**:
```
Current: Binary pass/fail check
Enhanced: Projection onto nearest feasible point

CONS.PROJECT rd, rs1, constraint_type
  
  For rank-1 constraint: A·x = b where A = u·v^T
    Pseudoinverse: A^+ = (1/(|u|²|v|²))·v·u^T
    Projection: x_feasible = x - A^+·(A·x - b)
  
  Constraint types:
    0 = Linear equality (Ax = b)
    1 = Moment realizability (μ₁² ≤ μ₀·μ₂)
    2 = Sum-to-one simplex (Σx_i = 1, x_i ≥ 0)
    3 = Unit norm sphere (|x| = 1)
  
  Output:
    X[rd] = projected feasible point (geodesic shortest path)
```

**Benefit**: Transforms hard violations into soft corrections; enables gradient-based optimization on constraint manifolds.

---

## Part III: Platform Specification Requirements

### Platform-Level vs ISA-Level Boundaries

**Finding**: Many underspecified areas belong in **Platform Specification Annex**, not ISA core

**Recommended Separation**:

**ISA (Instruction Semantics)**:
- Instruction encoding formats
- Register file architecture
- Data representation (fixed-point, etc.)
- Exception types
- Memory ordering model (abstract)

**Platform Spec (Implementation Details)**:
- EPU topology (100 Workers, 10 Managers, 1 Queen)
- Physical interconnect (NoC bandwidth, arbitration)
- Byzantine consensus protocol (175-step state machine)
- Event broadcast mechanism (multicast vs hierarchical)
- Clock domains and CDC (clock domain crossing)
- Power/thermal management
- DMA transfer formats
- Sensor interface protocols

**Example: Event Control (ESET/EWAIT)**:
```
ISA Definition:
  ESET: Set event register, notify waiting cores
  EWAIT: Block until event set or timeout
  
  Architectural guarantees:
    - At-least-once delivery (event may wake multiple waiters)
    - No starvation (bounded latency)
    - Causality (ESET before EWAIT → wake guaranteed)

Platform Spec:
  - Event register implementation (distributed vs centralized)
  - Broadcast tree topology (binary tree, mesh, bus)
  - Wakeup latency bounds (implementation-dependent)
  - Power gating during wait (optional)
```

---

### Memory Model Formalization

**Problem**: §5 describes release consistency, event ordering, WAL conceptually but lacks formalization

**Recommended Addition** (Annex: Memory Model):
```
Happens-Before Relation (⊑):
  a ⊑ b if:
    1. a and b on same EPU and a precedes b in program order, OR
    2. a is ESET(e) and b is EWAIT(e) that returns, OR
    3. a ⊑ c and c ⊑ b (transitivity)

Memory Ordering Axioms:
  1. If store S ⊑ load L and same address → L sees S
  2. Stores to same address totally ordered
  3. Event dependencies enforce ordering across EPUs

Litmus Test Example:
  EPU0:              EPU1:
  X[r1] = 1          EWAIT event[0]
  ESET event[0]      r2 = X[r1]
  
  Outcome: r2 must see value 1 (not 0)
  Reason: ESET ⊑ EWAIT by definition
```

---

### Write-Ahead Log (WAL) Specification

**Problem**: SAFE.ROLL depends on WAL but WAL is undefined

**Recommended Addition**:
```
WAL Record Format:
  struct wal_record {
    uint64_t seq_num;      // monotonic sequence
    uint64_t timestamp;    // cycle counter
    uint16_t epu_id;       // originating EPU
    uint8_t  record_type;  // STORE, LOAD, CSR_WRITE, etc.
    uint64_t address;      // memory address
    uint64_t old_value;    // pre-update value
    uint64_t new_value;    // post-update value
    uint32_t checksum;     // CRC32 or similar
  };

Commit Marker:
  Special record type = COMMIT
  All records since last COMMIT are atomic unit

SAFE.ROLL operation:
  1. Find last COMMIT marker in WAL
  2. Replay all records from COMMIT forward
  3. Restore architectural state to post-COMMIT point
  4. Discard uncommitted work
  
Minimum Coverage:
  - All stores to memory
  - All CSR writes
  - Event register state
  - Optionally: GPR/FPR snapshots
```

---

## Part IV: Certification & Safety Considerations

### ASIL-D Compliance Pathway

**Findings from Stops 1, 3, 5**:
- Ghost targets ASIL-D (automotive safety integrity level)
- Byzantine consensus provides fault tolerance
- Hardware constraint enforcement prevents unsafe states

**ISA Support for Certification**:

```
1. Determinism Requirements:
   - All instructions deterministic (no undefined behavior)
   - Floating-point modes explicit (rounding, NaN handling)
   - Timing observable (cycle-accurate or bounded)

2. Fault Detection Mechanisms:
   - TMR.VOTE for triple modular redundancy
   - BYZ.CONS for Byzantine fault tolerance
   - CONS.CHK for constraint violations
   
   Add: Fault injection hooks (test mode CSR)
   
3. Error Handling:
   - All exceptions well-defined
   - Recovery paths specified (SAFE.ROLL)
   - Graceful degradation modes

4. Traceability:
   - Instruction provenance (who issued what)
   - Decision audit trails (CTX.* operations)
   - Timestamp all critical events

Add Certification Annex:
  - Fault model (stuck-at, transient, Byzantine)
  - Coverage analysis (% of faults detected)
  - Safe state transitions
  - Verification methodology
```

---

### Safety Invariants as ISA Constraints

**Principle**: "Unsafe computation must be impossible to express"

**Mechanisms** (from Stop 1 core philosophy):

**A. Non-Encodable States**:
```
Use representations where invalid values cannot exist:
  - Saturating arithmetic (Q formats with clamp)
  - Bounded fixed-point (overflow → saturation not wrap)
  - Simplex constraints (angles as unit vectors: sin²θ + cos²θ = 1)
  
Example:
  Variance cannot go negative → encode as Q format that clamps at 0
```

**B. Non-Routable Paths**:
```
Architectural topology: no hardware bypass route
  - Single actuation choke-point
  - No debug path to actuators in production
  - Validator block required to reach actuator bus
  
ISA implication:
  No instruction can directly write to actuator registers
  Must pass through CONS.CHK → SAFE.ROLL → BYZ.CONS → ACT.EXEC
```

**C. Non-Authorizable Actions**:
```
Unsafe actions require capability that cannot be forged:
  - Hardware-minted tokens
  - Cryptographic signatures
  - Quorum gates (N-of-M approval)
  
Example:
  Emergency brake override requires:
    1. CONS.CHK passes all safety constraints
    2. BYZ.CONS achieves ⌊(n-1)/3⌋ + 1 agreement
    3. Hardware capability token issued
    4. Only then can ACT.EXEC accept brake command
```

---

## Part V: Implementation Roadmap

### Phased Rectification Strategy

**Phase 1: Critical Fixes (v1.0 → v1.0.1 Errata)**
- Tolerance semantic unification (§2.2 ↔ Appendix A.2)
- ESET operand field clarification
- TMR.VOTE / VERLET encoding fixes (Type-S3, Type-V4)

**Phase 2: Normative Additions (v1.1)**
- Fixed-point format annex
- Memory model formalization
- Context Flow CSR specification
- Moment operation layouts
- WAL record format

**Phase 3: Feature Extensions (v1.2)**
- AGM/Elliptic instruction semantics
- Bilinear witness coupling (WITNESS.*)
- Constraint projection (CONS.PROJECT)
- Byzantine state machine (if hardware-accelerated)

**Phase 4: Platform Specification (separate document)**
- EPU topology
- Interconnect protocols
- Event broadcast mechanism
- Power/thermal management
- DMA formats

**Phase 5: Certification Package (v2.0)**
- ASIL-D compliance artifacts
- Formal verification hooks
- Fault injection test suite
- Traceability matrix

---

## Part VI: Cross-Reference to Source Documents

### Stop 1: Ghost/PICAPD ISA Foundation
- **PICAPD ISA v1.0**: Complete instruction formats, opcode allocation
- **Bilinear Coupling Framework**: Admissible pairs, conserved coordinates, witness objects
- **Byzantine Consensus**: 3-phase protocol, 1.5μs latency, ⌊(n-1)/3⌋ tolerance
- **Core Philosophy**: Non-encodable, non-routable, non-authorizable safety mechanisms

### Stop 2: Signal Processing & Tensor Frameworks
- **Elliptic Filter Design**: Complete elliptic integral K(k), AGM iteration, filter order formula
- **Governing Equations**: Hyperbolic (wave), Parabolic (diffusion), Transport (advection), ODE
- **Diffusion Borrowing Gaps**: Missing diffusivity, boundaries, source terms, calibration
- **Neural Network Merging**: 7 epistemic laws (reference, measurement, symmetry, coherence, domain)

### Stop 3: EPU/Ghost Architecture
- **Worker→Manager→Queen Hierarchy**: 100→10→1 compression, 89.7:1 ratio
- **Byzantine Protocol**: 175-step, O(n²) messages per phase, <1.5μs total
- **6-Stage Pipeline**: Reception → Preprocessing → Features → Fusion → Temporal → Decision
- **Fixed-Point Formats**: Q16.16, Q10.6, Q8.8, Q7.9, Q3.13 specifications

### Stop 4: Harmonic Analysis
- **2D Separable Transforms**: A_M (M×M) × f (M×N) × A_N^T (N×N) dimension matching
- **FFT Convolution**: N ≥ P+Q-1 padding rule for linear convolution equivalence
- **Topological Vector Spaces**: 𝒮 (Schwartz), 𝒮' (tempered), Fourier transform continuity
- **Rank-1 Operators**: Pseudoinverse A^+ = v·u^T/(|u|²|v|²), geodesic projections

### Stop 5: Bitvector Data Contracts
- **Radar IQ Complex Sample**: cplx16_t (32 bits: I[15:0], Q[31:16])
- **7-Stage Perception Pipeline**: Raw→FFT→CFAR→Clusters→Fusion→Temporal→Control
- **ASIC Boundaries**: DMA-accessible contracts (radar_iq_header_t, cfar_peak_t, fused_obj_t)
- **Occupancy Grid**: 2-bit packed encoding (00=unknown, 01=free, 10=occupied)

---

## Part VII: Conclusion & Next Steps

### Summary of High-Impact Fixes

**Immediate (Errata-Level)**:
1. Tolerance semantic unification
2. ESET operand field correction
3. Multi-source register encoding (Type-S3, Type-V4)

**High-Priority (v1.1)**:
4. Fixed-point format annex
5. Context Flow CSR & selection rules
6. Moment operation memory layouts
7. Memory model formalization

**Medium-Priority (v1.2)**:
8. AGM/Elliptic instruction semantics
9. Byzantine consensus scoping
10. Platform specification separation

### Implementability Checklist

An implementer should be able to answer "yes" to:
- [ ] Can I decode every instruction unambiguously?
- [ ] Do I know exact register/memory layouts for all operations?
- [ ] Are numerical formats and overflow behavior specified?
- [ ] Can I build a conformance test suite from the spec?
- [ ] Are platform-specific dependencies clearly separated?
- [ ] Do I have enough detail for ASIL-D certification?

**Current State**: ~60% yes  
**After v1.1 fixes**: ~90% yes  
**After v2.0 + Platform Spec**: ~100% yes

### Engagement with Evaluation Agent

This document consolidates findings requested in the original evaluation framework:
- **Eval 1**: Archipelago document applicability → Addressed via platform spec separation
- **Eval 2**: Bilinear coupling contribution → Integrated as witness object enhancement
- **Highest-impact ISA fixes**: Prioritized list in Part I
- **5-stop synthesis**: Complete cross-domain integration

**Recommended Next Steps**:
1. Review tolerance semantic decision (critical path blocker)
2. Approve Type-S3/Type-V4 encoding extensions
3. Author Fixed-Point Format Annex (Annex B)
4. Separate Platform Specification document
5. Iterate on AGM/Elliptic semantics with reference implementation

---

**Document Status**: Complete synthesis of 5-project analysis  
**Total Context Used**: ~120K tokens across all stops  
**Deliverable**: Actionable ISA rectification guidance with normative text proposals

