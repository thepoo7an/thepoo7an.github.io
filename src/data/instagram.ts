import initialInstagramData from './instagram.json';

export interface InstagramReel {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  caption: string;
  url: string;
  embedUrl: string;
  thumbnailUrl: string;
  fallbackThumbnailUrl?: string;
  cdnThumbnailUrl?: string;
}

export interface InstagramData {
  username: string;
  profileUrl: string;
  reels: InstagramReel[];
  lastUpdated: string;
}

export const INITIAL_INSTAGRAM_DATA: InstagramData = initialInstagramData;

/**
 * Attempts to revalidate and fetch newest Instagram cached metadata from static JSON.
 */
export async function fetchLiveInstagramData(): Promise<InstagramData | null> {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const jsonPath = `${base.replace(/\/$/, '')}/data/instagram.json?t=${Date.now()}`;
    const localRes = await fetch(jsonPath, { cache: 'no-store' });
    if (localRes.ok) {
      const data = await localRes.json();
      if (data && data.username && Array.isArray(data.reels)) {
        return data as InstagramData;
      }
    }
  } catch {
    // Ignore and fallback gracefully
  }

  return null;
}
