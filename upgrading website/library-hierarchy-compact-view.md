# Library of Documents & Assets - Compact Hierarchical View

**Last Updated:** 2026-02-18
**Total Files Analyzed:** 1,775 (125 root + 1,650 Notion 2025)
**Processing Strategy:** Tier-based priority (CRITICAL → HIGH → MEDIUM → Archive)

---

## 📊 Executive Dashboard

| Tier | Count | % | Priority | Timeline | Status |
|------|-------|---|----------|----------|--------|
| **TIER 0: CRITICAL** | 18 | 1.0% | P0 | Weeks 1-2 | 🔄 In Progress |
| **TIER 1: HIGH** | 71 | 4.0% | P1-P2 | Weeks 3-8 | ⏳ Queued |
| **TIER 2: MEDIUM** | 211 | 11.9% | P3-P4 | Weeks 9-20 | ⏳ Queued |
| **TIER 3: Archive** | 1,475 | 83.1% | P7 | Reference only | 📁 Archived |

**Language Distribution:**
- English: 1,527 files (86%)
- Persian/Farsi: 248 files (14%)
  - Technical (bilingual pairs): 21 files
  - Non-technical: 227 files

**File Type Breakdown (High-value tiers only):**
- Markdown (.md): 92 files
- PDF: 34 files
- DOCX: 8 files
- LaTeX (.tex): 15 files

---

## 📌 TIER 0: CRITICAL (18 files) - Ghost Autonomy Core IP

**Target:** 100% published within 2 weeks
**Complexity:** High (175+ tables, bilingual, LaTeX-heavy)
**URL Base:** `/knowledge-base/picapd-isa/*` and `/company/*`

### 🔷 Category 1: PICAPD ISA Family (13 files)

#### 📄 English Specifications (8 files)

```
1. ✅ PICAPD INSTRUCTION SET ARCHITECTURE.md
   → /knowledge-base/picapd-isa/core-specification
   │  175+ instruction tables | 24-core EPU architecture
   │  Bilateral pair: مجموعه دستورالعمل PICAPD.md
   │  Status: Needs table extraction + LaTeX formatting (booktabs)
   │  Processing estimate: 3 days

2. ⚠️ Hardware ISA.pdf
   → /knowledge-base/picapd-isa/hardware-reference
   │  54 pages | 247× GPU speedup benchmarks | v1.0 technical reference
   │  Bilateral pair: None (English only)
   │  Status: Needs PDF→web conversion + figure extraction
   │  Processing estimate: 2 days

3. ✅ PICAPD_Silicon.md
   → /knowledge-base/picapd-isa/silicon-implementation
   │  28nm process | 24-core layout | Physical design details
   │  Bilateral pair: PICAPDسیلیکون فارسی.md
   │  Status: Too large (>25K tokens), needs chunking
   │  Processing estimate: 2 days

4. ⚠️ ISA.pdf
   → /knowledge-base/picapd-isa/isa-specification-alt
   │  Alternative ISA version | Cross-reference with Hardware ISA.pdf
   │  Bilateral pair: دستورالعمل.pdf
   │  Status: Verify uniqueness, potential duplicate
   │  Processing estimate: 1 day

5. ⚠️ PICAPD_compressed.pdf
   → /knowledge-base/picapd-isa/compressed-reference
   │  Compressed distribution format | Quick reference
   │  Status: Verify compression method, extract unique content
   │  Processing estimate: 1 day

6. ✅ PICAPD_ISA_Rectification_Main_Context.md
   → /knowledge-base/picapd-isa/errata-context
   │  ISA corrections and evolution history
   │  Status: Ready for publication (Markdown)
   │  Processing estimate: 4 hours

7. ✅ PICAPD_v1_0_1_Errata_PatchText.md
   → /knowledge-base/picapd-isa/v1-0-1-errata
   │  Official errata for v1.0.1
   │  Status: Ready for publication (Markdown)
   │  Processing estimate: 4 hours

8. ✅ PICAPD_v1_1_Annex_Drafts.md
   → /knowledge-base/picapd-isa/v1-1-annex-drafts
   │  Draft annexes for next version roadmap
   │  Status: Ready for publication (Markdown)
   │  Processing estimate: 4 hours
```

#### 🌐 Persian فارسی Specifications (5 files)

