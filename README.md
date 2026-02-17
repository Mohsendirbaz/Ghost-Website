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
8. [Carousel for Perusal](#carousel-for-perusal)
9. [Visitor Retention Booster (Fact Engine)](#visitor-retention-booster-fact-engine)
10. [Knowledge Base](#knowledge-base)
11. [Design System](#design-system)
12. [Adding a New Page](#adding-a-new-page)
13. [Adding a New Language String](#adding-a-new-language-string)
14. [Deployment](#deployment)

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

## Carousel for Perusal

The **Carousel for Perusal** is a visual gallery system built to display technical diagrams and visualizations from the PICAPD architecture documentation. It provides an accessible, bilingual, and performance-optimized way to browse complex Mermaid diagrams extracted from the following technical documents:

- `01_Architecture_Reconstruction_Plan.md` — PICAPD-KTE reconstruction and operational architecture
- `02_PICAPD_ISA_Official_Specification.md` — Official instruction set architecture specification
- `03_PICAPD_Visualization_Suite.md` — Visualization suite and diagram catalog

### Key Features

#### Build-Time Rendering
- All Mermaid diagrams are **pre-rendered at build time** into SVG (desktop) and optimized PNG (mobile) formats
- No client-side Mermaid runtime required, ensuring fast page loads and consistent rendering
- Diagrams are stored in `public/assets/diagrams/` and referenced from `copy.js`

#### Bilingual & RTL Support
- Full English and Persian translations for all diagram titles, descriptions, and alt text
- Proper RTL layout using CSS logical properties (`margin-inline-start`, `text-align: start`)
- Language-specific diagram variants when directionality affects meaning (e.g., time arrows, sequence flows)

#### Accessibility First
- Every diagram includes semantic `<title>` and `<desc>` elements embedded in SVG
- Meaningful alt text for all images, stored in `copy.js` and rendered via `alt` attributes
- Keyboard navigation support with proper focus management
- Tested with `axe-core` for WCAG compliance

#### Performance Optimization
- **Lazy loading** via `IntersectionObserver` — diagrams load only when scrolled into view
- **Virtualized galleries** for pages with many diagrams (using `react-window` or similar)
- Progressive image loading: placeholder thumbnails swap to high-res on focus/open
- Click-to-zoom and modal study mode for detailed examination

#### Diagram Complexity Management
- Large diagrams (>50 nodes) are split into smaller, navigable sub-diagrams
- Progressive disclosure for complex state machines and hierarchical flows
- Representative subgraphs for repeated structures (e.g., "Workers 1–3 shown; 4–100 follow same pattern")

#### Search & Filtering
- Filter by diagram type: flowchart, state diagram, sequence diagram, gantt, pie, bar, line, scatter
- Filter by source document: Doc01, Doc02, Doc03
- Filter by language availability: EN only, FA only, or both
- Search across titles, descriptions, tags, and diagram source code

### Architecture

The carousel system follows a three-layer model:

1. **Asset (logical item)**: Metadata including `assetId`, `title`, `summary` (EN/FA), `tags`, `collectionId`, `type`
2. **Artifact (versioned output)**: Language-specific rendered files (`v1.0-en.svg`, `v1.0-fa.svg`) with checksums and render profiles
3. **Dependency record**: Pinned Mermaid CLI version, theme tokens, and rendering options for reproducibility

### Rendering Pipeline

```bash
# Render all Mermaid diagrams to SVG/PNG
npm run render-diagrams
```

The build script:
1. Reads `.mmd` source files from `src/assets/mermaid/`
2. Applies site theme tokens and accessibility metadata
3. Renders to SVG (with `--accessibility` flag) and optimized PNG
4. Outputs to `public/assets/diagrams/`
5. Updates `copy.js` with asset references

### Component Usage

```jsx
import DiagramViewer from './components/DiagramViewer';

<DiagramViewer
  src="/assets/diagrams/architecture-overview-en.svg"
  alt={copy[lang].diagrams.architectureOverview.alt}
  title={copy[lang].diagrams.architectureOverview.title}
  description={copy[lang].diagrams.architectureOverview.description}
  zoomable={true}
  lazyLoad={true}
/>
```

### File Naming Convention

Diagram source files follow the pattern: `{slug}_v{version}_{lang}.mmd`

Examples:
- `epu-hierarchy_v1_en.mmd`
- `epu-hierarchy_v1_fa.mmd`
- `constraint-flow_v2_en.mmd`

Each diagram includes a companion `manifest.yml` with:
- Mermaid CLI version and rendering options
- Theme token references
- Accessibility metadata (title, description)
- Dependency information

### Testing

- **Accessibility**: `axe-core` integration tests verify alt text, lang/dir attributes, and contrast
- **RTL validation**: Screenshot tests at key breakpoints for both English and Persian
- **Performance**: Lighthouse audits ensure lazy loading and virtualization work correctly

---

## Visitor Retention Booster (Fact Engine)

The **Fact Engine** is a visitor retention system that displays curated, educational facts about Ghost Autonomy's technology, science, and architecture. It provides a non-intrusive way to engage visitors with bite-sized insights while respecting user preferences and accessibility standards.

### Overview

The Fact Engine displays facts from a static JSON bundle (`/data/facts.bundle.json`) with full bilingual support (English/Persian). Visitors can save interesting facts to a personal board, dismiss facts temporarily, or opt out entirely. The system is designed to be:

- **Visitor-safe**: Read-only fact pool; no global state mutation
- **Privacy-respecting**: All preferences stored locally; no tracking or analytics
- **Accessibility-first**: Respects `prefers-reduced-motion`, proper ARIA labels, keyboard navigation
- **Bilingual**: Full English and Persian support with RTL layout
- **Static-friendly**: No runtime APIs; works entirely with static JSON

### Key Features

#### Fact Display & Interaction
- **Collapsible UI**: Click header to expand/collapse the fact panel
- **Save to Board**: Pin interesting facts to a personal saved board (localStorage)
- **Generate Another**: Request a new random fact from the pool
- **Never Show**: Opt out of fact display entirely (respects user choice)
- **Call-to-Action**: Optional "Learn more" button linking to relevant pages

#### Smart Selection Algorithm
- **Weighted random selection**: Facts have configurable weights (1–10)
- **Featured boost**: Featured facts get +3 weight bonus
- **Context-aware**: Facts tagged with page-specific keywords get boosted on relevant pages
- **No repetition**: Tracks shown facts in session to avoid immediate repeats

#### Fact Types
- `evergreen` — Timeless technical insights
- `study_tip` — Learning aids and conceptual frameworks
- `contextual` — Page-specific deep dives
- `dependency_insight` — Architecture and design rationale

#### Visitor Preferences (localStorage)
- `ga_fact_engine_collapsed_v1` — Collapsed/expanded state
- `ga_retention_opt_in_v1` — Opt-in/opt-out preference
- `ga_retention_never_show_v1` — Permanent dismissal flag
- `ga_retention_dismissed_until_v1` — Temporary dismissal timestamp
- `ga_saved_facts_board_v1` — Personal saved facts collection
- `ga_retention_shown_session_v1` — Session-based repetition tracking

### Architecture

The system consists of two separate components:

1. **Visitor Component** (`src/FactEngine.js`)
   - Reads facts from static bundle at `/data/facts.bundle.json`
   - Manages visitor preferences in localStorage
   - Renders collapsible fact panel with save/dismiss actions
   - Fully bilingual with RTL support

2. **Admin Tool** (`tools/facts-admin/`)
   - Standalone Vite app for content management (never shipped to production)
   - CRUD interface for fact creation and editing
   - Draft auto-save to browser localStorage
   - Export to `facts.bundle.json` for deployment

### Facts Bundle Schema

The static bundle at `public/data/facts.bundle.json` follows this structure:

```json
{
  "version": 1,
  "generatedAt": "2026-02-16T00:00:00.000Z",
  "facts": [
    {
      "id": "F-000001",
      "text": {
        "en": "English fact text",
        "fa": "متن فارسی"
      },
      "type": "evergreen",
      "tags": ["physics", "fluids"],
      "featured": true,
      "weight": 5,
      "cta": {
        "path": "/science",
        "label": { "en": "Learn more", "fa": "بیشتر" }
      }
    }
  ]
}
```

### Component Usage

```jsx
import FactEngine from '../FactEngine';
import { useLang } from '../context/LanguageContext';

function HomePage() {
  const { lang } = useLang();
  
  return (
    <div>
      {/* Page content */}
      
      <FactEngine
        lang={lang}
        pageTags={['home', 'intro']}  // Context-aware boosting
      />
    </div>
  );
}
```

### Managing Facts (Admin Tool)

The admin tool is a separate application for content editors:

```bash
# From project root:
cd tools/facts-admin
npm install
npm run dev  # Opens at http://localhost:3100
```

#### Workflow:

1. **Load existing bundle**: Admin tool fetches `/data/facts.bundle.json` from the main dev server (port 3000) or local copy
2. **Edit facts**: Add, edit, or delete facts using the CRUD interface
3. **Auto-save draft**: Changes saved to browser localStorage (`ga_fact_admin_draft_v1`)
4. **Export bundle**: Click "↓ Export facts.bundle.json" to download updated bundle
5. **Deploy**: Copy exported file to `public/data/facts.bundle.json`, commit, and push

```bash
# After exporting from admin tool:
cp ~/Downloads/facts.bundle.json public/data/facts.bundle.json
git add public/data/facts.bundle.json
git commit -m "content: update facts bundle"
git push
```

Vercel automatically redeploys; visitors see updated facts on next page load.

### Fact Fields (Admin Tool)

| Field | Description | Required |
|---|---|---|
| **English Text** | Fact text in English | At least one language required |
| **Persian Text** | Fact text in Persian (متن فارسی) | At least one language required |
| **Type** | `evergreen`, `study_tip`, `contextual`, or `dependency_insight` | Yes |
| **Weight** | Selection weight (1–10, higher = shown more often) | Yes (default: 1) |
| **Featured** | Boosts weight by +3; shows star in admin list | No |
| **Tags** | Comma-separated keywords for context-aware boosting | No |
| **CTA Path** | Optional link path (e.g., `/science`) | No |
| **CTA Label (EN)** | English button label (e.g., "Learn more") | If CTA path provided |
| **CTA Label (FA)** | Persian button label (e.g., "بیشتر") | If CTA path provided |

### Accessibility Features

- **Reduced motion**: Respects `prefers-reduced-motion` media query
- **Keyboard navigation**: Full keyboard support for all interactions
- **Screen readers**: Proper ARIA labels and semantic HTML
- **RTL support**: Correct text direction and layout for Persian
- **Focus management**: Clear focus indicators and logical tab order

### Privacy & User Control

- **No tracking**: No analytics, no external requests, no cookies
- **Local-only storage**: All preferences stored in browser localStorage
- **Opt-out respected**: "Never show" preference permanently disables the component
- **Dismissal cooldown**: Temporary dismissal (24 hours default) for less intrusive UX
- **No global mutation**: Visitor actions never modify the shared fact pool

### Testing

```bash
# Run component tests
npm test -- FactEngine

# Test with different languages
# Navigate to /en or /fa and interact with the Fact Engine panel
```

### Separation Guarantee

The admin tool is **never included in production builds**:
- Located in `tools/facts-admin/` (outside `src/` and `public/`)
- Not referenced by any production code
- Uses separate `package.json` and dependencies
- CRA build (`npm run build`) never includes `tools/` directory

---

## Knowledge Base

The **Knowledge Base** is a comprehensive documentation browser for Ghost Autonomy's technical architecture, business strategy, and scientific foundations. It provides a hierarchical, searchable, and filterable interface to navigate 8 parts, 47 chapters, and hundreds of sections covering PICAPD ISA, Queen Bee architecture, physics-inspired computing, and global partnerships.

### Overview

The Knowledge Base module transforms the company's technical documentation into an interactive, bilingual web experience with:

- **Hierarchical structure**: Document → Part → Chapter → Section → Subsection
- **Deep linking**: Every node is independently addressable via URL slugs
- **Full-text search**: Real-time search across titles, descriptions, and tags
- **Faceted filtering**: Filter by topic tags (technical, business, regional, domain)
- **Bilingual content**: Complete English and Persian translations with RTL support
- **Structured data**: JSON-LD markup for search engine discoverability
- **Netflix-style UI**: Horizontal carousel lanes for browsing, vertical lists for search results

### Key Features

#### Hierarchical Navigation
- **5-level hierarchy**: Document → Part (8) → Chapter (47) → Section → Subsection
- **Breadcrumb trails**: Always visible, showing current location in the hierarchy
- **Sibling navigation**: Previous/Next links to adjacent chapters and sections
- **Table of contents**: Expandable TOC in reader view for quick jumping

#### Search & Discovery
- **Global search bar**: Searches across all titles, descriptions, and tags
- **Scope filters**: Refine search to Parts, Chapters, or Sections only
- **Tag-based filtering**: 20+ topic tags across 5 categories (domain, technical, business, regional, content)
- **Real-time results**: Instant filtering as you type or select tags
- **Result highlighting**: Matching nodes show type badge, breadcrumb, and description

#### Browse Experience
- **Five curated lanes** (when no search/filter active):
  - All Parts — Complete 8-part overview
  - Core Architecture — PICAPD ISA, Queen Bee, Byzantine Fault Tolerance
  - Validation & Results — Benchmarks, simulations, case studies
  - Strategy & Partnerships — Market analysis, global partnerships, roadmap
  - Technical Foundations — Physics, mathematics, control theory
- **Horizontal scrolling**: Netflix-style carousels with smooth scroll behavior
- **Card-based design**: Each card shows title, description, page range, and tags

#### Reader View
- **Clean reading interface**: Focused content area with minimal distractions
- **Sticky breadcrumbs**: Always visible for context and quick navigation
- **Expandable TOC**: Collapsible table of contents for current part/chapter
- **Prev/Next navigation**: Quick links to adjacent content
- **Accent colors**: Each part has a unique accent color for visual distinction

#### Bilingual & RTL Support
- **Complete translations**: All content available in English and Persian
- **RTL layout**: Proper right-to-left layout for Persian using CSS logical properties
- **Language-aware routing**: `/en/knowledge-base` and `/fa/knowledge-base` routes
- **Synchronized navigation**: Language toggle preserves current location in hierarchy

#### Structured Data (JSON-LD)
- **WebSite schema**: Defines the knowledge base as a searchable website section
- **BreadcrumbList**: Hierarchical breadcrumb markup for search engines
- **Article schema**: Each chapter/section marked up as an Article with metadata
- **Search action**: Enables direct search from Google search results

### Architecture

The Knowledge Base consists of four main components:

1. **Data Model** (`src/data/knowledgeBase.js`)
   - Canonical hierarchical structure with 8 parts and 47 chapters
   - Tag taxonomy across 5 categories (domain, technical, business, regional, content)
   - Utility functions: `flattenNodes()`, `buildPath()`, node lookup helpers
   - Page number references from authoritative PDF source

2. **Browse Page** (`src/pages/KnowledgeBase.js`)
   - Hero section with global search and scope filters
   - Left rail with faceted tag filtering
   - Main area with 5 horizontal carousel lanes (browse mode) or vertical result list (search mode)
   - Real-time filtering and search with URL state sync (`useSearchParams`)

3. **Reader Page** (`src/pages/KnowledgeBaseReader.js`)
   - Dynamic routing: handles Part, Chapter, and Section URLs
   - Breadcrumb navigation with full hierarchy
   - Expandable table of contents for current context
   - Previous/Next sibling navigation
   - Accent color theming per part

4. **JSON-LD Utility** (`src/utils/jsonld.js`)
   - Generates structured data for WebSite, BreadcrumbList, and Article schemas
   - Injected into `<head>` via React Helmet or direct script tags
   - Enhances SEO and enables rich search results

### Content Structure

The Knowledge Base covers 8 major parts:

| Part | Title | Chapters | Focus |
|---|---|---|---|
| **I** | Executive & Strategic | 7 | Market analysis, product strategy, competitive advantage, roadmap, team, risk management |
| **II** | Philosophy, Design & Conception | 6 | Design principles, abstraction layers, uncertainty handling, documentation philosophy |
| **III** | PICAPD ISA Core | 8 | Instruction set architecture, EPU design, constraint primitives, memory model |
| **IV** | Queen Bee Architecture | 6 | Worker-Manager-Queen hierarchy, Byzantine fault tolerance, event propagation |
| **V** | Physics & Mathematics | 7 | Elliptic integrals, bilinear forms, conservation laws, realizability constraints |
| **VI** | Validation & Results | 5 | Benchmarks, simulations, case studies, performance metrics |
| **VII** | Global Partnerships | 4 | Regional strategies (India, South Korea, Iran, Middle East), OEM partnerships |
| **VIII** | Appendices | 4 | Glossary, notation, references, acknowledgments |

### Tag Taxonomy

Tags are organized into 5 categories for precise filtering:

```js
const TAG_GROUPS = {
  domain: ['autonomous-driving', 'semiconductor', 'AI', 'robotics'],
  technical: [
    'PICAPD-ISA', 'Queen-Bee', 'Byzantine-fault-tolerance',
    'bilinear-form', 'physics-computing', 'control-theory',
    'signal-processing', 'neural-networks', 'moment-compression',
    'uncertainty-quantification', 'ASIL-D'
  ],
  business: ['strategy', 'market', 'IPO', 'IP', 'funding', 'valuation'],
  regional: ['India', 'South-Korea', 'Iran', 'US', 'Europe', 'Middle-East'],
  content: ['architecture', 'validation', 'benchmark', 'simulation', 'derivation']
};
```

### URL Structure

Every node in the hierarchy is addressable via clean URL slugs:

```
/en/knowledge-base                                    → Browse index
/en/knowledge-base/executive-strategic                → Part I landing
/en/knowledge-base/executive-strategic/market-analysis → Chapter 2 reader
/en/knowledge-base/executive-strategic/market-analysis/market-size → Section 2.1 reader
```

Persian routes follow the same pattern with `/fa/` prefix.

### Component Usage

#### Adding Knowledge Base to Navigation

The Knowledge Base link is added to both Header and Footer:

```jsx
// In Header.js and Footer.js
const navLinks = [
  { label: t.home, to: `/${lang}` },
  { label: t.technology, to: `/${lang}/technology` },
  { label: t.science, to: `/${lang}/science` },
  { label: t.knowledgeBase, to: `/${lang}/knowledge-base` },  // NEW
  // ... other links
];
```

#### Routing Configuration

```jsx
// In App.js
import KnowledgeBase from './pages/KnowledgeBase';
import KnowledgeBaseReader from './pages/KnowledgeBaseReader';

<Routes>
  {/* Browse index */}
  <Route path="/en/knowledge-base" element={<KnowledgeBase />} />
  <Route path="/fa/knowledge-base" element={<KnowledgeBase />} />
  
  {/* Reader (Part → Chapter → Section) */}
  <Route path="/en/knowledge-base/:partSlug" element={<KnowledgeBaseReader />} />
  <Route path="/fa/knowledge-base/:partSlug" element={<KnowledgeBaseReader />} />
  <Route path="/en/knowledge-base/:partSlug/:chapterSlug" element={<KnowledgeBaseReader />} />
  <Route path="/fa/knowledge-base/:partSlug/:chapterSlug" element={<KnowledgeBaseReader />} />
  <Route path="/en/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<KnowledgeBaseReader />} />
  <Route path="/fa/knowledge-base/:partSlug/:chapterSlug/:sectionSlug" element={<KnowledgeBaseReader />} />
</Routes>
```

#### Content Strings in copy.js

```js
// In src/data/copy.js
export const copy = {
  en: {
    nav: {
      knowledgeBase: "Knowledge Base",
      // ... other nav items
    },
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
      filterLabel: "Refine",
      topicsLabel: "Topics",
      clearFilters: "Clear filters",
      scopeAll: "All",
      scopeParts: "Parts",
      scopeChapters: "Chapters",
      scopeSections: "Sections",
    },
  },
  fa: {
    // Complete Persian translations
  },
};
```

### Data Model Example

```js
// In src/data/knowledgeBase.js
export const KB_PARTS = [
  {
    id: 'part-i',
    slug: 'executive-strategic',
    number: 'I',
    pageStart: 13,
    title: { en: 'Executive & Strategic', fa: 'اجرایی و استراتژیک' },
    description: {
      en: 'Market positioning, business strategy, competitive advantage...',
      fa: 'جایگاه‌یابی بازار، استراتژی کسب‌وکار...'
    },
    tags: ['strategy', 'market', 'business'],
    accentColor: 'var(--kb-accent-executive)',
    chapters: [
      {
        id: 'ch-1',
        slug: 'executive-summary',
        number: '1',
        pageStart: 15,
        title: { en: 'Executive Summary', fa: 'خلاصه اجرایی' },
        description: { en: '...', fa: '...' },
        tags: ['strategy', 'PICAPD-ISA'],
        sections: [
          {
            id: 'sec-1-1',
            slug: 'vision',
            number: '1.1',
            pageStart: 15,
            title: { en: 'Vision', fa: 'چشم‌انداز' },
            tags: ['strategy'],
            subsections: [
              {
                id: 'sub-1-1-1',
                slug: 'mathematical-universality',
                number: '1.1.1',
                pageStart: 15,
                title: { en: 'Mathematical Universality', fa: 'جهانی بودن ریاضی' },
                tags: ['physics-computing']
              }
            ]
          }
        ]
      }
    ]
  }
];
```

### Search & Filter Implementation

The browse page uses React state and URL search params for filtering:

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') || '';
const scope = searchParams.get('scope') || 'all';
const activeTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

// Filter nodes based on query, scope, and tags
const filteredNodes = useMemo(() => {
  let nodes = flattenNodes(KB_PARTS);
  
  // Apply scope filter
  if (scope !== 'all') {
    nodes = nodes.filter(n => n.nodeType === scope);
  }
  
  // Apply tag filter
  if (activeTags.length > 0) {
    nodes = nodes.filter(n => 
      n.tags?.some(tag => activeTags.includes(tag))
    );
  }
  
  // Apply search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    nodes = nodes.filter(n =>
      n.title[lang]?.toLowerCase().includes(lowerQuery) ||
      n.description?.[lang]?.toLowerCase().includes(lowerQuery) ||
      n.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  return nodes;
}, [query, scope, activeTags, lang]);
```

### Accessibility Features

- **Semantic HTML**: Proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`)
- **ARIA labels**: Search inputs, filter buttons, and navigation links have descriptive labels
- **Keyboard navigation**: All interactive elements are keyboard-accessible
- **Focus management**: Clear focus indicators and logical tab order
- **Screen reader support**: Breadcrumbs, result counts, and filter states announced properly
- **RTL support**: Correct text direction and layout for Persian content

### Performance Optimization

- **Memoized filtering**: `useMemo` prevents unnecessary recalculations
- **URL state sync**: Search and filter state persisted in URL for shareability
- **Lazy rendering**: Only visible carousel items rendered initially
- **CSS containment**: `contain: layout style` on cards for faster repaints
- **Debounced search**: Optional debouncing for search input (can be added)

### SEO & Structured Data

The Knowledge Base includes comprehensive JSON-LD markup:

```js
// WebSite schema with search action
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ghost Autonomy Knowledge Base",
  "url": "https://ghostautonomy.com/en/knowledge-base",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ghostautonomy.com/en/knowledge-base?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// BreadcrumbList for hierarchy
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "..." },
    { "@type": "ListItem", "position": 2, "name": "Knowledge Base", "item": "..." },
    { "@type": "ListItem", "position": 3, "name": "Executive & Strategic", "item": "..." }
  ]
}

// Article schema for chapters
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Executive Summary",
  "description": "Vision, strategic goals, value proposition...",
  "author": { "@type": "Organization", "name": "Ghost Autonomy" },
  "publisher": { "@type": "Organization", "name": "Ghost Autonomy" },
  "inLanguage": "en"
}
```

### Testing

```bash
# Run component tests
npm test -- KnowledgeBase
npm test -- KnowledgeBaseReader

# Manual testing checklist:
# 1. Browse all 8 parts and verify carousel lanes
# 2. Search for keywords and verify results
# 3. Apply tag filters and verify filtering
# 4. Navigate through Part → Chapter → Section hierarchy
# 5. Test breadcrumb and Prev/Next navigation
# 6. Switch languages and verify translations
# 7. Test RTL layout in Persian mode
# 8. Verify URL state sync (refresh preserves search/filters)
# 9. Test keyboard navigation (Tab, Enter, Escape)
# 10. Validate JSON-LD markup with Google Rich Results Test
```

### File Structure

```
src/
├── data/
│   └── knowledgeBase.js          # Canonical data model (8 parts, 47 chapters)
├── pages/
│   ├── KnowledgeBase.js          # Browse page (search, filter, carousel lanes)
│   └── KnowledgeBaseReader.js    # Reader page (Part/Chapter/Section view)
├── styles/
│   └── knowledgeBase.css         # All KB-specific styles
└── utils/
    └── jsonld.js                 # JSON-LD structured data generators
```

### Design Tokens

The Knowledge Base uses custom CSS properties for theming:

```css
:root {
  --kb-accent-executive: #3b82f6;      /* Blue */
  --kb-accent-philosophy: #8b5cf6;     /* Purple */
  --kb-accent-picapd: #10b981;         /* Green */
  --kb-accent-queenbee: #f59e0b;       /* Amber */
  --kb-accent-physics: #ef4444;        /* Red */
  --kb-accent-validation: #06b6d4;     /* Cyan */
  --kb-accent-partnerships: #ec4899;   /* Pink */
  --kb-accent-appendices: #6b7280;     /* Gray */
}
```

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
