# Target Architecture — the Replacement for the Flawed Structures

**Ghost Autonomy website · July 22, 2026 · design specification (planning document — no code changed yet)**
**Replaces:** the architectures behind audit findings F1–F9 (asset layer) and C1–C12 (codebase layer), `2026-07-22_asset-architecture-audit.md`.

The audit found twenty-one flaws, but they do not require twenty-one fixes. They are symptoms of six missing *systems*. This specification defines those six systems — each with its components, their subcomponents, the record schemas they carry, the data flow between them, and the migration path from the current state. The organizing principle throughout: **one definition, many renderings** — every fact about the site (a page, a document, an instrument, the contact identity) is declared exactly once, in a registry, and every surface that displays it is a renderer of that registry.

---

## System 1 · The Content Registry Layer

*Retires: F5 (five page lists; dual paper metadata; instruments defined three times), F6 (contact hardcoded fifteen times), and the drift class as a whole.*

The registry layer is a set of small data modules under `src/registry/`. Components render from them and never carry their own copies of shared facts.

**1.1 · `registry/site.js` — the identity module.**
Subcomponents (exported constants):
- `CONTACT` — `{ email: 'dirbaz.sharif@gmail.com', phone: '+1-312-925-5930', phoneHref: 'tel:+13129255930', mailtoHref: 'mailto:…' }`. The sole-legitimate-contact rule becomes structural: Footer, Careers, Contact, Legal, Bio, and JSON-LD all import `CONTACT`; a change is one edit, and a grep for the literal outside this file becomes a CI failure (System 6).
- `ORG` — name, tagline (EN/FA), founder name, LinkedIn.
- `DEPLOY` — `BASE_URL` resolution (env-first), og-image path.

**1.2 · `registry/nav.js` — the navigation registry** (evolution of the existing `navConfig.js`).
Subcomponents:
- `NAV_GROUPS` — the three groups with per-link `{ key, labelKey, to, iconKey, descKey, surfaces }`, where `surfaces` marks membership: `['mega','topbar','commandbar','search','footer']`. One record; each menu filters by its surface tag.
- Selector functions — `getNavGroups(lang)`, `getFlatPages(lang)`, `getCommandEntries(lang)`, `getFooterPages(lang)`. CommandBar, SearchOverlay, and Footer delete their private lists (today: 19, 20, and 10 hand-kept paths) and call selectors. A menu can no longer drift because there is nothing left in it to drift.

**1.3 · `registry/documents.js` — the canonical document record.**
One record per published document; schema:
```js
{
  slug: 'climate-policy-benefit-distribution',
  file: '/docs/pdf/Climate_Policy_Benefit_Distribution.pdf',
  cover: '/covers/Climate_Policy_Benefit_Distribution.png',
  title: { en, fa }, description: { en, fa },
  year: 2026, pages: 53, sizeKB: 1966,
  status: 'READY' | 'QUEUED' | 'GATED',      // GATED = trade-secret class, never rendered
  shelves: ['library:foundational', 'bio:publications'],   // every surface that shows it
  tags: [...], priority: n,
}
```
The Technical Library renders records whose `shelves` include a `library:*` tag; the Bio Publications tab renders `bio:publications`. The same paper can appear on both surfaces while existing exactly once — the F5 dual-metadata flaw and the F2 "which copy is canonical" question both become unrepresentable. `libraryAssets.js` (1,380 lines) dissolves into this registry plus a thin category manifest.

**1.4 · `registry/instruments.js` — the instrument record** (evolution of `majorWorks.js`).
Schema: `{ key, wing: 'simulation'|'memory'|'exhibition'|'mas', file, route, view, themeAware: true, capture, title: {en,fa}, line: {en,fa}, artifactSlug? }`. Consumed by four renderers: the wing pages (their INSTRUMENTS arrays delete), the front-hall carousel, the command palette's deep links, and the artifact gallery. The memory instruments' current triple definition collapses to one.

**Data flow (the whole layer):**
```
registry/site.js ─┐
registry/nav.js ──┼──► selectors ──► renderers (Header, TopNavBar, CommandBar,
registry/documents┤                   SearchOverlay, Footer, Library, Publications,
registry/instruments┘                 wings, carousel, JSON-LD)
```
Renderers own presentation only. Registries own facts only. Nothing else holds either.

## System 2 · The Asset Store

*Retires: F1 (same surface, different stores), F2 (four parallel stores, duplicate CV/paper), F3 (39 spaced filenames), F4 (personal records in public), F7 (orphans).*

A written filesystem law, enforced by System 6:

