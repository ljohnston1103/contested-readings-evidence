import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oldest & Best — Research Expansion Preview",
  description:
    "Preview the twenty-one newly researched textual-variant records for the Oldest & Best manuscript evidence database.",
  openGraph: {
    title: "Oldest & Best — 21 New Evidence Records",
    description:
      "Explore 51 documented passages in the expanded manuscript evidence database.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Oldest & Best research expansion" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
