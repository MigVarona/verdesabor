import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Longevity",
  description: "Strategies to extend healthspan and age with vitality.",
  alternates: { canonical: "/longevity" },
};

export default function LongevityPage() {
  return <CategoryPage category="longevity" />;
}
