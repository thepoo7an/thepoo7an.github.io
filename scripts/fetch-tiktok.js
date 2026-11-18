/**
 * Script to fetch TikTok profile & metadata for @thepoo7an
 */

import fs from 'fs';
import path from 'path';

const USERNAME = 'thepoo7an';
const PROFILE_URL = `https://www.tiktok.com/@${USERNAME}`;

const KNOWN_VIDEO_IDS = [
  '7705018203021315341',
  '7699913496716152078',
  '7689125250100940046',
  '7686174973911747854',
  '7683796098250558753',
  '7681986482227236109',
  '7680462691407858957',
  '7677497326079970573',
  '7676520579058502926',
  '7676109656242081056',
  '7674317130715761934',
  '7670966647280241934',
  '7670836090843991310',
  '7670594541199641870',
  '7669087435191635214',
  '7657172874528328973',
  '7649831737417157902',
  '7649444431690517773',
  '7648725433076223245',
  '7648380647387499789',
  '7601941689380408590',
  '7589224181703724302',
  '7549569804462476558',
  '7545892608372002062',
  '7544033907453283598',
  '7544016385119227149',
  '7538894251048865038',
  '7538707506441342263',
];

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function resolveLocalThumb(id) {
  const webpRel = `./images/portfolio/tiktok/${id}.webp`;
  const webpAbs = path.resolve(process.cwd(), 'public/images/portfolio/tiktok', `${id}.webp`);
  if (fs.existsSync(webpAbs)) return webpRel;
  const jpgRel = `./images/portfolio/tiktok/${id}.jpg`;
  const jpgAbs = path.resolve(process.cwd(), 'public/images/portfolio/tiktok', `${id}.jpg`);
  if (fs.existsSync(jpgAbs)) return jpgRel;
  return undefined;
}

async function fetchVideoDetail(id, existingVideo) {
  const videoUrl = `https://www.tiktok.com/@${USERNAME}/video/${id}`;
  const localThumb = existingVideo?.localThumbnailUrl || resolveLocalThumb(id);

  let title = existingVideo?.title || `Video #${id.slice(-4)}`;
  let authorName = existingVideo?.authorName || USERNAME;
  let thumbnailUrl = existingVideo?.thumbnailUrl || '';
  let viewCount = typeof existingVideo?.viewCount === 'number' ? existingVideo.viewCount : 0;
  let likeCount = typeof existingVideo?.likeCount === 'number' ? existingVideo.likeCount : 0;
  let createTime = typeof existingVideo?.createTime === 'number' ? existingVideo.createTime : 0;

  try {
    const res = await fetch(videoUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(7000),
    });

    if (res.ok) {
      const html = await res.text();
      const match = html.match(
        /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/
      );
      if (match) {
        const data = JSON.parse(match[1]);
        const item = data?.['__DEFAULT_SCOPE__']?.['webapp.video-detail']?.itemInfo?.itemStruct;
        if (item) {
          if (item.desc && item.desc.trim()) title = item.desc;
          if (item.author?.uniqueId) authorName = item.author.uniqueId;
          const cover = item.video?.cover || item.video?.originCover;
          if (cover) thumbnailUrl = cover;
          if (item.stats?.playCount !== undefined) viewCount = Number(item.stats.playCount) || 0;
          if (item.stats?.diggCount !== undefined) likeCount = Number(item.stats.diggCount) || 0;
          if (item.createTime) createTime = Number(item.createTime) || 0;
        }
      }
    }
  } catch {
    // Fallback to oembed if video detail page fails
    if (!thumbnailUrl || title.startsWith('Video #')) {
      try {
        const oembedRes = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
          { signal: AbortSignal.timeout(5000) }
        );
        if (oembedRes.ok) {
          const d = await oembedRes.json();
          if (d.title) title = d.title;
          if (d.author_name) authorName = d.author_name;
          if (d.thumbnail_url) thumbnailUrl = d.thumbnail_url;
        }
      } catch {
        // Ignore and use cached baseline
      }
    }
  }

  const publishedAt = createTime > 0 ? new Date(createTime * 1000).toISOString() : existingVideo?.publishedAt;

  return {
    id,
    url: videoUrl,
    title,
    authorName,
    thumbnailUrl,
    ...(localThumb ? { localThumbnailUrl: localThumb } : {}),
    createTime,
    ...(publishedAt ? { publishedAt } : {}),
    viewCount,
    likeCount,
  };
}

