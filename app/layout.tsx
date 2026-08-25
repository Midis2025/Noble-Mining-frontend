import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "THE Noble Mining Investment Conference — February 17–18, 2027 · Boca Raton, Florida",
  description: "Join decision makers, corporate executives, institutional investors and high-net-worth individuals at THE Noble Mining Investment Conference in Boca Raton, Florida.",
  icons: {
    icon: [
      { url: "/Noble icon (2).png" },
      { url: "/Noble icon (2).png", type: "image/png" }
    ],
    shortcut: "/Noble icon (2).png",
    apple: "/Noble icon (2).png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/Noble icon (2).png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
