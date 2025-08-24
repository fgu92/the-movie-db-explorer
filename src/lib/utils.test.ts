import { getYearFromDateString } from "@/lib/utils"; // Ajuste le chemin selon ton fichier
import { describe, expect, it } from "vitest";

describe("getYearFromDateString", () => {
  it("extracts year from valid date string", () => {
    expect(getYearFromDateString("2023-12-25")).toBe(2023);
    expect(getYearFromDateString("1995-06-15")).toBe(1995);
    expect(getYearFromDateString("2000-01-01")).toBe(2000);
  });

  it("handles single digit month and day", () => {
    expect(getYearFromDateString("2021-1-5")).toBe(2021);
    expect(getYearFromDateString("1999-12-1")).toBe(1999);
  });

  it("returns undefined for undefined input", () => {
    expect(getYearFromDateString(undefined)).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(getYearFromDateString("")).toBeUndefined();
  });

  it("returns undefined for non-numeric year", () => {
    expect(getYearFromDateString("abc-12-25")).toBeUndefined();
    expect(getYearFromDateString("20xx-12-25")).toBeUndefined();
    expect(getYearFromDateString("two-12-25")).toBeUndefined();
  });
});
