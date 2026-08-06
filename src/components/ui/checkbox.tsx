/**
 * @file src/components/ui/checkbox.tsx
 * @description Accessible Checkbox component using Radix UI Checkbox primitive.
 * Supports label, description, error state, indeterminate state, focus ring, and dark mode.
 */

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, error, disabled, containerClassName, id: providedId, checked, ...props }, ref) => {
  const generatedId = React.useId();
  const id = providedId || generatedId;

  const checkboxNode = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      disabled={disabled}
      checked={checked}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground transition-all duration-150 cursor-pointer dark:border-input dark:bg-background dark:data-[state=checked]:bg-primary",
        error && "border-destructive focus-visible:ring-destructive dark:border-destructive",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {checked === "indeterminate" ? (
          <Minus className="h-3.5 w-3.5 stroke-[3]" />
        ) : (
          <Check className="h-3.5 w-3.5 stroke-[3]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description && !error) {
    return checkboxNode;
  }

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <div className="flex items-start gap-2.5">
        <div className="pt-0.5">{checkboxNode}</div>
        {(label || description) && (
          <div className="grid gap-0.5 leading-none">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-sm font-medium text-foreground leading-snug cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-70"
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
      </div>
      {error && (
        <p role="alert" className="text-xs font-medium text-destructive ml-7">
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
