import Link from "next/link";
import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import { SITE_TAGLINE } from "@/lib/constants";

interface HeroSectionProps {
  featured: Article | null;
}

export default function HeroSection({ featured }: HeroSectionProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-renew-sage font-semibold text-sm uppercase tracking-widest mb-3">
            Welcome to RENEW
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-renew-dark tracking-tight text-balance leading-tight">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Science-backed insights on nutrition, biohacking, neuroscience, and longevity — curated to help you live better, longer.
          </p>
        </div>

        {featured && (
          <div className="max-w-5xl mx-auto">
            <ArticleCard article={featured} variant="featured" />
          </div>
        )}
      </div>
    </section>
  );
}
