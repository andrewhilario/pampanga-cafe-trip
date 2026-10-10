import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kape't Kwentuhan • Pampanga Cafe & Food Trip",
  description: "A romantic weekend cafe hopping and heritage food adventure across Clark, Angeles City, and San Fernando, Pampanga.",
  keywords: ["Pampanga cafes", "Clark coffee shops", "Pampanga food trip", "Kape't Kwentuhan", "Angeles cafes"],
  authors: [{ name: "Kape't Kwentuhan" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FDFBF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-latte-50 text-latte-900 font-sans antialiased min-h-screen selection:bg-terracotta-400 selection:text-white pb-24">
        {children}
      </body>
    </html>
  );
}
