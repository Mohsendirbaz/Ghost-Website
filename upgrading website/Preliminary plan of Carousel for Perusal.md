# Carousel for Perusal — Updated Plan (Post-Attachment Review)

This update incorporates the PICAPD/Ghost Autonomy constraints: **static SPA**, **bilingual English/Persian**, **RTL correctness**, **high-density Mermaid**, **performance-first rendering**, and **accessibility**. :contentReference[oaicite:0]{index=0}

---

## 1) Operating Assumptions and Non-Negotiables

### 1.1 Static-site reality
- The site is a **static SPA without runtime APIs**, so the gallery must not depend on client-side Mermaid rendering as a default path. :contentReference[oaicite:1]{index=1}
- “Carousel for Perusal” must treat Mermaid as **build-time compiled media** (SVG/PNG), with optional sandboxed repro viewing only when needed.

### 1.2 Diagram diversity + density
- The content includes many Mermaid types (flowchart, stateDiagram-v2, sequenceDiagram, gantt, pie, bar/line/scatter) plus tables and other media. :contentReference[oaicite:2]{index=2}
- Some diagrams imply extreme node counts (e.g., “100 workers to 10 managers”), and high-density graphs should be **summarized/split** to stay readable and performant. :contentReference[oaicite:3]{index=3}

---

## 2) Updated Rendering Strategy (Mermaid as a Build Artifact)

### 2.1 Default: pre-render Mermaid at build time
- Pre-render all Mermaid diagrams into **SVG (desktop fidelity)** and **optimized PNG (mobile)** using a pinned renderer (e.g., `@mermaid-js/mermaid-cli` or `playwright-mermaid`). :contentReference[oaicite:4]{index=4}
- Use:
  - `--backgroundColor transparent`
  - `--accessibility` to embed accessible metadata (titles/descriptions). :contentReference[oaicite:5]{index=5}

### 2.2 Output placement and referencing
- Store generated assets under: `public/assets/diagrams/` and reference them from components/pages. :contentReference[oaicite:6]{index=6}

### 2.3 Complexity management: split + progressive disclosure
When diagrams exceed cognitive/perf thresholds:
- **Split** diagrams above ~50 nodes or long chains into smaller views with narrative context. :contentReference[oaicite:7]{index=7}
- For repeated structures (e.g., worker tiers), show a **representative subgraph** (Workers 1–3) and annotate “Workers 4–100 follow the same pattern.” :contentReference[oaicite:8]{index=8}
- For large state machines, group into **sub-diagrams** (e.g., Definition→Monitoring; Enforcement→Recovery) and provide anchored navigation. :contentReference[oaicite:9]{index=9}

---

## 3) Accessibility & Bilingual/RTL Support (First-Class)

### 3.1 Accessible SVG metadata (required)
For each pre-rendered SVG, ensure:
- `<title>` (purpose) and `<desc>` (concise explanation). :contentReference[oaicite:10]{index=10}
- Prefer Mermaid directives (`accTitle`, `accDescr`) embedded in source to ensure consistent generation. :contentReference[oaicite:11]{index=11}

### 3.2 Persian translation and text expansion rules
- All labels/notes/axis titles inside diagrams must be translated into Persian. :contentReference[oaicite:12]{index=12}
- Avoid fixed-width UI containers; Persian strings may be longer—allow wrapping and responsive sizing. :contentReference[oaicite:13]{index=13}

### 3.3 RTL directionality handling
- Use CSS logical properties around the viewer (`margin-inline-start`, `text-align: start`) to align correctly under `<html dir="rtl">`. :contentReference[oaicite:14]{index=14}
- For diagrams where mirroring changes meaning (time arrows, sequence flows), produce a **separate Persian-oriented SVG** rather than CSS flipping. :contentReference[oaicite:15]{index=15}

---

## 4) Updated Gallery System Design

### 4.1 Asset + Artifact + Dependency (reproducible study)
Maintain the unified model, with one key update: **Mermaid dependencies are captured for future reproducibility even though rendering is precomputed**. :contentReference[oaicite:16]{index=16}

**Asset (logical item)**
- `assetId`, `title`, `summary` (EN/FA), `tags`, `collectionId`, `visibility`, `type`

**Artifact (versioned build output)**
- one per language and version label (`v1.0-en`, `v1.0-fa`) pointing to `contentRef` (SVG/PNG), plus checksums and `renderProfileId`. :contentReference[oaicite:17]{index=17}

**Dependency record (Study With)**
- pin Mermaid runtime + any add-ons used (e.g., gantt, KaTeX) with reason and risk flags. :contentReference[oaicite:18]{index=18}

### 4.2 copy.js as the canonical text and routing layer
All translated strings and diagram metadata live in `src/data/copy.js` with structured keys and are passed into the gallery/viewer. :contentReference[oaicite:19]{index=19} :contentReference[oaicite:20]{index=20}

Recommended per-diagram payload:
- `title`, `alt`, `description`
- `src.svg`, `src.png`
- `langVariants` (en/fa)
- `studyWith` (dependency manifest reference)

### 4.3 DiagramViewer (the core viewer component)
Update the viewer to:
- Render SVG via `<img>` (fast, safe) with `alt` from `copy.js`. :contentReference[oaicite:21]{index=21}
- Click-to-zoom (study mode) and “open full” modal.
- Lazy-load using `IntersectionObserver` to protect initial paint. :contentReference[oaicite:22]{index=22}

