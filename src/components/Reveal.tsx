"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 *
 * Tags the <html> element so CSS knows JS is present, then reveals any
 * `.reveal` element as it enters the viewport. Without JS (or with
 * prefers-reduced-motion) everything is simply visible — see globals.css.
 */
export default function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.documentElement.classList.add("js-reveal");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      // Anything already on screen appears immediately.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    }
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
