/**
 * @file src/constants/landing.ts
 * @description Content and mock data for the AgroBid marketing landing page.
 * Presentation components import from here — no hardcoded marketing copy in UI.
 */

import type { AuctionCardData } from "@/components/business/auction-card";
import { MOCK_AUCTIONS } from "@/constants/mock-data";

export const LANDING_HERO = {
  brand: "AgroBid",
  headline: "Pakistan's marketplace for livestock and crop auctions",
  description:
    "Bid live on verified farm produce, or list your harvest and reach buyers across Punjab, Sindh, and beyond.",
  primaryCta: { label: "Start Bidding", href: "/auctions" },
  secondaryCta: { label: "Sell Your Crops", href: "/listings/new" },
  image: {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=80",
    alt: "Golden wheat field under open sky in rural Pakistan",
  },
} as const;

export const LANDING_TRUST = [
  {
    id: "verified-farmers",
    title: "Verified Farmers",
    description:
      "Sellers complete KYC and farm verification before listings go live.",
    icon: "shield" as const,
  },
  {
    id: "secure-payments",
    title: "Secure Payments",
    description:
      "Escrow-backed settlements keep funds safe until delivery is confirmed.",
    icon: "lock" as const,
  },
  {
    id: "live-auctions",
    title: "Live Auctions",
    description:
      "Real-time bidding with countdown timers and instant bid updates.",
    icon: "gavel" as const,
  },
  {
    id: "fast-transactions",
    title: "Fast Transactions",
    description:
      "Close deals in hours, not weeks — from winning bid to payout.",
    icon: "zap" as const,
  },
] as const;

export const LANDING_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Register",
    description:
      "Create a free buyer or seller account with your mobile number and CNIC details.",
  },
  {
    step: 2,
    title: "Verify Account",
    description:
      "Complete NADRA-backed identity checks so the marketplace stays trustworthy.",
  },
  {
    step: 3,
    title: "List or Bid",
    description:
      "Post livestock and crop lots, or place competitive bids on live auctions.",
  },
  {
    step: 4,
    title: "Complete Transaction",
    description:
      "Confirm delivery, release escrow, and leave a verified review.",
  },
] as const;

/** Featured auctions for the landing grid — subset of shared mock data. */
export const LANDING_FEATURED_AUCTIONS: AuctionCardData[] =
  MOCK_AUCTIONS.filter((a) => a.status === "active" || a.status === "closing_soon").slice(
    0,
    3
  );

export const LANDING_STATS = [
  {
    id: "farmers",
    label: "Active Farmers",
    value: "12,480",
    description: "Verified sellers nationwide",
    iconVariant: "success" as const,
    trendPercentage: 8.2,
  },
  {
    id: "auctions",
    label: "Live Auctions",
    value: "346",
    description: "Running right now",
    iconVariant: "brand" as const,
    trendPercentage: 14,
  },
  {
    id: "sales",
    label: "Successful Sales",
    value: "28,900+",
    description: "Completed deals to date",
    iconVariant: "harvest" as const,
    trendPercentage: 11.5,
  },
  {
    id: "volume",
    label: "Total Transaction Value",
    value: "PKR 4.8B",
    description: "Lifetime marketplace volume",
    iconVariant: "info" as const,
    trendPercentage: 22,
  },
] as const;

export const LANDING_TESTIMONIALS = [
  {
    id: "t-1",
    quote:
      "I sold 500 munds of basmati within two days. Buyers were serious, payments cleared through escrow, and I did not have to chase anyone at the mandi.",
    name: "Muhammad Tariq Chaudhry",
    role: "Grain Farmer — Sargodha",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "t-2",
    quote:
      "As a rice mill buyer, live auctions save me travel time. Vet-certified livestock listings and clear bid history give me confidence before I commit.",
    name: "Sheikh Zubair Ahmad",
    role: "Buyer — Lahore Grain Market",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "t-3",
    quote:
      "Listing our Neeli-Ravi buffalo was straightforward. The countdown kept interest high and the winning bidder paid on schedule.",
    name: "Haji Abdul Rehman",
    role: "Livestock Seller — Multan",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 4,
  },
] as const;

export const LANDING_FAQ = [
  {
    id: "faq-1",
    question: "Who can buy and sell on AgroBid?",
    answer:
      "Any adult in Pakistan can register as a buyer. Sellers list livestock, crops, and farm machinery after completing identity and farm verification.",
  },
  {
    id: "faq-2",
    question: "How do payments work?",
    answer:
      "Winning bids are held in escrow until both parties confirm delivery. Funds are then released to the seller’s verified bank account, typically within 1–2 business days.",
  },
  {
    id: "faq-3",
    question: "Are listings verified?",
    answer:
      "Yes. High-value livestock often carries vet certification, and crop lots can include quality grading. Government and biometric verification badges appear on eligible profiles.",
  },
  {
    id: "faq-4",
    question: "What happens if I am outbid?",
    answer:
      "You receive an instant outbid notification so you can raise your offer before the auction closes. You only pay if you place the winning bid.",
  },
  {
    id: "faq-5",
    question: "Is there a fee to list produce?",
    answer:
      "Creating an account is free. Listing fees and success commissions are shown clearly before you publish a lot — no surprise charges at settlement.",
  },
] as const;

export const LANDING_FINAL_CTA = {
  title: "Ready to bid or sell with confidence?",
  description:
    "Join thousands of Pakistani farmers and buyers already trading on AgroBid.",
  primaryCta: { label: "Start Bidding", href: "/auctions" },
  secondaryCta: { label: "Sell Your Crops", href: "/listings/new" },
} as const;
