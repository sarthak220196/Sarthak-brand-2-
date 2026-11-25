import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";
import { person } from "@/data/site";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${person.name} | ${person.statement}`,
  description:
    "Sarthak Sighat: Mumbai-based engineering graduate turned commercial operator. Business development, go-to-market, enterprise sales and strategic partnerships across B2B SaaS and fintech.",
  keywords: [
    "Sarthak Sighat",
    "cross-border payments",
    "strategic partnerships",
    "enterprise sales",
    "fintech",
    "GTM",
    "business development",
    "go-to-market",
    "Mumbai",
  ],
  openGraph: {
    title: `${person.name} | ${person.statement}`,
    description: "People. Products. Markets. Business. I make things happen.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F1EDE2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
