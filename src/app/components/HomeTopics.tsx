import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function HomeTopics() {
  return (
    <section className="border-b border-gray-200 bg-white sticky top-16 md:top-[72px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex-shrink-0">
            Topics
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium text-gray-600 hover:text-renew-dark whitespace-nowrap flex-shrink-0 transition-colors relative after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-0.5 after:bg-renew-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
