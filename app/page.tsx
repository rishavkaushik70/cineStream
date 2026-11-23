import * as React from "react";
import {
  getFeaturedMedia,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTvShows,
  getUpcomingReleases,
} from "@/lib/tmdb";
import { getGenres } from "@/lib/data/movies-api";
import { FeaturedHero } from "@/components/featured-hero";
import { MovieCarousel } from "@/components/movie-carousel";
import { GenreCard } from "@/components/genre-card";
import { Flame, Trophy, Tv, Calendar, LayoutGrid, Film } from "lucide-react";

async function HomeContent() {
  const [
    featuredItems,
    trendingMovies,
    popularMovies,
    topRatedMovies,
    popularTvShows,
    upcomingReleases,
    genres,
  ] = await Promise.all([
    getFeaturedMedia(5),
    getTrendingMovies("week"),
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularTvShows(),
    getUpcomingReleases(),
    getGenres(),
  ]);

  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-12">
      {/* 1. Cinematic Hero Carousel (Real TMDB Data) */}
      <FeaturedHero featuredItems={featuredItems} />

      {/* 2. Trending Movies */}
      <MovieCarousel
        title="Trending Movies"
        items={trendingMovies}
        seeAllHref="/movies?sort=trending"
        icon={<Flame className="size-5 text-amber-500" />}
      />

      {/* 3. Popular Movies */}
      <MovieCarousel
        title="Popular Movies"
        items={popularMovies}
        seeAllHref="/movies?sort=popularity.desc"
        icon={<Film className="size-5 text-amber-500" />}
      />

      {/* 4. Top Rated Movies */}
      <MovieCarousel
        title="Top Rated Masterpieces"
        items={topRatedMovies}
        seeAllHref="/movies?sort=vote_average.desc"
        icon={<Trophy className="size-5 text-amber-400" />}
      />

      {/* 5. Popular TV Shows */}
      <MovieCarousel
        title="Popular TV Shows"
        items={popularTvShows}
        seeAllHref="/tv"
        icon={<Tv className="size-5 text-amber-400" />}
      />

      {/* 6. Upcoming Releases */}
      <MovieCarousel
        title="Upcoming Releases"
        items={upcomingReleases}
        seeAllHref="/movies?sort=upcoming"
        icon={<Calendar className="size-5 text-amber-500" />}
      />

      {/* 7. Explore by Genre Section */}
      <section className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              Explore by Genre
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {genres.slice(0, 12).map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col gap-8 pb-12 animate-pulse">
          <div className="h-[460px] sm:h-[520px] md:h-[560px] w-full rounded-3xl bg-secondary/80" />
          <div className="h-6 w-48 rounded bg-secondary/60" />
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] w-44 rounded-xl bg-secondary/80" />
            ))}
          </div>
        </div>
      }
    >
      <HomeContent />
    </React.Suspense>
  );
}
