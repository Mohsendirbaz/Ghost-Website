# Fascinating fields that benefit from physics-informed models

```mermaid
graph TB
    CENTER[🧮 PHYSICS-INFORMED LEARNING<br/>11 Positions<br/>Build ML that respects physics]
    
    CENTER -->|Fast CFD operators<br/>Python-OpenFOAM interface| AERO[✈️ AEROSPACE & AVIATION<br/>Wing design • Flow control<br/>Fuel efficiency optimization]
    
    CENTER -->|PDE solvers<br/>Surrogate models| CLIMATE[🌍 CLIMATE & WEATHER<br/>Decentralized assimilation<br/>Large-scale forecasting]
    
    CENTER -->|Radar transformers<br/>Multimodal tracking| AUTO[🚗 AUTONOMOUS VEHICLES<br/>All-weather perception<br/>5+ sensor fusion]
    
    CENTER -->|Spatiotemporal control<br/>Reduced-order models| ROBOT[🤖 ROBOTICS<br/>Fast dynamics prediction<br/>Real-time manipulation]
    
    CENTER -->|Geometry-aware surrogates<br/>Physics constraints| DESIGN[🎨 ENGINEERING DESIGN<br/>Generative design<br/>Topology optimization]
    
    CENTER -->|Thermal/fluid control<br/>Multi-fidelity models| ENERGY[⚡ ENERGY SYSTEMS<br/>Grid optimization<br/>Carbon capture]
    
    CENTER -->|Single-photon algorithms<br/>Low-SNR reconstruction| MEDICAL[🏥 MEDICAL IMAGING<br/>Photon-limited sensing<br/>3D reconstruction]
    
    CENTER -->|RF+IR+LiDAR fusion<br/>Sensor reasoning VLMs| DEFENSE[🛡️ DEFENSE & SECURITY<br/>Threat detection<br/>Nuclear source localization]
    
    CENTER -->|Airflow reconstruction<br/>Physics-vision hybrids| INDUSTRIAL[🏭 INDUSTRIAL INSPECTION<br/>Quality control<br/>Process monitoring]
    
    CENTER -->|Data assimilation<br/>Distributed inference| SCIENTIFIC[🔬 SCIENTIFIC COMPUTING<br/>Large-scale simulation<br/>Inverse problems]
    
    AERO -->|Design tools| MANUFACTURERS[Manufacturing partners]
    AUTO -->|Sensor stacks| AV_COMPANIES[Tesla • Waymo • Cruise]
    CLIMATE -->|Forecast models| WEATHER_AGENCIES[NOAA • ECMWF]
    ROBOT -->|Control libraries| ROBOTICS_LABS[Research labs • Startups]
    ENERGY -->|Grid simulation| UTILITIES[Power companies]
    MEDICAL -->|Imaging algorithms| HOSPITALS[Clinical deployment]
    DEFENSE -->|Detection systems| GOV_AGENCIES[DoD • National labs]
    INDUSTRIAL -->|Inspection tools| FACTORIES[Quality assurance]
    DESIGN -->|CAD integration| SOFTWARE[Autodesk • Ansys]
    SCIENTIFIC -->|Open source libs| ACADEMIA[Universities • Research]
    
    style CENTER fill:#1971c2,stroke:#1864ab,stroke-width:4px,color:#fff,font-size:14px
    
    style AERO fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style CLIMATE fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style AUTO fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style ROBOT fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style DESIGN fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style ENERGY fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style MEDICAL fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style DEFENSE fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style INDUSTRIAL fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style SCIENTIFIC fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    
    style MANUFACTURERS fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style AV_COMPANIES fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style WEATHER_AGENCIES fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style ROBOTICS_LABS fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style UTILITIES fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style HOSPITALS fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style GOV_AGENCIES fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style FACTORIES fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style SOFTWARE fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
    style ACADEMIA fill:#74c0fc,stroke:#339af0,stroke-width:1px,color:#000
```

## Frontier Innovation: Full Workflow Architecture

Four interconnected Mermaid diagrams showing the complete skill hierarchy.

---

### Diagram 1/4: SENSING & PERCEPTION STACK

