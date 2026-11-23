export type MediaType = "movie" | "tv";

export interface CastMember {
  id: string;
  name: string;
  character: string;
  avatarUrl: string;
}

export interface CrewMember {
  id: string;
  name: string;
  job: string;
  department?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  mediaType: MediaType;
  releaseYear: number;
  releaseDate: string;
  rating: number;
  voteCount: number;
  genres: string[];
  runtime: string;
  certification?: string;
  director?: string;
  creator?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  seasons?: number;
  episodes?: number;
  productionCompanies?: Array<{ id: number; name: string; logoUrl?: string }>;
  cast: CastMember[];
  crew?: CrewMember[];
  trailerUrl?: string;
  isTrending?: boolean;
  isTopRated?: boolean;
  isPopular?: boolean;
  isUpcoming?: boolean;
  isFeatured?: boolean;
  country?: string;
}

export interface GenreItem {
  id: string;
  name: string;
  slug: string;
  movieCount: number;
  description: string;
  accentColor?: string;
}

export interface SearchFilters {
  query?: string;
  genre?: string;
  mediaType?: "all" | MediaType;
  year?: number | "all";
  minRating?: number;
  sortBy?: "popularity" | "rating" | "releaseDate" | "title";
}
