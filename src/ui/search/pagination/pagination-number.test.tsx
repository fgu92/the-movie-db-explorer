import PaginationNumber from "@/ui/search/pagination/pagination-number";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PaginationNumber", () => {
  it("renders active page as span with aria-current", () => {
    render(
      <PaginationNumber page={2} href="/page/2" isActive position="middle" />,
    );

    const element = screen.getByRole("link", { current: "page" });
    expect(element).toHaveTextContent("2");
  });

  it("renders middle placeholder as a span", () => {
    render(
      <PaginationNumber
        page="..."
        href="/page/..."
        isActive={false}
        position="middle"
      />,
    );
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("...").tagName.toLowerCase()).toBe("span");
  });

  it("renders non-active number as a link", () => {
    render(
      <PaginationNumber
        page={3}
        href="/page/3"
        isActive={false}
        position="last"
      />,
    );
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/page/3",
    );
  });
});
