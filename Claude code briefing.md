# CLAUDE CODE BRIEFING
# Ghost Autonomy — Knowledge Base Module
# Version: 1.0 | Date: 2026-02-17

---

## WHAT THIS DOCUMENT IS

A complete, self-contained implementation brief for adding the Knowledge Base
module to the Ghost Autonomy website. All architectural decisions, every file
change, every new file, and all edge cases are specified here.

Read this entire document before writing a single line of code.

---

## FILES YOU RECEIVE WITH THIS BRIEF

Share all of the following with Claude Code (they are pre-built and must be
placed at the exact paths shown):

| Delivered file                         | Destination in repo                        |
|----------------------------------------|--------------------------------------------|
| `knowledgeBase.js`                     | `src/data/knowledgeBase.js`                |
| `knowledgeBase.css`                    | `src/styles/knowledgeBase.css`             |
| `jsonld.js`                            | `src/utils/jsonld.js`                      |
| `KnowledgeBase.js`                     | `src/pages/KnowledgeBase.js`               |
| `KnowledgeBaseReader.js`               | `src/pages/KnowledgeBaseReader.js`         |
| `ghost_website_search.jsonld`          | Reference only (not deployed as a file;    |
|                                        | its content is in jsonld.js already)       |

Do NOT modify the delivered files. They are production-ready.

---

## FILES TO MODIFY IN THE EXISTING REPO

### 1. `src/App.js`

Add four new route imports and route definitions inside `<Routes>`.

**Add imports** (after existing page imports):
```js
import KnowledgeBase       from './pages/KnowledgeBase';
import KnowledgeBaseReader from './pages/KnowledgeBaseReader';
```

**Add routes** (inside `<Routes>`, after the existing page routes):
```jsx
{/* Knowledge Base — browse index */}
<Route path="/en/knowledge-base"                                          element={<KnowledgeBase />} />
<Route path="/fa/knowledge-base"                                          element={<KnowledgeBase />} />

{/* Knowledge Base — reader (Part → Chapter → Section) */}
<Route path="/en/knowledge-base/:partSlug"                                element={<KnowledgeBaseReader />} />
<Route path="/fa/knowledge-base/:partSlug"                                element={<KnowledgeBaseReader />} />
<Route path="/en/knowledge-base/:partSlug/:chapterSlug"                   element={<KnowledgeBaseReader />} />
<Route path="/fa/knowledge-base/:partSlug/:chapterSlug"                   element={<KnowledgeBaseReader />} />
<Route path="/en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug"      element={<KnowledgeBaseReader />} />
<Route path="/fa/knowledge-base/:partSlug/:chapterSlug/:sectionSlug"      element={<KnowledgeBaseReader />} />
```

---

### 2. `src/data/copy.js`

Add the following keys under BOTH `en` and `fa` top-level objects.

**Under `copy.en.nav`**, add:
```js
knowledgeBase: "Knowledge Base",
```

**Under `copy.fa.nav`**, add:
```js
knowledgeBase: "پایگاه دانش",
```

**Under `copy.en`**, add a new top-level section:
```js
knowledgeBase: {
  heroTitle: "Ghost Autonomy Documentation",
  heroSub: "8 parts · 47 chapters · PICAPD ISA, Queen Bee architecture, physics-inspired foundations",
  searchPlaceholder: "Search documentation...",
  allParts: "All Parts",
  coreArchitecture: "Core Architecture",
  validation: "Validation & Results",
  strategy: "Strategy & Global Partnerships",
  technicalFoundations: "Technical Foundations",
  resultsFound: "results found",
  noResults: "No results found",
  noResultsHint: "Try a different keyword or clear filters.",
  filterLabel: "Refine",
  topicsLabel: "Topics",
  clearFilters: "Clear filters",
  scopeAll: "All",
  scopeParts: "Parts",
  scopeChapters: "Chapters",
  scopeSections: "Sections",
},
```

**Under `copy.fa`**, add:
```js
knowledgeBase: {
  heroTitle: "مستندات Ghost Autonomy",
  heroSub: "۸ بخش · ۴۷ فصل · معماری PICAPD ISA، کندوی ملکه و مبانی فیزیک‌الهام‌گرفته",
  searchPlaceholder: "جستجو در اسناد...",
  allParts: "همه بخش‌ها",
  coreArchitecture: "معماری هسته",
  validation: "اعتبارسنجی و نتایج",
  strategy: "استراتژی و مشارکت‌های جهانی",
  technicalFoundations: "پایه‌های فنی",
  resultsFound: "نتیجه یافت شد",
  noResults: "نتیجه‌ای یافت نشد",
  noResultsHint: "کلمه کلیدی دیگری را امتحان کنید.",
  filterLabel: "فیلتر",
  topicsLabel: "برچسب‌ها",
  clearFilters: "پاک‌کردن فیلترها",
  scopeAll: "همه",
  scopeParts: "بخش‌ها",
  scopeChapters: "فصل‌ها",
  scopeSections: "زیربخش‌ها",
},
```

