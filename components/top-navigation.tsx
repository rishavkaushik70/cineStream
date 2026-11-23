"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useSidebar } from "./sidebar-context";

export function TopNavigation() {
  const router = useRouter();
  const { isMobileOpen, toggleMobile, isCollapsed, toggleCollapse } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  // Exactly ONE unified sidebar toggle control that operates as desktop collapse or mobile drawer
  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      toggleMobile();
    } else {
      toggleCollapse();
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 bg-background/85 backdrop-blur-md border-b border-border/40 transition-colors">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
        {/* The single unified sidebar control for CineStream */}
        <button
          type="button"
          onClick={handleToggleSidebar}
          className="inline-flex size-9 items-center justify-center rounded-full bg-secondary/80 text-foreground/80 hover:text-foreground hover:bg-secondary border border-border/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          aria-label={
            isMobileOpen
              ? "Close mobile navigation drawer"
              : isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          title={
            isCollapsed
              ? "Expand sidebar (Show labels)"
              : "Collapse sidebar (Maximize viewing area)"
          }
        >
          {/* Mobile icon */}
          <span className="lg:hidden flex items-center justify-center">
            {isMobileOpen ? (
              <X className="size-4.5 text-primary" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </span>

          {/* Desktop icon */}
          <span className="hidden lg:flex items-center justify-center">
            {isCollapsed ? (
              <PanelLeftOpen className="size-4 text-primary" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </span>
        </button>

        {/* Back button */}
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back to previous page"
          className="inline-flex size-9 items-center justify-center rounded-full bg-secondary/80 text-foreground/80 hover:text-foreground hover:bg-secondary border border-border/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          title="Back"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Wide Header Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className={`relative flex items-center w-full transition-all duration-200 rounded-full bg-secondary/60 border ${
            isFocused
              ? "border-primary/80 ring-2 ring-primary/20 bg-secondary/90 shadow-sm"
              : "border-border/50 hover:border-border"
          }`}
        >
          <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search movies, TV shows, actors..."
            className="w-full h-9 pl-9 pr-8 text-xs sm:text-sm bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none rounded-full"
            aria-label="Search movies, TV shows, and actors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 p-0.5 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Clear search input"
            >
              <X className="size-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <ThemeToggle />

        {/* Local user space / settings profile shortcut */}
        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Preferences and Local Space"
          title="Preferences and Device Space"
        >
          <User className="size-4" />
        </button>
      </div>
    </header>
  );
}
