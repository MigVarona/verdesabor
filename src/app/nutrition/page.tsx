import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Nutrition",
  description: "Evidence-based guides on food, macros, and sustainable eating habits.",
  path: "/nutrition",
});

export default function NutritionPage() {
  return <CategoryPage category="nutrition" />;
}
