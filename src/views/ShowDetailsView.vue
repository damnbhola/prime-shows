<template>
  <div class="details-page">
    <button class="back-button" @click="$router.back()">← Back</button>

    <div class="details-card" v-if="show">
      <div class="hero">
        <img
          :src="show.image?.original || show.image?.medium || placeholder"
          :alt="show.name"
        />
      </div>
      <div class="content">
        <h2>{{ show.name }}</h2>
        <div class="meta">
          <span class="badge" v-for="genre in show.genres" :key="genre">{{
            genre
          }}</span>
          <span class="rating"
            >Rating: {{ show.rating?.average ?? "N/A" }}</span
          >
        </div>
        <p class="summary" v-html="show.summary"></p>
        <div class="details-grid">
          <div>
            <strong>Premiered</strong>
            <p>{{ show.premiered || "Unknown" }}</p>
          </div>
          <div>
            <strong>Network</strong>
            <p>{{ show.network?.name || show.webChannel?.name || "N/A" }}</p>
          </div>
          <div>
            <strong>Schedule</strong>
            <p>
              {{ show.schedule?.days?.join(", ") || "N/A" }}
              {{ show.schedule?.time || "" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="status-bar" v-else-if="loading">Loading details…</div>
    <div class="status-bar error" v-else-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchShowById } from "../api/tvmaze";

export default {
  props: ["id"],
  setup(props) {
    const show = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const placeholder = "https://via.placeholder.com/640x360?text=No+image";

    async function loadShow() {
      loading.value = true;
      error.value = null;
      try {
        show.value = await fetchShowById(props.id);
      } catch (err) {
        error.value = err.message || "Unable to load show details.";
      } finally {
        loading.value = false;
      }
    }

    onMounted(loadShow);

    return { show, loading, error, placeholder };
  },
};
</script>

<style>
.details-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-button {
  width: fit-content;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #eef2ff;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  cursor: pointer;
}

.details-card {
  display: grid;
  grid-template-columns: minmax(280px, 380px) 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero img {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  min-height: 100%;
}

.content h2 {
  margin-top: 0;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1rem 0;
  align-items: center;
}

.badge {
  background: rgba(91, 134, 229, 0.16);
  color: #d8e6ff;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.88rem;
}

.rating {
  margin-left: auto;
  font-weight: 600;
  color: #a8c8ff;
}

.summary {
  line-height: 1.8;
  color: #dbe5ff;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.details-grid strong {
  display: block;
  margin-bottom: 0.35rem;
  color: #c2d2ff;
}

.status-bar {
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
}

.status-bar.error {
  background: rgba(190, 54, 54, 0.18);
  color: #ffd3d3;
}

@media (max-width: 860px) {
  .details-card {
    grid-template-columns: 1fr;
  }
}
</style>
