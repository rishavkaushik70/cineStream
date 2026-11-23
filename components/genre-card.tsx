"use client";

import * as React from "react";
import Link from "next/link";
import {
  Flame,
  Rocket,
  Theater,
  Skull,
  Smile,
  Sparkles,
  Compass,
  Ghost,
} from "lucide-react";
import { GenreItem } from "../lib/types/movie";

const GENRE_ICONS: Record<string, React.ElementType> = {
  action: Flame,
  "sci-fi": Rocket,
  drama: Theater,
  thriller: Skull,
  comedy: Smile,
  animation: Sparkles,
  adventure: Compass,
  horror: Ghost,
};

interface GenreCardProps {
  genre: GenreItem;
}

export function GenreCard({ genre }: GenreCardProps) {
  const Icon = GENRE_ICONS[genre.slug] || Sparkles;

  return (
    <Link
      href={`/movies?genre=${encodeURIComponent(genre.id)}`}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Subtle ambient warm glow on hover */}
      <div
        className="absolute -right-6 -bottom-6 size-24 rounded-full opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-300"
        style={{ backgroundColor: genre.accentColor || "var(--primary)" }}
      />

      <div className="flex items-center justify-between z-1">
        <div
          className="size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{
            backgroundColor: `${genre.accentColor}18`,
            color: genre.accentColor,
          }}
        >
          <Icon className="size-5" />
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full">
          {genre.movieCount}+
        </span>
      </div>

      <div className="mt-4 z-1">
        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
          {genre.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {genre.description}
        </p>
      </div>
    </Link>
  );
}
