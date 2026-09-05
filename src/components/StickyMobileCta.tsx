import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackContactClick } from '../utils/analytics';

export const StickyMobileCta: React.FC = () => {
  const { isEn } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show sticky CTA after scrolling past the hero primary actions (~280px)
      setIsVisible(window.scrollY > 280);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sticky-mobile-cta ${isVisible ? 'visible' : ''}`}
      role="region"
      aria-label={isEn ? "Quick actions" : "دسترسی سریع"}
    >
      <div className="sticky-cta-row">
        <a
          href="./order.html"
          className="sticky-cta-btn"
          onClick={() => trackContactClick('sticky_cta')}
        >
          <span>{isEn ? "Start Order" : "ثبت سفارش"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="https://t.me/thepoo7an"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-cta-tg"
          aria-label={isEn ? "Telegram message" : "ارسال پیام در تلگرام"}
          onClick={() => trackContactClick('telegram')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
          </svg>
          <span>{isEn ? "Telegram" : "تلگرام"}</span>
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCta;

