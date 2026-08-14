import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              Get in touch
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-2">
              Open to conversations about aerospace, CFD, simulation and
              computational engineering roles.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                GitHub
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {site.resume && (
              <li>
                <a
                  href={site.resume}
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  Resume (PDF)
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-ink-3 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Jad El Badaoui</p>
          <p>Every figure on this site is real project output — sources on GitHub.</p>
        </div>
      </div>
    </footer>
  );
}
