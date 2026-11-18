import { ChevronDown, Send, Camera, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FAQS } from "../FAQ";

export interface FaqAndFooterSectionProps {
  isEn: boolean;
  openFaqId: string | null;
  onToggleFaq: (id: string) => void;
  ArrowIcon: LucideIcon;
}

export function FaqAndFooterSection({
  isEn,
  openFaqId,
  onToggleFaq,
  ArrowIcon,
}: FaqAndFooterSectionProps) {
  return (
    <>
      {/* ================= 7. EDITORIAL SPLIT FAQ ================= */}
      <section
        id="faq"
        className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24"
      >
        <div className="lg:col-span-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-primary">
            {isEn ? "FAQ" : "سؤالات متداول"}
          </p>
          <h2 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            {isEn ? "Frequently Asked Questions" : "پاسخ به سؤالات متداول"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isEn
              ? "Everything you need to know about pricing, turnaround, revisions, and required files."
              : "اطلاعات کامل درباره نحوه سفارش، زمان تحویل، اصلاحات و تسویه پروژه."}
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 min-h-[44px]"
            >
              <Send className="size-4" aria-hidden="true" />
              <span>
                {isEn ? "Ask directly on Telegram" : "پرسش مستقیم در تلگرام"}
              </span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 border-y border-border divide-y divide-border">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => onToggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-start font-semibold text-foreground min-h-[56px] hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">
                    {isEn ? faq.qEn : faq.qFa}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 text-muted-foreground text-start text-sm sm:text-[15px] leading-relaxed">
                    {isEn ? faq.aEn : faq.aFa}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 8. QUIET EDITORIAL FOOTER ================= */}
      <footer
        id="contact"
        className="border-t border-border pt-12 pb-6 flex flex-col gap-10"
        aria-label={isEn ? "Footer and Contact" : "ارتباط و پاورقی"}
      >
        <div className="rounded-2xl bg-card border border-border p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2 max-w-xl text-start">
            <p className="text-xs font-semibold text-primary">
              {isEn ? "Start Your Release" : "شروع پروژه جدید"}
            </p>
            <h2 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
              {isEn
                ? "Ready to give your music the visual presence it deserves?"
                : "آهنگ جدید در دست انتشار دارید؟ بیایید با هم بسازیمش."}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {isEn
                ? "Submit the project brief or message directly on Telegram and Instagram for quotes."
                : "برای برآورد دقیق هزینه یا شروع همکاری، فرم سفارش را پر کنید یا در تلگرام پیام دهید."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={isEn ? "./order.html?lang=en" : "./order.html"}
              className="font-semibold rounded-xl bg-primary text-primary-foreground px-6 min-h-[48px] inline-flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm w-full sm:w-auto whitespace-nowrap"
            >
              <span>
                {isEn ? "Get Project Estimate" : "دریافت برآورد پروژه"}
              </span>
              <ArrowIcon className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://t.me/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium rounded-xl bg-secondary hover:bg-accent border border-border text-foreground px-5 min-h-[48px] inline-flex items-center justify-center gap-2 active:scale-95 transition-colors text-sm flex-1 sm:flex-initial whitespace-nowrap"
            >
              <Send className="size-4 text-telegram" aria-hidden="true" />
              <span>Telegram</span>
            </a>
            <a
              href="https://www.instagram.com/thepoo7an"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium rounded-xl bg-secondary hover:bg-accent border border-border text-foreground px-5 min-h-[48px] inline-flex items-center justify-center gap-2 active:scale-95 transition-colors text-sm flex-1 sm:flex-initial whitespace-nowrap"
            >
              <Camera className="size-4" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground text-center sm:text-start">
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0" aria-hidden="true" />
            <span>
              {isEn
                ? "Operating hours: 10:00 – 23:00 (Tehran Time)"
                : "ساعت کاری پاسخگویی: ۱۰:۰۰ تا ۲۳:۰۰ (به وقت تهران)"}
            </span>
          </div>
          <div dir="ltr">
            © 2026 THEPOO7AN (پویان کریمی) · All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
