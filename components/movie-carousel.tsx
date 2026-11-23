"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { MediaItem } from "../lib/types/movie";
import { MoviePosterCard } from "./movie-poster-card";

interface MovieCarouselProps {
  title: string;
  items: MediaItem[];
  seeAllHref?: string;
  icon?: React.ReactNode;
}

export function MovieCarousel({
  title,
  items,
  seeAllHref,
  icon,
}: MovieCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  React.useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, items]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative flex flex-col gap-3 py-2 w-full group/carousel">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            {title}
          </h2>
        </div>

        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="group/link inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <span>See All</span>
            <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Horizontal Scroller Container */}
      <div className="relative w-full">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={`Scroll ${title} left`}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* The Scroller */}
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 -mx-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, index) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }}>
              <MoviePosterCard item={item} priority={index < 4} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button (matches circular button in reference screenshot) */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={`Scroll ${title} right`}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>
    </section>
  );
}
