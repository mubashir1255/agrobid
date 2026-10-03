import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Sprout } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { CreateListingForm } from "./form";

export default async function CreateListingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Pre-fetch categories and user profile for default location values
  const [{ data: categories }, { data: profile }] = await Promise.all([
    supabase.from("categories").select("id, name, urdu_name").order("name"),
    supabase.from("profiles").select("province, city, address").eq("id", user.id).maybeSingle(),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex size-9 items-center justify-center rounded-xl border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Create New Listing (نئی فصل / پراڈکٹ درج کریں)
          </h1>
          <p className="text-xs text-muted-foreground">
            List your agricultural products for fixed direct sale or timed auction bidding.
          </p>
        </div>
      </div>

      <CreateListingForm
        categories={categories || []}
        defaultProvince={profile?.province || ""}
        defaultCity={profile?.city || ""}
        defaultAddress={profile?.address || ""}
      />
    </div>
  );
}
