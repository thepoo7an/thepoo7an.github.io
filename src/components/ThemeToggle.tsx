import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="themeBtn"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
    >
      <Sun className="sun" size={16} strokeWidth={1.8} aria-hidden="true" />
      <Moon className="moon" size={16} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
