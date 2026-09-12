/**
 * Script to fetch TikTok profile & metadata for @thepoo7an
 */

import fs from 'fs';
import path from 'path';

const USERNAME = 'thepoo7an';
const PROFILE_URL = `https://www.tiktok.com/@${USERNAME}`;

// Verified list of existing videos for @thepoo7an
const KNOWN_VIDEO_IDS = [
  '7601941689380408590',
  '7657172874528328973',
  '7649831737417157902',
  '7648380647387499789',
  '7649444431690517773',
  '7648725433076223245',
  '7589224181703724302',
  '7538707506441342263',
  '7538894251048865038',
  '7549569804462476558',
  '7544033907453283598',
  '7674317130715761934',
  '7681986482227236109',
  '7676520579058502926',
  '7680462691407858957',
  '7670966647280241934',
  '7669087435191635214',
  '7670836090843991310',
  '7677497326079970573',
  '7683796098250558753',
  '7544016385119227149',
  '7670594541199641870',
  '7545892608372002062',
  '7676109656242081056',
];

async function fetchTikTokVideos() {
  const discoveredIds = new Set(KNOWN_VIDEO_IDS);

  // Attempt to discover latest videos from DuckDuckGo search if available
  try {
    const searchQueries = [
      'site:tiktok.com/@thepoo7an/video',
      'thepoo7an tiktok video',
    ];
    for (const q of searchQueries) {
      const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
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

  // Load existing videos from file if already cached
  const existingMap = new Map();
  const localJsonPath = path.resolve(process.cwd(), 'src/data/tiktok.json');
  if (fs.existsSync(localJsonPath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(localJsonPath, 'utf-8'));
      if (Array.isArray(existingData.videos)) {
        for (const v of existingData.videos) {
          existingMap.set(v.id, v);
        }
      }
    } catch {
      // ignore
    }
  }

  const videos = [];
  for (const id of discoveredIds) {
    // If we have cached full details, keep them
    if (existingMap.has(id) && existingMap.get(id).thumbnailUrl) {
      videos.push(existingMap.get(id));
      continue;
    }

    const videoUrl = `https://www.tiktok.com/@${USERNAME}/video/${id}`;
    try {
      const oembedRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`);
      if (oembedRes.ok) {
        const d = await oembedRes.json();
        if (d.author_unique_id === USERNAME || d.author_name === USERNAME || !d.author_name) {
          videos.push({
            id,
            url: videoUrl,
            title: d.title || `Video #${id.slice(-4)}`,
            authorName: d.author_name || USERNAME,
            thumbnailUrl: d.thumbnail_url || '',
          });
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch oembed for video ${id}:`, err.message);
    }
  }

  return videos;
}

async function fetchTikTokProfile() {
  console.log(`Fetching TikTok profile for @${USERNAME}...`);

  let followerCount = 1411;
  let heartCount = 59900;
  let videoCount = 91;
  let bio = '🎬 ادیتور ویدیو | 🎵 تایپوگرافی | موزیک | 📩 همکاری: @thepoo7an';
  let nickname = 'thepoo7an';
  let verified = false;

  try {
    const res = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (res.ok) {
      const text = await res.text();
      const match = text.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/);
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
    console.warn('Could not scrape TikTok live, using cached/verified baseline:', err.message);
  }

  const videos = await fetchTikTokVideos();
  console.log(`Loaded ${videos.length} videos for @${USERNAME}`);

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
      formattedFollowers: followerCount >= 1000 ? `${(followerCount / 1000).toFixed(1)}K` : String(followerCount),
      formattedLikes: heartCount >= 1000 ? `${(heartCount / 1000).toFixed(1)}K` : String(heartCount),
      formattedVideos: String(videoCount),
    },
    videos,
    lastUpdated: new Date().toISOString(),
  };

  console.log('TikTok Profile & Videos summary:', {
    username: tiktokData.username,
    stats: tiktokData.stats,
    videoCount: tiktokData.videos.length,
  });

  const pathsToWrite = [
    path.resolve(process.cwd(), 'src/data/tiktok.json'),
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
