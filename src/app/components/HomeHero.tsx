import ArticleImage from "./ArticleImage";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getArticleImage, getArticleThumbnail, getReadingTime, getArticleSummary } from "@/lib/articles";
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
  const featuredImage = getArticleImage(featured);
  const readTime = getReadingTime(`${featured.text || ""} ${featured.excerpt || ""}`);
  const featuredSummary = getArticleSummary(featured, 190);

  return (
    <section className="bg-renew-paper overflow-hidden border-b border-renew-border">
      <div className="container mx-auto px-4 pt-5 md:pt-6 pb-8 md:pb-8">
        {/* Brand strip */}
        <div className="flex items-center gap-4 mb-5 md:mb-5">
          <div className="h-px flex-1 max-w-16 bg-renew-dark" />
          <p className="editorial-kicker text-renew-muted">{SITE_TAGLINE}</p>
          <div className="h-px flex-1 bg-renew-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <Link href={featuredUrl} className="group grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="relative aspect-[16/10] md:aspect-[16/7] lg:aspect-[4/3] overflow-hidden bg-renew-ink ring-1 ring-renew-border">
                <ArticleImage
                  src={featuredImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-renew-ink/45 via-renew-ink/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-4 md:p-5 text-white">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em]">Featured Briefing</span>
                  <span className="hidden sm:inline text-xs text-white/80">{readTime} min read</span>
                </div>
              </div>
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-renew-dark bg-renew-accent px-2.5 py-1 rounded-sm">
                    {featured.category}
                  </span>
                  <span className="text-renew-muted text-xs">{formatDate(featured.publishedAt)}</span>
                  <span className="text-renew-muted text-xs sm:hidden">{readTime} min read</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.45rem] text-renew-dark leading-[0.98] text-balance group-hover:text-renew-sage transition-colors duration-300">
                  {featured.title}
                </h1>
                <p className="mt-5 text-renew-muted text-lg leading-relaxed line-clamp-3 max-w-2xl">
                  {featuredSummary}
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-renew-dark group-hover:text-renew-sage transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-renew-ink text-white border border-renew-ink p-5 md:p-6 lg:sticky lg:top-24 shadow-card">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/15">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/55">Also reading</p>
                <Link href="/articles" className="text-xs font-medium text-renew-accent hover:text-white transition-colors">
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-white/10">
                {secondary.slice(0, 4).map((article) => {
                  const thumb = getArticleThumbnail(article);
                  const url = getArticleUrl(article);
                  return (
                    <Link key={article._id} href={url} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                        <ArticleImage
                          src={thumb}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-renew-accent">
                          {article.category}
                        </span>
                        <h2 className="mt-1 text-sm font-semibold leading-snug text-white group-hover:text-renew-accent transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-xs text-white/45 mt-1">{formatDate(article.publishedAt)}</p>
                      </div>
                    </Link>
                  );
                })}
                {secondary.length === 0 && (
                  <p className="text-sm text-white/50 py-2">More articles coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
