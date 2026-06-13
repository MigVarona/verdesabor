import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="section-title">Explore Topics</h2>
          <p className="text-gray-500 mt-2">Dive into the areas that matter most to your health journey.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group p-6 rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-renew-sage/40 hover:shadow-card"
            >
              <h3 className="font-semibold text-lg text-renew-dark group-hover:text-renew-sage transition-colors">
                {cat.label}
              </h3>
              <p className="text-sm mt-2 text-gray-500 leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
