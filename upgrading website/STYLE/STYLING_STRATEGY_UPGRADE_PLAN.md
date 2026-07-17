# Ghost Autonomy Website — Styling Strategy Upgrade Plan

> **Purpose**: Roadmap for Claude in IDE to migrate the existing production styling architecture to the three-layer theming system defined in the project's design documentation. This document identifies every incompatibility between the live codebase and the target system, specifies the reconciliation strategy for each, and sequences the work into dependency-ordered phases that keep the site functional at every commit.

---

## 1. Architectural Delta Analysis

The project contains two styling systems that do not currently talk to each other:

### System A — Production Codebase (Live)

| Aspect | Current State |
|--------|--------------|
| **Token file** | `src/styles/tokens.css` — flat `:root` block, ~60 variables |
| **Naming** | `--color-primary`, `--color-bg`, `--color-text-primary`, `--space-1`…`--space-16`, `--text-xs`…`--text-5xl` |
| **Spacing scale** | Fixed pixel grid: `--space-1: 8px` through `--space-16: 128px` (integer multipliers) |
| **Typography scale** | Fixed `rem` values: `--text-xs: 0.75rem` through `--text-5xl: 3.815rem` (1.25 modular ratio) |
| **Shadows** | Four tiers: `--shadow-sm` through `--shadow-xl`, single `rgba` layers |
| **Radii** | `--radius-1: 4px` through `--radius-full: 9999px` |
| **Theme support** | None — light-only, hardcoded `:root` |
| **Component styling** | Co-located CSS files (`Header.css`, `Footer.css`, etc.) with direct token references and scattered hardcoded hex values |
| **Font stacks** | `--font-primary-latin` (Inter), `--font-primary-persian` (Vazirmatn) — language-aware via `[lang]` selector |
| **RTL** | CSS logical properties throughout, `[dir="rtl"]` overrides where needed |
| **Breakpoints** | Ad-hoc: 480, 768, 900, 1024, 1100px — all `max-width` (desktop-first) |

### System B — Project Design Documents (Unimplemented)

| Aspect | Target State |
|--------|-------------|
| **Token file** | `Dark_theme` document — `:root.dark-theme` block, ~120 variables |
| **Naming** | `--surface-base/raised/elevated/overlay`, `--text-primary/secondary/tertiary/disabled`, `--color-primary/hover/active/dim`, `--spacing-xs`…`--spacing-3xl`, `--font-size-xs`…`--font-size-4xl` |
| **Spacing scale** | Semantic names: `--spacing-2xs: 0.125rem` through `--spacing-3xl: 4rem` |
| **Typography scale** | Semantic names: `--font-size-xs: 0.75rem` through `--font-size-4xl: 2.25rem` (1.25 ratio, capped at 36px vs. current 61px) |
| **Shadows** | Dual-purpose: flat (`--shadow-sm`…`--shadow-xl` with two `rgba` layers) + neumorphic (`--neu-shadow-*`) |
| **Radii** | `--radius-sm`…`--radius-full` + neumorphic radii |
| **Theme support** | Multi-theme: `.dark-theme` / `.light-theme` / `.creative-theme` via class on root |
| **Component styling** | Three-layer system: Theme Variables → Component Variables → Component Classes (120+ patterns across 8 categories) |
| **Font stacks** | Not defined — must inherit from System A |
| **RTL** | Not addressed — must be preserved from System A |
| **Breakpoints** | Reference values only: `--breakpoint-sm: 640px` through `--breakpoint-2xl: 1536px` |

### Critical Incompatibilities

