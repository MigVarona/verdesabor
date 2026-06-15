import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalPageLayout, {
  LegalBlock,
  LegalExternalLink,
  LegalLink,
} from "../components/LegalPageLayout";
import ManageCookiePreferences from "../components/ManageCookiePreferences";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: "How RENEW uses cookies and similar technologies on renewhabits.com.",
  path: "/cookies",
});

const SECTIONS = [
  { id: "what", title: "What are cookies?" },
  { id: "types", title: "Types we use" },
  { id: "table", title: "Cookie list" },
  { id: "manage", title: "Managing cookies" },
  { id: "third-party", title: "Third-party cookies" },
  { id: "contact", title: "Contact" },
];

export default function CookiesPage() {
  return (
    <>
      <Header />
      <LegalPageLayout
        title="Cookie Policy"
        subtitle="This policy explains how RENEW uses cookies and similar technologies when you visit our website."
        lastUpdated="June 13, 2026"
        sections={SECTIONS}
      >
        <LegalBlock id="what" title="1. What are cookies?">
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            the site remember your preferences, understand how it is used, and — with your consent —
            deliver relevant advertising.
          </p>
          <p>
            Similar technologies such as local storage and pixels may also be used for the same
            purposes. Throughout this policy, we refer to all of these as &quot;cookies.&quot;
          </p>
        </LegalBlock>

        <LegalBlock id="types" title="2. Types of cookies we use">
          <h3>Essential cookies</h3>
          <p>
            Required for the website to function. They include cookie consent preferences and basic
            security. These cannot be disabled.
          </p>
          <h3>Analytics cookies</h3>
          <p>
            Help us understand how visitors interact with RENEW — which pages are read, how long
            visitors stay, and where traffic comes from. We use Google Analytics for this purpose.
            Data is aggregated and does not directly identify you.
          </p>
          <h3>Advertising cookies</h3>
          <p>
            Used to display ads and measure their performance. Third-party ad networks may use these
            cookies to show relevant ads based on your browsing activity. Only activated with your
            consent.
          </p>
        </LegalBlock>

        <LegalBlock id="table" title="3. Cookie list">
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono text-xs">renew-cookie-consent</td>
                  <td>Essential</td>
                  <td>Stores your cookie consent choice</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">renew-cookie-preferences</td>
                  <td>Essential</td>
                  <td>Stores your detailed cookie preferences</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">_ga, _ga_*</td>
                  <td>Analytics</td>
                  <td>Google Analytics — visitor statistics</td>
                  <td>Up to 2 years</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">Ad network cookies</td>
                  <td>Advertising</td>
                  <td>Ad delivery and measurement (e.g. Google AdSense)</td>
                  <td>Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LegalBlock>

        <LegalBlock id="manage" title="4. Managing your cookies">
          <p>
            When you first visit RENEW, a cookie banner lets you accept all cookies, use essential
            cookies only, or customize your preferences by category.
          </p>
          <p>
            You can change your preferences at any time using the &quot;Cookie Settings&quot; link in
            the footer, or through your browser settings. Note that disabling cookies may affect
            certain features of the site.
          </p>
          <p>
            For more on how we handle personal data, see our{" "}
            <LegalLink href="/privacy">Privacy Policy</LegalLink>.
          </p>
          <ManageCookiePreferences />
        </LegalBlock>

        <LegalBlock id="third-party" title="5. Third-party cookies">
          <p>
            Some cookies are set by third-party services we use, such as Google Analytics and
            advertising partners. These providers have their own privacy policies governing how they
            use your data.
          </p>
          <p>
            To opt out of Google Analytics, install the{" "}
            <LegalExternalLink href="https://tools.google.com/dlpage/gaoptout">
              Google Analytics Opt-out Browser Add-on
            </LegalExternalLink>
            . To opt out of personalized ads, visit{" "}
            <LegalExternalLink href="https://www.google.com/settings/ads">
              Google Ads Settings
            </LegalExternalLink>{" "}
            or the{" "}
            <LegalExternalLink href="https://optout.aboutads.info/">
              Digital Advertising Alliance opt-out page
            </LegalExternalLink>
            .
          </p>
        </LegalBlock>

        <LegalBlock id="contact" title="6. Contact">
          <p>
            If you have questions about this Cookie Policy, contact us at{" "}
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
