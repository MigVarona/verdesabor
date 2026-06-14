import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalPageLayout, { LegalBlock, LegalLink } from "../components/LegalPageLayout";

export const metadata = {
  title: "Editorial Policy",
  description:
    "How RENEW creates, reviews, sources, and updates AI-assisted health and wellness content.",
};

const SECTIONS = [
  { id: "mission", title: "Mission" },
  { id: "ai", title: "AI-assisted content" },
  { id: "sources", title: "Sources" },
  { id: "review", title: "Review process" },
  { id: "medical", title: "Medical limits" },
  { id: "corrections", title: "Corrections" },
  { id: "commercial", title: "Commercial policy" },
  { id: "contact", title: "Contact" },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <Header />
      <LegalPageLayout
        title="Editorial Policy"
        subtitle="How RENEW creates AI-assisted, human-edited health and wellness content."
        lastUpdated="June 14, 2026"
        sections={SECTIONS}
        eyebrow="Editorial"
      >
        <LegalBlock id="mission" title="1. Our mission">
          <p>
            RENEW publishes educational content on nutrition, biohacking, neuroscience, wellness,
            lifestyle, and longevity. Our goal is to make complex health ideas easier to understand
            without presenting general information as personal medical advice.
          </p>
        </LegalBlock>

        <LegalBlock id="ai" title="2. AI-assisted content">
          <p>
            Some RENEW articles are drafted, structured, summarized, or edited with assistance from
            AI tools. AI is used as an editorial aid, not as an independent authority. Before
            publication, content is reviewed by RENEW for readability, relevance, tone, and obvious
            factual issues.
          </p>
          <p>
            Because AI tools can make mistakes, we treat AI-generated claims as requiring editorial
            scrutiny. Articles may be updated when stronger sources, clearer wording, or corrections
            are needed.
          </p>
        </LegalBlock>

        <LegalBlock id="sources" title="3. Sources and evidence">
          <p>
            For specific health claims, we aim to rely on credible sources such as public health
            agencies, clinical guidelines, peer-reviewed research, textbooks, and recognized
            scientific organizations. When an article depends on specific evidence, references may
            appear in the article&apos;s “Sources & review” section.
          </p>
          <p>
            Not every article is a formal literature review. Some pieces are practical explainers,
            routines, or summaries. In those cases, sources may be added over time as the article is
            expanded.
          </p>
        </LegalBlock>

        <LegalBlock id="review" title="4. Review process">
          <p>
            RENEW articles are editorially reviewed for clarity, usefulness, balance, and alignment
            with our medical disclaimer. If a medically qualified reviewer is involved, the article
            may list a <code>reviewedBy</code> name in the article metadata.
          </p>
          <p>
            If no reviewer is listed, readers should assume the article has editorial review only,
            not medical review.
          </p>
        </LegalBlock>

        <LegalBlock id="medical" title="5. Medical limits">
          <p>
            RENEW content is informational and educational. It is not medical advice, diagnosis, or
            treatment. Readers should consult a qualified healthcare professional before making
            decisions about medication, supplements, fasting, exercise, sleep interventions, cold
            exposure, or any health practice that could affect a medical condition.
          </p>
          <p>
            Read our full <LegalLink href="/disclaimer">Medical Disclaimer</LegalLink>.
          </p>
        </LegalBlock>

        <LegalBlock id="corrections" title="6. Corrections and updates">
          <p>
            We aim to correct material errors promptly. Articles may include an updated date when
            meaningful changes are made. Minor edits for grammar, formatting, or clarity may not be
            individually noted.
          </p>
        </LegalBlock>

        <LegalBlock id="commercial" title="7. Commercial and affiliate content">
          <p>
            RENEW may publish affiliate links, recommendations, or sponsored placements in the
            future. Commercial relationships should not determine our editorial conclusions. Any
            affiliate or sponsored content should be disclosed where relevant.
          </p>
        </LegalBlock>

        <LegalBlock id="contact" title="8. Contact">
          <p>
            To suggest a correction, ask about sourcing, or contact the editorial team, email{" "}
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
