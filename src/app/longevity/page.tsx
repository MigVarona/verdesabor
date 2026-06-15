import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Longevity",
  description: "Strategies to extend healthspan and age with vitality.",
  path: "/longevity",
});

export default function LongevityPage() {
  return <CategoryPage category="longevity" />;
}
