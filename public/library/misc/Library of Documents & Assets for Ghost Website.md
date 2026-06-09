Below is an updated **product design + implementation-plan delta** that treats (a) your **full TOC granularity** and (b) **50+ Claude artifact links with table-heavy Markdown → publication-grade LaTeX** as **first-class workstreams from day 1**—not bolt-ons.

* * *

## 🗺️ Quick Navigation: Compact Hierarchy Reference

**For a compact, hierarchical view of all 1,775 analyzed files organized by processing priority (CRITICAL → HIGH → MEDIUM → Archive), see:**

📄 **[library-hierarchy-compact-view.md](../library-hierarchy-compact-view.md)**

This companion document provides:
- Executive dashboard with tier statistics
- Collapsible tree structure showing 18 CRITICAL files (Ghost Autonomy core IP)
- 71 HIGH-priority files mapped to website sections
- URL mapping matrix for all tiers
- Processing pipeline visual
- Bilingual content pairing (21 EN/FA pairs)

The compact view complements this detailed implementation plan by providing quick-reference navigation and status tracking.

* * *

1) Updated UI design: "display-ey" like Google Arts, but operational like your samples

--------------------------------------------------------------------------------------

### A. Information architecture (3 top-level “libraries”)

1. **Books / Monographs** (the 2800–3000 page bilingual LaTeX source; Overleaf-backed)

2. **Artifacts** (50+ Claude public artifacts; table-heavy; web view + LaTeX export)

3. **Articles / Notes** (shorter pieces “in the folder”, blog-like but in the same search/index)

Each library shares **one search surface** and **one reader surface**, so the UI feels consistent while content types differ.

* * *

### B. Global browse/search surface (borrow the “functional spine” from CourtListener + the “cards” from HathiTrust)

**Layout**

* **Sticky top bar**: global search + scope toggle (All / Books / Artifacts / Articles)

* **Left “Refine” rail** (CourtListener pattern): facets + filters stay visible while results scroll

* **Main results pane** (more stylish): a **hybrid grid/list**
  
  * Grid cards when browsing (visual perusal)
  
  * Dense list when searching (precision)

**Styling (the “weighted average”)**

* Keep the **strong, confident header band** from the HathiTrust sample (clear hierarchy, prominent search).

* Replace heavy institutional boxiness with:
  
  * larger typography,
  
  * generous whitespace,
  
  * softer borders,
  
  * subtle section color accents (not full “museum-art” vibes).

**Result cards (Google Arts-inspired, but toned down)**  
Each card shows:

* Title (EN + FA line, when available)

* “What you might like to read” hook: _one sentence_ summary + 3 topical chips

* A **visual anchor**:
  
  * Book section: diagram thumbnail / first figure preview / formula snippet
  
  * Artifact: mini table preview (first 3 rows) with “view full table” affordance
  
  * Article: cover image (optional) or pull-quote

* * *

### C. “Carousel for Perusal” at large scale (the signature interaction)

Instead of one giant carousel, use **multiple “lanes”** (Netflix/Arts & Culture hybrid), each lane is a _curated slice_ of the corpus:

1. **Continue reading**

2. **Because you read X** (semantic similarity)

3. **High-signal tables** (Artifacts with strong structure / frequently referenced)

4. **Recently added / updated**

5. **By Part / Theme** (Part I, II, III… from the book TOC)

Key: each lane is backed by the same index, so it scales without bespoke curation.

* * *

### D. Dedicated item page (your “reading material centered + good links” requirement)

**Three-column reader layout**

* **Left**: TOC navigator (collapsible; remembers scroll position)

* **Center**: reading surface (primary)

* **Right**: “Related” + “Jump links” + “Cite / Export” utilities

**Reader behaviors you explicitly want**

* Clicking any item always opens a **dedicated page** (not modal-only).

* Center column is the “book page”: typography and line-length optimized.

* Strong, contextual cross-links:
  
  * “Next / Previous section”
  
  * “Referenced by”
  
  * “Related artifacts” (tables used in this section)
  
  * “Return to TOC” behavior (mirrors your `hypertarget` / anchor-return mental model)

* * *

2) Implementation plan updates (TOC-first + Artifact→LaTeX-first)

-----------------------------------------------------------------

### A. Make TOC granularity a first-class data model (not just UI)

Your Ghost Autonomy sample already demonstrates the structure you want the platform to respect: multi-part bilingual TOC with deep subsection numbering (e.g., Part I–VIII, plus appendices).

**Plan section to add (with dedicated subsections)**

1. **TOC Ingestion & Canonical Navigation Graph**
   
   * 1.1 Source parsers (LaTeX `\tableofcontents`, PDF TOC text fallback, manual overrides)
   
   * 1.2 Node schema: `{id, parent_id, numbering, title_en, title_fa, anchors[], depth, order}`
   
   * 1.3 Stable permalink strategy (`/book/{slug}/p/{part}/s/{section}`) independent of pagination
   
   * 1.4 Anchor/return system parity with LaTeX (TOC↔section↔back links)

