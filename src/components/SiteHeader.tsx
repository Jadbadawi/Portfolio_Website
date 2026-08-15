import Link from "next/link";
import { resumeHref, site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Icon-only profile link. The label is on the element, not on screen. */
function ProfileLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-sm border border-line-strong text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      {children}
    </a>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          // Tighter on very small screens so the nav still fits at 320 px
          // once the CV link is switched on.
          className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-ink hover:text-accent sm:text-[13px] sm:tracking-[0.18em]"
        >
          Jad&nbsp;El&nbsp;Badaoui
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-3 sm:gap-6">
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
            {/* Hidden entirely until the CV is published; see src/lib/site.ts. */}
            {resumeHref && (
              <li>
                <a
                  href={resumeHref}
                  className="text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  CV
                </a>
              </li>
            )}
            <li className="hidden sm:block">
              <ProfileLink href={site.github} label="GitHub profile">
                <GitHubIcon className="h-4 w-4" />
              </ProfileLink>
            </li>
            <li className="hidden sm:block">
              <ProfileLink href={site.linkedin} label="LinkedIn profile">
                <LinkedInIcon className="h-4 w-4" />
              </ProfileLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
