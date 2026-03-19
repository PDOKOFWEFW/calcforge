import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://calcforge.com"),
  title: { default: "CalcForge — Free Mortgage & Finance Calculators", template: "%s | CalcForge" },
  description: "Free mortgage calculators pre-loaded with real local data for 50+ US cities. Plus compound interest, loan, and age calculators. Instant results, no signup.",
  keywords: ["mortgage calculator", "home loan calculator", "monthly payment calculator", "mortgage by city", "compound interest calculator", "loan calculator"],
  openGraph: { type: "website", siteName: "CalcForge", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-stone-50 text-stone-900 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google AdSense — add NEXT_PUBLIC_ADSENSE_CLIENT to Vercel env vars */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} crossOrigin="anonymous" strategy="afterInteractive" />
        )}

        {/* Google Analytics — add NEXT_PUBLIC_GA_ID to Vercel env vars */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{page_path:window.location.pathname});
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
