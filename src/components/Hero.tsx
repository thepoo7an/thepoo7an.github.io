import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import darkLogo from '../assets/images/logo_dark_chrome_1787255337578.jpg';
import lightLogo from '../assets/images/logo_light_chrome_1787255347992.jpg';

interface HeroProps {
  heroImgRef?: React.RefObject<HTMLImageElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroImgRef }) => {
  const { theme } = useTheme();
  const { isEn } = useLanguage();
  const [retryCount, setRetryCount] = useState(0);

  const isLight = theme === 'light';
  const logoSrc = isLight ? lightLogo : darkLogo;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (retryCount === 0) {
      setRetryCount(1);
      target.src = isLight ? './images/hero/logo-light.png' : './images/hero/logo.png';
    } else if (retryCount === 1) {
      setRetryCount(2);
      target.src = isLight ? '/images/hero/logo-light.png' : '/images/hero/logo.png';
    }
  };

  return (
    <section className="hero" id="home">
      <p className="eyebrow rv">
        <b>{isEn ? "✦ THEPOO7AN — Pooyan Karimi" : "✦ THEPOO7AN — پویان کریمی"}</b>
      </p>
      <h1 className="rv d1">
        {isEn ? (
          <>
            Lyric Typography & Video Editing for Music.<br />
            <span className="chrome">Crafted for Reels & Social Releases.</span>
          </>
        ) : (
          <>
            تایپوگرافی لیریک و ادیت ویدیویی موزیک.<br />
            <span className="chrome">ویژه انتشار در ریلز و شبکه‌های اجتماعی.</span>
          </>
        )}
      </h1>
      <p className="sub rv d2">
        {isEn
          ? "Specialized visual production for emerging music artists and release marketing teams. Fast turnaround, 1080p MP4 exports, and beat-synced visuals."
          : "تولید محتوای بصری برای آرتیست‌های مستقل و تیم‌های مارکتینگ موسیقی. تحویل سریع، خروجی 1080p و هماهنگی دقیق با ریتم آهنگ."}
      </p>

      {/* Output Specs Visualizer */}
      <div className="specs-strip rv d2" aria-label={isEn ? "Standard output specifications" : "مشخصات استاندارد خروجی"}>
        <div className="spec-item">
          <div className="spec-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
          <span className="spec-label">MP4 / H.264</span>
        </div>
        <div className="spec-item">
          <div className="spec-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <span className="spec-label">1080 × 1920 (9:16)</span>
        </div>
        <div className="spec-item">
          <div className="spec-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="spec-label">30 FPS</span>
        </div>
        <div className="spec-item">
          <div className="spec-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </div>
          <span className="spec-label">{isEn ? "Precise Beat Sync" : "سینک دقیق با موزیک"}</span>
        </div>
      </div>

      <div className="cta-row rv d3">
        <a className="pill pill-primary" href="./order.html" id="heroStartOrderBtn">
          {isEn ? "Start Order" : "ثبت سفارش"}
        </a>
        <a className="pill-secondary" href="#services" id="heroViewServicesBtn">
          {isEn ? "View Services" : "مشاهده خدمات"}
          <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      <div className="hero-media rv d3">
        <img
          id="heroImg"
          ref={heroImgRef}
          src={logoSrc}
          alt={isEn ? "THEPOO7AN Logo" : "لوگوی THEPOO7AN"}
          width={720}
          height={180}
          fetchPriority="high"
          decoding="async"
          onError={handleImgError}
        />
        <div className="hero-glow" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default Hero;
