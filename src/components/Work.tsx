import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { trackWorkPreview } from '../utils/analytics';

interface WorkItem {
  id: string;
  videoSrc?: string;
  videoFallbacks?: string[];
  primarySrc: string;
  fallbacks: string[];
  labelFa: string;
  labelEn: string;
}

const WORK_ITEMS: WorkItem[] = [
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

interface WorkCardProps {
  key?: React.Key;
  item: WorkItem;
  idx: number;
  isEn: boolean;
  onOpenLightbox: (item: WorkItem) => void;
}

function WorkCard({ item, idx, isEn, onOpenLightbox }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoSource, setVideoSource] = useState(item.videoSrc);
  const [videoAttempt, setVideoAttempt] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  const handlePlay = useCallback(() => {
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
    <div className={`work-card rv ${idx === 0 ? '' : `d${idx}`}`}>
      <div
        className="work-frame"
        role="button"
        tabIndex={0}
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
      >
        {!videoFailed && videoSource ? (
          <video
            ref={videoRef}
            src={videoSource}
            poster={item.primarySrc}
            playsInline
            loop
            muted={isMuted}
            preload="metadata"
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

        {/* Hover / Tap to Play Badge */}
        <div
          className={`work-play-badge ${isPlaying ? 'playing' : ''}`}
          aria-hidden="true"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{isEn ? 'Tap or hover to play' : 'لمس یا هاور برای پخش'}</span>
        </div>

        {/* Sound toggle button */}
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

        {/* Expand / Lightbox Button */}
        <button
          type="button"
          className="work-zoom-btn"
          aria-label={isEn ? `Expand ${item.labelEn}` : `بزرگ‌نمایی ${item.labelFa}`}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onOpenLightbox(item);
          }}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="work-meta">
        <span className="work-label">
          {isEn ? item.labelEn : item.labelFa}
        </span>
      </div>
    </div>
  );
};

export const Work: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const [lightboxPlaying, setLightboxPlaying] = useState(false);
  const [lightboxMuted, setLightboxMuted] = useState(true);

  const closeModal = useCallback(() => {
    setActiveItem(null);
    setLightboxPlaying(false);
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
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
            onOpenLightbox={(selected) => {
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
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? activeItem.labelEn : activeItem.labelFa}
          onClick={closeModal}
        >
          <button
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
