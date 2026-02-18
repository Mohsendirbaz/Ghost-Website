# Visitor Retention Booster — Compatibility & Upgrade Plan (Updated with FactEngine/FactEngineAdmin)

This is an **updated assessment** that incorporates the actual current implementation (`FactEngine.js`, `FactEngineAdmin.js`) and reconciles it with:

- your **Ghost Autonomy website constraints** (React 19 + CRA static build on Vercel, bilingual EN/FA with RTL, no DB/API/CMS, content-as-code),
- the **strict spec** (“admin-only pool, minimal, preference-respecting”), and
- the **Carousel for Perusal** ethos (study-first, zero-friction, don’t interrupt deep inspection).

---

## 1) What you have today (facts engine reality check)

### 1.1 Visitor runtime currently *contains the editable fact pool*
- Visitor `FactEngine` loads facts from **localStorage key** `teaSpaceFacts` and writes back whenever facts change.  
- If localStorage is empty, it attempts to `fetch('/src/data/teaSpaceFacts.json')` and then stores the entire pool into localStorage.  
- It also stores UI state (`factEngineCollapsed`) in localStorage.

This means the full pool is **inspectable, editable, and persisted client-side** (the opposite of “hidden pool”).

### 1.2 “Pinning” is visitor-driven and mutates the shared pool
Visitor pinning toggles `isPinned` and **increments `agrees`** in the same facts array. This is a global mutation pattern stored in localStorage.

### 1.3 Admin panel is not actually “admin-only” and does not pin
- `FactEngineAdmin` edits the same localStorage key (`teaSpaceFacts`) and dispatches an in-browser `factsUpdated` event.  
- It can add/edit/delete/reset votes, but **does not include a way to set `isPinned`** (it only shows a pinned badge if already pinned).  
- There is no access control, so if this route ships in the public SPA, anyone can open it.

### 1.4 Compatibility gotcha: `/src/data/...` fetch path
In a CRA production build, `/src/...` is not a public asset path. So the fetch will generally fail in production and you’ll fall back to the hardcoded array (or whatever is already in localStorage).

---

## 2) Compatibility with Ghost Autonomy website model

### Good news
- The module is React-based and uses only local browser storage; it can run in your SPA.
- Styling is plain CSS, compatible with your tokens approach.
- Bilingual/RTL can be made first-class by routing all UI strings through `copy[lang]` and relying on your existing `<html lang/dir>` switching.

### Misalignments you should fix
1. **Content-as-code policy**: today facts can drift per-visitor because they’re stored client-side and can be modified locally. That conflicts with your “static site + single source of truth” philosophy.
2. **No-API constraint**: you cannot truly keep facts secret while static-only; the best achievable meaning of “hidden” is “not editable + not stored as a local dataset + not shipped with admin tooling.”
3. **Bilingual**: facts are currently single-language strings; you’ll need `text: { en, fa }` (or equivalent).
4. **Study-first / zero-friction**: the current CTA copy (“Agree & Make it Stick”) is a nudge that also changes global state; it will feel “growthy” in a deep-tech corporate site.

---

## 3) Updated recommendation: “Static-first, admin-by-repo” (best fit for Ghost Autonomy)

Given your website constraints, the cleanest path is:

### Visitor app
- Ships a **read-only facts bundle** (in `public/data/facts.bundle.json` OR imported at build time).
- Stores only **visitor preferences** + **saved facts board** locally.
- Does **not** write back to the global facts pool.

### Admin workflow (no runtime admin UI required)
- Facts are edited in the repo (like `copy.js`), reviewed, merged, deployed.
- If you still want a “FactEngineAdmin” UI, deploy it **separately** and treat its output as an export artifact that you commit back into the repo.

This preserves:
- deterministic production content,
- minimal runtime complexity,
- and a “no surprises” visitor experience.

---

## 4) Updated data model (bilingual + safe + aligns with spec)

### 4.1 Read-only Fact (global, shipped with the site)
```json
{
  "id": "F-000123",
  "text": { "en": "...", "fa": "..." },
  "type": "evergreen | study_tip | contextual | dependency_insight",
  "tags": ["isa", "epu", "mermaid"],
  "cta": { "path": "/science", "label": { "en": "Read more", "fa": "بیشتر" } },
  "featured": true,
  "weight": 1
}
```

**Important**: `cta.path` is language-neutral. At runtime you form `/${lang}${cta.path}`.

### 4.2 SavedFact (visitor-only board)
```json
{
  "factId": "F-000123",
  "savedAt": 1739754332,
  "note": "optional",
  "contextRef": { "path": "/technology", "assetId": "..." }
}
```

Storage key suggestion (namespaced): `ga_saved_facts_board_v1`.

---

## 5) Strict spec mapping (with your actual code)

