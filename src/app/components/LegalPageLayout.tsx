"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: ReactNode;
  eyebrow?: string;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
  children,
  eyebrow = "Legal",
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-3">{eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-renew-dark">{title}</h1>
          {subtitle && <p className="mt-4 text-gray-500 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
          <p className="mt-4 text-sm text-gray-400">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="lg:sticky lg:top-24 bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">On this page</p>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-renew-dark text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="legal-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-renew-sage underline underline-offset-2 hover:text-renew-dark transition-colors">
      {children}
    </Link>
  );
}

export function LegalExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-renew-sage underline underline-offset-2 hover:text-renew-dark transition-colors"
    >
      {children}
    </a>
  );
}
