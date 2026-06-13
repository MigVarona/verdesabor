import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalPageLayout, { LegalBlock, LegalLink } from "../components/LegalPageLayout";

export const metadata = {
  title: "Medical Disclaimer",
  description: "Important medical disclaimer for RENEW health and wellness content.",
};

const SECTIONS = [
  { id: "general", title: "General information" },
  { id: "professional", title: "Professional care" },
  { id: "biohacking", title: "Biohacking & supplements" },
  { id: "affiliate", title: "Affiliate content" },
  { id: "liability", title: "Liability" },
  { id: "contact", title: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <LegalPageLayout
        title="Medical Disclaimer"
        subtitle="Please read this disclaimer carefully before using any health information on RENEW."
        lastUpdated="June 13, 2026"
        sections={SECTIONS}
      >
        <LegalBlock id="general" title="1. General information only">
          <p>
            The information on RENEW (renewhabits.com) is for general informational and educational
            purposes only. It is not intended as medical advice, diagnosis, or treatment.
          </p>
        </LegalBlock>

        <LegalBlock id="professional" title="2. Not a substitute for professional care">
          <p>
            Always consult a qualified healthcare provider before making decisions about your health,
            diet, supplements, or exercise. Never disregard professional medical advice or delay
            seeking it because of something you read on this website.
          </p>
        </LegalBlock>

        <LegalBlock id="biohacking" title="3. Biohacking & supplements">
          <p>
            Content on biohacking, supplements, fasting, cold exposure, and similar topics is
            educational. Individual responses vary. Some practices may not be suitable for people
            with underlying conditions, who are pregnant, or who take medications.
          </p>
        </LegalBlock>

        <LegalBlock id="affiliate" title="4. Affiliate & sponsored content">
          <p>
            RENEW may include affiliate links and sponsored content. Inclusion does not constitute
            a medical endorsement. Always do your own research before purchasing health-related
            products.
          </p>
        </LegalBlock>

        <LegalBlock id="liability" title="5. Limitation of liability">
          <p>
            RENEW, its authors, and contributors are not liable for damages arising from the use of
            information on this website. You use the content at your own risk.
          </p>
        </LegalBlock>

        <LegalBlock id="contact" title="6. Contact">
          <p>
            Questions about this disclaimer? Contact{" "}
            <a href="mailto:hello@renewhabits.com" className="text-renew-sage underline underline-offset-2">
              hello@renewhabits.com
            </a>{" "}
            or visit our <LegalLink href="/about#contact">contact page</LegalLink>.
          </p>
        </LegalBlock>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
