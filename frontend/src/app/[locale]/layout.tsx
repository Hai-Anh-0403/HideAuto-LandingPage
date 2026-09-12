import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { isLocale } from "@/content";

import "../globals.css";

const barlow = Barlow({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HideAuto",
  description: "HideAuto landing page",
};

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
