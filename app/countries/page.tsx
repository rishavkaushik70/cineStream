import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { getTrendingMovies, getTmdbCountries } from "@/lib/tmdb";
import { MoviePosterCard } from "@/components/movie-poster-card";

// Notable world cinema producing countries with flags and native descriptions
const FEATURED_REGIONS = [
  { name: "United States", code: "US", flag: "🇺🇸", language: "English" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", language: "English" },
  { name: "Japan", code: "JP", flag: "🇯🇵", language: "Japanese (Anime/Cinema)" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", language: "Korean (K-Drama/Film)" },
  { name: "France", code: "FR", flag: "🇫🇷", language: "French (Auteur/Art)" },
  { name: "India", code: "IN", flag: "🇮🇳", language: "Hindi/Regional Cinema" },
  { name: "Germany", code: "DE", flag: "🇩🇪", language: "German" },
  { name: "Spain", code: "ES", flag: "🇪🇸", language: "Spanish" },
  { name: "Italy", code: "IT", flag: "🇮🇹", language: "Italian" },
  { name: "Canada", code: "CA", flag: "🇨🇦", language: "English/French" },
  { name: "Australia", code: "AU", flag: "🇦🇺", language: "English" },
  { name: "Denmark", code: "DK", flag: "🇩🇰", language: "Danish/Nordic Noir" },
];

export default async function CountriesPage() {
  const [trendingMovies, allCountries] = await Promise.all([
    getTrendingMovies("week"),
    getTmdbCountries(),
  ]);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Globe className="size-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            World Cinema
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
          Explore by Origin Country
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Discover films filtered by production origin using TMDB&apos;s origin country parameters.
        </p>
      </div>

      {/* Featured Country Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {FEATURED_REGIONS.map((region) => (
          <Link
            key={region.code}
            href={`/movies?country=${region.code}`}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all text-center group cursor-pointer shadow-sm hover:shadow-md"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform select-none">
              {region.flag}
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {region.name}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
              {region.language}
            </span>
          </Link>
        ))}
      </div>

      {/* Additional TMDB Configured Countries */}
      {allCountries.length > 0 && (
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-card/60 border border-border/40">
          <h2 className="text-sm font-bold text-foreground">
            All TMDB Configured Production Countries ({allCountries.length})
          </h2>
          <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-2">
            {allCountries.map((c) => (
              <Link
                key={c.iso_3166_1}
                href={`/movies?country=${c.iso_3166_1}`}
                className="px-2.5 py-1 rounded-lg bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary text-xs transition-colors"
              >
                {c.english_name} ({c.iso_3166_1})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* International Spotlight (Real TMDB Data) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              International Spotlight
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live trending films from around the globe
            </p>
          </div>
          <Link
            href="/movies"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {trendingMovies.slice(0, 12).map((item, index) => (
            <div key={item.id} className="flex justify-center">
              <MoviePosterCard item={item} priority={index < 4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
