/**
 * Navigation QA: drives real Chrome through client-side route changes and
 * asserts that every image on each page both LOADS and is actually VISIBLE
 * (no opacity-0 ancestor) after scrolling to the bottom, without refreshing.
 *
 * Run:  node scripts/nav-qa.mjs   (with npm run start already running)
 */
import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const SLUGS = {
  cfd: "wind-turbine-aero-structural",
  naca: "naca0012-aerofoil",
  ply: "thin-ply-composite-analysis",
  uav: "blood-transport-uav",
};

let failures = 0;
const note = (s) => console.log(s);
const fail = (s) => {
  failures++;
  console.log("  ✗ " + s);
};

/** Scroll to the bottom in viewport-sized steps, letting lazy images fire. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    // The site sets `scroll-behavior: smooth` for in-page anchors; scripted
    // scrolling must be instant or we sample the page mid-animation.
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight + step; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    // Lazy images change the page height as they load, so keep scrolling
    // until the bottom actually stops moving.
    for (let i = 0; i < 20; i++) {
      const before = window.scrollY;
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 200));
      if (window.scrollY === before) break;
    }
    html.style.scrollBehavior = previous;
    await new Promise((r) => setTimeout(r, 300));
  });
  // Give in-flight image requests a chance to settle.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(600);
}

/** Report every image that failed to load or is invisible. */
async function auditImages(page, label) {
  // Park the pointer off the cards so no hover swap is in effect.
  await page.mouse.move(2, 2);
  const report = await page.evaluate(() => {
    const out = { total: 0, notLoaded: [], invisible: [], hiddenReveals: 0 };
    for (const img of document.querySelectorAll("img")) {
      // Skip the lightbox dialog's image (only populated when open) and the
      // decorative project-card overlays, which are opacity-0 by design
      // until the card is hovered.
      if (img.closest("dialog") || img.hasAttribute("aria-hidden")) continue;
      out.total++;
      const src = (img.currentSrc || img.src || "").slice(-90);
      if (!img.complete || img.naturalWidth === 0) out.notLoaded.push(src);
      else if (!img.checkVisibility({ opacityProperty: true, visibilityProperty: true }))
        out.invisible.push(src);
    }
    out.hiddenReveals = document.querySelectorAll(
      ".reveal-armed:not(.reveal-shown)",
    ).length;
    return out;
  });

  const bad = report.notLoaded.length + report.invisible.length;
  if (bad === 0 && report.hiddenReveals === 0) {
    note(`  ✓ ${label}: ${report.total} images loaded and visible`);
  } else {
    if (report.notLoaded.length)
      fail(`${label}: ${report.notLoaded.length}/${report.total} images did not load\n      ${report.notLoaded.join("\n      ")}`);
    if (report.invisible.length)
      fail(`${label}: ${report.invisible.length}/${report.total} images loaded but are INVISIBLE\n      ${report.invisible.join("\n      ")}`);
    if (report.hiddenReveals)
      fail(`${label}: ${report.hiddenReveals} reveal blocks still hidden at page bottom`);
  }
}

/*
 * The site renders two headers: a fixed rail on `lg` and up, and a compact
 * bar below it. Exactly one is ever displayed, but a bare `header a[...]`
 * selector matches both and Playwright takes the first, which at narrow
 * widths is the hidden one. Every chrome selector here is therefore scoped
 * with `:visible`.
 */
const HOME_LINK = 'header a[href="/"]:visible';

/** Click a link and wait for the client-side route change to commit. */
async function clientNav(page, selector, expectPath) {
  await page.evaluate(() => window.scrollTo(0, 0));
  const marker = await page.evaluate(() => {
    window.__navMarker = Math.random();
    return window.__navMarker;
  });
  await page.click(selector);
  await page.waitForFunction(
    (p) => location.pathname === p,
    expectPath,
    { timeout: 10000 },
  );
  await page.waitForTimeout(500);
  // Confirm it really was a client-side transition, not a full reload.
  const stillSame = await page.evaluate((m) => window.__navMarker === m, marker);
  if (!stillSame) fail(`navigation to ${expectPath} was a full page load, not client-side`);
  return stillSame;
}

const browser = await chromium.launch({ executablePath: CHROME });

