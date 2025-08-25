import RootLayout from "@/app/[locale]/layout";
import { render, screen } from "@testing-library/react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  hasLocale: vi.fn(),
  NextIntlClientProvider: vi.fn(({ children }) => (
    <div data-testid="nextintl-provider">{children}</div>
  )),
}));

// Mock i18n/routing
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "fr", "es"],
  },
}));

// Mock fonts
vi.mock("@/ui/fonts", () => ({
  geistSans: {
    variable: "font-geist-sans",
  },
  geistMono: {
    variable: "font-geist-mono",
  },
}));

// Mock components
vi.mock("@/ui/search/footer", () => ({
  default: vi.fn(() => <footer data-testid="footer">Footer Component</footer>),
}));

vi.mock("@/ui/search/header", () => ({
  default: vi.fn(() => <header data-testid="header">Header Component</header>),
}));

// Mock CSS import
vi.mock("@/app/globals.css", () => ({}));

const mockHasLocale = vi.mocked(hasLocale);
const mockNotFound = vi.mocked(notFound);

describe("RootLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render layout with valid locale", async () => {
    mockHasLocale.mockReturnValue(true);

    const component = await RootLayout({
      children: <div data-testid="test-children">Test Content</div>,
      params: Promise.resolve({ locale: "en" }),
    });

    render(component);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
    expect(screen.getByTestId("nextintl-provider")).toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it("should call notFound when locale is invalid", async () => {
    mockHasLocale.mockReturnValue(false);
    mockNotFound.mockImplementation(() => {
      throw new Error("Not Found");
    });

    await expect(
      RootLayout({
        children: <div>Test Content</div>,
        params: Promise.resolve({ locale: "invalid" }),
      }),
    ).rejects.toThrow("Not Found");

    expect(mockHasLocale).toHaveBeenCalledWith(["en", "fr", "es"], "invalid");
    expect(mockNotFound).toHaveBeenCalled();
  });

  it("should validate different valid locales", async () => {
    const validLocales = ["en", "fr", "es"];

    for (const locale of validLocales) {
      mockHasLocale.mockReturnValue(true);
      vi.clearAllMocks();

      const component = await RootLayout({
        children: <div data-testid={`content-${locale}`}>Content</div>,
        params: Promise.resolve({ locale }),
      });

      render(component);

      expect(mockHasLocale).toHaveBeenCalledWith(["en", "fr", "es"], locale);
      expect(screen.getByTestId(`content-${locale}`)).toBeInTheDocument();
      expect(mockNotFound).not.toHaveBeenCalled();
    }
  });

  it("should create html element with correct lang attribute", async () => {
    mockHasLocale.mockReturnValue(true);

    const component = await RootLayout({
      children: <div>Test Content</div>,
      params: Promise.resolve({ locale: "fr" }),
    });

    // Test the structure of the JSX returned
    expect(component.type).toBe("html");
    expect(component.props.lang).toBe("fr");
  });

  it("should render components in correct order", async () => {
    mockHasLocale.mockReturnValue(true);

    const component = await RootLayout({
      children: <div data-testid="main-content">Main Content</div>,
      params: Promise.resolve({ locale: "en" }),
    });

    render(component);

    const container = screen.getByTestId("nextintl-provider");
    const childElements = Array.from(container.children);

    // Check that the main container div exists
    expect(childElements).toHaveLength(1);
    const mainDiv = childElements[0];

    // Check the order of elements inside main container
    const mainChildren = Array.from(mainDiv.children);
    expect(mainChildren).toHaveLength(3);

    // Header should be first
    expect(mainChildren[0]).toHaveAttribute("data-testid", "header");
    // Main content should be second
    expect(mainChildren[1]).toHaveAttribute("data-testid", "main-content");
    // Footer should be third
    expect(mainChildren[2]).toHaveAttribute("data-testid", "footer");
  });

  it("should handle multiple children correctly", async () => {
    mockHasLocale.mockReturnValue(true);

    const component = await RootLayout({
      children: (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      ),
      params: Promise.resolve({ locale: "en" }),
    });

    render(component);

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should wrap everything in NextIntlClientProvider", async () => {
    mockHasLocale.mockReturnValue(true);

    const component = await RootLayout({
      children: <div data-testid="test-content">Content</div>,
      params: Promise.resolve({ locale: "en" }),
    });

    render(component);

    const provider = screen.getByTestId("nextintl-provider");
    expect(provider).toBeInTheDocument();

    // All content should be inside the provider
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should handle edge case locales correctly", async () => {
    const edgeCaseLocales = ["", "null", "undefined"];

    for (const locale of edgeCaseLocales) {
      mockHasLocale.mockReturnValue(false);
      mockNotFound.mockImplementation(() => {
        throw new Error("Not Found");
      });

      await expect(
        RootLayout({
          children: <div>Test Content</div>,
          params: Promise.resolve({ locale }),
        }),
      ).rejects.toThrow("Not Found");

      expect(mockNotFound).toHaveBeenCalled();
      vi.clearAllMocks();
    }
  });
});