| # | Conflict | Impact | Resolution Strategy |
|---|----------|--------|-------------------|
| 1 | **Token names diverge** — `--color-bg` vs `--surface-base`, `--space-1` vs `--spacing-sm`, `--text-xs` vs `--font-size-xs` | Every component CSS file references System A names. Renaming breaks all components simultaneously. | Aliasing layer: System B tokens are canonical, System A names become computed aliases pointing to System B. Enables gradual migration. |
| 2 | **Spacing scale architecture** — fixed `px` integers (8, 16, 24…128) vs semantic `rem` names (0.125rem…4rem) | Component CSS uses `var(--space-4)` (32px) everywhere. System B uses `var(--spacing-xl)` (2rem = 32px). Values align but names don't. | Map: `--space-1 → --spacing-sm`, `--space-2 → --spacing-md`, etc. via alias layer. |
| 3 | **Typography scale range** — System A goes to 3.815rem (61px), System B caps at 2.25rem (36px) | Hero `h1` currently uses `--text-4xl` (3.052rem). System B's `--font-size-4xl` (2.25rem) is 26% smaller. | Extend System B scale to match System A range. Add `--font-size-5xl` and `--font-size-6xl` tokens. |
| 4 | **No surface hierarchy in System A** — `--color-bg` and `--color-bg-secondary` vs four-tier `--surface-*` | System A's two backgrounds cannot express the elevation semantics System B requires. | Create the four-tier mapping: `--color-bg → --surface-base`, `--color-bg-secondary → --surface-raised`, new `--surface-elevated` and `--surface-overlay`. |
| 5 | **Text color hierarchy** — System A: `primary/secondary/tertiary/inverse`. System B: `primary/secondary/tertiary/disabled/inverse`. | System B adds `--text-disabled`. System A lacks it. | Add `--text-disabled` to production. Map `--color-text-primary → --text-primary`, etc. |
| 6 | **No component variable layer** | System A components reference theme tokens directly (`.btn { background: var(--color-primary); }`). System B interposes component variables (`.btn { background: var(--btn-bg); }` where `--btn-bg: var(--color-primary)`). | Phase 3 migration: introduce component variables per the catalog, component by component. |
| 7 | **Theme activation mechanism** | System A: bare `:root`. System B: `:root.dark-theme`. | Phase 1 decision: the current light appearance becomes `:root.light-theme` (default). System B's dark-theme becomes `:root.dark-theme`. Theme class applied to `<html>` alongside `lang` and `dir`. |
| 8 | **Bilingual + RTL not addressed in System B** | System B has no `[lang]` selectors, no logical property conventions, no Persian font stack. | All System B CSS must be written with logical properties. Font stacks remain in System A's global reset. RTL is a cross-cutting concern that constrains all implementation. |
| 9 | **Shadow values differ** | System A: single-layer shadows. System B: dual-layer shadows + neumorphic. | Replace System A shadow values with System B's richer definitions. Neumorphic shadows are additive (new utility classes), not destructive. |
| 10 | **Breakpoint strategy differs** | System A: ad-hoc `max-width`. System B: documented `min-width` reference values (640, 768, 1024, 1280, 1536). Earlier aesthetics prompt defines 5 tiers (480, 744, 1024, 1440, 1920). | Adopt the aesthetics prompt's device-derived breakpoints. System B's reference values become documentation; actual media queries use the device-derived set. |

---

## 2. Target Architecture

After migration, the styling system will have this structure:

```
src/styles/
├── tokens/
│   ├── base.css              # Shared tokens (spacing, radius, typography, shadows, z-index, transitions)
│   ├── light-theme.css       # :root.light-theme { --surface-*, --text-*, --color-*, --border-* }
│   ├── dark-theme.css        # :root.dark-theme { ... }
│   └── aliases.css           # Legacy name aliases: --color-bg → var(--surface-base), etc.
├── components.css            # Component variable layer (from catalog): .btn, .card, .alert, .form-input, etc.
├── global.css                # Resets, font imports, .container, skip-link, reduced-motion
└── utilities.css             # .surface-base, .text-primary, .sr-only, .interactive, etc.

src/components/
├── Header.js / Header.css    # Component CSS references component variables, not theme tokens directly
├── Footer.js / Footer.css
├── Hero.js / Hero.css
└── ... (existing co-located CSS files, progressively migrated)

src/context/
└── ThemeContext.js            # Extended: manages both language AND theme state
```

### Three-Layer Variable Flow

```
Layer 1: Theme tokens (light-theme.css / dark-theme.css)
   :root.light-theme { --surface-base: #FFFFFF; --color-primary: #FF6B35; }
   :root.dark-theme  { --surface-base: #121a2e; --color-primary: #4a7fb5; }
                ↓
Layer 2: Component variables (components.css)
   .btn-primary { --btn-bg: var(--color-primary); --btn-color: var(--text-inverse); }
   .card        { --card-bg: var(--surface-raised); --card-border: var(--border-base); }
                ↓
Layer 3: Component implementation (co-located CSS)
   .btn  { background: var(--btn-bg); color: var(--btn-color); }
   .card { background: var(--card-bg); border: 1px solid var(--card-border); }
```

