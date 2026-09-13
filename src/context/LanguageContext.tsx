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
    } else {
      document.body.classList.remove('lang-en');
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isEn: lang === 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);

