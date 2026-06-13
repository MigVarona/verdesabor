import { CATEGORIES } from "@/lib/constants";

interface CategoryHeaderProps {
  category: string;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const meta = CATEGORIES.find((c) => c.slug === category.toLowerCase());

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <span className="text-3xl mb-3 block">{meta?.icon || "📄"}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-renew-dark capitalize">
          {meta?.label || category}
        </h1>
        {meta?.description && (
          <p className="mt-3 text-gray-500 text-lg max-w-2xl">{meta.description}</p>
        )}
      </div>
    </div>
  );
}
