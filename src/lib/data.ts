import {
  DiscoverMovieParams,
  DiscoverMovieResponse,
  DiscoverTVParams,
  DiscoverTVResponse,
  SearchMovieParams,
  SearchMovieResponse,
  SearchTVParams,
  SearchTVResponse,
} from "@/lib/types/tmdb-api";
import { MediaType } from "@/lib/types/tmdb-media";

class TMDBApiError extends Error {
  constructor(
    public status: number,
    public endpoint: string,
    message: string,
  ) {
    super(`TMDB API Error (${status}) on ${endpoint}: ${message}`);
    this.name = "TMDBApiError";
  }
}

const config = {
  apiKey: process.env.TMDB_API_KEY,
  baseUrl: process.env.TMDB_BASE_URL,
  language: process.env.TMDB_LANGUAGE || "fr-FR",
  voteCountGte: Number(process.env.TMDB_VOTE_COUNT_GTE) || 100,
};

const requiredEnvVars = [
  "TMDB_API_KEY",
  "TMDB_BASE_URL",
  "TMDB_IMAGES_BASE_URL",
] as const;
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`${key} environment variable is required`);
  }
}

export type TMDBResponse =
  | SearchMovieResponse
  | SearchTVResponse
  | DiscoverMovieResponse
  | DiscoverTVResponse;

function buildUrlParams(
  parameters:
    | SearchMovieParams
    | SearchTVParams
    | DiscoverMovieParams
    | DiscoverTVParams,
): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params;
}

/**
 * Overloads to ensure type/endpoint matching
 */
async function fetchTMDB(
  endpoint: "/search/movie",
  parameters: SearchMovieParams,
): Promise<SearchMovieResponse>;
async function fetchTMDB(
  endpoint: "/search/tv",
  parameters: SearchTVParams,
): Promise<SearchTVResponse>;
async function fetchTMDB(
  endpoint: "/discover/movie",
  parameters: DiscoverMovieParams,
): Promise<DiscoverMovieResponse>;
async function fetchTMDB(
  endpoint: "/discover/tv",
  parameters: DiscoverTVParams,
): Promise<DiscoverTVResponse>;

async function fetchTMDB<T>(
  endpoint: string,
  parameters:
    | SearchMovieParams
    | SearchTVParams
    | DiscoverMovieParams
    | DiscoverTVParams,
): Promise<T> {
  const urlParams = buildUrlParams(parameters);
  const url = `${config.baseUrl}${endpoint}?${urlParams.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new TMDBApiError(
        response.status,
        endpoint,
        `HTTP ${response.status}: ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TMDBApiError) {
      throw error;
    }
    throw new TMDBApiError(0, endpoint, `Network error: ${error}`);
  }
}

function buildBaseSearchParams(query: string, currentPage: number) {
  return {
    api_key: config.apiKey,
    language: config.language,
    query,
    page: currentPage,
  };
}

async function searchMovies(
  query: string,
  currentPage: number,
): Promise<SearchMovieResponse> {
  const parameters: SearchMovieParams = {
    ...buildBaseSearchParams(query, currentPage),
  };
  return fetchTMDB("/search/movie", parameters);
}

async function searchTVShows(
  query: string,
  currentPage: number,
): Promise<SearchTVResponse> {
  const parameters: SearchTVParams = {
    ...buildBaseSearchParams(query, currentPage),
  };
  return fetchTMDB("/search/tv", parameters);
}

function buildBaseDiscoverParams(currentPage: number) {
  return {
    api_key: config.apiKey,
    language: config.language,
    sort_by: "popularity.desc" as const,
    page: currentPage,
    "vote_count.gte": config.voteCountGte,
  };
}

async function discoverMovies(
  currentPage: number,
): Promise<DiscoverMovieResponse> {
  const parameters: DiscoverMovieParams = {
    ...buildBaseDiscoverParams(currentPage),
  };
  return fetchTMDB("/discover/movie", parameters);
}

async function discoverTVShows(
  currentPage: number,
): Promise<DiscoverTVResponse> {
  const parameters: DiscoverTVParams = {
    ...buildBaseDiscoverParams(currentPage),
  };
  return fetchTMDB("/discover/tv", parameters);
}

export async function searchMedia(
  query: string,
  currentPage: number,
  mediaType: MediaType,
): Promise<TMDBResponse> {
  try {
    const hasQuery = query.trim().length > 0;
    if (mediaType === "movie") {
      return hasQuery
        ? await searchMovies(query, currentPage)
        : await discoverMovies(currentPage);
    }
    return hasQuery
      ? await searchTVShows(query, currentPage)
      : await discoverTVShows(currentPage);
  } catch (error) {
    const action = query.trim() ? "searching" : "discovering";
    throw new Error(
      `Failed to ${action} ${mediaType}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
