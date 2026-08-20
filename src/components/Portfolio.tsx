import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Portfolio: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <>
      {/* ===== Process & Highlights ===== */}
      <section className="statement" id="highlights">
        <h2 className="rv">
          {isEn ? (
            <>
              Every track deserves a strong visual impact.<br />
              <span className="dim">Fast turnaround. Verified outputs.</span>
            </>
          ) : (
            <>
              هر قطعه موسیقی شایسته حضور بصری قوی است.<br />
              <span className="dim">تحویل سریع و خروجی استاندارد.</span>
            </>
          )}
        </h2>
      </section>

      <div className="feat-row">
        <div className="feat rv">
          <svg viewBox="0 0 24 24">
            <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
          </svg>
          <b>{isEn ? "Beat & Transient Sync" : "سینک دقیق با ضرب موزیک"}</b>
          <span>
            {isEn
              ? "Typography motion locked to vocal timing, beat drops, and energy shifts."
              : "هماهنگی دقیق انیمیشن متن با ضرب‌آهنگ، بیس و کلمات وکال."}
          </span>
        </div>
        <div className="feat rv d1">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <b>{isEn ? "1080p 30 FPS MP4" : "خروجی 1080p ۳۰ فریم"}</b>
          <span>
            {isEn
              ? "Standard high-definition video export ready for Instagram Reels upload."
              : "فرمت استاندارد MP4 با رزولوشن 1080p مناسب برای ریلز اینستاگرام."}
          </span>
        </div>
        <div className="feat rv d2">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <b>{isEn ? "1 to 3 Days Turnaround" : "تحویل ۱ تا ۳ روزه"}</b>
          <span>
            {isEn
              ? "1 day for lyric typography, 2–3 days for video editing & typography."
              : "۱ روز برای تایپوگرافی لیریک؛ ۲ الی ۳ روز برای ادیت ویدیو و لیریک."}
          </span>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