```
9. 🔄 مجموعه دستورالعمل PICAPD.md
   → /fa/knowledge-base/picapd-isa/core-specification
   │  PICAPD instruction set (Farsi) | Bilateral pair of #1
   │  Status: Needs RTL layout + bidirectional table formatting
   │  Processing estimate: 3 days (parallel with #1)

10. 🔄 PICAPDسیلیکون فارسی.md
    → /fa/knowledge-base/picapd-isa/silicon-implementation
    │  Silicon documentation (Farsi) | Bilateral pair of #3
    │  Status: RTL layout + Persian numeral handling
    │  Processing estimate: 2 days

11. 🔄 تحلیل رقابتی فنی یکپارچه.md
    → /fa/company/competitive-analysis
    │  Competitive technical analysis (Farsi)
    │  Bilateral pair: Ghost_Autonomy_Unified_Technical_Analysis_V4.md
    │  Status: RTL layout + technical term glossary
    │  Processing estimate: 2 days

12. ⚠️ سیلیکون.pdf
    → /fa/knowledge-base/picapd-isa/silicon-reference
    │  Silicon documentation PDF (Farsi)
    │  Status: PDF→web + RTL formatting
    │  Processing estimate: 1 day

13. ⚠️ دستورالعمل.pdf
    → /fa/knowledge-base/picapd-isa/instruction-manual
    │  Instruction manual PDF (Farsi) | Likely pair of #4
    │  Status: PDF→web + RTL formatting
    │  Processing estimate: 1 day
```

### 🔷 Category 2: Strategic & Competitive Analysis (5 files)

```
14. ✅ Ghost_Autonomy_Unified_Technical_Analysis_V4.md
    → /company/competitive-analysis
    │  Latest unified competitive analysis (V4)
    │  Bilateral pair: تحلیل رقابتی فنی یکپارچه.md (#11)
    │  Status: Too large (>25K tokens), needs chunking
    │  Processing estimate: 2 days

15. ⚠️ Ghost Autonomy - Unified Technical Competitive Analysis V4.pdf
    → /company/competitive-analysis-pdf
    │  PDF version of V4 analysis | Distribution format
    │  Status: PDF→web conversion
    │  Processing estimate: 1 day

16. ✅ Highest-impact spec fixes for ISA.md
    → /knowledge-base/picapd-isa/priority-improvements
    │  Priority ISA specification improvements | Technical debt tracking
    │  Status: Ready for publication (Markdown)
    │  Processing estimate: 4 hours

17. ✅ PICAPD_Platform_Profile_STOP5_Automotive_Perception.md
    → /technology/stop-5-automotive-perception
    │  STOP-5 automotive perception use case demonstration
    │  Status: Ready for publication (Markdown)
    │  Processing estimate: 6 hours

18. ✅ STOP_5_Bitvector_Index.md
    → /technology/stop-5-bitvector-indexing
    │  Bitvector indexing algorithm for STOP-5 pipeline
    │  Status: Ready for publication (Markdown)
    │  Processing estimate: 4 hours
```

---

## 📖 TIER 1: HIGH (71 files) - Technical Content

**Target:** 80% published within 8 weeks
**URL Base:** `/technology/*`, `/science/*`, `/knowledge-base/*`

### 🔷 Category 1: Autonomous Vehicles Research (45 files from Notion 2025)

#### Subcategory: Core AV Decision-Making (Tier 1A - Priority P1)

```
19. ✅ Autonomous Vehicles — Research Note.md
    → /science/av-decision-making
    │  Dynamic problem formulation | Real-time optimization | Reasoning stack
    │  Status: Ready for publication
    │  Processing estimate: 6 hours

20. ✅ Physics-Informed Architecture: Equation-Sensor-Control Trichotomy.md
    → /technology/physics-informed-architecture
    │  PICAPD alignment | Hyperbolic/parabolic PDEs | Sensor modalities | MPC
    │  Status: Ready for publication | Contains Mermaid diagrams
    │  Processing estimate: 8 hours

21. ✅ Adaptive Signal Multiplexer with Dynamic Problem Formulation.md
    → /technology/adaptive-signal-multiplexer
    │  Real-time optimization | Structure detection | Solver selection
    │  Status: Ready for publication | Java code examples
    │  Processing estimate: 8 hours
```

#### Subcategory: Mathematical Foundations (Tier 1B - Priority P1)

```
22. ✅ Invariant Discovery & Validation.md
    → /science/invariant-discovery
    │  Mathematical invariants | Cross-GT validation | Framework calibration
    │  Status: Ready for publication | Contains validation tables
    │  Processing estimate: 6 hours

23. ✅ Optimization Algorithm: Leaving no stone unturned.md
    → /science/severity-weighted-optimization
    │  Severity-weighted multi-dimensional optimization | Critical dominance
    │  Status: Ready for publication
    │  Processing estimate: 6 hours

24. ✅ A mathematical framework with predictive temporal elements.md
    → /science/predictive-temporal-framework
    │  Physics-informed special functions | Conservation laws | AGM algorithm
    │  Status: Ready for publication
    │  Processing estimate: 8 hours
```

