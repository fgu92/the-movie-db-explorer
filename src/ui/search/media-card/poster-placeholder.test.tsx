import React from "react";
import { render, screen } from "@testing-library/react";
import { PosterPlaceholder } from "@/ui/search/media-card/poster-placeholder";
import { describe, it, expect } from "vitest";

describe("PosterPlaceholder", () => {
  it("renders the title", () => {
    render(<PosterPlaceholder title="Inception" />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the PhotoIcon", () => {
    const { container } = render(<PosterPlaceholder title="Inception" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies the custom className to the container", () => {
    const customClass = "border-2 border-red-500";
    const { container } = render(
      <PosterPlaceholder title="Inception" className={customClass} />,
    );
    expect(container.firstChild).toHaveClass(customClass);
  });

  it("renders long titles without errors", () => {
    const longTitle =
      "A very long movie title that should not break the layout or cause overflow issues";
    render(<PosterPlaceholder title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });
});
