import { Smartphone, BookOpenCheck, ListChecks, BellRing, Download } from "lucide-react";

const FEATURES = [
  {
    icon: ListChecks,
    title: "Practical protocols",
    text: "Step-by-step guidance turns health research into clear, usable routines for everyday life.",
  },
  {
    icon: BookOpenCheck,
    title: "Evidence stays visible",
    text: "Each topic is grounded in peer-reviewed sources, making the scientific basis easy to explore and verify.",
  },
  {
    icon: BellRing,
    title: "Small reminders, better consistency",
    text: "Built-in prompts help translate intention into repetition — supporting the routines that matter most.",
  },
];

const APK_DOWNLOAD_URL =
  "https://github.com/MigVarona/verdesabor/releases/latest/download/Renew.apk";

export default function HomeAppPromo() {
  return (
    <section className="py-16 md:py-24 bg-renew-cream text-renew-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-renew-dark bg-renew-accent px-3 py-1.5 rounded-full mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              New · The RENEW app
            </span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
              Introducing the RENEW app
            </h2>
            <p className="mt-6 text-renew-muted text-lg leading-relaxed max-w-xl">
              A new product experience designed to bring evidence-based health
              practices into a calmer, more practical daily format — from
              reading to action.
            </p>
            <ul className="mt-10 space-y-6">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-renew-dark flex items-center justify-center">
                    <Icon className="w-5 h-5 text-renew-accent" />
                  </span>
                  <div>
                    <p className="font-semibold text-renew-dark">{title}</p>
                    <p className="mt-1 text-sm text-renew-muted leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={APK_DOWNLOAD_URL}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-renew-accent px-5 py-3 text-sm font-bold uppercase tracking-widest text-renew-dark transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-renew-accent"
              >
                <Download className="h-4 w-4" />
                Try Android beta
              </a>
              <span className="text-sm text-renew-muted">Direct APK install · 108 MB</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
              <div className="absolute inset-x-8 top-10 bottom-8 rounded-[3rem] bg-renew-sage/10 blur-3xl" aria-hidden />
              <img
                src="/01.png"
                alt="RENEW app mobile mockup"
                width={1122}
                height={1402}
                className="relative z-10 h-auto w-full rounded-[1.75rem] shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
