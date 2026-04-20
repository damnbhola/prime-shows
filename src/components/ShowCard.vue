<template>
  <router-link :to="`/show/${show.id}`" class="show-card">
    <div class="poster">
      <img :src="show.image?.medium || placeholder" :alt="show.name" />
    </div>
    <div class="info">
      <strong>{{ show.name }}</strong>
      <span>{{ show.genres?.slice(0, 2).join(" · ") || "Unknown genre" }}</span>
      <span class="rating">⭐ {{ show.rating?.average ?? "N/A" }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    show: { type: Object, required: true },
  },
  data() {
    return {
      placeholder: "https://via.placeholder.com/210x295?text=No+image",
    };
  },
};
</script>

<style>
.show-card {
  display: flex;
  flex-direction: column;
  width: 240px;
  max-width: 100%;
  min-width: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #eef2ff;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

@media (max-width: 768px) {
  .show-card {
    width: 100%;
  }
}

.show-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.2);
}

.poster img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
}

.info {
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
}

.info strong {
  font-size: 1rem;
  line-height: 1.3;
  color: #ffffff;
}

.info span {
  font-size: 0.92rem;
  color: #b8c2d4;
}

.rating {
  color: #d0e7ff;
}
</style>
