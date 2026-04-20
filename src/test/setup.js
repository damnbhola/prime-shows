import { beforeAll } from "vitest";
import PrimeVue from "primevue/config";

beforeAll(() => {
  // Mock PrimeVue config
  global.primevue = {
    config: {
      defaultOptions: {},
    },
  };
});
