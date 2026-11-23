import {
  TmdbRawMovie,
  TmdbRawTv,
  TmdbRawPerson,
  TmdbVideo,
  CastMemberModel,
  CrewMemberModel,
  PersonItemModel,
} from "./types";
import { MediaItem } from "../types/movie";
import { getBackdropUrl, getPosterUrl, getProfileUrl } from "./images";

export const DEFAULT_GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

/**
 * Intelligently select the best official YouTube trailer preview
 */
export function extractBestTrailerUrl(videos?: { results?: TmdbVideo[] }): string | undefined {
  if (!videos?.results || videos.results.length === 0) return undefined;

  const ytVideos = videos.results.filter(
    (v) => v.site === "YouTube" && Boolean(v.key)
  );

  if (ytVideos.length === 0) return undefined;

  // 1. Prefer Official Trailer
  const officialTrailer = ytVideos.find((v) => v.type === "Trailer" && v.official);
  if (officialTrailer) return `https://www.youtube.com/embed/${officialTrailer.key}`;

  // 2. Any Trailer
  const anyTrailer = ytVideos.find((v) => v.type === "Trailer");
  if (anyTrailer) return `https://www.youtube.com/embed/${anyTrailer.key}`;

  // 3. Official Teaser
  const officialTeaser = ytVideos.find((v) => v.type === "Teaser" && v.official);
  if (officialTeaser) return `https://www.youtube.com/embed/${officialTeaser.key}`;

  // 4. Any Teaser or Clip
  const teaserOrClip = ytVideos.find((v) => v.type === "Teaser" || v.type === "Clip");
  if (teaserOrClip) return `https://www.youtube.com/embed/${teaserOrClip.key}`;

  // Fallback to first video
  return `https://www.youtube.com/embed/${ytVideos[0].key}`;
}

/**
 * Format runtime in minutes to '2h 15m'
 */
