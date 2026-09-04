import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface WorkItem {
  id: string;
  primarySrc: string;
  fallbacks: string[];
  labelFa: string;
  labelEn: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-sample-1',
    primarySrc: './images/portfolio/sample-1.png',
    fallbacks: [
      './images/portfolio/Screenshot_20260819-203518.png',
      './Screenshot_20260819-203518.png',
      './images/portfolio/work-cover.png',
      './images/portfolio/work-cover.webp',
    ],
    labelFa: 'پشیمون میشی و برمیگردی',
    labelEn: 'Lyric Typography Reel',
  },
  {
    id: 'work-sample-2',
    primarySrc: './images/portfolio/sample-2.png',
    fallbacks: [
      './images/portfolio/Screenshot_20260819-203436.png',
      './Screenshot_20260819-203436.png',
      './images/portfolio/work-visuals.png',
      './images/portfolio/work-visuals.webp',
    ],
    labelFa: 'دورم کن — میراد',
    labelEn: 'Dooram Kon — Meyraad',
  },
];

export const Work: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);

  const closeModal = useCallback(() => {
    setActiveItem(null);
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, closeModal]);

  return (
    <section className="work-sec" id="work" aria-label={isEn ? "Selected output" : "نمونه خروجی"}>
      <div className="work-header">
        <h2 className="rv">
          {isEn ? "Selected output" : "نمونه خروجی"}
        </h2>
      </div>

      <div className="work-grid">
        {WORK_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className={`work-card rv ${idx === 0 ? '' : `d${idx}`}`}
          >
            <div
              className="work-frame"
              role="button"
              tabIndex={0}
              aria-label={isEn ? `Preview ${item.labelEn}` : `مشاهده ${item.labelFa}`}
              onClick={() => setActiveItem(item)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
            >
              <img
                src={item.primarySrc}
                alt={isEn ? item.labelEn : item.labelFa}
                width={360}
                height={640}
                loading="lazy"
                decoding="async"
                className="work-img"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  const currentAttempt = parseInt(target.dataset.attempt || '0', 10);
                  if (currentAttempt < item.fallbacks.length) {
                    target.dataset.attempt = String(currentAttempt + 1);
                    target.src = item.fallbacks[currentAttempt];
                  }
                }}
              />
              <div className="work-zoom-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
            <div className="work-meta">
              <span className="work-label">
                {isEn ? item.labelEn : item.labelFa}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? activeItem.labelEn : activeItem.labelFa}
          onClick={closeModal}
        >
          <button
            type="button"
            className="work-lightbox-close"
            onClick={closeModal}
            aria-label={isEn ? "Close preview" : "بستن پیش‌نمایش"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="work-lightbox-content"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="work-lightbox-frame">
              <img
                src={activeItem.primarySrc}
                alt={isEn ? activeItem.labelEn : activeItem.labelFa}
                width={360}
                height={640}
                className="work-lightbox-img"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  const currentAttempt = parseInt(target.dataset.attempt || '0', 10);
                  if (currentAttempt < activeItem.fallbacks.length) {
                    target.dataset.attempt = String(currentAttempt + 1);
                    target.src = activeItem.fallbacks[currentAttempt];
                  }
                }}
              />
            </div>
            <p className="work-lightbox-caption">
              {isEn ? activeItem.labelEn : activeItem.labelFa}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
