// Regenerates vendor/ from node_modules — runs automatically after every
// `npm install` via the "postinstall" hook in package.json. This exists
// because index.html loads Chart.js/html2canvas/jsPDF/Tailwind as plain
// local <script>/<link> tags (no CDN, for privacy/offline reasons — see
// PRIVACY.md), so those files need to physically exist in vendor/ next to
// index.html. Without this script, `npm install` alone leaves vendor/
// empty and every one of those tags 404s silently, which is exactly what
// breaks the app's layout and JS (Chart/jspdf/html2canvas all undefined).
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const VENDOR_DIR = path.join(ROOT, 'vendor');

function copyFile(src, dest, label) {
  if (!fs.existsSync(src)) {
    console.error(`[build-vendor] MISSING: ${label} not found at ${src}`);
    console.error('[build-vendor] Did `npm install` finish successfully? Try deleting node_modules and re-running npm install.');
    process.exitCode = 1;
    return false;
  }
  fs.copyFileSync(src, dest);
  console.log(`[build-vendor] copied ${label} -> ${path.relative(ROOT, dest)}`);
  return true;
}

fs.mkdirSync(VENDOR_DIR, { recursive: true });

copyFile(
  path.join(ROOT, 'node_modules', 'chart.js', 'dist', 'chart.umd.js'),
  path.join(VENDOR_DIR, 'chart.umd.js'),
  'chart.js'
);

copyFile(
  path.join(ROOT, 'node_modules', 'html2canvas', 'dist', 'html2canvas.min.js'),
  path.join(VENDOR_DIR, 'html2canvas.min.js'),
  'html2canvas'
);

copyFile(
  path.join(ROOT, 'node_modules', 'jspdf', 'dist', 'jspdf.umd.min.js'),
  path.join(VENDOR_DIR, 'jspdf.umd.min.js'),
  'jspdf'
);

console.log('[build-vendor] compiling tailwind.css from tailwind-input.css + tailwind.config.js ...');
try {
  execSync(
    'npx tailwindcss -i ./tailwind-input.css -o ./vendor/tailwind.css --minify',
    { cwd: ROOT, stdio: 'inherit' }
  );
  console.log('[build-vendor] tailwind.css compiled OK');
} catch (e) {
  console.error('[build-vendor] Tailwind build failed:', e.message);
  process.exitCode = 1;
}

if (process.exitCode === 1) {
  console.error('\n[build-vendor] FAILED — see errors above. The app will not render correctly until vendor/ is complete.');
} else {
  console.log('\n[build-vendor] Done. vendor/ is ready.');
}