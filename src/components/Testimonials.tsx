import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, CheckCircle2, ShieldCheck, Sparkles, Zap, SlidersHorizontal } from 'lucide-react';

export interface WorkflowStandardItem {
  id: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  tagFa: string;
  tagEn: string;
}

export const WORKFLOW_STANDARDS: WorkflowStandardItem[] = [
  {
    id: 'standard-beat-sync',
    titleFa: 'بیت‌سینک فریم به فریم و انیمیشن ریتمیک',
    titleEn: 'Frame-Accurate Beat Sync & Kinetic Motion',
    descFa: 'تایمینگ میلی‌ثانیه‌ای متن و متحرک‌سازی کلمات دقیقاً منطبق بر ضرب‌آهنگ، دراپ‌ها، بیس و کیک‌های موزیک؛ برای خلق گیرایی بصری در ۳ ثانیه اول ریلز.',
    descEn: 'Millisecond-accurate typography timing and word animations aligned with track tempo, beat drops, and kicks to maximize retention on Reels.',
    tagFa: 'سینک دقیق با دراپ و ریتم',
    tagEn: '100% Rhythm Synchronized',
  },
  {
    id: 'standard-reels-export',
    titleFa: 'خروجی اختصاصی ریلز بدون افت کیفیت',
    titleEn: 'Optimized 1080p Export for Instagram',
    descFa: 'خروجی استاندارد عمودی (9:16) با بیت‌ریت و کدک تنظیم‌شده برای الگوریتم‌های فشرده‌سازی اینستاگرام، تا ویدیو در اکسپلور دچار تاری یا پیکسل‌شدن نشود.',
    descEn: 'Vertical 9:16 render with tailored bitrate and encoding to bypass heavy Instagram compression and keep text razor-sharp in Explore.',
    tagFa: 'کیفیت شفاف 1080p ریلز',
    tagEn: 'Razor-Sharp 1080p',
  },
  {
    id: 'standard-direct-access',
    titleFa: 'ارتباط مستقیم، پیش‌نمایش و اصلاح جزئی',
    titleEn: 'Direct Access, Draft Preview & Revisions',
    descFa: 'هماهنگی مستقیم با خود طراح در تلگرام؛ ارائه نسخه پیش‌نمایش (Preview) برای بازبینی، همراه با ۱ مرحله اصلاح جزئی تایمینگ یا متن پیش از تسویه نهایی.',
    descEn: 'Direct 1-on-1 collaboration via Telegram; draft preview provided before final delivery with 1 round of fine-tuning revisions included.',
    tagFa: '۱ مرحله اصلاح جزئی تضمینی',
    tagEn: '1 Revision Round Included',
  },
];

export const Testimonials: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="testimonials-sec" id="testimonials" aria-label={isEn ? 'Quality standards & client trust' : 'تضمین کیفیت و استانداردهای همکاری'}>
      <div className="svc-header" style={{ marginBottom: '36px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? '✦ WHY CHOOSE THEPOO7AN' : '✦ استانداردهای همکاری'}</b>
        </p>
        <h2 className="rv d1">{isEn ? 'Why Artists Choose THEPOO7AN' : 'چرا آرتیست‌ها THEPOO7AN را انتخاب می‌کنند؟'}</h2>
        <p className="lead rv d2">
          {isEn
            ? 'Production standards built around music rhythm, maximum visual clarity, and transparent direct communication.'
            : 'تعهد به بیت‌سینک دقیق، خروجی شفاف و استاندارد ریلز، تحویل سریع و هماهنگی مستقیم و بدون واسطه.'}
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

      {/* Standards & Value Pillars */}
      <div className="testimonials-grid">
        {WORKFLOW_STANDARDS.map((item, idx) => (
          <div key={item.id} className={`testimonial-card rv ${idx === 0 ? '' : `d${idx}`}`}>
            <div className="testimonial-quote-icon" aria-hidden="true">
              {idx === 0 && <Zap className="w-5 h-5 text-blue-400" />}
              {idx === 1 && <Sparkles className="w-5 h-5 text-amber-300" />}
              {idx === 2 && <SlidersHorizontal className="w-5 h-5 text-emerald-400" />}
            </div>
            <h3 className="author-name" style={{ fontSize: '16px', marginBottom: '10px' }}>
              {isEn ? item.titleEn : item.titleFa}
            </h3>
            <p className="testimonial-text">
              {isEn ? item.descEn : item.descFa}
            </p>
            <div className="testimonial-footer">
              <div className="testimonial-verified">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? item.tagEn : item.tagFa}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
