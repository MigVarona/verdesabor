import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Nutrition Guides",
  description: "Evidence-based guides on metabolic health, gut health, fasting, omega-3s, and sustainable eating habits.",
  path: "/nutrition",
});

export default function NutritionPage() {
  return <CategoryPage category="nutrition" />;
}
