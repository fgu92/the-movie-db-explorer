import { useSearch } from "@/ui/search/search-input/seach-hooks";
import { act, renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

// Mock the Next.js and next-intl hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));
vi.mock("next-intl", () => ({
  useTranslations: vi.fn(),
}));
vi.mock("use-debounce", () => ({
  useDebouncedCallback: vi.fn((fn) => fn),
}));

// Helper to mock the router
const mockReplace = vi.fn();
const mockUseRouter = useRouter as Mock;
const mockUsePathname = usePathname as Mock;
const mockUseSearchParams = useSearchParams as Mock;
const mockUseTranslations = useTranslations as Mock;

describe("useSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/search");
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it("should return default values when no search params are provided", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    const { result } = renderHook(() => useSearch());
    expect(result.current.mediaType).toBe("movie");
    expect(result.current.placeHolder).toBe("movies-placeholder");
    expect(result.current.currentQuery).toBe("");
  });

  it("should return the correct mediaType and query from search params", () => {
    const searchParams = new URLSearchParams({
      mediaType: "tv",
      query: "inception",
    });
    mockUseSearchParams.mockReturnValue(searchParams);
    const { result } = renderHook(() => useSearch());
    expect(result.current.mediaType).toBe("tv");
    expect(result.current.placeHolder).toBe("tv-shows-placeholder");
    expect(result.current.currentQuery).toBe("inception");
  });

  it("should update the URL when handleSearch is called", () => {
    const searchParams = new URLSearchParams({ mediaType: "movie" });
    mockUseSearchParams.mockReturnValue(searchParams);
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.handleSearch("interstellar");
    });
    expect(mockReplace).toHaveBeenCalledWith(
      "/search?mediaType=movie&page=1&query=interstellar",
    );
  });

  it("should update the URL when handleMediaTypeChange is called with a valid mediaType", () => {
    const searchParams = new URLSearchParams({
      mediaType: "movie",
      query: "inception",
    });
    mockUseSearchParams.mockReturnValue(searchParams);
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.handleMediaTypeChange("tv");
    });
    expect(mockReplace).toHaveBeenCalledWith(
      "/search?mediaType=tv&query=inception&page=1",
    );
  });

  it("should not update the URL when handleMediaTypeChange is called with an invalid mediaType", () => {
    const searchParams = new URLSearchParams({ mediaType: "movie" });
    mockUseSearchParams.mockReturnValue(searchParams);
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.handleMediaTypeChange("invalid");
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