```mermaid
graph TB
    subgraph SENSING["SENSING & PERCEPTION"]
        direction TB

        subgraph S1["ST0231 Radar Perception"]
            S1A["Waveform Design"]
            S1B["Phase-First Doppler"]
            S1C["Deep Radar Denoising"]
            S1A --> S1A1["Chirp Optimization"]
            S1A --> S1A2["MIMO Configuration"]
            S1B --> S1B1["Micro-Doppler Extraction"]
            S1B --> S1B2["Velocity Estimation"]
            S1C --> S1C1["Clutter Rejection"]
            S1C --> S1C2["CFAR Detection"]
        end

        subgraph S2["ST0215 Single-Photon Lidar"]
            S2A["Poisson Statistics"]
            S2B["Depth Reconstruction"]
            S2C["Photon-Limited Imaging"]
            S2A --> S2A1["Arrival Time Modeling"]
            S2A --> S2A2["Background Subtraction"]
            S2B --> S2B1["Histogram Binning"]
            S2B --> S2B2["Surface Fitting"]
            S2C --> S2C1["Denoising Networks"]
            S2C --> S2C2["Super-Resolution"]
        end

        subgraph S3["ST0242 Radiation Detection"]
            S3A["Monte Carlo Transport"]
            S3B["Source Localization"]
            S3C["Spectral Analysis"]
            S3A --> S3A1["Particle Tracking"]
            S3A --> S3A2["Geometry Modeling"]
            S3B --> S3B1["Inverse Source"]
            S3B --> S3B2["Directional Estimation"]
            S3C --> S3C1["Peak Identification"]
            S3C --> S3C2["Isotope Classification"]
        end

        subgraph S4["ST0174 Sensor Reasoning"]
            S4A["Multimodal Grounding"]
            S4B["Attention Fusion"]
            S4C["Symbolic Reasoning"]
            S4A --> S4A1["Cross-Modal Alignment"]
            S4A --> S4A2["Late Fusion"]
            S4B --> S4B1["Transformer Encoders"]
            S4B --> S4B2["Cross-Attention"]
            S4C --> S4C1["Scene Graphs"]
            S4C --> S4C2["Logic Programs"]
        end

        subgraph S5["ST0096 Multimodal Tracking"]
            S5A["State Estimation"]
            S5B["Data Association"]
            S5C["Track Management"]
            S5A --> S5A1["Kalman Variants"]
            S5A --> S5A2["Particle Filters"]
            S5B --> S5B1["Hungarian Assignment"]
            S5B --> S5B2["JPDA"]
            S5C --> S5C1["Track Initiation"]
            S5C --> S5C2["Track Deletion"]
        end

        subgraph S6["CV0209 Visual-LiDAR Fusion"]
            S6A["Point Cloud Encoding"]
            S6B["Image-Point Alignment"]
            S6C["3D Detection Heads"]
            S6A --> S6A1["PointNet++"]
            S6A --> S6A2["Voxelization"]
            S6B --> S6B1["Calibration"]
            S6B --> S6B2["Projection"]
            S6C --> S6C1["Anchor-Free"]
            S6C --> S6C2["Center-Based"]
        end

        subgraph S7["CV0220 V-SLAM"]
            S7A["Feature Extraction"]
            S7B["Pose Estimation"]
            S7C["Loop Closure"]
            S7A --> S7A1["ORB Features"]
            S7A --> S7A2["Learned Descriptors"]
            S7B --> S7B1["PnP Solvers"]
            S7B --> S7B2["Bundle Adjustment"]
            S7C --> S7C1["Bag of Words"]
            S7C --> S7C2["Place Recognition"]
        end

        subgraph S8["CV0221 Robust Estimation"]
            S8A["Outlier Rejection"]
            S8B["Consensus Methods"]
            S8C["Certifiable Algorithms"]
            S8A --> S8A1["M-Estimators"]
            S8A --> S8A2["Huber Loss"]
            S8B --> S8B1["RANSAC"]
            S8B --> S8B2["GNC"]
            S8C --> S8C1["SDP Relaxation"]
            S8C --> S8C2["Rotation Averaging"]
        end
    end

    S1 --> S4
    S2 --> S5
    S3 --> S4
    S5 --> S6
    S6 --> S7
    S7 --> S8
    S4 --> S8

```

---

### Diagram 2/4: LEARNING & MODELING STACK

