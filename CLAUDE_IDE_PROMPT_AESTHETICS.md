
# Ghost Autonomy Website — Aesthetic Enhancement & Adaptive Device Prompt

> **Context**: You are working on the Ghost Autonomy corporate website, a bilingual (English/Persian) React 19 SPA. The site currently uses a single responsive breakpoint at `max-width: 768px` with a secondary cut at `900px` for the header. This is insufficient — layouts break or waste space across the real-world device spectrum (iPhone SE through 16 Pro Max, iPad Mini through iPad Pro 12.9", MacBook Air through external 5K displays). This prompt defines a systematic enhancement of the visual design system, typographic scale, spatial rhythm, and component layouts to deliver a polished, device-aware experience without introducing new dependencies.

---

## 1. Project Orientation

```
ghost-autonomy-website/
├── src/
│   ├── styles/
│   │   ├── tokens.css            # Design tokens: colors, spacing, typography, shadows, container
│   │   └── global.css            # Resets, .container, .btn variants, section headers, skip-link
│   ├── components/
│   │   ├── Header.js / .css      # Fixed header (72px), mega-menu, lang toggle
│   │   ├── Footer.js / .css      # Dark footer, icon grid, 3-column layout
│   │   ├── Hero.js / .css        # Full-width hero (min-height: 620px), orb FX, gradient BG
│   │   ├── SectionBlock.js / .css # Two-column text+visual sections
│   │   ├── CTABand.js / .css     # Full-width call-to-action strips
│   │   ├── ThreePillars.js / .css # 3-column feature cards
│   │   ├── FAQAccordion.js / .css
│   │   ├── AbstractVisual.js / .css  # Inline SVGs (max-width: 440px)
│   │   ├── DiagramViewer.js / .css
│   │   └── DiagramGallery.js / .css
│   ├── pages/
│   │   ├── Page.css              # Shared page-level styles
│   │   ├── Home.js, Technology.js, Science.js, Safety.js, etc.
│   │   ├── KnowledgeBase.js      # Browse page with carousel lanes
│   │   ├── KnowledgeBaseReader.js # 3-column reader (TOC | content | aside)
│   │   ├── MultiAgentSystem.js / .css
│   │   └── LibraryAssets.js / .css
│   └── data/copy.js              # All content, bilingual
├── public/
└── vercel.json
```

**Tech stack**: React 19, React Router DOM 7, plain CSS with custom properties, Inter + Vazirmatn fonts, CRA 5, Vercel. Zero runtime CSS dependencies.

**Current design tokens** (in `src/styles/tokens.css`):
- Spacing: 8px base grid (`--space-1` through `--space-16`)
- Typography: modular scale from `--text-xs` (0.75rem) to `--text-5xl` (3.815rem), all fixed `rem` values
- Container: `--container-max: 1440px`, `--container-padding: var(--space-6)` → `var(--space-2)` below 768px
- Shadows: `--shadow-sm` through `--shadow-xl`, fixed `rgba` values
- Transitions: `--transition-fast` (150ms), `--transition-base` (250ms), `--transition-slow` (350ms)
- Single responsive override: `@media (max-width: 768px)` reduces container padding

**Current breakpoint usage across the codebase**:
- `768px` — used by: `tokens.css`, `global.css`, `Footer.css`, `Hero.css`, `knowledgeBase.css`, `DiagramViewer.css`, `DiagramGallery.css`, `LibraryAssets.css`, `MultiAgentSystem.css`
- `900px` — used by: `Header.css` (mega-menu collapse), `SectionBlock.css` (grid collapse), `ThreePillars.css` (grid collapse)
- `1024px` — used by: `knowledgeBase.css` (hide aside), `DiagramGallery.css` (sidebar shrink)
- `1100px` — used by: `Knowledgebase.css` (hide aside)
- `480px` — used by: `knowledgeBase.css` only (single column parts)

---

## 2. Target Device Matrix

All changes must be tested against these reference viewports. The breakpoints below are derived from actual device dimensions, not arbitrary pixel values.

| Tier | Canonical Device | Viewport | Pixel Ratio | Aspect Ratio | Key Concern |
|------|-----------------|-----------|-------------|--------------|-------------|
| **XS** | iPhone SE (3rd gen) | 375 × 667 | 2× | ~9:16 | Touch targets ≥ 44px, single-column everything |
| **SM** | iPhone 15 / 16 | 393 × 852 | 3× | ~9:19.5 | Tall-narrow viewport, safe area insets, Dynamic Island |
| **SM-Max** | iPhone 16 Pro Max | 430 × 932 | 3× | ~9:20 | Slightly wider phone, still single-column |
| **MD** | iPad Mini (6th gen) | 744 × 1133 | 2× | ~2:3 | First two-column candidate, portrait |
| **MD-L** | iPad Air / 10.9" | 820 × 1180 | 2× | ~2:3 | Comfortable two-column, Split View |
| **LG** | iPad Pro 11" (landscape) | 1194 × 834 | 2× | ~3:2 | Landscape tablet = laptop-like |
| **LG-XL** | iPad Pro 12.9" | 1024 × 1366 | 2× | ~3:4 | Large portrait tablet |
| **XL** | MacBook Air 13" | 1440 × 900 | 2× | 16:10 | Default laptop, current `--container-max` |
| **XXL** | External 27" | 2560 × 1440 | 1–2× | 16:9 | Wide desktop, content must not float in whitespace |

---

## 3. Breakpoint Architecture

Replace the current ad-hoc breakpoint usage with a unified, named tier system. Define these as CSS custom media queries conceptually (CRA doesn't support `@custom-media`, so use comment-documented `@media` blocks).

**Add the following breakpoint reference to the top of `tokens.css` as a comment block, then use consistently across all stylesheets**:

```css
/*
 * BREAKPOINT SYSTEM (min-width, mobile-first)
 * ──────────────────────────────────────────────
 * --bp-sm:   480px   (large phones, landscape phones)
 * --bp-md:   744px   (iPad Mini portrait — first 2-col)
 * --bp-lg:   1024px  (iPad landscape / small laptop)
 * --bp-xl:   1440px  (default laptop / container-max)
 * --bp-xxl:  1920px  (large desktop / external monitor)
 *
 * USAGE: @media (min-width: 744px) { ... }
 * All component CSS should be authored MOBILE-FIRST.
 */
```

### Migration requirement

The current stylesheets mix `max-width` (desktop-first) breakpoints. **Refactor all component CSS files to mobile-first (`min-width`)** using this mapping:

| Current (max-width) | Replace with (min-width) | Rationale |
|---------------------|--------------------------|-----------|
| `max-width: 480px` | Base styles (no query) | Mobile is default |
| `max-width: 768px` | `min-width: 744px` for enhancement | Aligns with iPad Mini |
| `max-width: 900px` | `min-width: 744px` or `min-width: 1024px` | Context-dependent |
| `max-width: 1024px` | `min-width: 1024px` | iPad landscape / laptop |
| `max-width: 1100px` | `min-width: 1024px` | Consolidate with above |

**Files requiring breakpoint refactoring**: `tokens.css`, `global.css`, `Header.css`, `Footer.css`, `Hero.css`, `SectionBlock.css`, `ThreePillars.css`, `CTABand.css`, `knowledgeBase.css`, `Knowledgebase.css`, `DiagramViewer.css`, `DiagramGallery.css`, `LibraryAssets.css`, `MultiAgentSystem.css`, `Page.css`.

---

## 4. Fluid Typography

The current type scale uses fixed `rem` values that jump abruptly at breakpoints. Replace with CSS `clamp()` functions that interpolate smoothly between the smallest and largest viewports.

**Replace the typography tokens in `tokens.css`**:

```css
:root {
  /* Fluid type scale: clamp(min, preferred, max)
     Preferred uses viewport-relative units for smooth scaling.
     Min = value at 375px viewport, Max = value at 1440px viewport. */
  --text-xs:   clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);      /* 11–12px */
  --text-sm:   clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);     /* 13–14px */
  --text-base: clamp(0.9375rem, 0.88rem + 0.25vw, 1rem);         /* 15–16px */
  --text-lg:   clamp(1.0625rem, 0.95rem + 0.5vw, 1.25rem);       /* 17–20px */
  --text-xl:   clamp(1.25rem, 1.05rem + 0.85vw, 1.563rem);       /* 20–25px */
  --text-2xl:  clamp(1.5rem, 1.15rem + 1.5vw, 1.953rem);         /* 24–31px */
  --text-3xl:  clamp(1.75rem, 1.2rem + 2.3vw, 2.441rem);         /* 28–39px */
  --text-4xl:  clamp(2rem, 1.2rem + 3.4vw, 3.052rem);            /* 32–49px */
  --text-5xl:  clamp(2.25rem, 1.1rem + 4.8vw, 3.815rem);         /* 36–61px */
}
```

**Validation**: At 375px the hero `h1` (using `--text-4xl`) should render at ~32px. At 1440px it should render at ~49px. Between these points it interpolates linearly. Verify with DevTools computed styles at multiple viewport widths.

**Persian-specific adjustment**: Vazirmatn renders slightly larger at the same point size as Inter. Add a scaling factor for Persian to prevent text overflow:

```css
[lang="fa"] {
  --text-scale-adjust: 0.94;
}

[lang="fa"] .hero__h1,
[lang="fa"] .section-title,
[lang="fa"] .pillar-card__title {
  font-size: calc(var(--text-4xl) * var(--text-scale-adjust, 1));
}
```

---

## 5. Fluid Spacing

The fixed 8px grid works well but creates jarring jumps when padding/margin switches from `--space-6` (48px) to `--space-2` (16px) at a single breakpoint. Introduce fluid variants for the most layout-critical spacing tokens.

**Add to `tokens.css`**:

```css
:root {
  /* Fluid spacing for section padding and container gutters */
  --space-fluid-sm: clamp(var(--space-1), 1vw + 4px, var(--space-2));       /* 8–16px */
  --space-fluid-md: clamp(var(--space-2), 2vw + 8px, var(--space-4));       /* 16–32px */
  --space-fluid-lg: clamp(var(--space-4), 4vw + 8px, var(--space-8));       /* 32–64px */
  --space-fluid-xl: clamp(var(--space-6), 6vw + 8px, var(--space-12));      /* 48–96px */
  
  /* Fluid container padding (replaces the hard 768px toggle) */
  --container-padding: clamp(var(--space-2), 3vw, var(--space-6));           /* 16–48px */
}
```

**Remove the `@media (max-width: 768px)` override** in `tokens.css` that currently snaps `--container-padding` from 48px to 16px. The `clamp()` definition above replaces it with smooth interpolation.

**Apply fluid spacing to section components**:
- `Hero.css`: Replace `padding-block: var(--space-16) var(--space-12)` → `padding-block: var(--space-fluid-xl)`
- `SectionBlock.css`: Replace `padding-block: var(--space-12)` → `padding-block: var(--space-fluid-xl)`
- `ThreePillars.css`: Replace `padding-block: var(--space-12)` → `padding-block: var(--space-fluid-xl)`
- `CTABand.css`: Apply `padding-block: var(--space-fluid-lg)` for band spacing
- `Footer.css`: Replace `padding-top: var(--space-10)` → `padding-top: var(--space-fluid-lg)`

---

## 6. Safe Area Insets (Notched Devices)

iPhones with the Dynamic Island and the home indicator bar clip content if `env(safe-area-inset-*)` is not respected.

**In `public/index.html`**, verify the viewport meta tag includes `viewport-fit=cover`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**In `global.css`**, add safe-area handling to the body and key fixed-position elements:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Fixed header must clear the status bar / Dynamic Island */
.header {
  top: env(safe-area-inset-top, 0px);
}

/* Page wrapper needs to account for the shifted header */
.page-wrapper {
  padding-top: calc(72px + env(safe-area-inset-top, 0px));
}

/* Footer CTA band — clear home indicator */
.footer__bottom {
  padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom, 0px));
}
```

---

## 7. Hero Section — Aspect-Ratio Adaptive Layout

The hero currently uses `min-height: 620px` (520px on mobile), which wastes space on tall-narrow phones and feels cramped on wide tablets.

**Replace fixed min-height with aspect-ratio-aware sizing**:

```css
.hero {
  /* Base: full viewport height minus header on phones */
  min-height: calc(100svh - 72px - env(safe-area-inset-top, 0px));
  min-height: min(calc(100svh - 72px), 800px); /* cap at 800px on tall screens */
  
  display: flex;
  align-items: center;
}