async function fetchTikTokVideos() {
  const existingMap = new Map();
  const discoveredIds = new Set(KNOWN_VIDEO_IDS);

  const localJsonPath = path.resolve(process.cwd(), 'src/data/tiktok.json');
  if (fs.existsSync(localJsonPath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(localJsonPath, 'utf-8'));
      if (Array.isArray(existingData.videos)) {
        for (const v of existingData.videos) {
          existingMap.set(v.id, v);
          discoveredIds.add(v.id);
        }
      }
    } catch {
      // ignore
    }
  }

  // Attempt lightweight search discovery for brand-new videos
  try {
    const searchQueries = [`site:tiktok.com/@${USERNAME}/video`, `${USERNAME} tiktok video`];
    for (const q of searchQueries) {
      const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
        headers: { 'User-Agent': BROWSER_UA },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const text = await res.text();
        const matches = [...text.matchAll(/video\/(\d+)/g)].map((m) => m[1]);
        for (const id of matches) {
          discoveredIds.add(id);
        }
      }
    }
  } catch (err) {
    console.warn('Discovery search skipped:', err.message);
  }

  const ids = Array.from(discoveredIds);
  const videos = [];
  const BATCH_SIZE = 6;

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const chunk = ids.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      chunk.map((id) => fetchVideoDetail(id, existingMap.get(id)))
    );
    videos.push(...results);
  }

  return videos.sort((a, b) => {
    if ((b.createTime || 0) !== (a.createTime || 0)) {
      return (b.createTime || 0) - (a.createTime || 0);
    }
    return BigInt(b.id) > BigInt(a.id) ? 1 : -1;
  });
}

async function fetchTikTokProfile() {
  console.log(`Fetching TikTok profile for @${USERNAME}...`);

  let followerCount = 2261;
  let heartCount = 96100;
  let videoCount = 120;
  let bio = '🎬 ادیتور ویدیو\n🎵 تایپوگرافی | موزیک\n📩 همکاری: @thepoo7an\nInstagram: @thepoo7an';
  let nickname = 'thepoo7an';
  let verified = false;

  try {
    const res = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(7000),
    });

    if (res.ok) {
      const text = await res.text();
      const match = text.match(
        /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/
      );
      if (match) {
        const data = JSON.parse(match[1]);
        const userDetail = data['__DEFAULT_SCOPE__']?.['webapp.user-detail'];
        const user = userDetail?.userInfo?.user;
        const stats = userDetail?.userInfo?.stats;

        if (stats) {
          followerCount = stats.followerCount || followerCount;
          heartCount = stats.heartCount || stats.heart || heartCount;
          videoCount = stats.videoCount || videoCount;
        }

        if (user) {
          bio = user.signature || bio;
          nickname = user.nickname || nickname;
          verified = Boolean(user.verified);
        }
      }
    }
  } catch (err) {
    console.warn('Could not scrape TikTok profile live, using cached/verified baseline:', err.message);
  }

