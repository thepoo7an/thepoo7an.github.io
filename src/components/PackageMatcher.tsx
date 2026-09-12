import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Check, ArrowRight, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { trackPackageEstimated, trackOrderStarted } from '../utils/analytics';

type FormatChoice = 'short-reel' | 'video-edit' | 'monthly' | 'special';
type AssetChoice = 'audio-only' | 'has-footage' | 'need-cover';
type StyleChoice = 'chrome' | 'cinematic' | 'minimal' | 'dark';

interface MatchResult {
  planParam: string;
  planId: string;
  titleFa: string;
  titleEn: string;
  priceFa: string;
  priceEn: string;
  turnaroundFa: string;
  turnaroundEn: string;
  rationaleFa: string;
  rationaleEn: string;
  featuresFa: string[];
  featuresEn: string[];
}

export const PackageMatcher: React.FC = () => {
  const { isEn } = useLanguage();

  const [format, setFormat] = useState<FormatChoice>('short-reel');
  const [asset, setAsset] = useState<AssetChoice>('audio-only');
  const [style, setStyle] = useState<StyleChoice>('chrome');

  const recommendation: MatchResult = useMemo(() => {
    // 1. Monthly package takes priority if monthly format selected
    if (format === 'monthly') {
      return {
        planParam: 'monthly',
        planId: 'plan-monthly',
        titleFa: 'پکیج ماهانه (۴ ریلز / ماه)',
        titleEn: 'Monthly Retainer (4 Reels/mo)',
        priceFa: 'از ۱٬۰۰۰٬۰۰۰ تومان',
        priceEn: 'From 1,000,000 Tomans',
        turnaroundFa: 'تحویل زمان‌بندی‌شده در ماه + اولویت رندر',
        turnaroundEn: 'Scheduled monthly releases + priority queue',
        rationaleFa: 'برای آرتیست‌های فعال که حضور مداوم در اکسپلور و تقویم منظم پخش دارند.',
        rationaleEn: 'Best for active music creators keeping consistent engagement and scheduled releases.',
        featuresFa: [
          '۴ ویدیوی ریلز کامل در طول ماه',
          'بیت‌سینک دقیق + هویت بصری یکپارچه',
          'صرفه‌جویی هزینه نسبت به سفارش تک‌پست',
        ],
        featuresEn: [
          '4 complete Reels delivered across the month',
          'Tight beat-syncing + unified art direction',
          'Cost savings compared to single orders',
        ],
      };
    }

    // 2. Special project or cover art
    if (format === 'special' || asset === 'need-cover') {
      return {
        planParam: 'special',
        planId: 'plan-special',
        titleFa: 'پروژه ویژه و کاور آرت',
        titleEn: 'Special Project & Cover Art',
        priceFa: 'از ۴۹۰٬۰۰۰ تومان',
        priceEn: 'From 490,000 Tomans',
        turnaroundFa: '۲ تا ۳ روز کاری بسته به حجم پروژه',
        turnaroundEn: '2 to 3 business days based on scope',
        rationaleFa: 'طراحی کاور ۳۰۰۰×۳۰۰۰ پیکسل، آلبوم، یا موزیک‌ویدیو سبک با هماهنگی کامل قبل از شروع.',
        rationaleEn: '3000x3000px Cover Art, EP/Album visuals, or custom light music video tailored to your brief.',
        featuresFa: [
          'طراحی کاور آرت باکیفیت برای اسپاتیفای و اپل موزیک',
          'خروجی استاندارد ویدیو متناسب با کانسپت آهنگ',
          'هماهنگی دقیق بریف قبل از ثبت نهایی',
        ],
        featuresEn: [
          'High-res Cover Art for Spotify & Apple Music',
          'Custom visual export matched to your song concept',
          'Full brief alignment prior to kickoff',
        ],
      };
    }

    // 3. Pro package (Video footage editing + lyrics)
    if (format === 'video-edit' || asset === 'has-footage') {
      return {
        planParam: 'pro',
        planId: 'plan-pro',
        titleFa: 'ادیت ویدیو + تایپوگرافی لیریک',
        titleEn: 'Video Edit + Lyric Typography',
        priceFa: 'از ۳۰۰٬۰۰۰ تومان',
        priceEn: 'From 300,000 Tomans',
        turnaroundFa: '۲ تا ۳ روز کاری',
        turnaroundEn: '2 to 3 business days',
        rationaleFa: 'تدوین راش‌ها یا تصاویر اجرای شما همراه با انیمیشن کلمات و همگام‌سازی ضرب‌ها.',
        rationaleEn: 'Editing your performance footage or b-roll combined with kinetic typography and beat alignment.',
        featuresFa: [
          'ادیت کامل ویدیو + ترنزیشن‌های هماهنگ با بیت',
          'تایپوگرافی لیریک سینک شده با وکال',
          'خروجی MP4 ۱۰۸۰p با نسبت ۹:۱۶ اینستاگرام',
        ],
        featuresEn: [
          'Full video montage + rhythm-matched transitions',
          'Kinetic lyrics synced to the vocal performance',
          'Standard 1080p 9:16 export ready for Reels',
        ],
      };
    }

    // 4. Default: Base Lyric Typography
    return {
      planParam: 'base',
      planId: 'plan-base',
      titleFa: 'تایپوگرافی لیریک موزیک (پایه)',
      titleEn: 'Lyric Typography (Base)',
      priceFa: '۱۵۰٬۰۰۰ تومان',
      priceEn: '150,000 Tomans',
      turnaroundFa: 'معمولاً همان روز / حداکثر ۱ روز کاری',
      turnaroundEn: 'Usually same-day / max 1 business day',
      rationaleFa: 'بهترین انتخاب برای تیزر کوتاه و جذاب بدون نیاز به راش ویدیویی، با بالاترین سرعت تحویل.',
      rationaleEn: 'Ideal for short high-retention teasers without video footage, delivering maximum speed and precision.',
      featuresFa: [
        'ویدیوی حدود ۱۵–۲۰ ثانیه با لیریک طراحی‌شده',
        'خروجی MP4 / 1080p / 30 FPS',
        'تحویل سریع در همان روز یا حداکثر ۲۴ ساعت',
      ],
      featuresEn: [
        'Video ~15–20s with custom designed lyrics',
        'Output: MP4 / 1080p / 30 FPS',
        'Fast turnaround: same day or up to 24h',
      ],
    };
  }, [format, asset]);

  const handleOrderRedirect = () => {
    trackPackageEstimated(recommendation.planId, format, asset);
    trackOrderStarted(recommendation.planId, isEn ? recommendation.titleEn : recommendation.titleFa);
    window.location.href = `./order.html?plan=${recommendation.planParam}&style=${style}`;
  };

  return (
    <div className="pkg-matcher-wrap rv" role="region" aria-label={isEn ? "Package Estimator" : "انتخاب‌گر هوشمند پکیج"}>
      <div className="pkg-matcher-card">
        <div className="pkg-matcher-header">
          <span className="pkg-matcher-tag">
            <Sparkles size={13} aria-hidden="true" />
            {isEn ? "SCOPE ESTIMATOR" : "راهنمای هوشمند انتخاب پکیج"}
          </span>
          <h3 className="pkg-matcher-title">
            {isEn
              ? "Not sure which package fits your track?"
              : "نمی‌دانید کدام پکیج برای اثر شما مناسب‌تر است؟"}
          </h3>
          <p className="pkg-matcher-desc">
            {isEn
              ? "Answer 3 quick questions to find the exact scope, pricing, and turnaround for your release."
              : "با پاسخ به ۳ سوال کوتاه زیر، پکیج مناسب، زمان دقیق تحویل و هزینه متناسب با اثر خود را مشخص کنید."}
          </p>
        </div>

        <div className="pkg-matcher-body">
          {/* Question Controls Column */}
          <div className="pkg-steps-col">
            {/* Step 1: Output Format */}
            <div className="pkg-step-group">
              <label className="pkg-step-label">
                <span className="pkg-step-badge">1</span>
                <span>{isEn ? "Output Format & Duration:" : "۱. نوع خروجی و مدت ویدیو:"}</span>
              </label>
              <div className="pkg-options-grid">
                <button
                  type="button"
                  className={`pkg-opt-btn ${format === 'short-reel' ? 'selected' : ''}`}
                  onClick={() => setFormat('short-reel')}
                  aria-pressed={format === 'short-reel'}
                >
                  <span className="pkg-opt-title">{isEn ? "Short Reel (15-25s)" : "تیزر ریلز کوتاه (۱۵ تا ۲۵ ثانیه)"}</span>
                  <span className="pkg-opt-sub">{isEn ? "High-retention hook" : "تک‌پست ویدیویی تیزر"}</span>
                </button>
                <button
                  type="button"
                  className={`pkg-opt-btn ${format === 'video-edit' ? 'selected' : ''}`}
                  onClick={() => setFormat('video-edit')}
                  aria-pressed={format === 'video-edit'}
                >
                  <span className="pkg-opt-title">{isEn ? "Video Edit (30-60s)" : "ادیت ویدیو کامل‌تر (۳۰ تا ۶۰ ثانیه)"}</span>
                  <span className="pkg-opt-sub">{isEn ? "Footage + Lyrics" : "تدوین ویدیو + متن سینک"}</span>
                </button>
                <button
                  type="button"
                  className={`pkg-opt-btn ${format === 'monthly' ? 'selected' : ''}`}
                  onClick={() => setFormat('monthly')}
                  aria-pressed={format === 'monthly'}
                >
                  <span className="pkg-opt-title">{isEn ? "Monthly (4 Reels/mo)" : "پکیج ماهانه (۴ ریلز / ماه)"}</span>
                  <span className="pkg-opt-sub">{isEn ? "Regular release plan" : "تقویم منظم انتشار"}</span>
                </button>
                <button
                  type="button"
                  className={`pkg-opt-btn ${format === 'special' ? 'selected' : ''}`}
                  onClick={() => setFormat('special')}
                  aria-pressed={format === 'special'}
                >
                  <span className="pkg-opt-title">{isEn ? "Special & Cover Art" : "پروژه ویژه / کاور آرت ۳۰۰۰px"}</span>
                  <span className="pkg-opt-sub">{isEn ? "Album or full visual" : "آلبوم یا کانسپت سفارشی"}</span>
                </button>
              </div>
            </div>

            {/* Step 2: Available Raw Assets */}
            <div className="pkg-step-group">
              <label className="pkg-step-label">
                <span className="pkg-step-badge">2</span>
                <span>{isEn ? "Available Materials You Have:" : "۲. فایل‌هایی که در اختیار دارید:"}</span>
              </label>
              <div className="pkg-options-grid">
                <button
                  type="button"
                  className={`pkg-opt-btn ${asset === 'audio-only' ? 'selected' : ''}`}
                  onClick={() => setAsset('audio-only')}
                  aria-pressed={asset === 'audio-only'}
                >
                  <span className="pkg-opt-title">{isEn ? "Audio + Lyrics only" : "فقط فایل موزیک و متن ترانه"}</span>
                  <span className="pkg-opt-sub">{isEn ? "No video required" : "بدون نیاز به راش ویدیویی"}</span>
                </button>
                <button
                  type="button"
                  className={`pkg-opt-btn ${asset === 'has-footage' ? 'selected' : ''}`}
                  onClick={() => setAsset('has-footage')}
                  aria-pressed={asset === 'has-footage'}
                >
                  <span className="pkg-opt-title">{isEn ? "Music + Video Footage" : "موزیک + راش و فوتیج ضبط‌شده"}</span>
                  <span className="pkg-opt-sub">{isEn ? "Performance shots/b-roll" : "ویدیوهای اجرا یا بک‌استیج"}</span>
                </button>
                <button
                  type="button"
                  className={`pkg-opt-btn ${asset === 'need-cover' ? 'selected' : ''}`}
                  onClick={() => setAsset('need-cover')}
                  aria-pressed={asset === 'need-cover'}
                >
                  <span className="pkg-opt-title">{isEn ? "Need Custom Cover/Visual" : "طراحی هویت کاور از صفر"}</span>
                  <span className="pkg-opt-sub">{isEn ? "Graphic design scope" : "طراحی گرافیکی اختصاصی"}</span>
                </button>
              </div>
            </div>

            {/* Step 3: Aesthetic Tone */}
            <div className="pkg-step-group">
              <label className="pkg-step-label">
                <span className="pkg-step-badge">3</span>
                <span>{isEn ? "Preferred Visual Style:" : "۳. سبک بصری انتخابی:"}</span>
              </label>
              <div className="pkg-styles-row">
                <button
                  type="button"
                  className={`pkg-style-pill ${style === 'chrome' ? 'selected' : ''}`}
                  onClick={() => setStyle('chrome')}
                >
                  {isEn ? "3D Chrome" : "۳D کروم فلزی"}
                </button>
                <button
                  type="button"
                  className={`pkg-style-pill ${style === 'cinematic' ? 'selected' : ''}`}
                  onClick={() => setStyle('cinematic')}
                >
                  {isEn ? "Cinematic" : "سینمایی و گرین"}
                </button>
                <button
                  type="button"
                  className={`pkg-style-pill ${style === 'minimal' ? 'selected' : ''}`}
                  onClick={() => setStyle('minimal')}
                >
                  {isEn ? "Minimal" : "مینیمال و تایپوگرافی"}
                </button>
                <button
                  type="button"
                  className={`pkg-style-pill ${style === 'dark' ? 'selected' : ''}`}
                  onClick={() => setStyle('dark')}
                >
                  {isEn ? "Dark Obsidian" : "دارک ابسیدین"}
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className="pkg-result-col">
            <div className="pkg-result-card">
              <div className="pkg-result-badge">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>{isEn ? "RECOMMENDED SCOPE" : "پکیج پیشنهادی متناسب با پروژه شما"}</span>
              </div>

              <h4 className="pkg-result-title">
                {isEn ? recommendation.titleEn : recommendation.titleFa}
              </h4>

              <div className="pkg-result-price">
                <span className="price-num">{isEn ? recommendation.priceEn : recommendation.priceFa}</span>
              </div>

              <div className="pkg-result-time">
                <Clock size={14} aria-hidden="true" />
                <span>{isEn ? recommendation.turnaroundEn : recommendation.turnaroundFa}</span>
              </div>

              <p className="pkg-result-rationale">
                {isEn ? recommendation.rationaleEn : recommendation.rationaleFa}
              </p>

              <div className="pkg-result-divider" />

              <ul className="pkg-result-features">
                {(isEn ? recommendation.featuresEn : recommendation.featuresFa).map((f, i) => (
                  <li key={i}>
                    <Check size={14} className="text-blue-400 shrink-0" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="pkg-result-cta"
                onClick={handleOrderRedirect}
              >
                <span>{isEn ? "Order with this Scope" : "ثبت سفارش با این پکیج و استایل"}</span>
                {isEn ? <ArrowRight size={16} aria-hidden="true" /> : <ArrowLeft size={16} aria-hidden="true" />}
              </button>

              <span className="pkg-result-subnote">
                {isEn
                  ? "Transfers your selected plan & style directly to the brief form."
                  : "پکیج و سبک انتخابی مستقیماً به فرم سفارش منتقل می‌شوند."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageMatcher;
