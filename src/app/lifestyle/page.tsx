import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Lifestyle",
  description: "Habits, routines, and choices that shape a healthier life.",
  alternates: { canonical: "/lifestyle" },
};

export default function LifestylePage() {
  return <CategoryPage category="lifestyle" />;
}
