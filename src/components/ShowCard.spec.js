import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import ShowCard from "./ShowCard.vue";

describe("ShowCard", () => {
  const show = {
    id: 1,
    name: "Test Show",
    genres: ["Drama", "Comedy"],
    rating: { average: 8.5 },
    image: { medium: "https://example.com/poster.jpg" },
  };

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  });

  it("renders show information and link", async () => {
    const wrapper = mount(ShowCard, {
      props: { show },
      global: { plugins: [router] },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Test Show");
    expect(wrapper.text()).toContain("Drama · Comedy");
    expect(wrapper.text()).toContain("⭐ 8.5");
    expect(wrapper.find("a").attributes("href")).toBe("/show/1");
  });
});
