import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wranglerPath = join(__dirname, '..', 'dist', 'server', 'wrangler.json');

try {
  const content = readFileSync(wranglerPath, 'utf-8');
  const config = JSON.parse(content);

  if (config.assets && config.assets.binding === 'ASSETS') {
    config.assets.binding = 'STATIC_ASSETS';
    writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
    console.log('✓ Renamed ASSETS binding → STATIC_ASSETS in dist/server/wrangler.json');
  } else {
    console.log('✓ No ASSETS binding found, skipping');
  }
} catch (err) {
  console.error('Failed to patch wrangler.json:', err.message);
  process.exit(1);
}
