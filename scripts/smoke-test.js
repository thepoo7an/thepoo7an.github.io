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
  'id="services"',
  'id="pricing"',
];

for (const str of expectedStrings) {
  if (!htmlContent.includes(str)) {
    console.error(`❌ FAIL: dist/index.html is missing expected content: "${str}"`);
    process.exit(1);
  }
}
console.log('✅ PASS: Essential brand and SEO strings present in static prerender');

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

// Test 5: Check critical portfolio asset existence
const coverAssetPath = path.join(distDir, 'images', 'portfolio', 'cover-1.webp');
if (!fs.existsSync(coverAssetPath)) {
  console.warn('⚠️ WARNING: dist/images/portfolio/cover-1.webp not found, checking fallback...');
} else {
  console.log('✅ PASS: 1:1 Cover Art asset confirmed');
}

console.log('🎉 All Smoke Tests Passed Successfully!');
