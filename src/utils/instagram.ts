import { InstagramReel, InstagramData, INITIAL_INSTAGRAM_DATA } from '../data/instagram';

/**
 * Public Instagram Profile metadata for THEPOO7AN
 */
export const INSTAGRAM_USERNAME = 'thepoo7an';
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

/**
 * Verified list of public Instagram Reel IDs published by @thepoo7an
 */
export const VERIFIED_REEL_IDS: readonly string[] = [
  'DbgAe6cNsdr',
  'DavRKRKNwhu',
  'Dap1kn2yfAl',
  'Dc5pgATNmAk',
  'DcwIWGmNrwz',
  'DceJ1xrNPlo',
] as const;

/**
 * Modern Fisher-Yates shuffle algorithm for uniform, unbiased random distribution.
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Generates canonical Instagram URLs from a Reel ID / shortcode.
 */
export function getInstagramReelUrl(reelId: string): string {
  return `https://www.instagram.com/reel/${reelId}/`;
}

export function getInstagramEmbedUrl(reelId: string): string {
  return `https://www.instagram.com/reel/${reelId}/embed/`;
}

/**
 * Creates or complements an InstagramReel item from a Reel ID.
 */
export function createInstagramReelFromId(
  reelId: string,
  overrides?: Partial<InstagramReel>
): InstagramReel {
  // Check if we have pre-configured metadata in initial dataset
  const existing = INITIAL_INSTAGRAM_DATA.reels.find(
    (r) => r.id === reelId || r.code === reelId
  );

  if (existing) {
    return {
      ...existing,
      ...overrides,
    };
  }

  return {
    id: reelId,
    code: reelId,
    title: overrides?.title || 'ریلز موزیک اینستاگرام',
    titleEn: overrides?.titleEn || 'Instagram Music Reel',
    caption: overrides?.caption || `#${INSTAGRAM_USERNAME} #reels`,
    url: getInstagramReelUrl(reelId),
    embedUrl: getInstagramEmbedUrl(reelId),
    thumbnailUrl: overrides?.thumbnailUrl || `./images/portfolio/instagram/${reelId}.webp`,
    fallbackThumbnailUrl: overrides?.fallbackThumbnailUrl || `./images/portfolio/instagram/${reelId}.jpg`,
    ...overrides,
  };
}

export interface FetchReelOptions {
  count?: number;
  username?: string;
  excludeId?: string;
}

/**
 * Fetches and parses a randomized list of Reel IDs from the creator's public Instagram profile.
 * Incorporates multi-tier retrieval:
 *  1. Live cached profile JSON feed (/data/instagram.json)
 *  2. Public profile endpoint or proxy if accessible
 *  3. Verified fallback reel IDs
 *
 * Shuffles the extracted IDs using Fisher-Yates and returns the randomized list.
 */
export async function fetchRandomInstagramReelIds(
  options?: FetchReelOptions
): Promise<string[]> {
  const count = options?.count;
  const excludeId = options?.excludeId;
  const username = options?.username || INSTAGRAM_USERNAME;

  const harvestedIds = new Set<string>(VERIFIED_REEL_IDS);

  // Attempt 1: Fetch newest static JSON cache served with the app
  if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    try {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      const jsonUrl = `${base}/data/instagram.json?t=${Date.now()}`;
      const res = await fetch(jsonUrl, { cache: 'no-store' });
      if (res.ok) {
        const data = (await res.json()) as InstagramData;
        if (data && Array.isArray(data.reels)) {
          for (const reel of data.reels) {
            const id = reel.id || reel.code;
            if (id && typeof id === 'string') {
              harvestedIds.add(id);
            }
          }
        }
      }
    } catch {
      // Graceful fallback to initial data
    }

    // Attempt 2: Try fetching public profile or reels endpoint if network/CORS allows
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const publicUrl = `https://www.instagram.com/${username}/reels/`;
      const directRes = await fetch(publicUrl, {
        signal: controller.signal,
        headers: { Accept: 'text/html,application/json' },
      });
      clearTimeout(timeoutId);

      if (directRes.ok) {
        const html = await directRes.text();
        // Regex to extract reel shortcodes from Instagram HTML / JSON payloads
        const matches = html.matchAll(/(?:reel|p)\/([A-Za-z0-9_-]{11})/g);
        for (const match of matches) {
          if (match[1]) {
            harvestedIds.add(match[1]);
          }
        }
      }
    } catch {
      // CORS or network timeout is normal for cross-origin Instagram page requests in browser
    }
  } else {
    // SSR / Prerender environment: harvest from initial bundled dataset
    for (const reel of INITIAL_INSTAGRAM_DATA.reels) {
      if (reel.id || reel.code) {
        harvestedIds.add(reel.id || reel.code);
      }
    }
  }

  let idList = Array.from(harvestedIds);

  // Filter out excluded ID if requested and we have alternatives
  if (excludeId && idList.length > 1) {
    const filtered = idList.filter((id) => id !== excludeId);
    if (filtered.length > 0) {
      idList = filtered;
    }
  }

  // Shuffle using Fisher-Yates algorithm
  const shuffled = shuffleArray(idList);

  return typeof count === 'number' && count > 0 ? shuffled.slice(0, count) : shuffled;
}

/**
 * Fetches and returns an array of InstagramReel objects in randomized/shuffled order.
 */
export async function fetchShuffledInstagramReels(
  options?: FetchReelOptions
): Promise<InstagramReel[]> {
  const reelIds = await fetchRandomInstagramReelIds(options);

  // Map each reel ID to full InstagramReel object
  const fullReels: InstagramReel[] = reelIds.map((id) => {
    return createInstagramReelFromId(id);
  });

  return fullReels;
}
