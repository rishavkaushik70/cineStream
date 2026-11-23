"use client";

import * as React from "react";
import Link from "next/link";
import { History, Play, Trash2, Clock, HardDrive, Sparkles } from "lucide-react";
import { useUserLists } from "@/lib/hooks/use-user-lists";
import { MediaImage } from "@/components/media-image";

export default function HistoryPage() {
  const { mounted, history, clearHistory } = useUserLists();
  const list = mounted ? history : [];

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="size-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Personal Space
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            Recently Viewed History
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Review titles and detail pages you have explored on CineStream.
          </p>
        </div>

        {list.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-medium border border-border transition-colors self-start sm:self-auto"
          >
            <Trash2 className="size-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Honest Local Storage Notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
        <HardDrive className="size-4 text-amber-400 shrink-0" />
        <span>
          <strong>Local Device Storage:</strong> Your viewing history is saved directly on this
          browser device. It is never transmitted to external servers.
        </span>
      </div>

      {/* History List */}
      {list.length > 0 ? (
        <div className="flex flex-col gap-3">
          {list.map((entry) => (
            <div
              key={`${entry.id}-${entry.timestamp}`}
              className="flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <Link
                  href={`/${entry.mediaType}/${entry.id}`}
                  className="relative w-20 sm:w-28 aspect-video rounded-xl overflow-hidden bg-secondary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary block"
                >
                  <MediaImage
                    src={entry.backdropUrl || entry.posterUrl}
                    alt={entry.title}
                    fill
                    sizes="112px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-5 text-white fill-white" />
                  </div>
                </Link>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-1.5 py-0.2 rounded bg-secondary text-[10px] font-bold uppercase text-primary border border-primary/20">
                      {entry.mediaType === "tv" ? "TV Series" : "Movie"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{entry.releaseYear}</span>
                  </div>

                  <Link
                    href={`/${entry.mediaType}/${entry.id}`}
                    className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
                  >
                    {entry.title}
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-medium">
                    <Clock className="size-3 text-muted-foreground/80" />
                    <span>
                      {new Date(entry.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {entry.genres[0] && (
                      <>
                        <span>•</span>
                        <span>{entry.genres[0]}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/${entry.mediaType}/${entry.id}`}
                className="px-3.5 py-2 rounded-xl bg-secondary text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
              >
                View Title
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-card border border-border/50 max-w-lg mx-auto my-8">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/60 mb-4 border border-border">
            <History className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            No Viewing History Recorded Yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
            As you browse movies and TV series detail pages on CineStream, your recently viewed
            history will automatically appear here.
          </p>
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles className="size-3.5" />
            <span>Start Exploring Titles</span>
          </Link>
        </div>
      )}
    </div>
  );
}
