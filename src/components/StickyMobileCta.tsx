import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';
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
          {isEn ? (
            <ArrowRight size={16} aria-hidden="true" />
          ) : (
            <ArrowLeft size={16} aria-hidden="true" />
          )}
        </a>
        <a
          href="https://t.me/thepoo7an"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-cta-tg"
          aria-label={isEn ? "Telegram message" : "ارسال پیام در تلگرام"}
          onClick={() => trackContactClick('telegram')}
        >
          <Send size={15} aria-hidden="true" />
          <span>{isEn ? "Telegram" : "تلگرام"}</span>
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCta;

