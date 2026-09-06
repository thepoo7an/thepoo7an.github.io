import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');
const HERO_DIR = path.join(PUBLIC_DIR, 'hero');
const PORTFOLIO_DIR = path.join(PUBLIC_DIR, 'portfolio');

async function processDirectory(dir, maxWidth = 1200, quality = 82) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue;
    const baseName = path.parse(file).name;
    const inputPath = path.join(dir, file);
    const webpPath = path.join(dir, `${baseName}.webp`);

    const originalSize = fs.statSync(inputPath).size;
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    const saving = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(
      `✓ ${file} -> ${baseName}.webp: ${(originalSize / 1024).toFixed(0)}KB -> ${(webpSize / 1024).toFixed(0)}KB (${saving}% smaller)`
    );
  }
}

(async () => {
  console.log('--- Optimizing Hero Assets to WebP ---');
  await processDirectory(HERO_DIR, 1200, 85);

  console.log('\n--- Optimizing Portfolio Assets to WebP ---');
  await processDirectory(PORTFOLIO_DIR, 800, 82);

  console.log('\nDone!');
})();
