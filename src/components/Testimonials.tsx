import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Clock, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quoteFa: string;
  quoteEn: string;
  authorFa: string;
  authorEn: string;
  roleFa: string;
  roleEn: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quoteFa: 'دقت بالا توی سینک شدن فونت با ریتم و دراپ‌های آهنگ و تایپوگرافی متناسب با اتمسفر موزیک فراتر از انتظار بود.',
    quoteEn: 'The precise synchronization with the rhythm and beat drops, along with typography matching the track vibe, was exceptional.',
    authorFa: 'همکاری ریلز سینگل‌ترک',
    authorEn: 'Single Track Reel Collaboration',
    roleFa: 'آرتیست مستقل',
    roleEn: 'Independent Artist',
  },
  {
    id: 'test-2',
    quoteFa: 'تحویل سریع در کمتر از ۲۴ ساعت، خروجی شفاف ۱۰۸۰ بدون افت کیفیت در ریلز اینستاگرام و ارتباط مستقیم و راحت.',
    quoteEn: 'Fast turnaround in under 24 hours with razor-sharp 1080p export optimized for Instagram Reels and direct communication.',
    authorFa: 'پروژه تیزر موزیک',
    authorEn: 'Music Teaser Project',
    roleFa: 'موزیک پرودیوسر و تنظیم‌کننده',
    roleEn: 'Music Producer & Arranger',
  },
  {
    id: 'test-3',
    quoteFa: 'کانسپت کروم و افکت‌های موشن دقیقاً همون هویت بصری مدرنی رو ساخت که برای تیزر آلبوم احتیاج داشتیم.',
    quoteEn: 'The chrome aesthetic and restrained kinetic effects created the exact modern visual identity required for the release.',
    authorFa: 'تایپوگرافی کروم و موشن',
    authorEn: 'Chrome Motion & Typography',
    roleFa: 'خواننده و تولیدکننده کانتنت',
    roleEn: 'Singer & Content Creator',
  },
];

export const Testimonials: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="testimonials-sec" id="testimonials" aria-label={isEn ? 'Client experience & trust' : 'تجربه همکاری و تضمین کیفیت'}>
      <div className="svc-header" style={{ marginBottom: '36px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? '✦ TRUST & STANDARDS' : '✦ تضمین کیفیت و تعهد همکاری'}</b>
        </p>
        <h2 className="rv d1">{isEn ? 'Client Experience & Workflow Standards' : 'تجربه همکاری و استانداردهای تحویل'}</h2>
        <p className="lead rv d2">
          {isEn
            ? 'Commitment to frame-accurate rhythm sync, crisp 1080p vertical video exports, and fast turnaround.'
            : 'تعهد به بیت‌سینک دقیق، خروجی شفاف و استاندارد ریلز و تحویل سریع با هماهنگی مستقیم آنلاین.'}
        </p>
      </div>

      {/* Verified Workflow Standards / Key Highlights */}
      <div className="testimonials-stats rv d2">
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">
            <Clock className="w-5 h-5 text-neutral-300" />
          </div>
          <div className="stat-content">
            <span className="stat-num">{isEn ? '1–3 Days' : '۱ تا ۳ روز کاری'}</span>
            <span className="stat-label">{isEn ? 'Fast turnaround (often same-day)' : 'تحویل سریع (معمولاً همان روز)'}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">
            <Sparkles className="w-5 h-5 text-neutral-300" />
          </div>
          <div className="stat-content">
            <span className="stat-num">{isEn ? '1080p / 30FPS' : '۱۰۸۰p / بیت‌سینک'}</span>
            <span className="stat-label">{isEn ? 'Optimized for Instagram Reels & TikTok' : 'بهینه‌سازی شده برای ریلز بدون افت کیفیت'}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">
            <ShieldCheck className="w-5 h-5 text-neutral-300" />
          </div>
          <div className="stat-content">
            <span className="stat-num">{isEn ? '10:00 – 23:00' : '۱۰ صبح تا ۲۳ شب'}</span>
            <span className="stat-label">{isEn ? 'Direct support via Telegram & Instagram' : 'پاسخگویی آنلاین در تلگرام و اینستاگرام'}</span>
          </div>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="testimonials-grid">
        {TESTIMONIALS.map((item, idx) => (
          <div key={item.id} className={`testimonial-card rv ${idx === 0 ? '' : `d${idx}`}`}>
            <div className="testimonial-quote-icon" aria-hidden="true">
              <Quote className="w-5 h-5" />
            </div>
            <p className="testimonial-text">
              &ldquo;{isEn ? item.quoteEn : item.quoteFa}&rdquo;
            </p>
            <div className="testimonial-footer">
              <div className="testimonial-author">
                <span className="author-name">{isEn ? item.authorEn : item.authorFa}</span>
                <span className="author-role">{isEn ? item.roleEn : item.roleFa}</span>
              </div>
              <div className="testimonial-verified">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? 'Verified project' : 'پروژه تاییدشده'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