**Why this matters:** it guarantees “all granular subsections” exist as **addressable nodes** from the start, regardless of whether the renderer is web-first or PDF-first.

* * *

### B. Treat “Artifacts (Claude links)” as an ingestion pipeline + publishing pipeline

Add a new top-level workstream: **Artifacts Library: acquisition → normalization → render → export**.

#### New implementation-plan TOC block (drop in verbatim)

2. **Claude Artifact Library (50+ links)**
   
   * 2.1 Artifact registry (URL list, tags, provenance, versioning)
   
   * 2.2 Fetcher & snapshotting (HTML/Markdown capture; retry; diffing)
   
   * 2.3 Markdown normalization (tables, footnotes, code blocks, math)
   
   * 2.4 Table extraction & diagnostics
     
     * 2.4.1 “Problem table” detector (colspan-like patterns, ragged rows, wrapped pipes)
     
     * 2.4.2 Cell sanitizer (escaping, line breaks, RTL/LTR embedding)
   
   * 2.5 Web rendering (high-performance table viewer: sticky headers, column pinning, horizontal scroll)
   
   * Claude artifact link example to be included as test: [Implementation Readiness Matrix: AI Governance Deployment Guide | Claude](https://claude.ai/public/artifacts/9ebadeed-28af-4a83-8630-117421863003)) 
   
   * 2.6 **Professional LaTeX export**
     
     * 2.6.1 Table style guide (booktabs rules, spacing, caption/label conventions)
     
     * 2.6.2 Long-table strategy (longtable/ltablex; page breaks; repeated headers)
     
     * 2.6.3 Width strategy (tabularx, p{…}, \raggedright, automatic column sizing)
     
     * 2.6.4 RTL/bidi strategy for mixed Persian/English inside tables
   
   * 2.7 QA gates (compile check, visual diff, manual spot-check queue)
   
   * 2.8 Publishing hooks (attach artifact → referenced sections in the book)

This is explicitly aligned with your requirement that tables need “professional LaTeX formatting” and should be planned as core scope, not misunderstood or deferred.

* * *

### C. Integrate bilingual + RTL constraints as platform-level concerns

Your Ghost Autonomy TOC shows bilingual labeling at the navigation level.  
So the plan should include:

3. **Bilingual & RTL System Design**
* 3.1 Typography + font fallback strategy (web) mirroring `xepersian` choices (book)

* 3.2 Directionality rules: paragraph-level + inline bidi isolation

* 3.3 Numerals policy (Persian digits vs Latin digits; per-section overrides)

* 3.4 Search normalization: Persian/English stemming + synonym mapping + transliteration support

* * *

### D. Overleaf / LaTeX source integration (modularization + navigation parity)

Since your book pipeline depends on modular chapters and custom TOC-return anchors, the plan should make this a **platform integration**, not “a freelancer task in a void”:

4. **LaTeX Source System Integration**
* 4.1 Subfiles modularization strategy (chapter standalone + shared preamble)

* 4.2 TikZ build/diagnostics lane (compile isolates; error triage)

* 4.3 Hyperlink/anchor contract: map LaTeX anchors ↔ website permalinks

* 4.4 Build validation: continuous compile + artifact-table includes smoke tests

* * *

### E. Ensure the plan explicitly covers deep sections like Validation + Appendices

Your sample TOC includes late-stage sections that often get neglected (Validation, Integration, Appendices). Those must appear as **first-class navigation and ingestion targets**:

* Validation & results are their own part.

* Appendices are a distinct part with multiple appendix subsections (A–F).

So add:

5. **Deep TOC Coverage Guarantees**
* 5.1 “No orphan nodes” enforcement (every TOC node has a page target)

* 5.2 Appendix rendering mode (code/derivations/data need different layout + download affordances)

* 5.3 Validation section affordances (test matrices, evidence packs, traceability links)

* * *

3) Practical "day-1" acceptance criteria (so this doesn't drift)

----------------------------------------------------------------

If you want one simple rule that prevents "afterthought" failure:

**A feature is not considered implemented unless:**

1. It is reachable via **TOC node** (left nav)

2. It is searchable (global search)

3. It has a dedicated page (canonical URL)

4. It participates in "Carousel for Perusal" lanes (even if low-ranked)

This forces Artifacts + Appendices + deep subsections to ship as real citizens.

* * *

4) Hierarchy Integration: Mapping File Tiers to Library Structure

----------------------------------------------------------------

### A. How CRITICAL/HIGH/MEDIUM Tiers Map to 3 Libraries

The analyzed 1,775 files (see `library-hierarchy-compact-view.md`) distribute across the three library types as follows:

**1. Books / Monographs Library**
- **Source:** TIER 0 CRITICAL (18 files) - PICAPD ISA family
- **Content Type:** 2,800-3,000 page bilingual LaTeX source
- **Treatment:** Monograph-style deep navigation with:
  - 5-level TOC (Document → Part → Chapter → Section → Subsection)
  - Table of 175+ instructions with professional booktabs formatting
  - Bilingual pairs: 8 English + 5 Persian specifications
  - Stable permalinks: `/knowledge-base/picapd-isa/{section-slug}`
