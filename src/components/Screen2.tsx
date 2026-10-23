import { useState, useRef, useEffect, useMemo, type KeyboardEvent } from "react";
import {
  Check,
  Menu,
  Play,
  Sun,
  Moon,
  X,
  ChevronDown,
  Send,
  Camera,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Film,
  Tag,
  HelpCircle,
  Layers,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { WorkItem, WORK_ITEMS, FEATURED_REELS } from "../data/works";
import { WorkLightbox } from "./WorkLightbox";
import { FAQS } from "./FAQ";

type PlatformFilter = "all" | "instagram" | "youtube" | "tiktok";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Screen2() {
  const { isEn, toggleLang } = useLanguage();
  const { isDark, toggleTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<WorkItem | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activePriceIndex, setActivePriceIndex] = useState(1);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lightboxModalRef = useRef<HTMLDivElement | null>(null);

  // Track window scroll for mobile bottom quick-bar visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: ESC to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Prevent background scroll when mobile menu sheet is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const openLightbox = (item: WorkItem) => {
    setActiveLightboxItem(item);
  };

  const closeLightbox = () => {
    setActiveLightboxItem(null);
  };

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  // Filter works by selected platform
  const filteredWorks = useMemo(() => {
    if (platformFilter === "all") return WORK_ITEMS;
    return WORK_ITEMS.filter((item) => item.platform === platformFilter);
  }, [platformFilter]);

  // Counts for each platform tab
  const platformCounts = useMemo(() => {
    return {
      all: WORK_ITEMS.length,
      instagram: WORK_ITEMS.filter((i) => i.platform === "instagram").length,
      youtube: WORK_ITEMS.filter((i) => i.platform === "youtube").length,
      tiktok: WORK_ITEMS.filter((i) => i.platform === "tiktok").length,
    };
  }, []);

  const handlePortfolioScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / (filteredWorks.length || 1);
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveWorkIndex(Math.min(filteredWorks.length - 1, Math.max(0, index)));
  };

  const handlePricingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / 3;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActivePriceIndex(Math.min(2, Math.max(0, index)));
  };

  return (
    <div data-appearance={theme} className={theme}>
      <div className="bg-canvas text-foreground w-full min-h-screen overflow-x-clip transition-colors duration-[260ms] relative selection:bg-white/20 selection:text-white">
        
        {/* ================= Ambient Background System ================= */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 bg-canvas" />
          <div className="absolute inset-0 dot-matrix opacity-40 mask-fade-b" />
          <div className="absolute inset-0 grid-lines-strong opacity-40" />
          <div
            className="absolute -top-[24rem] left-1/2 h-[55rem] w-[75rem] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
            style={{
              background: "radial-gradient(closest-side, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(125%_105%_at_50%_0%,transparent_58%,rgba(0,0,0,0.88)_100%)]" />
        </div>

        <div
          dir={isEn ? "ltr" : "rtl"}
          className="[font-family:Vazirmatn,Tahoma,Arial,sans-serif] text-[16px] leading-7 tracking-normal flex mx-auto pt-3 sm:pt-4 px-3 sm:px-4 pb-28 lg:pb-16 flex-col gap-12 w-full max-w-[1240px]"
        >
          {/* Skip link for accessibility */}
          <a
            href="#main-content"
            className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] focus:[clip:auto] focus:fixed focus:top-4 focus:start-4 focus:z-50 rounded-full bg-white text-black font-semibold border-0 absolute -mt-px -mr-px -mb-px -ml-px pt-2.5 px-6 min-h-[44px] size-px focus:size-auto overflow-hidden shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {isEn ? "Skip to main content" : "رفتن به محتوای اصلی"}
          </a>

          {/* ================= Top Bar Contract: Brand · Nav Links · Primary CTA ================= */}
          <nav
            className="rounded-full bg-card/90 backdrop-blur-xl border border-border flex sticky z-40 top-3 px-3 sm:px-4 py-2 justify-between items-center gap-3 sm:gap-4 min-h-[56px] shadow-token-md transition-all"
            aria-label={isEn ? "Main Navigation" : "ناوبری اصلی"}
          >
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#main-content"
              dir="ltr"
              className="font-bold text-lg flex items-center shrink-0 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full px-2 py-1 min-h-[44px]"
            >
              <span className="tracking-wider font-mono font-black text-white text-base">THEPOO7AN</span>
            </a>

            {/* Zone 2: 4–5 single-line clean navigation links */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-zinc-300">
              <a
                href="#portfolio"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {isEn ? "Portfolio" : "نمونه‌کارها"}
              </a>
              <a
                href="#services"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {isEn ? "Services" : "خدمات"}
              </a>
              <a
                href="#workflow"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {isEn ? "Workflow" : "مراحل کار"}
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {isEn ? "Pricing" : "قیمت‌ها"}
              </a>
              <a
                href="#faq"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {isEn ? "FAQ" : "سؤالات"}
              </a>
            </div>

            {/* Zone 3: Actions + 1 Primary CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="font-mono font-medium rounded-full text-zinc-300 hover:text-white hover:bg-white/10 text-xs outline-none px-3 min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/80 transition-colors border border-white/10 active:scale-95"
                aria-label={isEn ? "تغییر زبان به فارسی" : "Switch language to English"}
              >
                {isEn ? "FA" : "EN"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  isDark
                    ? isEn
                      ? "Switch to light mode"
                      : "تغییر به تم روشن"
                    : isEn
                    ? "Switch to dark mode"
                    : "تغییر به تم تاریک"
                }
                className="rounded-full text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 outline-none flex justify-center items-center size-11 min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-white/80 transition-colors active:scale-95"
              >
                {isDark ? (
                  <Sun aria-hidden="true" className="size-4" />
                ) : (
                  <Moon aria-hidden="true" className="size-4" />
                )}
              </button>
              <a
                href="./order.html"
                className="hidden sm:inline-flex font-semibold rounded-full bg-white text-black hover:bg-white/90 text-sm outline-none px-5 min-h-[44px] items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
              >
                {isEn ? "Get Estimate" : "دریافت برآورد"}
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={
                  isMenuOpen
                    ? isEn
                      ? "Close menu"
                      : "بستن منو"
                    : isEn
                    ? "Open menu"
                    : "باز کردن منو"
                }
                aria-expanded={isMenuOpen}
                className="lg:hidden rounded-full border border-white/10 outline-none flex justify-center items-center size-11 min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-white text-white hover:bg-white/10 transition-colors active:scale-95"
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </nav>

          {/* ================= Fullscreen Mobile Navigation Sheet ================= */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-[260ms]"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />

              <div
                className="relative bg-card border-t border-border rounded-t-3xl p-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.85)] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-[calc(24px+env(safe-area-inset-bottom,0px))]"
                role="dialog"
                aria-modal="true"
                aria-label={isEn ? "Navigation Menu" : "منوی ناوبری اصلی"}
              >
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto -mt-2 mb-2" />

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-white text-base tracking-wider font-mono">THEPOO7AN</span>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                    aria-label={isEn ? "Close menu" : "بستن منو"}
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 py-1">
                  {[
                    { href: "#portfolio", labelFa: "نمونه‌کارها (۳ پلتفرم)", labelEn: "Portfolio (3 Platforms)", icon: Film },
                    { href: "#services", labelFa: "خدمات استودیو", labelEn: "Studio Services", icon: Sparkles },
                    { href: "#workflow", labelFa: "مراحل همکاری", labelEn: "3-Step Workflow", icon: Layers },
                    { href: "#pricing", labelFa: "قیمت‌ها و پکیج‌ها", labelEn: "Pricing Packages", icon: Tag },
                    { href: "#faq", labelFa: "سؤالات متداول", labelEn: "FAQ", icon: HelpCircle },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-xl px-4 min-h-[48px] flex items-center gap-3.5 text-zinc-200 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all font-medium text-base border border-transparent hover:border-white/10"
                      >
                        <Icon className="size-5 text-emerald-400 shrink-0" />
                        <span>{isEn ? item.labelEn : item.labelFa}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                  <a
                    href="./order.html"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-semibold rounded-full bg-white text-black text-center min-h-[48px] px-6 flex items-center justify-center shadow-lg active:scale-95 transition-all text-base gap-2"
                  >
                    <span>{isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}</span>
                    <ArrowIcon className="size-4" />
                  </a>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="https://t.me/thepoo7an"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium rounded-full bg-telegram text-white min-h-[44px] flex items-center justify-center gap-2 text-xs font-mono active:scale-95 transition-all shadow"
                    >
                      <Send className="size-3.5" />
                      <span>Telegram</span>
                    </a>
                    <a
                      href="https://www.instagram.com/thepoo7an"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium rounded-full bg-instagram-gradient text-white min-h-[44px] flex items-center justify-center gap-2 text-xs font-mono active:scale-95 transition-all shadow"
                    >
                      <Camera className="size-3.5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= Main Content Container ================= */}
          <main id="main-content" className="flex flex-col gap-16 sm:gap-20">

            {/* ================= 1. HERO SECTION: Direct Value & Signature Video Reel ================= */}
            <section
              aria-label={isEn ? "Studio Introduction" : "معرفی استودیو"}
              className="hero grid lg:grid-cols-12 pt-4 sm:pt-6 pb-2 items-center gap-8 lg:gap-14"
            >
              {/* Left Column: Headlines & Clear Action */}
              <div className="flex flex-col lg:col-span-7 order-1 gap-5 sm:gap-6 min-w-0">
                <div className="font-mono text-xs rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 flex pt-1.5 pr-4 pb-1.5 pl-4 items-center gap-2.5 w-fit backdrop-blur-md shadow-sm">
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-emerald-400 size-2 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0"
                  />
                  <span>
                    {isEn
                      ? "Accepting new music projects · Video & Lyric Studio"
                      : "پذیرش پروژه‌های جدید فعال است · استودیو تولید ویدیو و لیریک"}
                  </span>
                </div>

                <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.18] sm:leading-[1.12] tracking-tight text-white max-w-2xl break-words [text-wrap:balance]">
                  {isEn ? (
                    <>
                      Music Visuals & Lyric Motion, <br />
                      <span className="shimmer-text">No Compromise.</span>
                    </>
                  ) : (
                    <>
                      تولید ویدیوی موزیک، <br />
                      <span className="shimmer-text">بدون افت کیفیت.</span>
                    </>
                  )}
                </h1>

                <p className="sub text-zinc-300 text-base sm:text-xl leading-relaxed max-w-xl">
                  {isEn
                    ? "The dedicated video and kinetic typography studio for music artists and producers who care about every single frame. Frame-accurate beat sync and lossless 1080p vertical masters."
                    : "استودیوی تخصصی تایپوگرافی لیریک و ادیت ویدیویی ریتمیک برای آرتیست‌ها و آهنگسازانی که کیفیت فریم‌به‌فریم اثرشان اهمیت دارد."}
                </p>

                {/* Verified Specs Row */}
                <div className="text-zinc-300 text-xs sm:text-[15px] leading-6 sm:leading-7 flex flex-wrap gap-x-5 gap-y-2 font-mono">
                  <span className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="text-emerald-400 size-4 shrink-0"
                    />
                    {isEn ? "Delivered in ≤ 7 days" : "تحویل معمولاً تا ۷ روز کاری"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="text-emerald-400 size-4 shrink-0"
                    />
                    {isEn ? "Lossless 1080p60 Master" : "خروجی ۱۰۸۰p با بیت‌ریت حداکثری"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="text-emerald-400 size-4 shrink-0"
                    />
                    {isEn ? "Direct Telegram VIP support" : "پشتیبانی مستقیم تلگرام"}
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex pt-2 flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="./order.html"
                    className="font-semibold rounded-full bg-white text-black hover:bg-white/90 text-sm sm:text-base outline-none px-6 sm:px-7 min-h-[48px] flex items-center justify-center active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black gap-2 group whitespace-nowrap"
                  >
                    <span>{isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}</span>
                    <ArrowIcon className="size-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                  </a>
                  <a
                    href="#portfolio"
                    className="font-semibold rounded-full text-white bg-white/5 hover:bg-white/10 border border-white/15 text-sm sm:text-base outline-none px-5 sm:px-6 min-h-[48px] flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-white active:scale-95 whitespace-nowrap"
                  >
                    {isEn ? "Explore Works" : "مشاهده نمونه‌کارها"}
                  </a>
                  <a
                    href="https://t.me/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 px-4 min-h-[48px] rounded-full border border-white/10 hover:border-white/20 transition-colors active:scale-95 bg-white/5 whitespace-nowrap"
                  >
                    <Send className="size-3.5 text-telegram" />
                    <span>@thepoo7an</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Signature 9:16 Video Showcase (Instant Play, Zero VPN) */}
              <div className="flex flex-col items-center lg:items-end lg:col-span-5 order-2 w-full">
                <div className="w-full max-w-[340px] rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 shadow-token-lg flex flex-col gap-4 relative group">
                  
                  {/* Top Header */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                      {isEn ? "Featured Master" : "نمونه برتر"}
                    </span>
                    <span className="text-zinc-400">1080p · 9:16 Vertical</span>
                  </div>

                  {/* Artwork & Video Trigger Preview */}
                  <div
                    className="rounded-xl bg-black relative aspect-[9/14] overflow-hidden border border-white/10 group/thumb cursor-pointer"
                    onClick={() => openLightbox(FEATURED_REELS.lyric916)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(FEATURED_REELS.lyric916);
                      }
                    }}
                    aria-label={isEn ? "Play featured video in lightbox" : "پخش ویدیوی برتر در اندازه کامل"}
                  >
                    <img
                      src="./images/portfolio/instagram/DbgAe6cNsdr.webp"
                      alt={isEn ? "Featured 9:16 Lyric Reel Typography" : "تایپوگرافی سینمایی ریلز ۹:۱۶"}
                      width="340"
                      height="530"
                      decoding="async"
                      className="size-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />

                    {/* Centered Play Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/thumb:scale-110 active:scale-90 transition-transform">
                      <Play className="size-6 fill-black translate-x-0.5" />
                    </div>

                    {/* Bottom Info Ribbon */}
                    <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
                      <p className="text-xs font-bold text-white mb-0.5">
                        {isEn ? "Cinematic Music Reel Typography" : "تایپوگرافی سینمایی | موزیک ریلز"}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-400">
                        {isEn ? "Direct Play (No VPN Needed)" : "پخش مستقیم (بدون نیاز به VPN)"}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    type="button"
                    onClick={() => openLightbox(FEATURED_REELS.lyric916)}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors active:scale-95"
                  >
                    <Play className="size-3.5 fill-current" />
                    <span>{isEn ? "Watch Lossless Video" : "مشاهده ویدیوی کامل"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ================= 2. LIVE STUDIO METRICS ================= */}
            <section
              aria-label={isEn ? "Studio Key Metrics" : "آمارهای کلیدی استودیو"}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">100%</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Beat-Perfect Sync" : "بیت‌سینک فریم‌به‌فریم"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Frame-accurate sub-frame timing" : "هماهنگی دقیق هر کلمه با کیک و اسنیر"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">≤ 7d</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Standard Turnaround" : "تحویل حداکثر ۷ روزه"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Expedited delivery options ready" : "امکان تحویل فوری برای تاریخ پخش"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">1080p60</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Lossless Master Output" : "خروجی بدون فشرده‌سازی"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Highest bitrate for Reels & Shorts" : "بدون افت کیفیت حین آپلود در پلتفرم‌ها"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">24h</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Response Window" : "پاسخ‌گویی تا ۲۴ ساعت"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Direct messaging on Telegram" : "بررسی فایل و ارائه برآورد زمان در تلگرام"}
                  </span>
                </div>
              </div>
            </section>

            {/* ================= 3. MULTI-PLATFORM SHOWCASE (Instagram, YouTube, TikTok) ================= */}
            <section id="portfolio" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <span id="work" className="sr-only" />
              
              {/* Section Header & External Profile Links */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    {isEn ? "3-Platform Production Stream" : "جدیدترین آثار در ۳ پلتفرم"}
                  </div>
                  <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                    {isEn ? "Latest Works Across Instagram, YouTube & TikTok" : "کارهای اخیر در اینستاگرام، یوتیوب و تیک‌تاک"}
                  </h2>
                  <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                    {isEn
                      ? "Browse the latest music video edits and typography reels. Items with local playback run directly without VPN."
                      : "جدیدترین نمونه‌های منتشرشده را بررسی کنید. نمونه‌های دارای نشان پخش مستقیم بدون نیاز به VPN قابل مشاهده هستند."}
                  </p>
                </div>

                {/* Direct Platform Profile Links */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://www.instagram.com/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 bg-white/5 hover:bg-white/10 px-3.5 min-h-[44px] rounded-full border border-white/15 flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Camera className="size-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 bg-white/5 hover:bg-white/10 px-3.5 min-h-[44px] rounded-full border border-white/15 flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <YouTubeIcon className="size-3.5 text-red-500" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 bg-white/5 hover:bg-white/10 px-3.5 min-h-[44px] rounded-full border border-white/15 flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Film className="size-3.5 text-cyan-400" />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>

              {/* Interactive Platform Filter Tabs (Functional segmented controls) */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-card/80 border border-border rounded-2xl w-fit">
                {[
                  { id: "all" as const, labelFa: "همه آثار", labelEn: "All Works", count: platformCounts.all },
                  { id: "instagram" as const, labelFa: "اینستاگرام", labelEn: "Instagram", count: platformCounts.instagram },
                  { id: "youtube" as const, labelFa: "یوتیوب", labelEn: "YouTube", count: platformCounts.youtube },
                  { id: "tiktok" as const, labelFa: "تیک‌تاک", labelEn: "TikTok", count: platformCounts.tiktok },
                ].map((tab) => {
                  const isActive = platformFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPlatformFilter(tab.id)}
                      className={`px-4 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 active:scale-95 ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-token-sm"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{isEn ? tab.labelEn : tab.labelFa}</span>
                      <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-black/10 text-black font-bold" : "bg-white/10 text-zinc-400"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Work Cards Grid */}
              <div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
                onScroll={handlePortfolioScroll}
              >
                {filteredWorks.map((item) => {
                  const hasLocalVideo = Boolean(item.videoSrc);
                  
                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 flex flex-col justify-between h-full group hover:border-primary/40 transition-all shadow-token-md"
                    >
                      <div>
                        {/* Video / Poster Thumbnail Frame */}
                        <div
                          className="rounded-xl bg-black aspect-[4/3] overflow-hidden relative group/img cursor-pointer"
                          onClick={() => {
                            if (hasLocalVideo) {
                              openLightbox(item);
                            } else if (item.externalUrl) {
                              window.open(item.externalUrl, "_blank", "noopener,noreferrer");
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              if (hasLocalVideo) {
                                openLightbox(item);
                              } else if (item.externalUrl) {
                                window.open(item.externalUrl, "_blank", "noopener,noreferrer");
                              }
                            }
                          }}
                          aria-label={isEn ? item.labelEn : item.labelFa}
                        >
                          <img
                            loading="lazy"
                            decoding="async"
                            src={item.primarySrc}
                            alt={isEn ? item.labelEn : item.labelFa}
                            width="600"
                            height="450"
                            className="size-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          
                          <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 flex items-center justify-center transition-colors">
                            <div className="size-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/img:scale-110 active:scale-90 transition-transform">
                              {hasLocalVideo ? (
                                <Play className="size-5 fill-black translate-x-0.5" />
                              ) : (
                                <ExternalLink className="size-5 text-black" />
                              )}
                            </div>
                          </div>

                          {/* Top Platform Badge */}
                          <div className="absolute top-3 end-3 flex items-center gap-1.5 font-mono text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md">
                            {item.platform === "instagram" && (
                              <span className="bg-pink-600/90 px-2 py-0.5 rounded-full">Instagram Reels</span>
                            )}
                            {item.platform === "youtube" && (
                              <span className="bg-red-600/90 px-2 py-0.5 rounded-full">YouTube Shorts</span>
                            )}
                            {item.platform === "tiktok" && (
                              <span className="bg-cyan-600/90 px-2 py-0.5 rounded-full">TikTok</span>
                            )}
                          </div>

                          {/* Direct Play No-VPN Badge for Local MP4s */}
                          {hasLocalVideo && (
                            <span className="font-mono text-[10px] absolute bottom-3 start-3 bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                              {isEn ? "Direct Play (No VPN)" : "پخش مستقیم (بدون VPN)"}
                            </span>
                          )}
                        </div>

                        {/* Title and Specs */}
                        <div className="flex flex-col gap-2 mt-4">
                          <h3 className="font-bold text-lg text-white">
                            {isEn ? item.labelEn : item.labelFa}
                          </h3>
                          
                          {item.specFa && (
                            <div className="text-xs font-mono text-zinc-400">
                              <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 inline-block">
                                {isEn ? item.specEn : item.specFa}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons (Direct Play and/or External Link) */}
                      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between gap-2">
                        {hasLocalVideo ? (
                          <button
                            type="button"
                            onClick={() => openLightbox(item)}
                            className="font-semibold text-xs sm:text-sm text-white hover:text-emerald-400 outline-none min-h-[44px] flex items-center gap-1.5 active:scale-95 transition-colors"
                          >
                            <Play className="size-3.5 fill-current" />
                            <span>{isEn ? "Watch Video" : "مشاهده ویدیو"}</span>
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-zinc-400">
                            {item.platform === "youtube" ? "یوتیوب" : "تیک‌تاک"}
                          </span>
                        )}

                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 min-h-[44px] px-2 transition-colors active:scale-95"
                          >
                            <span>{item.platform === "instagram" ? "Instagram" : item.platform === "youtube" ? "YouTube" : "TikTok"}</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Mobile Carousel Indicator */}
              <div className="carousel-dots md:hidden" aria-hidden="true">
                {filteredWorks.slice(0, 5).map((_, i) => (
                  <span key={i} className={activeWorkIndex === i ? "active" : ""} />
                ))}
              </div>
            </section>

            {/* ================= 4. STUDIO SERVICES ================= */}
            <section id="services" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  {isEn ? "Capabilities & Offerings" : "خدمات تخصصی استودیو"}
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEn ? "Tailored Visual Solutions for Music Releases" : "راهکارهای ویدیویی برای انتشار بهتر موزیک"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "Kinetic typography, rhythmic video cutting, and official artwork designed specifically for music artists and producers."
                    : "تایپوگرافی لیریک، ادیت ریتمیک و کاور آرت اختصاصی برای آرتیست‌ها و تهیه‌کنندگان موزیک."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-4 hover:border-primary/40 transition-all shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-xl text-muted-foreground">01</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Lyric Typography" : "تایپوگرافی لیریک موزیک"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Kinetic typography, micro-animations, and precise syllable-to-beat synchronization."
                        : "تایپوگرافی متحرک ریتمیک، انیمیشن فریم‌به‌فریم کلمات و بیت‌سینک دقیق با ضرب‌آهنگ."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-4 hover:border-primary/40 transition-all shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-xl text-muted-foreground">02</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Video Edit + Lyric" : "ادیت ویدیو و ریلز"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Color grading, dynamic cuts, transitions, sound sync, and typography overlay."
                        : "اصلاح رنگ، کات‌های ریتمیک، افکت‌های بصری متناسب با مود ترک و خروجی باکیفیت ۹:۱۶."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-4 hover:border-primary/40 transition-all shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-xl text-muted-foreground">03</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Music Cover Artwork" : "طراحی کاور موزیک"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "High-res square artwork (3000x3000px) ready for Spotify, Apple Music, and Soundcloud."
                        : "طراحی پوستر و آرت‌ورک مربعی با استاندارد پلتفرم‌های اسپاتیفای و اپل موزیک."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-4 hover:border-primary/40 transition-all shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-xl text-muted-foreground">04</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Monthly Content Growth" : "پکیج ماهانه تولید محتوا"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Consistent weekly reel production calendar ensuring sustainable artist growth."
                        : "۴ تا ۸ ریلز در ماه با تقویم تحویل منظم هفتگی و پشتیبانی مستمر جهت رشد پایدار پیج."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= 5. THREE-STEP PRODUCTION WORKFLOW ================= */}
            <section id="workflow" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  {isEn ? "Fast & Transparent" : "مراحل همکاری"}
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEn ? "From Track to Master in Three Steps" : "از فایل صوتی تا خروجی نهایی در ۳ گام"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "A streamlined, transparent, and hassle-free workflow from day one."
                    : "روند کاری شفاف، سریع و بدون سردرگمی."}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-6 flex flex-col justify-between h-full gap-3 shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-2xl text-muted-foreground">01</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Send Track & Brief" : "گام ۱: ارسال فایل و بریف"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Send your audio file, highlight the lyric timestamps, and align style preferences directly on Telegram."
                        : "ارسال فایل صوتی، مشخص کردن تایم‌کد لیریک، و هماهنگی سلیقه و سبک بصری در تلگرام یا دایرکت."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card text-card-foreground border border-border p-6 flex flex-col justify-between h-full gap-3 shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-2xl text-muted-foreground">02</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Design & Beat-Sync" : "گام ۲: طراحی و بیت‌سینک"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Custom typography font pairing, kinetic character animation, and frame-accurate beat alignment."
                        : "انتخاب فونت و زبان بصری متناسب با موزیک، ساخت انیمیشن حروف و بیت‌سینک دقیق متن با ریتم آهنگ."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card text-card-foreground border border-border p-6 flex flex-col justify-between h-full gap-3 shadow-token-sm">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono font-black text-2xl text-emerald-400">03</span>
                    <h3 className="font-bold text-lg text-foreground">
                      {isEn ? "Lossless 1080p Master" : "گام ۳: تحویل فایل نهایی"}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isEn
                        ? "Direct uncompressed 9:16 export without watermarks, calibrated for instant upload on Instagram & Shorts."
                        : "خروجی استاندارد ۹:۱۶ اینستاگرام با کیفیت ۱۰۸۰p، بدون واترمارک و آماده انتشار فوری."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= 6. TRANSPARENT PRICING & PACKAGES ================= */}
            <section id="pricing" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  {isEn ? "Transparent Pricing" : "تعرفه‌ها و بسته‌ها"}
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEn ? "Choose the Right Package for Your Release" : "پکیج مناسب پروژه‌تان را انتخاب کنید"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "Transparent base pricing; exact scope and fee confirmed upfront prior to kickoff."
                    : "قیمت شروع شفاف است؛ مبلغ قطعی را پیش از شروع اعلام می‌کنیم."}
                </p>
              </div>

              <div
                className="price-grid grid md:grid-cols-3 gap-5 sm:gap-6 items-stretch"
                onScroll={handlePricingScroll}
              >
                {/* Package 1: Basic Lyric */}
                <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-5 hover:border-primary/40 transition-all shadow-token-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-xl text-foreground">
                        {isEn ? "Basic Lyric Typography" : "تایپوگرافی لیریک پایه"}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isEn ? "Single 15-20s video reel" : "یک ویدیوی ۱۵ تا ۲۰ ثانیه‌ای"}
                      </span>
                    </div>

                    <div className="py-2 border-y border-border flex flex-col gap-1">
                      <strong className="text-2xl sm:text-3xl text-foreground font-mono font-black">
                        {isEn ? "From 150,000 Tomans" : "از ۱۵۰٬۰۰۰ تومان"}
                      </strong>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isEn ? "Turnaround: 1 business day" : "تحویل معمولاً ۱ روز کاری (۱۰ تا ۲۳)"}
                      </span>
                    </div>

                    <ul className="text-sm leading-7 text-muted-foreground flex flex-col gap-2 list-none p-0">
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "1 kinetic lyric video" : "تایپوگرافی روی ویدیو یا فوتیج"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "1 round of minor revisions" : "یک دور اصلاح رایگان"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "Exported for Reels & Shorts (9:16)" : "خروجی مناسب Reels و Shorts"}</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="./order.html?package=lyric"
                    className="font-semibold rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-sm outline-none px-6 min-h-[48px] flex items-center justify-center transition-all border border-border active:scale-95"
                  >
                    {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
                  </a>
                </article>

                {/* Package 2: Video Edit + Lyric (Most Popular) */}
                <article className="rounded-2xl bg-secondary text-secondary-foreground border-2 border-primary/50 ring-1 ring-primary/25 p-6 sm:p-7 flex flex-col justify-between h-full gap-5 relative shadow-token-lg">
                  <span className="font-mono text-xs font-bold rounded-full bg-primary text-primary-foreground px-3.5 py-1 absolute -top-3.5 start-6 shadow-token-sm">
                    {isEn ? "Most Popular" : "محبوب‌ترین"}
                  </span>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-xl text-foreground">
                        {isEn ? "Video Edit + Lyric" : "ادیت ویدیو + لیریک"}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isEn ? "Full visual dynamic production" : "ترکیب کامل ویدیو، افکت و متن"}
                      </span>
                    </div>

                    <div className="py-2 border-y border-border flex flex-col gap-1">
                      <strong className="text-2xl sm:text-3xl text-foreground font-mono font-black">
                        {isEn ? "From 300,000 Tomans" : "از ۳۰۰٬۰۰۰ تومان"}
                      </strong>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {isEn ? "Turnaround: 2 to 3 business days" : "تحویل ۲ تا ۳ روز کاری"}
                      </span>
                    </div>

                    <ul className="text-sm leading-7 text-foreground/90 flex flex-col gap-2 list-none p-0">
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "Dynamic editing + kinetic typography" : "ادیت ویدیو + تایپوگرافی متحرک"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "2 rounds of fine-tuning revisions" : "دو دور اصلاح جزئی"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "Full HD 1080p 9:16 master" : "خروجی عمودی ۱۰۸۰p با بیت‌سینک دقیق"}</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="./order.html?package=video-lyric"
                    className="font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm outline-none px-6 min-h-[48px] flex items-center justify-center transition-all shadow-token-md active:scale-95"
                  >
                    {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
                  </a>
                </article>

                {/* Package 3: Monthly 4 Reels */}
                <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-5 hover:border-primary/40 transition-all shadow-token-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-xl text-foreground">
                        {isEn ? "Monthly 4 Reels Package" : "پکیج ماهانه ۴ ریلز"}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isEn ? "Dedicated weekly release slot" : "اولویت اختصاصی انتشار هفتگی"}
                      </span>
                    </div>

                    <div className="py-2 border-y border-border flex flex-col gap-1">
                      <strong className="text-2xl sm:text-3xl text-foreground font-mono font-black">
                        {isEn ? "From 1,000,000 Tomans" : "از ۱٬۰۰۰٬۰۰۰ تومان"}
                      </strong>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isEn ? "Scheduled weekly release calendar" : "اولویت رندرینگ و تحویل هفتگی"}
                      </span>
                    </div>

                    <ul className="text-sm leading-7 text-muted-foreground flex flex-col gap-2 list-none p-0">
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "4 high-end video outputs per month" : "۴ خروجی ویدیوی کامل در ماه"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "Structured release timeline" : "تقویم تحویل منظم هفتگی"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-emerald-400 shrink-0" />
                        <span>{isEn ? "Dedicated Telegram VIP support" : "پشتیبانی اختصاصی تلگرام"}</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="./order.html?package=monthly"
                    className="font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white text-sm outline-none px-6 min-h-[48px] flex items-center justify-center transition-all border border-white/10 active:scale-95"
                  >
                    {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
                  </a>
                </article>
              </div>

              {/* Scroll progress dots indicator for mobile pricing carousel */}
              <div className="carousel-dots md:hidden" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={activePriceIndex === i ? "active" : ""} />
                ))}
              </div>
            </section>

            {/* ================= 7. FREQUENTLY ASKED QUESTIONS ================= */}
            <section id="faq" className="flex flex-col gap-6 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  {isEn ? "Got Questions?" : "سؤالات متداول"}
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEn ? "Frequently Asked Questions" : "پاسخ به سؤالات متداول"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "Everything you need to know regarding pricing, turnaround, and project workflow."
                    : "پاسخ به سوالات پرتکرار درباره زمان‌بندی، فایل‌های موردنیاز و نحوه سفارش."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-2xl bg-card text-card-foreground border border-border overflow-hidden transition-colors shadow-token-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-start font-medium text-foreground outline-none min-h-[56px] hover:bg-white/5 transition-colors active:scale-[0.99]"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm sm:text-base font-semibold">
                          {isEn ? faq.qEn : faq.qFa}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-5 text-muted-foreground transition-transform duration-[160ms] shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-muted-foreground text-start text-sm sm:text-[15px] leading-7 border-t border-border animate-in fade-in duration-[260ms]">
                          {isEn ? faq.aEn : faq.aFa}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= 8. FOOTER & DIRECT CONTACT BANNER ================= */}
            <footer
              id="contact"
              className="rounded-3xl bg-card/90 text-card-foreground border border-border p-6 sm:p-12 flex flex-col gap-8 sm:gap-10 mt-6 backdrop-blur-2xl shadow-token-lg"
              aria-label={isEn ? "Footer and Contact" : "ارتباط و پاورقی"}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
                <div className="flex flex-col gap-2.5 sm:gap-3 max-w-xl text-start">
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="size-3.5" />
                    <span>{isEn ? "Start Your Release Today" : "شروع پروژه جدید"}</span>
                  </span>
                  <h3 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight [text-wrap:balance]">
                    {isEn
                      ? "Ready to give your music the visual presence it deserves?"
                      : "آهنگ جدید در دست انتشار دارید؟ بیایید با هم بسازیمش."}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {isEn
                      ? "Get in touch directly on Telegram or Instagram for quotes, portfolio consults, or custom projects."
                      : "برای برآورد هزینه، مشاهده نمونه‌های بیشتر یا شروع کار، در تلگرام یا دایرکت پیام دهید."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href="https://t.me/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold rounded-full bg-telegram text-white px-6 min-h-[48px] flex items-center justify-center gap-2.5 hover:opacity-90 active:scale-95 transition-all shadow-lg flex-1 sm:flex-initial"
                  >
                    <Send className="size-4" />
                    <span>{isEn ? "Telegram (@thepoo7an)" : "تلگرام (@thepoo7an)"}</span>
                  </a>
                  <a
                    href="https://www.instagram.com/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold rounded-full bg-instagram-gradient text-white px-6 min-h-[48px] flex items-center justify-center gap-2.5 hover:opacity-90 active:scale-95 transition-all shadow-lg flex-1 sm:flex-initial"
                  >
                    <Camera className="size-4" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="./order.html"
                    className="font-semibold rounded-full bg-white text-black px-6 min-h-[48px] flex items-center justify-center gap-2.5 hover:bg-white/90 active:scale-95 transition-all shadow-lg w-full sm:w-auto"
                  >
                    <span>{isEn ? "Order Form" : "فرم ثبت سفارش"}</span>
                  </a>
                </div>
              </div>

              {/* Bottom Copyright & Working Hours */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400 text-center sm:text-start">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isEn
                      ? "Operating hours: 10:00 - 23:00 (Tehran Time)"
                      : "ساعت کاری پاسخگویی: ۱۰:۰۰ تا ۲۳:۰۰ (به وقت تهران)"}
                  </span>
                </div>
                <div dir="ltr" className="text-zinc-400">
                  © 2026 THEPOO7AN (پویان کریمی) · All rights reserved.
                </div>
              </div>
            </footer>

          </main>
        </div>

        {/* ================= Mobile Sticky Bottom Action Bar ================= */}
        <div
          className={`sticky-mobile-cta lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-2xl border-t border-border px-3 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] transition-transform duration-[260ms] shadow-[0_-8px_30px_rgba(0,0,0,0.85)] ${
            isScrolled ? "translate-y-0" : "translate-y-full"
          }`}
          role="region"
          aria-label={isEn ? "Mobile quick actions" : "دسترسی سریع موبایل"}
        >
          <div className="flex items-center gap-2 max-w-lg mx-auto w-full">
            <a
              href="./order.html"
              className="flex-1 font-semibold rounded-full bg-white text-black hover:bg-white/90 text-sm min-h-[48px] px-4 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <span>{isEn ? "Get Estimate" : "دریافت برآورد پروژه"}</span>
              <ArrowIcon className="size-4" />
            </a>
            <a
              href="https://t.me/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-4 rounded-full bg-telegram text-white flex items-center justify-center gap-1.5 text-xs font-mono font-medium active:scale-95 transition-all shrink-0 shadow"
              aria-label={isEn ? "Telegram direct" : "تلگرام مستقیم"}
            >
              <Send className="size-4" />
              <span>{isEn ? "Telegram" : "تلگرام"}</span>
            </a>
            <a
              href="https://www.instagram.com/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 min-h-[48px] min-w-[48px] rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center active:scale-95 transition-all shrink-0"
              aria-label="Instagram @thepoo7an"
            >
              <Camera className="size-4" />
            </a>
          </div>
        </div>

        {/* Global Video Lightbox */}
        <WorkLightbox
          activeItem={activeLightboxItem}
          isEn={isEn}
          closeBtnRef={closeBtnRef}
          lightboxModalRef={lightboxModalRef}
          onClose={closeLightbox}
        />
      </div>
    </div>
  );
}
