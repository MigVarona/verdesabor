import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Neuroscience Guides",
  description: "Understand stress, memory, motivation, mood, cognition, and the habits that shape the brain.",
  path: "/neuroscience",
});

export default function NeurosciencePage() {
  return <CategoryPage category="neuroscience" />;
}
