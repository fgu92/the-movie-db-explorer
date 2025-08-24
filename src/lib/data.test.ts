import { searchMedia } from "@/lib/data";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
  global.fetch = originalFetch;
});

const fakeResponse = {
  page: 1,
  total_pages: 10,
  total_results: 100,
  results: [],
};

describe("TMDB API fetch wrapper", () => {
  it("calls /search/movie with params when query is provided and mediaType=movie", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      },
    );
    const result = await searchMedia("matrix", 2, "movie");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const url = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(url).toContain("/search/movie?");
    expect(url).toContain("query=matrix");
    expect(url).toContain("page=2");
    expect(result).toEqual(fakeResponse);
  });

  it("calls /search/tv when query is provided and mediaType=tv", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      },
    );
    await searchMedia("lost", 1, "tv");
    const url = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(url).toContain("/search/tv?");
    expect(url).toContain("query=lost");
  });

  it("calls /discover/movie when query is empty and mediaType=movie", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      },
    );
    await searchMedia("", 1, "movie");
    const url = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(url).toContain("/discover/movie?");
    expect(url).toContain("page=1");
    expect(url).toContain("vote_count.gte");
  });

  it("calls /discover/tv when query is empty and mediaType=tv", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      },
    );
    await searchMedia("   ", 3, "tv");
    const url = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(url).toContain("/discover/tv?");
    expect(url).toContain("page=3");
  });

  it("throws a TMDBApiError on failed fetch (non-OK response)", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      },
    );
    await expect(searchMedia("test", 1, "movie")).rejects.toThrow(
      /TMDB API Error \(500\)/,
    );
  });

  it("wraps network errors into TMDBApiError", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Connection lost"),
    );
    await expect(searchMedia("test", 1, "tv")).rejects.toThrow(/Network error/);
  });

  it("wraps TMDBApiError into generic Error in searchMedia", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: false,
        status: 404,
        statusText: "Not Found",
      },
    );
    await expect(searchMedia("unknown", 1, "movie")).rejects.toThrow(
      /Failed to searching movie:/,
    );
  });
});

describe("URL param builder (indirectly tested)", () => {
  it("appends only defined params", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      },
    );
    await searchMedia("param-test", 5, "movie");
    const url = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(url).toMatch(/query=param-test/);
    expect(url).toMatch(/page=5/);
    expect(url).not.toMatch(/undefined/);
  });
});
