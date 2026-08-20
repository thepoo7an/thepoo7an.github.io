import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface PortfolioItem {
  id: string;
  titleFa: string;
  titleEn: string;
  type: 'typography' | 'edit' | 'cover';
  descriptionFa: string;
  descriptionEn: string;
  image: string;
}

const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'lyric-typography',
    titleFa: 'تایپوگرافی لیریک موزیک',
    titleEn: 'Music Lyric Typography',
    type: 'typography',
    descriptionFa: 'انیمیت و طراحی متحرک متن آهنگ هماهنگ با ریتم و ضرب‌های موزیک برای ریلز.',
    descriptionEn: 'Kinetic typography animated to the rhythm and transients of the track for Instagram Reels.',
    image: `${baseUrl}images/portfolio/work-typography.png`,
  },
  {
    id: 'music-video-visuals',
    titleFa: 'ساخت موزیکویدیو و اکولایزر',
    titleEn: 'Music Visualizer & Video Edit',
    type: 'edit',
    descriptionFa: 'ادیت ویدیویی سینمایی همراه با افکت‌های بصری اختصاصی و جلوه‌های صوتی.',
    descriptionEn: 'Cinematic video editing with custom audio visualizers and motion visual effects.',
    image: `${baseUrl}images/portfolio/work-visuals.png`,
  },
  {
    id: 'reels-cover',
    titleFa: 'کاور ریلز و پست اینستاگرام',
    titleEn: 'Reels & Single Cover Art',
    type: 'cover',
    descriptionFa: 'طراحی کاور جذاب و حرفه‌ای برای افزایش نرخ کلیک و هویت بصری یکپارچه.',
    descriptionEn: 'High-impact 3D cover art designed for high CTR and unified release aesthetics.',
    image: `${baseUrl}images/portfolio/work-cover.png`,
  },
  {
    id: 'full-lyric-video',
    titleFa: 'لیریک ویدیو کامل',
    titleEn: 'Full Track Lyric Video',
    type: 'edit',
    descriptionFa: 'تولید لیریک ویدیو کامل برای تمام مدت تِرک جهت انتشار در یوتیوب و شبکه‌های اجتماعی.',
    descriptionEn: 'Complete full-length lyric video for YouTube and streaming visualizers.',
    image: `${baseUrl}images/portfolio/work-visuals.png`,
  },
];

const typeLabelsFa: Record<PortfolioItem['type'], string> = {
  typography: 'تایپوگرافی',
  edit: 'ادیت ویدیو',
  cover: 'کاور',
};

const typeLabelsEn: Record<PortfolioItem['type'], string> = {
  typography: 'Typography',
  edit: 'Video Edit',
  cover: 'Cover Art',
};

interface PortfolioCardProps {
  key?: React.Key;
  item: PortfolioItem;
  delayClass?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  delayClass = '',
}) => {
  const { isEn } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const title = isEn ? item.titleEn : item.titleFa;
  const description = isEn ? item.descriptionEn : item.descriptionFa;
  const badgeLabel = isEn ? typeLabelsEn[item.type] : typeLabelsFa[item.type];

  return (
    <article className={`tile rv ${delayClass}`.trim()}>
      <div className="tile-head">
        <div className="tile-badge-wrap">
          <span className="tile-type-badge">{badgeLabel}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tile-links">
          <a className="pill" href="#contact">
            {isEn ? 'Order' : 'سفارش'}
          </a>
          <a className="tlink" href="#contact">
            {isEn ? 'Details' : 'جزئیات بیشتر'}{' '}
            <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="tile-media">
        {/* Skeleton loader / fallback */}
        {(!loaded || hasError) && (
          <div className="skeleton-loader" aria-hidden="true">
            <div className="skeleton-shimmer"></div>
          </div>
        )}

        {/* Actual image with lazy loading and error handling */}
        {!hasError && (
          <img
            src={item.image}
            alt={title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setHasError(true);
              setLoaded(false);
            }}
            className={`tile-image ${loaded ? 'loaded' : 'loading'}`}
            width={800}
            height={600}
          />
        )}
      </div>
    </article>
  );
};

export const Portfolio: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <>
      <section className="tiles-sec" id="portfolio" aria-label={isEn ? "Portfolio" : "نمونه‌کارها"}>
        {PORTFOLIO.map((item, idx) => (
          <PortfolioCard
            key={item.id}
            item={item}
            delayClass={idx % 2 === 1 ? 'd1' : ''}
          />
        ))}
      </section>

      {/* ===== Statement & Features ===== */}
      <section className="statement">
        <h2 className="rv">
          {isEn ? (
            <>
              Every track is more than sound.<br />
              <span className="dim">It is a visual identity.</span>
            </>
          ) : (
            <>
              هر ترک فقط یک آهنگ نیست.<br />
              <span className="dim">یک هویت بصری است.</span>
            </>
          )}
        </h2>
      </section>

      <div className="feat-row">
        <div className="feat rv">
          <svg viewBox="0 0 24 24">
            <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
          </svg>
          <b>{isEn ? "Millisecond Beat Sync" : "سینک میلی‌ثانیه‌ای"}</b>
          <span>
            {isEn
              ? "Accurately locked to 808s, drums, vocal chops and beat drops."
              : "هماهنگ با ضرب، ساب‌بیس و اوج‌های داینامیک موزیک."}
          </span>
        </div>
        <div className="feat rv d1">
          <svg viewBox="0 0 24 24">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          </svg>
          <b>{isEn ? "3D Chrome & Fluid Materials" : "متریال کروم ۳D"}</b>
          <span>
            {isEn
              ? "Realistic glass reflections and liquid metal cinematic lightning."
              : "انعکاس‌های شیشه‌ای و فلز مایع با نورپردازی سینمایی."}
          </span>
        </div>
        <div className="feat rv d2">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <b>{isEn ? "Fast Online Delivery" : "تحویل سریع آنلاین"}</b>
          <span>
            {isEn
              ? "Standard clips delivered swiftly with direct support."
              : "پروژه‌های معمولی همان‌روز و تحویل فوری."}
          </span>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