---

### 3. `src/components/Header.js`

Add the Knowledge Base link to the `navLinks` array that generates the navigation bar.

Find the `navLinks` array (it currently contains items like `home`, `technology`, `science`, etc.)
and add one entry:

```js
{ label: t.knowledgeBase, to: `/${lang}/knowledge-base` },
```

Place it after `science` and before `safety`, or at whatever position makes
navigational sense for the product. The label references `copy[lang].nav.knowledgeBase`
via the existing `t` binding in the component.

---

### 4. `src/components/Footer.js`

Add the same link to the footer `pages` array:

```js
{ label: t.nav.knowledgeBase, to: `/${lang}/knowledge-base` },
```

---

### 5. `src/styles/global.css` or `src/index.js`

Ensure `knowledgeBase.css` is imported. The pages already import it directly
(`import '../styles/knowledgeBase.css'`), so no global import is needed —
but confirm the path `src/styles/knowledgeBase.css` resolves correctly from
`src/pages/`.

If the project uses an alias or barrel, adjust the import path in
`KnowledgeBase.js` and `KnowledgeBaseReader.js` accordingly.

---

## DIRECTORY STRUCTURE DELTA

```
src/
├── data/
│   └── knowledgeBase.js          ← NEW (delivered)
├── pages/
│   ├── KnowledgeBase.js          ← NEW (delivered)
│   └── KnowledgeBaseReader.js    ← NEW (delivered)
├── styles/
│   └── knowledgeBase.css         ← NEW (delivered)
└── utils/
    └── jsonld.js                 ← NEW (delivered)
```

No new dependencies are required. The module uses:
- React 19 (already installed) — hooks, Link, useParams, useSearchParams
- React Router DOM 7 (already installed) — routing, useParams, useSearchParams
- Plain CSS with existing design tokens (no CSS-in-JS, matching existing pattern)

---

## WHAT THE MODULE DOES

### A. Browse page (`/en/knowledge-base`, `/fa/knowledge-base`)

A full-page experience with three regions:

1. **Hero band** — dark background with grid texture, global search bar,
   scope-filter tabs (All / Parts / Chapters / Sections).

2. **Refine rail** (left, sticky) — faceted filter by topic tag.
   Tags are derived from `knowledgeBase.js` and counted dynamically.
   Active tags refine results in real time.

3. **Lanes / results** (right) — when no query/filter is active, shows five
   Netflix-style horizontal carousel lanes (All Parts, Core Architecture,
   Validation & Results, Strategy & Partnerships, Technical Foundations).
   When a query or tag filter is active, the lanes are replaced with a dense
   vertical result list showing every matching node with type badge, breadcrumb,
   and description.

### B. Reader pages (`/*/knowledge-base/:part`, `/*/knowledge-base/:part/:chapter`, etc.)

Three-column layout:

1. **Left column** — sticky TOC navigator showing the full chapter/section
   tree for the current part. Active node is highlighted. Auto-collapses
   sibling sections.

2. **Center column** — reading surface. Renders one of three views:
    - **Part landing**: Roman numeral display + chapter grid
    - **Chapter**: Header, description, section list with arrow links
    - **Section**: Header, description, subsection list, placeholder content area

3. **Right column** — contextual aside: page reference, topic tags (linked
   to search), related nodes (by shared tags), canonical URL for citation.

Every page renders `<< Previous` / `Next >>` navigation at the bottom,
correctly threading Part I → Part VIII across chapter and section boundaries.

### C. JSON-LD injection

`src/utils/jsonld.js` exports functions that generate Schema.org-compliant
JSON-LD. Each page calls the appropriate function on mount and removes
the injected `<script id="kb-jsonld">` tag on unmount, preventing duplicate
injection during client-side navigation.

The site-level `WebSite` + `SearchAction` block should be added to the
global layout (e.g., `App.js` or `AppShell`) — one call to `buildIndexGraph`
is sufficient; it is NOT called on every page.

---

## SEARCH INTEGRATION WITH EXISTING SITE SEARCH

The `SearchAction` in the JSON-LD points to:
```
GET /en/knowledge-base?q={search_term_string}
```

The KnowledgeBase browse page already reads the `?q=` param on mount and
triggers a search immediately. No backend changes are required — this is
fully client-side search over the `ALL_NODES` flat array in `knowledgeBase.js`.

If the existing site has a search page or search overlay, you can feed it
the same `ALL_NODES` array as an additional data source. The array is
exported from `src/data/knowledgeBase.js`.

---

