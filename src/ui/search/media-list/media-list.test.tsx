import MediaList from "@/ui/search/media-list/media-list";
import { render, screen } from "@testing-library/react";
import {
  Movie,
  TVShow,
} from "../../../../../the-movie-db-explorer-project/src/lib/types/tmdb-media";

describe("MediaList", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Inception",
    original_title: "Inception",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 22000,
    poster_path: "/inception.jpg",
    popularity: 100,
  };

  const mockTVShow: TVShow = {
    id: 2,
    name: "Breaking Bad",
    original_name: "Breaking Bad",
    first_air_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 45000,
    poster_path: "/breaking-bad.jpg",
    popularity: 200,
  };

  it("renders the correct number of MediaCard components for movies", async () => {
    render(await MediaList({ results: [mockMovie] }));
    expect(screen.getByAltText("Inception")).toBeInTheDocument();
  });

  it("renders the correct number of MediaCard components for TV shows", async () => {
    render(await MediaList({ results: [mockTVShow] }));
    expect(screen.getByAltText("Breaking Bad")).toBeInTheDocument();
  });

  it("applies custom className to the container", async () => {
    const { container } = render(
      await MediaList({ results: [mockMovie], className: "custom-class" }),
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders an empty container if results is empty", async () => {
    const { container } = render(await MediaList({ results: [] }));
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
