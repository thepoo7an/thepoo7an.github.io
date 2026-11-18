/**
 * Sync Instagram Reels metadata for @thepoo7an
 * Supports official Meta Instagram Graph API when INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID
 * environment variables are configured, and safely normalizes/sorts local JSON otherwise
 * without ever fabricating view counts.
 */

import fs from 'fs';
import path from 'path';

const PRIMARY_PATH = path.resolve(process.cwd(), 'src/data/instagram.json');
const PUBLIC_PATH = path.resolve(process.cwd(), 'public/data/instagram.json');

function compareMediaIdsDesc(a, b) {
  try {
    const ba = BigInt(a?.mediaId || '0');
    const bb = BigInt(b?.mediaId || '0');
    return bb > ba ? 1 : bb < ba ? -1 : 0;
  } catch {
    return 0;
  }
}

async function fetchGraphInsights(mediaId, token) {
  try {
    const url = `https://graph.instagram.com/v21.0/${mediaId}/insights?metric=views,plays&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return {};
    const json = await res.json();
    const metrics = Array.isArray(json.data) ? json.data : [];
    const viewsMetric = metrics.find((m) => m.name === 'views' || m.name === 'plays');
    const val = viewsMetric?.values?.[0]?.value;
    return typeof val === 'number' && val > 0 ? { viewCount: val } : {};
  } catch {
    return {};
  }
}

async function syncFromGraphApi(existingData) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return null;

  console.log('INSTAGRAM_ACCESS_TOKEN detected — syncing via Instagram Graph API...');
  const fields = 'id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,shortcode,timestamp,like_count';
  const url = `https://graph.instagram.com/v21.0/${encodeURIComponent(userId)}/media?fields=${fields}&limit=25&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) {
    console.warn(`Instagram Graph API returned ${res.status}; keeping cached baseline.`);
    return null;
  }

  const json = await res.json();
  const items = Array.isArray(json.data) ? json.data : [];
  const reelsOnly = items.filter(
    (m) => m.media_type === 'VIDEO' || m.media_product_type === 'REELS'
  );
  if (reelsOnly.length === 0) return null;

  const existingByCode = new Map((existingData.reels || []).map((r) => [r.code, r]));
  const updatedReels = await Promise.all(
    reelsOnly.map(async (m) => {
      const codeMatch = m.permalink?.match(/\/(?:reel|p)\/([^/?#]+)/);
      const code = m.shortcode || (codeMatch ? codeMatch[1] : m.id);
      const prev = existingByCode.get(code);
      const insights = await fetchGraphInsights(m.id, token);

      return {
        ...(prev || {}),
        id: code,
        code,
        mediaId: m.id,
        title: prev?.title || (m.caption ? m.caption.split('\n')[0].slice(0, 64) : `ریلز اینستاگرام · ${code}`),
        titleEn: prev?.titleEn || `Instagram Reel · ${code}`,
        caption: m.caption || prev?.caption || '',
        url: m.permalink || prev?.url || `https://www.instagram.com/reel/${code}/`,
        embedUrl: `https://www.instagram.com/reel/${code}/embed/`,
        thumbnailUrl: prev?.thumbnailUrl || m.thumbnail_url || m.media_url || '',
        ...(prev?.fallbackThumbnailUrl ? { fallbackThumbnailUrl: prev.fallbackThumbnailUrl } : {}),
        ...(m.thumbnail_url ? { cdnThumbnailUrl: m.thumbnail_url } : prev?.cdnThumbnailUrl ? { cdnThumbnailUrl: prev.cdnThumbnailUrl } : {}),
        ...(prev?.localVideoUrl ? { localVideoUrl: prev.localVideoUrl } : {}),
        publishedAt: m.timestamp || prev?.publishedAt,
        ...(typeof insights.viewCount === 'number'
          ? { viewCount: insights.viewCount }
          : typeof prev?.viewCount === 'number'
            ? { viewCount: prev.viewCount }
            : {}),
        ...(typeof m.like_count === 'number'
          ? { likeCount: m.like_count }
          : typeof prev?.likeCount === 'number'
            ? { likeCount: prev.likeCount }
            : {}),
      };
    })
  );

  // Merge any older archived local reels not present in the latest 25
  const seen = new Set(updatedReels.map((r) => r.code));
  for (const prev of existingData.reels || []) {
    if (!seen.has(prev.code)) updatedReels.push(prev);
  }

  return updatedReels;
}

async function main() {
  if (!fs.existsSync(PRIMARY_PATH)) {
    throw new Error('src/data/instagram.json not found');
  }

  const current = JSON.parse(fs.readFileSync(PRIMARY_PATH, 'utf-8'));
  const apiReels = await syncFromGraphApi(current);
  const reels = apiReels || current.reels || [];

  const sortedByLatest = [...reels].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    if (tb !== ta) return tb - ta;
    return compareMediaIdsDesc(a, b);
  });

  const latestReelId = sortedByLatest[0]?.code || current.latestReelId || 'Dc5pgATNmAk';
  const withViews = reels.filter((r) => typeof r.viewCount === 'number' && r.viewCount > 0);
  const mostViewedReelId =
    withViews.length > 0
      ? [...withViews].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))[0].code
      : current.mostViewedReelId || 'DbgAe6cNsdr';

  const nextData = {
    ...current,
    latestReelId,
    mostViewedReelId,
    reels,
    lastUpdated: apiReels ? new Date().toISOString() : current.lastUpdated,
  };

  const prevComparable = JSON.stringify({
    latestReelId: current.latestReelId,
    mostViewedReelId: current.mostViewedReelId,
    reels: current.reels,
  });
  const nextComparable = JSON.stringify({
    latestReelId: nextData.latestReelId,
    mostViewedReelId: nextData.mostViewedReelId,
    reels: nextData.reels,
  });

  if (prevComparable === nextComparable && fs.existsSync(PUBLIC_PATH)) {
    console.log(`Instagram metadata already up to date (latest=${latestReelId}, flagship/top=${mostViewedReelId}). Skipping write.`);
    return;
  }

  for (const filePath of [PRIMARY_PATH, PUBLIC_PATH]) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(nextData, null, 2) + '\n', 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

main().catch((err) => {
  console.error('Error in fetch-instagram:', err);
  process.exit(1);
});
