import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { MotionToggle } from './components/MotionToggle';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyMobileCta } from './components/StickyMobileCta';
import { ChromeMeridian } from './components/ChromeMeridian';
import { TwoFacesNav } from './components/TwoFacesNav';
import { initAnalytics, trackSectionView } from './utils/analytics';

export const AppContent: React.FC = () => {
  const { isEn } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Initialize Analytics and monitor in-page section navigation
  useEffect(() => {
    initAnalytics();

    const handleHashChange = () => {
      const section = window.location.hash || '#home';
      trackSectionView(section);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync scroll state and hero parallax
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const reduce =
        typeof window !== 'undefined' &&
        (document.documentElement.classList.contains('no-motion') ||
          (window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches));
      if (!reduce && heroImgRef.current && window.scrollY < window.innerHeight) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`;
      } else if (heroImgRef.current) {
        heroImgRef.current.style.transform = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered .rv elements
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      (document.documentElement.classList.contains('no-motion') ||
        (window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches));
    const rvEls = document.querySelectorAll('.rv');

    if (typeof IntersectionObserver !== 'undefined' && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14 }
      );
      rvEls.forEach((el) => io.observe(el));
      return () => io.disconnect();
    } else {
      rvEls.forEach((el) => el.classList.add('in'));
    }
  }, []);

  // Sync menu open class on body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Skip to Main Content Link (WCAG AA & UI/UX Pro Max Priority 1) */}
      <a href="#main" className="skip-link">
        {isEn ? 'Skip to main content' : 'پرش به محتوای اصلی'}
      </a>

      {/* ===== Global Navigation ===== */}
      <nav
        className={`nav ${isScrolled ? 'scrolled' : ''}`}
        id="nav"
        aria-label={isEn ? 'Global Navigation' : 'ناوبری سراسری'}
      >
        <div className="nav-in">
          <a className="brand" href="#home">
            <i aria-hidden="true"></i>
            <span className="ltr">thepoo7an</span>
          </a>
          <TwoFacesNav />
          <div className="nav-act">
            <ThemeToggle />
            <LanguageToggle />
            <MotionToggle />
            <a className="nav-cta" href="./order.html">
              {isEn ? 'Start Order' : 'ثبت سفارش'}
            </a>
            <button
              id="menuBtn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isEn ? 'Menu' : 'منو'}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      <div className="sheet" id="sheet">
        <a href="#work" onClick={closeMenu}>
          {isEn ? 'Work' : 'نمونه'}
        </a>
        <a href="#services" onClick={closeMenu}>
          {isEn ? 'Services' : 'خدمات'}
        </a>
        <a href="#process" onClick={closeMenu}>
          {isEn ? 'Process' : 'مراحل همکاری'}
        </a>
        <a href="#pricing" onClick={closeMenu}>
          {isEn ? 'Pricing' : 'تعرفه‌ها'}
        </a>
        <a href="#contact" onClick={closeMenu}>
          {isEn ? 'Contact Me' : 'ارتباط با من'}
        </a>
        <div className="sheet-tools">
          <span className="sheet-tools-label">
            {isEn ? 'Animations & Motion:' : 'انیمیشن و افکت‌های موشن:'}
          </span>
          <MotionToggle />
        </div>
      </div>

      <main id="main">
        <Hero heroImgRef={heroImgRef} />
        <Work />
        <Services />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <StickyMobileCta />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ChromeMeridian />
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
