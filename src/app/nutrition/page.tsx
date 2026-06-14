import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Nutrition",
  description: "Evidence-based guides on food, macros, and sustainable eating habits.",
  alternates: { canonical: "/nutrition" },
};

export default function NutritionPage() {
  return <CategoryPage category="nutrition" />;
}
