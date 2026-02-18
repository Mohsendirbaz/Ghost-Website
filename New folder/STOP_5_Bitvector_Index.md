# STOP 5 INDEX: Bitvector-Level Data Contracts for Perception Pipeline

**Source**: Automotive perception stack bitvector specifications (Persian + English documents)  
**Domain**: ASIC/FPGA-ready data contracts from sensor input → control output  
**Relevance to PICAPD**: Provides concrete examples of hardware-software boundaries, fixed-point formats, and data flow stages that PICAPD should standardize

---

## Executive Summary

The uploaded documents provide **ASIC-implementable bitvector specifications** for a complete automotive perception pipeline (Mercedes Pro Assistance Module example, product-agnostic). This represents exactly the kind of **platform-specific data contract** that PICAPD's sensor fusion and control instructions must interface with.

**Key Finding**: The perception pipeline demonstrates 7 distinct hardware-software boundaries where data format contracts are critical. PICAPD ISA should either:
1. **Standardize these layouts** (if targeting automotive platform), OR
2. **Provide extension hooks** for platform-specific data contracts, OR
3. **Define abstract interfaces** that map to these concrete implementations

---

## Part I: Global Conventions (ISA-Relevant)

### 1. Fixed-Point Naming Convention (Qm.n)

**Definition**: `Qm.n` means m integer bits + n fractional bits (two's complement for signed)

**Value Interpretation**:
```
For signed Qm.n:
  value = (int32_t)bits × 2^(-n)

For unsigned Qm.n:
  value = (uint32_t)bits × 2^(-n)
```

**Standard Formats Used**:
```
Q1.15   (16-bit): Radar I/Q samples, range [-1, 0.999969]
Q16.16  (32-bit): Position (x,y), velocity (vx,vy), range [-32768, 32767.99998]
Q10.6   (16-bit): Meters in vehicle frame, range [-512, 511.984]
Q8.8    (16-bit): Power/SNR/RCS, range [0, 255.996] (unsigned)
Q7.9    (16-bit): Velocity m/s, range [-64, 63.998]
Q3.13   (16-bit): Angle radians, range [-4, 3.9999], precision ~0.00012 rad
Q6.10   (16-bit): Distance meters, range [0, 64], precision 1/1024 m
Q6.26   (32-bit): Trajectory polynomial coefficients, high precision
```

**ISA Mapping Recommendation**:
```
PICAPD should add Annex B: Fixed-Point Arithmetic specifying:
1. Canonical Q formats for common physical quantities
2. Overflow behavior (saturate vs wrap vs trap)
3. Rounding modes (truncate, round-to-nearest, etc.)
4. Conversion instructions between Q formats
```

---

### 2. Packing and Alignment

**Convention**: Little-endian, 32-bit word alignment (unless packed)

**Struct Attributes**:
```c
typedef struct __attribute__((packed)) {
  // Fields tightly packed, no padding
} packed_struct_t;
```

**Timestamp Encoding**:
```c
uint48_t ts_us;  // 48-bit timestamp in microseconds
                 // Stored as uint64_t with upper 16 bits unused
                 // Range: 0 to 281 trillion μs (~8.9 years)
```

**ISA Mapping**:
- PICAPD time/date registers should specify microsecond resolution
- 48-bit timestamps sufficient for automotive (no need for 64-bit)
- Event timestamps (ESET) should align with this convention

---

## Part II: Stage-by-Stage Data Contracts

### STAGE 1: Raw Data Reception (Ring Buffers)

#### 1A. Radar Raw ADC → Complex IQ Stream

**This is the "earliest complex number" in the pipeline**

```c
// 32 bits per complex sample (aligned)
typedef struct __attribute__((packed)) {
  int16_t I;   // In-phase, Q1.15 format
  int16_t Q;   // Quadrature, Q1.15 format
} cplx16_t;

// Bitvector layout (one sample):
// I[15:0]   = two's complement signed
// Q[31:16]  = two's complement signed
```

**Rate Analysis**:
```
Realistic automotive radar:
  n_tx = 2 (TDM MIMO)
  n_rx = 4
  n_chirps = 128
  n_samples = 256
  frame_rate = 20 Hz

Complex samples per radar:
  = 20 × 128 × 256 × 4 × 2
  = 5,242,880 samples/sec
  = ~20 MB/sec per radar (before FFT reduction)

With 5 radars:
  ~26 million complex values/sec
  ~100 MB/sec raw throughput
```

**ISA Implication**:
- Sensor fusion instructions (SFSPU.*) must handle complex-valued streams
- DMA bandwidth requirements: 100+ MB/sec for automotive
- Need vector operations on complex data (not just scalar)

---

#### 1B. Radar IQ Cube Tensor in Ring Buffer

```c
typedef struct __attribute__((packed)) {
  uint16_t radar_id;      // Which radar (0-4 for 5-radar system)
  uint16_t frame_id;      // Wraps at 65535
  uint48_t ts_us;         // 48-bit timestamp
  uint16_t n_tx;          // #TX used (MIMO factor)
  uint16_t n_rx;          // #Physical RX antennas
  uint16_t n_chirps;      // Slow-time dimension
  uint16_t n_samples;     // Fast-time dimension
  // Followed by: cplx16_t iq[n_tx][n_rx][n_chirps][n_samples]
} radar_iq_header_t;
```

**Payload Shape**:
```
iq[tx][rx][chirp][sample] : cplx16_t

Example: 2×4×128×256 = 262,144 complex samples = 1,048,576 bytes ≈ 1 MB per frame
```

**ISA Implication**:
- PICAPD moment operations (MOM.*) should support 4D tensor indexing
- Stride calculations need to be hardware-accelerated
- Ring buffer management (circular addressing) common pattern

**Recommended Instruction**:
```
TENSOR.LOAD rd, base_ptr, [dim0, dim1, dim2, dim3], [stride0, stride1, stride2, stride3]
  Load element from 4D tensor with configurable strides
  rd = *(base_ptr + dim0*stride0 + dim1*stride1 + dim2*stride2 + dim3*stride3)
```

---

#### 1C. Camera Raw Frames

```c
typedef struct __attribute__((packed)) {
  uint16_t cam_id;
  uint16_t frame_id;
  uint48_t ts_us;
  uint16_t width;
  uint16_t height;
  uint16_t format;      // BAYER10, BAYER12, etc.
  // Payload: uint16_t pix[height][width]
} camera_raw_header_t;
```

**Bayer 10-bit Pixel** (aligned to 16-bit):
```
Bitvector:
  pix[9:0]   = intensity (10 meaningful bits)
  pix[15:10] = unused/zero (6 bits padding)
```

**ISA Implication**:
- Image processing often needs packed bit access (10-bit in 16-bit container)
- Bit-field extraction common operation
- Color filter array (CFA) interpolation requires neighbor access patterns

---

#### 1D. Ultrasonic ToF Samples

```c
typedef struct __attribute__((packed)) {
  uint8_t  us_id;
  uint8_t  seq;
  uint48_t ts_us;
  uint16_t tof_ticks;     // Raw timer ticks
  uint16_t amplitude;     // Echo strength
} us_raw_t;
```

**Immediate Conversion**:
```
distance_m : uint16 in Q6.10 format
  = (tof_ticks × speed_of_sound) / (2 × timer_frequency)
  Range: 0–64 m, precision 1/1024 m
```

---

### STAGE 2: Modality-Specific Preprocessing

#### 2A. Radar Range FFT Output (Complex Range Bins)

**Input**: `iq[tx][rx][chirp][sample] : cplx16_t`  
**Output**: `range_fft[tx][rx][chirp][rbin] : cplx18_t`

```c
typedef struct __attribute__((packed)) {
  int18_t I;   // Stored in 32-bit with sign-extend
  int18_t Q;   // Stored in 32-bit with sign-extend
} cplx18_t;    // Conceptually 36 bits, usually padded to 64
```

**Why 18-bit?**: FFT growth requires headroom (~log2(N) bits for N-point FFT)

**Bitvector** (stored as 64-bit for simplicity):
```
I[17:0]   = two's complement (18 bits)
Q[35:18]  = two's complement (18 bits)
padding[63:36] = sign-extend or zero
```

**ISA Implication**:
- FFT operations need configurable bit growth
- Complex multiply-accumulate (CMAC) with wider accumulators
- Overflow handling critical for numerical stability

---

#### 2B. Doppler FFT Output (Range-Doppler Map)

**Input**: `range_fft[rx][chirp][rbin] : cplx18_t`  
**Output**: `RD_power[rbin][dbin] : pwr16_t`

```c
typedef uint16_t pwr16_t;  // Q8.8 log power (dB-ish)
```

**Power Calculation**:
```
P = I² + Q²   (magnitude squared)
Store as: log10(P) × 16  (Q8.8 format)
  Range: 0–256 dB (0.0–255.996)
  Precision: 1/256 dB
```

**Bitvector**:
```
P[15:0] = unsigned, Q8.8 log power
```

**ISA Implication**:
- Need efficient complex-to-real magnitude operation
- Log conversion (lookup table or iterative algorithm)
- Transition from complex to real representation

---

#### 2C. Angle Estimation (Range-Doppler-Azimuth Cube)

**Output**: `RAD[rbin][dbin][abin] : pwr16_t`

**Example Dimensions**:
```
256 range bins × 128 Doppler bins × 64 azimuth bins
= 2,097,152 cells × 2 bytes
= 4,194,304 bytes ≈ 4 MB per frame
```

**Why This is Large**:
- Full RAD cube rarely stored globally
- Streamed into CFAR detector (next stage)
- Only peaks retained (sparse output)

**ISA Implication**:
- Streaming computation model (don't materialize full cube)
- Hardware accelerators for 3D FFT or beamforming
- Memory hierarchy awareness (L1/L2 cache sizing)

---

#### 2D. CFAR Detection (Sparse Peaks)

**This is where "cube" becomes "list of detections"**

```c
typedef struct __attribute__((packed)) {
  uint16_t rbin;          // Range bin index
  uint16_t dbin;          // Doppler bin index
  uint16_t abin;          // Azimuth bin index
  uint16_t snr_q8_8;      // Signal-to-noise ratio, Q8.8
  uint16_t pwr_q8_8;      // Power, Q8.8
  int16_t  phase_q1_15;   // Optional: phase for angle refinement
} radar_cfar_peak_t;      // 12 bytes (96 bits)
```

**Bitvector Layout**:
```
[15:0]   rbin     (0 to Nr-1)
[31:16]  dbin     (0 to Nd-1)
[47:32]  abin     (0 to Na-1)
[63:48]  snr      (Q8.8)
[79:64]  pwr      (Q8.8)
[95:80]  phase    (Q1.15, optional)
```

**Typical Output**: ~30-100 peaks per radar per frame (sparse)

**ISA Implication**:
- Peak detection is sparse→sparse transform (major compression)
- Threshold-based selection (CFAR = Constant False Alarm Rate)
- Adaptive noise floor estimation
- This is the "perception bottleneck" in many systems

---

### STAGE 3: Feature Extraction & Encoding

#### 3A. Radar Detection in Metric Coordinates

**Convert bins → physical quantities**:
```
range_m    = rbin × (c × sample_period) / 2
doppler_mps = dbin × (λ / (2 × chirp_period))
azimuth_rad = abin × (2π / N_azimuth)
```

**Then convert to Cartesian**:
```c
typedef struct __attribute__((packed)) {
  int16_t  x_q10_6;       // Meters, vehicle frame, Q10.6
  int16_t  y_q10_6;       // Meters, vehicle frame, Q10.6
  int16_t  vr_q7_9;       // Radial velocity m/s, Q7.9
  uint16_t rcs_q8_8;      // Radar cross-section proxy, Q8.8
  uint16_t snr_q8_8;      // SNR, Q8.8
  uint16_t src_id;        // Sensor+tx+rx signature
} radar_point_t;          // 14 bytes (112 bits)
```

**Bitvector Example**:
```
x: int16 in Q10.6 → range [-512, 511.984] m, precision 1/64 m
y: int16 in Q10.6 → range [-512, 511.984] m, precision 1/64 m
vr: int16 in Q7.9 → range [-64, 63.998] m/s, precision 1/512 m/s
```

**Key Transition**: At this point, radar is no longer "complex samples" — it's derived sparse measurement list

**ISA Implication**:
- Coordinate transform operations (polar → Cartesian)
- Trigonometric functions (sin, cos) or CORDIC
- Multiple Q-format conversions in sequence

---

#### 3B. Radar Clusters

**Group nearby points into "blobs"**:

```c
typedef struct __attribute__((packed)) {
  int16_t cx_q10_6;       // Centroid x
  int16_t cy_q10_6;       // Centroid y
  int16_t vx_q7_9;        // Velocity x
  int16_t vy_q7_9;        // Velocity y
  uint16_t extent_x_q6_10; // X extent, Q6.10
  uint16_t extent_y_q6_10; // Y extent, Q6.10
  uint16_t n_points;       // Number of points in cluster
  uint16_t avg_rcs_q8_8;   // Average RCS
} radar_cluster_t;        // 16 bytes
```

**ISA Implication**:
- Clustering algorithms (DBSCAN, k-means, hierarchical)
- Statistical aggregation (mean, variance, extent)
- Covariance estimation for uncertainty

---

#### 3C. Radar Track State (Kalman Filter)

**The "track extraction: ~30 tracks" stage**:

```c
typedef struct __attribute__((packed)) {
  uint16_t track_id;
  uint16_t age;           // Frames since birth
  uint16_t status;        // Bitfield: confirmed/tentative/coast/etc.
  uint48_t ts_us;
  
  int32_t x_q16_16;       // Position x, Q16.16
  int32_t y_q16_16;       // Position y, Q16.16
  int32_t vx_q16_16;      // Velocity x, Q16.16
  int32_t vy_q16_16;      // Velocity y, Q16.16
  
  uint16_t sigma_x_q8_8;  // Position uncertainty, Q8.8
  uint16_t sigma_y_q8_8;
  uint16_t sigma_vx_q8_8; // Velocity uncertainty, Q8.8
  uint16_t sigma_vy_q8_8;
  
  uint16_t rcs_q8_8;
  uint16_t sensor_mask;   // Which sensors contributed
} radar_track_t;          // ~40 bytes
```

**Bitvector Highlights**:
- State: 32-bit Q16.16 for high precision
- Uncertainty: 16-bit Q8.8 (sufficient for covariance diagonals)
- sensor_mask: Allows fusion logic to trace provenance

**ISA Implication**:
- Kalman filter operations (predict, update, residual)
- Matrix operations (Σ = P·H^T·(H·P·H^T + R)^(-1))
- Covariance propagation critical for safety
- Need 32-bit × 32-bit → 64-bit multiply-accumulate

---

#### 3D. Camera Object Detections

```c
typedef struct __attribute__((packed)) {
  uint16_t x0, y0, x1, y1;  // Bounding box corners (pixels)
  uint8_t  class_id;         // Object class (0-255)
  uint8_t  conf_q0_8;        // Confidence [0, 1] in Q0.8
  uint16_t track_hint;       // Optional association hint
} cam_det_t;                 // 12 bytes
```

**ISA Implication**:
- Neural network inference outputs (often float32 → Q0.8)
- Non-maximum suppression (IoU calculations)
- Class label encoding (one-hot vs integer)

---

### STAGE 4: Multi-Modal Fusion

#### 4A. Fused Object (Unified State)

**The "unified object: position, velocity, class, covariance" stage**:

```c
typedef struct __attribute__((packed)) {
  uint16_t obj_id;
  uint16_t type;           // enum: car, truck, ped, bike, unknown
  uint16_t flags;          // bits: moving, stationary, oncoming, etc.
  uint48_t ts_us;
  
  int32_t x_q16_16;
  int32_t y_q16_16;
  int32_t vx_q16_16;
  int32_t vy_q16_16;
  
  int16_t  yaw_q3_13;      // Orientation, radians, Q3.13
  uint16_t length_q6_10;   // Object dimensions, meters
  uint16_t width_q6_10;
  
  uint8_t  class_conf_q0_8;     // Classification confidence
  uint8_t  existence_q0_8;      // Probability object exists
  
  uint16_t sigma_x_q8_8;
  uint16_t sigma_y_q8_8;
  uint16_t sigma_vx_q8_8;
  uint16_t sigma_vy_q8_8;
  
  uint16_t sensor_mask;    // Sources contributing
} fused_obj_t;             // ~44 bytes
```

**Bitvector-Level Meaning**:
- `type` and `flags`: Literal bitfields for safety ECU
- `existence_q0_8`: Often used to drop ghosts (threshold < 0.5)
- Covariances: "Ambiguity as bits" — critical for fusion

**ISA Implication**:
- Association algorithms (nearest neighbor, JPDA, MHT)
- Coordinate frame transforms (sensor → vehicle → world)
- Uncertainty propagation (covariance intersection)
- Time alignment (interpolation to common timestamp)

---

### STAGE 5: Temporal Integration

#### 5A. Track Lifecycle Bitfield

```c
// Status bits example (16-bit)
bit 0  = TENTATIVE
bit 1  = CONFIRMED
bit 2  = COASTING (no measurement this frame)
bit 3  = OCCLUDED
bit 4  = MERGED
bit 5  = SPLIT
bit 6  = HIGH_CONFIDENCE
bit 7  = RESERVED
...
```

**ISA Implication**:
- State machine transitions (tentative → confirmed → coasting → deleted)
- Bit manipulation instructions important
- Atomic bit-test-and-set for concurrent updates

---

#### 5B. Object History Ring Buffer

```c
typedef struct __attribute__((packed)) {
  uint16_t obj_id;
  uint16_t n_hist;          // e.g., 10 frames
  int32_t  x_hist_q16_16[10];
  int32_t  y_hist_q16_16[10];
  int32_t  vx_hist_q16_16[10];
  int32_t  vy_hist_q16_16[10];
} obj_history_t;
```

**ISA Implication**:
- Fixed-size circular buffers common
- Modulo addressing for ring indices
- Vectorized history analysis (trend detection)

---

### STAGE 6: Reduced-Order Model

#### 6A. Occupancy Grid (2-bit Per Cell)

**This is literally "world as bits" representation**:

```c
// 2-bit occupancy (very common)
// 00 = unknown
// 01 = free
// 10 = occupied
// 11 = reserved

typedef struct {
  uint16_t w, h;              // Grid dimensions
  uint16_t resolution_cm;     // e.g., 20cm per cell
  uint32_t grid2b[(w*h*2)/32]; // 2-bit packed
} occ_grid2b_t;
```

**Example**: 256×256 grid
```
Cells:     65,536
Bits:      131,072 (2 bits/cell)
Bytes:     16,384 bytes = 16 KB per grid
```

**Bitvector Packing**:
```
2 bits/cell → 16 cells per 32-bit word

Cell index k goes into:
  word_index = k >> 4
  bit_offset = (k & 0xF) × 2

Get cell value:
  val = (grid2b[word_index] >> bit_offset) & 0x3

Set cell value:
  grid2b[word_index] &= ~(0x3 << bit_offset)
  grid2b[word_index] |= (new_val << bit_offset)
```

**ISA Implication**:
- Bit-field extraction and insertion
- Vectorized occupancy updates (SIMD on bit-packed data)
- Probabilistic updates (Bayesian grid mapping)

---

#### 6B. Reduced Object List

**Top ~100 entities for planning**:

```c
typedef struct __attribute__((packed)) {
  uint16_t obj_id;
  uint16_t type;
  int32_t  x_q16_16;
  int32_t  y_q16_16;
  int32_t  vx_q16_16;
  int32_t  vy_q16_16;
  uint8_t  risk_q0_8;      // Computed downstream
  uint8_t  existence_q0_8;
} plan_obj_t;              // 24 bytes
```

**Compression Cliff**: From millions of raw samples → 100 objects (~2.4 KB)

---

### STAGE 7: Decision / Output Layer

#### 7A. Behavior/Intent Token

```c
typedef struct __attribute__((packed)) {
  uint16_t behavior;      // enum: KEEP_LANE, BRAKE, YIELD, etc.
  uint16_t reason_bits;   // Bitfield explanation for traceability
  uint16_t confidence_q0_8;
  uint48_t ts_us;
} behavior_t;             // 12 bytes
```

**ISA Implication**:
- Finite state machine encoding
- Reason code for audit trail (safety requirement)
- Decision history logging

---

#### 7B. Trajectory Command (Polynomial)

```c
typedef struct __attribute__((packed)) {
  uint48_t ts_us;
  int32_t a0_q6_26;       // Polynomial coefficients
  int32_t a1_q6_26;       // y(x) = a0 + a1*x + a2*x^2 + a3*x^3
  int32_t a2_q6_26;
  int32_t a3_q6_26;
  int16_t v_ref_q7_9;     // Desired speed
} traj_poly_t;
```

**High Precision**: Q6.26 gives ~1e-8 resolution for smooth trajectories

---

#### 7C. Direct Actuator Command

```c
typedef struct __attribute__((packed)) {
  uint48_t ts_us;
  int16_t steering_q3_13;    // Radians, Q3.13
  uint16_t throttle_q0_16;   // [0, 1] in Q0.16
  uint16_t brake_q0_16;      // [0, 1] in Q0.16
  uint16_t gear;             // Enum
  uint16_t checksum;         // CRC or similar
} control_cmd_t;             // ~16 bytes
```

**Bit-True for ECU**: These are extremely precise for safety-certified ECU

---

## Part III: ISA Mapping Recommendations

### Recommendation 1: Fixed-Point Format Annex

**Add to PICAPD ISA**:
```
Annex B: Standard Fixed-Point Formats

Table B.1: Automotive Sensor Data Formats
┌────────┬──────┬────────────────────┬─────────────┬────────────┐
│ Format │ Bits │ Range              │ Precision   │ Use Case   │
├────────┼──────┼────────────────────┼─────────────┼────────────┤
│ Q1.15  │  16  │ [-1, 0.999969]     │ 3.05e-5     │ Radar I/Q  │
│ Q10.6  │  16  │ [-512, 511.984]    │ 1/64 m      │ Position   │
│ Q8.8   │  16  │ [0, 255.996]       │ 1/256       │ Power/SNR  │
│ Q7.9   │  16  │ [-64, 63.998]      │ 1/512 m/s   │ Velocity   │
│ Q3.13  │  16  │ [-4, 3.9999]       │ 1.22e-4 rad │ Angle      │
│ Q16.16 │  32  │ [-32768, 32767.99] │ 1.53e-5     │ Tracking   │
│ Q6.26  │  32  │ [-32, 31.9999]     │ 1.49e-8     │ Trajectory │
└────────┴──────┴────────────────────┴─────────────┴────────────┘

Conversion Formula (signed):
  value = (int<width>_t)bits × 2^(-fractional_bits)

Overflow Modes (CSR-selectable):
  SAT: Saturate to [min, max]
  WRAP: Modulo 2^width
  TRAP: Raise overflow exception
```

---

### Recommendation 2: Sensor Fusion Data Layouts

**Specify canonical structs for SFSPU.* instructions**:

```
SFSPU.SYNC should document expected header format:
  struct sensor_frame_header {
    uint16_t sensor_id;
    uint16_t frame_id;
    uint48_t ts_us;
    uint16_t data_format;  // Enum for payload type
    uint32_t payload_size;
  };

SFSPU.KF should specify state vector layout:
  struct kalman_state {
    int32_t x_q16_16;
    int32_t y_q16_16;
    int32_t vx_q16_16;
    int32_t vy_q16_16;
    uint16_t sigma_x_q8_8;
    uint16_t sigma_y_q8_8;
    uint16_t sigma_vx_q8_8;
    uint16_t sigma_vy_q8_8;
  };
```

---

### Recommendation 3: Moment Compression Specification

**Document MOM.COMP 89.7:1 ratio**:

```
Compression Method (Worker → Manager):
  Input:  100 agent states (radar_point_t each)
        = 100 × 14 bytes = 1,400 bytes
  
  Output: 3 moments (μ₀, μ₁, μ₂)
        = 3 × 8 bytes (FP64) = 24 bytes
  
  Ratio: 1400 / 24 ≈ 58.3:1

Full hierarchy (Worker → Manager → Queen):
  Worker layer:    14.6:1 compression
  Manager layer:   89.7:1 compression
  Queen layer:     87.5:1 compression
```

**ISA Definition Needed**:
```
MOM.COMP rd, distribution_ptr, n_samples
  
  Input format (at distribution_ptr):
    struct {
      uint32_t count;
      float64_t samples[count];
    }
  
  Output (M[rd]):
    M[rd]   = μ₀  (zeroth moment, count/mass)
    M[rd+1] = μ₁  (first moment, mean)
    M[rd+2] = μ₂  (second central moment, variance)
  
  Realizability check:
    μ₀ ≥ 0
    μ₁² ≤ μ₀ · μ₂
```

---

### Recommendation 4: ASIC Hardware Boundaries

**Define platform DMA interface contracts**:

```
Platform Spec should enumerate transferable objects:

1. radar_iq_header_t + payload
   DMA size: 1 MB typical per frame
   
2. radar_cfar_peak_t[]
   DMA size: ~30-100 peaks × 12 bytes = 360-1200 bytes
   
3. fused_obj_t[]
   DMA size: ~100 objects × 44 bytes = 4.4 KB
   
4. occ_grid2b_t
   DMA size: 16 KB typical (256×256 grid)
   
5. control_cmd_t
   DMA size: 16 bytes per cycle
```

**ISA Implication**: DMA controller instructions need configurable transfer sizes and stride patterns.

---

### Recommendation 5: Complex Number Operations

**Add native complex arithmetic support**:

```
CADD.C rd, rs1, rs2    // Complex add: (a+bi) + (c+di)
CSUB.C rd, rs1, rs2    // Complex subtract
CMUL.C rd, rs1, rs2    // Complex multiply: (ac-bd) + (ad+bc)i
CMAG.C rd, rs1         // Complex magnitude: sqrt(a²+b²)
CARG.C rd, rs1         // Complex argument: atan2(b, a)

Format: Each register holds one complex number (32-bit I, 32-bit Q)
  or use paired registers for 64-bit complex
```

**Rationale**: Radar processing is inherently complex-valued until CFAR stage.

---

## Part IV: Cross-Stop Synthesis

### Connection to Stop 1 (PICAPD ISA)

**Finding**: PICAPD v1.0 mentions fixed-point but doesn't specify formats normatively

**Bitvector Contribution**:
- Provides concrete Q-format examples used in production automotive systems
- Shows overflow behavior must be specified (sat vs wrap)
- Demonstrates 48-bit timestamps sufficient (no need for 64-bit TIME register)

---

### Connection to Stop 2 (Governing Equations)

**Finding**: Radar processing follows Hyperbolic equation (wave propagation)

**Bitvector Contribution**:
- IQ samples represent sampled electromagnetic waves
- FFT transforms time-domain waves to frequency-domain (Fourier)
- Range-Doppler map is 2D wave decomposition
- Validates Hyperbolic equation assignment for radar in tensor framework

---

### Connection to Stop 3 (EPU Architecture)

**Finding**: Worker→Manager→Queen hierarchy with moment compression

**Bitvector Contribution**:
- Shows explicit compression ratios (14.6:1, 89.7:1, 87.5:1)
- Moment vector format: (μ₀, μ₁, μ₂, μ₃) in M-registers
- Validates population balance framework with concrete data structures

---

### Connection to Stop 4 (Harmonic Analysis)

**Finding**: 2D separable transforms need dimension matching

**Bitvector Contribution**:
- Radar processing uses separable 3D FFT (range × Doppler × angle)
- Confirms A_M (M×M) × data (M×N) × A_N^T (N×N) pattern
- FFT padding rule (N ≥ P+Q-1) validated in convolution examples

---

## Part V: Verification & Validation Implications

### Hardware Simulation Test Vectors

**Bitvector specs enable bit-accurate testing**:

```
Test Case: Radar IQ → CFAR Peaks
  Input:  radar_iq_header_t + 1MB payload (known pattern)
  Process: Range FFT → Doppler FFT → Angle FFT → CFAR
  Output: radar_cfar_peak_t[] (expected peak locations)
  
  Tolerance: Bit-exact for fixed-point path
             ±1 LSB for rounding differences
```

**Golden Reference Models**:
- Fixed-point C reference implementation
- Floating-point Matlab/Python "truth" model
- Comparison framework to quantify fixed-point errors

---

### ASIC/FPGA Implementation Checklist

From bitvector specs, implementer can answer:
- [x] Exact bit widths for all data paths?
- [x] Packing/alignment for DMA transfers?
- [x] Overflow behavior (saturate/wrap/trap)?
- [x] Rounding modes for division/sqrt?
- [x] Timestamp synchronization protocol?
- [x] Ring buffer wraparound logic?
- [x] Complex arithmetic semantics?

**Current Answer**: YES to all (from bitvector docs)  
**PICAPD ISA Answer**: Partial (missing normative specs)

---

## Part VI: Recommendations Summary

### High-Priority ISA Additions

1. **Fixed-Point Format Annex** (Annex B)
   - Canonical Q-formats table
   - Overflow/rounding mode definitions
   - Conversion instruction semantics

2. **Sensor Fusion Data Contracts**
   - Header formats for SFSPU.SYNC
   - State vector layouts for SFSPU.KF
   - Covariance matrix storage conventions

3. **Moment Operation Layouts**
   - Distribution format (count, stride, samples)
   - Moment vector format (μ₀, μ₁, μ₂, μ₃)
   - Realizability constraints (Hausdorff conditions)

4. **Complex Arithmetic Instructions**
   - Native complex add/sub/mul
   - Magnitude and argument (phase)
   - FFT primitive support

5. **Platform DMA Specification**
   - Transferable object registry
   - Stride/scatter-gather patterns
   - Alignment requirements

### Medium-Priority Enhancements

6. **Bit-Field Instructions**
   - Extract/insert arbitrary bit ranges
   - Packed occupancy grid operations
   - Status bitfield manipulation

7. **Coordinate Transforms**
   - Polar ↔ Cartesian
   - Sensor frame → Vehicle frame
   - CORDIC or table-based trig

8. **Tensor Addressing**
   - 4D indexing with strides
   - Circular buffer support
   - Vectorized stride patterns

---

## Conclusion

The bitvector specifications provide **existence proof** that:
1. Fixed-point formats can be precisely specified
2. Hardware-software boundaries can be cleanly defined
3. Complex pipelines can be documented at bit-level
4. ASIC verification is achievable with sufficient detail

**PICAPD ISA should adopt similar normative precision** to enable:
- Portable implementations across vendors
- Bit-reproducible results
- Certification-ready specifications
- Interoperable platform extensions

**Next Step**: Use these concrete examples to author normative annexes for PICAPD v1.1/v2.0.

---

**END OF STOP 5 INDEX**
