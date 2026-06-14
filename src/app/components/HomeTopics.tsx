import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function HomeTopics() {
  return (
    <section className="bg-renew-paper/90 backdrop-blur border-y border-renew-border sticky top-[3.625rem] lg:top-[72px] z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-3.5 scrollbar-hide">
          <span className="text-xs font-semibold uppercase tracking-widest text-renew-muted flex-shrink-0">
            Topics
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium text-renew-muted hover:text-renew-dark whitespace-nowrap flex-shrink-0 transition-colors px-3 py-1 rounded-full hover:bg-renew-accent"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
