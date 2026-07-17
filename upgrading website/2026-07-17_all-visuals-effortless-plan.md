# All Visuals, Effortlessly Open — Inventory & Plan

**Ghost Autonomy website · July 17, 2026**
**Companion to:** `2026-07-17_effortless-interaction.md` (the ten-rule open-instrument standard). That document defined the rules and certified one page. This one answers the follow-up question — *do we have the plan to make **all** visuals accessible effortlessly?* — with a complete inventory, a score for every visual surface on the site, and a sequenced plan for the remainder.

---

## 1. Method

Every visual surface was enumerated from the code, not from memory: all `<iframe>`/`srcdoc` embeds, every component in `src/components/visuals/`, the artifact registry (`src/data/artifacts.js`, 18 entries), the exhibition shell, and the embedded HTML corpus on disk (12 root documents + 4 memory instruments + 3 simulation instruments + the new poster plate). Each was checked against the ten rules where they apply — chiefly R1 (open by default), R2 (zero-click-to-value), R7 (URL is the state), R8 (theme/language inheritance), R9 (one-click full screen), R10 (one-click audit twin).

## 2. Inventory and standings

**Compliant today — no work needed.**

*The Simulation Bench* (3 instruments) — the reference implementation; R1–R10 in full.
*The Final Plate* (`/epu`, added today) — the EPU poster as the site's deliberate last page: final entry in every navigation surface, final sitemap URL, closing link in the footer of every page; poster open on arrival, honest PROPOSED standing, one-click full view; a 419 KB optimized derivative serves inline while the original 3.4 MB PNG sits behind "Open full."
*The Exhibition* — opens with the Multiplexer room already selected and running; `?view=` deep links; live-capture thumbnails; Open full. R1/R2/R7/R9 pass.
*The six in-page instruments* — NarrowingHero (Home), RefusalScrollStory (Safety, scroll-driven — the zero-click gesture par excellence), GearboxExplorer (Architecture, default route rendered), AgmDemo and EnvelopeChart (Science, meaningful defaults), MoatStrip and the cover shelves. All render value with zero clicks and are theme-native because they live in the site's own CSS.
*Multi-Agent System page* — full-page embed, open on load.

**Near-compliant — Phase 1 targets.**

*The Memory Wing* (4 instruments). Open by default and `?view=`-linked, but the card grid sits **above** the viewer (the pre-standard layout), and the instruments ignore the site theme: their fixed palette is a near-cyanotype dark (`#0A101C` ground — coincidentally close to the site's dark `#0b1626`), so they look native in dark mode and inverted-context in light mode. Diagnosis from the files themselves: all four are already `:root`-variable-driven with **zero** hard-coded theme logic — exactly the precondition that made the simulation restyle mechanical.

**Fixed-palette plates — exempt by rationale, not neglect.**

The 12 legacy HTML documents (Dashboards 1–3 in EN and FA, Epistemic Gearbox Stack, Master Blueprint Map, the two Mercedes perception-stack plates, Metabolic Memory Reservoir, MAS Laboratory) have no theme machinery at all. They are finished, dated plates — the drafting-room convention that a printed sheet keeps its ink. The blueprint grammar already recognizes this class: covers and photographs are exempt from dark-mode inversion. The plan formalizes the same exemption for these plates rather than proposing twelve rebuilds nobody asked for. They remain open-by-default wherever embedded (the artifact viewer fetches and renders on arrival), which is the part of the standard that touches the visitor.

## 3. The plan

**Phase 1 — bring the Memory Wing to the standard.** Rebuild `MemoryWing.js` on the Simulation Bench template (viewer first, switcher on the viewer, cards below as documentation) and give the four memory instruments the same treatment the simulation files received: a light blueprint palette alongside the existing dark, the three-block variable structure, the `?theme=` pre-paint reader, and the theme-button label sync. Four HTML files plus one page component; the recipe is proven and the verification rig (build → headless screenshots both themes → zero-console-error gate) already exists.

**Phase 2 — theme-awareness flags in the registry.** Add a `themeAware` flag to artifact entries so the artifact viewer can inject `data-theme` into `srcdoc` for instruments that understand it (the simulation three now; the memory four after Phase 1) and label fixed plates as plates in the viewer chrome. One data file, one viewer touch.

**Phase 3 — deep-link parity for in-page instruments (optional).** `?route=` for the GearboxExplorer and `?k=` for the AGM demo would extend R7 to the component instruments. Deliberately low priority: these live inside narrative pages where the page URL is already the sharable unit.

**Phase 4 — the standing exemption register.** A short section in the artifact registry documenting which plates are fixed-palette and why, so future audits read intent instead of rediscovering gaps. Folds into the next audit sweep.

Nothing in the plan gates anything today: every visual on the site is already reachable and open; the phases close the remaining distance between "open" and "effortless everywhere, in both themes, at every entry point."

## 4. Standing constraints

The sequencing respects the working rules of this project: the strategy stays 100% visual; sole contact routing is untouched; deletions go to `_to_delete/`; and none of it reaches the live site until you push. Phase 1 is ready to execute on your word — say "run phase 1" and it lands the same way the Simulation Bench did.

---

## Addendum — the level-one re-architecture (same day, executed)

The plan above measured effortlessness *within* pages; the author's follow-up named the deeper constraint: click *distance*. Every artifact sat two or more decisions from arrival. The answer, per the author's original vision, is now built: **the front-hall carousel** on the home page, where the major works are simultaneously available and open. Thirteen works ride the rail — the three simulation instruments, the four memory instruments, the four exhibition rooms, the Multi-Agent Laboratory, and the Final Plate as the closing slide. All of them are live: every instrument slide mounts its real HTML document in a running iframe from page load and keeps it mounted — nothing on the rail is reduced to an image (the author's explicit doctrine; the Final Plate alone is an image because it is a poster). Lazy fetch staggering and the browsers' native throttling of offscreen frames keep the rail tractable without substituting content; the captured PNGs survive only as split-second boot posters behind each frame. Every slide carries a one-click "Enter" that lands inside the wing with the same instrument open — level zero to see and touch, level one to inhabit. The Memory Wing was rebuilt viewer-first in the same stroke (the layout half of Phase 1; the light-palette/theme-reader half remains as Phase 1b), and all thirteen works became deep-link entries in the command palette and search. The registry lives in `src/data/majorWorks.js`; curating the wall is a one-file edit.
