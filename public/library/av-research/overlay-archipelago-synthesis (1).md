# Overlay Collection: Archipelago as Improvement Policy Package
## Fatigue/Peak Analysis, Design Matrix, and Sensor-to-Substrate Architecture for L5 Autonomy

**Methodology:** Treat Archipelago not as feature addition, but as **systematic improvement policy** that enables continuous evolution of the 68-overlay architecture toward maximum likelihood ground truth in real-world autonomous driving.

---

## Part 1: Overlay Clustering & Functional Themes

The 68 overlays organize into **8 major architectural themes**:

| Theme | Overlays | Core Function |
|-------|----------|---------------|
| **A. Spatial Governance** | 1, 9, 14, 17, 22, 23, 25, 29, 36, 49, 50, 56, 57, 63, 64, 68 | Frame graphs, coordinate transforms, global/local agent partitioning |
| **B. Fault Containment & Safety** | 2, 7, 19, 20, 21, 33, 42, 45, 48, 66 | Byzantine tolerance, TMR, fault injection, safety case decomposition |
| **C. Witness & Evidence** | 10, 16, 24, 32, 35, 47, 52, 53, 58 | Bilinear gates, ROM packs, evidence chains, invariant manifolds |
| **D. Timing & Synchronization** | 3, 6, 18, 22, 30, 31, 40, 43, 65 | Latency budgets, clock domains, vector clocks, multi-rate timing |
| **E. Learning & Adaptation** | 5, 11, 24, 28, 32, 48, 52, 61, 67 | Safe RL loops, policy evolution, dependency discovery, OTA updates |
| **F. Domain Portability** | 4, 13, 18, 25, 34, 37, 54, 60, 62 | Invariant packs, coordinate contracts, swap-in domains, cross-platform |
| **G. Hardware Substrate** | 3, 4, 8, 12, 18, 41, 42, 55 | Power islands, thermal domains, DFT hooks, physical interfaces |
| **H. Verification & Testing** | 13, 20, 27, 34, 45, 56, 57 | SIL/HIL/vehicle testing, simulation harness, digital twin |

---

## Part 2: Fatigue/Peak Analysis by Overlay Theme

### Theme A: Spatial Governance (16 overlays)

**Peak State Conditions:**
- Perfect GPS/IMU lock (cm-level accuracy)
- All coordinate frames synchronized (<1ms divergence)
- Global/local agent agreement on spatial authority
- Complete 3D workspace coverage with no occlusions

**Fatigue Mechanisms:**
1. **Frame Drift Accumulation** (Overlays 23, 49, 57, 63)
   - **Symptom:** SE(3) transform errors compound over time
   - **Fatigue Type:** Epistemic degradation (uncertainty inflation)
   - **Threshold:** When transform uncertainty > 10cm OR angular error > 0.5°
   - **Archipelago Response:** Online model adaptation detects drift regime change, switches from dead-reckoning to map-anchored localization

2. **Coordinate Contract Violations** (Overlays 34, 60)
   - **Symptom:** Agents operate in misaligned frames → collision risk
   - **Fatigue Type:** Safety boundary erosion
   - **Threshold:** When transform chain length > 5 frames OR staleness > 100ms
   - **Archipelago Response:** Dynamic problem formulation reduces frame graph to minimum spanning tree, tightens update rates adaptively

3. **Global/Local Partition Thrashing** (Overlays 9, 14, 22, 36, 56, 64, 68)
   - **Symptom:** Agents oscillate between local/global authority
   - **Fatigue Type:** Decision instability (high switching overhead)
   - **Threshold:** When authority reassignments > 10/sec
   - **Archipelago Response:** Isolation-integration balance learning from Archipelago stabilizes partitioning via hysteresis thresholds

**Design Variables (Fatigue Resolution):**
- Frame update frequency: 1Hz (static maps) → 100Hz (dynamic objects)
- Authority handoff latency budget: 10ms → 100ms based on vehicle speed
- Transform chain depth limit: 3 (highway) → 7 (parking lot) based on spatial complexity

### Theme B: Fault Containment & Safety (10 overlays)

**Peak State Conditions:**
- Zero Byzantine faults detected
- All redundancy domains healthy (100% TMR availability)
- Safety margins >> minimum (large distance to hazard boundary)
- Fault injection testing passes all coverage targets

**Fatigue Mechanisms:**
1. **Byzantine Trust Erosion** (Overlays 2, 7, 44)
   - **Symptom:** Increasing disagreement between redundant channels
   - **Fatigue Type:** Trust score degradation
   - **Threshold:** When min_trust < 0.67 (Byzantine quorum threshold)
   - **Archipelago Response:** Trust system from 175-step bundle learns agent behavior online, updates trust models, re-selects TMR quorum adaptively

2. **Fault Injection Saturation** (Overlays 20, 21, 42, 45)
   - **Symptom:** No new failure modes discovered (testing plateau)
   - **Fatigue Type:** Verification coverage stagnation
   - **Threshold:** When new defects/1000 tests < 0.1 (diminishing returns)
   - **Archipelago Response:** Structure recognition identifies under-tested regions of state space, generates adversarial test cases targeting coverage gaps

3. **Safety Envelope Shrinkage** (Overlay 48)
   - **Symptom:** Feasible action polytope volume decreases (fewer safe options)
   - **Fatigue Type:** Operating margin compression
   - **Threshold:** When polytope volume < 20% of nominal OR no safe actions exist
   - **Archipelago Response:** Anytime planning from Archipelago: return conservative action quickly, expand action space over time as uncertainty resolves

**Design Variables (Fatigue Resolution):**
- TMR voting threshold: Strict majority (2/3) → Weighted by trust score
- Fault injection rate: 1 fault/sec (nominal) → 1000 faults/sec (chaos testing)
- Safety margin: 2× minimum (highway) → 5× minimum (school zone)

