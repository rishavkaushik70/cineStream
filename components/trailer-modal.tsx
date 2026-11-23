"use client";

import * as React from "react";
import { X, Film, AlertCircle, Volume2 } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  trailerUrl?: string;
  backdropUrl?: string;
}

export function TrailerModal({
  isOpen,
  onClose,
  title,
  trailerUrl,
  backdropUrl,
}: TrailerModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-card border border-border shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary/20 text-primary">
              <Film className="size-4" />
            </div>
            <div>
              <h2
                id="trailer-modal-title"
                className="text-base font-semibold text-foreground tracking-tight"
              >
                {title} — Official Trailer
              </h2>
              <p className="text-xs text-muted-foreground">
                Cinematic HD Preview
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close trailer dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Video or Fallback Content */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {trailerUrl ? (
            <iframe
              src={`${trailerUrl}${trailerUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <div
              className="relative size-full flex flex-col items-center justify-center text-center p-8 bg-cover bg-center"
              style={
                backdropUrl
                  ? {
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), url(${backdropUrl})`,
                    }
                  : undefined
              }
            >
              <div className="size-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 border border-primary/30">
                <AlertCircle className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Trailer Not Available
              </h3>
              <p className="text-sm text-neutral-300 max-w-md">
                An official trailer preview is not currently available for &quot;{title}&quot; on TMDB.
                CineStream is a cinematic discovery and trailer catalog.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-secondary/40 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Volume2 className="size-3.5 text-primary" />
            <span>Official TMDB Trailer Preview • Discovery Mode</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
