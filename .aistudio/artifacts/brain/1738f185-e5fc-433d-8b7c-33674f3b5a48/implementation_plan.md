# THEPOO7AN — Multi-Platform Portfolio & UX Streamlining Plan

## Summary
Transform the THEPOO7AN portfolio from a confusing technical audio-workstation simulation into a high-converting, artist-first creative showcase. Unify the latest works across all three active platforms (Instagram, YouTube, TikTok) using real production data feeds, instant local video playback without VPN, and clear service packages.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Key Decisions Adopted (Based on Clarification Defaults):**
> 1. **Hero Focus**: Replace the confusing interactive DAW/BPM widget in the hero with a high-impact split layout: clear artist value proposition, key credentials, and an instant 9:16 video reel player running directly without VPN.
> 2. **Multi-Platform Showcase**: Unify Instagram (6 reels), YouTube (Shorts & releases), and TikTok (26 items) into an interactive multi-platform gallery with filter tabs (`همه`, `اینستاگرام`, `یوتیوب`, `تیک‌تاک`) and quick deep links.
> 3. **Playback Strategy**: Local MP4 files play instantly in the high-fidelity `WorkLightbox` without VPN. External YouTube and TikTok items feature verified thumbnails and direct links to the official apps/profiles.
> 4. **Demote Pseudo-Technical Slop**: Retire the confusing "Engine Room" BPM/waveform simulation and replace it with clear, useful artist information (Workflow, Transparent Pricing, Real Deliverables, and FAQs).

---

## 1. Overview & Core Concept

### What It Does
Provides music artists, producers, and managers with an immediate, uncluttered view of Pooyan's creative capabilities (Persian RTL lyric typography, music video editing, beat sync). Visitors can explore the latest releases across Instagram, YouTube, and TikTok in one coherent interface, watch sample reels without VPN friction, and submit project requests in seconds.

### Target Audience & Persona
- **Primary**: Persian music artists, rap/hip-hop creators, indie producers, and record labels looking for high-retention visual reels and lyric videos for upcoming song releases.
- **Context**: 70%+ of visitors arrive via mobile devices (from Instagram bio or TikTok bio) under variable network conditions in Iran (where VPN status varies).

