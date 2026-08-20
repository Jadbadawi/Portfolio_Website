import Link from "next/link";
import { hasResumes, resumeSectionHref, site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

/**
 * Site chrome.
 *
 * Deliberately not a sticky centred top bar. On desktop the identity and
 * navigation sit in a fixed left column and the content scrolls past them,
 * which is what gives the site an asymmetric page rather than the single
 * centred column every template ships with. Below `lg` the same links
 * collapse into a compact top bar, because a sidebar on a phone is just a
 * header that stole horizontal space.
 */

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function navLinks() {
  return hasResumes ? [...links, { href: resumeSectionHref, label: "CV" }] : links;
}

function SocialRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      <li>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          title="GitHub profile"
          className="block text-ink-3 transition-colors hover:text-accent"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
      </li>
      <li>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          title="LinkedIn profile"
          className="block text-ink-3 transition-colors hover:text-accent"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
      </li>
    </ul>
  );
}

export default function SiteHeader() {
  const items = navLinks();

  return (
    <>
      {/* ------------------------------------------------ desktop: rail */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-[248px] flex-col justify-between border-r border-line bg-paper px-8 py-10 lg:flex xl:w-[280px]">
        <div>
          <Link href="/" className="block">
            <span className="block text-[26px] leading-[1.1] text-ink transition-colors hover:text-accent">
              Jad
              <br />
              El Badaoui
            </span>
          </Link>
          <p className="mt-4 max-w-[180px] text-sm leading-snug text-ink-3">
            Aerospace, CFD and computational engineering
          </p>
        </div>

        <nav aria-label="Main" className="flex-1 pt-14">
          <ul className="space-y-3">
            {items.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-baseline gap-3 text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  <span
                    aria-hidden
                    className="h-px w-4 shrink-0 translate-y-[-0.35em] bg-line-strong transition-all group-hover:w-7 group-hover:bg-accent"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <SocialRow />
          <p className="mt-5 font-mono text-[11px] leading-relaxed text-ink-3">
            Bristol, UK
          </p>
        </div>
      </header>

      {/* -------------------------------------------------- mobile: bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm lg:hidden">
        <div className="flex h-14 items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="text-[17px] leading-none text-ink transition-colors hover:text-accent"
          >
            Jad El Badaoui
          </Link>
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 sm:gap-6">
              {items.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
