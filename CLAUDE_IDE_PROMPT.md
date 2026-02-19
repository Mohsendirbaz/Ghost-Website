# Ghost Autonomy Website — Structural Remediation Prompt

> **Context**: You are working on the Ghost Autonomy corporate website, a bilingual (English/Persian) React 19 SPA deployed on Vercel. A formal UX/accessibility audit has identified seven categories of structural deficiency. Your task is to remediate each one while preserving the existing design system, component architecture, and bilingual content pipeline.

---

## Project Orientation

Before making any changes, familiarise yourself with the codebase:

```
ghost-autonomy-website/
├── src/
│   ├── App.js                    # Root: routing + LangSync
│   ├── context/LanguageContext.js # Language state, cookie, dir/lang on <html>
│   ├── data/copy.js              # ALL content & translations (single source of truth)
│   ├── components/
│   │   ├── Header.js / .css      # Fixed header + MegaMenuPanel (hamburger-style)
│   │   ├── Footer.js / .css      # Dark footer with icon-only nav grid
│   │   ├── Hero.js / .css
│   │   ├── SectionBlock.js / .css
│   │   └── CTABand.js / .css
│   ├── pages/                    # One component per route
│   └── styles/
│       ├── tokens.css            # Design tokens (--color-*, --space-*, --text-*)
│       └── global.css            # Resets + utilities
├── vercel.json
└── package.json
```

**Tech stack**: React 19, React Router DOM 7, plain CSS with custom properties (no CSS-in-JS), Inter + Vazirmatn fonts, Create React App 5, Vercel static deployment. No CMS, no database, no API calls.

**Key constraint**: All content lives in `src/data/copy.js` under `en` and `fa` keys. Every new user-facing string must be added to both language objects.

---

## Deficiencies and Required Remediations

### 1. Hidden Navigation → Visible Primary Nav Bar

**Current state**: The header (`src/components/Header.js`) shows only a logo, language button, "Contact" CTA, and a "Menu" button. All navigation is hidden behind a hamburger-triggered `MegaMenuPanel` that overlays the page — inappropriate for desktop viewports where space is abundant.

**Required changes**:

1. **Add a persistent horizontal nav bar** visible on viewports ≥ 900 px. Display the top-level section links (Technology, Science, Safety, Partners, Company) as inline text links in the header, between the logo and the actions cluster.
2. **Retain the mega-menu for deeper navigation** (Research, Resources sub-groups) but trigger it from a clearly labelled dropdown, not as the sole navigation mechanism.
3. **Collapse to the current hamburger pattern only below 900 px** (mobile/tablet). The `@media (max-width: 900px)` breakpoint already exists in `Header.css`.
4. **Preserve the existing `navGroups` data structure** in `Header.js` — derive the visible top-level links from it rather than duplicating data.

**Files to modify**: `src/components/Header.js`, `src/components/Header.css`. Add new copy keys to `src/data/copy.js` only if new labels are needed.

---

### 2. Breadcrumb Navigation and Orientation

**Current state**: There is no persistent breadcrumb trail on any page. The mega-menu highlights the active page with an orange background, but once a visitor navigates to a page, there are no positional cues within the site hierarchy.

**Required changes**:

1. **Create a `Breadcrumb` component** (`src/components/Breadcrumb.js` / `.css`). It should accept a `crumbs` array of `{ label, to }` objects and render a horizontal trail with `›` separators. Use `aria-label="Breadcrumb"` and `<nav>` semantics, with the final item marked `aria-current="page"`.
2. **Integrate breadcrumbs into every page component** beneath the header (inside `<main>`). The Knowledge Base reader (`KnowledgeBaseReader.js`) already has breadcrumbs — reuse or normalise that pattern.
3. **Support RTL**: Use CSS logical properties; the separator should flip direction via `[dir="rtl"]` styling.
4. **Add breadcrumb labels** to `copy.js` for both languages (e.g., `breadcrumb.home`, `breadcrumb.technology`, etc.).

**Files to create**: `src/components/Breadcrumb.js`, `src/components/Breadcrumb.css`.
**Files to modify**: Every page in `src/pages/`, `src/data/copy.js`.

---

### 3. Language Switching and Multilingual Structure

**Current state**: English and Persian share the same URL (`/en/…` vs `/fa/…` are client-side only). There are no `<link rel="alternate" hreflang="…">` tags. The language toggle's position shifts between EN and FA views. Some UI strings (button labels, the close icon label) remain untranslated in Persian mode.

