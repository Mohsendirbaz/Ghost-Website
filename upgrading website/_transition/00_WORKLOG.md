# Transition Worklog — Target Architecture

**Workspace for the migration described in `../2026-07-22_target-architecture.md`.**
This directory is the agent's working space: intermediate artifacts, generated
inventories, decision records, and per-wave notes. Nothing here ships.

## Layout

```
_transition/
├── 00_WORKLOG.md        ← this file: running log, one entry per session
├── 01_DECISIONS.md      ← open questions for Mohsen + decisions taken
├── inventory/           ← generated snapshots (asset lists, ref maps, counts)
└── waves/               ← per-wave notes, plans, and verification output
```

## Wave status

| Wave | System | State |
|------|--------|-------|
| 1 · Guards | 6.1 verifyAssets, 6.2 verifyRegistry, 6.3 ratchets | **in progress** |
| 2 · Registries | 1.1–1.4 | not started |
| 3 · Asset store | 2 | not started |
| 4 · View layer | 3 | not started |
| 5 · Routing core | 4 | not started |
| 6 · Platform services | 5 | not started |

---

## Log

### 2026-07-22 — session 1 · Wave 1 opened

Orientation findings (ground truth before touching anything):

- `public/` root holds **11 non-conventional files** — 9 personal documents
  (transcripts ×2, recommendation letters ×3, professional contacts, CV,
  G10 synopses ×2). Confirms F4/F2 as described.
- **139 distinct literal asset paths** referenced from `src/`, plus 8
  template-literal patterns whose slot is filled from data modules
  (`majorWorks.js` files, exhibition views, library manifest filenames).
  The asset verifier must resolve both classes or it will report false orphans.
- Existing guard `scripts/verifyNav.js` parses source text with regex rather
  than importing modules (the project is CRA/ESM-in-src, scripts are CJS).
  New verifiers follow the same convention — no build step, no new deps.
- CI (`.github/workflows/ci.yml`) runs build → tests → exhibition-clean.
  `verifyNav.js` exists but is **not wired into CI** — it only ever ran by hand.
  Wiring it in is part of Wave 1 (spec 6.4 assumed it was already live).

Work done this session: see `waves/wave1-guards.md`.
