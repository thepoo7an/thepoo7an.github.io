import React from 'react';

export type Language = 'fa' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isEn: boolean;
}

const LanguageContext = React.createContext<LanguageContextType>({
  lang: 'fa',
  setLang: () => {},
  toggleLang: () => {},
  isEn: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always initialize to 'fa' for deterministic SSR / hydration matching
  const [lang, setLangState] = React.useState<Language>('fa');

  // Hydrate client-side preference safely after initial render
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('app_lang');
      if (saved === 'en') {
        setLangState('en');
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('app_lang', newLang);
      } catch {
        // ignore
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === 'fa' ? 'en' : 'fa');
  };

  React.useEffect(() => {
    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    if (lang === 'en') {
      document.body.classList.add('lang-en');
      document.title = 'THEPOO7AN | Music Lyric Typography & Video Editing — Pooyan Karimi';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Pooyan Karimi (@thepoo7an) — Specialized music lyric typography, reels video editing, and beat-synced visual production for artists and release marketing teams.'
        );
      }
    } else {
      document.body.classList.remove('lang-en');
      document.title = 'پویان کریمی | تایپوگرافی لیریک و ادیت ویدیویی موزیک — thepoo7an';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'پویان کریمی (@thepoo7an) — متخصص تایپوگرافی لیریک موزیک، ادیت ویدیویی ریلز، موشن‌گرافی و تولید محتوای بصری موسیقی با خروجی 1080p و تحویل سریع.'
        );
      }
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isEn: lang === 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);

