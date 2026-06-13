import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ArrowLeft, Check } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getGuideBySlug, GUIDES } from "@/lib/guides";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100">
          <div className="h-1.5 bg-renew-accent" />
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-renew-dark transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-renew-dark bg-renew-accent px-3 py-1 rounded-full mb-4">
              Free guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-renew-dark leading-tight text-balance">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">{guide.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={guide.pdfPath}
                download
                className="inline-flex items-center justify-center gap-2 bg-renew-dark text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <span className="inline-flex items-center text-sm text-gray-400 sm:pl-2">
                {guide.readTime} · No email required
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-10 shadow-card">
            <h2 className="text-lg font-bold text-renew-dark mb-3">How to use this guide</h2>
            <p className="text-gray-600 leading-relaxed">{guide.intro}</p>
          </div>

          <div className="space-y-8">
            {guide.habits.map((habit) => (
              <article
                key={habit.number}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card"
              >
                <div className="h-1 bg-renew-accent" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-11 h-11 rounded-full bg-renew-accent text-renew-dark font-bold text-base flex items-center justify-center">
                      {habit.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-renew-dark leading-snug">
                        {habit.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold text-renew-sage">{habit.summary}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-gray-600 leading-relaxed text-base">{habit.detail}</p>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                      This week
                    </p>
                    <ul className="space-y-2.5">
                      {habit.actions.map((action) => (
                        <li key={action} className="flex items-start gap-3 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-renew-sage flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 p-8 md:p-10 rounded-2xl bg-renew-dark text-white text-center">
            <div className="w-10 h-1 bg-renew-accent mx-auto mb-6" />
            <h2 className="text-2xl font-bold">Start with one habit this week</h2>
            <p className="mt-3 text-gray-300 max-w-lg mx-auto leading-relaxed">
              Pick the easiest win, run it for seven days, then layer the next. Save this guide as a PDF to revisit anytime.
            </p>
            <a
              href={guide.pdfPath}
              download
              className="inline-flex items-center gap-2 mt-6 bg-renew-accent text-renew-dark font-semibold text-sm px-6 py-3.5 rounded-full hover:brightness-95 transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
