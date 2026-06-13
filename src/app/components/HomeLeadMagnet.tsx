import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { SEVEN_HABITS_GUIDE } from "@/lib/guides";

export default function HomeLeadMagnet() {
  const guide = SEVEN_HABITS_GUIDE;

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-renew-accent" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-renew-accent/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-10 lg:p-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-renew-dark bg-renew-accent px-3 py-1.5 rounded-full mb-5">
                <FileText className="w-3.5 h-3.5" />
                Free guide
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-renew-dark leading-tight text-balance">
                {guide.title}
              </h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl">
                {guide.description}
              </p>
              <ul className="mt-6 space-y-2">
                {["PDF download — no signup required", "7 habits you can start this week", "Built from RENEW editorial research"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-renew-accent flex-shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href={guide.pdfPath}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-renew-dark text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <Link
                  href={`/resources/${guide.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-renew-dark font-semibold text-sm px-6 py-3.5 rounded-full hover:border-renew-accent hover:bg-white transition-colors"
                >
                  Read online
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-renew-accent/20 rounded-2xl rotate-3 scale-[1.02]" />
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-card-hover overflow-hidden">
                  <div className="h-2 bg-renew-accent" />
                  <div className="p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-renew-sage mb-3">RENEW Guide</p>
                    <p className="text-2xl font-bold text-renew-dark leading-snug">{guide.title}</p>
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed">{guide.subtitle}</p>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{guide.readTime} read</span>
                      <span className="text-xs font-semibold text-renew-dark bg-renew-accent/30 px-2.5 py-1 rounded">
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