### Theme Activation

```html
<html lang="en" dir="ltr" class="light-theme" id="app-root">
```

Theme class toggles independently of language/direction. React's `ThemeContext` manages the class via `useEffect`, persists to `localStorage`, and respects `prefers-color-scheme`.

---

## 3. Migration Phases

### Phase 0: Preparation (Non-Destructive Audit)

**Goal**: Map every hardcoded color value in every CSS file to the corresponding System B token. No code changes.

**Claude IDE instructions**:

1. Search all `.css` files for hex values (`#[0-9a-fA-F]{3,8}`), `rgb(`, `rgba(`, `hsl(` patterns.
2. For each occurrence, classify:
   - **Already tokenized**: references a `var(--*)` → note which token.
   - **Hardcoded but matches a token**: e.g., `#FF6B35` = `--color-primary` → flag for replacement.
   - **Hardcoded and novel**: doesn't match any System A or System B token → document for review.
3. Output a CSV: `file, line, current_value, proposed_token, category` (surface/text/color/border/shadow).
4. Count: total hardcoded values, values matching existing tokens, truly novel values.

**Why first**: This audit determines the true scope of Phase 2. Without it, you'll miss scattered `rgba(255, 107, 53, 0.07)` patterns that are functionally `--color-primary` at 7% opacity.

---

### Phase 1: Token Foundation (Non-Breaking)

**Goal**: Introduce the new token files alongside existing `tokens.css`. No component CSS changes yet.

**Files to create**:

#### `src/styles/tokens/base.css`

Extract theme-independent tokens from both systems:

```css
:root {
  /* ── Spacing (System B semantic names, System A values preserved as aliases) ── */
  --spacing-2xs: 0.125rem;    /* 2px */
  --spacing-xs:  0.25rem;     /* 4px */
  --spacing-sm:  0.5rem;      /* 8px */
  --spacing-md:  1rem;        /* 16px */
  --spacing-lg:  1.5rem;      /* 24px */
  --spacing-xl:  2rem;        /* 32px */
  --spacing-2xl: 3rem;        /* 48px */
  --spacing-3xl: 4rem;        /* 64px */
  --spacing-4xl: 5rem;        /* 80px */
  --spacing-5xl: 6rem;        /* 96px */
  --spacing-6xl: 8rem;        /* 128px */

  /* ── Typography (fluid clamp from aesthetics prompt, System B names) ── */
  --font-size-xs:   clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);
  --font-size-sm:   clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);
  --font-size-base: clamp(0.9375rem, 0.88rem + 0.25vw, 1rem);
  --font-size-lg:   clamp(1.0625rem, 0.95rem + 0.5vw, 1.25rem);
  --font-size-xl:   clamp(1.25rem, 1.05rem + 0.85vw, 1.563rem);
  --font-size-2xl:  clamp(1.5rem, 1.15rem + 1.5vw, 1.953rem);
  --font-size-3xl:  clamp(1.75rem, 1.2rem + 2.3vw, 2.441rem);
  --font-size-4xl:  clamp(2rem, 1.2rem + 3.4vw, 3.052rem);
  --font-size-5xl:  clamp(2.25rem, 1.1rem + 4.8vw, 3.815rem);
  /* Note: extends System B's range to match System A's top end */

  /* ── Font weights ── */
  --font-weight-light:    300;
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* ── Line heights ── */
  --line-height-tight:   1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.75;

  /* ── Border radius ── */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;

  /* ── Shadows (System B dual-layer, replaces System A single-layer) ── */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.10);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.20), 0 4px 6px rgba(0,0,0,0.15);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.18);

  /* ── Transitions ── */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Z-index scale ── */
  --z-index-base:           0;
  --z-index-dropdown:       1000;
  --z-index-sticky:         1020;
  --z-index-fixed:          1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal:          1050;
  --z-index-popover:        1060;
  --z-index-tooltip:        1070;

  /* ── Container ── */
  --container-max: 1440px;
  --container-padding: clamp(1rem, 3vw, 3rem);

  /* ── Font stacks (from System A — preserved) ── */
  --font-primary-latin:   'Inter', system-ui, -apple-system, sans-serif;
  --font-primary-persian: 'Vazirmatn', 'Inter', system-ui, sans-serif;
}
```

