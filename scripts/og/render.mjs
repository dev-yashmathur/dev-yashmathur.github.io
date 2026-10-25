// Renders scripts/og/<name>.html to public/og/<name>.png (1200×630) with headless Chrome.
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
if (!name) throw new Error('usage: node scripts/og/render.mjs <name>');
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new', '--hide-scrollbars', '--window-size=1200,630', '--force-device-scale-factor=1',
  '--virtual-time-budget=4000', '--allow-file-access-from-files',
  `--screenshot=${join(here, '../../public/og', `${name}.png`)}`,
  pathToFileURL(join(here, `${name}.html`)).href,
], { stdio: 'ignore' });
console.log(`public/og/${name}.png`);
