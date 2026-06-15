/**
 * Global affiliate monetization — priority order:
 * 1. Direct affiliate URL on the product (highest commission, manual override)
 * 2. Amazon Associate tag (if URL is Amazon and AMAZON_ASSOCIATE_TAG is set)
 * 3. Sovrn Commerce wrapper (one key monetizes thousands of merchants)
 * 4. Plain destination URL with UTM params
 */

export function appendUtmParams(url: string, articleSlug?: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("utm_source")) {
      parsed.searchParams.set("utm_source", "renewhabits");
    }
    if (!parsed.searchParams.has("utm_medium")) {
      parsed.searchParams.set("utm_medium", "affiliate");
    }
    if (articleSlug && !parsed.searchParams.has("utm_campaign")) {
      parsed.searchParams.set("utm_campaign", articleSlug);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function isAmazonUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes("amazon.") || host === "amzn.to" || host === "a.co";
  } catch {
    return false;
  }
}

export function applyAmazonAssociateTag(url: string, tag: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("tag", tag);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function wrapWithSovrn(destinationUrl: string, apiKey: string, articleSlug?: string): string {
  const params = new URLSearchParams({
    key: apiKey,
    u: destinationUrl,
  });
  if (articleSlug) {
    params.set("cuid", articleSlug);
    params.set("utm_source", "renewhabits");
    params.set("utm_medium", "affiliate");
    params.set("utm_campaign", articleSlug);
  }
  return `https://sovrn.co?${params.toString()}`;
}

export function monetizeOutboundUrl(
  destinationUrl: string,
  options?: { articleSlug?: string; directAffiliateUrl?: string }
): string {
  if (options?.directAffiliateUrl) {
    return appendUtmParams(options.directAffiliateUrl, options.articleSlug);
  }

  const amazonTag = process.env.AMAZON_ASSOCIATE_TAG;
  if (amazonTag && isAmazonUrl(destinationUrl)) {
    return applyAmazonAssociateTag(appendUtmParams(destinationUrl, options?.articleSlug), amazonTag);
  }

  const sovrnKey = process.env.SOVRN_COMMERCE_KEY;
  if (sovrnKey) {
    return wrapWithSovrn(destinationUrl, sovrnKey, options?.articleSlug);
  }

  return appendUtmParams(destinationUrl, options?.articleSlug);
}
