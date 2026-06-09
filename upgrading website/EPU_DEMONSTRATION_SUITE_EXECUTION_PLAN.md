# EPU Demonstration Suite — Unified Execution Plan

**Target Codebase:** Ghost Autonomy Website (React 19, React Router DOM 7, Static SPA)  
**Architectural Constraints:** Plain CSS, bilingual (EN/FA), Vercel deployment, no external APIs  
**Integration Strategy:** Extend existing component library, design system, and routing patterns

---

## Executive Summary

This plan integrates five technical demonstration modules into the existing Ghost Autonomy website to operationalize the PICAPD-KTE architecture narrative. All modules respect the current codebase structure, reuse existing components (Hero, SectionBlock, CTABand, etc.), and maintain bilingual support with RTL layout.

**Scope:** 5 new pages, 12 new interactive components, ~4,500 lines of bilingual content, full accessibility compliance.

**Architecture Alignment:**
- All content → `src/data/copy.js` (bilingual objects)
- All pages → `src/pages/*.js` with shared `Page.css`
- All interactive components → `src/components/epu/*.js`
- All routes → registered in `src/App.js` with `/en/` and `/fa/` prefixes
- Design system → extends `src/styles/tokens.css` with EPU-specific tokens
- Diagrams → leverage existing Carousel for Perusal infrastructure

---

## Module 1: EPU Landing Page
**Route:** `/en/epu`, `/fa/epu`  
**File:** `src/pages/EPU.js`  
**Purpose:** Conceptual demonstration of physics-enforced computing substrate

### Page Structure

```jsx
// src/pages/EPU.js
import { Hero, SectionBlock, CTABand } from '../components';
import { FivePillars, TenGatePipeline, AbsorbingStateDemo, ThermodynamicGateDemo, 
         TransferFunctionDemo, ConstitutionalVerification, ScenarioSelector } from '../components/epu';

<Hero
  eyebrow="EPU — Event Processing Unit"
  h1="Physics Enforced at Hardware Substrate"
  subhead={t.heroSub}
  disclaimerText={t.disclaimer}
/>

<FivePillars pillars={t.pillars} />

<TenGatePipeline gates={t.gates} lang={lang} />

<AbsorbingStateDemo content={t.absorbingState} />

<ThermodynamicGateDemo content={t.thermodynamic} />

<TransferFunctionDemo content={t.transferFunction} />

<ConstitutionalVerification rules={t.constitutionalRules} />

<ScenarioSelector scenarios={t.scenarios} onExport={handleExport} />

<CTABand title={t.ctaTitle} cta1="Explore Technical Deep-Dive" cta1To={`/${lang}/epu/technical`} />
```

### Interactive Components

**1. FivePillars** (`src/components/epu/FivePillars.js`)
- Grid layout (3 columns desktop, 1 column mobile)
- Icon cards with expand-on-click behavior
- Content areas:
  1. General Relativity / Time Transfer (gravitational redshift, time dilation, clock networks)
  2. Continuum / Computational Fluids (medium-aware sensing, propagation operators)
  3. Quantum Sensing Dynamics (roadmapped, measurement model + decoherence)
  4. Real-Time Agentic Optimization (Worker→Manager→Queen hierarchy)
  5. Celestial Mechanics Integrals (elliptic integrals, AGM, conservation laws)

**2. TenGatePipeline** (`src/components/epu/TenGatePipeline.js`)
- Horizontal scrolling pipeline with 3 macro bands: REPRESENTATION (G1-G4), ACTIVATION (G5-G6), INFERENCE (G7-G10)
- Each gate card shows: modality, reversibility status, domain knobs vs invariant form
- Click-to-open drawer: purpose, witness/invariant, failure meaning, evidence artifact
- Uses Radix UI Tabs for accessibility

**3. AbsorbingStateDemo** (`src/components/epu/AbsorbingStateDemo.js`)
- Interactive state machine diagram (using existing AbstractVisual pattern)
- All paths route to either PASS or ⊥ (absorbing state) → MRC
- Topological sink visualization: once entered, cannot escape without external reset
- Highlight MRC as the minimal risk condition

**4. ThermodynamicGateDemo** (`src/components/epu/ThermodynamicGateDemo.js`)
- Gate 9 focus: irreversibility = information loss + entropy generation
- Landauer bound visualization
- Hardware watchdog → MRC on WCET violation
- Interactive timeline showing entropy accumulation

**5. TransferFunctionDemo** (`src/components/epu/TransferFunctionDemo.js`)
- Gate 10 focus: AGM iteration (fixed iteration count)
- Transfer function H(s) construction from poles/zeros/gain
- Stability check visualization (pole location in complex plane)
- Connection to conservation guarantees

**6. ConstitutionalVerification** (`src/components/epu/ConstitutionalVerification.js`)
- Pre-fusion admissibility checklist: integrity, alignment, scope, replay lineage
- Unknown Register widget: assumptions/unknowns traveling with versions
- Challenger requirement widget: independent challenger pathway indicator
- Uses FAQAccordion pattern for expandable rule sections

**7. ScenarioSelector** (`src/components/epu/ScenarioSelector.js`)
- Three scenarios: Normal / Degraded sensing / Compute overload
- For each: gate failures, admissibility failures, evidence exclusions, SAFE vs MRC routing
- Export trace.json button (client-side download)
- Uses `ask_user_input_v0` pattern for scenario selection

### Content Structure (`src/data/copy.js`)

```js
export const copy = {
  en: {
    nav: { epu: "EPU" },
    epu: {
      heroSub: "Conceptual demonstration of physics-enforced computing architecture",
      disclaimer: "This is an architectural demonstration, not a certified safety case.",
      pillars: [
        { 
          icon: "relativity",
          title: "General Relativity / Time Transfer",
          body: "Gravitational redshift and time dilation anchor time/frequency transfer...",
          technical: "Proper time τ along worldline; coordinate time t in external frame..."
        },
        // ... 4 more pillars
      ],
      gates: [
        {
          id: "G1",
          band: "REPRESENTATION",
          modality: "Sensory input normalization",
          reversible: true,
          purpose: "Transform raw sensor data to canonical units",
          witness: "Unit conversion invariant",
          failure: "Unit mismatch → inadmissible",
          artifact: "Normalized vector z"
        },
        // ... 9 more gates
      ],
      absorbingState: {
        title: "Absorbing State ⊥ → Minimal Risk Condition",
        body: "All computational paths route to either PASS (continue) or ⊥ (absorbing sink)...",
        diagramDesc: "State transition graph showing topological sink property"
      },
      thermodynamic: {
        title: "Gate 9: Thermodynamic Irreversibility",
        body: "Information erasure generates entropy; Landauer bound: kT ln 2 per bit...",
        wcetRule: "Hardware watchdog enforces WCET; violation → immediate MRC routing"
      },
      transferFunction: {
        title: "Gate 10: Transfer Function Integration",
        body: "AGM iteration converges to elliptic integral representation...",
        stabilityCheck: "Pole locations determine system stability; unstable poles prevented by constraints"
      },
      constitutionalRules: [
        {
          rule: "Verification Before Fusion",
          description: "All evidence must pass admissibility gates before integration",
          checks: ["integrity", "alignment", "scope", "replay lineage"]
        },
        // ... more rules
      ],
      scenarios: [
        {
          name: "Normal Operation",
          gateFailures: [],
          admissibilityFailures: [],
          route: "SAFE"
        },
        {
          name: "Degraded Sensing",
          gateFailures: ["G2", "G3"],
          admissibilityFailures: ["integrity"],
          route: "MRC"
        },
        {
          name: "Compute Overload",
          gateFailures: ["G9"],
          admissibilityFailures: ["WCET"],
          route: "MRC"
        }
      ],
      ctaTitle: "Ready to explore the technical foundations?"
    }
  },
  fa: {
    // Complete Persian translations
  }
};
```

### Styling (`src/styles/epu.css`)

