/**
 * CineStream Data Access Layer
 * Centralized TMDB API data integration
 */

import {
  getFeaturedMedia as fetchFeatured,
  getTrendingMovies as fetchTrending,
  getTopRatedMovies as fetchTopRated,
  getPopularTvShows as fetchPopularTv,
  getUpcomingReleases as fetchUpcoming,
  getMovieDetails,
  getTvDetails,
  getSimilarMedia as fetchSimilar,
  getMovieGenres,
  searchMulti as fetchSearchMulti,
} from "../tmdb";
import { GenreItem, MediaItem, SearchFilters } from "../types/movie";

export async function getFeaturedMedia(): Promise<MediaItem[]> {
  const items = await fetchFeatured(5);
  return items;
}

export async function getTrendingMovies(): Promise<MediaItem[]> {
  return await fetchTrending("week");
}

export async function getTopRatedMovies(): Promise<MediaItem[]> {
  return await fetchTopRated();
}

export async function getPopularTvShows(): Promise<MediaItem[]> {
  return await fetchPopularTv();
}

export async function getUpcomingReleases(): Promise<MediaItem[]> {
  return await fetchUpcoming();
}

export async function getAllMovies(): Promise<MediaItem[]> {
  return await fetchTrending("week");
}

export async function getAllTvShows(): Promise<MediaItem[]> {
  return await fetchPopularTv();
}

export async function getMediaById(id: string): Promise<MediaItem | null> {
  // Try movie first
  const movie = await getMovieDetails(id);
  if (movie) return movie;

  // Try TV show
  const tv = await getTvDetails(id);
  if (tv) return tv;

  return null;
}

export async function getSimilarMedia(
  targetId: string,
  limit: number = 8
): Promise<MediaItem[]> {
  const similar = await fetchSimilar(targetId, "movie");
  if (similar.length > 0) return similar.slice(0, limit);

  const fallbackPool = await fetchTrending("week");
  return fallbackPool.filter((m) => m.id !== targetId).slice(0, limit);
}

export async function searchMedia(filters: SearchFilters): Promise<MediaItem[]> {
  if (filters.query && filters.query.trim()) {
    const res = await fetchSearchMulti(filters.query);
    const mediaItems: MediaItem[] = [];
    for (const r of res.results) {
      if (r.type === "movie" || r.type === "tv") {
        mediaItems.push(r.item);
      }
    }
    return mediaItems;
  }

  const trending = await fetchTrending("week");
  return trending;
}

export async function getGenres(): Promise<GenreItem[]> {
  const genres = await getMovieGenres();
  const accentColors = [
    "#ef4444",
    "#06b6d4",
    "#f59e0b",
    "#8b5cf6",
    "#10b981",
    "#ec4899",
    "#3b82f6",
    "#f97316",
    "#14b8a6",
    "#a855f7",
    "#6366f1",
    "#eab308",
  ];

  return genres.map((g, idx) => ({
    id: String(g.id),
    name: g.name,
    slug: g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    movieCount: 500 + (g.id % 20) * 150,
    description: `Explore top-rated and trending ${g.name} cinema and series.`,
    accentColor: accentColors[idx % accentColors.length],
  }));
}
