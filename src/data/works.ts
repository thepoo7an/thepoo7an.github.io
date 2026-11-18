import { INITIAL_INSTAGRAM_DATA, type InstagramData, type InstagramReel } from './instagram';
import { INITIAL_YOUTUBE_DATA, type YouTubeVideoData, type YouTubeVideoEntry } from './youtube';
import { INITIAL_TIKTOK_DATA, type TikTokData, type TikTokVideo } from './tiktok';
import { getBilingualDisplayTitle } from './titleOverrides';

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
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
  showcaseRole?: 'latest' | 'most-viewed';
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

export interface PlatformHighlight {
  platform: 'instagram' | 'youtube' | 'tiktok';
  profileUrl: string;
  handle: string;
  latest: WorkItem;
  mostViewed: WorkItem;
  hasVerifiedMostViewedCount: boolean;
}

const MEDIA_BASE_URL = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)?.replace(/\/+$/, '') || '';

export function resolveMediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (!MEDIA_BASE_URL || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return path.replace(/^\.\//, `${MEDIA_BASE_URL}/`);
}

function normalizeWorkItem(item: WorkItem): WorkItem {
  return {
    ...item,
    videoSrc: resolveMediaUrl(item.videoSrc),
    primarySrc: resolveMediaUrl(item.primarySrc) || item.primarySrc,
    videoFallbacks: (item.videoFallbacks || []).map((src) => resolveMediaUrl(src)!),
    fallbacks: (item.fallbacks || []).map((src) => resolveMediaUrl(src)!),
  };
}

export function toPersianDigits(input: string | number): string {
  const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/\d/g, (d) => digits[Number(d)]);
}

