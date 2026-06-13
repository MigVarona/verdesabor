import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { CATEGORIES, SITE_TAGLINE } from "@/lib/constants";
import Link from "next/link";
import { Mail, Target, BookOpen, Users } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about RENEW — our mission to deliver science-backed health, wellness, and longevity content.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <p className="text-renew-sage font-semibold text-sm uppercase tracking-widest mb-3">About RENEW</p>
            <h1 className="text-3xl md:text-5xl font-bold text-renew-dark leading-tight max-w-3xl">
              {SITE_TAGLINE}
            </h1>
            <p className="mt-5 text-gray-500 text-lg max-w-2xl leading-relaxed">
              We believe everyone deserves access to clear, evidence-based information about health, performance, and longevity — without the noise.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To make complex health science accessible and actionable for everyone seeking a better, longer life.",
              },
              {
                icon: BookOpen,
                title: "Our Content",
                text: "Every article is researched and written to provide practical insights you can apply to your daily routine.",
              },
              {
                icon: Users,
                title: "Our Community",
                text: "Join thousands of readers exploring nutrition, biohacking, neuroscience, and longevity together.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
                <div className="w-10 h-10 rounded-lg bg-renew-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-renew-dark" />
                </div>
                <h2 className="font-bold text-renew-dark text-lg mb-2">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl">
            <h2 className="section-title mb-6">What We Cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-renew-sage/30 hover:bg-emerald-50/30 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-renew-dark">{cat.label}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{cat.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div id="contact" className="bg-renew-dark rounded-xl p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-renew-accent" />
                <h2 className="text-2xl font-bold">Get in Touch</h2>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Have a question, collaboration idea, or feedback? We&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@renewhabits.com"
                className="inline-flex items-center gap-2 text-renew-accent font-semibold hover:underline"
              >
                hello@renewhabits.com
              </a>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
