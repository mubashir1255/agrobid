"use client";

import * as React from "react";
import { useActionState } from "react";
import { Loader2, DollarSign, Gavel, MapPin, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createListingAction, type CreateListingState } from "../actions";

interface Category {
  id: string;
  name: string;
  urdu_name: string;
}

interface CreateListingFormProps {
  categories: Category[];
  defaultProvince: string;
  defaultCity: string;
  defaultAddress: string;
}

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Kashmir",
  "Gilgit-Baltistan",
];


const units = [
  // Grains & Crops
  { value: "man", label: "Man (من - 40 KG)" },
  { value: "bori", label: "Bori / Bag (بوری - 50/100 KG)" },
  { value: "ton", label: "Metric Ton (ٹن)" },
  { value: "kg", label: "Kilogram (کلوگرام)" },

  // Fruits & Vegetables Packaging
  { value: "peti", label: "Peti / Wooden Crate (لکڑی کی پیٹی)" },
  { value: "carton", label: "Carton / Dabba (ڈبہ / کارٹن)" },
  { value: "crate", label: "Plastic Crate (کریٹ)" },

  // Livestock
  { value: "head", label: "Head / Animal (راس)" },
];

export function CreateListingForm({
  categories,
  defaultProvince,
  defaultCity,
  defaultAddress,
}: CreateListingFormProps) {
  const [state, formAction, isPending] = useActionState<CreateListingState, FormData>(
    createListingAction,
    {}
  );

  const [listingType, setListingType] = React.useState<"direct_sale" | "auction">("direct_sale");

  return (
    <form action={formAction} className="rounded-3xl border bg-card p-6 sm:p-8 space-y-8 shadow-sm">
      {state?.error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {state.error}
        </div>
      )}

      {/* Mode Selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Listing Type (طریقہ فروخت)</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setListingType("direct_sale")}
            className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition ${
              listingType === "direct_sale"
                ? "border-brand-600 bg-brand-50/50 dark:bg-brand-950/20 text-brand-900 dark:text-brand-100 ring-2 ring-brand-500"
                : "border-border hover:bg-muted text-muted-foreground"
            }`}
          >
            <DollarSign className="size-5 text-brand-600 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Fixed Price Sale</p>
              <p className="text-xs text-muted-foreground">براہ راست فروخت (مقررہ قیمت)</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setListingType("auction")}
            className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition ${
              listingType === "auction"
                ? "border-harvest-600 bg-harvest-50/50 dark:bg-harvest-950/20 text-harvest-900 dark:text-harvest-100 ring-2 ring-harvest-500"
                : "border-border hover:bg-muted text-muted-foreground"
            }`}
          >
            <Gavel className="size-5 text-harvest-600 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Live Auction Bidding</p>
              <p className="text-xs text-muted-foreground">بولی کا نظام (نیلامی)</p>
            </div>
          </button>
        </div>
        <input type="hidden" name="listingType" value={listingType} />
      </div>

      {/* Product Details */}
      <div className="space-y-4">
        <h3 className="font-heading text-base font-semibold border-b pb-2">Product Info</h3>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Product Title (عنوان) *
          </label>
          <Input
            id="title"
            name="title"
            required
            placeholder="e.g. Super Kernel Basmati Rice (نیو سیزن کائنات 1121)"
            className="h-11"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Category (کیٹیگری) *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.urdu_name})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity (مقدار) *
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                step="any"
                min="0.1"
                required
                placeholder="100"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                Unit (اکائی) *
              </label>
              <select
                id="unit"
                name="unit"
                required
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description & Quality Details (تفصیل و کوالٹی) *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Specify moisture content, crop quality, packaging, and loading/transport terms."
            className="w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Pricing / Auction Setup */}
      <div className="space-y-4">
        <h3 className="font-heading text-base font-semibold border-b pb-2">
          {listingType === "direct_sale" ? "Pricing (قیمت)" : "Auction Setup (بولی کے ضوابط)"}
        </h3>

        {listingType === "direct_sale" ? (
          <div className="space-y-2">
            <label htmlFor="pricePerUnit" className="text-sm font-medium">
              Price per Unit in PKR (فی اکائی قیمت) *
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-semibold text-muted-foreground">
                PKR
              </span>
              <Input
                id="pricePerUnit"
                name="pricePerUnit"
                type="number"
                step="any"
                min="1"
                required
                placeholder="e.g. 5200"
                className="h-11 pl-14"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="startingBid" className="text-sm font-medium">
                Starting Bid (شروعاتی قیمت) *
              </label>
              <Input
                id="startingBid"
                name="startingBid"
                type="number"
                step="any"
                min="1"
                required
                placeholder="PKR 4500"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="minIncrement" className="text-sm font-medium">
                Min Increment (کم از کم اضافہ)
              </label>
              <Input
                id="minIncrement"
                name="minIncrement"
                type="number"
                defaultValue={100}
                min="50"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="durationDays" className="text-sm font-medium">
                Duration (مدت)
              </label>
              <select
                id="durationDays"
                name="durationDays"
                defaultValue="3"
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1">24 Hours (1 Day)</option>
                <option value="3">3 Days (تجویز کردہ)</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days (1 Week)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="font-heading text-base font-semibold border-b pb-2">
          Origin / Location (مقام و ترسیل)
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="province" className="text-sm font-medium">
              Province (صوبہ) *
            </label>
            <select
              id="province"
              name="province"
              required
              defaultValue={defaultProvince}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select province</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              City / Tehsil (شہر / تحصیل) *
            </label>
            <Input
              id="city"
              name="city"
              required
              defaultValue={defaultCity}
              placeholder="e.g. Okara, Sahiwal, Rahim Yar Khan"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Mandi / Village / Farm Address (فارم یا گودام کا پتہ)
          </label>
          <Input
            id="address"
            name="address"
            defaultValue={defaultAddress}
            placeholder="e.g. Chak 12-L, Grain Market Godown #4"
            className="h-11"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isPending} className="h-12 w-full rounded-xl text-base font-semibold">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Publishing Listing...
          </>
        ) : (
          <>
            <PackageCheck className="size-4 mr-2" />
            Publish to AgroBid (پراڈکٹ شائع کریں)
          </>
        )}
      </Button>
    </form>
  );
}
