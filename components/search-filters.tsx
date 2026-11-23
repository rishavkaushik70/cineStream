"use client";

import * as React from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { MediaType, SearchFilters as FilterType } from "../lib/types/movie";

interface SearchFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onReset: () => void;
  genres: string[];
}

export function SearchFilters({
  filters,
  onChange,
  onReset,
  genres,
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const hasActiveFilters =
    Boolean(filters.query) ||
    Boolean(filters.genre && filters.genre !== "all") ||
    Boolean(filters.mediaType && filters.mediaType !== "all") ||
    Boolean(filters.year && filters.year !== "all") ||
    Boolean(filters.minRating && filters.minRating > 0) ||
    Boolean(filters.sortBy && filters.sortBy !== "popularity");

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/50 shadow-sm w-full">
      {/* Top Row: Search Input + Toggle Advanced + Reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={filters.query || ""}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="Search by title, actor, director..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-secondary/70 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Media Type Toggle Buttons */}
        <div className="flex items-center rounded-xl bg-secondary/80 p-1 border border-border/50 self-start sm:self-auto">
          {(["all", "movie", "tv"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  mediaType: type as "all" | MediaType,
                })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                (filters.mediaType || "all") === type
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type === "all" ? "All Media" : type === "movie" ? "Movies" : "TV Shows"}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle & Reset Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              showAdvanced || hasActiveFilters
                ? "bg-secondary text-primary border-primary/40"
                : "bg-secondary/60 text-muted-foreground border-border/60 hover:text-foreground"
            }`}
          >
            <SlidersHorizontal className="size-3.5" />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Genre Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => onChange({ ...filters, genre: "all" })}
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
            !filters.genre || filters.genre === "all"
              ? "bg-primary text-primary-foreground font-semibold"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          All Genres
        </button>
        {genres.map((g) => {
          const isActive = filters.genre?.toLowerCase() === g.toLowerCase();
          return (
            <button
              key={g}
              type="button"
              onClick={() => onChange({ ...filters, genre: g })}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Row (Collapsible) */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Release Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Release Year
            </label>
            <select
              value={filters.year || "all"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  year: e.target.value === "all" ? "all" : Number(e.target.value),
                })
              }
              className="h-9 px-3 rounded-xl bg-secondary/70 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Any Year</option>
              <option value="2026">2026 (Upcoming)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2020">2020 & Earlier</option>
            </select>
          </div>

          {/* Min Rating */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Minimum Rating
            </label>
            <select
              value={filters.minRating || 0}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minRating: Number(e.target.value),
                })
              }
              className="h-9 px-3 rounded-xl bg-secondary/70 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="0">Any Rating</option>
              <option value="6">★ 6.0 and above</option>
              <option value="7">★ 7.0 and above</option>
              <option value="8">★ 8.0 and above</option>
              <option value="8.5">★ 8.5 Masterpieces</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Sort Results
            </label>
            <select
              value={filters.sortBy || "popularity"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  sortBy: e.target.value as FilterType["sortBy"],
                })
              }
              className="h-9 px-3 rounded-xl bg-secondary/70 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="releaseDate">Latest Release</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
