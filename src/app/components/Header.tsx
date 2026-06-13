"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white border-b border-gray-100"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-renew-dark"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-auto">
            <span className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-renew-dark">
              RENEW
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-renew-dark font-medium transition-colors rounded-md hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/articles"
              className="p-2 text-gray-500 hover:text-renew-dark transition-colors"
              aria-label="All articles"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/about"
              className="hidden sm:inline-flex text-sm font-medium text-renew-dark bg-renew-accent hover:bg-yellow-300 px-4 py-2 rounded-full transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="text-xl font-bold tracking-[0.2em] text-renew-dark">RENEW</span>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 text-gray-500">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-renew-dark rounded-lg hover:bg-gray-50"
                  >
                    Home
                  </Link>
                </li>
                {CATEGORIES.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-3 text-base text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-100 mt-4">
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 text-base text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
