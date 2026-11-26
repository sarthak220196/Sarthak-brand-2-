import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";
import { person } from "@/data/site";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${person.name} | One career. Several frequencies.`,
  description:
    "Sarthak Sighat: Mumbai-based commercial operator across product, GTM, enterprise sales and cross-border payments partnerships. Also a DJ.",
  keywords: [
    "Sarthak Sighat",
    "cross-border payments",
    "strategic partnerships",
    "enterprise sales",
    "fintech",
    "GTM",
    "DJ",
    "Mumbai",
  ],
  openGraph: {
    title: `${person.name} | One career. Several frequencies.`,
    description: "I make money move. I make music move. I make things happen.",
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
