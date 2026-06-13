import ArticleImage from "./ArticleImage";
import { splitParagraphs, optimizeImageUrl } from "@/lib/articles";

interface ArticleContentProps {
  excerpt?: string;
  text?: string;
  text2?: string;
  image2xl?: string;
  title: string;
}

export default function ArticleContent({ excerpt, text, text2, image2xl, title }: ArticleContentProps) {
  return (
    <div className="article-body">
      {excerpt && (
        <p className="article-lead">{excerpt}</p>
      )}

      {text && splitParagraphs(text).map((paragraph, i) => (
        <p key={`t1-${i}`} className="article-paragraph">{paragraph}</p>
      ))}

      {image2xl && (
        <figure className="article-figure my-10">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
            <ArticleImage
              src={optimizeImageUrl(image2xl, "inline")}
              alt={`${title} — illustration`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </figure>
      )}

      {text2 && splitParagraphs(text2).map((paragraph, i) => (
        <p key={`t2-${i}`} className="article-paragraph">{paragraph}</p>
      ))}
    </div>
  );
}
