# RenewHabits

A science-backed health & longevity content site — evidence-based articles on nutrition, biohacking, neuroscience, wellness and longevity, with affiliate monetization built in.

🌐 **Live:** [renew-habits.com](https://www.renew-habits.com)

Built with **Next.js 15** (App Router), **React 19**, **TypeScript** and **Tailwind CSS**, backed by **MongoDB** and deployed on **Vercel**.

---

## Features

- **Content platform** — articles stored in MongoDB and rendered server-side via the App Router, organized into six categories: Nutrition, Biohacking, Neuroscience, Wellness, Lifestyle and Longevity.
- **Admin dashboard** — password-gated `/login` → `/adminpage` flow to create and manage articles without redeploying.
- **SEO-first** — dynamic `sitemap.ts`, RSS `feed.xml`, `llms.txt`, per-tag pages and IndexNow ping on every build to notify search engines of new content.
- **Affiliate monetization** — automatic Sovrn Commerce link wrapping (`/go/[slug]`) and optional Amazon Associates tagging on product links.
- **Analytics** — Vercel Analytics wired in out of the box.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS, Radix UI, lucide-react |
| Language | TypeScript |
| Database | MongoDB (`verdesabor.articles`) |
| Hosting | Vercel |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (see below), then start MongoDB and the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Article APIs return empty/404 until the `verdesabor.articles` collection has data. Seed it through the admin UI at `/login` → `/adminpage`.

### Environment variables

Create a `.env.local` file (gitignored):

```env
MONGODB_URI=mongodb://127.0.0.1:27017
ADMIN_USER=admin
ADMIN_PASSWORD=changeme
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Affiliate monetization (optional — set in Vercel for production)
SOVRN_COMMERCE_KEY=your-sovrn-api-key
SOVRN_SECRET_KEY=your-sovrn-secret-key
AMAZON_ASSOCIATE_TAG=yourname-20
```

| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | ✅ | App throws on startup if unset. |
| `ADMIN_USER` / `ADMIN_PASSWORD` | ✅ | Gate the admin dashboard. |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Must point at a live instance — article pages and the sitemap fetch it server-side. |
| `SOVRN_COMMERCE_KEY` | optional | Builds affiliate links for all products. |
| `AMAZON_ASSOCIATE_TAG` | optional | Auto-appended to Amazon product URLs. |

## Project structure

```
src/
├── app/            # App Router: category pages, articles/[slug], api/, sitemap, feed
│   ├── api/        # Article + newsletter route handlers
│   └── go/[slug]/  # Affiliate link redirects
├── components/     # UI components (Radix + Tailwind)
└── lib/            # MongoDB client, data access helpers
content/            # Article + guide source content
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 3000. |
| `npm run build` | Production build (requires `NEXT_PUBLIC_SITE_URL` to resolve to a live API). |
| `npm run start` | Serve the production build. |

---

Built and maintained by [Miguel Varona](https://github.com/MigVarona).
