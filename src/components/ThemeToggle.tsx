import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isEn } = useLanguage();

  const label = isEn
    ? theme === 'dark'
      ? 'Switch to light theme'
      : 'Switch to dark theme'
    : theme === 'dark'
      ? 'تغییر به حالت روشن'
      : 'تغییر به حالت تاریک';

  return (
    <button
      id="themeBtn"
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Sun className="sun" size={16} strokeWidth={1.8} aria-hidden="true" />
      <Moon className="moon" size={16} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
