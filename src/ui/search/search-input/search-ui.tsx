import ChevronDownIcon from "@/ui/assets/icons/chevron-down-Icon";
import { useTranslations } from "next-intl";
import clsx from "clsx";

interface SearchUIProps {
  className?: string;
  mediaType: string;
  placeHolder: string;
  currentQuery: string;
  onSearch: (term: string) => void;
  onMediaTypeChange: (mediaType: string) => void;
}

export default function SearchUi({
  className,
  mediaType,
  placeHolder,
  currentQuery,
  onSearch,
  onMediaTypeChange,
}: SearchUIProps) {
  const t = useTranslations("SearchPage");

  return (
    <div className={clsx("mt-2", className)}>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
        <input
          id="query"
          type="text"
          name="query"
          placeholder={placeHolder}
          aria-label={placeHolder}
          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          onChange={(e) => onSearch(e.target.value)}
          defaultValue={currentQuery}
        />
        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
          <select
            id="mediaType"
            name="mediaType"
            aria-label={t("media-type-select-label")}
            onChange={(e) => onMediaTypeChange(e.target.value)}
            defaultValue={mediaType}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="movie">{t("movies-option-text")}</option>
            <option value="tv">{t("tv-shows-option-text")}</option>
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
      </div>
    </div>
  );
}
