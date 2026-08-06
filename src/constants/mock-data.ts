/**
 * @file src/constants/mock-data.ts
 * @description Realistic Pakistani agricultural mock data for business component demos.
 * Components themselves never hardcode this — pass via props.
 */

import type { AuctionCardData } from "@/components/business/auction-card";
import type { CropCardData } from "@/components/business/crop-card";
import type { FarmerCardData } from "@/components/business/farmer-card";
import type { BuyerCardData } from "@/components/business/buyer-card";
import type { LiveBidData } from "@/components/business/live-bid-card";
import type { NotificationData } from "@/components/business/notification-card";
import type { ReviewData } from "@/components/business/review-card";
import type { MessageBubbleProps } from "@/components/business/message-bubble";

export const MOCK_AUCTIONS: AuctionCardData[] = [
  {
    id: "auc-101",
    title: "Purebred Sahiwal Bull (4 Dantan)",
    category: "Livestock — Cattle",
    imageUrl:
      "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80",
    location: "Vehari, Punjab",
    currentBid: 340000,
    startingPrice: 280000,
    bidCount: 14,
    endsAt: new Date(Date.now() + 2 * 3600 * 1000 + 45 * 60 * 1000).toISOString(),
    status: "closing_soon",
    verificationType: "vet_certified",
    isBookmarked: true,
  },
  {
    id: "auc-102",
    title: "Neeli-Ravi Buffalo (16L Daily Milk Yield)",
    category: "Livestock — Buffalo",
    imageUrl:
      "https://images.unsplash.com/photo-1570042707208-148298728999?auto=format&fit=crop&w=800&q=80",
    location: "Okara, Punjab",
    currentBid: 420000,
    startingPrice: 350000,
    bidCount: 8,
    endsAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    status: "active",
    verificationType: "govt_verified",
  },
  {
    id: "auc-103",
    title: "Massey Ferguson 385 Tractor (85 HP)",
    category: "Farm Machinery",
    imageUrl:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    location: "Faisalabad, Punjab",
    currentBid: 2850000,
    startingPrice: 2500000,
    bidCount: 22,
    endsAt: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    status: "active",
    verificationType: "biometric_verified",
  },
  {
    id: "auc-104",
    title: "Beetal Goat Herd (12 Heads)",
    category: "Livestock — Goats",
    imageUrl:
      "https://images.unsplash.com/photo-1524024973431-2ee866473f29?auto=format&fit=crop&w=800&q=80",
    location: "Bahawalpur, Punjab",
    currentBid: 185000,
    startingPrice: 150000,
    bidCount: 31,
    endsAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: "sold",
    verificationType: "kyc_verified",
  },
];

export const MOCK_CROPS: CropCardData[] = [
  {
    id: "crop-201",
    title: "Super Kernel Basmati Rice (Export Grade)",
    cropType: "Rice",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    quantityMunds: 500,
    pricePerMund: 4800,
    qualityGrade: "export_quality",
    location: "Hafizabad, Punjab",
    harvestDate: "2024-11-10",
    sellerName: "Chaudhry Agricultural Farms",
    verificationType: "quality_certified",
    isDirectSale: true,
  },
  {
    id: "crop-202",
    title: "Organic White Wheat (Akbar-19 Variety)",
    cropType: "Wheat",
    imageUrl:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    quantityMunds: 1200,
    pricePerMund: 4200,
    qualityGrade: "organic",
    location: "Khanewal, Punjab",
    harvestDate: "2024-04-20",
    sellerName: "Malik Bio Farms",
    verificationType: "govt_verified",
  },
  {
    id: "crop-203",
    title: "BT Cotton Lint (Grade A)",
    cropType: "Cotton",
    imageUrl:
      "https://images.unsplash.com/photo-1595231776516-e04563f7d9b1?auto=format&fit=crop&w=800&q=80",
    quantityMunds: 800,
    pricePerMund: 12500,
    qualityGrade: "grade_a_plus",
    location: "Rahim Yar Khan, Punjab",
    harvestDate: "2024-10-05",
    sellerName: "Sindh Cotton Growers Co-op",
    verificationType: "quality_certified",
    isDirectSale: false,
  },
];

export const MOCK_FARMERS: FarmerCardData[] = [
  {
    id: "farmer-301",
    name: "Muhammad Tariq Chaudhry",
    farmName: "Chaudhry Cattle & Grain Estate",
    location: "Sargodha, Punjab",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    status: "online",
    verificationType: "govt_verified",
    rating: 4.9,
    reviewCount: 48,
    activeListingsCount: 6,
    totalSalesCount: 142,
    phone: "+923001234567",
    memberSinceYear: 2019,
  },
  {
    id: "farmer-302",
    name: "Haji Abdul Rehman",
    farmName: "Rehman Organic Cotton & Wheat",
    location: "Multan, Punjab",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    status: "away",
    verificationType: "vet_certified",
    rating: 4.8,
    reviewCount: 32,
    activeListingsCount: 3,
    totalSalesCount: 89,
    memberSinceYear: 2021,
  },
];

export const MOCK_BUYERS: BuyerCardData[] = [
  {
    id: "buyer-401",
    name: "Sheikh Zubair Ahmad",
    companyName: "Punjab Rice Mills & Exporters",
    location: "Lahore Grain Market",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    status: "online",
    verificationType: "biometric_verified",
    totalBidsPlaced: 184,
    purchasesCompleted: 67,
    trustScorePercentage: 98,
    preferredCategories: ["Rice", "Wheat", "Machinery"],
  },
  {
    id: "buyer-402",
    name: "Fatima Bibi Trading Co.",
    companyName: "Karachi Livestock Importers",
    location: "Landhi Cattle Market, Karachi",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    status: "busy",
    verificationType: "kyc_verified",
    totalBidsPlaced: 96,
    purchasesCompleted: 41,
    trustScorePercentage: 91,
    preferredCategories: ["Cattle", "Buffalo"],
  },
];

