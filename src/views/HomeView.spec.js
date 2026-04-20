import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { ref, nextTick } from "vue";
import HomeView from "./HomeView.vue";

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

vi.mock("primevue/carousel", () => ({
  default: {
    name: "Carousel",
    props: ["value"],
    template:
      "<div><slot name='item' v-for='item in value' :data='item'></slot></div>",
  },
}));

// Mock the composable
vi.mock("../composables/useShows");
import { useShows } from "../composables/useShows";

describe("HomeView", () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", name: "Home", component: HomeView }],
  });

  it("renders hero carousel and genre sections", async () => {
    const mockShows = [
      {
        id: 1,
        name: "Show 1",
        genres: ["Drama"],
        rating: { average: 9.0 },
        image: { medium: "img1.jpg" },
      },
      {
        id: 2,
        name: "Show 2",
        genres: ["Comedy"],
        rating: { average: 8.5 },
        image: { medium: "img2.jpg" },
      },
    ];

    vi.mocked(useShows).mockReturnValue({
      searchQuery: ref(""),
      searchResults: ref([]),
      featuredGenres: ref([]),
      featuredShow: ref(mockShows[0]),
      loading: ref(false),
      error: ref(null),
      loadShows: vi.fn(),
      runSearch: vi.fn(),
      shows: ref(mockShows),
    });

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Watch Now");
    expect(wrapper.find(".hero-section").exists()).toBe(true);
  });

  it("displays featured genres", async () => {
    const loadShows = vi.fn();
    const mockShows = [
      {
        id: 1,
        name: "Show 1",
        genres: ["Drama"],
        rating: { average: 9.0 },
        image: { medium: "img1.jpg" },
      },
      {
        id: 2,
        name: "Show 2",
        genres: ["Comedy"],
        rating: { average: 8.5 },
        image: { medium: "img2.jpg" },
      },
    ];

    vi.mocked(useShows).mockReturnValue({
      featuredGenres: ref([
        { genre: "Drama", shows: [mockShows[0]] },
        { genre: "Comedy", shows: [mockShows[1]] },
      ]),
      featuredShow: ref(mockShows[0]),
      loading: ref(false),
      error: ref(null),
      loadShows,
      shows: ref(mockShows),
    });

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Featured by Genre");
    expect(wrapper.text()).toContain("Drama");
    expect(wrapper.text()).toContain("Comedy");
  });
});
