import Header from "./components/Header";
import HomeHero from "./components/HomeHero";
import HomeTopics from "./components/HomeTopics";
import HomeLeadMagnet from "./components/HomeLeadMagnet";
import HomeManifesto from "./components/HomeManifesto";
import HomeEditorialGrid from "./components/HomeEditorialGrid";
import HomeCategorySpotlight from "./components/HomeCategorySpotlight";
import HomeGrowthPaths from "./components/HomeGrowthPaths";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { fetchArticles } from "@/lib/articles.server";
import { buildPageMetadata } from "@/lib/seo";

const FEATURED_ARTICLE_SLUG = "rewriting-the-future-the-secrets-to-a-long-vibrant-life";

export const metadata = buildPageMetadata({
  title: "Science-Backed Health, Nutrition & Longevity Guides",
  description:
    "Practical, research-based guides on nutrition, sleep, stress, biohacking, and longevity — the daily habits that keep you healthy for decades.",
  path: "/",
});

export const revalidate = 300;

export default async function Home() {
  const articles = await fetchArticles();
  const featured =
    articles.find((article) => article.slug === FEATURED_ARTICLE_SLUG) ?? articles[0] ?? null;
  const remainingArticles = featured
    ? articles.filter((article) => article._id !== featured._id)
    : articles;
  const secondary = remainingArticles.slice(0, 4);
  const gridArticles = remainingArticles;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HomeHero featured={featured} secondary={secondary} />
        <HomeTopics />
        <HomeManifesto />
        <HomeGrowthPaths />
        <HomeLeadMagnet />
        <HomeEditorialGrid articles={gridArticles} />
        <HomeCategorySpotlight articles={articles} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
