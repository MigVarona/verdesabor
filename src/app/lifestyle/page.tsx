import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Lifestyle Habits",
  description: "Simple routines for sunlight, mornings, alcohol reduction, focus, and healthier daily choices.",
  path: "/lifestyle",
});

export default function LifestylePage() {
  return <CategoryPage category="lifestyle" />;
}
