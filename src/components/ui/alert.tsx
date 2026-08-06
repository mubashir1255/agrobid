/**
 * @file src/components/ui/alert.tsx
 * @description Production-ready Alert component for status messages, callouts, and system notifications.
 * Supports variants (info, success, warning, destructive, harvest), icons, dismiss button, and dark mode.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-1px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border dark:bg-background dark:border-border",
        info: "bg-info/10 text-info-foreground border-info/30 dark:bg-info/15 [&>svg]:text-info",
        success: "bg-success/10 text-success-foreground border-success/30 dark:bg-success/15 [&>svg]:text-success",
        warning: "bg-warning/15 text-warning-foreground border-warning/40 dark:bg-warning/20 [&>svg]:text-warning-foreground",
        destructive: "bg-destructive/10 text-destructive-foreground border-destructive/30 dark:bg-destructive/15 [&>svg]:text-destructive",
        harvest: "bg-harvest-500/10 text-harvest-950 border-harvest-500/30 dark:bg-harvest-500/15 dark:text-harvest-100 [&>svg]:text-harvest-600 dark:[&>svg]:text-harvest-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const defaultIcons: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  React.ReactNode
> = {
  default: <Info className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  destructive: <AlertCircle className="h-4 w-4" />,
  harvest: <Sparkles className="h-4 w-4" />,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, onClose, closeLabel = "Dismiss alert", children, ...props }, ref) => {
    const renderedIcon = icon !== undefined ? icon : defaultIcons[variant || "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {renderedIcon}
        <div>{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-3 top-3 rounded-lg p-1 opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "font-heading font-semibold leading-none tracking-tight mb-1 text-sm text-foreground",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
