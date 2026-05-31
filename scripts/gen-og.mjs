import sharp from 'sharp';

const W = 1200;
const H = 630;

// Card: 1200×352 source, scale to 1120px wide, centered
const CW = 1200, CH = 352;
const VW = 1120;
const VH = Math.round(VW * CH / CW); // ≈327
const VX = Math.round((W - VW) / 2); // 40px left/right margin
const VY = H - VH - VX;              // bottom margin = left/right margin (40px)
const cutY = VY + Math.round(VH / 2); // black bg starts at card's vertical midpoint

const card = await sharp('/tmp/analytics-card.png')
  .resize(VW, VH, { fit: 'fill' })
  .png()
  .toBuffer();

// Background: pure white top, hard cut to pure black at card midpoint — no gradients
const bgSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${cutY}" fill="#FFFFFF"/>
  <rect y="${cutY}" width="${W}" height="${H - cutY}" fill="#0A0A0A"/>
</svg>`);

// Text overlay
const textSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Eyebrow -->
  <text x="${W / 2}" y="69"
    text-anchor="middle"
    font-family="Inter,ui-sans-serif,system-ui,-apple-system,sans-serif"
    font-size="11" font-weight="600" letter-spacing="4"
    fill="#DC2626">SOCIAL MEDIA AGENCY</text>

  <!-- Title -->
  <text x="${W / 2}" y="158"
    text-anchor="middle"
    font-family="Inter,ui-sans-serif,system-ui,-apple-system,sans-serif"
    font-size="74" font-weight="900"
    fill="#0A0A0A">Pandami</text>

  <!-- Tagline -->
  <text x="${W / 2}" y="208"
    text-anchor="middle"
    font-family="Inter,ui-sans-serif,system-ui,-apple-system,sans-serif"
    font-size="17" font-weight="400"
    fill="rgba(10,10,10,0.48)">All your social media needs taken care of.</text>
</svg>`);

const base = await sharp({
  create: { width: W, height: H, channels: 4, background: '#FFFFFF' },
}).png().toBuffer();

await sharp(base)
  .composite([
    { input: await sharp(bgSvg).png().toBuffer(), top: 0, left: 0 },
    { input: card, top: VY, left: VX },
    { input: await sharp(textSvg).png().toBuffer(), top: 0, left: 0 },
  ])
  .png()
  .toFile('static/og.png');

console.log(`og.png written — card at y=${VY} h=${VH} margin=${VX}px, cut at y=${cutY}`);
