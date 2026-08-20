import Image from "next/image";
import Link from "next/link";
import type { Figure, Project } from "@/lib/projects/types";
import Reveal from "./Reveal";

/**
 * One project, rendered as a row of an index rather than as a card.
 *
 * The card grid this replaced (image one side, text the other, alternating
 * every row) is the default portfolio layout and reads as one. An index
 * reads like the contents page of a report: the title carries the row, the
 * imagery is supporting evidence in the margin, and the whole list can be
 * scanned in one pass instead of scrolled through a card at a time.
 *
 * There is exactly one image element per row, placed in the metadata column
 * by the grid and stacking under the prose when the grid collapses. An
 * earlier version rendered two, one for each breakpoint, which meant that
 * whichever copy was `display: none` never satisfied its lazy load and sat
 * permanently incomplete. Keep it to one.
 */
export default function ProjectIndexRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const card: Figure & { objectPosition?: string; fit?: "cover" | "contain" } =
    project.card ?? project.hero;

  return (
    <Reveal>
      <article className="group border-t border-line">
        <Link href={`/projects/${project.slug}`} className="block py-8 sm:py-10">
          {/*
            The metadata column is a fixed width rather than `auto`, so every
            row's title measure is identical no matter how long a given
            project's period string is.
          */}
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[2.5rem_1fr_19rem] lg:items-start xl:grid-cols-[2.5rem_1fr_23rem]">
            <span
              aria-hidden
              className="font-mono text-sm text-ink-3 transition-colors group-hover:text-accent lg:pt-2"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="max-w-2xl">
              <h3 className="text-[26px] leading-[1.15] text-ink transition-colors group-hover:text-accent-strong sm:text-[32px]">
                {project.shortTitle ?? project.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">{project.summary}</p>

              {project.stats && (
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {project.stats.slice(0, 3).map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline gap-2 whitespace-nowrap"
                    >
                      <dd className="font-mono text-sm text-ink">{s.value}</dd>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                        {s.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="lg:pt-2">
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-3 lg:text-right">
                {project.category}
                <span className="mt-1 block text-ink-3/80">{project.period}</span>
              </p>
              <div className="mt-5 overflow-hidden border border-line">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  sizes="(min-width: 1280px) 368px, (min-width: 1024px) 304px, calc(100vw - 40px)"
                  loading={index === 0 ? "eager" : undefined}
                  className={`aspect-[16/9] w-full bg-panel opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none ${
                    card.fit === "contain" ? "object-contain p-3" : "object-cover"
                  }`}
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                />
              </div>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
