"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Tv,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MediaItem } from "@/lib/types/movie";
import { MoviePosterCard } from "@/components/movie-poster-card";

interface GenreOption {
  id: number;
  name: string;
}

export function TvShowsDiscoveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1", 10) || 1;
  const genreParam = searchParams.get("genre") || "all";
  const yearParam = searchParams.get("year") || "all";
  const ratingParam = searchParams.get("rating") || "0";
  const sortParam = searchParams.get("sort") || "popularity.desc";
  const countryParam = searchParams.get("country") || "all";

  const [shows, setShows] = React.useState<MediaItem[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [genres, setGenres] = React.useState<GenreOption[]>([]);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Fetch TV genres
  React.useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch("/api/genres");
        if (res.ok) {
          const data = await res.json();
          if (data.tvGenres) {
            setGenres(data.tvGenres);
          }
        }
      } catch {}
    }
    loadGenres();
  }, []);

  // Fetch TV shows on filter change
  React.useEffect(() => {
    let isCancelled = false;

    async function fetchShows() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        query.set("page", String(pageParam));
        if (genreParam !== "all") query.set("genre", genreParam);
        if (yearParam !== "all") query.set("year", yearParam);
        if (ratingParam !== "0") query.set("minRating", ratingParam);
        if (sortParam) query.set("sortBy", sortParam);
        if (countryParam !== "all") query.set("country", countryParam);

        const res = await fetch(`/api/discover/tv?${query.toString()}`);
        if (res.ok && !isCancelled) {
          const data = await res.json();
          setShows(data.items || []);
          setTotalPages(Math.min(data.totalPages || 1, 500));
          setTotalResults(data.totalResults || 0);
        }
      } catch {
        if (!isCancelled) setShows([]);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchShows();
    return () => {
      isCancelled = true;
    };
  }, [pageParam, genreParam, yearParam, ratingParam, sortParam, countryParam]);

  const updateParams = (updates: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, val] of Object.entries(updates)) {
      if (val === undefined || val === "all" || val === 0 || val === "0") {
        next.delete(key);
      } else {
        next.set(key, String(val));
      }
    }
    if (!updates.page && updates.page !== 0) {
      next.delete("page");
    }
    router.push(`/tv?${next.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    router.push("/tv", { scroll: false });
  };

  const hasActiveFilters =
    genreParam !== "all" ||
    yearParam !== "all" ||
    ratingParam !== "0" ||
    countryParam !== "all" ||
    sortParam !== "popularity.desc";

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Tv className="size-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Live TMDB Series
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            TV Shows & Series
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Explore episodic television, seasonal hits, and critically acclaimed series.
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center rounded-xl bg-secondary/80 p-1 border border-border/50 self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { label: "Most Popular", val: "popularity.desc" },
            { label: "Top Rated", val: "vote_average.desc" },
            { label: "Recently Aired", val: "first_air_date.desc" },
          ].map((tab) => (
            <button
              key={tab.val}
              type="button"
              onClick={() => updateParams({ sort: tab.val })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                sortParam === tab.val
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
        {/* TV Genre Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => updateParams({ genre: "all" })}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
              genreParam === "all"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            All Genres
          </button>
          {genres.map((g) => {
            const isSelected = genreParam === String(g.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => updateParams({ genre: isSelected ? "all" : String(g.id) })}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                showAdvanced || hasActiveFilters
                  ? "bg-secondary text-primary border-primary/40 font-semibold"
                  : "bg-secondary/60 text-muted-foreground border-border/60 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="size-3.5" />
              <span>Advanced Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                title="Clear all filters"
              >
                <RotateCcw className="size-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            {loading ? (
              <span>Updating results...</span>
            ) : (
              <span>
                Found <strong className="text-foreground">{totalResults.toLocaleString()}</strong> shows
                (Page {pageParam} of {totalPages})
              </span>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/40 animate-in fade-in duration-200">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Premiered Year
              </label>
              <select
                value={yearParam}
                onChange={(e) => updateParams({ year: e.target.value })}
                className="h-9 px-3 rounded-xl bg-secondary/80 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Any Year</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2020">2020</option>
                <option value="2015">2015 & Earlier</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Minimum TMDB Rating
              </label>
              <select
                value={ratingParam}
                onChange={(e) => updateParams({ rating: e.target.value })}
                className="h-9 px-3 rounded-xl bg-secondary/80 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="0">Any Rating</option>
                <option value="6">★ 6.0 and above</option>
                <option value="7">★ 7.0 and above</option>
                <option value="8">★ 8.0 Masterpieces</option>
                <option value="8.5">★ 8.5 Exceptional</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Origin Region
              </label>
              <select
                value={countryParam}
                onChange={(e) => updateParams({ country: e.target.value })}
                className="h-9 px-3 rounded-xl bg-secondary/80 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Any Region</option>
                <option value="US">United States (US)</option>
                <option value="GB">United Kingdom (GB)</option>
                <option value="JP">Japan (JP)</option>
                <option value="KR">South Korea (KR)</option>
                <option value="FR">France (FR)</option>
                <option value="DE">Germany (DE)</option>
                <option value="ES">Spain (ES)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* TV Shows Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="aspect-[2/3] w-full rounded-xl bg-secondary/80" />
              <div className="h-4 w-3/4 rounded bg-secondary/70" />
              <div className="h-3 w-1/2 rounded bg-secondary/50" />
            </div>
          ))}
        </div>
      ) : shows.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {shows.map((show, index) => (
            <div key={show.id} className="flex justify-center">
              <MoviePosterCard item={show} priority={index < 6} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-card border border-border/50 max-w-lg mx-auto my-8">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/60 mb-4 border border-border">
            <Tv className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            No TV Series Found
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
            No shows match your specific combination of filters. Try adjusting your selections.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-border/40">
          <button
            type="button"
            disabled={pageParam <= 1}
            onClick={() => updateParams({ page: pageParam - 1 })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium border border-border hover:bg-secondary/80 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-medium text-muted-foreground px-2">
            Page <strong className="text-foreground">{pageParam}</strong> of {totalPages}
          </span>

          <button
            type="button"
            disabled={pageParam >= totalPages}
            onClick={() => updateParams({ page: pageParam + 1 })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium border border-border hover:bg-secondary/80 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function TvShowsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading TV Shows...
        </div>
      }
    >
      <TvShowsDiscoveryContent />
    </React.Suspense>
  );
}
