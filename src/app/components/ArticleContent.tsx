import Link from "next/link";
import ArticleImage from "./ArticleImage";
import { splitParagraphs, optimizeImageUrl } from "@/lib/articles";
import type { ReactNode } from "react";

interface RelatedLink {
  title: string;
  href: string;
  category?: string;
}

interface ArticleContentProps {
  excerpt?: string;
  text?: string;
  text2?: string;
  image2xl?: string;
  title: string;
  cta?: ReactNode;
  relatedLinks?: RelatedLink[];
}

export default function ArticleContent({ excerpt, text, text2, image2xl, title, cta, relatedLinks }: ArticleContentProps) {
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

      {relatedLinks && relatedLinks.length > 0 && (
        <aside className="my-8 border-l-4 border-renew-accent bg-renew-mist px-5 py-4 not-prose">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-renew-sage mb-3">Related reading</p>
          <ul className="space-y-2">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-renew-dark hover:text-renew-sage transition-colors underline underline-offset-2"
                >
                  {link.title}
                </Link>
                {link.category && (
                  <span className="ml-2 text-xs text-renew-muted">{link.category}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      )}

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
