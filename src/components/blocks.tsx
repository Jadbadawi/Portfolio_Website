import Image from "next/image";
import type { Block, Figure } from "@/lib/projects/types";
import Reveal from "./Reveal";
import { formatInline, formatMath } from "./inline";

/**
 * Renderers for the case-study block model. All server components: the
 * case-study pages ship no client JavaScript beyond the per-block reveal
 * wrapper and the lightbox listener.
 *
 * Every figure is wrapped in a button carrying `data-lightbox`, which the
 * Lightbox client component upgrades into a full-resolution overlay.
 */

function FigureFrame({
  figure,
  sizes,
  /** Constrain tall images so portrait photos don't dominate a row. */
  maxHeightClass,
}: {
  figure: Figure;
  sizes: string;
  maxHeightClass?: string;
}) {
  return (
    <figure className="flex h-full flex-col">
      <button
        type="button"
        data-lightbox={figure.src}
        data-lightbox-alt={figure.alt}
        data-lightbox-caption={figure.caption ?? ""}
        aria-label={`Enlarge figure: ${figure.alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-sm border border-line text-left transition-colors hover:border-line-strong ${
          figure.plate ? "bg-panel p-4 sm:p-6" : "bg-panel"
        }`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes={sizes}
          className={`h-auto w-full ${maxHeightClass ?? ""} ${
            maxHeightClass ? "object-contain" : ""
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-ink/75 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          Enlarge
        </span>
      </button>
      {figure.caption && (
        <figcaption className="mt-2.5 border-l-2 border-accent/60 pl-3 font-mono text-xs leading-relaxed text-ink-2">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Small mono label used above comparison figures. */
function CompareLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
      {children}
    </p>
  );
}

const PAIR_SIZES =
  "(min-width: 1152px) 532px, (min-width: 640px) 50vw, calc(100vw - 40px)";
const FULL_SIZES = "(min-width: 1152px) 1088px, calc(100vw - 40px)";
const THIRD_SIZES =
  "(min-width: 1152px) 352px, (min-width: 640px) 33vw, calc(100vw - 40px)";
const QUARTER_SIZES =
  "(min-width: 1152px) 262px, (min-width: 640px) 25vw, calc(50vw - 30px)";

const NOTE_LABEL = {
  caveat: "Caveat",
  insight: "The point",
  provenance: "Provenance",
} as const;

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="max-w-2xl space-y-4">
          {block.body.map((p, i) => (
            <p key={i} className="leading-relaxed text-ink-2">
              {formatInline(p)}
            </p>
          ))}
        </div>
      );

    case "figure":
      return (
        <Reveal>
          <FigureFrame figure={block.figure} sizes={FULL_SIZES} />
        </Reveal>
      );

    case "figurePair":
      return (
        <Reveal className="grid gap-6 sm:grid-cols-2">
          {block.figures.map((f, i) => (
            <div key={f.src}>
              {block.labels && <CompareLabel>{block.labels[i]}</CompareLabel>}
              <FigureFrame figure={f} sizes={PAIR_SIZES} maxHeightClass="max-h-[32rem]" />
            </div>
          ))}
        </Reveal>
      );

    case "figureStrip":
      return (
        <Reveal className="grid gap-5 sm:grid-cols-3">
          {block.figures.map((f) => (
            <FigureFrame
              key={f.src}
              figure={f}
              sizes={THIRD_SIZES}
              maxHeightClass="max-h-80"
            />
          ))}
        </Reveal>
      );

    case "gallery":
      return (
        <Reveal>
          {block.title && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
              {block.title}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {block.figures.map((f) => (
              <FigureFrame
                key={f.src}
                figure={f}
                sizes={QUARTER_SIZES}
                maxHeightClass="max-h-64"
              />
            ))}
          </div>
        </Reveal>
      );

    case "figureAside":
      return (
        <Reveal className="grid items-start gap-7 lg:grid-cols-2 lg:gap-10">
          <div className={block.side === "right" ? "lg:order-2" : ""}>
            <FigureFrame
              figure={block.figure}
              sizes="(min-width: 1024px) 532px, calc(100vw - 40px)"
              maxHeightClass="max-h-[30rem]"
            />
          </div>
          <div className={`space-y-4 ${block.side === "right" ? "lg:order-1" : ""}`}>
            {block.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-2">
                {formatInline(p)}
              </p>
            ))}
          </div>
        </Reveal>
      );

    case "stats":
      return (
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-4">
            {block.items.map((s) => (
              <div key={s.label} className="bg-panel p-5">
                <dd className="text-2xl font-semibold tracking-tight text-ink">{s.value}</dd>
                <dt className="mt-1 text-sm text-ink-2">{s.label}</dt>
                {s.detail && (
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink-3">{s.detail}</p>
                )}
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "flow":
      return (
        <Reveal>
          <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {block.steps.map((step, i) => (
              <li key={step.title} className="bg-panel p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-medium text-ink">{step.title}</h4>
                </div>
                {step.detail && (
                  <p className="mt-1.5 pl-8 text-sm leading-relaxed text-ink-2">{step.detail}</p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      );

    case "specGrid":
      return (
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.title} className="bg-panel p-6">
                <dt className="flex items-baseline gap-3 font-medium text-ink">
                  <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-accent" />
                  {item.title}
                </dt>
                <dd className="mt-2 pl-7 text-sm leading-relaxed text-ink-2">
                  {formatInline(item.body)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "list":
      return (
        <ul className="max-w-2xl space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-2">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <Reveal>
          <figure className="max-w-2xl">
            <div className="overflow-x-auto rounded-sm border border-line">
              <table className="w-full border-collapse bg-panel text-sm">
                <thead>
                  <tr className="border-b border-line-strong">
                    {block.head.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-2.5 text-left font-mono text-xs font-medium uppercase tracking-wider text-ink-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} className="border-b border-line last:border-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-2 ${j === row.length - 1 ? "font-mono text-ink" : "text-ink-2"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {block.caption && (
              <figcaption className="mt-2.5 font-mono text-xs text-ink-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );

    case "note":
      return (
        <aside
          className={`max-w-2xl rounded-sm border-l-2 py-1 pl-5 ${
            block.tone === "insight" ? "border-accent" : "border-ink-3"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            {NOTE_LABEL[block.tone]}
          </p>
          <p className="mt-1.5 leading-relaxed text-ink-2">{formatInline(block.body)}</p>
        </aside>
      );

    case "pipeline":
      return (
        <Reveal>
          <ol className="relative max-w-3xl">
            {block.steps.map((step, i) => {
              const last = i === block.steps.length - 1;
              return (
                <li key={step.title} className="relative pl-9 sm:pl-11">
                  {/* Connector: a rail down the left, stopping at the last node. */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute left-[9px] top-3 h-full w-px bg-line-strong sm:left-[11px]"
                    />
                  )}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1.5 grid h-[19px] w-[19px] place-items-center rounded-sm border font-mono text-[10px] sm:h-[23px] sm:w-[23px] ${
                      last
                        ? "border-accent bg-accent text-paper"
                        : "border-line-strong bg-panel text-ink-3"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pb-6 last:pb-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="font-medium text-ink">{step.title}</h4>
                      {step.tag && (
                        <span className="rounded-sm border border-line bg-panel px-2 py-0.5 font-mono text-[11px] text-ink-3">
                          {step.tag}
                        </span>
                      )}
                    </div>
                    {step.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">
                        {formatInline(step.detail)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      );

    case "params":
      return (
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {block.groups.map((group) => (
              <div key={group.title} className="bg-panel p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  {group.title}
                </p>
                <dl className="mt-4">
                  {group.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-0"
                    >
                      <dt className="text-sm text-ink-2">{formatMath(label)}</dt>
                      <dd className="shrink-0 text-right font-mono text-sm text-ink">
                        {formatMath(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>
      );

    case "equation":
      return (
        <Reveal className="max-w-2xl space-y-4">
          {block.items.map((item) => (
            <figure key={item.expr} className="rounded-sm border border-line bg-panel">
              <p className="overflow-x-auto px-5 py-4 text-center font-mono text-base text-ink sm:text-lg">
                {formatMath(item.expr)}
              </p>
              {item.meaning && (
                <figcaption className="border-t border-line px-5 py-3 text-sm leading-relaxed text-ink-2">
                  {formatInline(item.meaning)}
                </figcaption>
              )}
            </figure>
          ))}
        </Reveal>
      );

    case "keyResult":
      return (
        <Reveal>
          <figure>
            <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
              {block.items.map((item) => (
                <div
                  key={item.label}
                  className={`p-6 ${item.emphasis ? "bg-accent-soft" : "bg-panel"}`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                    {item.label}
                  </dt>
                  <dd
                    className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${
                      item.emphasis ? "text-accent-strong" : "text-ink"
                    }`}
                  >
                    {formatMath(item.value)}
                  </dd>
                  {item.note && (
                    <p className="mt-2 font-mono text-xs leading-relaxed text-ink-3">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </dl>
            {block.caption && (
              <figcaption className="mt-2.5 max-w-2xl border-l-2 border-accent/60 pl-3 font-mono text-xs leading-relaxed text-ink-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );

    case "vv":
      return (
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-line">
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {(
                [
                  ["Verification", block.verification],
                  ["Validation", block.validation],
                ] as const
              ).map(([title, side]) => (
                <div key={title} className="bg-panel p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {title}
                  </p>
                  <p className="mt-2 font-medium leading-snug text-ink">{side.question}</p>
                  <ul className="mt-4 space-y-2">
                    {side.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                        <span>{formatInline(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="border-t border-line bg-panel px-6 py-5 leading-relaxed text-ink-2">
              {formatInline(block.verdict)}
            </p>
          </div>
        </Reveal>
      );
  }
}
