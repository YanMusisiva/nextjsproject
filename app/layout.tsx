"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AS ELEKTRIKA & TEK</title>
        <meta name="description" content="AS ELEKTRIKA & TEK - Votre source d'actualités et de ressources sur l'électronique et la technologie." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1692698862563740"
     crossOrigin="anonymous"></script>
      </head>
      <body>
        {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
