import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";
import {
  Check,
  Menu,
  Play,
  Pause,
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
  Activity,
  Maximize2,
  Sparkle,
  Film,
  Zap,
  Tag,
  HelpCircle,
  FolderGit2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { WorkItem } from "../data/works";
import { WorkLightbox } from "./WorkLightbox";
import { FAQS } from "./FAQ";

export default function Screen2() {
  const { isEn, toggleLang } = useLanguage();
  const { isDark, toggleTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<WorkItem | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lightboxModalRef = useRef<HTMLDivElement | null>(null);

  // Interactive Card States
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [pipelineMode, setPipelineMode] = useState<"conventional" | "thepoo7an">("thepoo7an");
  const [bpm, setBpm] = useState<number>(128);
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(1);
  const [activePlatform, setActivePlatform] = useState<"reels" | "shorts" | "tiktok" | "canvas">("reels");
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);

  // Mobile Redesign States (Hero Collapse, Carousels & Pipeline)
  const [isMobileDemoExpanded, setIsMobileDemoExpanded] = useState(false);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activePriceIndex, setActivePriceIndex] = useState(1);

  const handlePortfolioScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / 3;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveWorkIndex(Math.min(2, Math.max(0, index)));
  };

  const handlePricingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / 3;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActivePriceIndex(Math.min(2, Math.max(0, index)));
  };

  // Auto-advance lyrics for interactive demo feel
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setActiveLyricIndex((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

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

  // Featured Work Items for Lightbox playback (Verified authentic assets)
  const featuredReels: Record<string, WorkItem> = {
    lyric916: {
      id: "instagram-DbgAe6cNsdr",
      category: "reels",
      videoSrc: "/videos/portfolio/DbgAe6cNsdr.mp4",
      primarySrc: "https://thepoo7an.github.io/images/portfolio/instagram/DbgAe6cNsdr.webp",
      fallbacks: [],
      labelFa: "نمونه لیریک ریل ۹:۱۶",
      labelEn: "Lyric reel · 9:16",
      isInstagram: true,
      instagramId: "DbgAe6cNsdr",
      instagramUrl: "https://www.instagram.com/reel/DbgAe6cNsdr/",
    },
    dorc: {
      id: "instagram-Dap1kn2yfAl",
      category: "reels",
      videoSrc: "/videos/portfolio/Dap1kn2yfAl.mp4",
      primarySrc: "https://thepoo7an.github.io/images/portfolio/instagram/Dap1kn2yfAl.webp",
      fallbacks: [],
      labelFa: "نمونه ویدیویی دورک",
      labelEn: "Dorc Video Sample",
      isInstagram: true,
      instagramId: "Dap1kn2yfAl",
      instagramUrl: "https://www.instagram.com/reel/Dap1kn2yfAl/",
    },
    topbooker: {
      id: "youtube-Eh0NDneIYqA",
      category: "reels",
      primarySrc: "https://thepoo7an.github.io/images/portfolio/youtube/Eh0NDneIYqA.webp",
      fallbacks: [],
      labelFa: "تاپ بوکر افلیکس",
      labelEn: "Top Booker Aflix",
      isYouTube: true,
      youtubeId: "Eh0NDneIYqA",
      youtubeUrl: "https://www.youtube.com/shorts/Eh0NDneIYqA",
      youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/Eh0NDneIYqA",
    },
  };

  const openLightbox = (item: WorkItem) => {
    setActiveLightboxItem(item);
  };

  const closeLightbox = () => {
    setActiveLightboxItem(null);
  };

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <div data-appearance={theme} className={theme}>
      <div className="bg-canvas text-foreground w-full min-h-screen overflow-x-clip transition-colors duration-[260ms] relative selection:bg-white/20 selection:text-white">
        
        {/* ================= BitChord Canvas & Ambient Background System ================= */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 bg-canvas" />
          <div className="absolute inset-0 dot-matrix opacity-40 mask-fade-b" />
          <div className="absolute inset-0 grid-lines-strong opacity-40" />
          {/* Top specular spotlight */}
          <div
            className="absolute -top-[24rem] left-1/2 h-[55rem] w-[75rem] -translate-x-1/2 rounded-full opacity-[0.25] blur-[130px]"
            style={{
              background: "radial-gradient(closest-side, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)",
            }}
          />
          {/* Edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(125%_105%_at_50%_0%,transparent_58%,rgba(0,0,0,0.88)_100%)]" />
        </div>

        <div
          dir={isEn ? "ltr" : "rtl"}
          className="[font-family:Vazirmatn,Tahoma,Arial,sans-serif] text-[16px] leading-7 tracking-normal flex mx-auto pt-3 sm:pt-4 px-3 sm:px-4 pb-28 lg:pb-16 flex-col gap-12 w-full max-w-[1240px]"
        >
          {/* Skip link for WCAG AA compliance */}
          <a
            href="#main-content"
            className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] focus:[clip:auto] focus:fixed focus:top-4 focus:start-4 focus:z-50 rounded-full bg-white text-black font-semibold border-0 absolute -mt-px -mr-px -mb-px -ml-px pt-2.5 px-6 min-h-[44px] size-px focus:size-auto overflow-hidden shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {isEn ? "Skip to main content" : "رفتن به محتوای اصلی"}
          </a>

          {/* ================= Floating Glass Navbar ================= */}
          <nav
            className="rounded-full bg-card/90 backdrop-blur-xl border border-border flex sticky z-40 top-3 px-3 sm:px-4 py-2 justify-between items-center gap-3 sm:gap-4 min-h-[56px] shadow-token-md transition-all"
            aria-label={isEn ? "Main Navigation" : "ناوبری اصلی"}
          >
            {/* Brand Logo & Engine Indicator */}
            <a
              href="#main-content"
              dir="ltr"
              className="font-bold text-lg flex items-center shrink-0 gap-2 sm:gap-2.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full px-2 py-1 min-h-[44px]"
            >
              <span
                aria-hidden="true"
                className="rounded-full bg-emerald-400 size-2.5 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse shrink-0"
              />
              <span className="tracking-wider font-mono font-black text-white text-base">THEPOO7AN</span>
              <span className="hidden sm:inline-flex text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                v2026 Engine
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-zinc-300">
              <a
                href="#portfolio"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Portfolio" : "نمونه‌کارها"}
              </a>
              <a
                href="#engine-room"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Engine & Pipeline" : "موتور تولید"}
              </a>
              <a
                href="#services"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Services" : "خدمات"}
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Pricing" : "قیمت‌ها"}
              </a>
              <a
                href="#workflow"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Workflow" : "مراحل کار"}
              </a>
              <a
                href="#releases"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "Releases" : "تاریخچه انتشار"}
              </a>
              <a
                href="#faq"
                className="hover:text-white transition-colors rounded-full px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-h-[44px] flex items-center"
              >
                {isEn ? "FAQ" : "سؤالات"}
              </a>
            </div>

            {/* Actions: Lang, Theme, Order CTA, Menu Toggle */}
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
                className="hidden sm:inline-flex font-semibold rounded-full bg-white text-black hover:bg-white/90 text-sm outline-none px-5 min-h-[44px] items-center justify-center active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
              {/* Tap-outside Backdrop */}
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-[260ms]"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Bottom Sheet Modal Container */}
              <div
                className="relative bg-card border-t border-border rounded-t-3xl p-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.85)] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-[calc(24px+env(safe-area-inset-bottom,0px))]"
                role="dialog"
                aria-modal="true"
                aria-label={isEn ? "Navigation Menu" : "منوی ناوبری اصلی"}
              >
                {/* Drag handle pill */}
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto -mt-2 mb-2" />

                {/* Header inside sheet */}
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

                {/* Navigation Links with Icons */}
                <div className="flex flex-col gap-1.5 py-1">
                  {[
                    { href: "#portfolio", labelFa: "نمونه‌کارها", labelEn: "Portfolio", icon: Film },
                    { href: "#engine-room", labelFa: "موتور تولید و کیفیت", labelEn: "Engine & Pipeline", icon: Zap },
                    { href: "#services", labelFa: "خدمات استودیو", labelEn: "Studio Services", icon: Sparkles },
                    { href: "#pricing", labelFa: "قیمت‌ها و پکیج‌ها", labelEn: "Pricing Packages", icon: Tag },
                    { href: "#workflow", labelFa: "مراحل همکاری ۳ گانه", labelEn: "3-Step Workflow", icon: Activity },
                    { href: "#releases", labelFa: "تاریخچه انتشار", labelEn: "Delivery Stream", icon: FolderGit2 },
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

                {/* Bottom Sheet CTAs */}
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

            {/* ================= 1. HERO SECTION (Signature Audio Visual Layout) ================= */}
            <section
              aria-label={isEn ? "Studio Introduction" : "معرفی استودیو"}
              className="hero grid lg:grid-cols-12 pt-4 sm:pt-6 pb-2 items-center gap-8 lg:gap-14"
            >
              {/* Left Column: Headlines & CTAs */}
              <div className="flex flex-col lg:col-span-7 order-1 gap-5 sm:gap-6 min-w-0">
                {/* Status Pill Badge */}
                <div className="font-mono text-xs rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 flex pt-1.5 pr-4 pb-1.5 pl-4 items-center gap-2.5 w-fit backdrop-blur-md shadow-sm">
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-emerald-400 size-2 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0"
                  />
                  <span>
                    {isEn
                      ? "Accepting new music projects · 2026 Studio Engine"
                      : "پذیرش پروژه‌های جدید فعال است · استودیو تولید ویدیو و لیریک"}
                  </span>
                </div>

                {/* Shimmer Hero Headline with Balance Wrap */}
                <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.18] sm:leading-[1.12] tracking-tight text-white max-w-2xl break-words [text-wrap:balance]">
                  {isEn ? (
                    <>
                      Instant Impact. <br />
                      <span className="shimmer-text">No Compromise.</span>
                    </>
                  ) : (
                    <>
                      تولید ویدیوی موزیک، <br />
                      <span className="shimmer-text">بدون افت کیفیت.</span>
                    </>
                  )}
                </h1>

                {/* Subtitle - Harmonized Contrast */}
                <p className="sub text-zinc-300 text-base sm:text-xl leading-relaxed max-w-xl">
                  {isEn
                    ? "The dedicated video & kinetic typography studio for artists who care about every single frame. Bit-perfect beat sync, sub-frame animation, and lossless 1080p masters."
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

                {/* Harmonized CTA Buttons Row - Matching 48px Baseline */}
                <div className="flex pt-2 flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="./order.html"
                    className="font-semibold rounded-full bg-white text-black hover:bg-white/90 text-sm sm:text-base outline-none px-6 sm:px-7 min-h-[48px] flex items-center justify-center active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black gap-2 group"
                  >
                    <span>{isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}</span>
                    <ArrowIcon className="size-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                  </a>
                  <a
                    href="#portfolio"
                    className="font-semibold rounded-full text-white bg-white/5 hover:bg-white/10 border border-white/15 text-sm sm:text-base outline-none px-5 sm:px-6 min-h-[48px] flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                  >
                    {isEn ? "Explore Works" : "مشاهده نمونه‌کارها"}
                  </a>
                  <a
                    href="https://t.me/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 px-4 min-h-[48px] rounded-full border border-white/10 hover:border-white/20 transition-colors active:scale-95 bg-white/5"
                  >
                    <Send className="size-3.5 text-telegram" />
                    <span>@thepoo7an</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Studio Player Card (Collapsible on Mobile) */}
              <div className="hero-demo-interactive flex flex-col items-center lg:items-end lg:justify-end lg:col-span-5 order-2 w-full">
                {/* Mobile Collapsible Header / Toggle */}
                <div className="lg:hidden w-full max-w-[340px] mx-auto">
                  <button
                    type="button"
                    onClick={() => setIsMobileDemoExpanded(!isMobileDemoExpanded)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-xs sm:text-sm shadow-token-sm hover:border-primary/40 active:scale-[0.98] transition-all min-h-[48px]"
                    aria-expanded={isMobileDemoExpanded}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="size-4 text-emerald-400 shrink-0" />
                      <span>{isEn ? "Interactive Studio Preview & Waveform" : "پیش‌نمایش تعاملی استودیو و شکل‌موج"}</span>
                    </span>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-[160ms] ${isMobileDemoExpanded ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <div className={`w-full max-w-[340px] rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 shadow-token-lg flex-col gap-4 relative group ${isMobileDemoExpanded ? "flex mt-3" : "hidden lg:flex"}`}>
                  {/* Floating Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <Activity className="size-3 animate-pulse" />
                      {isPlayingAudio ? (isEn ? "Live Pipeline Active" : "خط تولید آنلاین") : (isEn ? "Paused" : "متوقف")}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">Float32 / 1080p60</span>
                  </div>

                  {/* Artwork & Video Trigger Preview (Real Asset) */}
                  <div
                    className="rounded-xl bg-black relative aspect-[9/14] overflow-hidden border border-white/10 group/thumb cursor-pointer"
                    onClick={() => openLightbox(featuredReels.lyric916)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(featuredReels.lyric916);
                      }
                    }}
                    aria-label={isEn ? "Open full reel preview in lightbox" : "مشاهده ریل در لایت‌باکس"}
                  >
                    <img
                      src="https://thepoo7an.github.io/images/portfolio/instagram/DbgAe6cNsdr.webp"
                      alt={isEn ? "Lyric reel typography 9:16 sample" : "نمونه لیریک ریل تایپوگرافی ۹:۱۶"}
                      width="340"
                      height="530"
                      decoding="async"
                      className="size-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                    {/* Centered Play Pill */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-xl group-hover/thumb:scale-110 active:scale-90 transition-transform">
                      <Play className="size-5 fill-black translate-x-0.5" />
                    </div>

                    {/* Word-synced Lyric Floating Preview */}
                    <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                      <p className="text-[11px] font-medium text-zinc-400 mb-0.5">
                        {isEn ? "Word-Synced Lyric Sweep" : "تایپوگرافی کاراکتربه‌کاراکتر"}
                      </p>
                      <p className="text-xs font-bold text-white font-mono">
                        {activeLyricIndex === 0 && "« صدای بیس توی اتاق می‌پیچه... »"}
                        {activeLyricIndex === 1 && "« Hold the line a little longer... »"}
                        {activeLyricIndex === 2 && "« هر ضرب‌آهنگ با نور سینک می‌شه... »"}
                        {activeLyricIndex === 3 && "« 1080p Master · Ready to drop »"}
                      </p>
                    </div>
                  </div>

                  {/* Audio Engine Waveform Strip */}
                  <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl p-3">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-white/90 active:scale-90 transition-all shadow"
                      aria-label={isPlayingAudio ? "Pause waveform preview" : "Play waveform preview"}
                    >
                      {isPlayingAudio ? (
                        <Pause className="size-4 fill-black" />
                      ) : (
                        <Play className="size-4 fill-black translate-x-0.5" />
                      )}
                    </button>

                    {/* Waveform bars */}
                    <div className="flex items-center gap-1 h-6 flex-1 px-3">
                      {[40, 75, 55, 90, 60, 100, 70, 85, 45, 95, 80, 50, 65, 85, 40].map(
                        (h, idx) => (
                          <div
                            key={idx}
                            className={`w-1 rounded-full bg-zinc-300 ${
                              isPlayingAudio ? "animate-waveform" : ""
                            }`}
                            style={{
                              height: `${h}%`,
                              animationDelay: `${(idx * 0.08).toFixed(2)}s`,
                            }}
                          />
                        )
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-zinc-300 shrink-0">128 BPM</span>
                  </div>

                  {/* Lightbox Trigger Button */}
                  <button
                    type="button"
                    onClick={() => openLightbox(featuredReels.lyric916)}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors active:scale-95"
                  >
                    <Maximize2 className="size-3.5" />
                    <span>{isEn ? "Open High-Res Video Lightbox" : "مشاهده ویدیوی کامل در لایت‌باکس"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ================= 2. LIVE METRICS BENTO (Unified Heights & Spacing) ================= */}
            <section
              aria-label={isEn ? "Studio Key Metrics" : "آمارهای کلیدی استودیو"}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {/* Stat 1 */}
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

              {/* Stat 2 */}
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

              {/* Stat 3 */}
              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">1080p60</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Lossless Master Output" : "خروجی بدون فشرده‌سازی"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Highest bitrate for Reels & Shorts" : "بدون افت کیفیت حین آپلود اینستاگرام"}
                  </span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col justify-between h-full gap-2 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-foreground tracking-tight">24h</span>
                <div>
                  <span className="text-foreground font-semibold text-xs sm:text-sm block">
                    {isEn ? "Response Window" : "پاسخ‌گویی تا ۲۴ ساعت"}
                  </span>
                  <span className="text-muted-foreground text-[11px] sm:text-xs block mt-0.5">
                    {isEn ? "Direct messaging on Telegram" : "بررسی فوری فایل و ارائه برآورد زمان"}
                  </span>
                </div>
              </div>
            </section>

            {/* ================= 3. "THE ENGINE ROOM" INTERACTIVE SHOWCASE ================= */}
            <section id="engine-room" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <div className="flex flex-col gap-2.5">
                <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Sparkle className="size-3.5" />
                  <span>{isEn ? "The Engine Room" : "موتور تولید و کیفیت"}</span>
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight [text-wrap:balance]">
                  {isEn ? "Built for artists who can hear the difference" : "ساخته‌شده برای کسانی که تفاوت کیفیت را متوجه می‌شوند"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "Explore the active studio pipeline features. Every interactive module below runs live in our production workflow."
                    : "ابزارها و قابلیت‌های خط تولید استودیو را بررسی کنید. تمام کارت‌های زیر تعاملی هستند."}
                </p>
              </div>

              {/* Interactive Grid of Cards */}
              <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">

                {/* Card 1: Pipeline Comparison (Conventional vs THEPOO7AN) */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col gap-5 justify-between h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {isEn ? "Auto-Upgrade Video Pipeline" : "خط تولید ارتقایافته بدون افت کیفیت"}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {isEn ? "Sub-frame precision vs standard generic edit" : "مقایسه ادیت معمولی با پایپ‌لاین THEPOO7AN"}
                      </p>
                    </div>
                    {/* Toggle - Touch Target 44px */}
                    <div className="bg-white/10 p-1 rounded-full flex gap-1 font-mono text-xs w-fit shrink-0">
                      <button
                        type="button"
                        onClick={() => setPipelineMode("conventional")}
                        className={`px-4 py-2 min-h-[44px] rounded-full transition-all active:scale-95 flex items-center justify-center ${
                          pipelineMode === "conventional"
                            ? "bg-white/20 text-white font-semibold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {isEn ? "Standard" : "معمولی"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPipelineMode("thepoo7an")}
                        className={`px-4 py-2 min-h-[44px] rounded-full transition-all active:scale-95 flex items-center justify-center ${
                          pipelineMode === "thepoo7an"
                            ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        THEPOO7AN
                      </button>
                    </div>
                  </div>

                  {/* Visualizer Box */}
                  <div className="rounded-xl bg-muted/70 text-foreground border border-border p-4 sm:p-5 flex flex-col gap-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-muted-foreground border-b border-border pb-2">
                      <span className="truncate">{pipelineMode === "thepoo7an" ? "THEPOO7AN Float32 ProRes Pipeline" : "Standard Mobile App Export"}</span>
                      <span className={pipelineMode === "thepoo7an" ? "text-emerald-400 font-bold shrink-0" : "text-amber-400 font-bold shrink-0"}>
                        {pipelineMode === "thepoo7an" ? "1080p60 · Lossless" : "720p · Compressed"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 py-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                        <span className="text-muted-foreground">{isEn ? "Audio Sync Jitter" : "خطای هماهنگی صدا با تصویر"}:</span>
                        <span className="text-foreground font-bold">{pipelineMode === "thepoo7an" ? "0 ms (Sub-frame locked)" : "± 85 ms (Drifting)"}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                        <span className="text-muted-foreground">{isEn ? "Typography Rendering" : "رندرینگ فونت و بردارها"}:</span>
                        <span className="text-foreground font-bold">{pipelineMode === "thepoo7an" ? "Vector Sharp Anti-aliased" : "Pixelated Raster"}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                        <span className="text-muted-foreground">{isEn ? "Instagram Compression Protection" : "محافظت در برابر فشرده‌سازی اینستاگرام"}:</span>
                        <span className="text-foreground font-bold">{pipelineMode === "thepoo7an" ? "Calibrated Bitrate Target" : "Severe Artefacts"}</span>
                      </div>
                    </div>

                    {/* Progress Bar comparison */}
                    <div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pipelineMode === "thepoo7an" ? "w-full bg-emerald-400" : "w-1/2 bg-amber-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Character-Synced Typography */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col gap-5 justify-between h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {isEn ? "Word-Synced Kinetic Lyrics" : "تایپوگرافی هماهنگ کاراکتر‌به‌کاراکتر"}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {isEn ? "Sub-syllable highlighting with bloom transitions" : "حرکت پیوسته نور روی حروف و کلمات همراه با ضرب‌آهنگ"}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                      {isEn ? "Tap to seek" : "لمس برای تغییر"}
                    </span>
                  </div>

                  {/* Interactive Lyrics Box */}
                  <div className="rounded-xl bg-muted/70 text-foreground border border-border p-4 sm:p-5 flex flex-col gap-2 font-mono">
                    {[
                      { en: "Hold the line a little longer", fa: "صدای بیت توی اتاق می‌پیچه" },
                      { en: "Every echo coming back stronger", fa: "فرکانس بالا میره، بیس عمیق‌تر می‌شه" },
                      { en: "And the frame locks in full resolution", fa: "هر کلمه دقیقاً سر ضرب می‌شینه" },
                      { en: "Designed for artists who care", fa: "خروجی بدون افت کیفیت ۱۰۸۰p" },
                    ].map((line, idx) => {
                      const isActive = activeLyricIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveLyricIndex(idx)}
                          className={`text-start w-full min-h-[48px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between active:scale-[0.98] ${
                            isActive
                              ? "bg-primary text-primary-foreground font-bold border border-primary/40 shadow-token-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                          }`}
                        >
                          <span className="truncate">{isEn ? line.en : line.fa}</span>
                          {isActive && (
                            <span className="size-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card 3: Beat-Match & Tempo Grid Slider */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col gap-5 justify-between h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {isEn ? "Beat-Grid & Tempo Alignment" : "تنظیم ضرب‌آهنگ و بیت‌گرید"}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {isEn ? "Adjust tempo to preview cut frequency & transition speed" : "اسلایدر یا دکمه‌های +/- را لمس کنید"}
                      </p>
                    </div>
                    <span className="font-mono text-sm sm:text-base font-bold text-foreground bg-secondary px-3 py-1 rounded-full border border-border shrink-0">
                      {bpm} BPM
                    </span>
                  </div>

                  {/* BPM Touch Slider & +/- Buttons */}
                  <div className="flex flex-col gap-3.5 bg-muted/70 text-foreground border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span>90 BPM (Trap / Slow)</span>
                      <span>160 BPM (Fast Drill)</span>
                    </div>

                    {/* Touch-Friendly +/- Row (44px target) */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBpm((prev) => Math.max(90, prev - 2))}
                        className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-lg font-bold border border-white/10 transition-transform shrink-0"
                        aria-label="Decrease BPM by 2"
                      >
                        -
                      </button>
                      <div className="flex-1 py-1">
                        <input
                          type="range"
                          min={90}
                          max={160}
                          value={bpm}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setBpm(Number(e.target.value))}
                          className="w-full accent-emerald-400 h-3 bg-white/20 rounded-lg cursor-pointer"
                          aria-label="BPM Slider"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setBpm((prev) => Math.min(160, prev + 2))}
                        className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-lg font-bold border border-white/10 transition-transform shrink-0"
                        aria-label="Increase BPM by 2"
                      >
                        +
                      </button>
                    </div>

                    {/* Quick Preset Pills for Mobile Tap (Min 44px height) */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                      {[
                        { label: "90 (Trap)", val: 90 },
                        { label: "124 (Groove)", val: 124 },
                        { label: "128 (House)", val: 128 },
                        { label: "140 (Drill)", val: 140 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setBpm(preset.val)}
                          className={`px-3.5 py-2 rounded-full border transition-all min-h-[44px] flex items-center justify-center active:scale-95 ${
                            bpm === preset.val
                              ? "bg-white text-black font-bold border-white"
                              : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs font-mono">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 min-w-0">
                        <span className="text-zinc-400 block truncate">{isEn ? "Cut Interval" : "فاصله کات"}</span>
                        <span className="text-white font-bold block mt-0.5">{(60 / bpm).toFixed(2)}s</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 min-w-0">
                        <span className="text-zinc-400 block truncate">{isEn ? "Snare Hit" : "ضرب اسنیر"}</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">{(120 / bpm).toFixed(2)}s</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 min-w-0">
                        <span className="text-zinc-400 block truncate">{isEn ? "Transition" : "ترانزیشن"}</span>
                        <span className="text-white font-bold block mt-0.5 truncate">{bpm > 130 ? "Snap Cut" : "Kinetic Glitch"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Platform Ecosystem Export */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col gap-5 justify-between h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {isEn ? "Social Ecosystem Presets" : "خروجی بهینه متناسب با هر پلتفرم"}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {isEn ? "Zero UI clipping on Reels, TikTok & Shorts" : "بدون پوشیده شدن متن توسط دکمه‌های لایک و کپشن"}
                      </p>
                    </div>
                    {/* Platform Tabs (44px target) */}
                    <div className="flex flex-wrap gap-1 bg-secondary p-1 rounded-full text-xs font-mono w-fit shrink-0 border border-border">
                      {(["reels", "shorts", "tiktok", "canvas"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setActivePlatform(p)}
                          className={`px-3.5 py-2 min-h-[44px] rounded-full uppercase transition-colors flex items-center justify-center active:scale-95 ${
                            activePlatform === p ? "bg-primary text-primary-foreground font-bold shadow-token-sm" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specs Card */}
                  <div className="bg-muted/70 text-foreground border border-border rounded-xl p-4 flex flex-col gap-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-zinc-400 border-b border-white/10 pb-2">
                      <span>{activePlatform.toUpperCase()} Safe-Zone Protocol</span>
                      <button
                        type="button"
                        onClick={() => setShowSafeZone(!showSafeZone)}
                        className="text-emerald-400 underline hover:text-emerald-300 min-h-[44px] px-2 flex items-center"
                      >
                        {showSafeZone ? (isEn ? "Safe Zone: ON" : "سیف‌زون: فعال") : (isEn ? "Safe Zone: OFF" : "سیف‌زون: غیرفعال")}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-white">
                      <div>
                        <span className="text-zinc-400 block">{isEn ? "Resolution" : "رزولوشن"}:</span>
                        <span className="font-bold">1080 x 1920 (9:16 Vertical)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">{isEn ? "Frame Rate" : "نرخ فریم"}:</span>
                        <span className="font-bold">60 fps (Smooth Motion)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">{isEn ? "Audio Target" : "هدف صوتی"}:</span>
                        <span className="font-bold">-14 LUFS (Normalized)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">{isEn ? "UI Margins" : "حاشیه امن متن"}:</span>
                        <span className="font-bold text-emerald-400">Top 220px / Bottom 280px</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ================= 4. REAL PORTFOLIO WORKS (Symmetrical Baseline & Cards) ================= */}
            <section id="portfolio" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <span id="work" className="sr-only" />
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    {isEn ? "Real Production Portfolio" : "نمونه‌کارهای واقعی"}
                  </div>
                  <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                    {isEn ? "Shipped Real-World Works" : "پروژه‌های اجراشده با کیفیت استودیو"}
                  </h2>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    {isEn
                      ? "Direct video playback available. Tap any card to watch in full resolution."
                      : "روی هر نمونه بزنید تا ویدیو به صورت مستقیم در اندازه کامل پخش شود."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-xs font-mono text-zinc-300 bg-white/5 hover:bg-white/10 px-4 min-h-[44px] rounded-full border border-white/15 flex items-center gap-2 transition-colors active:scale-95"
                  >
                    <Camera className="size-3.5" />
                    <span>Instagram @thepoo7an</span>
                  </a>
                </div>
              </div>

              {/* 3 Work Cards with Equal Heights & Horizontally Aligned Buttons */}
              <div
                className="work-grid grid md:grid-cols-3 gap-5 sm:gap-6 items-stretch"
                onScroll={handlePortfolioScroll}
              >

                {/* Card 1: Top Booker Aflix (YouTube Shorts) */}
                <article className="rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 flex flex-col justify-between h-full group hover:border-primary/40 transition-all shadow-token-md">
                  <div>
                    <div
                      className="rounded-xl bg-black aspect-[4/3] overflow-hidden relative group/img cursor-pointer"
                      onClick={() => openLightbox(featuredReels.topbooker)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(featuredReels.topbooker);
                        }
                      }}
                      aria-label={isEn ? "Play Top Booker Aflix sample" : "پخش تاپ بوکر افلیکس"}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="https://thepoo7an.github.io/images/portfolio/youtube/Eh0NDneIYqA.webp"
                        alt={isEn ? "Top Booker Aflix" : "تاپ بوکر افلیکس"}
                        width="600"
                        height="450"
                        className="size-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 flex items-center justify-center transition-colors">
                        <div className="size-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/img:scale-110 active:scale-90 transition-transform">
                          <Play className="size-5 fill-black translate-x-0.5" />
                        </div>
                      </div>
                      <span className="font-mono text-[11px] absolute top-3 end-3 bg-red-600/90 text-white px-2.5 py-0.5 rounded-full font-bold">
                        YouTube Shorts
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <h3 className="font-bold text-lg text-white">
                        {isEn ? "Top Booker Aflix" : "تاپ بوکر افلیکس"}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {isEn ? "Turnaround: 3 days" : "زمان اجرا: ۳ روز"}
                        </span>
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {isEn ? "Edit + VFX" : "ادیت و افکت تصویری"}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-sm mt-1 leading-relaxed">
                        {isEn
                          ? "High-tempo cutting aligned with commercial release beat grid."
                          : "ادیت ریتمیک پرسرعت همراه با انیمیشن‌های تصویری برای کمپین تبلیغاتی."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => openLightbox(featuredReels.topbooker)}
                      className="font-semibold text-sm text-white hover:underline outline-none w-fit min-h-[44px] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>{isEn ? "Watch Video" : "مشاهده ویدیو"}</span>
                      <ArrowIcon className="size-3.5" />
                    </button>
                  </div>
                </article>

                {/* Card 2: Lyric Reel 9:16 (Instagram Reel DbgAe6cNsdr) */}
                <article className="rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 flex flex-col justify-between h-full group hover:border-primary/40 transition-all shadow-token-md">
                  <div>
                    <div
                      className="rounded-xl bg-black aspect-[4/3] overflow-hidden relative group/img cursor-pointer"
                      onClick={() => openLightbox(featuredReels.lyric916)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(featuredReels.lyric916);
                        }
                      }}
                      aria-label={isEn ? "Play Lyric reel 9:16 sample" : "پخش نمونه لیریک ریل ۹:۱۶"}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="https://thepoo7an.github.io/images/portfolio/instagram/DbgAe6cNsdr.webp"
                        alt={isEn ? "Lyric reel 9:16 sample" : "نمونه لیریک ریل ۹:۱۶"}
                        width="600"
                        height="450"
                        className="size-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 flex items-center justify-center transition-colors">
                        <div className="size-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/img:scale-110 active:scale-90 transition-transform">
                          <Play className="size-5 fill-black translate-x-0.5" />
                        </div>
                      </div>
                      <span className="font-mono text-[11px] absolute top-3 end-3 bg-pink-600/90 text-white px-2.5 py-0.5 rounded-full font-bold">
                        Instagram Reels
                      </span>
                      <span className="font-mono text-[10px] absolute bottom-3 start-3 bg-emerald-500/90 text-white px-2 py-0.5 rounded-full font-bold">
                        {isEn ? "Direct Play (No VPN)" : "پخش مستقیم (بدون VPN)"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <h3 className="font-bold text-lg text-white">
                        Lyric Reel · 9:16
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {isEn ? "Turnaround: 2 days" : "زمان اجرا: ۲ روز"}
                        </span>
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          تایپوگرافی لیریک
                        </span>
                      </div>
                      <p className="text-zinc-300 text-sm mt-1 leading-relaxed">
                        {isEn
                          ? "Precise syllable timing with kinetic text bloom and 1080p vertical export."
                          : "تایپوگرافی لیریک حرفه‌ای با بیت‌سینک فریم‌به‌فریم مناسب انتشار روزانه اینستاگرام."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => openLightbox(featuredReels.lyric916)}
                      className="font-semibold text-sm text-white hover:underline outline-none w-fit min-h-[44px] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>{isEn ? "Watch Video" : "مشاهده ویدیو"}</span>
                      <ArrowIcon className="size-3.5" />
                    </button>
                  </div>
                </article>

                {/* Card 3: Dorc (Instagram Reel Dap1kn2yfAl) */}
                <article className="rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 flex flex-col justify-between h-full group hover:border-primary/40 transition-all shadow-token-md">
                  <div>
                    <div
                      className="rounded-xl bg-black aspect-[4/3] overflow-hidden relative group/img cursor-pointer"
                      onClick={() => openLightbox(featuredReels.dorc)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(featuredReels.dorc);
                        }
                      }}
                      aria-label={isEn ? "Play Dorc video sample" : "پخش نمونه ویدیویی دورک"}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src="https://thepoo7an.github.io/images/portfolio/instagram/Dap1kn2yfAl.webp"
                        alt={isEn ? "Dorc video sample" : "نمونه ویدیویی دورک"}
                        width="600"
                        height="450"
                        className="size-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 flex items-center justify-center transition-colors">
                        <div className="size-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover/img:scale-110 active:scale-90 transition-transform">
                          <Play className="size-5 fill-black translate-x-0.5" />
                        </div>
                      </div>
                      <span className="font-mono text-[11px] absolute top-3 end-3 bg-pink-600/90 text-white px-2.5 py-0.5 rounded-full font-bold">
                        Instagram Reels
                      </span>
                      <span className="font-mono text-[10px] absolute bottom-3 start-3 bg-emerald-500/90 text-white px-2 py-0.5 rounded-full font-bold">
                        {isEn ? "Direct Play (No VPN)" : "پخش مستقیم (بدون VPN)"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <h3 className="font-bold text-lg text-white">
                        Dorc
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {isEn ? "Turnaround: 2 days" : "زمان اجرا: ۲ روز"}
                        </span>
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          {isEn ? "Video Edit" : "ادیت ویدیو"}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-sm mt-1 leading-relaxed">
                        {isEn
                          ? "Atmospheric color grading and moody typography for music release."
                          : "ترکیب اصلاح رنگ سینمایی، کات‌های ریتمیک و نمایش عنوان ترک برای معرفی آهنگ."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => openLightbox(featuredReels.dorc)}
                      className="font-semibold text-sm text-white hover:underline outline-none w-fit min-h-[44px] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>{isEn ? "Watch Video" : "مشاهده ویدیو"}</span>
                      <ArrowIcon className="size-3.5" />
                    </button>
                  </div>
                </article>

              </div>

              {/* Scroll progress dots indicator for mobile carousel */}
              <div className="carousel-dots md:hidden" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={activeWorkIndex === i ? "active" : ""} />
                ))}
              </div>
            </section>

            {/* ================= 5. STUDIO SERVICES (Uniform Grid & Padding) ================= */}
            <section id="services" className="flex flex-col gap-6 sm:gap-8 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  {isEn ? "Capabilities & Offerings" : "خدمات تخصصی استودیو"}
                </div>
                <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEn ? "Specialized Studio Services" : "راهکارهای ویدیویی برای انتشار بهتر موزیک"}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl">
                  {isEn
                    ? "Tailored motion and visual solutions designed specifically for music producers and independent artists."
                    : "تایپوگرافی لیریک، ادیت ریتمیک و کاور آرت اختصاصی برای آرتیست‌ها و تهیه‌کنندگان موزیک."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
                {/* Service 1 */}
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

                {/* Service 2 */}
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

                {/* Service 3 */}
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

                {/* Service 4 */}
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

            {/* ================= 6. TRANSPARENT PRICING & PACKAGES (Symmetrical Grid & Sizing) ================= */}
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

                {/* Package 2: Video Edit + Lyric (Most Popular) - Symmetrical Box Sizing */}
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

            {/* ================= 7. PRODUCTION WORKFLOW (Three steps) ================= */}
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
                {/* Step 1 */}
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

                {/* Step 2 */}
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

                {/* Step 3 */}
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

            {/* ================= 8. RELEASE STREAM & CHANGELOG ================= */}
            <section id="releases" className="flex flex-col gap-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    {isEn ? "Shipped, not promised" : "تاریخچه انتشار و خروجی‌ها"}
                  </div>
                  <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                    {isEn ? "Production Stream & Delivery Log" : "لاگ پروژه‌های اخیر تحویل‌شده"}
                  </h2>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                  {isEn ? "Live Studio Log" : "استودیوی فعال"}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Release 1 */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-token-sm">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        v2026.3 · Latest
                      </span>
                      <h3 className="font-bold text-base text-foreground">
                        {isEn ? "Lyric Reel 9:16 Master" : "نمونه ریلز لیریک ۹:۱۶ اینستاگرام"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {isEn
                        ? "Float32 audio pipeline, sub-syllable lyric highlight bloom, uncompressed vertical master."
                        : "تایپوگرافی کاراکتربه‌کاراکتر، بیت‌سینک فریم‌به‌فریم و رندرینگ با رزولوشن ۱۰۸۰p."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openLightbox(featuredReels.lyric916)}
                    className="font-semibold text-xs font-mono text-foreground bg-secondary hover:bg-secondary/80 px-4 min-h-[44px] rounded-full border border-border flex items-center gap-2 shrink-0 transition-colors active:scale-95"
                  >
                    <Play className="size-3 fill-current" />
                    <span>{isEn ? "Watch Master" : "مشاهده ویدیو"}</span>
                  </button>
                </div>

                {/* Release 2 */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-token-sm">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border">
                        v2026.2
                      </span>
                      <h3 className="font-bold text-base text-foreground">
                        {isEn ? "Dorc Dynamic Video Edit" : "نمونه ویدیویی دورک"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {isEn
                        ? "Atmospheric color grading, bass-triggered glitch transitions, sound design overlay."
                        : "اصلاح رنگ سینمایی متناسب با مود موزیک و کات‌های ضرب‌آهنگ."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openLightbox(featuredReels.dorc)}
                    className="font-semibold text-xs font-mono text-foreground bg-secondary hover:bg-secondary/80 px-4 min-h-[44px] rounded-full border border-border flex items-center gap-2 shrink-0 transition-colors active:scale-95"
                  >
                    <Play className="size-3 fill-current" />
                    <span>{isEn ? "Watch Master" : "مشاهده ویدیو"}</span>
                  </button>
                </div>

                {/* Release 3 */}
                <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-token-sm">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border">
                        v2026.1
                      </span>
                      <h3 className="font-bold text-base text-foreground">
                        {isEn ? "Top Booker Aflix Campaign" : "تاپ بوکر افلیکس (YouTube Shorts)"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {isEn
                        ? "High-tempo YouTube Shorts release edit with custom kinetic transitions."
                        : "ادیت پرانرژی برای کمپین شورتز یوتیوب."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openLightbox(featuredReels.topbooker)}
                    className="font-semibold text-xs font-mono text-foreground bg-secondary hover:bg-secondary/80 px-4 min-h-[44px] rounded-full border border-border flex items-center gap-2 shrink-0 transition-colors active:scale-95"
                  >
                    <Play className="size-3 fill-current" />
                    <span>{isEn ? "Watch Master" : "مشاهده ویدیو"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ================= 9. FREQUENTLY ASKED QUESTIONS (Fixed Alignment in RTL/LTR) ================= */}
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

            {/* ================= 10. FOOTER & DIRECT CONTACT BANNER (Fixed Alignment) ================= */}
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

              {/* Bottom Copyright & Working Hours - Symmetrical Start Alignment */}
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

        {/* ================= Mobile Sticky Bottom Action Bar (Safe-Area Optimized) ================= */}
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
