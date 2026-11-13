import React, { useState, useEffect } from 'react';
import { X, Film, ExternalLink } from 'lucide-react';
import { WorkItem } from '../data/works';

export interface WorkLightboxProps {
  activeItem: WorkItem | null;
  isEn: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  lightboxModalRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const WorkLightbox: React.FC<WorkLightboxProps> = ({
  activeItem,
  isEn,
  closeBtnRef,
  lightboxModalRef,
  onClose,
}) => {
  const [preferEmbed, setPreferEmbed] = useState(false);

  useEffect(() => {
    setPreferEmbed(false);
  }, [activeItem?.id]);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, onClose]);

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeItem]);

  useEffect(() => {
    if (activeItem && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [activeItem, closeBtnRef]);

  if (!activeItem) return null;

  const hasLocalVideo = Boolean(activeItem.videoSrc);
  const showLocalVideo = hasLocalVideo && !preferEmbed;
  const platformName =
    activeItem.platform === 'instagram'
      ? 'Instagram'
      : activeItem.platform === 'youtube'
        ? 'YouTube'
        : 'TikTok';

  return (
    <div
      ref={lightboxModalRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? activeItem.labelEn : activeItem.labelFa}
      onClick={onClose}
    >
      {/* Top Bar: Title + Close */}
      <div
        className="w-full max-w-[420px] flex items-center justify-between gap-4 mb-3"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="text-xs text-zinc-400 truncate">
            {platformName}
            {hasLocalVideo
              ? isEn
                ? ' · Direct Master'
                : ' · پخش مستقیم بدون VPN'
              : ''}
          </p>
          <h3 className="text-sm sm:text-base font-bold text-white truncate">
            {isEn ? activeItem.labelEn : activeItem.labelFa}
          </h3>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          className="size-11 min-h-[44px] min-w-[44px] shrink-0 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors active:scale-95"
          onClick={onClose}
          aria-label={isEn ? 'Close preview' : 'بستن پیش‌نمایش'}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Cinema 9:16 Stage */}
      <div
        className="relative h-[min(70vh,620px)] max-w-full aspect-[9/16] rounded-2xl border border-white/15 overflow-hidden bg-black shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {showLocalVideo ? (
          <video
            key={activeItem.videoSrc}
            src={activeItem.videoSrc}
            poster={activeItem.primarySrc}
            controls
            playsInline
            autoPlay
            className="size-full object-contain bg-black block"
          />
        ) : activeItem.isInstagram ? (
          <iframe
            src={
              activeItem.instagramEmbedUrl ||
              `https://www.instagram.com/reel/${activeItem.instagramId}/embed/`
            }
            title={isEn ? activeItem.labelEn : activeItem.labelFa}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0 block"
          />
        ) : activeItem.isTikTok ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${activeItem.tiktokId}`}
            title={isEn ? activeItem.labelEn : activeItem.labelFa}
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
            title={isEn ? activeItem.labelEn : activeItem.labelFa}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0 block"
          />
        ) : (
          <img
            src={activeItem.primarySrc}
            alt={isEn ? activeItem.labelEn : activeItem.labelFa}
            referrerPolicy="no-referrer"
            className="size-full object-contain bg-black block"
          />
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-2.5"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {activeItem.isInstagram && hasLocalVideo && (
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
            className="min-h-[44px] px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold inline-flex items-center gap-2 transition-colors active:scale-95 whitespace-nowrap"
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
