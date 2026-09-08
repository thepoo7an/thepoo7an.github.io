import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { trackWorkPreview } from '../utils/analytics';

const MEDIA_BASE_URL = (import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');

function resolveMediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (!MEDIA_BASE_URL || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return path.replace(/^\.\//, `${MEDIA_BASE_URL}/`);
}

interface WorkItem {
  id: string;
  videoSrc?: string;
  videoFallbacks?: string[];
  primarySrc: string;
  fallbacks: string[];
  labelFa: string;
  labelEn: string;
}

const RAW_WORK_ITEMS = [
  {
    id: 'work-sample-1',
    videoSrc: './videos/portfolio/sample-1.mp4',
    videoFallbacks: [
      './videos/portfolio/sample-1.webm',
      './videos/portfolio/sample-reel.webm',
    ],
    primarySrc: './images/portfolio/sample-1.webp',
    fallbacks: [
      './images/portfolio/sample-1.png',
    ],
    labelFa: 'پشیمون میشی و برمیگردی',
    labelEn: 'Lyric Typography Reel',
  },
  {
    id: 'work-sample-2',
    videoSrc: './videos/portfolio/sample-2.mp4',
    videoFallbacks: [
      './videos/portfolio/sample-2.webm',
    ],
    primarySrc: './images/portfolio/sample-2.webp',
    fallbacks: [
      './images/portfolio/sample-2.png',
    ],
    labelFa: 'دورم کن — میراد',
    labelEn: 'Dooram Kon — Meyraad',
  },
  {
    id: 'work-sample-3',
    videoSrc: './videos/portfolio/sample-3.mp4',
    videoFallbacks: [
      './videos/portfolio/sample-3.webm',
    ],
    primarySrc: './images/portfolio/sample-3.webp',
    fallbacks: [
      './images/portfolio/sample-3.png',
    ],
    labelFa: 'تایپوگرافی سه‌بعدی و موشن کروم',
    labelEn: '3D Chrome & Kinetic Typography',
  },
];

const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map((item) => ({
  ...item,
  videoSrc: resolveMediaUrl(item.videoSrc),
  videoFallbacks: item.videoFallbacks.map((src) => resolveMediaUrl(src)!),
}));

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

        <div className="work-frame">
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
              width={360}
              height={640}
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
                ? `${item.labelEn} - ${isPlaying ? 'Pause video' : 'Hover or tap to play'}`
                : `${item.labelFa} - ${isPlaying ? 'توقف پخش' : 'هاور یا لمس برای پخش ویدیو'}`
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (isPlaying) {
                handlePause();
              } else {
                handlePlay();
              }
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isPlaying) {
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
            <div className="badge-orbit" aria-hidden="true">
              <span className="radar-circle"></span>
              <span className="radar-orbit"></span>
              <span className="radar-dot"></span>
            </div>
            <Play className="w-3 h-3 fill-current" />
            <span>{isEn ? 'Tap or hover to play' : 'لمس یا هاور برای پخش'}</span>
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
          <span className="work-spec-pill">9:16 REELS</span>
        </div>
      </div>
    </div>
  );
}

export const Work: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const lightboxModalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [lightboxPlaying, setLightboxPlaying] = useState(false);
  const [lightboxMuted, setLightboxMuted] = useState(true);

  const closeModal = useCallback(() => {
    setActiveItem(null);
    setLightboxPlaying(false);
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

  return (
    <section className="work-sec" id="work" aria-label={isEn ? 'Selected output' : 'نمونه خروجی'}>
      <div className="work-header">
        <h2 className="rv">
          {isEn ? 'Selected output' : 'نمونه خروجی'}
        </h2>
      </div>

      <div className="work-grid">
        {WORK_ITEMS.map((item, idx) => (
          <WorkCard
            key={item.id}
            item={item}
            idx={idx}
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
            <div className="work-lightbox-frame">
              {activeItem.videoSrc ? (
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
                  width={360}
                  height={640}
                  className="work-lightbox-img"
                />
              )}
            </div>

            {/* Lightbox Control Bar */}
            {activeItem.videoSrc && (
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
