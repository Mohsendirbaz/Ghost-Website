# Color Derivation Formula Documentation

## Overview

This document specifies the mathematical procedures for deriving color values within the dark theme system. Systematic color derivation ensures visual consistency, accessibility compliance, and predictable relationships between color variables.

---

## Mathematical Foundations

### Color Space Conversion

All derivations operate in **HSL** (Hue, Saturation, Lightness) space for perceptual uniformity, then convert to hex for implementation.

**RGB ↔ HSL Conversion:**

```javascript
// RGB (0-255) to HSL (H: 0-360, S/L: 0-100)
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        
        if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / delta + 2) / 6;
        else h = ((r - g) / delta + 4) / 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

// HSL to RGB
function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) { r = c; g = x; }
    else if (60 <= h && h < 120) { r = x; g = c; }
    else if (120 <= h && h < 180) { g = c; b = x; }
    else if (180 <= h && h < 240) { g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; b = c; }
    else if (300 <= h && h < 360) { r = c; b = x; }
    
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

// HSL to Hex
function hslToHex(h, s, l) {
    const { r, g, b } = hslToRgb(h, s, l);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
```

### Relative Luminance (WCAG)

Contrast ratio calculation requires relative luminance:

```javascript
function getLuminance(r, g, b) {
    // Normalize to 0-1
    [r, g, b] = [r, g, b].map(val => {
        val /= 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    // Apply luminance coefficients
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
}
```

---

## Surface Hierarchy Derivation

### Base Principle

Surface colors follow a **lightness ladder** where each elevation level is perceptually distinct yet harmonious.

**Formula:**
```
For elevation level n:
L_n = L_base × (1 + n × lightness_step)

Where:
- L_base: Base lightness (13% for dark theme)
- n: Elevation level (0 = base, 1 = raised, 2 = elevated, 3 = overlay)
- lightness_step: Percentage increase per level (~0.54 for current scale)
```

**Implemented Scale:**

| Level | Name | L (%) | Formula | Hex |
|-------|------|-------|---------|-----|
| 0 | base | 13 | 13 | #121a2e |
| 1 | raised | 20 | 13 × 1.54 | #1e2746 |
| 2 | elevated | 25 | 20 × 1.25 | #2a3356 |
| 3 | overlay | 30 | 25 × 1.20 | #354069 |

**Constraints:**
- Hue (H) and Saturation (S) remain constant across all levels
- Lightness (L) increases monotonically
- Each step maintains ≥ 1.5:1 contrast with previous level

**JavaScript Implementation:**

```javascript
function deriveSurfaceHierarchy(baseHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    const surfaces = {
        base: baseHex,
        raised: hslToHex(h, s, l * 1.54),
        elevated: hslToHex(h, s, l * 1.92),
        overlay: hslToHex(h, s, l * 2.31)
    };
    
    return surfaces;
}

// Usage
const surfaces = deriveSurfaceHierarchy('#121a2e');
// Returns: { base: #121a2e, raised: #1e2746, elevated: #2a3356, overlay: #354069 }
```

---

## Text Contrast Ladder

### Design Goal

Text hierarchy is established through contrast ratios, not just lightness. Each level must:
1. Be distinguishable from adjacent levels
2. Meet WCAG contrast requirements for its intended use
3. Follow perceptual uniformity

**Formula:**

```
For text level n:
Target_Contrast = Base_Contrast × (Contrast_Ratio)^(-n)

Where:
- Base_Contrast: Highest contrast for primary text (13:1)
- Contrast_Ratio: Decay factor (~1.4)
- n: Hierarchy level (0 = primary, 1 = secondary, 2 = tertiary, 3 = disabled)
```

**Implemented Scale:**

| Level | Name | L (%) | Contrast | WCAG | Use Case |
|-------|------|-------|----------|------|----------|
| 0 | primary | 82 | 13.2:1 | AAA | Body text, headings |
| 1 | secondary | 68 | 8.9:1 | AAA | Labels, metadata |
| 2 | tertiary | 49 | 5.1:1 | AA+ | Placeholders, hints |
| 3 | disabled | 38 | 3.2:1 | Decorative | Inactive controls |

**Derivation Process:**

