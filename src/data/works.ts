export interface WorkItem {
  id: string;
  category: 'reels' | 'cover';
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
  {
    id: "instagram-DbgAe6cNsdr",
    category: "reels",
    videoSrc: "./videos/portfolio/DbgAe6cNsdr.mp4",
    primarySrc: "./images/portfolio/instagram/DbgAe6cNsdr.webp",
    fallbacks: [],
    labelFa: "نمونه لیریک ریل ۹:۱۶",
    labelEn: "Lyric reel · 9:16",
    isInstagram: true,
    instagramId: "DbgAe6cNsdr",
    instagramUrl: "https://www.instagram.com/reel/DbgAe6cNsdr/",
  },
  {
    id: "instagram-Dap1kn2yfAl",
    category: "reels",
    videoSrc: "./videos/portfolio/Dap1kn2yfAl.mp4",
    primarySrc: "./images/portfolio/instagram/Dap1kn2yfAl.webp",
    fallbacks: [],
    labelFa: "نمونه ویدیویی دورک",
    labelEn: "Dorc Video Sample",
    isInstagram: true,
    instagramId: "Dap1kn2yfAl",
    instagramUrl: "https://www.instagram.com/reel/Dap1kn2yfAl/",
  },
  {
    id: "youtube-Eh0NDneIYqA",
    category: "reels",
    primarySrc: "./images/portfolio/youtube/Eh0NDneIYqA.webp",
    fallbacks: [],
    labelFa: "تاپ بوکر افلیکس",
    labelEn: "Top Booker Aflix",
    isYouTube: true,
    youtubeId: "Eh0NDneIYqA",
    youtubeUrl: "https://www.youtube.com/shorts/Eh0NDneIYqA",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/Eh0NDneIYqA",
  },
];

export const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map((item) => ({
  ...item,
  videoSrc: resolveMediaUrl(item.videoSrc),
  primarySrc: resolveMediaUrl(item.primarySrc) || item.primarySrc,
  videoFallbacks: (item.videoFallbacks || []).map((src) => resolveMediaUrl(src)!),
}));

export const FEATURED_REELS: Record<'lyric916' | 'dorc' | 'topbooker', WorkItem> = {
  lyric916: WORK_ITEMS[0],
  dorc: WORK_ITEMS[1],
  topbooker: WORK_ITEMS[2],
};
