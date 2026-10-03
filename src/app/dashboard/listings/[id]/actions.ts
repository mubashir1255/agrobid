"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface BidActionState {
  error?: string;
  success?: boolean;
}

export async function placeBidAction(
  listingId: string,
  _prevState: BidActionState | null,
  formData: FormData
): Promise<BidActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to place a bid." };
  }

  const bidAmount = parseFloat(formData.get("amount") as string);

  if (isNaN(bidAmount) || bidAmount <= 0) {
    return { error: "Please enter a valid bid amount." };
  }

  // Fetch listing details to validate status, owner, and pricing
  const { data: listing, error: fetchError } = await supabase
    .from("listings")
    .select("seller_id, listing_type, status, current_highest_bid, starting_bid, min_increment, auction_ends_at")
    .eq("id", listingId)
    .single();

  if (fetchError || !listing) {
    return { error: "Listing not found." };
  }

  if (listing.status !== "active") {
    return { error: "This listing or auction is closed." };
  }

  if (listing.listing_type !== "auction") {
    return { error: "This item is not open for bidding." };
  }

  if (listing.seller_id === user.id) {
    return { error: "You cannot place a bid on your own listing." };
  }

  if (listing.auction_ends_at && new Date(listing.auction_ends_at) < new Date()) {
    return { error: "This auction has already ended." };
  }

  const currentPrice = listing.current_highest_bid || listing.starting_bid || 0;
  const minAllowed = currentPrice + (listing.min_increment || 100);

  if (bidAmount < minAllowed) {
    return { error: `Bid must be at least PKR ${minAllowed.toLocaleString()}.` };
  }

  // Insert the new bid
  const { error: bidInsertError } = await supabase.from("bids").insert({
    listing_id: listingId,
    bidder_id: user.id,
    amount: bidAmount,
  });

  if (bidInsertError) {
    return { error: bidInsertError.message || "Failed to record bid." };
  }

  // Update listing current highest bid & winner
  await supabase
    .from("listings")
    .update({
      current_highest_bid: bidAmount,
      current_winner_id: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", listingId);

  revalidatePath(`/dashboard/listings/${listingId}`);
  revalidatePath("/dashboard/listings");
  return { success: true };
}
