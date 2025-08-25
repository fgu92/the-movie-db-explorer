import Home from "@/app/[locale]/page";
import { searchMedia } from "@/lib/data";
import { MediaType } from "@/lib/types/tmdb-media";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(() =>
    Promise.resolve((key: string) => {
      const translations: Record<string, string> = {
        "no-results": "No results found",
      };
      return translations[key] || key;
    }),
  ),
}));

// Mock lib/data
vi.mock("@/lib/data", () => ({
  searchMedia: vi.fn(),
}));

// Mock components
vi.mock("@/ui/search/media-list/media-list", () => ({
  default: vi.fn(({ results }) => (
    <div data-testid="media-list">Media List with {results.length} results</div>
  )),
}));

vi.mock("@/ui/search/pagination/pagination", () => ({
  default: vi.fn(({ totalPages }) => (
    <div data-testid="pagination">Pagination with {totalPages} pages</div>
  )),
}));

vi.mock("@/ui/search/search-input/search", () => ({
  default: vi.fn(({ className }) => (
    <div data-testid="search" className={className}>
      Search Component
    </div>
  )),
}));

const mockSearchMedia = vi.mocked(searchMedia);

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search component and no results message when no search results", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "1",
        mediaType: "movie",
      }),
    });

    render(component);

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByText("🎬")).toBeInTheDocument();
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.queryByTestId("media-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("should render media list without pagination when results exist but only one page", async () => {
    const mockResults = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
    ];

    mockSearchMedia.mockResolvedValue({
      results: mockResults,
      total_pages: 1,
      total_results: 2,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "1",
        mediaType: "movie",
      }),
    });

    render(component);

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("media-list")).toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    expect(screen.queryByText("🎬")).not.toBeInTheDocument();
  });

  it("should render media list with pagination when results exist and multiple pages", async () => {
    const mockResults = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
    ];

    mockSearchMedia.mockResolvedValue({
      results: mockResults,
      total_pages: 5,
      total_results: 100,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "1",
        mediaType: "movie",
      }),
    });

    render(component);

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("media-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("pagination")).toHaveLength(2); // Before and after MediaList
    expect(screen.queryByText("🎬")).not.toBeInTheDocument();
  });

  it("should handle default values when no search params provided", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({});

    render(component);

    expect(mockSearchMedia).toHaveBeenCalledWith("", 1, "movie");
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("should handle invalid page number by defaulting to 1", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "invalid",
        mediaType: "movie",
      }),
    });

    render(component);

    expect(mockSearchMedia).toHaveBeenCalledWith("test", 1, "movie");
  });

  it("should handle negative page number by defaulting to 1", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "-5",
        mediaType: "movie",
      }),
    });

    render(component);

    expect(mockSearchMedia).toHaveBeenCalledWith("test", 1, "movie");
  });

  it("should default to movie mediaType when invalid mediaType provided", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "1",
        mediaType: "invalid" as MediaType,
      }),
    });

    render(component);

    expect(mockSearchMedia).toHaveBeenCalledWith("test", 1, "movie");
  });

  it("should handle tv mediaType correctly", async () => {
    mockSearchMedia.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    const component = await Home({
      searchParams: Promise.resolve({
        query: "test",
        page: "1",
        mediaType: "tv",
      }),
    });

    render(component);

    expect(mockSearchMedia).toHaveBeenCalledWith("test", 1, "tv");
  });
});