#### `src/styles/tokens/light-theme.css`

Derives the current light appearance as an explicit theme:

```css
:root.light-theme {
  /* ── Surfaces ── */
  --surface-base:     #FFFFFF;
  --surface-raised:   #F8F9FA;
  --surface-elevated: #F1F3F5;
  --surface-overlay:  #E9ECEF;

  /* ── Text ── */
  --text-primary:   #1A1D23;
  --text-secondary: #6B7280;
  --text-tertiary:  #9CA3AF;
  --text-disabled:  #D1D5DB;
  --text-inverse:   #FFFFFF;

  /* ── Brand / Interactive ── */
  --color-primary:        #FF6B35;
  --color-primary-hover:  #CC5529;
  --color-primary-active: #B34A24;
  --color-primary-dim:    rgba(255, 107, 53, 0.15);
  --color-primary-light:  #FF8F66;
  --color-secondary:      #004E89;
  --color-accent:         #F7B32B;

  /* ── Feedback ── */
  --color-success:     #10B981;
  --color-success-dim: rgba(16, 185, 129, 0.12);
  --color-warning:     #F59E0B;
  --color-warning-dim: rgba(245, 158, 11, 0.12);
  --color-danger:      #EF4444;
  --color-danger-dim:  rgba(239, 68, 68, 0.12);
  --color-info:        #3B82F6;
  --color-info-dim:    rgba(59, 130, 246, 0.12);

  /* ── Borders ── */
  --border-base:   #E5E7EB;
  --border-subtle: #F3F4F6;
  --border-strong: #D1D5DB;

  /* ── RGB equivalents for alpha compositing ── */
  --surface-base-rgb:   255, 255, 255;
  --color-primary-rgb:  255, 107, 53;
  --color-success-rgb:  16, 185, 129;
  --color-warning-rgb:  245, 158, 11;
  --color-danger-rgb:   239, 68, 68;
  --color-info-rgb:     59, 130, 246;
  --text-primary-rgb:   26, 29, 35;
}
```

#### `src/styles/tokens/dark-theme.css`

