import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Calendar,
  ArrowLeft,
  Users,
  Layers,
  Video,
  Film,
} from "lucide-react";
import { getTvDetails, getSimilarMedia } from "@/lib/tmdb";
import { MediaImage } from "@/components/media-image";
import { MovieCarousel } from "@/components/movie-carousel";
import { MediaActionButtons } from "@/components/media-action-buttons";
import { HistoryTracker } from "@/components/history-tracker";

interface TvDetailPageProps {
  params: Promise<{ id: string }>;
}

async function TvDetailContent({ params }: TvDetailPageProps) {
  const { id } = await params;
  const show = await getTvDetails(id);

  if (!show) {
    notFound();
  }

  const similarShows = await getSimilarMedia(show.id, "tv");

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* 0. Track recently viewed in local browser history */}
      <HistoryTracker item={show} />

      {/* 1. Backdrop Banner */}
      <div className="relative -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden bg-black">
        <MediaImage
          src={show.backdropUrl}
          alt={show.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent w-full md:w-3/5" />

        {/* Back Navigation */}
        <div className="absolute top-4 left-4 sm:left-6 z-10">
          <Link
            href="/tv"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to TV Shows</span>
          </Link>
        </div>
      </div>

      {/* 2. Title & Poster Details Header */}
      <div className="relative -mt-28 sm:-mt-36 z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start px-2">
        <div className="relative w-40 sm:w-52 md:w-64 aspect-[2/3] shrink-0 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
          <MediaImage
            src={show.posterUrl}
            alt={show.title}
            fill
            priority
            sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 256px"
            className="object-cover"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold tracking-wider border border-white/10 backdrop-blur-sm">
            TV SHOW
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-end pt-2 md:pt-16">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {show.genres.map((genre) => (
              <Link
                key={genre}
                href={`/tv?genre=${encodeURIComponent(genre)}`}
                className="px-2.5 py-0.5 rounded-full bg-secondary text-primary font-medium text-xs hover:bg-secondary/80 border border-primary/20 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground font-heading">
            {show.title}
          </h1>

          {show.originalTitle && show.originalTitle !== show.title && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Original Title: <em>{show.originalTitle}</em>
            </p>
          )}

          {show.tagline && (
            <p className="text-sm sm:text-base text-primary/90 italic font-medium mt-1">
              &ldquo;{show.tagline}&rdquo;
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground mt-4 py-2 border-y border-border/40">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>{show.rating.toFixed(1)}</span>
              <span className="text-muted-foreground font-normal text-xs">
                ({show.voteCount.toLocaleString()} TMDB votes)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>Premiered {show.releaseYear}</span>
            </div>

            {show.seasons && (
              <div className="flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>
                  {show.seasons} {show.seasons === 1 ? "Season" : "Seasons"}{" "}
                  {show.episodes ? `(${show.episodes} Episodes)` : ""}
                </span>
              </div>
            )}

            {show.status && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                {show.status}
              </span>
            )}
          </div>

          <div className="mt-5">
            <MediaActionButtons movie={show} />
          </div>
        </div>
      </div>

      {/* 3. Overview */}
      <section className="flex flex-col gap-3 max-w-4xl px-2">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
          Series Overview
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
          {show.overview}
        </p>
      </section>

      {/* 4. Starring Cast */}
      {show.cast && show.cast.length > 0 && (
        <section className="flex flex-col gap-3 px-2">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              Starring Cast
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {show.cast.map((actor) => (
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

      {/* 5. Trailer Player */}
      <section className="flex flex-col gap-3 px-2">
        <div className="flex items-center gap-2">
          <Video className="size-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            Official Series Trailer
          </h2>
        </div>

        <div className="relative aspect-video w-full max-w-3xl rounded-2xl overflow-hidden bg-black border border-border shadow-lg">
          {show.trailerUrl ? (
            <iframe
              src={`${show.trailerUrl}${show.trailerUrl.includes("?") ? "&" : "?"}autoplay=0`}
              title={`${show.title} Official Trailer Preview`}
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
                No active official trailer preview is currently attached to &ldquo;{show.title}&rdquo;
                on TMDB.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Similar Shows */}
      {similarShows.length > 0 && (
        <MovieCarousel
          title="Recommended Series"
          items={similarShows}
          seeAllHref="/tv"
        />
      )}
    </div>
  );
}

export default function TvDetailPage({ params }: TvDetailPageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading Series Preview...
        </div>
      }
    >
      <TvDetailContent params={params} />
    </React.Suspense>
  );
}
