import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PreFlightChecklist } from './PreFlightChecklist';

interface ProcessStep {
  id: string;
  stepNum: string;
  tagFa: string;
  tagEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  highlightFa: string;
  highlightEn: string;
  iconPath: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    stepNum: '01',
    tagFa: 'گام اول',
    tagEn: 'Step 01',
    titleFa: 'ارسال فایل و هماهنگی بریف',
    titleEn: 'Send Track & Brief',
    descFa: 'ارسال فایل صوتی، مشخص کردن تایم‌کد لیریک، و هماهنگی کامل سلیقه و سبک بصری در تلگرام یا دایرکت پیش از شروع.',
    descEn: 'Send the audio track, specify lyric timestamps, and align visual style preferences upfront via Telegram or Direct.',
    highlightFa: 'هماهنگی بریف و سلیقه',
    highlightEn: 'Brief & Style Alignment',
    iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
  },
  {
    id: 'step-2',
    stepNum: '02',
    tagFa: 'گام دوم',
    tagEn: 'Step 02',
    titleFa: 'طراحی اختصاصی و متحرک‌سازی',
    titleEn: 'Custom Design & Animation',
    descFa: 'انتخاب فونت و زبان بصری متناسب با موزیک، ساخت انیمیشن حروف و کلمات و بیت‌سینک دقیق متن با ریتم آهنگ بر اساس بریف.',
    descEn: 'Custom font pairing matching the music mood, kinetic typography animation, and beat-syncing following the agreed brief.',
    highlightFa: 'اجرای دقیق بر اساس بریف',
    highlightEn: 'Precision Craftsmanship',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'step-3',
    stepNum: '03',
    tagFa: 'گام سوم',
    tagEn: 'Step 03',
    titleFa: 'تحویل نهایی ریلز ۱۰۸۰p',
    titleEn: 'Final 1080p Delivery',
    descFa: 'خروجی استاندارد ۹:۱۶ اینستاگرام با کیفیت ۱۰۸۰p، رنگ‌بندی شفاف، بیت‌سینک بدون نقص و تحویل سریع و به‌موقع.',
    descEn: 'Standard 9:16 Instagram Reels format at 1080p, crisp visuals, flawless beat synchronization, and on-schedule delivery.',
    highlightFa: 'آماده انتشار در اینستاگرام',
    highlightEn: 'Instagram-Ready Export',
    iconPath: 'M5 13l4 4L19 7',
  },
];

export const Process: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="process-sec" id="process" aria-label={isEn ? "How We Work" : "مراحل همکاری"}>
      <div className="process-header">
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Collaboration Process" : "✦ مراحل همکاری"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "From Brief to Final Video in 3 Steps" : "مسیر همکاری در ۳ گام مشخص"}
        </h2>
        <p className="process-sub rv d2">
          {isEn
            ? "A transparent production workflow: upfront brief alignment, precise crafting, and on-time final delivery."
            : "روند شفاف و مستقیم تولید؛ هماهنگی سبک بصری و بریف پیش از شروع، بدون اتلاف وقت و تحویل استاندارد."}
        </p>
      </div>

      <div className="process-grid">
        {PROCESS_STEPS.map((step, idx) => (
          <article
            key={step.id}
            className={`process-card rv ${idx === 0 ? '' : `d${idx}`}`}
          >
            <div className="process-card-top">
              <div className="process-badge">
                <span className="process-badge-tag">{isEn ? step.tagEn : step.tagFa}</span>
              </div>
              <span className="process-num" aria-hidden="true">{step.stepNum}</span>
            </div>

            <h3 className="process-title">
              {isEn ? step.titleEn : step.titleFa}
            </h3>

            <p className="process-desc">
              {isEn ? step.descEn : step.descFa}
            </p>

            <div className="process-footer">
              <div className="process-pill">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={step.iconPath} />
                </svg>
                <span>{isEn ? step.highlightEn : step.highlightFa}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Client Pre-Flight Checklist (Items needed before ordering) */}
      <PreFlightChecklist />
    </section>
  );
};

export default Process;
