import Footer from "@/ui/search/footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock doit être défini avant l'import ou dans la factory function
vi.mock("@/ui/assets/icons/tmdb-logo", () => ({
  default: (props: { width: string }) => (
    <div data-testid="tmdb-logo" {...props}></div>
  ),
}));

describe("Footer", () => {
  it("renders a footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the TMDB logo", () => {
    render(<Footer />);
    expect(screen.getByTestId("tmdb-logo")).toBeInTheDocument();
    expect(screen.getByTestId("tmdb-logo")).toHaveAttribute("width", "150");
  });

  it("renders the translated disclaimer text", () => {
    render(<Footer />);
    expect(screen.getByText("SearchPage.disclaimer")).toBeInTheDocument();
  });

  it("applies the custom className", () => {
    render(<Footer className="customClass" />);
    expect(screen.getByRole("contentinfo")).toHaveClass("customClass");
  });
});
