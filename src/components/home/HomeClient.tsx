"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "@/app/home.module.css";
import { hasResumes, resumeSectionHref, site } from "@/lib/site";

/**
 * Floating pill nav. Dark over the hero, light once the page has scrolled
 * past it, so it stays legible on both backgrounds.
 */
export function HomeNav() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-hero]") as HTMLElement | null;
    const update = () => setLight(window.scrollY > (hero?.offsetHeight ?? 600) - 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <nav className={`${s.navbar} ${light ? s.navLight : ""}`} aria-label="Main">
      <Link className={s.me} href="/">
        <Image src="/images/profile/jad-avatar.webp" alt="" width={28} height={28} />
        {site.name}
      </Link>
      <Link className={s.hm} href="/#work">
        Work
      </Link>
      <Link className={s.hm} href="/about">
        About
      </Link>
      <a className={s.hm} href={site.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      {hasResumes && (
        <Link className={s.navCv} href={resumeSectionHref}>
          CV
        </Link>
      )}
    </nav>
  );
}

/**
 * A capability group as a disclosure. Open everywhere by default (so it is
 * fully visible without JS and on desktop), closed on phones after mount to
 * keep the page short.
 */
export function CapGroup({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 700px)").matches) ref.current?.removeAttribute("open");
  }, []);
  return (
    <details ref={ref} className={s.capc} open>
      <summary>
        <h3>{title}</h3>
        <span className={s.mono}>{count}</span>
      </summary>
      {children}
    </details>
  );
}
