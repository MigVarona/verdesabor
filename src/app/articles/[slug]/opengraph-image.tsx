import { ImageResponse } from "next/og";
import { fetchArticleBySlug } from "@/lib/articles.server";

export const alt = "Article cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  const title = article?.title ?? "RENEW";
  const category = article?.category ?? "";
  const excerpt = article?.excerpt ?? "Healthy living for a better future";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#18211d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          fontFamily: "serif",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 72,
            fontSize: 15,
            fontFamily: "sans-serif",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#d7ff4f",
            textTransform: "uppercase",
          }}
        >
          RENEW
        </div>

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: "inline-flex",
              background: "#d7ff4f",
              color: "#18211d",
              fontSize: 13,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "6px 14px",
              marginBottom: 20,
              alignSelf: "flex-start",
            }}
          >
            {category}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 52 : 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.0,
            marginBottom: 22,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            fontWeight: 400,
            maxWidth: 800,
          }}
        >
          {excerpt.length > 120 ? `${excerpt.slice(0, 117)}...` : excerpt}
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "#d7ff4f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
