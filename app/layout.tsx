import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avalors = localFont({
  src: "./fonts/Avalors-Personal-Use-Only.woff2",
  variable: "--font-avalors",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Challenge 1",
  description: "The first challenge to help me better my three.js skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${avalors.variable} antialiased font-avalors`}
      >
        {children}
      </body>
    </html>
  );
}
