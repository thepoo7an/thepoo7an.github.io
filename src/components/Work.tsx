import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Smartphone, ShieldCheck } from 'lucide-react';
import { trackWorkPreview, trackSafeZoneToggled } from '../utils/analytics';
import { WorkItem, WORK_ITEMS } from '../data/works';
import { InstagramSafeZoneOverlay } from './InstagramSafeZoneOverlay';
import { YouTubeWorkCard } from './YouTubeWorkCard';
import { YouTubeVideoData } from '../data/youtube';
import { TikTokWorkCard } from './TikTokWorkCard';
import { TikTokVideo } from '../data/tiktok';

interface WorkCardProps {
  key?: React.Key;
  item: WorkItem;
  idx: number;
  isEn: boolean;
  onOpenLightbox: (item: WorkItem, triggerEl: HTMLButtonElement | null) => void;
}

function WorkCard({ item, idx, isEn, onOpenLightbox }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoSource, setVideoSource] = useState(item.videoSrc);
  const [videoAttempt, setVideoAttempt] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  const isCover = item.category === 'cover' || !item.videoSrc;

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasInteractionIntent, setHasInteractionIntent] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const shouldLoadVideo = !videoFailed && Boolean(videoSource) && (isPlaying || hasInteractionIntent || isNearViewport);

  const handlePlay = useCallback(() => {
    setHasInteractionIntent(true);
    if (!videoRef.current || videoFailed) return;
    videoRef.current.muted = isMuted;
    const promise = videoRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          trackWorkPreview(item.id, 'play');
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isMuted, videoFailed, item.id]);

  const handlePause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
    setProgress(0);
    try {
      videoRef.current.currentTime = 0;
    } catch {
      // Ignore if element is not loaded
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleVideoError = () => {
    const fallbacks = item.videoFallbacks || [];
    if (videoAttempt < fallbacks.length) {
      setVideoSource(fallbacks[videoAttempt]);
      setVideoAttempt((prev) => prev + 1);
    } else {
      setVideoFailed(true);
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    setHasInteractionIntent(true);
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      handlePlay();
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      handlePause();
    }
  };

  return (
    <div ref={cardRef} className={`work-card rv ${idx === 0 ? '' : `d${idx}`}`}>
      {/* Shot.so-inspired Realistic Smartphone Showcase Chassis */}
      <div className="shot-phone-chassis">
        {/* Dynamic Island Notch (Shot.so inspired) */}
        <div className="phone-dynamic-island" aria-hidden="true">
          <span className="island-lens"></span>
          <span className="island-sensor"></span>
        </div>

        <div className={`work-frame ${isCover ? 'square-frame' : ''}`}>
          {/* Cover Art / Video Category Tag Badge */}
          <span className="work-cat-badge">
            {isEn ? (isCover ? 'Cover Art' : 'Lyric Video') : (isCover ? 'کاور آرت' : 'لیریک ویدیو')}
          </span>

          {/* Media: Video or Static Poster */}
          {shouldLoadVideo ? (
            <video
              ref={videoRef}
              src={videoSource}
              poster={item.primarySrc}
              playsInline
              loop
              muted={isMuted}
              preload="none"
              className="work-video"
              onTimeUpdate={handleTimeUpdate}
              onError={handleVideoError}
            />
          ) : (
            <img
              src={item.primarySrc}
              alt={isEn ? item.labelEn : item.labelFa}
              width={isCover ? 600 : 360}
              height={isCover ? 600 : 640}
              loading="lazy"
              decoding="async"
              className="work-img"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                const currentAttempt = parseInt(target.dataset.attempt || '0', 10);
                if (currentAttempt < item.fallbacks.length) {
                  target.dataset.attempt = String(currentAttempt + 1);
                  target.src = item.fallbacks[currentAttempt];
                }
              }}
            />
          )}

          {/* Physical Glass Glare Reflection (Shot.so inspired) */}
          <div className="phone-glass-glare" aria-hidden="true"></div>

          {/* Semantic Non-Nested Primary Action Trigger */}
          <button
            ref={triggerRef}
            type="button"
            className="work-play-trigger"
            aria-pressed={isPlaying}
            aria-label={
              isEn
                ? `${item.labelEn} - ${isCover ? 'Tap to view cover artwork' : (isPlaying ? 'Pause video' : 'Hover or tap to play')}`
                : `${item.labelFa} - ${isCover ? 'مشاهده تصویر کاور' : (isPlaying ? 'توقف پخش' : 'هاور یا لمس برای پخش ویدیو')}`
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (isCover) {
                onOpenLightbox(item, triggerRef.current);
              } else if (isPlaying) {
                handlePause();
              } else {
                handlePlay();
              }
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isCover) {
                  onOpenLightbox(item, triggerRef.current);
                } else if (isPlaying) {
                  handlePause();
                } else {
                  handlePlay();
                }
              }
            }}
          />

          {/* Technical HUD Corners */}
          <div className="hud-corners" aria-hidden="true">
            <span className="corner top-left">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 8V1h7" />
              </svg>
            </span>
            <span className="corner top-right">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 8V1h7" />
              </svg>
            </span>
            <span className="corner bottom-left">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 8V1h7" />
              </svg>
            </span>
            <span className="corner bottom-right">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 8V1h7" />
              </svg>
            </span>
          </div>

          {/* Hover / Tap to Play Badge */}
          <div
            className={`work-play-badge ${isPlaying ? 'playing' : ''}`}
            aria-hidden="true"
          >
            {isCover ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>{isEn ? 'View Cover Artwork' : 'مشاهده کاور آرت'}</span>
              </>
            ) : (
              <>
                <div className="badge-orbit" aria-hidden="true">
                  <span className="radar-circle"></span>
                  <span className="radar-orbit"></span>
                  <span className="radar-dot"></span>
                </div>
                <Play className="w-3 h-3 fill-current" />
                <span>{isEn ? 'Tap or hover to play' : 'لمس یا هاور برای پخش'}</span>
              </>
            )}
          </div>

          {/* Live Playback Technical HUD Indicator & Sound Equalizer (Dark.design inspired) */}
          {isPlaying && (
            <div className="work-live-hud" aria-hidden="true">
              <div className="hud-radar">
                <span className="hud-dot"></span>
                <span className="hud-pulse"></span>
                <span className="hud-orbit"></span>
              </div>
              <span className="hud-label">LIVE • 30FPS</span>
              <div className="work-eq-visualizer">
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
                <span className="eq-bar bar-4"></span>
              </div>
            </div>
          )}

          {/* Sound toggle button (Sibling button, no nesting violation) */}
          {isPlaying && (
            <button
              type="button"
              className="work-audio-btn"
              onClick={toggleMute}
              aria-label={
                isEn
                  ? isMuted
                    ? 'Unmute sound'
                    : 'Mute sound'
                  : isMuted
                    ? 'وصل کردن صدا'
                    : 'قطع کردن صدا'
              }
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Progress bar */}
          {isPlaying && (
            <div className="work-progress-track" aria-hidden="true">
              <div
                className="work-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Expand / Lightbox Button (Sibling button, no nesting violation) */}
          <button
            type="button"
            className="work-zoom-btn"
            aria-label={isEn ? `Expand ${item.labelEn}` : `بزرگ‌نمایی ${item.labelFa}`}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onOpenLightbox(item, triggerRef.current);
            }}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Phone Home Indicator Bar (Shot.so inspired) */}
        <div className="phone-home-indicator" aria-hidden="true">
          <span className="home-bar"></span>
        </div>
      </div>

      <div className="work-meta">
        <div className="work-meta-row">
          <span className="work-label">
            {isEn ? item.labelEn : item.labelFa}
          </span>
          <span className="work-spec-pill">
            {item.specFa && item.specEn ? (isEn ? item.specEn : item.specFa) : (isCover ? '1:1 COVER' : '9:16 REELS')}
          </span>
        </div>
      </div>
    </div>
  );
}

