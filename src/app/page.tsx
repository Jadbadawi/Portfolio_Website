import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { capabilities } from "@/lib/capabilities";
import { site } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";

function SectionHeading({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
        <span className="text-accent">{index}</span>
        {"  /  "}
        {title}
      </p>
      <div className="mt-3 h-px w-full bg-line" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="technical-grid absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
          <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                Aerospace · CFD · Structures · Computational methods
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Jad El Badaoui
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
                Aerospace engineer working across CFD, fluid–structure
                interaction, composite structures and high-performance
                computing.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-2">
                The thread through my work is whether a result is{" "}
                <em>trustworthy</em>, not just whether it converged — separating
                verification from validation, checking numbers against hand
                calculations, and stating plainly what a model cannot tell you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#work"
                  className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
                >
                  View projects
                </Link>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
                {site.resume && (
                  <a
                    href={site.resume}
                    className="rounded-sm border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                  >
                    Resume (PDF)
                  </a>
                )}
              </div>
            </div>

            {/* spec panel */}
            <aside className="hidden self-center lg:block">
              <dl className="space-y-0 rounded-sm border border-line bg-panel/80 backdrop-blur-sm">
                {[
                  ["Education", "BEng Aerospace Engineering, University of Bristol"],
                  ["Incoming", "MSc Advanced Computational Methods, Imperial College London"],
                  ["Toolset", "ANSYS Fluent · Abaqus · MATLAB · Python · C++ · SYCL"],
                  ["Focus", "Simulation you can defend: V&V, hand-checks, stated limitations"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="border-b border-line px-5 py-4 last:border-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                      {dt}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ work */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <SectionHeading index="01" title="Selected engineering work" id="work" />
        <div className="mt-2">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- approach */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHeading index="02" title="Engineering profile" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="reveal">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Simulation you can defend
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Each of my projects combines at least two of: analytical theory,
              numerical simulation, physical manufacture and experiment. The
              interesting engineering happens where they disagree — an XFoil
              polar against a wind-tunnel run, a laminate theory prediction
              against a tensile test, a CFD reaction force against a hand
              calculation.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Every repository documents its own methods, verification,
              limitations and data provenance — including the results that were
              inconclusive and the failure mode nobody predicted.
            </p>
          </div>
          <div className="reveal grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {capabilities.map((group) => (
              <div key={group.title} className="bg-panel p-6">
                <h3 className="font-medium text-ink">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- education */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <SectionHeading index="03" title="Education & current work" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal space-y-8">
            {site.education.map((e) => (
              <div key={e.degree} className="flex gap-5">
                <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-accent" />
                <div>
                  <h3 className="font-medium leading-snug text-ink">{e.degree}</h3>
                  <p className="mt-1 font-mono text-sm text-ink-3">
                    {e.institution}
                    {e.period && ` · ${e.period}`}
                  </p>
                  {e.note && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.note}</p>
                  )}
                </div>
              </div>
            ))}
            {site.experience.map((x) => (
              <div key={x.title} className="flex gap-5">
                <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-accent" />
                <div>
                  <h3 className="font-medium leading-snug text-ink">{x.title}</h3>
                  <p className="mt-1 font-mono text-sm text-ink-3">
                    {x.organisation} · {x.period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{x.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <div className="rounded-sm border border-line bg-panel p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                In progress
              </p>
              <h3 className="mt-2 font-medium text-ink">{site.inProgress.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {site.inProgress.summary}
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-2">
              More about how I work — and what each project taught me — on the{" "}
              <Link
                href="/about"
                className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
              >
                about page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
