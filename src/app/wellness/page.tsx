import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Wellness",
  description: "Holistic practices for balance, recovery, and daily well-being.",
  path: "/wellness",
});

export default function WellnessPage() {
  return <CategoryPage category="wellness" />;
}
