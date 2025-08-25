export type MediaType = "movie" | "tv";
export type DateString = string; // Format: YYYY-MM-DD (utile si le format n'est pas évident)

export interface BaseMediaItem {
  id: number;
  original_language?: string; // ISO 639-1 code (e.g., 'fr', 'en')
  overview?: string;
  poster_path?: string; // Combine with TMDB base_url
  backdrop_path?: string; // Combine with TMDB base_url
  popularity?: number;
  vote_average?: number; // Range: 0-10
  vote_count?: number;
  adult?: boolean;
  genre_ids?: number[];
}

export interface Movie extends BaseMediaItem {
  title: string;
  original_title?: string;
  release_date?: DateString;
  video?: boolean;
}

export interface TVShow extends BaseMediaItem {
  name: string;
  original_name?: string;
  first_air_date?: DateString;
  origin_country?: string[]; // ISO 3166-1 codes (e.g., 'US', 'FR')
}

/**
 * Type guard to check if a media item is a movie.
 * @returns `true` if the item has a `title` field (movies only).
 */
export function isMovie(media: Movie | TVShow): media is Movie {
  return "title" in media;
}

/**
 * Type guard to check if a media item is a TV show.
 * @returns `true` if the item has a `name` field (TV shows only).
 */
export function isTVShow(media: Movie | TVShow): media is TVShow {
  return "name" in media;
}
