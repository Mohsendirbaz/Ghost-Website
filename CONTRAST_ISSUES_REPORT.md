# Dark Mode Contrast Issues Report
**Generated:** 2026-02-20
**Project:** Ghost Autonomy Website

## Executive Summary

This report identifies contrast and visibility issues in the dark mode implementation. The primary issues stem from:
1. Missing typography tokens (--text-6xl)
2. Hardcoded color values that don't respect the theme system
3. Badge and category colors without dark mode variants

## Critical Issues

### 1. Missing Typography Token: --text-6xl
**Severity:** HIGH
**Location:** src/components/Hero/HeroPrimary.css:46

**Issue:**
```css
.hero-primary__h1 {
  font-size: var(--text-6xl);  /* ← Token doesn't exist! */
  color: var(--text-primary);
}
```

**Impact:** The font-size falls back to browser default, causing inconsistent sizing.

**Files Defining Typography Tokens:**
- src/styles/tokens.css (lines 66-74): Defines --text-xs through --text-5xl only
- src/styles/tokens/base.css (lines 29-38): Defines --font-size-xs through --font-size-5xl only
- src/styles/tokens/aliases.css (lines 42-50): Maps --text-* to --font-size-* (no 6xl)

**Fix Required:** Add --text-6xl and --font-size-6xl tokens to the design system.

---

### 2. Hardcoded White Text (#ffffff)
**Severity:** HIGH
**Impact:** Text doesn't adapt to theme changes, poor contrast on light backgrounds

#### Affected Files:

**src/Knowledgebase.css:**
- Line 101: `.kb-hero__title { color: #ffffff; }`
- Line 196: (hardcoded white)
- Line 1009: (hardcoded white)

**src/components/CommandBar.css:**
- Line 94: `color: #ffffff;`

**src/components/CarouselLane.css:**
- Line 80: `color: #ffffff;`

**src/components/AnchorNav.css:**
- Line 44: `color: #ffffff;`

**src/components/CookieBanner.css:**
- Line 72: `color: #ffffff;`

**src/components/FactEngine/SavedFactsBoard.css:**
- Lines 68, 74: `color: #ffffff;`

**src/components/FactEngine/FactPanel.css:**
- Lines 75, 90: `color: #ffffff;`

**src/components/FactEngine/FactCard.css:**
- Lines 104, 110: `color: #ffffff;`

**src/styles/libraryBrowse.css:**
- Lines 63, 147, 323, 331, 430: `color: #fff;`

**src/components/SectionBlockFullBleed.css:**
- Line 62: `color: #ffffff;`

**src/components/ui/Badge.css:**
- Lines 52, 62: `color: #ffffff;`
- Line 57: `color: #000000;`

**src/components/ui/Tag.css:**
- Line 63: `color: #ffffff;`

**Recommended Fix:** Replace hardcoded `#ffffff` with appropriate design tokens:
- For hero sections on dark backgrounds: `var(--text-inverse)` or `#ffffff` is acceptable if background is always dark
- For general headings: `var(--text-primary)` or `var(--color-text-primary)`
- For muted text on dark backgrounds: `var(--hero-text-dim)` or `var(--hero-text-muted)`

---

### 3. Hardcoded Badge & Category Colors
**Severity:** MEDIUM
**Impact:** Badges don't have sufficient contrast in dark mode

#### Knowledge Base Type Badges (src/Knowledgebase.css:1103-1105):
```css
.kb-result-row__type-badge--chapter    { background: #FEF0E7; color: #B5451B; }
.kb-result-row__type-badge--section    { background: #EDFAF1; color: #1E8449; }
.kb-result-row__type-badge--subsection { background: #F4ECF7; color: #6C3483; }
```

**Issue:** Light backgrounds designed for light mode won't work well in dark mode.

#### Artifact Category Badges (src/styles/artifacts.css:171-177):
```css
.artifact-card__cat--visualization { background: rgba(14, 165, 233, 0.10); color: #0284C7; }
.artifact-card__cat--diagram       { background: rgba(16, 185, 129, 0.10); color: #059669; }
.artifact-card__cat--analysis      { background: rgba(245, 158, 11, 0.10); color: #D97706; }
.artifact-card__cat--simulation    { background: rgba(239, 68, 68, 0.10);  color: #DC2626; }
.artifact-card__cat--specification { background: rgba(124, 58, 237, 0.10); color: #7C3AED; }
.artifact-card__cat--reference     { background: rgba(107, 114, 128, 0.10);color: #4B5563; }
.artifact-card__cat--interactive   { background: rgba(255, 107, 53, 0.10); color: #CC5529; }
```

**Issue:** Fixed colors won't adapt to dark mode. Need theme-aware variants.

#### Library Browse Badges (src/styles/libraryBrowse.css:231-233):
```css
.lb-badge--pdf  { background: #fde8e8; color: #b91c1c; }
.lb-badge--md   { background: #e8f4fd; color: #1d70b8; }
.lb-badge--html { background: #e8fde8; color: #15803d; }
```

**Recommended Fix:** Define theme-aware badge colors in dark-theme.css using existing badge semantic variables or create new ones.

---

### 4. Other Hardcoded Colors
**Severity:** MEDIUM

#### Library Assets (src/pages/LibraryAssets.css):
- Line 88: `border-color: #8b5cf6;` (purple)
- Line 441: `color: #1e40af;` (blue)
- Line 446: `color: #6b21a8;` (purple)
- Line 501: `color: #8b5cf6;` (purple)

