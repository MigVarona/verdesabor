import Image, { type ImageProps } from "next/image";

function isDirectCdn(src: ImageProps["src"]): boolean {
  const url = typeof src === "string" ? src : "";
  return (
    url.includes("images.unsplash.com") ||
    url.includes("res.cloudinary.com") ||
    url.includes("joovv.com/cdn/") ||
    url.includes("mitoredlight.com/cdn/")
  );
}

/** Loads Unsplash/Cloudinary directly from CDN — avoids slow double optimization. */
export default function ArticleImage({ src, unoptimized, ...props }: ImageProps) {
  return <Image src={src} unoptimized={unoptimized ?? isDirectCdn(src)} {...props} />;
}
