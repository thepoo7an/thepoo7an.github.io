import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { isEn, toggleLang } = useLanguage();

  return (
    <button
      id="langBtn"
      type="button"
      onClick={toggleLang}
      className="lang-toggle-btn"
      aria-label={isEn ? "تغییر زبان به فارسی" : "Switch language to English"}
    >
      {isEn ? 'FA' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
