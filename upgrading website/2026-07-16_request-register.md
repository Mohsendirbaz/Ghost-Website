# Ghost Autonomy Website — Request Register

**Purpose:** every request from this working session, consolidated and crossed off one by one, as asked. Updated July 16, 2026 (end of session batch). Items marked ⚠ need an action only you can take.

## Crossed off

- [x] **Critical architecture review** — delivered `upgrading website/2026-07-15_website-architecture-critical-review.md`.
- [x] **"Start implementing — all visual" (Wave 1)** — blueprint grammar, standings system, Narrowing hero, Safety scroll story + G-ring, 325-route gearbox explorer, AGM demo, envelope chart, cover shelf; both P0 governance findings closed (coverage view stripped from the public exhibition with a build assertion; unlabeled StatsBand claims replaced).
- [x] **Janitorial register** — executed; dead code, duplicates, strays retired to `_to_delete/`; `.gitignore` repaired; counts made honest; deprecated manifest script replaced by `scripts/rebuildLibraryManifest.js`.
- [x] **Memory Module placement + moat-centric architecture** — instruments at `public/docs/html/memory/`, artifact registry entries, Exhibition annex, Home MoatStrip.
- [x] **Shine pass** — real favicon/PWA icons/manifest (stock CRA branding replaced), social-share card + og:image meta, live-capture thumbnails on the four exhibition room cards, thesis PDFs added to the Technical Library with rendered covers.
- [x] **Single legitimate contact everywhere** — dirbaz.sharif@gmail.com · +1-312-925-5930. JSON-LD, Bio mailto, PDF export footers, and site-URL claims corrected away from `ghostautonomy.com` (a domain belonging to the defunct company of the same name).
- [x] **Forms routed only there** — the contact form no longer posts to the dead Formspree placeholder (every past submission had errored); it now composes an email to the one address in the visitor's own mail client. Supabase removed entirely — no silent-loss path remains.
- [x] **Invest page removed completely** — routes, nav, palette/search entries, components, dependency.
- [x] **Partners and Company tabs deleted** — same treatment; files retired to `_to_delete/`, Bio breadcrumb fixed.
- [x] **"Did you know" widget stays away once closed** — dismissal now persists (localStorage); it no longer reappears on navigation.
- [x] **Memory HTMLs given a tab** — new **Memory Wing** page at `/en/memory` and `/fa/memory`: four instrument cards with an inline viewer, full-screen escape, artifact links, and the thesis shelf; in the nav (Resources), command palette, search, and sitemap; MoatStrip memory card points there.
- [x] **Technical Library redesigned** — rebuilt to the home page's grammar: mono eyebrows, blueprint frames, cover-led shelf grid by tier and category, live filter, honest computed counts, per-asset status chips (queued items say "queued" instead of pretending).
- [x] **State-management / navigability repair** — root cause found: the site had **no scroll reset on route change**, so every navigation landed mid-page at the previous scroll position, which reads exactly as "circular, non-navigable." `ScrollToTop` added at the router root. Verified the other loops: header mega-menu already closes on navigation, palette/search close on select, and the fact widget is fixed above. A top-level `ErrorBoundary` now catches render crashes instead of blanking the app.
- [x] **Basic scaffolding** — Privacy and Terms pages (bilingual, accurate to what the site actually does; footer's dead labels now link to them), a real 404 page instead of a silent redirect, `sitemap.xml` generated on every build + `robots.txt` pointer, canonical tags, `.well-known/security.txt`, and a GitHub Actions CI (build + tests + the exhibition coverage assertion) at `.github/workflows/ci.yml`.

- [x] **Careers tab** — `/en/careers` + `/fa/careers`, wired across all six navigation surfaces. Eight founding-role openings mapped onto the stack; the fifteen skillsets selected from the program's own Faculty of Fifty roster (every P1 technical cluster, roster codes shown). One-step application: choose resume → one button → the visitor's own mail client opens addressed to dirbaz.sharif@gmail.com with everything prefilled and an attach reminder — nothing stored on the site, no third parties.

## Open — yours ⚠

- [ ] **`git add -A && git commit && git push`** — nothing above is on the live site until you push; this is why the Memory instruments were "not found on web." Vercel deploys from the push.
- [ ] **Enable the CI**: the workflow file is in place; it activates on the first push (check the Actions tab).
- [ ] **Legal pages**: have counsel review Privacy/Terms — they are accurate but minimal, and jurisdiction questions are deliberately left out.
- [ ] **Domain & naming**: decide on an owned domain (and whether the Ghost Autonomy name collision with the defunct company is acceptable); then set `REACT_APP_SITE_URL` in Vercel and regenerate the social card.
- [ ] **Empty `_to_delete/`** (~7 MB now, including the retired leaked bundle and removed pages).
- [ ] **Branch cleanup** (from the janitorial register): make `main` the Vercel production branch; delete `Main-R` and the stale backup tags.
- [ ] **Two queued library entries** (`forensic-case-tesla`, `still-a-worm`) await their PDFs.
- [ ] Optional: publish the two held-back Memory HTMLs after polish; Persian variants of the Memory instruments.

## Extensive audit for the same defect class (July 16, later)

- [x] **TopNavBar — the second navigation bar — still linked all three deleted pages** (Partners, Company, Invest → each a 404). Removed; Memory Wing added. This was the exact same miss-class as the original report.
- [x] **30 circular `targetUrl`s in the library data** — assets whose "file" pointed back at their own viewer page ("circular logic," literally). 20 rewired to their real archive files via the manifest; the other 10 have **no source file anywhere on disk** (six L4 .docx surveys, four Notion exports) and now carry honest non-READY statuses. The asset viewer already banners non-ready items instead of fetching, so nothing renders broken.
- [x] **Unlabeled "247× GPU speedup" claim** in a library description — same class as the removed StatsBand multipliers; reworded to standings-compliant framing (EN + FA). A sweep found no other multiplier claims in copy or data.
- [x] **`document.title` was never set per page** — every tab, bookmark, and analytics entry shared one title. Bilingual per-page titles now set on navigation.
- [x] **Orphaned `public/data/facts.bundle.json`** (superseded fact source) retired; dead Partners/Company/Invest nav labels removed from copy.
- [x] **Verified clean:** zero placeholders/TODO/FIXME in shipped code; all 117 referenced public files exist except the two known queued PDFs (now safely gated); all 30 referenced library slugs and every artifact slug resolve; no other stale route references; consent, overlay, and dismissal state all persist correctly. Parts count (8) verified against data; the "43 chapters" figure is consistent across all surfaces but was not independently recomputed from the tree.
