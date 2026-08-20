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
src/lib/site.ts             Site config: URLs, contact, education, CV list
src/lib/projects/           One data file per project + types + registry
src/lib/capabilities.ts     Homepage capability groups
src/components/             Header, footer, cards, case-study block renderers
src/app/                    Routes: /, /about, /projects/[slug], sitemap, robots
public/images/<slug>/       Curated project imagery
scripts/import-images.mjs   Re-imports imagery from the source repositories
scripts/make-og-home.mjs    Regenerates the homepage Open Graph image
scripts/make-og-projects.mjs Regenerates the two ANSYS case-study OG images
scripts/make-turbine-plots.mjs Replots the turbine convergence history from raw solver data
scripts/data/               Raw solver output a plot script reads
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
- No italics in body copy. Emphasis is `**bold**` only.

## Design

Warm and editorial: bone paper, near-black ink with a brown cast, and one
deep oxblood accent used sparingly for rules, links and markers. It should
read like a research publication rather than a product page.

Three typefaces, each with one job, all loaded in `src/app/layout.tsx`:

| Face | Used for |
|---|---|
| Newsreader | Headings, applied to `h1`/`h2`/`h3` in `globals.css` so components don't opt in |
| Inter | Body copy |
| IBM Plex Mono | "Instrument" text only: section indices, figure captions, data labels, equations |

Do not add a fourth family, and do not go back to Geist Sans or Geist Mono.
They are the Next.js starter defaults, and a site wearing them looks like a
template nobody chose, which is exactly the feedback that prompted this
palette and type system.

Colours live as CSS custom properties in `src/app/globals.css` and are
exposed to Tailwind through `@theme inline`, so no component hard-codes a
colour. Change a token there and the whole site follows.

## CVs

There are two, because the same work points at two different graduate
disciplines and a CV written to cover both covers neither well:

| Version | File |
|---|---|
| Structures | `public/Jad-El-Badaoui-CV-Structures.pdf` |
| Flight Physics | `public/Jad-El-Badaoui-CV-Flight-Physics.pdf` |

Both are listed in `resumes` in `src/lib/site.ts`. That list drives the CV
section on the homepage and the links on the About page. The header, hero
and footer carry one "CV" link pointing at the section rather than at a
single file.

To replace one, overwrite the PDF. To add a third, drop it in `public/` and
add an entry with its `label`, `url`, `summary` and `focus`. To take them all
down, empty the list: nothing renders while it is empty, so there is never a
link to a missing file.

## Site configuration

`src/lib/site.ts` is the single source for name, production URL, email,
GitHub, LinkedIn, the CV list and education. Nothing else in the codebase
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
