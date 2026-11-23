import "server-only";

import { tmdbFetch } from "./client";
import { TMDB_ENDPOINTS } from "./endpoints";
import {
  TmdbRawMovie,
  TmdbRawTv,
  TmdbRawPerson,
  TmdbPaginatedResponse,
  TmdbSearchMultiItem,
  TmdbGenre,
  TmdbCountry,
  PersonItemModel,
} from "./types";
import {
  transformMovieToMediaItem,
  transformTvToMediaItem,
  transformPersonToPersonItem,
} from "./transforms";
import { MediaItem } from "../types/movie";

/**
 * 1. Featured Media for Homepage Hero
 * Sourced from /3/trending/movie/week
 * Only picks items with a valid backdrop and poster, up to 5 items
 */
export async function getFeaturedMedia(limit: number = 5): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.trendingMovies("week"),
    { revalidate: 1800 } // revalidate every 30 mins
  );

  if (!data?.results || data.results.length === 0) {
    return [];
  }

  // Filter only items with non-empty backdrop_path and poster_path
  const validMovies = data.results.filter(
    (item) => Boolean(item.backdrop_path) && Boolean(item.poster_path)
  );

  return validMovies.slice(0, limit).map((m) =>
    transformMovieToMediaItem(m, { isTrending: true })
  );
}

/**
 * 2. Trending Movies
 */
export async function getTrendingMovies(
  timeWindow: "day" | "week" = "week",
  page: number = 1
): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.trendingMovies(timeWindow),
    { params: { page }, revalidate: 3600 }
  );

  if (!data?.results) return [];
  return data.results.map((m) =>
    transformMovieToMediaItem(m, { isTrending: true })
  );
}

/**
 * 3. Popular Movies
 */
export async function getPopularMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.popularMovies,
    { params: { page }, revalidate: 3600 }
  );

  if (!data?.results) return [];
  return data.results.map((m) =>
    transformMovieToMediaItem(m, { isPopular: true })
  );
}

/**
 * 4. Top Rated Movies
 */
export async function getTopRatedMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.topRatedMovies,
    { params: { page }, revalidate: 7200 }
  );

  if (!data?.results) return [];
  return data.results.map((m) =>
    transformMovieToMediaItem(m, { isTopRated: true })
  );
}

/**
 * 5. Upcoming Releases
 */
export async function getUpcomingReleases(page: number = 1): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.upcomingMovies,
    { params: { page }, revalidate: 3600 }
  );

  if (!data?.results) return [];
  return data.results.map((m) =>
    transformMovieToMediaItem(m, { isUpcoming: true })
  );
}

/**
 * 6. Popular TV Shows
 */
export async function getPopularTvShows(page: number = 1): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawTv>>(
    TMDB_ENDPOINTS.popularTv,
    { params: { page }, revalidate: 3600 }
  );

  if (!data?.results) return [];
  return data.results.map((t) =>
    transformTvToMediaItem(t, { isPopular: true })
  );
}

/**
 * 7. Trending TV Shows
 */
export async function getTrendingTvShows(
  timeWindow: "day" | "week" = "week",
  page: number = 1
): Promise<MediaItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawTv>>(
    TMDB_ENDPOINTS.trendingTv(timeWindow),
    { params: { page }, revalidate: 3600 }
  );

  if (!data?.results) return [];
  return data.results.map((t) =>
    transformTvToMediaItem(t, { isTrending: true })
  );
}

/**
 * 8. Movie Details by ID (with append_to_response)
 */
export async function getMovieDetails(id: string | number): Promise<MediaItem | null> {
  const raw = await tmdbFetch<TmdbRawMovie>(TMDB_ENDPOINTS.movieDetails(id), {
    revalidate: 1800,
  });

  if (!raw || !raw.id) return null;
  return transformMovieToMediaItem(raw);
}

/**
 * 9. TV Details by ID (with append_to_response)
 */
export async function getTvDetails(id: string | number): Promise<MediaItem | null> {
  const raw = await tmdbFetch<TmdbRawTv>(TMDB_ENDPOINTS.tvDetails(id), {
    revalidate: 1800,
  });

  if (!raw || !raw.id) return null;
  return transformTvToMediaItem(raw);
}

/**
 * 10. Person Details by ID
 */
export async function getPersonDetails(id: string | number): Promise<PersonItemModel | null> {
  const raw = await tmdbFetch<TmdbRawPerson>(TMDB_ENDPOINTS.personDetails(id), {
    revalidate: 3600,
  });

  if (!raw || !raw.id) return null;
  return transformPersonToPersonItem(raw);
}

/**
 * 11. Similar Movies / Recommendations
 */
export async function getSimilarMedia(
  id: string | number,
  mediaType: "movie" | "tv" = "movie"
): Promise<MediaItem[]> {
  if (mediaType === "movie") {
    const raw = await tmdbFetch<{ results: TmdbRawMovie[] }>(
      `/3/movie/${id}/similar`,
      { revalidate: 3600 }
    );
    return (raw?.results || [])
      .slice(0, 10)
      .map((m) => transformMovieToMediaItem(m));
  } else {
    const raw = await tmdbFetch<{ results: TmdbRawTv[] }>(
      `/3/tv/${id}/similar`,
      { revalidate: 3600 }
    );
    return (raw?.results || [])
      .slice(0, 10)
      .map((t) => transformTvToMediaItem(t));
  }
}

/**
 * 12. Discover Movies with Filters
 */
export interface DiscoverMovieParams {
  page?: number;
  with_genres?: string;
  primary_release_year?: number | string;
  "vote_average.gte"?: number;
  sort_by?: string;
  with_origin_country?: string;
}

