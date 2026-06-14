import Link from "next/link";
import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import AdSlot from "./AdSlot";
import { AD_SLOTS, CATEGORIES } from "@/lib/constants";

interface ArticleSidebarProps {
  trending?: Article[];
  currentCategory?: string;
}

export default function ArticleSidebar({ trending = [], currentCategory }: ArticleSidebarProps) {
  return (
    <aside className="space-y-8">
      <AdSlot id={AD_SLOTS.sidebar} format="sidebar" />

      {trending.length > 0 && (
        <div className="bg-renew-paper border border-renew-border p-5 shadow-card">
          <h3 className="font-bold text-renew-dark mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-renew-accent" />
            Trending Now
          </h3>
          <div>
            {trending.slice(0, 5).map((article) => (
              <ArticleCard key={article._id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      <div className="bg-renew-ink border border-renew-ink p-5 shadow-card text-white">
        <h3 className="font-bold text-renew-dark mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-renew-accent" />
          <span className="text-white">
          Categories
          </span>
        </h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className={`text-sm capitalize transition-colors hover:text-renew-sage ${
                  currentCategory?.toLowerCase() === cat.slug
                    ? "text-renew-accent font-semibold"
                    : "text-white/65"
                }`}
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AdSlot id={`${AD_SLOTS.sidebar}-2`} format="sidebar" />
    </aside>
  );
}
