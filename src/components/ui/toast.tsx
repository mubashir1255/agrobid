/**
 * @file src/components/ui/toast.tsx
 * @description Accessible Toast notification system powered by Sonner.
 * Integrates with next-themes for dark mode support and exports toast helpers.
 */

"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, toast } from "sonner";
import * as React from "react";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl text-sm font-sans p-4",
          description: "group-[.toast]:text-muted-foreground text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium text-xs px-3 py-1.5 rounded-lg",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium text-xs px-3 py-1.5 rounded-lg",
          error: "group-[.toaster]:bg-destructive/10 group-[.toaster]:border-destructive/30 group-[.toaster]:text-destructive-foreground",
          success: "group-[.toaster]:bg-success/10 group-[.toaster]:border-success/30 group-[.toaster]:text-success-foreground",
          warning: "group-[.toaster]:bg-warning/15 group-[.toaster]:border-warning/30 group-[.toaster]:text-warning-foreground",
          info: "group-[.toaster]:bg-info/10 group-[.toaster]:border-info/30 group-[.toaster]:text-info-foreground",
        },
      }}
      {...props}
    />
  );
}

export { toast };
