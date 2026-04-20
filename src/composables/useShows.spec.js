import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useShows } from "./useShows";

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe("useShows", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads shows and groups by genre", async () => {
    const mockShows = [
      {
        id: 1,
        name: "Drama Show",
        genres: ["Drama"],
        rating: { average: 8.0 },
      },
      {
        id: 2,
        name: "Comedy Show",
        genres: ["Comedy"],
        rating: { average: 7.5 },
      },
      {
        id: 3,
        name: "Mixed Show",
        genres: ["Drama", "Comedy"],
        rating: { average: 9.0 },
      },
    ];

    // Mock fetch for 3 pages
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockShows),
    });

    const { loadShows, featuredGenres } = useShows();
    await loadShows();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/shows?page=0",
    );
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/shows?page=1",
    );
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/shows?page=2",
    );
    // Wait for reactivity
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(featuredGenres.value.length).toBeGreaterThan(0); // At least one genre
  });

  it("searches shows", async () => {
    const mockResults = [{ show: { id: 1, name: "Search Result" } }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResults),
    });

    const { runSearch, searchResults } = useShows();
    await runSearch("test");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/search/shows?q=test",
    );
    expect(searchResults.value).toEqual([{ id: 1, name: "Search Result" }]);
  });

  it("handles search with empty query", async () => {
    const { runSearch, searchResults } = useShows();
    await runSearch("");

    expect(mockFetch).not.toHaveBeenCalled();
    expect(searchResults.value).toEqual([]);
  });
});
