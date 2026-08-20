import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <footer>
      <div className="f-cols">
        <a href="#services">{isEn ? "Services" : "خدمات"}</a>
        <a href="#contact">{isEn ? "Contact Me" : "ارتباط با من"}</a>
        <a href="https://instagram.com/thepoo7an" target="_blank" rel="noopener noreferrer">
          {isEn ? "Instagram" : "اینستاگرام"}
        </a>
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
