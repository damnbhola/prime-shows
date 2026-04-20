<template>
  <section class="search-page">
    <div class="search-header">
      <h1>{{ searchHeader }}</h1>
      <p class="result-count">
        {{ searchResults.length }} result{{
          searchResults.length !== 1 ? "s" : ""
        }}
        found
      </p>
    </div>

    <div class="status-bar" v-if="loading">
      <ProgressSpinner style="width: 20px; height: 20px" />
      Loading shows…
    </div>
    <div class="status-bar error" v-if="error">{{ error }}</div>

    <section v-if="searchResults.length" class="search-results">
      <genre-section
        :genre="`Results for '${searchQuery}'`"
        :shows="searchResults"
      />
    </section>

    <section v-else-if="!loading" class="empty-state">
      <p>No shows found matching "{{ searchQuery }}"</p>
      <p class="suggestion">Try searching with different keywords</p>
    </section>
  </section>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useShows } from "../composables/useShows";
import GenreSection from "../components/GenreSection.vue";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: { GenreSection, ProgressSpinner },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { searchQuery, searchResults, loading, error, runSearch } =
      useShows();

    const searchHeader = computed(() => {
      return `Search Results`;
    });

    onMounted(() => {
      const query = route.query.q;
      if (typeof query === "string" && query.trim()) {
        searchQuery.value = query.trim();
        runSearch(query.trim());
      } else {
        // Redirect to home if no search query
        router.push("/");
      }
    });

    // Watch for route query changes and update search
    watch(
      () => route.query.q,
      (newQuery) => {
        if (typeof newQuery === "string" && newQuery.trim()) {
          searchQuery.value = newQuery.trim();
          runSearch(newQuery.trim());
        } else {
          router.push("/");
        }
      },
    );

    return {
      searchQuery,
      searchResults,
      loading,
      error,
      searchHeader,
    };
  },
};
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.search-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.search-header h1 {
  margin: 0;
  font-size: 2.2rem;
  color: #ffffff;
}

.result-count {
  margin: 0;
  color: #8a94a6;
  font-size: 0.95rem;
}

.status-bar {
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  color: #d8e0ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-bar.error {
  background: rgba(190, 54, 54, 0.18);
  color: #ffd3d3;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #8a94a6;
}

.empty-state p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.empty-state .suggestion {
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
