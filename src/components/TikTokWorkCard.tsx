import React, { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Shuffle, Heart, Film } from 'lucide-react';
import { TikTokData, TikTokVideo, INITIAL_TIKTOK_DATA, fetchLiveTikTokData } from '../data/tiktok';
import { trackContactClick, trackWorkPreview } from '../utils/analytics';

interface TikTokWorkCardProps {
  key?: React.Key;
  isEn: boolean;
  onOpenLightbox?: (video: TikTokVideo, triggerEl: HTMLButtonElement | null) => void;
}

export const TikTokWorkCard: React.FC<TikTokWorkCardProps> = ({ isEn, onOpenLightbox }) => {
  const [data, setData] = useState<TikTokData>(INITIAL_TIKTOK_DATA);
  const [currentVideo, setCurrentVideo] = useState<TikTokVideo | null>(() => {
    const list = INITIAL_TIKTOK_DATA.videos || [];
    if (list.length > 0) {
      const randIdx = Math.floor(Math.random() * list.length);
      return list[randIdx];
    }
    return null;
  });
  const [isShuffling, setIsShuffling] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Background live revalidation (fetch newest stats and videos list)
  useEffect(() => {
    let isMounted = true;
    fetchLiveTikTokData().then((live) => {
      if (isMounted && live) {
        setData(live);
        if (live.videos && live.videos.length > 0 && !currentVideo) {
          const randIdx = Math.floor(Math.random() * live.videos.length);
          setCurrentVideo(live.videos[randIdx]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentVideo]);

  const pickRandomVideo = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const list = data.videos || [];
    if (list.length <= 1) return;

    setIsShuffling(true);
    setThumbError(false);

    // Pick a video different from current if possible
    let nextIdx = Math.floor(Math.random() * list.length);
    if (currentVideo && list.length > 1) {
      let attempts = 0;
      while (list[nextIdx].id === currentVideo.id && attempts < 10) {
        nextIdx = Math.floor(Math.random() * list.length);
        attempts++;
      }
    }

    setTimeout(() => {
      setCurrentVideo(list[nextIdx]);
      setIsShuffling(false);
    }, 180);
  };

  const handleOpen = () => {
    if (!currentVideo) return;
    trackWorkPreview(`tiktok-${currentVideo.id}`, 'lightbox');
    if (onOpenLightbox) {
      onOpenLightbox(currentVideo, triggerRef.current);
    } else {
      trackContactClick('tiktok');
      window.open(currentVideo.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDirectLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackContactClick('tiktok');
  };

  if (!currentVideo) {
    return null;
  }

  return (
    <article
      className="work-card rv in work-card-tiktok"
      aria-label={isEn ? `Random TikTok Video: ${currentVideo.title}` : `ویدیوی تصادفی تیک‌تاک: ${currentVideo.title}`}
    >
      <div className="work-media-container tiktok-media-container" style={{ aspectRatio: '9/16' }}>
        {/* Video Thumbnail or Fallback Background */}
        {currentVideo.thumbnailUrl && !thumbError ? (
          <img
            src={currentVideo.thumbnailUrl}
            alt={currentVideo.title}
            className={`work-card-thumb tiktok-thumb-img ${isShuffling ? 'shuffling' : ''}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setThumbError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="tiktok-fallback-bg" aria-hidden="true">
            <div className="tiktok-fallback-inner">
              <Film className="w-12 h-12 text-cyan-400 opacity-30 mb-2" />
              <span className="text-xs text-white/50 font-mono ltr">@{data.username}</span>
            </div>
          </div>
        )}

        {/* Ambient Dark Gradient Layer for Contrast */}
        <div className="work-card-overlay tiktok-dark-overlay" aria-hidden="true" />

        {/* Top Header Badge & Random Shuffle Action */}
        <div className="tiktok-top-bar">
          <div className="tiktok-card-badge">
            <svg
              className="tiktok-icon-svg"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.49V8.71a8.29 8.29 0 0 0 4.91 1.6V6.86a4.83 4.83 0 0 1-1-.17z" />
            </svg>
            <span className="tiktok-badge-text">
              {isEn ? 'RANDOM TIKTOK' : 'ویدیوی تصادفی تیک‌تاک'}
            </span>
          </div>

          <button
            type="button"
            className="tiktok-shuffle-btn"
            onClick={pickRandomVideo}
            aria-label={isEn ? 'Pick another random TikTok video' : 'انتخاب ویدیوی تصادفی دیگر'}
            title={isEn ? 'Shuffle Video' : 'تغییر ویدیوی تصادفی'}
          >
            <Shuffle className={`w-3.5 h-3.5 text-cyan-400 ${isShuffling ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span className="tiktok-shuffle-text">
              {isEn ? 'Shuffle' : 'ویدیوی دیگر'}
            </span>
          </button>
        </div>

        {/* Play Action Trigger in Center */}
        <div className="work-card-actions">
          <button
            ref={triggerRef}
            type="button"
            className="work-card-play-btn tiktok-play-btn"
            onClick={handleOpen}
            aria-label={isEn ? `Play TikTok video: ${currentVideo.title}` : `پخش ویدیوی تیک‌تاک: ${currentVideo.title}`}
          >
            <Play className="w-5 h-5 fill-current text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Card Info & Quick Actions */}
        <div className="work-card-meta tiktok-video-meta">
          <span className="work-card-spec">
            <Heart className="w-3 h-3 text-rose-500 shrink-0 inline-block" aria-hidden="true" />
            <span>
              {isEn
                ? `TikTok • @${data.username} • ${data.stats.formattedLikes} Likes`
                : `تیک‌تاک • @${data.username} • ${data.stats.formattedLikes} لایک`}
            </span>
          </span>

          <h3 className="work-card-title line-clamp-2" title={currentVideo.title}>
            {currentVideo.title || (isEn ? 'TikTok Music Reel' : 'ریلز موزیک تیک‌تاک')}
          </h3>

          <div className="tiktok-card-links">
            <button
              type="button"
              className="yt-preview-btn tiktok-preview-btn"
              onClick={handleOpen}
            >
              {isEn ? 'Preview' : 'پیش‌نمایش'}
            </button>
            <a
              href={currentVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-watch-btn tiktok-watch-btn"
              onClick={handleDirectLink}
            >
              <span>{isEn ? 'TikTok' : 'تیک‌تاک'}</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TikTokWorkCard;