export const Work: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'reels' | 'cover'>('all');
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const lightboxModalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [lightboxPlaying, setLightboxPlaying] = useState(false);
  const [lightboxMuted, setLightboxMuted] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(false);

  const handleOpenYouTubeLightbox = (ytData: YouTubeVideoData, triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setActiveItem({
      id: `youtube-${ytData.videoId}`,
      category: 'reels',
      primarySrc: ytData.maxresThumbnailUrl || ytData.thumbnailUrl,
      fallbacks: [ytData.thumbnailUrl],
      labelFa: ytData.title,
      labelEn: ytData.title,
      specFa: 'یوتیوب شورتز • @thepoo7an',
      specEn: 'YouTube Shorts • @thepoo7an',
      isYouTube: true,
      youtubeId: ytData.videoId,
      youtubeUrl: ytData.url,
      youtubeEmbedUrl: ytData.embedUrl,
    });
    setLightboxPlaying(true);
    setShowSafeZone(false);
  };

  const handleOpenTikTokLightbox = (ttData: TikTokVideo, triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setActiveItem({
      id: `tiktok-${ttData.id}`,
      category: 'reels',
      primarySrc: ttData.thumbnailUrl || '',
      fallbacks: [],
      labelFa: ttData.title || 'ویدیوی تیک‌تاک',
      labelEn: ttData.title || 'TikTok Video',
      specFa: 'تیک‌تاک • @thepoo7an',
      specEn: 'TikTok • @thepoo7an',
      isTikTok: true,
      tiktokId: ttData.id,
      tiktokUrl: ttData.url,
    });
    setLightboxPlaying(true);
    setShowSafeZone(false);
  };

  const displayedItems = activeCategory === 'all'
    ? WORK_ITEMS
    : WORK_ITEMS.filter((it) => it.category === activeCategory);

  const closeModal = useCallback(() => {
    setActiveItem(null);
    setLightboxPlaying(false);
    setShowSafeZone(false);
    // Return focus to the originating card trigger button
    if (lastActiveTriggerRef.current) {
      lastActiveTriggerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    // Focus close button on modal open
    const initialFocusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      // Trap Tab focus inside modal
      if (e.key === 'Tab' && lightboxModalRef.current) {
        const focusable = lightboxModalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(initialFocusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, closeModal]);

  // Attempt reliable muted autoplay when lightbox opens
  useEffect(() => {
    if (!activeItem || !activeItem.videoSrc) return;
    const video = lightboxVideoRef.current;
    if (!video) return;

    video.muted = true;
    setLightboxMuted(true);
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setLightboxPlaying(true);
        })
        .catch(() => {
          setLightboxPlaying(false);
        });
    }
  }, [activeItem]);

  const toggleLightboxPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxVideoRef.current) return;
    if (lightboxPlaying) {
      lightboxVideoRef.current.pause();
      setLightboxPlaying(false);
    } else {
      lightboxVideoRef.current
        .play()
        .then(() => setLightboxPlaying(true))
        .catch(() => setLightboxPlaying(false));
    }
  };

  const toggleLightboxMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxVideoRef.current) return;
    const next = !lightboxMuted;
    lightboxVideoRef.current.muted = next;
    setLightboxMuted(next);
  };

  const toggleSafeZone = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !showSafeZone;
    setShowSafeZone(next);
    trackSafeZoneToggled(next, activeItem?.id);
  };

  const totalCount = WORK_ITEMS.length + 2; // includes YouTube and TikTok
  const reelsCount = WORK_ITEMS.filter((it) => it.category === 'reels').length + 2;
  const coverCount = WORK_ITEMS.filter((it) => it.category === 'cover').length;

  return (
    <section className="work-sec" id="work" aria-label={isEn ? 'Selected output' : 'نمونه خروجی'}>
      <div className="work-header">
        <h2 className="rv">
          {isEn ? 'Selected output' : 'نمونه خروجی'}
        </h2>
        {coverCount > 0 && (
          <div className="work-cat-tabs rv d1" role="tablist" aria-label={isEn ? "Filter work samples" : "فیلتر دسته‌بندی نمونه‌کارها"}>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`work-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {isEn ? `All Works (${totalCount})` : `همه نمونه‌ها (${totalCount})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'reels'}
              className={`work-cat-btn ${activeCategory === 'reels' ? 'active' : ''}`}
              onClick={() => setActiveCategory('reels')}
            >
              {isEn ? `Reels & Kinetic (${reelsCount})` : `تایپوگرافی و ریلز (${reelsCount})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'cover'}
              className={`work-cat-btn ${activeCategory === 'cover' ? 'active' : ''}`}
              onClick={() => setActiveCategory('cover')}
            >
              {isEn ? `Cover Art (${coverCount})` : `کاور موزیک (${coverCount})`}
            </button>
          </div>
        )}
      </div>

      <div className="work-grid">
        {/* First Work Sample */}
        {displayedItems.length > 0 && (
          <WorkCard
            key={displayedItems[0].id}
            item={displayedItems[0]}
            idx={0}
            isEn={isEn}
            onOpenLightbox={(selected, triggerEl) => {
              lastActiveTriggerRef.current = triggerEl;
              setActiveItem(selected);
              setLightboxPlaying(true);
              setLightboxMuted(true);
              trackWorkPreview(selected.id, 'lightbox');
            }}
          />
        )}

        {/* Latest YouTube Release (Positioned directly alongside first sample) */}
        {(activeCategory === 'all' || activeCategory === 'reels') && (
          <YouTubeWorkCard
            key="youtube-latest-card"
            isEn={isEn}
            onOpenLightbox={handleOpenYouTubeLightbox}
          />
        )}

        {/* Second Work Sample */}
        {displayedItems.length > 1 && (
          <WorkCard
            key={displayedItems[1].id}
            item={displayedItems[1]}
            idx={2}
            isEn={isEn}
            onOpenLightbox={(selected, triggerEl) => {
              lastActiveTriggerRef.current = triggerEl;
              setActiveItem(selected);
              setLightboxPlaying(true);
              setLightboxMuted(true);
              trackWorkPreview(selected.id, 'lightbox');
            }}
          />
        )}

        {/* TikTok Channel Showcase (Positioned alongside second sample) */}
        {(activeCategory === 'all' || activeCategory === 'reels') && (
          <TikTokWorkCard
            key="tiktok-showcase-card"
            isEn={isEn}
            onOpenLightbox={handleOpenTikTokLightbox}
          />
        )}

        {/* Remaining Work Samples */}
        {displayedItems.slice(2).map((item, idx) => (
          <WorkCard
            key={item.id}
            item={item}
            idx={idx + 4}
            isEn={isEn}
            onOpenLightbox={(selected, triggerEl) => {
              lastActiveTriggerRef.current = triggerEl;
              setActiveItem(selected);
              setLightboxPlaying(true);
              setLightboxMuted(true);
              trackWorkPreview(selected.id, 'lightbox');
            }}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          ref={lightboxModalRef}
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? activeItem.labelEn : activeItem.labelFa}
          onClick={closeModal}
        >
          <button
            ref={closeBtnRef}
            type="button"
            className="work-lightbox-close"
            onClick={closeModal}
            aria-label={isEn ? 'Close preview' : 'بستن پیش‌نمایش'}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="work-lightbox-content"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className={`work-lightbox-frame ${activeItem.category === 'cover' ? 'square-frame' : ''}`}>
              {activeItem.isTikTok ? (
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${activeItem.tiktokId}`}
                  title={isEn ? activeItem.labelEn : activeItem.labelFa}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="work-lightbox-video"
                  style={{ border: 0, width: '100%', height: '100%' }}
                />
              ) : activeItem.isYouTube ? (
                <iframe
                  src={`${activeItem.youtubeEmbedUrl || `https://www.youtube-nocookie.com/embed/${activeItem.youtubeId}`}?autoplay=1&rel=0&modestbranding=1`}
                  title={isEn ? activeItem.labelEn : activeItem.labelFa}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="work-lightbox-video"
                  style={{ border: 0, width: '100%', height: '100%' }}
                />
              ) : activeItem.videoSrc ? (
                <video
                  ref={lightboxVideoRef}
                  src={activeItem.videoSrc}
                  poster={activeItem.primarySrc}
                  playsInline
                  autoPlay
                  loop
                  muted={lightboxMuted}
                  onPlay={() => setLightboxPlaying(true)}
                  onPause={() => setLightboxPlaying(false)}
                  className="work-lightbox-video"
                  onClick={toggleLightboxPlay}
                />
              ) : (
                <img
                  src={activeItem.primarySrc}
                  alt={isEn ? activeItem.labelEn : activeItem.labelFa}
                  width={activeItem.category === 'cover' ? 800 : 360}
                  height={activeItem.category === 'cover' ? 800 : 640}
                  className="work-lightbox-img"
                />
              )}

              {/* Instagram Reels Safe Zone Overlay */}
              {showSafeZone && activeItem.category !== 'cover' && !activeItem.isYouTube && (
                <InstagramSafeZoneOverlay />
              )}
            </div>

            {/* Lightbox Control Bar */}
            {activeItem.isTikTok ? (
              <div className="work-lightbox-bar">
                <a
                  href={activeItem.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-lightbox-btn tiktok-direct-lightbox-btn"
                  title={isEn ? 'Watch on TikTok' : 'مشاهده در تیک‌تاک'}
                  aria-label={isEn ? 'Watch on TikTok' : 'مشاهده در تیک‌تاک'}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.49V8.71a8.29 8.29 0 0 0 4.91 1.6V6.86a4.83 4.83 0 0 1-1-.17z" />
                  </svg>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>
                    {isEn ? 'Watch on TikTok' : 'مشاهده در تیک‌تاک'}
                  </span>
                </a>
              </div>
            ) : activeItem.isYouTube ? (
              <div className="work-lightbox-bar">
                <a
                  href={activeItem.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-lightbox-btn yt-direct-lightbox-btn"
                  title={isEn ? 'Watch on YouTube' : 'مشاهده مستقیم در یوتیوب'}
                  aria-label={isEn ? 'Watch on YouTube' : 'مشاهده مستقیم در یوتیوب'}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>
                    {isEn ? 'Watch on YouTube Shorts' : 'مشاهده در یوتیوب شورتز'}
                  </span>
                </a>
              </div>
            ) : activeItem.videoSrc ? (
              <div className="work-lightbox-bar">
                <button
                  type="button"
                  className="work-lightbox-btn"
                  onClick={toggleLightboxPlay}
                  aria-label={isEn ? (lightboxPlaying ? 'Pause' : 'Play') : (lightboxPlaying ? 'توقف' : 'پخش')}
                >
                  {lightboxPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <button
                  type="button"
                  className="work-lightbox-btn"
                  onClick={toggleLightboxMute}
                  aria-label={isEn ? (lightboxMuted ? 'Unmute' : 'Mute') : (lightboxMuted ? 'وصل صدا' : 'قطع صدا')}
                >
                  {lightboxMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                {activeItem.category !== 'cover' && (
                  <button
                    type="button"
                    className={`work-lightbox-btn safezone-toggle-btn ${showSafeZone ? 'active' : ''}`}
                    onClick={toggleSafeZone}
                    aria-pressed={showSafeZone}
                    title={isEn ? "Toggle Reels Safe Zone Simulator" : "شبیه‌ساز محدوده امن اینستاگرام ریلز"}
                    aria-label={isEn ? "Toggle Reels Safe Zone Simulator" : "شبیه‌ساز محدوده امن اینستاگرام ریلز"}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="safezone-btn-text">
                      {isEn ? "Safe Zone" : "Safe Zone"}
                    </span>
                  </button>
                )}
              </div>
            ) : null}

            {/* Safe Zone Active Feedback Toast */}
            {showSafeZone && activeItem.category !== 'cover' && (
              <div className="safezone-active-hint" role="status">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span>
                  {isEn
                    ? "Safe Zone Active: Typography tested outside Like/Comment/Caption areas."
                    : "شبیه‌ساز فعال است: متن لیریک کاملاً خارج از پوشش دکمه‌ها و کپشن قرار دارد."}
                </span>
              </div>
            )}

            <p className="work-lightbox-caption">
              {isEn ? activeItem.labelEn : activeItem.labelFa}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
