"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useMemo } from "react";

const PLACEHOLDER_BY_MEDIA_TYPE: Record<string, string> = {
  movie: "movies-placeholder",
  tv: "tv-shows-placeholder",
};

interface UseSearchReturn {
  mediaType: string;
  placeHolder: string;
  currentQuery: string;
  handleSearch: (query: string) => void;
  handleMediaTypeChange: (mediaType: string) => void;
}

export function useSearch(): UseSearchReturn {
  const t = useTranslations("SearchPage");
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );
  const mediaType = params.get("mediaType") || "movie";
  const pathname = usePathname();
  const { replace } = useRouter();

  const placeHolder = t(PLACEHOLDER_BY_MEDIA_TYPE[mediaType]);
  const currentQuery = searchParams.get("query")?.toString() || "";

  const handleSearch = useDebouncedCallback((targetQuery: string) => {
    params.set("page", "1");
    params.set("query", targetQuery);
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleMediaTypeChange = useCallback(
    (targetMediaType: string): void => {
      if (!PLACEHOLDER_BY_MEDIA_TYPE[targetMediaType]) {
        return;
      }
      params.set("page", "1");
      params.set("mediaType", targetMediaType);
      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  return {
    mediaType,
    placeHolder,
    currentQuery,
    handleSearch,
    handleMediaTypeChange,
  };
}
