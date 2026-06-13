export const SITE_NAME = "RENEW";
export const SITE_TAGLINE = "Healthy Living for a Better Future";
export const SITE_DESCRIPTION =
  "Insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.";

export const CATEGORIES = [
  {
    slug: "nutrition",
    label: "Nutrition",
    description: "Evidence-based guides on food, macros, and sustainable eating habits.",
    icon: "🥗",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    slug: "biohacking",
    label: "Biohacking",
    description: "Optimize your biology with science-backed protocols and tools.",
    icon: "⚡",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    slug: "neuroscience",
    label: "Neuroscience",
    description: "Understand your brain, cognition, and mental performance.",
    icon: "🧠",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    slug: "wellness",
    label: "Wellness",
    description: "Holistic practices for balance, recovery, and daily well-being.",
    icon: "🌿",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    description: "Habits, routines, and choices that shape a healthier life.",
    icon: "☀️",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    slug: "longevity",
    label: "Longevity",
    description: "Strategies to extend healthspan and age with vitality.",
    icon: "🧬",
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const AD_SLOTS = {
  leaderboard: "ad-leaderboard",
  sidebar: "ad-sidebar",
  inContent: "ad-in-content",
  footer: "ad-footer",
} as const;
