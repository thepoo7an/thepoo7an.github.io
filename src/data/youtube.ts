import initialYouTubeData from './latest-youtube.json';

export interface YouTubeVideoEntry {
  videoId: string;
  title: string;
  url: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  localThumbnailUrl?: string;
  fallbackThumbnailUrl?: string;
  maxresThumbnailUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  viewCount?: number;
}

export interface YouTubeVideoData extends YouTubeVideoEntry {
  channelId: string;
  channelTitle: string;
  channelUrl: string;
  mostViewed?: YouTubeVideoEntry;
  videos?: YouTubeVideoEntry[];
  lastUpdated: string;
}

export const INITIAL_YOUTUBE_DATA: YouTubeVideoData = initialYouTubeData as YouTubeVideoData;

/**
 * Attempts to revalidate and fetch the newest YouTube short in the background.
 * Falls back gracefully to INITIAL_YOUTUBE_DATA if network is unavailable.
 */
export async function fetchLiveYouTubeRelease(): Promise<YouTubeVideoData | null> {
  try {
    // 1. First attempt to check the static JSON hosted on GitHub Pages (cache-busted)
    const base = import.meta.env.BASE_URL || '/';
    const jsonPath = `${base.replace(/\/$/, '')}/data/latest-youtube.json?t=${Date.now()}`;
    const localRes = await fetch(jsonPath, { cache: 'no-store' });
    if (localRes.ok) {
      const data = await localRes.json();
      if (data && data.videoId) {
        return data as YouTubeVideoData;
      }
    }
  } catch {
    // Ignore and proceed
  }

  return null;
}
