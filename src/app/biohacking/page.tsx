import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Biohacking",
  description: "Optimize your biology with science-backed protocols and tools.",
  alternates: { canonical: "/biohacking" },
};

export default function BiohackingPage() {
  return <CategoryPage category="biohacking" />;
}
