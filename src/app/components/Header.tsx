"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { SEVEN_HABITS_GUIDE } from "@/lib/guides";
import { cn } from "@/lib/utils";
import RenewLogo from "./RenewLogo";

function MobileMenuDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="absolute inset-0 bg-renew-dark/50 backdrop-blur-[2px]" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 w-[min(300px,88vw)] bg-renew-paper shadow-2xl flex flex-col">
        <div className="h-1 bg-renew-accent flex-shrink-0" />

        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <RenewLogo layout="full" size="sm" href="/" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
              className="flex items-center justify-center w-10 h-10 rounded-full text-renew-muted hover:bg-renew-mist hover:text-renew-dark transition-colors"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">Menu</p>
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/"
                onClick={onClose}
                  className="flex items-center justify-between px-3 py-3 text-[0.95rem] font-semibold text-renew-dark rounded-lg hover:bg-renew-mist"
              >
                Home
              </Link>
            </li>
            {CATEGORIES.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-3 text-[0.95rem] text-renew-muted rounded-lg hover:bg-renew-mist hover:text-renew-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="px-3 mt-6 mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">More</p>
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/articles"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-3 text-[0.95rem] text-renew-muted rounded-lg hover:bg-renew-mist hover:text-renew-dark"
              >
                All articles
              </Link>
            </li>
            <li>
              <Link
                href={`/resources/${SEVEN_HABITS_GUIDE.slug}`}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-3 text-[0.95rem] text-renew-muted rounded-lg hover:bg-renew-mist hover:text-renew-dark"
              >
                Free guide
                <span className="text-[0.6rem] font-bold uppercase tracking-wider text-renew-dark bg-renew-accent px-1.5 py-0.5 rounded">
                  PDF
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-3 text-[0.95rem] text-renew-muted rounded-lg hover:bg-renew-mist hover:text-renew-dark"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-renew-border bg-renew-mist/60">
          <Link
            href={`/resources/${SEVEN_HABITS_GUIDE.slug}`}
            onClick={onClose}
            className="flex items-center justify-between w-full bg-renew-dark text-white text-sm font-semibold px-4 py-3.5 rounded-lg hover:bg-renew-ink transition-colors"
          >
            Get the free guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-renew-paper/95 md:backdrop-blur-md shadow-sm border-b border-renew-border"
            : "bg-renew-paper border-b border-renew-border"
        )}
      >
        {/* Mobile header */}
        <div className="lg:hidden relative z-50">
          <div className="h-0.5 bg-renew-accent" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-[3rem_1fr_3rem] items-center h-14">
              <button
                type="button"
                onClick={openMenu}
                className="relative z-10 flex items-center justify-center w-10 h-10 -ml-1 rounded-full text-renew-dark hover:bg-renew-mist transition-colors"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={22} strokeWidth={1.75} />
              </button>

              <div className="flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                  <RenewLogo layout="compact" href="/" />
                </div>
              </div>

              <Link
                href="/articles"
                className="relative z-10 flex items-center justify-center w-10 h-10 -mr-1 justify-self-end rounded-full text-renew-muted hover:text-renew-dark hover:bg-renew-mist transition-colors"
                aria-label="All articles"
              >
                <Search size={20} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block container mx-auto px-4">
          <div className="flex items-center justify-between h-[72px] gap-8">
            <RenewLogo layout="full" size="default" href="/" />

            <nav className="flex items-center gap-0.5 flex-1 justify-center">
              {CATEGORIES.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="px-3 py-2 text-sm text-renew-muted hover:text-renew-dark font-medium transition-colors rounded-md hover:bg-renew-mist"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href="/articles"
                className="p-2 text-renew-muted hover:text-renew-dark transition-colors rounded-full hover:bg-renew-mist"
                aria-label="All articles"
              >
                <Search size={20} />
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-renew-dark bg-renew-accent hover:bg-renew-dark hover:text-white px-4 py-2 rounded-full transition-all"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mounted && isMenuOpen && createPortal(<MobileMenuDrawer onClose={closeMenu} />, document.body)}
    </>
  );
};

export default Header;
