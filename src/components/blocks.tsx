import Image from "next/image";
import type { Block, Figure } from "@/lib/projects/types";
import { formatInline } from "./inline";

/**
 * Renderers for the case-study block model. All server components — the
 * case-study pages ship no client JavaScript beyond the shared reveal hook.
 */

function FigureFrame({
  figure,
  sizes,
  priority = false,
}: {
  figure: Figure;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div
        className={`overflow-hidden rounded-sm border border-line ${
          figure.plate ? "bg-panel p-4 sm:p-6" : "bg-panel"
        }`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {figure.caption && (
        <figcaption className="mt-2.5 border-l-2 border-accent/60 pl-3 font-mono text-xs leading-relaxed text-ink-2">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );
}

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
        <div className="reveal">
          <FigureFrame figure={block.figure} sizes="(min-width: 1152px) 1088px, calc(100vw - 40px)" />
        </div>
      );

    case "figurePair":
      return (
        <div className="reveal grid gap-6 sm:grid-cols-2">
          {block.figures.map((f) => (
            <FigureFrame
              key={f.src}
              figure={f}
              sizes="(min-width: 1152px) 532px, (min-width: 640px) 50vw, calc(100vw - 40px)"
            />
          ))}
        </div>
      );

    case "stats":
      return (
        <dl className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-4">
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
      );

    case "flow":
      return (
        <ol className="reveal grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
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
        <figure className="reveal max-w-2xl">
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
            <figcaption className="mt-2.5 font-mono text-xs text-ink-2">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "note":
      return (
        <aside
          className={`max-w-2xl rounded-sm border-l-2 py-1 pl-5 ${
            block.tone === "caveat" ? "border-ink-3" : "border-accent"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            {block.tone === "caveat" ? "Caveat" : "The point"}
          </p>
          <p className="mt-1.5 leading-relaxed text-ink-2">{formatInline(block.body)}</p>
        </aside>
      );
  }
}
