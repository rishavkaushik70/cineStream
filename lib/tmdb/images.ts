const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const TMDB_IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
} as const;

export const FALLBACK_IMAGES = {
  poster: "/poster-placeholder.svg",
  backdrop: "/backdrop-placeholder.svg",
  profile: "/avatar-placeholder.svg",
};

/**
 * Build a valid TMDB image URL from a path
 */
export function getTmdbImageUrl(
  path: string | null | undefined,
  size: string = "original",
  fallback: string = ""
): string {
  if (!path) return fallback;
  // If already absolute URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE_URL}/${size}${cleanPath}`;
}

export function getPosterUrl(
  path: string | null | undefined,
  size: "small" | "medium" | "large" | "original" = "large"
): string {
  return getTmdbImageUrl(
    path,
    TMDB_IMAGE_SIZES.poster[size],
    FALLBACK_IMAGES.poster
  );
}

export function getBackdropUrl(
  path: string | null | undefined,
  size: "small" | "medium" | "large" | "original" = "large"
): string {
  return getTmdbImageUrl(
    path,
    TMDB_IMAGE_SIZES.backdrop[size],
    FALLBACK_IMAGES.backdrop
  );
}

export function getProfileUrl(
  path: string | null | undefined,
  size: "small" | "medium" | "large" | "original" = "medium"
): string {
  return getTmdbImageUrl(
    path,
    TMDB_IMAGE_SIZES.profile[size],
    FALLBACK_IMAGES.profile
  );
}

