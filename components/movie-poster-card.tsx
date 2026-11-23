"use client";

import * as React from "react";
import Link from "next/link";
import { Star, Heart, Bookmark, Play } from "lucide-react";
import { MediaItem } from "../lib/types/movie";
import { MediaImage } from "./media-image";
import { useUserLists } from "../lib/hooks/use-user-lists";

interface MoviePosterCardProps {
  item: MediaItem;
  priority?: boolean;
}

export function MoviePosterCard({ item, priority = false }: MoviePosterCardProps) {
  const { inWatchlist, inFavorites, toggleWatchlist, toggleFavorite } = useUserLists();
  const isFavorite = inFavorites(item.id);
  const isSaved = inWatchlist(item.id);

  return (
    <div className="group relative flex flex-col shrink-0 w-[145px] sm:w-[170px] md:w-[185px] select-none">
      {/* Card Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-card border border-border/50 shadow-md group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
        <Link
          href={`/${item.mediaType}/${item.id}`}
          className="relative block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <MediaImage
            src={item.posterUrl}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 145px, (max-width: 768px) 170px, 185px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10 pointer-events-none">
            {/* Category / Media Type Tag */}
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-black/70 text-neutral-200 backdrop-blur-md border border-white/10">
              {item.mediaType === "tv" ? "TV" : "MOVIE"}
            </span>

            {/* Rating Pill */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/75 text-amber-400 backdrop-blur-md border border-white/10 text-[11px] font-bold">
              <Star className="size-2.5 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Hover Vignette Overlay & Quick Play Icon */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 z-1">
            <div className="size-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="size-5 fill-current translate-x-0.5" />
            </div>
          </div>
        </Link>

        {/* Floating Quick Action Buttons on Hover (Top-Right under rating or bottom) */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(item);
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isFavorite
                ? "bg-rose-500/80 text-white"
                : "bg-black/60 text-white/80 hover:text-white hover:bg-black/80"
            }`}
          >
            <Heart className={`size-3.5 ${isFavorite ? "fill-white" : ""}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWatchlist(item);
            }}
            aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? "bg-primary/80 text-primary-foreground"
                : "bg-black/60 text-white/80 hover:text-white hover:bg-black/80"
            }`}
          >
            <Bookmark className={`size-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Card Info Below Poster (Clean & readable at all sizes) */}
      <div className="mt-2 flex flex-col">
        <Link
          href={`/${item.mediaType}/${item.id}`}
          className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
          title={item.title}
        >
          {item.title}
        </Link>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5 font-medium">
          <span>{item.releaseYear}</span>
          <span>•</span>
          <span className="line-clamp-1">{item.genres[0] || item.mediaType}</span>
        </div>
      </div>
    </div>
  );
}
