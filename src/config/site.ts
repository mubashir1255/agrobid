/**
 * @file site.ts
 * @description Central site configuration used by metadata, SEO, and layout components.
 * Update this file to change site-wide branding, URLs, and social links.
 */

export const siteConfig = {
  name: "AgroBid Pakistan",
  shortName: "AgroBid",
  description:
    "Pakistan's leading agricultural marketplace for buying and selling livestock, crops, and farm produce via transparent online bidding.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://agrobid.pk",
  ogImage: "/og-image.png",
  locale: "en_PK",
  lang: "en",

  /** Structured contact and location data */
  contact: {
    email: "support@agrobid.pk",
    phone: "+92-300-0000000",
    address: "Lahore, Punjab, Pakistan",
  },

  /** Social media links for footer / share meta */
  social: {
    twitter: "https://twitter.com/agrobidpk",
    facebook: "https://facebook.com/agrobidpk",
    instagram: "https://instagram.com/agrobidpk",
    youtube: "https://youtube.com/@agrobidpk",
  },

  /** Navigation links — consumed by header and mobile nav */
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Auctions", href: "/#featured-auctions" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Stats", href: "/#stats" },
    { label: "FAQ", href: "/#faq" },
    { label: "About", href: "/about" },
  ],

  /** Footer column links */
  footerLinks: {
    platform: [
      { label: "Browse Auctions", href: "/auctions" },
      { label: "Post a Listing", href: "/listings/new" },
      { label: "Bidding Guide", href: "/guides/bidding" },
      { label: "Pricing", href: "/pricing" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Dispute Resolution", href: "/disputes" },
      { label: "Community", href: "/community" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