/* Tablet portrait: shorter hero, content doesn't need full screen */
@media (min-width: 744px) and (max-aspect-ratio: 3/4) {
  .hero {
    min-height: 60svh;
  }
}

/* Landscape tablets and laptops: constrained hero */
@media (min-width: 1024px) {
  .hero {
    min-height: clamp(520px, 55vh, 720px);
  }
}

/* Ultra-wide: cap height and center content */
@media (min-width: 1920px) {
  .hero {
    min-height: 600px;
    max-height: 720px;
  }
}
```

**Hero orb background effects**: The animated gradient orbs (`hero__orb--1`, `hero__orb--2`) use fixed pixel dimensions that overflow on small screens and look tiny on large ones. Make them viewport-relative:

```css
.hero__orb--1 {
  width: clamp(250px, 40vw, 600px);
  height: clamp(250px, 40vw, 600px);
}

.hero__orb--2 {
  width: clamp(200px, 35vw, 500px);
  height: clamp(200px, 35vw, 500px);
}
```

**Hero grid pattern**: The 60px fixed grid is too coarse on mobile. Make it fluid:

```css
.hero__grid {
  background-size: clamp(30px, 4vw, 60px) clamp(30px, 4vw, 60px);
}
```

---

## 8. SectionBlock — Adaptive Two-Column Layout

Currently collapses from 2 columns to 1 at `900px`. On iPad Mini portrait (744px) this forces single-column prematurely, and on iPad Pro landscape (1194px) the two columns are excessively wide.

**Replace the grid layout with a fluid, aspect-ratio-aware approach**:

```css
.section-block__inner {
  display: grid;
  grid-template-columns: 1fr;          /* Mobile-first: single column */
  gap: var(--space-fluid-md);
  align-items: center;
}

