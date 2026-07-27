import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "श्रीमद्भगवद्गीता - AI Divine Portal",
  description: "Experience Bhagavad Gita with AI Visuals and Spiritual Guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}