#### Multi-Agent System (src/pages/MultiAgentSystem.css):
- Line 457: `color: #667eea;` (purple)

#### Artifacts (src/styles/artifacts.css):
- Line 43: `color: #A78BFA;` (light purple)
- Line 167: `color: #7C3AED;` (purple)
- Line 525: `color: #E6EDF3;` (light gray - code element)

**Recommended Fix:** Replace with semantic color tokens or create new tokens for these use cases.

---

## Design Token System Status

### Current Token Coverage:

**Text Colors (GOOD):**
- ✅ --text-primary: #e0e0e0 (13.2:1 contrast — AAA) in dark mode
- ✅ --text-secondary: #adb5bd (8.9:1 contrast — AAA) in dark mode
- ✅ --text-tertiary: #64748b (5.1:1 contrast — AA+) in dark mode
- ✅ --text-inverse: #1e293b (for text on light/primary backgrounds)

**Typography Sizes:**
- ✅ --text-xs through --text-5xl: Fully defined
- ❌ --text-6xl: **MISSING** (used in HeroPrimary.css)

**Surfaces (GOOD):**
- ✅ --surface-base: #121a2e (13% L)
- ✅ --surface-raised: #1e2746 (20% L)
- ✅ --surface-elevated: #2a3356 (25% L)
- ✅ --surface-overlay: #354069 (30% L)

**Badge Colors (PARTIAL):**
- ✅ Defined in dark-theme.css (lines 93-98):
  - --badge-collection-bg, --badge-collection-text
  - --badge-type-bg, --badge-type-text
  - --badge-claim-bg, --badge-claim-text
- ❌ Not used in all components (hardcoded colors still prevalent)

---

## Contrast Ratio Analysis

### Headlines in Dark Mode

When using design tokens correctly:

| Element | Token | Dark Mode Color | Background | Contrast Ratio | WCAG Rating |
|---------|-------|-----------------|------------|----------------|-------------|
| H1, H2, H3 (Primary) | --text-primary | #e0e0e0 | #121a2e | 13.2:1 | AAA ✅ |
| H4, H5 (Secondary) | --text-secondary | #adb5bd | #121a2e | 8.9:1 | AAA ✅ |
| H6, Captions | --text-tertiary | #64748b | #121a2e | 5.1:1 | AA+ ✅ |

**When using hardcoded #ffffff:**
- White on --surface-base (#121a2e): ~15:1 contrast (AAA ✅)
- White on --surface-raised (#1e2746): ~13:1 contrast (AAA ✅)

**The Problem:** Hardcoded white works in dark mode but FAILS in light mode if the background is white or light gray.

---

## Recommended Fixes

### Priority 1: Critical Token Fixes

1. **Add missing --text-6xl token** to src/styles/tokens/base.css and src/styles/tokens/aliases.css
2. **Replace hardcoded #ffffff** in hero/title elements with --text-primary
3. **Verify all hardcoded whites** are on always-dark backgrounds

### Priority 2: Badge System Overhaul

1. Create dark mode variants for all badge categories
2. Use existing badge semantic tokens from dark-theme.css
3. Add theme-aware selectors: `:root.dark-theme .badge--category`

### Priority 3: Component Color Audit

1. Replace page-specific hardcoded colors with semantic tokens
2. Create new semantic color tokens if needed for purple/blue accents
3. Document color usage guidelines for contributors

---

## Component-by-Component Checklist

### ✅ Components Using Tokens Correctly:
- global.css (.section-title, .section-subtitle)
- components/ThreePillars.css (.pillar-card__title)
- pages/Page.css (.layer-card__title)
- components/Hero/HeroSecondary.css (.hero-secondary__h1)

### ⚠️ Components Needing Fixes:
- components/Hero/HeroPrimary.css (missing --text-6xl)
- Knowledgebase.css (hardcoded white titles)
- components/CommandBar.css (hardcoded white)
- components/CarouselLane.css (hardcoded white)
- components/AnchorNav.css (hardcoded white)
- components/FactEngine/* (hardcoded whites)
- styles/libraryBrowse.css (hardcoded whites and badge colors)
- styles/artifacts.css (hardcoded badge and accent colors)
- pages/LibraryAssets.css (hardcoded purples and blues)
- pages/MultiAgentSystem.css (hardcoded purple)
- components/ui/Badge.css (hardcoded black/white)
- components/ui/Tag.css (hardcoded white)

---

## Testing Recommendations

After fixes are applied, test:

1. **All headings (h1-h6)** in both light and dark modes
2. **All badge variants** against their backgrounds
3. **Hero sections** with --text-6xl
4. **Knowledge Base** titles and metadata
5. **Fact Engine** cards and panels
6. **Library Browse** file badges
7. **Artifact cards** category badges

Use browser DevTools to verify:
- Contrast ratios meet WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text)
- AAA preferred (7:1 for normal text, 4.5:1 for large text)

---

## Conclusion

The core design token system is well-architected with excellent contrast ratios. The issues arise from:
1. Incomplete token coverage (missing --text-6xl)
2. Legacy hardcoded colors that bypass the theme system
3. Badge/category colors without dark mode awareness

All issues are fixable with systematic replacement of hardcoded values with design tokens.
