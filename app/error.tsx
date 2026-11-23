"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log sanitized error without printing any credentials
    console.error("[CineStream App Error]", error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="size-18 rounded-3xl bg-destructive/10 border border-destructive/25 flex items-center justify-center text-destructive mb-6 shadow-xl">
        <AlertCircle className="size-9" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-destructive mb-2">
        Connection Notice
      </span>

      <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-heading mb-3">
        Unable to Load Catalog Data
      </h1>

      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        A temporary network disruption or catalog service issue occurred while loading this
        cinematic view. You can retry the request or return to the discovery homepage.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-98 transition-all shadow-md"
        >
          <RefreshCw className="size-4" />
          <span>Retry Request</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 border border-border transition-all"
        >
          <Home className="size-4" />
          <span>Return to Discovery</span>
        </Link>
      </div>
    </div>
  );
}