```css
/* Extends existing tokens.css */
:root {
  --epu-accent-representation: var(--color-primary);
  --epu-accent-activation: var(--color-secondary);
  --epu-accent-inference: var(--color-accent);
  --gate-spacing: var(--space-4);
  --pillar-card-bg: var(--color-bg-secondary);
}

.epu-pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.epu-gate-pipeline {
  display: flex;
  gap: var(--gate-spacing);
  overflow-x: auto;
  padding-block: var(--space-4);
  scroll-snap-type: x mandatory;
}

.epu-gate-card {
  min-width: 280px;
  scroll-snap-align: start;
  border-inline-start: 4px solid var(--epu-accent-representation);
}

/* RTL support via logical properties - already handled by existing system */
```

### Testing Checklist

- [ ] All 5 pillars expand/collapse correctly
- [ ] 10-gate pipeline scrolls smoothly on mobile
- [ ] Gate drawers open with full content
- [ ] Scenario selector generates valid trace.json
- [ ] All Persian translations render correctly in RTL
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces all state changes
- [ ] Export functionality downloads JSON without errors

---

## Module 2: Technical Deep-Dive
**Route:** `/en/epu/technical`, `/fa/epu/technical`  
**File:** `src/pages/EPUTechnical.js`  
**Purpose:** Engineer-facing deep dive into temporal state, sensing, and constraints

### Page Structure

```jsx
// src/pages/EPUTechnical.js
import { Tabs } from '@radix-ui/react-tabs';
import { TemporalStateTab, SensingTab, ConstraintsTab } from '../components/epu/technical';

<Hero
  h1="Technical Deep-Dive"
  subhead="Temporal state management, continuum-aware sensing, constraint-stress fields"
/>

<Tabs defaultValue="temporal">
  <TabsList>
    <TabsTrigger value="temporal">{t.tabs.temporal}</TabsTrigger>
    <TabsTrigger value="sensing">{t.tabs.sensing}</TabsTrigger>
    <TabsTrigger value="constraints">{t.tabs.constraints}</TabsTrigger>
  </TabsList>
  
  <TabsContent value="temporal">
    <TemporalStateTab content={t.temporal} lang={lang} />
  </TabsContent>
  
  <TabsContent value="sensing">
    <SensingTab content={t.sensing} lang={lang} />
  </TabsContent>
  
  <TabsContent value="constraints">
    <ConstraintsTab content={t.constraints} lang={lang} />
  </TabsContent>
</Tabs>

<MemoryErasurePanel content={t.memoryErasure} />

<ExportBundle onExport={handleExport} formats={['temporal.json', 'stress.json', 'trace.json']} />
```

### Interactive Components

**1. TemporalStateTab** (`src/components/epu/technical/TemporalStateTab.js`)
- T◦ model teaching section: temporal anchor t₀, state space (t, y(t)), flow map Φ
- Interactive timeline widget with aspectual lens selector:
  - Rate view: dy/dt instantaneous
  - State view: y(t) snapshot
  - Displacement view: Δy over interval
  - Field view: rate field over region
- Mock vehicle state that updates based on selected lens
- Connection to autonomy: tracking (rate + field), replay (integral), admissibility (spatiotemporal coherence)

**2. SensingTab** (`src/components/epu/technical/SensingTab.js`)
- Two-event round-trip measurement primitive: emit at τ_out, receive at τ_in
- Three modality cards (expandable):
  - EM (radar/lidar/vision): null characteristic + medium effects
  - Acoustic/ultrasonic: c_s(x,t) + flow field u(x,t)
  - Diffusive/thermal: parabolic operators, lag + smoothing
- Interactive medium slider: clear air → fog → heavy scatter
  - Updates: admissibility flags, staleness indicators, gate conservatism
- Characteristic curve visualization (uses existing AbstractVisual pattern)

**3. ConstraintsTab** (`src/components/epu/technical/ConstraintsTab.js`)
- Continuum reformulation: constraints → stress fields σ_C(x,t)
- 3-tier hierarchy simulation: Workers → Managers → Queen
- Stress visualization modes:
  - Local stress concentration (single worker anomaly)
  - Critical stress cascade (multi-worker failure → Queen risk)
  - Stress diffusion recovery (lateral coupling, context rerouting)
- Heatmap over capability space (stress intensity)
- Stress moment panel: Σ₀, Σ₁, Σ₂ (why moments for O(n) summaries)
- Connection to Gate 10: non-realizable states → unstable poles

**4. MemoryErasurePanel** (`src/components/epu/MemoryErasurePanel.js`)
- Side panel showing three erasure criteria:
  - Correlation decay threshold
  - Mutual information → 0
  - Entropy production + Landauer heat bound
- Connections:
  - Staleness-driven confidence decay (activation pressure)
  - Gate 9 irreversibility/WCET enforcement
- Interactive timeline showing memory lifecycle

### Content Structure

```js
export const copy = {
  en: {
    epuTechnical: {
      tabs: {
        temporal: "Temporal State (T◦)",
        sensing: "Sensing & Medium",
        constraints: "Constraints as Stress"
      },
      temporal: {
        title: "T◦ as State Manager",
        modelExplainer: "Temporal anchor t₀ defines reference frame...",
        lenses: ["Rate", "State", "Displacement", "Field"],
        autonomyMapping: {
          tracking: "Uses rate + field views for motion prediction",
          replay: "Integral accumulation over stored trajectory",
          admissibility: "Requires spatiotemporal coherence"
        }
      },
      sensing: {
        title: "Continuum-Aware Sensing",
        primitiveExplainer: "Round-trip measurement: τ_out → propagation → τ_in",
        modalities: [
          {
            name: "Electromagnetic",
            characteristic: "Null (lightlike)",
            mediumEffects: ["Scattering", "Absorption", "Refraction"],
            equation: "c² dt² - dx² = 0"
          },
          // ... more modalities
        ],
        mediumLevels: ["Clear", "Light fog", "Heavy scatter"],
        impactMap: {
          clear: { admissible: true, staleness: "low" },
          heavyScatter: { admissible: false, staleness: "high", gateShift: "G3 → conservative" }
        }
      },
      constraints: {
        title: "Constraints Generate Stress Fields",
        reformulation: "Local constraint C(x,t) → stress field σ_C(x,t) → propagation",
        scenarios: [
          { name: "Single Worker Anomaly", workers: [3], stress: "local" },
          { name: "Cascade Failure", workers: [1,2,3,7], stress: "critical" },
          { name: "Recovery", mechanism: "lateral coupling", stressReduction: 0.7 }
        ],
        moments: {
          Σ0: "Total stress",
          Σ1: "Stress centroid (weighted mean)",
          Σ2: "Stress spread (variance)"
        },
        stabilityLink: "Non-realizable → unstable pole → prevented by EPU constraints"
      },
      memoryErasure: {
        title: "Memory & Erasure Criteria",
        criteria: [
          "Correlation decay: ⟨A(t)B(t+τ)⟩ → 0 as τ → ∞",
          "Mutual information: I(X;Y) → 0",
          "Landauer bound: ΔS ≥ k ln 2 per bit erased"
        ],
        connections: [
          "Staleness drives confidence decay in Gate 5",
          "Gate 9 enforces irreversibility via WCET"
        ]
      }
    }
  },
  fa: { /* ... */ }
};
```

### Diagram Integration

Leverage existing Carousel for Perusal:
- Pre-render Mermaid diagrams for T◦ flow map, characteristic curves, stress propagation
- Store in `public/assets/diagrams/epu/`
- Reference via DiagramViewer component (already exists in codebase)

---

## Module 3: Verification Workbench
**Route:** `/en/verification/*`, `/fa/verification/*`  
**File:** `src/pages/Verification*.js` (5 sub-pages)  
**Purpose:** Filtration taxonomy, evidence constitution, traceability

### Route Structure

```
/en/verification/primitive       → Universal filtration primitive
/en/verification/inventory       → 10-path filter inventory
/en/verification/constitution    → Constitutional rules for perception
/en/verification/reports         → Traceability report builder
/en/verification/faults          → Fault injection campaign
```

### Page Components

**1. VerificationPrimitive** (`src/pages/VerificationPrimitive.js`)
```jsx
<Hero h1="Universal Filtration Primitive" subhead={t.heroSub} />

<SectionBlock
  title="Required Fields"
  body={t.fieldsExplainer}
>
  <FieldsTable fields={t.primitiveFields} />
</SectionBlock>

<SectionBlock
  title="Two Separation Modes"
  body={t.modesExplainer}
  alt
>
  <ModesComparison modes={t.separationModes} />
</SectionBlock>

<StagedInterfaceDemo stages={t.stages} />

<AtomResolvedSection content={t.atomPatchSet} />
```