- **Processing Priority:** P0 (Weeks 1-2)
- **Acceptance Criteria:**
  - All 13 PICAPD ISA files navigable via TOC
  - All 175+ instruction tables extracted and rendered
  - Bidirectional EN ↔ FA navigation functional

**2. Artifacts Library**
- **Source:** TIER 1 HIGH (45 files from Notion 2025)
- **Content Type:** Claude artifacts + table-heavy Markdown from research notes
- **Treatment:** Web view + LaTeX export pipeline:
  - Autonomous Vehicles — Research Note (dynamic problem formulation)
  - Physics-Informed Architecture (Mermaid diagrams + PDEs)
  - Adaptive Signal Multiplexer (Java code examples)
  - Optimization algorithms (severity-weighted, invariant discovery)
  - Mathematical frameworks (predictive temporal, control volumes)
- **Processing Priority:** P1-P2 (Weeks 3-8)
- **Acceptance Criteria:**
  - All 45 files searchable globally
  - Mermaid diagrams rendered as SVG
  - Code examples syntax-highlighted
  - Cross-links to Books library where applicable

**3. Articles / Notes Library**
- **Source:** TIER 1 HIGH (26 files from Root) + TIER 2 MEDIUM (selected, ~80 files)
- **Content Type:** Shorter technical pieces, blog-style but indexed
- **Treatment:** Article cards with:
  - L4 Autonomous Vehicle technical documentation (6 DOCX files converted)
  - Constraint theory, trust architecture, bilinear coupling
  - Chip manufacturing educational content (transcripts, videos)
  - Quality frameworks and methodologies (selective)
- **Processing Priority:** P1-P4 (Weeks 3-20)
- **Acceptance Criteria:**
  - All 6 L4 AV DOCX files converted to web format
  - Articles tagged and filterable by topic
  - Pull-quote excerpts visible in browse mode

### B. Priority Timeline by Library

| Library | Tier | File Count | Weeks | Milestone |
|---------|------|-----------|-------|-----------|
| **Books** | TIER 0 (CRITICAL) | 18 | 1-2 | PICAPD ISA complete, Knowledge Base Part III live |
| **Artifacts** | TIER 1 (HIGH) | 45 | 3-8 | Core AV research published, Technology section complete |
| **Articles** | TIER 1 (HIGH) | 26 | 3-8 | L4 AV docs published, supporting theory live |
| **Articles** | TIER 2 (MEDIUM) | 80 | 9-20 | Background knowledge, selected frameworks |

### C. Carousel Lane Mapping

The "Carousel for Perusal" lanes (Section 1.C) populate from the hierarchical tiers:

1. **Continue reading** → Tracks user progress across all 3 libraries
2. **Because you read X** → Semantic similarity within tier (HIGH files cluster well)
3. **High-signal tables** → PICAPD ISA tables (CRITICAL) + artifact tables (HIGH)
4. **Recently added / updated** → Tracks processing pipeline status
5. **By Part / Theme** → Maps to:
   - Books: Part I-VIII from existing `knowledgeBase.js`
   - Artifacts: Topic clusters (AV, Physics, Optimization)
   - Articles: Categories (L4 AV, Chip Manufacturing, QA Frameworks)

### D. Updated Day-1 Acceptance Criteria (Tier-Aware)

**Extend Section 3 acceptance criteria to include tier milestones:**

5. **TIER 0 (CRITICAL) must be 100% navigable within 2 weeks**
   - All 18 files have dedicated pages
   - All 18 files appear in global search results
   - All bilingual pairs (EN ↔ FA) cross-linked
   - All tables extracted and rendered responsively

6. **TIER 1 (HIGH) must be 80% searchable within 8 weeks**
   - At least 57 of 71 files published (80% threshold)
   - All Mermaid diagrams and code examples functional
   - DOCX → Markdown conversion complete for L4 AV docs
   - Cross-references between Artifacts ↔ Books operational

7. **TIER 2 (MEDIUM) selective processing targets 40% within 20 weeks**
   - At least 84 of 211 files published (40% threshold)
   - Focus on transferable architectural patterns
   - Quality frameworks supporting PICAPD validation

### E. Status Tracking Integration

The hierarchy compact view (`library-hierarchy-compact-view.md`) uses status indicators that map to implementation stages:

| Status | Meaning | Implementation Stage |
|--------|---------|---------------------|
| ✅ Ready | Markdown, minimal processing | Weeks 1-2: Direct publish |
| 🔄 In Progress | Conversion underway | Weeks 2-4: DOCX/PDF pipeline |
| ⏳ Queued | Scheduled, not started | Weeks 5-8: Batch processing |
| ⚠️ Needs Review | Format unclear | Weeks 9-12: Manual triage |
| ❌ Blocked | Dependency missing | Ad-hoc: Unblock before proceeding |

These statuses appear in:
- Compact hierarchy tree view (see `library-hierarchy-compact-view.md` Section 2-4)
- LibraryHierarchyTree React component (Week 2 deliverable)
- Processing pipeline dashboard (Week 3 deliverable)

* * *




