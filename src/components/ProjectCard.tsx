import Image from "next/image";
import Link from "next/link";
import type { Figure, Project } from "@/lib/projects/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const card: Figure & { objectPosition?: string; fit?: "cover" | "contain" } =
    project.card ?? project.hero;
  const hover = project.cardHover;
  const flipped = index % 2 === 1;

  return (
    <article className="reveal group relative border-t border-line py-10 sm:py-12">
      <div
        className={`grid items-center gap-7 lg:gap-12 ${
          flipped ? "lg:grid-cols-[5fr_7fr]" : "lg:grid-cols-[7fr_5fr]"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-sm border border-line bg-panel ${
            flipped ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={card.src}
            alt={card.alt}
            width={card.width}
            height={card.height}
            sizes="(min-width: 1024px) 620px, calc(100vw - 40px)"
            className={`aspect-[16/9] w-full transition-all duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:transform-none ${
              hover ? "group-hover:opacity-0 group-focus-within:opacity-0" : ""
            } ${card.fit === "contain" ? "object-contain p-6" : "object-cover"}`}
            style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
          />
          {hover && (
            <Image
              src={hover.src}
              alt=""
              aria-hidden
              width={hover.width}
              height={hover.height}
              sizes="(min-width: 1024px) 620px, calc(100vw - 40px)"
              className={`absolute inset-0 aspect-[16/9] w-full opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none ${
                hover.fit === "contain" ? "object-contain p-6" : "object-cover"
              }`}
              style={hover.objectPosition ? { objectPosition: hover.objectPosition } : undefined}
            />
          )}
        </div>

        <div className={flipped ? "lg:order-1" : ""}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            {"  ·  "}
            {project.category}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 hover:text-accent-strong"
            >
              {project.shortTitle ?? project.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-2">{project.summary}</p>

          {project.stats && (
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {project.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dd className="font-mono text-lg font-medium text-ink">{s.value}</dd>
                  <dt className="text-xs text-ink-3">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-6 text-sm font-medium text-accent-strong">
            Read the case study
            <span aria-hidden className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
