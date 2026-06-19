import { Instagram, Twitter, Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { SEVEN_HABITS_GUIDE } from "@/lib/guides";
import RenewLogo from "./RenewLogo";
import { ScrollToTopButton, CookieSettingsButton } from "./FooterActions";

const EXPLORE_LINKS = [
  { name: "All Articles", href: "/articles" },
  { name: "Free Guide", href: `/resources/${SEVEN_HABITS_GUIDE.slug}` },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/about#contact" },
];

const LEGAL_LINKS = [
  { name: "Editorial Policy", href: "/editorial-policy" },
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "/cookies" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  const guide = SEVEN_HABITS_GUIDE;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Guide highlight */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12 md:py-14">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-card">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-renew-accent" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 p-8 md:p-10 pl-9 md:pl-11">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-renew-sage mb-2">
                  Free download
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-renew-dark leading-tight text-balance">
                  {guide.title}
                </h2>
                <p className="mt-3 text-gray-500 leading-relaxed max-w-xl">
                  {guide.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={guide.pdfPath}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-renew-dark text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <Link
                  href={`/resources/${guide.slug}`}
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-renew-dark text-sm font-semibold px-6 py-3.5 rounded-full hover:border-renew-accent bg-gray-50/50 transition-colors"
                >
                  Read online
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 space-y-6">
              <RenewLogo size="lg" />
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Independent health journalism on nutrition, biohacking, neuroscience, and longevity —
                written to be useful, not overwhelming.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.instagram.com/renew.habits/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-renew-dark hover:border-renew-sage hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://x.com/renew_habits"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-renew-dark hover:border-renew-sage hover:bg-gray-50 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-renew-dark mb-4 pb-2 border-b-2 border-renew-accent w-fit">
                  Topics
                </h3>
                <ul className="space-y-2.5">
                  {CATEGORIES.map(({ label, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="text-sm text-gray-600 hover:text-renew-sage transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-renew-dark mb-4 pb-2 border-b-2 border-renew-accent w-fit">
                  Explore
                </h3>
                <ul className="space-y-2.5">
                  {EXPLORE_LINKS.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-renew-sage transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-renew-dark mb-4 pb-2 border-b-2 border-renew-accent w-fit">
                  Legal
                </h3>
                <ul className="space-y-2.5">
                  {LEGAL_LINKS.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-renew-sage transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <CookieSettingsButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-renew-dark text-gray-400">
        <div className="h-1 bg-renew-accent" />
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <RenewLogo size="sm" variant="light" href="/" />
            <p className="text-xs text-gray-500">
              &copy; {year} RENEW. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="https://wearecapa.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website developed by WeAreCapa"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-colors hover:border-renew-accent/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-renew-accent"
            >
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-gray-300">
                Developed by
              </span>
              <span className="h-5 w-px bg-white/10" aria-hidden="true" />
              <Image
                src="/images/wearecapa_header_white.png"
                alt="WeAreCapa"
                width={160}
                height={30}
                className="h-[18px] w-auto opacity-90 transition-opacity group-hover:opacity-100"
              />
            </Link>
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
