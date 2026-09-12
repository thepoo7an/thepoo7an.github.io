/**
 * Script to fetch the latest YouTube video/short from @thepoo7an RSS feed.
 * Channel ID: UCRGzKlPWgYZvvL7YNUcceiw
 */

import fs from 'fs';
import path from 'path';

const CHANNEL_ID = 'UCRGzKlPWgYZvvL7YNUcceiw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

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

  // Extract first <entry>...</entry>
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!entryMatch) {
    throw new Error('No <entry> found in YouTube RSS feed');
  }

  const entry = entryMatch[1];

  const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
  const titleMatch = entry.match(/<title>(.*?)<\/title>/);
  const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
  const updatedMatch = entry.match(/<updated>(.*?)<\/updated>/);
  const channelTitleMatch = xml.match(/<author>\s*<name>(.*?)<\/name>/);

  const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';
  const title = titleMatch ? titleMatch[1].trim() : '';
  const publishedAt = publishedMatch ? publishedMatch[1].trim() : '';
  const updatedAt = updatedMatch ? updatedMatch[1].trim() : '';
  const channelTitle = channelTitleMatch ? channelTitleMatch[1].trim() : 'THEPOO7AN';

  if (!videoId) {
    throw new Error('Could not parse videoId from entry');
  }

  // Determine if it's a short or standard video by checking URL or thumbnail
  const videoData = {
    channelId: CHANNEL_ID,
    channelTitle,
    channelUrl: 'https://www.youtube.com/@thepoo7an',
    videoId,
    title,
    url: `https://www.youtube.com/shorts/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    maxresThumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    publishedAt,
    lastUpdated: new Date().toISOString(),
  };

  console.log('Successfully extracted video data:', videoData);

  // Write to src/data/latest-youtube.json and public/data/latest-youtube.json
  const pathsToWrite = [
    path.resolve(process.cwd(), 'src/data/latest-youtube.json'),
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
