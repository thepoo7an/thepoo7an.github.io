import React, { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Shuffle, Film } from 'lucide-react';
import { InstagramData, InstagramReel, INITIAL_INSTAGRAM_DATA, fetchLiveInstagramData } from '../data/instagram';
import { trackContactClick, trackWorkPreview } from '../utils/analytics';

const InstagramIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface InstagramWorkCardProps {
  key?: React.Key;
  isEn: boolean;
  onOpenLightbox?: (reel: InstagramReel, triggerEl: HTMLButtonElement | null) => void;
}

export const InstagramWorkCard: React.FC<InstagramWorkCardProps> = ({ isEn, onOpenLightbox }) => {
  const [data, setData] = useState<InstagramData>(INITIAL_INSTAGRAM_DATA);
  const [currentReel, setCurrentReel] = useState<InstagramReel | null>(() => {
    const list = INITIAL_INSTAGRAM_DATA.reels || [];
    if (list.length > 0) {
      const randIdx = Math.floor(Math.random() * list.length);
      return list[randIdx];
    }
    return null;
  });
  const [isShuffling, setIsShuffling] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Background live revalidation (fetch newest stats and reels list if updated on server)
  useEffect(() => {
    let isMounted = true;
    fetchLiveInstagramData().then((live) => {
      if (isMounted && live) {
        setData(live);
        if (live.reels && live.reels.length > 0 && !currentReel) {
          const randIdx = Math.floor(Math.random() * live.reels.length);
          setCurrentReel(live.reels[randIdx]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentReel]);

  const pickRandomReel = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const list = data.reels || [];
    if (list.length <= 1) return;

    setIsShuffling(true);
    setThumbError(false);

    // Pick a reel different from current if possible
    let nextIdx = Math.floor(Math.random() * list.length);
    if (currentReel && list.length > 1) {
      let attempts = 0;
      while (list[nextIdx].id === currentReel.id && attempts < 10) {
        nextIdx = Math.floor(Math.random() * list.length);
        attempts++;
      }
    }

    setTimeout(() => {
      setCurrentReel(list[nextIdx]);
      setIsShuffling(false);
    }, 180);
  };

  const handleOpen = () => {
    if (!currentReel) return;
    trackWorkPreview(`instagram-${currentReel.id}`, 'lightbox');
    if (onOpenLightbox) {
      onOpenLightbox(currentReel, triggerRef.current);
    } else {
      trackContactClick('instagram');
      window.open(currentReel.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDirectLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackContactClick('instagram');
  };

  if (!currentReel) {
    return null;
  }

  const reelTitle = isEn ? currentReel.titleEn || currentReel.title : currentReel.title;

  return (
    <article
      className="work-card rv in work-card-instagram"
      aria-label={isEn ? `Random Instagram Reel: ${reelTitle}` : `ریلز تصادفی اینستاگرام: ${reelTitle}`}
    >
      <div className="work-media-container instagram-media-container" style={{ aspectRatio: '9/16' }}>
        {/* Video Thumbnail with WebP & Fallback support */}
        {currentReel.thumbnailUrl && !thumbError ? (
          <picture className="w-full h-full">
            {currentReel.thumbnailUrl.endsWith('.webp') && (
              <source srcSet={currentReel.thumbnailUrl} type="image/webp" />
            )}
            {currentReel.fallbackThumbnailUrl && (
              <source srcSet={currentReel.fallbackThumbnailUrl} type="image/jpeg" />
            )}
            <img
              src={currentReel.thumbnailUrl}
              alt={reelTitle}
              className={`work-card-thumb instagram-thumb-img ${isShuffling ? 'shuffling' : ''}`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => {
                // If local path fails, try CDN fallback or fallback bg
                if (currentReel.cdnThumbnailUrl && !currentReel.thumbnailUrl.startsWith('http')) {
                  setCurrentReel({
                    ...currentReel,
                    thumbnailUrl: currentReel.cdnThumbnailUrl,
                  });
                } else {
                  setThumbError(true);
                }
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </picture>
        ) : (
          <div className="instagram-fallback-bg" aria-hidden="true">
            <div className="instagram-fallback-inner">
              <Film className="w-12 h-12 text-rose-400 opacity-40 mb-2" />
              <span className="text-xs text-white/50 font-mono ltr">@{data.username}</span>
            </div>
          </div>
        )}

        {/* Ambient Dark Gradient Layer for Contrast */}
        <div className="work-card-overlay instagram-dark-overlay" aria-hidden="true" />

        {/* Top Header Badge & Random Shuffle Action */}
        <div className="instagram-top-bar">
          <div className="instagram-card-badge">
            <InstagramIcon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="instagram-badge-text">
              {isEn ? 'RANDOM REELS' : 'ریلز تصادفی اینستاگرام'}
            </span>
          </div>

          <button
            type="button"
            className="instagram-shuffle-btn"
            onClick={pickRandomReel}
            aria-label={isEn ? 'Pick another random Instagram reel' : 'انتخاب ریلز تصادفی دیگر'}
            title={isEn ? 'Shuffle Reel' : 'تغییر ریلز تصادفی'}
          >
            <Shuffle className={`w-3.5 h-3.5 text-rose-400 ${isShuffling ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span className="instagram-shuffle-text">
              {isEn ? 'Shuffle' : 'ریلز دیگر'}
            </span>
          </button>
        </div>

        {/* Play Action Trigger in Center */}
        <div className="work-card-actions">
          <button
            ref={triggerRef}
            type="button"
            className="work-card-play-btn instagram-play-btn"
            onClick={handleOpen}
            aria-label={isEn ? `Play Instagram reel: ${reelTitle}` : `پخش ریلز اینستاگرام: ${reelTitle}`}
          >
            <Play className="w-5 h-5 fill-current text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Card Info & Quick Actions */}
        <div className="work-card-meta instagram-video-meta">
          <span className="work-card-spec">
            <InstagramIcon className="w-3 h-3 text-rose-400 shrink-0 inline-block" />
            <span>
              {isEn
                ? `Instagram • @${data.username} • Music Reel`
                : `اینستاگرام • @${data.username} • ریلز موزیک`}
            </span>
          </span>

          <h3 className="work-card-title line-clamp-2" title={reelTitle}>
            {reelTitle || (isEn ? 'Instagram Music Reel' : 'ریلز موزیک اینستاگرام')}
          </h3>

          <div className="instagram-card-links">
            <button
              type="button"
              className="yt-preview-btn instagram-preview-btn"
              onClick={handleOpen}
            >
              {isEn ? 'Preview' : 'پیش‌نمایش'}
            </button>
            <a
              href={currentReel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-watch-btn instagram-watch-btn"
              onClick={handleDirectLink}
            >
              <span>{isEn ? 'Instagram' : 'اینستاگرام'}</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InstagramWorkCard;
