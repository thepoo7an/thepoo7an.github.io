import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ServiceItem {
  id: string;
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  delayClass: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'lyric-typography',
    badgeFa: 'خدمت اصلی • تحویل ۱ روزه',
    badgeEn: 'Core Service • 1-Day Delivery',
    titleFa: 'تایپوگرافی لیریک موزیک',
    titleEn: 'Music Lyric Typography',
    descFa: 'طراحی و انیمیشن متن آهنگ روی ویدیو، هماهنگ با ریتم و ضرب‌های موزیک؛ مناسب برای ریلز و استوری اینستاگرام.',
    descEn: 'On-video animated lyric typography synced precisely to the rhythm and beat of the song, tailored for Instagram Reels.',
    featuresFa: [
      'مدت‌زمان معمول: ۱۵ الی ۲۰ ثانیه',
      'خروجی: فرمت MP4 با کیفیت 1080p و ۳۰ فریم',
      'امکان ارسال متن توسط شما یا استخراج لیریک',
      'زمان تحویل: ۱ روز کاری',
    ],
    featuresEn: [
      'Typical duration: 15–20 seconds',
      'Output: MP4, 1080p, 30 FPS',
      'Client lyrics preferred (extraction also available)',
      'Turnaround: 1 business day',
    ],
    ctaFa: 'سفارش تایپوگرافی',
    ctaEn: 'Order Typography',
    delayClass: '',
  },
  {
    id: 'video-editing-typography',
    badgeFa: 'تدوین + لیریک • ۲ تا ۳ روز',
    badgeEn: 'Edit + Lyrics • 2–3 Days',
    titleFa: 'ادیت ویدیو + تایپوگرافی لیریک',
    titleEn: 'Video Editing + Lyric Typography',
    descFa: 'ترکیب تدوین ویدیویی متناسب با استایل موزیک به همراه تایپوگرافی متن آهنگ بر روی تصویر.',
    descEn: 'Full video editing synchronized with track energy combined with lyric typography placement.',
    featuresFa: [
      'مدت‌زمان متناسب با آهنگ و پروژه',
      'خروجی: فرمت MP4 با کیفیت 1080p و ۳۰ فریم',
      'تدوین ریتمیک همراه با متحرک‌سازی لیریک',
      'زمان تحویل: ۲ الی ۳ روز کاری',
    ],
    featuresEn: [
      'Duration customized to music and project scope',
      'Output: MP4, 1080p, 30 FPS',
      'Rhythmic video cuts with synchronized typography',
      'Turnaround: 2–3 business days',
    ],
    ctaFa: 'سفارش ادیت + لیریک',
    ctaEn: 'Order Video + Lyrics',
    delayClass: 'd1',
  },
  {
    id: 'cover-design',
    badgeFa: 'کاور آرت',
    badgeEn: 'Cover Artwork',
    titleFa: 'طراحی کاور موزیک',
    titleEn: 'Music Cover Design',
    descFa: 'طراحی کاور آرت اختصاصی برای انتشار سینگل‌ترک و آلبوم در پلتفرم‌های پخش موزیک و شبکه‌های اجتماعی.',
    descEn: 'Custom music release cover artwork designed for single releases and digital platforms.',
    featuresFa: [
      'طراحی کاور متناسب با کانسپت و سبک آهنگ',
      'کیفیت بالا و آماده انتشار در پلتفرم‌ها',
      'هماهنگی دقیق سلیقه بصری پیش از اجرا',
      'تحویل فایل نهایی با رزولوشن استاندارد',
    ],
    featuresEn: [
      'Artwork tailored to track mood and concept',
      'High-resolution output for streaming platforms',
      'Visual direction finalized before production',
      'Standard high-res release files',
    ],
    ctaFa: 'سفارش طراحی کاور',
    ctaEn: 'Order Cover Art',
    delayClass: 'd2',
  },
];

export const Services: React.FC = () => {
  const { isEn } = useLanguage();

  return (
    <section className="svc-sec" id="services" aria-label={isEn ? "Services" : "خدمات"}>
      <div className="svc-header">
        <p className="eyebrow rv">
          <b>{isEn ? "✦ Services" : "✦ خدمات"}</b>
        </p>
        <h2 className="rv d1">
          {isEn ? "What I Create for Your Releases" : "خدمات تخصصی برای انتشار موسیقی"}
        </h2>
        <p className="sub rv d2">
          {isEn
            ? "Clear workflows, beat-synchronized outputs, and direct communication for music artists and promotion teams."
            : "روند کاری مشخص، خروجی‌های استاندارد 1080p و تحویل سریع برای آرتیست‌ها و تیم‌های مارکتینگ موسیقی."}
        </p>
      </div>

      <div className="svc-grid">
        {SERVICES.map((s) => (
          <article key={s.id} className={`svc-card rv ${s.delayClass}`.trim()}>
            <div className="svc-card-top">
              <span className="svc-badge">{isEn ? s.badgeEn : s.badgeFa}</span>
              <h3>{isEn ? s.titleEn : s.titleFa}</h3>
              <p>{isEn ? s.descEn : s.descFa}</p>
            </div>
            <ul className="svc-features">
              {(isEn ? s.featuresEn : s.featuresFa).map((f, i) => (
                <li key={i}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="svc-card-bottom">
              <a className="pill" href="./order.html">
                {isEn ? s.ctaEn : s.ctaFa}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
