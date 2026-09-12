import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const InstagramSafeZoneOverlay: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <div
      className="reels-safezone-overlay"
      aria-hidden="true"
    >
      {/* Top Header Mock UI */}
      <div className="reels-mock-top">
        <div className="reels-mock-status">
          <span className="reels-mock-pill">Reels</span>
        </div>
        <div className="reels-mock-camera">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>

      {/* The Bounded Safe Typography Zone */}
      <div className="reels-safezone-box">
        <div className="reels-safezone-header">
          <span className="reels-safezone-tag">
            <span className="reels-safezone-pulse" />
            {isEn ? "SAFE TYPOGRAPHY ZONE" : "محدوده امن تایپوگرافی"}
          </span>
          <span className="reels-safezone-ratio">9:16 SAFE</span>
        </div>
        <div className="reels-safezone-corners">
          <span className="corner top-l" />
          <span className="corner top-r" />
          <span className="corner btm-l" />
          <span className="corner btm-r" />
        </div>
      </div>

      {/* Right Side Action Rail */}
      <div className="reels-mock-rail">
        <div className="reels-rail-item">
          <div className="reels-rail-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <span className="reels-rail-label">14.2K</span>
        </div>

        <div className="reels-rail-item">
          <div className="reels-rail-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <span className="reels-rail-label">348</span>
        </div>

        <div className="reels-rail-item">
          <div className="reels-rail-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>

        <div className="reels-rail-item">
          <div className="reels-rail-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="5" cy="12" r="2" />
            </svg>
          </div>
        </div>

        {/* Spinning Disc Audio Thumbnail */}
        <div className="reels-mock-disc">
          <div className="reels-disc-inner" />
        </div>
      </div>

      {/* Bottom Profile, Caption & Audio Bar */}
      <div className="reels-mock-bottom">
        <div className="reels-profile-row">
          <div className="reels-avatar">
            <span>P</span>
          </div>
          <span className="reels-handle">thepoo7an</span>
          <span className="reels-follow-pill">Follow</span>
        </div>
        <p className="reels-caption-line">
          {isEn
            ? "Sync precision check • Safe from UI overlays."
            : "بررسی دقیق سینک • کاملاً امن از پوشش المان‌ها"}
        </p>
        <div className="reels-audio-track">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span>THEPOO7AN • Original Audio</span>
        </div>
      </div>
    </div>
  );
};

export default InstagramSafeZoneOverlay;
