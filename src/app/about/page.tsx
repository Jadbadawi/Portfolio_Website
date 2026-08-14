import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jad El Badaoui — aerospace engineer working across CFD, fluid–structure interaction, composite structures and computational methods.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:gap-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
            About
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Engineering that survives being checked
          </h1>

          <div className="mt-8 space-y-5 leading-relaxed text-ink-2">
            <p>
              I&apos;m an aerospace engineer from the University of Bristol,
              heading to Imperial College London for an MSc in Advanced
              Computational Methods for Aeronautics, Flow Management and
              Fluid–Structure Interaction. My work sits at the intersection of
              simulation, structures and experiment — CFD and FEA on one side,
              manufacturing and physical testing on the other.
            </p>
            <p>
              What I care about most is whether a result is <em>trustworthy</em>,
              not just whether it converged. In practice that means separating
              verification from validation and doing both explicitly; checking
              solver output against hand calculations wherever a closed-form
              check exists; and stating plainly what a model cannot tell you.
              My CFD repository reports its turbine power coefficient as
              unconverged, because it is. My UAV project&apos;s most valuable
              finding is a failure the analysis never predicted — written up
              rather than hidden.
            </p>
            <p>
              The same instinct extends to how the work is packaged. Each
              repository carries provenance for its data, automated tests that
              assert the physical properties the analysis depends on — a
              symmetric laminate really does produce a zero B matrix — and
              licences that credit collaborators&apos; contributions explicitly.
              Reproducibility is an engineering deliverable, not an
              afterthought.
            </p>
            <p>
              Beyond the projects on this site, I&apos;m currently working on
              FPGA-oriented performance engineering: optimising clustering
              algorithms in C++ with SYCL/DPC++ and Alpaka, working through
              loop-carried dependencies, irregular memory access and on-chip
              memory trade-offs.
            </p>
            <p>
              I&apos;m interested in aerospace, propulsion, CFD, simulation and
              numerical methods — and in roles where the question &ldquo;why
              should I believe this number?&rdquo; is taken seriously.
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
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  github.com/Jadbadawi
                </a>
              </li>
              {site.linkedin && (
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
