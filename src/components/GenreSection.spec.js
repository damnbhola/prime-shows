import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GenreSection from "./GenreSection.vue";

// Mock PrimeVue Carousel
vi.mock("primevue/carousel", () => ({
  default: {
    name: "Carousel",
    props: ["value"],
    template:
      "<div><slot name='item' v-for='item in value' :data='item'></slot></div>",
  },
}));

describe("GenreSection", () => {
  const shows = [
    { id: 1, name: "Show 1", genres: ["Drama"], rating: { average: 8.0 } },
    { id: 2, name: "Show 2", genres: ["Drama"], rating: { average: 7.5 } },
  ];

  it("renders genre title and show count", () => {
    const wrapper = mount(GenreSection, {
      props: { genre: "Drama", shows },
    });

    expect(wrapper.text()).toContain("Drama");
    expect(wrapper.text()).toContain("2 shows");
  });

  it("renders carousel with shows", () => {
    const wrapper = mount(GenreSection, {
      props: { genre: "Drama", shows },
    });

    const carousel = wrapper.findComponent({ name: "Carousel" });
    expect(carousel.exists()).toBe(true);
    expect(carousel.props("value")).toEqual(shows);
  });
});
