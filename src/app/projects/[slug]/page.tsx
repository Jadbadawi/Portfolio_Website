import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";
import { BlockRenderer } from "@/components/blocks";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.shortTitle ?? project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.ogImage ? [{ url: project.ogImage, width: 1280, height: 640 }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article>
      {/* ---------------------------------------------------------- header */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <nav aria-label="Breadcrumb">
            <Link
              href="/#work"
              className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-ink"
            >
              ← Selected work
            </Link>
          </nav>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
            <span className="text-accent">{project.category}</span>
            {"  ·  "}
            {project.period}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            {project.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
              >
                Repository on GitHub <span aria-hidden>↗</span>
              </a>
            )}
            {project.externalLinks?.map((link) =>
              // Internal targets get client-side navigation; anything else
              // opens in a new tab.
              link.url.startsWith("/") ? (
                <Link
                  key={link.url}
                  href={link.url}
                  className="rounded-sm border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  {link.label} <span aria-hidden>→</span>
                </Link>
              ) : (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              ),
            )}
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {project.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-line bg-panel px-2.5 py-1 font-mono text-xs text-ink-2"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {project.role && (
            <p className="mt-5 max-w-2xl font-mono text-xs leading-relaxed text-ink-3">
              {project.role}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ------------------------------------------------------------ hero */}
        <figure className="mt-10">
          <div
            className={`overflow-hidden rounded-sm border border-line bg-panel ${
              project.hero.plate ? "p-4 sm:p-8" : ""
            }`}
          >
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              width={project.hero.width}
              height={project.hero.height}
              sizes="(min-width: 1152px) 1088px, calc(100vw - 40px)"
              preload
              className="h-auto w-full"
            />
          </div>
          {project.hero.caption && (
            <figcaption className="mt-2.5 max-w-3xl border-l-2 border-accent/60 pl-3 font-mono text-xs leading-relaxed text-ink-2">
              {project.hero.caption}
            </figcaption>
          )}
        </figure>

        {/* ----------------------------------------------------------- stats */}
        {project.stats && (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-panel p-5">
                <dd className="text-2xl font-semibold tracking-tight text-ink">{s.value}</dd>
                <dt className="mt-1 text-sm text-ink-2">{s.label}</dt>
                {s.detail && (
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink-3">
                    {s.detail}
                  </p>
                )}
              </div>
            ))}
          </dl>
        )}

        {/* ------------------------------------------------------- contents */}
        <nav aria-label="Sections in this case study" className="mt-10 border-y border-line py-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {project.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-mono text-xs text-ink-2 transition-colors hover:text-accent-strong"
                >
                  <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* -------------------------------------------------------- sections */}
        {project.sections.map((section, i) => (
          <section key={section.id} id={section.id} className="scroll-mt-20 py-12 sm:py-14">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                {section.kicker && `  /  ${section.kicker}`}
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-4 h-px w-full bg-line" />
            </Reveal>
            <div className="mt-8 space-y-8">
              {section.blocks.map((block, j) => (
                <BlockRenderer key={j} block={block} />
              ))}
            </div>
          </section>
        ))}

        {/* ------------------------------------------------------ repo link */}
        {project.githubUrl && (
          <div className="border-t border-line py-12">
            <p className="max-w-2xl leading-relaxed text-ink-2">
              The complete write-up lives in the repository: methods, data, code,
              provenance and limitations.
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-sm border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              {project.githubUrl.replace("https://", "")}{" "}
              <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------- prev/next */}
      <nav aria-label="Other projects" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group border-b border-line px-5 py-8 transition-colors hover:bg-panel sm:border-b-0 sm:border-r sm:px-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
              ← Previous project
            </p>
            <p className="mt-2 font-medium text-ink group-hover:text-accent-strong">
              {prev.shortTitle ?? prev.title}
            </p>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group px-5 py-8 text-right transition-colors hover:bg-panel sm:px-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
              Next project →
            </p>
            <p className="mt-2 font-medium text-ink group-hover:text-accent-strong">
              {next.shortTitle ?? next.title}
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
