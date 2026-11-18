import { ArrowLeft, ArrowRight } from "lucide-react";

export interface ServicesAndWorkflowSectionProps {
  isEn: boolean;
}

const SERVICES = [
  {
    num: "01",
    plan: "lyric",
    titleFa: "تایپوگرافی لیریک موزیک",
    titleEn: "Lyric Typography",
    descFa:
      "تایپوگرافی متحرک ریتمیک، انیمیشن فریم‌به‌فریم کلمات و بیت‌سینک دقیق با ضرب‌آهنگ و وکال.",
    descEn:
      "Kinetic typography, custom font direction, and exact syllable-to-beat synchronization.",
    ctaFa: "سفارش تایپوگرافی",
    ctaEn: "Order Lyric Typography",
  },
  {
    num: "02",
    plan: "video",
    titleFa: "ادیت ویدیو و ریلز",
    titleEn: "Video Edit + Lyric",
    descFa:
      "اصلاح رنگ سینمایی، کات‌های ریتمیک، افکت‌های بصری متناسب با مود ترک و خروجی عمودی ۹:۱۶.",
    descEn:
      "Color grading, rhythmic cuts, visual transitions, and vertical 9:16 mastering.",
    ctaFa: "سفارش ادیت + لیریک",
    ctaEn: "Order Video + Lyric",
  },
  {
    num: "03",
    plan: "cover",
    titleFa: "طراحی کاور موزیک",
    titleEn: "Music Cover Artwork",
    descFa:
      "طراحی پوستر و آرت‌ورک مربعی ۳۰۰۰×۳۰۰۰ با استاندارد پلتفرم‌های اسپاتیفای و اپل موزیک.",
    descEn:
      "High-resolution 3000x3000px artwork calibrated for Spotify, Apple Music, and SoundCloud.",
    ctaFa: "سفارش طراحی کاور",
    ctaEn: "Order Cover Artwork",
  },
  {
    num: "04",
    plan: "monthly",
    titleFa: "پکیج ماهانه تولید محتوا",
    titleEn: "Monthly Content Growth",
    descFa:
      "۴ ریلز در ماه با تقویم تحویل منظم هفتگی و اولویت رندرینگ برای انتشار پیوسته آرتیست.",
    descEn:
      "Consistent weekly reel production calendar ensuring steady release momentum.",
    ctaFa: "سفارش پکیج ماهانه",
    ctaEn: "Order Monthly Package",
  },
] as const;

const WORKFLOW_STEPS = [
  {
    step: "01",
    titleFa: "ارسال فایل و بریف",
    titleEn: "Send Track & Brief",
    descFa:
      "ارسال فایل صوتی، مشخص کردن بخش موردنظر لیریک، و هماهنگی سبک بصری در تلگرام یا فرم سفارش.",
    descEn:
      "Share your audio track, lyric section, and visual references via order form or Telegram.",
  },
  {
    step: "02",
    titleFa: "طراحی و بیت‌سینک",
    titleEn: "Design & Beat-Sync",
    descFa:
      "انتخاب فونت و کانسپت متناسب با موزیک، ساخت موشن تایپوگرافی و سینک دقیق کلمات با ضرب آهنگ.",
    descEn:
      "Custom font pairing, kinetic motion design, and sub-frame beat alignment.",
  },
  {
    step: "03",
    titleFa: "تحویل فایل نهایی ۱۰۸۰p",
    titleEn: "Lossless 1080p Master",
    descFa:
      "ارسال پیش‌نمایش برای بررسی نهایی و تحویل فایل استاندارد ۹:۱۶ بدون واترمارک آماده انتشار.",
    descEn:
      "Preview review followed by uncompressed 9:16 master export ready for release.",
  },
] as const;

export function ServicesAndWorkflowSection({
  isEn,
}: ServicesAndWorkflowSectionProps) {
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <>
      {/* ================= 4. STUDIO SERVICES (2x2 Architectural Grid) ================= */}
      <section
        id="services"
        className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-primary">
            {isEn ? "Studio Capabilities" : "خدمات تخصصی استودیو"}
          </p>
          <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
            {isEn
              ? "Tailored Visual Solutions for Music Releases"
              : "راهکارهای ویدیویی برای انتشار حرفه‌ای موزیک"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            {isEn
              ? "Kinetic typography, rhythmic video cutting, and official artwork crafted specifically for artists and music producers."
              : "تایپوگرافی لیریک، ادیت ریتمیک و کاور آرت اختصاصی متناسب با فضا و مود هر قطعه."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="bg-card p-6 sm:p-8 flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2.5">
                <span className="font-display tabular-nums text-xs font-bold text-primary">
                  {svc.num}.
                </span>
                <h3 className="font-bold text-lg sm:text-xl text-foreground">
                  {isEn ? svc.titleEn : svc.titleFa}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isEn ? svc.descEn : svc.descFa}
                </p>
              </div>

              <div className="pt-1">
                <a
                  href={`./order.html?plan=${svc.plan}${isEn ? "&lang=en" : ""}`}
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 active:scale-95 transition-transform"
                >
                  <span>{isEn ? svc.ctaEn : svc.ctaFa}</span>
                  <ArrowIcon className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. THREE-STEP PRODUCTION WORKFLOW ================= */}
      <section
        id="workflow"
        className="flex flex-col gap-6 sm:gap-8 scroll-mt-24"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-primary">
            {isEn ? "Workflow" : "مراحل همکاری"}
          </p>
          <h2 className="font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
            {isEn
              ? "From Track to Master in Three Steps"
              : "از فایل صوتی تا خروجی نهایی در ۳ گام"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            {isEn
              ? "A clear, transparent workflow from initial brief to final uncompressed delivery."
              : "روند کاری شفاف، سریع و بدون ابهام از دریافت فایل تا ارسال مستر نهایی."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-8">
          {WORKFLOW_STEPS.map((item) => (
            <div key={item.step} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display tabular-nums text-lg font-bold text-primary">
                  {item.step}
                </span>
                <div className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg text-foreground">
                {isEn ? item.titleEn : item.titleFa}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn ? item.descEn : item.descFa}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
