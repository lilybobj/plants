import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Afacad } from "next/font/google";

const windowsBold = localFont({
  src: "./fonts/Windows-Bold.ttf",
  variable: "--font-windows-bold",
  display: "swap",
});

const vcr = localFont({
  src: "./fonts/VCR_OSD_MONO_1.001.ttf",
  variable: "--font-vcr",
  display: "swap",
});

const afacad = Afacad({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "UCLA Botanical Club",
  description: "UCLA Botanical Club",
  icons: {
    icon: `${basePath}/images/logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${windowsBold.variable} ${vcr.variable}`}>
      <body className={afacad.className}>
        {children}
      </body>
    </html>
  );
}