### Theme C: Witness & Evidence (9 overlays)

**Peak State Conditions:**
- All witness gates report consistent evidence
- ROM evidence packs cryptographically verified
- Invariant manifold coverage complete (all state dimensions witnessed)
- Evidence chain-of-custody unbroken from sensor to actuation

**Fatigue Mechanisms:**
1. **Witness Inconsistency Accumulation** (Overlays 10, 16, 24, 35, 47)
   - **Symptom:** Bilinear witness gates report contradictions
   - **Fatigue Type:** Logical inconsistency (commutativity violations)
   - **Threshold:** When witness_disagreement > 5% of observations
   - **Archipelago Response:** Uncertainty quantification exposes epistemic gaps, triggers re-calibration of witness thresholds or sensor fusion weights

2. **ROM Evidence Staleness** (Overlays 32, 35, 52, 58)
   - **Symptom:** Pre-computed invariants no longer match runtime observations
   - **Fatigue Type:** Distribution shift (ground truth evolution)
   - **Threshold:** When ROM_pack_mismatches > 10% over 1 hour window
   - **Archipelago Response:** Online model adaptation detects regime change, triggers OTA update request for refreshed ROM packs

3. **Evidence Storage Saturation** (Overlay 58)
   - **Symptom:** Audit trail exceeds storage capacity
   - **Fatigue Type:** Resource exhaustion
   - **Threshold:** When evidence_buffer > 90% capacity
   - **Archipelago Response:** Selective memory retention from Archipelago (salience-based): compress low-importance evidence, preserve safety-critical events

**Design Variables (Fatigue Resolution):**
- Witness gate threshold: Strict (0 tolerance) → Probabilistic (Bayesian confidence)
- Evidence retention: 30 days (full) → 1 year (compressed) based on criticality
- ROM pack update frequency: Weekly (nominal) → Daily (high mismatch rate)

### Theme D: Timing & Synchronization (9 overlays)

**Peak State Conditions:**
- All clock domains synchronized (ns-level alignment)
- Latency budgets met with headroom (actual < 50% of budget)
- Vector clocks causally consistent (no ordering violations)
- Pipeline depths balanced (no starvation or congestion)

**Fatigue Mechanisms:**
1. **Clock Domain Drift** (Overlays 6, 22, 43)
   - **Symptom:** Accumulated phase error between asynchronous domains
   - **Fatigue Type:** Temporal desynchronization
   - **Threshold:** When clock_skew > 10× CDC FIFO depth (data loss risk)
   - **Archipelago Response:** Adaptive clock sync from vector clock integration (F3 in 175-step bundle): predict drift, adjust sync intervals dynamically

2. **Latency Budget Exhaustion** (Overlays 3, 18, 30, 31, 40, 65)
   - **Symptom:** End-to-end latency approaches deadline
   - **Fatigue Type:** Temporal margin depletion
   - **Threshold:** When actual_latency > 90% of deadline_budget
   - **Archipelago Response:** Dynamic problem formulation: identify critical path bottleneck, offload non-critical computation, reallocate bandwidth to time-sensitive tasks

3. **Multi-Rate Timing Conflicts** (Overlay 43)
   - **Symptom:** Fast producers overwhelm slow consumers (buffer overflow)
   - **Fatigue Type:** Rate mismatch instability
   - **Threshold:** When buffer_occupancy > 80% sustained for >1 sec
   - **Archipelago Response:** Load balancing from routing integration (F11): backpressure signals slow down producers, priority inversion allows critical paths to drain buffers

**Design Variables (Fatigue Resolution):**
- Clock sync interval: 1ms (tight coupling) → 100ms (loose coupling) based on criticality
- Latency budget allocation: Fixed (static) → Dynamic (MAB-based bandwidth allocation)
- Buffer depths: 2× nominal (area-efficient) → 10× nominal (fault-tolerant)

### Theme E: Learning & Adaptation (9 overlays)

**Peak State Conditions:**
- RL policy converges to near-optimal (reward plateau)
- Safe exploration exhausts state space (full coverage)
- Dependency discovery complete (causal graph known)
- OTA updates deploy without rollback

**Fatigue Mechanisms:**
1. **Policy Oscillation** (Overlays 5, 24, 61, 67)
   - **Symptom:** RL loop fails to converge (reward variance high)
   - **Fatigue Type:** Learning instability
   - **Threshold:** When policy_gradient_norm > 0.1 sustained for 1000 iterations
   - **Archipelago Response:** Policy evolution momentum from Archipelago (F12): dampen updates, increase exploration temperature during instability, crystallize successful strategies into behavioral norms

2. **Dependency Discovery Stagnation** (Overlays 11, 33, 48, 53)
   - **Symptom:** No new causal relationships found (learning plateau)
   - **Fatigue Type:** Epistemic saturation
   - **Threshold:** When new_dependencies/1000_episodes < 0.01
   - **Archipelago Response:** Structure recognition identifies under-explored regions of state space, generates counterfactual scenarios (failure-to-feasible transitions) to discover hidden dependencies

3. **OTA Update Churn** (Overlay 28)
   - **Symptom:** Frequent policy rollbacks (instability in production)
   - **Fatigue Type:** Deployment fragility
   - **Threshold:** When rollback_rate > 20% of deployments
   - **Archipelago Response:** Emergent governance (F16): successful updates crystallize into norms, failed patterns blacklisted, meta-policy learns which changes are safe to deploy

**Design Variables (Fatigue Resolution):**
- RL exploration rate: ε=0.3 (aggressive) → ε=0.05 (conservative) based on safety context
- Dependency discovery window: 100 episodes (fast learning) → 10,000 episodes (thorough)
- OTA deployment strategy: Canary (5% fleet) → Blue-green (instant rollback)

### Theme F: Domain Portability (9 overlays)