/* Two-column from iPad Mini portrait onward, but only if landscape-ish or wide enough */
@media (min-width: 744px) {
  .section-block__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-fluid-lg);
  }
}

/* Constrain max content width on ultra-wide */
@media (min-width: 1440px) {
  .section-block__inner {
    max-width: 1200px;
    margin-inline: auto;
  }
}
```

**Visual column sizing**: The `AbstractVisual` components are capped at `max-width: 440px`. On tablets this makes them look small in their grid cell. Make it responsive:

```css
.abstract-visual {
  width: 100%;
  max-width: clamp(280px, 30vw + 100px, 480px);
  aspect-ratio: 4 / 3;  /* Maintain consistent proportion */
  margin-inline: auto;
}
```

---

## 9. ThreePillars — Adaptive Column Count

Currently jumps from 3 columns to 1 at `900px`. On iPad Air (820px) this creates a single cramped column when 2 columns would fit.

**Implement graduated column count**:

```css
.pillars__grid {
  display: grid;
  grid-template-columns: 1fr;                    /* Mobile: 1 col */
  gap: var(--space-fluid-md);
}

@media (min-width: 600px) {
  .pillars__grid {
    grid-template-columns: repeat(2, 1fr);        /* Tablet: 2 cols */
  }
  
  /* Center the third card when there are exactly 3 items in 2-col */
  .pillar-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    max-width: 50%;
    justify-self: center;
  }
}