**2. VerificationInventory** (`src/pages/VerificationInventory.js`)
```jsx
<Hero h1="10-Path Filter Inventory" subhead="Agent-facing reference" />

<FilterTable 
  paths={t.filterPaths}
  columns={['geometry', 'selectivity', 'fidelity', 'footprint', 'failures']}
  sortable
  searchable
/>

<StandardDeliverablesPanel deliverables={t.agentDeliverables} />

<MetricsVector vector={t.universalMetrics} />

<VerificationChecklist items={t.verificationSuite} />

<ComplexityTable data={t.complexityMetrics} />
```

**3. VerificationConstitution** (`src/pages/VerificationConstitution.js`)
```jsx
<Hero h1="Constitutional Verification" subhead="Pre-fusion admissibility for driverless perception" />

<ConstitutionalChecklist 
  rules={t.constitutionalRules}
  mockClaim={t.sampleSensorClaim}
  interactive
/>

<AdmissibilityWidget conditions={t.admissibilityConditions} />

<UnknownRegisterWidget entries={t.unknownRegister} />

<ChallengerWidget requirement={t.challengerRequirement} />
```

**4. VerificationReports** (`src/pages/VerificationReports.js`)
```jsx
<Hero h1="Traceability Report Builder" subhead="Export auditable evidence chains" />

<ReportForm
  sections={[
    'filtrationPath',
    'modeDeclaration',
    'transformations',
    'assumptions',
    'evidenceLineage',
    'admissibilityDecisions',
    'metricsVector',
    'verificationChecklist',
    'epuGateMapping'
  ]}
  onExport={handleExportJSON}
/>

<ReportPreview template={t.reportTemplate} />
```

**5. VerificationFaults** (`src/pages/VerificationFaults.js`)
```jsx
<Hero h1="Fault Injection Campaign" subhead="Demonstrate MRC routing under faults" />

<FaultCatalog 
  faults={t.faultCatalog}
  categories={['sensor', 'processing', 'environmental']}
/>

<FaultRunner
  onRun={handleFaultRun}
  outputs={['admissibilityTrace', 'gateFailures', 'routingDecision']}
/>

<FaultTraceViewer traces={faultTraces} />

<ExportButton format="fault_trace.json" />
```

### Shared Components

**FilterTable** (`src/components/verification/FilterTable.js`)
- Sortable, searchable table for 10 filtration paths
- Columns: Geometry, Selectivity Signal, Fidelity Proxy, Footprint, Default Failures
- Export to CSV/JSON

**ConstitutionalChecklist** (`src/components/verification/ConstitutionalChecklist.js`)
- Interactive checklist UI
- Apply rules to mock sensor claims
- Show pass/fail status with explanations
- Uses existing FAQAccordion pattern for expandable rules

**ReportForm** (`src/components/verification/ReportForm.js`)
- Multi-section form with validation
- Real-time preview
- Export to JSON with schema validation

**FaultCatalog** (`src/components/verification/FaultCatalog.js`)
- Categorized fault library
- Each fault: expected behavior, response time, detection coverage
- Interactive selection and execution

### Content Structure

```js
export const copy = {
  en: {
    verification: {
      primitive: {
        heroSub: "Foundation for all filtration operations",
        primitiveFields: [
          { field: "Domain", desc: "Input space definition" },
          { field: "Φ (Discrimination)", desc: "Typed criterion for selection" },
          { field: "Γ (Partition)", desc: "Rule for subset formation" },
          { field: "Substrate", desc: "Physical/computational medium" },
          { field: "Mode", desc: "DirectSelection | DecompositionBased" }
        ],
        stages: [
          { stage: "Represent", op: "z = R(x)", desc: "Transform to analyzable form" },
          { stage: "Discriminate", op: "s = Φ(z)", desc: "Compute selection signal" },
          { stage: "Select", op: "y = Γ(s)", desc: "Partition based on criterion" },
          { stage: "Compose", op: "x̂ = C(y,z)", desc: "Optional reconstruction" }
        ],
        atomPatchSet: {
          title: "Atom Patch Set Δ",
          desc: "Decomposition-based paths emit Δ as canonical deliverable",
          structure: "{ added: [], removed: [], modified: [], metadata: {} }"
        }
      },
      inventory: {
        filterPaths: [
          {
            id: 1,
            geometry: "Hyper-rectangle (axis-aligned bounds)",
            selectivity: "Threshold on scalar feature",
            fidelity: "Reconstruction error L2",
            footprint: "O(d) parameters",
            failures: ["Out-of-bounds", "Threshold drift"]
          },
          // ... 9 more paths
        ],
        agentDeliverables: [
          "Gate decision (route/retain/drop)",
          "Mask over representation",
          "Scores/labels",
          "Atom Patch Set Δ",
          "Audit report"
        ],
        universalMetrics: {
          F: "Fidelity (reconstruction quality)",
          S: "Selectivity (discrimination power)",
          T: "Throughput (elements/sec)",
          E: "Efficiency (compute/memory cost)"
        },
        verificationSuite: [
          "Monotonicity check",
          "Reconstruction validity",
          "Robustness to perturbation",
          "Regime adequacy",
          "Calibration verification"
        ],
        complexityMetrics: {
          columns: ["Training/Setup", "Per-Element Cost", "Memory", "Tuning Cost"],
          rows: [ /* 10 paths */ ]
        }
      },
      constitution: {
        heroSub: "Sensors as witnesses; every claim requires lineage",
        constitutionalRules: [
          {
            rule: "Sensors as Witnesses",
            desc: "Every assertion must have traceable origin",
            check: "lineagePresent"
          },
          {
            rule: "Inadmissible Evidence Excluded",
            desc: "Failed integrity/alignment/scope/replay → excluded, not averaged",
            check: "admissibilityGate"
          },
          {
            rule: "Independence Requirement",
            desc: "Correlated witnesses count as one",
            check: "independenceVerified"
          },
          {
            rule: "Safety Monotonicity",
            desc: "Less warrant → more conservative behavior",
            check: "conservatismIncreases"
          }
        ],
        admissibilityConditions: [
          "Integrity: Data unmodified from source",
          "Alignment: Spatiotemporal coherence",
          "Scope: Claim within sensor capability",
          "Replay: Lineage traceable to emission event"
        ],
        unknownRegister: {
          desc: "Travels with versions; records thin-evidence domains",
          entries: [
            { domain: "Heavy rain perception", evidence: "thin", status: "open" },
            { domain: "Pedestrian intent in crowds", evidence: "assumptions-heavy", status: "active-research" }
          ]
        },
        challengerRequirement: {
          desc: "At least one independent challenger pathway required",
          implementation: "Blind-spot office cannot be penalized for credible challenges"
        }
      },
      reports: {
        heroSub: "Exportable evidence chains with EPU gate mapping",
        reportSections: [
          "Filtration path(s) selected",
          "Separation mode declared",
          "R/Φ/Γ/C definitions",
          "Assumptions documented",
          "Regime adequacy checks",
          "Evidence lineage",
          "Admissibility decisions",
          "Metrics vector P=(F,S,T,E)",
          "Verification checklist results",
          "EPU gate mapping"
        ],
        reportTemplate: { /* JSON schema */ }
      },
      faults: {
        heroSub: "Every fault routes to MRC; demonstrate bounded response",
        faultCatalog: [
          {
            category: "Sensor",
            faults: [
              { name: "Camera occlusion", expected: "G2 failure → MRC", responseTime: "< 100ms" },
              { name: "Radar spoofing", expected: "Integrity fail → excluded", responseTime: "< 50ms" }
            ]
          },
          {
            category: "Processing",
            faults: [
              { name: "WCET violation", expected: "G9 → MRC", responseTime: "immediate" },
              { name: "Memory corruption", expected: "Integrity fail → MRC", responseTime: "< 10ms" }
            ]
          },
          {
            category: "Environmental",
            faults: [
              { name: "Heavy fog", expected: "Admissibility degradation → conservative", responseTime: "< 200ms" }
            ]
          }
        ]
      }
    }
  },
  fa: { /* ... */ }
};
```

---

