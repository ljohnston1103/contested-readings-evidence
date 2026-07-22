import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Evidence Atlas | Contested Bible Readings",
    template: "%s | Evidence Atlas",
  },
  description:
    "A modern evidence database for contested New Testament readings, Greek manuscripts, ancient versions, and patristic witnesses.",
};

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
