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

export const metadata: Metadata = {
  metadataBase: new URL("https://eriusports.com"),
  title: {
    default: "Ériu Sports | Premium Irish Football Heritage & GAA Gear",
    template: "%s | Ériu Sports",
  },
  description:
    "Premium retro football jerseys and GAA gear. Designed in Ireland, built for performance. Shop classic Ireland jerseys, Premier League classics, and authentic GAA merchandise. Free shipping on orders over €49.",
  keywords: [
    "retro football jerseys",
    "Irish football",
    "GAA gear",
    "vintage soccer shirts",
    "Ireland classics",
    "Premier League retro kits",
    "Ériu Sports",
    "designed in Ireland",
  ],
  authors: [{ name: "Ériu Sports" }],
  creator: "Ériu Sports",
  publisher: "Ériu Sports",
  alternates: {
    canonical: "/",
    languages: {
      'en-IE': '/en-IE',
      'en-GB': '/en-GB',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://eriusports.com",
    title: "Ériu Sports | Premium Irish Football Heritage",
    description:
      "Premium retro football jerseys and GAA gear. Designed in Ireland, built for performance.",
    siteName: "Ériu Sports",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ériu Sports - Premium Irish Football Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ériu Sports",
    description: "Premium retro football jerseys and GAA gear.",
    creator: "@eriusports",
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
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="en-IE" href="https://eriusports.com/en-IE" />
        <link rel="alternate" hrefLang="en-GB" href="https://eriusports.com/en-GB" />
        <link rel="alternate" hrefLang="en-US" href="https://eriusports.com/en-US" />
        <link rel="alternate" hrefLang="x-default" href="https://eriusports.com" />
      </head>
      <body className={`${lexend.variable} antialiased`}>
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
