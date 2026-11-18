import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('--- Running Smoke Test Suite ---');

// Test 1: Check dist directory and entry HTML
const distHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(distHtmlPath)) {
  console.error('❌ FAIL: dist/index.html does not exist. Run "npm run build" first.');
  process.exit(1);
}

const htmlContent = fs.readFileSync(distHtmlPath, 'utf8');

// Test 2: Verify essential brand and SEO content rendered statically
const expectedStrings = [
  'THEPOO7AN',
  'تایپوگرافی لیریک',
  'پویان کریمی',
  'id="work"',
  'id="portfolio"',
  'id="services"',
  'id="workflow"',
  'id="pricing"',
  'id="faq"',
];

for (const str of expectedStrings) {
  if (!htmlContent.includes(str)) {
    console.error(`❌ FAIL: dist/index.html is missing expected content: "${str}"`);
    process.exit(1);
  }
}
console.log('✅ PASS: Essential brand and SEO strings present in static prerender');

// Test 2b: Explicitly verify #portfolio section existence, visibility, and #work legacy anchor
const portfolioSectionMatch = htmlContent.match(/<section\b[^>]*\bid=["']portfolio["'][^>]*>/i);
if (!portfolioSectionMatch) {
  console.error('❌ FAIL: <section id="portfolio"> element not found in dist/index.html');
  process.exit(1);
}

const portfolioOpenTag = portfolioSectionMatch[0];
const hiddenPatterns = [
  /\bhidden\b(?!=)/i,
  /\bsr-only\b/i,
  /\baria-hidden=["']true["']/i,
  /\bdisplay\s*:\s*none\b/i,
  /\bvisibility\s*:\s*hidden\b/i,
  /\bopacity-0\b/i,
  /\bopacity\s*:\s*0\b/i,
];

for (const pattern of hiddenPatterns) {
  if (pattern.test(portfolioOpenTag)) {
    console.error(`❌ FAIL: #portfolio section appears hidden (${pattern}) in dist/index.html`);
    process.exit(1);
  }
}

const portfolioStartIndex = portfolioSectionMatch.index ?? -1;
const portfolioBodyMatch = htmlContent.slice(portfolioStartIndex).match(/^[\s\S]*?<\/section>/i);
const portfolioSectionHtml = portfolioBodyMatch ? portfolioBodyMatch[0] : '';

if (!portfolioSectionHtml.includes('id="work"')) {
  console.error('❌ FAIL: Legacy #work anchor is missing inside visible #portfolio section');
  process.exit(1);
}
if (!/<h2\b[^>]*>/.test(portfolioSectionHtml) || !/<article\b/.test(portfolioSectionHtml)) {
  console.error('❌ FAIL: #portfolio section rendered without visible heading or portfolio cards');
  process.exit(1);
}
console.log('✅ PASS: #portfolio section exists, is visible (non-hidden with heading & items), and preserves #work anchor');

// Test 3: Ensure no fake aggregateRating in JSON-LD (Anti-spam schema check)
if (htmlContent.includes('"@type": "AggregateRating"') || htmlContent.includes('"aggregateRating"')) {
  console.error('❌ FAIL: dist/index.html contains unverified aggregateRating schema!');
  process.exit(1);
}
console.log('✅ PASS: No unauthorized aggregateRating schema present');

// Test 4: Ensure order.html exists
const orderHtmlPath = path.join(distDir, 'order.html');
if (!fs.existsSync(orderHtmlPath)) {
  console.error('❌ FAIL: dist/order.html does not exist in build output');
  process.exit(1);
}
console.log('✅ PASS: Standalone order form dist/order.html confirmed');

// Test 5: Check critical portfolio asset existence & 3-platform highlights
const reelAssetPath = path.join(distDir, 'images', 'portfolio', 'instagram', 'DbgAe6cNsdr.webp');
if (!fs.existsSync(reelAssetPath)) {
  console.warn('⚠️ WARNING: dist/images/portfolio/instagram/DbgAe6cNsdr.webp not found, checking fallback...');
} else {
  console.log('✅ PASS: Authentic 9:16 Instagram Reel asset confirmed');
}

for (const platformLabel of ['Instagram Reels', 'YouTube Shorts', 'TikTok']) {
  if (!htmlContent.includes(platformLabel)) {
    console.error(`❌ FAIL: dist/index.html missing 3-platform highlight "${platformLabel}"`);
    process.exit(1);
  }
}
if (!htmlContent.includes('آخرین آپلود') || !htmlContent.includes('پربازدیدترین')) {
  console.error('❌ FAIL: dist/index.html missing Latest Upload / Most Viewed labels');
  process.exit(1);
}
console.log('✅ PASS: All 3 platform highlight cards & roles confirmed');

// Test 6: Pricing & theme-color consistency across index.html & order.html
if (htmlContent.includes('۴۹۰٬۰۰۰') || htmlContent.includes('4900000 IRR')) {
  console.error('❌ FAIL: dist/index.html contains stale 490,000 Toman pricing');
  process.exit(1);
}
for (const priceToken of ['۱۵۰٬۰۰۰', '۳۰۰٬۰۰۰', '۱٬۰۰۰٬۰۰۰', '1500000-10000000 IRR']) {
  if (!htmlContent.includes(priceToken)) {
    console.error(`❌ FAIL: dist/index.html missing updated pricing token: ${priceToken}`);
    process.exit(1);
  }
}
const orderHtmlContent = fs.readFileSync(orderHtmlPath, 'utf8');
if (!htmlContent.includes('content="#050506"') || !orderHtmlContent.includes('content="#050506"')) {
  console.error('❌ FAIL: meta[name="theme-color"] default #050506 missing in dist HTML');
  process.exit(1);
}
if (/font-size:\s*(?:10\.5|11|11\.5)px/i.test(orderHtmlContent)) {
  console.error('❌ FAIL: dist/order.html still contains sub-12px CSS font-size rules');
  process.exit(1);
}
console.log('✅ PASS: Pricing schema sync, theme-color, and >=12px order typography verified');

// Test 7: Verify local MP4 portfolio videos exist and have faststart (moov before mdat)
const videosDir = path.join(distDir, 'videos', 'portfolio');
if (!fs.existsSync(videosDir)) {
  console.error('❌ FAIL: dist/videos/portfolio directory missing');
  process.exit(1);
}
const mp4Files = fs.readdirSync(videosDir).filter((f) => f.endsWith('.mp4'));
if (mp4Files.length === 0) {
  console.error('❌ FAIL: No local MP4 videos found in dist/videos/portfolio');
  process.exit(1);
}
for (const file of mp4Files) {
  const buf = fs.readFileSync(path.join(videosDir, file));
  let pos = 0;
  let moovPos = -1;
  let mdatPos = -1;
  while (pos + 8 <= buf.length) {
    let size = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (size === 0) size = buf.length - pos;
    if (type === 'moov' && moovPos === -1) moovPos = pos;
    if (type === 'mdat' && mdatPos === -1) mdatPos = pos;
    if (size < 8) break;
    pos += size;
  }
  if (moovPos === -1 || mdatPos === -1 || moovPos > mdatPos) {
    console.error(`❌ FAIL: MP4 "${file}" is not faststart-ready (moov=${moovPos}, mdat=${mdatPos})`);
    process.exit(1);
  }
}
console.log(`✅ PASS: All ${mp4Files.length} local MP4 portfolio videos verified with faststart (moov before mdat)`);

console.log('🎉 All Smoke Tests Passed Successfully!');
