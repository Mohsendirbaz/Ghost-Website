# Ghost Autonomy Website Update Plan

**Prepared:** July 9, 2026
**Inputs examined:** `Ghost Website/` (full React source, content data files, nav structure, June 10 state) and `Golden Set/` (29 ranked documents per `RANKING.md` of July 3, plus root strategy files)

---

## 1. Executive Summary

The website's content layer was last touched on **June 10, 2026**. The Golden Set shows that the four weeks since then were among the most productive in the program's history: the consolidated **Ten Articles corpus** (May 24, 89 pp), the **EPU–Ghost Autonomy English Edition v3.0** (June 29, 94 pp), the **revised scientific manuscript** (June 29), the **Canvas/EPU integrated monograph** (99 pp), the **comprehensive co-design treaty** (June 29, re-rendered July 9), and two working interactive research artifacts (`Research_vcs_v7.html`, `multi_agent_research_laboratory.html`) all post-date, or are absent from, the live site.

The divergence is threefold, and each type calls for a different remedy:

1. **Missing documents.** The site's Technical Library and Document Archive do not contain any of the top-ranked Golden Set items. This is the cheapest gap to close and the fastest visible signal of activity.
2. **An obsolete page.** The Multi-Agent System tab still describes the *TWIN IntelliJ IDE plugin* (101 components) — a framing the program has plainly moved past. The current direction is the *event-sourced multi-agent research laboratory* (upgrade plan, F26 charter, lab manual, working HTML). This page is the single most outdated surface on the site, and it is also currently **orphaned from the mega-menu navigation**.
3. **A shift in claim discipline.** The June 29 manuscript and the ten-article integration notes adopt a deliberately scoped epistemic register: provable results stated as provable, empirical results bounded by their operating envelope (R² ≈ 0.78–0.87), unmeasured hardware numbers explicitly filtered out, and a "projected vs. measured" seam preserved everywhere (the ~32 ns analog veto is flagged as the corpus's *only measured latency*). Several site surfaces predate this discipline — most visibly the Knowledge Base's "Validation & Results" chapter labels ("Silicon Results," "Field Validation," "Customer Feedback") and the founder essay's "100,000× to one million× faster" claim. Aligning the site with the corpus's own claim ladder is both a correctness fix and a differentiator consistent with the program's thesis that *engineering honesty is the product*.

Recommended order of attack: **Technical Library → Knowledge Base → Multi-Agent System → Artifact Gallery → Safety → Science → Technology/Architecture → Home & housekeeping.** Rationale and specifics follow.

---

## 2. Current State

### 2.1 Site inventory

React 19 SPA on Vercel, fully bilingual (EN/FA, RTL-aware), content statically bundled from `src/data/*`. Navigation exposes fifteen destinations in three groups:

| Group | Tabs |
|---|---|
| Company | Home, Technology, Science, Safety, Partners, Company, Bio, Invest, Contact |
| Research | Perspective, Architecture, Knowledge Base ("8 parts · 47 chapters") |
| Resources | Artifact Gallery (10 artifacts), Technical Library (~32 curated assets), Document Archive ("1,751 documents") |

One routed page — **Multi-Agent System** (`/{lang}/multi-agent-system`) — appears in no navigation group.

### 2.2 What the Golden Set adds

Ranked by the manifest's own scoring (content depth + uniqueness), the items that matter for the site, with their natural destination:

| Rank | Document | Date | Natural site destination |
|---:|---|---|---|
| 01 | Ten_Articles_corrected.pdf (89 pp) | May 24 | Library (canonical); feeds Safety + Science |
| 02 | EPU-Ghost-Autonomy_English.pdf v3.0 (94 pp) | Jun 29 | Knowledge Base master source; Library |
| 03 | main_revised.pdf (manuscript) | Jun 29 | Science page; Library |
| 04 | Canvas_Integrated_to_EPU.pdf (99 pp) | Apr 2026 | Library; feeds Technology + MAS |
| 05 | Quantum-Information research statement (90 pp) | Jun 5 | Library; Science "research frontier" section |
| 06 | 175-step-bundle-unified.pdf v2.1 (105 pp) | May 4 | Library; feeds MAS |
| 07 | autonomous_driving_considerations EN (45k words) | Jun 29 | Library / Knowledge Base annex |
| 08 | Algorithm-Total.pdf (methodology + datasets) | Jun 1 | Library |
| 09 | comprehensive_codesign_treaty.md | Jun 29 | Architecture page; Library |
| 10 | Metabolic_Memory_Architecture.md | Jun 1 | Safety page; Library |
| 11 | Conservation-Renormalization v1.0 | Jun 6 | Safety/Science; Library |
| 12 | README.md (9,400-word integration guide + program coverage map) | Jun 29 | Knowledge Base "Program Status" + MAS |
| 13 | Research_vcs_v7.html (four-view canvas, runtime-verified) | Jun 28 | Artifact Gallery |
| 14 | multi_agent_research_laboratory.html | Jun 29 | Artifact Gallery + MAS page |
| 16 | Lab upgrade plan; 21: F26 PLAN.md; 22: lab manual | Jun 29 | MAS page |
| 18 | ARC_sensory_architecture_EN.md | Jun 29 | Technology/Safety sensing section |
| 20 | Mercedes_Benz_AV_Perception_Stack **v2**.html | Jun 30 | Artifact Gallery (site likely hosts v1) |
| 23 | Agent-Based Models thread-sync HTML | Jun 29 | Artifact Gallery (supersedes "Race Condition Mitigation" entry) |
| — | codesign_strategy.md (root) | May 27 | Architecture page |

The manifest also identifies safe-to-ignore redundancies (byte-identical ARC duplicate, .docx render of the treaty, absorbed PDFs) — none should be published separately.

---

## 3. Prioritization Framework

Each tab was scored on three axes: **staleness** (does the live content contradict or omit the current corpus?), **visibility** (how central is the tab to a technical or investor visitor's evaluation path?), and **readiness** (is the source material publication-ready, or does it require synthesis and translation?). The tiers below order work so that the highest staleness × visibility items with ready sources land first.

---

## 4. Tier 1 — Do First

### 4.1 Technical Library + Document Archive *(highest readiness, lowest risk)*

**Problem.** None of the top-ranked corpus documents are downloadable or browsable on the site. For a deep-tech program whose credibility rests on its written corpus, the library is the proof-of-work surface.

**Update.** Publish the canonical set to `public/library/` (or `public/docs/`) and register each in `src/data/libraryAssets.js` with bilingual metadata, category, date, and version fields: ranks 01–11 plus `codesign_strategy.md` (twelve documents; use the `.md` treaty as source-of-truth, not its `.docx` render). Rerun `npm run organize-library` to regenerate the manifest.

**Specific content decisions.**
- Present rank 02 as the umbrella document: "Complete Technical & Architecture Documentation, v3.0 (June 2026)" — its own title page carries *Patent Pending & Trade Secret*; keep that framing and gate nothing that the document itself does not gate.
- Group entries by the corpus's own architecture: *Foundational corpus* (01, 07), *Technical documentation* (02, 04, 06), *Scientific manuscripts* (03, 05, 08), *Subsystem specifications* (09, 10, 11, codesign strategy).
- Update the nav chip "1,751 archived documents" only after the manifest regenerates — whatever the true count becomes.

**Effort.** ~1–2 days. No page redesign; data-file and asset work only.

### 4.2 Knowledge Base *(flagship research tab)*

**Problem.** The KB tree (8 parts · 47 chapters · 158 sections) mirrors an earlier edition of the EPU documentation. Version 3.0 (June 29) is now the authoritative source, and the KB's "Validation & Results" part carries chapter titles — "Silicon Results," "Field Validation," "OEM Integration Pilot," "Customer Feedback and Lessons Learned" — that read as accomplished fact, which the corpus itself now explicitly disavows (the README's coverage view states: *coverage = source-material availability, not fabricated or measured silicon*).

**Update.**
1. Reconcile `src/data/knowledgeBase.js` section-by-section against the v3.0 English edition; carry over the v3.0 part/chapter structure where it differs.
2. Re-scope the Validation part: rename chapters to the corpus's own register ("Emulation Results," "Simulation Results," "Conformance Test Design," "Deployment Readiness *Assessment*") and mark projected figures as projected. This is a targeted edit, not a rewrite.
3. **Add a new "Program Status & Coverage" chapter** built from the README's coverage map: 56 research subcategories across 6 domains, colored FULL (15) / HIGH (20) / PARTIAL (10) / GAP (11), with the prioritized gap analysis (~55–80 person-days). This is the single most persuasive honest-status artifact the program has produced; it converts the claim-discipline shift into a visible feature.
4. Update the nav chip ("8 parts · 47 chapters") to the new counts.

**Effort.** ~3–5 days (the KB data file is 67 KB and bilingual; budget FA translation for changed sections — see §7).

### 4.3 Multi-Agent System *(most obsolete page)*

**Problem.** The page documents the TWIN IntelliJ plugin — 101 Java components, IDE tool windows, plugin settings. The program's multi-agent line of work is now the **event-sourced research laboratory**: lanes as agents/functions, columns as causal phases, single-tenant cells, typed edges as contracts, append-only event stream as source of truth, governed checkpoints, F1–F26 refinement program over the 175-step communication bundle.

**Update.** Rebuild `src/data/multiAgentSystem.js` around the new object model, sourced from the upgrade plan (rank 16), the F26 charter (rank 21), and the lab manual (rank 22). Suggested page arc: *why a laboratory rather than a graph* → *the event-stream mental model* → *the 175-step mechanical bundle and F1–F26* → *governance (quorums, checkpoints, replay)* → *try it* (link to the lab artifact) → *roadmap (F26 deliverables)*. Embed or link `multi_agent_research_laboratory.html` as the live demonstration.

**Also:** add the page to the Research group of the mega-menu — it is currently unreachable by navigation, which alone qualifies as a bug fix.

**Effort.** ~2–3 days including nav change; the three source documents are well-structured and largely quotable.

---

## 5. Tier 2 — Next

### 5.1 Artifact Gallery

**Update.** Four registry changes in `src/data/artifacts.js` (all supported by the existing `localFile` mechanism; no new infrastructure):
- **Add** `Research_vcs_v7.html` — the four-view bounded-autonomy canvas. Its README documents runtime verification (Playwright, zero console errors); say so in the description — it is the kind of concrete, checkable claim the corpus now favors.
- **Add** `multi_agent_research_laboratory.html` (cross-linked from the rebuilt MAS page).
- **Upgrade** the Mercedes-Benz Perception Stack entry to **v2** (June 30).
- **Version or replace** the "Race Condition Mitigation Framework" entry with the *Agent-Based Models to Coordinate Thread Synchronization* HTML if inspection confirms it supersedes it.

**Effort.** ~1 day.

### 5.2 Safety

**Problem.** The current copy is philosophically consistent with the corpus but generic — "multi-layered approach," four abstract layers. The Ten Articles corpus and its satellite specifications give Safety a concrete, nameable architecture that no competitor page can imitate.

**Update.** Augment (not replace) with the corpus's named safety machinery, each item traceable to a published document in the new Library:
- The **architecture of refusal** and the S0→S4 convex command box that can only ever *narrow* (Ten Articles; README).
- The **electrically isolated ~32 ns analog veto** — present it exactly as the corpus does: the only *measured* latency in the program. One sentence of measured fact outweighs a paragraph of projection.
- **Risk-monotone actuation algebra** and the **trusted scalar** concept (fidelity gate): as warrant falls, authority contracts.
- **Metabolic memory's verification inversion**: verification burden *strengthens* with residence time — slower memory is not safer memory (rank 10).
- **Right of Contestability / Constitution of Truth** governance: correction supremacy, anti-silent-drift, temporal rollback (rank 11; README Part VI).
- Keep the existing ASIL-D language — it is already correctly hedged ("pursuing alignment… we do not claim certification we have not yet completed") and now harmonizes with the corpus's discipline.

**Effort.** ~1.5–2 days of drafting against ready sources.

### 5.3 Science

**Problem.** The page speaks in generalities ("harmonic analysis… conservation laws") while the program now has a revised manuscript with provable results and a disciplined claims ladder.

**Update.** Rebuild the middle of the page around the June 29 manuscript:
- The **five-stage deterministic pipeline** (CCA multi-block integration → Hellinger sphere embedding → nonlinear sequence lift → similarity-invariant trace features → elliptic-integral/AGM pole–zero–gain embedding yielding the ξ statistic and parity bit S).
- **What is proven**: quadratic AGM convergence to machine precision in bounded iterations; single-valuedness; stated equivariances; exact mass/energy balance identities as verification.
- **What is measured**: R² ≈ 0.78–0.87 on the gasification case study, *within the demonstrated envelope* (600–900 °C, ER 0.2–0.5, S/B 0–1.5), reported as preliminary.
- **What is not claimed** — reproduce the manuscript's non-claims paragraph nearly verbatim. On a corporate site this paragraph is disarming and, for the academic/OEM audience, credibility-defining.
- Add a clearly labeled **research frontier** subsection for the quantum-information/cosmological-parameter investigation (rank 05), framed exactly as that document frames itself: an empirical investigation with falsifiable predictions, not an established result.

**Effort.** ~1.5–2 days.

---

## 6. Tier 3 — Then

**Technology.** Sound as marketing; augment with the co-design treaty's framing (the vehicle as a *latency-bounded, event-driven sensory organism*; joint allocation of temporal, informational, register, persistence, power, latency, and proof capacity) and the ARC fibrous-receptor thesis as the sensing subsection. Link the v3.0 documentation as the gated deep-dive. (~1–2 days.)

**Architecture.** The page is a 1 KB stub. Give it the co-design content: the five design islands (event registers, PICAPD ISA/EPU, variational layer, MoM-PBE governance, BFT transmission), the coupled-design-space argument from `codesign_strategy.md`, and the treaty's article structure. This is also where the existing `upgrading website/` diagrams (reconstruction plan, ISA spec) finally have a home. (~2 days.)

**Home.** Refresh the Fact Engine (`facts.js`) and any stats band with corpus-derived, checkable facts (89-page corpus; 94-page v3.0 documentation; 56 subcategories mapped; 15 fully sourced). Add a small "Recently published" strip pointing at the new Library entries. Fix the footer: **© 2025 → © 2026** (both languages). (~0.5–1 day.)

**Perspective / Bio.** Content is strong and remains valid. One targeted edit for claim alignment: the founder essay's "100,000 to one million times faster" sentence should be reworded toward the corpus's current posture (the integration notes explicitly filter "any statement that would make unmeasured hardware performance load-bearing"). The Λ-range observation can stay — rank 05 treats it as a documented empirical observation under investigation — but phrase it as the research statement does. Optionally, a fourth Perspective essay could later be distilled from the admissibility-first doctrine or the Constitution of Truth. (~0.5 day now; essay optional later.)

**Company / Partners / Invest / Contact.** No new source material in the Golden Set touches these. Leave unchanged apart from cross-links and the date fix.

---

## 7. Cross-Cutting Workstreams

**Claim-discipline audit.** After Tier 1–2 land, sweep every surface (copy.js, facts.js, KB, founder-bio.js) against a simple rule taken from the corpus itself: *measured, proven, projected, and conjectured statements must be distinguishable on sight.* The RANKING.md, integration notes, and main_revised abstract together constitute the style guide.

**Bilingual parity.** Every content change doubles into Persian. The Golden Set is English-first (the 45k-word corpus is itself a translation *from* Persian, so some FA source exists). Recommended policy: ship EN first per page, queue FA in batches, and rely on the existing `LanguageContext` fallback rather than delaying English publication. Budget roughly +40–50% of each page's drafting time for FA.

**Counts, dates, manifests.** Nav chips (KB chapter count, archive document count), footer year, `libraryManifest.js`, sitemap/JSON-LD entries for new documents, and the repo README's content inventory.

**De-duplication guardrail.** Do not publish the manifest's flagged redundancies (EN_2 duplicate, .docx render, absorbed PDFs); where a document supersedes a published one (Mercedes v2), version rather than duplicate.

---

## 8. Suggested Sequence and Budget

| Phase | Scope | Estimate |
|---|---|---|
| 1 | Library publication + housekeeping (footer, counts) | 1–2 days |
| 2 | Knowledge Base v3.0 sync + Program Coverage chapter | 3–5 days |
| 3 | Multi-Agent System rebuild + nav fix + Artifact Gallery | 3–4 days |
| 4 | Safety and Science augmentation | 3–4 days |
| 5 | Technology, Architecture, Home, claim audit | 3–4 days |
| 6 | Persian parity batch | 4–6 days |

Total: roughly **17–25 working days** of focused effort, front-loaded so that after Phase 1 (two days at most) the site already demonstrates current activity, and after Phase 3 no page actively contradicts the program's present direction.

---

## 9. Verification Checklist (per phase)

Build passes (`npm run build` with the Vercel command); every new route and document link resolves in both languages; RTL rendering checked for any new FA content; library manifest regenerated and counts consistent with nav chips; each new factual claim on a marketing page traceable to a specific Golden Set document and page; no flagged-redundant file published; Lighthouse/a11y spot-check on the two rebuilt pages (KB, MAS).
