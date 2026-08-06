/**
 * @file src/components/ui/switch.tsx
 * @description Accessible Switch toggle component built on Radix UI Switch primitive.
 * Supports sizes (sm, default, lg), loading state, label, description, focus states, and dark mode.
 */

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/60",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 flex items-center justify-center dark:bg-foreground",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  loading?: boolean;
  containerClassName?: string;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, label, description, loading = false, disabled, containerClassName, id: providedId, ...props }, ref) => {
  const generatedId = React.useId();
  const id = providedId || generatedId;

  const isDisabled = disabled || loading;

  const switchNode = (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size, className }))}
      disabled={isDisabled}
      id={id}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))}>
        {loading && <Spinner size="xs" variant="muted" />}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );

  if (!label && !description) {
    return switchNode;
  }

  return (
    <div className={cn("flex items-center justify-between gap-4", containerClassName)}>
      {(label || description) && (
        <div className="grid gap-0.5 leading-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium text-foreground cursor-pointer select-none",
                isDisabled && "cursor-not-allowed opacity-70"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground leading-normal">
              {description}
            </p>
          )}
        </div>
      )}
      {switchNode}
    </div>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;