export async function discoverMovies(params: DiscoverMovieParams = {}): Promise<{
  page: number;
  totalPages: number;
  totalResults: number;
  items: MediaItem[];
}> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawMovie>>(
    TMDB_ENDPOINTS.discoverMovie,
    {
      params: {
        page: params.page || 1,
        with_genres: params.with_genres,
        primary_release_year:
          params.primary_release_year === "all" ? undefined : params.primary_release_year,
        "vote_average.gte": params["vote_average.gte"] || undefined,
        sort_by: params.sort_by || "popularity.desc",
        with_origin_country: params.with_origin_country,
        include_adult: false,
      },
      revalidate: 1800,
    }
  );

  return {
    page: data?.page || 1,
    totalPages: Math.min(data?.total_pages || 1, 500),
    totalResults: data?.total_results || 0,
    items: (data?.results || []).map((m) => transformMovieToMediaItem(m)),
  };
}

/**
 * 13. Discover TV Shows with Filters
 */
export interface DiscoverTvParams {
  page?: number;
  with_genres?: string;
  first_air_date_year?: number | string;
  "vote_average.gte"?: number;
  sort_by?: string;
  with_origin_country?: string;
}

export async function discoverTv(params: DiscoverTvParams = {}): Promise<{
  page: number;
  totalPages: number;
  totalResults: number;
  items: MediaItem[];
}> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbRawTv>>(
    TMDB_ENDPOINTS.discoverTv,
    {
      params: {
        page: params.page || 1,
        with_genres: params.with_genres,
        first_air_date_year:
          params.first_air_date_year === "all" ? undefined : params.first_air_date_year,
        "vote_average.gte": params["vote_average.gte"] || undefined,
        sort_by: params.sort_by || "popularity.desc",
        with_origin_country: params.with_origin_country,
        include_adult: false,
      },
      revalidate: 1800,
    }
  );

  return {
    page: data?.page || 1,
    totalPages: Math.min(data?.total_pages || 1, 500),
    totalResults: data?.total_results || 0,
    items: (data?.results || []).map((t) => transformTvToMediaItem(t)),
  };
}

/**
 * 14. Multi-Search (Movies, TV Shows, Persons)
 */
export async function searchMulti(
  query: string,
  page: number = 1
): Promise<{
  page: number;
  totalPages: number;
  totalResults: number;
  results: Array<
    | { type: "movie"; item: MediaItem }
    | { type: "tv"; item: MediaItem }
    | {
        type: "person";
        item: {
          id: string;
          name: string;
          knownForDepartment: string;
          profileUrl: string;
          knownForTitles: string[];
        };
      }
  >;
}> {
  if (!query || query.trim().length === 0) {
    return { page: 1, totalPages: 0, totalResults: 0, results: [] };
  }

  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbSearchMultiItem>>(
    TMDB_ENDPOINTS.searchMulti,
    {
      params: { query: query.trim(), page, include_adult: false },
      revalidate: false, // dynamic for search queries
    }
  );

  if (!data?.results) {
    return { page: 1, totalPages: 0, totalResults: 0, results: [] };
  }

  const results = data.results
    .map((raw) => {
      if (raw.media_type === "movie") {
        return {
          type: "movie" as const,
          item: transformMovieToMediaItem(raw as unknown as TmdbRawMovie),
        };
      }
      if (raw.media_type === "tv") {
        return {
          type: "tv" as const,
          item: transformTvToMediaItem(raw as unknown as TmdbRawTv),
        };
      }
      if (raw.media_type === "person") {
        const knownForTitles = (raw.known_for || [])
          .map((k) => (k as { title?: string; name?: string }).title || (k as { title?: string; name?: string }).name || "")
          .filter(Boolean)
          .slice(0, 3);

        const profileUrl = raw.profile_path
          ? `https://image.tmdb.org/t/p/w185${raw.profile_path}`
          : "/avatar-placeholder.svg";

        return {
          type: "person" as const,
          item: {
            id: String(raw.id),
            name: raw.name || "Artist",
            knownForDepartment: raw.known_for_department || "Acting",
            profileUrl,
            knownForTitles,
          },
        };
      }
      return null;
    })
    .filter(Boolean) as Array<
    | { type: "movie"; item: MediaItem }
    | { type: "tv"; item: MediaItem }
    | {
        type: "person";
        item: {
          id: string;
          name: string;
          knownForDepartment: string;
          profileUrl: string;
          knownForTitles: string[];
        };
      }
  >;

  return {
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results,
  };
}

/**
 * 15. Movie Genres
 */
export async function getMovieGenres(): Promise<TmdbGenre[]> {
  const data = await tmdbFetch<{ genres: TmdbGenre[] }>(
    TMDB_ENDPOINTS.movieGenres,
    { revalidate: 86400 } // cache 24h
  );
  return data?.genres || [];
}

/**
 * 16. TV Genres
 */
export async function getTvGenres(): Promise<TmdbGenre[]> {
  const data = await tmdbFetch<{ genres: TmdbGenre[] }>(
    TMDB_ENDPOINTS.tvGenres,
    { revalidate: 86400 } // cache 24h
  );
  return data?.genres || [];
}

/**
 * 17. Configuration Countries
 */
export async function getTmdbCountries(): Promise<TmdbCountry[]> {
  const data = await tmdbFetch<TmdbCountry[]>(
    TMDB_ENDPOINTS.configurationCountries,
    { revalidate: 86400 } // cache 24h
  );
  return data || [];
}
