"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { getStoredConsent, getStoredPreferences } from "@/lib/cookies";

const GA_ID = "G-0SNWZK6K22";

function shouldLoadAnalytics(): boolean {
  const consent = getStoredConsent();
  if (consent !== "accepted") return false;
  const prefs = getStoredPreferences();
  return prefs?.analytics ?? false;
}

export default function ConsentScripts() {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const sync = () => setAnalytics(shouldLoadAnalytics());
    sync();
    window.addEventListener("cookie-consent-updated", sync);
    return () => window.removeEventListener("cookie-consent-updated", sync);
  }, []);

  return (
    <>
      {analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {ADSENSE_CLIENT && (
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
