import PaginationArrow from "@/ui/search/pagination/pagination-arrow";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PaginationArrow", () => {
  it("renders left arrow with label", () => {
    render(<PaginationArrow href="/page/1" direction="left" />);
    expect(
      screen.getByRole("link", { name: /previous page/i }),
    ).toBeInTheDocument();
  });

  it("renders right arrow with label", () => {
    render(<PaginationArrow href="/page/3" direction="right" />);
    expect(
      screen.getByRole("link", { name: /next page/i }),
    ).toBeInTheDocument();
  });

  it("renders disabled left arrow when isDisabled is true", () => {
    render(<PaginationArrow href="/page/0" direction="left" isDisabled />);
    const arrow = screen.getByRole("link", { name: /previous page/i });
    expect(arrow).toHaveAttribute("aria-disabled", "true");
    expect(arrow).not.toHaveAttribute("href");
  });

  it("renders disabled right arrow when isDisabled is true", () => {
    render(<PaginationArrow href="/page/99" direction="right" isDisabled />);
    const arrow = screen.getByRole("link", { name: /next page/i });
    expect(arrow).toHaveAttribute("aria-disabled", "true");
    expect(arrow).not.toHaveAttribute("href");
  });
});
