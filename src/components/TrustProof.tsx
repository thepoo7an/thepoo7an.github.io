import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Video, Eye, Clock, CheckCircle, Quote, Sparkles } from 'lucide-react';

interface MetricItem {
  id: string;
  value: string;
  labelFa: string;
  labelEn: string;
  descFa: string;
  descEn: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const METRICS: MetricItem[] = [
  {
    id: 'm-reels',
    value: '+۱۲۵',
    labelFa: 'ریلز موزیک تولیدشده',
    labelEn: 'Music Reels Produced',
    descFa: 'تایپوگرافی لیریک و ادیت ریتمیک',
    descEn: 'Lyric typography & beat-synced edits',
    icon: Video,
  },
  {
    id: 'm-views',
    value: '+۲.۲M',
    labelFa: 'ویو در شبکه‌های اجتماعی',
    labelEn: 'Total Social Views',
    descFa: 'بازدید ارگانیک جذب‌شده توسط آثار',
    descEn: 'Organic audience reach on social releases',
    icon: Eye,
  },
  {
    id: 'm-speed',
    value: '< ۲ ساعت',
    labelFa: 'میانگین زمان پاسخگویی',
    labelEn: 'Average Response Time',
    descFa: 'در ساعات کاری ۱۰ صبح تا ۱۱ شب',
    descEn: 'During business hours (10 AM–11 PM)',
    icon: Clock,
  },
  {
    id: 'm-delivery',
    value: '۱۰۰٪',
    labelFa: 'تحویل به‌موقع',
    labelEn: 'On-Time Delivery',
    descFa: 'پایبندی قطعی به ددلاین انتشار',
    descEn: 'Strict adherence to release deadlines',
    icon: CheckCircle,
  },
];

interface TestimonialItem {
  id: string;
  quoteFa: string;
  quoteEn: string;
  authorFa: string;
  authorEn: string;
  roleFa: string;
  roleEn: string;
  tagFa: string;
  tagEn: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quoteFa: 'پویان دمت گرم، دقیقاً همون فضا و افکتی که برای ریلز می‌خواستم دراومد. سینک لیریک با دراپ آهنگ فوق‌العاده تمیز بود و بازخورد ریلز عالی شد.',
    quoteEn: 'Pooyan nailed the exact mood and visual style I envisioned for the reel. The lyric sync on the beat drop was flawless, and post engagement was unmatched.',
    authorFa: 'آرتیست مستقل',
    authorEn: 'Independent Artist',
    roleFa: 'سفارش ریلز لیریک ویدیویی',
    roleEn: 'Lyric Typography Reel Client',
    tagFa: 'تایپوگرافی لیریک',
    tagEn: 'Lyric Typography',
  },
  {
    id: 't-2',
    quoteFa: 'سرعت تحویل واقعاً غافلگیرم کرد؛ عصر فایل رو فرستادم و آخر شب نسخه نهایی 1080p آماده انتشار بود. کیفیت بیت‌سینک و رنگ‌بندی عالی بدون نیاز به ادیت مجدد.',
    quoteEn: 'The delivery turnaround blew me away. Sent the audio track in the afternoon, received the final 1080p release video by midnight ready to publish.',
    authorFa: 'پرودیوسر و بیت‌ساز',
    authorEn: 'Music Producer',
    roleFa: 'ادیت ویدیو موزیک',
    roleEn: 'Music Video Edit Client',
    tagFa: 'تحویل سریع',
    tagEn: 'Fast Turnaround',
  },
  {
    id: 't-3',
    quoteFa: 'تایپوگرافی سه‌بعدی کروم که زدی کاملاً سطح موزیک رو تو اینستاگرام بالا برد. جزئیات فونت و حس دارک کار دقیقا با حال‌وهوای موزیک یکی بود.',
    quoteEn: 'The 3D chrome typography completely elevated the track on Instagram. The font styling and dark aesthetic perfectly captured the emotional vibe of the song.',
    authorFa: 'مدیر مارکتینگ ریلیز',
    authorEn: 'Release Marketing Lead',
    roleFa: 'کاور آرت و تیزر ریلیز',
    roleEn: 'Release Teaser & Cover Art',
    tagFa: 'استایل کروم',
    tagEn: 'Chrome Aesthetic',
  },
];

export const TrustProof: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="trust-sec" id="trust" aria-label={isEn ? "Social Proof and Trust" : "آمار واقعی و رضایت کلاینت‌ها"}>
      <div className="svc-header" style={{ marginBottom: '32px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Verified Track Record" : "✦ کارنامه کاری و آمار واقعی"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? (
            <>
              Over <span className="chrome">2.2 Million Views</span> Generated.
            </>
          ) : (
            <>
              بیش از <span className="chrome">۲.۲ میلیون ویو</span> برای آثار موسیقی.
            </>
          )}
        </h2>
        <p className="lead rv d2">
          {isEn
            ? "Visuals crafted with precision for Persian and international music releases — designed to convert listeners into loyal fans."
            : "محتوای بصری ساخته‌شده برای آرتیست‌ها به بیش از ۲.۲ میلیون ویو در شبکه‌های اجتماعی رسیده است؛ تمرکز ما تبدیل شنونده به مخاطب وفادار است."}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid rv d2" role="region" aria-label={isEn ? "Key Statistics" : "شاخص‌های کلیدی عملکرد"}>
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="metric-card">
              <div className="metric-icon-wrap" aria-hidden="true">
                <Icon size={20} className="metric-icon" />
              </div>
              <div className="metric-num ltr">{metric.value}</div>
              <div className="metric-title">{isEn ? metric.labelEn : metric.labelFa}</div>
              <div className="metric-desc">{isEn ? metric.descEn : metric.descFa}</div>
            </div>
          );
        })}
      </div>

      {/* Testimonials Strip */}
      <div className="testimonials-wrap rv d3">
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <Sparkles size={14} aria-hidden="true" />
            <span>{isEn ? "Direct Client Feedback" : "رضایت و پیام‌های کلاینت‌ها"}</span>
          </div>
          <p className="testimonials-sub">
            {isEn
              ? "Honest reactions from music artists, producers, and release teams upon receiving their deliverables."
              : "بازخورد مستقیم هنرمندان، آهنگسازان و مدیران پخش پس از دریافت خروجی نهایی پروژه."}
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className="testimonial-card">
              <div className="t-card-top">
                <span className="t-tag">{isEn ? item.tagEn : item.tagFa}</span>
                <Quote size={18} className="t-quote-icon" aria-hidden="true" />
              </div>
              <p className="t-quote-text">
                «{isEn ? item.quoteEn : item.quoteFa}»
              </p>
              <div className="t-author-wrap">
                <div className="t-author-avatar" aria-hidden="true">
                  <span>{item.authorFa.slice(0, 1)}</span>
                </div>
                <div className="t-author-info">
                  <span className="t-author-name">{isEn ? item.authorEn : item.authorFa}</span>
                  <span className="t-author-role">{isEn ? item.roleEn : item.roleFa}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustProof;
