export const SITE_NAME = "RENEW";
export const SITE_TAGLINE = "Healthy Living for a Better Future";
export const SITE_DESCRIPTION =
  "Insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.";

export const CATEGORIES = [
  {
    slug: "nutrition",
    label: "Nutrition",
    description: "Evidence-based guides on food, macros, and sustainable eating habits.",
  },
  {
    slug: "biohacking",
    label: "Biohacking",
    description: "Optimize your biology with science-backed protocols and tools.",
  },
  {
    slug: "neuroscience",
    label: "Neuroscience",
    description: "Understand your brain, cognition, and mental performance.",
  },
  {
    slug: "wellness",
    label: "Wellness",
    description: "Holistic practices for balance, recovery, and daily well-being.",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    description: "Habits, routines, and choices that shape a healthier life.",
  },
  {
    slug: "longevity",
    label: "Longevity",
    description: "Strategies to extend healthspan and age with vitality.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
