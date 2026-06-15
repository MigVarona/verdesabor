"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-renew-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium text-renew-dark text-sm leading-snug">{item.q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-renew-sage transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-renew-muted">{item.a}</p>
      )}
    </div>
  );
}

export default function ArticleFAQ({ items }: { items: FAQItem[] }) {
  if (!items.length) return null;

  return (
    <section id="faq" className="mt-12 scroll-mt-28">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-renew-sage" />
        <h2 className="section-title">Frequently asked questions</h2>
      </div>
      <div className="border border-renew-border bg-white px-5">
        {items.map((item, i) => (
          <FAQRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
