"use client";

import * as React from "react";
import Link from "next/link";
import { Play, Info, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MediaItem } from "@/lib/types/movie";
import { MediaImage } from "./media-image";
import { TrailerModal } from "./trailer-modal";

interface FeaturedHeroProps {
  featuredItems: MediaItem[];
}

export function FeaturedHero({ featuredItems }: FeaturedHeroProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = React.useState(false);

  const total = featuredItems.length;

  const handlePrev = React.useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = React.useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Auto-rotate every 7 seconds unless hovered, focused, or reduced-motion
  React.useEffect(() => {
    if (total <= 1 || isHovered || isFocused) return;

    // Respect reduced motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [total, isHovered, isFocused, handleNext]);

  if (!featuredItems || featuredItems.length === 0) {
    return (
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl sm:rounded-3xl bg-card border border-border/50 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
        <Sparkles className="size-10 text-primary/40 mb-3" />
        <h3 className="text-lg font-bold text-foreground">Featured Movies</h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1">
          Connecting to TMDB discovery stream...
        </p>
      </div>
    );
  }

  const current = featuredItems[currentIndex] || featuredItems[0];

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/40 shadow-2xl group/hero select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Trending Movies"
    >
      {/* Background Slides with Crossfade */}
      <div className="relative h-[480px] sm:h-[520px] md:h-[560px] w-full overflow-hidden">
        {featuredItems.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 size-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <MediaImage
                src={item.backdropUrl}
                alt={item.title}
                fill
                priority={idx === 0}
                sizes="(max-width: 1280px) 100vw, 1600px"
                className="object-cover object-center scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          );
        })}

        {/* Multi-layered Cinematic Gradients for Readability and Depth */}
        {/* 1. Dark vignette from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 md:via-black/70 to-transparent w-full md:w-4/5 z-1" />
        {/* 2. Deep gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-1" />
        {/* 3. Subtle warm golden accent glow in top right */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Top-Right Carousel Navigation Controls */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous featured movie"
            className="size-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="size-4.5" />
          </button>
          <span className="text-xs font-semibold text-white/90 px-1.5 select-none font-mono">
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next featured movie"
            className="size-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="size-4.5" />
          </button>
        </div>

        {/* Main Content Layout (Left Information Panel + Right Vertical Poster Card) */}
        <div className="absolute inset-0 z-10 flex items-center justify-between p-5 sm:p-8 md:p-12 gap-6 md:gap-10">
          {/* Left Information Panel */}
          <div className="flex flex-col justify-end size-full max-w-2xl pb-4 sm:pb-2">
            {/* Top Badges (Trending + Genres) */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40 text-[11px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md">
                <Sparkles className="size-3 text-amber-400" />
                <span>TRENDING NOW</span>
              </span>

              {current.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-full bg-black/50 text-neutral-300 border border-white/10 text-[11px] font-medium backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 font-heading drop-shadow-lg line-clamp-2">
              {current.title}
            </h1>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-300 mb-4 font-medium">
              <div className="flex items-center gap-1 text-amber-400 font-bold bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span>{current.rating.toFixed(1)}</span>
                <span className="text-white/60 font-normal text-[11px]">
                  ({current.voteCount.toLocaleString()} votes)
                </span>
              </div>
              <span>•</span>
              <span className="font-semibold text-white">{current.releaseYear}</span>
              <span>•</span>
              <span className="capitalize px-1.5 py-0.5 rounded bg-white/10 text-white/90 text-[11px]">
                {current.mediaType === "tv" ? "TV Series" : "Movie"}
              </span>
              {current.runtime && (
                <>
                  <span>•</span>
                  <span>{current.runtime}</span>
                </>
              )}
            </div>

            {/* Overview / Storyline */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-3 md:line-clamp-4 leading-relaxed mb-6 max-w-xl text-balance drop-shadow-sm">
              {current.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsTrailerOpen(true)}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-xl shadow-primary/30 hover:brightness-110 active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Play className="size-4 fill-current" />
                <span>Watch Trailer</span>
              </button>

              <Link
                href={`/${current.mediaType}/${current.id}`}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-secondary/80 text-foreground hover:bg-secondary border border-border/50 backdrop-blur-md font-medium text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Info className="size-4" />
                <span>View Details</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Area: TMDB Vertical Poster Card */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 pr-2 lg:pr-4">
            <Link
              href={`/${current.mediaType}/${current.id}`}
              className="group/poster relative w-44 lg:w-56 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/80 bg-secondary/80 transform group-hover/hero:scale-105 transition-all duration-500 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title={`View ${current.title} details`}
            >
              <MediaImage
                src={current.posterUrl}
                alt={`${current.title} vertical poster`}
                fill
                priority
                sizes="(max-width: 1024px) 176px, 224px"
                className="object-cover transition-transform duration-500 group-hover/poster:scale-105"
              />

              {/* Poster Ambient Glass Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs font-semibold text-white drop-shadow">
                  Click to Explore &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Slide Indicator Bars */}
        <div className="absolute bottom-3 left-5 sm:left-8 md:left-12 z-20 flex items-center gap-1.5">
          {featuredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-amber-400 shadow-md shadow-amber-400/50"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Real Trailer Modal Dialog */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        title={current.title}
        trailerUrl={current.trailerUrl}
        backdropUrl={current.backdropUrl}
      />
    </div>
  );
}
