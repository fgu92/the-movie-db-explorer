// Types pour l'API TMDB Discover & Search (Movies & TV Shows)
// URLs de base :
// - https://api.themoviedb.org/3/discover/{movie|tv}
// - https://api.themoviedb.org/3/search/{movie|tv}

// =============================================
// Types utilitaires et de base
// =============================================

import { DateString, Movie, TVShow } from "./tmdb-media";

/** Type pour les IDs séparés par des virgules ou des pipes */
type CommaOrPipeSeparatedIds = string;

/** Types pour les statuts de séries TV */
export type TVStatus =
  | "0" // Returning Series
  | "1" // Planned
  | "2" // In Production
  | "3" // Ended
  | "4" // Cancelled
  | "5"; // Pilot

/** Types pour les catégories de séries TV */
export type TVType =
  | "0" // Documentary
  | "1" // News
  | "2" // Miniseries
  | "3" // Reality
  | "4" // Scripted
  | "5" // Talk Show
  | "6"; // Video

/** Types de monétisation des fournisseurs de visionnage */
export type WatchMonetizationType =
  | "flatrate"
  | "free"
  | "ads"
  | "rent"
  | "buy";

// =============================================
// Types de tri
// =============================================

/** Options de tri communes à tous les médias */
export type SortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | "original_title.asc"
  | "original_title.desc";

/** Options de tri spécifiques aux films */
export type MovieSortBy =
  | SortBy
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc";

/** Options de tri spécifiques aux séries TV */
export type TVSortBy = SortBy | "first_air_date.asc" | "first_air_date.desc";

// =============================================
// Paramètres de requête
// =============================================

/** Paramètres de base pour la recherche */
export interface BaseSearchParams {
  /** Clé API TMDB */
  api_key?: string;
  /** Terme de recherche (requis) */
  query: string;
  /** Langue pour les métadonnées (ex: 'fr-FR', 'en-US') */
  language?: string;
  /** Code de région ISO 3166-1 (ex: 'US', 'FR') */
  region?: string;
  /** Numéro de page (minimum 1, maximum 1000) */
  page?: number;
  /** Inclure les contenus pour adultes */
  include_adult?: boolean;
}

/** Paramètres de base pour la découverte de médias */
export interface BaseDiscoverParams {
  /** Clé API TMDB */
  api_key?: string;
  /** Langue pour les métadonnées (ex: 'fr-FR', 'en-US') */
  language?: string;
  /** Code de région ISO 3166-1 (ex: 'US', 'FR') */
  region?: string;
  /** Numéro de page (minimum 1, maximum 1000) */
  page?: number;
  /** Inclure les contenus pour adultes */
  include_adult?: boolean;
  /** Note moyenne minimum (0-10) */
  "vote_average.gte"?: number;
  /** Note moyenne maximum (0-10) */
  "vote_average.lte"?: number;
  /** Nombre de votes minimum */
  "vote_count.gte"?: number;
  /** Nombre de votes maximum */
  "vote_count.lte"?: number;
  /** Genres inclus (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_genres?: CommaOrPipeSeparatedIds;
  /** Genres exclus (IDs séparés par des virgules) */
  without_genres?: CommaOrPipeSeparatedIds;
  /** Mots-clés inclus (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_keywords?: CommaOrPipeSeparatedIds;
  /** Mots-clés exclus (IDs séparés par des virgules) */
  without_keywords?: CommaOrPipeSeparatedIds;
  /** Compagnies de production (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_companies?: CommaOrPipeSeparatedIds;
  /** Compagnies exclues (IDs séparés par des virgules) */
  without_companies?: CommaOrPipeSeparatedIds;
  /** Personnes dans le casting ou l'équipe (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_people?: CommaOrPipeSeparatedIds;
  /** Personnes dans le casting (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_cast?: CommaOrPipeSeparatedIds;
  /** Personnes dans l'équipe (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_crew?: CommaOrPipeSeparatedIds;
  /** Durée minimum en minutes */
  "with_runtime.gte"?: number;
  /** Durée maximum en minutes */
  "with_runtime.lte"?: number;
  /** Pays d'origine (codes ISO 3166-1, séparés par des virgules) */
  with_origin_country?: CommaOrPipeSeparatedIds;
  /** Langue originale (codes ISO 639-1) */
  with_original_language?: string;
  /** Fournisseurs de visionnage (Watch Providers) */
  with_watch_providers?: CommaOrPipeSeparatedIds;
  /** Région des fournisseurs de visionnage */
  watch_region?: string;
  /** Types de monétisation des fournisseurs de visionnage */
  with_watch_monetization_types?: WatchMonetizationType;
}

