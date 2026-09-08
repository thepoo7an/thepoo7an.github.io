# THEPOO7AN — Official Website & Portfolio

وب‌سایت و پورتفولیوی رسمی **THEPOO7AN (پویان کریمی)** — متخصص تایپوگرافی لیریک موزیک، تدوین و ادیت ویدیویی و طراحی کاور موزیک.

The official website and portfolio for **THEPOO7AN (Pooyan Karimi)** — Music Lyric Typography, Video Editing, and Cover Artwork.

---

## 🌟 استک فنی (Tech Stack)

- **Frontend:** React 19, TypeScript
- **Bundler & Tooling:** Vite 6
- **Styling:** Tailwind CSS 4, Custom Modern Theme Tokens
- **Icons:** Lucide React
- **Analytics:** Google Analytics 4 (GA4) with client privacy and safe fallbacks
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions

---

## 🚀 اسکریپت‌های پروژه (Available Scripts)

```bash
# اجرای سرور توسعه روی پورت ۳۰۰۰
npm run dev

# بررسی کامل تایپ‌های تایپ‌اسکریپت بدون خروجی
npm run typecheck

# بیلد پروداکشن برای انتشار روی گیت‌هاب پیجز
npm run build

# پیش‌نمایش بیلد پروداکشن به صورت محلی
npm run preview

# اعتبارسنجی و لینت کدها
npm run lint

# بهینه‌سازی و فشرده‌سازی تصاویر پورتفولیو
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
3. نام را `VITE_GA_MEASUREMENT_ID` و مقدار را شناسه اکانت گوگل آنالیتیکس خود (مثلاً `G-ABC123XYZ`) قرار دهید.
4. با پوش بعدی در برنچ `main` یا `master`، بیلد پروژه مقدار شناسه را دریافت کرده و اسکریپت آنالیتیکس فعال خواهد شد.
*توجه:* در صورتی که این سکرت تنظیم نشده باشد، سایت بدون خطا و با لاگ ایمن کار خواهد کرد و هیچ اسکریپت اضافه‌ای لود نمی‌شود.

---

## 🌐 تحویل ابری ویدیوها (Media CDN Setup - اختیاری)

پروژه به صورت پیش‌فرض از ویدیوهای محلی در مسیر `public/videos/portfolio/` استفاده می‌کند. برای ترافیک‌های بالا یا لود سریع‌تر بین‌المللی:
1. فایل‌های ویدیو (`sample-1.mp4`, `sample-2.mp4`, ...) را در یک ارائه‌دهنده CDN نظیر **Cloudinary**, **Bunny.net**, یا **Cloudflare R2** آپلود کنید.
2. متغیر `VITE_MEDIA_BASE_URL` را در فایل `.env` یا سکرت‌های گیت‌هاب اکشن تنظیم کنید:
   ```env
   VITE_MEDIA_BASE_URL=https://media.thepoo7an.com
   ```
3. کامپوننت `Work.tsx` آدرس ویدیوها را به صورت خودکار با مسیر CDN تطبیق داده و قبل از تعامل کاربر، هیچ دیتایی دانلود نمی‌کند (`preload="none"` و لود بر اساس اینتنت و اسکرول).

---

## ⚡ پیش‌رندرینگ و سئو (SSG / Prerender)

فرآیند بیلد با اسکریپت اختصاصی `scripts/prerender.js`، متن کامل تمامی سکشن‌های فارسی را مستقیماً داخل `dist/index.html` تزریق می‌کند:
- خزنده‌های موتور جستجو (Googlebot و سایر بات‌ها) بدون نیاز به اجرای جاوااسکریپت به تمامی متون دسترسی دارند.
- در سمت کلاینت، عملیات هیدریشن از طریق `hydrateRoot` ری‌اکت ۱۹ به شکل آنی و بدون پرش تصویر (Flash) انجام می‌شود.

---

## 📁 ساختار پروژه (Project Structure)

```text
├── .github/workflows/deploy.yml   # فرآیند استقرار خودکار گیت‌هاب پیجز
├── public/                        # دارایی‌های استاتیک، فونت‌های محلی، ویدیوها و تصاویر
│   ├── fonts/                     # فونت وزیرمتن و فونت‌های مونو
│   ├── images/                    # تصاویر کاورها، هیرو و لوگو
│   ├── videos/                    # ویدیوهای پورتفولیو
│   ├── sitemap.xml                # نقشه سایت برای موتورهای جستجو
│   └── robots.txt                 # قوانین دسترسی خزنده‌های وب
├── src/
│   ├── components/                # کامپوننت‌های ماژولار (Hero, Work, Services, Pricing, FAQ, ...)
│   ├── context/                   # مدیریت تم (تاریک/روشن) و زبان (فارسی/انگلیسی)
│   ├── utils/                     # ماژول آنالیتیکس و ابزارهای کمکی
│   ├── App.tsx                    # ساختار ریشه اپلیکیشن و هماهنگی سکشن‌ها
│   ├── main.tsx                   # نقطه ورود ریکت
│   └── index.css                  # متغیرهای طراحی و استایل‌های اصلی
├── index.html                     # سند اصلی تک‌صفحه‌ای با اسکیماهای سئو
├── order.html                     # فرم مستقل و سبک ثبت سفارش با اتصال به تلگرام و اینستاگرام
├── package.json
└── README.md
```

---

## 🏷️ تنظیمات پیشنهادی ریپازیتوری (Repository About & Topics)

- **About:**
  > Official website & portfolio for THEPOO7AN — Music Lyric Typography, Video Editing & Creative Direction
- **Website URL:**
  > `https://thepoo7an.github.io`
- **Topics:**
  `lyric-video` `lyric-typography` `music-video` `react` `vite` `tailwindcss` `persian` `motion-graphics`

---

## 📄 لایسنس (License)

این پروژه تحت مجوز [MIT](LICENSE) منتشر شده است.
© 2026 Pooyan Karimi (THEPOO7AN).
