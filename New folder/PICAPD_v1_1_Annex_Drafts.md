# PICAPD ISA v1.1 — Draft Annexes (normative-ready text)

This document is a **draftable set of annexes** intended to close the highest-impact underspecification gaps while keeping the core ISA stable.

Annex numbering is provisional.

---

## Annex B — Fixed-Point Arithmetic (Q formats)

### B.1 Scope and applicability

This annex standardizes **fixed-point encodings** used in:
- memory-mapped I/O payloads,
- platform data contracts (sensor ingestion / actuator emission),
- optional fixed-point kernels used by domain accelerators.

This annex does **not** change the architectural definition that **F registers are FP64** and that **M registers are 64-bit moment storage**; it defines how fixed-point values are represented in memory and how fixed-point operations shall behave when implemented.

### B.2 Qm.n definition

A `Qm.n` fixed-point number uses `m+n` total bits:
- `m`: integer bits (includes the sign bit for signed formats)
- `n`: fractional bits

**Signed Qm.n interpretation (two’s complement):**

`value = (int_k)bits × 2^{-n}`

**Unsigned Qm.n interpretation:**

`value = (uint_k)bits × 2^{-n}`

where `k = m+n`.

### B.3 Range and precision

For signed `Qm.n`:
- Minimum: `-2^{m-1}`
- Maximum: `2^{m-1} − 2^{-n}`
- Quantum (LSB): `2^{-n}`

For unsigned `Qm.n`:
- Minimum: `0`
- Maximum: `2^{m} − 2^{-n}`
- Quantum (LSB): `2^{-n}`

### B.4 Canonical formats

The following formats are **canonical** for platform profiles that carry physical quantities in fixed-point:

| Name | Bits | Signed | Range (approx.) | Typical use |
|---|---:|:---:|---|---|
| Q1.15 | 16 | ✓ | [-1, 0.99997] | normalized ADC / IQ samples |
| Q16.16 | 32 | ✓ | [-32768, 32767.99998] | position, velocity |
| Q10.6 | 16 | ✓ | [-512, 511.9844] | vehicle-frame meters |
| Q8.8 | 16 | ✗ | [0, 255.9961] | SNR / power-like scalars |
| Q7.9 | 16 | ✓ | [-64, 63.9980] | velocity (m/s) |
| Q3.13 | 16 | ✓ | [-4, 3.99988] | angles (rad) |
| Q6.10 | 16 | ✗ | [0, 63.9990] | distances (m) |
| Q6.26 | 32 | ✓ | ~[-32, 31.99999998] | high-precision coefficients |

### B.5 Overflow behavior

Fixed-point arithmetic shall implement one of the following behaviors. The selected behavior is controlled by `CSR[msafety].fxp_ovf_mode`.

- `0` **Saturate**: clamp results to the representable min/max.
- `1` **Wrap**: two’s-complement wraparound.
- `2` **Trap**: raise `ArithmeticOverflow` synchronous exception.

If an implementation does not implement `Trap`, it shall treat mode `2` as mode `0`.

### B.6 Rounding modes

When an operation requires rounding (e.g., multiplication that produces extra fractional bits), rounding shall follow `CSR[msafety].fxp_rnd_mode`:

- `0` Trounding toward zero (truncate)
- `1` Round-to-nearest, ties-to-even
- `2` Round toward +∞
- `3` Round toward −∞

### B.7 Recommended primitive operations

If fixed-point arithmetic instructions are implemented (platform extension), they shall at minimum provide:

- `FXP.MUL` — fixed-point multiply with controlled rounding and overflow behavior
- `FXP.MAC` — multiply-accumulate
- `FXP.CONV` — convert between canonical Q formats (with explicit rounding + overflow)

If these instructions are absent, software libraries shall implement equivalent behavior, and conformance shall be judged against this annex.

### B.8 Conformance tests

A conformant implementation shall:
- match saturating vs wrapping behavior for representative edge cases,
- match rounding behavior for tie cases,
- provide bit-identical results for conversions among canonical formats.

---

## Annex C — Memory Model Formalization

### C.1 Model overview

PICAPD provides a **release consistency** model with **event-based synchronization**. This annex defines a minimal formal contract sufficient for:
- compiler reordering rules,
- litmus tests,
- cross-EPU correctness arguments.

### C.2 Events and synchronization

Define operations:
- `ESET(e)` sets event register `e` to 1.
- `ECLEAR(e)` sets event register `e` to 0.
- `EWAIT(e)` blocks until `event[e]==1` and then returns.

`ESET`/`EWAIT` form a **synchronization pair**.

### C.3 Happens-before (⊑)

Define a relation `a ⊑ b` (“a happens-before b”) as the transitive closure of:

1) **Program order**: if `a` and `b` execute on the same EPU and `a` precedes `b` in program order, then `a ⊑ b`.

2) **Event synchronization**: if `a` is `ESET(e)` and `b` is an `EWAIT(e)` that returns due to observing that `event[e]==1`, then `a ⊑ b`.

