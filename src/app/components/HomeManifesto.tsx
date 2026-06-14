export default function HomeManifesto() {
  return (
    <section className="py-16 md:py-20 bg-renew-mist border-b border-renew-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-8 md:gap-12 items-start">
            <div>
              <div className="w-10 h-1 bg-renew-dark mb-5" />
              <p className="editorial-kicker">The RENEW Standard</p>
            </div>
            <div>
          <p className="font-serif text-3xl md:text-5xl text-renew-dark leading-[1.08] text-balance">
            We translate complex health science into clear, actionable insight — so you can make better decisions about your body and your future.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {["Evidence-based", "Independent", "Free to read"].map((pill) => (
              <span
                key={pill}
                className="text-xs font-semibold uppercase tracking-widest text-renew-dark bg-renew-paper border border-renew-border px-4 py-2 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
