import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Neuroscience",
  description: "Understand your brain, cognition, and mental performance.",
  path: "/neuroscience",
});

export default function NeurosciencePage() {
  return <CategoryPage category="neuroscience" />;
}
