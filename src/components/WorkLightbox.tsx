import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Film,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  PenLine,
  Loader2,
} from 'lucide-react';
import { WorkItem, formatViewCount } from '../data/works';

export interface WorkLightboxProps {
  activeItem: WorkItem | null;
  items?: WorkItem[];
  isEn: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  lightboxModalRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onSelectItem?: (item: WorkItem) => void;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'iframe',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const WorkLightbox: React.FC<WorkLightboxProps> = ({
  activeItem,
  items = [],
  isEn,
  closeBtnRef,
  lightboxModalRef,
  onClose,
  onSelectItem,
}) => {
  const [preferEmbed, setPreferEmbed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const currentIndex = activeItem
    ? items.findIndex((entry) => entry.id === activeItem.id)
    : -1;
  const hasGallery = items.length > 1 && currentIndex !== -1 && Boolean(onSelectItem);

  const goToRelative = (delta: -1 | 1) => {
    if (!hasGallery || !onSelectItem) return;
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    onSelectItem(items[nextIndex]);
  };

  useEffect(() => {
    setPreferEmbed(false);
    setVideoFailed(false);
    setIsVideoLoading(Boolean(activeItem?.videoSrc));
  }, [activeItem?.id, activeItem?.videoSrc]);

  // Capture triggering element on mount and restore focus on unmount
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    return () => {
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function' &&
        document.contains(previousFocusRef.current)
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [closeBtnRef]);

  // Lock body scroll while lightbox is mounted
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keyboard handlers: Escape, Focus Trap (Tab / Shift+Tab), and ArrowLeft/ArrowRight navigation
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && lightboxModalRef.current) {
        const focusables = Array.from(
          lightboxModalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter(
          (el) =>
            !el.hasAttribute('disabled') &&
            el.offsetParent !== null
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!activeEl || activeEl === first || !lightboxModalRef.current.contains(activeEl)) {
            e.preventDefault();
            last.focus();
          }
        } else if (!activeEl || activeEl === last || !lightboxModalRef.current.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      if (hasGallery && onSelectItem && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === 'VIDEO') return;
        e.preventDefault();
        const delta: -1 | 1 = isEn
          ? e.key === 'ArrowRight'
            ? 1
            : -1
          : e.key === 'ArrowLeft'
            ? 1
            : -1;
        const nextIndex = (currentIndex + delta + items.length) % items.length;
        onSelectItem(items[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, hasGallery, isEn, currentIndex, items, onClose, onSelectItem, lightboxModalRef]);

  if (!activeItem) return null;

  const hasLocalVideo = Boolean(activeItem.videoSrc) && !videoFailed;
  const showLocalVideo = hasLocalVideo && !preferEmbed;
  const platformName =
    activeItem.platform === 'instagram'
      ? 'Instagram'
      : activeItem.platform === 'youtube'
        ? 'YouTube'
        : 'TikTok';

  const roleLabel =
    activeItem.showcaseRole === 'latest'
      ? isEn
        ? 'Latest Upload'
        : 'آخرین آپلود'
      : activeItem.showcaseRole === 'most-viewed'
        ? isEn
          ? 'Most Viewed'
          : 'پربازدیدترین'
        : '';

  const itemTitle = isEn ? activeItem.labelEn : activeItem.labelFa;
  const orderSimilarHref = `./order.html?style=${encodeURIComponent(itemTitle)}`;

  const PrevIcon = isEn ? ChevronLeft : ChevronRight;
  const NextIcon = isEn ? ChevronRight : ChevronLeft;

  return (
    <div
      ref={lightboxModalRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={itemTitle}
      onClick={onClose}
    >
      {/* Top Bar: Title + Position + Prev/Next + Close */}
      <div
        className="w-full max-w-[440px] flex items-center justify-between gap-3 mb-3"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-400 truncate tabular-nums">
            {platformName}
            {roleLabel ? ` · ${roleLabel}` : ''}
            {typeof activeItem.viewCount === 'number' && activeItem.viewCount > 0
              ? ` · ${formatViewCount(activeItem.viewCount, isEn)}`
              : ''}
            {hasLocalVideo
              ? isEn
                ? ' · Direct Master'
                : ' · پخش مستقیم بدون VPN'
              : ''}
            {hasGallery ? ` · ${currentIndex + 1}/${items.length}` : ''}
          </p>
          <h3 className="text-sm sm:text-base font-bold text-white truncate">
            {itemTitle}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {hasGallery && (
            <>
              <button
                type="button"
                onClick={() => goToRelative(-1)}
                className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors active:scale-95"
                aria-label={isEn ? 'Previous work' : 'نمونه‌کار قبلی'}
              >
                <PrevIcon className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goToRelative(1)}
                className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors active:scale-95"
                aria-label={isEn ? 'Next work' : 'نمونه‌کار بعدی'}
              >
                <NextIcon className="size-5" aria-hidden="true" />
              </button>
            </>
          )}

          <button
            ref={closeBtnRef}
            type="button"
            className="size-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors active:scale-95"
            onClick={onClose}
            aria-label={isEn ? 'Close preview' : 'بستن پیش‌نمایش'}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Cinema 9:16 Stage */}
      <div
        className="relative h-[min(68vh,600px)] max-w-full aspect-[9/16] rounded-2xl border border-white/15 overflow-hidden bg-black shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {showLocalVideo ? (
          <>
            <video
              key={activeItem.videoSrc}
              src={activeItem.videoSrc}
              poster={activeItem.primarySrc}
              controls
              playsInline
              autoPlay
              preload="metadata"
              onLoadStart={() => setIsVideoLoading(true)}
              onWaiting={() => setIsVideoLoading(true)}
              onCanPlay={() => setIsVideoLoading(false)}
              onPlaying={() => setIsVideoLoading(false)}
              onError={() => {
                setIsVideoLoading(false);
                setVideoFailed(true);
              }}
              className="size-full object-contain bg-black block"
            />
            {isVideoLoading && (
              <div
                aria-live="polite"
                className="pointer-events-none absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-md"
              >
                <Loader2 className="size-3.5 animate-spin text-primary" aria-hidden="true" />
                <span>{isEn ? 'Loading video…' : 'در حال بارگذاری…'}</span>
              </div>
            )}
          </>
        ) : activeItem.isInstagram ? (
          <iframe
            src={
              activeItem.instagramEmbedUrl ||
              `https://www.instagram.com/reel/${activeItem.instagramId}/embed/`
            }
            title={itemTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0 block"
          />
        ) : activeItem.isTikTok ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${activeItem.tiktokId}`}
            title={itemTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0 block"
          />
        ) : activeItem.isYouTube ? (
          <iframe
            src={`${
              activeItem.youtubeEmbedUrl ||
              `https://www.youtube-nocookie.com/embed/${activeItem.youtubeId}`
            }?autoplay=1&rel=0&modestbranding=1`}
            title={itemTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0 block"
          />
        ) : (
          <img
            src={activeItem.primarySrc}
            alt={itemTitle}
            referrerPolicy="no-referrer"
            className="size-full object-contain bg-black block"
          />
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-2.5 max-w-[460px]"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <a
          href={orderSimilarHref}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-semibold inline-flex items-center gap-2 transition-opacity active:scale-95 whitespace-nowrap"
        >
          <PenLine className="size-3.5" aria-hidden="true" />
          <span>{isEn ? 'Order Similar Style' : 'سفارش با این سبک'}</span>
        </a>

        {activeItem.isInstagram && Boolean(activeItem.videoSrc) && !videoFailed && (
          <button
            type="button"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium inline-flex items-center gap-2 transition-colors active:scale-95 whitespace-nowrap"
            onClick={() => setPreferEmbed(!preferEmbed)}
          >
            <Film className="size-4 text-zinc-300" aria-hidden="true" />
            <span>
              {preferEmbed
                ? isEn
                  ? 'Local Direct Player'
                  : 'پخش مستقیم محلی'
                : isEn
                  ? 'Official Embed'
                  : 'امبد اینستاگرام'}
            </span>
          </button>
        )}

        {(activeItem.externalUrl ||
          activeItem.instagramUrl ||
          activeItem.tiktokUrl ||
          activeItem.youtubeUrl) && (
          <a
            href={
              activeItem.externalUrl ||
              activeItem.instagramUrl ||
              activeItem.tiktokUrl ||
              activeItem.youtubeUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold inline-flex items-center gap-2 transition-colors active:scale-95 whitespace-nowrap"
          >
            <span>
              {isEn ? `Open on ${platformName}` : `مشاهده در ${platformName}`}
            </span>
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

export default WorkLightbox;
