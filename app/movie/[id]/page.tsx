import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Clock,
  Calendar,
  Film,
  ArrowLeft,
  Users,
  Video,
} from "lucide-react";
import { getMovieDetails, getSimilarMedia } from "@/lib/tmdb";
import { MediaImage } from "@/components/media-image";
import { MovieCarousel } from "@/components/movie-carousel";
import { MediaActionButtons } from "@/components/media-action-buttons";
import { HistoryTracker } from "@/components/history-tracker";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatCurrency(amount?: number): string | null {
  if (!amount || amount <= 0) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function MovieDetailContent({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const similarMovies = await getSimilarMedia(movie.id, "movie");
  const budgetFormatted = formatCurrency(movie.budget);
  const revenueFormatted = formatCurrency(movie.revenue);

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* 0. Track recently viewed in local browser history */}
      <HistoryTracker item={movie} />

      {/* 1. Backdrop Banner with Ambient Gradients */}
      <div className="relative -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden bg-black">
        <MediaImage
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent w-full md:w-3/5" />

        {/* Floating Back Navigation */}
        <div className="absolute top-4 left-4 sm:left-6 z-10">
          <Link
            href="/movies"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Movies</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Title & Poster Details Header */}
      <div className="relative -mt-28 sm:-mt-36 z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start px-2">
        {/* Poster Artwork Card */}
        <div className="relative w-40 sm:w-52 md:w-64 aspect-[2/3] shrink-0 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
          <MediaImage
            src={movie.posterUrl}
            alt={movie.title}
            fill
            priority
            sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 256px"
            className="object-cover"
          />
          {movie.certification && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold tracking-wider border border-white/10 backdrop-blur-sm">
              {movie.certification}
            </span>
          )}
        </div>

        {/* Textual Metadata & Actions */}
        <div className="flex-1 flex flex-col justify-end pt-2 md:pt-16">
          {/* Genre Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {movie.genres.map((genre) => (
              <Link
                key={genre}
                href={`/movies?genre=${encodeURIComponent(genre)}`}
                className="px-2.5 py-0.5 rounded-full bg-secondary text-primary font-medium text-xs hover:bg-secondary/80 border border-primary/20 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>

          {/* Full Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground font-heading">
            {movie.title}
          </h1>

          {/* Original Title if different */}
          {movie.originalTitle && movie.originalTitle !== movie.title && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Original Title: <em>{movie.originalTitle}</em>
            </p>
          )}

          {/* Tagline */}
          {movie.tagline && (
            <p className="text-sm sm:text-base text-primary/90 italic font-medium mt-1">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground mt-4 py-2 border-y border-border/40">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>{movie.rating.toFixed(1)}</span>
              <span className="text-muted-foreground font-normal text-xs">
                ({movie.voteCount.toLocaleString()} TMDB votes)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{movie.releaseDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{movie.runtime}</span>
            </div>

            {movie.director && (
              <div className="flex items-center gap-1.5">
                <Film className="size-3.5" />
                <span>
                  Directed by <strong className="text-foreground">{movie.director}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Interactive Action Buttons */}
          <div className="mt-5">
            <MediaActionButtons movie={movie} />
          </div>
        </div>
      </div>

      {/* 3. Storyline & Financial Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
        <section className="lg:col-span-2 flex flex-col gap-3">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            Storyline & Overview
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
            {movie.overview}
          </p>
        </section>

        {/* Details Sidebar (Budget, Revenue, Production) */}
        {(budgetFormatted || revenueFormatted || movie.status) && (
          <aside className="p-5 rounded-2xl bg-card border border-border/50 flex flex-col gap-3.5 text-xs text-muted-foreground h-fit">
            <h3 className="font-bold text-sm text-foreground mb-1">Movie Information</h3>

            {movie.status && (
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span>Release Status</span>
                <span className="font-semibold text-foreground">{movie.status}</span>
              </div>
            )}

            {budgetFormatted && (
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span>Production Budget</span>
                <span className="font-semibold text-foreground">{budgetFormatted}</span>
              </div>
            )}

            {revenueFormatted && (
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span>Worldwide Box Office</span>
                <span className="font-semibold text-emerald-400">{revenueFormatted}</span>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 4. Principal Cast */}
      {movie.cast && movie.cast.length > 0 && (
        <section className="flex flex-col gap-3 px-2">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              Principal Cast
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {movie.cast.map((actor) => (
              <Link
                key={actor.id}
                href={`/person/${actor.id}`}
                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/50 shadow-sm transition-all"
              >
                <div className="relative size-18 sm:size-20 rounded-full overflow-hidden mb-2 bg-secondary border-2 border-border group-hover:border-primary/60 transition-colors">
                  <MediaImage
                    src={actor.avatarUrl}
                    alt={actor.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {actor.name}
                </span>
                <span className="text-[11px] text-muted-foreground line-clamp-1">
                  {actor.character}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. Trailer Preview Player (No audio autoplay, real TMDB embed) */}
      <section className="flex flex-col gap-3 px-2">
        <div className="flex items-center gap-2">
          <Video className="size-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            Official Trailer Preview
          </h2>
        </div>

        <div className="relative aspect-video w-full max-w-3xl rounded-2xl overflow-hidden bg-black border border-border shadow-lg">
          {movie.trailerUrl ? (
            <iframe
              src={`${movie.trailerUrl}${movie.trailerUrl.includes("?") ? "&" : "?"}autoplay=0`}
              title={`${movie.title} Official Trailer Preview`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <div className="size-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
              <Film className="size-12 text-primary/40 mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">
                Trailer Not Available
              </h3>
              <p className="text-xs max-w-sm">
                No active official trailer preview is currently attached to &ldquo;{movie.title}&rdquo;
                on TMDB.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Similar Recommendations Carousel */}
      {similarMovies.length > 0 && (
        <MovieCarousel
          title="More Like This"
          items={similarMovies}
          seeAllHref={`/movies?genre=${encodeURIComponent(movie.genres[0] || "")}`}
        />
      )}
    </div>
  );
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading Cinematic Experience...
        </div>
      }
    >
      <MovieDetailContent params={params} />
    </React.Suspense>
  );
}
