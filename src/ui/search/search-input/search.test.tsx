import React from "react";
import { render } from "@testing-library/react";
import { useSearch } from "@/ui/search/search-input/seach-hooks";
import Search from "@/ui/search/search-input/search";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";

// Mock du hook useSearch
vi.mock("@/ui/search/search-input/seach-hooks", () => ({
  useSearch: vi.fn(),
}));

describe("Search Component", () => {
  const mockHandleSearch = vi.fn();
  const mockHandleMediaTypeChange = vi.fn();

  beforeEach(() => {
    // Configuration du mock pour useSearch
    (useSearch as Mock).mockReturnValue({
      mediaType: "movie",
      placeHolder: "Search for movies...",
      currentQuery: "Batman",
      handleSearch: mockHandleSearch,
      handleMediaTypeChange: mockHandleMediaTypeChange,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<Search className="custom-class" />);
    // container.firstChild est la div externe (celle avec clsx)
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
