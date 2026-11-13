import React, { useState, useEffect } from 'react';
import { Play, Tag, PenLine, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MobileTabBar: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['faq', 'pricing', 'portfolio'];
      const scrollY = window.scrollY + 260;

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
      if (window.scrollY < 360) {
        setActiveTab('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 items-center bg-card/92 backdrop-blur-xl border-t border-border px-2 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom,0px))]"
      aria-label={isEn ? 'Mobile quick navigation' : 'ناوبری سریع موبایل'}
    >
      <a
        href="#portfolio"
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-[11px] font-medium transition-colors active:scale-95 ${
          activeTab === 'portfolio' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Play className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Works' : 'نمونه‌کارها'}</span>
      </a>

      <a
        href="#pricing"
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-[11px] font-medium transition-colors active:scale-95 ${
          activeTab === 'pricing' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Tag className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Pricing' : 'تعرفه‌ها'}</span>
      </a>

      <a
        href="./order.html"
        className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-[11px] font-bold shadow-token-sm transition-transform active:scale-95 mx-1"
      >
        <PenLine className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Order' : 'ثبت سفارش'}</span>
      </a>

      <a
        href="#faq"
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-[11px] font-medium transition-colors active:scale-95 ${
          activeTab === 'faq' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <HelpCircle className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'FAQ' : 'سؤالات'}</span>
      </a>
    </nav>
  );
};

export default MobileTabBar;
