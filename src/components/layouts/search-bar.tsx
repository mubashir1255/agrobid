/**
 * @file src/components/layouts/search-bar.tsx
 * @description Global Search Bar component with debounced input, keyboard shortcuts,
 * recent searches, and category filters. Supports dark mode and responsive layouts.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, Clock } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export interface SearchSuggestion {
  id: string;
  label: string;
  category: string;
  href?: string;
}

type SearchDropdownItem =
  { type: "recent"; query: string } | ({ type: "suggestion" } & SearchSuggestion);

export interface SearchFilter {
  id: string;
  label: string;
  count?: number;
}

export interface SearchBarProps {
  /** Initial search value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when search is submitted */
  onSearch?: (query: string, filters?: string[]) => void;
  /** Callback when search value changes (for suggestions) */
  onChange?: (query: string) => void;
  /** Predefined suggestions to show */
  suggestions?: SearchSuggestion[];
  /** Available filter categories */
  filters?: SearchFilter[];
  /** Currently active filters */
  activeFilters?: string[];
  /** Callback when filters change */
  onFiltersChange?: (filters: string[]) => void;
  /** Show filter button */
  showFilters?: boolean;
  /** Show recent searches */
  showRecent?: boolean;
  /** Recent searches array */
  recentSearches?: string[];
  /** Callback to clear recent searches */
  onClearRecent?: () => void;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Custom className */
  className?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
}

/**
 * SearchBar — global search input with suggestions, filters, and recent searches.
 *
 * @example
 * <SearchBar
 *   placeholder="Search auctions, crops, livestock..."
 *   onSearch={(query) => router.push(`/search?q=${query}`)}
 *   suggestions={[{ id: '1', label: 'Sahiwal Bull', category: 'Livestock' }]}
 *   filters={[{ id: 'livestock', label: 'Livestock' }, { id: 'crops', label: 'Crops' }]}
 * />
 */
export function SearchBar({
  defaultValue = "",
  placeholder = "Search auctions, crops, livestock...",
  onSearch,
  onChange,
  suggestions = [],
  filters = [],
  activeFilters = [],
  onFiltersChange,
  showFilters = true,
  showRecent = true,
  recentSearches = [],
  onClearRecent,
  debounceMs = 300,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, debounceMs);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      const items: SearchDropdownItem[] = [
        ...(showRecent
          ? recentSearches.map((recentQuery) => ({
              type: "recent" as const,
              query: recentQuery,
            }))
          : []),
        ...suggestions.map((suggestion) => ({
          type: "suggestion" as const,
          ...suggestion,
        })),
      ];
      if (items.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) {
            const item = items[focusedIndex];
            if (item.type === "recent") {
              setQuery(item.query);
              onSearch?.(item.query);
            } else if (item.href) {
              window.location.href = item.href;
            } else {
              onSearch?.(item.label);
            }
            setIsOpen(false);
            setFocusedIndex(-1);
          } else {
            onSearch?.(query);
            setIsOpen(false);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, suggestions, recentSearches, showRecent, focusedIndex, query, onSearch]);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Trigger search on debounced query change
  React.useEffect(() => {
    if (debouncedQuery && debouncedQuery !== defaultValue) {
      onChange?.(debouncedQuery);
    }
  }, [debouncedQuery, defaultValue, onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim(), activeFilters.length > 0 ? activeFilters : undefined);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.label);
    if (suggestion.href) {
      window.location.href = suggestion.href;
    } else {
      onSearch?.(suggestion.label);
    }
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
    onSearch?.(recentQuery);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((f) => f !== filterId)
      : [...activeFilters, filterId];
    onFiltersChange?.(newFilters);
  };

  const handleClear = () => {
    setQuery("");
    setFocusedIndex(-1);
    onChange?.("");
  };

  const hasResults = suggestions.length > 0 || (showRecent && recentSearches.length > 0);

  return (
    <div className={cn("relative flex w-full max-w-xl items-center gap-2", className)}>
      <form onSubmit={handleSubmit} className="relative flex w-full items-center">
        <label htmlFor="global-search" className="sr-only">
          Global search
        </label>
        <div className="relative flex w-full items-center">
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            id="global-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setFocusedIndex(-1);
            }}
            onFocus={() => {
              if (hasResults || query) setIsOpen(true);
            }}
            onBlur={() => {
              // Delay to allow click on suggestions
              setTimeout(() => setIsOpen(false), 200);
            }}
            placeholder={placeholder}
            className="h-10 pr-10 pl-10 text-sm"
            autoFocus={autoFocus}
            autoComplete="off"
            aria-expanded={isOpen && hasResults}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            role="combobox"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          size="icon-sm"
          className="ml-1"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {showFilters && filters.length > 0 && (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          className={cn("relative", activeFilters.length > 0 && "text-primary")}
          aria-label="Filters"
          aria-expanded={showFilterPanel}
          aria-controls="filter-panel"
        >
          <Filter className="h-4 w-4" />
          {activeFilters.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFilters.length}
            </span>
          )}
        </Button>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && hasResults && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-2 w-full animate-in overflow-hidden rounded-xl border border-border bg-popover shadow-lg fade-in-0 zoom-in-95 slide-in-from-top-2"
        >
          {showRecent && recentSearches.length > 0 && (
            <div className="border-b border-border p-2">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <Clock className="h-3 w-3" /> Recent
                </span>
                {onClearRecent && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearRecent();
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div role="list" className="max-h-48 space-y-1 overflow-y-auto">
                {recentSearches.map((recent, idx) => (
                  <button
                    key={recent}
                    type="button"
                    role="option"
                    aria-selected={focusedIndex === idx}
                    onClick={() => handleRecentClick(recent)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      focusedIndex === idx
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate">{recent}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="max-h-60 overflow-y-auto p-2" role="list">
              {suggestions.map((suggestion, idx) => {
                const itemIndex =
                  (showRecent && recentSearches.length > 0 ? recentSearches.length : 0) +
                  idx;
                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    role="option"
                    aria-selected={focusedIndex === itemIndex}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setFocusedIndex(itemIndex)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      focusedIndex === itemIndex
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <Search
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate font-medium">{suggestion.label}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {suggestion.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {showFilterPanel && (
        <div
          id="filter-panel"
          role="dialog"
          aria-label="Search filters"
          className="absolute top-full right-0 z-50 mt-2 w-56 animate-in rounded-xl border border-border bg-popover p-2 shadow-lg fade-in-0 zoom-in-95 slide-in-from-top-2"
        >
          <div className="mb-1 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Filters
            </span>
            {activeFilters.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => onFiltersChange?.([])}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {filters.map((filter) => (
              <label
                key={filter.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(filter.id)}
                  onChange={() => handleFilterToggle(filter.id)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <span className="flex-1 truncate text-sm text-foreground">
                  {filter.label}
                </span>
                {filter.count !== undefined && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {filter.count}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