**Peak State Conditions:**
- Domain packs swap seamlessly (zero reconfiguration latency)
- Invariants transfer across environments (100% validity)
- Coordinate contracts satisfied (no frame misalignment)
- Adapter overhead negligible (<1% performance cost)

**Fatigue Mechanisms:**
1. **Invariant Violation Accumulation** (Overlays 4, 37, 52, 60)
   - **Symptom:** Pre-computed invariants invalid in new domain
   - **Fatigue Type:** Portability breakdown
   - **Threshold:** When invariant_violations > 15% in target domain
   - **Archipelago Response:** Online parameter adaptation: re-learn invariants in new environment, update domain pack, preserve only domain-agnostic properties

2. **Coordinate Contract Breaches** (Overlays 4, 34, 60, 62)
   - **Symptom:** Frame assumptions fail (e.g., flat-world assumption in mountainous terrain)
   - **Fatigue Type:** Geometric model mismatch
   - **Threshold:** When frame_transform_residual > 1m vertical error
   - **Archipelago Response:** Model-class switching: detect non-planar terrain, switch from 2.5D to full 3D representation, recompute coordinate contracts

3. **Domain Swap Latency Explosion** (Overlays 13, 18, 25, 37, 54)
   - **Symptom:** Reconfiguration time exceeds deadline (e.g., highway→parking transition)
   - **Fatigue Type:** Temporal overhead
   - **Threshold:** When domain_swap_latency > vehicle_reaction_time (200ms)
   - **Archipelago Response:** Anytime domain loading: load critical invariants first (feasibility check), defer non-critical calibration to background, expose readiness certificate

**Design Variables (Fatigue Resolution):**
- Domain pack size: 10MB (minimal) → 1GB (comprehensive) based on environment complexity
- Swap latency budget: 50ms (real-time) → 5s (offline pre-loading)
- Invariant tolerance: Strict (0.1% violation) → Relaxed (5% violation) for non-safety properties

### Theme G: Hardware Substrate (8 overlays)

**Peak State Conditions:**
- Power consumption within TDP (no thermal throttling)
- All voltage domains stable (no droop/overshoot)
- Clock frequencies at maximum (no DVFS downscaling)
- Physical interfaces error-free (CRC passes 100%)

**Fatigue Mechanisms:**
1. **Thermal Throttling** (Overlays 4, 42)
   - **Symptom:** Junction temperature exceeds safe operating limits
   - **Fatigue Type:** Physical constraint violation
   - **Threshold:** When T_junction > 85°C (commercial) OR 105°C (automotive)
   - **Archipelago Response:** Resource allocation intelligence (F10): migrate computation to cooler tiles, reduce clock frequency on hot cores, throttle non-critical tasks

2. **Power Budget Depletion** (Overlay 4)
   - **Symptom:** Total power draw approaches battery/alternator capacity
   - **Fatigue Type:** Energy exhaustion
   - **Threshold:** When P_total > 90% of P_available
   - **Archipelago Response:** Dynamic problem formulation: identify power-hungry but non-critical tasks, apply DVFS selectively, defer deferrable computation

3. **Interface Degradation** (Overlays 12, 41, 55)
   - **Symptom:** Bit error rate increases on sensor/actuator links
   - **Fatigue Type:** Physical layer quality degradation
   - **Threshold:** When BER > 10^-6 sustained (FEC cannot recover)
   - **Archipelago Response:** Adaptive FEC from 175-step bundle (F5): detect error pattern (burst vs random), select stronger codes, increase retry budget

**Design Variables (Fatigue Resolution):**
- DVFS operating points: 5 levels (coarse) → 20 levels (fine-grained) based on workload
- Thermal headroom: 10°C (aggressive) → 30°C (conservative) based on reliability target
- Interface retry budget: 3 retries (latency-critical) → 10 retries (reliability-critical)

### Theme H: Verification & Testing (7 overlays)

**Peak State Conditions:**
- 100% coverage of requirements (all test cases pass)
- SIL/HIL/vehicle correlation perfect (sim matches reality)
- Digital twin synchronized (real-time shadow execution)
- Traceability complete (every requirement → test → evidence)

**Fatigue Mechanisms:**
1. **Coverage Saturation** (Overlays 13, 27, 34, 45, 56, 57)
   - **Symptom:** Additional testing yields no new defects
   - **Fatigue Type:** Diminishing returns on verification effort
   - **Threshold:** When defect_density < 0.01/KLOC for 10,000 test hours
   - **Archipelago Response:** Structure recognition identifies under-tested corner cases, generates adversarial scenarios (Byzantine attacks, sensor failures, edge-case geometries)

2. **SIL-HIL-Vehicle Divergence** (Overlays 13, 20, 27, 34, 54)
   - **Symptom:** Real vehicle behaves differently than simulation
   - **Fatigue Type:** Model validity degradation
   - **Threshold:** When sim-reality_error > 10% on safety-critical metrics
   - **Archipelago Response:** Online model adaptation: identify distribution shift, update simulation parameters from vehicle telemetry, re-validate digital twin

3. **Traceability Breaks** (Overlay 47)
   - **Symptom:** Requirements without tests, tests without evidence
   - **Fatigue Type:** Audit trail gaps
   - **Threshold:** When orphaned_requirements > 5% OR missing_evidence > 2%
   - **Archipelago Response:** Meta-architecture (F17): system learns which requirement patterns lack coverage, auto-generates test skeletons, flags gaps for manual review

**Design Variables (Fatigue Resolution):**
- Test suite size: 10,000 tests (baseline) → 1,000,000 tests (exhaustive) based on ASIL level
- SIL-HIL fidelity: 90% match (fast iteration) → 99.9% match (pre-deployment validation)
- Traceability granularity: Coarse (module-level) → Fine (line-level code coverage)

---

