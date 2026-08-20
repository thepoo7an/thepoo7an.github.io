import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'input');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'portfolio');
const MAX_WIDTH = 800;
const QUALITY = 80;
const MAX_SIZE_KB = 300;

const jobs = [
  { input: 'lyric-dark-rain', output: 'lyric-dark-rain.webp' },
  { input: 'lyric-warm-portrait', output: 'lyric-warm-portrait.webp' },
];

(async () => {
  if (!fs.existsSync(INPUT_DIR)) fs.mkdirSync(INPUT_DIR, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const job of jobs) {
    const candidates = ['png', 'jpg', 'jpeg', 'webp']
      .map((ext) => path.join(INPUT_DIR, `${job.input}.${ext}`))
      .filter(fs.existsSync);

    if (candidates.length === 0) {
      console.log(`SKIP: no source image for "${job.input}" in scripts/input/`);
      continue;
    }

    const src = candidates[0];
    const original = fs.statSync(src).size;
    const out = path.join(OUTPUT_DIR, job.output);
    let q = QUALITY;

    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(out);

    let size = fs.statSync(out).size;
    while (size / 1024 > MAX_SIZE_KB && q > 40) {
      q -= 10;
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: q })
        .toFile(out);
      size = fs.statSync(out).size;
    }

    console.log(
      `OK ${job.output}: ${(original / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB (q=${q})`
    );
  }
})();