## Module 4: Agent Roles & Governance
**Route:** `/en/agents/*`, `/fa/agents/*`  
**File:** `src/pages/Agents*.js` (5 sub-pages)  
**Purpose:** Constitutional governance, hierarchy, LLM-in-hardware, traceability

### Route Structure

```
/en/agents/roles             → Worker→Manager→Queen hierarchy
/en/agents/constitution      → Constitutional offices
/en/agents/runtime           → LLM-in-hardware bounded authority
/en/agents/artifacts         → Traceability outputs
/en/agents/simulator         → Claim lifecycle simulator
```

### Page Components

**1. AgentRoles** (`src/pages/AgentRoles.js`)
```jsx
<Hero h1="Operational Hierarchy" subhead="Worker → Manager → Queen" />

<GlobalRulesPanel rules={t.globalRules} />

<RoleCards roles={t.roles} expandable />

<StressPropagationDemo scenarios={t.stressScenarios} />

<HardwareStructView struct={t.hierarchyStruct} />
```

**2. AgentConstitution** (`src/pages/AgentConstitution.js`)
```jsx
<Hero h1="Constitutional Governance" subhead="Epistemic separation of powers" />

<OfficesTiles offices={t.constitutionalOffices} />

<ConstitutionalClauses clauses={t.clauses} checklistMode />

<UnknownRegisterPanel register={t.unknownRegister} />
```

**3. AgentRuntime** (`src/pages/AgentRuntime.js`)
```jsx
<Hero h1="LLM-in-Hardware" subhead="Bounded authority interfaces" />

<RoleAssignmentDiagram 
  llmRoles={["Proposer", "Manager-assist"]}
  hardwareRoles={["Verifier", "Queen authority"]}
/>

<InterfacesPanel interfaces={t.typedInterfaces} />

<TimingBoundaryExplainer content={t.timingBoundary} />
```

**4. AgentArtifacts** (`src/pages/AgentArtifacts.js`)
```jsx
<Hero h1="Traceability Artifacts" subhead="Role-specific outputs" />

<ArtifactTypesLibrary types={t.artifactTypes} />

<TraceabilityReportBuilder roleAware onExport={handleExport} />
```

**5. AgentSimulator** (`src/pages/AgentSimulator.js`)
```jsx
<Hero h1="Claim Lifecycle Simulator" subhead="Interactive constitutional workflow" />

<ScenarioPicker scenarios={t.scenarios} />

<ClaimStepper 
  steps={['Hypothesis', 'Verification', 'Adjudication', 'Canon/MRC', 'Audit']}
  onStepChange={handleStepChange}
/>

<FailureDemos demos={t.failureDemos} />
```

### Interactive Components

**RoleCards** (`src/components/agents/RoleCards.js`)
- Worker: local sensing, witness packets, memory/latency budgets
- Manager: aggregates Workers, agreement bits, load shedding
- Queen: final SAFE/UNSAFE, memoryless decisions, MRC routing
- Expandable cards with constraint indicators

**StressPropagationDemo** (`src/components/agents/StressPropagationDemo.js`)
- Three scenarios: Single worker anomaly, Multi-worker failure, Recovery
- Animated stress flow visualization
- Updates routing decisions (Normal vs Emergency)

**OfficesTiles** (`src/components/agents/OfficesTiles.js`)
- Archive, Proposers, Verifiers, Adjudicators, Auditor-General, Blind-Spot Discovery
- Each tile: responsibilities, constraints, artifacts
- Click to expand with constitutional powers/limits

**InterfacesPanel** (`src/components/agents/InterfacesPanel.js`)
- Four typed interfaces with JSON schemas:
  1. ProposeClaim (LLM → system)
  2. SubmitEvidence (Worker/Manager → Verifier)
  3. VerifyClaim (Verifier → Adjudicator)
  4. CanonizeOrRoute (Adjudicator/Queen → Archive/Control)
- Interactive JSON editor for testing

**ClaimStepper** (`src/components/agents/ClaimStepper.js`)
- Multi-step workflow with state visualization
- Each step shows: active role, emitted artifact, constitutional checks, reliance state
- Degrees of reliance badge: Hypothesis → Provisional → Canon → Retraction

### Content Structure

```js
export const copy = {
  en: {
    agents: {
      globalRules: [
        "Degrees of reliance: Hypothesis → Provisional → Canon → Retraction",
        "No role may upgrade reliance without constitutional pathway",
        "Correlated pathways = one witness",
        "Inadmissible evidence excluded, not averaged"
      ],
      roles: {
        worker: {
          title: "Worker (Many)",
          responsibilities: "Local sensing, feature extraction, invariant checks",
          artifacts: "Witness packet (raw reference + transforms + integrity flags), local votes",
          constraints: { memory: "256 KB", latency: "< 10ms" }
        },
        manager: {
          title: "Manager (Few)",
          responsibilities: "Aggregate Workers, preserve consistency",
          artifacts: "Agreement bits, ensemble confidence, decision-path metadata",
          capabilities: "Load shedding, context rerouting under stress"
        },
        queen: {
          title: "Queen (One)",
          responsibilities: "Final action authority, safety constraint primary",
          artifacts: "SAFE/UNSAFE decision, reason bits",
          mode: "Memoryless (each frame decided independently)",
          mrcRouting: "Unsafe/insufficient warrant → MRC (absorbing safe mode)"
        }
      },
      stressScenarios: [
        { name: "Single Worker Anomaly", stress: "localized", routing: "Normal" },
        { name: "Multi-Worker Failure", stress: "Manager primary violation", routing: "Emergency" },
        { name: "Recovery via Diffusion", stress: "decreasing", routing: "Normal restored" }
      ],
      hierarchyStruct: {
        fields: [
          "nn_votes: uint8[N_WORKERS]",
          "ensemble_confidence: float32",
          "agreement_bits: uint16",
          "queen_decision: bool (SAFE=1, UNSAFE=0)",
          "reason_bits: uint8",
          "trace_scores: float32[N_TRACES]"
        ]
      },
      constitutionalOffices: [
        {
          office: "The Archive",
          responsibility: "Custody of Canon",
          powers: "Maintains versioned history",
          constraints: "Forbids untracked erasure"
        },
        {
          office: "The Proposers",
          responsibility: "Hypothesis generation",
          powers: "Creates interpretations, plans",
          constraints: "Cannot canonize own outputs"
        },
        {
          office: "The Verifiers",
          responsibility: "Warrant and Admissibility",
          powers: "Tests evidence admissibility",
          constraints: "Must be structurally capable of disagreeing with Proposers"
        },
        {
          office: "The Adjudicators",
          responsibility: "Conflict Resolution",
          powers: "Resolves claim conflicts by admissible evidence",
          constraints: "Preserves ambiguity when evidence insufficient"
        },
        {
          office: "Auditor-General",
          responsibility: "Integrity Oversight",
          powers: "Audits constitutional compliance",
          constraints: "Can challenge canonizations"
        },
        {
          office: "Blind-Spot Discovery",
          responsibility: "Protected Challenger",
          powers: "Owns Unknown Register, enforces Challenger Requirement",
          constraints: "Cannot be penalized for credible challenges"
        }
      ],
      clauses: [
        { clause: "Provenance", desc: "Every claim must have traceable origin" },
        { clause: "Contestability", desc: "Claims can be challenged with admissible counter-evidence" },
        { clause: "Correction", desc: "Errors must be correctable through constitutional pathways" },
        { clause: "Scope", desc: "Claims limited to domains with adequate warrant" },
        { clause: "Non-Deception", desc: "System cannot misrepresent its uncertainty" },
        { clause: "Duty of Restraint", desc: "Don't canonize when warrant insufficient" },
        { clause: "Anti-Amplification", desc: "No 'verified' posture without verification" },
        { clause: "Anti-Silent-Drift", desc: "Truth changes must be explicit constitutional events" },
        { clause: "Self-Reference Constraint", desc: "Internal agreement ≠ warrant" }
      ],
      typedInterfaces: [
        {
          interface: "ProposeClaim",
          direction: "LLM → System",
          fields: { claim: "string", scope: "string", confidence: "float", references: "array" }
        },
        {
          interface: "SubmitEvidence",
          direction: "Worker/Manager → Verifier",
          fields: { witnessPacket: "object", lineage: "array" }
        },
        {
          interface: "VerifyClaim",
          direction: "Verifier → Adjudicator",
          fields: { admissible: "bool", warrantStrength: "float", dissentRecord: "array" }
        },
        {
          interface: "CanonizeOrRoute",
          direction: "Adjudicator/Queen → Archive/Control",
          fields: { decision: "CANON | MRC", canonUpdate: "object", mrcReason: "string" }
        }
      ],
      timingBoundary: {
        title: "Timing + Irreversibility Boundary",
        desc: "If compute budget or watchdog bound exceeded, bypass deliberation → MRC",
        logging: "Event logged for later adjudication (reviewable emergency power)"
      },
      artifactTypes: [
        { type: "Gate Decision", content: "route/retain/drop" },
        { type: "Mask", content: "over representation" },
        { type: "Scores/Labels", content: "confidence values" },
        { type: "Atom Patch Set Δ", content: "decomposition-based interventions" },
        { type: "Audit Report", content: "decision log table" }
      ],
      scenarios: [
        { name: "Clean Sensing", independence: true, corroboration: "exists" },
        { name: "Correlated Sensors", independence: false, corroboration: "collapses to one witness" },
        { name: "Drift + Compute Pressure", stress: "high", routing: "emergency" }
      ],
      failureDemos: [
        {
          name: "Consensus ≠ Warrant",
          desc: "Multiple internal components agree but verification fails",
          outcome: "Cannot canonize"
        },
        {
          name: "Inadmissible Evidence Exclusion",
          desc: "Evidence fails integrity/alignment/scope/replay",
          outcome: "Excluded; system becomes conservative"
        },
        {
          name: "Challenger Intervention",
          desc: "Blind-Spot Office flags Unknown Register entry",
          outcome: "Forces challenge event, blocks canonization"
        }
      ]
    }
  },
  fa: { /* ... */ }
};
```

