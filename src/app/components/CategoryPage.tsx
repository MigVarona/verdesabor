import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import CategoryHeader from "../components/CategoryHeader";
import CategoryArticles from "../components/CategoryArticles";
import AdSlot from "../components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";

interface CategoryPageProps {
  category: string;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CategoryHeader category={category} />
        <div className="container mx-auto px-4 py-4">
          <AdSlot id={`${AD_SLOTS.leaderboard}-${category}`} format="leaderboard" />
        </div>
        <CategoryArticles category={category} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
