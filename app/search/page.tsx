"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Film,
  Tv,
  Users,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { MediaItem } from "@/lib/types/movie";
import { MoviePosterCard } from "@/components/movie-poster-card";
import { MediaImage } from "@/components/media-image";

interface PersonResult {
  id: string;
  name: string;
  knownForDepartment: string;
  profileUrl: string;
  knownForTitles: string[];
}

type SearchResultItem =
  | { type: "movie"; item: MediaItem }
  | { type: "tv"; item: MediaItem }
  | { type: "person"; item: PersonResult };

type FilterTab = "all" | "movie" | "tv" | "person";

export function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = React.useState(urlQuery);
  const [activeTab, setActiveTab] = React.useState<FilterTab>("all");
  const [results, setResults] = React.useState<SearchResultItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Debounced search with AbortController
  React.useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Search request failed");
        }

        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to fetch search results. Please try again.");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
    }
  };

  const activeResults = React.useMemo(() => {
    return query.trim() ? results : [];
  }, [query, results]);

  const filteredResults = React.useMemo(() => {
    if (activeTab === "all") return activeResults;
    return activeResults.filter((r) => r.type === activeTab);
  }, [activeResults, activeTab]);

  const movieCount = activeResults.filter((r) => r.type === "movie").length;
  const tvCount = activeResults.filter((r) => r.type === "tv").length;
  const personCount = activeResults.filter((r) => r.type === "person").length;

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Search className="size-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Multi-Search Discovery
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
          Search CineStream
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Find movies, television series, and actors across the global TMDB index.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a movie title, TV show, or actor..."
          className="w-full h-12 pl-12 pr-10 rounded-2xl bg-card border border-border/60 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              router.push("/search", { scroll: false });
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full"
            aria-label="Clear query"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {/* Tabs Filter */}
      {query.trim().length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Results", count: activeResults.length, icon: Sparkles },
            { id: "movie", label: "Movies", count: movieCount, icon: Film },
            { id: "tv", label: "TV Shows", count: tvCount, icon: Tv },
            { id: "person", label: "People / Actors", count: personCount, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/30 text-white" : "bg-background/60 text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Search States */}
      {error ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-destructive/10 border border-destructive/30 max-w-lg mx-auto my-6">
          <AlertCircle className="size-10 text-destructive mb-3" />
          <h3 className="text-base font-bold text-foreground mb-1">Search Connection Error</h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-4">{error}</p>
          <button
            type="button"
            onClick={() => setQuery((prev) => `${prev.trim()} `)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="size-3.5" />
            <span>Retry Search</span>
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="aspect-[2/3] w-full rounded-xl bg-secondary/80" />
              <div className="h-4 w-3/4 rounded bg-secondary/70" />
            </div>
          ))}
        </div>
      ) : query.trim().length > 0 && filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredResults.map((res) => {
            if (res.type === "movie" || res.type === "tv") {
              return (
                <div key={`${res.type}-${res.item.id}`} className="flex justify-center">
                  <MoviePosterCard item={res.item} />
                </div>
              );
            }

            const person = res.item;
            return (
              <Link
                key={`person-${person.id}`}
                href={`/person/${person.id}`}
                className="group flex flex-col items-center text-center p-3.5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative size-24 sm:size-28 rounded-full overflow-hidden mb-3 bg-secondary border-2 border-border group-hover:border-primary/60 transition-colors">
                  <MediaImage
                    src={person.profileUrl}
                    alt={person.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {person.name}
                </span>
                <span className="text-[11px] text-primary/80 font-medium line-clamp-1 mt-0.5">
                  {person.knownForDepartment}
                </span>
                {person.knownForTitles.length > 0 && (
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1 px-1">
                    {person.knownForTitles.join(" • ")}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      ) : query.trim().length > 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-card border border-border/50 max-w-lg mx-auto my-8">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/60 mb-4 border border-border">
            <Film className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            No Results Found for &ldquo;{query}&rdquo;
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
            Check the spelling of the movie, TV series, or actor name, or try searching for a broader term.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-card/60 border border-border/40 max-w-lg mx-auto my-8">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/60 mb-4 border border-border">
            <Search className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Ready to Discover
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-4">
            Type any film title, television series, director, or actor into the search box above to explore TMDB.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {["Dune", "Avatar", "Inception", "Stranger Things", "Christopher Nolan"].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/60 transition-colors"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading Search Experience...
        </div>
      }
    >
      <SearchPageContent />
    </React.Suspense>
  );
}
