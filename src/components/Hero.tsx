import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  heroImgRef?: React.RefObject<HTMLImageElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroImgRef }) => {
  const { theme } = useTheme();
  const { isEn } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const logoSrc = theme === 'light' ? `${baseUrl}images/hero/logo-light.png` : `${baseUrl}images/hero/logo.png`;

  return (
    <section className="hero" id="home">
      <p className="eyebrow rv">
        <b>{isEn ? "✦ Music Lyric Typography" : "✦ تایپوگرافی لیریک موزیک"}</b>
      </p>
      <h1 className="rv d1">
        {isEn ? (
          <>
            See your music lyrics come alive on video.<br />
            <span className="chrome">Chrome. Kinetic. Cinematic.</span>
          </>
        ) : (
          <>
            لیریک موزیکت را روی ویدیو ببین.<br />
            <span className="chrome">کروم. کینتیک. سینمایی.</span>
          </>
        )}
      </h1>
      <p className="sub rv d2">
        {isEn
          ? "Custom lyric typography, video editing synced with music beats, and music cover art — tailored for Reels and social media."
          : "طراحی تایپوگرافی لیریک، ادیت ویدیو با متن آهنگ و طراحی کاور موزیک — آماده برای انتشار در ریلز و شبکه‌های اجتماعی."}
      </p>
      <div className="cta-row rv d3">
        <a className="pill" href="#contact">
          {isEn ? "Order Lyric Video" : "ثبت سفارش لیریک"}
        </a>
        <a className="tlink" href="#portfolio">
          {isEn ? "View Portfolio" : "مشاهده نمونه‌کارها"}
          <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      <div className="hero-media rv d3">
        {!imgError && (
          <img
            id="heroImg"
            ref={heroImgRef}
            src={logoSrc}
            alt={isEn ? "THEPOO7AN Chrome Logo" : "لوگوی کروم THEPOO7AN"}
            width={720}
            height={180}
            fetchPriority="high"
            onError={() => setImgError(true)}
          />
        )}
        <div className="hero-glow" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default Hero;
