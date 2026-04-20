import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import ShowDetailsView from "../views/ShowDetailsView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/search", name: "Search", component: SearchView },
  {
    path: "/show/:id",
    name: "ShowDetails",
    component: ShowDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
