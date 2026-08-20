import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ServiceItem {
  id: string;
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  delayClass: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'kinetic-typography',
    badgeFa: 'پرفروش',
    badgeEn: 'Popular',
    titleFa: 'تایپوگرافی کینتیک و کروم',
    titleEn: 'Kinetic & Chrome Typography',
    descFa: 'طراحی متن آهنگ با فونت‌های سفارشی، افکت‌های متالیک کروم سه‌بعدی و حرکت داینامیک هماهنگ با ضرب‌آهنگ موزیک.',
    descEn: 'Custom typography motion with 3D metallic chrome textures and dynamic animation locked to music beats.',
    featuresFa: [
      'انیمیشن متن هماهنگ با بیت',
      'افکت‌های نوری، نئون و متالیک',
      'فرمت ۹:۱۶ مناسب ریلز و استوری',
      'کیفیت Full HD / ۴K',
    ],
    featuresEn: [
      'Beat-synced typography motion',
      'Neon, glow & 3D metallic chrome fx',
      '9:16 vertical ratio optimized for Reels',
      'Crisp Full HD / 4K exports',
    ],
    ctaFa: 'سفارش تایپوگرافی',
    ctaEn: 'Order Typography',
    delayClass: '',
  },
  {
    id: 'video-editing',
    badgeFa: 'ویدیو',
    badgeEn: 'Video',
    titleFa: 'ادیت ویدیو موزیک و تیزر',
    titleEn: 'Music Video Edit & Teaser',
    descFa: 'تدوین ویدیوهای کوتاه، تیزر ترک‌های جدید و آماده‌سازی محتوای ویدیویی جذاب برای انتشار در اینستاگرام.',
    descEn: 'Short-form editing, teaser visuals, and engaging promotional clips ready for social releases.',
    featuresFa: [
      'تدوین ریتمیک متناسب با استایل موزیک',
      'کالر گریدینگ و اصلاح رنگ سینمایی',
      'افکت‌های گلیچ، زوم و ترنزیشن‌های ترند',
      'خروجی بهینه برای اینستاگرام و تیک‌تاک',
    ],
    featuresEn: [
      'Rhythmic pacing tailored to track mood',
      'Cinematic color grading & LUTs',
      'Glitch, zoom & trending dynamic transitions',
      'Platform-optimized compression',
    ],
    ctaFa: 'سفارش ادیت ویدیو',
    ctaEn: 'Order Video Edit',
    delayClass: 'd1',
  },
  {
    id: 'cover-design',
    badgeFa: 'طراحی',
    badgeEn: 'Design',
    titleFa: 'طراحی کاور و هویت بصری',
    titleEn: 'Cover Art & Visual Identity',
    descFa: 'کاور آرت سینگل‌ترک، آلبوم و تم یکپارچه برای صفحه اینستاگرام و پلتفرم‌های پخش موزیک (اسپاتیفای، ساوندکلاود).',
    descEn: 'Single and album artwork with consistent branding for Spotify, SoundCloud, and Instagram.',
    featuresFa: [
      'طراحی کاور در ابعاد ۱:۱ و ۹:۱۶',
      'طراحی لوگوتایپ و هویت بصری آرتیست',
      'فایل آماده چاپ و انتشار دیجیتال',
      'تحویل در فرمت‌های مختلف با کیفیت بالا',
    ],
    featuresEn: [
      '1:1 square & 9:16 vertical artboards',
      'Custom logotype & artist branding',
      'Print-ready & digital streaming assets',
      'High-resolution source file delivery',
    ],
    ctaFa: 'سفارش طراحی کاور',
    ctaEn: 'Order Cover Art',
    delayClass: 'd2',
  },
];

export const Services: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="svc-sec" id="services" aria-label={isEn ? "Services" : "خدمات"}>
      <div className="svc-header">
        <p className="eyebrow rv">
          <b>{isEn ? "✦ What We Do" : "✦ خدمات ما"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "Specialized Visual Production" : "خدمات تخصصی تولید محتوای موزیک"}
        </h2>
        <p className="sub rv d2">
          {isEn
            ? "From dynamic kinetic typography to full teaser cuts and artwork tailored for music artists."
            : "از تایپوگرافی متن آهنگ تا ساخت تیزر و طراحی کاور — متناسب با نیاز آرتیست‌ها و پرودیوسرها."}
        </p>
      </div>

      <div className="svc-grid">
        {SERVICES.map((s) => (
          <article key={s.id} className={`svc-card rv ${s.delayClass}`.trim()}>
            <div className="svc-card-top">
              <span className="svc-badge">{isEn ? s.badgeEn : s.badgeFa}</span>
              <h3>{isEn ? s.titleEn : s.titleFa}</h3>
              <p>{isEn ? s.descEn : s.descFa}</p>
            </div>
            <ul className="svc-features">
              {(isEn ? s.featuresEn : s.featuresFa).map((f, i) => (
                <li key={i}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="svc-card-bottom">
              <a className="pill" href="#contact">
                {isEn ? s.ctaEn : s.ctaFa}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