## Part 3: 2×2 Design Matrix - Fixed/Variable vs Software/Hardware

### Framework: Maximum Likelihood Ground Truth Response

The design must respond to **most probable operational conditions**, not worst-case or idealized scenarios. This is Bayesian thinking applied to architecture.

**Ground Truth Distribution for L5 Autonomy:**
- **80% of miles:** Highway/arterial, good visibility, dry pavement, moderate traffic
- **15% of miles:** Urban, varied visibility, wet conditions, heavy traffic
- **4% of miles:** Parking/low-speed, sensor occlusions, tight maneuvering
- **1% of miles:** Edge cases (construction, emergency vehicles, extreme weather)

**Design Principle:** Allocate resources proportional to probability, but **guarantee safety** even in the 1% tail.

---

### Quadrant 1: Fixed Software (Immutable Logic)

**Definition:** Code that cannot change post-deployment without regulatory re-certification

**Overlays Assigned:**
- Safety kernels (Overlay 48: Safety Envelope Geometry)
- Byzantine voting logic (Overlay 2, 7: TMR, Trust Boundaries)
- Coordinate contract enforcement (Overlay 34: Frame Contracts)
- ROM evidence validation (Overlay 35: ROM Evidence Packs)
- Critical latency budgets (Overlay 65: End-to-End Latency)

**Peak State:**
- All invariants hold (100% contract compliance)
- Zero logic bugs (formally verified)
- Execution time deterministic (WCET guaranteed)

**Fatigue Mechanisms:**
- **Environmental drift:** Fixed thresholds become invalid (e.g., sensor noise increases with age)
- **Regulatory obsolescence:** Safety standards evolve, fixed code non-compliant
- **Compositional complexity:** Interactions between fixed modules create emergent bugs

**Archipelago Enhancement:**
- **Physics-informed constraints** (F19): Embed conservation laws (causality, energy, information-theoretic bounds) as compile-time checks
- **Structure recognition** (F23): Static analyzer identifies which fixed code blocks are safety-critical vs performance-critical, applies different verification strategies
- **Anytime certification** (F22): Fixed code exposes worst-case and typical-case execution bounds, allows scheduler to make latency-quality tradeoffs

**Design Variables (Fixed Software):**
| Variable | 80% Miles (Highway) | 15% Miles (Urban) | 4% Miles (Parking) | 1% Miles (Edge) |
|----------|---------------------|-------------------|--------------------|-----------------|
| Byzantine quorum | 2/3 (performance) | 2/3 (performance) | 3/3 (safety) | 3/3 (safety) |
| Safety margin multiplier | 1.5× | 2.0× | 3.0× | 5.0× |
| Frame update deadline | 100ms | 50ms | 20ms | 10ms |
| Latency budget allocation | 70% perception, 20% planning, 10% control | 50% perception, 30% planning, 20% control | 40% perception, 40% planning, 20% control | Equal thirds |

**Response to Ground Truth:** Fixed software provides **safety floor** (guarantees) across all operating conditions. Performance variables (latency budgets, quorum sizes) adapt to probability-weighted conditions.

---

### Quadrant 2: Variable Software (Adaptive Logic)

**Definition:** Code that learns, adapts, or can be updated post-deployment

**Overlays Assigned:**
- RL policies (Overlay 5, 24, 61, 67: Safe RL Loops)
- Dependency discovery (Overlay 11, 33: Adaptiveness Loop)
- Trust score models (Overlay 7: Trust Boundaries - learning component)
- Sensor fusion weights (Theme C: Witness & Evidence - adaptive thresholds)
- OTA updatable modules (Overlay 28: OTA Policy Updates)

**Peak State:**
- Policies converged to near-optimal (reward maximized)
- Dependencies fully discovered (causal graph complete)
- Fusion weights calibrated (minimum Bayes risk)

**Fatigue Mechanisms:**
- **Learning plateau:** No improvement despite more data (epistemic saturation)
- **Distribution shift:** Learned policies invalid in novel environments
- **Update churn:** Frequent policy changes destabilize system

**Archipelago Enhancement:**
- **Multi-armed bandit exploration** (F7-F9): Policies learn which strategies work in which contexts, balance exploitation (proven tactics) vs exploration (novel approaches)
- **Meta-policy learning** (F16): System learns to learn—discovers which hyperparameters (learning rate, exploration rate) work best for which scenarios
- **Emergent governance** (F16, F18): Successful adaptation strategies crystallize into behavioral norms, unsuccessful patterns blacklisted automatically

**Design Variables (Variable Software):**
| Variable | 80% Miles (Highway) | 15% Miles (Urban) | 4% Miles (Parking) | 1% Miles (Edge) |
|----------|---------------------|-------------------|--------------------|-----------------|
| RL exploration rate (ε) | 0.05 (exploit) | 0.10 (balanced) | 0.20 (explore) | 0.30 (aggressive discovery) |
| Dependency discovery window | 1,000 episodes | 5,000 episodes | 10,000 episodes | Until convergence |
| Sensor fusion: Camera weight | 0.7 (reliable) | 0.5 (balanced) | 0.3 (occlusions) | 0.2 (fallback to lidar/radar) |
| OTA deployment strategy | Blue-green (instant rollback) | Canary (5% fleet, 24hr soak) | Shadow mode (validation only) | Disabled (stable only) |

**Response to Ground Truth:** Variable software adapts to **most likely conditions** (80% highway-optimized policies), but maintains **safe fallbacks** for tail scenarios. Learning is probability-weighted: more data collection in high-frequency contexts.

---

### Quadrant 3: Fixed Hardware (Immutable Substrate)

**Definition:** Physical architecture that cannot change post-fabrication