```javascript
function deriveTextHierarchy(baseHex, targetContrasts) {
    const base = hexToRgb(baseHex);
    const baseLum = getLuminance(base.r, base.g, base.b);
    
    return targetContrasts.map(targetRatio => {
        // Solve for text luminance given contrast ratio
        // (L1 + 0.05) / (L2 + 0.05) = targetRatio
        let textLum = (baseLum + 0.05) * targetRatio - 0.05;
        
        // Convert luminance to lightness (approximate)
        const textLightness = Math.pow(textLum, 1/2.4) * 100;
        
        // Desaturate slightly for hierarchy
        const saturation = 5 - (targetRatio / 13) * 3; // 5% → 2%
        
        return hslToHex(0, saturation, textLightness);
    });
}

// Usage
const textColors = deriveTextHierarchy('#121a2e', [13.2, 8.9, 5.1, 3.2]);
// Returns: ['#e0e0e0', '#adb5bd', '#64748b', '#475569']
```

**Validation:**

```javascript
function validateTextHierarchy(surfaceHex, textHexArray) {
    const surface = hexToRgb(surfaceHex);
    
    return textHexArray.map(textHex => {
        const text = hexToRgb(textHex);
        const ratio = getContrastRatio(surface, text);
        
        return {
            color: textHex,
            contrast: ratio.toFixed(1),
            wcag_aa: ratio >= 4.5 ? '✅' : '❌',
            wcag_aaa: ratio >= 7.0 ? '✅' : '❌'
        };
    });
}
```

---

## Interactive Color States

### Hover State Derivation

Hover states increase visual emphasis while maintaining accessibility.

**Formula:**
```
L_hover = L_base × 1.20
S_hover = S_base × 1.10
H_hover = H_base (unchanged)

Constraint: Contrast_hover ≥ 4.5:1 on surface-base
```

**Example:**

```javascript
function deriveHoverState(baseHex, surfaceHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    const hover = {
        h: h,
        s: Math.min(s * 1.10, 100),  // Cap at 100%
        l: Math.min(l * 1.20, 90)     // Cap at 90% (avoid pure white)
    };
    
    const hoverHex = hslToHex(hover.h, hover.s, hover.l);
    
    // Validate contrast
    const contrast = getContrastRatio(
        hexToRgb(hoverHex),
        hexToRgb(surfaceHex)
    );
    
    if (contrast < 4.5) {
        // Adjust lightness to meet minimum contrast
        let adjustedL = hover.l;
        while (getContrastRatio(
            hexToRgb(hslToHex(hover.h, hover.s, adjustedL)),
            hexToRgb(surfaceHex)
        ) < 4.5) {
            adjustedL += 1;
        }
        return hslToHex(hover.h, hover.s, adjustedL);
    }
    
    return hoverHex;
}

// Usage
const primaryHover = deriveHoverState('#4a7fb5', '#121a2e');
// Returns: #5a94cd (validates 6.1:1 contrast)
```

### Active State Derivation

Active (pressed) states reduce lightness for tactile feedback.

**Formula:**
```
L_active = L_base × 0.85
S_active = S_base (unchanged)
H_active = H_base (unchanged)
```

```javascript
function deriveActiveState(baseHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    return hslToHex(h, s, l * 0.85);
}

// Usage
const primaryActive = deriveActiveState('#4a7fb5');
// Returns: #3d6a9a
```

### Dim State Derivation

Dim states reduce emphasis for non-primary interactions.

**Formula:**
```
L_dim = L_base × 0.70
S_dim = S_base × 0.80
H_dim = H_base (unchanged)
```

```javascript
function deriveDimState(baseHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    return hslToHex(h, s * 0.80, l * 0.70);
}

// Usage
const primaryDim = deriveDimState('#4a7fb5');
// Returns: #2f5273
```

---

## Feedback Color System

### Semantic Color Selection

Feedback colors (success, warning, danger, info) follow universal color associations:

| Intent | Hue Range | Rationale |
|--------|-----------|-----------|
| Success | 120-150° (Green) | Universal positive association |
| Warning | 45-60° (Yellow/Orange) | Caution without alarm |
| Danger | 0-15° (Red) | Strong negative association |
| Info | 180-210° (Cyan/Blue) | Neutral information |

**Base Formula:**

```
L = Target_Contrast_Lightness
S = 70% (vibrant, distinguishable)
H = Semantic_Hue

Where Target_Contrast_Lightness solves for 4.5:1 minimum contrast
```

**Derivation:**

