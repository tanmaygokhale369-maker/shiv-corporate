import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shiv Corporate Solution | Premium Corporate Gifts & Housekeeping Products",
    template: "%s | Shiv Corporate",
  },
  description:
    "India's trusted supplier of premium corporate gifts, housekeeping products, office supplies, and promotional merchandise. Bulk orders, competitive pricing, pan-India delivery.",
  keywords: [
    "corporate gifts India",
    "housekeeping products",
    "office supplies",
    "promotional products",
    "bulk corporate gifts",
    "cleaning supplies",
    "office utility products",
    "branded merchandise",
    "Shiv Corporate",
  ],
  authors: [{ name: "Shiv Corporate Solution" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shivcorporate.com",
    siteName: "Shiv Corporate Solution",
    title: "Shiv Corporate Solution | Premium Corporate Gifts & Housekeeping Products",
    description:
      "India's trusted supplier of premium corporate gifts, housekeeping products, and office supplies. Bulk orders welcome.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shiv Corporate Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Corporate Solution",
    description: "Premium corporate gifts & housekeeping products. Pan-India delivery.",
  },
  verification: {
    google: "s21LfkprgUD_g3qH3ff0BnvS1IGfQoJp2MPANVicHsw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d0d10" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