export const MOCK_LIVE_BIDS: LiveBidData[] = [
  {
    id: "bid-501",
    bidderName: "Malik Usman",
    bidderLocation: "Rawalpindi",
    bidderAvatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    amountPKR: 350000,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: "highest",
    isNew: true,
  },
  {
    id: "bid-502",
    bidderName: "Rashid Minhas",
    bidderLocation: "Faisalabad",
    amountPKR: 345000,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: "outbid",
  },
  {
    id: "bid-503",
    bidderName: "Asma Livestock Traders",
    bidderLocation: "Sheikhupura",
    amountPKR: 340000,
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
    status: "outbid",
  },
];

export const MOCK_NOTIFICATIONS: NotificationData[] = [
  {
    id: "notif-601",
    title: "Highest Bidder Confirmation!",
    message:
      "Your bid of PKR 340,000 is currently the leading bid for Sahiwal Bull #4092.",
    type: "bid_won",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isRead: false,
    actionLabel: "View Auction",
  },
  {
    id: "notif-602",
    title: "Outbid Alert",
    message:
      "You have been outbid on Super Kernel Basmati Rice (500 Munds). New highest bid is PKR 4,900/Mund.",
    type: "outbid",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    isRead: true,
    actionLabel: "Increase Bid",
  },
  {
    id: "notif-603",
    title: "Payment Received",
    message:
      "Escrow released PKR 420,000 for Neeli-Ravi Buffalo auction. Funds arrive in 1–2 business days.",
    type: "payment",
    timestamp: new Date(Date.now() - 3 * 3600 * 1000),
    isRead: false,
    actionLabel: "View Receipt",
  },
];

export const MOCK_REVIEWS: ReviewData[] = [
  {
    id: "rev-701",
    reviewerName: "Chaudhry Kamran",
    reviewerAvatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    isVerifiedBuyer: true,
    rating: 5,
    date: "2024-11-20",
    itemPurchasedTitle: "500 Munds Super Basmati Rice",
    comment:
      "Excellent grain quality and exact weight. Seller was prompt with delivery documentation. Highly recommended!",
    helpfulCount: 14,
  },
  {
    id: "rev-702",
    reviewerName: "Sanaullah Khan",
    isVerifiedBuyer: true,
    rating: 4,
    date: "2024-10-08",
    itemPurchasedTitle: "Sahiwal Bull — Vehari Lot",
    comment:
      "Healthy animal as described. Vet papers were complete. Transport coordination took an extra day but overall a fair deal.",
    helpfulCount: 6,
  },
];

export const MOCK_MESSAGES: Omit<MessageBubbleProps, "onAcceptOffer" | "onRejectOffer" | "className">[] = [
  {
    id: "msg-1",
    senderName: "Chaudhry Tariq (Seller)",
    text: "Assalam-o-Alaikum! The Sahiwal bull is available for inspection in Vehari. I am sending a special direct price offer for full purchase.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isSentByMe: false,
    offerAttachment: {
      title: "Direct Buy Offer — Sahiwal Bull",
      pricePKR: 335000,
      quantity: "1 Head",
      status: "pending",
    },
  },
  {
    id: "msg-2",
    senderName: "You (Buyer)",
    text: "Walaikum Assalam! Thanks for the offer. I have accepted the price of PKR 335,000.",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isSentByMe: true,
    status: "read",
  },
];

export const MOCK_PRICE_CARD = {
  currentBidPKR: 340000,
  startingPricePKR: 280000,
  minIncrementPKR: 5000,
  reservePriceMet: true,
  buyNowPricePKR: 380000,
  totalBidsCount: 14,
  quickIncrementsPKR: [5000, 10000, 25000],
} as const;

export const MOCK_ANALYTICS = [
  {
    title: "Monthly Revenue",
    metricValue: "PKR 1,420,000",
    changePercentage: 24.5,
    periodLabel: "vs PKR 1,140,000 last month",
    targetProgress: 82,
  },
  {
    title: "Average Bid Increment",
    metricValue: "PKR 12,500",
    changePercentage: -4.2,
    periodLabel: "vs PKR 13,050 last week",
    targetProgress: 65,
  },
  {
    title: "Auction Success Rate",
    metricValue: "94.8%",
    changePercentage: 3.1,
    periodLabel: "98 of 103 auctions sold",
    targetProgress: 95,
  },
] as const;

export const MOCK_STATISTICS = [
  {
    label: "Active Bids",
    value: "PKR 4.2M",
    description: "+18% from last week",
    iconVariant: "brand" as const,
    trendPercentage: 18,
  },
  {
    label: "Crops Sold",
    value: "1,450 Munds",
    description: "8 auctions closed today",
    iconVariant: "harvest" as const,
    trendPercentage: 12,
  },
  {
    label: "Verified Farmers",
    value: "12,480",
    description: "+340 new this month",
    iconVariant: "success" as const,
    trendPercentage: 2.8,
  },
  {
    label: "Market Volume",
    value: "PKR 84.5M",
    description: "Monthly turnover",
    iconVariant: "info" as const,
    trendPercentage: 9.4,
  },
] as const;
