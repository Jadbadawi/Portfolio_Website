"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import s from "@/app/home.module.css";
import type { Figure, Project } from "@/lib/projects/types";

/** The card-level slice of a project; sections stay on the server. */
export type CardProject = Pick<
  Project,
  "slug" | "shortTitle" | "title" | "summary" | "category" | "period" | "tools" | "stats" | "hero" | "card" | "homeFeature"
>;

/** Discipline filters, matched against each project's category line. */
const GROUPS: Record<string, RegExp> = {
  CFD: /CFD|Aerodynamics/,
  Structures: /FEA|Structures|Composites/,
  Experiment: /Experiment|Test/,
};
const FILTERS = ["All", ...Object.keys(GROUPS)];

const periodShort = (p: CardProject) => p.period.split(" · ")[0];
const cardImage = (p: CardProject): Figure => p.card ?? p.hero;

function Badge({ p }: { p: CardProject }) {
  return <span className={s.badge}>{periodShort(p)}</span>;
}

/** Waxwing: main photo, with thumbnails that swap it on hover or focus. */
function Gallery({ p }: { p: CardProject }) {
  const f = p.homeFeature!;
  const [on, setOn] = useState(0);
  const main = f.figures[on];
  return (
    <div className={s.img}>
      <Image src={main.src} alt={main.alt} fill sizes="(max-width: 700px) 100vw, 400px" />
      <Badge p={p} />
      <div className={s.gfoot}>
        <span className={s.chip}>{f.label}</span>
        <div className={s.thumbs}>
          {f.figures.map((fig, k) => (
            <span
              key={fig.src}
              className={`${s.th} ${k === on ? s.thOn : ""}`}
              onMouseEnter={() => setOn(k)}
            >
              <Image src={fig.src} alt="" fill sizes="96px" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** UAV: two build photos and the CAD render as a mosaic. */
function Mosaic({ p }: { p: CardProject }) {
  const f = p.homeFeature!;
  const render = cardImage(p);
  return (
    <div className={`${s.img} ${s.mosaic}`}>
      {f.figures.slice(0, 2).map((fig) => (
        <figure key={fig.src}>
          <Image src={fig.src} alt={fig.alt} fill sizes="(max-width: 700px) 60vw, 480px" />
        </figure>
      ))}
      <figure className={s.render}>
        <Image src={render.src} alt={render.alt} fill sizes="(max-width: 700px) 40vw, 300px" />
      </figure>
      <Badge p={p} />
      <span className={s.chip}>{f.label}</span>
    </div>
  );
}

function Card({ p, lead }: { p: CardProject; lead: boolean }) {
  const layout = p.homeFeature?.layout;
  const img = cardImage(p);
  const four = lead || !!layout;
  const cls = [s.pc, lead && s.leadCard, layout === "tall" && s.tall, layout === "wide" && s.wide]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={`/projects/${p.slug}`} className={cls}>
      {layout === "tall" ? (
        <Gallery p={p} />
      ) : layout === "wide" ? (
        <Mosaic p={p} />
      ) : (
        <div className={s.img}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={lead ? "(max-width: 700px) 100vw, 620px" : "(max-width: 700px) 100vw, 400px"}
            priority={lead}
          />
          <Badge p={p} />
          {!lead && (
            <div className={s.over} aria-hidden>
              {p.stats?.map((st) => (
                <div key={st.label}>
                  <div className={s.ov}>{st.value}</div>
                  <div className={s.ol}>{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={s.txt}>
        <span className={s.mono} style={{ color: "var(--tealD)" }}>
          {p.category}
        </span>
        <h3>{p.shortTitle ?? p.title}</h3>
        <p className={s.sum}>{p.summary}</p>
        <div className={`${s.kv} ${four ? s.kvFour : ""}`}>
          {p.stats?.slice(0, four ? 4 : 2).map((st) => (
            <div key={st.label}>
              <b>{st.value}</b>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
        <div className={s.foot}>
          <span className={s.mono}>{p.tools.slice(0, 3).join(" · ")}</span>
          <span className={s.go} aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectGrid({
  projects,
  header,
}: {
  projects: CardProject[];
  /** Section title and intro, set beside the filters. */
  header: ReactNode;
}) {
  const [filter, setFilter] = useState("All");
  const shown = (p: CardProject) => filter === "All" || GROUPS[filter].test(p.category);
  return (
    <>
      <div className={s.sh}>
        {header}
        <div className={s.filters} role="group" aria-label="Filter projects by discipline">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className={s.grid} data-grid>
        {projects.map((p, i) => (
          <div key={p.slug} className={shown(p) ? "contents" : s.hide}>
            <Card p={p} lead={i === 0} />
          </div>
        ))}
      </div>
    </>
  );
}