**Overlays Assigned:**
- IC topology (Overlay 1: Authority Volumes - 3D control volume)
- Fault containment domains (Overlay 2: Redundancy Domains - TMR structure)
- Clock domain boundaries (Overlay 6: Clock Domains - CDC isolation)
- Power/thermal islands (Overlay 4: Power/Thermal Islands - DVFS partitions)
- Memory hierarchy (Overlay 21, 58: Persistent vs Ephemeral State - cache/DRAM/flash)

**Peak State:**
- Thermal headroom maximum (cool operation)
- No timing violations (all paths meet setup/hold)
- Power consumption << TDP (energy-efficient)

**Fatigue Mechanisms:**
- **Aging degradation:** NBTI/HCI increase gate delays over years
- **Electromigration:** Metal lines thin, resistance increases
- **Thermal cycling:** Solder joints crack, connections degrade

**Archipelago Enhancement:**
- **Physics-informed constraints** (F19): Model aging as energy budget depletion, track cumulative stress (temperature-hours), predict failure before it occurs
- **Uncertainty quantification** (F20): Timing corners become probability distributions (not worst-case), schedule adapts to actual delay variation
- **Online model adaptation** (F21): Detect aging regime (fast degradation → slower degradation as saturation), adjust guardbands dynamically

**Design Variables (Fixed Hardware):**
| Variable | 80% Miles (Highway) | 15% Miles (Urban) | 4% Miles (Parking) | 1% Miles (Edge) |
|----------|---------------------|-------------------|--------------------|-----------------|
| Redundancy | 2×TMR compute (cost-effective) | 2×TMR compute + 1× spare | 3×TMR compute (safety) | 3×TMR all paths (ultra-safe) |
| Memory bandwidth | 100 GB/s (sufficient for highway perception) | 200 GB/s (urban sensor fusion) | 300 GB/s (parking maneuvers) | 400 GB/s (worst-case multi-sensor) |
| Clock frequency | 2.0 GHz (nominal, cool) | 2.5 GHz (turbo, acceptable thermal) | 2.0 GHz (thermal limited in traffic) | 1.5 GHz (graceful degradation) |
| Power budget allocation | 60W perception, 30W planning, 10W control | 50W perception, 40W planning, 10W control | 40W each (balanced) | 30W each (degraded mode) |

**Response to Ground Truth:** Fixed hardware is **provisioned for 99th percentile** of the 80% case (highway worst-case), but includes **thermal/power headroom** for the 15% (urban) scenario. The 1% edge cases trigger graceful degradation (lower clock frequency, reduced functionality).

---

### Quadrant 4: Variable Hardware (Adaptive Substrate)

**Definition:** Hardware that can reconfigure at runtime (DVFS, routing, partitioning)

**Overlays Assigned:**
- DVFS control (Overlay 4: Power/Thermal Islands - voltage/frequency scaling)
- Adaptive routing (Overlay 3: Streaming Dataflow - bandwidth allocation)
- Reconfigurable compute (Overlay 18: Hardware Customization Knobs - tileable primitives)
- Dynamic memory allocation (Overlay 21: Memory vs Ephemeral State - cache partitioning)
- Sensor interface adaptation (Overlay 12: Physical Interfaces - protocol switching)

**Peak State:**
- All cores at maximum frequency (no thermal limit)
- Bandwidth fully utilized (zero idle cycles)
- Memory allocated optimally (cache hit rate maximized)

**Fatigue Mechanisms:**
- **Reconfiguration overhead:** Switching costs (latency, energy) dominate
- **Metastability:** Voltage/frequency transitions cause glitches
- **Thrashing:** Too-frequent adaptation creates instability

**Archipelago Enhancement:**
- **Resource allocation intelligence** (F10-F11): Learn which workloads benefit from which DVFS states, predict future demand, pre-scale voltage proactively
- **Routing-resource co-optimization** (F11): Bandwidth allocation and task placement jointly optimized (not sequential decisions)
- **Isolation-integration balance** (F17): System learns when to partition workloads (avoid interference) vs collocate (data locality)

**Design Variables (Variable Hardware):**
| Variable | 80% Miles (Highway) | 15% Miles (Urban) | 4% Miles (Parking) | 1% Miles (Edge) |
|----------|---------------------|-------------------|--------------------|-----------------|
| DVFS state | P0 (max freq, low voltage margin) | P1 (high freq, nominal voltage) | P2 (medium freq, safe voltage) | P3 (low freq, maximum voltage margin) |
| NoC bandwidth allocation | 70% perception, 20% planning, 10% control | 50/30/20 | 40/40/20 | Equal thirds (degraded fairness) |
| Cache partitioning | 60% perception (camera frames), 30% maps, 10% control | 40/40/20 | 30% each (balanced) | 25% each (guaranteed minimum) |
| Sensor interface: Frame rate | 60 FPS camera (sufficient for highway) | 120 FPS camera (urban reaction time) | 30 FPS camera (parking low-speed) | 10 FPS camera (degraded mode) |

**Response to Ground Truth:** Variable hardware **follows workload distribution** (DVFS high during 80% highway miles where thermal headroom exists), but maintains **reconfiguration budget** for rapid transitions (highway → urban requires P0 → P1 transition in <100ms).

---

## Part 4: Sensor-to-Substrate Flow for L5 Autonomy

### Sensor Input Layer (Physical World Interface)

**Sensor Suite (Overlays 12, 41):**
1. **Cameras** (8× surround + 1× front high-res)
   - **Peak:** 120 FPS, 12 MP, HDR, perfect calibration
   - **Fatigue:** Lens contamination (rain/dirt), sensor aging (dark current), misalignment (vibration)
   - **Archipelago:** Adaptive FEC (F5) - detect image quality degradation, switch to radar-primary fusion

2. **Lidar** (4× solid-state, 360° coverage)
   - **Peak:** 10 Hz, 200m range, 0.1° angular resolution
   - **Fatigue:** Returns degradation (fog/rain), interference (other lidars), calibration drift
   - **Archipelago:** Online model adaptation (F21) - detect weather regime change (clear → fog), increase radar weighting

