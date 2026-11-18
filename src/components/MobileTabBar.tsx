import React from 'react';
import { Play, Sparkles, Tag, PenLine, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useActiveSection } from '../hooks/useActiveSection';

export const MobileTabBar: React.FC = () => {
  const { isEn } = useLanguage();
  const activeSection = useActiveSection();

  const isPortfolioActive = activeSection === 'portfolio';
  const isServicesActive =
    activeSection === 'services' || activeSection === 'workflow';
  const isPricingActive = activeSection === 'pricing';
  const isFaqActive = activeSection === 'faq';

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-5 items-center bg-card/92 backdrop-blur-xl border-t border-border px-1 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom,0px))]"
      aria-label={isEn ? 'Mobile quick navigation' : 'ناوبری سریع موبایل'}
    >
      <a
        href="#portfolio"
        aria-current={isPortfolioActive ? 'location' : undefined}
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-xs font-medium transition-colors active:scale-95 ${
          isPortfolioActive
            ? 'text-primary font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Play className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Works' : 'آثار'}</span>
      </a>

      <a
        href="#services"
        aria-current={isServicesActive ? 'location' : undefined}
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-xs font-medium transition-colors active:scale-95 ${
          isServicesActive
            ? 'text-primary font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Sparkles className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Services' : 'خدمات'}</span>
      </a>

      <a
        href="./order.html"
        className="flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-token-sm transition-transform active:scale-95 mx-0.5"
      >
        <PenLine className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Order' : 'سفارش'}</span>
      </a>

      <a
        href="#pricing"
        aria-current={isPricingActive ? 'location' : undefined}
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-xs font-medium transition-colors active:scale-95 ${
          isPricingActive
            ? 'text-primary font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Tag className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'Pricing' : 'تعرفه'}</span>
      </a>

      <a
        href="#faq"
        aria-current={isFaqActive ? 'location' : undefined}
        className={`flex flex-col items-center justify-center gap-1 min-h-[48px] rounded-xl text-xs font-medium transition-colors active:scale-95 ${
          isFaqActive
            ? 'text-primary font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <HelpCircle className="size-[18px]" aria-hidden="true" />
        <span className="whitespace-nowrap">{isEn ? 'FAQ' : 'سؤالات'}</span>
      </a>
    </nav>
  );
};

export default MobileTabBar;
