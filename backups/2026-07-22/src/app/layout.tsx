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
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