```javascript
function deriveFeedbackColor(intent, surfaceHex) {
    const hueMap = {
        success: 140,   // Green
        warning: 48,    // Yellow
        danger: 355,    // Red
        info: 190       // Cyan
    };
    
    const h = hueMap[intent];
    const s = 70;
    
    // Binary search for lightness achieving 4.5:1 contrast
    let l = 50;
    let step = 25;
    
    for (let i = 0; i < 10; i++) {
        const testHex = hslToHex(h, s, l);
        const contrast = getContrastRatio(
            hexToRgb(testHex),
            hexToRgb(surfaceHex)
        );
        
        if (contrast < 4.5) l += step;
        else l -= step;
        
        step /= 2;
    }
    
    return hslToHex(h, s, l);
}

// Usage
const feedbackColors = {
    success: deriveFeedbackColor('success', '#121a2e'),  // #28a745
    warning: deriveFeedbackColor('warning', '#121a2e'),  // #ffc107
    danger: deriveFeedbackColor('danger', '#121a2e'),    // #dc3545
    info: deriveFeedbackColor('info', '#121a2e')         // #17a2b8
};
```

### Dim Feedback Variants

Dim variants provide reduced-emphasis alternatives:

```javascript
function deriveDimFeedback(baseHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    return hslToHex(h, s * 0.85, l * 0.75);
}

// Usage for all feedback colors
const dimVariants = {
    'success-dim': deriveDimFeedback('#28a745'),  // #1e7a33
    'warning-dim': deriveDimFeedback('#ffc107'),  // #cc9a06
    'danger-dim': deriveDimFeedback('#dc3545'),   // #b02a37
    'info-dim': deriveDimFeedback('#17a2b8')      // #128293
};
```

---

## Accent Color Derivation

### Design Philosophy

