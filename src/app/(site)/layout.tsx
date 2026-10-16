import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Chrome for every page except the homepage: the fixed left rail on desktop,
 * a compact top bar below `lg`, and the shared footer. The route group adds
 * nothing to the URL, so /about and /projects/[slug] are unchanged.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/*
        The left rail is fixed, so everything else is inset by its width on
        `lg` and up. Below that the rail becomes a top bar and the offset
        disappears.
      */}
      <div className="flex min-h-full flex-1 flex-col lg:pl-[248px] xl:pl-[280px]">
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
