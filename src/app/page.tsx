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

export const revalidate = 300;

export default async function Home() {
  const articles = await fetchArticles();
  const featured = articles[0] ?? null;
  const secondary = articles.slice(1, 5);
  const gridArticles = articles.slice(1);

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
