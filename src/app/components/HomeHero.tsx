import Image from "next/image";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getReadingTime } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface HomeHeroProps {
  featured: Article | null;
  secondary: Article[];
}

export default function HomeHero({ featured, secondary }: HomeHeroProps) {
  if (!featured) {
    return (
      <section className="bg-renew-dark text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-renew-accent mb-6">RENEW</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] max-w-4xl text-balance">
            Science-backed health, without the noise.
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-xl leading-relaxed">
            Nutrition, biohacking, neuroscience, and longevity — curated for people who want clarity.
          </p>
        </div>
      </section>
    );
  }

  const featuredUrl = getArticleUrl(featured);
  const featuredImage = featured.imagexl || featured.image;
  const readTime = getReadingTime(`${featured.text || ""} ${featured.excerpt || ""}`);

  return (
    <section className="bg-renew-dark text-white overflow-hidden">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Featured story */}
          <div className="lg:col-span-8">
            <Link href={featuredUrl} className="group block">
              {featuredImage && (
                <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={featuredImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-renew-dark/80 via-renew-dark/10 to-transparent" />
                </div>
              )}
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-renew-accent">
                    {featured.category}
                  </span>
                  <span className="text-gray-500 text-xs">{formatDate(featured.publishedAt)}</span>
                  <span className="text-gray-500 text-xs">{readTime} min read</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-balance group-hover:text-renew-accent transition-colors duration-300">
                  {featured.title}
                </h1>
                <p className="mt-4 text-gray-400 text-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white group-hover:text-renew-accent transition-colors">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* Secondary stories */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Also reading</p>
              <Link href="/articles" className="text-xs text-gray-500 hover:text-white transition-colors">
                View all
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-gray-800">
              {secondary.slice(0, 4).map((article) => {
                const image = article.image || article.imagexl;
                const url = getArticleUrl(article);
                return (
                  <Link key={article._id} href={url} className="group flex gap-4 py-5 first:pt-0">
                    {image && (
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-renew-sage">
                        {article.category}
                      </span>
                      <h2 className="mt-1 text-sm md:text-base font-semibold leading-snug text-gray-100 group-hover:text-renew-accent transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1.5">{formatDate(article.publishedAt)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
