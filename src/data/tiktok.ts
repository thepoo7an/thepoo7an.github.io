import initialTikTokData from './tiktok.json';

export interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  authorName?: string;
  thumbnailUrl?: string;
  localThumbnailUrl?: string;
  fallbackThumbnailUrl?: string;
  cdnThumbnailUrl?: string;
  createTime?: number;
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
}

export interface TikTokData {
  username: string;
  nickname: string;
  profileUrl: string;
  bio: string;
  verified: boolean;
  stats: {
    followers: number;
    likes: number;
    videos: number;
    formattedFollowers: string;
    formattedLikes: string;
    formattedVideos: string;
  };
  latestVideo?: TikTokVideo;
  mostViewedVideo?: TikTokVideo;
  videos?: TikTokVideo[];
  featuredVideo?: {
    id: string;
    url: string;
    title: string;
    titleFa: string;
  };
  lastUpdated: string;
}

export const INITIAL_TIKTOK_DATA: TikTokData = initialTikTokData as TikTokData;

/**
 * Attempts to revalidate and fetch newest TikTok cached stats from the static JSON.
 */
export async function fetchLiveTikTokData(): Promise<TikTokData | null> {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const jsonPath = `${base.replace(/\/$/, '')}/data/tiktok.json?t=${Date.now()}`;
    const localRes = await fetch(jsonPath, { cache: 'no-store' });
    if (localRes.ok) {
      const data = (await localRes.json()) as TikTokData;
      if (data && data.username?.toLowerCase() === 'thepoo7an') {
        const isOwner = (v?: TikTokVideo) =>
          Boolean(v && (!v.authorName || v.authorName.toLowerCase() === 'thepoo7an'));
        return {
          ...data,
          latestVideo: isOwner(data.latestVideo) ? data.latestVideo : undefined,
          mostViewedVideo: isOwner(data.mostViewedVideo) ? data.mostViewedVideo : undefined,
          videos: Array.isArray(data.videos) ? data.videos.filter((v) => isOwner(v)) : undefined,
        };
      }
    }
  } catch {
    // Ignore and fallback
  }

  return null;
}
