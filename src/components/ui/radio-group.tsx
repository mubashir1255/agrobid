/**
 * @file src/components/ui/radio-group.tsx
 * @description Accessible Radio Group component using Radix UI Radio Group primitive.
 * Supports radio options with labels, helper descriptions, error states, and keyboard navigation.
 */

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2.5", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, disabled, containerClassName, id: providedId, ...props }, ref) => {
  const generatedId = React.useId();
  const id = providedId || generatedId;

  const itemNode = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      disabled={disabled}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border border-input bg-background text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary transition-all duration-150 cursor-pointer flex items-center justify-center shrink-0 dark:border-input dark:bg-background",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return itemNode;
  }

  return (
    <div className={cn("flex items-start gap-2.5", containerClassName)}>
      <div className="pt-0.5">{itemNode}</div>
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
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
