/**
 * @file src/components/ui/table.tsx
 * @description Accessible Data Table component with mobile responsive horizontal scroll container, hover states, striped rows, and dark mode.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    striped?: boolean;
    compact?: boolean;
  }
>(({ className, striped = false, compact = false, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-xl border border-border bg-card shadow-xs">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm border-collapse",
        striped && "[&_tbody_tr:nth-child(even)]:bg-muted/30",
        compact && "[&_td]:py-2 [&_th]:py-2",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-muted/50 dark:bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-border bg-muted/50 font-medium text-foreground dark:bg-muted/30",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    hoverable?: boolean;
  }
>(({ className, hoverable = true, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border/60 transition-colors",
      hoverable && "hover:bg-muted/50 dark:hover:bg-muted/40",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right";
  }
>(({ className, align = "left", ...props }, ref) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th
      ref={ref}
      className={cn(
        "h-11 px-4 text-xs font-semibold text-muted-foreground align-middle [&:has([role=checkbox])]:pr-0",
        alignClasses[align],
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right";
  }
>(({ className, align = "left", ...props }, ref) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0",
        alignClasses[align],
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
