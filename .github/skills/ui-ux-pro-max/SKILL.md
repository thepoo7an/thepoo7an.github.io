---
name: ui-ux-pro-max
description: Cross-stack UI/UX design intelligence from nextlevelbuilder: layout, color, typography, charts, accessibility, touch interaction, and pre-delivery checklist. Use when designing interfaces, picking palettes/fonts, reviewing UI code, or fixing UX issues.
---

# UI/UX Pro Max Skill — Design Intelligence & Quality Standards

Adapted from `nextlevelbuilder/ui-ux-pro-max-skill` for THEPOO7AN production portfolio and order system.

## 1. Rule Categories by Priority

### Priority 1: Accessibility (CRITICAL)
- **Contrast Ratios**: Minimum 4.5:1 for normal body text, 3:1 for large text (>= 18.5px bold or 24px regular) and UI component boundaries (WCAG 2.1 AA).
- **Focus Rings**: All interactive elements (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `[role="tab"]`, `[role="button"]`) must have a distinct, visible `:focus-visible` outline (minimum 2px solid with 2-3px offset and subtle halo). Never set `outline: none` without providing an accessible alternative.
- **Accessible Names**: All icon-only buttons must have an explicit `aria-label`. Decorative icons and reflection layers must have `aria-hidden="true"`.
- **Keyboard Navigation**: Skip-to-content link (`#main`) for bypassing repetitive header navigation.
- **Form Error Association**: Invalid inputs must indicate error states with `aria-invalid="true"` and `aria-describedby="[error-id]"`.

### Priority 2: Touch & Interaction (CRITICAL)
- **Minimum Touch Targets**: 44x44px hit areas on touch devices (`min-height: 44px; min-width: 44px;` or pseudo-element hit area expansion via `::before`).
- **Touch Spacing**: Minimum 8px spacing between adjacent interactive elements to prevent accidental miss-taps.
- **Tactile Feedback**: Immediate tap feedback on `:active` (`transform: scale(0.97–0.98)` or brightness shift).
- **Zero Hover Dependency**: No critical action or information can rely solely on mouse hover. Touch devices must reveal or trigger states via click/tap.
- **Safe Area Insets**: Support `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` for notched and home-bar mobile devices.

### Priority 3: Performance (HIGH)
- **Media Optimization**: Lazy load below-the-fold media (`loading="lazy"`, `decoding="async"`, `preload="none"` for videos).
- **Compositor Animations**: Animate only GPU-accelerated properties (`transform`, `opacity`). Avoid animating `top`, `left`, `width`, `height`, or `margin`.
- **Font Loading**: Use `font-display: swap` for web fonts to avoid layout-blocking FOIT.

### Priority 4: Layout & Responsive (HIGH)
- **Mobile First Matrix**: Validate layout at 320px, 360px, 375px, 390px, 430px, 768px, 1024px, and 1440px.
- **Zero Horizontal Overflow**: Strict `overflow-x: hidden` safeguards; no cut-off labels or clipped containers.
- **Typography Rhythm**: Use `text-wrap: balance` for titles and headlines to eliminate orphan words.
- **Bilingual Bidirectionality**: Full RTL (Persian) and LTR (English) symmetry using CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`).

### Priority 5: Typography & Color Hierarchy (MEDIUM)
- **Scale Steps**: Clear typographic hierarchy from Display -> Headline -> Subhead -> Body -> Label -> Micro.
- **Body Line Height**: 1.7 to 1.8 for Persian text (Vazirmatn) to ensure comfortable optical line tracking.
- **Surface Elevation Hierarchy**:
  - `surface-0` (Base Canvas): `#000000`
  - `surface-1` (Subtle Recess / Tiles): `#0b0b0c` / `#161617`
  - `surface-2` (Interactive Cards): `#1d1d1f`
  - `surface-3` (Popovers & Modals): `#2c2c2e`
- **Muted Text Contrast**: Ensure `--muted` meets WCAG AA (>= 4.5:1 on background and card surfaces).

### Priority 6: Animation & Motion (MEDIUM)
- **Duration**: 150–250ms for micro-interactions; 300–450ms for modal/drawer transitions.
- **Easing**: Natural Apple spring curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce` and user-toggled motion state (`.no-motion`).

### Priority 7: Style Archetype — Dark Cinematic & Music Production (PRO RULES)
- **Atmosphere**: Deep Obsidian black, titanium/chrome gradients, metallic borders (`rgba(255,255,255,0.12–0.14)`), subtle specular edge reflections.
- **Color Accents**: Electric Cyan (`#2997ff`), Emerald Live availability pulse (`#10b981`), Metallic Chrome text.
- **Iconography**: Uniform 1.5–2px stroke SVG icons (`lucide-react`). No emojis as primary UI buttons or functional icons.

---

## 2. Pre-Delivery Checklist
- [x] All buttons, links, inputs have visible `:focus-visible` outlines.
- [x] Touch targets are at least 44x44px on mobile devices.
- [x] Muted and body text pass WCAG AA contrast ratio (>= 4.5:1).
- [x] Skip-to-content link exists and functions properly.
- [x] All icon buttons have `aria-label` or accessible names.
- [x] Decorative elements have `aria-hidden="true"`.
- [x] Animations respect `prefers-reduced-motion: reduce`.
- [x] Layout tested at 320px, 375px, 430px with zero horizontal overflow.
- [x] Sticky mobile CTA respects `env(safe-area-inset-bottom)`.
