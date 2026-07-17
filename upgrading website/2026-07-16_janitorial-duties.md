# Ghost Autonomy Website — Janitorial Duties Register

**Date:** July 16, 2026 · Verified against the working tree on disk today (post–Wave 1).
**Scope:** Janitorial work only — removals, relocations, corrections, and hygiene policies that change no feature and add no content. Architecture-level work (CRA→Vite migration, exhibition hall upgrades, KB content pipeline) is deliberately excluded; it belongs to Wave 2, not to a cleaning pass. Every item below was confirmed present on disk before being listed.

---

## 1. Public-folder review — the one janitorial item with a sensitivity edge

Everything under `public/` is served verbatim at the site root, and the folder currently carries two classes of files that deserve a decision rather than a reflexive delete.

First, **`public/Website Creating Prompt`** (78 KB) is the original internal site-creation brief — including the full public/gated/internal sensitivity triage matrix that names which topics are classified "Internal/Omit." It is publicly downloadable at `/Website%20Creating%20Prompt`. An internal classification document is the one artifact that should never itself be public: it tells a reader precisely what you consider sensitive. Move it to `upgrading website/` (or delete it from the repo; a copy exists in the session archives), and treat its past exposure like the coverage bundle's — the file has been served for months.

Second, the **personal-document set** at the public root: CV, MS transcript (1.8 MB), PhD transcript, three recommendation letters (one filename misspelled `Recommandation_Letter_2.pdf`), `Professional_Contacts.pdf` (387 KB), and two G10 synopses. The CV and papers are plausibly intentional (the Bio page links them). The transcripts, the recommendation letters, and especially `Professional_Contacts.pdf` — which by its name contains third parties' information — warrant an explicit keep-or-remove decision each. Whatever stays should be renamed correctly and listed in the library manifest so the counts below stop drifting.

## 2. Dead code — safe deletes, verified unimported today

About 230 KB of source is imported by nothing and can be deleted in one commit: the eight legacy modules at the `src/` root (`Knowledgebase.js` 65 KB, `Knowledgebasereader.js` 28 KB, `Knowledgebase-addendum.js` 19 KB, `Knowledgebase.css` 35 KB, `FactEngine.js` 14 KB, `Jsonld.js` — a byte-identical duplicate of `src/utils/jsonld.js` — plus `Ghost doc instance.json` and `Ghost doc schema.json`, both with spaces in their names); the retired hero pair `components/Hero/HeroSecondary_old.js/.css`; and — new since Wave 1 — `components/StatsBand.js/.css`, whose only consumer was the unlabeled Technology band that has been replaced, and the now-orphaned `SafetyLayersVisual`, `PhysicsAbstraction`, and `FounderPlaceholder` exports in `AbstractVisual.js` (keep `EpuVisual`, still used on Technology, until a blueprint replacement exists). `src/STYLE/Dark theme.css` (16 KB, unimported, space in filename) goes with them; the three planning markdowns in `src/STYLE/` should move out of `src/` into `upgrading website/`, since documentation has no business inside the compile tree.

## 3. Duplicates and empty files

Three copies of the Temporal State Management PDF exist (`public/docs/pdf/`, `public/library/misc/`, `upgrading website/` — ~1.7 MB combined); keep the published `docs/pdf` copy, remove the others. `Asset/Climate_Policy_Paper.pdf` is byte-identical in size to `public/Policy_Paper.pdf` (2,390,913), and `Asset/A_Physics_Informed_...pdf` near-duplicates `public/Technical_Paper.pdf` — the `Asset/` folder can likely be removed whole once confirmed, along with its 3-byte `text` file. In the library: `overlay-archipelago-synthesis (1).md` is an exact duplicate of its sibling; `سند تبدیل دانش.pdf` and `document_pdf.pdf` are the same 419,245-byte file under two names; `Samsung_Letter.md` is zero bytes (delete or write it). Root-level `G10 Synopsis.pdf`/`(FA)` duplicate the copies in `public/`.

## 4. Root workspace strays