#### Subcategory: Architecture & Coordination (Tier 1C - Priority P2)

```
25. ✅ Adaptive Group Coordination Framework — Companion.md
    → /technology/multi-agent-coordination
    │  Multi-agent coordination | Group formation optimizer | Consensus engine
    │  Status: Ready for publication
    │  Processing estimate: 6 hours

26. ✅ ⚙️ Unified Framework Architecture.md
    → /technology/unified-framework
    │  Gear-based pluggable policy | Group theory | Severity-weighted optimization
    │  Status: Ready for publication
    │  Processing estimate: 8 hours

27. ✅ Layer-Level Interaction Architecture (Abstract).md
    → /technology/layer-level-interaction
    │  Multi-layer system integration | Functional capacity exchange
    │  Status: Ready for publication
    │  Processing estimate: 6 hours
```

#### Subcategory: Physics & Control Foundations (Tier 1D - Priority P2)

```
28-41. [14 files on control volumes, boundary conditions, physics formulations]
    → /science/physics-control-foundations/*
    │  Status: Batch processing | Group by topic
    │  Processing estimate: 20 hours total

42-45. [Additional specialized topics]
    → Various /science/* and /technology/* paths
    │  Processing estimate: 16 hours total
```

**[Full list of 45 Notion 2025 files available in:** `notion-2025-analysis-for-ghost-autonomy-website.md`]

### 🔷 Category 2: L4 Autonomous Vehicle Applications (26 files from Root)

#### Subcategory: L4 AV Technical Documentation (Tier 1E - Priority P1)

```
46. ⚠️ Advanced and Emerging Technologies for L4 Autonomous Vehicles.docx
    → /technology/l4-emerging-technologies
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours

47. ⚠️ Processor & Computing Architectures for L4 Autonomous Vehicles.docx
    → /technology/l4-computing-architectures
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours

48. ⚠️ Sensors & Sensing Technologies for Level 4 Autonomous Vehicles.docx
    → /technology/l4-sensor-fusion
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours

49. ⚠️ Functional Safety & Standards for L4 Autonomous Systems.docx
    → /safety/l4-functional-safety
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours

50. ⚠️ Automotive-Specific Systems & Applications for L4 Autonomy.docx
    → /technology/l4-automotive-systems
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours

51. ⚠️ Numerical Methods & Precision in L4 Autonomous Systems.docx
    → /science/l4-numerical-methods
    │  Status: Needs DOCX→Markdown conversion
    │  Processing estimate: 4 hours
```

#### Subcategory: Theoretical Foundations (Tier 1F - Priority P2)

```
52-63. [12 files on constraint theory, trust architecture, bilinear coupling, etc.]
    → /science/* and /technology/* paths
    │  Status: Ready (Markdown) | Batch processing
    │  Processing estimate: 36 hours total
```

#### Subcategory: Research & Project Management (Tier 1G - Priority P2)

```
64-71. [8 files on co-design, quantum sensing, research resources, etc.]
    → /research/* and /company/* paths
    │  Status: Mixed (Markdown + PDF)
    │  Processing estimate: 24 hours total
```

**[Full list of 26 Root files available in:** `new-folder-root-analysis-for-ghost-autonomy.md`]

---

## 📑 TIER 2: MEDIUM (211 files) - Supporting Content

**Target:** 40% published within 20 weeks
**URL Base:** `/resources/*`, `/background/*`

### 🔷 Category Breakdown (Summary View)

| Category | Count | Source | Topics | Priority |
|----------|-------|--------|--------|----------|
| **Chip Manufacturing** | 31 | Root | Manufacturing processes, transcripts, educational videos | P3 |
| **Quality Frameworks** | 50 | Notion | QA methodologies, automated evaluation, rubrics | P4 |
| **Multi-Agent Systems** | 40 | Notion | Coordination patterns, memory architectures, agent specs | P4 |
| **Infrastructure** | 30 | Notion | Event sourcing, distributed logs, Byzantine FT | P4 |
| **Mathematical Methods** | 20 | Notion | Validation frameworks, diagnostic workflows, assessment | P4 |
| **Persian Educational** | 8 | Root | Manufacturing/hardware content in Farsi | P4 |
| **Miscellaneous Technical** | 32 | Mixed | Data compression, tortuosity metrics, overlays | P4 |

