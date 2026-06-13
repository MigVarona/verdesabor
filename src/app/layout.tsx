import type React from "react";
import { Noto_Sans, PT_Serif } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import ConsentScripts from "./components/ConsentScripts";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

export const metadata = {
  title: {
    default: "Renew | Healthy Living for a Better Future",
    template: "%s | Renew",
  },
  description:
    "Renew is dedicated to promoting healthy living with insights and resources on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Renew | Healthy Living for a Better Future",
    description:
      "Discover valuable insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
    url: siteUrl,
    siteName: "Renew",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2080&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Renew - Healthy Living for a Better Future",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renew | Healthy Living for a Better Future",
    description:
      "Explore Renew's insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
    images: [
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2080&auto=format&fit=crop",
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111827" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="googleb754e797cff875d0" />
      </head>
      <body className={`${notoSans.variable} ${ptSerif.variable} font-sans antialiased`}>
        {children}
        <CookieConsent />
        <ConsentScripts />
      </body>
    </html>
  );
}
