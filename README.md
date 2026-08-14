# jadelbadaoui — engineering portfolio

Personal portfolio site for **Jad El Badaoui** — aerospace engineering,
CFD, composite structures and computational methods.

Built with **Next.js 16** (App Router, Turbopack), **TypeScript** and
**Tailwind CSS 4**. Fully statically generated — no database, no backend,
no client-side data fetching. The only client JavaScript is a small
progressive-enhancement scroll-reveal that respects
`prefers-reduced-motion` and degrades to a fully visible page without JS.

## Local development

Requires Node.js 20.9+.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build

```bash
npm run build        # static build — must pass with zero errors
npm run start        # serve the production build locally
npx eslint src scripts
```

## Project structure

```
src/lib/site.ts             Site config: contact, education, resume toggle
src/lib/projects/           One data file per project + types + registry
src/lib/capabilities.ts     Homepage capability groups
src/components/             Header, footer, cards, case-study block renderers
src/app/                    Routes: /, /about, /projects/[slug], sitemap, robots
public/images/<slug>/       Curated project imagery
scripts/import-images.mjs   Re-imports imagery from the source repositories
scripts/make-og-home.mjs    Regenerates the homepage Open Graph image
scripts/qa-screenshots.mjs  Screenshot/console/overflow QA harness
docs/adding-a-project.md    How to add a project (start here)
docs/content-sources.md     Provenance of every factual claim on the site
```

Projects are data, not pages: adding one means one data file, one folder of
images and one registry line — see [docs/adding-a-project.md](docs/adding-a-project.md).

## Content rules

Everything factual on the site must trace to the public GitHub repositories
(or material Jad supplies later). Provenance is tracked in
[docs/content-sources.md](docs/content-sources.md). No invented numbers, no
placeholder text, no "coming soon".

## Activating the resume and LinkedIn

Both are pre-wired but hidden until configured in `src/lib/site.ts`:

- Resume: put the PDF at `public/Jad-El-Badaoui-CV.pdf`, set
  `resume: "/Jad-El-Badaoui-CV.pdf"`.
- LinkedIn: set `linkedin` to the full profile URL.

## Deploying to Vercel

1. Push this repository to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repository. The
   defaults are correct (framework: Next.js, build: `next build`). Deploy.
3. Update `url` in `src/lib/site.ts` to the assigned production URL and
   push — this fixes the sitemap, canonical and Open Graph URLs.

### Custom domain later

Vercel project → Settings → Domains → add the domain and follow the DNS
instructions (CNAME to `cname.vercel-dns.com`, or Vercel nameservers).
Then update `url` in `src/lib/site.ts` again.

## QA harness

With a production server running (`npm run start`):

```bash
node scripts/qa-screenshots.mjs qa-shots
```

Captures full-page screenshots of every route at 1440 px and 390 px,
and fails on console errors, failed requests, HTTP ≥ 400 or horizontal
overflow. Uses the locally installed Chrome via `playwright-core`.
