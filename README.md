# Ghost Autonomy — Website

Corporate and knowledge website for **Ghost Autonomy**, a deep-tech effort building a physics-enforced computing architecture for autonomous systems. The site is fully bilingual (English / Persian) with automatic RTL layout for Persian, light/dark theming, an in-page document/artifact library, a knowledge base reader, and a crowdfunding ("Invest") experience. It is a React single-page application deployed on Vercel with a small set of serverless functions.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Pages & Routes](#pages--routes)
6. [Internationalization](#internationalization)
7. [Theming](#theming)
8. [Content & Data](#content--data)
9. [Feature Areas](#feature-areas)
10. [Components](#components)
11. [Serverless API](#serverless-api)
12. [Library Tooling](#library-tooling)
13. [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Routing | React Router DOM 7 |
| Animation | Framer Motion 12 |
| Styling | Plain CSS with custom-property design tokens + light/dark theme classes (Tailwind CSS is configured and available) |
| UI primitives | In-house `components/ui` library + Radix Tabs, `cmdk` (command palette), `lucide-react` icons |
| Markdown | `react-markdown` + `remark-gfm` |
| Diagrams | Mermaid |
| Documents | `jspdf`, `jszip`, `file-saver` (client-side export/bundling) |
| Backend (optional) | Supabase (waitlist / form capture) |
| Serverless | Vercel Functions (`/api`) |
| Analytics | Vercel Analytics + Speed Insights (consent-gated) |
| Build tool | Create React App / `react-scripts` 5 |
| Testing | React Testing Library + Jest |
| Deployment | Vercel |

Most content is static and bundled from `src/data/*`. Supabase is **optional** — when its environment variables are absent the client falls back to a no-op stub, so the site builds and runs without any backend.

---

## Project Structure

```
ghost-autonomy-website/
├── api/
│   └── artifact-proxy.js        # Vercel serverless function: proxies Claude public artifacts
├── public/                      # Static assets: PDFs (CV, transcripts, papers), library/, docs/, data/
├── scripts/
│   └── organizeLibrary.js       # Build/organize the public library manifest
├── src/
│   ├── App.js                   # Root: providers, routing, language sync, hreflang, page transitions
│   ├── index.js                 # React entry point
│   │
│   ├── context/
│   │   ├── LanguageContext.js   # Language state, cookie persistence, dir/lang sync
│   │   ├── ThemeContext.js      # Light/dark theme, system preference, persistence
│   │   └── CartContext.js       # Document "cart" state for bundled downloads
│   │
│   ├── data/                    # Static content (single source of truth)
│   │   ├── copy.js              # Site copy & translations
│   │   ├── artifacts.js         # Artifact catalogue
│   │   ├── diagrams.js          # Mermaid diagram definitions
│   │   ├── facts.js             # Fact Engine content
│   │   ├── founder-bio.js       # Founder bio / CV content
│   │   ├── knowledgeBase.js     # Knowledge base Part → Chapter → Section tree
│   │   ├── libraryAssets.js     # Library asset metadata
│   │   ├── libraryManifest.js   # Library manifest pointer
│   │   └── multiAgentSystem.js  # Multi-Agent System content
│   │
│   ├── pages/                   # Route components (see Pages & Routes)
│   │
│   ├── components/
│   │   ├── ui/                  # Design-system primitives (Button, Badge, Drawer, Grid,
│   │   │                        #   TabBar, Tag, Toast, Tooltip, Typography, tabs)
│   │   ├── Hero/                # Hero variants (Primary, Secondary, Minimal)
│   │   ├── FactEngine/          # Fact panel, cards, saved-facts board
│   │   ├── founder/             # Founder CV, narrative, perspective essay
│   │   ├── invest/              # Invest hero, simulator, impact engine, waitlist, disclosures
│   │   └── *.js / *.css         # Header, TopNavBar, Footer, CommandBar, SearchOverlay,
│   │                            #   Cart, DiagramViewer/Gallery, Timeline, etc.
│   │
│   ├── integrations/
│   │   └── supabase/client.js   # Supabase client with dev fallback stub
│   │
│   ├── services/
│   │   └── downloadService.js   # PDF/zip generation & download helpers
│   │
│   ├── lib/utils.js             # Shared utilities (e.g. className merge)
│   ├── utils/jsonld.js          # JSON-LD structured data helpers
│   ├── styles/                  # Design tokens + global styles
│   └── signal-multiplexer-viz/  # Standalone visualization module
│
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  # Build command, SPA rewrites, cache + security headers
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

# (Re)generate the public library manifest
npm run organize-library
```

The dev server redirects `/` to `/en`. To preview Persian, navigate to `/fa`.

---

## Environment Variables

All optional — the site runs without them.

| Variable | Purpose |
|---|---|
| `REACT_APP_SUPABASE_URL` | Supabase project URL (enables form/waitlist persistence) |
| `REACT_APP_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |

When unset, `src/integrations/supabase/client.js` returns a stub that logs intended writes instead of persisting them.

---

## Pages & Routes

Routes are language-prefixed (`/en/...`, `/fa/...`). `LangSync` in `App.js` reads the prefix, sets the active language, and injects `hreflang` alternate links for SEO. Unknown routes redirect to `/en`.

| Path | Page |
|---|---|
| `/en`, `/fa` | Home |
| `/{lang}/technology` | Technology |
| `/{lang}/science` | Science |
| `/{lang}/safety` | Safety |
| `/{lang}/architecture` | Architecture |
| `/{lang}/partners` | Partners |
| `/{lang}/company` | Company |
| `/{lang}/contact` | Contact |
| `/{lang}/perspective` | Perspective |
| `/{lang}/knowledge-base` | Knowledge Base index |
| `/{lang}/knowledge-base/:part[/:chapter[/:section]]` | Knowledge Base reader |
| `/{lang}/artifacts` | Artifacts index |
| `/{lang}/artifacts/:slug` | Artifact viewer |
| `/{lang}/library` | Document archive (browse) |
| `/{lang}/library/assets` | Library assets index |
| `/{lang}/library/assets/:slug` | Library asset viewer |
| `/{lang}/multi-agent-system` | Multi-Agent System |
| `/{lang}/invest` | Invest / crowdfunding |
| `/{lang}/bio`, `/{lang}/bio/:section` | Founder bio |

> Note: a few routes (`architecture`, and the core marketing pages) are wired for both languages; the knowledge base, artifacts, library, multi-agent, invest, and bio routes are explicitly registered for both `en` and `fa`.

---

## Internationalization

- `LanguageContext` holds the active language, persists it to a cookie, and keeps `<html lang>` and `<html dir>` in sync (Persian → `rtl`).
- Translations live in `src/data/copy.js` (and per-feature data files), keyed by language.
- `App.js` injects `hreflang` alternates (`en`, `fa`, `x-default`) on every navigation.
- Fonts: Inter (Latin) and Vazirmatn (Persian).

---

## Theming

`ThemeContext` provides light/dark theming:

- Initializes from `localStorage` (`preferred-theme`), falling back to the OS `prefers-color-scheme`.
- Applies a `light-theme` / `dark-theme` class to `<html>` and keeps the `theme-color` meta tag in sync (for browser chrome / PWA status bar).
- Persists the user's choice across sessions.

Colors, spacing, typography, and shadows are defined as CSS custom properties (design tokens) in `src/styles`.

---

## Content & Data

All primary content is static and lives under `src/data/`:

- **`copy.js`** — site-wide copy and translations.
- **`knowledgeBase.js`** — the knowledge base tree (Part → Chapter → Section), consumed by the reader.
- **`artifacts.js`** / **`diagrams.js`** — interactive artifacts and Mermaid diagram definitions.
- **`libraryAssets.js`** / **`libraryManifest.js`** — metadata for the document/asset library.
- **`facts.js`** — content for the Fact Engine retention feature.
- **`founder-bio.js`**, **`multiAgentSystem.js`** — long-form content for the Bio and Multi-Agent System pages.

Binary documents (CV, transcripts, recommendation letters, technical/policy papers, synopses) are served from `public/` and from `public/library/`.

---

## Feature Areas

- **Knowledge Base** — a structured reader with Part/Chapter/Section navigation, breadcrumbs, anchor navigation, and Markdown rendering (`react-markdown` + GFM).
- **Artifacts** — a catalogue of interactive artifacts; the viewer can embed Claude public artifacts via the serverless proxy.
- **Library / Document Archive** — browse and preview assets, add documents to a cart, and export bundles (`jspdf`, `jszip`, `file-saver`) via `downloadService`.
- **Multi-Agent System** — a long-form, diagram-rich explainer page.
- **Invest** — a crowdfunding experience: hero, investment simulator, impact engine, worked example, risk disclosures, and a waitlist form (optionally backed by Supabase).
- **Bio** — founder narrative, CV, and perspective essay.
- **Fact Engine** — a visitor-retention feature surfacing facts in a panel with a savable "facts board."
- **Command palette & search** — `CommandBar` (`cmdk`) and `SearchOverlay` for fast navigation.
- **Diagrams** — Mermaid rendering via `DiagramViewer` / `DiagramGallery`.
- **Consent & analytics** — `CookieBanner` gates Vercel Analytics and Speed Insights behind explicit consent.

---

## Components

- **`components/ui/`** — the design-system primitives: `Button`, `Badge`, `Drawer`, `Grid`, `TabBar`, `Tag`, `Toast` (with `ToastProvider`), `Tooltip`, `Typography`, and `tabs` (Radix wrapper).
- **Layout & chrome** — `Header`, `TopNavBar`, `Footer`, `ScrollProgress`, `BackToTop`, `Breadcrumb`, `AnchorNav`, `CookieBanner`.
- **Content blocks** — `Hero/*`, `SectionBlock` (+ `FullBleed` / `Sticky` variants), `CTABand`, `ThreePillars`, `StatsBand`, `QuoteBlock`, `ComparisonTable`, `Timeline`, `LogoWall`, `FAQAccordion`, `Publications`, `AbstractVisual`, `CarouselLane`.
- **Commerce** — `CartWidget`, `CartPanel`, `AddToCartButton` (driven by `CartContext`).
- **Feature modules** — `FactEngine/*`, `founder/*`, `invest/*`, `DiagramViewer` / `DiagramGallery`, `CommandBar`, `SearchOverlay`.

---

## Serverless API

**`api/artifact-proxy.js`** (Vercel Function) proxies Claude public artifacts so they can be embedded in an iframe:

- Fetches the artifact HTML server-to-server, strips frame-hostile headers (`X-Frame-Options`, CSP `frame-ancestors`), and injects a `<base>` tag so relative sub-resources still resolve to `claude.ai`.
- Validates the artifact UUID format before use (prevents SSRF / path traversal) and only fetches `https://claude.ai/public/artifacts/{uuid}`.
- Verifies the response is `text/html` (otherwise returns `502`) and sets a 1-hour cache.

---

## Library Tooling

- **`scripts/organizeLibrary.js`** (`npm run organize-library`) generates/organizes `public/library/manifest.json`, which the library pages consume.
- The `tools/` directory contains supporting admin utilities for the library.

---

## Deployment

Deployed on **Vercel**. Configuration lives in `vercel.json`:

- **Build command:** `DISABLE_ESLINT_PLUGIN=true npm run build`.
- **SPA rewrites:** all paths fall back to `/index.html` so client-side routing works.
- **Caching:** long-lived immutable cache for static assets (`/static`, images, JS/CSS); `s-maxage` + `stale-while-revalidate` for `/api`.
- **Security headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, and `Referrer-Policy: strict-origin-when-cross-origin`.

See `VERCEL_DEPLOYMENT.md` and `VERCEL_PRO_ENHANCEMENTS.md` for additional deployment notes.