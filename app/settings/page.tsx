"use client";

import * as React from "react";
import Image from "next/image";
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Info,
  HardDrive,
  Trash2,
  Check,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useUserLists } from "@/lib/hooks/use-user-lists";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    favorites,
    watchlist,
    history,
    clearAllData,
  } = useUserLists();

  const [cleared, setCleared] = React.useState(false);

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your local favorites, watchlist, and viewing history?")) {
      clearAllData();
      setCleared(true);
      setTimeout(() => setCleared(false), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="size-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Preferences & Information
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage your interface appearance, device storage, and view TMDB API credits.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* 1. Theme Configuration */}
        <section className="p-5 sm:p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Visual Theme</h2>
            <p className="text-xs text-muted-foreground">
              Select your preferred appearance mode.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                theme === "dark"
                  ? "bg-primary/15 border-primary text-primary shadow-sm"
                  : "bg-secondary/60 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Moon className="size-5" />
              <span>Dark Cinema</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                theme === "light"
                  ? "bg-primary/15 border-primary text-primary shadow-sm"
                  : "bg-secondary/60 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sun className="size-5" />
              <span>Warm Linen</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                theme === "system"
                  ? "bg-primary/15 border-primary text-primary shadow-sm"
                  : "bg-secondary/60 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="size-5" />
              <span>System</span>
            </button>
          </div>
        </section>

        {/* 2. Device Local Storage Management */}
        <section className="p-5 sm:p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <HardDrive className="size-4 text-primary" />
                <h2 className="text-base font-bold text-foreground">Local Device Storage</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                CineStream stores your personal Watchlist, Favorites, and Recently Viewed history
                exclusively on this browser. No external tracking or account registration is required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="flex flex-col p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
              <span className="text-xl font-black text-foreground font-heading">
                {favorites.length}
              </span>
              <span className="text-[11px] text-muted-foreground">Favorites</span>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
              <span className="text-xl font-black text-foreground font-heading">
                {watchlist.length}
              </span>
              <span className="text-[11px] text-muted-foreground">Watchlist</span>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
              <span className="text-xl font-black text-foreground font-heading">
                {history.length}
              </span>
              <span className="text-[11px] text-muted-foreground">Viewed</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Clear all saved movies, watchlist items, and viewing history.
            </span>

            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-semibold border border-destructive/20 transition-colors"
            >
              {cleared ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Cleared!</span>
                </>
              ) : (
                <>
                  <Trash2 className="size-3.5" />
                  <span>Clear All Local Data</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 3. TMDB API Compliance & Attribution */}
        <section className="p-5 sm:p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">API Attribution & Credits</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Data sources and third-party compliance statements.
              </p>
            </div>

            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/tmdb-logo.svg"
                alt="The Movie Database (TMDB) Logo"
                width={150}
                height={16}
                className="h-4 w-auto"
              />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-secondary/60 border border-border/40 text-xs text-foreground/90 leading-relaxed space-y-2">
            <p className="font-semibold text-primary">Required TMDB Statement:</p>
            <p className="italic">
              &ldquo;This product uses the TMDB API but is not endorsed or certified by TMDB.&rdquo;
            </p>
            <p className="text-muted-foreground pt-1">
              All movie posters, backdrops, plot synopses, release dates, genre taxonomies, cast
              credits, and vote ratings are sourced directly from The Movie Database (TMDB).
              Ratings displayed across CineStream reflect community vote averages calculated by TMDB.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
            >
              <span>Visit The Movie Database</span>
              <ExternalLink className="size-3" />
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://developer.themoviedb.org/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>TMDB API Documentation</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </section>

        {/* 4. About CineStream */}
        <section className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Info className="size-4" />
            <span>About CineStream</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            CineStream is a dedicated cinematic exploration and official trailer preview application.
            It provides high-resolution backdrop carousels, responsive catalog search, and local
            browser queues to help cinema enthusiasts discover exceptional film and television masterworks.
          </p>
        </section>
      </div>
    </div>
  );
}
