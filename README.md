# jadelbadaoui.com

Personal portfolio site for **Jad El Badaoui**: aerospace engineering, CFD,
composite structures and computational methods.

Production: [jadelbadaoui.com](https://jadelbadaoui.com), deployed from this
repository through Vercel.

Built with **Next.js 16** (App Router, Turbopack), **TypeScript** and
**Tailwind CSS 4**. Fully statically generated, with no database, no backend
and no client-side data fetching. The only client JavaScript is a small
progressive-enhancement scroll-reveal that respects `prefers-reduced-motion`
and degrades to a fully visible page without JS.

## Local development

Requires Node.js 20.9+.

```bash
npm install
npm run dev          # http://localhost:3000
```

On Windows PowerShell, use `npm.cmd` if `npm.ps1` is blocked by the execution
policy (`npm.cmd run build`).

## Production build

```bash
npm run build        # static build, must pass with zero errors
npm run start        # serve the production build locally
npx eslint src scripts
```

## Project structure

```
src/lib/site.ts             Site config: URLs, contact, education, CV toggle
src/lib/projects/           One data file per project + types + registry
src/lib/capabilities.ts     Homepage capability groups
src/components/             Header, footer, cards, case-study block renderers
src/app/                    Routes: /, /about, /projects/[slug], sitemap, robots
public/images/<slug>/       Curated project imagery
scripts/import-images.mjs   Re-imports imagery from the source repositories
scripts/make-og-home.mjs    Regenerates the homepage Open Graph image
scripts/qa-screenshots.mjs  Screenshot/console/overflow QA harness
scripts/nav-qa.mjs          Client-side navigation and image-visibility QA
docs/adding-a-project.md    How to add a project (start here)
docs/content-sources.md     Provenance of every factual claim on the site
```

Projects are data, not pages. Adding one means one data file, one folder of
images and one registry line. See
[docs/adding-a-project.md](docs/adding-a-project.md).

## Content rules

Everything factual on the site must trace to the public GitHub repositories
(or material Jad supplies later). Provenance is tracked in
[docs/content-sources.md](docs/content-sources.md). No invented numbers, no
placeholder text, no "coming soon".

Two house rules on style, applied throughout:

- No em dashes or en dashes in visible copy. Use commas, full stops, colons
  or parentheses instead.
- No italics in body copy. Emphasis is `**bold**` only, and the site ships a
  single sans family with monospace reserved for small technical labels.

## Activating the CV

The CV links are already wired into the header, the homepage hero, the About
page and the footer, but nothing renders while the file does not exist, so
there is no route to a 404.

To turn them on:

1. Put the PDF at `public/Jad-El-Badaoui-CV.pdf` (that exact filename).
2. In `src/lib/site.ts`, change `resumeAvailable: false` to
   `resumeAvailable: true`.
3. `npm run build` to confirm, then commit and push. Vercel redeploys.

To take it down again, set `resumeAvailable` back to `false`. To serve the
file under a different name, change `resumeUrl` to match.

## Site configuration

`src/lib/site.ts` is the single source for name, production URL, email,
GitHub, LinkedIn, the CV toggle and education. Nothing else in the codebase
should hard-code those values. `siteUrl` drives canonical URLs, Open Graph
metadata, the sitemap and robots.txt, so it must stay the live domain.

## Deploying

The Vercel project builds from `main` on this repository. Push and it
deploys. The custom domain is configured in the Vercel project under
Settings → Domains.

## QA harnesses

With a production server running (`npm run start`):

```bash
node scripts/qa-screenshots.mjs qa-shots
node scripts/nav-qa.mjs
```

`qa-screenshots.mjs` captures full-page screenshots of every route at 1440 px,
820 px and 390 px, and fails on console errors, failed requests, HTTP ≥ 400 or
horizontal overflow. The `/no-such-page` route logs an expected console 404.

`nav-qa.mjs` drives real client-side navigation between the pages and asserts
that every image both loads and is visible after scrolling to the bottom,
without refreshing. It also covers back/forward, reduced motion and JS
disabled.

Both use the locally installed Chrome via `playwright-core`.
