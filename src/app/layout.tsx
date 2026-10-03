/**
 * @file src/app/layout.tsx
 *
 * Root layout — the outermost shell rendered for every route.
 *
 * Responsibilities:
 *  - Configure Next.js font optimization (Inter + Plus Jakarta Sans + JetBrains Mono)
 *  - Apply CSS variable font references to <html>
 *  - Wrap the tree in ThemeProvider for dark/light mode support
 *  - Wrap the tree in LanguageProvider for English ⇄ Urdu bilingual support
 *  - Define site-wide SEO metadata via Next.js Metadata API
 *  - Set accessibility attributes (lang, dir) dynamically from cookies
 *  - Render the skip-to-content link for keyboard users
 */

import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";
import type { Language } from "@/config/i18n";
import "./globals.css";

/* ─────────────────────────────────────────────────────────────────
   FONT CONFIGURATION
   - Inter: body text — clean, highly legible at small sizes
   - Plus Jakarta Sans: headings — modern with personality
   - JetBrains Mono: code blocks, bid IDs, timestamps
   Each font is assigned a CSS variable injected on <html>.
───────────────────────────────────────────────────────────────── */

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  fallback: ["Courier New", "monospace"],
});

/* ─────────────────────────────────────────────────────────────────
   SITE-WIDE METADATA
───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: siteConfig.description,
  keywords: [
    "agricultural marketplace",
    "Pakistan livestock",
    "online bidding",
    "crop auction",
    "farm produce",
    "agrobid",
    "Pakistan farming",
    "livestock sale",
  ],

  authors: [{ name: "AgroBid Pakistan", url: siteConfig.url }],
  creator: "AgroBid Pakistan",
  publisher: "AgroBid Pakistan",

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@agrobidpk",
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};

/* ─────────────────────────────────────────────────────────────────
   VIEWPORT
───────────────────────────────────────────────────────────────── */

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5fbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#1c2e22" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─────────────────────────────────────────────────────────────────
   ROOT LAYOUT COMPONENT
───────────────────────────────────────────────────────────────── */

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const cookieStore = await cookies();
  const savedLang = (cookieStore.get("agrobid_lang")?.value as Language) || "en";
  const initialDir = savedLang === "ur" ? "rtl" : "ltr";

  return (
    <html
      lang={savedLang}
      dir={initialDir}
      suppressHydrationWarning
      className={[
        fontInter.variable,
        fontPlusJakartaSans.variable,
        fontJetBrainsMono.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Skip to main content */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="agrobid-theme"
        >
          <LanguageProvider initialLanguage={savedLang}>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}