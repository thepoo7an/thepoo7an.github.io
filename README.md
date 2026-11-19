# THEPOO7AN — Official Website & Portfolio

وب‌سایت و پورتفولیوی رسمی **THEPOO7AN (پویان کریمی)** — متخصص تایپوگرافی لیریک موزیک، تدوین و ادیت ویدیویی و طراحی کاور موزیک.

The official website and portfolio for **THEPOO7AN (Pooyan Karimi)** — Music Lyric Typography, Video Editing, and Cover Artwork.

---

## 🌟 استک فنی (Tech Stack)

- **Frontend:** React 19, TypeScript
- **Bundler & Tooling:** Vite 6
- **Styling:** Tailwind CSS 4, Custom Modern Theme Tokens (`#050506` Obsidian Dark / `#fafafa` Light)
- **Icons:** Lucide React
- **Analytics:** Google Analytics 4 (GA4) with client privacy and safe fallbacks (`src/utils/analytics.ts`)
- **SSG & QA:** Static Prerender (`scripts/prerender.js`) + Smoke Test Suite (`scripts/smoke-test.js`)
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) + scheduled social feed sync (`.github/workflows/update-youtube.yml`)

---

## 🚀 اسکریپت‌های پروژه (Available Scripts)

```bash
# اجرای سرور توسعه روی پورت ۳۰۰۰
npm run dev

# بررسی کامل تایپ‌های تایپ‌اسکریپت بدون تولید خروجی
npm run typecheck

# اعتبارسنجی کدها با تایپ‌اسکریپت
npm run lint

# بیلد پروداکشن + پیش‌رندرینگ استاتیک HTML و به‌روزرسانی sitemap
npm run build

# اجرای تست‌های دود (Smoke Tests) روی خروجی dist و فیدهای JSON
npm test

# پیش‌نمایش بیلد پروداکشن به صورت محلی
npm run preview

# بهینه‌سازی و فشرده‌سازی تصاویر پورتفولیو (با Sharp)
npm run compress-images
```

---

## ⚙️ پیکربندی گوگل آنالیتیکس (GA4 Setup)

برای ثبت و تحلیل آمار بازدیدها و رخدادهای کلیدی (مانند ثبت لید سفارش و کلیک روی دایرکت اینستاگرام و تلگرام)، می‌توانید شناسه سنجش GA4 را تنظیم کنید:

### ۱. اجرای محلی (Local Development)
فایل `.env.example` را به `.env` کپی کنید و شناسه را وارد نمایید:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### ۲. استقرار خودکار روی گیت‌هاب پیجز (GitHub Actions)
در تنظیمات ریپازیتوری گیت‌هاب:
1. وارد مسیر **Settings** > **Secrets and variables** > **Actions** شوید.
2. روی **New repository secret** کلیک کنید.
3. نام را `VITE_GA_MEASUREMENT_ID` و مقدار را شناسه اکانت گوگل آنالیتیکس خود قرار دهید.
4. در هر پوش به برنچ `main` یا `master`، پایپ‌لاین CI به ترتیب `npm ci`، `npm run typecheck`، `npm run build` و `npm test` را اجرا کرده و در صورت قبولی، خروجی `dist/` را روی GitHub Pages منتشر می‌کند.

*توجه:* در صورتی که این سکرت تنظیم نشده باشد، سایت بدون خطا کار می‌کند و اسکریپت اضافه‌ای تزریق نمی‌شود.

---

## 🌐 تحویل ابری ویدیوها (Media CDN Setup - اختیاری)

پروژه به صورت پیش‌فرض از ویدیوهای محلی MP4 (`faststart`- بهینه‌شده) در مسیر `public/videos/portfolio/` (مانند `DbgAe6cNsdr.mp4`، `DavRKRKNwhu.mp4` و ...) و تصاویر WebP محلی استفاده می‌کند. برای میزبانی روی CDN:
1. فایل‌های پوشه `public/videos/portfolio/` و `public/images/portfolio/` را روی CDN دلخواه (نظیر **Cloudflare R2**، **Bunny.net** یا **Cloudinary**) آپلود کنید.
2. متغیر `VITE_MEDIA_BASE_URL` را در فایل `.env` یا سکرت‌های GitHub Actions تنظیم کنید:
   ```env
   VITE_MEDIA_BASE_URL=https://media.thepoo7an.com
   ```
3. تابع `resolveMediaUrl()` در `src/data/works.ts` مسیرهای نسبی (`./...`) را با `VITE_MEDIA_BASE_URL` بازنویسی می‌کند؛ همچنین کارت‌های پورتفولیو ابتدا کاورهای سبک WebP را بارگذاری کرده و پلیر ویدیو (`WorkLightbox.tsx`) تنها هنگام بازشدن لایت‌باکس با `preload="metadata"` بارگذاری می‌شود.

---

## ⚡ پیش‌رندرینگ، سئو و فیدهای خودکار (SSG, SEO & Feed Sync)

