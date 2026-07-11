# Ghost Autonomy — Visual Overhaul Plan

**Prepared:** July 9, 2026 · Consulting engagement: text-to-visual transformation
**Baseline:** the site as of today's Round-2 implementation (16 destinations, bilingual, Vercel-deployed)

---

## 1. Diagnosis

The site is a research program wearing a text costume. Nearly every surface argues in paragraphs: Safety is ~1,800 words with one abstract placeholder graphic; Science is five prose sections; Perspective is three full essays; the new Methods page is prose end-to-end; the Knowledge Base is a text tree navigating to text. Meanwhile the program's actual subject matter is *intensely geometric* — contracting command sets, five-stage pipelines, 325-route combinatorics, residence-time partitions, quadratic convergence — and the corpus already draws these things. The gap is not a shortage of visual material; it is that the visual material is either buried (the Mermaid diagram gallery lives only at the bottom of Architecture), minimal (the four `AbstractVisual` placeholder SVGs), or unshipped (the blueprint SVGs arrived only this week; the D3 signal-multiplexer sub-app sits unbuilt inside the repo).

Three structural advantages make this overhaul cheaper than it looks. First, the stack is already visual-capable: framer-motion 12 (scroll and spring animation), Mermaid 10, lucide icons, and a sticky-section component (`SectionBlockSticky`) are installed and mostly idle. Second, the corpus supplies real data for every visual — no invented numbers needed, which matters for a program whose brand is claim discipline. Third, a signature aesthetic already exists in your own documents: the blueprint SVGs' technical-drawing language *is* the design direction, waiting to be systematized.

**The consulting thesis: don't decorate the text — replace the text's job.** Each page should make its argument visually first, with prose demoted to captioning and depth-on-demand. And the spectacles must be *true*: this program can afford something almost no deep-tech site can — animations that are actual demonstrations rather than metaphors.

---

## 2. Creative Direction: The Blueprint Aesthetic

**Direction.** The site should look like the program's own documents grew a motion system: technical-drawing linework, graph-grid textures, monospace annotation accents, standing badges, figure numbers. Visitors should feel they are inside the engineering record, not on a marketing layer above it. The three blueprint SVGs already establish this language; the overhaul extends it site-wide as a token system rather than one-off images.

**Anti-direction (as important).** No photoreal chip renders, no stock 3D cityscapes with sensor cones, no fake dashboards with invented telemetry. A photoreal EPU die shot would visually claim silicon that does not exist — the imagery equivalent of the unlabeled performance claims we just removed. Where hardware is depicted, it is drawn as *blueprint*, which honestly reads as "designed," not "built." The external audit's verdict on decorative framing applies to graphics with full force.

**The signature motion verb: narrowing.** Every program has one law — the admissible set only contracts. Make contraction the house motion: funnels that tighten, boundaries that close in, option sets that visibly shrink as risk rises. Used consistently (hero, Safety story, gearbox demo, even hover states), one physical idea becomes the brand's kinetic identity.

---

## 3. The Visual Grammar System (build once, use everywhere)

1. **Standings as visual grammar.** A single legend component encoding the evidentiary seam: **measured** = solid fill; **proven** = solid outline; **projected** = dashed outline; **proposed** = hatched; **gamble** = dotted. Every chart, diagram, and stat tile on the site uses this encoding, with the legend one click away. This turns the claim discipline from a paragraph into a *look* — the site's most differentiating visual idea, and it costs a CSS file.
2. **Blueprint tokens.** Grid-paper section backgrounds (subtle, theme-aware), 1.5px technical linework, corner registration marks on figure frames, `Figure N —` captions in monospace, and a consistent annotation callout style. Dark mode inverts to cyanotype (near-white lines on deep blue-black) — an unusually handsome dark theme that falls out of the direction for free.
3. **Motion rules.** framer-motion only; durations 300–600 ms; scroll-linked scenes via `useScroll`; everything honors `prefers-reduced-motion` by collapsing to the final frame. No autoplaying loops longer than 8 s; nothing moves in the reading column while text is being read.
4. **Bilingual/RTL rules for diagrams.** Direction-neutral layouts preferred (vertical flows); horizontal flow diagrams get a mirrored variant or an explicit LTR-island treatment with translated labels; all new SVGs keep labels as `<text>` (not paths) so FA swaps are string-level.
5. **Iconography.** Standardize on lucide (installed) plus a small custom set for program concepts (veto, gearbox, reservoir, witness) drawn in the blueprint stroke style.

---

## 4. The Five Signature Spectacles

These are the set-pieces that change what the site *is*. Each is data-true.

