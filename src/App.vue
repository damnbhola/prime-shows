<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="nav-container">
        <h1 class="logo">Prime Shows</h1>
        <div class="search-container">
          <div class="search-wrapper">
            <InputText
              ref="searchInput"
              v-model="searchQuery"
              type="search"
              placeholder="Search shows..."
              class="header-search"
              @input="debouncedSearch"
              @focus="showPopper = true"
            />
            <i class="pi pi-search search-icon"></i>
          </div>
          <Popover ref="popover" :show="showPopper" @hide="showPopper = false">
            <template #content>
              <div class="search-popper">
                <div v-if="loading" class="popper-loading">
                  <ProgressSpinner style="width: 20px; height: 20px" />
                  Loading...
                </div>
                <div v-else-if="searchResults.length" class="popper-results">
                  <div
                    v-for="show in searchResults.slice(0, 8)"
                    :key="show.id"
                    class="popper-result-item"
                    @click="selectShow(show)"
                  >
                    <img
                      v-if="show.image?.medium"
                      :src="show.image.medium"
                      :alt="show.name"
                      class="result-image"
                    />
                    <div class="result-info">
                      <p class="result-name">{{ show.name }}</p>
                      <p class="result-genres">
                        {{ show.genres?.slice(0, 2).join(", ") }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else-if="searchQuery && !loading" class="popper-empty">
                  No shows found for "{{ searchQuery }}"
                </div>
              </div>
            </template>
          </Popover>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useShows } from "./composables/useShows";
import InputText from "primevue/inputtext";
import Popover from "primevue/popover";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: { InputText, Popover, ProgressSpinner },
  setup() {
    const router = useRouter();
    const searchInput = ref(null);
    const popover = ref(null);
    const showPopper = ref(false);
    const { searchQuery, searchResults, loading, runSearch } = useShows();

    // Debounced search function
    let searchTimeout = null;
    function debouncedSearch() {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      if (searchQuery.value.trim()) {
        showPopper.value = true;
      }
      searchTimeout = setTimeout(() => {
        handleSearch();
      }, 500);
    }

    function handleSearch() {
      const query = searchQuery.value?.trim();
      if (!query) {
        router.push({ path: "/" });
        showPopper.value = false;
        return;
      }
      router.push({ path: "/search", query: { q: query } });
      runSearch(query);
    }

    function selectShow(show) {
      router.push(`/show/${show.id}`);
      searchQuery.value = "";
      showPopper.value = false;
    }

    // Sync search input with route query
    watch(
      () => router.currentRoute.value,
      (newRoute) => {
        if (newRoute.path !== "/search") {
          searchQuery.value = "";
        }
      },
    );

    return {
      searchInput,
      popover,
      showPopper,
      searchQuery,
      searchResults,
      loading,
      debouncedSearch,
      selectShow,
    };
  },
};
</script>

<style>
:root {
  color-scheme: light;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background: #080f1b;
  color: #eef2ff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #181f2f 0%, #0f1a2a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin: 0;
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: bold;
}

.search-container {
  flex: 1;
  max-width: 500px;
  margin-left: auto;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.header-search {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem !important;
  border-radius: 30px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  font-size: 0.9rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.header-search::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.header-search:focus {
  outline: none;
  border-color: rgba(96, 178, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 0 0 3px rgba(96, 178, 255, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  pointer-events: none;
}

.search-popper {
  background: #1a2332;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 0;
  min-width: 400px;
  max-width: 500px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.popper-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  color: #b8c2d4;
  font-size: 0.9rem;
}

.popper-results {
  display: flex;
  flex-direction: column;
}

.popper-result-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.popper-result-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.popper-result-item:last-child {
  border-bottom: none;
}

.result-image {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.result-name {
  margin: 0;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-genres {
  margin: 0.25rem 0 0 0;
  color: #8a94a6;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popper-empty {
  padding: 2rem 1.5rem;
  color: #8a94a6;
  text-align: center;
  font-size: 0.9rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #b8c2d4;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

main {
  flex: 1;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .search-container {
    max-width: 350px;
  }

  .search-popper {
    min-width: 300px;
  }
}

@media (max-width: 640px) {
  .nav-container {
    gap: 1rem;
  }

  .search-container {
    max-width: 100%;
  }

  .search-popper {
    min-width: auto;
    width: 100%;
  }
}
</style>
