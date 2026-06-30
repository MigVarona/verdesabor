import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import TrendingArticles from "../components/TrendingArticles";
import JsonLd from "../components/JsonLd";
import Link from "next/link";
import { Search } from "lucide-react";
import { fetchArticles } from "@/lib/articles.server";
import { CATEGORIES } from "@/lib/constants";
import { type Article, getArticleUrl } from "@/lib/articles";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "All Articles",
  description:
    "Browse all articles on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
  path: "/articles",
});

export const revalidate = 300;

function matchesQuery(article: Article, query: string) {
  const haystack = [
    article.title,
    article.excerpt,
    article.category,
    article.author,
    ...(article.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function ArticlesPage(props: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q?.trim() ?? "";
  const articles = await fetchArticles();
  const visibleArticles = query ? articles.filter((article) => matchesQuery(article, query)) : articles;
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: query ? `RENEW articles matching ${query}` : "RENEW article library",
    numberOfItems: visibleArticles.length,
    itemListElement: visibleArticles.slice(0, 24).map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(getArticleUrl(article)),
      name: article.title,
    })),
  };

  return (
    <div className="min-h-screen">
      <JsonLd data={[listSchema]} />
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-renew-dark">Article Library</h1>
                <p className="mt-3 text-gray-500 text-lg max-w-2xl">
                  Search science-backed guides on sleep, nutrition, biohacking, neuroscience, wellness, and longevity.
                </p>
              </div>
              <form action="/articles" className="relative">
                <label htmlFor="article-search" className="sr-only">
                  Search articles
                </label>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-renew-muted" />
                <input
                  id="article-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Search sleep, fasting, HRV..."
                  className="h-12 w-full border border-renew-border bg-renew-paper pl-11 pr-4 text-sm text-renew-dark outline-none transition-colors placeholder:text-renew-muted focus:border-renew-sage"
                />
              </form>
            </div>
            {query && (
              <p className="mt-6 text-sm text-renew-muted">
                Showing {visibleArticles.length} {visibleArticles.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-renew-dark">&quot;{query}&quot;</span>.
              </p>
            )}
          </div>
        </div>
        {visibleArticles.length > 0 ? (
          <TrendingArticles articles={visibleArticles} />
        ) : (
          <section className="bg-white py-14 md:py-16">
            <div className="container mx-auto px-4">
              <div className="border border-renew-border bg-renew-paper p-8 md:p-10">
                <h2 className="text-2xl font-bold text-renew-dark">No articles found</h2>
                <p className="mt-3 max-w-2xl text-renew-muted">
                  Try a broader search, or browse one of the main topics below.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/${category.slug}`}
                      className="rounded-full border border-renew-border bg-white px-4 py-2 text-sm font-semibold text-renew-dark hover:border-renew-sage hover:text-renew-sage"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
