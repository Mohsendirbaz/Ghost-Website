# Asset-Architecture Audit — the Flaws, Listed

**Ghost Autonomy website · July 22, 2026**
**Occasioned by:** the founder's finding that one publication's PDF is served from a different location than its sibling on the same tab. The finding is correct, it is a class, and this audit enumerates the whole class plus its siblings — every item verified against the repository, not asserted. Each flaw is the kind any website administrator, amateur or professional, would flag.

---

## The reported flaw, confirmed

The Bio tab serves its documents from **two different stores**: the two Publications now resolve to `/docs/pdf/…`, while the same page's Key Documents sidebar (CV, both transcripts, three recommendation letters, professional contacts, the two G10 synopses — nine files) serves straight from the **web root** `/…pdf`, beside `favicon.ico` and `manifest.json`. One tab, two asset architectures. This happened because each content wave chose its own destination and no written rule existed; last night I placed the revised papers in the right store and retired two root files, but did not flag or migrate the other nine — the standard should have led, and it did not.

## The full list

**F1 · Same surface, different stores.** As above: Bio pulls nine documents from `/` and its publications from `/docs/pdf/`. Severity: the reported defect; medium mechanically, high as a signal of missing standards.

**F2 · Four parallel document stores with no rule.** Documents live in `/` (9 PDFs), `/docs/pdf/` (20), and the 60-item `/library/**` archive tree — with genuine consequences: **two CVs** are served (`/Mohsen_Dirbaz_CV.pdf` and `/library/application/CV 2026.pdf`) and **two versions of the same paper** under two names in two stores (`/docs/pdf/temporal-state-management.pdf` vs `/library/misc/Temporal State Management.pdf`). Nothing states which copy is canonical.

**F3 · Filenames unfit for URLs — 39 files with spaces.** Every space becomes `%20` in the address bar and in shared links; the archive also carries Notion hash-suffix names (`…Complete Lecture e314cbb8ea4b4c0bb415cdade0d04eb9.md`) and three naming conventions side by side in the same directories (Snake_Case, kebab-case, Title Case, plus Persian filenames with spaces). This is the single most recognizable amateur flag to any admin.

