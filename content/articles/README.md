# How to add articles to RENEW

All articles live in **`content/articles/*.json`**. No database or admin panel needed.

To publish a new post, add a file like `my-article-slug.json` and deploy.

## Export from production (one-time migration)

```bash
node scripts/export-articles-to-json.mjs
```

This pulls all articles from the live API into JSON files.

## Required fields

| Field | Description |
|-------|-------------|
| `slug` | URL path, e.g. `cold-exposure-science-recovery` → `/articles/cold-exposure-science-recovery` |
| `title` | Article headline |
| `category` | One of: Nutrition, Biohacking, Neuroscience, Wellness, Lifestyle, Longevity |
| `excerpt` | Short summary shown on cards and SEO |
| `publishedAt` | ISO date string, e.g. `2026-06-13T09:00:00.000Z` |
| `imagexl` | Hero image URL (Unsplash recommended, 1600×900) |
| `text` | Main body (use `\n\n` between paragraphs) |

## Optional fields

| Field | Description |
|-------|-------------|
| `author` | Byline, e.g. `RENEW Editorial` |
| `image` | Thumbnail for cards (600×400) |
| `image2xl` | Second image mid-article |
| `text2` | Continuation after second image |
| `tags` | Array of topic tags |

## Images

Use [Unsplash](https://unsplash.com) URLs. Images are auto-sized as WebP for fast loading:

```
https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1200&h=675&q=80&fm=webp
```

| Field | Recommended size |
|-------|------------------|
| `image` | 640×400 (cards) |
| `imagexl` | 1200×675 (hero) |
| `image2xl` | 960×600 (inline) |

## Example

See `cold-exposure-science-recovery.json` for a complete reference article.

After adding a file, commit and deploy — no admin panel or database needed.
