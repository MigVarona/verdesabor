import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { type Article, formatDate, splitParagraphs } from "@/lib/articles";
import { SEVEN_HABITS_GUIDE } from "@/lib/guides";

export function getArticleTakeaways(article: Article): string[] {
  if (article.keyTakeaways?.length) return article.keyTakeaways.slice(0, 4);

  const candidates = [
    article.excerpt,
    ...splitParagraphs(article.text || ""),
    ...splitParagraphs(article.text2 || ""),
  ]
    .map((item) => item.trim())
    .filter(Boolean);

  return candidates.slice(0, 4).map((item) => {
    const sentence = item.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() || item;
    return sentence.length > 150 ? `${sentence.slice(0, 147).trim()}...` : sentence;
  });
}

export function ArticleTableOfContents({ hasSecondSection }: { hasSecondSection: boolean }) {
  const items = [
    { href: "#overview", label: "Overview" },
    { href: "#practical-notes", label: "Practical notes" },
    ...(hasSecondSection ? [{ href: "#action-plan", label: "How to apply it" }] : []),
    { href: "#references", label: "Sources & review" },
  ];

  return (
    <nav className="my-8 border border-renew-border bg-renew-paper p-5" aria-label="Article contents">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-renew-sage" />
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-renew-dark">In this article</h2>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex items-center gap-3 text-sm text-renew-muted hover:text-renew-sage transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-renew-mist text-[0.7rem] font-bold text-renew-dark group-hover:bg-renew-accent">
                {index + 1}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function AuthorBio({ article }: { article: Article }) {
  const author = article.author || "RENEW Editorial";

  return (
    <section className="mt-10 border-y border-renew-border py-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-renew-dark text-sm font-bold tracking-[0.18em] text-renew-accent">
          RE
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-renew-sage">Written by {author}</p>
          <p className="mt-2 text-sm leading-relaxed text-renew-muted">
            RENEW Editorial turns health research into practical guidance for nutrition, performance,
            recovery, and longevity. Articles are reviewed for clarity, balance, and practical usefulness.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-renew-muted">
            <span>Published {formatDate(article.publishedAt)}</span>
            {article.updatedAt && <span>Updated {formatDate(article.updatedAt)}</span>}
            {article.reviewedBy && <span>Reviewed by {article.reviewedBy}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleGuideCTA() {
  const guide = SEVEN_HABITS_GUIDE;

  return (
    <aside className="my-10 border border-renew-dark bg-renew-ink p-6 text-white md:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-renew-accent">
            <FileText className="h-4 w-4" />
            Free RENEW guide
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-white">{guide.title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">{guide.subtitle}</p>
        </div>
        <Link
          href={`/resources/${guide.slug}`}
          className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-renew-accent px-5 py-3 text-sm font-semibold text-renew-dark hover:bg-white transition-colors"
        >
          Read guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}

export function ArticleReferences({ article }: { article: Article }) {
  const sources = article.sources || [];

  return (
    <section id="references" className="mt-12 border-t border-renew-border pt-8 scroll-mt-28">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-renew-sage" />
        <h2 className="section-title">Sources & review</h2>
      </div>
      {sources.length > 0 ? (
        <ol className="mt-5 space-y-3">
          {sources.map((source, index) => (
            <li key={`${source.title}-${index}`} className="text-sm leading-relaxed text-renew-muted">
              {source.url ? (
                <a href={source.url} className="font-medium text-renew-sage underline underline-offset-2">
                  {source.title}
                </a>
              ) : (
                <span className="font-medium text-renew-dark">{source.title}</span>
              )}
              {source.publisher && <span> · {source.publisher}</span>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-5 grid gap-3 text-sm leading-relaxed text-renew-muted sm:grid-cols-2">
          <p className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-renew-sage" />
            Editorially reviewed for practical accuracy and readability.
          </p>
          <p className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-renew-sage" />
            Primary references are listed whenever an article relies on specific studies, guidelines, or reports.
          </p>
        </div>
      )}
    </section>
  );
}
