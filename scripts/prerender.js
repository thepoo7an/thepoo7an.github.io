import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function prerender() {
  const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
  if (!fs.existsSync(distHtmlPath)) {
    console.error('Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const ssrDir = path.join(rootDir, 'node_modules', '.cache', 'prerender-ssr');
  if (!fs.existsSync(ssrDir)) {
    fs.mkdirSync(ssrDir, { recursive: true });
  }

  const ssrBundlePath = path.join(ssrDir, 'entry-server.js');

  console.log('--- Bundling SSR entry point ---');
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src', 'entry-server.tsx')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    loader: {
      '.png': 'empty',
      '.webp': 'empty',
      '.svg': 'empty',
      '.css': 'empty',
    },
    define: {
      'import.meta.env.VITE_MEDIA_BASE_URL': JSON.stringify(process.env.VITE_MEDIA_BASE_URL || ''),
      'import.meta.env.VITE_GA_MEASUREMENT_ID': JSON.stringify(process.env.VITE_GA_MEASUREMENT_ID || ''),
      'import.meta.env.DEV': 'false',
      'import.meta.env.PROD': 'true',
      'import.meta.env': '{}',
    },
    outfile: ssrBundlePath,
  });

  console.log('--- Rendering AppContent to static HTML (Persian / fa) ---');
  // Cache busting query param for dynamic import
  const { render } = await import(`${ssrBundlePath}?t=${Date.now()}`);
  const appHtml = render();

  const originalHtml = fs.readFileSync(distHtmlPath, 'utf8');
  if (!originalHtml.includes('<div id="root"></div>')) {
    console.warn('Warning: <div id="root"></div> placeholder not found in dist/index.html');
  }

  const updatedHtml = originalHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(distHtmlPath, updatedHtml, 'utf8');

  // Verify
  const hasKeyText = updatedHtml.includes('تایپوگرافی لیریک موزیک');
  console.log(`✓ Successfully prerendered index.html (${(appHtml.length / 1024).toFixed(1)} KB static markup injected)`);
  console.log(`✓ Static SEO validation: Persian keyword verified = ${hasKeyText}`);

  // Clean up cache
  try {
    fs.rmSync(ssrDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup error
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
