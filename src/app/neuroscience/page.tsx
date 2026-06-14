import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Neuroscience",
  description: "Understand your brain, cognition, and mental performance.",
  alternates: { canonical: "/neuroscience" },
};

export default function NeurosciencePage() {
  return <CategoryPage category="neuroscience" />;
}
