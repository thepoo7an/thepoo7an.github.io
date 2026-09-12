import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Check, ArrowUpRight, Compass, Palette } from 'lucide-react';
import { trackStyleGalleryView, trackStyleSelected } from '../utils/analytics';

export interface StyleOption {
  id: string;
  code: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  tagsFa: string[];
  tagsEn: string[];
  previewAsset: string | null;
  accentClass: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'cinematic',
    code: 'STYLE // 01',
    titleFa: 'سینمایی و دراماتیک',
    titleEn: 'Cinematic Editorial',
    descFa: 'لترباکس عریض، گرین ملایم فیلم، تایپوگرافی اصیل و اتمسفر سنگین؛ مناسب برای قطعات عمیق، آراندبی و پاپ مفهومی.',
    descEn: 'Wide aspect ratio, authentic film grain, refined editorial typography, and evocative atmosphere for deep emotional releases.',
    tagsFa: ['لترباکس سینمایی', 'گرین آنالوگ', 'آراندبی و پاپ'],
    tagsEn: ['Cinematic Letterbox', 'Film Grain', 'Editorial'],
    previewAsset: './images/portfolio/sample-1.webp',
    accentClass: 'style-accent-cinematic',
  },
  {
    id: 'dark',
    code: 'STYLE // 02',
    titleFa: 'دارک و اتمسفریک',
    titleEn: 'Dark Atmospheric',
    descFa: 'پس‌زمینه ابسیدین عمیق، کنتراست شدید نور، افکت‌های مه‌آلود و تایپوگرافی سنگین؛ برای ریلیزهای دارک و دریل.',
    descEn: 'Deep obsidian shadows, high-contrast silhouettes, smoky ambient haze, and modern dark typography for Drill and Dark Wave.',
    tagsFa: ['ابسیدین عمیق', 'مه و کنتراست', 'دریل و دارک'],
    tagsEn: ['Obsidian Black', 'Smoke & Mist', 'High Contrast'],
    previewAsset: null,
    accentClass: 'style-accent-dark',
  },
];

export const StyleGallery: React.FC = () => {
  const { isEn } = useLanguage();
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedViewRef = useRef(false);

  // Track gallery view once when scrolled into view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTrackedViewRef.current) {
          hasTrackedViewRef.current = true;
          trackStyleGalleryView();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelectStyle = (style: StyleOption) => {
    const nextId = selectedStyleId === style.id ? null : style.id;
    setSelectedStyleId(nextId);
    if (nextId) {
      trackStyleSelected(style.id, style.titleEn);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="styles"
      className="styles-sec"
      aria-label={isEn ? "Visual Style Directions" : "جهت‌های بصری و استایل‌ها"}
    >
      <div className="styles-header">
        <p className="eyebrow rv">
          <Palette size={14} className="inline-block" aria-hidden="true" />
          <b>{isEn ? "✦ Art Direction Selector" : "✦ راهنمای سبک‌های بصری"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? (
            <>
              Find the <span className="chrome">Visual Tone</span> for Your Track.
            </>
          ) : (
            <>
              جهت بصری مناسب <span className="chrome">فضای موزیک خود</span> را انتخاب کنید.
            </>
          )}
        </h2>
        <p className="lead rv d2">
          {isEn
            ? "Choose an aesthetic direction before ordering to align typography styling, motion cadence, and color atmosphere with your music."
            : "برای درک بهتر سبک دلخواه و هماهنگی سریع‌تر در سفارش، جهت بصری مورد نظر خود را بررسی و انتخاب کنید تا متن و تصویر متناسب با آن طراحی شود."}
        </p>
      </div>

      {/* Selected Direction Quick Action Bar */}
      {selectedStyleId && (
        <div className="style-selected-banner rv" role="status">
          <div className="style-selected-info">
            <Sparkles size={16} className="text-accent" aria-hidden="true" />
            <span>
              {isEn
                ? `Selected Direction: ${STYLE_OPTIONS.find((s) => s.id === selectedStyleId)?.titleEn}`
                : `سبک انتخاب‌شده: ${STYLE_OPTIONS.find((s) => s.id === selectedStyleId)?.titleFa}`}
            </span>
          </div>
          <div className="style-selected-actions">
            <a
              href={`./order.html?style=${selectedStyleId}`}
              className="style-order-btn"
            >
              <span>{isEn ? "Order With This Style" : "ثبت سفارش با این سبک"}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="style-clear-btn"
              onClick={() => setSelectedStyleId(null)}
            >
              {isEn ? "Clear" : "لغو"}
            </button>
          </div>
        </div>
      )}

      {/* Styles 6-Card Grid */}
      <div className="styles-grid" role="region" aria-label={isEn ? "Style options" : "گزینه‌های سبک بصری"}>
        {STYLE_OPTIONS.map((style, idx) => {
          const isSelected = selectedStyleId === style.id;
          return (
            <article
              key={style.id}
              className={`style-card rv d${(idx % 3) + 1} ${style.accentClass} ${isSelected ? 'selected' : ''}`}
            >
              {/* Card Technical Header */}
              <div className="style-card-top">
                <span className="style-code" aria-hidden="true">{style.code}</span>
                <button
                  type="button"
                  className={`style-toggle-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectStyle(style)}
                  aria-pressed={isSelected}
                  aria-label={
                    isEn
                      ? `${isSelected ? 'Selected' : 'Select'} ${style.titleEn}`
                      : `${isSelected ? 'انتخاب شده' : 'انتخاب'} ${style.titleFa}`
                  }
                >
                  {isSelected ? (
                    <>
                      <Check size={13} aria-hidden="true" />
                      <span>{isEn ? "Selected" : "انتخاب شد"}</span>
                    </>
                  ) : (
                    <>
                      <Compass size={13} aria-hidden="true" />
                      <span>{isEn ? "Select" : "انتخاب سبک"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Visual Preview Window */}
              <div className="style-preview-window">
                {style.previewAsset ? (
                  <picture>
                    <source type="image/webp" srcSet={style.previewAsset} />
                    <img
                      src={style.previewAsset}
                      alt={isEn ? style.titleEn : style.titleFa}
                      width={320}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="style-preview-img"
                    />
                  </picture>
                ) : (
                  <div className={`style-shader-preview shader-${style.id}`} aria-hidden="true">
                    <span className="shader-typography">
                      {style.id === 'glitch' ? 'CYBER // 808' : 'NEON // GLOW'}
                    </span>
                    <div className="shader-grid" />
                  </div>
                )}
                <div className="style-preview-glare" aria-hidden="true" />
              </div>

              {/* Card Meta Content */}
              <div className="style-card-body">
                <h3 className="style-card-title">
                  {isEn ? style.titleEn : style.titleFa}
                </h3>
                <p className="style-card-desc">
                  {isEn ? style.descEn : style.descFa}
                </p>
                <div className="style-tags" aria-label={isEn ? "Characteristics" : "مشخصات سبک"}>
                  {(isEn ? style.tagsEn : style.tagsFa).map((tag, tIdx) => (
                    <span key={tIdx} className="style-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Order Quick Action */}
              <div className="style-card-footer">
                <a
                  href={`./order.html?style=${style.id}`}
                  className="style-direct-order-link"
                  onClick={() => trackStyleSelected(style.id, style.titleEn)}
                >
                  <span>{isEn ? "Order In This Direction" : "سفارش با این جهت بصری"}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default StyleGallery;