**F4 · Personal records served from the public root.** MS and PhD **transcripts**, three **recommendation letters** (third parties' names and signatures), and a **Professional_Contacts.pdf** are world-readable at guessable URLs and linked from the Bio, hence crawlable and archivable. Whatever the disclosure intent, personal records do not belong in a company site's public root — and the repository's own `.gitignore` contains a `/private-not-served/` entry showing this distinction was once intended. **Decision needed from you**: keep public deliberately, or move behind the intended private path.

**F5 · Multiple sources of truth for the same lists.** The page list is hand-maintained in **five places** — `navConfig.js` (now feeding header + top bar), CommandBar (19 paths), SearchOverlay (20), Footer (10) — and this class has already bitten once (the old top bar silently dropped three pages). The same paper is described by **two independent metadata records** (Publications.js and libraryAssets.js). The memory instruments are defined in **three files** (MemoryWing, majorWorks, artifacts).

**F6 · Identity hardcoded fifteen times.** The sole-contact email/phone appears as literals across five source files. Under your own "one legitimate contact" rule this should be a single config module; today a change is a hunt.

**F7 · Orphans and a live breakage from unmanaged renames.** `P13_partnership_loop.svg` still ships although the Partners page it illustrated was deleted. And the poster file was renamed on disk (`epu-poster.png` → `epu-poster.jpg`) after the page referencing it was written — the Final Plate's "Open full" has been returning 404 since. (Reference fixed in this batch; the class remains: string-literal paths with no existence check.)

**F8 · A knowingly broken data reference.** `forensic_case_of_Tesla.pdf` has been referenced by a QUEUED library entry since the redesign; the file exists nowhere in the corpus. The viewer gates it honestly, but a reference without a file is still a standing IOU.

**F9 · No automated guard for any of the above.** CI checks the build, the tests, the exhibition-leak assertion, and (since this week) nav ⇄ sitemap — but nothing verifies that every referenced asset exists and every shipped asset is referenced. Every flaw above was findable mechanically; none had a machine watching for it.

**Verified clean, for the record:** `.gitignore` correctly excludes build output, node_modules, sub-app dist, and `_to_delete/`; no byte-identical duplicate files ship; the conventional root files (favicon, manifest, robots, sitemap, logos, og-image) are exactly where they belong.

## The standard (so it leads from now on)

One rule-set, written down: documents live only in `/docs/{pdf,html,svg,md}/`; generated covers in `/covers/`; imagery in `/founder/` and `/posters/`; the `/library/` archive is grandfathered but new archive files follow the rules; the web root holds only the seven conventional files. Filenames: `Snake_Case`, no spaces, no hashes, one extension truthful to the format. Personal records never enter `public/` (the `private-not-served/` path exists for them). Every list rendered in more than one place is generated from one registry. And a `verifyAssets` script joins `verifyNav` in CI: every reference must resolve, every shipped file must be referenced or exempted by name.

## Remediation plan (on your word)

Phase 1 — migrate the nine root documents into `/docs/pdf/`, update FounderCV/Bio references, retire the root copies (½ day, includes your F4 decision). Phase 2 — de-duplicate the CV and Temporal pair; declare canonical copies (small). Phase 3 — archive renaming sweep with a redirect map for the 39 spaced names (½ day, mechanical, done by script). Phase 4 — collapse F5's five lists into navConfig-style registries and extract the contact module (½ day). Phase 5 — write `scripts/verifyAssets.js`, wire into CI beside verifyNav (small). Say "fix them" and the phases run in order.

---

# Part II — Codebase Architecture Flaws (second pass, same day)

Part I covered where assets live. This part audits the code base itself: the recognized catalogue of web-architecture bad practice — the things any admin or front-end professional checks first — each hypothesis hunted in this repository and either confirmed with numbers or cleared. Confirmed findings first, worst first.

**C1 · Two design systems in one application.** The Bio page and its satellites (Publications, FounderCV, FounderNarrative, PerspectiveEssay — five files) are built on a Tailwind-style utility/neumorphic system (`neu-raised`, `w-40 h-40`, `text-3xl font-display`) while the entire rest of the site runs the blueprint CSS grammar. Two visual languages, two maintenance disciplines, one product. This is the front-end equivalent of the Part I store-split — and the likeliest root of "this tab feels different" observations.

**C2 · The route table is written out twice.** 26 hand-written `/en/*` routes plus 26 parallel `/fa/*` routes instead of a single parameterized `/:lang/*` tree. Every new page costs two route lines plus a PAGE_TITLES entry — three chances to drift per page, in a codebase whose nav has already drifted once. The professional pattern is one route definition with the language as a parameter.

**C3 · Two i18n mechanisms running in parallel.** The central `copy.js` dictionary exists — and beside it, **333 inline `lang === 'en' ? … : …` ternaries** are scattered through pages and components (many added in recent feature waves, mine included). Bilingual content lives half in the i18n layer, half in markup; a translator or proofreader cannot find the Persian text in one place.

**C4 · Presentation hardcoded in markup: 122 inline `style={{…}}` blocks.** Top offenders: KnowledgeBaseReader (16), Technology (15), FinalPlate (12), MemoryWing (9), Simulation (8). The blueprint stylesheet is the design system of record; these bypass it. I am the author of most of the recent ones — the standard existed and the new pages did not follow it.

**C5 · The same viewer implemented five times.** The framed-iframe instrument viewer (bp-frame + theme-synced src + toolbar) is copy-pasted across Simulation, MemoryWing, Technology, Exhibition, and MultiAgentSystem rather than extracted into one `<InstrumentViewer>` component. Divergence is already observable: only the Final Plate has an image-failure state; only the ArtifactViewer sandboxes.

**C6 · Eight orphaned component files ship in src/**: AbstractVisual, AnchorNav, CarouselLane, LogoWall, QuoteBlock, SectionBlockFullBleed, ThreePillars, Timeline — imported by nothing, classic template residue plus one file orphaned by our own EPU-poster swap. Dead code is where future confusion breeds.

**C7 · Zero code-splitting.** No `React.lazy`, no dynamic imports: all ~40 pages, the command palette, and every data module ship in the initial bundle. With 1,300-line data files (next item) this is a real first-load cost, and CRA supports splitting out of the box.

**C8 · Content-as-code at CMS scale.** `libraryAssets.js` (1,380 lines), `diagrams.js` (1,102), `copy.js` (1,074), `knowledgeBase.js` (724), `multiAgentSystem.js` (645). Editing site content means editing JavaScript source. Defensible for an early-stage site; at this size any professional flags the trajectory — content wants to be data (JSON/manifests), not modules.

**C9 · Iframe sandboxing is inconsistent.** Ten iframes across the site; two carry a `sandbox` attribute (ArtifactViewer only). All embeds are same-origin so the practical risk is low — the flaw is the inconsistency: no stated policy for when an embed is sandboxed.

**C10 · Ad-hoc localStorage in seven modules.** Consent, theme, facts, saved-facts, cart, legal, and App each roll their own keys and error handling — no shared storage utility, no versioned namespace. One renamed key silently breaks one feature.

**C11 · Redirects only exist client-side.** `/science → /technology` is an in-app `<Navigate>`; `vercel.json` has no redirect entry, so old links and crawlers receive a 200 for the SPA shell and then bounce. Professionals put permanent redirects at the edge (a one-line vercel.json `redirects` entry).

**C12 · Per-page metadata is titles-only.** Titles are set per page (fixed in an earlier audit), but one global description and one og-image serve every URL. A professional-level nit, listed for completeness.

**Verified clean — the checklist items this codebase passes:** security headers are properly set in vercel.json (nosniff, X-Frame-Options, XSS-Protection, Referrer-Policy) with immutable caching for static assets; the cookie banner is real, not cargo-cult — Vercel Analytics mounts only after consent, exactly as the Privacy page states; `target="_blank"` links consistently carry `rel="noopener noreferrer"` (an earlier single-line scan suggested violations; they were multi-line JSX — cleared); ErrorBoundary and a real 404 exist; no CDN script soup, no jQuery archaeology, no build artifacts or node_modules tracked in git.

## Remediation, Part II (appends to the phases above)

Phase 6 — extract `<InstrumentViewer>` and replace the five copies (½ day, removes C5 and most of C4's new offenders). Phase 7 — retire the eight orphan components to `_to_delete/` (minutes). Phase 8 — add the vercel.json redirect for /science and per-page descriptions (small). Phase 9 — route tree to `/:lang/*` parameterization (1 day, touches App.js only, mechanical but must be smoke-tested on all pages). Phase 10 — i18n consolidation: migrate the 333 inline ternaries into copy.js progressively, newest pages first (background discipline, not one sitting). Phase 11 — decision item: Bio design-system unification into the blueprint grammar (1–2 days, visual change — your call, since the Bio's current look may be intentional). Code-splitting (C7) and content-externalization (C8) are scheduled improvements, not defects to rush.