---

## Module 5: Operations Console
**Route:** `/en/ops/*`, `/fa/ops/*`  
**File:** `src/pages/Ops*.js` (5 sub-pages)  
**Purpose:** KTE reconstruction, ISA, microprograms, monitoring, diagrams

### Route Structure

```
/en/ops/kte               → KTE reconstruction pipeline
/en/ops/isa               → PICAPD ISA explorer
/en/ops/microprograms     → Instruction sequence library
/en/ops/console           → Live monitoring dashboard
/en/ops/diagrams          → Operational diagram gallery
```

### Page Components

**1. OpsKTE** (`src/pages/OpsKTE.js`)
```jsx
<Hero h1="KTE Reconstruction Pipeline" subhead="Narrative → Operational System" />

<TransformationPrinciplePanel content={t.transformationPrinciple} />

<KTEPipelineDiagram pipeline={t.ktePipeline} interactive />

<RouterSelector contexts={t.deploymentContexts} />

<KTEProcessDesign phases={t.ktePhases} />
```

**2. OpsISA** (`src/pages/OpsISA.js`)
```jsx
<Hero h1="PICAPD ISA Explorer" subhead="Instruction set reference" />

<InstructionCategories categories={t.instructionCategories} />

<InstructionTable 
  instructions={t.instructions}
  columns={['mnemonic', 'operands', 'function', 'cycles', 'power', 'sideEffects']}
  searchable
  sortable
/>

<EncodingViewer interactive />
```

**3. OpsMicroprograms** (`src/pages/OpsMicroprograms.js`)
```jsx
<Hero h1="Microprograms" subhead="Higher-level behaviors as instruction sequences" />

<MicroprogramLibrary programs={t.microprograms} />

<StepThroughExecutor onStep={handleStep} />

<ExecutionTraceTable trace={executionTrace} />
```

**4. OpsConsole** (`src/pages/OpsConsole.js`)
```jsx
<Hero h1="Operations Console" subhead="Live monitoring and control" />

<DashboardGrid>
  <StateVariablesPanel data={mockState} />
  <PerformanceMetricsPanel data={mockMetrics} />
  <AlertStatusPanel alerts={mockAlerts} />
  <NextActionsPanel actions={mockActions} />
</DashboardGrid>

<AlertManagement stateMachine={t.alertStateMachine} />

<SimulationControls onRun={handleSimulation} faults={t.faultToggles} />
```

**5. OpsDiagrams** (`src/pages/OpsDiagrams.js`)
```jsx
<Hero h1="Operational Diagram Gallery" subhead="Mermaid visualizations" />

<DiagramCategories categories={t.diagramCategories} />

<DiagramGallery 
  diagrams={t.diagrams}
  renderMode="interactive"
  parameterizeMode
/>

<DiagramSourceViewer copyable />
```

### Interactive Components

**KTEPipelineDiagram** (`src/components/ops/KTEPipelineDiagram.js`)
- Five stages: Extract → Synthesize → Validate → Compose → Route
- Interactive stage selection showing inputs/outputs
- Context-aware highlighting based on deployment target

**RouterSelector** (`src/components/ops/RouterSelector.js`)
- Three deployment contexts:
  1. Autonomous systems (agent governance ISA)
  2. Scientific computing (variational computing ISA)
  3. Real-time control (constraint enforcement ISA)
- Changes operational objectives/thresholds visualization

**InstructionTable** (`src/components/ops/InstructionTable.js`)
- Searchable/sortable table for all PICAPD instructions
- Columns: Mnemonic, Operands, Function, Cycles, Power, Side Effects
- Click instruction for detailed view with encoding

**EncodingViewer** (`src/components/ops/EncodingViewer.js`)
- Interactive bitfield inspector
- Highlights opcode, rd/rs fields, immediate/extended payload
- Shows encoding in hex, binary, and decoded form

**MicroprogramLibrary** (`src/components/ops/MicroprogramLibrary.js`)
- Library of 6-20 instruction sequences
- Four categories: Constraint lifecycle, Event propagation, Population governance, Memory provenance
- Step-through execution with state visualization

**DashboardGrid** (`src/components/ops/DashboardGrid.js`)
- 4-panel responsive grid
- State variables, performance metrics, alerts, next actions
- Real-time updates from simulation

**DiagramGallery** (`src/components/ops/DiagramGallery.js`)
- Extends existing Carousel for Perusal pattern
- Categories: System overview, dataflow, power state machine, hierarchical decision, resource management
- Parameterize mode: update labels with mock telemetry

### Content Structure

