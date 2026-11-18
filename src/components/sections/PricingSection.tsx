import type { UIEvent } from "react";
import { Check } from "lucide-react";

export interface PricingSectionProps {
  isEn: boolean;
  activePriceIndex: number;
  onPricingScroll: (e: UIEvent<HTMLDivElement>) => void;
}

export function PricingSection({
  isEn,
  activePriceIndex,
  onPricingScroll,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-primary">
          {isEn ? "Pricing" : "تعرفه‌ها و بسته‌ها"}
        </p>
        <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
          {isEn
            ? "Choose the Right Package for Your Release"
            : "پکیج مناسب پروژه‌تان را انتخاب کنید"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          {isEn
            ? "Transparent base pricing; final scope and fee are confirmed upfront before starting."
            : "قیمت پایه شفاف است؛ هزینه قطعی پس از بررسی فایل و پیش از شروع کار مشخص می‌شود."}
        </p>
      </div>

      <div
        className="price-grid grid md:grid-cols-3 gap-6 items-stretch"
        onScroll={onPricingScroll}
      >
        {/* Package 1: Basic Lyric */}
        <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl text-foreground">
                {isEn ? "Basic Lyric Typography" : "تایپوگرافی لیریک پایه"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? "Single 15–20s vertical reel"
                  : "یک ویدیوی ۱۵ تا ۲۰ ثانیه‌ای"}
              </p>
            </div>

            <div className="py-4 border-y border-border flex flex-col gap-1">
              <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                {isEn ? "From 150,000 Tomans" : "از ۱۵۰٬۰۰۰ تومان"}
              </strong>
              <span className="text-xs text-muted-foreground">
                {isEn
                  ? "Turnaround: 1 business day"
                  : "تحویل معمولاً ۱ روز کاری (۱۰ تا ۲۳)"}
              </span>
            </div>

            <ul className="text-sm text-muted-foreground flex flex-col gap-2.5 list-none p-0">
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Rhythmic beat-synced typography"
                    : "بیت‌سینک فریم‌به‌فریم با ریتم"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn ? "1 round of minor revisions" : "یک دور اصلاح جزئی"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Exported for Reels & Shorts (9:16)"
                    : "خروجی استاندارد Reels و Shorts"}
                </span>
              </li>
            </ul>
          </div>

          <a
            href={isEn ? "./order.html?plan=lyric&lang=en" : "./order.html?plan=lyric"}
            className="font-semibold rounded-xl bg-secondary hover:bg-accent text-secondary-foreground text-sm px-6 min-h-[48px] flex items-center justify-center transition-colors border border-border active:scale-95 whitespace-nowrap"
          >
            {isEn ? "Select Lyric Package" : "سفارش تایپوگرافی لیریک"}
          </a>
        </article>

        {/* Package 2: Video Edit + Lyric (Highlighted) */}
        <article className="rounded-2xl bg-card text-card-foreground border-2 border-primary p-6 sm:p-7 flex flex-col justify-between h-full gap-6 shadow-token-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-primary">
                {isEn ? "Most Popular" : "محبوب‌ترین انتخاب"}
              </span>
              <h3 className="font-bold text-xl text-foreground">
                {isEn ? "Video Edit + Lyric" : "ادیت ویدیو + لیریک"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? "Full visual dynamic production"
                  : "ترکیب کامل تدوین ویدیو، افکت و متن"}
              </p>
            </div>

            <div className="py-4 border-y border-border flex flex-col gap-1">
              <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                {isEn ? "From 300,000 Tomans" : "از ۳۰۰٬۰۰۰ تومان"}
              </strong>
              <span className="text-xs text-primary font-medium">
                {isEn
                  ? "Turnaround: 2 to 3 business days"
                  : "تحویل ۲ تا ۳ روز کاری"}
              </span>
            </div>

            <ul className="text-sm text-foreground flex flex-col gap-2.5 list-none p-0">
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Dynamic editing + kinetic typography"
                    : "ادیت ویدیو + تایپوگرافی متحرک"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Fine-tuning timing & visual revisions"
                    : "تنظیم دقیق بیت‌سینک و اصلاح جزئی"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Full HD 1080p 9:16 master"
                    : "خروجی عمودی ۱۰۸۰p بدون افت کیفیت"}
                </span>
              </li>
            </ul>
          </div>

          <a
            href={isEn ? "./order.html?plan=video&lang=en" : "./order.html?plan=video"}
            className="font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-sm px-6 min-h-[48px] flex items-center justify-center transition-all active:scale-95 whitespace-nowrap"
          >
            {isEn ? "Select Video + Lyric" : "سفارش ادیت و لیریک"}
          </a>
        </article>

        {/* Package 3: Monthly 4 Reels */}
        <article className="rounded-2xl bg-card text-card-foreground border border-border p-6 sm:p-7 flex flex-col justify-between h-full gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl text-foreground">
                {isEn ? "Monthly 4 Reels Package" : "پکیج ماهانه ۴ ریلز"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? "Dedicated weekly release slot"
                  : "اولویت اختصاصی انتشار هفتگی"}
              </p>
            </div>

            <div className="py-4 border-y border-border flex flex-col gap-1">
              <strong className="tabular-nums text-2xl sm:text-3xl font-extrabold text-foreground">
                {isEn ? "From 1,000,000 Tomans" : "از ۱٬۰۰۰٬۰۰۰ تومان"}
              </strong>
              <span className="text-xs text-muted-foreground">
                {isEn
                  ? "Scheduled weekly release calendar"
                  : "اولویت رندرینگ و تحویل هفتگی"}
              </span>
            </div>

            <ul className="text-sm text-muted-foreground flex flex-col gap-2.5 list-none p-0">
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "4 full video outputs per month"
                    : "۴ خروجی ویدیوی کامل در ماه"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Structured release timeline"
                    : "تقویم تحویل منظم هفتگی"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check
                  className="size-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {isEn
                    ? "Direct Telegram support"
                    : "پشتیبانی مستقیم تلگرام"}
                </span>
              </li>
            </ul>
          </div>

          <a
            href={isEn ? "./order.html?plan=monthly&lang=en" : "./order.html?plan=monthly"}
            className="font-semibold rounded-xl bg-secondary hover:bg-accent text-secondary-foreground text-sm px-6 min-h-[48px] flex items-center justify-center transition-colors border border-border active:scale-95 whitespace-nowrap"
          >
            {isEn ? "Select Monthly Plan" : "سفارش پکیج ماهانه"}
          </a>
        </article>
      </div>

      {/* Mobile Carousel Indicator Dots */}
      <div className="carousel-dots md:hidden" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={activePriceIndex === i ? "active" : ""} />
        ))}
      </div>
    </section>
  );
}
