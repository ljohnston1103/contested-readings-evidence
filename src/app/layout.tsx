import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";

import "./globals.css";

const siteTitle = "Oldest & Best | Manuscript Evidence Database";
const siteDescription =
  "Explore 51 contested New Testament readings through Greek manuscripts, ancient versions, patristic witnesses, and transparent evidence notes.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "oldestandbest.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  const requestBase = `${protocol}://${host}`;
  const socialImage = `${requestBase}/og.png`;

  return {
    metadataBase: new URL(requestBase),
    title: {
      default: siteTitle,
      template: "%s | Oldest & Best",
    },
    description: siteDescription,
    openGraph: {
      type: "website",
      title: siteTitle,
      description: siteDescription,
      url: requestBase,
      siteName: "Oldest & Best",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Oldest & Best Manuscript Evidence Database — 51 contested New Testament readings",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="archive-grid antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-xl bg-ink-900 px-4 py-3 text-sm font-black text-white shadow-card transition focus:translate-y-0 dark:bg-archive-gold dark:text-ink-900"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
