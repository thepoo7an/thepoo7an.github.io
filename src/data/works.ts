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
    videoFallbacks: [
      './videos/portfolio/sample-reel.webm',
    ],
    primarySrc: './images/portfolio/sample-1.webp',
    fallbacks: [
      './images/portfolio/sample-1.png',
    ],
    labelFa: 'پشیمون میشی و برمیگردی',
    labelEn: 'Lyric Typography Reel',
    specFa: '۹:۱۶ ریلز موزیک',
    specEn: '9:16 Reels',
  },
];

export const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map((item) => ({
  ...item,
  videoSrc: resolveMediaUrl(item.videoSrc),
  videoFallbacks: (item.videoFallbacks || []).map((src) => resolveMediaUrl(src)!),
}));
