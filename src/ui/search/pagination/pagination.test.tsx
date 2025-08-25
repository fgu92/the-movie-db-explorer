import Pagination from "@/ui/search/pagination/pagination";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/movies",
  useSearchParams: () => new URLSearchParams([["page", "2"]]),
}));

vi.mock("@/ui/search/pagination/pagination-arrow", () => ({
  default: (props: { direction: "left" | "right" }) => (
    <div data-testid={`arrow-${props.direction}`}></div>
  ),
}));

vi.mock("@/ui/search/pagination/pagination-number", () => ({
  default: (props: { page: number | string }) => (
    <div data-testid={`number-${props.page}`}></div>
  ),
}));

describe("<Pagination />", () => {
  it("renders previous and next arrows", () => {
    render(<Pagination totalPages={5} />);
    expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right")).toBeInTheDocument();
  });

  it("renders correct number of pages", () => {
    render(<Pagination totalPages={5} />);
    expect(screen.getAllByTestId(/number-/)).not.toHaveLength(0);
  });

  it("passes correct currentPage to PaginationNumber", () => {
    render(<Pagination totalPages={5} />);
    expect(screen.getByTestId("number-2")).toBeInTheDocument();
  });
});
