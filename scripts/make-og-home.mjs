/**
 * Composes the homepage Open Graph image (1280x640): the UAV CAD render
 * centred on the site's paper background with a name/role caption bar.
 * Run:  node scripts/make-og-home.mjs
 */
import sharp from "sharp";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const src = path.join(root, "public", "images", "blood-transport-uav", "uav-assembly-iso.png");
const out = path.join(root, "public", "images", "og-home.png");

const render = await sharp(src).resize({ width: 1140 }).toBuffer();
const { height: renderH } = await sharp(render).metadata();

const caption = Buffer.from(`
  <svg width="1280" height="640" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="524" width="1280" height="116" fill="#191a1e"/>
    <rect x="70" y="524" width="56" height="4" fill="#b3400d"/>
    <text x="70" y="574" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="#faf9f6">Jad El Badaoui</text>
    <text x="70" y="608" font-family="Consolas, monospace" font-size="19" fill="#b9bbc0">AEROSPACE · CFD · STRUCTURES · COMPUTATIONAL METHODS</text>
  </svg>`);

await sharp({
  create: { width: 1280, height: 640, channels: 3, background: "#faf9f6" },
})
  .composite([
    { input: render, left: Math.round((1280 - 1140) / 2), top: Math.round((524 - renderH) / 2) },
    { input: caption, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log("wrote", out);
