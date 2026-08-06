/**
 * @file src/app/design-system/page.tsx
 * @description Design system showcase for AgroBid business domain components.
 */

"use client";

import * as React from "react";
import {
  SiteLayout,
  Section,
  SectionHeader,
} from "@/components/layouts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast,
} from "@/components/ui";

import {
  AuctionCard,
  CropCard,
  FarmerCard,
  BuyerCard,
  LiveBidCard,
  CountdownTimer,
  AuctionStatusBadge,
  VerificationBadge,
  QualityBadge,
  AnalyticsCard,
  StatisticsCard,
  NotificationCard,
  MessageBubble,
  PriceCard,
  ReviewCard,
} from "@/components/business";

import {
  MOCK_AUCTIONS,
  MOCK_CROPS,
  MOCK_FARMERS,
  MOCK_BUYERS,
  MOCK_LIVE_BIDS,
  MOCK_NOTIFICATIONS,
  MOCK_REVIEWS,
  MOCK_MESSAGES,
  MOCK_PRICE_CARD,
  MOCK_ANALYTICS,
  MOCK_STATISTICS,
} from "@/constants/mock-data";

import { ThemeToggle } from "@/components/primitives";
import { Gavel, TrendingUp, Users, ShoppingBag, BarChart3 } from "lucide-react";

const STAT_ICONS = [
  <Gavel key="gavel" className="h-6 w-6" />,
  <ShoppingBag key="cart" className="h-6 w-6" />,
  <Users key="users" className="h-6 w-6" />,
  <TrendingUp key="trend" className="h-6 w-6" />,
];

