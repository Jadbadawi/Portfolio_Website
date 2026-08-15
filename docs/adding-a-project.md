# Adding a project

Adding a project never requires touching the layout, components or design.
It takes one data file, a folder of images, and one line in the registry.

## 1. Add the images

Create `public/images/<slug>/` and put the project's images there.

- **Formats**: PNG for plots, diagrams and CAD renders (keeps line work
  crisp); JPEG (quality ~85) for photographs.
- **Sizes**: aim for 1200 to 2000 px wide for full-width figures, and keep
  files under ~500 KB. Next.js optimises them at serve time, but the source
  size is what gets committed.
- **Card/hero**: cards display at 16:9. Any aspect ratio works, so set
  `objectPosition` to control the crop, or `fit: "contain"` for very wide
  images (the UAV render uses this). Give `card` and `hero` **different**
  images, and don't repeat the hero inside the page body.
- **`cardHover`** (optional): a second image cross-faded in on hover/focus
  of the homepage card. Decorative, so it gets an empty alt.

Every figure is automatically clickable into a full-resolution lightbox, so
never crop a plot, graph or contour to make it fit; show the whole figure.
- **Open Graph**: a 1280×640 image named `og.png` if you have one.

If you're importing from a source repository, add entries to
`scripts/import-images.mjs` and run `node scripts/import-images.mjs`. It
resizes, re-encodes and prints the final pixel dimensions you'll need below.

## 2. Create the data file

Create `src/lib/projects/<slug>.ts`. Copy the shape of an existing project
(e.g. `aerospace-cfd-fsi.ts`). The full type is documented in
`src/lib/projects/types.ts`. The essentials:

```ts
import type { Project } from "./types";

const img = (file: string) => `/images/my-new-project/${file}`;

export const myNewProject: Project = {
  slug: "my-new-project",        // becomes /projects/my-new-project
  title: "My New Project",
  tagline: "One-line engineering challenge.",
  summary: "One or two sentences for the homepage card and search results.",
  category: "CFD · Machine learning",
  period: "2026/27",
  featured: true,                 // show on the homepage
  order: 4,                       // homepage position (ascending)
  hero: { src: img("hero.png"), alt: "…", width: 1600, height: 900 },
  disciplines: ["…"],
  tools: ["…"],
  githubUrl: "https://github.com/Jadbadawi/my-new-project",
  stats: [ /* optional headline numbers */ ],
  sections: [ /* the case study */ ],
};
```

Every `width`/`height` must be the image's real pixel size (prevents layout
shift). Optional fields (`card`, `ogImage`, `role`, `stats`,
`externalLinks`, `shortTitle`) can simply be omitted.

### Content blocks

Sections are built from typed blocks, mixed freely, and projects don't have to
share a structure:

| Block | Use for |
|---|---|
| `text` | Paragraphs. `**bold**` and `` `code` `` supported. There is no italic span: body copy is upright everywhere. |
| `figure` / `figurePair` | Images with mono captions. `plate: true` puts white padding behind plots/diagrams. Add `labels: ["Prediction", "Experiment"]` to a pair to head each side. |
| `figureStrip` | Exactly three figures across: process steps, sequences, damage views. |
| `gallery` | Compact grid (2 cols mobile, 4 desktop) for supporting evidence. Optional `title`. |
| `figureAside` | One figure beside prose; `side: "left" \| "right"`. |
| `stats` | A row of headline numbers. |
| `flow` | A numbered methodology chain (problem → model → test → …). |
| `specGrid` | Two-column grid of short technical explanations, for setup detail that would otherwise be drawn as a labelled schematic. |
| `list` | Bulleted items (used for limitations). |
| `table` | Small data tables (e.g. reserve factors). |
| `note` | Callouts. `tone: "caveat"` for limitations, `"insight"` for takeaways. |

## 3. Register it

In `src/lib/projects/index.ts`, import the file and add it to the
`projects` array. That is all: the homepage card, case-study page, prev/next
navigation, sitemap and metadata all follow from the data.

To remove a project from the homepage without deleting its page, set
`featured: false`.

## 4. Preview and check

```bash
npm run dev        # http://localhost:3000
npm run build      # must pass before deploying
```

Optionally run the QA harness against a production build
(`npm run start` in one terminal, then):

```bash
node scripts/qa-screenshots.mjs qa-shots
```

It screenshots every page at desktop and mobile widths and fails on console
errors, broken requests or horizontal overflow. Add the new page to the
`pages` list in that script.

## 5. Keep provenance

Add a section to `docs/content-sources.md` recording where each factual
claim and image came from. That file is the reason the site can be trusted:
don't let it rot.

## Activating the CV

In `src/lib/site.ts`, drop the PDF at `public/Jad-El-Badaoui-CV.pdf` and set
`resumeAvailable: true`. The header, hero, About and footer links then appear
automatically. Until then they are not rendered at all, so there is no link
to a missing file. See the README for the full procedure.

LinkedIn and GitHub are already configured in the same file.
