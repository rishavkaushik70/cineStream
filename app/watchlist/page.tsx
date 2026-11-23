"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Sparkles, HardDrive, Trash2 } from "lucide-react";
import { useUserLists } from "@/lib/hooks/use-user-lists";
import { MoviePosterCard } from "@/components/movie-poster-card";
import { MediaItem } from "@/lib/types/movie";

export default function WatchlistPage() {
  const { mounted, watchlist, clearWatchlist } = useUserLists();
  const list = mounted ? watchlist : [];

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="size-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Personal Queue
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            My Watchlist
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Movies and TV shows saved for your upcoming movie nights.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {list.length > 0 && (
            <button
              type="button"
              onClick={clearWatchlist}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-medium border border-border transition-colors"
            >
              <Trash2 className="size-3.5" />
              <span>Clear Watchlist</span>
            </button>
          )}

          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl">
            {list.length} {list.length === 1 ? "Item" : "Items"} in Queue
          </span>
        </div>
      </div>

      {/* Honest Local Storage Notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
        <HardDrive className="size-4 text-amber-400 shrink-0" />
        <span>
          <strong>Local Device Storage:</strong> Your Watchlist is saved locally in this browser.
          Titles remain in your queue on this device without requiring account sign-in.
        </span>
      </div>

      {/* Watchlist Grid */}
      {list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {list.map((item) => {
            const mediaItem: MediaItem = {
              ...item,
              overview: "Saved in your CineStream Watchlist.",
              voteCount: 0,
              runtime: item.runtime || "2h 00m",
              cast: [],
            };
            return (
              <div key={item.id} className="flex justify-center">
                <MoviePosterCard item={mediaItem} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-card border border-border/50 max-w-lg mx-auto my-8">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/60 mb-4 border border-border">
            <Bookmark className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Your Watchlist is Empty
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
            Click the bookmark icon on any movie or TV series card to add it to your queue.
          </p>
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles className="size-3.5" />
            <span>Discover Movies</span>
          </Link>
        </div>
      )}
    </div>
  );
}
