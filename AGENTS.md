# AGENTS.md — THEPOO7AN Project Instructions & Design System

## Activated Skills & Design Standards
- **UI/UX Pro Max Skill** (`nextlevelbuilder/ui-ux-pro-max-skill`):
  All UI/UX changes, new components, and page additions must adhere to the design intelligence and pre-delivery checklist defined in `/skills/ui-ux-pro-max/SKILL.md`.

### Core Priorities:
1. **Accessibility (CRITICAL)**: WCAG 2.1 AA compliance, visible 2px focus-visible rings with offset and halo, skip-to-content navigation (`#main`), descriptive `aria-label`s on all icon buttons, `aria-hidden="true"` on decorative icons and reflection layers, minimum 4.5:1 text contrast.
2. **Touch & Mobile Ergonomics (CRITICAL)**: Minimum 44x44px touch targets on mobile devices (`min-height: 44px; min-width: 44px;` or touch hitbox expansion via `::before`), minimum 8px spacing, instant `:active` tactile feedback, no hover-only requirements.
3. **Responsive Consistency**: Zero horizontal scrollbar/overflow on 320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1440px. Proper safe area insets `env(safe-area-inset-bottom)` on mobile sticky bars.
4. **Performance & Motion**: Lazy loading on below-the-fold media, `decoding="async"`, `preload="none"` for videos, spring easing `cubic-bezier(0.16, 1, 0.3, 1)`, and full support for `prefers-reduced-motion: reduce`.
5. **Brand Identity**: Dark-first, Obsidian cinematic, metallic/chrome accents, precision typography (Vazirmatn Persian RTL + Inter English LTR).
