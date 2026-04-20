<template>
  <section class="home-page">
    <div class="hero-section" v-if="topRatedShows.length">
      <Carousel
        :value="topRatedShows"
        :numVisible="1"
        :numScroll="1"
        :circular="true"
        :autoplayInterval="5000"
        class="hero-carousel"
      >
        <template #item="slotProps">
          <div class="hero-slide">
            <div class="hero-content">
              <h1>{{ slotProps.data.name }}</h1>
              <p>{{ slotProps.data.genres?.join(" · ") }}</p>
              <p class="rating">⭐ {{ slotProps.data.rating?.average }}</p>
              <Button
                @click="viewShow(slotProps.data.id)"
                label="Watch Now"
                class="hero-watch-button"
              />
            </div>
            <div class="hero-image">
              <img
                :src="
                  slotProps.data.image?.original || slotProps.data.image?.medium
                "
                :alt="slotProps.data.name"
              />
            </div>
          </div>
        </template>
      </Carousel>
    </div>

    <div class="status-bar" v-if="loading">
      <ProgressSpinner style="width: 20px; height: 20px" />
      Loading shows…
    </div>
    <div class="status-bar error" v-if="error">{{ error }}</div>

    <section class="featured-section">
      <h2>Featured by Genre</h2>
      <section class="genre-grid">
        <genre-section
          v-for="section in featuredGenres"
          :key="section.genre"
          :genre="section.genre"
          :shows="section.shows"
        />
      </section>
    </section>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useShows } from "../composables/useShows";
import GenreSection from "../components/GenreSection.vue";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Carousel from "primevue/carousel";

export default {
  components: { GenreSection, Button, ProgressSpinner, Carousel },
  setup() {
    const router = useRouter();
    const { featuredGenres, loading, error, loadShows, shows } = useShows();

    const topRatedShows = computed(() => {
      if (shows.value.length === 0) return [];
      return shows.value
        .filter((show) => show.rating?.average)
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
        .slice(0, 5);
    });

    onMounted(() => {
      loadShows();
    });

    function viewShow(id) {
      router.push(`/show/${id}`);
    }

    return {
      featuredGenres,
      loading,
      error,
      viewShow,
      topRatedShows,
    };
  },
};
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-section {
  position: relative;
  height: 60vh;
  min-height: 400px;
  background: linear-gradient(135deg, #181f2f 0%, #0f1a2a 100%);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.hero-carousel {
  height: 100%;
}

.hero-carousel .p-carousel-item {
  height: 500px;
}

.hero-slide {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  z-index: 2;
  max-width: 45%;
  min-height: 100%;
}

.hero-content h1 {
  font-size: 3rem;
  margin: 0 0 0.5rem;
  color: #ffffff;
}

.hero-content p {
  margin: 0.5rem 0;
  color: #b8c2d4;
  font-size: 1.2rem;
}

.hero-content .rating {
  color: #ffd700;
  font-size: 1.1rem;
}

.hero-watch-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.hero-watch-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.hero-image {
  flex: 1;
  min-width: 45%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.hero-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(15, 26, 42, 0.9) 0%, transparent 50%);
  z-index: 1;
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

.genre-grid {
  display: grid;
  gap: 2rem;
}

.featured-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.featured-section h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 300px;
  }

  .hero-slide {
    flex-direction: column;
    height: auto;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-image {
    min-width: 100%;
    height: 260px;
  }
}
</style>
