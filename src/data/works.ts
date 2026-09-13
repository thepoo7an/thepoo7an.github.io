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
    id: 'work-sample-1',
    category: 'reels',
    videoSrc: './videos/portfolio/sample-1.mp4',
    videoFallbacks: [],
    primarySrc: './images/portfolio/sample-1.webp',
    fallbacks: [],
    labelFa: 'پشیمون میشی و برمیگردی',
    labelEn: 'Lyric Typography Reel',
    specFa: '۹:۱۶ ریلز موزیک',
    specEn: '9:16 Reels',
  },
  {
    id: 'work-sample-2',
    category: 'reels',
    videoSrc: './videos/portfolio/sample-2.mp4',
    videoFallbacks: [
      './videos/portfolio/sample-2.webm',
    ],
    primarySrc: './images/portfolio/sample-2.webp',
    fallbacks: [],
    labelFa: 'دورم کن — میراد',
    labelEn: 'Dooram Kon — Meyraad',
    specFa: '۹:۱۶ ریلز موزیک',
    specEn: '9:16 Reels',
  },
  {
    id: 'work-sample-3',
    category: 'reels',
    videoSrc: './videos/portfolio/sample-3.mp4',
    videoFallbacks: [
      './videos/portfolio/sample-3.webm',
    ],
    primarySrc: './images/portfolio/sample-3.webp',
    fallbacks: [],
    labelFa: 'تایپوگرافی سه‌بعدی و موشن کروم',
    labelEn: '3D Chrome & Kinetic Typography',
    specFa: '۹:۱۶ ریلز موزیک',
    specEn: '9:16 Reels',
  },
  {
    id: 'work-cover-1',
    category: 'cover',
    primarySrc: './images/portfolio/cover-1.webp',
    fallbacks: [],
    labelFa: 'طراحی کاور موزیک — کروم ویژوالایزر',
    labelEn: 'Cover Art — 3D Chrome Visualizer',
    specFa: '۱:۱ کاور موزیک',
    specEn: '1:1 Cover Art',
  },
];

export const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map((item) => ({
  ...item,
  videoSrc: resolveMediaUrl(item.videoSrc),
  videoFallbacks: (item.videoFallbacks || []).map((src) => resolveMediaUrl(src)!),
}));