**S1 · Home hero — "The Narrowing."** Replace the static hero with a full-bleed animated field: a cloud of candidate trajectories (light lines) flowing left-to-right through the S0→S4 gates, visibly pruned at each gate until only admissible paths reach the actuator; a risk slider (or scroll position) tightens the envelope in real time. Canvas + framer-motion, ~15 KB of code, no library additions. The tagline lands on top: *Selection is free; consequence is bounded.* This is the monotone law as a first impression — and it doubles as the loading identity for the whole site.

**S2 · Safety — the scroll-driven refusal story.** Convert the S0–S4 cards into a sticky scroll sequence (using the existing `SectionBlockSticky`): as the visitor scrolls, one continuous diagram accumulates the chain stage by stage — numbers become honest at S0, detail is traded for a one-sided scalar at S1, the reduced-model guarantee projects at S2, the command box visibly contracts at S3, and at S4 the diagram *changes medium*: the software lanes end and a single hardwired line reaches the actuator first, annotated with the corpus's only measured latency (solid fill, per the grammar). G1–G6 then render as a six-segment conformance ring that fills as each criterion is explained. Prose shrinks to captions; the full text moves to a "read the specification" disclosure.

**S3 · Architecture — the interactive Blueprint Map + Gearbox explorer.** Upgrade the static Master Blueprint SVG into the page's navigation instrument: pan/zoom, hover highlights, click a BP node → side panel with its register entry and standing badge (the SVG already has the geometry; we add hotspots). Below it, the **325-route explorer**: five draggable stance chips (P/F/S/I/E) the visitor orders into a "gear"; the widget live-computes the route (with the 325 total visible), shows what that ordering means in plain language, and demonstrates hysteresis by resisting rapid re-ordering. This makes the program's most original concept *playable* in twenty seconds. The von Neumann crosswalk becomes flip-cards (classic primitive on front, physics-rooted substitute on back).

**S4 · Science — proofs that run.** Three visuals, all computationally honest: (a) an **AGM convergence demo** — the visitor picks a modulus, the widget iterates the arithmetic–geometric mean live and plots error on a log axis; quadratic convergence to machine precision in a handful of steps is *visible*, and the caption says "this is the proven primitive, running in your browser"; (b) the **five-stage pipeline** as an animated flow with real intermediate artifacts labeled; (c) the **R² envelope chart** — the 0.78–0.87 case-study results plotted *inside* a drawn operating-envelope box (600–900 °C × ER × S/B), with the outside region explicitly hatched "no claim." The non-claims paragraph becomes the chart's most prominent annotation. Nobody else's science page visualizes what they *don't* claim; it will be the most screenshot-able thing on the site.

**S5 · Library & Knowledge Base — the corpus made spatial.** (a) Real **document thumbnails**: a one-time script renders page 1 of every published PDF to a cover image; the Technical Library becomes a shelf of actual covers with tier/standing badges, replacing text rows. (b) An **S-tier shelf** on Home and the library landing using those covers. (c) A **KB map**: the 8-part × 43-chapter tree rendered as a radial or treemap navigator (the data already exists in `knowledgeBase.js`; `library-hierarchy-data.json` — 1,775 files, already tiered — can power a second "archive at a glance" treemap for the Document Archive). Text lists remain as the accessible fallback view.

---

## 5. Page-by-Page Treatment Matrix

| Page | Visual move | Source material | Effort |
|---|---|---|---|
| Home | S1 hero; pillar cards get animated glyphs (funnel / gate / reservoir); corpus strip → cover thumbnails; proof strip → drawn badges | Refusal chain, blueprint SVG style | L |
| Safety | S2 scroll story; G-ring; veto latency scale (log ns→ms, measured vs projected encoding) | Refusal one-pager, L4 doc | L |
| Architecture | S3 map + explorer; crosswalk flip-cards; Mermaid gallery promoted with visual filters | 3 SVGs, gearbox overview | L |
| Science | S4 trio (AGM demo, pipeline flow, envelope chart); papers shelf → covers | Manuscript, methodology chapter | M–L |
| Methods | Audit verdict matrix (component × verdict grid: rigorous / reinvention / decorative — the audit as a picture); discovery-operator triptych illustration; six-layer stack cutaway | Prior-art map, six-layer handbook | M |
| Multi-Agent System | Live lab teaser: auto-playing 20 s event-stream animation (events appending, canvas re-projecting) above the category grid; "open the laboratory" CTA | Lab HTML (already published) | M |
| Knowledge Base | Radial/treemap part navigator; per-part accent icons; reading-progress rail in reader | KB tree data | M |
| Library / Archive | Cover-thumbnail shelf; tier badges; archive treemap | PDFs + hierarchy JSON | M |
| Technology | EPU blueprint cutaway (drawn, standings-labeled); sensing section gets the fibrous-receptor illustration | ARC thesis, treaty concepts | M |
| Perspective | Editorial typographic redesign: drop caps, pull-quotes, one spot illustration per essay, reading-time markers — essays should feel like a magazine, not a wall | Existing essays | S–M |
| Bio | Career timeline using the existing `Timeline` component (IIT → dissertation → framework → EPU), with document links at each node | Founder bio, dissertation | S |
| Company / Partners | Partner-category diagram (structural complementarity as a drawn triad); values as glyph cards | Partners copy | S |
| Invest | Already interactive (simulator); restyle to blueprint tokens only | — | S |
| Contact | Micro-illustration; no other change | — | S |
| Artifacts | Card grid gains live-preview hover (iframe thumbnail snapshot) and category color coding | Existing registry | S–M |
| Multi-lingual | Every new SVG/interactive ships with FA labels + RTL mirroring check | — | cross-cutting |

