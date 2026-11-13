import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type KeyboardEvent,
} from "react";
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
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Film,
  Tag,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { WorkItem, WORK_ITEMS, FEATURED_REELS } from "../data/works";
import { WorkLightbox } from "./WorkLightbox";
import { FAQS } from "./FAQ";

type PlatformFilter = "all" | "instagram" | "youtube" | "tiktok";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface WorkThumbnailProps {
  item: WorkItem;
  alt: string;
  priority?: boolean;
  className?: string;
}

function WorkThumbnail({
  item,
  alt,
  priority = false,
  className = "",
}: WorkThumbnailProps) {
  const candidates = useMemo(
    () => [item.primarySrc, ...(item.fallbacks || [])].filter(Boolean),
    [item.primarySrc, item.fallbacks]
  );
  const [idx, setIdx] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  useEffect(() => {
    setIdx(0);
    setExhausted(false);
  }, [item.id]);

  if (exhausted || !candidates[idx]) {
    return (
      <div className="size-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-6 text-center gap-3">
        <Film className="size-8 text-zinc-400" aria-hidden="true" />
        <span className="text-xs font-medium text-zinc-300 line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width="600"
      height="750"
      onError={() => {
        if (idx + 1 < candidates.length) {
          setIdx((prev) => prev + 1);
        } else {
          setExhausted(true);
        }
      }}
      className={className}
    />
  );
}

export default function Screen2() {
  const { isEn, toggleLang } = useLanguage();
  const { isDark, toggleTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<WorkItem | null>(
    null
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activePriceIndex, setActivePriceIndex] = useState(1);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lightboxModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

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

  const filteredWorks = useMemo(() => {
    if (platformFilter === "all") return WORK_ITEMS;
    return WORK_ITEMS.filter((item) => item.platform === platformFilter);
  }, [platformFilter]);

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

  const getPlatformLabel = (platform: WorkItem["platform"]) => {
    if (platform === "instagram") return "Instagram Reels";
    if (platform === "youtube") return "YouTube Shorts";
    return "TikTok";
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
              <a
                href="#portfolio"
                className="hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {isEn ? "Portfolio" : "نمونه‌کارها"}
              </a>
              <a
                href="#services"
                className="hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {isEn ? "Services" : "خدمات"}
              </a>
              <a
                href="#workflow"
                className="hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {isEn ? "Workflow" : "مراحل کار"}
              </a>
              <a
                href="#pricing"
                className="hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {isEn ? "Pricing" : "تعرفه‌ها"}
              </a>
              <a
                href="#faq"
                className="hover:text-foreground hover:underline underline-offset-8 decoration-primary/70 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {isEn ? "FAQ" : "سؤالات"}
              </a>
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
                href="./order.html"
                className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap shrink-0"
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
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="size-11 min-h-[44px] min-w-[44px] rounded-xl bg-secondary text-foreground flex items-center justify-center active:scale-95"
                  aria-label={isEn ? "Close menu" : "بستن منو"}
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {[
                  {
                    href: "#portfolio",
                    labelFa: "نمونه‌کارها (۳ پلتفرم)",
                    labelEn: "Portfolio (3 Platforms)",
                    icon: Film,
                  },
                  {
                    href: "#services",
                    labelFa: "خدمات استودیو",
                    labelEn: "Studio Services",
                    icon: Sparkles,
                  },
                  {
                    href: "#workflow",
                    labelFa: "مراحل همکاری",
                    labelEn: "3-Step Workflow",
                    icon: Layers,
                  },
                  {
                    href: "#pricing",
                    labelFa: "تعرفه‌ها و بسته‌ها",
                    labelEn: "Pricing Packages",
                    icon: Tag,
                  },
                  {
                    href: "#faq",
                    labelFa: "سؤالات متداول",
                    labelEn: "FAQ",
                    icon: HelpCircle,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[48px] flex items-center gap-3 text-foreground hover:bg-secondary transition-colors font-medium text-base"
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
                  href="./order.html"
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
                    href="./order.html"
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
                    <p className="text-[11px] font-medium text-zinc-300 mb-1">
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

          {/* ================= 3. MULTI-PLATFORM PORTFOLIO ================= */}
          <section
            id="portfolio"
            className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
          >
            <span id="work" className="sr-only" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-primary">
                  {isEn
                    ? "Selected Works · 3 Platforms"
                    : "منتخب آثار در ۳ پلتفرم"}
                </p>
                <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
                  {isEn
                    ? "Latest Productions Across Instagram, YouTube & TikTok"
                    : "جدیدترین کارها در اینستاگرام، یوتیوب و تیک‌تاک"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  {isEn
                    ? "Click any reel or edit to watch inside the studio player or open directly on the platform."
                    : "برای پخش هر اثر روی کارت کلیک کنید؛ آثار دارای پخش مستقیم بدون نیاز به فیلترشکن اجرا می‌شوند."}
                </p>
              </div>

              {/* Clean Platform Profile Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-muted-foreground shrink-0">
                <a
                  href="https://www.instagram.com/thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <Camera className="size-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <YouTubeIcon className="size-4 text-red-500" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://www.tiktok.com/@thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <Film className="size-4" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Interactive Segmented Platform Filter */}
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-secondary border border-border rounded-xl w-fit"
              role="tablist"
              aria-label={isEn ? "Filter by platform" : "فیلتر بر اساس پلتفرم"}
            >
              {(
                [
                  {
                    id: "all",
                    labelFa: "همه آثار",
                    labelEn: "All Works",
                    count: platformCounts.all,
                  },
                  {
                    id: "instagram",
                    labelFa: "اینستاگرام",
                    labelEn: "Instagram",
                    count: platformCounts.instagram,
                  },
                  {
                    id: "youtube",
                    labelFa: "یوتیوب",
                    labelEn: "YouTube",
                    count: platformCounts.youtube,
                  },
                  {
                    id: "tiktok",
                    labelFa: "تیک‌تاک",
                    labelEn: "TikTok",
                    count: platformCounts.tiktok,
                  },
                ] as const
              ).map((tab) => {
                const isActive = platformFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setPlatformFilter(tab.id);
                      setActiveWorkIndex(0);
                    }}
                    className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-card text-foreground shadow-token-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{isEn ? tab.labelEn : tab.labelFa}</span>
                    <span className="tabular-nums text-[11px] text-muted-foreground">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Editorial Media-First Grid */}
            <div
              className="work-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              onScroll={handlePortfolioScroll}
            >
              {filteredWorks.map((item) => {
                const hasLocalVideo = Boolean(item.videoSrc);
                const title = isEn ? item.labelEn : item.labelFa;
                const spec = isEn ? item.specEn : item.specFa;

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl bg-card text-card-foreground border border-border p-3.5 sm:p-4 flex flex-col justify-between h-full group hover:border-primary/45 transition-colors"
                  >
                    <div>
                      {/* Vertical-First 4:5 Cinema Frame */}
                      <div
                        className="rounded-xl bg-black aspect-[4/5] overflow-hidden relative group/img cursor-pointer"
                        onClick={() => openLightbox(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openLightbox(item);
                          }
                        }}
                        aria-label={title}
                      >
                        <WorkThumbnail
                          item={item}
                          alt={title}
                          className="size-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover/img:opacity-95 transition-opacity" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="size-12 rounded-full bg-white/95 text-black flex items-center justify-center shadow-xl group-hover/img:scale-110 active:scale-95 transition-transform">
                            <Play
                              className="size-5 fill-black translate-x-0.5"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Clean Unboxed Metadata & Title */}
                      <div className="flex flex-col gap-1.5 mt-4 px-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground/85">
                            {getPlatformLabel(item.platform)}
                          </span>
                          {hasLocalVideo && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                {isEn ? "Direct Play" : "پخش مستقیم"}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="font-bold text-base sm:text-lg text-foreground leading-snug">
                          {title}
                        </h3>

                        {spec && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {spec}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Action Strip */}
                    <div className="pt-3 mt-4 border-t border-border flex items-center justify-between gap-2 px-1">
                      <button
                        type="button"
                        onClick={() => openLightbox(item)}
                        className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors active:scale-95 whitespace-nowrap"
                      >
                        <Play className="size-3.5 fill-current" aria-hidden="true" />
                        <span>{isEn ? "Watch" : "پخش ویدیو"}</span>
                      </button>

                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                        >
                          <span>
                            {item.platform === "instagram"
                              ? "Instagram"
                              : item.platform === "youtube"
                                ? "YouTube"
                                : "TikTok"}
                          </span>
                          <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile Carousel Indicator Dots */}
            <div className="carousel-dots md:hidden" aria-hidden="true">
              {filteredWorks.slice(0, 6).map((_, i) => (
                <span key={i} className={activeWorkIndex === i ? "active" : ""} />
              ))}
            </div>
          </section>

          {/* ================= 4. STUDIO SERVICES (2x2 Architectural Grid) ================= */}
          <section
            id="services"
            className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-primary">
                {isEn ? "Studio Capabilities" : "خدمات تخصصی استودیو"}
              </p>
              <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
                {isEn
                  ? "Tailored Visual Solutions for Music Releases"
                  : "راهکارهای ویدیویی برای انتشار حرفه‌ای موزیک"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                {isEn
                  ? "Kinetic typography, rhythmic video cutting, and official artwork crafted specifically for artists and music producers."
                  : "تایپوگرافی لیریک، ادیت ریتمیک و کاور آرت اختصاصی متناسب با فضا و مود هر قطعه."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {[
                {
                  num: "01",
                  titleFa: "تایپوگرافی لیریک موزیک",
                  titleEn: "Lyric Typography",
                  descFa:
                    "تایپوگرافی متحرک ریتمیک، انیمیشن فریم‌به‌فریم کلمات و بیت‌سینک دقیق با ضرب‌آهنگ و وکال.",
                  descEn:
                    "Kinetic typography, custom font direction, and exact syllable-to-beat synchronization.",
                },
                {
                  num: "02",
                  titleFa: "ادیت ویدیو و ریلز",
                  titleEn: "Video Edit + Lyric",
                  descFa:
                    "اصلاح رنگ سینمایی، کات‌های ریتمیک، افکت‌های بصری متناسب با مود ترک و خروجی عمودی ۹:۱۶.",
                  descEn:
                    "Color grading, rhythmic cuts, visual transitions, and vertical 9:16 mastering.",
                },
                {
                  num: "03",
                  titleFa: "طراحی کاور موزیک",
                  titleEn: "Music Cover Artwork",
                  descFa:
                    "طراحی پوستر و آرت‌ورک مربعی ۳۰۰۰×۳۰۰۰ با استاندارد پلتفرم‌های اسپاتیفای و اپل موزیک.",
                  descEn:
                    "High-resolution 3000x3000px artwork calibrated for Spotify, Apple Music, and SoundCloud.",
                },
                {
                  num: "04",
                  titleFa: "پکیج ماهانه تولید محتوا",
                  titleEn: "Monthly Content Growth",
                  descFa:
                    "۴ ریلز در ماه با تقویم تحویل منظم هفتگی و اولویت رندرینگ برای انتشار پیوسته آرتیست.",
                  descEn:
                    "Consistent weekly reel production calendar ensuring steady release momentum.",
                },
              ].map((svc) => (
                <div
                  key={svc.num}
                  className="bg-card p-6 sm:p-8 flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2.5">
                    <span className="font-display tabular-nums text-xs font-bold text-primary">
                      {svc.num}.
                    </span>
                    <h3 className="font-bold text-lg sm:text-xl text-foreground">
                      {isEn ? svc.titleEn : svc.titleFa}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isEn ? svc.descEn : svc.descFa}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 5. THREE-STEP PRODUCTION WORKFLOW ================= */}
          <section
            id="workflow"
            className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-primary">
                {isEn ? "Workflow" : "مراحل همکاری"}
              </p>
              <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
                {isEn
                  ? "From Track to Master in Three Steps"
                  : "از فایل صوتی تا خروجی نهایی در ۳ گام"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                {isEn
                  ? "A clear, transparent workflow from initial brief to final uncompressed delivery."
                  : "روند کاری شفاف، سریع و بدون ابهام از دریافت فایل تا ارسال مستر نهایی."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-8">
              {[
                {
                  step: "01",
                  titleFa: "ارسال فایل و بریف",
                  titleEn: "Send Track & Brief",
                  descFa:
                    "ارسال فایل صوتی، مشخص کردن بخش موردنظر لیریک، و هماهنگی سبک بصری در تلگرام یا فرم سفارش.",
                  descEn:
                    "Share your audio track, lyric section, and visual references via order form or Telegram.",
                },
                {
                  step: "02",
                  titleFa: "طراحی و بیت‌سینک",
                  titleEn: "Design & Beat-Sync",
                  descFa:
                    "انتخاب فونت و کانسپت متناسب با موزیک، ساخت موشن تایپوگرافی و سینک دقیق کلمات با ضرب آهنگ.",
                  descEn:
                    "Custom font pairing, kinetic motion design, and sub-frame beat alignment.",
                },
                {
                  step: "03",
                  titleFa: "تحویل فایل نهایی ۱۰۸۰p",
                  titleEn: "Lossless 1080p Master",
                  descFa:
                    "ارسال پیش‌نمایش برای بررسی نهایی و تحویل فایل استاندارد ۹:۱۶ بدون واترمارک آماده انتشار.",
                  descEn:
                    "Preview review followed by uncompressed 9:16 master export ready for release.",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display tabular-nums text-lg font-bold text-primary">
                      {item.step}
                    </span>
                    <div className="h-px flex-1 bg-border" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">
                    {isEn ? item.titleEn : item.titleFa}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isEn ? item.descEn : item.descFa}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 6. TRANSPARENT PRICING & PACKAGES ================= */}
          <section
            id="pricing"
            className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-primary">
                {isEn ? "Pricing" : "تعرفه‌ها و بسته‌ها"}
              </p>
              <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
                {isEn
                  ? "Choose the Right Package for Your Release"
                  : "پکیج مناسب پروژه‌تان را انتخاب کنید"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                {isEn
                  ? "Transparent base pricing; final scope and fee are confirmed upfront before starting."
                  : "قیمت پایه شفاف است؛ هزینه قطعی پس از بررسی فایل و پیش از شروع کار مشخص می‌شود."}
              </p>
            </div>

            <div
              className="price-grid grid md:grid-cols-3 gap-6 items-stretch"
              onScroll={handlePricingScroll}
            >
              {/* Package 1: Basic Lyric */}
              <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-xl text-foreground">
                      {isEn ? "Basic Lyric Typography" : "تایپوگرافی لیریک پایه"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isEn
                        ? "Single 15–20s vertical reel"
                        : "یک ویدیوی ۱۵ تا ۲۰ ثانیه‌ای"}
                    </p>
                  </div>

                  <div className="py-4 border-y border-border flex flex-col gap-1">
                    <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                      {isEn ? "From 150,000 Tomans" : "از ۱۵۰٬۰۰۰ تومان"}
                    </strong>
                    <span className="text-xs text-muted-foreground">
                      {isEn
                        ? "Turnaround: 1 business day"
                        : "تحویل معمولاً ۱ روز کاری (۱۰ تا ۲۳)"}
                    </span>
                  </div>

                  <ul className="text-sm text-muted-foreground flex flex-col gap-2.5 list-none p-0">
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "1 kinetic lyric video"
                          : "تایپوگرافی روی ویدیو یا فوتیج"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn ? "1 round of minor revisions" : "یک دور اصلاح جزئی"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Exported for Reels & Shorts (9:16)"
                          : "خروجی استاندارد Reels و Shorts"}
                      </span>
                    </li>
                  </ul>
                </div>

                <a
                  href="./order.html?plan=lyric"
                  className="font-semibold rounded-xl bg-secondary hover:bg-accent text-secondary-foreground text-sm px-6 min-h-[48px] flex items-center justify-center transition-colors border border-border active:scale-95 whitespace-nowrap"
                >
                  {isEn ? "Select Lyric Package" : "سفارش تایپوگرافی لیریک"}
                </a>
              </article>

              {/* Package 2: Video Edit + Lyric (Highlighted) */}
              <article className="rounded-2xl bg-card text-card-foreground border-2 border-primary p-6 sm:p-7 flex flex-col justify-between h-full gap-6 shadow-token-md">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-primary">
                      {isEn ? "Most Popular" : "محبوب‌ترین انتخاب"}
                    </span>
                    <h3 className="font-bold text-xl text-foreground">
                      {isEn ? "Video Edit + Lyric" : "ادیت ویدیو + لیریک"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isEn
                        ? "Full visual dynamic production"
                        : "ترکیب کامل تدوین ویدیو، افکت و متن"}
                    </p>
                  </div>

                  <div className="py-4 border-y border-border flex flex-col gap-1">
                    <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                      {isEn ? "From 300,000 Tomans" : "از ۳۰۰٬۰۰۰ تومان"}
                    </strong>
                    <span className="text-xs text-primary font-medium">
                      {isEn
                        ? "Turnaround: 2 to 3 business days"
                        : "تحویل ۲ تا ۳ روز کاری"}
                    </span>
                  </div>

                  <ul className="text-sm text-foreground flex flex-col gap-2.5 list-none p-0">
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Dynamic editing + kinetic typography"
                          : "ادیت ویدیو + تایپوگرافی متحرک"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Fine-tuning timing & visual revisions"
                          : "تنظیم دقیق بیت‌سینک و اصلاح جزئی"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Full HD 1080p 9:16 master"
                          : "خروجی عمودی ۱۰۸۰p بدون افت کیفیت"}
                      </span>
                    </li>
                  </ul>
                </div>

                <a
                  href="./order.html?plan=video"
                  className="font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-sm px-6 min-h-[48px] flex items-center justify-center transition-all active:scale-95 whitespace-nowrap"
                >
                  {isEn ? "Select Video + Lyric" : "سفارش ادیت و لیریک"}
                </a>
              </article>

              {/* Package 3: Monthly 4 Reels */}
              <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-xl text-foreground">
                      {isEn ? "Monthly 4 Reels Package" : "پکیج ماهانه ۴ ریلز"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isEn
                        ? "Dedicated weekly release slot"
                        : "اولویت اختصاصی انتشار هفتگی"}
                    </p>
                  </div>

                  <div className="py-4 border-y border-border flex flex-col gap-1">
                    <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                      {isEn ? "From 1,000,000 Tomans" : "از ۱٬۰۰۰٬۰۰۰ تومان"}
                    </strong>
                    <span className="text-xs text-muted-foreground">
                      {isEn
                        ? "Scheduled weekly release calendar"
                        : "اولویت رندرینگ و تحویل هفتگی"}
                    </span>
                  </div>

                  <ul className="text-sm text-muted-foreground flex flex-col gap-2.5 list-none p-0">
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "4 full video outputs per month"
                          : "۴ خروجی ویدیوی کامل در ماه"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Structured release timeline"
                          : "تقویم تحویل منظم هفتگی"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {isEn
                          ? "Direct Telegram support"
                          : "پشتیبانی مستقیم تلگرام"}
                      </span>
                    </li>
                  </ul>
                </div>

                <a
                  href="./order.html?plan=monthly"
                  className="font-semibold rounded-xl bg-secondary hover:bg-accent text-secondary-foreground text-sm px-6 min-h-[48px] flex items-center justify-center transition-colors border border-border active:scale-95 whitespace-nowrap"
                >
                  {isEn ? "Select Monthly Plan" : "سفارش پکیج ماهانه"}
                </a>
              </article>
            </div>

            {/* Mobile Carousel Indicator Dots */}
            <div className="carousel-dots md:hidden" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={activePriceIndex === i ? "active" : ""} />
              ))}
            </div>
          </section>

          {/* ================= 7. EDITORIAL SPLIT FAQ ================= */}
          <section
            id="faq"
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24"
          >
            <div className="lg:col-span-4 flex flex-col gap-3">
              <p className="text-xs font-semibold text-primary">
                {isEn ? "FAQ" : "سؤالات متداول"}
              </p>
              <h2 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
                {isEn ? "Frequently Asked Questions" : "پاسخ به سؤالات متداول"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn
                  ? "Everything you need to know about pricing, turnaround, revisions, and required files."
                  : "اطلاعات کامل درباره نحوه سفارش، زمان تحویل، اصلاحات و تسویه پروژه."}
              </p>
              <div className="pt-2">
                <a
                  href="https://t.me/thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 min-h-[44px]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  <span>
                    {isEn ? "Ask directly on Telegram" : "پرسش مستقیم در تلگرام"}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 border-y border-border divide-y divide-border">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-start font-semibold text-foreground min-h-[56px] hover:text-primary transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base">
                        {isEn ? faq.qEn : faq.qFa}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-muted-foreground text-start text-sm sm:text-[15px] leading-relaxed">
                        {isEn ? faq.aEn : faq.aFa}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 8. QUIET EDITORIAL FOOTER ================= */}
          <footer
            id="contact"
            className="border-t border-border pt-12 pb-6 flex flex-col gap-10"
            aria-label={isEn ? "Footer and Contact" : "ارتباط و پاورقی"}
          >
            <div className="rounded-2xl bg-card border border-border p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-2 max-w-xl text-start">
                <p className="text-xs font-semibold text-primary">
                  {isEn ? "Start Your Release" : "شروع پروژه جدید"}
                </p>
                <h2 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
                  {isEn
                    ? "Ready to give your music the visual presence it deserves?"
                    : "آهنگ جدید در دست انتشار دارید؟ بیایید با هم بسازیمش."}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isEn
                    ? "Submit the project brief or message directly on Telegram and Instagram for quotes."
                    : "برای برآورد دقیق هزینه یا شروع همکاری، فرم سفارش را پر کنید یا در تلگرام پیام دهید."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                <a
                  href="./order.html"
                  className="font-semibold rounded-xl bg-primary text-primary-foreground px-6 min-h-[48px] inline-flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm w-full sm:w-auto whitespace-nowrap"
                >
                  <span>{isEn ? "Order Form" : "فرم ثبت سفارش"}</span>
                  <ArrowIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://t.me/thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium rounded-xl bg-secondary hover:bg-accent border border-border text-foreground px-5 min-h-[48px] inline-flex items-center justify-center gap-2 active:scale-95 transition-colors text-sm flex-1 sm:flex-initial whitespace-nowrap"
                >
                  <Send className="size-4 text-telegram" aria-hidden="true" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://www.instagram.com/thepoo7an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium rounded-xl bg-secondary hover:bg-accent border border-border text-foreground px-5 min-h-[48px] inline-flex items-center justify-center gap-2 active:scale-95 transition-colors text-sm flex-1 sm:flex-initial whitespace-nowrap"
                >
                  <Camera className="size-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground text-center sm:text-start">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {isEn
                    ? "Operating hours: 10:00 – 23:00 (Tehran Time)"
                    : "ساعت کاری پاسخگویی: ۱۰:۰۰ تا ۲۳:۰۰ (به وقت تهران)"}
                </span>
              </div>
              <div dir="ltr">
                © 2026 THEPOO7AN (پویان کریمی) · All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        {/* Global Cinema Lightbox */}
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