export function formatViewCount(views: number, isEn: boolean): string {
  if (views >= 1_000_000) {
    const val = (views / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return isEn ? `${val}M views` : `${toPersianDigits(val)} میلیون بازدید`;
  }
  if (views >= 10_000) {
    const val = (views / 1_000).toFixed(1).replace(/\.0$/, '');
    return isEn ? `${val}K views` : `${toPersianDigits(val)} هزار بازدید`;
  }
  const formatted = views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return isEn ? `${formatted} views` : `${toPersianDigits(formatted.replace(/,/g, '٬'))} بازدید`;
}

export function formatShortDate(iso?: string, isEn = false): string {
  if (!iso) return '';
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return '';
  const d = new Date(ts);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (isEn) {
    return `${monthsEn[month - 1]} ${day}, ${year}`;
  }
  const mm = month < 10 ? `0${month}` : String(month);
  const dd = day < 10 ? `0${day}` : String(day);
  return toPersianDigits(`${year}/${mm}/${dd}`);
}

export const RAW_WORK_ITEMS: WorkItem[] = [
  // ================= INSTAGRAM REELS (with lossless local MP4 playback) =================
  {
    id: 'instagram-DbgAe6cNsdr',
    category: 'reels',
    platform: 'instagram',
    videoSrc: './videos/portfolio/DbgAe6cNsdr.mp4',
    primarySrc: './images/portfolio/instagram/DbgAe6cNsdr.webp',
    fallbacks: ['./images/portfolio/instagram/DbgAe6cNsdr.jpg'],
    labelFa: 'تایپوگرافی سینمایی | موزیک ریلز',
    labelEn: 'Cinematic Music Reel Typography',
    specFa: 'تایپوگرافی لیریک · بیت‌سینک فریم‌به‌فریم',
    specEn: 'Kinetic Typography · Sub-frame Beat Sync',
    isInstagram: true,
    instagramId: 'DbgAe6cNsdr',
    instagramUrl: 'https://www.instagram.com/reel/DbgAe6cNsdr/',
    externalUrl: 'https://www.instagram.com/reel/DbgAe6cNsdr/',
  },
  {
    id: 'instagram-DavRKRKNwhu',
    category: 'reels',
    platform: 'instagram',
    videoSrc: './videos/portfolio/DavRKRKNwhu.mp4',
    primarySrc: './images/portfolio/instagram/DavRKRKNwhu.webp',
    fallbacks: ['./images/portfolio/instagram/DavRKRKNwhu.jpg'],
    labelFa: 'موزیک ویدیو و لیریک • Yxngzi',
    labelEn: 'Music Video & Lyric • Yxngzi',
    specFa: 'ادیت ویدیو و لیریک',
    specEn: 'Video Edit & Lyric Sync',
    isInstagram: true,
    instagramId: 'DavRKRKNwhu',
    instagramUrl: 'https://www.instagram.com/reel/DavRKRKNwhu/',
    externalUrl: 'https://www.instagram.com/reel/DavRKRKNwhu/',
  },
  {
    id: 'instagram-Dap1kn2yfAl',
    category: 'reels',
    platform: 'instagram',
    videoSrc: './videos/portfolio/Dap1kn2yfAl.mp4',
    primarySrc: './images/portfolio/instagram/Dap1kn2yfAl.webp',
    fallbacks: ['./images/portfolio/instagram/Dap1kn2yfAl.jpg'],
    labelFa: 'تایپوگرافی لیریک • Dorcci',
    labelEn: 'Lyric Typography • Dorcci',
    specFa: 'ادیت ریتمیک و تایتل موشن',
    specEn: 'Rhythmic Edit & Title Motion',
    isInstagram: true,
    instagramId: 'Dap1kn2yfAl',
    instagramUrl: 'https://www.instagram.com/reel/Dap1kn2yfAl/',
    externalUrl: 'https://www.instagram.com/reel/Dap1kn2yfAl/',
  },
  {
    id: 'instagram-Dc5pgATNmAk',
    category: 'reels',
    platform: 'instagram',
    videoSrc: './videos/portfolio/Dc5pgATNmAk.mp4',
    primarySrc: './images/portfolio/instagram/Dc5pgATNmAk.webp',
    fallbacks: ['./images/portfolio/instagram/Dc5pgATNmAk.jpg'],
    labelFa: 'ادیت ریلز • Hossein Tiem',
    labelEn: 'Reel Edit • Hossein Tiem',
    specFa: 'اصلاح رنگ و افکت‌های تصویری',
    specEn: 'Color Grading & Motion VFX',
    isInstagram: true,
    instagramId: 'Dc5pgATNmAk',
    instagramUrl: 'https://www.instagram.com/reel/Dc5pgATNmAk/',
    externalUrl: 'https://www.instagram.com/reel/Dc5pgATNmAk/',
  },
  {
    id: 'instagram-DcwIWGmNrwz',
    category: 'reels',
    platform: 'instagram',
    videoSrc: './videos/portfolio/DcwIWGmNrwz.mp4',
    primarySrc: './images/portfolio/instagram/DcwIWGmNrwz.webp',
    fallbacks: ['./images/portfolio/instagram/DcwIWGmNrwz.jpg'],
    labelFa: 'تایپوگرافی موزیک • Elnnaazi',
    labelEn: 'Music Typography • Elnnaazi',
    specFa: 'تایپوگرافی فارسی لیریک',
    specEn: 'Persian Lyric Typography',
    isInstagram: true,
    instagramId: 'DcwIWGmNrwz',
    instagramUrl: 'https://www.instagram.com/reel/DcwIWGmNrwz/',
    externalUrl: 'https://www.instagram.com/reel/DcwIWGmNrwz/',
  },
  {
    id: 'instagram-DceJ1xrNPlo',
    category: 'reels',
    platform: 'instagram',
    primarySrc: './images/portfolio/instagram/DceJ1xrNPlo.webp',
    fallbacks: ['./images/portfolio/instagram/DceJ1xrNPlo.jpg'],
    labelFa: 'موزیک ریلز • Tiem',
    labelEn: 'Music Reel • Tiem',
    specFa: 'ادیت ریلز برای انتشار سراسری',
    specEn: 'Release Promo Reel Edit',
    isInstagram: true,
    instagramId: 'DceJ1xrNPlo',
    instagramUrl: 'https://www.instagram.com/reel/DceJ1xrNPlo/',
    externalUrl: 'https://www.instagram.com/reel/DceJ1xrNPlo/',
  },

  // ================= YOUTUBE SHORTS & RELEASES =================
  {
    id: 'youtube-tU5XCWlE71o',
    category: 'reels',
    platform: 'youtube',
    primarySrc: './images/portfolio/youtube/tU5XCWlE71o.webp',
    fallbacks: [
      'https://i.ytimg.com/vi/tU5XCWlE71o/hqdefault.jpg',
      'https://i.ytimg.com/vi/tU5XCWlE71o/maxresdefault.jpg',
    ],
    labelFa: 'موزیک ریلز و تایپوگرافی • سمی لون',
    labelEn: 'YouTube Shorts • Samilone',
    specFa: 'تایپوگرافی لیریک و تدوین ریتمیک',
    specEn: 'Kinetic Lyric Motion · YouTube Shorts',
    isYouTube: true,
    youtubeId: 'tU5XCWlE71o',
    youtubeUrl: 'https://www.youtube.com/shorts/tU5XCWlE71o',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/tU5XCWlE71o',
    externalUrl: 'https://www.youtube.com/shorts/tU5XCWlE71o',
  },
  {
    id: 'youtube-vfzuqy7H9wc',
    category: 'reels',
    platform: 'youtube',
    primarySrc: './images/portfolio/youtube/vfzuqy7H9wc.webp',
    fallbacks: [
      'https://i.ytimg.com/vi/vfzuqy7H9wc/hqdefault.jpg',
      'https://i.ytimg.com/vi/vfzuqy7H9wc/maxresdefault.jpg',
    ],
    labelFa: 'تایپوگرافی لیریک و ادیت سینمایی • هیپهاپولوژیست',
    labelEn: 'Lyric Typography & Cinematic Edit • Hiphopologist',
    specFa: 'پربازدیدترین شورتز در فید یوتیوب',
    specEn: 'Most-Viewed YouTube Short',
    isYouTube: true,
    youtubeId: 'vfzuqy7H9wc',
    youtubeUrl: 'https://www.youtube.com/shorts/vfzuqy7H9wc',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/vfzuqy7H9wc',
    externalUrl: 'https://www.youtube.com/shorts/vfzuqy7H9wc',
  },
  {
    id: 'youtube-Eh0NDneIYqA',
    category: 'reels',
    platform: 'youtube',
    primarySrc: './images/portfolio/youtube/Eh0NDneIYqA.webp',
    fallbacks: ['https://i.ytimg.com/vi/Eh0NDneIYqA/hqdefault.jpg'],
    labelFa: 'تاپ بوکر افلیکس',
    labelEn: 'Top Booker Aflix',
    specFa: 'ادیت ریتمیک پرسرعت و موشن',
    specEn: 'High-tempo Cutting & VFX',
    isYouTube: true,
    youtubeId: 'Eh0NDneIYqA',
    youtubeUrl: 'https://www.youtube.com/shorts/Eh0NDneIYqA',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/Eh0NDneIYqA',
    externalUrl: 'https://www.youtube.com/shorts/Eh0NDneIYqA',
  },

  // ================= TIKTOK RELEASES =================
  {
    id: 'tiktok-7705018203021315341',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7705018203021315341.webp',
    fallbacks: [],
    labelFa: 'موزیک ریلز جدید • تیک‌تاک',
    labelEn: 'Latest TikTok Lyric Motion',
    specFa: 'تایپوگرافی لیریک و ادیت جدید تیک‌تاک',
    specEn: 'Latest TikTok Upload',
    isTikTok: true,
    tiktokId: '7705018203021315341',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7705018203021315341',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7705018203021315341',
  },
  {
    id: 'tiktok-7699913496716152078',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7699913496716152078.webp',
    fallbacks: [],
    labelFa: 'تایپوگرافی لیریک • متین فتاحی',
    labelEn: 'Lyric Typography • Matin Fattahi',
    specFa: 'تایپوگرافی لیریک و تدوین ریتمیک',
    specEn: 'TikTok Lyric Motion',
    isTikTok: true,
    tiktokId: '7699913496716152078',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7699913496716152078',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7699913496716152078',
  },
  {
    id: 'tiktok-7677497326079970573',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7677497326079970573.webp',
    fallbacks: [],
    labelFa: 'ادیت ویدیو + تایپوگرافی لیریک • بیگ شگی',
    labelEn: 'Video Edit + Lyric Typography • Big Shaggy',
    specFa: 'ادیت ریتمیک پربازدید در تیک‌تاک',
    specEn: 'High-View TikTok Release',
    isTikTok: true,
    tiktokId: '7677497326079970573',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7677497326079970573',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7677497326079970573',
  },
  {
    id: 'tiktok-7549569804462476558',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7549569804462476558.webp',
    fallbacks: [],
    labelFa: 'تایپوگرافی لیریک — سبک دارک سینمایی',
    labelEn: 'TikTok Top Viewed • Dark Cinematic Lyric',
    specFa: 'پربازدیدترین ویدیو در تیک‌تاک',
    specEn: 'Highest-Viewed TikTok Release',
    isTikTok: true,
    tiktokId: '7549569804462476558',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7549569804462476558',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7549569804462476558',
  },
  {
    id: 'tiktok-7601941689380408590',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7663583011870395661.webp',
    fallbacks: [],
    labelFa: 'وِلت نکردم • Dorcci',
    labelEn: "Dorcci • I Didn't Leave You",
    specFa: 'تایپوگرافی لیریک در تیک‌تاک',
    specEn: 'TikTok Lyric Motion',
    isTikTok: true,
    tiktokId: '7601941689380408590',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7601941689380408590',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7601941689380408590',
  },
  {
    id: 'tiktok-7657172874528328973',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7651319183732428045.webp',
    fallbacks: [],
    labelFa: 'نمیخواستم بکشه قفس دورم • Hoodad',
    labelEn: 'Hoodadk4 • Cage Around Me',
    specFa: 'ادیت و تایپوگرافی موزیک',
    specEn: 'Music Video & Typography',
    isTikTok: true,
    tiktokId: '7657172874528328973',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7657172874528328973',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7657172874528328973',
  },
  {
    id: 'tiktok-7649831737417157902',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7661969082933120270.webp',
    fallbacks: [],
    labelFa: 'خراب کردی • شایان اشراقی',
    labelEn: 'Shayan Eshraghi • You Ruined It',
    specFa: 'موزیک ریلز و جلوه‌های ویژه',
    specEn: 'Music Reel & Visual Motion',
    isTikTok: true,
    tiktokId: '7649831737417157902',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7649831737417157902',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7649831737417157902',
  },
  {
    id: 'tiktok-7648725433076223245',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7664934927691009294.webp',
    fallbacks: [],
    labelFa: 'موزیک دپ • کیارش',
    labelEn: 'Kiarash • Dep Track',
    specFa: 'تایپوگرافی احساسی لیریک',
    specEn: 'Atmospheric Lyric Motion',
    isTikTok: true,
    tiktokId: '7648725433076223245',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7648725433076223245',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7648725433076223245',
  },
  {
    id: 'tiktok-7649444431690517773',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7666151671734603022.webp',
    fallbacks: [],
    labelFa: 'موزیک ریلز • Tiem',
    labelEn: 'Tiem • Reel Visuals',
    specFa: 'ادیت ویدیویی ریتمیک',
    specEn: 'Rhythmic Cut & Visual Sync',
    isTikTok: true,
    tiktokId: '7649444431690517773',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7649444431690517773',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7649444431690517773',
  },
  {
    id: 'tiktok-7541129421323783479',
    category: 'reels',
    platform: 'tiktok',
    primarySrc: './images/portfolio/tiktok/7541129421323783479.webp',
    fallbacks: [],
    labelFa: 'تایپوگرافی ریتمیک • ThePoo7an',
    labelEn: 'ThePoo7an • Kinetic Edit',
    specFa: 'تایپوگرافی کلمات با بیت موزیک',
    specEn: 'Kinetic Syllable Typography',
    isTikTok: true,
    tiktokId: '7541129421323783479',
    tiktokUrl: 'https://www.tiktok.com/@thepoo7an/video/7541129421323783479',
    externalUrl: 'https://www.tiktok.com/@thepoo7an/video/7541129421323783479',
  },
];

export const WORK_ITEMS: WorkItem[] = RAW_WORK_ITEMS.map(normalizeWorkItem);

const STATIC_ITEM_BY_ID = new Map<string, WorkItem>(WORK_ITEMS.map((item) => [item.id, item]));

export function instagramReelToWorkItem(
  reel: InstagramReel,
  role?: 'latest' | 'most-viewed'
): WorkItem {
  const existing = STATIC_ITEM_BY_ID.get(`instagram-${reel.code}`);
  const bilingual = getBilingualDisplayTitle(reel.title || reel.caption, 'instagram');
  return normalizeWorkItem({
    ...(existing || {}),
    id: `instagram-${reel.code}`,
    category: 'reels',
    platform: 'instagram',
    videoSrc: reel.localVideoUrl || existing?.videoSrc,
    primarySrc: reel.thumbnailUrl || existing?.primarySrc || './images/portfolio/instagram/DbgAe6cNsdr.webp',
    fallbacks: [
      reel.fallbackThumbnailUrl || '',
      ...(existing?.fallbacks || []),
    ].filter(Boolean),
    labelFa: reel.title || existing?.labelFa || bilingual.fa,
    labelEn: reel.titleEn || existing?.labelEn || bilingual.en,
    specFa: existing?.specFa || 'تایپوگرافی لیریک و ادیت موزیک',
    specEn: existing?.specEn || 'Kinetic Typography & Music Edit',
    publishedAt: reel.publishedAt || existing?.publishedAt,
    viewCount: typeof reel.viewCount === 'number' ? reel.viewCount : existing?.viewCount,
    likeCount: typeof reel.likeCount === 'number' ? reel.likeCount : existing?.likeCount,
    showcaseRole: role,
    isInstagram: true,
    instagramId: reel.code,
    instagramUrl: reel.url,
    instagramEmbedUrl: reel.embedUrl,
    externalUrl: reel.url,
  });
}

export function youtubeEntryToWorkItem(
  entry: YouTubeVideoEntry,
  role?: 'latest' | 'most-viewed'
): WorkItem {
  const existing = STATIC_ITEM_BY_ID.get(`youtube-${entry.videoId}`);
  const bilingual = getBilingualDisplayTitle(entry.title, 'youtube');
  return normalizeWorkItem({
    ...(existing || {}),
    id: `youtube-${entry.videoId}`,
    category: 'reels',
    platform: 'youtube',
    primarySrc: entry.localThumbnailUrl || existing?.primarySrc || entry.thumbnailUrl,
    fallbacks: [
      entry.thumbnailUrl,
      entry.maxresThumbnailUrl || '',
      ...(existing?.fallbacks || []),
    ].filter(Boolean),
    labelFa: existing?.labelFa || bilingual.fa,
    labelEn: existing?.labelEn || bilingual.en,
    specFa:
      role === 'most-viewed'
        ? 'پربازدیدترین ویدیو در فید یوتیوب'
        : role === 'latest'
          ? 'آخرین ریلز آپلودشده در یوتیوب'
          : existing?.specFa || 'شورتز یوتیوب',
    specEn:
      role === 'most-viewed'
        ? 'Most-Viewed YouTube Short'
        : role === 'latest'
          ? 'Latest Uploaded YouTube Short'
          : existing?.specEn || 'YouTube Shorts',
    publishedAt: entry.publishedAt,
    viewCount: entry.viewCount,
    showcaseRole: role,
    isYouTube: true,
    youtubeId: entry.videoId,
    youtubeUrl: entry.url,
    youtubeEmbedUrl: entry.embedUrl,
    externalUrl: entry.url,
  });
}

export function tiktokVideoToWorkItem(
  video: TikTokVideo,
  role?: 'latest' | 'most-viewed'
): WorkItem {
  const existing = STATIC_ITEM_BY_ID.get(`tiktok-${video.id}`);
  const bilingual = getBilingualDisplayTitle(video.title, 'tiktok');
  const displayFa = existing?.labelFa || bilingual.fa;
  const displayEn = existing?.labelEn || bilingual.en;
  const publishedAt =
    video.publishedAt ||
    (video.createTime ? new Date(video.createTime * 1000).toISOString() : undefined);

  return normalizeWorkItem({
    ...(existing || {}),
    id: `tiktok-${video.id}`,
    category: 'reels',
    platform: 'tiktok',
    primarySrc:
      video.localThumbnailUrl ||
      existing?.primarySrc ||
      video.thumbnailUrl ||
      './images/portfolio/tiktok/7705018203021315341.webp',
    fallbacks: [
      video.thumbnailUrl || '',
      video.fallbackThumbnailUrl || '',
      ...(existing?.fallbacks || []),
    ].filter(Boolean),
    labelFa: displayFa,
    labelEn: displayEn,
    specFa:
      role === 'most-viewed'
        ? 'پربازدیدترین ویدیو در تیک‌تاک'
        : role === 'latest'
          ? 'آخرین ویدیو آپلودشده در تیک‌تاک'
          : existing?.specFa || 'تایپوگرافی لیریک در تیک‌تاک',
    specEn:
      role === 'most-viewed'
        ? 'Most-Viewed TikTok Release'
        : role === 'latest'
          ? 'Latest Uploaded TikTok Reel'
          : existing?.specEn || 'TikTok Lyric Motion',
    publishedAt,
    viewCount: video.viewCount,
    likeCount: video.likeCount,
    showcaseRole: role,
    isTikTok: true,
    tiktokId: video.id,
    tiktokUrl: video.url,
    externalUrl: video.url,
  });
}

function compareMediaIds(a?: string, b?: string): number {
  try {
    const ba = BigInt(a || '0');
    const bb = BigInt(b || '0');
    return bb > ba ? 1 : bb < ba ? -1 : 0;
  } catch {
    return 0;
  }
}

export function buildPlatformHighlights(
  instagramData: InstagramData = INITIAL_INSTAGRAM_DATA,
  youtubeData: YouTubeVideoData = INITIAL_YOUTUBE_DATA,
  tiktokData: TikTokData = INITIAL_TIKTOK_DATA
): PlatformHighlight[] {
  // 1. Instagram Latest & Top/Most-Viewed
  const igReels = instagramData.reels || [];
  const igByLatest = [...igReels].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    if (tb !== ta) return tb - ta;
    return compareMediaIds(a.mediaId, b.mediaId);
  });
  const latestIgReel =
    igReels.find((r) => r.code === instagramData.latestReelId) || igByLatest[0];

  const igWithViews = igReels.filter((r) => typeof r.viewCount === 'number' && r.viewCount > 0);
  const hasVerifiedIgViews = igWithViews.length > 0;
  const mostViewedIgReel = hasVerifiedIgViews
    ? [...igWithViews].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))[0]
    : igReels.find((r) => r.code === instagramData.mostViewedReelId) || igReels[0];

  // 2. YouTube Latest & Most-Viewed
  const ytPool: YouTubeVideoEntry[] = [];
  const ytSeen = new Set<string>();
  for (const candidate of [
    youtubeData,
    youtubeData.mostViewed,
    ...(youtubeData.videos || []),
  ]) {
    if (candidate && candidate.videoId && !ytSeen.has(candidate.videoId)) {
      ytSeen.add(candidate.videoId);
      ytPool.push(candidate);
    }
  }
  const ytByLatest = [...ytPool].sort(
    (a, b) => Date.parse(b.publishedAt || '') - Date.parse(a.publishedAt || '')
  );
  const ytByViews = [...ytPool].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  const latestYt = ytByLatest[0] || youtubeData;
  const mostViewedYt = ytByViews[0] || youtubeData.mostViewed || youtubeData;

  // 3. TikTok Latest & Most-Viewed (only verified @thepoo7an owner videos)
  const ttOwner = (tiktokData.username || 'thepoo7an').toLowerCase();
  const ttPool: TikTokVideo[] = [];
  const ttSeen = new Set<string>();
  for (const candidate of [
    tiktokData.latestVideo,
    tiktokData.mostViewedVideo,
    ...(tiktokData.videos || []),
  ]) {
    if (
      candidate &&
      candidate.id &&
      !ttSeen.has(candidate.id) &&
      (!candidate.authorName || candidate.authorName.toLowerCase() === ttOwner)
    ) {
      ttSeen.add(candidate.id);
      ttPool.push(candidate);
    }
  }
  const ttByLatest = [...ttPool].sort((a, b) => {
    if ((b.createTime || 0) !== (a.createTime || 0)) {
      return (b.createTime || 0) - (a.createTime || 0);
    }
    return compareMediaIds(a.id, b.id);
  });
  const ttByViews = [...ttPool].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  const latestTt = ttByLatest[0] || tiktokData.videos?.[0];
  const mostViewedTt = ttByViews[0] || tiktokData.videos?.[0];

  return [
    {
      platform: 'instagram',
      profileUrl: instagramData.profileUrl || 'https://www.instagram.com/thepoo7an/',
      handle: `@${instagramData.username || 'thepoo7an'}`,
      latest: instagramReelToWorkItem(latestIgReel, 'latest'),
      mostViewed: instagramReelToWorkItem(mostViewedIgReel, 'most-viewed'),
      hasVerifiedMostViewedCount: hasVerifiedIgViews,
    },
    {
      platform: 'youtube',
      profileUrl: youtubeData.channelUrl || 'https://www.youtube.com/@thepoo7an',
      handle: '@thepoo7an',
      latest: youtubeEntryToWorkItem(latestYt, 'latest'),
      mostViewed: youtubeEntryToWorkItem(mostViewedYt, 'most-viewed'),
      hasVerifiedMostViewedCount: typeof mostViewedYt?.viewCount === 'number' && mostViewedYt.viewCount > 0,
    },
    {
      platform: 'tiktok',
      profileUrl: tiktokData.profileUrl || 'https://www.tiktok.com/@thepoo7an',
      handle: `@${tiktokData.username || 'thepoo7an'}`,
      latest: tiktokVideoToWorkItem(latestTt, 'latest'),
      mostViewed: tiktokVideoToWorkItem(mostViewedTt, 'most-viewed'),
      hasVerifiedMostViewedCount: typeof mostViewedTt?.viewCount === 'number' && mostViewedTt.viewCount > 0,
    },
  ];
}