**Required changes**:

1. **Add `hreflang` annotations**: In `public/index.html` or dynamically via a `useEffect` in `App.js`, inject `<link rel="alternate" hreflang="en" href="https://ghost-website-kappa.vercel.app/en/…">` and the equivalent `fa` link for every route. Also add `x-default` pointing to `/en`.
2. **Stabilise language toggle position**: The toggle button in the header (`header__lang-btn`) and footer (`footer__lang-btn`) must occupy the same DOM position and visual location regardless of active language. Audit the flex order in `Header.css` and `Footer.css`; use `order` properties if needed so the button doesn't shift.
3. **Audit untranslated strings**: Search `Header.js` and `Footer.js` for any hardcoded English strings (e.g., the `'Close'` / `'Menu'` labels inside the menu button). All must route through `copy[lang]`. Create missing keys in `copy.js` for both `en` and `fa`.
4. **Ensure the toggle label shows the *target* language in that language's script** (i.e., when in English mode the button reads `فارسی`; when in Persian mode it reads `English`). Verify this is consistently implemented — currently it is in the nav copy but verify runtime rendering.

**Files to modify**: `src/App.js` (hreflang injection), `src/components/Header.js`, `src/components/Footer.js`, `src/data/copy.js`.

---

### 4. Footer Accessibility — Labels on Icons

**Current state**: The footer (`src/components/Footer.js`) renders a grid of icon-only links (`footer__icon-nav`). Each link is a 36×36 px square with an SVG icon and a CSS tooltip on hover (`::after` with `data-tooltip`). There are no visible text labels, and the tooltip is not accessible to screen readers or keyboard/touch users.

**Required changes**:

1. **Add visible text labels beneath or beside each icon**. Convert the icon grid into a two-column link list (icon + text) or a labelled icon grid. Each `<Link>` should contain both the SVG and a `<span>` with the page name drawn from `copy[lang].nav`.
2. **Retain `aria-label`** on each link as a fallback, using the same translated string.
3. **Remove reliance on `::after` tooltip** as the sole label mechanism.
4. **Maintain the dark-background footer aesthetic** — use `rgba(255,255,255,0.7)` for text, matching existing `footer__lang-btn` styling.

**Files to modify**: `src/components/Footer.js`, `src/components/Footer.css`.

---

### 5. Site Search

**Current state**: Despite hosting a Knowledge Base (8 parts, 47 chapters) and a document archive (1,751 items), the site has no global search function. The Knowledge Base browse page has its own local search, but no site-wide search is available from the header.

**Required changes**:

1. **Add a search input to the header**, visible on desktop (≥ 900 px), collapsed to an icon trigger on mobile. Place it between the nav links and the actions cluster.
2. **Implement client-side search** over the `copy.js` page content and the `knowledgeBase.js` data model. Use a simple substring/fuzzy match — no backend needed. Return results grouped by type (Pages, Knowledge Base chapters).
3. **Add a `SearchOverlay` component** that renders results in a dropdown panel below the search input, with keyboard navigation (arrow keys, Enter to select, Escape to close).
4. **Add bilingual placeholder text** to `copy.js` (e.g., `searchPlaceholder: "Search…"` / `"جستجو…"`).

**Files to create**: `src/components/SearchOverlay.js`, `src/components/SearchOverlay.css`.
**Files to modify**: `src/components/Header.js`, `src/components/Header.css`, `src/data/copy.js`.

---

### 6. Information Architecture — Task-Oriented Grouping

**Current state**: The mega-menu groups pages under "Company", "Research", and "Resources" — categories that reflect internal organisational divisions rather than visitor intent (e.g., "learn about the technology", "read technical documentation", "contact the team").

**Required changes**:

1. **Restructure `navGroups` in `Header.js`** into task-oriented clusters. Proposed grouping:
   - **Explore** — Home, Technology, Science, Safety (visitors learning about the product)
   - **Learn** — Knowledge Base, Architecture, Perspective, Artifacts (deep-dive content)
   - **Connect** — Company, Partners, Contact (relationship-oriented)
   - **Library** — Document Archive, Library Assets (reference material)
