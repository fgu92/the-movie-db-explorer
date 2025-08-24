/** Type pour le type de média */
export type MediaType = "movie" | "tv";

/** Type pour les dates au format YYYY-MM-DD */
export type DateString = string;

// =============================================
// Structures de données retournées par l'API
// =============================================

/** Interface de base partagée entre Movie et TVShow */
export interface BaseMediaItem {
  /** ID unique */
  id: number;
  /** Langue originale (code ISO 639-1) */
  original_language?: string;
  /** Résumé */
  overview?: string;
  /** Chemin vers l'affiche (à combiner avec base_url de la configuration) */
  poster_path?: string;
  /** Chemin vers l'image de fond (à combiner avec base_url de la configuration) */
  backdrop_path?: string;
  /** Score de popularité */
  popularity?: number;
  /** Note moyenne (0-10) */
  vote_average?: number;
  /** Nombre de votes */
  vote_count?: number;
  /** Contenu pour adultes */
  adult?: boolean;
  /** IDs des genres */
  genre_ids?: number[];
}

/** Structure d'un film retourné par l'API */
export interface Movie extends BaseMediaItem {
  /** Titre du film */
  title: string;
  /** Titre original du film */
  original_title?: string;
  /** Date de sortie principale (YYYY-MM-DD) */
  release_date?: DateString;
  /** Contient des vidéos */
  video?: boolean;
}

/** Structure d'une série TV retournée par l'API */
export interface TVShow extends BaseMediaItem {
  /** Nom de la série */
  name: string;
  /** Nom original de la série */
  original_name?: string;
  /** Date de première diffusion (YYYY-MM-DD) */
  first_air_date?: DateString;
  /** Pays d'origine */
  origin_country?: string[];
}

// =============================================
// Fonctions utilitaires de discrimination de type
// =============================================

/**
 * Vérifie si un média est un film
 * @param media Le média à vérifier
 * @returns true si le média est un film, false sinon
 */
export function isMovie(media: Movie | TVShow): media is Movie {
  return "title" in media;
}

/**
 * Vérifie si un média est une série TV
 * @param media Le média à vérifier
 * @returns true si le média est une série TV, false sinon
 */
export function isTVShow(media: Movie | TVShow): media is TVShow {
  return "name" in media;
}
