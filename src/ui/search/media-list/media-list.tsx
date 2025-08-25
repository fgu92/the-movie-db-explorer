import { isMovie, Movie, TVShow } from "@/lib/types/tmdb-media";
import { getYearFromDateString } from "@/lib/utils";
import MediaCard from "@/ui/search/media-card/media-card";
import clsx from "clsx";

interface MediaListProps {
  results: Movie[] | TVShow[];
  className?: string;
}

export default async function MediaList({
  results,
  className,
}: MediaListProps) {
  const imageBaseUrl = process.env.TMDB_IMAGES_BASE_URL || "";
  return (
    <div
      className={clsx(
        "grid grid-cols-2 items-center justify-items-center gap-4 xl:grid-cols-5",
        className,
      )}
    >
      {results.map((media) => {
        let title;
        let year: number | undefined;
        if (isMovie(media)) {
          title = media.title;
          year = getYearFromDateString(media.release_date);
        } else {
          title = media.name;
          year = getYearFromDateString(media.first_air_date);
        }
        return (
          <MediaCard
            key={media.id}
            year={year}
            title={title}
            voteAverage={media.vote_average}
            voteCount={media.vote_count}
            posterPath={
              media.poster_path &&
              `${imageBaseUrl}/w300_and_h450_face${media.poster_path}`
            }
          />
        );
      })}
    </div>
  );
}