```mermaid
graph TB
    subgraph LEARNING["LEARNING & MODELING"]
        direction TB

        subgraph L1["ST0184 UQ & Bayesian"]
            L1A["Posterior Inference"]
            L1B["Surrogate Models"]
            L1C["Sensitivity Analysis"]
            L1A --> L1A1["MCMC Samplers"]
            L1A --> L1A2["Variational Inference"]
            L1B --> L1B1["Gaussian Processes"]
            L1B --> L1B2["Neural Surrogates"]
            L1C --> L1C1["Sobol Indices"]
            L1C --> L1C2["Active Subspaces"]
        end

        subgraph L2["ST0229 Particle Systems"]
            L2A["Particle Dynamics"]
            L2B["Resampling Schemes"]
            L2C["Convergence Diagnostics"]
            L2A --> L2A1["Langevin Dynamics"]
            L2A --> L2A2["Stein Variational"]
            L2B --> L2B1["Systematic Resampling"]
            L2B --> L2B2["Stratified Resampling"]
            L2C --> L2C1["ESS Monitoring"]
            L2C --> L2C2["Kernel Diagnostics"]
        end

        subgraph L3["ST0246 Physics-Informed ML"]
            L3A["PDE Constraints"]
            L3B["Neural Solvers"]
            L3C["Hybrid Architectures"]
            L3A --> L3A1["Residual Losses"]
            L3A --> L3A2["Boundary Conditions"]
            L3B --> L3B1["PINNs"]
            L3B --> L3B2["DeepONet"]
            L3C --> L3C1["Differentiable Physics"]
            L3C --> L3C2["Neural ODEs"]
        end

        subgraph L4["ST0247 Geometry Surrogates"]
            L4A["Shape Encoding"]
            L4B["Operator Learning"]
            L4C["Mesh Adaptation"]
            L4A --> L4A1["Signed Distance"]
            L4A --> L4A2["Point Clouds"]
            L4B --> L4B1["Fourier Neural Ops"]
            L4B --> L4B2["Graph Networks"]
            L4C --> L4C1["Adaptive Refinement"]
            L4C --> L4C2["Coarsening"]
        end

        subgraph L5["OR0179 Robot Learning"]
            L5A["Policy Learning"]
            L5B["Representation Learning"]
            L5C["Sim-to-Real"]
            L5A --> L5A1["PPO/SAC"]
            L5A --> L5A2["Imitation Learning"]
            L5B --> L5B1["Contrastive"]
            L5B --> L5B2["World Models"]
            L5C --> L5C1["Domain Randomization"]
            L5C --> L5C2["System ID Transfer"]
        end

        subgraph L6["OR0180 System ID"]
            L6A["Black-Box Models"]
            L6B["Grey-Box Models"]
            L6C["Online Adaptation"]
            L6A --> L6A1["NARX"]
            L6A --> L6A2["Neural State Space"]
            L6B --> L6B1["Parameter Estimation"]
            L6B --> L6B2["Hybrid Physics-NN"]
            L6C --> L6C1["Recursive LS"]
            L6C --> L6C2["Kalman ID"]
        end

        subgraph L7["EA0226 Safe RL"]
            L7A["Constraint Handling"]
            L7B["Safety Shields"]
            L7C["Sample Efficiency"]
            L7A --> L7A1["Lagrangian Methods"]
            L7A --> L7A2["Projection Methods"]
            L7B --> L7B1["CBF Shields"]
            L7B --> L7B2["Reachability Shields"]
            L7C --> L7C1["Model-Based RL"]
            L7C --> L7C2["Offline RL"]
        end

        subgraph L8["SA0176 Few-Shot Learning"]
            L8A["Meta-Learning"]
            L8B["Metric Learning"]
            L8C["Adaptation"]
            L8A --> L8A1["MAML"]
            L8A --> L8A2["Prototypical Nets"]
            L8B --> L8B1["Siamese Networks"]
            L8B --> L8B2["Triplet Loss"]
            L8C --> L8C1["Fine-Tuning"]
            L8C --> L8C2["In-Context"]
        end
    end

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L1 --> L6
    L5 --> L7
    L6 --> L5
    L7 --> L8
    L4 --> L5

```

---

### Diagram 3/4: CONTROL & PLANNING STACK

