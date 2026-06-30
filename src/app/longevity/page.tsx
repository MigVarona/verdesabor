import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Longevity Guides",
  description: "Healthspan strategies covering Zone 2 cardio, mitochondria, NAD+, telomeres, and healthy aging.",
  path: "/longevity",
});

export default function LongevityPage() {
  return <CategoryPage category="longevity" />;
}