- **پیش‌رندرینگ (`scripts/prerender.js`):** هنگام `npm run build`، محتوای کامل فارسی از `src/entry-server.tsx` داخل `dist/index.html` رندر شده و `lastmod` در `public/sitemap.xml` و `dist/sitemap.xml` همگام‌سازی می‌شود تا خزنده‌ها و کاربران در لود اولیه محتوای کامل را دریافت کنند و هیدریشن روی `hydrateRoot` انجام شود.
- **همگام‌سازی شبکه‌ها (`scripts/fetch-*.js`):** ورک‌فلو `.github/workflows/update-youtube.yml` به صورت زمان‌بندی‌شده هر ۶ ساعت فیدهای یوتیوب، تیک‌تاک (با اعتبارسنجی مالکیت `@thepoo7an`) و اینستاگرام را بررسی و متادیتا/کاورهای جدید را ذخیره می‌کند.
- **تست‌های خودکار (`scripts/smoke-test.js`):** پس از بیلد، وجود سکشن `#portfolio` (و انکر `#work`)، متون کلیدی سئو، صحت ساختار قیمت‌ها، یکپارچگی مالکیت تیک‌تاک و `faststart` (`moov` پیش از `mdat`) بودن همه ویدیوهای `MP4` را بررسی می‌کند.

---

## 📁 ساختار پروژه (Project Structure)

```text
├── .github/workflows/
│   ├── deploy.yml                 # CI/CD گیت‌هاب پیجز (typecheck + build + smoke test + deploy)
│   └── update-youtube.yml         # همگام‌سازی خودکار فید یوتیوب، تیک‌تاک و اینستاگرام
├── public/                        # دارایی‌های استاتیک، PWA، فونت، تصویر و ویدیو
│   ├── data/                      # نسخه‌های استاتیک JSON (instagram, latest-youtube, tiktok)
│   ├── fonts/                     # فونت‌های محلی Vazirmatn و Unbounded
│   ├── icons/                     # آیکون‌های اپلیکیشن و PWA
│   ├── images/portfolio/          # کاورهای بهینه‌شده WebP/JPG بر اساس پلتفرم
│   ├── videos/portfolio/          # فایل‌های MP4 بهینه‌شده (faststart) برای پخش در لایت‌باکس
│   ├── 404.html                   # صفحه خطای دوزبانه با همگام‌سازی تم
│   ├── manifest.webmanifest       # مانیفست PWA
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── compress-images.js         # فشرده‌سازی تصاویر با Sharp
│   ├── fetch-instagram.js         # همگام‌سازی متادیتای اینستاگرام
│   ├── fetch-latest-youtube.js    # دریافت آخرین ویدیوی یوتیوب از RSS
│   ├── fetch-tiktok.js            # دریافت و اعتبارسنجی مالکیت ویدیوهای تیک‌تاک (@thepoo7an)
│   ├── generate-icons.js          # تولید آیکون‌های PWA
│   ├── prerender.js               # پیش‌رندرینگ استاتیک dist/index.html
│   └── smoke-test.js              # تست‌های دود بعد از بیلد
├── src/
│   ├── components/
│   │   ├── sections/              # PortfolioSection, ServicesAndWorkflowSection, PricingSection, FaqAndFooterSection
│   │   ├── FAQ.tsx                # بخش پرسش‌های متداول
│   │   ├── MobileTabBar.tsx       # نوار ناوبری پایین موبایل با وضعیت بخش فعال
│   │   ├── PortfolioMedia.tsx     # نمایش تصاویر و فال‌بک‌های پورتفولیو
│   │   ├── Screen2.tsx            # هدر، هیرو و ارکستراسیون کامل لندینگ
│   │   └── WorkLightbox.tsx       # لایت‌باکس پخش ویدیو/امبد با تله فوکوس کیبورد
│   ├── context/                   # ThemeContext و LanguageContext (FA RTL / EN LTR)
│   ├── data/                      # works.ts, titleOverrides.ts و فیدهای JSON/TS
│   ├── hooks/                     # useActiveSection.ts (تشخیص سکشن فعال هنگام اسکرول)
│   ├── utils/                     # analytics.ts و instagram.ts
│   ├── App.tsx                    # ریشه اپلیکیشن
│   ├── entry-server.tsx           # نقطه ورود رندر استاتیک (SSG)
│   ├── main.tsx                   # نقطه ورود کلاینت (hydrateRoot)
│   ├── index.css                  # توکن‌های طراحی Obsidian و قوانین واکنش‌گرا
│   └── harmony.css                # استایل‌های مکمل
├── index.html                     # سند اصلی تک‌صفحه‌ای با متاتگ‌ها و JSON-LD
├── order.html                     # فرم مستقل و دوزبانه ثبت سفارش (FA/EN)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🏷️ تنظیمات پیشنهادی ریپازیتوری (Repository About & Topics)

- **About:**
  > Official website & portfolio for THEPOO7AN (Pooyan Karimi) — Music Lyric Typography, Video Editing, and Cover Artwork.
- **Website URL:**
  > `https://thepoo7an.github.io`
- **Topics:**
  `lyric-video` `lyric-typography` `music-video` `cover-art` `motion-graphics` `react` `vite` `tailwindcss` `persian` `portfolio`

---

## 📄 لایسنس (License)

این پروژه تحت مجوز [MIT](LICENSE) منتشر شده است.
© 2026 Pooyan Karimi (THEPOO7AN).
