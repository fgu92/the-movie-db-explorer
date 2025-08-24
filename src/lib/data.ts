import {
  DiscoverMovieParams,
  DiscoverMovieResponse,
  DiscoverTVParams,
  DiscoverTVResponse,
  SearchMovieParams,
  SearchMovieResponse,
  SearchTVParams,
  SearchTVResponse,
} from "./types/tmdb-api";
import { MediaType } from "./types/tmdb-media";

// Custom error class
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

// Configuration avec validation
const config = {
  apiKey: process.env.TMDB_API_KEY, // <-- Ici, c'est TMDB_API_KEY
  baseUrl: process.env.TMDB_BASE_URL,
  language: process.env.TMDB_LANGUAGE || "fr-FR",
  voteCountGte: Number(process.env.TMDB_VOTE_COUNT_GTE) || 100,
};

// Mettre à jour la liste des variables requises
const requiredEnvVars = ["TMDB_API_KEY", "TMDB_BASE_URL"] as const; // <-- Noms réels
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    // <-- Vérifie directement dans process.env
    throw new Error(`${key} environment variable is required`);
  }
}

// Type union pour les réponses
export type TMDBResponse =
  | SearchMovieResponse
  | SearchTVResponse
  | DiscoverMovieResponse
  | DiscoverTVResponse;

/**
 * Construit les paramètres URL à partir d'un objet de paramètres TMDB
 */
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
 * Overloads pour garantir la correspondance type/endpoint
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

/**
 * Implémentation de la fonction générique pour les appels à l'API TMDB
 */
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

/**
 * Construit les paramètres communs pour Search
 */
function buildBaseSearchParams(query: string, currentPage: number) {
  return {
    api_key: config.apiKey,
    language: config.language,
    query,
    page: currentPage,
  };
}

/**
 * Recherche de films
 */
async function searchMovies(
  query: string,
  currentPage: number,
): Promise<SearchMovieResponse> {
  const parameters: SearchMovieParams = {
    ...buildBaseSearchParams(query, currentPage),
  };

  return fetchTMDB("/search/movie", parameters);
}

/**
 * Recherche de séries TV
 */
async function searchTVShows(
  query: string,
  currentPage: number,
): Promise<SearchTVResponse> {
  const parameters: SearchTVParams = {
    ...buildBaseSearchParams(query, currentPage),
  };

  return fetchTMDB("/search/tv", parameters);
}

/**
 * Construit les paramètres communs pour Discover
 */
function buildBaseDiscoverParams(currentPage: number) {
  return {
    api_key: config.apiKey,
    language: config.language,
    sort_by: "popularity.desc" as const,
    page: currentPage,
    "vote_count.gte": config.voteCountGte,
  };
}

/**
 * Découverte de films populaires
 */
async function discoverMovies(
  currentPage: number,
): Promise<DiscoverMovieResponse> {
  const parameters: DiscoverMovieParams = {
    ...buildBaseDiscoverParams(currentPage),
  };

  return fetchTMDB("/discover/movie", parameters);
}

/**
 * Découverte de séries TV populaires
 */
async function discoverTVShows(
  currentPage: number,
): Promise<DiscoverTVResponse> {
  const parameters: DiscoverTVParams = {
    ...buildBaseDiscoverParams(currentPage),
  };

  return fetchTMDB("/discover/tv", parameters);
}

/**
 * Fonction principale pour rechercher ou découvrir des médias
 */
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
