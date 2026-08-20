/**
 * Data model for project case studies.
 *
 * Each project is a typed object rather than a hard-coded page, so adding a
 * project means adding one data file and its images. See
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
  /** Labels rendered above each figure, e.g. ["Prediction", "Experiment"]. */
  labels?: [string, string];
};

/** Three figures across: process steps, sequences, damage views. */
export type FigureStripBlock = {
  kind: "figureStrip";
  figures: [Figure, Figure, Figure];
};

/** Compact grid for supporting evidence; 2 cols mobile, 4 desktop. */
export type GalleryBlock = {
  kind: "gallery";
  title?: string;
  figures: Figure[];
};

/** Figure beside prose. `side` sets which edge the image sits on. */
export type FigureAsideBlock = {
  kind: "figureAside";
  figure: Figure;
  side: "left" | "right";
  body: string[];
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

/**
 * Two-column grid of short technical explanations, rendered as panels.
 *
 * Used where the alternative would be a drawn schematic with callout labels.
 * The text carries the same information, stays selectable and searchable,
 * and reflows on a phone instead of shrinking to nothing.
 */
export type SpecGridBlock = {
  kind: "specGrid";
  items: { title: string; body: string }[];
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

/**
 * Callout. `caveat` for limitations/honesty notes, `insight` for takeaways,
 * `provenance` for stating where work came from and which part is the
 * author's own.
 */
export type NoteBlock = {
  kind: "note";
  tone: "caveat" | "insight" | "provenance";
  body: string;
};

/**
 * Directed chain of workflow stages, drawn as a vertical rail.
 *
 * Distinct from `flow`, which is an unordered grid of method steps: a
 * pipeline says that the output of each stage is the input to the next, so
 * it is drawn with connectors and reads top to bottom at every width.
 * `tag` carries the tool or the quantity handed on, e.g. "ANSYS Fluent".
 */
export type PipelineBlock = {
  kind: "pipeline";
  steps: { title: string; detail?: string; tag?: string }[];
};

/**
 * Side-by-side groups of parameter/value rows.
 *
 * For the small set of numbers a reader needs to judge the model, kept out
 * of prose so the page stays scannable. Not a place for every material
 * constant.
 */
export type ParamsBlock = {
  kind: "params";
  groups: { title: string; rows: [string, string][] }[];
};

/**
 * Display equations with a plain-language reading underneath.
 *
 * `expr` supports `_{...}` and `^{...}` for subscripts and superscripts;
 * everything else is literal, so Unicode (Ω, ω, ×, ∞) is written directly.
 */
export type EquationBlock = {
  kind: "equation";
  items: { expr: string; meaning?: string }[];
};

/**
 * Headline comparison of numbers obtained independently of each other, for
 * a verification check whose whole point is that two routes agree.
 */
export type KeyResultBlock = {
  kind: "keyResult";
  items: { label: string; value: string; note?: string; emphasis?: boolean }[];
  caption?: string;
};

/** The verification/validation contrast, stated for one specific model. */
export type VVBlock = {
  kind: "vv";
  verification: { question: string; items: string[] };
  validation: { question: string; items: string[] };
  /** Where this project actually stands, rendered across the foot of the box. */
  verdict: string;
};

export type Block =
  | TextBlock
  | FigureBlock
  | FigurePairBlock
  | FigureStripBlock
  | GalleryBlock
  | FigureAsideBlock
  | StatsBlock
  | FlowBlock
  | SpecGridBlock
  | ListBlock
  | TableBlock
  | NoteBlock
  | PipelineBlock
  | ParamsBlock
  | EquationBlock
  | KeyResultBlock
  | VVBlock;

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
  /** One or two sentence description used on cards and in metadata. */
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
  /** Second card image, cross-faded in on hover/focus. Purely decorative. */
  cardHover?: Figure & { objectPosition?: string; fit?: "cover" | "contain" };
  /** Open Graph image, 1280×640 recommended. Path under /public. */
  ogImage?: string;

  disciplines: string[];
  tools: string[];
  /** Optional role note, for team projects. */
  role?: string;

  /**
   * Repository URL. Optional: team projects done outside a public repo (e.g.
   * competition work owned by the society) have no repository to link, and
   * inventing one would misrepresent where the work lives.
   */
  githubUrl?: string;
  externalLinks?: { label: string; url: string }[];

  /** Headline numbers shown at the top of the case study. */
  stats?: Stat[];

  sections: Section[];
}
