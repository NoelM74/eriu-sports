import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
});

const SITE = "https://eriusports.com";
const DESCRIPTION =
  "Retro football shirts, county GAA jerseys, GAA training vests and AFL jerseys. From €25, delivered to Ireland and the UK in 8–14 days. Free delivery over €49.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Retro Football Shirts & GAA Jerseys | Ériu Sports",
    template: "%s | Ériu Sports",
  },
  description: DESCRIPTION,
  applicationName: "Ériu Sports",
  // Canonicals are set per page; there are no language/region variants of the site.
  openGraph: {
    type: "website",
    locale: "en_IE",
    alternateLocale: ["en_GB"],
    url: SITE,
    siteName: "Ériu Sports",
    title: "Retro Football Shirts & GAA Jerseys | Ériu Sports",
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ériu Sports: retro football shirts and GAA jerseys" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retro Football Shirts & GAA Jerseys | Ériu Sports",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const storeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${SITE}/#store`,
    name: "Ériu Sports",
    url: SITE,
    logo: `${SITE}/apple-touch-icon.png`,
    image: `${SITE}/og-image.jpg`,
    description: DESCRIPTION,
    areaServed: [
      { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    sameAs: ["https://www.instagram.com/eriusports/", "https://www.facebook.com/EriuSports"],
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["IE", "GB"],
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "Ériu Sports",
    url: SITE,
    inLanguage: "en-IE",
    publisher: { "@id": `${SITE}/#store` },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IE">
      <body className={`${lexend.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }} />
        <CurrencyProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
