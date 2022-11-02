import { createRouter, createWebHistory } from "vue-router";
import TheLanding from '../pages/TheLanding.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: TheLanding,
    },
  ],
});

export default router;
