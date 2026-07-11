# Ghost Autonomy — Visual Overhaul Plan v2

**Prepared:** July 9, 2026 (v2, supersedes this morning's v1) · Consulting engagement: text-to-visual transformation
**What changed in v2:** the signal-multiplexer visualization is promoted from "candidate embed, pending decision" to **the Main Exhibition** — the centerpiece the entire visual strategy is arranged around. The newly connected `AutoAgents-2-dashboard` repo resolves the open questions from v1: it carries the *current* five-view build of the app (the copy inside the website repo is the older single-view version), and it isolates the one sensitive view cleanly enough to strip at build time.

---

## 1. Diagnosis (unchanged from v1, abridged)

The site argues in paragraphs while its subject matter is intensely geometric. The stack is already visual-capable (framer-motion, Mermaid, sticky-scroll sections — mostly idle), the corpus supplies real data for every visual, and the blueprint SVGs already define the house aesthetic. The consulting thesis stands: **don't decorate the text — replace the text's job**, and make every spectacle *true*. What v2 adds is a center of gravity: instead of five equal set-pieces, the site now has one flagship room and four supporting galleries.

---

## 2. The Main Exhibition

### 2.1 What it is

The five-view research application in `AutoAgents-2-dashboard/signal-multiplexer-viz` is, without exaggeration, the strongest single asset the program owns for a public audience. It is not a marketing animation — it is the research, running:

| View | What the visitor watches | Public-safety status |
|---|---|---|
| **Signal Multiplexer** | The original engine: a live optimization loop formulating and solving problems on 100 ms cycles — channels, demux, solver selection, adaptation metrics, with the mathematics rendered in KaTeX | ✅ Ship |
| **Bounded Autonomy Stack** | The eight-thread stack simulated live: the refusal cascade narrowing the command box, metabolic memory tiers, the monotonicity monitor (toggle the conservative discipline off and watch violations appear), trusted scalars ξ and S, the evidentiary ledger, the zero-sum conservation budget | ✅ Ship — it *demonstrates* exactly what Safety and Architecture now say in prose |
| **Constitution of Truth** | A correctable Ground Truth governed live: separation of epistemic powers, correction supremacy, anti-silent-drift logging, temporal rollback — the visitor can challenge a canon claim and watch it get corrected | ✅ Ship — the governance story, playable |
| **Event Fabric** *(new since the Golden Set README)* | The F26 autonomous-driving event fabric rendered as a live stream | ✅ Ship after a quick content screen |
| **Program Coverage Map** | Internal 56-subcategory source-coverage and gap analysis (`programCoverage.js`, GapClosurePlan, ValidationFrontier) | ⛔ **Excluded from the public build** — this is the gap analysis held as sensitive since Round 1 |

Two properties make it exhibition-grade rather than demo-grade. First, it is **runtime-verified** — the project README documents Playwright verification with zero console errors across all views; that statement goes on the exhibition placard as its own standing badge. Second, it is **honest by construction**: the simulations execute the specified architecture (the CQR gauge-covariance proposition is verified on the in-app harness), so the placard can say *"this is a simulation of the specified architecture, computing what it claims to compute — not vehicle data"* and mean it.

### 2.2 The visitor experience

**The Exhibition Hall** — a dedicated route, `/{lang}/exhibition`, treated like a gallery, not a page:

1. **Lobby**: a short placard (three sentences), the runtime-verified badge, and four view cards with live-motion thumbnails. One click enters a view.
2. **The floor**: the app itself, full-bleed, with the site's chrome reduced to a slim return bar. Theme and language pass through so dark-mode visitors stay in cyanotype.
3. **Guided tour**: an optional overlay per view — five step-annotations that point at what to watch ("this is the command box; drag risk upward and watch it *only shrink*"). First-visit visitors get the tour offered once.
4. **Deep links**: `?view=stack`, `?view=constitution`, etc., so every content page can point into the exact room that demonstrates its claim: Safety's S0–S4 section links into the Stack view's refusal cascade; the Methods audit section links into Constitution; the MAS page links into Event Fabric; Science's optimization prose links into the Multiplexer.
5. **Everywhere else, the exhibition advertises itself**: the Home hero's final CTA becomes **"See it run"**; a marquee band on Home shows a 12-second silent capture of the Stack view; the Artifact Gallery cross-lists all four views as entries.

Mobile gets a deliberate fallback rather than a cramped dashboard: a vertically-scrolling "highlights reel" of captured clips per view with the same captions, plus "best experienced on desktop." Dense instrument panels should never be responsive-squeezed into illegibility.

### 2.3 Engineering integration

1. **Adopt the AutoAgents-2 copy as canonical.** The website repo's embedded `signal-multiplexer-viz` is the older single-view app; replace it with (or point the build at) the five-view version. Keep the old copy archived in-repo.
2. **Curated build flag.** A `VITE_EXHIBITION=1` build strips the Coverage view: the view-switcher entry, `ProgramCoverageMap`, `GapClosurePlan`, `ValidationFrontier`, and — critically — `src/data/programCoverage.js` are excluded via a build-time flag so the gap data never enters the public bundle. This is a ~20-line change in the app's `App.jsx` plus a Vite define; verify by grepping the emitted bundle for coverage strings before every deploy.
3. **Static embed.** `vite build --base=/exhibition/` → output committed to the website's `public/exhibition/`; a `build:exhibition` npm script documents the pipeline. Vercel serves real files before SPA rewrites, so no config change is required; the Exhibition Hall page mounts it in an iframe with `?theme=&lang=` passthrough and a postMessage bridge for live theme toggling.
4. **Performance envelope.** The exhibition loads only on its route (iframe, `loading="lazy"` on the lobby thumbnails; the app itself only on entry). D3 + KaTeX land inside the iframe bundle, not in the site bundle — the main site's JS budget is untouched. Reduced-motion visitors get static captioned frames.
5. **Provenance sidecar.** The repo folder also contains internal documents (EVD assessments, extraction READMEs, the F26 fabric plan). None of these are imported by the app, so none enter the bundle — but the build script asserts that, rather than assuming it.
6. **Also found in the repo, worth screening later:** two large glossary HTMLs (`Glossary.html`, `ds_p_l_glossary.html`) and a threshold-conditions explainer — candidate artifacts for the gallery after the same sensitivity screen as everything else.

### 2.4 Placard copy (draft)

> **The Exhibition.** What you are watching is the program's research software, unmodified: a live optimization engine, a simulated bounded-autonomy stack, and a correctable ground-truth governor. Every quantity on screen is computed by the specified architecture in your browser — nothing is a recording, and nothing is vehicle data. All four rooms are runtime-verified (Playwright, zero console errors). Figures shown are simulation outputs; the program's evidentiary standings — measured, proven, projected, proposed — apply here as everywhere.

---

## 3. Creative Direction & Visual Grammar (unchanged from v1)

The Blueprint Aesthetic: the site should look like the program's documents grew a motion system — technical linework, grid textures, monospace annotations, cyanotype dark mode. Standings as visual grammar (measured = solid, proven = outline, projected = dashed, proposed = hatched, gamble = dotted) via one sitewide legend component. The signature motion verb is **narrowing**. Anti-direction holds: no photoreal silicon, no invented telemetry — and the exhibition placard's honesty framing is the same discipline speaking.

The exhibition slots into this grammar rather than beside it: the lobby, return bar, and tour overlay are drawn in blueprint tokens, so crossing from the site into the app feels like stepping from the plan-room onto the factory floor.

---

## 4. Supporting Galleries (the v1 spectacles, re-ranked around the exhibition)

**G1 · Home hero — "The Narrowing."** Unchanged in design (candidate trajectories pruned through S0→S4 gates), but its role sharpens: it is now the *overture* whose final CTA is "See it run → Exhibition." Hero and exhibition share the narrowing motif so the handoff feels composed.

**G2 · Safety scroll story.** As v1 (sticky S0–S4 accumulation, G-ring, veto latency scale) — now ending with a live deep link into the Stack view's refusal cascade: *"You have read the chain. Now watch it refuse."*

**G3 · Architecture interactives.** Blueprint Map hotspots, 325-route gearbox explorer, crosswalk flip-cards — with the map's BP-6 node deep-linking into the Event Fabric room.

**G4 · Science "proofs that run."** AGM convergence demo, pipeline flow, R² envelope chart with the hatched no-claim region. The AGM widget and the exhibition make the same argument at two scales: the mathematics is real enough to execute.

**G5 · The corpus made spatial.** PDF cover thumbnails and the library shelf, S-tier shelf on Home, KB radial map, archive treemap from `library-hierarchy-data.json`.

Page-by-page treatments for the remaining pages (Methods verdict matrix, MAS live teaser, Perspective editorial pass, Bio timeline, partner diagrams) carry over from v1 §5 unchanged — with MAS's teaser now simply *being* a framed window onto the Event Fabric room rather than a bespoke animation, which deletes a build item.

---

## 5. Claim-Discipline Guardrails for Visuals (unchanged, plus one)

All v1 guardrails hold: every number traceable, standings encoding on all projected quantities, no imagery implying built hardware, demos compute what they claim, conceptual illustrations captioned as such. **Added for the exhibition:** simulation outputs are always labeled as simulation; the coverage-strip assertion runs in CI (grep the public bundle for gap-analysis strings); and the exhibition's verified status is itself displayed with its scope stated (runtime-verified rendering ≠ validated vehicle behavior — the placard says which is which).

---

## 6. Roadmap (revised — exhibition first)

| Phase | Scope | Duration |
|---|---|---|
| **E1 — The Main Exhibition** | Adopt five-view app as canonical; curated build (Coverage stripped + bundle assertion); `/exhibition` hall with lobby, tour, theme/lang bridge; deep links from Safety/Methods/MAS/Science; Home marquee + "See it run" CTA; mobile highlights reel | ~1.5–2 weeks |
| E2 — Quick wins | Grammar tokens + standings legend; PDF cover thumbnails + library shelf; Bio timeline; Perspective editorial pass; pillar glyphs | ~1 week |
| E3 — Interactives | Gearbox explorer; AGM demo; envelope chart; crosswalk flip-cards; KB map; audit verdict matrix; Mermaid pre-render | ~2 weeks |
| E4 — Signature scenes | "Narrowing" hero (tuned to hand off into the exhibition); Safety scroll story; Blueprint Map hotspots | ~1.5 weeks |
| E5 — Hardening | FA/RTL variants; reduced-motion & a11y audit; performance pass; analytics events (exhibition_enter, view_switch, scenario_run, tour_complete) | ~1 week |

Roughly **seven weeks** end-to-end, but the strategic change is sequencing: the exhibition ships *first*, because it is the highest spectacle-per-effort item on the board — the software already exists, already runs, and is already verified. Week two, the site has a centerpiece competitors cannot imitate with a design agency.

---

## 7. Immediate Next Step

On your word, I will execute Phase E1: sync the five-view app into the website repo, implement the exhibition build flag and coverage-strip assertion, build and embed it under `/exhibition` with the lobby and deep links, and commit the result to your working copy — same build-validate-commit discipline as Rounds 1 and 2. The only input I need from you is confirmation that the Event Fabric view may ship after my standard content screen (its data file appears concept-level, consistent with the published MAS page, but it gets the same inspection everything else got).
