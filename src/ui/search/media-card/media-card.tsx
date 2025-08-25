import { PosterPlaceholder } from "@/ui/search/media-card/poster-placeholder";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface MediaCardProps {
  className?: string;
  title: string;
  year?: number;
  voteAverage?: number;
  voteCount?: number;
  posterPath?: string;
}

const loadingPlaceholderPoster =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+";

export default function MediaCard({
  className,
  title,
  year,
  voteAverage,
  voteCount,
  posterPath,
}: MediaCardProps) {
  const t = useTranslations("SearchPage");
  const vote =
    voteAverage && voteCount
      ? t("votes", {
          voteAverage: Math.round(voteAverage * 10) / 10,
          count: voteCount,
        })
      : "";

  return (
    <div
      className={clsx(
        "h-full w-full text-center text-sm font-medium",
        className,
      )}
    >
      {posterPath ? (
        <Image
          src={posterPath}
          alt={title}
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={loadingPlaceholderPoster}
          className="rounded-sm"
        />
      ) : (
        <PosterPlaceholder title={title} />
      )}
      <div className="mt-2">
        <span className="text-base text-gray-700">{year}</span>
        <span className="ml-2 text-gray-500">{vote}</span>
      </div>
    </div>
  );
}
