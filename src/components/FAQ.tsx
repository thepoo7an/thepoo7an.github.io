import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface FAQItem {
  id: string;
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    qFa: 'هزینه لیریک ویدیو از چقدر است؟',
    qEn: 'How much does a lyric video cost?',
    aFa: 'تایپوگرافی لیریک از ۱۵۰٬۰۰۰ تومان، ادیت ویدیو + لیریک از ۳۰۰٬۰۰۰ تومان، پروژه ویژه از ۴۹۰٬۰۰۰ تومان. مبلغ نهایی بعد از دیدن فایل و مدت آهنگ مشخص می‌شود.',
    aEn: 'Lyric typography starts from 150,000 Tomans, Video Edit + Lyric from 300,000 Tomans, and Special Projects from 490,000 Tomans. The final amount is determined after reviewing the audio file and track duration.',
  },
  {
    id: 'faq-2',
    qFa: 'تحویل چند روز طول می‌کشد؟',
    qEn: 'How many days does delivery take?',
    aFa: 'پروژه‌های تایپوگرافی لیریک معمولاً در همان روز و در ساعت کاری ۱۰ صبح تا ۱۱ شب تحویل می‌شوند. پروژه‌های سنگین‌تر بین ۲ تا ۳ روز.',
    aEn: 'Lyric typography projects are usually delivered the same day during working hours (10 AM to 11 PM). Heavier projects take between 2 to 3 days.',
  },
  {
    id: 'faq-3',
    qFa: 'برای سفارش چه چیزهایی لازم است؟',
    qEn: 'What is needed to place an order?',
    aFa: 'فایل آهنگ، متن لیریک (ارسال متن اولویت دارد؛ استخراج هم ممکن است)، و اگر ادیت روی ویدیو می‌خواهید فایل ویدیو.',
    aEn: 'The music track file, lyric text (providing the text is preferred; extraction is also possible), and the video file if you would like video editing.',
  },
  {
    id: 'faq-4',
    qFa: 'چطور سفارش بدهم؟',
    qEn: 'How can I place an order?',
    aFa: 'از فرم ثبت سفارش سایت، دایرکت اینستاگرام یا تلگرام @thepoo7an. همکاری آنلاین است.',
    aEn: 'Via the website order form, Instagram DM, or Telegram @thepoo7an. Collaboration is online.',
  },
];

export const FAQ: React.FC = () => {
  const { isEn } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-sec" id="faq" aria-label={isEn ? 'FAQ' : 'سؤالات پرتکرار'}>
      <div className="svc-header" style={{ marginBottom: '40px' }}>
        <p className="eyebrow rv">
          <b>{isEn ? '✦ FAQ' : '✦ سؤالات پرتکرار'}</b>
        </p>
        <h2 className="rv d1">{isEn ? 'FAQ' : 'سؤالات پرتکرار'}</h2>
        <p className="lead rv d2">
          {isEn
            ? 'Answers to common questions about music lyrics, turnaround time, and ordering.'
            : 'پاسخ به پرتکرارترین سؤالات درباره تایپوگرافی لیریک، زمان تحویل و نحوه ثبت سفارش.'}
        </p>
      </div>

      <div className="faq-list rv d2">
        {FAQS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`faq-item ${isOpen ? 'open' : ''}`.trim()}
            >
              <button
                type="button"
                className="faq-q"
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-ans-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{isEn ? item.qEn : item.qFa}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-ans-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                className="faq-a-wrapper"
              >
                <div className="faq-a-inner">
                  <div className="faq-a">
                    <p>{isEn ? item.aEn : item.aFa}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
