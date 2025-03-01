import type React from "react";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";


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
    default: "Renew | Healthy Living for a Better Future",
    template: "%s | Renew",
  },
  description: "Renew is dedicated to promoting healthy living with insights and resources on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity. Explore ways to improve your well-being.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "es-ES": "/es-ES",
    },
  },
  openGraph: {
    title: "Renew | Healthy Living for a Better Future",
    description: "Discover valuable insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity. Renew is here to support your journey to a healthier and better future.",
    url: siteUrl,
    siteName: "Renew",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL de la imagen
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
    description: "Explore Renew's insights on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity to enhance your well-being and health.",
    images: ["https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"], // URL de la imagen
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0SNWZK6K22"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-0SNWZK6K22');
              `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="googleb754e797cff875d0" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="root-layout">{children || <div className="not-found">Ruta no encontrada</div>}</div>
      </body>
    </html>
  );
}
