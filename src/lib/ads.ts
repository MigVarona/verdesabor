export type AdFormat = "leaderboard" | "sidebar" | "in-content" | "footer";

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5806881993295990";

const FORMAT_SLOT_ENV: Record<AdFormat, string | undefined> = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

/** Generic slot fallback if you use one unit for every placement */
const ADSENSE_SLOT_DEFAULT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

export function getAdSenseSlotId(format: AdFormat): string | undefined {
  return FORMAT_SLOT_ENV[format] || ADSENSE_SLOT_DEFAULT;
}

export function isAdSenseConfigured(): boolean {
  if (!ADSENSE_CLIENT) return false;
  return Boolean(ADSENSE_SLOT_DEFAULT || Object.values(FORMAT_SLOT_ENV).some(Boolean));
}
