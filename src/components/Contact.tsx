import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { isEn } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
      }).catch(() => {});
    }
  };

  return (
    <section className="band" id="contact" aria-label={isEn ? "Contact & Order" : "ارتباط و ثبت سفارش"}>
      <h2 className="rv">
        {isEn ? (
          <>
            Start Your Project & <span className="chrome">Submit Details</span>
          </>
        ) : (
          <>
            شروع پروژه و <span className="chrome">ثبت سفارش</span>
          </>
        )}
      </h2>
      <p className="rv d1">
        {isEn
          ? "Fill out the project order form or reach out directly on Instagram / Telegram. For typography projects, providing your lyrics is preferred (extraction is also available). Concept and style are finalized before production."
          : "فرم ثبت سفارش را تکمیل کنید یا مستقیماً از طریق دایرکت اینستاگرام و تلگرام پیام دهید. در پروژه‌های لیریک، ارسال متن توسط شما اولویت دارد (استخراج لیریک نیز امکان‌پذیر است). کانسپت و سبک بصری پیش از شروع تولید هماهنگ می‌شود."}
      </p>
      <div className="cta-row rv d2">
        <a className="pill" href="./order.html">
          {isEn ? "Open Order Form" : "تکمیل فرم ثبت سفارش"}
        </a>
        <a className="tlink" href="https://instagram.com/thepoo7an" target="_blank" rel="noopener noreferrer">
          {isEn ? "Direct on Instagram" : "دایرکت اینستاگرام"}
          <svg viewBox="0 0 24 24" style={{ transform: isEn ? 'none' : 'scaleX(-1)' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div className="socials rv d3">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <a className="soc" href="https://instagram.com/thepoo7an" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            {isEn ? "Instagram" : "اینستاگرام"} <span className="ltr">@thepoo7an</span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy('@thepoo7an', 'ig')}
            aria-label={isEn ? "Copy Instagram handle" : "کپی آیدی اینستاگرام"}
            className="copy-btn"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '12px',
              color: copiedText === 'ig' ? '#10b981' : 'var(--muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copiedText === 'ig' ? (
              <span>✓ {isEn ? "Copied" : "کپی شد"}</span>
            ) : (
              <span>📋 {isEn ? "Copy" : "کپی آیدی"}</span>
            )}
          </button>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <a className="soc" href="https://t.me/thepoo7an" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M21 4L3 11.5l5.5 2L10 19l3-3.5 5 3.5z" />
            </svg>
            {isEn ? "Telegram" : "تلگرام"} <span className="ltr">@thepoo7an</span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy('@thepoo7an', 'tg')}
            aria-label={isEn ? "Copy Telegram handle" : "کپی آیدی تلگرام"}
            className="copy-btn"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '12px',
              color: copiedText === 'tg' ? '#10b981' : 'var(--muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copiedText === 'tg' ? (
              <span>✓ {isEn ? "Copied" : "کپی شد"}</span>
            ) : (
              <span>📋 {isEn ? "Copy" : "کپی آیدی"}</span>
            )}
          </button>
        </div>

        <a className="soc" href="mailto:thepoo7an@gmail.com">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3.5 7l8.5 6 8.5-6" />
          </svg>
          {isEn ? "Email" : "ایمیل"} <span className="ltr">thepoo7an@gmail.com</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