```js
export const copy = {
  en: {
    ops: {
      kte: {
        transformationPrinciple: "Financial metrics → operational capacity metrics",
        ktePipeline: [
          { stage: "Extract", desc: "Core technical claims from documentation" },
          { stage: "Synthesize", desc: "Operational primitives" },
          { stage: "Validate", desc: "Physics-grounded units" },
          { stage: "Compose", desc: "Instruction set" },
          { stage: "Route", desc: "Deployment context" }
        ],
        deploymentContexts: [
          {
            name: "Autonomous Systems",
            isa: "Agent governance ISA",
            objectives: ["Safety", "Real-time responsiveness"],
            constraints: ["Latency < 100ms", "Deterministic behavior"]
          },
          {
            name: "Scientific Computing",
            isa: "Variational computing ISA",
            objectives: ["Accuracy", "Conservation law preservation"],
            constraints: ["Energy functional convergence", "Symplectic integration"]
          },
          {
            name: "Real-Time Control",
            isa: "Constraint enforcement ISA",
            objectives: ["Bounded response", "Stability"],
            constraints: ["WCET guarantees", "No unbounded loops"]
          }
        ],
        ktePhases: [
          {
            phase: "Phase 1: Specification",
            activities: ["Objective selection (safety/performance/energy)", "Constraint target definition"]
          },
          {
            phase: "Phase 2: Synthesis",
            activities: ["Conservative path", "Balanced path", "High-throughput path"]
          },
          {
            phase: "Phase 3: Optimization",
            activities: ["Multi-objective weighting", "Pareto tradeoff visualization"]
          }
        ]
      },
      isa: {
        instructionCategories: [
          { name: "Lagrangian Operations", count: 8, desc: "Variational / action evaluation" },
          { name: "Constraint Operations", count: 12, desc: "Set/clear/wait/test + register/unregister" },
          { name: "Population Operations", count: 6, desc: "Spawn/terminate/aggregate/realizability" },
          { name: "Event Operations", count: 10, desc: "Broadcast/subscribe/filter/sync + queue ops" },
          { name: "Memory Operations", count: 9, desc: "LSM load/store, cache, flush/fetch/prefetch" }
        ],
        instructions: [
          {
            mnemonic: "CSET",
            operands: "rd, constraint_id",
            function: "Set constraint active",
            cycles: 3,
            power: "0.8 mW",
            sideEffects: "Broadcast to hierarchy"
          },
          {
            mnemonic: "CWAIT",
            operands: "rs, timeout",
            function: "Wait for constraint satisfaction",
            cycles: "variable",
            power: "0.2 mW (idle)",
            sideEffects: "May trigger timeout → MRC"
          },
          // ... 43 more instructions
        ]
      },
      microprograms: {
        constraintLifecycle: {
          title: "Constraint Lifecycle",
          instructions: [
            "CREG r1, #constraint_42",
            "CSET r1",
            "CTEST r2, r1",
            "CWAIT r1, #1000",
            "CCLR r1",
            "CUNREG r1"
          ],
          trace: [ /* execution state per step */ ]
        },
        eventPropagation: {
          title: "Event Propagation",
          instructions: [
            "ESUB r1, #event_type_7",
            "EFILT r1, #threshold_0.95",
            "EBCAST r2, #worker_domain",
            "EQUERY r3, r1",
            "ECLR r1"
          ]
        },
        // ... more microprograms
      },
      console: {
        stateVariables: {
          activeCores: { current: 47, total: 64 },
          populationSize: { current: 128, max: 256 },
          constraintSatisfaction: { percentage: 97.3 },
          powerCurrent: { value: 8.2, peak: 10.0, unit: "W" }
        },
        performanceMetrics: {
          decisionsPerSec: 1247,
          avgLatency: { value: 42, unit: "ms" },
          unknownRegistryCount: 7,
          unknownGrowthRate: { value: 0.02, unit: "entries/min" },
          archiveGrowthRate: { value: 1.3, unit: "MB/hour" }
        },
        alertStateMachine: {
          states: ["Normal", "Warning", "Critical", "Emergency", "Recovery", "Shutdown"],
          transitions: [
            { from: "Normal", to: "Warning", trigger: "Latency drift > 10%" },
            { from: "Warning", to: "Critical", trigger: "Constraint violations > 5%" },
            { from: "Critical", to: "Emergency", trigger: "Constitutional breach detected" },
            { from: "Emergency", to: "Recovery", trigger: "Manual intervention + validation" },
            { from: "Recovery", to: "Normal", trigger: "Stability restored > 5 min" }
          ],
          correctiveActions: [
            { state: "Warning", action: "Increase validation depth", automatic: true },
            { state: "Critical", action: "Reduce throughput", automatic: true },
            { state: "Emergency", action: "Route to MRC", automatic: true, overrideable: false }
          ]
        },
        faultToggles: [
          "Latency drift",
          "Unknown registry surge",
          "Constraint violation burst",
          "Event storm",
          "Memory pressure"
        ]
      },
      diagrams: {
        diagramCategories: [
          "System overview",
          "Sensor-to-decision dataflow",
          "Power state machine",
          "Hierarchical decision pipeline",
          "Worker/Manager/Queen internal flows",
          "Constraint lifecycle and dependencies",
          "Resource management (core activation, memory hierarchy)",
          "Deployment topology (autonomy integration)"
        ],
        diagrams: [
          {
            id: "system-overview",
            category: "System overview",
            title: "PICAPD System Architecture",
            mermaidSource: "graph TD\n  A[Sensors] --> B[EPU]...",
            parameterizable: true
          },
          // ... more diagrams
        ]
      }
    }
  },
  fa: { /* ... */ }
};
```

### Diagram Integration Strategy

**Leverage existing Carousel for Perusal infrastructure:**

1. **Pre-render Mermaid diagrams** at build time:
   - Source files in `src/assets/mermaid/ops/`
   - Output to `public/assets/diagrams/ops/`
   - Use existing `npm run render-diagrams` script

2. **Parameterization layer:**
   - Store base diagrams with placeholder tokens: `{{activeCores}}`, `{{latency}}`
   - JavaScript function to replace tokens with live simulation values
   - Re-render on demand or use CSS/SVG manipulation for simple value updates

3. **Gallery component** extends existing DiagramViewer:
   - Add "Parameterize" mode toggle
   - Add "Copy source" button
   - Add "Export as PNG/SVG" functionality

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal:** Establish architecture patterns and base components

- [ ] Create `/src/components/epu/` directory structure
- [ ] Extend `src/styles/tokens.css` with EPU color tokens
- [ ] Create `src/styles/epu.css` with shared EPU component styles
- [ ] Set up `/src/data/copy.js` structure for all 5 modules (skeleton)
- [ ] Configure routing in `src/App.js` for all new routes
- [ ] Add navigation links to Header and Footer

### Phase 2: Module 1 — EPU Landing (Week 2)
**Goal:** Complete EPU landing page with all interactive components

- [ ] Build `FivePillars.js` component
- [ ] Build `TenGatePipeline.js` with drawer system
- [ ] Build `AbsorbingStateDemo.js` visualization
- [ ] Build `ThermodynamicGateDemo.js` with entropy timeline
- [ ] Build `TransferFunctionDemo.js` with AGM iteration
- [ ] Build `ConstitutionalVerification.js` checklist
- [ ] Build `ScenarioSelector.js` with export functionality
- [ ] Complete all English content in `copy.js`
- [ ] Complete all Persian translations
- [ ] Test RTL layout and accessibility

### Phase 3: Module 2 — Technical Deep-Dive (Week 3)
**Goal:** Complete 3-tab technical demonstration

- [ ] Build `TemporalStateTab.js` with interactive timeline
- [ ] Build `SensingTab.js` with medium slider
- [ ] Build `ConstraintsTab.js` with stress visualization
- [ ] Build `MemoryErasurePanel.js`
- [ ] Pre-render Mermaid diagrams (T◦ flow, characteristics, stress)
- [ ] Implement export bundle functionality
- [ ] Complete content and translations
- [ ] Integration testing

### Phase 4: Module 3 — Verification Workbench (Week 4)
**Goal:** Complete all 5 verification routes

- [ ] Build `VerificationPrimitive.js` page
- [ ] Build `VerificationInventory.js` with FilterTable
- [ ] Build `VerificationConstitution.js` with interactive checklist
- [ ] Build `VerificationReports.js` with form builder
- [ ] Build `VerificationFaults.js` with fault catalog
- [ ] Build shared FilterTable component
- [ ] Build ConstitutionalChecklist component
- [ ] Build ReportForm component
- [ ] Build FaultCatalog component
- [ ] Complete content and translations
- [ ] Test all export functionalities

### Phase 5: Module 4 — Agent Roles (Week 5)
**Goal:** Complete all 5 agent governance routes

- [ ] Build `AgentRoles.js` with hierarchy visualization
- [ ] Build `AgentConstitution.js` with office tiles
- [ ] Build `AgentRuntime.js` with interface panels
- [ ] Build `AgentArtifacts.js` with report builder
- [ ] Build `AgentSimulator.js` with stepper
- [ ] Build RoleCards component
- [ ] Build StressPropagationDemo component
- [ ] Build OfficesTiles component
- [ ] Build InterfacesPanel component
- [ ] Build ClaimStepper component
- [ ] Complete content and translations
- [ ] Test all failure demonstrations

### Phase 6: Module 5 — Operations Console (Week 6)
**Goal:** Complete all 5 operations routes

- [ ] Build `OpsKTE.js` with pipeline diagram
- [ ] Build `OpsISA.js` with instruction table
- [ ] Build `OpsMicroprograms.js` with executor
- [ ] Build `OpsConsole.js` with dashboard
- [ ] Build `OpsDiagrams.js` gallery
- [ ] Build KTEPipelineDiagram component
- [ ] Build InstructionTable component
- [ ] Build MicroprogramLibrary component
- [ ] Build DashboardGrid component
- [ ] Build DiagramGallery component
- [ ] Pre-render operational Mermaid diagrams
- [ ] Implement simulation engine
- [ ] Complete content and translations
- [ ] Integration testing

