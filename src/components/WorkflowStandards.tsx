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
    titleFa: 'بیت‌سینک دقیق و انیمیشن متناسب با ریتم',
    titleEn: 'Beat-Synced Motion & Rhythm Timing',
    descFa: 'تایمینگ دقیق متن و انیمیشن کلمات هماهنگ با ضرب‌آهنگ، بیس، کیک‌ها و دراپ‌های موزیک جهت ایجاد ریتم بصری جذاب در ریلز.',
    descEn: 'Precise typography timing and motion pacing aligned with track tempo, drops, and kicks to support viewer retention on Reels.',
    tagFa: 'بیت‌سینک دقیق متن و انیمیشن با ریتم موزیک',
    tagEn: 'Beat-Synced Motion & Rhythm',
  },
  {
    id: 'standard-reels-export',
    titleFa: 'خروجی استاندارد ریلز با تنظیمات بهینه ۱۰۸۰p',
    titleEn: 'Standard 1080p Export Configured for Reels',
    descFa: 'خروجی عمودی (9:16) با بیت‌ریت و فرمت استاندارد متناسب با پردازش اینستاگرام، جهت حفظ وضوح نوشته‌ها و جلوگیری از افت کیفیت.',
    descEn: 'Vertical 9:16 export rendered with balanced bitrates and encoding to preserve typography crispness through platform compression.',
    tagFa: 'خروجی استاندارد ۱۰۸۰p ریلز',
    tagEn: 'Standard 1080p Video Export',
  },
  {
    id: 'standard-direct-access',
    titleFa: 'ارتباط مستقیم، پیش‌نمایش و ۱ مرحله اصلاح جزئی',
    titleEn: 'Direct Communication, Draft Preview & Revisions',
    descFa: 'هماهنگی مستقیم با خود ادیتور در تلگرام؛ ارسال نسخه پیش‌نمایش پیش از خروجی نهایی، همراه با ۱ مرحله ادیت و اصلاح جزئی تایمینگ یا متن.',
    descEn: 'Direct collaboration via Telegram with a draft preview provided before final delivery, including 1 round of timing or text adjustment.',
    tagFa: '۱ مرحله اصلاح جزئی تایمینگ و متن',
    tagEn: '1 Round of Timing / Text Adjustment',
  },
];

export const WorkflowStandards: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section
      className="standards-sec"
      id="standards"
      aria-label={isEn ? 'Quality standards & workflow commitments' : 'تضمین کیفیت و استانداردهای همکاری'}
    >
      {/* Backward-compatibility anchor for legacy #testimonials links */}
      <span id="testimonials" className="sr-only" aria-hidden="true" />

      <div className="svc-header" style={{ marginBottom: '36px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? '✦ WHY CHOOSE THEPOO7AN' : '✦ استانداردهای همکاری'}</b>
        </p>
        <h2 className="rv d1">{isEn ? 'Why Artists Choose THEPOO7AN' : 'چرا آرتیست‌ها THEPOO7AN را انتخاب می‌کنند؟'}</h2>
        <p className="lead rv d2">
          {isEn
            ? 'Production standards focused on rhythmic precision, clean typography presentation, and transparent direct communication.'
            : 'تعهد به بیت‌سینک دقیق با ریتم موزیک، خروجی شفاف ۱۰۸۰p، زمان‌بندی مشخص و ارتباط مستقیم بدون واسطه.'}
        </p>
      </div>

      {/* Workflow Stats / Highlights */}
      <div className="standards-stats rv d2">
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
            <span className="stat-label">{isEn ? 'Optimized for Instagram Reels & TikTok' : 'تنظیمات استاندارد ریلز بدون افت کیفیت'}</span>
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
      <div className="standards-grid">
        {WORKFLOW_STANDARDS.map((item, idx) => (
          <div key={item.id} className={`standard-card rv ${idx === 0 ? '' : `d${idx}`}`}>
            <div className="standard-icon" aria-hidden="true">
              {idx === 0 && <Zap className="w-5 h-5 text-blue-400" />}
              {idx === 1 && <Sparkles className="w-5 h-5 text-amber-300" />}
              {idx === 2 && <SlidersHorizontal className="w-5 h-5 text-emerald-400" />}
            </div>
            <h3 className="standard-title">
              {isEn ? item.titleEn : item.titleFa}
            </h3>
            <p className="standard-desc">
              {isEn ? item.descEn : item.descFa}
            </p>
            <div className="standard-footer">
              <div className="standard-tag">
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

export default WorkflowStandards;
