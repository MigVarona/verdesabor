import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalPageLayout, {
  LegalBlock,
  LegalExternalLink,
  LegalLink,
} from "../components/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How RENEW collects, uses, and protects your personal data.",
  path: "/privacy",
});

const SECTIONS = [
  { id: "information", title: "Information we collect" },
  { id: "cookies", title: "Cookies & tracking" },
  { id: "advertising", title: "Advertising" },
  { id: "third-party", title: "Third-party services" },
  { id: "protection", title: "Data protection" },
  { id: "rights", title: "Your rights" },
  { id: "changes", title: "Policy changes" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPageLayout
        title="Privacy Policy"
        subtitle="This policy describes how RENEW collects, uses, and protects your personal information when you use renewhabits.com."
        lastUpdated="June 13, 2026"
        sections={SECTIONS}
      >
        <LegalBlock id="information" title="1. Information we collect">
          <h3>Personal data you provide</h3>
          <p>
            When you subscribe to our newsletter or contact us, we collect information you
            voluntarily submit:
          </p>
          <ul>
            <li><strong>Newsletter:</strong> your email address to send updates. Unsubscribe anytime via the link in each email.</li>
            <li><strong>Contact:</strong> your name, email, and message to respond to your inquiry.</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal data with third parties for their marketing
            purposes.
          </p>

          <h3>Usage data</h3>
          <p>
            We collect anonymized data about how visitors use the site — pages visited, time on page,
            device type, browser, and general location (IP anonymized). This is collected via Google
            Analytics only with your consent.
          </p>
        </LegalBlock>

        <LegalBlock id="cookies" title="2. Cookies & tracking">
          <p>
            We use cookies to operate the site, analyze traffic, and — with your consent — display
            advertising. For full details on the cookies we use and how to manage them, see our{" "}
            <LegalLink href="/cookies">Cookie Policy</LegalLink>.
          </p>
          <p>
            You can update your preferences at any time using the Cookie Settings link in the footer
            of any page.
          </p>
        </LegalBlock>

        <LegalBlock id="advertising" title="3. Advertising">
          <p>
            RENEW may display advertisements from third-party networks such as Google AdSense.
            These partners may use cookies to serve ads based on your prior visits to this or other
            websites. Advertising cookies are only activated with your explicit consent.
          </p>
          <p>
            Opt out of personalized advertising via{" "}
            <LegalExternalLink href="https://www.google.com/settings/ads">Google Ads Settings</LegalExternalLink>{" "}
            or the{" "}
            <LegalExternalLink href="https://optout.aboutads.info/">DAA opt-out page</LegalExternalLink>.
          </p>
        </LegalBlock>

        <LegalBlock id="third-party" title="4. Third-party services">
          <p>
            We use trusted third-party providers for email delivery, analytics, and advertising.
            Each operates under its own privacy policy. We select partners that meet industry
            standards for data protection, but we do not control their practices directly.
          </p>
          <p>
            By using our site, you acknowledge that your data may be processed by these providers
            in accordance with your cookie preferences.
          </p>
        </LegalBlock>

        <LegalBlock id="protection" title="5. Data protection">
          <p>
            We implement technical and organizational measures to protect your data from unauthorized
            access, alteration, or disclosure. This includes encryption, access controls, and
            limited data retention.
          </p>
          <p>
            No method of internet transmission is 100% secure. While we work to protect your
            information, we cannot guarantee absolute security.
          </p>
        </LegalBlock>

        <LegalBlock id="rights" title="6. Your rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict certain processing</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@renewhabits.com" className="text-renew-sage underline underline-offset-2">
              hello@renewhabits.com
            </a>
            . We may need to verify your identity before processing certain requests.
          </p>
        </LegalBlock>

        <LegalBlock id="changes" title="7. Changes to this policy">
          <p>
            We may update this Privacy Policy to reflect changes in our practices or legal
            requirements. The &quot;Last updated&quot; date at the top will be revised accordingly.
            Significant changes may be communicated via a notice on the website.
          </p>
          <p>
            Continued use of the site after changes are posted constitutes acceptance of the
            updated policy.
          </p>
        </LegalBlock>

        <LegalBlock id="contact" title="8. Contact">
          <p>
            Questions about this Privacy Policy or your personal data? Reach us at{" "}
            <a href="mailto:hello@renewhabits.com" className="text-renew-sage underline underline-offset-2">
              hello@renewhabits.com
            </a>{" "}
            or through our <LegalLink href="/about#contact">contact page</LegalLink>.
          </p>
        </LegalBlock>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
