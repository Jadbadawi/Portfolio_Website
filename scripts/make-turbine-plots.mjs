/**
 * Plots the wind-turbine CFD iterative-convergence history from the raw
 * Fluent report-definition file saved by the run.
 *
 * Source data: scripts/data/turbine-blade-pressure-monitor.out, copied
 * verbatim from the ANSYS project archive at
 *   ~/Documents/summer 2026/turbine_files/dp0/FFF/Fluent/report-def-0-rfile.out
 * It is the integral static pressure on the blade wall, logged every
 * iteration of the 1,000-iteration baseline run.
 *
 * The plot is rendered as an SVG and rasterised to PNG so it goes through
 * the same next/image path as every other figure on the site (lightbox,
 * fixed intrinsic size, no layout shift), and so the page needs no charting
 * library at runtime.
 *
 * Run:  node scripts/make-turbine-plots.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const dataFile = path.join(root, "scripts", "data", "turbine-blade-pressure-monitor.out");
const out = path.join(
  root,
  "public",
  "images",
  "wind-turbine-aero-structural",
  "convergence-monitor.png",
);

// Site design tokens, kept in step with src/app/globals.css.
const PAPER = "#ffffff";
const INK = "#191a1e";
const INK2 = "#4d5058";
const INK3 = "#82858d";
const LINE = "#e4e2da";
const ACCENT = "#b3400d";

// ------------------------------------------------------------------- data
const raw = await readFile(dataFile, "utf8");
const series = [];
for (const line of raw.split(/\r?\n/)) {
  const m = line.trim().match(/^(\d+)\s+(-?[\d.eE+]+)$/);
  if (m) series.push({ it: Number(m[1]), value: Number(m[2]) });
}
if (series.length < 100) throw new Error(`only parsed ${series.length} iterations`);

// The first few hundred iterations swing through two orders of magnitude
// while the field is still filling in, which would flatten the part of the
// history that actually matters. The plot starts where the monitor has
// reached the same order as its final value.
const FROM = 300;
const points = series.filter((p) => p.it >= FROM);
const final = series.at(-1).value;

const tail = series.filter((p) => p.it > series.at(-1).it - 100);
const spread = Math.max(...tail.map((p) => p.value)) - Math.min(...tail.map((p) => p.value));
const driftPct = (spread / Math.abs(final)) * 100;

// --------------------------------------------------------------- geometry
const W = 1400;
const H = 800;
const M = { top: 74, right: 40, bottom: 78, left: 118 };
const plotW = W - M.left - M.right;
const plotH = H - M.top - M.bottom;

const xMin = FROM;
const xMax = series.at(-1).it;
const values = points.map((p) => p.value);
const yLo = Math.min(...values);
const yHi = Math.max(...values);
const pad = (yHi - yLo) * 0.08;
const yMin = yLo - pad;
const yMax = yHi + pad;

const sx = (it) => M.left + ((it - xMin) / (xMax - xMin)) * plotW;
const sy = (v) => M.top + (1 - (v - yMin) / (yMax - yMin)) * plotH;

const xTicks = [300, 400, 500, 600, 700, 800, 900, 1000];
const yTicks = [];
for (let v = -200000; v <= 200000; v += 20000) if (v >= yMin && v <= yMax) yTicks.push(v);

const fmtY = (v) => (v / 1000).toFixed(0) + "k";
const pathD = points.map((p, i) => `${i ? "L" : "M"}${sx(p.it).toFixed(1)} ${sy(p.value).toFixed(1)}`).join(" ");

// The band the monitor still wanders inside over the final 100 iterations.
const bandTop = sy(Math.max(...tail.map((p) => p.value)));
const bandBottom = sy(Math.min(...tail.map((p) => p.value)));
const bandLeft = sx(xMax - 100);

// Inset over that same window. At full-plot scale the tail looks perfectly
// flat, which is the misreading the figure exists to correct: the inset is
// the same data with the vertical axis expanded by two orders of magnitude.
const IN = { left: 880, top: 168, w: 400, h: 190 };
const inLo = Math.min(...tail.map((p) => p.value));
const inHi = Math.max(...tail.map((p) => p.value));
const inPad = (inHi - inLo) * 0.18;
const ix = (it) => IN.left + ((it - (xMax - 100)) / 100) * IN.w;
const iy = (v) =>
  IN.top + (1 - (v - (inLo - inPad)) / (inHi + inPad - (inLo - inPad))) * IN.h;
const insetPath = tail
  .map((p, i) => `${i ? "L" : "M"}${ix(p.it).toFixed(1)} ${iy(p.value).toFixed(1)}`)
  .join(" ");

const sans = "Segoe UI, Arial, sans-serif";
const mono = "Consolas, monospace";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <text x="${M.left}" y="34" font-family="${sans}" font-size="24" font-weight="600" fill="${INK}">Iterative convergence of the baseline turbine run</text>
  <text x="${M.left}" y="58" font-family="${mono}" font-size="16" fill="${INK3}">${esc(
    "INTEGRAL STATIC PRESSURE ON THE BLADE WALL  ·  367,691-CELL MESH  ·  STEADY SST k-ω",
  )}</text>

  ${yTicks
    .map(
      (v) =>
        `<line x1="${M.left}" y1="${sy(v).toFixed(1)}" x2="${M.left + plotW}" y2="${sy(v).toFixed(
          1,
        )}" stroke="${LINE}" stroke-width="1"/>
     <text x="${M.left - 14}" y="${(sy(v) + 6).toFixed(
       1,
     )}" text-anchor="end" font-family="${mono}" font-size="16" fill="${INK3}">${fmtY(v)}</text>`,
    )
    .join("\n  ")}

  ${xTicks
    .map(
      (t) =>
        `<line x1="${sx(t).toFixed(1)}" y1="${M.top + plotH}" x2="${sx(t).toFixed(1)}" y2="${
          M.top + plotH + 8
        }" stroke="${LINE}" stroke-width="1"/>
     <text x="${sx(t).toFixed(1)}" y="${
       M.top + plotH + 32
     }" text-anchor="middle" font-family="${mono}" font-size="16" fill="${INK3}">${t}</text>`,
    )
    .join("\n  ")}

  <!-- band the monitor still occupies over the final 100 iterations -->
  <rect x="${bandLeft.toFixed(1)}" y="${bandTop.toFixed(1)}" width="${(
    M.left + plotW - bandLeft
  ).toFixed(1)}" height="${Math.max(2, bandBottom - bandTop).toFixed(
    1,
  )}" fill="${ACCENT}" fill-opacity="0.14"/>
  <line x1="${bandLeft.toFixed(1)}" y1="${M.top}" x2="${bandLeft.toFixed(1)}" y2="${
    M.top + plotH
  }" stroke="${ACCENT}" stroke-width="1" stroke-dasharray="5 5" stroke-opacity="0.6"/>

  <path d="${pathD}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>

  <line x1="${M.left}" y1="${M.top}" x2="${M.left}" y2="${M.top + plotH}" stroke="${INK2}" stroke-width="1.4"/>
  <line x1="${M.left}" y1="${M.top + plotH}" x2="${M.left + plotW}" y2="${
    M.top + plotH
  }" stroke="${INK2}" stroke-width="1.4"/>

  <text x="${M.left + plotW / 2}" y="${
    H - 22
  }" text-anchor="middle" font-family="${sans}" font-size="18" fill="${INK2}">Iteration</text>
  <text x="26" y="${M.top + plotH / 2}" text-anchor="middle" font-family="${sans}" font-size="18" fill="${INK2}" transform="rotate(-90 26 ${
    M.top + plotH / 2
  })">Integral static pressure on blade (N)</text>

  <!-- inset: the same final 100 iterations, vertical axis expanded -->
  <line x1="${bandLeft.toFixed(1)}" y1="${bandTop.toFixed(1)}" x2="${(IN.left + IN.w).toFixed(
    1,
  )}" y2="${(IN.top + IN.h).toFixed(1)}" stroke="${ACCENT}" stroke-width="1" stroke-opacity="0.35"/>
  <rect x="${IN.left}" y="${IN.top}" width="${IN.w}" height="${
    IN.h
  }" fill="${PAPER}" stroke="${LINE}" stroke-width="1.4"/>
  <path d="${insetPath}" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linejoin="round"/>
  <text x="${IN.left + IN.w}" y="${
    IN.top - 44
  }" text-anchor="end" font-family="${mono}" font-size="17" fill="${ACCENT}">ITERATIONS ${xMax - 100} TO ${xMax}, VERTICAL SCALE EXPANDED</text>
  <text x="${IN.left + IN.w}" y="${
    IN.top - 20
  }" text-anchor="end" font-family="${mono}" font-size="17" fill="${ACCENT}">SPREAD ${spread.toFixed(
    0,
  )} N = ${driftPct.toFixed(2)}% OF THE FINAL VALUE</text>
  <text x="${IN.left + IN.w - 10}" y="${
    IN.top + 22
  }" text-anchor="end" font-family="${mono}" font-size="15" fill="${INK3}">${inHi.toFixed(0)} N</text>
  <text x="${IN.left + IN.w - 10}" y="${
    IN.top + IN.h - 10
  }" text-anchor="end" font-family="${mono}" font-size="15" fill="${INK3}">${inLo.toFixed(0)} N</text>
</svg>`;

const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);

console.log(`wrote ${out}`);
console.log(`  ${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB`);
console.log(`  iterations parsed: ${series.length}`);
console.log(`  final value: ${final.toFixed(1)} N`);
console.log(`  final-100 spread: ${spread.toFixed(1)} N = ${driftPct.toFixed(3)} %`);
