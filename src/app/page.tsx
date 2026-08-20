import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { capabilities } from "@/lib/capabilities";
import { hasResumes, resumeSectionHref, resumes, site } from "@/lib/site";
import ProjectIndexRow from "@/components/ProjectIndexRow";
import Reveal from "@/components/Reveal";

/**
 * Section heading, set in the left margin.
 *
 * The previous treatment was a centred "01 / SECTION TITLE" mono kicker over
 * a hairline rule. It is the single most recognisable section header on
 * generated portfolio sites. Here the label sits out in the margin beside
 * its content, the way a marginal note sits beside a paragraph in a printed
 * report, and the content column starts where the text starts.
 */
function Section({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[160px_1fr] lg:gap-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 lg:pt-2">
          {label}
        </p>
        <div>{children}</div>
      </div>
    </section>
  );
}

const shell = "mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 xl:px-16";

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="technical-grid absolute inset-0" />
        <div className={`relative ${shell} pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pt-32`}>
          <h1 className="max-w-3xl text-[38px] leading-[1.08] text-ink sm:text-[56px] lg:text-[64px]">
            Simulation you can
            <br />
            argue with.
          </h1>

          <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-[1fr_1fr] sm:gap-10">
            <p className="leading-relaxed text-ink-2">
              Aerospace engineer working across CFD, fluid-structure
              interaction, composite structures and high-performance
              computing.
            </p>
            <p className="leading-relaxed text-ink-2">
              Most of what I do is about whether a result holds up once it is
              checked, not just whether it converged: separating verification
              from validation, comparing solver output against hand
              calculations, and stating what a model cannot tell you.
            </p>
          </div>

          {/* Metadata as a hairline table rather than a bordered panel. */}
          <dl className="mt-14 max-w-3xl border-t border-line">
            {[
              ["Education", "BEng Aerospace Engineering, University of Bristol"],
              [
                "Incoming",
                "MSc Advanced Computational Methods, Imperial College London",
              ],
              ["Toolset", "ANSYS Fluent · Abaqus · MATLAB · Python · C++ · SYCL"],
            ].map(([dt, dd]) => (
              <div
                key={dt}
                className="grid gap-1 border-b border-line py-3 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 sm:pt-1">
                  {dt}
                </dt>
                <dd className="text-sm leading-relaxed text-ink">{dd}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/#work"
              className="border-b border-accent pb-0.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              View projects
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent pb-0.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
            >
              GitHub <span aria-hidden>↗</span>
            </a>
            {hasResumes && (
              <Link
                href={resumeSectionHref}
                className="border-b border-transparent pb-0.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
              >
                CV
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className={shell}>
        {/* ---------------------------------------------------------- work */}
        <section id="work" className="scroll-mt-16 border-t border-line pt-14 sm:pt-20">
          <div className="grid gap-8 lg:grid-cols-[160px_1fr] lg:gap-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 lg:pt-2">
              Selected work
            </p>
            <p className="max-w-xl leading-relaxed text-ink-2">
              Five projects, each combining at least two of analytical theory,
              numerical simulation, physical manufacture and experiment. The
              useful engineering tends to appear where they disagree.
            </p>
          </div>
          <div className="mt-10">
            {featuredProjects.map((p, i) => (
              <ProjectIndexRow key={p.slug} project={p} index={i} />
            ))}
            <div className="border-t border-line" />
          </div>
        </section>

        {/* ------------------------------------------------------- profile */}
        <Section label="Engineering profile">
          <h2 className="max-w-xl text-[26px] leading-[1.2] text-ink sm:text-[32px]">
            How the projects are put together
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-2">
            Every repository documents its own methods, verification,
            limitations and data provenance, including the results that were
            inconclusive and the failure mode nobody predicted.
          </p>
          <Reveal className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {capabilities.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-line pb-2 text-[15px] font-medium text-ink">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-2"
                    >
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* ----------------------------------------------------- education */}
        <Section label="Education & current work">
          <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-7">
              {site.education.map((e) => (
                <div key={e.degree}>
                  <h3 className="text-[19px] leading-snug text-ink">{e.degree}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
                    {e.institution}
                    {e.period && ` · ${e.period}`}
                  </p>
                  {e.note && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.note}</p>
                  )}
                </div>
              ))}
              {site.experience.map((x) => (
                <div key={x.title}>
                  <h3 className="text-[19px] leading-snug text-ink">{x.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
                    {x.organisation} · {x.period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{x.summary}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="border-l-2 border-accent pl-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  In progress
                </p>
                <h3 className="mt-2 text-[19px] leading-snug text-ink">
                  {site.inProgress.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {site.inProgress.summary}
                </p>
              </div>
              <p className="mt-7 text-sm leading-relaxed text-ink-2">
                More on how I work, and what each project taught me, on the{" "}
                <Link
                  href="/about"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  about page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------------ cv */}
        {hasResumes && (
          <Section label="CV" id="cv">
            <h2 className="max-w-xl text-[26px] leading-[1.2] text-ink sm:text-[32px]">
              Two versions, same work
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-2">
              The projects on this site point at two different graduate
              disciplines, and a CV written to cover both covers neither well.
              Each version leads with the work that matters to the reader it is
              written for. The evidence behind them is the same, and it is all
              on this site.
            </p>
            <Reveal className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {resumes.map((cv) => (
                <a key={cv.url} href={cv.url} className="group block">
                  <h3 className="border-b border-line pb-2 text-[21px] text-ink transition-colors group-hover:border-accent group-hover:text-accent-strong">
                    {cv.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    {cv.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {cv.focus.map((f) => (
                      <li
                        key={f}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-2"
                      >
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-strong">
                    Open PDF
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </p>
                </a>
              ))}
            </Reveal>
          </Section>
        )}
      </div>
    </>
  );
}
