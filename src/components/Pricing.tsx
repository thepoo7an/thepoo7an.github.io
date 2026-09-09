import React from 'react';
import { Zap, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackOrderStarted } from '../utils/analytics';

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
      'تحویل معمولاً همان روز / حداکثر ۱ روز کاری (ساعت ۱۰ تا ۲۳)',
    ],
    featuresEn: [
      'Video ~15–20s with custom designed lyrics',
      'Output: MP4 / 1080p / 30 FPS',
      'Delivery usually same day / up to 1 business day (10 AM–11 PM)',
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
    id: 'plan-monthly',
    planParam: 'monthly',
    titleFa: 'پکیج ماهانه (۴ ریلز / ماه)',
    titleEn: 'Monthly Retainer (4 Reels/mo)',
    priceFa: 'از ۱٬۰۰۰٬۰۰۰ تومان',
    priceEn: 'From 1,000,000 Tomans',
    whoFa: 'آرتیست‌ها و آهنگسازان فعال در اینستاگرام',
    whoEn: 'Active music creators building ongoing reach',
    featuresFa: [
      '۴ ویدیوی ریلز کامل در طول یک ماه',
      'تایپوگرافی سینک شده + تمپلیت استایل اختصاصی',
      'اولویت رندر و تحویل سریع پروژه‌ها',
      'صرفه‌جویی اقتصادی نسبت به سفارش تک‌پست',
    ],
    featuresEn: [
      '4 full Reels videos delivered across the month',
      'Beat-synced lyrics + unique visual style guide',
      'Priority rendering & delivery turnaround',
      'Discounted bulk rate vs. single-video orders',
    ],
    ctaFa: 'رزرو پکیج ماهانه',
    ctaEn: 'Book monthly pack',
    delayClass: 'd2',
  },
  {
    id: 'plan-special',
    planParam: 'special',
    titleFa: 'پروژه ویژه و کاور آرت',
    titleEn: 'Special Project & Cover Art',
    priceFa: 'از ۴۹۰٬۰۰۰ تومان',
    priceEn: 'From 490,000 Tomans',
    whoFa: 'کار کامل‌تر / موزیک‌ویدیو سبک / پروژه سفارشی',
    whoEn: 'Full releases / light music video / custom project',
    featuresFa: [
      'دامنه کار هماهنگ می‌شود قبل از شروع',
      'خروجی استاندارد با کیفیت بالا آماده انتشار',
      'طراحی کاور آرت ۳۰۰۰×۳۰۰۰ پیکسل متناسب کانسپت',
      'زمان تحویل بسته به حجم کار (معمولاً ۲ تا ۳ روز)',
    ],
    featuresEn: [
      'Project scope agreed before start',
      'High-resolution final export ready for release',
      'High-res 3000x3000px Cover Art matched to concept',
      'Delivery based on scope (typically 2–3 days)',
    ],
    ctaFa: 'شروع سفارش',
    ctaEn: 'Start order',
    delayClass: 'd3',
  },
];

export const Pricing: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="price-sec" id="pricing" aria-label={isEn ? "Pricing" : "تعرفه‌ها"}>
      <div className="svc-header" style={{ marginBottom: '32px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Pricing & Plans" : "✦ تعرفه‌ها و پکیج‌ها"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "Clear, predictable pricing" : "قیمت‌ها شفاف و مشخص است"}
        </h2>
        <p className="lead rv d2">
          {isEn
            ? "Straightforward deliverables for music artists, producers, and creators with no hidden surprises."
            : "تعرفه‌های شفاف و خروجی استاندارد برای هنرمندان و تولیدکنندگان محتوای موسیقی."}
        </p>
      </div>

      {/* Express Delivery Callout Strip */}
      <div className="pricing-upsell-strip rv d1" style={{ maxWidth: '840px', margin: '0 auto 32px' }}>
        <div className="pricing-upsell-badge">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{isEn ? 'Express Rush Option (+50%)' : 'تحویل فوری اکسپرس (+۵۰٪)'}</span>
        </div>
        <p className="pricing-upsell-text">
          {isEn
            ? 'Need an urgent release under 24–48 hours? Rush delivery is available with +50% fee upon schedule availability.'
            : 'برای ریلیزهای فوری و زمان‌بندی‌های فشرده: تحویل فوری ۲۴ تا ۴۸ ساعته با هماهنگی و ۵۰٪ هزینه مازاد امکان‌پذیر است.'}
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
              onClick={() => {
                trackOrderStarted(plan.id, isEn ? plan.titleEn : plan.titleFa);
              }}
            >
              {isEn ? plan.ctaEn : plan.ctaFa}
            </a>
          </article>
        ))}
      </div>

      {/* Trust & Guarantee Highlights */}
      <div className="pricing-guarantee-strip rv d2" style={{ maxWidth: '840px', margin: '32px auto 0' }}>
        <div className="guarantee-item">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{isEn ? 'Max 2h response during working hours' : 'پاسخگویی حداکثر ۲ ساعته در ساعات کاری (۱۰ تا ۲۳)'}</span>
        </div>
        <div className="guarantee-item">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{isEn ? '1 revision round included' : '۱ دور اصلاحات و ادیت رایگان'}</span>
        </div>
        <div className="guarantee-item">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{isEn ? 'Master 1080p high bitrate export' : 'فایل مستر کیفیت بالا بدون افت رزولوشن'}</span>
        </div>
      </div>

      {/* Honest Notes */}
      <div className="price-notes rv d3">
        <p>
          {isEn ? (
            <>
              • Online collaboration for clients across Iran and global creators.<br />
              • Direct order via website form, Instagram (@thepoo7an), or Telegram.<br />
              • Final rate starts from these figures and is confirmed upfront before project kick-off.<br />
              • Cover artwork & identity: available standalone or bundled with reels.
            </>
          ) : (
            <>
              • همکاری به‌صورت آنلاین است؛ ویژه هنرمندان سراسر کشور و پروژه‌های بین‌المللی.<br />
              • ثبت سفارش مستقیم از طریق فرم سایت، دایرکت اینستاگرام یا تلگرام.<br />
              • قیمت نهایی قبل از شروع پروژه شفاف مشخص می‌شود و تغییری نخواهد داشت.<br />
              • طراحی کاور موزیک و پکیج‌های ماهانه با تخفیف ویژه همکاری تکرارشونده محاسبه می‌شوند.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
