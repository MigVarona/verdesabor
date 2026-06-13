import guideData from "../../content/guides/7-daily-habits-healthspan.json";

export interface GuideHabit {
  number: number;
  title: string;
  summary: string;
  detail: string;
  actions: string[];
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pdfPath: string;
  readTime: string;
  intro: string;
  habits: GuideHabit[];
}

export const SEVEN_HABITS_GUIDE = guideData as Guide;

export const GUIDES: Guide[] = [SEVEN_HABITS_GUIDE];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
