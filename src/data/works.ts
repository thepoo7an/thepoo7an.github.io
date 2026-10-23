export interface WorkItem {
  id: string;
  category: 'reels' | 'cover';
  platform: 'instagram' | 'youtube' | 'tiktok';
  videoSrc?: string;
  videoFallbacks?: string[];
  primarySrc: string;
  fallbacks: string[];
  labelFa: string;
  labelEn: string;
  specFa?: string;
  specEn?: string;
  isYouTube?: boolean;
  youtubeId?: string;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  isTikTok?: boolean;
  tiktokId?: string;
  tiktokUrl?: string;
  isInstagram?: boolean;
  instagramId?: string;
  instagramUrl?: string;
  instagramEmbedUrl?: string;
  externalUrl?: string;
}

const MEDIA_BASE_URL = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)?.replace(/\/+$/, '') || '';

export function resolveMediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (!MEDIA_BASE_URL || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return path.replace(/^\.\//, `${MEDIA_BASE_URL}/`);
}

export const RAW_WORK_ITEMS: WorkItem[] = [
  // ================= INSTAGRAM REELS (with lossless local MP4 playback) =================
  {
    id: "instagram-DbgAe6cNsdr",
    category: "reels",
    platform: "instagram",
    videoSrc: "./videos/portfolio/DbgAe6cNsdr.mp4",
    primarySrc: "./images/portfolio/instagram/DbgAe6cNsdr.webp",
    fallbacks: ["./images/portfolio/instagram/DbgAe6cNsdr.jpg"],
    labelFa: "تایپوگرافی سینمایی | موزیک ریلز",
    labelEn: "Cinematic Music Reel Typography",
    specFa: "تایپوگرافی لیریک · بیت‌سینک فریم‌به‌فریم",
    specEn: "Kinetic Typography · Sub-frame Beat Sync",
    isInstagram: true,
    instagramId: "DbgAe6cNsdr",
    instagramUrl: "https://www.instagram.com/reel/DbgAe6cNsdr/",
    externalUrl: "https://www.instagram.com/reel/DbgAe6cNsdr/",
  },
  {
    id: "instagram-DavRKRKNwhu",
    category: "reels",
    platform: "instagram",
    videoSrc: "./videos/portfolio/DavRKRKNwhu.mp4",
    primarySrc: "./images/portfolio/instagram/DavRKRKNwhu.webp",
    fallbacks: ["./images/portfolio/instagram/DavRKRKNwhu.jpg"],
    labelFa: "موزیک ویدیو و لیریک • Yxngzi",
    labelEn: "Music Video & Lyric • Yxngzi",
    specFa: "ادیت ویدیو و لیریک",
    specEn: "Video Edit & Lyric Sync",
    isInstagram: true,
    instagramId: "DavRKRKNwhu",
    instagramUrl: "https://www.instagram.com/reel/DavRKRKNwhu/",
    externalUrl: "https://www.instagram.com/reel/DavRKRKNwhu/",
  },
  {
    id: "instagram-Dap1kn2yfAl",
    category: "reels",
    platform: "instagram",
    videoSrc: "./videos/portfolio/Dap1kn2yfAl.mp4",
    primarySrc: "./images/portfolio/instagram/Dap1kn2yfAl.webp",
    fallbacks: ["./images/portfolio/instagram/Dap1kn2yfAl.jpg"],
    labelFa: "تایپوگرافی لیریک • Dorcci",
    labelEn: "Lyric Typography • Dorcci",
    specFa: "ادیت ریتمیک و تایتل موشن",
    specEn: "Rhythmic Edit & Title Motion",
    isInstagram: true,
    instagramId: "Dap1kn2yfAl",
    instagramUrl: "https://www.instagram.com/reel/Dap1kn2yfAl/",
    externalUrl: "https://www.instagram.com/reel/Dap1kn2yfAl/",
  },
  {
    id: "instagram-Dc5pgATNmAk",
    category: "reels",
    platform: "instagram",
    videoSrc: "./videos/portfolio/Dc5pgATNmAk.mp4",
    primarySrc: "./images/portfolio/instagram/Dc5pgATNmAk.webp",
    fallbacks: ["./images/portfolio/instagram/Dc5pgATNmAk.jpg"],
    labelFa: "ادیت ریلز • Hossein Tiem",
    labelEn: "Reel Edit • Hossein Tiem",
    specFa: "اصلاح رنگ و افکت‌های تصویری",
    specEn: "Color Grading & Motion VFX",
    isInstagram: true,
    instagramId: "Dc5pgATNmAk",
    instagramUrl: "https://www.instagram.com/reel/Dc5pgATNmAk/",
    externalUrl: "https://www.instagram.com/reel/Dc5pgATNmAk/",
  },
  {
    id: "instagram-DcwIWGmNrwz",
    category: "reels",
    platform: "instagram",
    videoSrc: "./videos/portfolio/DcwIWGmNrwz.mp4",
    primarySrc: "./images/portfolio/instagram/DcwIWGmNrwz.webp",
    fallbacks: ["./images/portfolio/instagram/DcwIWGmNrwz.jpg"],
    labelFa: "تایپوگرافی موزیک • Elnnaazi",
    labelEn: "Music Typography • Elnnaazi",
    specFa: "تایپوگرافی فارسی لیریک",
    specEn: "Persian Lyric Typography",
    isInstagram: true,
    instagramId: "DcwIWGmNrwz",
    instagramUrl: "https://www.instagram.com/reel/DcwIWGmNrwz/",
    externalUrl: "https://www.instagram.com/reel/DcwIWGmNrwz/",
  },
  {
    id: "instagram-DceJ1xrNPlo",
    category: "reels",
    platform: "instagram",
    primarySrc: "./images/portfolio/instagram/DceJ1xrNPlo.webp",
    fallbacks: ["./images/portfolio/instagram/DceJ1xrNPlo.jpg"],
    labelFa: "موزیک ریلز • Tiem",
    labelEn: "Music Reel • Tiem",
    specFa: "ادیت ریلز برای انتشار سراسری",
    specEn: "Release Promo Reel Edit",
    isInstagram: true,
    instagramId: "DceJ1xrNPlo",
    instagramUrl: "https://www.instagram.com/reel/DceJ1xrNPlo/",
    externalUrl: "https://www.instagram.com/reel/DceJ1xrNPlo/",
  },

  // ================= YOUTUBE SHORTS & RELEASES =================
  {
    id: "youtube-tU5XCWlE71o",
    category: "reels",
    platform: "youtube",
    primarySrc: "https://i.ytimg.com/vi/tU5XCWlE71o/hqdefault.jpg",
    fallbacks: ["https://i.ytimg.com/vi/tU5XCWlE71o/maxresdefault.jpg"],
    labelFa: "موزیک ریلز • سمی لون",
    labelEn: "YouTube Shorts • Samilone",
    specFa: "جدیدترین انتشار یوتیوب",
    specEn: "Latest YouTube Release",
    isYouTube: true,
    youtubeId: "tU5XCWlE71o",
    youtubeUrl: "https://www.youtube.com/shorts/tU5XCWlE71o",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/tU5XCWlE71o",
    externalUrl: "https://www.youtube.com/shorts/tU5XCWlE71o",
  },
  {
    id: "youtube-Eh0NDneIYqA",
    category: "reels",
    platform: "youtube",
    primarySrc: "./images/portfolio/youtube/Eh0NDneIYqA.webp",
    fallbacks: [],
    labelFa: "تاپ بوکر افلیکس",
    labelEn: "Top Booker Aflix",
    specFa: "ادیت ریتمیک پرسرعت و موشن",
    specEn: "High-tempo Cutting & VFX",
    isYouTube: true,
    youtubeId: "Eh0NDneIYqA",
    youtubeUrl: "https://www.youtube.com/shorts/Eh0NDneIYqA",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/Eh0NDneIYqA",
    externalUrl: "https://www.youtube.com/shorts/Eh0NDneIYqA",
  },

  // ================= TIKTOK RELEASES =================
  {
    id: "tiktok-7601941689380408590",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7663583011870395661.webp",
    fallbacks: [],
    labelFa: "وِلت نکردم • Dorcci",
    labelEn: "Dorcci • I Didn't Leave You",
    specFa: "تایپوگرافی لیریک در تیک‌تاک",
    specEn: "TikTok Lyric Motion",
    isTikTok: true,
    tiktokId: "7601941689380408590",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7601941689380408590",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7601941689380408590",
  },
  {
    id: "tiktok-7657172874528328973",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7651319183732428045.webp",
    fallbacks: [],
    labelFa: "نمیخواستم بکشه قفس دورم • Hoodad",
    labelEn: "Hoodadk4 • Cage Around Me",
    specFa: "ادیت و تایپوگرافی موزیک",
    specEn: "Music Video & Typography",
    isTikTok: true,
    tiktokId: "7657172874528328973",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7657172874528328973",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7657172874528328973",
  },
  {
    id: "tiktok-7649831737417157902",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7661969082933120270.webp",
    fallbacks: [],
    labelFa: "خراب کردی • شایان اشراقی",
    labelEn: "Shayan Eshraghi • You Ruined It",
    specFa: "موزیک ریلز و جلوه‌های ویژه",
    specEn: "Music Reel & Visual Motion",
    isTikTok: true,
    tiktokId: "7649831737417157902",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7649831737417157902",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7649831737417157902",
  },
  {
    id: "tiktok-7648725433076223245",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7664934927691009294.webp",
    fallbacks: [],
    labelFa: "موزیک دپ • کیارش",
    labelEn: "Kiarash • Dep Track",
    specFa: "تایپوگرافی احساسی لیریک",
    specEn: "Atmospheric Lyric Motion",
    isTikTok: true,
    tiktokId: "7648725433076223245",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7648725433076223245",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7648725433076223245",
  },
  {
    id: "tiktok-7649444431690517773",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7666151671734603022.webp",
    fallbacks: [],
    labelFa: "موزیک ریلز • Tiem",
    labelEn: "Tiem • Reel Visuals",
    specFa: "ادیت ویدیویی ریتمیک",
    specEn: "Rhythmic Cut & Visual Sync",
    isTikTok: true,
    tiktokId: "7649444431690517773",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7649444431690517773",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7649444431690517773",
  },
  {
    id: "tiktok-7541129421323783479",
    category: "reels",
    platform: "tiktok",
    primarySrc: "./images/portfolio/tiktok/7541129421323783479.webp",
    fallbacks: [],
    labelFa: "تایپوگرافی ریتمیک • ThePoo7an",
    labelEn: "ThePoo7an • Kinetic Edit",
    specFa: "تایپوگرافی کلمات با بیت موزیک",
    specEn: "Kinetic Syllable Typography",
    isTikTok: true,
    tiktokId: "7541129421323783479",
    tiktokUrl: "https://www.tiktok.com/@thepoo7an/video/7541129421323783479",
    externalUrl: "https://www.tiktok.com/@thepoo7an/video/7541129421323783479",
  },
];

export const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map((item) => ({
  ...item,
  videoSrc: resolveMediaUrl(item.videoSrc),
  primarySrc: resolveMediaUrl(item.primarySrc) || item.primarySrc,
  videoFallbacks: (item.videoFallbacks || []).map((src) => resolveMediaUrl(src)!),
  fallbacks: (item.fallbacks || []).map((src) => resolveMediaUrl(src)!),
}));

export const FEATURED_REELS: Record<'lyric916' | 'dorc' | 'topbooker', WorkItem> = {
  lyric916: WORK_ITEMS[0],
  dorc: WORK_ITEMS[2],
  topbooker: WORK_ITEMS[7],
};