for (const [vpName, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  note(`\n=== ${vpName} (${viewport.width}x${viewport.height}) ===`);
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();

  const consoleIssues = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning")
      consoleIssues.push(`[${m.type()}] ${m.text()}`);
  });
  page.on("pageerror", (e) => consoleIssues.push(`[pageerror] ${e.message}`));
  page.on("requestfailed", (r) =>
    consoleIssues.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`),
  );

  // 1. Homepage → CFD → bottom
  note("\n1. Homepage → CFD project → scroll to bottom");
  await page.goto(BASE + "/", { waitUntil: "load" });
  await scrollThrough(page);
  await auditImages(page, "homepage (direct load)");
  await clientNav(page, `a[href="/projects/${SLUGS.cfd}"]`, `/projects/${SLUGS.cfd}`);
  await scrollThrough(page);
  await auditImages(page, "CFD (client-side nav from home)");

  // 2. CFD → another project (prev/next link) → bottom
  note("\n2. CFD project → next project → scroll to bottom");
  const nextHref = await page.getAttribute(
    'nav[aria-label="Other projects"] a:last-of-type',
    "href",
  );
  await clientNav(page, `nav[aria-label="Other projects"] a[href="${nextHref}"]`, nextHref);
  await scrollThrough(page);
  await auditImages(page, `${nextHref} (client-side nav from CFD)`);

  // 3. Back to homepage → another project → bottom
  note("\n3. Back to homepage → third project → scroll to bottom");
  await clientNav(page, HOME_LINK, "/");
  await scrollThrough(page);
  await auditImages(page, "homepage (client-side nav back)");
  await clientNav(page, `a[href="/projects/${SLUGS.uav}"]`, `/projects/${SLUGS.uav}`);
  await scrollThrough(page);
  await auditImages(page, "UAV (client-side nav from home)");

  // 4. Browser Back / Forward
  note("\n4. Browser Back / Forward → scroll through");
  await page.goBack();
  await page.waitForTimeout(700);
  await scrollThrough(page);
  await auditImages(page, `back → ${new URL(page.url()).pathname}`);
  await page.goForward();
  await page.waitForTimeout(700);
  await scrollThrough(page);
  await auditImages(page, `forward → ${new URL(page.url()).pathname}`);
  await page.goBack();
  await page.goBack();
  await page.waitForTimeout(700);
  await scrollThrough(page);
  await auditImages(page, `back x2 → ${new URL(page.url()).pathname}`);

  // 5. Repeated navigation between all three projects
  note("\n5. Repeated navigation between all three projects");
  for (let round = 1; round <= 2; round++) {
    for (const [name, slug] of Object.entries(SLUGS)) {
      await clientNav(page, HOME_LINK, "/");
      await clientNav(page, `a[href="/projects/${slug}"]`, `/projects/${slug}`);
      await scrollThrough(page);
      await auditImages(page, `round ${round}: ${name}`);
    }
  }

  // 6. Direct refreshes still work
  note("\n6. Direct loads / refreshes");
  for (const [name, slug] of Object.entries(SLUGS)) {
    await page.goto(`${BASE}/projects/${slug}`, { waitUntil: "load" });
    await scrollThrough(page);
    await auditImages(page, `${name} (direct load)`);
    await page.reload({ waitUntil: "load" });
    await scrollThrough(page);
    await auditImages(page, `${name} (refresh)`);
  }

  // 7. prefers-reduced-motion must never hide anything
  note("\n7. prefers-reduced-motion");
  await context.close();
  const rmContext = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(BASE + "/", { waitUntil: "load" });
  await clientNav(rmPage, `a[href="/projects/${SLUGS.cfd}"]`, `/projects/${SLUGS.cfd}`);
  await scrollThrough(rmPage);
  await auditImages(rmPage, "CFD (reduced motion, client-side nav)");
  await rmContext.close();

  // 8. JavaScript disabled: content must remain visible
  note("\n8. JavaScript disabled (direct load)");
  const nojs = await browser.newContext({ viewport, javaScriptEnabled: false });
  const nojsPage = await nojs.newPage();
  await nojsPage.goto(`${BASE}/projects/${SLUGS.cfd}`, { waitUntil: "load" });
  const hidden = await nojsPage.evaluate(
    () => document.querySelectorAll(".reveal-armed, [style*='opacity: 0']").length,
  );
  if (hidden === 0) note("  ✓ no-JS: nothing is hidden by the reveal mechanism");
  else fail(`no-JS: ${hidden} elements hidden with JS off`);
  await nojs.close();

  note(`\nConsole issues (${vpName}): ${consoleIssues.length}`);
  for (const c of [...new Set(consoleIssues)]) note("    " + c);
  if (consoleIssues.length) failures++;
}

await browser.close();
note(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " FAILURE(S)"}`);
process.exit(failures === 0 ? 0 : 1);
