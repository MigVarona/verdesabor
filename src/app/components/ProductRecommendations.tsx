import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import {
  type AffiliateProduct,
  BADGE_LABELS,
  getAffiliateLinkPath,
} from "@/lib/affiliates";

interface ProductRecommendationsProps {
  products: AffiliateProduct[];
  articleSlug: string;
}

export default function ProductRecommendations({ products, articleSlug }: ProductRecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <section
      id="recommended-gear"
      className="my-10 scroll-mt-28 border border-renew-border bg-white"
      aria-labelledby="product-picks-heading"
    >
      <div className="border-b border-renew-border bg-renew-mist/40 px-5 py-4 md:px-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-renew-sage" aria-hidden="true" />
          <h2
            id="product-picks-heading"
            className="text-sm font-bold uppercase tracking-[0.18em] text-renew-dark"
          >
            Recommended gear
          </h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-renew-muted">
          RENEW may earn a commission if you purchase through these links. Recommendations are
          editorially chosen and do not influence our health conclusions.{" "}
          <Link href="/editorial-policy#commercial" className="text-renew-sage underline underline-offset-2">
            Learn more
          </Link>
          .
        </p>
      </div>

      <ul className="divide-y divide-renew-border">
        {products.map((product) => (
          <li key={product.id} className="px-5 py-5 md:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-renew-dark">{product.name}</h3>
                  {product.badge && (
                    <span className="inline-flex items-center rounded-full bg-renew-accent/30 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-renew-dark">
                      {BADGE_LABELS[product.badge]}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-renew-muted">{product.description}</p>
                {product.note && (
                  <p className="mt-2 text-xs leading-relaxed text-renew-muted/80 italic">{product.note}</p>
                )}
              </div>
              <a
                href={getAffiliateLinkPath(product.id, articleSlug)}
                rel="nofollow sponsored"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-renew-dark bg-renew-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-renew-ink"
              >
                View product
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
