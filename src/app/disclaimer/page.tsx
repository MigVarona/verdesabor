import Header from "../components/Header";
import Footer from "../components/Footer";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Medical Disclaimer",
  description: "Important medical disclaimer for RENEW health and wellness content.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-renew-dark">Medical Disclaimer</h1>
        </div>

        <div className="prose-article space-y-6 text-gray-600">
          <p className="text-lg font-medium text-gray-700">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">General Information Only</h2>
            <p>
              The information provided on RENEW (renewhabits.com) is for general informational and educational purposes only. It is not intended to be, and should not be interpreted as, medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">Not a Substitute for Professional Care</h2>
            <p>
              Always seek the advice of your physician, registered dietitian, or other qualified health provider with any questions you may have regarding a medical condition, dietary change, supplement regimen, or health program. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">Biohacking & Supplements</h2>
            <p>
              Content related to biohacking, supplements, fasting, cold exposure, and similar practices is provided for educational purposes. Individual responses vary, and some practices may not be appropriate for everyone — particularly individuals with underlying health conditions, who are pregnant, or who take medications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">Affiliate & Sponsored Content</h2>
            <p>
              RENEW may include affiliate links and sponsored content. We only recommend products and services we believe may be valuable to our readers, but their inclusion does not constitute an endorsement. Always do your own research before making purchasing decisions related to your health.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">Limitation of Liability</h2>
            <p>
              RENEW, its authors, and contributors shall not be held liable for any damages arising from the use of information on this website. You use the content at your own risk and are solely responsible for any decisions you make based on it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-renew-dark mb-3 font-sans">Contact</h2>
            <p>
              If you have questions about this disclaimer, please contact us at{" "}
              <a href="mailto:hello@renewhabits.com" className="text-renew-sage underline">
                hello@renewhabits.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
