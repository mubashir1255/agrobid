/**
 * @file src/components/ui/input.tsx
 * @description Production-ready Input component with support for icons, clear button, loading state, helper/error text, labels, and full accessibility.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text above the input */
  label?: string;
  /** Optional helper text displayed below input */
  helperText?: string;
  /** Error message string. Triggers aria-invalid and error border styling */
  error?: string;
  /** Icon rendered inside left of input */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside right of input */
  rightIcon?: React.ReactNode;
  /** Show loading spinner inside input */
  loading?: boolean;
  /** If provided, renders a clear button when input has value */
  onClear?: () => void;
  /** Container wrapper className */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      loading = false,
      onClear,
      disabled,
      value,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const hasValue = value !== undefined && value !== null && String(value).length > 0;

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

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            id={id}
            ref={ref}
            value={value}
            disabled={disabled || loading}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150 dark:bg-background dark:border-input dark:text-foreground",
              leftIcon && "pl-9",
              (rightIcon || loading || (onClear && hasValue)) && "pr-9",
              error &&
                "border-destructive focus-visible:ring-destructive dark:border-destructive",
              className
            )}
            {...props}
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            {loading && <Spinner size="xs" variant="muted" />}
            {!loading && onClear && hasValue && !disabled && (
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear input"
                className="text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground rounded p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {!loading && rightIcon && (
              <div className="text-muted-foreground flex items-center pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive mt-0.5">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-muted-foreground mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
