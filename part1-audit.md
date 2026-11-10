# Part 1 Audit — Library and UI Consistency

## Executive summary

The Hardware ISA Reference Manual is present in the repository and in the public library manifest. It was marked **Needs review** because the catalogue's legacy processing plan called for PDF-to-web conversion and figure extraction; it was not marked that way because the file was absent. Its download/viewer link previously failed because the already percent-encoded space in its path was encoded a second time (`%20` became `%2520`); path normalization is now implemented and covered by a focused test.

The audit also found a publication-policy conflict for this hardware document, mismatched page-count metadata, other broken or unresolved library targets, and hard-coded purple/red treatments that did not consistently follow the site's theme and status semantics. Metadata and styling corrections have been made; public release of the Hardware ISA PDF has been approved, and its catalogue status now reflects that approval.

## Findings

### 1. High — Pre-encoded library paths were encoded twice (fixed)

Previously, `resolveFilePath` applied `encodeURI` to both an asset's `targetUrl` and a matching manifest path ([`LibraryAssetViewer.js`](./src/pages/LibraryAssetViewer.js#L36), [`LibraryAssetViewer.js`](./src/pages/LibraryAssetViewer.js#L44)). The Hardware ISA paths are already encoded as `/library/picapd/en/Hardware%20ISA.pdf` in both the asset catalogue and manifest ([`libraryAssets.js`](./src/data/libraryAssets.js#L551), [`manifest.json`](./public/library/manifest.json#L343)). Applying `encodeURI` again turns `%20` into `%2520`.

The manual's actual public URL with `%20` resolves to the tracked PDF, while the double-encoded path points to a different, nonexistent path. The download link renders whenever a `filePath` exists ([`LibraryAssetViewer.js`](./src/pages/LibraryAssetViewer.js#L400)); therefore, it could be displayed but lead to a 404. The HTML and Markdown viewers also encoded an already-resolved path a second time. Normalization is now shared across the library and artifact viewers.

**Scope:** the repository inventory found 11 of 45 direct library targets with pre-encoded paths and 35 manifest entries with encoded paths. The Hardware ISA case is directly verified; the inventory counts identify other paths at risk, not 46 independently confirmed 404s.

**Fix:** added shared URL-path normalization and applied it to library and artifact viewers. It encodes raw spaces, preserves existing escapes, and is covered by tests for raw spaces, `%20`, and a literal `%20` filename sequence.

### 2. High — Publication policy and public placement conflict (resolved)

