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
      style={{
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: '999px',
        border: '1px solid var(--line)',
        color: 'var(--txt)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30px'
      }}
    >
      {isEn ? 'FA' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
