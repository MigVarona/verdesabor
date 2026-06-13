"use client";

import { Instagram, Twitter, ArrowUp, FileText } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, SITE_TAGLINE } from "@/lib/constants";
import { SEVEN_HABITS_GUIDE } from "@/lib/guides";
import { openCookieSettings } from "./CookieConsent";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const guide = SEVEN_HABITS_GUIDE;

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="h-1 bg-renew-accent" />

      {/* Free guide CTA */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-renew-dark bg-renew-accent px-2.5 py-1 rounded-full mb-3">
                <FileText className="w-3 h-3" />
                Free guide
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-renew-dark">{guide.title}</h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{guide.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={guide.pdfPath}
                download
                className="inline-flex items-center justify-center bg-renew-dark text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Download PDF
              </a>
              <Link
                href={`/resources/${guide.slug}`}
                className="inline-flex items-center justify-center border border-gray-200 bg-white text-renew-dark text-sm font-semibold px-5 py-3 rounded-full hover:border-renew-accent transition-colors"
              >
                Read online
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-[0.2em] text-renew-dark">RENEW</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{SITE_TAGLINE}</p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Science-backed insights on nutrition, biohacking, neuroscience, wellness, and longevity.
            </p>
            <div className="flex gap-2 pt-1">
              <Link
                href="https://www.instagram.com/renew.habits/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-renew-dark hover:border-renew-sage transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://x.com/renew_habits"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-renew-dark hover:border-renew-sage transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Topics</h3>
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

          {/* Site */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { name: "All Articles", href: "/articles" },
                { name: "Free Guide", href: `/resources/${guide.slug}` },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/about#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-renew-sage transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Medical Disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-renew-sage transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openCookieSettings}
                  className="text-sm text-gray-600 hover:text-renew-sage transition-colors"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} RENEW. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-renew-dark transition-colors"
            aria-label="Scroll to top"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-renew-accent transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