```mermaid
graph TB
    subgraph CONTROL["CONTROL & PLANNING"]
        direction TB

        subgraph C1["ST0251 Data-Driven Control"]
            C1A["Reduced-Order Models"]
            C1B["Koopman Methods"]
            C1C["Adaptive Control"]
            C1A --> C1A1["POD/DMD"]
            C1A --> C1A2["Balanced Truncation"]
            C1B --> C1B1["EDMD"]
            C1B --> C1B2["Deep Koopman"]
            C1C --> C1C1["MRAC"]
            C1C --> C1C2["L1 Adaptive"]
        end

        subgraph C2["EA0228 Constraint MPC"]
            C2A["CBF-QP Formulation"]
            C2B["MPC Solvers"]
            C2C["Constraint Tightening"]
            C2A --> C2A1["Lie Derivatives"]
            C2A --> C2A2["HOCBF"]
            C2B --> C2B1["OSQP"]
            C2B --> C2B2["FORCES Pro"]
            C2C --> C2C1["Robust MPC"]
            C2C --> C2C2["Tube MPC"]
        end

        subgraph C3["CA0178 Multi-Robot Planning"]
            C3A["Task Allocation"]
            C3B["Motion Planning"]
            C3C["Coordination"]
            C3A --> C3A1["Hungarian"]
            C3A --> C3A2["Auction Methods"]
            C3B --> C3B1["RRT/PRM"]
            C3B --> C3B2["Optimization-Based"]
            C3C --> C3C1["Consensus"]
            C3C --> C3C2["Formation Control"]
        end

        subgraph C4["OR0164 6D Grasp Pose"]
            C4A["Pose Estimation"]
            C4B["Grasp Planning"]
            C4C["Contact Modeling"]
            C4A --> C4A1["Keypoint Methods"]
            C4A --> C4A2["Dense Correspondence"]
            C4B --> C4B1["Grasp Quality"]
            C4B --> C4B2["Grasp Sampling"]
            C4C --> C4C1["Friction Cones"]
            C4C --> C4C2["Soft Contact"]
        end

        subgraph C5["OR0249 Whole-Body Manip"]
            C5A["Locomotion Control"]
            C5B["Manipulation Control"]
            C5C["Whole-Body MPC"]
            C5A --> C5A1["Gait Generation"]
            C5A --> C5A2["Balance Control"]
            C5B --> C5B1["IK Solvers"]
            C5B --> C5B2["Impedance Control"]
            C5C --> C5C1["Centroidal Dynamics"]
            C5C --> C5C2["Contact Scheduling"]
        end

        subgraph C6["OR0239 Learning Disassembly"]
            C6A["Object Recognition"]
            C6B["Manipulation Policy"]
            C6C["Sequence Planning"]
            C6A --> C6A1["Part Segmentation"]
            C6A --> C6A2["Fastener Detection"]
            C6B --> C6B1["Skill Primitives"]
            C6B --> C6B2["Contact-Rich Policy"]
            C6C --> C6C1["AND-OR Graphs"]
            C6C --> C6C2["TAMP"]
        end

        subgraph C7["EA0236 Topology Optimization"]
            C7A["Density Methods"]
            C7B["Sensitivity Analysis"]
            C7C["Multi-Physics"]
            C7A --> C7A1["SIMP"]
            C7A --> C7A2["Level Set"]
            C7B --> C7B1["Adjoint Methods"]
            C7B --> C7B2["Automatic Diff"]
            C7C --> C7C1["Thermal-Structural"]
            C7C --> C7C2["Fluid-Structure"]
        end

        subgraph C8["MS0254 Decentralized Assim"]
            C8A["Distributed Filtering"]
            C8B["Communication"]
            C8C["Consensus Estimation"]
            C8A --> C8A1["Distributed KF"]
            C8A --> C8A2["Distributed EnKF"]
            C8B --> C8B1["Gossip Protocols"]
            C8B --> C8B2["Event-Triggered"]
            C8C --> C8C1["Diffusion"]
            C8C --> C8C2["ADMM"]
        end
    end

    C1 --> C2
    C2 --> C3
    C3 --> C5
    C4 --> C5
    C5 --> C6
    C1 --> C8
    C7 --> C4
    C8 --> C3

```

---

### Diagram 4/4: GENERATION & FOUNDATION STACK

