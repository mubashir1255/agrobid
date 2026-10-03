"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface CreateListingState {
  error?: string;
}

export async function createListingAction(
  _prevState: CreateListingState | null,
  formData: FormData
): Promise<CreateListingState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a listing." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const categoryId = formData.get("categoryId") as string;
  const listingType = formData.get("listingType") as string; // 'direct_sale' | 'auction'
  const quantity = parseFloat(formData.get("quantity") as string);
  const unit = formData.get("unit") as string;
  const pricePerUnit = formData.get("pricePerUnit")
    ? parseFloat(formData.get("pricePerUnit") as string)
    : null;
  const startingBid = formData.get("startingBid")
    ? parseFloat(formData.get("startingBid") as string)
    : null;
  const minIncrement = formData.get("minIncrement")
    ? parseFloat(formData.get("minIncrement") as string)
    : 100;
  const durationDays = formData.get("durationDays")
    ? parseInt(formData.get("durationDays") as string, 10)
    : 3;
  const province = (formData.get("province") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const address = (formData.get("address") as string)?.trim() || "";

  if (!title || !description || !categoryId || !listingType || isNaN(quantity) || !unit || !province || !city) {
    return { error: "Please fill out all required fields." };
  }

  if (listingType === "direct_sale" && (pricePerUnit === null || isNaN(pricePerUnit) || pricePerUnit <= 0)) {
    return { error: "Please provide a valid price per unit." };
  }

  if (listingType === "auction" && (startingBid === null || isNaN(startingBid) || startingBid <= 0)) {
    return { error: "Please provide a starting bid for the auction." };
  }

  let auctionEndsAt: string | null = null;
  if (listingType === "auction") {
    const end = new Date();
    end.setDate(end.getDate() + durationDays);
    auctionEndsAt = end.toISOString();
  }

  const { error: insertError } = await supabase.from("listings").insert({
    seller_id: user.id,
    category_id: categoryId,
    title,
    description,
    listing_type: listingType,
    quantity,
    unit,
    price_per_unit: listingType === "direct_sale" ? pricePerUnit : null,
    starting_bid: listingType === "auction" ? startingBid : null,
    current_highest_bid: listingType === "auction" ? startingBid : 0,
    min_increment: listingType === "auction" ? minIncrement : null,
    auction_ends_at: auctionEndsAt,
    province,
    city,
    address,
    status: "active",
  });

  if (insertError) {
    console.error("Listing insert error:", insertError);
    return { error: insertError.message || "Failed to create listing." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
