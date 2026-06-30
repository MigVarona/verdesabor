import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PATHS = [
  {
    label: "Sleep & recovery",
    title: "Build a better night, then a better day",
    description:
      "Start with circadian rhythm, sleep architecture, magnesium, and HRV so recovery becomes measurable.",
    links: [
      { href: "/articles/morning-sunlight-circadian-rhythm", text: "Morning sunlight" },
      { href: "/articles/sleep-architecture-performance", text: "Sleep architecture" },
      { href: "/articles/hrv-heart-rate-variability-guide", text: "HRV basics" },
    ],
  },
  {
    label: "Metabolic health",
    title: "Eat for energy, gut health, and longevity",
    description:
      "Practical nutrition guides for readers looking for fiber, fasting, omega-3s, and Mediterranean eating.",
    links: [
      { href: "/articles/fiber-gut-longevity-nutrition", text: "Fiber and longevity" },
      { href: "/articles/intermittent-fasting-metabolic-health", text: "Intermittent fasting" },
      { href: "/articles/mediterranean-diet-longevity", text: "Mediterranean diet" },
    ],
  },
  {
    label: "Longevity protocols",
    title: "The habits with the strongest upside",
    description:
      "Evidence-aware introductions to Zone 2, mitochondria, NAD+, telomeres, and healthy aging.",
    links: [
      { href: "/articles/zone-2-cardio-healthspan", text: "Zone 2 cardio" },
      { href: "/articles/mitochondria-and-longevity-the-cellular-key-to-a-longer-life", text: "Mitochondria" },
      { href: "/articles/nad-longevity-cellular-energy", text: "NAD+ research" },
    ],
  },
];

export default function HomeGrowthPaths() {
  return (
    <section className="bg-white py-16 md:py-20 border-y border-renew-border">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-3xl">
          <p className="editorial-kicker mb-2">Start here</p>
          <h2 className="font-serif text-4xl md:text-5xl text-renew-dark leading-tight text-balance">
            Popular health questions, organized into clear paths
          </h2>
          <p className="mt-4 text-renew-muted text-lg leading-relaxed">
            These reading paths connect related articles so new readers can move from curiosity to a practical next step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PATHS.map((path) => (
            <article key={path.label} className="border border-renew-border bg-renew-paper p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-renew-sage">{path.label}</p>
              <h3 className="mt-3 text-xl font-bold leading-snug text-renew-dark">{path.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-renew-muted">{path.description}</p>
              <div className="mt-6 flex flex-col gap-2">
                {path.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center justify-between gap-3 border-t border-renew-border py-3 text-sm font-semibold text-renew-dark hover:text-renew-sage"
                  >
                    {link.text}
                    <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
