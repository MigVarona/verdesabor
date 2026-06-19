# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router, React 19, TypeScript) content site — package name `verdesabor`, branded **RenewHabits**. It stores articles in **MongoDB** (database `verdesabor`, collection `articles`).

### Services

| Service | Required | Run command | Notes |
|---|---|---|---|
| Next.js app | yes | `npm run dev` (`next dev --turbopack`, port 3000) | Primary dev workflow. |
| MongoDB | yes | `mongod --dbpath /var/lib/mongodb --bind_ip 127.0.0.1 --port 27017` | App throws at import if `MONGODB_URI` is unset. Started outside the update script. |

### Environment variables (`.env.local`, gitignored — recreate it; it is not committed)

```
MONGODB_URI=mongodb://127.0.0.1:27017
ADMIN_USER=admin
ADMIN_PASSWORD=changeme
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Affiliate monetization (optional — add in Vercel production env)
SOVRN_COMMERCE_KEY=your-sovrn-api-key
SOVRN_SECRET_KEY=your-sovrn-secret-key
AMAZON_ASSOCIATE_TAG=yourname-20
```

- `MONGODB_URI` is required or the app throws on startup (`src/lib/mongodb.ts`, `src/lib/getArticleBySlug.ts`).
- `ADMIN_USER` / `ADMIN_PASSWORD` gate the `/login` -> `/adminpage` flow.
- `NEXT_PUBLIC_SITE_URL` must point at a running instance of this app; the article detail page (`src/app/articles/[slug]/page.tsx`) and `src/app/sitemap.ts` fetch `${NEXT_PUBLIC_SITE_URL}/api/articles[...]` **server-side**, so it must resolve to a live server (use `http://localhost:3000` locally).
- `SOVRN_COMMERCE_KEY` — **API Key** from Sovrn Commerce → Settings → your site → Key. Used by `/go/[slug]` to build `https://sovrn.co?key=...&u=...` links for all products automatically.
- `SOVRN_SECRET_KEY` — optional; only needed if calling Sovrn REST APIs (campaigns, reporting). Header format: `Authorization: secret {SOVRN_SECRET_KEY}`. Not used by the public site.
- `AMAZON_ASSOCIATE_TAG` — optional; auto-appended to any Amazon product URL (useful for supplements/books). Sign up at Amazon Associates.
- Display ads are currently disabled; do not add AdSense scripts, `ads.txt`, or ad placeholders unless the monetization strategy changes.

### Seeding data

Article read APIs return empty/404 until the `verdesabor.articles` collection has data. Seed via the admin UI (`/login` then `/adminpage`) or insert documents matching the POST handler shape in `src/app/api/articles/route.js` (`slug, image, title, category, excerpt, imagel, imagexl, text, image2xl, text2, publishedAt`). Valid categories: Nutrition, Biohacking, Neuroscience, Wellness, Lifestyle, Longevity.

### Build / lint gotchas (non-obvious)

- **`npm run build` cannot complete standalone.** `src/app/sitemap.ts` (and article pages) `fetch ${NEXT_PUBLIC_SITE_URL}/api/articles` during static generation, so the build only succeeds when that URL points at a separate, already-running, stable API instance (on Vercel it points at the live deployment). Do not run `next build` against the same `.next` dir while `next dev` is running — they collide. The supported local workflow is `npm run dev`.
- **`npm run lint` is not configured.** `next lint` launches an interactive ESLint setup prompt because the repo ships no ESLint config; it cannot run non-interactively as-is.
