import Link from "next/link";
import { cn } from "@/lib/utils";

interface RenewLogoProps {
  /** full: bar + tagline · compact: mobile header mark */
  layout?: "full" | "compact";
  /** default: header · lg: footer · sm: drawer */
  size?: "sm" | "default" | "lg";
  /** light text for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}

const sizes = {
  sm: {
    word: "text-[1.08rem] tracking-[0.26em]",
    tag: "text-[0.5rem] tracking-[0.32em]",
    bar: "w-1",
    barH: "w-5",
  },
  default: {
    word: "text-[1.55rem] md:text-[1.95rem] tracking-[0.32em]",
    tag: "text-[0.58rem] tracking-[0.34em]",
    bar: "w-1",
    barH: "w-6",
  },
  lg: {
    word: "text-[1.9rem] md:text-[2.35rem] tracking-[0.3em]",
    tag: "text-[0.65rem] tracking-[0.36em]",
    bar: "w-1.5",
    barH: "w-8",
  },
};

export default function RenewLogo({
  layout = "full",
  size = "default",
  variant = "dark",
  className,
  href = "/",
}: RenewLogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";

  const mark =
    layout === "compact" ? (
    <span className={cn("inline-flex flex-col items-center gap-1 group", className)}>
      <span
          className={cn("h-0.5 rounded-full bg-renew-accent transition-all group-hover:w-7", s.barH)}
          aria-hidden
        />
        <span
          className={cn(
            "font-serif font-normal leading-none uppercase",
            size === "sm" ? "text-base tracking-[0.24em]" : "text-lg tracking-[0.26em]",
            isLight ? "text-white" : "text-renew-dark"
          )}
        >
          RENEW
        </span>
      </span>
    ) : (
      <span className={cn("inline-flex items-stretch gap-3 group", className)}>
        <span
          className={cn(
            "rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-y-105 mt-[0.18rem]",
            s.bar,
            "bg-renew-accent",
            size === "lg" ? "min-h-[2.75rem]" : size === "sm" ? "min-h-[2rem]" : "min-h-[2.25rem] md:min-h-[2.5rem]"
          )}
          aria-hidden
        />
        <span className="flex flex-col justify-center py-0.5">
          <span
            className={cn(
              "font-serif font-normal leading-none uppercase",
              s.word,
              isLight ? "text-white" : "text-renew-dark"
            )}
          >
            RENEW
          </span>
          <span
            className={cn(
              "font-semibold uppercase mt-2 hidden sm:block whitespace-nowrap",
              s.tag,
              isLight ? "text-gray-400" : "text-renew-sage"
            )}
          >
            Health &amp; Longevity
          </span>
        </span>
      </span>
    );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-renew-accent focus-visible:ring-offset-2 rounded-sm"
    >
      {mark}
    </Link>
  );
}
