import sharp from 'sharp';

const W = 1200;
const H = 630;

// Scale visual tall, place on right half — no overlap with text
const VH = 300;
const VW = Math.round(VH * 1400 / 400); // 1050px wide; right edge clips off naturally
const VX = 620;
const VY = Math.round((H - VH) / 2);    // vertically centered

const visual = await sharp('/tmp/hero-visual.png')
  .resize(VW, VH, { fit: 'fill' })
  .png()
  .toBuffer();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fadeR" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#0A0A0A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="fadeL" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#0A0A0A" stop-opacity="1"/>
      <stop offset="70%" stop-color="#0A0A0A" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- eyebrow -->
  <text x="64" y="210"
    font-family="Inter,ui-sans-serif,system-ui,sans-serif"
    font-size="11" font-weight="600" letter-spacing="3"
    fill="rgba(255,255,255,0.45)">SOCIAL MEDIA AGENCY</text>

  <!-- headline -->
  <text x="64" y="282"
    font-family="Inter,ui-sans-serif,system-ui,sans-serif"
    font-size="50" font-weight="900" fill="#FFFFFF">Your social media</text>
  <text x="64" y="344"
    font-family="Inter,ui-sans-serif,system-ui,sans-serif"
    font-size="50" font-weight="900" fill="#FFFFFF">needs taken care of.</text>

  <!-- sub -->
  <text x="64" y="393"
    font-family="Inter,ui-sans-serif,system-ui,sans-serif"
    font-size="16" font-weight="400"
    fill="rgba(255,255,255,0.45)">Pandami helps brands grow across every channel.</text>

  <!-- left edge of visual: fade in -->
  <rect x="${VX}" y="0" width="100" height="${H}" fill="url(#fadeL)"/>
  <!-- right edge: fade out -->
  <rect x="${W - 110}" y="0" width="110" height="${H}" fill="url(#fadeR)"/>

  <!-- red bottom bar -->
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="#DC2626"/>

  <!-- domain -->
  <text x="64" y="${H - 22}"
    font-family="Inter,ui-sans-serif,system-ui,sans-serif"
    font-size="13" font-weight="400"
    fill="rgba(255,255,255,0.3)">pandami.net</text>
</svg>`;

const base = await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } },
}).png().toBuffer();

await sharp(base)
  .composite([
    { input: visual, left: VX, top: VY },
    { input: Buffer.from(svg), top: 0, left: 0 },
  ])
  .png()
  .toFile('static/og.png');

console.log('og.png written');
