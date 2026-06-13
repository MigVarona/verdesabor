import { Clock, Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  items: string[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <aside className="my-8 p-6 bg-emerald-50/60 border border-emerald-100 rounded-xl">
      <h2 className="flex items-center gap-2 font-bold text-renew-dark mb-4">
        <Lightbulb className="w-5 h-5 text-renew-sage" />
        Key Takeaways
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
            <span className="text-renew-sage font-semibold shrink-0">—</span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
      <Clock className="w-3.5 h-3.5" />
      {minutes} min read
    </span>
  );
}
