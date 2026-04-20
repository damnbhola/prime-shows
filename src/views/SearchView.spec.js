import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { ref } from "vue";
import SearchView from "./SearchView.vue";

// Mock components
vi.mock("../components/GenreSection.vue", () => ({
  default: {
    name: "GenreSection",
    props: ["genre", "shows"],
    template: "<div>{{ genre }} - {{ shows.length }} shows</div>",
  },
}));

vi.mock("primevue/progressspinner", () => ({
  default: {
    name: "ProgressSpinner",
    template: "<div>Loading...</div>",
  },
}));

// Mock the composable
vi.mock("../composables/useShows");
import { useShows } from "../composables/useShows";

describe("SearchView", () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/search", name: "Search", component: SearchView }],
  });

  it("displays search results", async () => {
    const runSearch = vi.fn();
    const mockResults = [
      {
        id: 1,
        name: "Friends",
        genres: ["Comedy"],
        rating: { average: 8.9 },
        image: { medium: "img1.jpg" },
      },
      {
        id: 2,
        name: "The Office",
        genres: ["Comedy"],
        rating: { average: 9.0 },
        image: { medium: "img2.jpg" },
      },
    ];

    vi.mocked(useShows).mockReturnValue({
      searchQuery: ref("Friends"),
      searchResults: ref(mockResults),
      loading: ref(false),
      error: ref(null),
      runSearch,
    });

    const wrapper = mount(SearchView, {
      global: { plugins: [router] },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Search Results");
    expect(wrapper.text()).toContain("2 results found");
  });

  it("shows empty state when no results found", async () => {
    const runSearch = vi.fn();

    vi.mocked(useShows).mockReturnValue({
      searchQuery: ref("nonexistent"),
      searchResults: ref([]),
      loading: ref(false),
      error: ref(null),
      runSearch,
    });

    const wrapper = mount(SearchView, {
      global: { plugins: [router] },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("No shows found");
    expect(wrapper.text()).toContain("Try searching with different keywords");
  });
});
