# Quantum sensing for autonomous vehicles: what works now and what doesn't

**Only two quantum sensing technologies are genuinely ready for automotive prototype integration today: chip-scale atomic clocks and SPAD-based single-photon detectors.** Everything else — cold atom interferometers, NV-center magnetometers, entangled photon LiDAR — remains years to decades from vehicle-grade deployment, despite impressive laboratory results. A meaningful proof-of-concept prototype within a $200–400k budget is achievable, but intellectual honesty demands distinguishing between technologies exploiting "Quantum 2.0" phenomena (superposition, entanglement, coherence) and those using quantum physics at the same level all semiconductors do. This report maps every relevant technology across the electromagnetic spectrum, provides specific vendor and cost data, and delivers an actionable prototype implementation pathway.

---

## 1. Energy spectrum decomposition across quantum sensing modalities

The following table maps quantum sensing technologies to their operating energy ranges, physical principles, and current maturity. Photon energies span nearly five orders of magnitude from microwave atomic transitions (~40 µeV) through near-infrared single-photon detection (~1.3 eV) to optical clock transitions (~2.3 eV).

| Energy regime | Frequency / wavelength | Technology | Physical principle | Commercial maturity | Key performance parameters |
|---|---|---|---|---|---|
| **Microwave** (4.6–9.2 GHz, ~19–38 µeV) | 9.192 GHz (Cs); 6.834 GHz (Rb) | **Chip-scale atomic clocks (CSAC)** | Coherent population trapping on hyperfine ground-state splitting; VCSEL probes Cs D1 line at 894.3 nm, modulated at half-transition frequency | **TRL 8–9.** Microchip SA65 shipping; >100,000 units sold since 2011 | ADEV **3×10⁻¹⁰** at τ=1s; holdover <1 µs/day; 35g, 120 mW, –40°C to +80°C |
| **Microwave** (2.87 GHz, ~12 µeV) | 2.87 GHz zero-field splitting | **NV-center diamond magnetometry** | Optically detected magnetic resonance of nitrogen-vacancy electron spin states; 532 nm optical pumping, microwave manipulation, fluorescence readout 637–800 nm | **TRL 3–5.** Bosch/Element Six JV (Apr 2025); Q.ANT, Kwan-tek prototypes | Sensitivity **~1 nT/√Hz** ensemble; Bosch claims 20 pT/√Hz; room-temperature operation |
| **Microwave/RF** (6.8 GHz Raman) + **NIR optical** (780 nm, 1.59 eV) | Rb D2 line 780 nm; two-photon Raman at 6.834 GHz splitting | **Cold atom interferometry** (accelerometers, gyroscopes) | Matter-wave Mach-Zehnder interferometry on laser-cooled ⁸⁷Rb atoms; phase encodes acceleration as k_eff·a·T² | **TRL 4–6.** AOSense flight-tested 6-axis IMU (2024); Exail AQG shipping (16 units) | Accel bias **6×10⁻⁸ g**; gyro stability **3×10⁻¹⁰ rad/s**; rate 1–4 Hz; SWaP: 0.1–1 m³, 100–500 W |
| **NIR** (905 nm, 1.37 eV) | 905 nm / 940 nm | **SPAD single-photon LiDAR** | Avalanche multiplication above breakdown voltage; single photon triggers digital pulse; time-of-flight via TCSPC histogramming | **TRL 7–8.** Sony IMX459/479, Ouster REV7 (L3 chip), Hesai ET25 shipping | PDE **22%** (BSI); range **>250 m**; timing jitter ~100 ps → **1.5 cm** range resolution |
| **NIR** (1550 nm, 0.80 eV) | 1550 nm eye-safe | **InGaAs SPAD / SNSPD detectors** | Same avalanche principle but in InGaAs/InP; SNSPDs require cryogenics (~2 K) | **TRL 7–8** (InGaAs modules); **TRL 9 lab-only** (SNSPD) | ID Quantique ID Qube: QE **35%**, DCR <200 Hz, jitter <200 ps; SNSPD: QE >90%, jitter <40 ps |
| **Visible** (400–700 nm, 1.8–3.1 eV) | Broadband visible | **Event-based neuromorphic vision** | Asynchronous per-pixel brightness-change detection; each pixel independently fires on log-intensity change | **TRL 8–9.** Prophesee IMX636 (Sony collab) shipping in industrial cameras | **1280×720** pixels; DR >120 dB; latency **<100 µs**; power 1.5 W; timestamp precision 1 µs |
| **Visible/Green** (532 nm, 2.33 eV) | 532 nm (frequency-doubled 1064 nm) | **Optical atomic clocks** (iodine molecular) | Spectroscopy of I₂ hyperfine transitions at 532 nm; optical frequency comb bridges optical→microwave | **TRL 6–7.** Vector Atomic EG-30 first commercial optical clock; Infleqtion Tiqker pre-production | ADEV **2.5×10⁻¹⁴** at τ=1s (100× better than CSAC); 29L, 20 kg, 80 W; demonstrated at sea for 3 weeks |
| **Visible** (698 nm, 1.78 eV) | Sr clock transition at 429 THz | **Optical lattice clocks** (strontium, ytterbium) | Laser-cooled atoms trapped in optical lattice; ultra-narrow clock transition interrogated | **TRL 2–3.** PTB transportable clock in trailer; NIST/JILA lab systems | Uncertainty **2.1×10⁻¹⁸**; would lose 1 second in 15 billion years; not vehicle-deployable |
| **NIR** (710 nm, 1.75 eV degenerate SPDC) | Entangled photon pairs from SPDC | **Quantum illumination / quantum LiDAR** | Entangled signal-idler pairs; joint measurement exploits residual correlations for 6 dB theoretical SNR advantage | **TRL 2–3.** Lab demonstrations only; 11 m range indoor; no automotive prototype exists | Theoretical 6 dB advantage in high-noise regime; requires <1 mean photon/mode, fundamentally limiting range/speed |