### A) “Pool hidden; only admin could edit”
**Replace** today’s `teaSpaceFacts` localStorage pool with a **read-only bundle**.

Concrete changes to your current codebase:
- Remove “save initial facts to localStorage” and “update localStorage when facts change” behaviors in the visitor component.
- Remove admin panel from the public bundle (or remove all editing actions from it in public).

### B) “Minimal; respect visitor preferences; mutual interest”
- Default to **no interruptions**.
- Provide explicit toggles (stored locally) and honor `prefers-reduced-motion`.
- Replace “Agree/Unpin” with “Save / Remove” (personal board) and/or “Show another”.

### C) “Optional discovery board”
- Add a small `SavedFactsBoard` page or drawer, reachable from header/footer.

---

## 6) Critical edge cases & remedies (to achieve “zero frustration”)

### 6.1 localStorage blocked / throws
**Remedy**: wrap localStorage reads/writes in a safe helper with try/catch, and degrade gracefully (session-only memory).

### 6.2 Facts bundle missing / malformed
**Remedy**:
- validate bundle shape on load (ids unique, text has active lang),
- if invalid: disable module silently (don’t crash the page).

### 6.3 Persian RTL + punctuation + numbers
**Remedy**:
- ensure the fact card uses logical properties (padding-inline, etc.),
- avoid hard-coded left/right icons; use logical alignment,
- use `dir="auto"` on the fact text container if you allow mixed-script facts.

### 6.4 Reduced motion
**Remedy**:
- if `prefers-reduced-motion: reduce`, skip the “new fact” animation entirely.

### 6.5 Large “study mode” pages (Mermaid viewer / carousel)
**Remedy**:
- hard-disable prompts while:
  - a viewer modal is open,
  - a full-screen mode is active,
  - the user is actively panning/zooming,
  - the active element is an input/textarea/contenteditable.

### 6.6 “Exit intent” false positives
**Remedy**:
- desktop-only, top-edge only, debounce, never more than once per session,
- mobile: never use exit-intent; only use “welcome back” if explicitly opted in.

### 6.7 No global voting without backend
**Remedy**:
- remove global agrees counters from visitor runtime,
- if you keep “helpful”, store it locally per visitor and use it only for *personal* ranking.

### 6.8 Fact IDs drift / collisions
**Remedy**:
- switch to stable string IDs (`F-000123` or UUID),
- verify uniqueness during build.

---

## 7) Minimal implementation plan (Ghost Autonomy–friendly)

### Step 1 — Create the facts source (repo-managed)
- Add `src/data/facts.source.js` (or `.json`), bilingual, reviewed like `copy.js`.

### Step 2 — Ship a read-only bundle
Option A (simplest): import at build time
- `import { facts } from '../data/facts.source'`

Option B (closer to your “facts.bundle.json” idea): place bundle in `public/data/`
- `fetch('/data/facts.bundle.json')`

### Step 3 — Rewrite FactEngine → FactPrompt (visitor-safe)
- No writes to the global pool.
- Replace pin/unpin with:
  - `Save to board`
  - `Remove from board`
- Replace “Agree & Make it Stick” with neutral copy:
  - EN: “Save this” / “Show another”
  - FA: “ذخیره” / “یکی دیگر”

### Step 4 — Add Preferences
Store:
- `ga_retention_opt_in_v1`
- `ga_retention_never_show_v1`
- `ga_retention_dismissed_until_v1`

Expose toggles in a small settings/help area (footer is fine).

### Step 5 — Add SavedFactsBoard (optional, but recommended)
- Simple route: `/${lang}/saved-facts`
- Client-side filter input for saved facts only.

### Step 6 — If you still want FactEngineAdmin UI
Because your public site is static-only:
- deploy admin UI as a **separate private Vercel project**, protected with Vercel access controls,
- add an **Export Bundle** button that downloads `facts.bundle.json`,
- your team commits the exported bundle into the public repo and deploys.

This keeps “admin edits” real while respecting your no-API model.

---

## 8) Recommended acceptance checks (quick and practical)

1. **No pool in localStorage**: confirm `teaSpaceFacts` is never written in the visitor build.
2. **Opt-out honored**: set “Never show” → module never runs again (even across sessions).
3. **Reduced motion**: with reduced motion enabled, there are no animations.
4. **RTL correctness**: Persian mode shows correct layout and typography.
5. **No study interruptions**: open the Mermaid viewer / carousel and confirm no prompts ever appear.
6. **Bundle integrity**: corrupt the bundle file → module disables itself without errors.

---

## 9) What I recommend you do next (short)

- Treat facts like your `copy.js`: **repo-managed bilingual content**.
- Convert the current FactEngine from “editable pool + votes” to “read-only facts + personal saved board.”
- Remove or isolate FactEngineAdmin from the public build; if you keep it, make it a **private export tool**, not a persistence mechanism.

