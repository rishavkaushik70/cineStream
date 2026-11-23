"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`relative inline-flex size-9 items-center justify-center rounded-full bg-secondary/80 text-foreground/80 hover:text-foreground hover:bg-secondary border border-border/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      title={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Moon className="size-4 text-amber-300 transition-transform hover:scale-110" />
      ) : (
        <Sun className="size-4 text-amber-500 transition-transform hover:scale-110" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
