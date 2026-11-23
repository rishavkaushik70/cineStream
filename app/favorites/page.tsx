"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Sparkles, HardDrive, Trash2 } from "lucide-react";
import { useUserLists } from "@/lib/hooks/use-user-lists";
import { MoviePosterCard } from "@/components/movie-poster-card";
import { MediaItem } from "@/lib/types/movie";

export default function FavoritesPage() {
  const { mounted, favorites, clearFavorites } = useUserLists();
  const list = mounted ? favorites : [];

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="size-5 text-rose-500 fill-rose-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Personal Space
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            My Favorites
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Your all-time favorite cinematic masterworks and series.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {list.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-medium border border-border transition-colors"
            >
              <Trash2 className="size-3.5" />
              <span>Clear Favorites</span>
            </button>
          )}

          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl">
            {list.length} {list.length === 1 ? "Title" : "Titles"}
          </span>
        </div>
      </div>

      {/* Honest Local Storage Notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
        <HardDrive className="size-4 text-amber-400 shrink-0" />
        <span>
          <strong>Local Device Storage:</strong> Your Favorites are stored directly in your
          current browser and are preserved across sessions on this device.
        </span>
      </div>

      {/* Favorites Grid */}
      {list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {list.map((item) => {
            const mediaItem: MediaItem = {
              ...item,
              overview: "Saved in your CineStream Favorites.",
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
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-rose-500/60 mb-4 border border-border">
            <Heart className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            No Favorites Saved Yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
            Click the heart icon on any movie poster or detail page to save your treasured titles
            to this list.
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
