#!/usr/bin/env node
/**
 * Notify IndexNow-compatible search engines (Bing, DuckDuckGo, Yandex, Naver,
 * Seznam) of every public URL so new/updated pages get crawled within minutes
 * instead of weeks. Runs automatically after `next build` on production
 * deploys (see `postbuild` in package.json).
 *
 * Usage: node scripts/ping-indexnow.mjs [--force]
 */

import fs from "fs";
import path from "path";

const SITE_URL = "https://www.renew-habits.com";
const INDEXNOW_KEY = "7b3bb9b0e2dc55e8264d4f1b678b88ca";
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const force = process.argv.includes("--force");
if (!force && process.env.VERCEL_ENV !== "production") {
  console.log("IndexNow: skipped (not a production deploy, use --force to override)");
  process.exit(0);
}

function toTagSlug(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

const articles = fs
  .readdirSync(ARTICLES_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8")));

const staticPaths = [
  "/",
  "/articles",
  "/about",
  "/editorial-policy",
  "/disclaimer",
  "/privacy",
  "/cookies",
  "/resources/7-daily-habits-healthspan",
];

const categoryPaths = ["nutrition", "biohacking", "neuroscience", "wellness", "lifestyle", "longevity"].map(
  (c) => `/${c}`
);

const articlePaths = articles.map((a) => `/articles/${a.slug || generateSlug(a.title)}`);

const tagPaths = [...new Set(articles.flatMap((a) => (a.tags ?? []).map(toTagSlug)))].map(
  (t) => `/tags/${t}`
);

const urlList = [...staticPaths, ...categoryPaths, ...articlePaths, ...tagPaths].map(
  (p) => `${SITE_URL}${p}`
);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});

if (res.ok || res.status === 202) {
  console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`);
} else {
  console.error(`IndexNow: submission failed (HTTP ${res.status}): ${await res.text()}`);
}
