import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Lifestyle",
  description: "Habits, routines, and choices that shape a healthier life.",
  path: "/lifestyle",
});

export default function LifestylePage() {
  return <CategoryPage category="lifestyle" />;
}
