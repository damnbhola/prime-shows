<template>
  <section class="genre-section">
    <div class="heading-row">
      <h2>{{ genre }}</h2>
      <span>{{ shows.length }} shows</span>
    </div>
    <Carousel
      :value="shows"
      :numVisible="6"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <ShowCard :show="slotProps.data" />
      </template>
    </Carousel>
  </section>
</template>

<script>
import Carousel from "primevue/carousel";
import ShowCard from "./ShowCard.vue";

export default {
  components: { Carousel, ShowCard },
  props: {
    genre: { type: String, required: true },
    shows: { type: Array, required: true },
  },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: "2000px",
          numVisible: 7,
          numScroll: 1,
        },
        {
          breakpoint: "1700px",
          numVisible: 6,
          numScroll: 1,
        },
        {
          breakpoint: "1400px",
          numVisible: 5,
          numScroll: 1,
        },
        {
          breakpoint: "1200px",
          numVisible: 4,
          numScroll: 1,
        },
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
};
</script>

<style>
.genre-section {
  padding: 1rem 0;
  max-width: 100%;
  overflow: hidden;
}

.heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.heading-row h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #ffffff;
}

.heading-row span {
  color: #a8b8e6;
}

.p-carousel {
  background: transparent;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.p-carousel .p-carousel-content {
  overflow: visible;
  height: 100%;
}

.p-carousel .p-carousel-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.p-carousel .p-carousel-items {
  display: flex;
  gap: 0;
}

.p-carousel-indicators {
  display: none;
}

.p-carousel-item {
  padding: 0 0.5rem;
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  align-items: stretch;
}


</style>
