import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, AudioLines, Smartphone, CalendarCheck, ShieldCheck } from 'lucide-react';

export interface DiffPillar {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

export const PILLARS: DiffPillar[] = [
  {
    id: 'diff-music-fit',
    icon: Sliders,
    titleFa: 'تایپوگرافی متناسب با ساختار موزیک',
    titleEn: 'Music-Centered Typography',
    descFa: 'متن لیریک صرفاً روی ویدیو چسبانده نمی‌شود؛ وزن فونت، جهت حرکت، فاصله حروف و نحوه ظاهر شدن کلمات بر اساس وکال و مود آهنگ تنظیم می‌شود.',
    descEn: 'Lyrics are never pasted generically onto video. Font weights, motion paths, and reveal pacing are tailored specifically to vocal delivery and track atmosphere.',
  },
  {
    id: 'diff-beat-sync',
    icon: AudioLines,
    titleFa: 'هماهنگی دیداری با ضرب‌های آهنگ',
    titleEn: 'Beat-Locked Visual Rhythm',
    descFa: 'کیک‌ها، اسنیرها، دراپ‌های بیس و سکوت‌های موزیک مستقیماً با تغییر کلمات و کات‌های تصویر قفل می‌شوند تا هماهنگی کامل حس شود.',
    descEn: 'Kicks, snares, 808 drops, and lyrical pauses align directly with kinetic typography cuts to sustain organic viewer retention on mobile.',
  },
  {
    id: 'diff-platform-safe',
    icon: Smartphone,
    titleFa: 'خروجی بهینه‌شده برای شبکه‌های اجتماعی',
    titleEn: 'Platform-Native 9:16 Optimization',
    descFa: 'خروجی استاندارد عمودی ۹:۱۶ با وضوح 1080p و ۳۰ فریم، با رعایت کامل Safe Zone ریلز تا کلمات زیر آیکون‌ها، کپشن و دکمه‌ها پنهان نشوند.',
    descEn: '1080p MP4 exports at 30 FPS engineered within Instagram Reels and TikTok safe zones, preventing typography from being obscured by UI overlays.',
  },
  {
    id: 'diff-workflow',
    icon: CalendarCheck,
    titleFa: 'فرآیند شفاف و مناسب ریلیزهای مستمر',
    titleEn: 'Transparent Turnaround & Recurring Releases',
    descFa: 'زمان‌بندی مشخص (۱ تا ۳ روز کاری بسته به نوع کار) با مرحله پیش‌نمایش قبل از خروجی نهایی، مناسب برای آرتیست‌هایی که تقویم انتشار فعال دارند.',
    descEn: 'Predictable 1–3 business day turnaround with preview approval before final render, well-suited for artists with active release calendars.',
  },
];

export const Differentiation: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section
      id="differentiation"
      className="diff-sec"
      aria-label={isEn ? "Why Artists Choose THEPOO7AN" : "چرا THEPOO7AN برای ریلیز موزیک؟"}
    >
      <div className="diff-header">
        <p className="eyebrow rv">
          <ShieldCheck size={14} className="inline-block" aria-hidden="true" />
          <b>{isEn ? "✦ Production Standards" : "✦ استاندارد تولید"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? (
            <>
              Why Artists Rely on <span className="chrome">THEPOO7AN</span> for Releases.
            </>
          ) : (
            <>
              تمرکز روی <span className="chrome">کیفیت واقعی خروجی</span>، بدون فرمول‌های تکراری.
            </>
          )}
        </h2>
        <p className="lead rv d2">
          {isEn
            ? "A specialized workflow built around musical timing, platform constraints, and predictable release deadlines."
            : "رعایت دقیق ریتم و ضرب‌های موسیقی در کنار تحویل فایل‌های استاندارد آماده انتشار در اینستاگرام و پلتفرم‌های ویدیویی."}
        </p>
      </div>

      <div className="diff-grid" role="region" aria-label={isEn ? "Production pillars" : "اصول تولید محتوا"}>
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.id} className={`diff-card rv d${(idx % 2) + 1}`}>
              <div className="diff-icon-box" aria-hidden="true">
                <Icon size={22} className="diff-icon" />
              </div>
              <div className="diff-content">
                <h3 className="diff-card-title">
                  {isEn ? pillar.titleEn : pillar.titleFa}
                </h3>
                <p className="diff-card-desc">
                  {isEn ? pillar.descEn : pillar.descFa}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Differentiation;
