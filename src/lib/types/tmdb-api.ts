import { DateString, Movie, TVShow } from "./tmdb-media";

type CommaOrPipeSeparatedIds = string;

export type TVStatus =
  | "0" // Returning Series
  | "1" // Planned
  | "2" // In Production
  | "3" // Ended
  | "4" // Cancelled
  | "5"; // Pilot

export type TVType =
  | "0" // Documentary
  | "1" // News
  | "2" // Miniseries
  | "3" // Reality
  | "4" // Scripted
  | "5" // Talk Show
  | "6"; // Video

export type WatchMonetizationType =
  | "flatrate" // Subscription
  | "free" // Free with ads
  | "ads" // Ad-supported
  | "rent" // Rentable
  | "buy"; // Purchase

// =============================================
// Sort types
// =============================================
export type SortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | "original_title.asc"
  | "original_title.desc";

export type MovieSortBy =
  | SortBy
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc";

export type TVSortBy = SortBy | "first_air_date.asc" | "first_air_date.desc";

// =============================================
// Query parameters
// =============================================
export interface BaseSearchParams {
  api_key?: string;
  query: string; // Required search term
  language?: string; // ISO 639-1 language code (e.g., 'fr-FR')
  region?: string; // ISO 3166-1 region code (e.g., 'US')
  page?: number; // 1-1000
  include_adult?: boolean;
}

export interface BaseDiscoverParams {
  api_key?: string;
  language?: string; // ISO 639-1 language code
  region?: string; // ISO 3166-1 region code
  page?: number; // 1-1000
  include_adult?: boolean;
  "vote_average.gte"?: number; // Minimum rating (0-10)
  "vote_average.lte"?: number; // Maximum rating (0-10)
  "vote_count.gte"?: number; // Minimum vote count
  "vote_count.lte"?: number; // Maximum vote count
  with_genres?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  without_genres?: CommaOrPipeSeparatedIds; // Comma-separated
  with_keywords?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  without_keywords?: CommaOrPipeSeparatedIds; // Comma-separated
  with_companies?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  without_companies?: CommaOrPipeSeparatedIds; // Comma-separated
  with_people?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  with_cast?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  with_crew?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  "with_runtime.gte"?: number; // Minimum runtime in minutes
  "with_runtime.lte"?: number; // Maximum runtime in minutes
  with_origin_country?: CommaOrPipeSeparatedIds; // ISO 3166-1 codes
  with_original_language?: string; // ISO 639-1 code
  with_watch_providers?: CommaOrPipeSeparatedIds;
  watch_region?: string; // ISO 3166-1 region code
  with_watch_monetization_types?: WatchMonetizationType;
}

export interface DiscoverMovieParams extends BaseDiscoverParams {
  sort_by?: MovieSortBy;
  include_video?: boolean;
  primary_release_year?: number;
  "primary_release_date.gte"?: DateString; // YYYY-MM-DD
  "primary_release_date.lte"?: DateString; // YYYY-MM-DD
  year?: number;
  "release_date.gte"?: DateString; // YYYY-MM-DD
  "release_date.lte"?: DateString; // YYYY-MM-DD
  with_release_type?: string; // 1=Premiere, 2=Theatrical (limited), 3=Theatrical, 4=Digital, 5=Physical, 6=TV
  certification?: string; // e.g., 'US:G,US:PG'
  certification_country?: string; // ISO 3166-1 code
  "certification.lte"?: string;
  "certification.gte"?: string;
  "revenue.gte"?: number; // Minimum revenue
  "revenue.lte"?: number; // Maximum revenue
}

export interface DiscoverTVParams extends BaseDiscoverParams {
  sort_by?: TVSortBy;
  "first_air_date.gte"?: DateString; // YYYY-MM-DD
  "first_air_date.lte"?: DateString; // YYYY-MM-DD
  first_air_date_year?: number;
  "air_date.gte"?: DateString; // YYYY-MM-DD
  "air_date.lte"?: DateString; // YYYY-MM-DD
  with_status?: TVStatus;
  with_type?: TVType;
  with_networks?: CommaOrPipeSeparatedIds; // Comma for AND, pipe for OR
  without_networks?: CommaOrPipeSeparatedIds; // Comma-separated
  timezone?: string; // e.g., 'America/New_York'
  include_null_first_air_dates?: boolean;
  "with_episode_count.gte"?: number; // Minimum episode count
  "with_episode_count.lte"?: number; // Maximum episode count
}

export interface SearchMovieParams extends BaseSearchParams {
  primary_release_year?: number;
  year?: string; // Release year
}

export interface SearchTVParams extends BaseSearchParams {
  first_air_date_year?: number; // First air date year
}

// =============================================
// API responses
// =============================================
export interface BaseDiscoverResponse<T> {
  page: number;
  total_results: number;
  total_pages: number;
  results: T[];
}

export type DiscoverMovieResponse = BaseDiscoverResponse<Movie>;
export type DiscoverTVResponse = BaseDiscoverResponse<TVShow>;
export type SearchMovieResponse = BaseDiscoverResponse<Movie>;
export type SearchTVResponse = BaseDiscoverResponse<TVShow>;
