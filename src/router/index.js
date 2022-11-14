import { createRouter, createWebHistory } from "vue-router";
import TheLanding from '../pages/TheLanding.vue';
import PersonalProfile from '../pages/PersonalProfile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: TheLanding,
    },
    {
      path: "/profile",
      name: "profile",
      component: PersonalProfile,
    },
  ],
});

export default router;
