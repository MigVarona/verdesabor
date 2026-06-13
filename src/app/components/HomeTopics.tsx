import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function HomeTopics() {
  return (
    <section className="bg-gray-50/80 border-y border-gray-100 sticky top-16 md:top-[72px] z-40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-3.5 scrollbar-hide">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex-shrink-0">
            Topics
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-medium text-gray-500 hover:text-renew-sage whitespace-nowrap flex-shrink-0 transition-colors px-3 py-1 rounded-full hover:bg-white"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
