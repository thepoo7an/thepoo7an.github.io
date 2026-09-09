import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackContactClick } from '../utils/analytics';
import { ArrowUp, Clock, Send, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isEn } = useLanguage();
  const [tehranTime, setTehranTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(isEn ? 'en-US' : 'fa-IR', {
          timeZone: 'Asia/Tehran',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTehranTime(formatter.format(now));
      } catch {
        setTehranTime('10:00 - 23:00');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, [isEn]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" id="footer" aria-label={isEn ? 'Site Footer' : 'پاورقی سایت'}>
      {/* Footer Call to Action Banner (Footer.design inspired) */}
      <div className="f-cta-banner rv">
        <div className="f-cta-glow" aria-hidden="true"></div>
        <div className="f-cta-content">
          <p className="f-cta-eyebrow">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>{isEn ? 'ELEVATE YOUR MUSIC VISUALS' : 'همکاری در پروژه جدید'}</span>
          </p>
          <h2 className="f-cta-heading">
            {isEn ? "Got a track coming up? Let's bring it to life." : 'پروژه‌ای در ذهن دارید؟ بیایید با هم بسازیمش.'}
          </h2>
          <p className="f-cta-sub">
            {isEn
              ? 'Kinetic typography, beat sync, and 1080p Instagram mastery tailored for modern artists.'
              : 'تایپوگرافی لیریک ریتمیک، بیت‌سینک فریم به فریم و خروجی شفاف ۱۰۸۰p ریلز برای متمایز شدن اثر شما.'}
          </p>
        </div>

        <div className="f-cta-actions">
          <a
            href="./order.html"
            className="pill pill-primary f-btn-order"
            onClick={() => trackContactClick('order_page')}
          >
            {isEn ? 'Start Order Online' : 'ثبت سریع سفارش'}
          </a>
          <a
            href="https://t.me/thepoo7an"
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-tg f-btn-telegram"
            onClick={() => trackContactClick('telegram')}
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? 'Message on Telegram' : 'گفتگو در تلگرام'}</span>
          </a>
        </div>
      </div>

      {/* Main Architectural 4-Column Grid (Footer.design inspired) */}
      <div className="f-grid">
        {/* Column 1: Studio Identity & Live Status */}
        <div className="f-col f-col-brand">
          <div className="f-brand-title">THEPOO7AN</div>
          <p className="f-brand-desc">
            {isEn
              ? 'Visual production studio specializing in music lyric typography, video editing, and cover art for independent artists.'
              : 'استودیو تخصصی تایپوگرافی لیریک موزیک، تدوین ویدیویی و هویت بصری برای آرتیست‌ها و آهنگسازان.'}
          </p>

          {/* Studio Availability & Timezone (Dark.design inspired) */}
          <div className="f-status-box">
            <div className="f-status-pill">
              <span className="status-dot"></span>
              <span>{isEn ? 'Available for new releases' : 'پذیرش سفارشات جاری فعال است'}</span>
            </div>
            <div className="f-timezone-pill">
              <Clock className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
              <span>
                {isEn ? `Tehran (GMT+3:30): ${tehranTime || 'Active'}` : `ساعت تهران: ${tehranTime || 'فعال'} (کاری ۱۰ تا ۲۳)`}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="f-col">
          <h3 className="f-col-heading">{isEn ? 'Navigation' : 'دسترسی سریع'}</h3>
          <ul className="f-links">
            <li><a href="#work">{isEn ? 'Portfolio' : 'نمونه‌کارها'}</a></li>
            <li><a href="#services">{isEn ? 'Services' : 'خدمات تخصصی'}</a></li>
            <li><a href="#pricing">{isEn ? 'Pricing Plans' : 'تعرفه‌ها و پکیج‌ها'}</a></li>
            <li><a href="#standards">{isEn ? 'Workflow Standards' : 'استانداردهای همکاری'}</a></li>
            <li><a href="#faq">{isEn ? 'FAQ' : 'سؤالات متداول'}</a></li>
            <li><a href="./order.html">{isEn ? 'Order Form' : 'فرم ثبت سفارش'}</a></li>
          </ul>
        </div>

        {/* Column 3: Capabilities */}
        <div className="f-col">
          <h3 className="f-col-heading">{isEn ? 'Capabilities' : 'زمینه‌های تولید'}</h3>
          <ul className="f-links">
            <li><span>{isEn ? 'Beat-Synced Lyric Typography' : 'تایپوگرافی لیریک ریلز'}</span></li>
            <li><span>{isEn ? 'Kinetic Motion & Speedramps' : 'اسپیدرمپ و تدوین ویدیویی'}</span></li>
            <li><span>{isEn ? '1080p Instagram Master Export' : 'مسترینگ ۱۰۸۰p ضد فشرده‌سازی'}</span></li>
            <li><span>{isEn ? 'Single & Album Cover Artwork' : 'طراحی کاور موزیک'}</span></li>
            <li><span>{isEn ? 'Teasers & Visualizers' : 'تیزر تبلیغاتی انتشار ترک'}</span></li>
          </ul>
        </div>

        {/* Column 4: Channels & Socials */}
        <div className="f-col">
          <h3 className="f-col-heading">{isEn ? 'Connect' : 'راه‌های ارتباط'}</h3>
          <div className="f-social-list">
            <a
              href="https://t.me/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="f-social-pill"
              onClick={() => trackContactClick('telegram')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>
              <div>
                <span className="f-social-name">Telegram</span>
                <span className="f-social-handle ltr">@thepoo7an</span>
              </div>
            </a>

            <a
              href="https://instagram.com/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="f-social-pill"
              onClick={() => trackContactClick('instagram')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
              <div>
                <span className="f-social-name">Instagram</span>
                <span className="f-social-handle ltr">@thepoo7an</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Monumental Watermark Typography (Footer.design hallmark) */}
      <div className="f-monumental-wrap" aria-hidden="true">
        <span className="f-monumental-text">THEPOO7AN</span>
      </div>

      {/* Legal and Back to Top Bar */}
      <div className="f-bottom-bar">
        <div className="f-legal-text">
          <span>
            {isEn
              ? '© 2026 THEPOO7AN — All rights reserved.'
              : '© ۱۴۰۵ THEPOO7AN — تمام حقوق برای پیج thepoo7an محفوظ است.'}
          </span>
        </div>

        <button
          type="button"
          className="f-back-to-top"
          onClick={scrollToTop}
          aria-label={isEn ? 'Back to top of page' : 'بازگشت به ابتدای صفحه'}
        >
          <span>{isEn ? 'Back to top' : 'بازگشت به بالا'}</span>
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