---

## 6. Asset Production Pipeline

1. **PDF cover thumbnails** — a build-time script (`pdftocairo`/`pdf-thumbnail`) rendering page 1 of each published PDF at 2× card size into `public/covers/`; wired into the library card component. One afternoon; transforms the library instantly.
2. **Mermaid pre-rendering** — the 46 KB of Mermaid definitions currently render client-side; pre-render to SVG at build for the gallery grid (keep live Mermaid only in the expanded viewer). Faster, and the diagrams become linkable images.
3. **SVG interactive-ization** — the three blueprint SVGs get an id-audit pass (each node gets a stable `id`) so hotspot overlays bind cleanly; labels moved to `<text>` where they aren't already.
4. **New illustrations** — the custom concept glyphs and two spot illustrations per essay, drawn in the blueprint stroke style (I can produce these as SVG directly).
5. **The signal-multiplexer sub-app** — the repo contains the full D3 four-view application. Its Signal Multiplexer view is a legitimate spectacle (a real optimization loop animating at 100 ms cycles). **Decision needed:** the same app contains the Program Coverage view we agreed to hold as sensitive. Recommendation: build a stripped bundle exposing only the multiplexer + bounded-autonomy views, embed as the Multi-Agent/Technology showpiece; do not ship the coverage data file.

---

## 7. Technical Implementation Notes

Use only the installed stack — framer-motion for all motion, hand-rolled SVG/canvas for the hero and demos, Mermaid for existing diagrams, lucide for icons; no three.js, no new charting library (the two charts needed are simple enough in SVG, keeping bundle discipline). Performance budget: hero animation ≤ 20 KB gzipped and canvas-based (no layout thrash), LCP ≤ 2.5 s on mid-tier mobile, CLS 0 via reserved aspect-ratio boxes, all below-fold visuals lazy-mounted with `IntersectionObserver`, thumbnails in AVIF/WebP with width hints. Accessibility: every interactive visual has a text-equivalent disclosure (often the very prose it replaced — demoted, not deleted), keyboard operability for the explorer widgets, `prefers-reduced-motion` end-state rendering, and color-independent standing encoding (fill *pattern*, not hue alone). The Vercel Analytics events gain four custom signals: hero interaction, explorer engagement, artifact opens, and document downloads — the before/after evidence for this overhaul.

---

## 8. Claim-Discipline Guardrails for Visuals

Worth codifying, since visuals can overclaim faster than prose: every number that appears in a graphic must be traceable to a published corpus document; projected and proposed quantities always render in their standings encoding, never solid; no imagery that implies fabricated silicon, field deployment, or fleet operation; demos compute what they claim to compute (the AGM widget runs the real iteration; the gearbox explorer implements the real combinatorics); and any illustrative-only graphic is captioned *conceptual illustration*. The standings legend ships as a reusable component and appears on every page that shows a figure.

---

## 9. Roadmap

| Phase | Scope | Duration |
|---|---|---|
| V1 — Quick wins | Grammar tokens + standings legend; PDF cover thumbnails + library shelf; Bio timeline; Perspective editorial pass; pillar glyphs | ~1 week |
| V2 — Interactives | Gearbox route explorer; AGM demo; envelope chart; crosswalk flip-cards; KB map; audit verdict matrix; Mermaid pre-render | ~2 weeks |
| V3 — Signature scenes | S1 hero; S2 Safety scroll story; blueprint map hotspots; MAS live teaser; sub-app stripped embed (pending your call) | ~2 weeks |
| V4 — Hardening | FA/RTL variants for all new visuals; reduced-motion & a11y audit; performance pass; analytics events | ~1 week |

Roughly **six weeks** of focused effort end-to-end, sequenced so the site looks meaningfully more visual after week one and unmistakably transformed after V3. Each phase ships independently.

---

## 10. What I Can Build on Request, Immediately

The standings-legend component and blueprint token stylesheet; the thumbnail pipeline and library shelf; the gearbox explorer; the AGM convergence demo; the envelope chart; the audit verdict matrix; the Bio timeline; and the S1 hero prototype. Say which phase to start and I'll implement it the way Rounds 1–2 were done — built, validated, and committed to your working copy.
