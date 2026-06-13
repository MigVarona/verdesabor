import Image from "next/image";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getReadingTime } from "@/lib/articles";
import { ArrowRight } from "lucide-react";
import { SITE_TAGLINE } from "@/lib/constants";

interface HomeHeroProps {
  featured: Article | null;
  secondary: Article[];
}

export default function HomeHero({ featured, secondary }: HomeHeroProps) {
  if (!featured) {
    return (
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-renew-accent mb-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-renew-sage mb-4">RENEW</p>
            <h1 className="text-4xl md:text-6xl font-bold text-renew-dark leading-[1.08] text-balance">
              Science-backed health, without the noise.
            </h1>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">
              Nutrition, biohacking, neuroscience, and longevity — curated for people who want clarity.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredUrl = getArticleUrl(featured);
  const featuredImage = featured.imagexl || featured.image;
  const readTime = getReadingTime(`${featured.text || ""} ${featured.excerpt || ""}`);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto px-4 pt-8 md:pt-12 pb-12 md:pb-16">
        {/* Brand strip */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-8 h-1 bg-renew-accent" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{SITE_TAGLINE}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <Link href={featuredUrl} className="group block">
              {featuredImage && (
                <div className="relative aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden mb-7 ring-1 ring-gray-100">
                  <Image
                    src={featuredImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-renew-sage bg-emerald-50 px-2.5 py-1 rounded">
                    {featured.category}
                  </span>
                  <span className="text-gray-400 text-xs">{formatDate(featured.publishedAt)}</span>
                  <span className="text-gray-400 text-xs">{readTime} min read</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-renew-dark leading-[1.12] text-balance group-hover:text-renew-sage transition-colors duration-300">
                  {featured.title}
                </h1>
                <p className="mt-4 text-gray-500 text-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-renew-dark group-hover:text-renew-sage transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 md:p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Also reading</p>
                <Link href="/articles" className="text-xs font-medium text-renew-sage hover:text-renew-dark transition-colors">
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-gray-200">
                {secondary.slice(0, 4).map((article) => {
                  const image = article.image || article.imagexl;
                  const url = getArticleUrl(article);
                  return (
                    <Link key={article._id} href={url} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                      {image && (
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                          <Image
                            src={image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-renew-sage">
                          {article.category}
                        </span>
                        <h2 className="mt-1 text-sm font-semibold leading-snug text-gray-800 group-hover:text-renew-sage transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(article.publishedAt)}</p>
                      </div>
                    </Link>
                  );
                })}
                {secondary.length === 0 && (
                  <p className="text-sm text-gray-400 py-2">More articles coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