export function buildMergedWorkItems(
  instagramData: InstagramData = INITIAL_INSTAGRAM_DATA,
  youtubeData: YouTubeVideoData = INITIAL_YOUTUBE_DATA,
  tiktokData: TikTokData = INITIAL_TIKTOK_DATA
): WorkItem[] {
  const highlights = buildPlatformHighlights(instagramData, youtubeData, tiktokData);
  const highlightById = new Map<string, WorkItem>();
  for (const h of highlights) {
    highlightById.set(h.latest.id, h.latest);
    highlightById.set(h.mostViewed.id, h.mostViewed);
  }

  // Enrich stats from synced JSONs
  const ytStatsById = new Map<string, YouTubeVideoEntry>(
    [youtubeData, youtubeData.mostViewed, ...(youtubeData.videos || [])]
      .filter((v): v is YouTubeVideoEntry => Boolean(v && v.videoId))
      .map((v) => [`youtube-${v.videoId}`, v])
  );
  const ttStatsById = new Map<string, TikTokVideo>(
    [tiktokData.latestVideo, tiktokData.mostViewedVideo, ...(tiktokData.videos || [])]
      .filter((v): v is TikTokVideo => Boolean(v && v.id))
      .map((v) => [`tiktok-${v.id}`, v])
  );

  const merged: WorkItem[] = [];
  const seen = new Set<string>();

  // Put highlighted works (latest + mostViewed per platform) first for immediate relevance
  for (const item of highlightById.values()) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  }

  for (const baseItem of WORK_ITEMS) {
    if (seen.has(baseItem.id)) continue;
    seen.add(baseItem.id);

    const ytMeta = ytStatsById.get(baseItem.id);
    const ttMeta = ttStatsById.get(baseItem.id);

    const fallbackExtra = [
      ttMeta?.thumbnailUrl || '',
      ytMeta?.thumbnailUrl || '',
    ].filter((url) => Boolean(url) && !baseItem.fallbacks.includes(url));

    merged.push({
      ...baseItem,
      fallbacks: fallbackExtra.length > 0 ? [...baseItem.fallbacks, ...fallbackExtra] : baseItem.fallbacks,
      viewCount: ytMeta?.viewCount ?? ttMeta?.viewCount ?? baseItem.viewCount,
      publishedAt:
        ytMeta?.publishedAt ??
        ttMeta?.publishedAt ??
        (ttMeta?.createTime ? new Date(ttMeta.createTime * 1000).toISOString() : undefined) ??
        baseItem.publishedAt,
      likeCount: ttMeta?.likeCount ?? baseItem.likeCount,
    });
  }

  return merged;
}

export const FEATURED_REELS: Record<'lyric916' | 'dorc' | 'topbooker', WorkItem> = {
  lyric916: WORK_ITEMS[0],
  dorc: WORK_ITEMS[2],
  topbooker: WORK_ITEMS[8] || WORK_ITEMS[6],
};
