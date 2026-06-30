export const SITE_NAME = "RENEW";
export const SITE_TAGLINE = "Healthy Living for a Better Future";
export const SITE_DESCRIPTION =
  "Science-backed health guides on nutrition, sleep, biohacking, neuroscience, wellness, and longevity.";

export const CATEGORIES = [
  {
    slug: "nutrition",
    label: "Nutrition",
    description: "Evidence-based guides on metabolic health, gut health, fasting, omega-3s, and sustainable eating habits.",
  },
  {
    slug: "biohacking",
    label: "Biohacking",
    description: "Practical guides to sleep, HRV, cold exposure, red light therapy, recovery, and health tracking.",
  },
  {
    slug: "neuroscience",
    label: "Neuroscience",
    description: "Understand stress, memory, motivation, mood, cognition, and the habits that shape the brain.",
  },
  {
    slug: "wellness",
    label: "Wellness",
    description: "Breathwork, stress relief, mindful movement, digital detox, recovery, and everyday mental well-being.",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    description: "Simple routines for sunlight, mornings, alcohol reduction, focus, and healthier daily choices.",
  },
  {
    slug: "longevity",
    label: "Longevity",
    description: "Healthspan strategies covering Zone 2 cardio, mitochondria, NAD+, telomeres, and healthy aging.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
