import SearchUi from "@/ui/search/search-input/search-ui";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("SearchUi", () => {
  const defaultProps = {
    mediaType: "movie",
    placeHolder: "Search for movies...",
    currentQuery: "",
    onSearch: vi.fn(),
    onMediaTypeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the search input with correct placeholder", () => {
      render(<SearchUi {...defaultProps} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("name", "query");
      expect(input).toHaveAttribute("id", "query");
    });

    it("renders the media type select with correct options", () => {
      render(<SearchUi {...defaultProps} />);

      const select = screen.getByLabelText(
        "SearchPage.media-type-select-label",
      );
      expect(select).toBeInTheDocument();
      expect(select).toHaveAttribute("name", "mediaType");
      expect(select).toHaveAttribute("id", "mediaType");
      expect(select).toHaveValue("movie");

      // Vérifie les options
      const movieOption = screen.getByText("SearchPage.movies-option-text");
      const tvOption = screen.getByText("SearchPage.tv-shows-option-text");
      expect(movieOption).toBeInTheDocument();
      expect(tvOption).toBeInTheDocument();
      expect(movieOption).toHaveValue("movie");
      expect(tvOption).toHaveValue("tv");
    });

    it("renders the chevron down icon", () => {
      render(<SearchUi {...defaultProps} />);

      expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
    });

    it("applies custom className when provided", () => {
      const { container } = render(
        <SearchUi {...defaultProps} className="custom-class" />,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Initial Values", () => {
    it("displays the current query as default value in input", () => {
      render(<SearchUi {...defaultProps} currentQuery="Batman" />);

      const input = screen.getByDisplayValue("Batman");
      expect(input).toBeInTheDocument();
    });

    it("selects the correct media type by default", () => {
      render(<SearchUi {...defaultProps} mediaType="tv" />);

      const select = screen.getByDisplayValue(
        "SearchPage.tv-shows-option-text",
      );
      expect(select).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("calls onSearch when user types in the input", async () => {
      const user = userEvent.setup();
      render(<SearchUi {...defaultProps} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      await user.type(input, "Batman");

      // onSearch devrait être appelé pour chaque caractère tapé
      expect(defaultProps.onSearch).toHaveBeenCalledTimes(6); // B-a-t-m-a-n
      expect(defaultProps.onSearch).toHaveBeenLastCalledWith("Batman");
    });

    it("calls onSearch with single character changes", () => {
      render(<SearchUi {...defaultProps} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      fireEvent.change(input, { target: { value: "A" } });

      expect(defaultProps.onSearch).toHaveBeenCalledWith("A");
      expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
    });

    it("calls onMediaTypeChange when user changes media type", async () => {
      const user = userEvent.setup();
      render(<SearchUi {...defaultProps} />);

      const select = screen.getByLabelText(
        "SearchPage.media-type-select-label",
      );
      await user.selectOptions(select, "tv");

      expect(defaultProps.onMediaTypeChange).toHaveBeenCalledTimes(1);
      expect(defaultProps.onMediaTypeChange).toHaveBeenCalledWith("tv");
    });
  });

  describe("Accessibility", () => {
    it("has proper labels and form associations", () => {
      render(<SearchUi {...defaultProps} />);

      const input = screen.getByLabelText("Search for movies...");
      const select = screen.getByLabelText(
        "SearchPage.media-type-select-label",
      );

      expect(input).toBeInTheDocument();
      expect(select).toBeInTheDocument();
    });
  });
});
