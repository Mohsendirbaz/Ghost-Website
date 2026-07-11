# Ghost Autonomy — Exhibition Application (website-resident copy)

This is the curated, public variant of the five-view research visualization
(`signal-multiplexer-viz`). Four views ship: **Signal Multiplexer**,
**Bounded Autonomy Stack**, **Constitution of Truth**, and **Event Fabric (F26)**.

The internal *Program Coverage* view and its dataset (`programCoverage.js`,
`ProgramCoverageMap`, `GapClosurePlan`) are **physically absent from this copy**
— any build from this directory is coverage-free by construction. The full
application lives in the `AutoAgents-2-dashboard` repository.

## Rebuild the exhibition

```bash
npm run build:exhibition   # from the website root
# or manually:
cd src/signal-multiplexer-viz
npm ci
npx vite build             # base is /exhibition/ by default
rm -rf ../../public/exhibition && cp -r dist ../../public/exhibition
```

Deep links: `/exhibition/?view=multiplexer|stack|constitution|eventfabric`.
The site's Exhibition Hall page (`/{lang}/exhibition`) embeds this build.
