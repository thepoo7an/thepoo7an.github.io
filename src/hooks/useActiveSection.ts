import { useState, useEffect } from 'react';

export type PageSectionId =
  | ''
  | 'portfolio'
  | 'services'
  | 'workflow'
  | 'pricing'
  | 'faq';

const SECTION_IDS: Exclude<PageSectionId, ''>[] = [
  'portfolio',
  'services',
  'workflow',
  'pricing',
  'faq',
];

export function useActiveSection(): PageSectionId {
  const [activeSection, setActiveSection] = useState<PageSectionId>('');

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const triggerY = scrollY + 240;

      const firstEl = document.getElementById(SECTION_IDS[0]);
      if (firstEl) {
        const firstTop = firstEl.getBoundingClientRect().top + scrollY;
        if (triggerY < firstTop) {
          setActiveSection('');
          return;
        }
      }

      const docBottom = document.documentElement.scrollHeight;
      if (scrollY + window.innerHeight >= docBottom - 24) {
        setActiveSection('faq');
        return;
      }

      let current: PageSectionId = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (triggerY >= top) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, []);

  return activeSection;
}