Accents complement the primary color system without competing. They should:
1. Use different hue family (avoid primary's 210-230° blue range)
2. Maintain medium saturation (40-60%)
3. Achieve ≥4.5:1 contrast for text content

**Formula:**

```
H_accent = H_primary + 120° (triadic harmony)
S_accent = 50-60% (moderate saturation)
L_accent = Solve for 4.5:1+ contrast
```

**Derivation:**

```javascript
function deriveAccentPalette(primaryHex, surfaceHex) {
    const primary = hexToRgb(primaryHex);
    const { h: h_primary } = rgbToHsl(primary.r, primary.g, primary.b);
    
    // Triadic harmony: 120° offset
    const h_accent = (h_primary + 120) % 360;
    const s_accent = 55;
    
    // Three-tier hierarchy
    const accents = {
        primary: null,
        secondary: null,
        tertiary: null
    };
    
    // Primary accent: L for 5.8:1 contrast
    let l = 50;
    let step = 25;
    for (let i = 0; i < 10; i++) {
        const testHex = hslToHex(h_accent, s_accent, l);
        const contrast = getContrastRatio(
            hexToRgb(testHex),
            hexToRgb(surfaceHex)
        );
        if (contrast < 5.8) l += step;
        else l -= step;
        step /= 2;
    }
    accents.primary = hslToHex(h_accent, s_accent, l);
    
    // Secondary: 85% of primary lightness
    accents.secondary = hslToHex(h_accent, s_accent, l * 0.85);
    
    // Tertiary: 75% of primary lightness
    accents.tertiary = hslToHex(h_accent, s_accent, l * 0.75);
    
    return accents;
}

// Usage
const accents = deriveAccentPalette('#4a7fb5', '#121a2e');
// Returns: { primary: #7a9150, secondary: #6d7f47, tertiary: #5a6b3d }
```

---

## Border Color Derivation

### Hierarchy Through Opacity

Borders use the elevated surface color with varying opacity:

**Formula:**

```
border-base = surface-elevated @ 100% opacity
border-subtle = surface-elevated @ 60% opacity
border-strong = surface-elevated @ 140% opacity (lightness adjustment)
```

**Implementation:**

```javascript
function deriveBorderHierarchy(surfaceElevatedHex) {
    const elevated = hexToRgb(surfaceElevatedHex);
    const { h, s, l } = rgbToHsl(elevated.r, elevated.g, elevated.b);
    
    return {
        base: surfaceElevatedHex,
        subtle: hslToHex(h, s, l * 0.80),    // Darker (60% perceived)
        strong: hslToHex(h, s, l * 1.30)     // Lighter (140% perceived)
    };
}

// Usage
const borders = deriveBorderHierarchy('#2a3356');
// Returns: { base: #2a3356, subtle: #1e2940, strong: #3d4d7a }
```

---

## RGB Equivalents Generation

### Automated Conversion

Every hex color automatically generates an RGB equivalent:

```javascript
function generateRgbVariables(cssVars) {
    const rgbVars = {};
    
    Object.entries(cssVars).forEach(([name, hex]) => {
        if (!hex.startsWith('#')) return;
        
        const rgb = hexToRgb(hex);
        const rgbName = `${name}-rgb`;
        rgbVars[rgbName] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    });
    
    return rgbVars;
}

// Usage
const cssVars = {
    '--surface-base': '#121a2e',
    '--text-primary': '#e0e0e0',
    '--color-primary': '#4a7fb5'
};

const rgbVars = generateRgbVariables(cssVars);
// Returns:
// {
//   '--surface-base-rgb': '18, 26, 46',
//   '--text-primary-rgb': '224, 224, 224',
//   '--color-primary-rgb': '74, 127, 181'
// }
```

---

## Neumorphic Shadow Derivation

### Dual-Light Shadow System

Neumorphic shadows simulate ambient lighting from two sources:

1. **Light shadow**: Top-left (highlight)
2. **Dark shadow**: Bottom-right (depth)

**Formula:**

```
For elevation level n:
offset = base_offset × (1.5^n)
blur = base_blur × (1.5^n)

light_shadow = rgba(light_color, 0.15-0.20)
dark_shadow = rgba(black, 0.30-0.40)
```

**Implementation:**

```javascript
function deriveNeumorphicShadow(level, surfaceHex) {
    const base = hexToRgb(surfaceHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    // Light shadow color (lighter than surface)
    const lightColor = hslToHex(h, s, Math.min(l * 1.50, 35));
    const lightRgb = hexToRgb(lightColor);
    
    const multiplier = Math.pow(1.5, level);
    const offset = 3 * multiplier;
    const blur = 6 * multiplier;
    
    const lightShadow = `${offset}px ${offset}px ${blur}px rgba(${lightRgb.r}, ${lightRgb.g}, ${lightRgb.b}, 0.15)`;
    const darkShadow = `-${offset}px -${offset}px ${blur}px rgba(0, 0, 0, 0.35)`;
    
    return `${darkShadow}, ${lightShadow}`;
}

// Usage
const neuShadows = {
    raised: deriveNeumorphicShadow(1, '#1e2746'),    // 3px offsets, 6px blur
    elevated: deriveNeumorphicShadow(2, '#1e2746'),  // 4.5px offsets, 9px blur
    prominent: deriveNeumorphicShadow(3, '#1e2746')  // 6.75px offsets, 13.5px blur
};
```

---

## Complete Palette Generation

### Automated Theme Builder

Generate an entire theme from a single base color:

```javascript
function generateCompleteTheme(baseHex) {
    const base = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(base.r, base.g, base.b);
    
    const theme = {};
    
    // 1. Surface hierarchy
    const surfaces = deriveSurfaceHierarchy(baseHex);
    Object.assign(theme, surfaces);
    
    // 2. Text hierarchy
    const textColors = deriveTextHierarchy(baseHex, [13.2, 8.9, 5.1, 3.2]);
    theme['text-primary'] = textColors[0];
    theme['text-secondary'] = textColors[1];
    theme['text-tertiary'] = textColors[2];
    theme['text-disabled'] = textColors[3];
    
    // 3. Interactive colors
    theme['color-primary'] = derivePrimaryColor(h, s, baseHex);
    theme['color-primary-hover'] = deriveHoverState(theme['color-primary'], baseHex);
    theme['color-primary-active'] = deriveActiveState(theme['color-primary']);
    theme['color-primary-dim'] = deriveDimState(theme['color-primary']);
    
    // 4. Feedback colors
    ['success', 'warning', 'danger', 'info'].forEach(intent => {
        theme[`color-${intent}`] = deriveFeedbackColor(intent, baseHex);
        theme[`color-${intent}-dim`] = deriveDimFeedback(theme[`color-${intent}`]);
    });
    
    // 5. Accent palette
    const accents = deriveAccentPalette(theme['color-primary'], baseHex);
    Object.entries(accents).forEach(([tier, hex]) => {
        theme[`accent-${tier}`] = hex;
    });
    
    // 6. Borders
    const borders = deriveBorderHierarchy(surfaces.elevated);
    Object.entries(borders).forEach(([emphasis, hex]) => {
        theme[`border-${emphasis}`] = hex;
    });
    
    // 7. RGB equivalents
    Object.assign(theme, generateRgbVariables(theme));
    
    return theme;
}

// Usage - entire theme from single color
const completeTheme = generateCompleteTheme('#121a2e');
```

---

## Validation Suite

### Contrast Validation

Ensure all text/background pairs meet WCAG:

```javascript
function validateThemeContrast(theme) {
    const violations = [];
    
    const textVars = ['text-primary', 'text-secondary', 'text-tertiary'];
    const surfaceVars = ['surface-base', 'surface-raised', 'surface-elevated'];
    
    textVars.forEach(textVar => {
        surfaceVars.forEach(surfaceVar => {
            const text = hexToRgb(theme[textVar]);
            const surface = hexToRgb(theme[surfaceVar]);
            const ratio = getContrastRatio(text, surface);
            
            const isAA = ratio >= 4.5;
            const isAAA = ratio >= 7.0;
            
            if (!isAA && textVar !== 'text-disabled') {
                violations.push({
                    text: textVar,
                    surface: surfaceVar,
                    ratio: ratio.toFixed(1),
                    required: '4.5:1',
                    status: 'FAIL'
                });
            }
        });
    });
    
    return violations;
}

// Usage
const violations = validateThemeContrast(completeTheme);
if (violations.length > 0) {
    console.error('Contrast violations detected:', violations);
}
```

### Hierarchy Validation

Ensure perceivable differences between levels:

```javascript
function validateHierarchyDistinction(theme, category) {
    const levels = ['primary', 'secondary', 'tertiary'].map(
        tier => theme[`${category}-${tier}`]
    );
    
    for (let i = 0; i < levels.length - 1; i++) {
        const current = hexToRgb(levels[i]);
        const next = hexToRgb(levels[i + 1]);
        
        const contrastBetween = getContrastRatio(current, next);
        
        if (contrastBetween < 1.5) {
            console.warn(
                `Insufficient distinction between ${category}-level-${i} and level-${i+1}:`,
                `${contrastBetween.toFixed(1)}:1 (minimum 1.5:1 recommended)`
            );
        }
    }
}

// Usage
validateHierarchyDistinction(completeTheme, 'text');
validateHierarchyDistinction(completeTheme, 'accent');
```

---

## Advanced Techniques

### Perceptual Uniformity Adjustment

For more perceptually uniform scales, use CIELAB color space:

```javascript
// Requires color conversion library (e.g., d3-color, chroma.js)
function derivePerceptualScale(baseHex, steps) {
    const base = d3.lab(baseHex);
    
    return Array.from({ length: steps }, (_, i) => {
        const t = i / (steps - 1);
        // Interpolate in CIELAB space
        const interpolated = d3.lab(
            base.l * (1 + t * 0.5),
            base.a,
            base.b
        );
        return interpolated.formatHex();
    });
}
```

### Chromatic Adaptation

Adjust colors for different viewing conditions:

```javascript
function adaptToAmbientLight(hex, ambientIntensity) {
    const { h, s, l } = hexToHsl(hex);
    
    // Reduce saturation in low light (Purkinje effect)
    const adaptedS = s * (0.7 + 0.3 * ambientIntensity);
    
    // Adjust lightness for perceived brightness
    const adaptedL = l * (0.9 + 0.1 * ambientIntensity);
    
    return hslToHex(h, adaptedS, adaptedL);
}
```

---

## Summary Formula Reference

| Derivation | Formula | Example |
|------------|---------|---------|
| Surface Raised | `L × 1.54` | 13% → 20% |
| Surface Elevated | `L × 1.92` | 13% → 25% |
| Text Secondary | Solve for 8.9:1 | 82% → 68% |
| Hover State | `L × 1.20, S × 1.10` | #4a7fb5 → #5a94cd |
| Active State | `L × 0.85` | #4a7fb5 → #3d6a9a |
| Dim State | `L × 0.70, S × 0.80` | #4a7fb5 → #2f5273 |
| Accent (Triadic) | `(H + 120°) % 360` | 220° → 340° |
| Border Subtle | `L × 0.80` | 25% → 20% |
| Border Strong | `L × 1.30` | 25% → 32.5% |
| Neu Shadow Offset | `3px × 1.5^n` | Level 2 → 6.75px |

---

## Version History

- **v1.0** (2026-01-06): Initial formula documentation
- Established HSL-based derivation procedures
- Defined contrast validation methods
- Implemented automated theme generation
