/**
 * Data model for project case studies.
 *
 * Each project is a typed object rather than a hard-coded page, so adding a
 * project means adding one data file and its images — see
 * `docs/adding-a-project.md`. The section/block model is deliberately
 * flexible: projects share a template but are not forced into identical
 * structures, because the engineering story differs between them.
 */

export interface Figure {
  /** Path under /public, e.g. "/images/my-project/hero.png". */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel size of the source file (prevents layout shift). */
  width: number;
  height: number;
  /** Render on a white panel with padding (for plots/diagrams on white). */
  plate?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

/** A paragraph of body text. `**bold**` spans are rendered emphasised. */
export type TextBlock = {
  kind: "text";
  body: string[];
};

export type FigureBlock = {
  kind: "figure";
  figure: Figure;
};

export type FigurePairBlock = {
  kind: "figurePair";
  figures: [Figure, Figure];
};

export type StatsBlock = {
  kind: "stats";
  items: Stat[];
};

/** Methodology chain rendered as a labelled flow. */
export type FlowBlock = {
  kind: "flow";
  steps: { title: string; detail?: string }[];
};

export type ListBlock = {
  kind: "list";
  style?: "plain" | "numbered";
  items: string[];
};

export type TableBlock = {
  kind: "table";
  caption?: string;
  head: string[];
  rows: string[][];
};

/** Callout. `caveat` for limitations/honesty notes, `insight` for takeaways. */
export type NoteBlock = {
  kind: "note";
  tone: "caveat" | "insight";
  body: string;
};

export type Block =
  | TextBlock
  | FigureBlock
  | FigurePairBlock
  | StatsBlock
  | FlowBlock
  | ListBlock
  | TableBlock
  | NoteBlock;

export interface Section {
  id: string;
  title: string;
  /** Small mono label above the title, e.g. "Methodology". */
  kicker?: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  title: string;
  /** Optional shorter title for cards and prev/next navigation. */
  shortTitle?: string;
  /** One-line engineering challenge, shown under the title. */
  tagline: string;
  /** 1–2 sentence description used on cards and in metadata. */
  summary: string;
  category: string;
  period: string;
  featured: boolean;
  /** Sort order on the homepage (ascending). */
  order: number;

  hero: Figure;
  /** Card image; defaults to the hero if omitted. */
  card?: Figure & {
    objectPosition?: string;
    /** "contain" letterboxes on white instead of cropping (default "cover"). */
    fit?: "cover" | "contain";
  };
  /** Open Graph image, 1280×640 recommended. Path under /public. */
  ogImage?: string;

  disciplines: string[];
  tools: string[];
  /** Optional role note, for team projects. */
  role?: string;

  githubUrl: string;
  externalLinks?: { label: string; url: string }[];

  /** Headline numbers shown at the top of the case study. */
  stats?: Stat[];

  sections: Section[];
}
