import "@testing-library/jest-dom";
import { loadEnvConfig } from "@next/env";
import { vi } from "vitest";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Mock global de next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace?: string) => {
    return (key: string, values?: Record<string, string | number>) => {
      if (values) {
        return key.replace(
          /{(\w+)}/g,
          (match: string, placeholder: string) =>
            values[placeholder]?.toString() || match,
        );
      }
      return namespace ? `${namespace}.${key}` : key;
    };
  }),
  useLocale: vi.fn(() => "fr"),
}));
