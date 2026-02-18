# PICAPD Platform Profile (Informative) — STOP‑5 Automotive Perception Data Contracts

**Status**: Informative / non‑normative profile.

**Goal**: Capture a *concrete, ASIC‑ready* set of sensor/feature/control data contracts (bitvector layouts and Q formats) that a PICAPD platform can bind to the ISA’s existing hooks (memory, CSRs, register banks) without baking automotive specifics into the core ISA.

---

## 1) Profile assumptions

- Little-endian memory layout.
- Word alignment by default; some payloads are packed.
- Microsecond timestamping is used in I/O payload headers (48-bit).

---

## 2) Canonical fixed-point formats used in the profile

This profile uses the following Q formats (see Annex B draft for semantics):

- `Q1.15` (16-bit, signed): normalized radar I/Q samples.
- `Q16.16` (32-bit, signed): position/velocity.
- `Q10.6` (16-bit, signed): vehicle-frame meters.
- `Q8.8` (16-bit, unsigned): SNR / power-like scalars.
- `Q7.9` (16-bit, signed): velocity (m/s).
- `Q3.13` (16-bit, signed): angles (rad).
- `Q6.10` (16-bit, unsigned): distances.

---

## 3) Stage 1: Raw sensor ingestion contracts

### 3.1 Radar complex sample (`cplx16_t`)

**Logical type**: one complex sample.

**Layout** (32 bits):

- Bits `[15:0]`  = `I` (signed `Q1.15`)
- Bits `[31:16]` = `Q` (signed `Q1.15`)

**ISA hook**:
- bind to `SFSPU.*` (sensor fusion extension opcodes) via a *profile ABI*: instructions accept pointers to arrays of `cplx16_t` in memory.

### 3.2 Radar frame header (`radar_iq_header_t`)

A packed header followed by a 4‑D tensor payload.

**Key fields**:
- `radar_id` (u16)
- `frame_id` (u16)
- `ts_us` (u48 stored in u64 with upper 16 unused)
- `n_tx,n_rx,n_chirps,n_samples` (u16 each)

**Payload**:
`iq[n_tx][n_rx][n_chirps][n_samples] : cplx16_t`

**ISA hook**:
- model tensor addressing as *software ABI* + optional accelerator helper.
- recommended helper pattern: a stride descriptor in memory (base + 4 strides) rather than new core opcodes.

---

## 4) Stage 5–7: Fused objects and control outputs (representative)

This profile commonly uses packed, DMA-friendly structures for intermediate/fused representations.

### 4.1 Occupancy grid cell (2-bit packed)

**Cell encoding**:
- `00` unknown
- `01` free
- `10` occupied
- `11` reserved

**ISA hook**:
- bind to a bitfield-extract/insert kernel in software, or a platform extension instruction family (optional).

### 4.2 Timestamp convention (48-bit µs)

**Encoding**:
- `ts_us` is a 48-bit unsigned integer, stored in a 64-bit word with upper 16 bits zero.

**ISA hook**:
- map to architectural `TIMESTAMP` (cycle counter) by platform policy:
  - either provide a fixed conversion (cycles→µs) via a CSR multiplier,
  - or treat `ts_us` as an I/O-domain timestamp independent of `TIMESTAMP`.

---

## 5) What this profile implies for PICAPD ISA upgrades

### 5.1 Keep automotive layouts out of the ISA core

The ISA should not standardize these exact structs globally. Instead, v1.1+ should standardize:

- **Fixed-point semantics** (Annex B) to make the bitvector payloads interoperable.
- **A profile binding mechanism** (platform spec) that states:
  - which memory layouts the platform uses,
  - what CSRs point to ring buffers / DMA descriptors,
  - which optional extension opcodes (e.g., `SFSPU.*`) exist and how they interpret memory.

### 5.2 Minimal ISA-level hooks that are worth standardizing

- A **standard packed-complex convention** for `Q1.15` complex pairs.
- A **timestamp ABI** for I/O payload headers (48-bit µs recommended).
- A **bitfield operation contract** (even if implemented in software): extract/insert semantics and endianness.

---

## 6) Suggested conformance artifacts for this profile

- Golden vectors for `cplx16_t` FFT inputs/outputs (bit-exact).
- Round-trip tests for timestamp packing/unpacking.
- Occupancy-grid packing/unpacking tests.

