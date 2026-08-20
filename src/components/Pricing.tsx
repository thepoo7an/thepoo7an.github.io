import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface PricingPlan {
  id: string;
  nameFa: string;
  nameEn: string;
  badgeFa?: string;
  badgeEn?: string;
  priceFa: string;
  priceEn: string;
  unitFa: string;
  unitEn: string;
  descFa: string;
  descEn: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  popular?: boolean;
  delayClass: string;
}

export const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    nameFa: 'پایه — استوری و ریلز کوتاه',
    nameEn: 'Starter — Short Reels',
    priceFa: 'توافقی',
    priceEn: 'Custom',
    unitFa: '/ بر اساس ثانیه',
    unitEn: '/ per project',
    descFa: 'مناسب برای تیزرهای ۱۵ تا ۳۰ ثانیه‌ای، معرفی ترک جدید در استوری و ریلز.',
    descEn: 'Ideal for 15-30s release teasers and high-impact Instagram Reels.',
    featuresFa: [
      'تایپوگرافی کینتیک تا ۳۰ ثانیه',
      'سینک دقیق با ضرب موزیک',
      'کیفیت Full HD (1080p)',
      'یک بار ویرایش و اصلاح رایگان',
      'تحویل در ۱ الی ۲ روز کاری',
    ],
    featuresEn: [
      'Kinetic typography up to 30 seconds',
      'Precise beat & transient synchronization',
      'Full HD resolution (1080p)',
      '1 complimentary revision included',
      'Fast 24-48h turnaround',
    ],
    ctaFa: 'استعلام قیمت',
    ctaEn: 'Inquire Now',
    delayClass: '',
  },
  {
    id: 'pro',
    nameFa: 'حرفه‌ای — ریلز کامل و اکولایزر',
    nameEn: 'Pro — Extended Visuals',
    badgeFa: 'پیشنهاد ویژه',
    badgeEn: 'Recommended',
    popular: true,
    priceFa: 'توافقی',
    priceEn: 'Custom',
    unitFa: '/ متناسب با پروژه',
    unitEn: '/ per project',
    descFa: 'مناسب برای ریلزهای ۳۰ تا ۶۰ ثانیه‌ای با افکت‌های سه‌بعدی کروم و ادیت ویدیویی پیشرفته.',
    descEn: 'Perfect for 30-60s full chorus videos with custom 3D chrome text styling.',
    featuresFa: [
      'تایپوگرافی کروم ۳D تا ۶۰ ثانیه',
      'ادیت ویدیو و ترکیب با فوتیج',
      'افکت‌های نوری و ترنزیشن‌های اختصاصی',
      'کیفیت 4K / Full HD',
      'دو بار ویرایش و اصلاح رایگان',
      'تحویل اولویت‌دار',
    ],
    featuresEn: [
      '3D metallic chrome typography up to 60s',
      'Visual FX & footage blending',
      'Custom motion glow & optical flare transitions',
      'Crisp 4K / Full HD masters',
      '2 rounds of revisions included',
      'Priority delivery schedule',
    ],
    ctaFa: 'ثبت سفارش پروژه',
    ctaEn: 'Order Project',
    delayClass: 'd1',
  },
  {
    id: 'full',
    nameFa: 'کامل — لیریک ویدیو کامل ترک',
    nameEn: 'Full — Full Track Lyric Video',
    priceFa: 'توافقی',
    priceEn: 'Custom',
    unitFa: '/ کل آهنگ',
    unitEn: '/ full track',
    descFa: 'طراحی کامل تایپوگرافی برای تمام مدت زمان ترک جهت انتشار در یوتیوب و آپارات.',
    descEn: 'Complete end-to-end lyric video for entire track length (YouTube & streaming).',
    featuresFa: [
      'تایپوگرافی کامل کل مدت آهنگ',
      'طراحی صحنه‌ها و سناریوی بصری اختصاصی',
      'فرمت‌های مختلف (۱۶:۹ برای یوتیوب + ۹:۱۶ برای ریلز)',
      'کاور آرت هماهنگ برای انتشار',
      'پشتیبانی و اصلاح تا رضایت کامل',
    ],
    featuresEn: [
      'Full-track complete lyric typesetting',
      'Dedicated visual scenario & multiple scene transitions',
      'Dual exports (16:9 YouTube + 9:16 Reels)',
      'Matching cover artwork included',
      'Dedicated support until 100% satisfaction',
    ],
    ctaFa: 'مشاوره و سفارش',
    ctaEn: 'Get Consultation',
    delayClass: 'd2',
  },
];

export const Pricing: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="pricing-sec" id="pricing" aria-label={isEn ? "Pricing" : "تعرفه‌ها"}>
      <div className="pricing-header">
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Pricing & Plans" : "✦ تعرفه‌ها و پکیج‌ها"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "Clear Plans for Every Production Scope" : "تعرفه‌های شفاف برای هر نوع پروژه"}
        </h2>
        <p className="sub rv d2">
          {isEn
            ? "Pricing is tailored based on track duration, styling complexity, and delivery urgency."
            : "قیمت نهایی بر اساس مدت‌زمان، پیچیدگی استایل و زمان تحویل پروژه محاسبه می‌شود."}
        </p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((p) => (
          <article
            key={p.id}
            className={`price-card rv ${p.delayClass} ${p.popular ? 'popular' : ''}`.trim()}
          >
            {p.badgeFa && (
              <span className="price-badge">{isEn ? p.badgeEn : p.badgeFa}</span>
            )}
            <div className="price-card-top">
              <h3>{isEn ? p.nameEn : p.nameFa}</h3>
              <p className="price-desc">{isEn ? p.descEn : p.descFa}</p>
              <div className="price-val-row">
                <span className="price-amount">{isEn ? p.priceEn : p.priceFa}</span>
                <span className="price-unit">{isEn ? p.unitEn : p.unitFa}</span>
              </div>
            </div>
            <ul className="price-features">
              {(isEn ? p.featuresEn : p.featuresFa).map((f, i) => (
                <li key={i}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="price-card-bottom">
              <a
                className={p.popular ? 'pill' : 'tlink'}
                href="#contact"
              >
                {isEn ? p.ctaEn : p.ctaFa}
                {!p.popular && (
                  <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
