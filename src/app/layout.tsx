import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { getPerson, siteUrl } from "@/lib/person";
import "./globals.css";

const heading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const { profile, seo } = getPerson();
const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: seo.titleDefault, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.fullName, url: base }],
  creator: profile.fullName,
  applicationName: seo.siteName,
  category: "finance",
  alternates: { canonical: "/", languages: { "tr-TR": base } },
  openGraph: {
    type: "profile",
    firstName: profile.firstName,
    lastName: profile.lastName,
    title: seo.titleDefault,
    description: seo.description,
    url: base,
    siteName: seo.siteName,
    locale: seo.locale,
    images: [
      {
        url: profile.photos.portrait.src,
        width: profile.photos.portrait.w,
        height: profile.photos.portrait.h,
        alt: profile.photos.portrait.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titleDefault,
    description: seo.description,
    images: [profile.photos.portrait.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: seo.googleSiteVerification || undefined },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d1713",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:bg-ledger focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:text-white focus:not-sr-only"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
