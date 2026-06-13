import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryGrid from "./components/CategoryGrid";
import TrendingArticles from "./components/TrendingArticles";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import AdSlot from "./components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";
import { fetchArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await fetchArticles();
  const featured = articles[0] ?? null;
  const latest = articles.slice(1, 7);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-4">
          <AdSlot id={AD_SLOTS.leaderboard} format="leaderboard" />
        </div>
        <HeroSection featured={featured} />
        <CategoryGrid />
        <TrendingArticles articles={latest} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