```
public/
├── favicon.ico  index.html  manifest.json  robots.txt        ← the root holds ONLY
│   sitemap.xml  logo192.png  logo512.png  og-image.png          these conventional files
├── docs/
│   ├── pdf/        ← every document the site serves (papers, CV, synopses)
│   ├── html/       ← every embedded instrument (memory/, simulation/ sub-wings)
│   ├── svg/        ← plates and figures
│   └── md/         ← markdown documents
├── covers/         ← generated covers only (1 per docs/pdf entry, same basename)
├── media/
│   ├── founder/    ← identity imagery (avatar, album/)
│   └── posters/    ← artwork (EPU poster)
├── library/        ← the 60-document raw archive (grandfathered names; every NEW
│                      file obeys the naming law; renames ship with a redirect map)
└── exhibition/     ← the built sub-app bundle
```
Subcomponents of the law: the **naming rule** (`Snake_Case`, no spaces, no hash suffixes, extension truthful to format); the **placement rule** (a new asset goes where its siblings of the same type live — the exact check that was missed); the **privacy tier** — transcripts, recommendation letters, and the contacts file leave `public/` for the already-gitignored `private-not-served/` unless you decide they stay public (F4, your call); the **canonical-copy rule** — one file per document, the registry's `file` field is the address, and the Bio's nine root documents migrate into `docs/pdf/` with their references updated.

## System 3 · The View Layer

*Retires: C1 (two design systems), C4 (122 inline styles), C5 (viewer copy-pasted five times), C9 (inconsistent sandboxing).*

