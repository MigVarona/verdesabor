const UNSPLASH_RE = /images\.unsplash\.com\/((?:flagged\/)?photo-[^/?]+)/i;

const UNSPLASH_PAGE_IMAGE_IDS: Record<string, string> = {
  P6mdg0z5tHc: "photo-1524287515726-d6bd6805ad27",
  mNGaaLeWEp0: "photo-1477332552946-cfb384aeaf1c",
};

export type ImageVariant = "thumb" | "card" | "hero" | "inline";

const VARIANTS: Record<ImageVariant, { w: number; h: number; q: number }> = {
  thumb: { w: 160, h: 160, q: 70 },
  card: { w: 640, h: 400, q: 75 },
  hero: { w: 1200, h: 675, q: 80 },
  inline: { w: 960, h: 600, q: 80 },
};

export const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&h=675&q=80&fm=webp";

function buildUnsplashUrl(photoPath: string, variant: ImageVariant): string {
  const { w, h, q } = VARIANTS[variant];
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}&fm=webp`;
}

export function optimizeImageUrl(url: string | undefined, variant: ImageVariant): string {
  if (!url) {
    return variant === "thumb" || variant === "card"
      ? buildUnsplashUrl("photo-1559757175-0eb30cd8c063", variant)
      : DEFAULT_HERO_IMAGE;
  }

  if (url.startsWith("/")) return url;

  const match = url.match(UNSPLASH_RE);
  if (match) return buildUnsplashUrl(match[1], variant);

  const unsplashPageId = getUnsplashPageId(url);
  if (unsplashPageId && UNSPLASH_PAGE_IMAGE_IDS[unsplashPageId]) {
    return buildUnsplashUrl(UNSPLASH_PAGE_IMAGE_IDS[unsplashPageId], variant);
  }

  return url;
}

/** Next/Image loader — serves WebP directly from Unsplash CDN (faster than double optimization). */
export function articleImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const match = src.match(UNSPLASH_RE);
  if (!match) return src;

  const q = quality ?? 75;
  return `https://images.unsplash.com/${match[1]}?auto=format&fit=crop&w=${width}&q=${q}&fm=webp`;
}

function getUnsplashPageId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "unsplash.com" && !parsed.hostname.endsWith(".unsplash.com")) {
      return undefined;
    }

    return parsed.pathname.split("-").pop() || undefined;
  } catch {
    return undefined;
  }
}