@media (min-width: 1024px) {
  .pillars__grid {
    grid-template-columns: repeat(3, 1fr);        /* Desktop: 3 cols */
  }
  
  .pillar-card:last-child:nth-child(odd) {
    grid-column: auto;
    max-width: none;
    justify-self: auto;
  }
}
```

**Card hover effect on touch devices**: The `transform: translateY(-4px)` on hover is meaningless on touch. Suppress it:

```css
@media (hover: hover) and (pointer: fine) {
  .pillar-card:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }
}

@media (hover: none) {
  .pillar-card:active {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }
}
```

---

## 10. Footer — Adaptive Grid

Currently uses `grid-template-columns: 2fr 1fr 1fr` and collapses to `1fr` at `768px`. On iPad Mini this causes a cramped 3-column layout.

```css
.footer__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-fluid-md);
}

@media (min-width: 600px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
  }
  
  .footer__brand {
    grid-column: 1 / -1;      /* Brand spans full width at 2-col */
  }
}

@media (min-width: 1024px) {
  .footer__inner {
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  .footer__brand {
    grid-column: auto;         /* Brand returns to first column */
  }
}
```

---

## 11. Knowledge Base Reader — Adaptive 3-Column Layout

The reader uses a fixed 3-column grid (`TOC | content | aside`) that collapses in two stages (1024px and 768px). On iPad Pro portrait (1024px) the aside disappears entirely, which wastes the available width.

**Implement a more granular collapse strategy**:

```css
.kb-reader-grid {
  display: grid;
  grid-template-columns: 1fr;                                      /* Mobile */
}

@media (min-width: 744px) {
  .kb-reader-grid {
    grid-template-columns: var(--kb-toc-width) 1fr;                /* Tablet: TOC + content */
  }
}

@media (min-width: 1200px) {
  .kb-reader-grid {
    grid-template-columns: var(--kb-toc-width) 1fr var(--kb-aside-width); /* Desktop: full 3-col */
  }
}

/* Tablet portrait: collapsible TOC as overlay rather than pushing content */
@media (min-width: 744px) and (max-width: 1023px) {
  .kb-toc-nav {
    position: fixed;
    inset-block: calc(72px + env(safe-area-inset-top, 0px)) 0;
    inset-inline-start: 0;
    width: var(--kb-toc-width);
    z-index: 100;
    background: var(--color-bg);
    box-shadow: var(--shadow-xl);
    transform: translateX(-100%);
    transition: transform var(--kb-transition-med);
  }
  
  [dir="rtl"] .kb-toc-nav {
    transform: translateX(100%);
  }
  
  .kb-toc-nav.open {
    transform: translateX(0);
  }
}
```

---

## 12. Touch Target Sizing

Apple's HIG specifies 44pt minimum touch targets. Several interactive elements are undersized on mobile.

**Audit and fix these elements**:

```css
/* Ensure all interactive elements meet minimum touch target */
@media (pointer: coarse) {
  .header__lang-btn,
  .header__menu-btn,
  .footer__icon-link,
  .megamenu__item,
  .kb-toc__link,
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Footer icon grid: increase icon hit area */
  .footer__icon-link {
    width: 44px;
    height: 44px;
  }
  
  /* FAQ accordion triggers */
  .faq-item__trigger {
    min-height: 48px;
    padding-block: 12px;
  }
}
```

---

## 13. Diagram & Image Containers — Aspect-Ratio Preservation

Mermaid diagrams and SVG visuals in the Knowledge Base and diagram gallery currently use `max-width: 100%; height: auto` which can cause layout shift as images load, and diagrams can become illegibly small on phones.

**Introduce aspect-ratio containers with overflow scroll for complex diagrams**:

```css
/* Diagrams that must remain legible: horizontal scroll with hint */
.diagram-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2);
  background: var(--color-bg-secondary);
}

