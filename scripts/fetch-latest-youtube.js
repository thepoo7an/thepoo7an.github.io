/**
 * Script to fetch the latest YouTube video/short from @thepoo7an RSS feed.
 * Channel ID: UCRGzKlPWgYZvvL7YNUcceiw
 */

import fs from 'fs';
import path from 'path';

const CHANNEL_ID = 'UCRGzKlPWgYZvvL7YNUcceiw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXmlEntities(str = '') {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseEntry(entryXml) {
  const videoIdMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
  const titleMatch = entryXml.match(/<title>([\s\S]*?)<\/title>/);
  const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);
  const updatedMatch = entryXml.match(/<updated>(.*?)<\/updated>/);
  const viewsMatch = entryXml.match(/<media:statistics[^>]*views="(\d+)"/);

  const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';
  if (!videoId) return null;

  const title = titleMatch ? decodeXmlEntities(titleMatch[1].trim()) : '';
  const publishedAt = publishedMatch ? publishedMatch[1].trim() : '';
  const updatedAt = updatedMatch ? updatedMatch[1].trim() : '';
  const viewCount = viewsMatch ? Number(viewsMatch[1]) : 0;

  return {
    videoId,
    title,
    url: `https://www.youtube.com/shorts/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    maxresThumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    publishedAt,
    updatedAt,
    viewCount,
  };
}

async function fetchLatestVideo() {
  console.log(`Fetching RSS feed from: ${RSS_URL}`);
  const res = await fetch(RSS_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; THEPOO7AN-Bot/1.0)',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch RSS feed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const channelTitleMatch = xml.match(/<author>\s*<name>(.*?)<\/name>/);
  const channelTitle = channelTitleMatch ? decodeXmlEntities(channelTitleMatch[1].trim()) : 'THEPOO7AN';

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((m) => parseEntry(m[1]))
    .filter(Boolean);

  if (entries.length === 0) {
    throw new Error('No <entry> found in YouTube RSS feed');
  }

  const byLatest = [...entries].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );
  const byMostViewed = [...entries].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));

async function ensureLocalYouTubeThumb(entry) {
  if (!entry || !entry.videoId) return entry;
  const outDir = path.resolve(process.cwd(), 'public/images/portfolio/youtube');
  const webpAbs = path.join(outDir, `${entry.videoId}.webp`);
  const jpgAbs = path.join(outDir, `${entry.videoId}.jpg`);

  if (fs.existsSync(webpAbs)) {
    return { ...entry, localThumbnailUrl: `./images/portfolio/youtube/${entry.videoId}.webp` };
  }
  if (fs.existsSync(jpgAbs)) {
    return { ...entry, localThumbnailUrl: `./images/portfolio/youtube/${entry.videoId}.jpg` };
  }

  fs.mkdirSync(outDir, { recursive: true });
  for (const imgUrl of [entry.maxresThumbnailUrl, entry.thumbnailUrl].filter(Boolean)) {
    try {
      const res = await fetch(imgUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      let sharpMod = null;
      try {
        sharpMod = (await import('sharp')).default;
      } catch {
        sharpMod = null;
      }
      if (sharpMod) {
        await sharpMod(buf).resize(640, 800, { fit: 'cover' }).webp({ quality: 84 }).toFile(webpAbs);
        return { ...entry, localThumbnailUrl: `./images/portfolio/youtube/${entry.videoId}.webp` };
      }
      fs.writeFileSync(jpgAbs, buf);
      return { ...entry, localThumbnailUrl: `./images/portfolio/youtube/${entry.videoId}.jpg` };
    } catch {
      // try fallback url
    }
  }
  return entry;
}

  const [latest, mostViewed] = await Promise.all([
    ensureLocalYouTubeThumb(byLatest[0]),
    ensureLocalYouTubeThumb(byMostViewed[0]),
  ]);

  const enrichedVideos = byLatest.map((v) => {
    if (v.videoId === latest.videoId && latest.localThumbnailUrl) {
      return { ...v, localThumbnailUrl: latest.localThumbnailUrl };
    }
    if (v.videoId === mostViewed.videoId && mostViewed.localThumbnailUrl) {
      return { ...v, localThumbnailUrl: mostViewed.localThumbnailUrl };
    }
    return v;
  });

  const videoData = {
    channelId: CHANNEL_ID,
    channelTitle,
    channelUrl: 'https://www.youtube.com/@thepoo7an',
    videoId: latest.videoId,
    title: latest.title,
    url: latest.url,
    watchUrl: latest.watchUrl,
    embedUrl: latest.embedUrl,
    thumbnailUrl: latest.thumbnailUrl,
    ...(latest.localThumbnailUrl ? { localThumbnailUrl: latest.localThumbnailUrl } : {}),
    maxresThumbnailUrl: latest.maxresThumbnailUrl,
    publishedAt: latest.publishedAt,
    viewCount: latest.viewCount,
    mostViewed,
    videos: enrichedVideos,
    lastUpdated: new Date().toISOString(),
  };

  console.log('Successfully extracted YouTube data:', {
    latest: { videoId: latest.videoId, viewCount: latest.viewCount, publishedAt: latest.publishedAt },
    mostViewed: { videoId: mostViewed.videoId, viewCount: mostViewed.viewCount, publishedAt: mostViewed.publishedAt },
    totalEntries: byLatest.length,
  });

  const primaryFilePath = path.resolve(process.cwd(), 'src/data/latest-youtube.json');
  if (fs.existsSync(primaryFilePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(primaryFilePath, 'utf-8'));
      const sameLatest =
        existing.videoId === videoData.videoId &&
        existing.title === videoData.title &&
        existing.viewCount === videoData.viewCount;
      const sameTop =
        existing.mostViewed?.videoId === mostViewed.videoId &&
        existing.mostViewed?.viewCount === mostViewed.viewCount;
      const sameLen = Array.isArray(existing.videos) && existing.videos.length === byLatest.length;
      if (sameLatest && sameTop && sameLen) {
        console.log(`YouTube feed (${latest.videoId} / top ${mostViewed.videoId}) is already up to date. Skipping disk write.`);
        return;
      }
    } catch {
      // If corrupt, proceed to overwrite
    }
  }

  // Write to src/data/latest-youtube.json and public/data/latest-youtube.json
  const pathsToWrite = [
    primaryFilePath,
    path.resolve(process.cwd(), 'public/data/latest-youtube.json'),
  ];

  for (const filePath of pathsToWrite) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(videoData, null, 2) + '\n', 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

fetchLatestVideo().catch((err) => {
  console.error('Error in fetchLatestVideo:', err);
  process.exit(1);
});
