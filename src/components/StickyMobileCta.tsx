import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StickyMobileCta: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <div className="sticky-mobile-cta" role="region" aria-label={isEn ? "Quick order" : "سفارش سریع"}>
      <a href="/order.html" className="sticky-cta-btn">
        {isEn ? "Start Lyric Order" : "ثبت سفارش لیریک"}
      </a>
    </div>
  );
};

export default StickyMobileCta;
