export default function HomeManifesto() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-8 h-1 bg-renew-accent mx-auto mb-8" />
          <p className="font-serif text-2xl md:text-3xl text-renew-dark leading-relaxed text-balance">
            We translate complex health science into clear, actionable insight — so you can make better decisions about your body and your future.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {["Evidence-based", "Independent", "Free to read"].map((pill) => (
              <span
                key={pill}
                className="text-xs font-semibold uppercase tracking-widest text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
