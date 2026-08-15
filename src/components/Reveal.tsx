"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal for a single block of content.
 *
 * Each instance owns the observer for its own element, so React's normal
 * mount/unmount handles route changes for us: navigating to a new page
 * mounts new Reveals with fresh observers, and leaving a page disconnects
 * them. There is no document-wide scan that can go stale after a
 * client-side navigation.
 *
 * Content is only hidden once an observer is actually watching it ("armed"),
 * and it is never armed if the observer cannot be created. Without JS, with
 * prefers-reduced-motion, or if anything goes wrong, the server-rendered
 * markup simply stays visible — the animation can never strand content.
 */
export default function Reveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer, or the user asked for no motion: leave it visible.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Anything already on (or above) the screen at mount stays visible
    // rather than animating in — this is what makes a fresh page load or a
    // restored scroll position appear immediately instead of fading.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("armed");
    // Default root and margin: anything touching the viewport reveals. A
    // negative bottom margin would leave a strip at the foot of the page in
    // which an element can never intersect — and so could stay hidden for
    // good if the page ends there.
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPhase("shown");
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass =
    phase === "armed"
      ? "reveal-armed"
      : phase === "shown"
        ? "reveal-armed reveal-shown"
        : "";

  return (
    <div ref={ref} className={[revealClass, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