```mermaid
graph TB
    subgraph GENERATION["GENERATION & FOUNDATION"]
        direction TB

        subgraph G1["CV0227 Video Generation"]
            G1A["Diffusion Models"]
            G1B["Temporal Modeling"]
            G1C["Conditioning"]
            G1A --> G1A1["3D UNet"]
            G1A --> G1A2["DiT"]
            G1B --> G1B1["Temporal Attention"]
            G1B --> G1B2["Causal Conv"]
            G1C --> G1C1["Text-to-Video"]
            G1C --> G1C2["Image-to-Video"]
        end

        subgraph G2["CV0225 Novel View Synthesis"]
            G2A["Neural Representations"]
            G2B["Rendering"]
            G2C["Dynamic Scenes"]
            G2A --> G2A1["NeRF"]
            G2A --> G2A2["3D Gaussians"]
            G2B --> G2B1["Volume Rendering"]
            G2B --> G2B2["Splatting"]
            G2C --> G2C1["Deformable Fields"]
            G2C --> G2C2["4D Representations"]
        end

        subgraph G3["CV0243 Compact VLMs"]
            G3A["Architecture Design"]
            G3B["Training Strategy"]
            G3C["Compression"]
            G3A --> G3A1["Vision Encoders"]
            G3A --> G3A2["Cross-Modal Layers"]
            G3B --> G3B1["Pretraining"]
            G3B --> G3B2["Instruction Tuning"]
            G3C --> G3C1["Quantization"]
            G3C --> G3C2["Pruning"]
        end

        subgraph G4["OR0261 Foundation Manipulation"]
            G4A["Pretrained Backbones"]
            G4B["Action Prediction"]
            G4C["Generalization"]
            G4A --> G4A1["CLIP Features"]
            G4A --> G4A2["DINOv2"]
            G4B --> G4B1["Diffusion Policy"]
            G4B --> G4B2["ACT"]
            G4C --> G4C1["Object-Centric"]
            G4C --> G4C2["Language Grounding"]
        end

        subgraph G5["CI0197 Embodied AI"]
            G5A["Multimodal Perception"]
            G5B["Policy Architectures"]
            G5C["Humanoid Control"]
            G5A --> G5A1["Vision-Language"]
            G5A --> G5A2["Audio Integration"]
            G5B --> G5B1["Transformer Policies"]
            G5B --> G5B2["State Space Models"]
            G5C --> G5C1["Full-Body Retargeting"]
            G5C --> G5C2["Teleoperation"]
        end

        subgraph G6["CI0213 Edge Foundation"]
            G6A["Model Compression"]
            G6B["Efficient Inference"]
            G6C["Hardware Mapping"]
            G6A --> G6A1["Knowledge Distillation"]
            G6A --> G6A2["Structured Pruning"]
            G6B --> G6B1["Flash Attention"]
            G6B --> G6B2["Speculative Decoding"]
            G6C --> G6C1["TensorRT"]
            G6C --> G6C2["ONNX Runtime"]
        end

        subgraph G7["SA0188 Audio Generation"]
            G7A["Source Separation"]
            G7B["Speech Synthesis"]
            G7C["Music Generation"]
            G7A --> G7A1["Mask Estimation"]
            G7A --> G7A2["Permutation Invariant"]
            G7B --> G7B1["Neural Vocoders"]
            G7B --> G7B2["Zero-Shot TTS"]
            G7C --> G7C1["Audio Diffusion"]
            G7C --> G7C2["Symbolic-Audio"]
        end

        subgraph G8["CI0216 Private Agentic AI"]
            G8A["Tool Orchestration"]
            G8B["Memory Systems"]
            G8C["Privacy Preservation"]
            G8A --> G8A1["Function Calling"]
            G8A --> G8A2["ReAct Loops"]
            G8B --> G8B1["Retrieval Augmented"]
            G8B --> G8B2["Episodic Memory"]
            G8C --> G8C1["Differential Privacy"]
            G8C --> G8C2["Federated Learning"]
        end
    end

    G1 --> G2
    G2 --> G5
    G3 --> G4
    G4 --> G5
    G5 --> G6
    G7 --> G5
    G3 --> G8
    G6 --> G8

```

---

### MASTER INTERCONNECTION: All 4 Stacks

```mermaid
graph LR
    subgraph FULL["FRONTIER INNOVATION WORKFLOW"]
        SENSE["SENSING<br>8 Skills<br>24 Subskills<br>48 Subsubskills"]
        LEARN["LEARNING<br>8 Skills<br>24 Subskills<br>48 Subsubskills"]
        CONTROL["CONTROL<br>8 Skills<br>24 Subskills<br>48 Subsubskills"]
        GENERATE["GENERATION<br>8 Skills<br>24 Subskills<br>48 Subsubskills"]
    end

    SENSE -->|State Estimation| LEARN
    LEARN -->|Models + Policies| CONTROL
    CONTROL -->|Action Commands| SENSE
    LEARN -->|Foundation Models| GENERATE
    GENERATE -->|Synthetic Data| LEARN
    CONTROL -->|Digital Twins| GENERATE
    GENERATE -->|Novel Views| SENSE

    SENSE -->|Radar + Lidar| BENCHMARK1["Perception<br>Benchmarks"]
    LEARN -->|UQ + Safe RL| BENCHMARK2["Learning<br>Benchmarks"]
    CONTROL -->|MPC + Planning| BENCHMARK3["Control<br>Benchmarks"]
    GENERATE -->|Video + VLM| BENCHMARK4["Generation<br>Benchmarks"]

```

---

## Summary Statistics

| Stack | Skills | Subskills | Subsubskills | Total Nodes |
| --- | --- | --- | --- | --- |
| Sensing & Perception | 8 | 24 | 48 | 80 |
| Learning & Modeling | 8 | 24 | 48 | 80 |
| Control & Planning | 8 | 24 | 48 | 80 |
| Generation & Foundation | 8 | 24 | 48 | 80 |
| **TOTAL** | **32** | **96** | **192** | **320** |