import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { FeedClient } from "./feed-client";

interface ListingsPageProps {
  searchParams: Promise<{ type?: string; category?: string }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const { type, category } = await searchParams;
  const supabase = await createClient();

  // Fetch categories for filtering
  const { data: categories } = await supabase
    .from("categories")
    .select("id, slug")
    .order("name");

  let query = supabase
    .from("listings")
    .select(`
      id,
      title,
      description,
      listing_type,
      quantity,
      unit,
      price_per_unit,
      starting_bid,
      current_highest_bid,
      auction_ends_at,
      city,
      province,
      created_at,
      categories (
        name,
        urdu_name
      )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (type === "direct_sale" || type === "auction") {
    query = query.eq("listing_type", type);
  }

  if (category) {
    const selectedCategory = categories?.find((c) => c.slug === category);
    if (selectedCategory) {
      query = query.eq("category_id", selectedCategory.id);
    }
  }

  const { data: listings } = await query;

  return <FeedClient listings={listings || []} type={type} />;
}
