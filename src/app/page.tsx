import Header from "./components/Header";
import HomeHero from "./components/HomeHero";
import HomeTopics from "./components/HomeTopics";
import HomeLeadMagnet from "./components/HomeLeadMagnet";
import HomeManifesto from "./components/HomeManifesto";
import HomeEditorialGrid from "./components/HomeEditorialGrid";
import HomeCategorySpotlight from "./components/HomeCategorySpotlight";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import AdSlot from "./components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";
import { fetchArticles } from "@/lib/articles.server";
import { buildPageMetadata } from "@/lib/seo";

const FEATURED_ARTICLE_SLUG = "rewriting-the-future-the-secrets-to-a-long-vibrant-life";

export const metadata = buildPageMetadata({
  title: "Healthy Living for a Better Future",
  description:
    "Discover science-backed insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
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
        <HomeLeadMagnet />
        <HomeEditorialGrid articles={gridArticles} />
        <div className="container mx-auto px-4 py-10">
          <AdSlot id={AD_SLOTS.leaderboard} format="leaderboard" />
        </div>
        <HomeCategorySpotlight articles={articles} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