2. **Separate action items** (e.g., "Request Information", "Contact") from informational categories. The "Contact" CTA already exists in the header actions — remove the duplicate from the mega-menu's informational grouping, or clearly demarcate it as an action.
3. **Update group labels in `copy.js`** for both languages.
4. **Do not rename URLs or page components** — only the navigation grouping and labels change.

**Files to modify**: `src/components/Header.js`, `src/data/copy.js`.

---

### 7. Accessibility Baseline

**Current state**: No skip-link, inconsistent button contrast, potential keyboard-navigation gaps in the mega-menu.

**Required changes**:

1. **Add a skip-link**: Insert a visually-hidden-but-focusable `<a href="#main-content">Skip to main content</a>` as the first child of `<body>` (or the App root). Every page's `<main>` already carries `id="main-content"`. Style it to become visible on `:focus`.
2. **Keyboard operability audit on the mega-menu**: Verify that Tab moves through mega-menu items when open, that Enter/Space activates links, and that Escape closes the panel. The `handleKeyDown` for Escape already exists in `Header.js` — extend it to trap focus within the open panel using a focus-trap pattern.
3. **Button contrast audit**: The outline-style CTAs (light border on white background) should meet WCAG 2.1 AA contrast ratio (≥ 4.5:1 for text, ≥ 3:1 for large text/UI components). Audit `--color-primary` (#FF6B35) against white — it passes for large text but may fail for small text. Adjust the outline button text to use `--color-text-primary` (#1A1D23) or darken the orange.
4. **Add `aria-current="page"` to the active nav link** in both the header and footer navigation.

**Files to modify**: `src/App.js` or `src/index.js` (skip-link), `src/components/Header.js`, `src/components/Header.css`, `src/styles/global.css`.

---

## Implementation Constraints

1. **No new dependencies** unless strictly necessary. Prefer vanilla implementations over npm packages for skip-links, breadcrumbs, and search. The existing stack has zero runtime dependencies beyond React and React Router — keep it that way.
2. **CSS custom properties only** — no Tailwind, no CSS-in-JS. All new styles must use the tokens defined in `src/styles/tokens.css`.
3. **Bilingual parity**: Every new string must exist in both `copy.en` and `copy.fa` inside `src/data/copy.js`. Every new layout must work in both LTR and RTL. Use CSS logical properties exclusively.
4. **No breaking changes to existing routes or URLs**. The `vercel.json` rewrite rules and the route table in `App.js` must remain stable.
5. **Component naming convention**: PascalCase files in `src/components/`, each with a co-located `.css` file. Follow the existing pattern (e.g., `Header.js` / `Header.css`).
6. **Test each change** by running `npm start` and verifying in both `/en` and `/fa` views at desktop (≥ 1200 px), tablet (768–900 px), and mobile (< 768 px) widths.

---

## Execution Order

Implement in this sequence to minimise merge conflicts and allow incremental verification:

1. **Skip-link + `aria-current`** (smallest change, immediate accessibility win)
2. **Breadcrumb component** (new component, no modifications to existing ones)
3. **Visible primary nav bar** (Header refactor — largest change)
4. **Footer labels** (Footer refactor)
5. **Language switching fixes** (hreflang tags, toggle position, string audit)
6. **Nav group restructuring** (data-only change in Header.js + copy.js)
7. **Site search** (new component, Header integration)

After each step, run the app in both languages and at all three breakpoints to confirm no regressions.

---

## Acceptance Criteria

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| 1 | Primary nav links visible on desktop without opening a menu | Visual inspection at ≥ 900 px |
| 2 | Breadcrumb trail displayed on every page below the header | Navigate to any page; confirm trail |
| 3 | `hreflang` tags present in rendered HTML for both `en` and `fa` | View page source or DevTools `<head>` |
| 4 | Language toggle occupies the same visual position in both languages | Switch languages; compare layout |
| 5 | All UI strings translated in Persian mode (no stray English labels) | Full walkthrough in `/fa` |
| 6 | Footer links display visible text labels alongside icons | Visual inspection of footer |
| 7 | Site search accessible from header; returns results from pages and KB | Type a query; verify results |
| 8 | Skip-link appears on Tab press and jumps to `#main-content` | Press Tab on page load |
| 9 | Mega-menu fully keyboard-navigable with focus trap | Tab through open menu; Escape closes |
| 10 | All CTA buttons pass WCAG 2.1 AA contrast ratio | Run axe or Lighthouse accessibility audit |