## BILINGUAL & RTL BEHAVIOUR

The module uses the existing `useLang()` hook and `lang` parameter exactly as
all other pages do. Key behaviours:

- All text is served from the bilingual `title: { en, fa }` fields in
  `knowledgeBase.js`.
- CSS uses `margin-inline-start`, `padding-inline-start`, `border-inline-start`
  throughout — these flip automatically when `<html dir="rtl">` is active.
- The `[lang="fa"]` selector in `knowledgeBase.css` switches to `Vazirmatn`
  for specific high-hierarchy elements (titles, hero), matching the global
  font strategy.
- RTL arrow reversal is handled in CSS (`[dir="rtl"] .kb-section-arrow`).
- The search input has a `lang={lang}` attribute for correct spell-check.

---

## EDGE CASES HANDLED

| Case | Behaviour |
|------|-----------|
| Unknown `partSlug` in URL | Redirect to `/knowledge-base` |
| Unknown `chapterSlug` | Redirect to part landing |
| Unknown `sectionSlug` | Redirect to chapter page |
| Chapter with no sections | Chapter view shows description only (no section list) |
| Part with no chapters | Part view shows description only (no chapter grid) |
| Subsections with no dedicated page | Displayed as a list within the section view (not routed) |
| Appendix chapters (`isAppendix: true`) | No special routing; displayed identically to regular chapters |
| Empty search query | Lanes shown, not results |
| Search with zero results | Empty state with icon and prompt shown |
| JSON-LD on fast navigation | Injector replaces existing `<script id="kb-jsonld">` tag; no duplicates |
| Missing `description` on a node | Description simply omitted from card/reader; no error |

---

## DESIGN SYSTEM COMPLIANCE

The module extends the existing tokens (never overrides them) by declaring
additional KB-specific custom properties in `:root` inside `knowledgeBase.css`:

- `--kb-accent-*` — eight per-part accent colours calibrated against the
  primary palette (orange, blue, gold)
- `--kb-toc-width`, `--kb-aside-width`, `--kb-reader-max-width` — layout dims
- `--kb-card-radius`, `--kb-card-border` — consistent with site card treatment
- `--kb-transition-fast`, `--kb-transition-med` — animation timing

All components use existing tokens (`--color-primary`, `--color-text-primary`,
`--space-*`, `--text-*`, `--font-primary-latin`, `--font-primary-persian`)
for colours, spacing, and typography — no hardcoded values.

---

## WHAT TO VERIFY AFTER IMPLEMENTATION

Run through this checklist:

1. `npm start` — no compile errors
2. Navigate to `/en/knowledge-base` — hero + lanes render
3. Search "Byzantine" — results list appears with correct nodes
4. Click a Part card — Part landing renders with chapter grid
5. Click a Chapter card — Chapter reader renders with section list
6. Click a Section link — Section reader renders
7. Click `← Previous` / `Next →` — navigation moves correctly
8. Switch language to `/fa/knowledge-base` — Persian titles, RTL layout
9. Check browser DevTools → Sources for `<script type="application/ld+json">`
   in `<head>` — should show Schema.org Book/Chapter/Article graph
10. Validate at https://validator.schema.org/ using the page URL
11. Resize to 768px — refine rail moves above content, reader collapses to
    single column
12. `npm test` — no regressions in existing test suite

---

## WHAT NOT TO TOUCH

- `src/data/copy.js` — only ADD keys, never rename or remove existing ones
- `src/components/Header.js` — only ADD a nav link entry
- `src/context/LanguageContext.js` — do not modify
- `src/styles/tokens.css` — do not modify; the KB module extends it, not changes it
- `vercel.json` — React Router handles all KB subroutes via the existing
  catch-all to `/index.html`; no changes needed

---

## FUTURE WORKSTREAMS (out of scope for this PR)

These are noted for backlog awareness only:

1. **Content pipeline** — the section reader currently shows a placeholder for
   actual content. Real content will be injected via a LaTeX→HTML render
   pipeline or a static content injection step (see implementation plan §4.1).

2. **Carousel for Perusal — "Continue reading"** — requires localStorage
   persistence of visited nodes (follow the existing Fact Engine pattern in
   `src/FactEngine.js` for the localStorage contract).

3. **Artifact library** — the second content library (50+ Claude artifact links).
   When ready, it uses the same `DocumentCard` and `CarouselLane` components
   with a separate data source in `src/data/artifacts.js`.

4. **Diagram viewer integration** — the existing `DiagramViewer` component
   (`src/components/DiagramViewer.js`) should be imported into section pages
   when diagram data becomes available.

5. **JSON-LD site-level injection** — add a single call to `buildIndexGraph`
   in `AppShell`/`App.js` for the `WebSite` + `SearchAction` block. This
   should only fire on the KB index page, not globally.