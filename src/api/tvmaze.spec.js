import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchShowsByPage, searchShows, fetchShowById } from "./tvmaze";

const originalFetch = global.fetch;

function mockJson(data) {
  return {
    ok: true,
    json: vi.fn().mockResolvedValue(data),
  };
}

describe("tvmaze API", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches shows by page", async () => {
    global.fetch.mockResolvedValueOnce(
      mockJson([{ id: 10, name: "Page Show" }]),
    );
    const result = await fetchShowsByPage(0);
    expect(result).toEqual([{ id: 10, name: "Page Show" }]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/shows?page=0",
    );
  });

  it("searches shows by query", async () => {
    global.fetch.mockResolvedValueOnce(
      mockJson([{ show: { id: 11, name: "Search Show" } }]),
    );
    const result = await searchShows("star");
    expect(result).toEqual([{ show: { id: 11, name: "Search Show" } }]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/search/shows?q=star",
    );
  });

  it("fetches a show by id", async () => {
    global.fetch.mockResolvedValueOnce(
      mockJson({ id: 12, name: "Detail Show" }),
    );
    const result = await fetchShowById(12);
    expect(result).toEqual({ id: 12, name: "Detail Show" });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.tvmaze.com/shows/12",
    );
  });
});
