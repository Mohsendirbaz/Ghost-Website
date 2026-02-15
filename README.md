# Ghost Autonomy — Website

Corporate website for Ghost Autonomy, a deep-tech startup building physics-enforced computing architecture for autonomous systems. The site is fully bilingual (English / Persian) with automatic RTL layout for Persian, deployed on Vercel as a static single-page application.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Pages & Routes](#pages--routes)
5. [Internationalization](#internationalization)
6. [Content Management](#content-management)
7. [Component Library](#component-library)
8. [Design System](#design-system)
9. [Adding a New Page](#adding-a-new-page)
10. [Adding a New Language String](#adding-a-new-language-string)
11. [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM 7 |
| Styling | Plain CSS with custom properties (no CSS-in-JS) |
| Fonts | Inter (Latin), Vazirmatn (Persian) |
| Build Tool | Create React App / react-scripts 5 |
| Deployment | Vercel (static build) |
| Testing | React Testing Library + Jest |

No external CMS, no database, no API calls. All content is static and lives in `src/data/copy.js`.

---

## Project Structure

```
ghost-autonomy-website/
├── public/                     # Static assets served as-is
├── src/
│   ├── App.js                  # Root component: routing + language sync
│   ├── index.js                # React entry point
│   ├── App.css                 # App-level styles
│   │
│   ├── context/
│   │   └── LanguageContext.js  # Language state, cookie persistence, dir/lang sync
│   │
│   ├── data/
│   │   └── copy.js             # All content & translations (single source of truth)
│   │
│   ├── components/
│   │   ├── Header.js / .css    # Navigation bar with language toggle
│   │   ├── Footer.js / .css    # Footer with page links and language toggle
│   │   ├── Hero.js / .css      # Full-width hero section
│   │   ├── SectionBlock.js / .css  # Reusable content section (text + optional visual)
│   │   ├── CTABand.js / .css   # Call-to-action banner
│   │   ├── FAQAccordion.js / .css  # Expandable FAQ list
│   │   ├── ThreePillars.js / .css  # Three-column feature display
│   │   └── AbstractVisual.js   # SVG graphics (EpuVisual, SafetyLayersVisual, PhysicsAbstraction)
│   │
│   ├── pages/
│   │   ├── Home.js             # /en  /fa
│   │   ├── Technology.js       # /en/technology  /fa/technology
│   │   ├── Science.js          # /en/science  /fa/science
│   │   ├── Safety.js           # /en/safety  /fa/safety
│   │   ├── Partners.js         # /en/partners  /fa/partners
│   │   ├── Company.js          # /en/company  /fa/company
│   │   ├── Contact.js          # /en/contact  /fa/contact
│   │   ├── Perspective.js      # /en/perspective  /fa/perspective
│   │   └── Page.css            # Shared page-level styles
│   │
│   └── styles/
│       ├── tokens.css          # Design tokens (colors, spacing, typography, shadows)
│       └── global.css          # Base resets and utility classes
│
├── vercel.json                 # Vercel build + routing configuration
├── package.json
└── README.md
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests
npm test

# Production build (output: /build)
npm run build
```

The dev server redirects `/` to `/en` automatically. To preview Persian, navigate to `/fa`.

---

## Pages & Routes

Every route is prefixed with a language segment. Both segments render the same page component; the `LangSync` component inside `App.js` reads the URL prefix and sets the active language in context.

| Path | Page | Copy key |
|---|---|---|
| `/en` , `/fa` | Home | `copy[lang].home` |
| `/en/technology` , `/fa/technology` | Technology | `copy[lang].technology` |
| `/en/science` , `/fa/science` | Science | `copy[lang].science` |
| `/en/safety` , `/fa/safety` | Safety | `copy[lang].safety` |
| `/en/partners` , `/fa/partners` | Partners | `copy[lang].partners` |
| `/en/company` , `/fa/company` | Company | `copy[lang].company` |
| `/en/contact` , `/fa/contact` | Contact | `copy[lang].contact` |
| `/en/perspective` , `/fa/perspective` | Perspective | `copy[lang].perspective` |
| `/*` | — | Redirects to `/en` |

---

## Internationalization

### How it works

Language state is managed by `LanguageContext` (`src/context/LanguageContext.js`). It exposes:

```js
const { lang, setLang, toggleLang } = useLang();
// lang: 'en' | 'fa'
```

On every language change the context:
- Sets `<html lang="...">` for screen readers
- Sets `<html dir="ltr|rtl">` — the entire layout flips automatically via CSS logical properties
- Writes a `preferred_lang` cookie (1-year expiry) for persistence across sessions

### Language detection order

1. `preferred_lang` cookie (returning visitor)
2. `navigator.language` (browser locale — maps `fa*` to Persian, everything else to English)
3. Defaults to English

### URL ↔ language sync

`LangSync` (inside `AppShell` in `App.js`) watches `location.pathname`. Whenever the URL changes it reads the first path segment (`en` or `fa`) and calls `setLang()`. This keeps the context in sync when users share URLs or use the browser back/forward buttons.

### Switching languages

Both `Header` and `Footer` have a toggle button that calls `toggleLang()`. The label for this button is stored in `copy[lang].nav.switchLang` (`"فارسی"` in English mode, `"English"` in Persian mode).

---

## Content Management

All copy lives in one file: **`src/data/copy.js`**.

### Structure

```js
export const copy = {
  en: {
    nav:         { home, technology, science, ..., perspective, switchLang },
    home:        { heroH1, heroSub, cta1, cta2, pillar1Title, ... },
    technology:  { heroH1, heroSub, challengeEyebrow, ..., epuPoints[] },
    science:     { ... },
    safety:      { ..., faqs[{ q, a }] },
    partners:    { ... },
    company:     { ... },
    contact:     { ..., types[] },
    perspective: { heroEyebrow, heroH1, heroSub, subtitle, paragraphs[], ctaBtn },
    footer:      { tagline, pages, legal, privacy, terms, copyright },
  },
  fa: {
    // Identical structure, all strings in Persian
  },
};
```

### Key naming conventions

| Pattern | Example | Used for |
|---|---|---|
| `*Eyebrow` | `originsEyebrow` | Small label above a section heading |
| `*Title` | `originsTitle` | `<h2>` section heading |
| `*Body` | `originsBody` | Paragraph text |
| `*Points` | `epuPoints` | Array of bullet-point strings |
| `*Btn` | `ctaBtn` | Button label |
| `faqs` | `safety.faqs` | Array of `{ q, a }` objects |
| `paragraphs` | `perspective.paragraphs` | Array of prose paragraph strings |

To edit any visible text on the site, find the relevant key in `copy.js` and update both the `en` and `fa` values.

---

## Component Library

### `Hero`

Full-width dark hero section with optional eyebrow label, heading, subheading, and up to two CTA buttons.

```jsx
<Hero
  eyebrow="Science"           // small label above heading (optional)
  h1="From Theory to Silicon"
  subhead="Subtitle text"
  cta1="Button label"         // primary button (optional)
  cta1To="/en/contact"        // link target
  cta2="Secondary button"     // (optional)
  cta2To="/en/technology"
  dark                        // dark background variant (boolean, optional)
/>
```

---

### `SectionBlock`

Two-column section with text on one side and an optional visual on the other. Background and layout are controlled by modifier props.

```jsx
<SectionBlock
  eyebrow="IIT Origins"
  title="Research-Founded Innovation"
  body="Paragraph text..."
  points={['Bullet one', 'Bullet two']}   // optional
  note="Small note below points"          // optional
  alt    // reverses column order (visual on left)
  gray   // gray background
>
  <SomeVisualComponent />   {/* optional children become the visual column */}
</SectionBlock>
```

---

### `CTABand`

Full-width call-to-action strip, typically used at the bottom of every page.

```jsx
<CTABand
  title="Want to learn more?"
  body="Optional supporting text"
  cta1="Primary button"
  cta1To="/en/contact"
  cta2="Secondary button"     // optional
  cta2To="/en/technology"
/>
```

---

### `FAQAccordion`

Accessible expandable FAQ list. Toggle buttons carry `aria-expanded`.

```jsx
<FAQAccordion
  title="Frequently Asked Questions"
  items={[
    { q: 'Question text', a: 'Answer text' },
  ]}
/>
```

---

### `ThreePillars`

Three-column grid of feature cards. Accepts an array of `{ title, body }` objects.

```jsx
<ThreePillars
  pillars={[
    { title: 'Physics-Enforced', body: '...' },
    { title: 'Safety by Design', body: '...' },
    { title: 'Computational Efficiency', body: '...' },
  ]}
/>
```

---

### `AbstractVisual`

Named exports for three inline SVG diagrams.

```jsx
import { EpuVisual, SafetyLayersVisual, PhysicsAbstraction } from '../components/AbstractVisual';
```

| Export | Description | Used on |
|---|---|---|
| `EpuVisual` | EPU data-flow diagram (Input → Process → Validate → Output) | Technology |
| `SafetyLayersVisual` | Four-layer safety architecture cards | Safety |
| `PhysicsAbstraction` | Radial gradient physics field illustration | Home, Science |

---

## Design System

All design decisions are expressed as CSS custom properties in `src/styles/tokens.css`.

### Color palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#FF6B35` | Orange — CTAs, accents, active states |
| `--color-secondary` | `#004E89` | Blue — secondary UI elements |
| `--color-accent` | `#F7B32B` | Gold — highlights |
| `--color-text-primary` | `#1A1D23` | Main body text |
| `--color-text-secondary` | `#6B7280` | Muted / secondary text |
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-secondary` | `#F8F9FA` | Alternate section background |
| `--color-border` | `#E5E7EB` | Dividers, card borders |

### Spacing

8 px base grid. Tokens run `--space-1` (8 px) through `--space-16` (128 px).

### Typography

| Token | rem | px |
|---|---|---|
| `--text-xs` | 0.75 | 12 |
| `--text-sm` | 0.875 | 14 |
| `--text-base` | 1.0 | 16 |
| `--text-lg` | 1.25 | 20 |
| `--text-xl` | 1.563 | 25 |
| `--text-2xl` | 1.953 | 31 |
| `--text-3xl` | 2.441 | 39 |
| `--text-4xl` | 3.052 | 49 |
| `--text-5xl` | 3.815 | 61 |

Font stacks: `--font-primary-latin` (Inter) for English, `--font-primary-persian` (Vazirmatn) for Persian. The global stylesheet switches fonts automatically via the `[lang="fa"]` selector on `<html>`.

### RTL support

The layout uses CSS logical properties throughout (`padding-inline-start`, `border-inline-start`, `margin-inline-end`, etc.). When `<html dir="rtl">` is active the browser mirrors the layout automatically. No separate RTL stylesheet is needed.

### Responsive breakpoint

Single breakpoint at `max-width: 768px`. Below this, multi-column grids collapse to a single column and container padding tightens from `--space-6` to `--space-2`.

---

## Adding a New Page

1. **Create the page component** at `src/pages/NewPage.js`:

```jsx
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import SectionBlock from '../components/SectionBlock';
import CTABand from '../components/CTABand';
import './Page.css';

export default function NewPage() {
  const { lang } = useLang();
  const t = copy[lang].newPage;

  return (
    <main id="main-content">
      <Hero eyebrow={t.heroEyebrow} h1={t.heroH1} subhead={t.heroSub} />
      <SectionBlock
        eyebrow={t.sectionEyebrow}
        title={t.sectionTitle}
        body={t.sectionBody}
        gray
      />
      <CTABand title={t.ctaTitle} cta1={t.ctaBtn} cta1To={`/${lang}/contact`} />
    </main>
  );
}
```

2. **Add content** to `src/data/copy.js` under both `en` and `fa` — same keys, different strings.

3. **Add a nav label** to `copy.en.nav` and `copy.fa.nav`:

```js
newPage: "New Page",     // en
newPage: "صفحه جدید",   // fa
```

4. **Register routes** in `src/App.js`:

```jsx
import NewPage from './pages/NewPage';

// inside <Routes>
<Route path="/en/new-page" element={<NewPage />} />
<Route path="/fa/new-page" element={<NewPage />} />
```

5. **Add to navigation** in `src/components/Header.js` (`navLinks` array):

```js
{ label: t.newPage, to: `/${lang}/new-page` },
```

6. **Add to footer** in `src/components/Footer.js` (`pages` array):

```js
{ label: t.nav.newPage, to: `/${lang}/new-page` },
```

---

## Adding a New Language String

Open `src/data/copy.js`, locate the relevant section, and add the key to both `en` and `fa` objects.

```js
// copy.en.company
company: {
  heroH1: "We Are Ghost Autonomy",
  newLabel: "Our Roadmap",       // added
},

// copy.fa.company
company: {
  heroH1: "ما Ghost Autonomy هستیم",
  newLabel: "نقشه راه ما",       // added
},
```

Reference the key in the page component via `t.newLabel`.

---

## Deployment

The site is deployed on Vercel as a static SPA.

### How `vercel.json` works

- **Builder:** `@vercel/static-build` running `react-scripts build`
- **Symlink fix:** Before building, the config removes any stale `public/Original` symlink that would cause CI failures, then recreates it as a plain directory
- **Routes:** `filesystem` handler first (serves real files from `/build`), then all unmatched paths fall through to `/index.html` so React Router handles client-side navigation

### Environment variables

Set in the Vercel dashboard:

| Variable | Value | Purpose |
|---|---|---|
| `NODE_ENV` | `production` | Standard React production flag |
| `CI` | `false` | Prevents ESLint warnings from failing the build |

### Manual deploy

```bash
npm run build
# Upload the /build directory to any static host
```

### Local production preview

```bash
npm run build
npx serve -s build
```