export function formatRuntime(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Format raw TMDB movie into CineStream MediaItem
 */
export function transformMovieToMediaItem(
  movie: TmdbRawMovie,
  extra?: { isTrending?: boolean; isPopular?: boolean; isTopRated?: boolean; isUpcoming?: boolean }
): MediaItem {
  const releaseDate = movie.release_date || "";
  const releaseYear = releaseDate ? parseInt(releaseDate.slice(0, 4), 10) || 2025 : 2025;

  let genres: string[] = [];
  if (movie.genres && movie.genres.length > 0) {
    genres = movie.genres.map((g) => g.name);
  } else if (movie.genre_ids && movie.genre_ids.length > 0) {
    genres = movie.genre_ids.map((id) => DEFAULT_GENRE_MAP[id] || "Cinema");
  }
  if (genres.length === 0) genres = ["Movie"];

  const cast: CastMemberModel[] = (movie.credits?.cast || []).slice(0, 12).map((c) => ({
    id: String(c.id),
    name: c.name,
    character: c.character || "Cast",
    avatarUrl: getProfileUrl(c.profile_path, "medium"),
  }));

  const crew: CrewMemberModel[] = (movie.credits?.crew || []).slice(0, 8).map((cr) => ({
    id: String(cr.id),
    name: cr.name,
    job: cr.job,
  }));

  const director = movie.credits?.crew?.find((c) => c.job === "Director")?.name;

  return {
    id: String(movie.id),
    title: movie.title || movie.original_title || "Untitled",
    originalTitle: movie.original_title,
    tagline: movie.tagline || "",
    overview:
      movie.overview || "An engaging cinematic presentation on CineStream.",
    backdropUrl: getBackdropUrl(movie.backdrop_path, "large"),
    posterUrl: getPosterUrl(movie.poster_path, "large"),
    mediaType: "movie",
    releaseYear,
    releaseDate: releaseDate || "TBA",
    rating: Number((movie.vote_average || 0).toFixed(1)),
    voteCount: movie.vote_count || 0,
    genres,
    runtime: formatRuntime(movie.runtime) || "2h 00m",
    director,
    status: movie.status || "Released",
    cast,
    crew,
    trailerUrl: extractBestTrailerUrl(movie.videos),
    isTrending: extra?.isTrending ?? false,
    isPopular: extra?.isPopular ?? false,
    isTopRated: extra?.isTopRated ?? false,
    isUpcoming: extra?.isUpcoming ?? false,
  };
}

/**
 * Format raw TMDB TV show into CineStream MediaItem
 */
export function transformTvToMediaItem(
  tv: TmdbRawTv,
  extra?: { isTrending?: boolean; isPopular?: boolean; isTopRated?: boolean }
): MediaItem {
  const releaseDate = tv.first_air_date || "";
  const releaseYear = releaseDate ? parseInt(releaseDate.slice(0, 4), 10) || 2025 : 2025;

  let genres: string[] = [];
  if (tv.genres && tv.genres.length > 0) {
    genres = tv.genres.map((g) => g.name);
  } else if (tv.genre_ids && tv.genre_ids.length > 0) {
    genres = tv.genre_ids.map((id) => DEFAULT_GENRE_MAP[id] || "Series");
  }
  if (genres.length === 0) genres = ["TV Series"];

  const cast: CastMemberModel[] = (tv.credits?.cast || []).slice(0, 12).map((c) => ({
    id: String(c.id),
    name: c.name,
    character: c.character || "Series Cast",
    avatarUrl: getProfileUrl(c.profile_path, "medium"),
  }));

  const crew: CrewMemberModel[] = (tv.credits?.crew || []).slice(0, 8).map((cr) => ({
    id: String(cr.id),
    name: cr.name,
    job: cr.job,
  }));

  const creator = tv.created_by?.[0]?.name;

  const avgRunTime = tv.episode_run_time?.[0];
  const runtimeStr = avgRunTime ? `${avgRunTime}m / ep` : "45m / ep";

  return {
    id: String(tv.id),
    title: tv.name || tv.original_name || "Untitled",
    originalTitle: tv.original_name,
    tagline: tv.tagline || "",
    overview:
      tv.overview || "An engaging episodic television series on CineStream.",
    backdropUrl: getBackdropUrl(tv.backdrop_path, "large"),
    posterUrl: getPosterUrl(tv.poster_path, "large"),
    mediaType: "tv",
    releaseYear,
    releaseDate: releaseDate || "TBA",
    rating: Number((tv.vote_average || 0).toFixed(1)),
    voteCount: tv.vote_count || 0,
    genres,
    runtime: runtimeStr,
    seasons: tv.number_of_seasons,
    episodes: tv.number_of_episodes,
    director: creator,
    status: tv.status || "Ongoing",
    cast,
    crew,
    trailerUrl: extractBestTrailerUrl(tv.videos),
    isTrending: extra?.isTrending ?? false,
    isPopular: extra?.isPopular ?? false,
    isTopRated: extra?.isTopRated ?? false,
  };
}

/**
 * Format raw TMDB person into PersonItemModel
 */
export function transformPersonToPersonItem(person: TmdbRawPerson): PersonItemModel {
  const movieCredits = (person.movie_credits?.cast || [])
    .filter((m) => Boolean(m.poster_path))
    .slice(0, 12)
    .map((m) => transformMovieToMediaItem(m));

  const tvCredits = (person.tv_credits?.cast || [])
    .filter((t) => Boolean(t.poster_path))
    .slice(0, 12)
    .map((t) => transformTvToMediaItem(t));

  return {
    id: String(person.id),
    name: person.name,
    biography: person.biography || "Biography not currently available for this artist.",
    birthday: person.birthday || undefined,
    placeOfBirth: person.place_of_birth || undefined,
    knownForDepartment: person.known_for_department || "Acting",
    profileUrl: getProfileUrl(person.profile_path, "large"),
    movieCredits,
    tvCredits,
  };
}

