/**
 * Composes the Open Graph images (1280x640) for the two ANSYS case studies.
 *
 * The wind-turbine and NACA 0012 studies were split out of a single combined
 * project, and the old social preview showed both. Each page now gets a
 * preview built from its own figures, in the same style as the homepage one
 * (see make-og-home.mjs): figures on the site's paper background, with a
 * dark caption bar carrying the title and a mono subtitle.
 *
 * Run:  node scripts/make-og-projects.mjs
 */
import sharp from "sharp";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const images = path.join(root, "public", "images");

const CARDS = [
  {
    dir: "wind-turbine-aero-structural",
    title: "Wind Turbine Aero-Structural Simulation",
    subtitle: "ROTATING-FRAME RANS · ONE-WAY FSI · ORTHOTROPIC SHELL FEA",
    panels: ["card.png", "fea-deformation.png"],
    labels: ["ROTOR VELOCITY FIELD", "BLADE DEFORMATION"],
  },
  {
    dir: "naca0012-aerofoil",
    title: "NACA 0012 Aerofoil CFD",
    subtitle: "STEADY RANS · VALIDATED AGAINST NASA SURFACE-PRESSURE DATA",
    panels: ["card.png", "experimental-cp-reference.png"],
    labels: ["PRESSURE FIELD", "Cp VS NASA DATA"],
  },
];

const W = 1280;
const H = 640;
const BAR = 116;
const GAP = 24;
const PAD = 34;
const panelW = Math.round((W - 2 * PAD - GAP) / 2);
const panelH = H - BAR - 2 * PAD - 26; // 26 px reserved for the panel label

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const card of CARDS) {
  const composites = [];

  for (const [i, file] of card.panels.entries()) {
    const left = PAD + i * (panelW + GAP);
    const panel = await sharp(path.join(images, card.dir, file))
      .resize({ width: panelW, height: panelH, fit: "contain", background: "#ffffff" })
      .toBuffer();
    composites.push({ input: panel, left, top: PAD });
    composites.push({
      input: Buffer.from(
        `<svg width="${panelW}" height="26" xmlns="http://www.w3.org/2000/svg">
           <text x="0" y="18" font-family="Consolas, monospace" font-size="15" letter-spacing="1.2" fill="#82858d">${esc(
             card.labels[i],
           )}</text>
         </svg>`,
      ),
      left,
      top: PAD + panelH + 6,
    });
  }

  composites.push({
    input: Buffer.from(
      `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
         <rect x="0" y="${H - BAR}" width="${W}" height="${BAR}" fill="#191a1e"/>
         <rect x="${PAD}" y="${H - BAR}" width="56" height="4" fill="#b3400d"/>
         <text x="${PAD}" y="${
           H - BAR + 52
         }" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="600" fill="#faf9f6">${esc(
           card.title,
         )}</text>
         <text x="${PAD}" y="${
           H - BAR + 86
         }" font-family="Consolas, monospace" font-size="17" fill="#b9bbc0">${esc(card.subtitle)}</text>
       </svg>`,
    ),
    left: 0,
    top: 0,
  });

  const out = path.join(images, card.dir, "og.png");
  const info = await sharp({
    create: { width: W, height: H, channels: 3, background: "#faf9f6" },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`wrote ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB)`);
}
