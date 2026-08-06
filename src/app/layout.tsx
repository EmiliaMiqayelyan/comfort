import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-comfort-sans",
  subsets: ["latin", "cyrillic"],
});

const display = Syne({
  variable: "--font-comfort-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comfort.am"),
  title: {
    default: "Comfort — Premium architectural interiors",
    template: "%s · Comfort",
  },
  description:
    "Premium baseboards, 3D wall panels, moldings and profiles for modern architecture.",
  openGraph: {
    type: "website",
    siteName: "Comfort",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
