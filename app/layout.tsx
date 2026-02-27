import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Global styles

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Think Before You Panic",
  description: "Understanding Cyberchondria and Digital Health Anxiety",
  icons: {
    icon: "/brain.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
