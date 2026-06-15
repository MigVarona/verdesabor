"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ADSENSE_CLIENT, getAdSenseSlotId, type AdFormat } from "@/lib/ads";
import { getStoredConsent, getStoredPreferences } from "@/lib/cookies";

interface AdSlotProps {
  id: string;
  format?: AdFormat;
  className?: string;
}

const formatStyles = {
  leaderboard: "w-full min-h-[64px] md:min-h-[90px] max-w-[728px] mx-auto",
  sidebar: "w-full min-h-[180px] md:min-h-[250px] max-w-[300px] mx-auto",
  "in-content": "w-full min-h-[160px] md:min-h-[250px] max-w-[336px] mx-auto my-8",
  footer: "w-full min-h-[64px] md:min-h-[90px] max-w-[728px] mx-auto",
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

function shouldShowAds(): boolean {
  const consent = getStoredConsent();
  if (consent !== "accepted") return false;
  const prefs = getStoredPreferences();
  return prefs?.advertising ?? false;
}

export default function AdSlot({ id, format = "sidebar", className }: AdSlotProps) {
  const [showAds, setShowAds] = useState(false);
  const slotId = getAdSenseSlotId(format);
  const configured = Boolean(ADSENSE_CLIENT && slotId);

  useEffect(() => {
    const sync = () => setShowAds(shouldShowAds());
    sync();
    window.addEventListener("cookie-consent-updated", sync);
    return () => window.removeEventListener("cookie-consent-updated", sync);
  }, []);

  useEffect(() => {
    if (!showAds || !configured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [showAds, configured, id]);

  if (showAds && configured) {
    return (
      <div
        id={id}
        className={cn("ad-slot overflow-hidden", formatStyles[format], className)}
        aria-label="Advertisement"
      >
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      id={id}
      data-ad-slot={id}
      data-ad-format={format}
      className={cn("ad-placeholder", formatStyles[format], className)}
      aria-hidden={!configured}
    >
      <span>Advertisement</span>
    </div>
  );
}
