export type ProductBadge = "editors-pick" | "budget-pick" | "premium";

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  /** Brand/product page — monetized globally via Sovrn or Amazon tag in /go redirect */
  url: string;
  /** Optional override when a direct program pays more than the global wrapper */
  affiliateUrl?: string;
  badge?: ProductBadge;
  note?: string;
}

/** Central registry — keep normal brand URLs; monetization runs in /go via env keys */
export const AFFILIATE_REGISTRY: Record<string, AffiliateProduct> = {
  "joovv-solo": {
    id: "joovv-solo",
    name: "Joovv Solo 3.0",
    description:
      "Full-body red light panel with published irradiance specs — a common clinical reference point for home photobiomodulation.",
    url: "https://joovv.com/products/joovv-solo-3-0",
    affiliateUrl: "https://sovrn.co/5cf3qum",
    badge: "editors-pick",
    note: "Higher irradiance than most consumer panels; verify distance and session length per manufacturer guidelines.",
  },
  "mito-red-mito-pro": {
    id: "mito-red-mito-pro",
    name: "MitoRED MitoPRO Series",
    description:
      "Mid-range home panel with transparent power output specs — a solid alternative if you want strong value per watt.",
    url: "https://mitoredlight.com/collections/mitopro-series",
    badge: "budget-pick",
  },
  "oura-ring": {
    id: "oura-ring",
    name: "Oura Ring",
    description:
      "Tracks HRV, sleep stages, and recovery trends from a ring form factor — widely used for morning readiness scores.",
    url: "https://ouraring.com",
    badge: "editors-pick",
  },
  "whoop-4": {
    id: "whoop-4",
    name: "WHOOP 4.0",
    description:
      "Strain and recovery coaching with continuous HRV monitoring — strong for athletes who want daily training guidance.",
    url: "https://www.whoop.com",
    badge: "premium",
  },
  "polar-h10": {
    id: "polar-h10",
    name: "Polar H10 Heart Rate Monitor",
    description:
      "Chest-strap HRM with excellent accuracy for Zone 2 training — pairs with most fitness apps and bikes.",
    url: "https://www.polar.com/en/products/accessories/h10_heart_rate_sensor",
    badge: "editors-pick",
    note: "More accurate than wrist optical sensors for steady-state cardio pacing.",
  },
  "garmin-forerunner": {
    id: "garmin-forerunner",
    name: "Garmin Forerunner",
    description:
      "GPS watch with wrist-based HRV and training load metrics — good all-in-one for runners and cyclists.",
    url: "https://www.garmin.com/en-US/c/sports-fitness/running/",
    badge: "budget-pick",
  },
  "thorne-magnesium-bisglycinate": {
    id: "thorne-magnesium-bisglycinate",
    name: "Thorne Magnesium Bisglycinate",
    description:
      "Well-absorbed glycinate form, gentle on digestion — a common choice for evening sleep support protocols.",
    url: "https://www.thorne.com/products/dp/magnesium-bisglycinate",
    badge: "editors-pick",
    note: "Food-first when possible; supplement only if dietary intake is insufficient.",
  },
  "life-extension-magnesium": {
    id: "life-extension-magnesium",
    name: "Life Extension Neuro-Mag",
    description:
      "Magnesium L-threonate formulation studied for cognitive support — threonate crosses the blood-brain barrier.",
    url: "https://www.lifeextension.com/vitamins-supplements/item02040/neuro-mag-magnesium-l-threonate",
    badge: "premium",
  },
};

export const BADGE_LABELS: Record<ProductBadge, string> = {
  "editors-pick": "Editor's pick",
  "budget-pick": "Best value",
  premium: "Premium",
};

export function resolveProductPicks(ids: string[]): AffiliateProduct[] {
  return ids
    .map((id) => AFFILIATE_REGISTRY[id])
    .filter((p): p is AffiliateProduct => Boolean(p));
}

import { monetizeOutboundUrl } from "@/lib/affiliate-monetization";

export function getAffiliateRedirectUrl(productId: string, articleSlug?: string): string | null {
  const product = AFFILIATE_REGISTRY[productId];
  if (!product) return null;

  return monetizeOutboundUrl(product.url, {
    articleSlug,
    directAffiliateUrl: product.affiliateUrl,
  });
}

export function getAffiliateLinkPath(productId: string, articleSlug?: string): string {
  const params = articleSlug ? `?from=${encodeURIComponent(articleSlug)}` : "";
  return `/go/${productId}${params}`;
}
