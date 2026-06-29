import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Fraunces, Instrument_Serif } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SceneRootDynamic, CursorDynamic } from "@/components/ClientChrome";
import { site } from "@/lib/site";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const fontSerifItalic = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  publisher: site.fullName,
  alternates: { canonical: site.url },
  category: "technology",
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TomiwaIsGod",
    creator: "@TomiwaIsGod",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Web3",
    "Blockchain",
    "Smart Contracts",
    "Settlement Infrastructure",
    "Full-Stack Engineering",
  ],
  sameAs: [site.socials.x, site.socials.github, site.socials.shakeslabs],
  worksFor: {
    "@type": "Organization",
    name: "Shakes Labs",
    url: site.socials.shakeslabs,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  author: { "@type": "Person", name: site.fullName },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} ${fontSerifItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <a href="#main" className="skip-link">Skip to content</a>
        <LenisProvider />
        <MotionProvider />
        <SceneRootDynamic />
        <CursorDynamic />
        {children}
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
