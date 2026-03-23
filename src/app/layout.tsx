import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col selection:bg-[#d1d1d1] selection:text-[#050505]">
        <main className="flex-grow flex flex-col relative w-full h-full overflow-hidden">
          {children}
        </main>
        <footer className="w-full border-t border-[#d1d1d1]/10 py-8 mt-auto z-10 relative bg-[#050505]/50 backdrop-blur-md">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm tracking-[0.2em] text-[#d1d1d1]/70 uppercase font-mono font-light mix-blend-plus-lighter">
              Curated by Malayali
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
