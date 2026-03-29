import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Graveyard",
  description: "Curated by Malayali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
    >
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6899968908327043"
          crossOrigin="anonymous"
        ></script>
        {/* CPM Network Global Script */}
        <script src="https://pl29006726.profitablecpmratenetwork.com/de/8f/09/de8f09524e140399029e60d7a7396fb7.js"></script>
      </head>
      <body className="min-h-screen flex flex-col selection:bg-[#d1d1d1] selection:text-[#050505]">
        <main className="flex-grow flex flex-col relative w-full min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
