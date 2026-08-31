import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface WorkItem {
  id: string;
  webp: string;
  png: string;
  labelFa: string;
  labelEn: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-typography',
    webp: '/images/portfolio/work-typography.webp',
    png: '/images/portfolio/work-typography.png',
    labelFa: 'تایپوگرافی لیریک',
    labelEn: 'Lyric type',
  },
  {
    id: 'work-visuals',
    webp: '/images/portfolio/work-visuals.webp',
    png: '/images/portfolio/work-visuals.png',
    labelFa: 'ادیت و ویژوال',
    labelEn: 'Visual edit',
  },
  {
    id: 'work-cover',
    webp: '/images/portfolio/work-cover.webp',
    png: '/images/portfolio/work-cover.png',
    labelFa: 'کاور',
    labelEn: 'Cover',
  },
];

export const Work: React.FC = () => {
  const { isEn } = useLanguage();

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
            <div className="work-frame">
              <picture>
                <source srcSet={item.webp} type="image/webp" />
                <img
                  src={item.png}
                  alt={isEn ? item.labelEn : item.labelFa}
                  width={360}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="work-img"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith(item.webp)) {
                      target.src = item.webp;
                    }
                  }}
                />
              </picture>
            </div>
            <div className="work-meta">
              <span className="work-label">
                {isEn ? item.labelEn : item.labelFa}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