**3.1 · `<InstrumentViewer>` — the one viewer.**
Subcomponents:
- `ViewerToolbar` — left slot: the switcher (tab buttons or any children); right slot: standardized actions rendered from props — `enterTo` ("Enter the … Bench ↗", router Link), `openFull` (theme-synced href, `_blank` + noopener), optional `artifactTo`.
- `ViewerFrame` — the `bp-frame` wrapper; the theme-synced `src` builder (`?`/`&` separator-aware, `theme=` appended when the record says `themeAware`); the boot poster (`capture` as background until the document paints); the failure state (the Final Plate's "plate queued" pattern, generalized — every embed gets it, not one); the **sandbox policy encoded once**: same-origin instrument → `sandbox="allow-scripts allow-same-origin"`, srcdoc document → the ArtifactViewer's existing profile, external origin → refuse to render (none exist today; the policy makes that a decision, not an accident).
- `ViewerCaption` — optional `bp-figcaption` line.
Props table: `{ src, themeAware, title, height = 'clamp(440px,72vh,860px)', capture, enterTo, artifactTo, caption, children }`. The five current copies (Simulation, MemoryWing, Technology, Exhibition, MAS) become five one-line instantiations; behavioral drift between them becomes impossible.

**3.2 · The style discipline.**
The 122 inline `style={{}}` blocks resolve into blueprint utility classes appended to `blueprint.css`: `.bp-toolbar` (the flex header row every page hand-writes), `.bp-actions` (the button cluster), `.bp-section-tight`, `.bp-center-cta`. Rule going forward: inline styles are permitted only for values that are genuinely per-datum (a width percentage from data, a color from a record); layout and spacing belong to the sheet. System 6 ratchets the count downward.

**3.3 · The Bio design-system decision (yours).**
Two admissible architectures, both specified: **(a) Unification** — the five neu-* files are re-clothed in blueprint (cards → `bp-frame`, gradients → paper, utility classes → blueprint utilities); one system remains; 1–2 days, visible change. **(b) Chartered annex** — the Bio family is formally declared a personal annex with its own sub-system, but its tokens are re-based onto blueprint variables (`--neu-surface: var(--bp-paper-raised)` …) so light/dark and palette changes propagate from one place; half a day, look preserved, the flaw reduced from "two systems" to "one system, two skins." Recommendation: (b) now, (a) when the Bio next gets substantive content work.

## System 4 · The Routing & i18n Core

*Retires: C2 (route table ×2), C3 (333 inline ternaries beside copy.js), C11 (client-only redirects), C12 (titles-only metadata).*

**4.1 · The single route tree.**
One route table, one rendering:
```js
// registry/routes.js — schema per record:
{ path: 'technology', page: Technology, title: {en,fa}, desc: {en,fa}, chrome: true }

// App.js — rendered ONCE:
<Route path="/:lang/*" element={<LangShell/>}>   // LangShell validates :lang ∈ {en,fa},
  {ROUTES.map(r => <Route path={r.path} … />)}    // redirects unknown langs, sets dir/lang
</Route>
```
Subcomponents: `LangShell` (language guard + `<html lang dir>` management + the providers that today wrap the duplicated trees); `PageMeta` (per-route `document.title` *and* meta description *and* og tags from the route record — C12 falls out for free); the legacy-path map (`/science → /technology`) declared in the same file. The 52 hand-written route lines become one table of ~20 records; PAGE_TITLES is absorbed and deleted.

**4.2 · Edge redirects.** `vercel.json` gains `redirects: [{ source: "/:lang/science", destination: "/:lang/technology", permanent: true }]` — crawlers and bookmarks get a 308, and the in-app `<Navigate>` remains as defense in depth.

**4.3 · i18n consolidation protocol.** `copy.js` becomes per-page namespaces (already largely true); the 333 inline ternaries migrate into them **progressively** under a ratchet (System 6 fails CI if the count *rises*; each touched file must lower it). New rule: a component may read `t.*`; it may not contain a `lang === ` expression except for direction/formatting logic. The migration is background discipline over several sessions, newest pages first, not one heroic rewrite — heroic rewrites of 333 strings are how translations silently break.

## System 5 · Client Platform Services

*Retires: C10 (ad-hoc localStorage ×7), C7 (zero code-splitting) — and hardens the storage-dependent features (theme, consent, facts, cart).*

**5.1 · `lib/storage.js` — the storage service.**
Subcomponents: the namespace scheme (`ga.v1.<domain>.<key>` — e.g. `ga.v1.theme.preferred`, `ga.v1.consent.analytics`); `get/set/remove` with try/catch (private-mode Safari never crashes a feature again); a `migrate()` hook that renames legacy keys (`preferred-theme` → namespaced) exactly once on boot, so today's stored users lose nothing. The seven consumers (ThemeContext, CookieBanner, FactPanel, SavedFactsBoard, CartContext, Legal, App) each shrink to one-line calls.

**5.2 · Route-level code-splitting.**
Because System 4 gives a single route table, splitting is one mechanical change: `page: lazy(() => import('../pages/Technology'))` per record, one `<Suspense>` with a blueprint skeleton fallback in `LangShell`. The heavy data modules (`libraryAssets`/`documents`, `diagrams`, `knowledgeBase`) move behind the pages that use them via the same dynamic imports, so the home page stops paying for the library's 1,380 lines. Measured target: first-load JS for `/` cut by roughly half; verified against build output before/after.

**5.3 · Content externalization (C8, scheduled, not urgent).** The registry schemas in System 1 are deliberately JSON-serializable; when the data files next grow, they lift out of `src/` into `public/content/*.json` fetched at page level (or build-time imported), turning content edits into data edits. The schema work in System 1 is what makes this a lift, not a rewrite.

## System 6 · The Verification Harness

*Retires: F9 (no machine watching) — and stands guard over Systems 1–5.*

Components, each a small script in `scripts/`, all wired into `ci.yml` beside the existing build/test/exhibition-clean/verifyNav gates:
- **6.1 `verifyAssets.js`** — two-way reference check: every path referenced in `src/` + registries + `public/library/manifest.json` must exist in `public/`; every shipped file must be referenced or on the named exemption list (conventional root files, archive tree). The class that produced the poster 404 and the Partners orphan dies here.
- **6.2 `verifyRegistry.js`** — schema validation for Systems 1's registries: slugs unique; every `file` and `cover` exists; every GATED record has a reason; every route record has both titles and descriptions; `surfaces` tags valid.
- **6.3 The ratchets** — a checked-in `quality-budget.json` holding the current counts (inline styles: 122; inline lang ternaries: 333; unsandboxed iframes: 8). CI fails any PR that raises a number; lowering it updates the budget. Debt can only shrink.
- **6.4 `verifyNav.js`** — already live; absorbed into this family unchanged.

---

## Migration sequencing (the order is load-bearing)

**Wave 1 — guards first** (System 6.1–6.2 skeleton): put the watchers in place *before* moving anything, so every subsequent wave is machine-checked. Small.
**Wave 2 — registries** (System 1): site.js, nav selectors, documents.js, instruments.js; renderers repointed one at a time, verified after each. This wave deletes the most duplication for the least risk — data moves, no URLs change.
**Wave 3 — asset store** (System 2): root-document migration + de-duplication + rename sweep with redirect map; your F4 privacy decision gates the transcripts/letters portion. Verified by 6.1 before and after.
**Wave 4 — view layer** (System 3): InstrumentViewer extraction, five instantiations, style-utility sweep of the worst files; Bio decision (a) or (b) executed.
**Wave 5 — routing core** (System 4): the `/:lang/*` tree + PageMeta + edge redirects, smoke-tested across all pages in both languages, both themes — the highest-blast-radius wave, done once the guards and registries make it mechanical.
**Wave 6 — platform services** (System 5): storage service with key migration, then route-level lazy() — measured, not assumed.
**Invariants held through every wave:** every URL keeps working (renames ship redirects); the visual identity does not change except where you choose (3.3); the all-live doctrine, the standings discipline, and the sole-contact rule are untouched; nothing reaches the live site until you push.

*Approve the specification — or amend any system — and Wave 1 begins on your word.*
