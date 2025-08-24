import { generatePagination, getYearFromDateString } from "@/lib/utils"; // Ajuste le chemin selon ton fichier
import { describe, expect, it } from "vitest";

describe("utils", () => {
  describe("generatePagination", () => {
    it("devrait retourner toutes les pages si totalPages ≤ 7", () => {
      const result = generatePagination(1, 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("devrait retourner les 3 premières pages, ..., et les 2 dernières si currentPage ≤ 3", () => {
      const result = generatePagination(2, 10);
      expect(result).toEqual([1, 2, 3, "...", 9, 10]);
    });

    it("devrait retourner les 2 premières pages, ..., et les 3 dernières si currentPage ≥ totalPages - 2", () => {
      const result = generatePagination(8, 10);
      expect(result).toEqual([1, 2, "...", 8, 9, 10]);
    });

    it("devrait retourner la première page, ..., la page courante et ses voisins, ..., et la dernière page (cas général)", () => {
      const result = generatePagination(5, 10);
      expect(result).toEqual([1, "...", 4, 5, 6, "...", 10]);
    });
  });

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
});
