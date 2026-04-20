const BASE_URL = "https://api.tvmaze.com";

async function doFetch(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`TVMaze API error: ${response.status}`);
  }
  return response.json();
}

export function fetchShowsByPage(page = 0) {
  return doFetch(`/shows?page=${page}`);
}

export function searchShows(query) {
  if (!query || !query.trim()) {
    return Promise.resolve([]);
  }
  return doFetch(`/search/shows?q=${encodeURIComponent(query)}`);
}

export function fetchShowById(id) {
  return doFetch(`/shows/${id}`);
}
