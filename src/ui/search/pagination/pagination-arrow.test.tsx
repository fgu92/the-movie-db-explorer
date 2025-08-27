import PaginationArrow from "@/ui/search/pagination/pagination-arrow";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PaginationArrow", () => {
  it("renders left arrow with label", () => {
    render(<PaginationArrow href="?page=2" direction="left" />);
    expect(
      screen.getByRole("link", { name: "SearchPage.previous-page" }),
    ).toBeInTheDocument();
  });

  it("renders right arrow with label", () => {
    render(<PaginationArrow href="?page=1" direction="right" />);
    expect(
      screen.getByRole("link", { name: "SearchPage.next-page" }),
    ).toBeInTheDocument();
  });

  it("renders disabled left arrow when isDisabled is true", () => {
    render(<PaginationArrow href="?page=2" direction="left" isDisabled />);
    expect(
      screen.getByRole("link", { name: "SearchPage.previous-page" })
        .ariaDisabled,
    ).toBeTruthy();
  });

  it("renders disabled right arrow when isDisabled is true", () => {
    render(<PaginationArrow href="?page=1" direction="right" isDisabled />);
  });
});
