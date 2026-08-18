import type { Metadata } from "next";
import "./globals.css";

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
      <head />
      <body className="antialiased">{children}</body>
    </html>
  );
}
