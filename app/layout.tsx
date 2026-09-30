import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const content = getSiteContent();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? content.site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: content.site.title, template: `%s · ${content.site.title}` },
  description: content.site.description,
  openGraph: {
    title: content.site.title,
    description: content.site.shortDescription,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: `${content.site.title} graph timeline` }],
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.shortDescription,
    images: ["/og.png"],
  },
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#f8f6f0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
