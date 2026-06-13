import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  format?: "leaderboard" | "sidebar" | "in-content" | "footer";
  className?: string;
}

const formatStyles = {
  leaderboard: "w-full min-h-[90px] max-w-[728px] mx-auto",
  sidebar: "w-full min-h-[250px] max-w-[300px] mx-auto",
  "in-content": "w-full min-h-[250px] max-w-[336px] mx-auto my-8",
  footer: "w-full min-h-[90px] max-w-[728px] mx-auto",
};

export default function AdSlot({ id, format = "sidebar", className }: AdSlotProps) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      data-ad-format={format}
      className={cn("ad-placeholder", formatStyles[format], className)}
      aria-hidden="true"
    >
      <span>Advertisement</span>
    </div>
  );
}