3. **Radar** (6× long-range + 8× short-range)
   - **Peak:** 250m range, Doppler velocity, all-weather
   - **Fatigue:** Multipath interference (urban canyons), false positives (metal debris)
   - **Archipelago:** Uncertainty quantification (F20) - track radar confidence, inflate uncertainty in known multipath zones

4. **IMU/GPS** (Dual redundant, RTK-GPS)
   - **Peak:** cm-level position, 0.1° orientation, 1000 Hz update
   - **Fatigue:** GPS denial (tunnels), IMU drift (temperature), magnetic interference
   - **Archipelago:** Vector clock synchronization (F3) - detect GPS dropout, switch to dead-reckoning with uncertainty inflation

5. **Ultrasonic** (12× parking sensors)
   - **Peak:** 5m range, 40 Hz, obstacle detection
   - **Fatigue:** Temperature dependence (speed of sound), cross-talk
   - **Archipelago:** Physics-informed constraints (F19) - compensate for temperature using thermodynamic model

### Fusion Point Layer (Multi-Modal Integration)

**Fusion Architecture (Overlays 16, 24, 35, 47):**

**Level 1: Sensor-Level Fusion (Within Modality)**
- **Camera Fusion:** Stereo depth estimation + temporal tracking
  - **Peak:** 10cm depth accuracy at 50m
  - **Fatigue:** Occlusions, low texture, motion blur
  - **Archipelago:** Witness gates (Theme C) - camera disagreement triggers lidar cross-check
  
**Level 2: Feature-Level Fusion (Across Modalities)**
- **Object Detection:** Camera (appearance) + Lidar (geometry) + Radar (velocity)
  - **Peak:** 99% detection, 0.1% false positive, 50m range
  - **Fatigue:** Sensor disagreement (rain affects camera differently than radar)
  - **Archipelago:** Bayesian sensor fusion with learned weights (Variable Software) - trust scores adapt to conditions

**Level 3: Semantic-Level Fusion (World Model)**
- **Spatial Fabric:** Unified 3D representation (Overlays 23, 49, 57, 63)
  - **Peak:** Complete 360° coverage, all objects tracked, 10cm localization
  - **Fatigue:** Map staleness, dynamic object prediction errors, frame drift
  - **Archipelago:** Frame contract enforcement (F4) - SE(3) transform chain validated, violations trigger re-localization

**Level 4: Temporal Fusion (Prediction)**
- **Trajectory Forecasting:** Predict future states of dynamic objects
  - **Peak:** 3-second horizon, 90% accuracy, multimodal hypotheses
  - **Fatigue:** Non-stationary agent behavior, novel scenarios
  - **Archipelago:** RL-based prediction (Overlay 61, 67) - learn intent models, adapt to aggressive/defensive driver patterns

### Hardware/Software Territory (Computational Substrate)

**Mapping: Fusion Points → Compute Resources**

**Simultaneous Hardware/Software Co-Design Principle:**
Given maximum likelihood ground truth (80% highway, good visibility), we design hardware provisioned for this case, with software adapting to deviations.

#### Perception Pipeline (Overlays 3, 18, 55)

**Hardware:**
- **Fixed:** 2× perception accelerators (camera ISP + lidar point cloud processing)
  - Provisioned for: 8× 120 FPS cameras + 4× 10 Hz lidars at P1 DVFS state
  - Thermal budget: 60W (highway), 50W (urban due to lower ambient), 40W (parking due to lower speed = less cooling)
  
- **Variable:** DVFS + dynamic lane allocation
  - P0 (highway, low latency): 2.5 GHz, 0.9V → 70W peak (within thermal budget)
  - P1 (urban, balanced): 2.0 GHz, 0.85V → 50W nominal
  - P2 (parking, low-speed): 1.5 GHz, 0.8V → 35W degraded
  
**Software:**
- **Fixed:** Object detection thresholds (regulatory requirement: must detect pedestrian at 50m)
- **Variable:** Fusion weights
  - Highway: Camera 0.7, Lidar 0.2, Radar 0.1 (visual conditions optimal)
  - Urban: Camera 0.5, Lidar 0.3, Radar 0.2 (occlusions increase lidar value)
  - Parking: Camera 0.3, Lidar 0.5, Radar 0.2 (close-range, lidar superior)
  - Edge (rain): Camera 0.2, Lidar 0.2, Radar 0.6 (weather degrades optical sensors)

**Archipelago Integration:**
- **Multi-Armed Bandit** (F7): Each sensor modality is an "arm" - system learns which sensors provide best information in which contexts, allocates compute bandwidth accordingly
- **Contention Learning** (F10): Track which fusion points bottleneck under load, proactively allocate more accelerator lanes before saturation

#### Planning Pipeline (Overlays 5, 48, 50, 61)

**Hardware:**
- **Fixed:** 1× planning processor (graph search + trajectory optimization)
  - Provisioned for: 100 candidate trajectories, 3-second horizon, 10 Hz replanning
  
- **Variable:** Anytime planning with quality-time tradeoff
  - Highway: 50ms budget → 20 candidates (sufficient for structured environment)
  - Urban: 100ms budget → 50 candidates (complex intersections)
  - Parking: 200ms budget → 100 candidates (tight maneuvering)
  - Edge: 20ms budget → 5 candidates (emergency reaction)

**Software:**
- **Fixed:** Safety envelope (Overlay 48) - feasible action polytope never includes collisions
- **Variable:** Objective function weights
  - Highway: 80% progress, 15% comfort, 5% efficiency
  - Urban: 50% progress, 30% comfort, 20% efficiency (stop-and-go)
  - Parking: 30% progress, 50% comfort (tight spaces), 20% efficiency
  - Edge: 100% safety (ignore comfort/efficiency)

