import React from 'react';
import { X } from 'lucide-react';
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
  if (!activeItem) return null;

  return (
    <div
      ref={lightboxModalRef}
      className="work-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? activeItem.labelEn : activeItem.labelFa}
      onClick={onClose}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="work-lightbox-close"
        onClick={onClose}
        aria-label={isEn ? 'Close preview' : 'بستن پیش‌نمایش'}
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="work-lightbox-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="work-lightbox-frame">
          {activeItem.isInstagram ? (
            <iframe
              src={activeItem.instagramEmbedUrl || `https://www.instagram.com/reel/${activeItem.instagramId}/embed/`}
              title={isEn ? activeItem.labelEn : activeItem.labelFa}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="work-lightbox-video"
              style={{ border: 0, width: '100%', height: '100%' }}
            />
          ) : activeItem.isTikTok ? (
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
        {activeItem.isInstagram ? (
          <div className="work-lightbox-bar">
            <a
              href={activeItem.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-lightbox-btn ig-direct-lightbox-btn"
              title={isEn ? 'Watch on Instagram' : 'مشاهده در اینستاگرام'}
              aria-label={isEn ? 'Watch on Instagram' : 'مشاهده در اینستاگرام'}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>
                {isEn ? 'Watch on Instagram' : 'مشاهده در اینستاگرام'}
              </span>
            </a>
          </div>
        ) : activeItem.isTikTok ? (
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
        ) : null}

        <p className="work-lightbox-caption">
          {isEn ? activeItem.labelEn : activeItem.labelFa}
        </p>
      </div>
    </div>
  );
};

export default WorkLightbox;
