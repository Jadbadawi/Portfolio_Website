import type { Metadata } from "next";
import Link from "next/link";
import { resumes, site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jad El Badaoui, an aerospace engineer working across CFD, fluid-structure interaction, composite structures and computational methods.",
  alternates: { canonical: "/about" },
};

const profileLinkClass =
  "inline-flex items-center gap-2 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16">
      <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:gap-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            About
          </p>
          <h1 className="mt-4 text-[34px] leading-[1.15] text-ink sm:text-[44px]">
            Simulation, structures and experiment
          </h1>

          <div className="mt-8 space-y-5 leading-relaxed text-ink-2">
            <p>
              I&apos;m an aerospace engineer from the University of Bristol,
              heading to Imperial College London for an MSc in Advanced
              Computational Methods for Aeronautics, Flow Management and
              Fluid-Structure Interaction. My work sits between simulation,
              structures and experiment, with CFD and FEA on one side and
              manufacturing and physical testing on the other.
            </p>
            <p>
              I treat a result as provisional until it has been checked against
              something independent. In practice that means separating
              verification from validation and doing both explicitly, checking
              solver output against hand calculations wherever a closed-form
              check exists, and saying plainly what a model cannot tell you. My
              CFD repository reports its turbine power coefficient as
              unconverged, because it is. The most useful finding in my UAV
              project is a failure the analysis never predicted, and it is
              written up rather than left out.
            </p>
            <p>
              The same applies to how the work is packaged. Each repository
              carries provenance for its data, automated tests that assert the
              physical properties the analysis depends on (a symmetric laminate
              really does produce a zero B matrix), and licences that credit
              collaborators&apos; contributions explicitly.
            </p>
            <p>
              Alongside the projects on this site, I&apos;m writing my own
              finite-volume solver for the NACA 0012, the same case I validated
              against NASA measurements in ANSYS. Mesh handling, discretisation
              of the governing equations, boundary conditions and time
              integration: the parts a commercial solver keeps out of sight are
              the parts I want to have implemented and checked myself. I also
              work on FPGA-oriented performance engineering, optimising
              clustering algorithms in C++ with SYCL/DPC++ and Alpaka.
            </p>
            <p>
              I&apos;m interested in aerospace, propulsion, CFD, simulation and
              numerical methods, and in roles where the question of why a
              number should be believed is taken seriously.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
            >
              View projects
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Email me
            </a>
            {/* One per CV; nothing renders while the list is empty. */}
            {resumes.map((cv) => (
              <a
                key={cv.url}
                href={cv.url}
                className="rounded-sm border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                CV: {cv.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:pt-24">
          <div className="rounded-sm border border-line bg-panel">
            {site.education.map((e) => (
              <div key={e.degree} className="border-b border-line px-5 py-4 last:border-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  {e.period || "Education"}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-ink">{e.degree}</p>
                <p className="mt-0.5 text-sm text-ink-2">{e.institution}</p>
              </div>
            ))}
          </div>
          <div className="rounded-sm border border-line bg-panel px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
              Toolset
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              ANSYS Fluent · CFX · Mechanical · Abaqus · MATLAB · Python · C++ ·
              SYCL · Autodesk Inventor · XFoil
            </p>
          </div>
          <div className="rounded-sm border border-line bg-panel px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
              Elsewhere
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileLinkClass}
                >
                  <GitHubIcon className="h-4 w-4 shrink-0" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileLinkClass}
                >
                  <LinkedInIcon className="h-4 w-4 shrink-0" />
                  LinkedIn
                </a>
              </li>
              {resumes.map((cv) => (
                <li key={cv.url}>
                  <a href={cv.url} className={profileLinkClass}>
                    CV: {cv.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
