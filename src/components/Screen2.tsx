import {
  useState,
  useRef,
  useEffect,
  useMemo,
  lazy,
  Suspense,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import {
  Menu,
  Play,
  Sun,
  Moon,
  X,
  Send,
  Camera,
  ArrowRight,
  ArrowLeft,
  Film,
  Tag,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useActiveSection } from "../hooks/useActiveSection";
import {
  WorkItem,
  FEATURED_REELS,
  buildPlatformHighlights,
  buildMergedWorkItems,
} from "../data/works";
import {
  INITIAL_INSTAGRAM_DATA,
  fetchLiveInstagramData,
  type InstagramData,
} from "../data/instagram";
import {
  INITIAL_YOUTUBE_DATA,
  fetchLiveYouTubeRelease,
  type YouTubeVideoData,
} from "../data/youtube";
import {
  INITIAL_TIKTOK_DATA,
  fetchLiveTikTokData,
  type TikTokData,
} from "../data/tiktok";
import { WorkThumbnail } from "./PortfolioMedia";
import {
  PortfolioSection,
  type PlatformFilter,
} from "./sections/PortfolioSection";
import { ServicesAndWorkflowSection } from "./sections/ServicesAndWorkflowSection";
import { PricingSection } from "./sections/PricingSection";
import { FaqAndFooterSection } from "./sections/FaqAndFooterSection";

const WorkLightbox = lazy(() => import("./WorkLightbox"));

export default function Screen2() {
  const { isEn, toggleLang } = useLanguage();
  const { isDark, toggleTheme, theme } = useTheme();
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<WorkItem | null>(
    null
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activePriceIndex, setActivePriceIndex] = useState(1);

  const [instagramData, setInstagramData] = useState<InstagramData>(
    INITIAL_INSTAGRAM_DATA
  );
  const [youtubeData, setYoutubeData] = useState<YouTubeVideoData>(
    INITIAL_YOUTUBE_DATA
  );
  const [tiktokData, setTiktokData] = useState<TikTokData>(INITIAL_TIKTOK_DATA);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lightboxModalRef = useRef<HTMLDivElement | null>(null);
  const menuToggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuDialogRef = useRef<HTMLDivElement | null>(null);
  const menuCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpenRef = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchLiveInstagramData(),
      fetchLiveYouTubeRelease(),
      fetchLiveTikTokData(),
    ]).then(([ig, yt, tt]) => {
      if (!active) return;
      if (ig) setInstagramData(ig);
      if (yt) setYoutubeData(yt);
      if (tt) setTiktokData(tt);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      wasMenuOpenRef.current = true;
      document.body.style.overflow = "hidden";
      menuCloseBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (wasMenuOpenRef.current) {
        wasMenuOpenRef.current = false;
        menuToggleBtnRef.current?.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && menuDialogRef.current) {
        const focusables = Array.from(
          menuDialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (
            !activeEl ||
            activeEl === first ||
            !menuDialogRef.current.contains(activeEl)
          ) {
            e.preventDefault();
            last.focus();
          }
        } else if (
          !activeEl ||
          activeEl === last ||
          !menuDialogRef.current.contains(activeEl)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const openLightbox = (item: WorkItem) => {
    setActiveLightboxItem(item);
  };

  const closeLightbox = () => {
    setActiveLightboxItem(null);
  };

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const platformHighlights = useMemo(
    () => buildPlatformHighlights(instagramData, youtubeData, tiktokData),
    [instagramData, youtubeData, tiktokData]
  );

  const allWorks = useMemo(
    () => buildMergedWorkItems(instagramData, youtubeData, tiktokData),
    [instagramData, youtubeData, tiktokData]
  );

  const filteredWorks = useMemo(() => {
    if (platformFilter === "all") return allWorks;
    return allWorks.filter((item) => item.platform === platformFilter);
  }, [platformFilter, allWorks]);

  const platformCounts = useMemo(() => {
    return {
      all: allWorks.length,
      instagram: allWorks.filter((i) => i.platform === "instagram").length,
      youtube: allWorks.filter((i) => i.platform === "youtube").length,
      tiktok: allWorks.filter((i) => i.platform === "tiktok").length,
    };
  }, [allWorks]);

  const handlePortfolioScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / (filteredWorks.length || 1);
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveWorkIndex(Math.min(filteredWorks.length - 1, Math.max(0, index)));
  };

  const handlePricingScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = Math.abs(target.scrollLeft);
    const cardWidth = target.scrollWidth / 3;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActivePriceIndex(Math.min(2, Math.max(0, index)));
  };

  return (
    <div data-appearance={theme} className={theme}>
      <div
        dir={isEn ? "ltr" : "rtl"}
        className="min-h-screen w-full bg-background text-foreground overflow-x-clip relative selection:bg-primary selection:text-primary-foreground"
      >
        {/* Ultra-Subtle Studio Overhead Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 h-[520px] -z-10 opacity-40 dark:opacity-100"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 75%)",
          }}
        />

        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] focus:[clip:auto] focus:fixed focus:top-4 focus:start-4 focus:z-50 rounded-xl bg-primary text-primary-foreground font-semibold absolute -mt-px -ms-px px-5 py-2.5 min-h-[44px] size-px focus:size-auto overflow-hidden shadow-token-lg"
        >
          {isEn ? "Skip to main content" : "رفتن به محتوای اصلی"}
        </a>

        {/* ================= 1. TOP BAR CONTRACT (3 Clean Zones) ================= */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="max-w-[1240px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
            {/* Zone 1: Single-line Brand Wordmark */}
            <a
              href="#main-content"
              dir="ltr"
              className="font-display font-bold tracking-tight text-base sm:text-lg text-foreground whitespace-nowrap shrink-0 py-1"
            >
              THEPOO7AN
            </a>

            {/* Zone 2: Clean Typography Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground"
              aria-label={isEn ? "Main Navigation" : "ناوبری اصلی"}
            >
              {(
                [
                  { id: "portfolio", labelEn: "Portfolio", labelFa: "نمونه‌کارها" },
                  { id: "services", labelEn: "Services", labelFa: "خدمات" },
                  { id: "workflow", labelEn: "Workflow", labelFa: "مراحل کار" },
                  { id: "pricing", labelEn: "Pricing", labelFa: "تعرفه‌ها" },
                  { id: "faq", labelEn: "FAQ", labelFa: "سؤالات" },
                ] as const
              ).map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2 ${
                      isActive
                        ? "text-foreground font-semibold underline decoration-primary"
                        : ""
                    }`}
                  >
                    {isEn ? item.labelEn : item.labelFa}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Compact Utilities + 1 Primary Action */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleLang}
                className="min-h-[44px] min-w-[44px] px-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center whitespace-nowrap shrink-0"
                aria-label={
                  isEn ? "تغییر زبان به فارسی" : "Switch language to English"
                }
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
                className="size-11 min-h-[44px] min-w-[44px] rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center shrink-0"
              >
                {isDark ? (
                  <Sun aria-hidden="true" className="size-4" />
                ) : (
                  <Moon aria-hidden="true" className="size-4" />
                )}
              </button>

              <a
                href={isEn ? "./order.html?lang=en" : "./order.html"}
                className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap shrink-0"
              >
                {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
              </a>

              <button
                ref={menuToggleBtnRef}
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
                className="lg:hidden size-11 min-h-[44px] min-w-[44px] rounded-xl border border-border text-foreground hover:bg-secondary flex items-center justify-center transition-colors shrink-0"
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ================= Mobile Bottom-Sheet Menu ================= */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={menuDialogRef}
              className="relative bg-card text-card-foreground border-t border-border rounded-t-3xl p-6 flex flex-col gap-4 shadow-token-lg max-h-[85vh] overflow-y-auto pb-[calc(24px+env(safe-area-inset-bottom,0px))]"
              role="dialog"
              aria-modal="true"
              aria-label={isEn ? "Navigation Menu" : "منوی ناوبری اصلی"}
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-display font-bold text-base text-foreground">
                  THEPOO7AN
                </span>
                <button
                  ref={menuCloseBtnRef}
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="size-11 min-h-[44px] min-w-[44px] rounded-xl bg-secondary text-foreground flex items-center justify-center active:scale-95"
                  aria-label={isEn ? "Close menu" : "بستن منو"}
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {(
                  [
                    {
                      id: "portfolio",
                      href: "#portfolio",
                      labelFa: "نمونه‌کارها (۳ پلتفرم)",
                      labelEn: "Portfolio (3 Platforms)",
                      icon: Film,
                    },
                    {
                      id: "services",
                      href: "#services",
                      labelFa: "خدمات استودیو",
                      labelEn: "Studio Services",
                      icon: Sparkles,
                    },
                    {
                      id: "workflow",
                      href: "#workflow",
                      labelFa: "مراحل همکاری",
                      labelEn: "3-Step Workflow",
                      icon: Layers,
                    },
                    {
                      id: "pricing",
                      href: "#pricing",
                      labelFa: "تعرفه‌ها و بسته‌ها",
                      labelEn: "Pricing Packages",
                      icon: Tag,
                    },
                    {
                      id: "faq",
                      href: "#faq",
                      labelFa: "سؤالات متداول",
                      labelEn: "FAQ",
                      icon: HelpCircle,
                    },
                  ] as const
                ).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`rounded-xl px-4 min-h-[48px] flex items-center gap-3 transition-colors font-medium text-base ${
                        isActive
                          ? "bg-secondary text-primary font-semibold"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Icon
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>{isEn ? item.labelEn : item.labelFa}</span>
                    </a>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-border flex flex-col gap-2.5">
                <a
                  href={isEn ? "./order.html?lang=en" : "./order.html"}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-semibold rounded-xl bg-primary text-primary-foreground text-center min-h-[48px] px-6 flex items-center justify-center active:scale-95 transition-all text-sm gap-2"
                >
                  <span>
                    {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
                  </span>
                  <ArrowIcon className="size-4" aria-hidden="true" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://t.me/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium rounded-xl bg-telegram text-white min-h-[44px] flex items-center justify-center gap-2 text-xs active:scale-95"
                  >
                    <Send className="size-3.5" aria-hidden="true" />
                    <span>Telegram</span>
                  </a>
                  <a
                    href="https://www.instagram.com/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium rounded-xl bg-instagram-gradient text-white min-h-[44px] flex items-center justify-center gap-2 text-xs active:scale-95"
                  >
                    <Camera className="size-3.5" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main
          id="main-content"
          className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-24 md:pb-16 flex flex-col gap-20 sm:gap-28"
        >
          {/* ================= 2. HERO SPLIT SHOWCASE ================= */}
          <section
            aria-label={isEn ? "Studio Introduction" : "معرفی استودیو"}
            className="flex flex-col gap-10 lg:gap-12"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-6 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {isEn
                    ? "Pooyan Karimi · Lyric Motion & Music Video Studio"
                    : "پویان کریمی · استودیو تخصصی تایپوگرافی لیریک و ادیت موزیک"}
                </p>

                <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-[56px] leading-[1.2] tracking-tight text-foreground max-w-2xl">
                  {isEn ? (
                    <>
                      Music Visuals &amp; Lyric Motion,{" "}
                      <span className="studio-chrome-text">
                        Built for Every Beat.
                      </span>
                    </>
                  ) : (
                    <>
                      تولید ویدیوی موزیک،{" "}
                      <span className="studio-chrome-text">
                        هم‌ضرب با ریتم اثر شما.
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {isEn
                    ? "Frame-accurate beat synchronization, kinetic Persian & English typography, and lossless 1080p vertical masters tailored for Instagram Reels, YouTube Shorts, and TikTok."
                    : "بیت‌سینک فریم‌به‌فریم، تایپوگرافی متحرک فارسی و انگلیسی، و خروجی بدون افت کیفیت ۱۰۸۰p اختصاصی برای ریلز اینستاگرام، یوتیوب شورتز و تیک‌تاک."}
                </p>

                {/* Clean Unboxed Specs Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                  <span>
                    {isEn ? "Delivery ≤ 7 days" : "تحویل معمولاً تا ۷ روز کاری"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {isEn
                      ? "1080p60 Vertical Master"
                      : "خروجی عمودی ۱۰۸۰p60"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {isEn
                      ? "Direct Telegram coordination"
                      : "هماهنگی مستقیم در تلگرام"}
                  </span>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={isEn ? "./order.html?lang=en" : "./order.html"}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:opacity-90 transition-all active:scale-95 shadow-token-md whitespace-nowrap"
                  >
                    <span>
                      {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
                    </span>
                    <ArrowIcon className="size-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#portfolio"
                    className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl border border-border bg-card text-foreground hover:bg-secondary text-sm sm:text-base font-medium transition-colors active:scale-95 whitespace-nowrap"
                  >
                    {isEn ? "Explore Works" : "مشاهده نمونه‌کارها"}
                  </a>

                  <a
                    href="https://t.me/thepoo7an"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    <Send className="size-3.5 text-telegram" aria-hidden="true" />
                    <span>@thepoo7an</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Command 9:16 Showreel Frame */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div
                  className="w-full max-w-[330px] mx-auto lg:ms-auto lg:me-0 aspect-[9/15] rounded-2xl overflow-hidden border border-border bg-black relative group cursor-pointer shadow-token-lg"
                  onClick={() => openLightbox(FEATURED_REELS.lyric916)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(FEATURED_REELS.lyric916);
                    }
                  }}
                  aria-label={
                    isEn
                      ? "Play featured reel in lightbox"
                      : "پخش نمونه برتر در اندازه کامل"
                  }
                >
                  <WorkThumbnail
                    item={FEATURED_REELS.lyric916}
                    alt={
                      isEn
                        ? "Featured 9:16 Lyric Reel Typography"
                        : "تایپوگرافی سینمایی موزیک ریلز ۹:۱۶"
                    }
                    priority
                    className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/15" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-105 active:scale-95 transition-transform">
                      <Play
                        className="size-6 fill-black translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 text-start">
                    <p className="text-xs font-medium text-zinc-300 mb-1">
                      {isEn
                        ? "Featured Showreel · Direct Play (No VPN)"
                        : "نمونه برتر · پخش مستقیم بدون فیلترشکن"}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      {isEn
                        ? "Cinematic Music Reel Typography"
                        : "تایپوگرافی سینمایی | موزیک ریلز"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Architectural Proof Strip */}
            <div
              aria-label={isEn ? "Studio Standards" : "استانداردهای فنی استودیو"}
              className="grid grid-cols-2 lg:grid-cols-4 border border-border rounded-2xl bg-card divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-border overflow-hidden"
            >
              <div className="p-5 sm:p-6 flex flex-col gap-1.5">
                <span
                  dir="ltr"
                  className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
                >
                  100%
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {isEn ? "Beat-Perfect Sync" : "بیت‌سینک فریم‌به‌فریم"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isEn
                    ? "Exact alignment with drums & vocals"
                    : "هماهنگی دقیق هر کلمه با کیک و وکال"}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-1.5">
                <span
                  dir="ltr"
                  className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
                >
                  ≤ 7d
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {isEn ? "Reliable Turnaround" : "تحویل سریع و منظم"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isEn
                    ? "1 day lyric · 2–3 days full video edit"
                    : "۱ روزه برای لیریک · ۲ تا ۳ روز برای ادیت کامل"}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-1.5">
                <span
                  dir="ltr"
                  className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
                >
                  1080p60
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {isEn ? "High-Bitrate Master" : "خروجی بدون افت کیفیت"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isEn
                    ? "Calibrated for Reels, Shorts & TikTok"
                    : "کالیبره‌شده برای آپلود در ریلز و شورتز"}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-1.5">
                <span
                  dir="ltr"
                  className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
                >
                  24h
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {isEn ? "Direct Response" : "پاسخ‌گویی مستقیم"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isEn
                    ? "Quote & concept alignment on Telegram"
                    : "بررسی فایل و برآورد دقیق در تلگرام"}
                </span>
              </div>
            </div>
          </section>

          <PortfolioSection
            isEn={isEn}
            platformHighlights={platformHighlights}
            platformFilter={platformFilter}
            onChangeFilter={(filter) => {
              setPlatformFilter(filter);
              setActiveWorkIndex(0);
            }}
            platformCounts={platformCounts}
            filteredWorks={filteredWorks}
            activeWorkIndex={activeWorkIndex}
            onPortfolioScroll={handlePortfolioScroll}
            onOpenLightbox={openLightbox}
          />

          <ServicesAndWorkflowSection isEn={isEn} />

          <PricingSection
            isEn={isEn}
            activePriceIndex={activePriceIndex}
            onPricingScroll={handlePricingScroll}
          />

          <FaqAndFooterSection
            isEn={isEn}
            openFaqId={openFaqId}
            onToggleFaq={(id) => setOpenFaqId(openFaqId === id ? null : id)}
            ArrowIcon={ArrowIcon}
          />
        </main>

        {/* Global Cinema Lightbox (lazy loaded on first video interaction) */}
        {activeLightboxItem && (
          <Suspense fallback={null}>
            <WorkLightbox
              activeItem={activeLightboxItem}
              items={
                filteredWorks.some((w) => w.id === activeLightboxItem.id)
                  ? filteredWorks
                  : allWorks
              }
              isEn={isEn}
              closeBtnRef={closeBtnRef}
              lightboxModalRef={lightboxModalRef}
              onClose={closeLightbox}
              onSelectItem={setActiveLightboxItem}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
