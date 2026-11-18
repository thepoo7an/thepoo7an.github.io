import type { KeyboardEvent, UIEvent } from "react";
import { Play, Camera, ExternalLink, Film } from "lucide-react";
import {
  WorkItem,
  PlatformHighlight,
  formatViewCount,
  formatShortDate,
} from "../../data/works";
import { YouTubeIcon, WorkThumbnail } from "../PortfolioMedia";

export type PlatformFilter = "all" | "instagram" | "youtube" | "tiktok";

export interface PortfolioSectionProps {
  isEn: boolean;
  platformHighlights: PlatformHighlight[];
  platformFilter: PlatformFilter;
  onChangeFilter: (filter: PlatformFilter) => void;
  platformCounts: Record<PlatformFilter, number>;
  filteredWorks: WorkItem[];
  activeWorkIndex: number;
  onPortfolioScroll: (e: UIEvent<HTMLDivElement>) => void;
  onOpenLightbox: (item: WorkItem) => void;
}

function getPlatformLabel(platform: WorkItem["platform"]) {
  if (platform === "instagram") return "Instagram Reels";
  if (platform === "youtube") return "YouTube Shorts";
  return "TikTok";
}

export function PortfolioSection({
  isEn,
  platformHighlights,
  platformFilter,
  onChangeFilter,
  platformCounts,
  filteredWorks,
  activeWorkIndex,
  onPortfolioScroll,
  onOpenLightbox,
}: PortfolioSectionProps) {
  return (
    <section
      id="portfolio"
      className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
    >
      <span id="work" className="sr-only" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-primary">
            {isEn ? "Selected Works · 3 Platforms" : "منتخب آثار در ۳ پلتفرم"}
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

      {/* 3-Platform Highlights: Latest Upload & Most Viewed per Platform */}
      <div
        aria-label={
          isEn
            ? "Latest upload and most viewed per platform"
            : "آخرین ریلز آپلودشده و پربازدیدترین ویدیو در هر سه پلتفرم"
        }
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h3 className="font-bold text-lg sm:text-xl text-foreground tracking-tight">
            {isEn
              ? "Latest Upload & Top-Viewed per Platform"
              : "آخرین آپلود و پربازدیدترین ویدیو به تفکیک پلتفرم"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? "Synced from channel feeds · Click any frame to play"
              : "به‌روزرسانی خودکار از فید کانال‌ها · برای پخش کلیک کنید"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {platformHighlights.map((highlight) => {
            const platformTitle =
              highlight.platform === "instagram"
                ? "Instagram Reels"
                : highlight.platform === "youtube"
                  ? "YouTube Shorts"
                  : "TikTok";

            const slots: Array<{
              role: "latest" | "most-viewed";
              item: WorkItem;
            }> = [
              { role: "latest", item: highlight.latest },
              { role: "most-viewed", item: highlight.mostViewed },
            ];

            return (
              <div
                key={highlight.platform}
                className="rounded-2xl bg-card text-card-foreground border border-border p-4 sm:p-5 flex flex-col gap-4"
              >
                {/* Clean Platform Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
                  <div className="flex items-center gap-2 min-w-0">
                    {highlight.platform === "instagram" ? (
                      <Camera
                        className="size-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                    ) : highlight.platform === "youtube" ? (
                      <YouTubeIcon className="size-4 text-red-500 shrink-0" />
                    ) : (
                      <Film
                        className="size-4 text-foreground shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-display font-bold text-sm text-foreground truncate">
                      {platformTitle}
                    </span>
                  </div>

                  <a
                    href={highlight.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="min-h-[44px] -my-2 px-1.5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
                    aria-label={`${platformTitle} ${highlight.handle}`}
                  >
                    <span>{highlight.handle}</span>
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                </div>

                {/* Dual Slots: Latest Upload + Most Viewed */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {slots.map(({ role, item }) => {
                    const slotTitle = isEn ? item.labelEn : item.labelFa;
                    const roleText =
                      role === "latest"
                        ? isEn
                          ? "Latest Upload"
                          : "آخرین آپلود"
                        : isEn
                          ? "Most Viewed"
                          : "پربازدیدترین";

                    const subMetric =
                      role === "most-viewed"
                        ? highlight.hasVerifiedMostViewedCount &&
                          typeof item.viewCount === "number" &&
                          item.viewCount > 0
                          ? formatViewCount(item.viewCount, isEn)
                          : isEn
                            ? "Studio Flagship"
                            : "شاخص آرشیو"
                        : item.publishedAt
                          ? formatShortDate(item.publishedAt, isEn)
                          : item.videoSrc
                            ? isEn
                              ? "Direct Play"
                              : "پخش مستقیم"
                            : "";

                    return (
                      <button
                        key={`${highlight.platform}-${role}-${item.id}`}
                        type="button"
                        onClick={() => onOpenLightbox(item)}
                        className="group/slot flex flex-col text-start focus-visible:outline-none rounded-xl active:scale-[0.98] transition-transform"
                        aria-label={`${platformTitle} · ${roleText}: ${slotTitle}`}
                      >
                        <div className="w-full aspect-[9/14] rounded-xl overflow-hidden bg-black relative">
                          <WorkThumbnail
                            item={item}
                            alt={slotTitle}
                            className="size-full object-cover group-hover/slot:scale-[1.04] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover/slot:opacity-95 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-10 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg group-hover/slot:scale-110 transition-transform">
                              <Play
                                className="size-4 fill-black translate-x-0.5"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-2.5 flex flex-col gap-1 px-0.5 min-w-0 w-full">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-tight">
                            <span
                              className={
                                role === "latest"
                                  ? "font-semibold text-primary"
                                  : "font-semibold text-foreground"
                              }
                            >
                              {roleText}
                            </span>
                            {subMetric && (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="text-muted-foreground"
                                >
                                  ·
                                </span>
                                <span className="text-muted-foreground tabular-nums">
                                  {subMetric}
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-xs sm:text-[13px] font-bold text-foreground leading-snug line-clamp-2 group-hover/slot:text-primary transition-colors">
                            {slotTitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
              onClick={() => onChangeFilter(tab.id)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 ${
                isActive
                  ? "bg-card text-foreground shadow-token-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{isEn ? tab.labelEn : tab.labelFa}</span>
              <span className="tabular-nums text-xs text-muted-foreground">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editorial Media-First Grid */}
      <div
        className="work-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        onScroll={onPortfolioScroll}
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
                  onClick={() => onOpenLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenLightbox(item);
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
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                    <span className="font-medium text-foreground/85">
                      {getPlatformLabel(item.platform)}
                    </span>
                    {item.showcaseRole === "latest" && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-primary">
                          {isEn ? "Latest" : "آخرین آپلود"}
                        </span>
                      </>
                    )}
                    {item.showcaseRole === "most-viewed" && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-foreground">
                          {isEn ? "Most Viewed" : "پربازدیدترین"}
                        </span>
                      </>
                    )}
                    {typeof item.viewCount === "number" &&
                      item.viewCount > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{formatViewCount(item.viewCount, isEn)}</span>
                        </>
                      )}
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
                  onClick={() => onOpenLightbox(item)}
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
  );
}
