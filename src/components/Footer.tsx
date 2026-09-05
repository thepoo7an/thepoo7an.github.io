import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackContactClick } from '../utils/analytics';

export const Footer: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <footer>
      <div className="f-main-row">
        <nav className="f-cols" aria-label={isEn ? "Footer Navigation" : "ناوبری پاورقی"}>
          <a href="#work">{isEn ? "Work" : "نمونه‌کارها"}</a>
          <a href="#services">{isEn ? "Services" : "خدمات"}</a>
          <a href="#pricing">{isEn ? "Pricing" : "تعرفه‌ها"}</a>
          <a href="#faq">{isEn ? "FAQ" : "سؤالات پرتکرار"}</a>
          <a href="#contact">{isEn ? "Contact Me" : "ارتباط با من"}</a>
        </nav>

        <div className="f-socials" aria-label={isEn ? "Social Quick Links" : "لینک‌های سریع شبکه‌های ارتباطی"}>
          <a
            href="https://instagram.com/thepoo7an"
            target="_blank"
            rel="noopener noreferrer"
            className="f-social-link"
            aria-label={isEn ? "Instagram: @thepoo7an" : "اینستاگرام: thepoo7an@"}
            title={isEn ? "Instagram: @thepoo7an" : "اینستاگرام: thepoo7an@"}
            onClick={() => trackContactClick('instagram')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            <span className="ltr">@thepoo7an</span>
          </a>

          <a
            href="https://t.me/thepoo7an"
            target="_blank"
            rel="noopener noreferrer"
            className="f-social-link"
            aria-label={isEn ? "Telegram: @thepoo7an" : "تلگرام: thepoo7an@"}
            title={isEn ? "Telegram: @thepoo7an" : "تلگرام: thepoo7an@"}
            onClick={() => trackContactClick('telegram')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
            <span className="ltr">Telegram</span>
          </a>
        </div>
      </div>

      <div className="f-legal">
        <span>
          {isEn
            ? "© 2026 — All rights reserved for @thepoo7an."
            : "© ۱۴۰۵ — تمام حقوق برای پیج thepoo7an محفوظ است."}
        </span>
        <span className="ltr">THEPOO7AN — Lyric Typography & Video Content for Music</span>
      </div>
    </footer>
  );
};

export default Footer;
