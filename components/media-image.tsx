"use client";

import * as React from "react";
import Image from "next/image";
import { Film } from "lucide-react";

interface MediaImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

function MediaImageInner({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: MediaImageProps & { src: string }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-secondary/80 via-muted to-secondary/50 text-muted-foreground p-4 text-center select-none ${
          fill ? "absolute inset-0 size-full" : ""
        } ${className}`}
      >
        <div className="size-10 rounded-full bg-background/40 flex items-center justify-center mb-2 text-primary/70">
          <Film className="size-5" />
        </div>
        <span className="text-xs font-medium text-foreground/70 line-clamp-2 px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${fill ? "size-full" : ""}`}>
      {loading && (
        <div
          className={`absolute inset-0 animate-pulse bg-secondary/60 z-0 ${className}`}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
    </div>
  );
}

export function MediaImage(props: MediaImageProps) {
  const { src } = props;

  const resolvedSrc = React.useMemo(() => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/") && (src.endsWith(".svg") || src.endsWith(".png"))) return src;
    if (src.startsWith("/")) {
      return `https://image.tmdb.org/t/p/w500${src}`;
    }
    return src;
  }, [src]);

  if (!resolvedSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-secondary/80 via-muted to-secondary/50 text-muted-foreground p-4 text-center select-none ${
          props.fill ? "absolute inset-0 size-full" : ""
        } ${props.className || ""}`}
      >
        <div className="size-10 rounded-full bg-background/40 flex items-center justify-center mb-2 text-primary/70">
          <Film className="size-5" />
        </div>
        <span className="text-xs font-medium text-foreground/70 line-clamp-2 px-2">
          {props.alt}
        </span>
      </div>
    );
  }

  // Keyed by resolvedSrc so new image URLs start fresh without effects
  return <MediaImageInner key={resolvedSrc} {...props} src={resolvedSrc} />;
}
