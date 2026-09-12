import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavItem {
  id: string;
  href: string;
  labelFa: string;
  labelEn: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'work', href: '#work', labelFa: 'نمونه', labelEn: 'Work' },
  { id: 'styles', href: '#styles', labelFa: 'سبک‌ها', labelEn: 'Styles' },
  { id: 'services', href: '#services', labelFa: 'خدمات', labelEn: 'Services' },
  { id: 'process', href: '#process', labelFa: 'مراحل', labelEn: 'Process' },
  { id: 'pricing', href: '#pricing', labelFa: 'تعرفه‌ها', labelEn: 'Pricing' },
  { id: 'contact', href: '#contact', labelFa: 'ارتباط', labelEn: 'Contact' },
];

export const TwoFacesNav: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeId, setActiveId] = useState<string>('work');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const beadRef = useRef<HTMLSpanElement>(null);
  const beadFaceRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Find index of currently active item
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeId)
  );

  // Target index for the bead (hover overrides scroll active)
  const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  // Reposition the bead and counter-translate the cloned face
  const updateBeadPosition = useCallback((targetIdx: number) => {
    const container = containerRef.current;
    const targetItem = itemRefs.current[targetIdx];
    const bead = beadRef.current;
    const beadFace = beadFaceRef.current;

    if (!container || !targetItem || !bead || !beadFace) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetItem.getBoundingClientRect();

    const left = targetRect.left - containerRect.left;
    const top = targetRect.top - containerRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    if (width === 0 || height === 0) return;

    // Move the bead clipping window to target item
    bead.style.opacity = '1';
    bead.style.width = `${width}px`;
    bead.style.height = `${height}px`;
    bead.style.transform = `translate3d(${left}px, ${top}px, 0)`;

    // Counter-translate the lit face so text stays 1:1 aligned with base track
    beadFace.style.width = `${containerRect.width}px`;
    beadFace.style.transform = `translate3d(${-left}px, ${-top}px, 0)`;
  }, []);

  // Update whenever target changes, language changes, or fonts load
  useEffect(() => {
    updateBeadPosition(targetIndex);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        updateBeadPosition(targetIndex);
      });
    }
  }, [targetIndex, isEn, updateBeadPosition]);

  // ResizeObserver to keep bead perfectly aligned on layout changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      updateBeadPosition(targetIndex);
    });
    ro.observe(container);

    return () => ro.disconnect();
  }, [targetIndex, updateBeadPosition]);

  // Scrollspy: update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      let current = activeId;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = item.id;
            break;
          }
        }
      }

      if (current !== activeId) {
        setActiveId(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="nav-links two-faces-bar"
      role="tablist"
      aria-label={isEn ? 'Section tabs' : 'تب‌های بخش‌های سایت'}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {/* ===== The Sliding Bead (Liquid Clipping Mask) ===== */}
      <span ref={beadRef} className="bead" data-bead aria-hidden="true">
        <span className="bead__body" />
        {/* The second face: cloned items in metallic/neon lit ink */}
        <div ref={beadFaceRef} className="bead__face">
          {NAV_ITEMS.map((item) => (
            <span key={`lit-${item.id}`} className="item item--lit">
              <span className="item_face">
                <span>{isEn ? item.labelEn : item.labelFa}</span>
              </span>
            </span>
          ))}
        </div>
      </span>

      {/* ===== Base Face Items (Dimmed/Neutral Ink) ===== */}
      {NAV_ITEMS.map((item, idx) => {
        const isSelected = activeId === item.id;
        return (
          <a
            key={item.id}
            ref={(el: HTMLAnchorElement | null) => {
              itemRefs.current[idx] = el;
            }}
            href={item.href}
            className={`item ${isSelected ? 'is-active' : ''}`}
            role="tab"
            aria-selected={isSelected}
            onMouseEnter={() => setHoverIndex(idx)}
            onFocus={() => setHoverIndex(idx)}
            onBlur={() => setHoverIndex(null)}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleItemClick(e, item.id)}
          >
            <span className="item_face">
              <span>{isEn ? item.labelEn : item.labelFa}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default TwoFacesNav;