**Processing Strategy:** Selective extraction based on website section needs. Not all 211 files will be published—prioritize based on:
1. Alignment with Ghost Autonomy value proposition
2. Transferable architectural patterns
3. Validation and testing methodologies useful for PICAPD
4. Background knowledge that supports CRITICAL/HIGH tier understanding

**[Detailed file list available in analysis documents]**

---

## 📁 TIER 3: Archive (1,475 files) - Low Priority / Exclude

**Action:** Archive for reference only, do not process for website

### 🔷 Exclusion Categories

| Category | Count | Reason |
|----------|-------|--------|
| **Book Chapters** (AI policy, climate, social issues) | 262 | Not relevant to Ghost Autonomy |
| **Source Code Documentation** (TWIN_MD, IDE plugins) | 208 | Internal development, not public-facing |
| **Personal Documents** (CVs, fellowship reports, applications) | 150 | Personal/academic records |
| **Workspace Meta-Files** (Notion navigation, directories) | 180 | Organizational scaffolding |
| **Duplicates** (main.tex variants, video copies) | 25 | Version control issues |
| **Non-Technical Persian** (invitations, contact lists) | 120 | Not technical content |
| **Business Strategy** (NASDAQ, IPO, general strategy) | 80 | Not technical content |
| **Project Management** (refinement schedules, deliverables) | 150 | Internal process documents |
| **Miscellaneous Low-Value** | 300 | Tangentially related, low technical depth |

**[File pattern exclusions available in analysis documents]**

---

## 🗺️ URL Mapping Matrix

### TIER 0: CRITICAL → Website Sections

| Source Category | File Count | Target URL Pattern | Website Section |
|-----------------|------------|-------------------|-----------------|
| PICAPD ISA (EN) | 8 | `/knowledge-base/picapd-isa/*` | Knowledge Base → Part III |
| PICAPD ISA (FA) | 5 | `/fa/knowledge-base/picapd-isa/*` | Knowledge Base → Part III (Persian) |
| Strategic Analysis | 5 | `/company/competitive-analysis` | Company → Competitive Positioning |

### TIER 1: HIGH → Website Sections

| Source Category | File Count | Target URL Pattern | Website Section |
|-----------------|------------|-------------------|-----------------|
| AV Decision-Making | 3 | `/science/av-*` | Science → Autonomous Reasoning |
| Physics Computing | 12 | `/technology/physics-*` | Technology → Physics-Informed |
| Mathematical Foundations | 8 | `/science/*` | Science → Mathematical Rigor |
| Multi-Agent Systems | 6 | `/technology/multi-agent-*` | Technology → Coordination |
| L4 AV Documentation | 6 | `/technology/l4-*`, `/safety/l4-*` | Technology + Safety |
| Control Theory | 14 | `/science/physics-control-*` | Science → Control Foundations |
| Research Resources | 8 | `/research/*` | Research → Publications & Resources |
| Persian Technical | 3 | `/fa/technology/*` | Technology (Persian) |
| Theoretical Foundations | 11 | `/science/*`, `/technology/*` | Science + Technology |

### TIER 2: MEDIUM → Website Sections (Selective)

| Source Category | File Count | Target URL Pattern | Website Section |
|-----------------|------------|-------------------|-----------------|
| Chip Manufacturing | 31 | `/resources/manufacturing/*` | Background → Silicon Fabrication |
| Quality Frameworks | 50 | `/resources/qa-frameworks/*` | Background → Validation Methods (selected) |
| Infrastructure | 30 | `/resources/infrastructure/*` | Background → Distributed Systems (selected) |

---

## 📈 Processing Pipeline Visual

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SOURCE FILES (1,775)                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
        ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
        │ TIER 0        │  │ TIER 1        │  │ TIER 2        │
        │ CRITICAL (18) │  │ HIGH (71)     │  │ MEDIUM (211)  │
        │ P0 Priority   │  │ P1-P2 Priority│  │ P3-P4 Priority│
        └───────┬───────┘  └───────┬───────┘  └───────┬───────┘
                │                  │                  │
                ▼                  ▼                  ▼
        ┌──────────────────────────────────────────────────┐
        │         CONVERSION & PROCESSING LAYER             │
        │ • Markdown → HTML (KaTeX math, Mermaid diagrams) │
        │ • PDF → Web (figure extraction, OCR if needed)   │
        │ • DOCX → Markdown (pandoc conversion)            │
        │ • LaTeX tables → Responsive web tables           │
        │ • Bilingual: EN/FA pair detection & RTL layout   │
        │ • Table heavy: 175+ tables → booktabs formatting │
        └──────────────────┬───────────────────────────────┘
                           │
                ┌──────────┼──────────┐
                ▼          ▼          ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Knowledge│ │Technology│ │ Science  │
        │   Base   │ │  Section │ │ Section  │
        │ (8 Parts)│ │ (6 Pages)│ │ (4 Pages)│
        └──────────┘ └──────────┘ └──────────┘
                │          │          │
                └──────────┼──────────┘
                           ▼
        ┌─────────────────────────────────────┐
        │    GHOST AUTONOMY WEBSITE (Live)    │
        │  • Bilingual EN/FA navigation       │
        │  • Full-text search (stemming, RTL) │
        │  • Carousel lanes (Netflix-style)   │
        │  • TOC-based navigation (5 levels)  │
        │  • Cite/export utilities (BibTeX)   │
        └─────────────────────────────────────┘
