import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeManifesto() {
  return (
    <section className="py-14 md:py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-renew-dark leading-snug text-balance italic">
            &ldquo;We translate complex health science into clear, actionable insight — so you can make better decisions about your body and your future.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-10 text-xs font-semibold uppercase tracking-widest text-gray-400">
            <span>Evidence-based</span>
            <span className="text-gray-200">|</span>
            <span>Independent</span>
            <span className="text-gray-200">|</span>
            <span>Free to read</span>
          </div>
        </div>
      </div>
    </section>
  );
}