Copy from the project's `Dark_theme` document, with these adjustments:
- Add `--color-primary-light` (for eyebrow text on dark backgrounds — from aesthetics prompt).
- Add `--color-accent` (mapped from System A's `--color-accent`).
- Verify all contrast ratios per the `color-derivation-formulas.md` validation suite.

#### `src/styles/tokens/aliases.css`

The backward-compatibility bridge. Every System A name maps to its System B equivalent:

```css
:root {
  /* Surface aliases */
  --color-bg:           var(--surface-base);
  --color-bg-secondary: var(--surface-raised);
  --color-surface:      var(--surface-base);

  /* Text aliases */
  --color-text-primary:   var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary:  var(--text-tertiary);
  --color-text-inverse:   var(--text-inverse);

  /* Border aliases */
  --color-border:        var(--border-base);
  --color-border-strong: var(--border-strong);

  /* Spacing aliases (px-indexed → semantic) */
  --space-1:  var(--spacing-sm);    /* 8px */
  --space-2:  var(--spacing-md);    /* 16px */
  --space-3:  var(--spacing-lg);    /* 24px */
  --space-4:  var(--spacing-xl);    /* 32px */
  --space-5:  2.5rem;               /* 40px — no System B equivalent, retain */
  --space-6:  var(--spacing-2xl);   /* 48px */
  --space-8:  var(--spacing-3xl);   /* 64px */
  --space-10: var(--spacing-4xl);   /* 80px */
  --space-12: var(--spacing-5xl);   /* 96px */
  --space-16: var(--spacing-6xl);   /* 128px */

  /* Typography aliases */
  --text-xs:  var(--font-size-xs);
  --text-sm:  var(--font-size-sm);
  --text-base: var(--font-size-base);
  --text-lg:  var(--font-size-lg);
  --text-xl:  var(--font-size-xl);
  --text-2xl: var(--font-size-2xl);
  --text-3xl: var(--font-size-3xl);
  --text-4xl: var(--font-size-4xl);
  --text-5xl: var(--font-size-5xl);

  /* Weight aliases */
  --weight-regular:  var(--font-weight-normal);
  --weight-medium:   var(--font-weight-medium);
  --weight-semibold: var(--font-weight-semibold);
  --weight-bold:     var(--font-weight-bold);

  /* Radius aliases */
  --radius-1: var(--radius-sm);
  --radius-2: var(--radius-md);
  --radius-3: var(--radius-lg);
  --radius-4: var(--radius-xl);

  /* Line height aliases */
  --line-xs:  var(--line-height-normal);
  --line-sm:  var(--line-height-normal);
  --line-base: var(--line-height-normal);
  --line-lg:  1.4;
  --line-xl:  1.3;
  --line-2xl: 1.2;
  --line-3xl: 1.15;
  --line-4xl: 1.1;
}
```

#### Import order in `global.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap');
@import './tokens/base.css';
@import './tokens/light-theme.css';
@import './tokens/dark-theme.css';
@import './tokens/aliases.css';

/* ... rest of global.css (resets, .container, .btn, etc.) unchanged ... */
```

**Delete the old `@import './tokens.css'`** — its content is now distributed across the four new files.

**Verification gate**: After Phase 1, every existing `var(--color-bg)`, `var(--space-4)`, `var(--text-xl)` etc. still resolves correctly through the alias chain. The site looks identical. No visual regressions.

---

### Phase 2: Theme Infrastructure

**Goal**: Add theme class to `<html>`, build `ThemeContext`, wire the toggle. Dark theme becomes functional.

**Step 2.1 — Extend `LanguageContext.js` or create `ThemeContext.js`**

```jsx
// src/context/ThemeContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light-theme';
    const saved = localStorage.getItem('preferred-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-theme' : 'light-theme';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(theme);
    localStorage.setItem('preferred-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('preferred-theme')) {
        setTheme(e.matches ? 'dark-theme' : 'light-theme');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () =>
    setTheme(t => t === 'dark-theme' ? 'light-theme' : 'dark-theme');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Step 2.2 — Wrap App in ThemeProvider**

In `App.js`, wrap the `<LanguageProvider>` tree with `<ThemeProvider>`.

**Step 2.3 — Add theme toggle to Header and Footer**

Place a sun/moon icon toggle adjacent to the language switch button. Both Header and Footer already have toggle patterns for language — the theme toggle follows identical UX.

**Step 2.4 — Add `class="light-theme"` as default to `<html>` in `index.html`**

The `ThemeContext` will override this on mount, but it prevents a flash-of-unstyled-content for users with JavaScript disabled.

**Step 2.5 — Handle theme × language interaction**

Theme class (`light-theme` / `dark-theme`) is orthogonal to `lang` and `dir` attributes. The `<html>` element carries all three:

```html
<html lang="en" dir="ltr" class="light-theme">
```

Verify that no CSS rule accidentally uses `.light-theme` as a sibling selector that conflicts with `[lang="fa"]`.

**Verification gate**: Toggle theme. The dark theme should be partially functional — surfaces, text colors, borders, and interactive colors should switch via the token layer. Components with hardcoded hex values will show visual inconsistencies (these are addressed in Phase 3).

---

### Phase 3: Hardcoded Value Elimination

**Goal**: Replace every hardcoded color in component CSS with token references, using the Phase 0 audit as the checklist.

**Priority order** (highest visual impact first):

1. **Hero.css** — dark gradients (`#0a0f1e`, `#001a3a`, `#0d1a2e`) must become `var(--surface-base)` and derived values. The background gradient should invert for light theme (already light) vs dark theme.
2. **Header.css** — mega-menu background, active states, hover colors.
3. **Footer.css** — background `#1A1D23` → token. Text opacities → text tier variables.
4. **knowledgeBase.css / Knowledgebase.css** — hero background `#0A0E1A`, part accent colors, card backgrounds.
5. **SectionBlock.css** — gray variant background.
6. **DiagramViewer.css / DiagramGallery.css** — modal overlay, card borders.
7. **MultiAgentSystem.css** — component path background `#f8f9fa`, tag colors.
8. **LibraryAssets.css** — tag and card colors.
9. **CTABand.css** — band background.
10. **Page.css** — shared page-level styles.

**Pattern for each file**:

```css
/* BEFORE */
.hero {
  background: linear-gradient(135deg, #0a0f1e 0%, #001a3a 50%, #0d1a2e 100%);
}

/* AFTER */
.hero {
  background: var(--hero-bg, linear-gradient(135deg,
    var(--surface-base) 0%,
    var(--color-secondary) 50%,
    var(--surface-raised) 100%));
}
```

**Special case — `rgba()` patterns**: Many components use `rgba(255, 107, 53, 0.07)` for primary-tinted backgrounds. Replace with `rgba(var(--color-primary-rgb), 0.07)` using the RGB equivalents from the theme files.

**Special case — Knowledge Base accent colors**: The eight part-accent colors (`--kb-accent-executive`, `--kb-accent-philosophy`, etc.) are content-specific, not theme-specific. They should remain in the KB's own CSS scope but derive from theme-aware primaries where possible.

**Verification gate**: Toggle between light and dark theme. Every component should display coherent colors in both modes. No hardcoded hex values remain in any `.css` file (except in comments or truly one-off decorative patterns like gradient stops that are semantically unique).

---

### Phase 4: Component Variable Layer

**Goal**: Introduce the intermediate component variable layer from `component-library-catalog.md` for the site's actual components.

This is the most architecturally significant phase. It decouples component styling from theme tokens, enabling future theme additions with zero component changes.

**The production codebase has ~15 distinct component patterns.** Map each to the catalog:

| Production Component | Catalog Pattern | Variable Prefix |
|---------------------|-----------------|----------------|
| `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-outline` | Button base + variants | `--btn-*` |
| `.header` / `.header__nav` | Nav bar | `--nav-*` |
| `.footer` / `.footer__*` | Footer (custom, not in catalog) | `--footer-*` |
| `.hero` | Hero (custom) | `--hero-*` |
| `.pillar-card` | Card variant | `--card-*` |
| `.section-block` | Layout section (custom) | `--section-*` |
| `.faq-item` | Accordion | `--accordion-*` |
| `.megamenu__*` | Nav menu | `--nav-menu-*` |
| `.kb-*` cards/lanes | Card variant | `--card-*` |
| `.form-input` (contact page) | Form input | `--input-*` |
| `.alert` (if any feedback) | Alert | `--alert-*` |
| `.breadcrumb` | Breadcrumb | `--breadcrumb-*` |
| `.diagram-modal` | Modal | `--modal-*` |
| `.badge` / `.asset-tag` | Badge | `--badge-*` |
| `.cta-band` | CTA (custom) | `--cta-*` |

**Implementation approach**: Create `src/styles/components.css` containing the component variable definitions from the catalog. Then, in each co-located CSS file, replace direct theme token references with component variable references.

**Example migration — buttons**:

```css
/* In src/styles/components.css */
.btn-primary {
  --btn-bg: var(--color-primary);
  --btn-bg-hover: var(--color-primary-hover);
  --btn-bg-active: var(--color-primary-active);
  --btn-color: var(--text-inverse);
  --btn-shadow: var(--shadow-sm);
  --btn-shadow-hover: var(--shadow-md);
}

/* In src/styles/global.css (existing .btn definition) */
.btn {
  /* Replace direct references: */
  background: var(--btn-bg, var(--surface-raised));
  color: var(--btn-color, var(--text-primary));
  border: var(--btn-border-width, 2px) solid var(--btn-border-color, transparent);
  border-radius: var(--btn-radius, var(--radius-full));
  box-shadow: var(--btn-shadow, none);
  /* ... structural properties unchanged ... */
}

.btn:hover {
  background: var(--btn-bg-hover, var(--surface-elevated));
  box-shadow: var(--btn-shadow-hover, var(--shadow-md));
}
```

**Verification gate**: Every component displays identically to its Phase 3 appearance (regression test). The difference is architectural — variables can now be overridden per-theme or per-context without touching the component CSS.

---

### Phase 5: Responsive & Adaptive Integration

**Goal**: Merge the aesthetics/adaptive prompt's breakpoint system with the token foundation.

This phase implements the work specified in the earlier `CLAUDE_IDE_PROMPT_AESTHETICS.md`, now unified with the new token architecture:

1. **Mobile-first breakpoint refactoring** — all component CSS converted from `max-width` to `min-width`, using the 5-tier system (480, 744, 1024, 1440, 1920).
2. **Fluid spacing** — `--container-padding: clamp(...)` already in `base.css`. Extend to section padding.
3. **Safe area insets** — `viewport-fit=cover`, `env(safe-area-inset-*)` on header/footer.
4. **`svh` viewport units** — replace `vh` with `svh` + fallback.
5. **Touch target sizing** — `@media (pointer: coarse)` rules.
6. **Hero aspect-ratio adaptation** — device-aware hero sizing.

**This phase can largely follow the aesthetics prompt verbatim**, with the single modification that all token references now use System B names (or aliases).

---

### Phase 6: Accessibility & Polish

**Goal**: Contrast validation, focus management, reduced-motion, high-contrast mode support.

1. **Run the `color-derivation-formulas.md` validation suite** against both `light-theme.css` and `dark-theme.css`. Fix any contrast violations.
2. **Add `:focus-visible` outlines** per System B spec (already defined in the dark theme document).
3. **Add `@media (prefers-contrast: high)` overrides** per the dark theme document's high-contrast section.
4. **Extend `@media (prefers-reduced-motion: reduce)`** to cover all animated elements (hero orbs, card hovers, page transitions).
5. **Validate light theme eyebrow contrast** — the aesthetics prompt identified `#FF6B35` on white as borderline. On light theme, use `--color-primary` directly (passes on white). On dark theme, use `--color-primary-light` per the aesthetics prompt.

---

## 4. File-Level Change Map

| File | Phase | Action |
|------|-------|--------|
| `src/styles/tokens.css` | 1 | **Delete** — content distributed to `tokens/base.css`, `tokens/light-theme.css`, `tokens/aliases.css` |
| `src/styles/tokens/base.css` | 1 | **Create** — theme-independent tokens |
| `src/styles/tokens/light-theme.css` | 1 | **Create** — current light appearance as explicit theme |
| `src/styles/tokens/dark-theme.css` | 1 | **Create** — from project Dark_theme document, extended |
| `src/styles/tokens/aliases.css` | 1 | **Create** — backward-compat aliases |
| `src/styles/global.css` | 1, 5 | **Modify** — update imports, breakpoint refactoring |
| `src/styles/components.css` | 4 | **Create** — component variable layer |
| `src/styles/utilities.css` | 4 | **Create** — surface/text/interactive utility classes |
| `src/context/ThemeContext.js` | 2 | **Create** — theme state management |
| `src/App.js` | 2 | **Modify** — wrap in ThemeProvider |
| `public/index.html` | 2, 5 | **Modify** — add `class="light-theme"`, `viewport-fit=cover` |
| `src/components/Header.js` | 2 | **Modify** — add theme toggle button |
| `src/components/Header.css` | 3, 4, 5 | **Modify** — tokenize hardcoded values, add component vars, responsive refactor |
| `src/components/Footer.js` | 2 | **Modify** — add theme toggle button |
| `src/components/Footer.css` | 3, 4, 5 | **Modify** — tokenize, component vars, responsive |
| `src/components/Hero.css` | 3, 5 | **Modify** — tokenize gradients, adaptive sizing |
| `src/components/SectionBlock.css` | 3, 4, 5 | **Modify** |
| `src/components/ThreePillars.css` | 3, 4, 5 | **Modify** |
| `src/components/CTABand.css` | 3, 5 | **Modify** |
| `src/components/FAQAccordion.css` | 3, 4 | **Modify** |
| `src/components/AbstractVisual.css` | 3 | **Modify** — gradient backgrounds |
| `src/components/DiagramViewer.css` | 3, 5 | **Modify** |
| `src/components/DiagramGallery.css` | 3, 5 | **Modify** |
| `src/styles/knowledgeBase.css` | 3, 5 | **Modify** |
| `src/Knowledgebase.css` | 3, 5 | **Modify** |
| `src/pages/MultiAgentSystem.css` | 3, 5 | **Modify** |
| `src/pages/LibraryAssets.css` | 3, 5 | **Modify** |
| `src/pages/Page.css` | 3, 5 | **Modify** |
| `src/styles/artifacts.css` | 3 | **Modify** — code block colors |
| `src/data/copy.js` | 2 | **Modify** — add theme toggle label strings (en + fa) |

---

## 5. Constraints & Principles

1. **Zero visual regression after each phase.** The site must look identical to its current state after Phase 1 and after each subsequent phase (when viewed in the light theme). Dark theme visual quality improves incrementally.
2. **Alias layer never removed prematurely.** `aliases.css` stays in production until every `var(--color-bg)` etc. has been individually migrated to its System B name in all CSS files. Track this via the Phase 0 audit CSV.
3. **RTL as a cross-cutting constraint.** Every new CSS property must use logical equivalents (`padding-inline-start`, `margin-block-end`, `border-inline-start`, `inset-inline-start`). No `left/right/top/bottom` for layout properties.
4. **Bilingual string parity.** Every new UI string (theme toggle label, aria labels) must have both `en` and `fa` entries in `copy.js`.
5. **No new runtime dependencies.** Theme switching is pure CSS class + React state. No CSS-in-JS, no Tailwind, no style injection libraries.
6. **Component variables use fallbacks.** Every `var(--btn-bg)` must include a fallback: `var(--btn-bg, var(--surface-raised))`. This ensures components render correctly even if the component variable layer hasn't been loaded yet (progressive enhancement).
7. **Dark theme is opt-in.** The default experience remains light. Dark theme activates via user preference (toggle or `prefers-color-scheme`).

---

## 6. Execution Sequence for Claude IDE

Present each phase as a separate prompt session. Within each session, instruct Claude to:

1. Read the relevant project documentation files first (this plan + the specific project docs cited).
2. Make changes file-by-file, running `npm start` and visually verifying after each file.
3. Commit after each file-group passes verification.

**Recommended session breakdown**:

| Session | Scope | Est. Files | Dependency |
|---------|-------|-----------|------------|
| 1 | Phase 0: Hardcoded color audit | 0 (output only) | None |
| 2 | Phase 1: Token foundation + aliases | 5 new + 1 modified | Session 1 output |
| 3 | Phase 2: ThemeContext + toggle UI | 5 modified/new | Session 2 |
| 4 | Phase 3a: Hero, Header, Footer tokenization | 3 CSS files | Session 3 |
| 5 | Phase 3b: Remaining component tokenization | 10+ CSS files | Session 4 |
| 6 | Phase 4: Component variable layer | 2 new + 15 modified | Session 5 |
| 7 | Phase 5: Responsive/adaptive (aesthetics prompt) | 15 CSS files | Session 6 |
| 8 | Phase 6: Contrast validation + accessibility | All CSS files | Session 7 |

---

## 7. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|-------------|
| 1 | Light theme appears identical to current production after all phases | Side-by-side screenshot comparison at 1440px |
| 2 | Dark theme passes WCAG AA contrast on all text/surface pairs | Automated validation script from `color-derivation-formulas.md` |
| 3 | Theme toggle works in both Header and Footer | Manual test: toggle in EN, toggle in FA |
| 4 | Theme persists across page navigation and browser refresh | `localStorage` check |
| 5 | `prefers-color-scheme: dark` auto-activates dark theme for new visitors | Toggle OS setting, verify |
| 6 | No alias token (`--color-bg`, `--space-4`, etc.) is referenced in component CSS after Phase 4 | `grep` audit: zero matches outside `aliases.css` |
| 7 | Every component renders correctly in both themes and both languages | Manual walkthrough: 8 pages × 2 themes × 2 languages = 32 checks |
| 8 | Persian RTL layout mirrors correctly in dark theme | Visual check on `/fa` routes |
| 9 | No hardcoded hex/rgb/hsl values in any CSS file | `grep -rn '#[0-9a-fA-F]\{3,8\}' src/` — zero results outside comments |
| 10 | All interactive elements meet 44px minimum touch target on mobile in both themes | Lighthouse tap-target audit |
| 11 | Hero, KB hero, and footer backgrounds adapt to theme | Visual check in both themes |
| 12 | Component variable fallbacks work if `components.css` fails to load | Temporarily remove import, verify no broken visuals |
