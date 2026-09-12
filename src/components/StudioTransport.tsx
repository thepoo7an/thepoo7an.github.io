import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StudioTransport: React.FC = () => {
  const { isEn } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check system prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
        setScrollProgress(progress);
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion]);

  return (
    <>
      {/* Studio DAW-Inspired Beat-Grid Overlay (Micro-Subtle) */}
      <div className="studio-transport-grid" aria-hidden="true" />

      {/* Sleek Fixed DAW Timeline Playhead Progress Bar */}
      <div
        className="studio-playhead-track"
        role="progressbar"
        aria-hidden="true"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-label={isEn ? "Timeline Playhead" : "نشانگر پیشرفت تایم‌لاین"}
      >
        <div
          className="studio-playhead-fill"
          style={{ transform: `scaleX(${isReducedMotion ? 0 : scrollProgress})` }}
        />
        <div
          className="studio-playhead-needle"
          style={{
            left: `${isReducedMotion ? 0 : (scrollProgress * 100).toFixed(2)}%`,
            opacity: scrollProgress > 0.005 ? 1 : 0,
          }}
        />
      </div>
    </>
  );
};

export default StudioTransport;
