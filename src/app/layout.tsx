import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lightbox from "@/components/Lightbox";

/*
 * Typefaces.
 *
 * Three families, each with one job:
 *
 *   Newsreader   Display. A serif carries the headings, which is what gives
 *                the site its voice and keeps it from reading as a template.
 *   Inter        Body copy.
 *   IBM Plex Mono  "Instrument" text only: section indices, figure captions,
 *                data labels, equations.
 *
 * The site previously ran on Geist Sans and Geist Mono. Both are decent, but
 * they are the Next.js starter defaults, so a site using them looks like a
 * template nobody chose. Do not reintroduce them, and do not add a fourth
 * family. There are no italics anywhere: emphasis is weight and wording.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fontVariables = [
  newsreader.variable,
  inter.variable,
  ibmPlexMono.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} | Aerospace & Computational Engineering`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Aerospace & Computational Engineering`,
    description: site.description,
    url: site.siteUrl,
    images: [{ url: "/images/og-home.png", width: 1280, height: 640 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` for in-page anchors; this
      // tells Next to still jump instantly on route changes rather than
      // animating the scroll reset. See Next 16 upgrade guide.
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Lightbox />
      </body>
    </html>
  );
}
