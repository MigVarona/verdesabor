import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { CATEGORIES, SITE_TAGLINE } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about RENEW — our mission to deliver science-backed health, wellness, and longevity content.",
};

const VALUES = [
  {
    title: "Evidence first",
    text: "We prioritize credible sources and expert consensus over trends and hype.",
  },
  {
    title: "Practical guidance",
    text: "Every article is written to help you make informed decisions you can act on today.",
  },
  {
    title: "Transparency",
    text: "We disclose AI assistance, sources, sponsorships, and the limits of our health content clearly.",
  },
];

const STATS = [
  { value: "6", label: "Topic areas" },
  { value: "Weekly", label: "New insights" },
  { value: "100%", label: "Free to read" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-renew-dark text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-renew-accent mb-4">About RENEW</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
              {SITE_TAGLINE}
            </h1>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
              RENEW is an independent health publication focused on nutrition, biohacking,
              neuroscience, and longevity — written for readers who want clarity, not clickbait.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-l border-gray-700 pl-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="section-title">Our approach</h2>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                Health information online is often contradictory, oversimplified, or designed to sell
                rather than inform. RENEW exists to cut through that noise with carefully researched,
                accessible content across six core topics.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map((item, i) => (
                <div key={item.title} className="p-6 border border-gray-200 rounded-xl bg-white">
                  <span className="text-xs font-bold text-renew-sage">0{i + 1}</span>
                  <h3 className="font-bold text-renew-dark text-lg mt-3 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title mb-8">What we cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group p-5 border border-gray-200 rounded-xl hover:border-renew-sage/40 transition-colors"
                >
                  <h3 className="font-semibold text-renew-dark group-hover:text-renew-sage transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div id="contact" className="p-8 md:p-10 border border-gray-200 rounded-2xl bg-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-3">Contact</p>
                <h2 className="text-2xl font-bold text-renew-dark mb-4">Get in touch</h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Questions, collaboration proposals, or corrections — we read every message and aim
                  to respond within a few business days.
                </p>
                <a
                  href="mailto:hello@renewhabits.com"
                  className="inline-block text-renew-dark font-semibold border-b-2 border-renew-accent hover:text-renew-sage transition-colors"
                >
                  hello@renewhabits.com
                </a>
              </div>

              <div className="p-8 md:p-10 border border-gray-200 rounded-2xl bg-gray-50">
                <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-3">Editorial</p>
                <h2 className="text-2xl font-bold text-renew-dark mb-4">Standards & policies</h2>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Editorial Policy", href: "/editorial-policy" },
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Cookie Policy", href: "/cookies" },
                    { label: "Medical Disclaimer", href: "/disclaimer" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-renew-sage transition-colors underline underline-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                  RENEW content is for informational purposes only and does not replace professional
                  medical advice. See our full disclaimer for details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