**Key physical insight**: The technologies closest to automotive deployment exploit quantum phenomena at relatively low complexity — atomic energy-level transitions (clocks) and single-photon avalanche detection (SPADs). Technologies requiring maintained quantum coherence over macroscopic scales (cold atom interferometry) or preserved entanglement through lossy channels (quantum illumination) face exponentially harder engineering challenges.

---

## 2. Technology-to-application mapping for autonomous vehicles

### Timing and synchronization (CSAC → sensor fusion backbone)

The Microchip **SA65 CSAC** is the single highest-value quantum technology for an AV prototype. At **35 g, 120 mW, and –40°C to +80°C**, it already meets automotive temperature requirements. Its primary application is maintaining sub-microsecond timing holdover when GPS is unavailable — critical in urban canyons, tunnels, and GPS-denied/spoofed environments. Pseudorange error drops from **0.6 m** (TCXO) to **0.075 m** with CSAC-disciplined timing, and positioning becomes possible with only 3 satellites instead of 4.

Representative vendors: **Microchip SA65** (~$1,500–3,000), **SA65-LN** (~$2,000–4,000, Jan 2025 release with integrated EMXO), **Teledyne e2v TCSAC** (~$1,500–3,000), **Safran mRO-50** (~$2,000–5,000). Environmental constraints are minimal — the SA65 withstands MIL-STD-810G vibration (7.7 g RMS) and 500–1,000 g shock. **Automotive TRL: 5–6** (demonstrated in military vehicles, kinematic GPS tests; not yet AEC-Q100 qualified). Timeline to automotive production: **2–4 years** with packaging adaptation.

### Ranging and 3D perception (SPAD arrays → single-photon LiDAR)

