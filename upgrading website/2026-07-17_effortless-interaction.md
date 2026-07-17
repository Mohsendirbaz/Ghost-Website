# Effortless Interaction — the Open-Instrument Standard

**Ghost Autonomy website · design standard · July 17, 2026**
**Companion to:** the 100%-visual strategy (`2026-07_visual-overhaul-plan-v2.md`) and the blueprint grammar (`src/styles/blueprint.css`).
**Occasioned by:** the Simulation Bench (`/en/simulation`), whose three instruments are the first pages built to this standard from the start.

---

## 1. The principle

A visitor's attention is spent in clicks. Every click a page demands before it shows its main content is a toll booth, and each toll loses a fraction of the audience: industry practice treats each additional required interaction as a meaningful drop-off point, and our own experience with the Memory instruments ("I did not find them on web") shows that content hidden behind navigation ceremony may as well not exist. The 100%-visual strategy says *don't decorate the text — replace the text's job*. This standard extends it one step: **don't gate the visualization — have it already open.**

The axiom, in one sentence:

> **The major visualization is open, running, and touchable at the moment of arrival. Clicks change what it shows — they never unlock it.**

Under this axiom, "double-click" and "triple-click" ceremonies are not interactions to be smoothed; they are symptoms of a page whose center of gravity is in the wrong place. The fix is never a faster click — it is removing the reason the click existed.

## 2. Click accounting — where multi-click ceremonies come from, and what replaces them

The old pattern (navigate → find the card → click to open → click play → finally see motion) costs three to four decisions before any value appears. Each ceremony below is a real pattern from this site's history, paired with its effortless replacement. The replacements are not hypothetical; section 4 lists where each is now live.

**Ceremony 1 — click to open, then click to start.**
*Replacement: autoplay on load.* All three simulation instruments integrate (RK4) and animate from the first frame; the Pause button exists to *stop* motion, not to grant it. The visitor's zeroth click already has a running double-lane-change in front of it. This is "zero-click-to-value": the page's proof is playing before the visitor has decided to invest anything.

**Ceremony 2 — scroll to find the viewer, click a card, scroll back.**
*Replacement: viewer-first layout.* On the Simulation Bench the inline viewer is the first section under the hero, and the instrument switcher sits *on* the viewer as a tab row, not in a card grid elsewhere on the page. Descriptive cards still exist — below, as documentation. They are a second way to switch, never the only one. A double-click-plus-scroll becomes a single click with no travel.

**Ceremony 3 — configure eight sliders to see a behavior.**
*Replacement: named presets.* "Double lane change," "Stop-and-go," "Slalom," "Coordinated avoidance" — one click sets every parameter to a vetted, meaningful state. Sliders remain for the visitor who wants to ask their own question; presets carry the visitor who wants the instrument's best answer first. A preset is a curated experiment, and curation is what turns ten clicks into one.

**Ceremony 4 — read a chart, then type the value it made you curious about.**
*Replacement: the chart is the control.* The J(ε) objective bowl in the Symmetry instrument accepts a click — or a drag — anywhere on its surface, and that click *sets* ε. The question ("what if the maneuver were skewed?") and the answer (every mirrored strip re-drawing) live on the same pixels. This is the single strongest pattern in the set: wherever a visualization displays a parameter sweep, clicking the sweep should select the parameter.

**Ceremony 5 — click into states to inspect them.**
*Replacement: hover is inspection; commitment is never required.* The shared tooltip follows the pointer across all six signal strips at once, synchronized to one time cursor; the 3-D actuation curve rotates on drag; the playbar scrubs to any instant. All of these are one continuous pointer gesture — no click acquires a mode, so no click is needed to leave one. (Touch degrades gracefully: scrub and drag work; hover-only details also live in the table view.)

**Ceremony 6 — re-navigate to where you were.**
*Replacement: the URL is the state.* `?view=` names the active instrument on the Simulation Bench and Memory Wing, so a shared or bookmarked link reopens the exact instrument — the recipient of a link pays zero clicks to reach what the sender was seeing. Dismissals persist (the fact widget stays dismissed); the site theme follows the visitor into each instrument (`?theme=` is passed to the iframe, so dark mode arrives dark, with no flash and no second toggle).

