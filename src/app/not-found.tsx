import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/*
 * The 404 renders under the root layout, outside the (site) route group, so
 * it draws the same rail and footer itself rather than appearing bare.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-full flex-1 flex-col lg:pl-[248px] xl:pl-[280px]">
        <main id="main" className="flex-1">
          <div className="mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">404</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
              Page not found
            </h1>
            <p className="mt-3 max-w-md leading-relaxed text-ink-2">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link
              href="/"
              className="mt-8 rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
            >
              Back to the homepage
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
