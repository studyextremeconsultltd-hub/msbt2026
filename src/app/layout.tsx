import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/msbt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.shortName} | ${site.name}`,
  description: site.tagline,
  icons: {
    icon: "/brand/msbt-logo.png",
    apple: "/brand/msbt-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full bg-cream font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
