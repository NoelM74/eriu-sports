import type { Metadata } from "next";
import { Lexend, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { BulkOrderProvider } from "@/lib/order-context";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eriusports.com"),
  title: {
    default: "Ériu | Custom Performance Leisurewear, Branded for Your Team",
    template: "%s | Ériu Performance Wear",
  },
  description:
    "Premium custom activewear, manufactured to order and branded for teams, gyms, studios and brands. Men & women. Tops, tanks, compression, shorts, leggings and yoga wear from just 10 pieces. Designed in Ireland.",
  keywords: [
    "custom activewear manufacturer",
    "bulk gym wear",
    "branded leisurewear",
    "custom team kit",
    "wholesale activewear",
    "custom compression wear",
    "branded yoga wear",
    "Ériu Performance Wear",
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
    title: "Ériu | Custom Performance Leisurewear",
    description:
      "Premium custom activewear, manufactured to order and branded for teams, gyms and brands. Men & women, from just 10 pieces.",
    siteName: "Ériu Performance Wear",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ériu Performance Wear — custom branded activewear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ériu Performance Wear",
    description: "Custom activewear, branded for your team. From 10 pieces.",
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
      <body className={`${lexend.variable} ${archivo.variable} ${jetBrainsMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Ériu Performance Wear",
                url: "https://eriusports.com",
                description:
                  "Custom performance leisurewear, manufactured to order and branded for teams, gyms and brands. Men and women, from 10 pieces.",
                slogan: "Performance wear, branded as yours.",
                areaServed: "Worldwide",
                foundingLocation: { "@type": "Place", name: "Ireland" },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Ériu Performance Wear",
                url: "https://eriusports.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://eriusports.com/shop?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <CurrencyProvider>
          <CartProvider>
            <BulkOrderProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </BulkOrderProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