**Ceremony 7 — hunt for the escape hatch.**
*Replacement: exactly two standing exits, always one click, always in the same place.* "Open full ↗" lifts any embedded instrument into a clean tab; "Table view" flips the same data into numbers — the accessibility twin and the skeptic's audit trail. Because they are always present and always cost one click, they never need to be searched for.

## 3. The standard

Ten rules, stated as policy. New pages comply from the start; existing pages are brought into compliance opportunistically (section 5).

**R1 · Open by default.** The page's major visualization renders and runs on arrival. No placeholder, no poster frame, no "click to load."
**R2 · Zero-click-to-value.** The first meaningful state (a running maneuver, a populated chart) requires no interaction at all.
**R3 · Clicks steer, never unlock.** Every click changes *what* is shown or *how* it is framed. A click that merely reveals something that could have been open is a defect.
**R4 · The chart is the control.** Where a visualization displays a domain (a sweep, a timeline, a space), pointing at the domain selects within it — click-to-set, drag-to-rotate, scrub-to-seek.
**R5 · Presets before parameters.** Every parameterized instrument ships named, one-click experiment presets; raw sliders are the second layer, not the first.
**R6 · Hover is free.** Inspection (tooltips, crosshairs, linked cursors) rides the pointer with no click and no mode to enter or exit.
**R7 · The URL is the state.** Active view, and where reasonable the active configuration, is encoded in the query string; every interesting state is shareable and returnable at zero cost.
**R8 · Context follows the visitor.** Theme and language are inherited by embedded instruments — never re-asked.
**R9 · One-click escape.** Full-screen ("Open full ↗") is always one click from any embedded instrument.
**R10 · One-click audit.** The tabular/textual twin of every visualization ("Table view") is one click away — the standings discipline's guarantee that the picture never outruns its numbers.

## 4. Where the standard is live today

The Simulation Bench (`/en/simulation`, `/fa/simulation`) satisfies R1–R10 in full: viewer-first layout with an on-viewer switcher; all three instruments autoplay (R1/R2); the J(ε) bowl is click-and-drag-to-set and the actuation space is drag-to-rotate (R4); maneuver presets (R5); synchronized hover tooltips and scrub bars (R6); `?view=` deep links (R7); `?theme=` inheritance into the iframe with the instrument's theme button honestly reflecting it (R8); Open full ↗ (R9); Table view in each instrument (R10).

Elsewhere, the patterns predate their codification: the home hero animates on load and the gearbox explorer, AGM demo, and envelope chart all render live without gating (R1/R2); the Memory Wing carries `?view=` sync, inline viewing, and Open full ↗ (R7/R9); Exhibition rooms open with live captures rather than click-to-boot placeholders (R1); the fact widget's persistent dismissal and the scroll-reset repair were both earlier applications of R7's spirit — state that respects the visitor's last decision.

## 5. Known gaps — honest and scheduled

Consistent with the standings discipline, what is *not* yet compliant: the **Memory Wing** still places its card grid above the viewer (violates the viewer-first reading of R2's spirit, though the viewer does render open) and its four instruments do not yet read `?theme=`, so a dark-mode visitor gets OS-preference fallback rather than site-theme inheritance (R8). Both are mechanical to fix with the Simulation Bench as the template. The three simulation instruments are not yet registered in the artifact gallery (optional; the Bench is their canonical home). None of these gaps gate anything: every instrument on the site remains reachable, open, and running.

## 6. Adoption rule for future content

When a new visualization arrives (as HTML from the research side), its induction checklist is: restyle to the blueprint palette blocks; confirm autoplay-on-load; add the `?theme=` reader; place it on its wing with the viewer-first layout; wire `?view=`; verify Open full and Table view. That checklist is the whole standard in operational form — if it passes, no visitor will ever double-click to see the work.

---

*Nothing above reaches the live site until the repository is pushed; Vercel deploys from the push.*
