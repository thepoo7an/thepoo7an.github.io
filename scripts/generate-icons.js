import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// SVG sparkle icon matching the brand aesthetic
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#000000"/>
  <path d="M256 70 C256 180, 290 220, 442 256 C290 292, 256 332, 256 442 C256 332, 222 292, 70 256 C222 220, 256 180, 256 70 Z" fill="#f5f5f7"/>
</svg>`;

const svgPath = path.join(ICONS_DIR, 'icon.svg');
fs.writeFileSync(svgPath, svgContent, 'utf8');

const sizes = [
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function generate() {
  for (const item of sizes) {
    const outPath = path.join(ICONS_DIR, item.name);
    await sharp(Buffer.from(svgContent))
      .resize(item.size, item.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }
}

generate().catch(console.error);
