/**
 * QA harness: drives the installed Chrome against the running production
 * server (npm run start). For every page and viewport it captures a
 * full-page screenshot, collects console errors and failed requests, and
 * checks for accidental horizontal overflow.
 *
 * Run:  node scripts/qa-screenshots.mjs <output-dir>
 */
import { chromium } from "playwright-core";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const outDir = process.argv[2] ?? "qa-shots";
await mkdir(outDir, { recursive: true });

const pages = [
  ["home", "http://localhost:3000/"],
  ["about", "http://localhost:3000/about"],
  ["cfd", "http://localhost:3000/projects/aerospace-cfd-fsi"],
  ["ply", "http://localhost:3000/projects/thin-ply-composite-analysis"],
  ["uav", "http://localhost:3000/projects/blood-transport-uav"],
  ["404", "http://localhost:3000/no-such-page"],
];
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

let problems = 0;
for (const [vpName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("requestfailed", (req) => {
    errors.push(`request failed: ${req.url()} (${req.failure()?.errorText})`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("no-such-page")) {
      errors.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  for (const [name, url] of pages) {
    errors.length = 0;
    await page.goto(url, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth
        ? `scrollWidth ${doc.scrollWidth} > clientWidth ${doc.clientWidth}`
        : null;
    });
    await page.screenshot({
      path: path.join(outDir, `${name}-${vpName}.png`),
      fullPage: true,
    });
    const issues = [...errors, ...(overflow ? [`OVERFLOW: ${overflow}`] : [])];
    if (issues.length) {
      problems += issues.length;
      console.log(`✗ ${name} @ ${vpName}`);
      for (const i of issues) console.log(`   ${i}`);
    } else {
      console.log(`✓ ${name} @ ${vpName}`);
    }
  }
  await context.close();
}
await browser.close();
console.log(problems ? `\n${problems} problem(s) found` : "\nAll clean");
process.exit(problems ? 1 : 0);
