import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Newsletter from "@/app/components/Newsletter";
import ArticleCard from "@/app/components/ArticleCard";
import JsonLd from "@/app/components/JsonLd";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { fetchArticlesByTag, getAllTags } from "@/lib/articles.server";
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { humanizeTagSlug } from "@/lib/tags";

interface Params {
  tag: string;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { tag } = await props.params;
  const label = humanizeTagSlug(tag);
  return buildPageMetadata({
    title: `#${label}`,
    description: `Articles tagged with "${label}" on RENEW — science-backed health insights.`,
    path: `/tags/${tag}`,
  });
}

export default async function TagPage(props: { params: Promise<Params> }) {
  const { tag } = await props.params;
  const articles = await fetchArticlesByTag(tag);

  if (articles.length === 0) notFound();

  const label = tag.replace(/-/g, " ");

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: `#${label}` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged "${label}"`,
    description: `Science-backed articles about ${label} from RENEW.`,
    url: absoluteUrl(`/tags/${tag}`),
    isPartOf: { "@type": "WebSite", name: "RENEW" },
    numberOfItems: articles.length,
  };

  return (
    <div className="min-h-screen">
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />
      <Header />
      <main>
        <section className="bg-renew-paper border-b border-renew-border py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[{ label: `#${label}` }]}
            />
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center bg-renew-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-renew-dark rounded-sm">
                Tag
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl text-renew-dark leading-tight">
              #{label}
            </h1>
            <p className="mt-3 text-renew-muted text-lg">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
