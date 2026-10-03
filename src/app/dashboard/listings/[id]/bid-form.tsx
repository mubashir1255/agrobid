"use client";

import * as React from "react";
import { useActionState } from "react";
import { Loader2, Gavel, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { placeBidAction, type BidActionState } from "./actions";

interface BidFormProps {
  listingId: string;
  minNextBid: number;
}

export function BidForm({ listingId, minNextBid }: BidFormProps) {
  const actionWithId = placeBidAction.bind(null, listingId);
  const [state, formAction, isPending] = useActionState<BidActionState, FormData>(
    actionWithId,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-xl border border-brand-500/20 bg-brand-500/10 p-3 text-xs font-medium text-brand-700 dark:text-brand-300 flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>Your bid has been placed successfully!</span>
        </div>
      )}

      <div>
        <label
          htmlFor="amount"
          className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
        >
          Your Bid Amount (PKR)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-semibold text-muted-foreground">
            PKR
          </span>
          <Input
            id="amount"
            name="amount"
            type="number"
            min={minNextBid}
            step="100"
            defaultValue={minNextBid}
            required
            className="pl-14 h-11 text-base font-semibold"
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">
          Minimum allowed bid: <strong>PKR {minNextBid.toLocaleString()}</strong>
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-xl bg-harvest-600 hover:bg-harvest-700 text-white font-semibold"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Submitting Bid...
          </>
        ) : (
          <>
            <Gavel className="size-4 mr-2" />
            Place Bid (بولی درج کریں)
          </>
        )}
      </Button>
    </form>
  );
}
