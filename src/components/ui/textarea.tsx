/**
 * @file src/components/ui/textarea.tsx
 * @description Production-ready Textarea component supporting label, character counter, error state, helper text, disabled state, and dark mode.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label text */
  label?: string;
  /** Optional helper text */
  helperText?: string;
  /** Error message string. Triggers aria-invalid and error border styling */
  error?: string;
  /** If true, displays a live character counter (requires maxLength) */
  showCount?: boolean;
  /** Resize behavior */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Container wrapper className */
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      label,
      helperText,
      error,
      showCount = false,
      maxLength,
      resize = "vertical",
      disabled,
      value,
      defaultValue,
      onChange,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const [currentLength, setCurrentLength] = React.useState<number>(() => {
      if (value !== undefined) return String(value).length;
      if (defaultValue !== undefined) return String(defaultValue).length;
      return 0;
    });

    React.useEffect(() => {
      if (value !== undefined) {
        setCurrentLength(String(value).length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      if (onChange) onChange(e);
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none text-foreground select-none flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && <span className="text-destructive text-xs ml-1">*</span>}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150 dark:bg-background dark:border-input dark:text-foreground",
            resizeClasses[resize],
            error &&
              "border-destructive focus-visible:ring-destructive dark:border-destructive",
            className
          )}
          {...props}
        />

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex-1">
            {error ? (
              <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
                {error}
              </p>
            ) : helperText ? (
              <p id={helperId} className="text-xs text-muted-foreground">
                {helperText}
              </p>
            ) : null}
          </div>

          {showCount && maxLength !== undefined && (
            <span className="text-[11px] text-muted-foreground font-mono shrink-0 ml-auto">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
