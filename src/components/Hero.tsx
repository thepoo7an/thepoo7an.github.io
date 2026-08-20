import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  heroImgRef?: React.RefObject<HTMLImageElement>;
}

function resolveAssetUrl(relativePath: string): string {
  const cleanPath = relativePath.replace(/^\.?\/+/, '');
  
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    // Derive directory path on GitHub Pages (e.g. /thepoo7an_site/) or root (/)
    const folder = pathname.endsWith('.html')
      ? pathname.substring(0, pathname.lastIndexOf('/') + 1)
      : pathname.endsWith('/')
        ? pathname
        : `${pathname}/`;
    return `${folder}${cleanPath}`;
  }
  
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

export const Hero: React.FC<HeroProps> = ({ heroImgRef }) => {
  const { theme } = useTheme();
  const { isEn } = useLanguage();
  const [retryCount, setRetryCount] = useState(0);

  const isLight = theme === 'light';

  const { pngSrc, webpSrc } = useMemo(() => {
    const pngPath = isLight ? 'images/hero/logo-light.png' : 'images/hero/logo.png';
    const webpPath = isLight ? 'images/hero/logo-light.webp' : 'images/hero/logo.webp';
    return {
      pngSrc: resolveAssetUrl(pngPath),
      webpSrc: resolveAssetUrl(webpPath),
    };
  }, [isLight]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (retryCount === 0) {
      // First fallback: try direct relative path './images/hero/...'
      setRetryCount(1);
      target.src = isLight ? './images/hero/logo-light.png' : './images/hero/logo.png';
    } else if (retryCount === 1) {
      // Second fallback: try absolute root path '/images/hero/...'
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
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            id="heroImg"
            ref={heroImgRef}
            src={pngSrc}
            alt={isEn ? "THEPOO7AN Logo" : "لوگوی THEPOO7AN"}
            width={720}
            height={180}
            fetchPriority="high"
            decoding="async"
            onError={handleImgError}
          />
        </picture>
        <div className="hero-glow" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default Hero;
