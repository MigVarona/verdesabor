"use client";

import { Instagram, Twitter, Heart, ArrowUp } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import AdSlot from "./AdSlot";
import { AD_SLOTS } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-renew-dark text-gray-300">
      <div className="container mx-auto px-4 py-6">
        <AdSlot id={AD_SLOTS.footer} format="footer" className="border-gray-700 bg-gray-800/50 text-gray-500" />
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-[0.2em] font-bold text-white">RENEW</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Inspiring healthier lives through science-backed insights on nutrition, biohacking, and longevity.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.instagram.com/renew.habits/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-gray-800 hover:bg-renew-sage transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://x.com/renew_habits"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2.5 rounded-full bg-gray-800 hover:bg-renew-sage transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { name: "About Us", href: "/about" },
                { name: "All Articles", href: "/articles" },
                { name: "Contact", href: "/about#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Medical Disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} RENEW. Made with <Heart className="w-3.5 h-3.5 text-rose-400" /> for your well-being
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
