/**
 * @file src/components/ui/button.tsx
 * @description Production-ready Button component supporting loading state, icons, sizes, variants, dark mode, and Radix Slot asChild polymorphism.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer rounded-lg text-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        harvest:
          "bg-harvest-500 text-harvest-950 font-semibold shadow-sm hover:bg-harvest-400 active:bg-harvest-600 dark:bg-harvest-500 dark:text-harvest-950 dark:hover:bg-harvest-400",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-background dark:hover:bg-accent",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer p-0 h-auto shadow-none",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md gap-1",
        sm: "h-8 px-3 text-xs gap-1.5",
        default: "h-10 px-4 text-sm gap-2",
        lg: "h-11 px-5 text-base gap-2.5 rounded-xl",
        xl: "h-12 px-6 text-base gap-3 rounded-xl font-semibold",
        icon: "h-10 w-10 p-0 justify-center",
        "icon-sm": "h-8 w-8 p-0 justify-center rounded-md",
        "icon-lg": "h-12 w-12 p-0 justify-center rounded-xl",
      },
      fullWidth: {
        true: "w-full flex",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Renders a loading spinner and disables interaction */
  loading?: boolean;
  /** Text label displayed next to spinner when loading */
  loadingText?: string;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    // If asChild is true, we pass children directly to Slot
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <Spinner
              size={size === "xs" || size === "sm" ? "xs" : "sm"}
              variant="current"
              className="mr-1.5"
            />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export { buttonVariants };
