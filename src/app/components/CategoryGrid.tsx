import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Explore Topics</h2>
            <p className="text-gray-500 mt-2">Dive into the areas that matter most to your health journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`group p-5 rounded-xl border transition-all duration-200 hover:shadow-card-hover ${cat.color}`}
            >
              <span className="text-2xl mb-3 block">{cat.icon}</span>
              <h3 className="font-bold text-lg group-hover:underline">{cat.label}</h3>
              <p className="text-sm mt-1.5 opacity-80 leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
