import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface OrderFAQItem {
  id: string;
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

export const ORDER_FAQS: OrderFAQItem[] = [
  {
    id: 'order-faq-audio',
    qFa: 'کیفیت فایل صوتی موردنیاز چقدر است؟',
    qEn: 'What is the required audio quality?',
    aFa: 'برای دستیابی به بالاترین وضوح و هماهنگی دقیق تصویر با بیت، ترجیحاً فایل نهایی یا مستر با فرمت WAV (۲۴ بیت یا ۱۶ بیت) یا فایل باکیفیت MP3 (320kbps) ارسال شود تا وکال، درامز و ترنزیشن‌ها با بالاترین دقت سینک شوند.',
    aEn: 'For the highest fidelity and precision sync between audio and visuals, a finalized master file in WAV format (24-bit/16-bit) or high-bitrate MP3 (320kbps) is preferred so vocal nuances, beat hits, and transitions sync flawlessly.',
  },
  {
    id: 'order-faq-delivery',
    qFa: 'زمان تحویل پروژه چطور محاسبه می‌شود؟',
    qEn: 'How is delivery time calculated?',
    aFa: 'محاسبه زمان تحویل از لحظه دریافت فایل صوتی، تأیید متن لیریک و مشخص شدن کانسپت بصری آغاز می‌شود. پروژه‌های تایپوگرافی معمولاً ۱ روز کاری (ساعات ۱۰ صبح تا ۱۱ شب) و پروژه‌های ادیت ویدیویی و تلفیقی بین ۲ تا ۳ روز کاری زمان می‌برند.',
    aEn: 'Delivery time calculation starts once the audio file is received, lyrics are confirmed, and the visual concept is agreed upon. Typography projects usually take 1 business day (10 AM to 11 PM), while video edit and composite projects take 2 to 3 business days.',
  },
  {
    id: 'order-faq-concept',
    qFa: 'اگر کانسپت یا سبک خاصی مد نظرم نباشد چطور؟',
    qEn: 'What if I do not have a specific concept in mind?',
    aFa: 'هیچ مشکلی وجود ندارد؛ بر اساس حس و حال موزیک، ریتم و ژانر اثر، استایل‌های بصری و پالت‌های رنگی مناسب به شما پیشنهاد داده می‌شود و پس از تأیید سلیقه شما، فرآیند تولید نهایی آغاز خواهد شد.',
    aEn: 'No worries at all; based on the track’s vibe, rhythm, and genre, visual style directions and color palettes are proposed to you and confirmed prior to production.',
  },
  {
    id: 'order-faq-revisions',
    qFa: 'آیا امکان ویرایش و اصلاح بعد از تحویل وجود دارد؟',
    qEn: 'Are revisions possible after receiving the preview?',
    aFa: 'بله؛ پس از آماده‌سازی نسخه پیش‌نمایش اولیه، اصلاحات مربوط به تنظیم تایمینگ، تصحیح رنگ یا تغییرات جزئی مطابق بازخورد شما انجام می‌شود تا نتیجه نهایی کاملاً مطلوب باشد.',
    aEn: 'Yes; after the initial preview is delivered, minor adjustments to text timing, colors, or sync can be refined based on your feedback until you are completely satisfied.',
  },
];

interface OrderFAQProps {
  className?: string;
}

export const OrderFAQ: React.FC<OrderFAQProps> = ({ className = '' }) => {
  const { isEn } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('order-faq-audio');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`order-faq-sec ${className}`.trim()}
      id="order-faq"
      aria-label={isEn ? 'Order FAQ' : 'سؤالات متداول ثبت سفارش'}
    >
      <div className="order-faq-card">
        <div className="order-faq-head">
          <p className="order-faq-eyebrow">
            <b>{isEn ? '✦ Quick Guide' : '✦ راهنمای سریع'}</b>
            <span> — {isEn ? 'Reduce Friction & Clear Queries' : 'پاسخ به ابهامات پیش از سفارش'}</span>
          </p>
          <h2 className="order-faq-title">
            {isEn ? 'Frequently Asked Questions' : 'سؤالات متداول ثبت سفارش'}
          </h2>
          <p className="order-faq-desc">
            {isEn
              ? 'Key requirements on audio fidelity, turnaround calculations, and creative collaboration.'
              : 'نکات کلیدی پیرامون کیفیت فایل صوتی، محاسبه زمان تحویل و فرآیند شروع پروژه.'}
          </p>
        </div>

        <div className="order-faq-list" role="region" aria-label={isEn ? 'Order questions list' : 'فهرست سؤالات سفارش'}>
          {ORDER_FAQS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`order-faq-item ${isOpen ? 'open' : ''}`.trim()}
              >
                <button
                  type="button"
                  className="order-faq-q"
                  id={`order-faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`order-faq-ans-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span>{isEn ? item.qEn : item.qFa}</span>
                  <span className="order-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`order-faq-ans-${item.id}`}
                  role="region"
                  aria-labelledby={`order-faq-btn-${item.id}`}
                  className="order-faq-a-wrapper"
                >
                  <div className="order-faq-a-inner">
                    <div className="order-faq-a">
                      <p>{isEn ? item.aEn : item.aFa}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderFAQ;
