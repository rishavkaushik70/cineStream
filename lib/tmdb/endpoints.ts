export const TMDB_ENDPOINTS = {
  // Trending
  trendingMovies: (timeWindow: "day" | "week" = "week") =>
    `/3/trending/movie/${timeWindow}`,
  trendingTv: (timeWindow: "day" | "week" = "week") =>
    `/3/trending/tv/${timeWindow}`,

  // Movies
  popularMovies: "/3/movie/popular",
  topRatedMovies: "/3/movie/top_rated",
  nowPlayingMovies: "/3/movie/now_playing",
  upcomingMovies: "/3/movie/upcoming",
  movieDetails: (id: string | number) =>
    `/3/movie/${id}?append_to_response=credits,videos,similar,recommendations`,

  // TV
  popularTv: "/3/tv/popular",
  topRatedTv: "/3/tv/top_rated",
  tvDetails: (id: string | number) =>
    `/3/tv/${id}?append_to_response=credits,videos,similar,recommendations`,

  // Person
  personDetails: (id: string | number) =>
    `/3/person/${id}?append_to_response=combined_credits,movie_credits,tv_credits`,

  // Discover
  discoverMovie: "/3/discover/movie",
  discoverTv: "/3/discover/tv",

  // Search
  searchMulti: "/3/search/multi",
  searchMovie: "/3/search/movie",
  searchTv: "/3/search/tv",
  searchPerson: "/3/search/person",

  // Genres & Config
  movieGenres: "/3/genre/movie/list",
  tvGenres: "/3/genre/tv/list",
  configurationCountries: "/3/configuration/countries",
} as const;

