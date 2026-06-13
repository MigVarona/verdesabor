"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ACCEPT_ALL_PREFERENCES,
  DEFAULT_PREFERENCES,
  type CookieConsentValue,
  type CookiePreferences,
  saveConsent,
  getStoredConsent,
  getStoredPreferences,
} from "@/lib/cookies";

type View = "banner" | "preferences";

function PreferenceToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-renew-dark text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          disabled ? "bg-renew-sage/60 cursor-not-allowed" : checked ? "bg-renew-sage" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<View>("banner");
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useLayoutEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const stored = getStoredPreferences();
      if (stored) setPrefs(stored);
      setView("preferences");
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const close = () => setVisible(false);

  const apply = (value: CookieConsentValue, preferences: CookiePreferences) => {
    saveConsent(value, preferences);
    close();
  };

  const acceptAll = () => apply("accepted", ACCEPT_ALL_PREFERENCES);

  const essentialOnly = () => apply("essential", DEFAULT_PREFERENCES);

  const savePreferences = () => {
    const hasOptional = prefs.analytics || prefs.advertising;
    apply(hasOptional ? "accepted" : "essential", prefs);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-renew-dark/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 bg-renew-accent" />

        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-1">
                {view === "banner" ? "Cookie notice" : "Cookie preferences"}
              </p>
              <h2 className="text-lg font-bold text-renew-dark">
                {view === "banner" ? "We respect your privacy" : "Manage your preferences"}
              </h2>
            </div>
            <button
              onClick={essentialOnly}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close and accept essential only"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {view === "banner" ? (
            <>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use essential cookies to run the site, and optional cookies for analytics and
                advertising. You can accept all, use essential only, or customize your choices.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Read our{" "}
                <Link href="/cookies" className="text-renew-sage underline underline-offset-2">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-renew-sage underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
                <Button onClick={acceptAll} className="bg-renew-dark hover:bg-gray-800 flex-1">
                  Accept all
                </Button>
                <Button onClick={() => setView("preferences")} variant="outline" className="flex-1">
                  Customize
                </Button>
                <Button onClick={essentialOnly} variant="ghost" className="flex-1 text-gray-600">
                  Essential only
                </Button>
              </div>
            </>
          ) : (
            <>
              <PreferenceToggle
                label="Essential"
                description="Required for the website to function. Always active."
                checked
                disabled
              />
              <PreferenceToggle
                label="Analytics"
                description="Help us understand how visitors use the site (e.g. Google Analytics)."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <PreferenceToggle
                label="Advertising"
                description="Used to display relevant ads and measure ad performance."
                checked={prefs.advertising}
                onChange={(v) => setPrefs((p) => ({ ...p, advertising: v }))}
              />
              <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
                <Button onClick={savePreferences} className="bg-renew-dark hover:bg-gray-800 flex-1">
                  Save preferences
                </Button>
                <Button onClick={acceptAll} variant="outline" className="flex-1">
                  Accept all
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("open-cookie-settings"));
}