SPAD-based dToF LiDAR represents the convergence point between quantum photon counting and practical automotive sensing. **Sony's IMX479** (announced June 2025) achieves **164,000 physical pixels** at **0.05° vertical resolution** and **5 cm range resolution** — a 2.7× improvement over the IMX459. Ouster's **REV7 family** (L3 chip) ships today at $7,400–$16,000 with 128 vertical channels, 200 m range, and IP68/IP69K rating at –40°C to +60°C. The Ouster **Chronos chip** (DF series) targets automotive ASIL-B qualification with zero moving parts.

Key automotive challenge: **dark count rate doubles every 8–10°C**, so at +85°C qualification temperatures, DCR can be 100× higher than at 25°C, degrading SNR. Mitigation strategies include photon coincidence detection (implemented in ST's automotive SPAD arrays), narrow-band optical filtering, and on-chip histogram processing. **Automotive TRL: 7–8** for SPAD LiDAR systems; **TRL 2–3** for entanglement-based quantum LiDAR.

### Inertial navigation (cold atom interferometry → drift-free dead reckoning)

Cold atom interferometers offer the promise of **effectively drift-free** inertial measurement, with demonstrated accelerometer bias stability of **6×10⁻⁸ g** (Exail/ONERA, 2022) — roughly 1,000× better than navigation-grade MEMS. AOSense flight-tested a **6-axis quantum IMU** on a Beechcraft 1900D in 2024, achieving 4 hours of GPS-free navigation. Vector Atomic delivered a space-qualified quantum inertial sensor for the X-37B mission (August 2025).

However, the automotive environment is devastating for cold atoms: **vehicle vibrations of 0.5–5 g RMS** cause phase shifts exceeding π, scattering measurements across interference fringes. Current systems occupy **0.1–1 m³** and consume **100–500 W**. Measurement rates of 1–4 Hz are far below the >100 Hz required for dynamic vehicle control. **Automotive TRL: 2–3.** DARPA's RoQS program (Phase 1 launched August 2025) exists precisely because this lab-to-field gap remains unsolved. Realistic automotive deployment: **2035–2040+**.

### Magnetic navigation (quantum magnetometers → GPS-independent position fixing)

**Q-CTRL's Ironstone Opal** represents the most advanced fielded quantum navigation system: it achieved **22 m accuracy** (0.01% of flight distance) in airborne trials using quantum magnetometers + AI denoising + magnetic map matching, and demonstrated **6–7× improvement over strategic-grade INS** in the first-ever successful ground vehicle MagNav trial. **SandboxAQ's AQNav** has accumulated **200+ flight hours** and achieved RNP 2 accuracy (<74 m over mountains).

Critical caveat for automotive: magnetic anomaly maps at road-level resolution **do not exist** and would be extremely expensive to create. Best-case airborne accuracy of ~22–74 m is orders of magnitude too coarse for lane-keeping. NV diamond magnetometers (Bosch/Element Six JV, Kwan-tek) operate at room temperature but achieve ~1 nT/√Hz sensitivity — adequate for MagNav anomaly detection but requiring further miniaturization. **Automotive TRL: 3–4** for NV-based MagNav; **5–6** for optically-pumped magnetometer MagNav (aviation only).

### Event-driven perception (neuromorphic sensors → low-latency detection)

Prophesee's **IMX636** event camera (Sony collaboration) achieves **>120 dB dynamic range**, **<100 µs pixel latency**, and equivalent **>10,000 fps** temporal resolution at only **1.5 W** — directly addressing the high-dynamic-range scenarios where conventional frame cameras fail (tunnel exits, oncoming headlights). Terranet's VoxelFlow (with Mercedes-Benz) uses event cameras for 30–40 m collision avoidance. Event cameras produce data only on brightness change, achieving **10–1,000× data reduction** versus frame cameras.

The natural pairing with SPAD arrays is architecturally significant: both produce asynchronous discrete events (photon detections) rather than synchronous frames, mapping directly to neuromorphic processing. BrainChip's **Akida AKD1000** ($289 PCIe board, ~1 W) and Intel **Loihi 2** (75× lower latency than Jetson Orin Nano) can process event streams natively. **Automotive TRL: 8–9** for event cameras; **TRL 4** for SPAD-event fusion processing; no ISO 26262 certification exists for any neuromorphic chip.

---

## 3. Practical prototype implementation within $200–400k

### Recommended sensor suite and costs

The prototype follows a "quantum timing backbone + single-photon perception + event-driven processing" architecture. All recommended sensors operate at room temperature — **no cryogenics required** — which is the single most important constraint enabling a practical build.

**Tier 1 — Minimum viable quantum-enhanced prototype (~$200k):**

| Category | Specific items | Cost |
|---|---|---|
| **Vehicle platform** | Used Chrysler Pacifica or similar SUV ($35k) + Dataspeed DBW kit ($20k) | **$55,000** |
| **Conventional sensors** | Ouster OS1-128 LiDAR ($18k), 4× short-range LiDAR ($12k), 8× HD GMSL2 cameras ($4k), 4× radar ($6k), tactical IMU ($4k), GNSS receiver ($3k) | **$47,000** |
| **Quantum/advanced sensors** | 2× Microchip SA65 CSAC redundant pair ($6k), 2× Prophesee EVK4 HD event cameras ($8k), 3× BrainChip Akida PCIe ($900), 4× STMicro SPAD dToF modules ($1k), 1× Hamamatsu research SPAD module ($5k) | **$20,900** |
| **Precision timing network** | White Rabbit switch ($5k), 4× WR-LEN endpoint nodes ($4k), SFP transceibers + fiber ($1k), CSAC-disciplined PTP grandmaster ($3k) | **$13,000** |
| **Compute** | 2× NVIDIA Jetson AGX Orin 64GB ($4k), AMD Kria KV260 FPGA ($500), industrial PC for logging ($3k), 10GbE switch ($1k) | **$8,500** |
| **Infrastructure** | Vibration isolation platform ($3k), custom mounts ($5k), DC-DC power distribution ($3k), cabling/enclosures ($5k) | **$16,000** |
| **Integration labor** | 6 months × 2 engineers ($30k) + software development ($10k) | **$40,000** |
| **Total** | | **~$200,400** |

**Tier 3 — Full research platform (~$400k)** adds: Pi Imaging SPAD512 research camera ($25k), Luminar Iris automotive LiDAR ($15k), additional event cameras for 360° coverage ($20k), Intel Loihi 2 board if accessible ($10k), active vibration isolation ($8k), EMI shielding ($5k), Xilinx Alveo FPGA for SPAD processing ($15k), extended engineering support, calibration services, and contingency. Total vehicle power budget: **~275 W**, easily supplied by the vehicle alternator.

### Integration architecture

The prototype's architecture centers on a **CSAC-disciplined White Rabbit timing backbone** distributing sub-nanosecond synchronization to all sensors. The SA65 CSAC serves as grandmaster clock, GPS-disciplined when available, free-running in holdover during GPS denial. White Rabbit switches distribute IEEE 1588-2019 High Accuracy timestamps over fiber to WR-LEN endpoint nodes co-located with each sensor cluster. This delivers **<1 ns relative timing** across all sensors — 1,000× better than standard GPS PPS synchronization and enabling coherent multi-sensor fusion.

The perception stack runs dual data paths: conventional frame-based processing on NVIDIA Jetson AGX Orin (LiDAR point clouds, camera frames, radar returns) and event-based processing on BrainChip Akida (event camera streams, SPAD photon events). A ROS2 middleware layer with hardware-timestamped messages unifies both paths. The FPGA (AMD Kria KV260 or Xilinx Alveo) handles real-time SPAD histogram processing and TCSPC data reduction before forwarding to the GPU compute stack.

### Timeline and complexity

| Phase | Duration | Key activities |
|---|---|---|
| Platform build | Months 1–3 | Vehicle acquisition, DBW installation, conventional sensor mounting, ROS2 framework |
| Timing infrastructure | Months 2–4 | CSAC + White Rabbit deployment, PTP grandmaster configuration, timing validation |
| Quantum sensor integration | Months 3–6 | Event cameras, SPAD arrays, neuromorphic boards, vibration isolation |
| Software and fusion | Months 4–8 | Sensor fusion algorithms, event-driven pipeline, CSAC-synchronized logging |
| Testing and validation | Months 6–10 | GPS-denied timing tests, event vs. frame camera comparison, SPAD ranging validation |
| Analysis | Months 8–12 | Benchmarking against conventional-only platform, results publication |

**Total: 10–12 months** from procurement to validated prototype.

---

## 4. Sensor fusion and timing architecture in detail

### How atomic clocks transform sensor synchronization

Current AV sensor suites synchronize via GPS PPS (~100 ns accuracy) supplemented by IEEE 802.1AS gPTP (~1 µs accuracy over automotive Ethernet). GPS PPS fails in tunnels, urban canyons, and under spoofing. The CSAC provides a **fundamentally different timing architecture**: an on-board atomic frequency standard that maintains <1 µs accuracy for **hours to a full day** without any external reference.

The SA65's **Allan deviation of 3×10⁻¹⁰ at τ=1 s** translates to ~0.3 ns timing uncertainty per second — adequate for coherent LiDAR/radar fusion requiring <10 ns synchronization. At longer timescales, the SA65-LN (with integrated EMXO) achieves **<1×10⁻¹¹ at τ=1 s**, providing even tighter short-term stability. For the prototype, the CSAC is GPS-disciplined whenever satellite signals are available, building a Kalman-filtered frequency model that predicts drift during holdover. When GPS returns, the filter corrects accumulated error without phase discontinuity.

The **White Rabbit protocol** — originally developed at CERN and now standardized as IEEE 1588-2019 High Accuracy Profile — extends this precision across the vehicle's sensor network. It combines PTP timestamping with SyncE physical-layer syntonization and sub-nanosecond phase detection, achieving demonstrated precision of **<100 ps over 5 km fiber**. For the ~2 m fiber runs inside a vehicle, this provides effectively perfect synchronization. The CSAC-disciplined White Rabbit grandmaster distributes 10 MHz + 1PPS to all WR-LEN endpoints, ensuring every sensor timestamp is traceable to a single atomic reference.

### SPAD array implementation for quantum-enhanced ranging

SPAD-based dToF operates fundamentally differently from conventional APD-based LiDAR. Each pixel is a binary photon counter — it either fires (avalanche) or doesn't — producing **digital pulses** rather than analog signals. Range information emerges statistically from TCSPC histograms accumulated over many laser pulses. This digital-native operation has three architectural consequences for the prototype.

First, **on-chip histogram processing** (implemented in Sony IMX459/479 and Ouster's L3/Chronos chips) reduces raw data rates from terabits/second to manageable point clouds. Second, **photon coincidence detection** — requiring 2+ simultaneous SPAD triggers in adjacent pixels — suppresses both dark counts and solar background with quadratic noise rejection, critical at automotive temperatures where DCR is 100× higher than at 25°C. Third, the **digital per-pixel output** maps directly to event-driven processing: each photon detection is an asynchronous event with a precise timestamp, eliminating frame-rate bottlenecks.

For the prototype, the Ouster OS1-128 Rev7 provides the primary 3D perception layer with its L3 SPAD chip (128 channels, **5.2M points/sec**, 200 m range). The STMicro VL53L9CX modules (2,300 zones, 940 nm, reflowable package) provide short-range volumetric sensing. The research-grade Hamamatsu SPAD module enables single-photon experiments at configurable wavelengths. At Tier 3 budget, the Pi Imaging SPAD512 (512×512 array, **20 ps timing resolution**) enables laboratory-quality TCSPC experiments on the vehicle.

### Event-based processing architecture

The natural alignment between quantum discrete sensing (photon-by-photon SPAD detection, per-pixel event cameras) and neuromorphic computation creates a coherent processing architecture. Both Prophesee event cameras and SPAD arrays produce **address-event representation (AER)** data — streams of (x, y, timestamp, polarity/count) tuples rather than synchronous frames. BrainChip's Akida processes these natively through spiking neural networks, consuming **~1 W** versus 15–60 W for equivalent convolutional processing on GPU.

A 2025 FPGA proof-of-concept demonstrated **asynchronous peak detection for SPAD-based dToF flash LiDAR** on a 256×128 SPAD array with **2.4 µs latency** — pixel-wise event-driven depth acquisition that eliminates redundant background data. This architecture is directly implementable on the prototype's AMD Kria KV260 FPGA, serving as the real-time interface between SPAD sensors and the neuromorphic processing stack.

### Integration with conventional sensor suite

The quantum/event-driven sensors augment rather than replace the conventional stack. The proposed fusion hierarchy operates at three levels. At the **timing level**, the CSAC-disciplined White Rabbit network provides a unified temporal reference, eliminating the ~1–10 ms cross-modal timestamp jitter that plagues current ROS2-based fusion. At the **perception level**, event cameras fill the dynamic range and temporal resolution gaps where frame cameras fail — tunnel transitions, direct sunlight, fast-moving objects — while SPAD LiDAR extends ranging performance in low-signal conditions. At the **processing level**, the neuromorphic pathway handles time-critical detection (pedestrian step-out at <100 µs latency) while the GPU pathway handles full scene understanding.

---

## 5. What is real, what is aspirational, and what is hype

### Technologies ready for prototype deployment today

**Chip-scale atomic clocks** are the most underappreciated quantum technology for autonomous vehicles. The Microchip SA65's combination of –40°C to +80°C operating range, MIL-STD vibration tolerance, 35 g mass, and 120 mW power makes it immediately integrable. Over 100,000 units have shipped since 2011. The "quantum" label is fully justified — CPT exploits coherent superposition of atomic states — and the engineering is mature. **This is a solved problem looking for wider adoption.**

**SPAD-based single-photon LiDAR** is in advanced automotive qualification. Sony's IMX459/479 target AEC-Q100 Grade 2 and ISO 26262 ASIL-B(D). Ouster's Chronos chip is ASIL-B qualified. Entry-level automotive LiDAR ASPs are approaching **$200** in 2025, with 1.5+ million units shipping annually. However, calling SPADs "quantum sensors" is technically defensible but commercially misleading — they exploit quantum mechanics at the same level as any transistor. **These are excellent classical single-photon detectors, not "Quantum 2.0" devices.**

**Event cameras** (Prophesee IMX636) are commercially shipping in industrial cameras and undergoing automotive ADAS evaluation with Mercedes-Benz. They are not quantum sensors by any definition but represent the event-driven processing paradigm that naturally pairs with photon-counting detectors.

### Technologies demonstrated but not automotive-ready

**Quantum magnetic navigation** (Q-CTRL Ironstone Opal, SandboxAQ AQNav) has impressive field results — 22 m airborne accuracy, ground vehicle demonstrations, 200+ flight hours. But **best-case accuracy of ~22–74 m is insufficient for lane-level driving**, and road-level magnetic anomaly maps do not exist. This technology serves aviation and maritime first; automotive relevance requires map infrastructure that doesn't yet exist.

**Cold atom inertial sensors** have been flight-tested (AOSense, 2024) and space-qualified (Vector Atomic/X-37B, 2025). The demonstrated **6×10⁻⁸ g accelerometer bias** is extraordinary. But current systems are 0.1–1 m³, 100–500 W, and operate at 1–4 Hz — and **vehicle-level vibrations remain a fundamental unsolved problem**. DARPA created the RoQS program (Phase 1 launched August 2025) specifically because 20+ years of research have not yet conquered this challenge. Automotive deployment is realistically **2035–2040+**.

**NV-center diamond magnetometers** have been demonstrated in moving vans and deep-sea submersibles. Bosch's April 2025 joint venture with Element Six signals serious automotive interest. Tokyo Tech demonstrated **10 mA resolution** EV battery current sensing across hundreds of amperes, potentially extending EV range by 10%. But sensor heads remain ~1,000 cc, and sensitivity needs improvement for MagNav. **Automotive TRL: 3–5**, with EV current sensing likely the first production application (2029–2032).

### The honest gap between lab and road

Three engineering challenges dominate the lab-to-vehicle transition. **Vibration** is the most fundamental: cold atom interferometers require atoms in free-fall for milliseconds, and any perturbation during interrogation corrupts the measurement. Q-CTRL's software-based vibration rejection (tailored error-robust light pulses achieving 10× precision improvement) and hybridization with classical accelerometers are the most promising mitigation strategies, but they haven't been demonstrated at automotive vibration levels (0.5–5 g RMS random).

**Temperature** is the second barrier. Automotive qualification demands –40°C to +85°C (up to +125°C under-hood). Most quantum sensors require temperature-controlled environments: Vector Atomic's EG-30 optical clock operates only at 18–35°C; cold atom systems need precise magnetic field and laser frequency control. NV-center diamond sensors are an exception — diamond itself is thermally robust — but the laser/microwave excitation subsystems are not.

**Cost** is the third and ultimately decisive barrier. Automotive production demands sensors at **$50–500** per unit. CSACs cost $1,500–5,000 (the U.S. Army's LC CSAC program targets <$300 at volume). Cold atom systems cost hundreds of thousands of dollars. Even if performance targets are met, **the 100–10,000× cost reduction** required for automotive volumes will take a separate generation of engineering.

### A note on quantum marketing versus quantum physics

The quantum sensing market is routinely inflated by including **tunneling magnetoresistance (TMR) sensors** — millions of which ship annually in automobiles for current sensing — and SPAD-based LiDAR. If these "Quantum 1.0" devices are excluded, the genuinely "Quantum 2.0" automotive sensor market is **effectively zero in 2026**. Market reports claiming $435M–$1.5B in "quantum sensor" revenue should be treated with corresponding skepticism.

The technologies that will transform autonomous navigation — drift-free quantum inertial measurement, quantum-enhanced LiDAR with entanglement-based noise rejection, absolute quantum magnetometry for map-matching — are real physics with demonstrated results. But the path from laboratory demonstration to a device that survives 15 years and 300,000 km under the hood of a car traverses territory that remains largely unmapped.

## Conclusion

The actionable path for a $200–400k prototype is clear: build around a **CSAC-disciplined White Rabbit timing backbone** providing sub-nanosecond sensor synchronization, augment conventional LiDAR with **SPAD-based single-photon ranging** and **event cameras** feeding a **neuromorphic processing pipeline**, and instrument everything for rigorous comparison against a conventional-only baseline. This architecture demonstrates the event-driven, photon-counting, atomically-timed sensing paradigm that will eventually incorporate genuinely quantum-enhanced devices as they mature. The three technologies that matter most for near-term integration — CSACs, SPAD arrays, and event cameras — are all purchasable today from identified vendors at known price points, operate at room temperature, and fit within the budget. Cold atom inertial sensors and NV-center magnetometers should be monitored through defense transition programs (DARPA RoQS, DIU TQS) but are not ready for vehicle integration at any budget. The prototype's greatest value lies not in deploying quantum sensors that don't yet exist in automotive-ready form, but in building the timing, processing, and fusion architecture that will be ready to receive them when they do.