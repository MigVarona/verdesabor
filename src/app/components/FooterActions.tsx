"use client";

import { ArrowUp } from "lucide-react";
import { openCookieSettings } from "./CookieConsent";

export function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
      aria-label="Scroll to top"
    >
      Back to top
      <span className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-renew-accent group-hover:text-renew-accent transition-colors">
        <ArrowUp className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-sm text-gray-600 hover:text-renew-sage transition-colors text-left"
    >
      Cookie settings
    </button>
  );
}
