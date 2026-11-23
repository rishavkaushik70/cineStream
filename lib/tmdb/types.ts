import { MediaItem } from "../types/movie";

export type MediaType = "movie" | "tv" | "person";

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbCountry {
  iso_3166_1: string;
  english_name: string;
  native_name?: string;
}

export interface TmdbVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TmdbCastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department?: string;
  popularity?: number;
}

export interface TmdbCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TmdbProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TmdbProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TmdbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TmdbRawMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids?: number[];
  genres?: TmdbGenre[];
  runtime?: number | null;
  budget?: number;
  revenue?: number;
  status?: string;
  homepage?: string | null;
  imdb_id?: string | null;
  production_companies?: TmdbProductionCompany[];
  production_countries?: TmdbProductionCountry[];
  spoken_languages?: TmdbSpokenLanguage[];
  credits?: {
    cast?: TmdbCastMember[];
    crew?: TmdbCrewMember[];
  };
  videos?: {
    results?: TmdbVideo[];
  };
  similar?: {
    page: number;
    results: TmdbRawMovie[];
    total_pages: number;
    total_results: number;
  };
  recommendations?: {
    page: number;
    results: TmdbRawMovie[];
    total_pages: number;
    total_results: number;
  };
}

export interface TmdbRawTv {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  tagline?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string;
  last_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: TmdbGenre[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  status?: string;
  type?: string;
  homepage?: string | null;
  created_by?: Array<{ id: number; name: string; profile_path: string | null }>;
  production_companies?: TmdbProductionCompany[];
  production_countries?: TmdbProductionCountry[];
  credits?: {
    cast?: TmdbCastMember[];
    crew?: TmdbCrewMember[];
  };
  videos?: {
    results?: TmdbVideo[];
  };
  similar?: {
    page: number;
    results: TmdbRawTv[];
    total_pages: number;
    total_results: number;
  };
  recommendations?: {
    page: number;
    results: TmdbRawTv[];
    total_pages: number;
    total_results: number;
  };
}

export interface TmdbRawPerson {
  id: number;
  name: string;
  also_known_as?: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string | null;
  known_for_department: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  movie_credits?: {
    cast: Array<TmdbRawMovie & { character: string }>;
    crew: Array<TmdbRawMovie & { job: string; department: string }>;
  };
  tv_credits?: {
    cast: Array<TmdbRawTv & { character: string }>;
    crew: Array<TmdbRawTv & { job: string; department: string }>;
  };
  combined_credits?: {
    cast: Array<
      (TmdbRawMovie | TmdbRawTv) & {
        media_type: "movie" | "tv";
        character?: string;
      }
    >;
    crew: Array<
      (TmdbRawMovie | TmdbRawTv) & {
        media_type: "movie" | "tv";
        job?: string;
        department?: string;
      }
    >;
  };
}

export interface TmdbSearchMultiItem {
  id: number;
  media_type: "movie" | "tv" | "person";
  // Movie / TV
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  // Person
  profile_path?: string | null;
  known_for_department?: string;
  known_for?: Array<TmdbRawMovie | TmdbRawTv>;
}

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Normalized application models
export interface CastMemberModel {
  id: string;
  name: string;
  character: string;
  avatarUrl: string;
}

export interface CrewMemberModel {
  id: string;
  name: string;
  job: string;
  department?: string;
}

export interface MediaItemModel {
  id: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  mediaType: "movie" | "tv";
  releaseYear: number;
  releaseDate: string;
  rating: number;
  voteCount: number;
  genres: string[];
  runtime?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  seasons?: number;
  episodes?: number;
  director?: string;
  creator?: string;
  productionCompanies?: Array<{ id: number; name: string; logoUrl?: string }>;
  cast: CastMemberModel[];
  crew?: CrewMemberModel[];
  trailerUrl?: string;
  isTrending?: boolean;
  isTopRated?: boolean;
  isPopular?: boolean;
  isUpcoming?: boolean;
}

export interface PersonItemModel {
  id: string;
  name: string;
  biography: string;
  birthday?: string;
  placeOfBirth?: string;
  knownForDepartment: string;
  profileUrl: string;
  movieCredits: MediaItem[];
  tvCredits: MediaItem[];
}
