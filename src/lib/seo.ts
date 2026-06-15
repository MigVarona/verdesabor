import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { DEFAULT_HERO_IMAGE } from "@/lib/images";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew-habits.com";

export const DEFAULT_OG_IMAGE = DEFAULT_HERO_IMAGE;

export const TWITTER_HANDLE = "@renewhabits";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function getSiteUrl(): string {
  return SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  images,
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImages = images ?? [
    { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} - Healthy Living` },
  ];
  const imageUrls = ogImages.map((img) => img.url);

  return {
    title,
    description,
    ...(authors?.length ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      images: imageUrls,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon-192.png"),
    description: SITE_DESCRIPTION,
    email: "hello@renewhabits.com",
    sameAs: [
      "https://www.instagram.com/renew.habits/",
      "https://x.com/renew_habits",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  wordCount?: number;
  keywords?: string[];
};

export function buildArticleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: {
      "@type": "Person",
      name: article.author || "RENEW Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon-192.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(article.path),
    },
    ...(article.category ? { articleSection: article.category } : {}),
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
    ...(article.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}