### Phase 7: Cross-Module Integration (Week 7)
**Goal:** Ensure seamless navigation and data flow

- [ ] Implement cross-module navigation (CTAs linking between modules)
- [ ] Verify all export functionalities work across modules
- [ ] Test end-to-end user journeys
- [ ] Verify bilingual consistency across all pages
- [ ] Test RTL layout on all pages
- [ ] Accessibility audit (ARIA, keyboard nav, screen readers)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Mobile responsiveness verification

### Phase 8: Testing & Documentation (Week 8)
**Goal:** Comprehensive testing and deployment readiness

- [ ] Write React Testing Library tests for all new components
- [ ] Accessibility testing with axe-core
- [ ] Performance testing with Lighthouse
- [ ] RTL screenshot tests for Persian layouts
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Update main README with new routes
- [ ] Create internal documentation for content editors
- [ ] Production build verification
- [ ] Deploy to Vercel staging
- [ ] Final QA and sign-off

---

## Technical Specifications

### Shared Component Patterns

**1. Interactive Cards**
```jsx
// Pattern used by FivePillars, RoleCards, OfficesTiles
<div className="card-grid">
  {items.map((item, i) => (
    <Card
      key={i}
      title={item.title}
      expandable
      onExpand={() => setExpanded(i)}
      expanded={expanded === i}
    >
      {item.content}
    </Card>
  ))}
</div>
```

**2. Tabbed Interfaces**
```jsx
// Pattern used by EPU Technical, ISA Explorer
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

<Tabs defaultValue={tabs[0].value}>
  <TabsList>
    {tabs.map(tab => (
      <TabsTrigger key={tab.value} value={tab.value}>
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {tabs.map(tab => (
    <TabsContent key={tab.value} value={tab.value}>
      {tab.component}
    </TabsContent>
  ))}
</Tabs>
```

**3. Export Functionality**
```jsx
// Pattern used across all modules
const handleExport = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
```

**4. Simulation Engine**
```jsx
// Pattern for OpsConsole and AgentSimulator
const [simulationState, setSimulationState] = useState(initialState);
const [isRunning, setIsRunning] = useState(false);

const runSimulation = () => {
  setIsRunning(true);
  const interval = setInterval(() => {
    setSimulationState(prev => updateSimulationState(prev));
  }, 100); // 10 FPS
  
  setTimeout(() => {
    clearInterval(interval);
    setIsRunning(false);
  }, 60000); // 1 minute simulation
};
```

### Design System Extensions

**EPU Color Tokens** (add to `src/styles/tokens.css`):
```css
:root {
  /* EPU Module Accents */
  --epu-accent-representation: #3B82F6;  /* Blue */
  --epu-accent-activation: #8B5CF6;      /* Purple */
  --epu-accent-inference: #F59E0B;       /* Amber */
  
  /* Verification Module */
  --verification-accent-primitive: #10B981;    /* Green */
  --verification-accent-inventory: #06B6D4;    /* Cyan */
  --verification-accent-constitution: #EC4899; /* Pink */
  
  /* Agent Roles */
  --agent-worker: #3B82F6;    /* Blue */
  --agent-manager: #8B5CF6;   /* Purple */
  --agent-queen: #EF4444;     /* Red */
  
  /* Operations Console */
  --ops-normal: #10B981;      /* Green */
  --ops-warning: #F59E0B;     /* Amber */
  --ops-critical: #EF4444;    /* Red */
  --ops-emergency: #7C2D12;   /* Dark red */
  
  /* Stress Visualization */
  --stress-low: #D1FAE5;      /* Light green */
  --stress-medium: #FEF3C7;   /* Light amber */
  --stress-high: #FEE2E2;     /* Light red */
  --stress-critical: #7C2D12; /* Dark red */
}
```

**Responsive Grid System**:
```css
/* Shared grid patterns */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
```

### Accessibility Requirements

**ARIA Labels:**
- All interactive elements have `aria-label` or `aria-labelledby`
- Expandable sections use `aria-expanded` and `aria-controls`
- Tab panels use `role="tabpanel"` with `aria-labelledby`
- All form inputs have associated `<label>` elements

**Keyboard Navigation:**
- All interactive elements reachable via Tab key
- Enter/Space activate buttons and toggle states
- Escape closes drawers and modals
- Arrow keys navigate within tab lists and select dropdowns

**Screen Reader Support:**
- Status changes announced via `aria-live` regions
- Loading states announced
- Error messages associated with form fields via `aria-describedby`
- Complex visualizations have text alternatives

**RTL Layout:**
- All layouts use CSS logical properties (`margin-inline-start`, etc.)
- Icons and directional indicators flip correctly in RTL
- Text alignment respects `dir` attribute
- Scroll direction appropriate for reading direction

### Performance Optimization

**Code Splitting:**
```jsx
// Lazy load large components
const EPUTechnical = lazy(() => import('./pages/EPUTechnical'));
const OpsConsole = lazy(() => import('./pages/OpsConsole'));

// In routes
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/en/epu/technical" element={<EPUTechnical />} />
</Suspense>
```

**Memoization:**
```jsx
// Expensive computations
const filteredGates = useMemo(() => 
  gates.filter(g => g.band === selectedBand),
  [gates, selectedBand]
);

// Callback functions
const handleGateClick = useCallback((gateId) => {
  setSelectedGate(gateId);
}, []);
```

**Lazy Loading:**
```jsx
// Diagrams load only when scrolled into view
const DiagramCard = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {isVisible ? <img src={src} alt={alt} /> : <Placeholder />}
    </div>
  );
};
```

---

## Testing Strategy

### Unit Tests (React Testing Library)

**Component Testing Pattern:**
```javascript
// Example: FivePillars.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { FivePillars } from '../components/epu/FivePillars';

describe('FivePillars', () => {
  const mockPillars = [
    { title: 'General Relativity', body: 'Test content...' }
  ];
  
  it('renders all pillars', () => {
    render(<FivePillars pillars={mockPillars} />);
    expect(screen.getByText('General Relativity')).toBeInTheDocument();
  });
  
  it('expands pillar on click', () => {
    render(<FivePillars pillars={mockPillars} />);
    const card = screen.getByText('General Relativity');
    fireEvent.click(card);
    expect(screen.getByText('Test content...')).toBeVisible();
  });
  
  it('supports keyboard navigation', () => {
    render(<FivePillars pillars={mockPillars} />);
    const card = screen.getByRole('button', { name: /General Relativity/i });
    card.focus();
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(screen.getByText('Test content...')).toBeVisible();
  });
});
```

### Accessibility Tests

```javascript
// Use jest-axe for automated a11y testing
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<FivePillars pillars={mockPillars} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### RTL Layout Tests

```javascript
// Test Persian layout
it('renders correctly in RTL mode', () => {
  render(
    <div dir="rtl" lang="fa">
      <FivePillars pillars={mockPillarsFa} />
    </div>
  );
  const container = screen.getByRole('region');
  expect(container).toHaveAttribute('dir', 'rtl');
  // Visual regression testing with screenshots
});
```

### Integration Tests

```javascript
// Test cross-module navigation
it('navigates from EPU to Technical Deep-Dive', () => {
  render(<App />);
  const ctaButton = screen.getByText(/Explore Technical Deep-Dive/i);
  fireEvent.click(ctaButton);
  expect(screen.getByText(/Temporal State/i)).toBeInTheDocument();
});
```

---

## Content Migration Guide

### Extracting Content from Technical Documents

**Source Documents:**
1. `01_Architecture_Reconstruction_Plan.md` → KTE reconstruction, ISA
2. `02_PICAPD_ISA_Official_Specification.md` → Instruction set details
3. `03_PICAPD_Visualization_Suite.md` → Operational diagrams

**Migration Process:**

1. **Identify bilingual content needs:**
   - Technical terms: preserve English, provide Persian transliteration
   - Formulas: use LaTeX, same in both languages
   - Descriptions: full translation required

2. **Structure in `copy.js`:**
   ```javascript
   // Technical term pattern
   {
     en: "Elliptic integrals provide exact solutions",
     fa: "انتگرال‌های بیضوی (Elliptic integrals) راه‌حل دقیق ارائه می‌دهند"
   }
   
   // Formula pattern
   {
     formula: "∫₀^π √(1 - k²sin²θ) dθ",  // Same for both languages
     description: {
       en: "Complete elliptic integral of the second kind",
       fa: "انتگرال بیضوی کامل نوع دوم"
     }
   }
   ```

3. **Quality assurance:**
   - Technical reviewer verifies English accuracy
   - Native Persian speaker verifies translation quality
   - Technical Persian speaker verifies terminology consistency

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (`npm test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No ESLint errors or warnings
- [ ] All images optimized and compressed
- [ ] All Mermaid diagrams pre-rendered
- [ ] Bundle size analysis (target: < 2MB initial load)
- [ ] Lighthouse score: Performance > 90, Accessibility = 100

