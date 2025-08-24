import React from "react";
import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import MediaCard from "@/ui/search/media-card/media-card";
import { ImageProps } from "next/image";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";

vi.mock("next/image", () => ({
  default: (props: ImageProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { blurDataURL, src, alt, ...rest } = props;

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} src={src as string | undefined} alt={alt} />;
  },
}));

// Mock next-intl
vi.mock("next-intl");

describe("MediaCard", () => {
  beforeEach(() => {
    (useTranslations as Mock).mockImplementation(() => {
      return (key: string, values?: Record<string, unknown>) => {
        if (key === "votes" && values) {
          return `${values.voteAverage} (${values.count})`;
        }
        return key;
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <MediaCard
        className="custom-class"
        title="Inception"
        year={2010}
        voteAverage={8.7}
        voteCount={25000}
        posterPath="path/to/poster.jpg"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders the poster image when posterPath is provided", () => {
    render(
      <MediaCard
        title="Inception"
        year={2010}
        voteAverage={8.7}
        voteCount={25000}
        posterPath="path/to/poster.jpg"
      />,
    );
    const img = screen.getByRole("img", { name: /Inception/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "path/to/poster.jpg");
  });

  it("renders the real PosterPlaceholder when posterPath is undefined", () => {
    render(
      <MediaCard
        title="Inception"
        year={2010}
        voteAverage={8.7}
        voteCount={25000}
      />,
    );
    const placeholderContainer = screen.getByText("Inception").closest("div");
    expect(placeholderContainer).toBeInTheDocument();
  });

  it("displays the year and formatted vote average with count", () => {
    render(
      <MediaCard
        title="Inception"
        year={2010}
        voteAverage={8.7}
        voteCount={25000}
        posterPath="path/to/poster.jpg"
      />,
    );
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("8.7 (25000)")).toBeInTheDocument();
  });

  it("does not display vote average if it is not provided", () => {
    render(
      <MediaCard
        title="Inception"
        year={2010}
        voteAverage={0}
        voteCount={0}
        posterPath="path/to/poster.jpg"
      />,
    );
    expect(screen.queryByText(/\d+ \(\d+\)/)).not.toBeInTheDocument();
  });

  it("rounds the vote average to one decimal place", () => {
    render(
      <MediaCard
        title="Inception"
        year={2010}
        voteAverage={8.7654}
        voteCount={25000}
        posterPath="path/to/poster.jpg"
      />,
    );
    expect(screen.getByText("8.8 (25000)")).toBeInTheDocument();
  });
});
