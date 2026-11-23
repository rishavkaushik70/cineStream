"use client";

import * as React from "react";
import { Play, Bookmark, Heart, Share2, Check } from "lucide-react";
import { MediaItem } from "@/lib/types/movie";
import { useUserLists } from "@/lib/hooks/use-user-lists";
import { TrailerModal } from "./trailer-modal";

interface MediaActionButtonsProps {
  movie: MediaItem;
}

export function MediaActionButtons({ movie }: MediaActionButtonsProps) {
  const { inWatchlist, inFavorites, toggleWatchlist, toggleFavorite } = useUserLists();
  const [isTrailerModalOpen, setIsTrailerModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const isSaved = inWatchlist(movie.id);
  const isFav = inFavorites(movie.id);

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* Watch Trailer Button */}
        <button
          type="button"
          onClick={() => setIsTrailerModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:brightness-110 active:scale-98 transition-all"
        >
          <Play className="size-4 fill-current" />
          <span>Watch Trailer</span>
        </button>

        {/* Watchlist Toggle Button */}
        <button
          type="button"
          onClick={() => toggleWatchlist(movie)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            isSaved
              ? "bg-primary/20 text-primary border-primary/40 shadow-sm"
              : "bg-secondary text-foreground hover:bg-secondary/80 border-border"
          }`}
        >
          <Bookmark className={`size-4 ${isSaved ? "fill-primary" : ""}`} />
          <span>{isSaved ? "In Watchlist" : "Add to Watchlist"}</span>
        </button>

        {/* Favorites Toggle Button */}
        <button
          type="button"
          onClick={() => toggleFavorite(movie)}
          aria-label={isFav ? "Favorited" : "Favorite"}
          className={`inline-flex items-center justify-center size-10 rounded-xl border transition-all ${
            isFav
              ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
              : "bg-secondary text-foreground hover:bg-secondary/80 border-border"
          }`}
          title={isFav ? "In Favorites" : "Add to Favorites"}
        >
          <Heart className={`size-4 ${isFav ? "fill-rose-500" : ""}`} />
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share title"
          className="inline-flex items-center justify-center size-10 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 border border-border transition-colors"
          title="Copy link to clipboard"
        >
          {copied ? (
            <Check className="size-4 text-emerald-400" />
          ) : (
            <Share2 className="size-4 text-muted-foreground" />
          )}
        </button>
      </div>

      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        title={movie.title}
        trailerUrl={movie.trailerUrl}
        backdropUrl={movie.backdropUrl}
      />
    </>
  );
}
