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

function shouldLoadAdvertising(): boolean {
  const consent = getStoredConsent();
  if (consent !== "accepted") return false;
  const prefs = getStoredPreferences();
  return prefs?.advertising ?? false;
}

export default function ConsentScripts() {
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAnalytics(shouldLoadAnalytics());
      setAdvertising(shouldLoadAdvertising());
    };
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

      {advertising && ADSENSE_CLIENT && (
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onLoad={() => window.dispatchEvent(new CustomEvent("adsense-loaded"))}
        />
      )}
    </>
  );
}
