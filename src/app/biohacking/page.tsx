import CategoryPage from "../components/CategoryPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Biohacking Guides",
  description: "Practical guides to sleep, HRV, cold exposure, red light therapy, recovery, and health tracking.",
  path: "/biohacking",
});

export default function BiohackingPage() {
  return <CategoryPage category="biohacking" />;
}
