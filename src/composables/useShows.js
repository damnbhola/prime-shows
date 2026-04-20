import { ref, computed } from "vue";
import { fetchShowsByPage, searchShows } from "../api/tvmaze";

const PAGES_TO_LOAD = 3;

export function useShows() {
  const shows = ref([]);
  const searchQuery = ref("");
  const searchResults = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const genres = computed(() => {
    const map = new Map();
    shows.value.forEach((show) => {
      show.genres?.forEach((genre) => {
        if (!map.has(genre)) {
          map.set(genre, []);
        }
        map.get(genre).push(show);
      });
    });
    return [...map.entries()]
      .map(([genre, items]) => ({
        genre,
        shows: items
          .filter((item) => item.rating?.average)
          .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0)),
      }))
      .filter((group) => group.shows.length > 0)
      .sort((a, b) => b.shows.length - a.shows.length);
  });

  const featuredGenres = computed(() => genres.value.slice(0, 6));

  const featuredShow = computed(() => {
    if (shows.value.length === 0) return null;
    return shows.value
      .filter((show) => show.rating?.average)
      .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))[0];
  });

  async function loadShows() {
    loading.value = true;
    error.value = null;
    try {
      const pagePromises = [];
      for (let page = 0; page < PAGES_TO_LOAD; page += 1) {
        pagePromises.push(fetchShowsByPage(page));
      }
      const pages = await Promise.all(pagePromises);
      shows.value = pages.flat().filter((show) => show && show.id);
    } catch (err) {
      error.value = err.message || "Unable to load shows.";
    } finally {
      loading.value = false;
    }
  }

  async function runSearch(query) {
    if (!query || !query.trim()) {
      searchResults.value = [];
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const results = await searchShows(query);
      searchResults.value = results.map((item) => item.show || item);
    } catch (err) {
      error.value = err.message || "Search failed.";
    } finally {
      loading.value = false;
    }
  }

  return {
    shows,
    searchQuery,
    searchResults,
    featuredGenres,
    featuredShow,
    loading,
    error,
    loadShows,
    runSearch,
  };
}
