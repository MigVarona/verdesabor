"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { ADSENSE_CLIENT, getAdSenseSlotId, type AdFormat } from "@/lib/ads";

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
  const slotId = getAdSenseSlotId(format);
  const configured = Boolean(ADSENSE_CLIENT && slotId);

  useEffect(() => {
    if (!configured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [configured, id]);

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
