import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Wellness Guides",
  description: "Breathwork, stress relief, mindful movement, digital detox, recovery, and everyday mental well-being.",
  path: "/wellness",
});

export default function WellnessPage() {
  return <CategoryPage category="wellness" />;
}
