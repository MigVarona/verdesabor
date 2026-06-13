import Link from "next/link";
import { cn } from "@/lib/utils";

interface RenewLogoProps {
  /** default: header size · lg: footer · sm: compact */
  size?: "sm" | "default" | "lg";
  /** light text for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}

const sizes = {
  sm: {
    word: "text-lg tracking-[0.2em]",
    tag: "text-[0.6rem] tracking-[0.22em]",
    bar: "w-1",
  },
  default: {
    word: "text-xl md:text-2xl tracking-[0.22em]",
    tag: "text-[0.65rem] tracking-[0.28em]",
    bar: "w-1",
  },
  lg: {
    word: "text-2xl md:text-[1.75rem] tracking-[0.2em]",
    tag: "text-[0.7rem] tracking-[0.3em]",
    bar: "w-1.5",
  },
};

export default function RenewLogo({
  size = "default",
  variant = "dark",
  className,
  href = "/",
}: RenewLogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";

  const mark = (
    <span className={cn("inline-flex items-stretch gap-3 group", className)}>
      <span
        className={cn(
          "rounded-full flex-shrink-0 transition-all duration-300 group-hover:h-10",
          s.bar,
          "bg-renew-accent",
          size === "lg" ? "min-h-[2.75rem]" : size === "sm" ? "min-h-[2rem]" : "min-h-[2.25rem] md:min-h-[2.5rem]"
        )}
        aria-hidden
      />
      <span className="flex flex-col justify-center py-0.5">
        <span
          className={cn(
            "font-bold leading-none",
            s.word,
            isLight ? "text-white" : "text-renew-dark"
          )}
        >
          RENEW
        </span>
        <span
          className={cn(
            "font-semibold uppercase mt-1",
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
    <Link href={href} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-renew-accent focus-visible:ring-offset-2 rounded-sm">
      {mark}
    </Link>
  );
}