At the time of the audit, the library source comment said confidential/trade-secret documentation and parameter-level hardware specifications were intentionally not published ([`libraryAssets.js`](./src/data/libraryAssets.js#L12)). The Hardware ISA PDF was nevertheless under `public/library/`, present in the public manifest, and had a public target URL ([`manifest.json`](./public/library/manifest.json#L343)).

The viewer's **Needs review** status is a presentation/workflow status, not an access-control boundary: the document is not embedded while it is not `READY`, but the download link is still rendered whenever a file path resolves ([`LibraryAssetViewer.js`](./src/pages/LibraryAssetViewer.js#L400), [`LibraryAssetViewer.js`](./src/pages/LibraryAssetViewer.js#L415)). A static file under `public/` is also served independently of that viewer status. The actual PDF URL with its correctly encoded space was verified to resolve locally.

**Resolution:** public release was explicitly approved. The asset is now marked `READY`, which enables its inline PDF viewer and download. The source remains in the public directory and manifest. The catalogue policy now clarifies that unapproved parameter-level hardware specifications remain excluded.

### 3. Medium — Hardware ISA page count and processing metadata were stale or mismatched (updated)

The catalogue previously described the manual as 54 pages and repeated the figure in its `size` field. The PDF currently present in the repository is 478,839 bytes and reports 8 pages on local inspection. The catalogue metadata now reflects the 8-page repository copy. The older processing plan now preserves the 54-page figure as an older claim and explicitly calls for revision confirmation ([`library-hierarchy-compact-view.md`](./upgrading%20website/library-hierarchy-compact-view.md#L50), [`library-hierarchy-compact-view.md`](./upgrading%20website/library-hierarchy-compact-view.md#L469)).

The catalogue additionally says the benchmark figures are projections rather than measured silicon ([`libraryAssets.js`](./src/data/libraryAssets.js#L545)). That qualification is important and should remain visible in the published description.

**Remaining:** verify whether the 8-page PDF is the intended v1.0 file or an incomplete/different revision; do not infer that the 54-page version is available.

### 4. Medium — Library inventory contained missing or non-file targets (fixed)

The inventory found 45 direct file targets: 44 had corresponding files and one direct target, `/docs/pdf/forensic_case_of_Tesla.pdf`, was missing. Six L4 entries and three Notion entries pointed to viewer routes without source documents. A fourth queued Notion entry, “Autonomous Vehicles — Research Note,” had a source file in the manifest but its catalogue linked to its own viewer route instead of the file.

**Fix:** removed the missing Tesla asset, six L4 entries, and three missing Notion entries from the library catalogue, including empty categories. The Autonomous Vehicles Research Note is retained, now linked to its existing manifest file and marked ready. The website no longer advertises source documents absent from the repository; removed documents can be re-added if the actual files are supplied.

### 5. Low — Library status and category colors drifted from theme tokens (fixed)

The theme tokens define neutral surface tiers, an orange primary in light mode, a blue primary in dark mode, and a warm gold accent ([`light-theme.css`](./src/styles/tokens/light-theme.css#L11), [`light-theme.css`](./src/styles/tokens/light-theme.css#L24), [`light-theme.css`](./src/styles/tokens/light-theme.css#L32), [`dark-theme.css`](./src/styles/tokens/dark-theme.css#L12), [`dark-theme.css`](./src/styles/tokens/dark-theme.css#L25), [`dark-theme.css`](./src/styles/tokens/dark-theme.css#L33)). Several library styles bypassed those tokens:

- Priority badges use hard-coded purple/indigo colors ([`LibraryAssetViewer.css`](./src/pages/LibraryAssetViewer.css#L61)).
- Queued status is also indigo, while **Needs review** is red ([`LibraryAssetViewer.css`](./src/pages/LibraryAssetViewer.css#L153)). Red conventionally signals an error or destructive state, which is misleading for a review workflow.
- Language statistics and bilateral labels use additional hard-coded purple ([`LibraryAssets.css`](./src/pages/LibraryAssets.css#L87), [`LibraryAssets.css`](./src/pages/LibraryAssets.css#L510)).

These were primarily consistency and semantic-color issues. Priority, status banners, language statistics, and bilateral labels now use theme tokens and semantic warning/info/danger colors; **Needs review** is no longer represented as an error. Static text-contrast calculations for the updated status banners pass in both themes (10.8:1 minimum).

**Validation still needed:** inspect the rendered page visually in both themes; a production build and browser-based verification remain unavailable in this environment.

## Specific answer: why is “Hardware ISA Reference Manual” on hold?

The best available rationale for the previous hold is in the legacy processing plan: the PDF was listed for conversion to a web-viewable format and figure extraction. The **Needs review** status suppressed its inline viewer, but did not mean the source file was missing.

Public release has now been approved. The asset is marked **Ready**, its native PDF viewer and download are enabled, and its catalogue metadata matches the 8-page file in the repository. The older 54-page figure remains a revision question, not a claim about the current file.

## Related work and validation

- The earlier Multi-Agent System visual pass updated page styling and button classes in [`MultiAgentSystem.css`](./src/pages/MultiAgentSystem.css) and [`MultiAgentSystem.js`](./src/pages/MultiAgentSystem.js). Those existing worktree changes are not part of this audit document.
- Added URL-normalization tests for unescaped spaces, pre-encoded spaces, and literal percent sequences.
- Static contrast calculations for the revised status banners range from 10.8:1 to 15.6:1 in the configured light and dark themes.
- `git diff --check` passed after the changes.
- Focused Jest tests were added, but automated tests and a production build could not be run because Node/npm are unavailable in the current environment.
