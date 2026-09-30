import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// SVG sparkle icon matching the brand aesthetic
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#000000"/>
  <path d="M256 70 C256 180, 290 220, 442 256 C290 292, 256 332, 256 442 C256 332, 222 292, 70 256 C222 220, 256 180, 256 70 Z" fill="#f5f5f7"/>
</svg>`;

// Maskable version with full bleed background and safe zone centered icon
const svgMaskableContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#000000"/>
  <path d="M256 100 C256 195, 285 228, 412 256 C285 284, 256 317, 256 412 C256 317, 227 284, 100 256 C227 228, 256 195, 256 100 Z" fill="#f5f5f7"/>
</svg>`;

const svgPath = path.join(ICONS_DIR, 'icon.svg');
fs.writeFileSync(svgPath, svgContent, 'utf8');

const standardIcons = [
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-48.png', size: 48 },
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generate() {
  for (const item of standardIcons) {
    const outPath = path.join(ICONS_DIR, item.name);
    await sharp(Buffer.from(svgContent))
      .resize(item.size, item.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated ${item.name} (${item.size}x${item.size}) in icons/`);

    // Also copy apple-touch-icon.png to public root for iOS Safari compatibility
    if (item.name === 'apple-touch-icon.png') {
      const rootAppleTouchPath = path.join(PUBLIC_DIR, 'apple-touch-icon.png');
      fs.copyFileSync(outPath, rootAppleTouchPath);
      console.log(`Copied apple-touch-icon.png to public root`);
    }
  }

  // Generate icon-512-maskable.png
  const maskablePath = path.join(ICONS_DIR, 'icon-512-maskable.png');
  await sharp(Buffer.from(svgMaskableContent))
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(maskablePath);
  console.log(`Generated icon-512-maskable.png (512x512)`);
}

generate().catch(console.error);
