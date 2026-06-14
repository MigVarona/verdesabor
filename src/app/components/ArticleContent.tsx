import ArticleImage from "./ArticleImage";
import { splitParagraphs, optimizeImageUrl } from "@/lib/articles";
import type { ReactNode } from "react";

interface ArticleContentProps {
  excerpt?: string;
  text?: string;
  text2?: string;
  image2xl?: string;
  title: string;
  cta?: ReactNode;
}

export default function ArticleContent({ excerpt, text, text2, image2xl, title, cta }: ArticleContentProps) {
  const firstParagraphs = text ? splitParagraphs(text) : [];
  const secondParagraphs = text2 ? splitParagraphs(text2) : [];

  return (
    <div className="article-body">
      {excerpt && (
        <p id="overview" className="article-lead scroll-mt-28">{excerpt}</p>
      )}

      {firstParagraphs.length > 0 && (
        <section id={excerpt ? "practical-notes" : "overview"} className="scroll-mt-28">
          {firstParagraphs.map((paragraph, i) => (
            <p key={`t1-${i}`} className="article-paragraph">{paragraph}</p>
          ))}
        </section>
      )}

      {cta}

      {image2xl && (
        <figure className="article-figure my-10">
          <div className="relative aspect-[16/10] overflow-hidden ring-1 ring-renew-border">
            <ArticleImage
              src={optimizeImageUrl(image2xl, "inline")}
              alt={`${title} — illustration`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </figure>
      )}

      {secondParagraphs.length > 0 && (
        <section id="action-plan" className="scroll-mt-28">
          {secondParagraphs.map((paragraph, i) => (
            <p key={`t2-${i}`} className="article-paragraph">{paragraph}</p>
          ))}
        </section>
      )}
    </div>
  );
}