```

### Status Legend

- ✅ **Ready**: Markdown, minimal processing needed
- 🔄 **In Progress**: Conversion underway, partial completion
- ⏳ **Queued**: Scheduled for processing, not started
- ⚠️ **Needs Review**: Format unclear, requires investigation
- ❌ **Blocked**: Dependency missing, technical issue

---

## 🔧 Implementation Status (Week 1)

### Completed
- ✅ Tier 0 file identification (18 CRITICAL files)
- ✅ Tier 1 file identification (71 HIGH files)
- ✅ Bilingual pair detection (21 EN/FA pairs)
- ✅ URL mapping strategy (CRITICAL + HIGH tiers)

### In Progress
- 🔄 Table extraction pipeline setup (PICAPD ISA)
- 🔄 DOCX→Markdown conversion (6 L4 AV files)
- 🔄 RTL layout testing (5 Persian CRITICAL files)

### Queued (Week 2)
- ⏳ LaTeX booktabs formatting for 175+ ISA tables
- ⏳ Mermaid diagram rendering (Physics-Informed Architecture)
- ⏳ PDF→web conversion (Hardware ISA.pdf, 54 pages)
- ⏳ Bilingual navigation component (React + CSS)

---

## 📚 Related Documents

1. **Detailed Analysis:**
   - `notion-2025-analysis-for-ghost-autonomy-website.md` (488 lines)
   - `new-folder-root-analysis-for-ghost-autonomy.md` (965 lines)

2. **Implementation Plan:**
   - `Library of Documents & Assets for Ghost Website.md` (249 lines)
   - Section 2.2: Claude Artifact Library (50+ links)
   - Section 3: Bilingual & RTL System Design

3. **Data Models:**
   - `src/data/knowledgeBase.js` (existing 8-part structure)
   - `library-hierarchy-data.json` (to be generated)
   - `src/data/libraryHierarchy.js` (to be created Week 2)

4. **Website Context:**
   - `README.md` (current website architecture)
   - `src/data/copy.js` (bilingual content strings)
   - `vercel.json` (deployment configuration)

---

## 🎯 Quick Reference: Top 25 Files for Week 1-2

**Priority P0 (Must Process Immediately):**

1. PICAPD INSTRUCTION SET ARCHITECTURE.md (CRITICAL)
2. Hardware ISA.pdf (CRITICAL)
3. PICAPD_Silicon.md (CRITICAL)
4. Ghost_Autonomy_Unified_Technical_Analysis_V4.md (CRITICAL)
5. مجموعه دستورالعمل PICAPD.md (CRITICAL, Farsi)

**Priority P1 (Week 2):**

6. Autonomous Vehicles — Research Note.md (HIGH)
7. Physics-Informed Architecture.md (HIGH)
8. Adaptive Signal Multiplexer.md (HIGH)
9. Invariant Discovery & Validation.md (HIGH)
10. Optimization Algorithm: Leaving no stone unturned.md (HIGH)

**Priority P1 (L4 AV, Week 2):**

11-16. [6 L4 AV .docx files] (HIGH, needs conversion)

**Priority P2 (Week 3-4):**

17-25. [Architecture, coordination, control theory files] (HIGH)

**Processing Order Logic:**
- Week 1: CRITICAL tier (18 files) → 80% Knowledge Base content
- Week 2: HIGH tier Tiers 1A-1B (15 files) → Core technical value proposition
- Week 3-4: HIGH tier Tiers 1C-1E (26 files) → Application context
- Week 5-8: HIGH tier Tiers 1F-1G (30 files) → Supporting research
- Week 9-20: MEDIUM tier (selective, ~80 files) → Background knowledge

---

**End of Compact Hierarchy Document**
**For UI implementation, see:** `src/components/LibraryHierarchyTree.js` (Week 2 deliverable)