**Archipelago Integration:**
- **Anytime Planning** (F22): Return safe action quickly (10ms: simple brake), improve over time (50ms: lane change, 100ms: complex merge)
- **Policy Evolution** (F16): Successful maneuvers become embedded behaviors (e.g., "always brake early in rain" crystallizes into norm)

#### Control Pipeline (Overlays 3, 31, 40, 65)

**Hardware:**
- **Fixed:** 1× real-time control processor (PID loops, model predictive control)
  - Provisioned for: 1 kHz control loop (1ms latency budget)
  
- **Variable:** Actuator bandwidth allocation
  - Highway: 70% steering, 20% throttle, 10% brake (lane-keeping dominant)
  - Urban: 40% steering, 30% throttle, 30% brake (balanced)
  - Parking: 60% steering, 20% throttle, 20% brake (tight turns)

**Software:**
- **Fixed:** Latency budget (Overlay 65) - sensor-to-actuator < 100ms (regulatory)
- **Variable:** Control gains (PID tuning)
  - Highway: High proportional gain (responsive steering)
  - Urban: High derivative gain (smooth stop-and-go)
  - Parking: Low gains (gentle maneuvers)

**Archipelago Integration:**
- **Latency as Geometry** (Overlay 40): Critical path analysis identifies bottleneck (usually perception), reallocates compute to meet deadline
- **Physics-Informed Constraints** (F19): Vehicle dynamics (max lateral acceleration, brake torque limits) embedded as hard constraints

---

## Part 5: L5 Autonomy Design Strategy

### Sequential Consideration: Local Fatigue → Global Peak

**Principle:** Resolve component-level fatigues first (local), then optimize for system-level peaks (global).

#### Local Fatigue Resolution (Component-Level)

**Cameras:**
- **Fatigue:** Lens contamination → **Threshold Adjustment:** Lower detection confidence threshold from 0.9 to 0.7 in rain
- **Fatigue:** Sensor aging (dark current) → **Threshold Adjustment:** Increase exposure time from 10ms to 15ms (compensate for reduced sensitivity)

**Lidar:**
- **Fatigue:** Returns degradation (fog) → **Threshold Adjustment:** Lower point cloud density threshold from 1000 pts/m² to 500 pts/m²
- **Fatigue:** Calibration drift → **Threshold Adjustment:** Expand transform uncertainty from ±0.1° to ±0.5° (widen trust interval)

**Radar:**
- **Fatigue:** False positives (metal debris) → **Threshold Adjustment:** Increase Doppler velocity threshold from 1 m/s to 3 m/s (filter stationary clutter)

**IMU/GPS:**
- **Fatigue:** GPS denial (tunnel) → **Threshold Adjustment:** Inflate localization uncertainty from ±10cm to ±1m (dead-reckoning mode)

**Compute:**
- **Fatigue:** Thermal throttling (85°C) → **Threshold Adjustment:** Reduce DVFS from P0 to P1 (2.5 GHz → 2.0 GHz)
- **Fatigue:** Memory bandwidth saturation (90%) → **Threshold Adjustment:** Drop camera frame rate from 120 FPS to 60 FPS

#### Global Peak Optimization (System-Level)

**After local fatigues resolved, optimize for global peaks:**

**Highway Scenario (80% of miles):**
- **Goal:** Maximize cruise speed while maintaining safety margin
- **Optimization:** Increase planning horizon from 3 sec to 5 sec (smoother trajectories), reduce safety margin from 5× to 2× (more aggressive lane changes)

**Urban Scenario (15% of miles):**
- **Goal:** Minimize discomfort (jerk) while maintaining throughput
- **Optimization:** Increase control loop frequency from 100 Hz to 200 Hz (smoother braking), add predictive cruise control (anticipate traffic flow)

**Parking Scenario (4% of miles):**
- **Goal:** Minimize maneuver time while maintaining zero-collision guarantee
- **Optimization:** Increase trajectory candidates from 50 to 100 (explore tighter paths), add parallel planning (compute multiple parking strategies simultaneously)

**Edge Cases (1% of miles):**
- **Goal:** Guarantee safety even in novel scenarios
- **Optimization:** Disable all performance optimizations, fall back to conservative baseline (fixed software guarantees)

### Simultaneous Hardware/Software Treatment

**Critical Insight:** Hardware and software must be designed **together**, not sequentially, because they constrain each other.

**Example: Sensor Fusion Under Thermal Constraint**

**Problem:** Urban driving (15% miles) requires high camera frame rate (120 FPS) for pedestrian detection, but this exceeds thermal budget (50W) at P0 DVFS state.

**Sequential Approach (Wrong):**
1. Hardware team: "We'll provision for 60W thermal budget"
2. Software team: "We need 120 FPS cameras, that requires 70W"
3. **Conflict:** Hardware cannot support software requirement

**Simultaneous Approach (Correct):**
1. **Joint analysis:** 120 FPS cameras at P0 DVFS = 70W, but 80 FPS cameras at P1 DVFS = 50W
2. **Software adaptation:** Reduce camera frame rate to 80 FPS (still sufficient for pedestrian detection per regulatory requirement)
3. **Hardware provision:** Design for 50W thermal budget at P1 DVFS state
4. **Result:** No conflict, both hardware and software constraints satisfied

**Archipelago Integration:**
- **Resource Allocation Intelligence** (F10): System learns the Pareto frontier of frame rate vs power consumption, operates at optimal point
- **Dynamic Problem Formulation** (F2): When thermal budget violated, formulate optimization: minimize detection performance loss subject to power constraint

---

## Part 6: Specificity Increasing as Design Progresses

**Principle:** Start general, add specificity as understanding increases. Avoid premature optimization.

### Design Phase 1: High-Level Architecture (Overlays 1-68)

