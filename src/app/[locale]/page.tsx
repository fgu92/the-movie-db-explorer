import { searchMedia } from "@/lib/data";
import { MediaType } from "@/lib/types/tmdb-media";
import MediaList from "@/ui/search/media-list/media-list";
import { getTranslations } from "next-intl/server";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    mediaType?: MediaType;
  }>;
}) {
  const t = await getTranslations("SearchPage");
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);
  const mediaType = (
    searchParams?.mediaType === "tv" ? "tv" : "movie"
  ) as MediaType;

  const response = await searchMedia(query, currentPage, mediaType);

  const hasResults = response.results && response.results.length > 0;

  return (
    <main className="flex flex-col gap-8 pt-8 pb-8 items-center">
      {hasResults ? (
        <MediaList results={response.results} />
      ) : (
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="text-6xl">🎬</div>
          <h2 className="text-2xl font-semibold text-gray-700">
            {t("no-results")}
          </h2>
        </div>
      )}
    </main>
  );
}