The repo root doubles as a desk drawer: essay source texts (`AI Hype`, `AI Hype Farsi`, `continuation bet`, `continuation bet Farsi`, `COMMERCIALIZING A MICROCHIP ARCHITECTURE`, the Farsi commercialization narrative), `notion_files_list.txt` (119 KB), `layout problem.pdf`, `Improving user experience.docx`, `library-hierarchy-compact-view.md`, `ghost-autonomy-website.iml` (IDE artifact), and — inside `upgrading website/` — a 107 KB `New Text Document.txt`. None are wrong to keep; all are wrong to keep *there*. A single `project-docs/` (or the existing `upgrading website/`) absorbs them, leaving the root with only what the toolchain reads. Fix the folder-adjacent misspelling while at it: `Preliminray plan of Carousel for Perusal`.

## 5. Configuration and repo hygiene

`.gitignore` needs surgery: it contains a stray literal `nul` line (a Windows artifact), lists `.idea/` twice, and references a defunct `Lovable/`; it should gain `src/signal-multiplexer-viz/node_modules/` and `src/signal-multiplexer-viz/dist/` so the sub-app's build residue can never be committed from inside `src/`. `src/App.test.js` is still the Create React App default asserting a "learn react" link that has not existed for a year — the suite is guaranteed red; replace it with one real smoke test (render `App`, expect the Home hero) or delete it until tests are a practice. Ten `.DS_Store` files litter the tree (ignored by git but noise on disk). `_to_delete/` currently holds 1.6 MB across `exhibition-assets-old/` and `exhibition-leaked-bundle-2026-07-16/` — emptying it in Finder is the last step of the leak cleanup. `.vercel-trigger` (an empty-commit deploy hack) should be deleted once the Vercel build settings are trusted.

## 6. Consistency sweeps (data janitorial)

Counts disagree across surfaces: the nav chip says "1,751 archived documents," the hierarchy JSON counts 1,775, Home claims "109 documented assets," `libraryAssets.js` defines 50 slugs, and the public manifest lists 65 files. One regeneration pass (`npm run organize-library`) plus one edit session should make every displayed count derive from the manifest rather than from memory. Related copy debt: `copy.js` still carries superseded Home fields from before the minimal front (audit `home.*` keys against actual `Home.js` usage), and `App.js` hardcodes `BASE_URL = 'https://ghost-website-kappa.vercel.app'` for hreflang — wrong the day a custom domain lands; move it to an env var with the current value as fallback. The footer year, for the record, is already correct (© 2026, both languages).

## 7. Git housekeeping

From the February forensics episode, three identical branches (`main`, `master`, `Main-R`) and two `backup-*` tags still exist, with GitHub defaulting to `main` while Vercel deploys `master`. Consolidate to `main` as production, delete `Main-R`, archive or delete `master`, and drop the backup tags once the current state is confirmed good. This is ten minutes of work that removes a whole class of "which branch is real" confusion permanently.

---

## Register (suggested order · one afternoon total for items 1–5)

| # | Duty | Action | Effort |
|---|---|---|---|
| 1 | `public/Website Creating Prompt` | Move out of `public/` now; treat past exposure as disclosed | 5 min |
| 2 | Personal PDFs in `public/` (transcripts, letters, contacts) | Decide keep/remove each; fix `Recommandation` spelling; register keepers in manifest | 30 min |
| 3 | Dead code (§2, ~230 KB incl. StatsBand + orphaned AbstractVisual exports) | Delete; run `npm run build` to confirm | 30 min |
| 4 | Duplicates & empty files (§3) | Delete/mv per list | 30 min |
| 5 | Root strays + `src/STYLE` docs (§4) | Relocate to `upgrading website/`; fix misspelled folder name | 30 min |
| 6 | `.gitignore`, `App.test.js`, `.DS_Store`, `.vercel-trigger`, empty `_to_delete/` | Repair/replace/delete per §5 | 45 min |
| 7 | Count reconciliation + copy debt + `BASE_URL` env | Regenerate manifest; derive displayed counts; audit `home.*` keys | 1–2 h |
| 8 | Branch/tag consolidation (§7) | `main` as production; delete `Main-R`, backup tags | 15 min |

Two boundaries stated for clarity: re-enabling ESLint (fixing warnings instead of `DISABLE_ESLINT_PLUGIN=true`) is process repair that belongs with the Wave-2 CI work, not this pass — but nothing in this register should add new warnings; and the sub-app's residence inside `src/` is an architecture item, mitigated here only by the `.gitignore` additions in duty 6.

*Note on deletions: files on your Mac cannot be deleted from this session — removals land in `_to_delete/` for you to empty, or you run the deletes yourself from the register above.*