**Specificity Level:** Low (conceptual)
- **Spatial Governance:** "Global and local agents exist"
- **Fault Containment:** "System tolerates Byzantine faults"
- **Timing:** "Latency budgets must be met"

**Archipelago Role:** Identify which overlays are safety-critical (cannot change) vs performance-tunable (can adapt)

### Design Phase 2: Sensor Fusion Architecture (This Document)

**Specificity Level:** Medium (subsystem interfaces defined)
- **Spatial Governance:** "Frame graph has SE(3) transforms between camera/lidar/radar/IMU frames, updated at 100 Hz"
- **Fault Containment:** "TMR voting on object detection outputs, 2/3 quorum required"
- **Timing:** "Sensor-to-actuation latency budget: perception 50ms, planning 30ms, control 20ms"

**Archipelago Role:** Define how adaptation policies will work (MAB for sensor selection, Bayesian fusion weights)

### Design Phase 3: Implementation & Training (Future - Deferred)

**Specificity Level:** High (code, hyperparameters, training data)
- **Spatial Governance:** "Camera→Lidar transform: T_cam_lidar = [R|t] where R = Rodrigues(θ_x, θ_y, θ_z), calibrated via checkerboard"
- **Fault Containment:** "TMR voter implemented as: out = majority(A, B, C) with trust-weighted tiebreaker: if no majority, pick max(trust_A×A, trust_B×B, trust_C×C)"
- **Timing:** "Perception latency breakdown: ISP 10ms, object detection 25ms, tracking 10ms, fusion 5ms = 50ms total"

**Archipelago Role:** Train the adaptive policies (RL for planning, Bayesian inference for fusion weights, online calibration)

**Why Defer Training Details:**
1. **Premature Specificity Waste:** Training hyperparameters (learning rates, batch sizes) depend on final hardware specs (memory bandwidth, compute throughput) which aren't frozen yet
2. **Data Requirements Unknown:** Can't specify training dataset until sensor suite finalized (camera resolution, lidar density, radar configuration)
3. **Validation Needs Clarity:** Test scenarios depend on understanding failure modes from Phase 2 (which sensors fail together, which fusion strategies are fragile)

**When to Add Specificity:**
- **Trigger 1:** Hardware tapeout (chip layout frozen) → Now specify training infrastructure (GPU cluster, dataset storage)
- **Trigger 2:** Sensor prototypes available → Now collect calibration data, train initial fusion models
- **Trigger 3:** SIL validation complete → Now refine training objectives based on observed failure modes

---

## Part 7: Summary - Archipelago as Improvement Policy Package

### Core Insight

Archipelago is not a collection of features to add. It's a **systematic methodology** for continuous improvement:

1. **Dynamic Problem Formulation:** System recognizes when a new optimization instance arises (e.g., entering tunnel = GPS-denied regime), formulates the problem (dead-reckoning with uncertainty inflation), selects solver (Kalman filter vs particle filter)

2. **Structure Recognition:** System detects problem properties (convex vs non-convex, deterministic vs stochastic, single-agent vs multi-agent), picks appropriate algorithm

3. **Adaptive Objectives:** System reweights goals as context changes (highway: prioritize speed, urban: prioritize comfort, edge: prioritize safety)

4. **Learning-to-Governance Translation:** Successful strategies crystallize into policies (e.g., "always increase lidar weight in rain" becomes embedded norm)

5. **Meta-Architecture:** System learns to improve itself (discovers which hyperparameters work best, which test strategies find more bugs)

### Application to 68 Overlays

Each overlay has:
- **Peak State:** Optimal operating condition
- **Fatigue Mechanism:** Degradation mode with threshold
- **Design Variable:** Tunable parameter that resolves fatigue
- **Archipelago Enhancement:** How improvement policy applies

### 2×2 Design Matrix Summary

| Quadrant | Definition | Archipelago Role | L5 Autonomy Example |
|----------|------------|------------------|---------------------|
| **Fixed Software** | Immutable logic (safety kernel) | Physics-informed constraints, formal verification | Byzantine voting, safety envelope |
| **Variable Software** | Adaptive logic (learning) | MAB exploration, emergent governance | RL policies, sensor fusion weights |
| **Fixed Hardware** | Immutable substrate (chip) | Aging models, UQ on timing | TMR redundancy, memory hierarchy |
| **Variable Hardware** | Reconfigurable substrate (DVFS) | Resource allocation intelligence, co-optimization | Power scaling, bandwidth allocation |

### Sensor-to-Substrate Flow Summary

**Sensors** (8 cameras, 4 lidars, 6 radars, IMU/GPS, ultrasonics)  
↓ **Sensor-Level Fusion** (within modality: stereo, temporal tracking)  
↓ **Feature-Level Fusion** (across modalities: camera+lidar+radar object detection)  
↓ **Semantic-Level Fusion** (world model: spatial fabric with SE(3) frames)  
↓ **Temporal Fusion** (prediction: trajectory forecasting)  
↓ **Planning** (graph search + optimization over safety envelope)  
↓ **Control** (MPC + PID loops with latency budget)  
↓ **Actuators** (steering, throttle, brake)

At each level, **hardware/software co-designed simultaneously**, with **specificity increasing** as design matures.

### Next Steps (Deferred to Future)

1. **Training Infrastructure:** GPU cluster sizing, dataset storage, simulation harness
2. **Hyperparameter Search:** Learning rates, exploration rates, fusion weights initialization
3. **Validation Scenarios:** SIL/HIL/vehicle test matrix based on identified failure modes
4. **Deployment Strategy:** OTA update pipeline, shadow mode validation, fleet rollout

---

**End of Document**

This establishes the **foundation** for L5 autonomy system design informed by Archipelago improvement policy package. Training details will be informed by insights from this architectural synthesis.
