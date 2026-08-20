// scripts/compress-images.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
const INPUT_DIR = path.join(__dirname, 'input');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');
const HERO_DIR = path.join(PUBLIC_DIR, 'hero');
const PORTFOLIO_DIR = path.join(PUBLIC_DIR, 'portfolio');

const jobs = [
  {
    sources: [
      path.join(SRC_DIR, 'thepoo7an_new_logo_1787164651445.jpg'),
      path.join(INPUT_DIR, 'logo.png'),
      path.join(INPUT_DIR, 'logo.jpg')
    ],
    outputDir: HERO_DIR,
    baseName: 'logo',
    maxWidth: 1200,
    quality: 85
  },
  {
    sources: [
      path.join(SRC_DIR, 'thepoo7an_light_logo_1787220939559.jpg'),
      path.join(INPUT_DIR, 'logo-light.png'),
      path.join(INPUT_DIR, 'logo-light.jpg')
    ],
    outputDir: HERO_DIR,
    baseName: 'logo-light',
    maxWidth: 1200,
    quality: 85
  },
  {
    sources: [
      path.join(SRC_DIR, 'lyric_dark_rain_1787165672591.jpg'),
      path.join(INPUT_DIR, 'work-typography.png'),
      path.join(INPUT_DIR, 'work-typography.jpg')
    ],
    outputDir: PORTFOLIO_DIR,
    baseName: 'work-typography',
    maxWidth: 768,
    quality: 85
  },
  {
    sources: [
      path.join(SRC_DIR, 'lyric_dark_rain_1787165672591.jpg'),
      path.join(INPUT_DIR, 'work-visuals.png'),
      path.join(INPUT_DIR, 'work-visuals.jpg')
    ],
    outputDir: PORTFOLIO_DIR,
    baseName: 'work-visuals',
    maxWidth: 768,
    quality: 85
  },
  {
    sources: [
      path.join(SRC_DIR, 'lyric_warm_portrait_1787165686658.jpg'),
      path.join(INPUT_DIR, 'work-cover.png'),
      path.join(INPUT_DIR, 'work-cover.jpg')
    ],
    outputDir: PORTFOLIO_DIR,
    baseName: 'work-cover',
    maxWidth: 768,
    quality: 85
  }
];

(async () => {
  fs.mkdirSync(HERO_DIR, { recursive: true });
  fs.mkdirSync(PORTFOLIO_DIR, { recursive: true });

  for (const job of jobs) {
    const src = job.sources.find(fs.existsSync);
    if (!src) {
      console.log(`SKIP: No source found for "${job.baseName}"`);
      continue;
    }

    const originalSize = fs.statSync(src).size;
    const pngOut = path.join(job.outputDir, `${job.baseName}.png`);
    const webpOut = path.join(job.outputDir, `${job.baseName}.webp`);

    await sharp(src)
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .png({ quality: job.quality, compressionLevel: 8 })
      .toFile(pngOut);

    await sharp(src)
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(webpOut);

    const pngSize = fs.statSync(pngOut).size;
    const webpSize = fs.statSync(webpOut).size;

    console.log(
      `OK ${job.baseName}: ${(originalSize / 1024).toFixed(0)}KB src -> PNG: ${(pngSize / 1024).toFixed(0)}KB, WebP: ${(webpSize / 1024).toFixed(0)}KB`
    );
  }

  const heroBgDark = path.join(HERO_DIR, 'hero-bg.png');
  const heroBgLight = path.join(HERO_DIR, 'hero-bg-light.png');
  if (!fs.existsSync(heroBgDark)) {
    await sharp({
      create: { width: 1920, height: 1080, channels: 4, background: { r: 5, g: 5, b: 7, alpha: 1 } }
    }).png().toFile(heroBgDark);
  }
  if (!fs.existsSync(heroBgLight)) {
    await sharp({
      create: { width: 1920, height: 1080, channels: 4, background: { r: 250, g: 250, b: 252, alpha: 1 } }
    }).png().toFile(heroBgLight);
  }
})();