export default function ComponentLibraryShowcase() {
  const [activeTab, setActiveTab] = React.useState("cards");

  return (
    <SiteLayout>
      <Section aria-label="Business component library showcase">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <SectionHeader
            eyebrow="AgroBid Pakistan"
            title="Business Domain Components"
            description="15 reusable agricultural marketplace components — props-driven, dark-mode ready, and responsive."
          />
          <ThemeToggle variant="labeled" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList
            variant="pill"
            className="w-full justify-start overflow-x-auto"
          >
            <TabsTrigger value="cards" variant="pill">
              Marketplace Cards
            </TabsTrigger>
            <TabsTrigger value="badges" variant="pill">
              Badges & Timers
            </TabsTrigger>
            <TabsTrigger value="dashboards" variant="pill">
              Analytics & Stats
            </TabsTrigger>
            <TabsTrigger value="messaging" variant="pill">
              Live Bids & Chat
            </TabsTrigger>
            <TabsTrigger value="pricing" variant="pill">
              Pricing & Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-8 pt-4">
            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                Auction Card
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {MOCK_AUCTIONS.slice(0, 3).map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onBidClick={(id) =>
                      toast.success(`Bid modal opened for ${id}`)
                    }
                    onBookmarkToggle={(id, next) =>
                      toast.info(
                        next
                          ? `Added ${id} to watchlist`
                          : `Removed ${id} from watchlist`
                      )
                    }
                    onViewDetails={(id) => toast.info(`Opening auction ${id}`)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                Crop Card
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {MOCK_CROPS.map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    onBuyOrBidClick={(id) =>
                      toast.success(`Buy/offer action for ${id}`)
                    }
                    onViewDetails={(id) => toast.info(`Opening crop lot ${id}`)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                Farmer Card & Buyer Card
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {MOCK_FARMERS.map((farmer) => (
                  <FarmerCard
                    key={farmer.id}
                    farmer={farmer}
                    onContactClick={(id) =>
                      toast.info(`Message dialog for farmer ${id}`)
                    }
                    onViewProfile={(id) => toast.info(`Farmer profile ${id}`)}
                  />
                ))}
                {MOCK_BUYERS.map((buyer) => (
                  <BuyerCard
                    key={buyer.id}
                    buyer={buyer}
                    onContactClick={(id) =>
                      toast.info(`Contact buyer ${id}`)
                    }
                    onViewProfile={(id) => toast.info(`Buyer profile ${id}`)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-8 pt-4">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Auction Status Badge</CardTitle>
                <CardDescription>
                  Lifecycle states for draft through sold
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-wrap gap-3">
                <AuctionStatusBadge status="draft" />
                <AuctionStatusBadge status="scheduled" />
                <AuctionStatusBadge status="active" />
                <AuctionStatusBadge status="closing_soon" />
                <AuctionStatusBadge status="closed" />
                <AuctionStatusBadge status="cancelled" />
                <AuctionStatusBadge status="sold" />
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Verification Badge & Quality Badge</CardTitle>
                <CardDescription>
                  Trust indicators and crop quality grades
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <VerificationBadge type="govt_verified" />
                  <VerificationBadge type="vet_certified" />
                  <VerificationBadge type="biometric_verified" />
                  <VerificationBadge type="kyc_verified" />
                  <VerificationBadge type="quality_certified" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <QualityBadge grade="grade_a_plus" />
                  <QualityBadge grade="grade_a" />
                  <QualityBadge grade="grade_b" />
                  <QualityBadge grade="organic" />
                  <QualityBadge grade="export_quality" />
                  <QualityBadge grade="standard" />
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Countdown Timer</CardTitle>
                <CardDescription>
                  Live ticking timers with urgency under 1 hour
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground block mb-2">
                    Boxes (normal):
                  </span>
                  <CountdownTimer
                    targetDate={new Date(Date.now() + 14 * 3600 * 1000)}
                    variant="boxes"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground block mb-2">
                    Boxes (urgent):
                  </span>
                  <CountdownTimer
                    targetDate={new Date(Date.now() + 25 * 60 * 1000)}
                    variant="boxes"
                  />
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Compact & Inline:
                  </span>
                  <CountdownTimer
                    targetDate={new Date(Date.now() + 45 * 60 * 1000)}
                    variant="compact"
                  />
                  <CountdownTimer
                    targetDate={new Date(Date.now() + 45 * 60 * 1000)}
                    variant="inline"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-8 pt-4">
            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                Statistics Card
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MOCK_STATISTICS.map((stat, index) => (
                  <StatisticsCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                    iconVariant={stat.iconVariant}
                    trendPercentage={stat.trendPercentage}
                    icon={STAT_ICONS[index]}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                Analytics Card
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_ANALYTICS.map((item) => (
                  <AnalyticsCard
                    key={item.title}
                    title={item.title}
                    metricValue={item.metricValue}
                    changePercentage={item.changePercentage}
                    periodLabel={item.periodLabel}
                    targetProgress={item.targetProgress}
                    icon={<BarChart3 className="h-4 w-4" />}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messaging" className="space-y-8 pt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>Live Bid Card</CardTitle>
                  <CardDescription>
                    Real-time bid feed during active auctions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  {MOCK_LIVE_BIDS.map((bid) => (
                    <LiveBidCard
                      key={bid.id}
                      bid={bid}
                      onClick={(id) => toast.info(`Bid detail ${id}`)}
                    />
                  ))}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>Notification Card</CardTitle>
                  <CardDescription>
                    User alerts and activity notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  {MOCK_NOTIFICATIONS.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onActionClick={() =>
                        toast.info(`Action: ${notification.actionLabel}`)
                      }
                      onDismiss={(id) => toast.info(`Dismissed ${id}`)}
                      onRead={(id) => toast.info(`Marked read ${id}`)}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Message Bubble</CardTitle>
                <CardDescription>
                  Buyer–seller chat with optional price offers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4 max-w-2xl mx-auto bg-muted/20 p-4 rounded-2xl border border-border">
                {MOCK_MESSAGES.map((message) => (
                  <MessageBubble
                    key={message.id}
                    {...message}
                    onAcceptOffer={(id) =>
                      toast.success(`Accepted offer on ${id}`)
                    }
                    onRejectOffer={(id) =>
                      toast.info(`Declined offer on ${id}`)
                    }
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-8 pt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                  Price Card
                </h3>
                <PriceCard
                  {...MOCK_PRICE_CARD}
                  onPlaceBid={(amount) =>
                    toast.success(
                      `Bid placed: PKR ${amount.toLocaleString("en-PK")}`
                    )
                  }
                  onBuyNow={() => toast.success("Buy It Now triggered")}
                />
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                  Review Card
                </h3>
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onHelpfulClick={(id) =>
                        toast.info(`Voted helpful on ${id}`)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Section>
    </SiteLayout>
  );
}
