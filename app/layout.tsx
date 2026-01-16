import type { Metadata } from "next";
import React from "react";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Custom Solutions",
  description: "A responsive landing page section featuring custom solutions, built with React, Tailwind CSS, and shadcn/ui components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${righteous.variable} bg-[#1f1f1f] text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}