---

## 5) Carousel + Virtualized Gallery (Performance at Scale)

### 5.1 When to virtualize
If a page displays **dozens of diagrams**, use virtualization so only visible items are mounted. :contentReference[oaicite:23]{index=23}

### 5.2 Implementation pattern
- Grid/list virtualization (e.g., `react-window`)
- Progressive image loading:
  - placeholder thumbnail → swap to high-res on focus/open
- Keyboard navigation that remains stable under virtualization (roving tabindex)

---

## 6) High-Fidelity Search & Filters (Updated Scope)

### 6.1 Search index inputs (static-first)
Because Mermaid is pre-rendered, “precision search” should index:
- titles/summaries/tags (EN/FA)
- descriptions + alt text (EN/FA)
- Mermaid source (from `.mmd` repository, not from runtime rendering)
- dependency manifests (Mermaid version, plugins)

This supports “find the right diagram quickly” without requiring client rendering.

### 6.2 Filters tailored to PICAPD content
Minimum recommended facets:
- Type: Mermaid | image | PDF | video | table
- Mermaid diagram type (flowchart/state/sequence/gantt/pie/bar/line/scatter) :contentReference[oaicite:24]{index=24}
- Document origin: Doc01 | Doc02 | Doc03
- Language availability: EN only | FA only | Both
- Complexity flags: split-series | high-density | has notes/callouts
- Dependency facets: Mermaid version, KaTeX/math, gantt support, etc. :contentReference[oaicite:25]{index=25}

---

## 7) Versioning, Reproducibility, and Build Tooling

### 7.1 Source control and naming
- Keep all `.mmd` under version control (e.g., `src/assets/mermaid/`)
- Filename convention: `slug_vX_en.mmd` / `slug_vX_fa.mmd` :contentReference[oaicite:26]{index=26}

### 7.2 Per-diagram manifest
For each diagram, store `manifest.yml` alongside source with:
- Mermaid CLI version + options
- theme tokens
- accessibility fields
This supports long-term reproducibility. :contentReference[oaicite:27]{index=27}

### 7.3 Build script
Provide `npm run render-diagrams` to iterate `.mmd` → SVG/PNG and inject accessibility metadata. :contentReference[oaicite:28]{index=28}

---

## 8) Handling “Dynamic” Visuals Without an API Layer

Some visuals are conceptually real-time; plan two modes: :contentReference[oaicite:29]{index=29}
- **Static baseline**: pre-render with representative values, with alt text clarifying illustrative nature. :contentReference[oaicite:30]{index=30}
- **Optional interactive charts**: a lightweight Chart component that reads static JSON (e.g., `public/data/metrics.json`) and remains RTL-accessible, with image fallback. :contentReference[oaicite:31]{index=31}

---

## 9) Test Plan (Quality Gates)

### 9.1 Accessibility testing
Use `axe-core` in Jest to verify:
- correct `lang`/`dir`
- alt text present
- contrast and tab order checks :contentReference[oaicite:32]{index=32}

### 9.2 RTL + responsive screenshot tests
- Validate wrapping and overflow at key breakpoints for both English and Persian.
- Confirm Persian font and diagram containment (no clipping/overrun). :contentReference[oaicite:33]{index=33}

---

## 10) Updated Implementation Sequence (Execution Plan)

1. **Audit & extract** Mermaid blocks; flag candidates for splitting and language-specific variants. :contentReference[oaicite:34]{index=34}
2. **Translate** all diagram text; create separate `.mmd` when directionality requires it; store corresponding strings in `copy.js`. :contentReference[oaicite:35]{index=35}
3. **Render** `.mmd` → SVG/PNG with pinned CLI and `--accessibility`; apply site theme tokens. :contentReference[oaicite:36]{index=36}
4. **Insert assets** into `public/assets/diagrams/` and wire to `copy.js` keys. :contentReference[oaicite:37]{index=37}
5. **Upgrade DiagramViewer**: alt text + zoom + lazy-load via `IntersectionObserver`. :contentReference[oaicite:38]{index=38}
6. **Populate asset/artifact/dependency records** (including pinned Mermaid version + addons) from per-diagram manifests. :contentReference[oaicite:39]{index=39}
7. **Virtualize** gallery pages that contain many diagrams; ensure keyboard navigation works. :contentReference[oaicite:40]{index=40}
8. **Run a11y + RTL tests** (axe + screenshots) before publishing. :contentReference[oaicite:41]{index=41}

---

## 11) What “Carousel for Perusal” Now Guarantees

- **Fast**: no client-side Mermaid runtime required; heavy layout happens at build-time. :contentReference[oaicite:42]{index=42}
- **Readable at scale**: complex diagrams are split and navigable, with progressive disclosure. :contentReference[oaicite:43]{index=43}
- **Accessible + bilingual**: SVGs include meaningful descriptions; EN/FA variants are first-class; RTL is correct and not “CSS-flipped.” :contentReference[oaicite:44]{index=44} :contentReference[oaicite:45]{index=45}
- **Reproducible**: each diagram records pinned render profile + dependencies for future rebuilding. :contentReference[oaicite:46]{index=46} :contentReference[oaicite:47]{index=47}
- **Scalable discovery**: search and filters align with diagram types, documents, languages, and dependency traits. :contentReference[oaicite:48]{index=48}

---
