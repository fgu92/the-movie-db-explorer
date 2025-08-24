import Header from "@/ui/search/header";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock défini directement dans la factory function pour éviter les problèmes de hoisting
vi.mock("@/ui/language-switcher", () => ({
  default: () => <div data-testid="language-switcher"></div>,
}));

describe("Header", () => {
  it("renders a header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the LanguageSwitcher component", () => {
    render(<Header />);
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Header className="customClass" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("customClass");
  });
});
