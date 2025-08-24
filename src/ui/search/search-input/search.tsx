"use client";

import SearchUi from "@/ui/search/search-input/search-ui";
import { useSearch } from "@/ui/search/search-input/seach-hooks";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const {
    mediaType,
    placeHolder,
    currentQuery,
    handleSearch,
    handleMediaTypeChange,
  } = useSearch();

  return (
    <SearchUi
      className={className}
      mediaType={mediaType}
      placeHolder={placeHolder}
      currentQuery={currentQuery}
      onSearch={handleSearch}
      onMediaTypeChange={handleMediaTypeChange}
    />
  );
}
