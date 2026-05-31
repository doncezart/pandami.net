import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svgBuffer = readFileSync(join(root, 'static', 'og.svg'));
const pngBuffer = await sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toBuffer();

writeFileSync(join(root, 'static', 'og.png'), pngBuffer);
console.log('Generated static/og.png (1200x630)');
