import { CATEGORIES } from "@/lib/constants";

interface CategoryHeaderProps {
  category: string;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const meta = CATEGORIES.find((c) => c.slug === category.toLowerCase());

  return (
    <div className="bg-renew-ink text-white border-b border-renew-dark">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_16rem] gap-8 md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-renew-accent mb-4">RENEW Library</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-none text-white">
              {meta?.label || category}
            </h1>
            {meta?.description && (
              <p className="mt-5 text-white/65 text-lg leading-relaxed max-w-2xl">{meta.description}</p>
            )}
          </div>
          <div className="hidden md:block border-l border-white/15 pl-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Editorial focus</p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Practical reporting, research summaries, and habit-level guidance from the RENEW archive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
