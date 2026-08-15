import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-ink hover:text-accent"
        >
          Jad&nbsp;El&nbsp;Badaoui
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-5 sm:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {site.resume && (
              <li>
                <a
                  href={site.resume}
                  className="text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  Resume
                </a>
              </li>
            )}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-sm border border-line-strong px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink sm:inline-block"
              >
                GitHub&nbsp;<span aria-hidden>↗</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
