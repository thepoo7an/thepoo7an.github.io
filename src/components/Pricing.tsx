import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface PricingPlan {
  id: string;
  planParam: string;
  titleFa: string;
  titleEn: string;
  priceFa: string;
  priceEn: string;
  whoFa: string;
  whoEn: string;
  isPopular?: boolean;
  flagFa?: string;
  flagEn?: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  delayClass: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-base',
    planParam: 'base',
    titleFa: 'تایپوگرافی لیریک موزیک',
    titleEn: 'Lyric Typography',
    priceFa: '۱۵۰٬۰۰۰ تومان',
    priceEn: '150,000 Tomans',
    whoFa: 'تک‌پست و کاور ریلز / short lyric clip',
    whoEn: 'For single posts & Reels covers / short lyric clip',
    featuresFa: [
      'ویدیوی حدود ۱۵–۲۰ ثانیه با لیریک طراحی‌شده',
      'خروجی MP4 / 1080p / 30 FPS',
      '۲ نمونه اجرا برای انتخاب',
      'تحویل در همان روز (ساعت کاری ۱۰ صبح تا ۱۱ شب)',
    ],
    featuresEn: [
      'Video ~15–20s with custom designed lyrics',
      'Output: MP4 / 1080p / 30 FPS',
      '2 concept options to choose from',
      'Same-day delivery (10 AM to 11 PM working hours)',
    ],
    ctaFa: 'شروع سفارش',
    ctaEn: 'Start order',
    delayClass: '',
  },
  {
    id: 'plan-pro',
    planParam: 'pro',
    titleFa: 'ادیت ویدیو + تایپوگرافی لیریک',
    titleEn: 'Video Edit + Lyric Typography',
    priceFa: 'از ۳۰۰٬۰۰۰ تومان',
    priceEn: 'From 300,000 Tomans',
    whoFa: 'ادیت کامل‌تر همراه با لیریک',
    whoEn: 'For complete video edits with lyric typography',
    isPopular: true,
    flagFa: 'محبوب‌ترین',
    flagEn: 'Most Popular',
    featuresFa: [
      'ادیت ویدیو + تایپوگرافی لیریک',
      'سینک متن با ریتم موزیک',
      'خروجی MP4 / 1080p / 30 FPS',
      'پروژه‌های سنگین‌تر: ۲ تا ۳ روز',
    ],
    featuresEn: [
      'Video editing + lyric typography',
      'Beat-synchronized lyric animation',
      'Output: MP4 / 1080p / 30 FPS',
      'Heavier projects: 2 to 3 days',
    ],
    ctaFa: 'شروع سفارش',
    ctaEn: 'Start order',
    delayClass: 'd1',
  },
  {
    id: 'plan-special',
    planParam: 'special',
    titleFa: 'پروژه ویژه',
    titleEn: 'Special Project',
    priceFa: 'از ۴۹۰٬۰۰۰ تومان',
    priceEn: 'From 490,000 Tomans',
    whoFa: 'کار کامل‌تر / موزیک‌ویدیو سبک / پروژه سفارشی',
    whoEn: 'Full releases / light music video / custom project',
    featuresFa: [
      'دامنه کار هماهنگ می‌شود قبل از شروع',
      'خروجی استاندارد انتشار',
      'زمان تحویل بسته به حجم کار (معمولاً ۲ تا ۳ روز)',
    ],
    featuresEn: [
      'Project scope agreed before start',
      'Industry standard release output',
      'Delivery based on scope (typically 2–3 days)',
    ],
    ctaFa: 'شروع سفارش',
    ctaEn: 'Start order',
    delayClass: 'd2',
  },
];

export const Pricing: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="price-sec" id="pricing" aria-label={isEn ? "Pricing" : "تعرفه‌ها"}>
      <div className="svc-header" style={{ marginBottom: '40px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Pricing" : "✦ تعرفه‌ها"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "Clear pricing" : "قیمت‌ها شفاف است"}
        </h2>
        <p className="lead rv d2">
          {isEn
            ? "Transparent pricing and straightforward deliverables for music artists and creators."
            : "تعرفه‌های شفاف و مشخص برای هنرمندان و تولیدکنندگان محتوای موسیقی."}
        </p>
      </div>

      <div className="price-grid">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`p-card ${plan.isPopular ? 'hot' : ''} rv ${plan.delayClass}`.trim()}
          >
            {plan.isPopular && (
              <span className="p-flag">
                {isEn ? plan.flagEn : plan.flagFa}
              </span>
            )}
            <h4>{isEn ? plan.titleEn : plan.titleFa}</h4>
            <p className="who">{isEn ? plan.whoEn : plan.whoFa}</p>
            <div className="p-amt">
              {isEn ? plan.priceEn : plan.priceFa}
            </div>
            <ul>
              {(isEn ? plan.featuresEn : plan.featuresFa).map((f, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              className={`pill ${plan.isPopular ? '' : 'ghost'}`.trim()}
              href={`./order.html?plan=${plan.planParam}`}
            >
              {isEn ? plan.ctaEn : plan.ctaFa}
            </a>
          </article>
        ))}
      </div>

      {/* Honest Notes */}
      <div className="price-notes rv d3">
        <p>
          {isEn ? (
            <>
              • Online collaboration for clients across Iran.<br />
              • Order directly via website form, Instagram, or Telegram.<br />
              • Final price starts from these rates and may vary slightly depending on track length and scope.
            </>
          ) : (
            <>
              • همکاری به‌صورت آنلاین است؛ ویژه مشتریان داخل ایران.<br />
              • ثبت سفارش از طریق فرم سایت، دایرکت اینستاگرام یا تلگرام.<br />
              • قیمت نهایی بعد از بررسی فایل/مدت آهنگ ممکن است کمی تغییر کند — تعرفه‌ها از این مبالغ شروع می‌شود.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
