import initialTikTokData from './tiktok.json';

export interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  authorName?: string;
  thumbnailUrl?: string;
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
  videos?: TikTokVideo[];
  featuredVideo?: {
    id: string;
    url: string;
    title: string;
    titleFa: string;
  };
  lastUpdated: string;
}

export const INITIAL_TIKTOK_DATA: TikTokData = initialTikTokData;

/**
 * Attempts to revalidate and fetch newest TikTok cached stats from the static JSON.
 */
export async function fetchLiveTikTokData(): Promise<TikTokData | null> {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const jsonPath = `${base.replace(/\/$/, '')}/data/tiktok.json?t=${Date.now()}`;
    const localRes = await fetch(jsonPath, { cache: 'no-store' });
    if (localRes.ok) {
      const data = await localRes.json();
      if (data && data.username) {
        return data as TikTokData;
      }
    }
  } catch {
    // Ignore and fallback
  }

  return null;
}