async function ensureLocalTikTokThumb(video) {
  if (!video || !video.id) return video;
  const existingLocal = resolveLocalThumb(video.id);
  if (existingLocal) {
    return { ...video, localThumbnailUrl: existingLocal };
  }
  if (!video.thumbnailUrl) return video;

  const outDir = path.resolve(process.cwd(), 'public/images/portfolio/tiktok');
  fs.mkdirSync(outDir, { recursive: true });

  try {
    const res = await fetch(video.thumbnailUrl, {
      headers: { 'User-Agent': BROWSER_UA },
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return video;
    const buf = Buffer.from(await res.arrayBuffer());

    let sharpMod = null;
    try {
      sharpMod = (await import('sharp')).default;
    } catch {
      sharpMod = null;
    }

    if (sharpMod) {
      const webpAbs = path.join(outDir, `${video.id}.webp`);
      await sharpMod(buf).resize(640, 1138, { fit: 'cover' }).webp({ quality: 82 }).toFile(webpAbs);
      console.log(`Cached TikTok WebP cover: ${video.id}`);
      return { ...video, localThumbnailUrl: `./images/portfolio/tiktok/${video.id}.webp` };
    }

    const jpgAbs = path.join(outDir, `${video.id}.jpg`);
    fs.writeFileSync(jpgAbs, buf);
    console.log(`Cached TikTok JPG cover: ${video.id}`);
    return { ...video, localThumbnailUrl: `./images/portfolio/tiktok/${video.id}.jpg` };
  } catch (err) {
    console.warn(`Could not cache local cover for TikTok ${video.id}:`, err.message);
    return video;
  }
}

  const rawVideos = await fetchTikTokVideos();
  const rawLatest = rawVideos[0] || null;
  const rawMostViewed =
    [...rawVideos].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))[0] || null;

  const [latestVideo, mostViewedVideo] = await Promise.all([
    rawLatest ? ensureLocalTikTokThumb(rawLatest) : Promise.resolve(null),
    rawMostViewed ? ensureLocalTikTokThumb(rawMostViewed) : Promise.resolve(null),
  ]);

  const videos = rawVideos.map((v) => {
    if (latestVideo && v.id === latestVideo.id && latestVideo.localThumbnailUrl) {
      return { ...v, localThumbnailUrl: latestVideo.localThumbnailUrl };
    }
    if (mostViewedVideo && v.id === mostViewedVideo.id && mostViewedVideo.localThumbnailUrl) {
      return { ...v, localThumbnailUrl: mostViewedVideo.localThumbnailUrl };
    }
    return v;
  });

  console.log(`Loaded ${videos.length} videos for @${USERNAME}`, {
    latest: latestVideo ? { id: latestVideo.id, viewCount: latestVideo.viewCount } : null,
    mostViewed: mostViewedVideo ? { id: mostViewedVideo.id, viewCount: mostViewedVideo.viewCount } : null,
  });

  const tiktokData = {
    username: USERNAME,
    nickname,
    profileUrl: PROFILE_URL,
    bio,
    verified,
    stats: {
      followers: followerCount,
      likes: heartCount,
      videos: videoCount,
      formattedFollowers:
        followerCount >= 1000 ? `${(followerCount / 1000).toFixed(1)}K` : String(followerCount),
      formattedLikes:
        heartCount >= 1000 ? `${(heartCount / 1000).toFixed(1)}K` : String(heartCount),
      formattedVideos: String(videoCount),
    },
    ...(latestVideo ? { latestVideo } : {}),
    ...(mostViewedVideo ? { mostViewedVideo } : {}),
    videos,
    lastUpdated: new Date().toISOString(),
  };

  const primaryFilePath = path.resolve(process.cwd(), 'src/data/tiktok.json');
  if (fs.existsSync(primaryFilePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(primaryFilePath, 'utf-8'));
      const sameStats =
        existing.stats?.followers === tiktokData.stats.followers &&
        existing.stats?.likes === tiktokData.stats.likes &&
        existing.stats?.videos === tiktokData.stats.videos;
      const sameLatest =
        existing.latestVideo?.id === latestVideo?.id &&
        existing.latestVideo?.viewCount === latestVideo?.viewCount;
      const sameTop =
        existing.mostViewedVideo?.id === mostViewedVideo?.id &&
        existing.mostViewedVideo?.viewCount === mostViewedVideo?.viewCount;
      const sameVideoCount = (existing.videos?.length || 0) === tiktokData.videos.length;

      if (sameStats && sameLatest && sameTop && sameVideoCount) {
        console.log('TikTok profile & videos are already up to date. Skipping disk write.');
        return;
      }
    } catch {
      // If corrupt, proceed to overwrite
    }
  }

  const pathsToWrite = [
    primaryFilePath,
    path.resolve(process.cwd(), 'public/data/tiktok.json'),
  ];

  for (const filePath of pathsToWrite) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(tiktokData, null, 2) + '\n', 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

fetchTikTokProfile().catch((err) => {
  console.error('Error fetching TikTok profile:', err);
  process.exit(1);
});
