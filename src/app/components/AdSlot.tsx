"use client";

import { useEffect, useRef } from "react";
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

export default function AdSlot({ id, format = "sidebar", className }: AdSlotProps) {
  const pushed = useRef(false);
  const slotId = getAdSenseSlotId(format);
  const configured = Boolean(ADSENSE_CLIENT && slotId);

  useEffect(() => {
    if (!configured) return;

    const pushAd = () => {
      const consent = getStoredConsent();
      const prefs = getStoredPreferences();
      if (pushed.current || consent !== "accepted" || !prefs?.advertising || !window.adsbygoogle) {
        return;
      }

      try {
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        // AdSense may still be initializing.
      }
    };

    pushAd();
    window.addEventListener("adsense-loaded", pushAd);
    window.addEventListener("cookie-consent-updated", pushAd);
    return () => {
      window.removeEventListener("adsense-loaded", pushAd);
      window.removeEventListener("cookie-consent-updated", pushAd);
    };
  }, [configured, id, slotId]);

  if (configured) {
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
      aria-hidden="true"
    >
      <span>Advertisement</span>
    </div>
  );
}
