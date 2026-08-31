import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  heroImgRef?: React.RefObject<HTMLImageElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroImgRef }) => {
  const { isEn } = useLanguage();

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

      {/* Quiet Single-Line Specs Strip */}
      <p className="hero-specs-line rv d2" aria-label={isEn ? "Specifications" : "مشخصات فنی"}>
        {isEn ? "9:16 Reels · 1080p · same-day delivery" : "خروجی ریلز ۹:۱۶ · ۱۰۸۰p · تحویل همان روز"}
      </p>

      {/* CTA Actions */}
      <div className="cta-row rv d3">
        <a className="pill pill-primary" href="./order.html" id="heroStartOrderBtn">
          {isEn ? "Start Order" : "ثبت سفارش"}
        </a>
        <a className="pill-secondary" href="#work" id="heroSeeWorkBtn">
          {isEn ? "See work" : "دیدن نمونه"}
          <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      {/* 9:16 Sample Reel Frame */}
      <div className="hero-frame-wrap rv d3">
        <div className="hero-reel-frame">
          <picture>
            <source srcSet="./images/portfolio/work-visuals.webp" type="image/webp" />
            <img
              id="heroImg"
              ref={heroImgRef}
              src="./images/portfolio/work-visuals.png"
              alt={isEn ? "Sample 9:16 Reels output" : "نمونه خروجی ریلز ۹:۱۶"}
              width={360}
              height={640}
              fetchPriority="high"
              decoding="async"
              className="hero-reel-img"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('work-visuals.webp')) {
                  target.src = './images/portfolio/work-visuals.webp';
                }
              }}
            />
          </picture>
        </div>
        <p className="hero-frame-caption">
          {isEn ? "Sample 9:16 Reels output" : "نمونه خروجی ریلز ۹:۱۶"}
        </p>
      </div>
    </section>
  );
};

export default Hero;
