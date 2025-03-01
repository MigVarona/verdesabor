import type React from "react";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

export const metadata = {
  title: {
    default: "Renew | Sustainable Solutions for a Better Future",
    template: "%s | Renew",
  },
  description: "Renew offers innovative and sustainable solutions to build a better future. Explore our eco-friendly products and services.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "es-ES": "/es-ES",
    },
  },
  openGraph: {
    title: "Renew | Sustainable Solutions for a Better Future",
    description: "Discover innovative and eco-friendly solutions with Renew. We're committed to building a sustainable future.",
    url: siteUrl,
    siteName: "Renew",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Renew - Sustainable Solutions for a Better Future",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renew | Sustainable Solutions",
    description: "Innovative and eco-friendly solutions for a sustainable future. Explore Renew's products and services.",
    images: [`${siteUrl}/twitter-image.jpg`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="googleb754e797cff875d0" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="root-layout">{children || <div className="not-found">Ruta no encontrada</div>}</div>
        <Analytics />
      </body>
    </html>
  );
}
