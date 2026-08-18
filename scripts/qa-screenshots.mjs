/**
 * QA harness: drives the installed Chrome against the running production
 * server (npm run start). For every page and viewport it captures a
 * full-page screenshot, collects console errors and failed requests, and
 * checks for accidental horizontal overflow.
 *
 * Note: Chrome cannot capture a single screenshot taller than ~16,384 px.
 * Pages longer than that wrap around and appear to repeat their own content:
 * a capture artefact, not a page bug. Check `h1` counts before believing it.
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
  ["waxwing", "http://localhost:3000/projects/waxwing-airbrake-aerodynamics"],
  ["ply", "http://localhost:3000/projects/thin-ply-composite-analysis"],
  ["uav", "http://localhost:3000/projects/blood-transport-uav"],
  ["404", "http://localhost:3000/no-such-page"],
];
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["tablet", { width: 820, height: 1180 }],
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

    // Scroll the whole page so scroll-reveal fires and lazy images load,
    // otherwise a full-page screenshot captures hidden/blank content.
    await page.evaluate(async () => {
      // `behavior: "instant"` matters: the site sets scroll-behavior: smooth,
      // which would animate these jumps and never actually traverse the page.
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.waitForLoadState("networkidle");

    // Wait for every image to finish decoding so the page height is stable, because
    // otherwise the full-page screenshot stitches shifting layout together.
    await page.waitForFunction(
      () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
      null,
      { timeout: 20000 },
    );
    const brokenImages = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    for (const b of brokenImages) errors.push(`broken image: ${b}`);
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

// ---------------------------------------------------------------- lightbox
// Open a figure, confirm the dialog appears with the full-resolution source,
// then confirm Escape closes it.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/projects/aerospace-cfd-fsi", {
    waitUntil: "networkidle",
  });
  await page.locator("[data-lightbox]").first().click();
  const dialog = page.locator("dialog[open]");
  try {
    await dialog.waitFor({ state: "visible", timeout: 5000 });
    const src = await dialog.locator("img").getAttribute("src");
    const caption = await dialog.locator("figcaption").count();
    await page.screenshot({ path: path.join(outDir, "lightbox-open.png") });
    console.log(`✓ lightbox opens (src=${src}, caption=${caption ? "yes" : "no"})`);

    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
    console.log("✓ lightbox closes on Escape");
  } catch (err) {
    problems += 1;
    console.log(`✗ lightbox: ${err.message}`);
  }
  await context.close();
}

await browser.close();
console.log(problems ? `\n${problems} problem(s) found` : "\nAll clean");
process.exit(problems ? 1 : 0);
