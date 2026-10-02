import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const MobileTabBar: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['faq', 'pricing', 'portfolio'];
      const scrollY = window.scrollY + 250;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveTab(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 400) {
        setActiveTab('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="mobile-tabbar"
      aria-label={isEn ? "Mobile quick navigation" : "ناوبری سریع موبایل"}
    >
      {/* 1. Portfolio */}
      <a
        href="#portfolio"
        className={activeTab === 'portfolio' ? 'active text-primary' : ''}
        aria-label={isEn ? "Portfolio" : "نمونه‌کارها"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>{isEn ? "Portfolio" : "نمونه‌کارها"}</span>
      </a>

      {/* 2. Pricing */}
      <a
        href="#pricing"
        className={activeTab === 'pricing' ? 'active text-primary' : ''}
        aria-label={isEn ? "Pricing" : "تعرفه‌ها"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <span>{isEn ? "Pricing" : "تعرفه‌ها"}</span>
      </a>

      {/* 3. Primary CTA: Order */}
      <a
        href="./order.html"
        className="tab-primary"
        aria-label={isEn ? "Order Project" : "ثبت سفارش"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: 2.2 }}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <span style={{ fontWeight: 700 }}>{isEn ? "Order" : "ثبت سفارش"}</span>
      </a>

      {/* 4. FAQ */}
      <a
        href="#faq"
        className={activeTab === 'faq' ? 'active text-primary' : ''}
        aria-label={isEn ? "FAQ" : "سؤالات"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>{isEn ? "FAQ" : "سؤالات"}</span>
      </a>
    </nav>
  );
};

export default MobileTabBar;
