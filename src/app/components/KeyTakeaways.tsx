import { Clock, Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  items: string[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <aside className="my-8 border border-renew-border bg-renew-mist p-6">
      <h2 className="flex items-center gap-2 font-bold text-renew-dark mb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-renew-accent">
          <Lightbulb className="w-5 h-5 text-renew-dark" />
        </span>
        Key takeaways
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-renew-muted leading-relaxed">
            <span className="text-renew-sage font-semibold shrink-0">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-renew-muted">
      <Clock className="w-3.5 h-3.5" />
      {minutes} min read
    </span>
  );
}
