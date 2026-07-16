# Ghost Autonomy — Exhibition Application (website-resident copy)

This is the five-view research visualization (`signal-multiplexer-viz`).
The **public exhibition build ships four views**: Signal Multiplexer,
Bounded Autonomy Stack, Constitution of Truth, and Event Fabric (F26).

The internal **Program Coverage** view and its dataset (`programCoverage.js`,
`ProgramCoverageMap`, `GapClosurePlan`, `ValidationFrontier`) are present in
this source tree for internal use, but they are **excluded from the public
bundle by the build flag**, not by absence:

- `VITE_EXHIBITION=1` makes `vite.config.js` alias `ProgramCoverageMap` to a
  stub and makes `App.jsx` drop the view, its tab, and its chrome, so the
  coverage/gap data never enters the emitted bundle.
- `scripts/assertExhibitionClean.js` (run automatically at the end of
  `npm run build:exhibition`) greps everything under `public/exhibition/`
  for coverage/gap markers and **fails the build if any are found**.

A build from this directory **without** the flag is the full internal app —
never publish that output.

## Rebuild the public exhibition

```bash
npm run build:exhibition   # from the website root — sets the flag AND runs the assertion
```

Manual equivalent:

```bash
cd src/signal-multiplexer-viz
npm ci
VITE_EXHIBITION=1 npx vite build --base=/exhibition/
rm -rf ../../public/exhibition && cp -r dist ../../public/exhibition
cd ../.. && node scripts/assertExhibitionClean.js
```

Public deep links: `/exhibition/?view=multiplexer|stack|constitution|eventfabric`.
The site's Exhibition Hall page (`/{lang}/exhibition`) embeds this build.
