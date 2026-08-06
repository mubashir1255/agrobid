/**
 * @file src/components/ui/avatar.tsx
 * @description Accessible Avatar component built on Radix UI Avatar primitive.
 * Supports image loading fallback to initials, user presence status badge (online/offline/away), and size presets.
 */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-border/40 select-none bg-muted",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg font-semibold",
        "2xl": "h-20 w-20 text-xl font-semibold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type UserStatus = "online" | "offline" | "away" | "busy";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  status?: UserStatus;
  containerClassName?: string;
}

const statusColors: Record<UserStatus, string> = {
  online: "bg-success border-background",
  offline: "bg-muted-foreground border-background",
  away: "bg-warning border-background",
  busy: "bg-destructive border-background",
};

const statusSizes: Record<NonNullable<VariantProps<typeof avatarVariants>["size"]>, string> = {
  xs: "h-1.5 w-1.5 bottom-0 right-0",
  sm: "h-2 w-2 bottom-0 right-0",
  md: "h-2.5 w-2.5 bottom-0 right-0 border-2",
  lg: "h-3 w-3 bottom-0.5 right-0.5 border-2",
  xl: "h-4 w-4 bottom-1 right-1 border-2",
  "2xl": "h-5 w-5 bottom-1 right-1 border-2",
};

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "md", src, alt = "Avatar", fallback, status, containerClassName, ...props }, ref) => {
  return (
    <div className={cn("relative inline-block shrink-0", containerClassName)}>
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-medium dark:bg-primary/20 dark:text-primary"
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status && (
        <span
          aria-label={`Status: ${status}`}
          title={`Status: ${status}`}
          className={cn(
            "absolute rounded-full border border-background shadow-xs",
            statusColors[status],
            statusSizes[size || "md"]
          )}
        />
      )}
    </div>
  );
});

Avatar.displayName = AvatarPrimitive.Root.displayName;