/** Paramètres spécifiques à la découverte de films */
export interface DiscoverMovieParams extends BaseDiscoverParams {
  /** Critère de tri spécifique aux films */
  sort_by?: MovieSortBy;
  /** Inclure les vidéos */
  include_video?: boolean;
  /** Année de sortie principale */
  primary_release_year?: number;
  /** Date de sortie principale (>=) au format YYYY-MM-DD */
  "primary_release_date.gte"?: DateString;
  /** Date de sortie principale (<=) au format YYYY-MM-DD */
  "primary_release_date.lte"?: DateString;
  /** Année de sortie */
  year?: number;
  /** Date de sortie (>=) au format YYYY-MM-DD */
  "release_date.gte"?: DateString;
  /** Date de sortie (<=) au format YYYY-MM-DD */
  "release_date.lte"?: DateString;
  /** Types de sortie (1=Premiere, 2=Theatrical (limited), 3=Theatrical, 4=Digital, 5=Physical, 6=TV) */
  with_release_type?: string;
  /** Certifications de contenu (ex: 'US:G,US:PG', 'FR:U') */
  certification?: string;
  /** Pays de certification (code ISO 3166-1) */
  certification_country?: string;
  /** Certification inférieure ou égale à */
  "certification.lte"?: string;
  /** Certification supérieure ou égale à */
  "certification.gte"?: string;
  /** Revenus minimum */
  "revenue.gte"?: number;
  /** Revenus maximum */
  "revenue.lte"?: number;
}

/** Paramètres spécifiques à la découverte de séries TV */
export interface DiscoverTVParams extends BaseDiscoverParams {
  /** Critère de tri spécifique aux séries TV */
  sort_by?: TVSortBy;
  /** Date de première diffusion (>=) au format YYYY-MM-DD */
  "first_air_date.gte"?: DateString;
  /** Date de première diffusion (<=) au format YYYY-MM-DD */
  "first_air_date.lte"?: DateString;
  /** Année de première diffusion */
  first_air_date_year?: number;
  /** Date de dernière diffusion (>=) au format YYYY-MM-DD */
  "air_date.gte"?: DateString;
  /** Date de dernière diffusion (<=) au format YYYY-MM-DD */
  "air_date.lte"?: DateString;
  /** Statut de diffusion */
  with_status?: TVStatus;
  /** Type de série */
  with_type?: TVType;
  /** Réseaux de diffusion (IDs séparés par des virgules pour AND, par des pipes pour OR) */
  with_networks?: CommaOrPipeSeparatedIds;
  /** Réseaux de diffusion exclus (IDs séparés par des virgules) */
  without_networks?: CommaOrPipeSeparatedIds;
  /** Timezone pour les dates de diffusion */
  timezone?: string;
  /** Inclure les séries avec épisodes nulls */
  include_null_first_air_dates?: boolean;
  /** Nombre minimum d'épisodes */
  "with_episode_count.gte"?: number;
  /** Nombre maximum d'épisodes */
  "with_episode_count.lte"?: number;
}

/** Paramètres spécifiques à la recherche de films */
export interface SearchMovieParams extends BaseSearchParams {
  /** Année de sortie principale */
  primary_release_year?: number;
  /** Année de sortie */
  year?: string;
}

/** Paramètres spécifiques à la recherche de séries TV */
export interface SearchTVParams extends BaseSearchParams {
  /** Année de première diffusion */
  first_air_date_year?: number;
}

// =============================================
// Réponses de l'API
// =============================================

/** Réponse générique pour les APIs Discover et Search */
export interface BaseDiscoverResponse<T> {
  /** Numéro de page actuelle */
  page: number;
  /** Nombre total de résultats */
  total_results: number;
  /** Nombre total de pages */
  total_pages: number;
  /** Liste des résultats */
  results: T[];
}

/** Réponse de l'API Discover Movie */
export type DiscoverMovieResponse = BaseDiscoverResponse<Movie>;

/** Réponse de l'API Discover TV */
export type DiscoverTVResponse = BaseDiscoverResponse<TVShow>;

/** Réponse de l'API Search Movie */
export type SearchMovieResponse = BaseDiscoverResponse<Movie>;

/** Réponse de l'API Search TV */
export type SearchTVResponse = BaseDiscoverResponse<TVShow>;

// =============================================
// Types pour les genres
// =============================================

/** Structure d'un genre */
export interface Genre {
  /** ID du genre */
  id: number;
  /** Nom du genre */
  name: string;
}

/** Réponse de l'API des genres */
export interface GenresResponse {
  genres: Genre[];
}

// =============================================
// Types pour les erreurs de l'API
// =============================================

/** Structure d'erreur retournée par l'API TMDB */
export interface TMDBError {
  /** Statut de l'erreur */
  status_code: number;
  /** Message d'erreur */
  status_message: string;
  /** Succès de la requête */
  success: boolean;
}