### Vercel Configuration

**Environment Variables** (set in Vercel dashboard):
```bash
NODE_ENV=production
CI=false
DISABLE_ESLINT_PLUGIN=true
```

**Build Settings:**
```json
{
  "buildCommand": "DISABLE_ESLINT_PLUGIN=true npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app"
}
```

### Post-Deployment Verification

- [ ] All routes accessible (EN and FA)
- [ ] Language toggle works on all pages
- [ ] All exports download correctly
- [ ] All interactive components function
- [ ] No console errors in production
- [ ] Analytics tracking verified (if applicable)
- [ ] Sitemap updated
- [ ] Search engine indexing verified

---

## Maintenance & Iteration

### Content Update Workflow

1. **Edit content** in `src/data/copy.js`
2. **Verify translations** (both EN and FA)
3. **Run tests** to catch missing keys
4. **Build locally** to verify
5. **Commit and push** to trigger Vercel deployment

### Adding New Interactive Features

1. **Document the requirement** in technical specification
2. **Create component** in appropriate `/components/` subdirectory
3. **Write tests** for new component
4. **Update content** in `copy.js`
5. **Update README** with usage documentation
6. **Deploy** and monitor for issues

### Performance Monitoring

- Monitor bundle size on each deployment
- Track Core Web Vitals (LCP, FID, CLS)
- Monitor error rates via Vercel Analytics
- Review accessibility audits quarterly

---

## Success Metrics

### Technical Metrics

- **Performance:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibility:** 100% Lighthouse accessibility score
- **Coverage:** > 80% test coverage for all new components
- **Bundle Size:** < 2MB initial load, < 5MB total

### User Engagement Metrics

- **Time on page:** Average > 2 minutes for technical pages
- **Export usage:** Track JSON export downloads
- **Navigation depth:** Users visiting 3+ pages per session
- **Language distribution:** Balance between EN and FA usage

### Quality Metrics

- **Zero console errors** in production
- **Zero accessibility violations** in axe audits
- **Cross-browser compatibility:** 100% functionality in Chrome, Firefox, Safari
- **Mobile responsiveness:** 100% functionality on mobile devices

---

## Appendix: File Manifest

### New Files to Create

**Pages (20 files):**
```
src/pages/EPU.js
src/pages/EPUTechnical.js
src/pages/VerificationPrimitive.js
src/pages/VerificationInventory.js
src/pages/VerificationConstitution.js
src/pages/VerificationReports.js
src/pages/VerificationFaults.js
src/pages/AgentRoles.js
src/pages/AgentConstitution.js
src/pages/AgentRuntime.js
src/pages/AgentArtifacts.js
src/pages/AgentSimulator.js
src/pages/OpsKTE.js
src/pages/OpsISA.js
src/pages/OpsMicroprograms.js
src/pages/OpsConsole.js
src/pages/OpsDiagrams.js
```

**Components (35+ files):**
```
src/components/epu/FivePillars.js
src/components/epu/TenGatePipeline.js
src/components/epu/AbsorbingStateDemo.js
src/components/epu/ThermodynamicGateDemo.js
src/components/epu/TransferFunctionDemo.js
src/components/epu/ConstitutionalVerification.js
src/components/epu/ScenarioSelector.js
src/components/epu/technical/TemporalStateTab.js
src/components/epu/technical/SensingTab.js
src/components/epu/technical/ConstraintsTab.js
src/components/epu/MemoryErasurePanel.js

src/components/verification/FilterTable.js
src/components/verification/ConstitutionalChecklist.js
src/components/verification/ReportForm.js
src/components/verification/FaultCatalog.js
src/components/verification/FieldsTable.js
src/components/verification/ModesComparison.js
src/components/verification/StagedInterfaceDemo.js
src/components/verification/AtomResolvedSection.js
src/components/verification/StandardDeliverablesPanel.js
src/components/verification/MetricsVector.js
src/components/verification/VerificationChecklist.js
src/components/verification/ComplexityTable.js
src/components/verification/AdmissibilityWidget.js
src/components/verification/UnknownRegisterWidget.js
src/components/verification/ChallengerWidget.js
src/components/verification/FaultRunner.js
src/components/verification/FaultTraceViewer.js

src/components/agents/RoleCards.js
src/components/agents/StressPropagationDemo.js
src/components/agents/OfficesTiles.js
src/components/agents/InterfacesPanel.js
src/components/agents/ClaimStepper.js

src/components/ops/KTEPipelineDiagram.js
src/components/ops/RouterSelector.js
src/components/ops/InstructionTable.js
src/components/ops/EncodingViewer.js
src/components/ops/MicroprogramLibrary.js
src/components/ops/DashboardGrid.js
src/components/ops/DiagramGallery.js
```

**Styles (2 files):**
```
src/styles/epu.css
src/styles/modules.css (shared across verification/agents/ops)
```

**Diagrams (15+ pre-rendered Mermaid files):**
```
public/assets/diagrams/epu/temporal-flow-en.svg
public/assets/diagrams/epu/temporal-flow-fa.svg
public/assets/diagrams/epu/characteristic-curves-en.svg
public/assets/diagrams/epu/stress-propagation-en.svg
public/assets/diagrams/ops/system-overview-en.svg
public/assets/diagrams/ops/power-state-machine-en.svg
public/assets/diagrams/ops/hierarchical-decision-en.svg
public/assets/diagrams/ops/worker-manager-queen-en.svg
public/assets/diagrams/ops/constraint-lifecycle-en.svg
public/assets/diagrams/ops/resource-management-en.svg
public/assets/diagrams/ops/deployment-topology-en.svg
... (duplicates for -fa.svg)
```

**Tests (20+ test files):**
```
src/components/epu/__tests__/FivePillars.test.js
src/components/epu/__tests__/TenGatePipeline.test.js
src/components/epu/__tests__/ScenarioSelector.test.js
src/components/epu/technical/__tests__/TemporalStateTab.test.js
src/components/verification/__tests__/FilterTable.test.js
src/components/verification/__tests__/ConstitutionalChecklist.test.js
src/components/agents/__tests__/RoleCards.test.js
src/components/agents/__tests__/ClaimStepper.test.js
src/components/ops/__tests__/InstructionTable.test.js
src/components/ops/__tests__/DashboardGrid.test.js
... (more test files)
```

**Total new files:** ~85 files (~15,000 lines of code)

---

## Final Notes

### Architectural Principles

1. **Reuse existing patterns:** All new components follow established patterns (Hero, SectionBlock, etc.)
2. **Maintain bilingual parity:** Every string has EN and FA versions
3. **Preserve accessibility:** WCAG 2.1 AA compliance throughout
4. **Static-first:** No external APIs; all data mocked or pre-rendered
5. **Export-friendly:** Every interactive demo can export trace data

### Content Philosophy

1. **Technical honesty:** No marketing fluff; engineering documentation tone
2. **Verifiable claims:** Every assertion backed by equations, diagrams, or architectural references
3. **Educational depth:** Teach concepts, don't just demonstrate features
4. **Progressive disclosure:** Start simple, allow deep exploration
5. **Audit trail:** Every decision, every gate, every claim has "why admitted / why excluded" metadata

### Integration with Existing Features

- **Fact Engine:** Can surface EPU/verification/agent facts in rotation
- **Knowledge Base:** Cross-link to relevant KB chapters in CTAs
- **Carousel for Perusal:** Operational diagrams integrated into existing gallery

This execution plan provides a complete, production-ready specification for implementing the EPU Demonstration Suite within the Ghost Autonomy website architecture. All components respect existing patterns, maintain accessibility standards, and deliver technically rigorous educational content in both English and Persian.
