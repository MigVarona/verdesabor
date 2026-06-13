# How to add articles to RENEW

Articles live as JSON files in this folder. To publish a new post, add a file like `my-article-slug.json`.

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

Use [Unsplash](https://unsplash.com) URLs with sizing params:

```
https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1600&h=900&q=80
```

## Example

See `cold-exposure-science-recovery.json` for a complete reference article.

After adding a file, commit and deploy — no admin panel or database needed.
