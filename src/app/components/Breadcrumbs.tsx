import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export default function Breadcrumbs({ items, variant = "dark" }: BreadcrumbsProps) {
  const isLight = variant === "light";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${isLight ? "text-white/65" : "text-gray-500"}`}>
        <li>
          <Link href="/" className="hover:text-renew-sage transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className={`w-3.5 h-3.5 ${isLight ? "text-white/35" : "text-gray-300"}`} />
            {item.href ? (
              <Link href={item.href} className="hover:text-renew-sage transition-colors capitalize">
                {item.label}
              </Link>
            ) : (
              <span className={`${isLight ? "text-white/85" : "text-gray-700"} font-medium line-clamp-1`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
