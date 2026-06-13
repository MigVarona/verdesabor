export interface GuideHabit {
  number: number;
  title: string;
  summary: string;
  detail: string;
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pdfPath: string;
  readTime: string;
  habits: GuideHabit[];
}

export const SEVEN_HABITS_GUIDE: Guide = {
  slug: "7-daily-habits-healthspan",
  title: "7 Daily Habits for a Longer Healthspan",
  subtitle: "A practical RENEW guide to habits that compound over years — not days.",
  description:
    "Science-backed daily practices covering light, movement, nutrition, sleep, recovery, and focus. No extreme protocols — just clarity you can start tomorrow.",
  pdfPath: "/downloads/renew-7-daily-habits-healthspan.pdf",
  readTime: "12 min",
  habits: [
    {
      number: 1,
      title: "Get morning sunlight within 60 minutes of waking",
      summary: "Anchor your circadian clock before screens take over.",
      detail:
        "Ten to fifteen minutes of outdoor light (longer on cloudy days) signals your brain to suppress melatonin and raise cortisol at the right time. This improves evening sleepiness, mood, and metabolic rhythm. A walk counts. Standing on a balcony counts. Sunglasses off, unless medically necessary.",
    },
    {
      number: 2,
      title: "Move at Zone 2 for at least 30 minutes most days",
      summary: "Build the aerobic base that supports everything else.",
      detail:
        "Zone 2 is a pace where you can hold a conversation but not sing — typically 60–70% of max heart rate. Brisk walking, easy cycling, or incline treadmill work counts. Aim for roughly 150 minutes per week. This supports mitochondrial health, insulin sensitivity, and cardiovascular longevity.",
    },
    {
      number: 3,
      title: "Eat a protein-forward first meal",
      summary: "Stabilize energy and reduce impulsive snacking later.",
      detail:
        "Target 25–40g of protein at your first substantial meal: eggs, Greek yogurt, fish, legumes, or a clean protein shake. Protein increases satiety, supports muscle maintenance, and reduces the blood-sugar rollercoaster that drives afternoon crashes.",
    },
    {
      number: 4,
      title: "Keep a consistent sleep and wake window",
      summary: "Regularity beats perfection.",
      detail:
        "Going to bed and waking within the same 30-minute window — even on weekends — strengthens circadian alignment. Prioritize 7–9 hours. Cool, dark room. No work in bed. Consistency is the highest-leverage sleep intervention for most people.",
    },
    {
      number: 5,
      title: "Wind down with a magnesium-rich evening ritual",
      summary: "Support relaxation without relying on willpower alone.",
      detail:
        "Magnesium glycinate or citrate (200–400mg, if tolerated) may support sleep quality in those with low intake. Pair it with dim lights, herbal tea, light stretching, or journaling. The ritual matters as much as the supplement.",
    },
    {
      number: 6,
      title: "Use brief cold exposure 2–3 times per week",
      summary: "A controlled stressor that builds resilience.",
      detail:
        "End a warm shower with 30–90 seconds of cool water, or try a short cold plunge if experienced. Start small. Focus on slow nasal breathing. Cold exposure may support mood, alertness, and stress tolerance — but consistency and safety come first.",
    },
    {
      number: 7,
      title: "Protect a digital sunset before bed",
      summary: "Give your brain an off-ramp from stimulation.",
      detail:
        "Set a screens-down time 60 minutes before sleep: phone in another room, amber lighting, paper book, conversation, or mobility work. Blue light is only part of the story — mental stimulation and stress notifications are often the bigger problem.",
    },
  ],
};

export const GUIDES = [SEVEN_HABITS_GUIDE];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
