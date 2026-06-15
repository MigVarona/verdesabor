import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Biohacking",
  description: "Optimize your biology with science-backed protocols and tools.",
  path: "/biohacking",
});

export default function BiohackingPage() {
  return <CategoryPage category="biohacking" />;
}