3) **Transitivity**: if `a ⊑ c` and `c ⊑ b`, then `a ⊑ b`.

### C.4 Visibility rule

If a store `S` and a load `L` access the same address, and `S ⊑ L`, then `L` shall observe either:
- the value written by `S`, or
- a value written by some store `S'` such that `S ⊑ S' ⊑ L`.

### C.5 Per-location coherence

All stores to the same aligned address are totally ordered (coherence order). Loads observe a value consistent with that total order.

### C.6 Reordering constraints

Implementations may reorder memory operations subject to the following constraints:

- Within an EPU, **dependent** operations respect program order.
- Across EPUs, ordering is not implied except via:
  - event synchronization (`ESET/EWAIT`),
  - atomic RMW operations,
  - any implementation-defined fence mechanism (if present).

### C.7 Atomics

Atomic RMW operations listed in §5.2 are sequentially consistent **with respect to the addressed location**.

If an atomic operation `A` is ordered by `⊑` relative to other operations, `A` participates in the visibility rule as both a load and a store.

### C.8 Litmus tests (normative outcomes)

**Event-release acquire**:

- EPU0: `store X=1; ESET(e)`
- EPU1: `EWAIT(e); r=load X`

Outcome: `r=1` is required.

**Per-location coherence**:

- EPU0: `store X=1`
- EPU1: `store X=2`
- EPU2: `r=load X`

Outcome: `r` must be either 1 or 2, and the order must be consistent across all observers.

---

## Annex D — Write-Ahead Log (WAL) and SAFE.ROLL

### D.1 Scope

This annex defines the **minimum required WAL record format** and rollback semantics needed for `SAFE.ROLL` to be interoperable and testable.

### D.2 WAL region and addressing

A WAL is a memory region in platform RAM. Its base address and size are platform-defined, but the ISA requires:

- records are **append-only**,
- records are **naturally aligned** to 8 bytes,
- records include an integrity check.

### D.3 Record format (minimum)

All multi-byte fields are little-endian.

```c
typedef struct __attribute__((packed)) {
  uint64_t seq_num;        // monotonic sequence number
  uint64_t timestamp;      // architectural TIMESTAMP at record creation
  uint16_t epu_id;         // originating EPU_ID
  uint8_t  record_type;    // STORE=1, CSR_WRITE=2, EVENT=3, COMMIT=0xFE
  uint8_t  flags;          // reserved
  uint64_t address;        // affected address or CSR number in low bits
  uint64_t old_value;      // value before update
  uint64_t new_value;      // value after update
  uint32_t crc32;          // CRC32 of bytes [0..(crc32-1)]
  uint32_t reserved;       // 0
} wal_record_t;
```

### D.4 Commit unit

A `COMMIT` record (type `0xFE`) delimits an atomic unit:
- all records after the previous `COMMIT` and up to and including the next `COMMIT` form one **commit group**.

### D.5 Logging rule (normative)

Before an architectural update becomes visible outside the executing EPU, an implementation shall ensure the corresponding WAL record is durable in memory.

Minimum required coverage:
- all stores to memory,
- all CSR writes,
- event register updates (`ESET/ECLEAR`).

### D.6 SAFE.ROLL semantics

`SAFE.ROLL rs1` rolls back to a checkpoint at address `X[rs1]`.

Required behavior:
1) Locate the most recent valid `COMMIT` record at or before the checkpoint boundary.
2) Restore state to the post-commit state by replaying WAL records in increasing `seq_num` order.
3) Discard any uncommitted records after the chosen `COMMIT`.
4) Set `STATUS.MODE ← ROLLBACK` during the procedure and return to `ACTIVE` upon completion.

### D.7 Failure behavior

If CRC validation fails for any record needed for replay:
- raise `LogCorrupted`.

If the checkpoint pointer is invalid:
- raise `CheckpointNotFound`.

### D.8 Conformance tests

A conformant implementation shall provide a test harness that:
- performs a known sequence of stores + CSR writes,
- forces a rollback,
- verifies all values match the last committed state.

---

## Annex E — Context Flow control (minimal normative closure)

### E.1 Motivation

`CTX.AGG` and `CTX.SYNTH` reference aggregation/decision functions without a selection mechanism.

### E.2 mcontext (0x802) fields

Define the following bitfields for `CSR[mcontext]`:

- Bits `[2:0]` `agg_fn`:
  - `0` OR
  - `1` AND
  - `2` MAJORITY
  - `3` WEIGHTED
  - `4–7` reserved

- Bits `[5:3]` `dec_fn`:
  - `0` OR
  - `1` AND
  - `2` MAJORITY
  - `3` THRESHOLD
  - `4–7` reserved

- Bits `[15:6]` reserved
- Bits `[31:16]` implementation-defined / reserved

### E.3 CTX instruction binding

- `CTX.AGG` shall use `CSR[mcontext].agg_fn`.
- `CTX.SYNTH` shall use `CSR[mcontext].dec_fn`.

If a reserved value is selected, the instruction shall raise `IllegalInstruction`.

