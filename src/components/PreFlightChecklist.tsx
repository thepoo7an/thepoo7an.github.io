import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileAudio, FileText, Video, Palette, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export interface PreFlightItem {
  id: string;
  stepNum: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  specFa: string;
  specEn: string;
}

export const PREFLIGHT_ITEMS: PreFlightItem[] = [
  {
    id: 'preflight-audio',
    stepNum: '01',
    icon: FileAudio,
    titleFa: 'فایل صوتی باکیفیت',
    titleEn: 'High-Quality Master Audio',
    descFa: 'فایل نهایی مستر شده ترک برای استخراج دقیق ضرب‌ها و ریتم وکال.',
    descEn: 'Final mastered audio file to extract precise transient beats and vocal rhythm.',
    specFa: 'فرمت WAV یا MP3 با بیت‌ریت ۳۲۰kbps',
    specEn: 'WAV format preferred or 320kbps MP3',
  },
  {
    id: 'preflight-lyrics',
    stepNum: '02',
    icon: FileText,
    titleFa: 'متن تایپ‌شده + بازه ثانیه‌ای',
    titleEn: 'Accurate Lyrics & Timecode',
    descFa: 'متن دقیق ترانه (بدون غلط املایی) به همراه بازه ثانیه‌ای دلخواه برای ریلز.',
    descEn: 'Exact lyrics with correct spelling, plus the target timestamp range for the reel.',
    specFa: 'مثال: از ثانیه ۰۰:۴۵ تا ۰۱:۱۵ (۱۵ تا ۳۰ ثانیه)',
    specEn: 'e.g. 00:45 to 01:15 (15–30s window)',
  },
  {
    id: 'preflight-footage',
    stepNum: '03',
    icon: Video,
    titleFa: 'فوتیج یا راش ویدیو (پکیج Pro)',
    titleEn: 'Footage or B-Roll (Pro Package)',
    descFa: 'در صورت انتخاب پکیج ادیت ویدیو، فایل‌های شات، بک‌استیج یا راش‌های ویدیویی.',
    descEn: 'If selecting video editing, provide your performance footage, b-roll, or background shots.',
    specFa: 'کیفیت 1080p عمودی (۹:۱۶) یا افقی',
    specEn: '1080p vertical (9:16) or horizontal footage',
  },
  {
    id: 'preflight-style',
    stepNum: '04',
    icon: Palette,
    titleFa: 'سبک بصری انتخابی',
    titleEn: 'Visual Art Direction',
    descFa: 'انتخاب جهت بصری دلخواه از بخش سبک‌ها متناسب با فضا و ژانر موسیقی شما.',
    descEn: 'Preferred visual aesthetic selected from the Style Gallery matching your track genre.',
    specFa: 'کروم ۳D، دارک ابسیدین، مینیمال، سینمایی یا ...',
    specEn: '3D Chrome, Dark Obsidian, Minimal, Cinematic',
  },
];

export const PreFlightChecklist: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <div className="preflight-wrap rv" role="region" aria-label={isEn ? "Pre-order preparation checklist" : "چک‌لیست اقلام قبل از سفارش"}>
      <div className="preflight-card">
        <div className="preflight-header">
          <div className="preflight-header-text">
            <span className="preflight-tag">
              <CheckCircle size={13} aria-hidden="true" />
              {isEn ? "PRE-FLIGHT READINESS" : "آمادگی قبل از شروع"}
            </span>
            <h3 className="preflight-title">
              {isEn
                ? "What to Prepare Before Placing Your Order"
                : "قبل از ثبت سفارش، چه چیزهایی لازم است؟"}
            </h3>
            <p className="preflight-desc">
              {isEn
                ? "Having these 4 items ready ensures zero production delays and immediate workflow kick-off."
                : "با آماده داشتن این ۴ مورد، هماهنگی بریف در کمترین زمان انجام شده و پروژه بلافاصله وارد فاز انیمیشن می‌شود."}
            </p>
          </div>

          <a href="./order.html" className="preflight-cta-btn">
            <span>{isEn ? "Ready to Order" : "ثبت مستقیم سفارش"}</span>
            {isEn ? <ArrowRight size={15} aria-hidden="true" /> : <ArrowLeft size={15} aria-hidden="true" />}
          </a>
        </div>

        {/* 4-Item Grid */}
        <div className="preflight-grid">
          {PREFLIGHT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="preflight-item">
                <div className="preflight-item-top">
                  <div className="preflight-item-icon" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <span className="preflight-num" aria-hidden="true">{item.stepNum}</span>
                </div>
                <h4 className="preflight-item-title">
                  {isEn ? item.titleEn : item.titleFa}
                </h4>
                <p className="preflight-item-desc">
                  {isEn ? item.descEn : item.descFa}
                </p>
                <div className="preflight-spec-pill">
                  <span>{isEn ? item.specEn : item.specFa}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to deliver large files note */}
        <div className="preflight-note">
          <div className="preflight-note-icon" aria-hidden="true">💡</div>
          <p className="preflight-note-text">
            {isEn ? (
              <>
                <b>Large File Delivery:</b> Audio and heavy video files can be sent directly via <b>Telegram (@thepoo7an)</b>, Google Drive, Dropbox, or WeTransfer links when placing your order.
              </>
            ) : (
              <>
                <b>ارسال فایل‌های حجیم:</b> نیازی به فشرده‌سازی آسیب‌زننده نیست؛ فایل‌های صوتی و ویدیویی را می‌توانید از طریق <b>تلگرام مستقیم (@thepoo7an)</b>، لینک گوگل درایو یا دراپ‌باکس در فرم سفارش تحویل دهید.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreFlightChecklist;
