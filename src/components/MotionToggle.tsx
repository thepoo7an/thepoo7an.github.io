import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MotionToggle: React.FC = () => {
  const { isEn } = useLanguage();
  const [isNoMotion, setIsNoMotion] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('no-motion');
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tp7-no-motion');
      if (saved !== null) {
        const disabled = saved === 'true';
        setIsNoMotion(disabled);
        document.documentElement.classList.toggle('no-motion', disabled);
      } else {
        const prefersReduced =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
          setIsNoMotion(true);
          document.documentElement.classList.add('no-motion');
        }
      }
    } catch {
      // Ignore storage errors in sandboxed environments
    }
  }, []);

  const toggleMotion = () => {
    const next = !isNoMotion;
    setIsNoMotion(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('no-motion', next);
      try {
        localStorage.setItem('tp7-no-motion', String(next));
      } catch {
        // Ignore storage errors
      }
    }
  };

  const label = isEn
    ? (isNoMotion ? 'Enable animations' : 'Pause animations')
    : (isNoMotion ? 'اجرای انیمیشن‌ها' : 'توقف انیمیشن‌ها');

  return (
    <button
      id="motionBtn"
      type="button"
      onClick={toggleMotion}
      className={isNoMotion ? 'motion-disabled' : ''}
      aria-label={label}
      aria-pressed={isNoMotion}
      title={label}
    >
      {isNoMotion ? (
        <Play size={16} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Pause size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
};

export default MotionToggle;
