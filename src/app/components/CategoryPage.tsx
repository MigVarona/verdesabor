import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import CategoryHeader from "../components/CategoryHeader";
import CategoryArticles from "../components/CategoryArticles";
import JsonLd from "../components/JsonLd";
import { CATEGORIES } from "@/lib/constants";
import { fetchArticlesByCategory } from "@/lib/articles.server";
import { absoluteUrl, buildBreadcrumbSchema } from "@/lib/seo";

interface CategoryPageProps {
  category: string;
}

export default async function CategoryPage({ category }: CategoryPageProps) {
  const articles = await fetchArticlesByCategory(category);
  const categoryMeta = CATEGORIES.find((c) => c.slug === category);
  const label = categoryMeta?.label ?? category;
  const description =
    categoryMeta?.description ??
    `Articles about ${label} from ${categoryMeta ? "RENEW" : category}.`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: label },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} Articles`,
    description,
    url: absoluteUrl(`/${category}`),
    isPartOf: { "@type": "WebSite", name: "RENEW" },
    numberOfItems: articles.length,
  };

  return (
    <div className="min-h-screen">
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />
      <Header />
      <main>
        <CategoryHeader category={category} />
        <CategoryArticles articles={articles} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