### Key Value Delivered
- **Zero Confusion**: Eliminates distracting audio-workstation simulations; tells visitors who Pooyan is, what he produces, and what each package costs within 5 seconds.
- **Unified 3-Platform Presence**: Real data from Instagram, YouTube, and TikTok presented in a single, high-performance gallery.
- **Zero-VPN Friction**: Instant local MP4 video previews for key showcase items.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[Visitor Lands on Site]
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  HERO SECTION: Crisp typography + Verified specs            │
│  "تولید ویدیوی موزیک و تایپوگرافی لیریک · خروجی بدون افت کیفیت" │
│  + Instant 9:16 Video Reel (Direct Play, No VPN)             │
│  [دریافت برآورد پروژه]  [مشاهده نمونه‌کارها]                │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  LATEST 3-PLATFORM SHOWCASE (#portfolio)                     │
│  Filter Tabs: [همه (All)] [اینستاگرام] [یوتیوب] [تیک‌تاک]   │
│  • Instagram Reels (Local MP4 Lightbox + IG links)           │
│  • YouTube Shorts (Latest release + YouTube link)            │
│  • TikTok Videos (Real items from @thepoo7an + TikTok link)   │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  SERVICES & PACKAGES (#services & #pricing)                  │
│  01. تایپوگرافی لیریک  02. ادیت ویدیو  03. کاور آرت متحرک    │
│  Transparent pricing tiers with turnaround & deliverables    │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  3-STEP COLLABORATION WORKFLOW (#workflow)                   │
│  1. ارسال موزیک و متن  -> 2. اجرای پیش‌نمایش -> 3. تحویل ۱۰۸۰p │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  DIRECT CONTACT & FAQ (#contact & #faq)                      │
│  Telegram direct message + Quick project inquiry link        │
└──────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - 60% Canvas: Deep obsidian dark background (`#070709` / `bg-canvas`) with subtle vignette.
  - 30% Structural Surfaces: Matte zinc cards (`bg-card` / `border-border`) with hairline metallic borders.
  - 10% Accent: Vivid emerald green (`#34D399`) for verified status & direct-play tags, plus chrome reflections on CTA buttons.
- **Typography**:
  - Persian: Vazirmatn RTL with optical weights (400 regular body, 700 bold display).
  - English/Brand: Inter / JetBrains Mono for timecodes and platform tags.
  - Anti-Slop: No fake code comments (`// 01_CORE`), no pill badge sandwiches, no floating pseudo-status dots.
- **Mobile Ergonomics**:
  - Touch targets $\ge 44\times 44\text{px}$ across all interactive buttons, tabs, and video triggers.
  - Smooth horizontal scrolling with scroll snap and indicators for mobile users.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Replacing the Hero DAW Simulation with a Direct Video Showcase
- **Chosen Approach**: Replace the complex waveform/BPM slider widget with a clean split layout: the left side delivers the core value proposition and fast CTAs; the right side showcases the signature 9:16 vertical reel with an instant Play button.
- **Why**: Visitors want to see real editing work immediately, not fiddle with a simulated audio slider that doesn't produce actual sound or real video edits.
- **Alternatives Considered**: Keeping the DAW simulation hidden behind an expandable button was evaluated, but user feedback showed it creates clutter and confuses artists about the core service.

### Decision 2: Multi-Platform Data Integration Architecture
- **Chosen Approach**: Combine `src/data/works.ts` (featured reels with local MP4s), `src/data/instagram.json` (6 reels), `src/data/latest-youtube.json` (latest YouTube Short), and `src/data/tiktok.json` (26 real TikTok items) into a unified dataset with platform tags.
- **Why**: Delivers the user's explicit requirement: "شرایطی رو فراهم کن که در هر سه پلتفرم جدیدترین کارهارو نشون بده" using 100% verified real content.
- **Alternatives Considered**: Embedding 3 separate third-party iframes (Instagram/TikTok/YouTube embeds) which fail under Iranian internet filtering and drastically hurt mobile page load speeds. Using structured data with local posters and deep links solves both performance and VPN accessibility.

### Decision 3: Local MP4 Playback vs. External Platform Links
- **Chosen Approach**: Dual interaction affordance on work cards:
  - Primary Play button: Opens the local MP4 in `WorkLightbox` (100% functional inside Iran without VPN).
  - External Link button: Opens the original post in Instagram, YouTube, or TikTok for artists who wish to see engagement or follow the creator.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                    │
│                 (LanguageProvider + ThemeProvider)                        │
└───────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                               Screen2.tsx                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Navigation Bar (Top Bar Contract: Brand · 4-5 Links · Primary CTA)  │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Hero Section: Value Proposition + Instant 9:16 Video Player         │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Studio Proof Metrics (1080p60 · ≤ 7d Delivery · Beat-Sync · 24h)   │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ MultiPlatformShowcase:                                              │  │
│  │   • Filter Tabs: [همه] [Instagram] [YouTube] [TikTok]                │  │
│  │   • Unified Card Grid (Local posters + WebP + Video Lightbox)       │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Studio Services & Capabilities (Lyric Typography, Reels, Motion)     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ 3-Step Production Workflow (Submit -> Review -> 1080p Master)       │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Pricing Packages (Transparent Rials, deliverables, turnaround)     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Frequently Asked Questions (Accordion)                              │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ Contact Section (Telegram @thepoo7an, Instagram, Order Form)        │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
               │                                            │
               ▼                                            ▼
┌──────────────────────────────┐             ┌──────────────────────────────┐
│       WorkLightbox.tsx       │             │       MobileTabBar.tsx       │
│ (Lossless local MP4 player)  │             │ (Quick thumb navigation)     │
└──────────────────────────────┘             └──────────────────────────────┘
```

### Data Pipeline & Normalization Model

```typescript
export interface UnifiedWorkItem {
  id: string;
  platform: "instagram" | "youtube" | "tiktok";
  title: string;
  titleEn?: string;
  category: string;
  categoryEn: string;
  thumbnailUrl: string;
  fallbackThumbnailUrl?: string;
  localVideoUrl?: string; // If available, plays in WorkLightbox without VPN
  platformUrl: string;   // Deep link to Instagram, YouTube, or TikTok
  badgeText?: string;    // e.g. "پخش مستقیم (بدون VPN)" or "YouTube Shorts"
}
```

### Verification & Validation Protocol
1. `npm run typecheck`: Confirm zero TypeScript discrepancies across all imports and interfaces.
2. `npm run build`: Confirm Vite 6 builds the production bundle and SSR prerender without errors.
3. `npm test`: Run project smoke tests to ensure no regressions.
4. Verify mobile viewports (320px, 375px, 430px) for zero horizontal overflow and $\ge 44\text{px}$ touch target compliance.
