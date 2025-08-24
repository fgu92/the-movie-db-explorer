import LanguageSwitcher from "@/ui/language-switcher";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextIntl from "next-intl"; // ⬅ Import namespace
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock("next-intl");

describe("LanguageSwitcher", () => {
  const mockPush = vi.fn();
  const mockUseRouter = useRouter as Mock;
  const mockUsePathname = usePathname as Mock;
  const mockUseSearchParams = useSearchParams as Mock;
  const mockUseLocale = nextIntl.useLocale as Mock; // ⬅ Plus besoin de require
  const mockUseTranslations = nextIntl.useTranslations as Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue("/fr/accueil");
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
    mockUseLocale.mockReturnValue("fr");
    mockUseTranslations.mockReturnValue((key: string) => `SearchPage.${key}`);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default locale (fr)", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("fr")).toBeInTheDocument();
    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("applies correct classes and disabled state for active locale", () => {
    render(<LanguageSwitcher />);
    const frButton = screen.getByText("fr");
    const enButton = screen.getByText("en");

    expect(frButton).toHaveClass("text-gray-500", "cursor-default");
    expect(frButton).toBeDisabled();
    expect(enButton).toHaveClass("underline", "cursor-pointer");
    expect(enButton).not.toBeDisabled();
  });

  it("switches locale to 'en' when clicking on 'en' button", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    const enButton = screen.getByText("en");
    await user.click(enButton);
    expect(mockPush).toHaveBeenCalledWith("/en/accueil");
  });

  it("switches locale and preserves query params", async () => {
    const user = userEvent.setup();
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=test"));
    render(<LanguageSwitcher />);
    const enButton = screen.getByText("en");
    await user.click(enButton);
    expect(mockPush).toHaveBeenCalledWith("/en/accueil?q=test");
  });

  it("sets correct aria-label for buttons", () => {
    render(<LanguageSwitcher />);
    const frButton = screen.getByText("fr");
    const enButton = screen.getByText("en");
    expect(frButton).toHaveAttribute(
      "aria-label",
      "SearchPage.switch-to-french",
    );
    expect(enButton).toHaveAttribute(
      "aria-label",
      "SearchPage.switch-to-english",
    );
  });

  it("renders correctly with 'en' as active locale", () => {
    mockUseLocale.mockReturnValue("en");
    render(<LanguageSwitcher />);
    const frButton = screen.getByText("fr");
    const enButton = screen.getByText("en");

    expect(enButton).toHaveClass("text-gray-500", "cursor-default");
    expect(enButton).toBeDisabled();
    expect(frButton).toHaveClass("underline", "cursor-pointer");
    expect(frButton).not.toBeDisabled();
  });
});