.diagram-scroll-container svg {
  min-width: 600px;     /* Ensure diagrams don't compress below legibility */
  height: auto;
  display: block;
}

/* Simple visuals that can scale: use aspect-ratio */
.diagram-card__preview {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-2);
  background: var(--color-bg-secondary);
}

.diagram-card__preview svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

## 14. Reduced Motion & Performance

The hero orb animations and card hover transitions consume GPU resources unnecessarily on low-power devices.

**Already partially present** — `global.css` has `@media (prefers-reduced-motion: reduce)` that kills durations. Extend it to cover the hero orbs and any `transform`-based interactions:

```css
@media (prefers-reduced-motion: reduce) {
  .hero__orb--1,
  .hero__orb--2 {
    animation: none;
  }
  
  .pillar-card:hover,
  .architecture-layer:hover {
    transform: none;
  }
}
```

**Add `will-change` hints for animated elements** (hero orbs only — don't over-apply):

```css
.hero__orb {
  will-change: transform;
}
```

---

## 15. Dark Background Text Contrast on OLED Screens

iPhones use OLED displays where pure black (#000) can cause smearing during scrolling. The hero and KB hero backgrounds use near-black gradients (`#0a0f1e`, `#001a3a`, `#0A0E1A`) which are fine, but verify that all text on dark backgrounds meets contrast thresholds.

**Audit these text-on-dark combinations**:

| Element | Current Text Color | Background | Contrast Ratio | Required |
|---------|-------------------|------------|----------------|----------|
| `hero__sub` | `rgba(255,255,255,0.7)` | `#0a0f1e` | ~9.8:1 | ≥4.5:1 ✓ |
| `hero__eyebrow` | `#FF6B35` | `#0a0f1e` | ~4.1:1 | ≥4.5:1 ✗ — **lighten to `--color-primary-light` (#FF8F66) on dark BGs** |
| `footer__tagline` | `rgba(255,255,255,0.5)` | `#1A1D23` | ~5.6:1 | ≥4.5:1 ✓ (borderline for small text) — **consider raising to 0.6** |
| `footer__col-title` | `rgba(255,255,255,0.4)` | `#1A1D23` | ~4.2:1 | ≥4.5:1 ✗ — **raise to 0.55** |
| `kb-hero__eyebrow` | `#FF6B35` | `#0A0E1A` | ~4.1:1 | ≥4.5:1 ✗ — **same fix as hero** |

**Create a utility class for accessible eyebrow text on dark backgrounds**:

```css
.on-dark .section-eyebrow,
.hero__eyebrow,
.kb-hero__eyebrow {
  color: var(--color-primary-light);  /* #FF8F66 — passes 4.5:1 on near-black */
}
```

---

## 16. Viewport-Height Units (`svh` vs `vh`)

iOS Safari's dynamic toolbar causes `100vh` to include the address bar, leading to content being clipped behind it. The hero and KB reader use `100vh` in some calculations.

**Replace all instances of `vh` with `svh` (small viewport height)** which represents the viewport with toolbars visible:

```css
/* Search and replace across all CSS files */
/* 100vh → 100svh */
/* calc(100vh - X) → calc(100svh - X) */
```

**Provide a fallback for older browsers**:

```css
.hero {
  min-height: calc(100vh - 72px);              /* fallback */
  min-height: calc(100svh - 72px);             /* modern */
}
```

---

## 17. Container Query Preparation (Progressive Enhancement)

While CRA 5 supports container queries in modern browsers, use them selectively for components whose layout should respond to their container width rather than the viewport (e.g., cards inside variable-width grids).

**Add container context to reusable parent elements**:

```css
.pillars__grid,
.kb-chapter-grid,
.assets-grid,
.diagram-gallery__grid {
  container-type: inline-size;
}

/* Cards adapt to their container, not the viewport */
@container (max-width: 300px) {
  .pillar-card {
    padding: var(--space-3);
  }
  
  .pillar-card__icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .pillar-card__title {
    font-size: var(--text-lg);
  }
}
```

---

## Implementation Constraints

1. **No new dependencies.** All changes are pure CSS within the existing custom-property system.
2. **CSS custom properties only.** No Tailwind, no CSS-in-JS, no Sass.
3. **Mobile-first refactoring.** All breakpoints must use `min-width`, authored from the smallest viewport up.
4. **RTL parity.** Every spatial change must use CSS logical properties. Test in both `/en` and `/fa`.
5. **No JavaScript changes** unless strictly required (e.g., adding a TOC toggle button for the KB reader on tablets). All layout adaptation should be CSS-only.
6. **Backward-compatible.** Use `clamp()` and `svh` with fallbacks. No features that break in Safari 15+, Chrome 100+, or Firefox 100+.
7. **Respect `prefers-reduced-motion` and `prefers-color-scheme`** (if dark mode is later added, the token architecture should not impede it).

---

## Execution Order

1. **tokens.css refactoring** — fluid typography, fluid spacing, breakpoint documentation, container padding `clamp()`. This propagates globally through custom properties with zero component changes.
2. **global.css + index.html** — `viewport-fit=cover`, safe area insets, `svh` units, skip-link adjustments.
3. **Hero.css** — aspect-ratio-aware height, fluid orbs, fluid grid pattern.
4. **SectionBlock.css + ThreePillars.css + CTABand.css** — mobile-first grid refactoring, graduated column counts.
5. **Header.css + Footer.css** — safe area insets, adaptive footer grid, touch target sizing.
6. **knowledgeBase.css / Knowledgebase.css** — reader grid adaptive collapse, tablet TOC overlay, carousel lane sizing.
7. **DiagramViewer.css + DiagramGallery.css** — aspect-ratio containers, scroll-hint for complex diagrams.
8. **Contrast fixes** — eyebrow text on dark backgrounds, footer text opacity.
9. **Touch & motion** — `@media (hover: none)`, `@media (pointer: coarse)`, `will-change`, reduced-motion extensions.
10. **Container queries** — progressive enhancement for card grids.

---

## Acceptance Criteria

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| 1 | Hero fills viewport on iPhone 15 without clipping behind Dynamic Island or home bar | Safari on device or Xcode Simulator |
| 2 | Typography scales smoothly from 375px to 1440px with no jumps | Resize browser continuously; check computed font-size in DevTools |
| 3 | SectionBlock shows 2 columns on iPad Mini portrait (744px) | DevTools responsive mode at 744×1133 |
| 4 | ThreePillars shows 2 columns on iPad Air (820px), 3 columns at 1024px+ | DevTools responsive mode |
| 5 | Footer readable at all tiers; icons meet 44px touch target on mobile | Tap targets audit in Lighthouse |
| 6 | KB Reader TOC usable on iPad portrait (slide-in overlay or inline) | iPad Safari or Simulator |
| 7 | No horizontal overflow or content clipping at any viewport width 320–2560px | Scroll test at 320, 375, 430, 744, 820, 1024, 1440, 1920, 2560 |
| 8 | All text on dark backgrounds passes WCAG AA contrast (≥ 4.5:1 normal, ≥ 3:1 large) | axe-core or Lighthouse accessibility audit |
| 9 | Hero orbs and card hovers suppressed under `prefers-reduced-motion: reduce` | Toggle in OS accessibility settings |
| 10 | Persian RTL layout mirrors correctly at every tier | Switch to `/fa` and test each breakpoint |
| 11 | Container padding transitions smoothly (no hard jump) when resizing from 375px → 1440px | Continuous resize in browser |
| 12 | Complex Mermaid diagrams are scrollable (not squished) on phones | View KB chapter with diagram on 375px viewport |
