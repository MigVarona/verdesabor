#!/usr/bin/env node
/**
 * Export articles from production API into content/articles/*.json
 * Usage: node scripts/export-articles-to-json.mjs [api-url]
 */

import fs from "fs";
import path from "path";

const API_URL =
  process.argv[2] || "https://verdesabor-migvaronas-projects.vercel.app/api/articles";
const OUT_DIR = path.join(process.cwd(), "content", "articles");

const UNSPLASH_RE = /images\.unsplash\.com\/(photo-[^/?]+)/i;

function unsplashUrl(photoPath, { w, h, q = 75 }) {
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}&fm=webp`;
}

function normalizeImage(url, variant) {
  if (!url || !url.startsWith("http")) return url;
  const match = url.match(UNSPLASH_RE);
  if (!match) return url;

  const sizes = {
    thumb: { w: 640, h: 400, q: 75 },
    hero: { w: 1200, h: 675, q: 80 },
    inline: { w: 960, h: 600, q: 80 },
  };

  return unsplashUrl(match[1], sizes[variant]);
}

function toJsonArticle(article) {
  const payload = {
    slug: article.slug,
    title: article.title,
    category: article.category,
    author: article.author || "RENEW Editorial",
    publishedAt: article.publishedAt,
    excerpt: article.excerpt,
    image: normalizeImage(article.image || article.imagexl, "thumb"),
    imagexl: normalizeImage(article.imagexl || article.image, "hero"),
    text: article.text,
  };

  if (article.image2xl) payload.image2xl = normalizeImage(article.image2xl, "inline");
  if (article.text2) payload.text2 = article.text2;
  if (article.tags?.length) payload.tags = article.tags;

  return payload;
}

const res = await fetch(API_URL);
if (!res.ok) throw new Error(`API error ${res.status}`);
const articles = await res.json();

fs.mkdirSync(OUT_DIR, { recursive: true });

let written = 0;
let skipped = 0;

for (const article of articles) {
  const file = path.join(OUT_DIR, `${article.slug}.json`);
  const payload = toJsonArticle(article);

  if (fs.existsSync(file)) {
    const existing = JSON.parse(fs.readFileSync(file, "utf8"));
    const merged = { ...payload, ...existing, image: existing.image || payload.image, imagexl: existing.imagexl || payload.imagexl };
    fs.writeFileSync(file, JSON.stringify(merged, null, 2) + "\n");
    skipped++;
  } else {
    fs.writeFileSync(file, JSON.stringify(payload, null, 2) + "\n");
    written++;
  }
}

console.log(`Done: ${written} new, ${skipped} updated, ${articles.length} total from API`);
