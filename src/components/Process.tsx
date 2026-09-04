import React from 'react';
import { useLanguage } from '../context/LanguageContext';

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
    titleFa: 'ارسال فایل و ایده',
    titleEn: 'Send Track & Brief',
    descFa: 'ارسال فایل صوتی آهنگ، تعیین تایم‌کد یا بخش مورد نظر از ترانه (لیریک)، و ارسال رفرنس یا سلیقه بصری در تلگرام یا دایرکت.',
    descEn: 'Send the audio track, desired song snippet/lyrics, and any visual style references via Telegram or Direct.',
    highlightFa: 'هماهنگی بریف و سلیقه',
    highlightEn: 'Brief & Taste Alignment',
    iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
  },
  {
    id: 'step-2',
    stepNum: '02',
    tagFa: 'گام دوم',
    tagEn: 'Step 02',
    titleFa: 'پیش‌نمایش و تایید استایل',
    titleEn: 'Preview & Approval',
    descFa: 'طراحی اتود تایپوگرافی، انتخاب فونت، پالت رنگ و انیمیشن اولیه؛ جهت تایید کامل قبل از رندر نسخه نهایی ویدیویی.',
    descEn: 'Typography style draft, font choice, color palette, and motion test approved together before final rendering.',
    highlightFa: 'تایید بدون ریسک و ابهام',
    highlightEn: 'Zero-Risk Confirmation',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'step-3',
    stepNum: '03',
    tagFa: 'گام سوم',
    tagEn: 'Step 03',
    titleFa: 'تحویل نهایی ریلز ۱۰۸۰p',
    titleEn: 'Final 1080p Delivery',
    descFa: 'خروجی استاندارد ۹:۱۶ اینستاگرام با کیفیت ۱۰۸۰p، بیت‌سینک دقیق متن با ریتم موزیک و تحویل به‌موقع همراه با اصلاحیه سریع.',
    descEn: 'Standard 9:16 Instagram Reels format at 1080p, precise rhythm sync, and on-schedule delivery with prompt revisions.',
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
            ? "A transparent production workflow: alignment upfront, style confirmation, and on-time final delivery."
            : "روند شفاف و مستقیم تولید؛ هماهنگی سبک بصری پیش از شروع، بدون اتلاف وقت و با تایید مرحله‌به‌مرحله."}
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
    </section>
  );
};

export default Process;
