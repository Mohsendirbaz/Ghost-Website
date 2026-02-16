# Ghost Autonomy — Facts Admin Tool

Standalone admin interface for managing the `facts.bundle.json` pool.
**This tool is never imported by or shipped with the public website.**

---

## Prerequisites

- Node.js 18+ (same as the main project)
- The main project's CRA dev server running on port 3000 (optional — see below)

---

## How to run

```bash
# From the repo root:
cd tools/facts-admin
npm install
npm run dev
```

Opens at **http://localhost:3100**

### Loading the existing bundle

The admin tool tries to fetch `/data/facts.bundle.json` on startup.
There are two ways to provide it:

**Option A — Run main CRA dev server in parallel (recommended)**

```bash
# Terminal 1 (main project root):
npm start          # CRA starts at :3000

# Terminal 2:
cd tools/facts-admin
npm run dev        # vite proxies /data/ → :3000
```

**Option B — Copy bundle directly**

```bash
cp ../../public/data/facts.bundle.json tools/facts-admin/public/data/facts.bundle.json
```

Then run only the admin tool (no proxy needed).

---

## How to edit facts

1. Use **+ Add Fact** to create a new entry.
2. Click **Edit** on any row to modify it.
3. Fields:
   - **English / Persian text** — at least one required.
   - **Type** — `evergreen | study_tip | contextual | dependency_insight`
   - **Weight** — 1–10 (higher = shown more often by weighted selection).
   - **Featured** — boosts selection weight by +3; shows a star in the admin list.
   - **Tags** — comma-separated; used for context-aware boosting on specific pages.
   - **CTA Path / Labels** — optional call-to-action button shown below the fact text.
4. Edits are auto-saved to **your browser's localStorage** under `ga_fact_admin_draft_v1`.
   Reloading the page restores the draft automatically.
5. Use **Reset Draft** to discard all local edits and reload from the committed bundle.

---

## How to export `facts.bundle.json`

Click **↓ Export facts.bundle.json**.

The file downloads to your default downloads folder.

**Then copy it into the main project:**

```bash
cp ~/Downloads/facts.bundle.json ../../public/data/facts.bundle.json
```

Commit and push:

```bash
git add public/data/facts.bundle.json
git commit -m "content: update facts bundle"
git push
```

Vercel will redeploy automatically. Visitors see the updated facts on next page load.

---

## Bundle schema (`public/data/facts.bundle.json`)

```json
{
  "version": 1,
  "generatedAt": "2026-02-16T00:00:00.000Z",
  "facts": [
    {
      "id": "F-000001",
      "text": {
        "en": "English text (can be empty if Persian is provided)",
        "fa": "Persian text (can be empty if English is provided)"
      },
      "type": "evergreen",
      "tags": ["physics", "fluids"],
      "featured": true,
      "weight": 5,
      "cta": {
        "path": "/science",
        "label": { "en": "Learn more", "fa": "بیشتر" }
      }
    }
  ]
}
```

`cta` may be `null` when there is no call-to-action.

---

## Separation guarantee

- This directory is **not referenced** by any file under `src/` or `public/`.
- The main CRA build (`npm run build` from project root) never includes any file from `tools/`.
- The visitor `FactEngine` component reads only the static JSON from `/data/facts.bundle.json`;
  it has no knowledge of this tool or the `ga_fact_admin_draft_v1` localStorage key.
