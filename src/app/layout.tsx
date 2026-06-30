import type { Metadata, Viewport } from "next";
import type React from "react";
import { Noto_Sans, PT_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import ConsentScripts from "./components/ConsentScripts";
import JsonLd from "./components/JsonLd";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  getSiteUrl,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18211d",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Healthy Living for a Better Future`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Renew is dedicated to promoting healthy living with insights and resources on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  authors: [{ name: "RENEW Editorial" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${SITE_NAME} | Healthy Living for a Better Future`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Healthy Living for a Better Future`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@renewhabits",
    title: `${SITE_NAME} | Healthy Living for a Better Future`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" }],
  },
  verification: {
    google: "googleb754e797cff875d0",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${ptSerif.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWD2PBHB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
        {children}
        <CookieConsent />
        <ConsentScripts />
        <Analytics />
      </body>
    </html>
  );
}
