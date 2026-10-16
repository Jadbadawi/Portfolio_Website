import Image from "next/image";
import Link from "next/link";
import { DM_Mono, Schibsted_Grotesk } from "next/font/google";
import { featuredProjects } from "@/lib/projects";
import { capabilities } from "@/lib/capabilities";
import { hasResumes, resumes, site } from "@/lib/site";
import FlowHero from "@/components/home/FlowHero";
import ProjectGrid, { type CardProject } from "@/components/home/ProjectGrid";
import { CapGroup, HomeNav } from "@/components/home/HomeClient";
import Reveal from "@/components/Reveal";
import s from "./home.module.css";

/*
 * The homepage's own type pair, loaded here rather than in the root layout
 * so no other route downloads or preloads them. The case studies keep
 * Newsreader, Inter and IBM Plex Mono.
 */
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

/**
 * The count in the "Selected work" intro, written as a word to match the
 * surrounding prose. Derived rather than hard-coded, because a literal here
 * silently becomes wrong the next time a project is added.
 */
const COUNT_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const projectCountWord = COUNT_WORDS[featuredProjects.length] ?? String(featuredProjects.length);

const facts: [string, string][] = [
  ["Education", "BEng Aerospace Engineering, University of Bristol"],
  ["Incoming", "MSc Advanced Computational Methods, Imperial College London"],
  ["Toolset", "ANSYS Fluent · Abaqus · MATLAB · Python · C++ · SYCL"],
];

/** Only what the cards render crosses to the client, not whole case studies. */
const cards: CardProject[] = featuredProjects.map((p) => ({
  slug: p.slug,
  title: p.title,
  shortTitle: p.shortTitle,
  summary: p.summary,
  category: p.category,
  period: p.period,
  tools: p.tools,
  stats: p.stats,
  hero: p.hero,
  card: p.card,
  homeFeature: p.homeFeature,
}));

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <div className={`${schibsted.variable} ${dmMono.variable} ${s.home}`}>
      <HomeNav />
      <main id="main">
        <FlowHero>
          <p className={s.mono} style={{ color: "#7af0e0", marginBottom: 18 }}>
            {site.role}
          </p>
          <h1>
            Simulation you can <span>argue with.</span>
          </h1>
          <p className={s.lead}>
            Aerospace engineer working across CFD, fluid-structure interaction,
            composite structures and high-performance computing.
          </p>
          <div className={s.acts} data-acts>
            <Link className={`${s.btn} ${s.btnPrimary}`} href="/#work">
              Explore projects ↓
            </Link>
            <a className={`${s.btn} ${s.btnGhost}`} href={site.github} {...ext}>
              GitHub ↗
            </a>
          </div>
        </FlowHero>

        <div className={s.wrap}>
          {/* ------------------------------------------------ profile card */}
          <section className={`${s.profile} ${s.section}`} id="cv" aria-label="Profile">
            <div className={s.photo}>
              <Image
                src="/images/profile/jad-portrait.webp"
                alt={`Portrait of ${site.name}`}
                width={132}
                height={132}
                sizes="132px"
                priority
              />
            </div>
            <div className={s.who}>
              <div>
                <h2>{site.name}</h2>
                <p className={s.role}>{site.role}</p>
              </div>
              <p className={s.approach}>
                Most of what I do is about whether a result holds up once it is
                checked, not just whether it converged: separating verification
                from validation, comparing solver output against hand
                calculations, and stating what a model cannot tell you.
              </p>
            </div>
            <dl className={s.facts}>
              {facts.map(([dt, dd]) => (
                <div key={dt}>
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
            <div className={s.ctas}>
              {hasResumes &&
                resumes.map((cv, k) => (
                  <a key={cv.url} className={`${s.sb} ${k ? "" : s.sbDark}`} href={cv.url} title={cv.summary}>
                    CV · {cv.label}
                    <span aria-hidden>↓</span>
                  </a>
                ))}
              <a className={s.sb} href={`mailto:${site.email}`}>
                Email
                <span aria-hidden>↗</span>
              </a>
            </div>
          </section>

          {/* ------------------------------------------------------- work */}
          <section id="work" className={s.section}>
            <ProjectGrid
              projects={cards}
              header={
                <div>
                  <span className={s.mono}>Selected work</span>
                  <h2>Projects</h2>
                  <p>
                    {projectCountWord} projects, each combining at least two of
                    analytical theory, numerical simulation, physical
                    manufacture and experiment. The useful engineering tends to
                    appear where they disagree.
                  </p>
                </div>
              }
            />
          </section>

          {/* ---------------------------------- profile and education */}
          <section id="profile" className={s.section}>
            <div className={s.sh}>
              <div>
                <span className={s.mono}>Engineering profile</span>
                <h2>How the projects are put together</h2>
                <p>
                  Every repository documents its own methods, verification,
                  limitations and data provenance, including the results that
                  were inconclusive and the failure mode nobody predicted.
                </p>
              </div>
            </div>
            <div className={s.lower}>
              <div className={s.capgrid}>
                {capabilities.map((group) => (
                  <CapGroup key={group.title} title={group.title} count={group.items.length}>
                    {group.items.map((item) => (
                      <span key={item} className={s.tag}>
                        {item}
                      </span>
                    ))}
                  </CapGroup>
                ))}
              </div>
              <Reveal className={s.panel}>
                <span className={s.mono}>Education</span>
                {site.education.map((e) => (
                  <div key={e.degree} className={s.ent} style={{ marginTop: 10 }}>
                    <h3>{e.degree}</h3>
                    <p className={s.mono} style={{ color: "var(--tealD)", marginTop: 3 }}>
                      {e.institution}
                      {e.period && ` · ${e.period}`}
                    </p>
                    {e.note && <p>{e.note}</p>}
                  </div>
                ))}
                {hasResumes && (
                  <p className={s.more}>
                    The projects on this site point at two different graduate
                    disciplines, and a CV written to cover both covers neither
                    well. Each version leads with the work that matters to the
                    reader it is written for. The evidence behind them is the
                    same, and it is all on this site.
                  </p>
                )}
                <p className={s.more}>
                  More on how I work, and what each project taught me, on the{" "}
                  <Link href="/about">about page</Link>.
                </p>
              </Reveal>
            </div>
          </section>
        </div>
      </main>

      <footer id="contact" className={s.footer}>
        <div className={`${s.wrap} ${s.footRow}`}>
          <span>
            {site.name} · <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
          <span>
            <a href={site.linkedin} {...ext}>
              LinkedIn ↗
            </a>{" "}
            ·{" "}
            <a href={site.github} {...ext}>
              GitHub ↗
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
