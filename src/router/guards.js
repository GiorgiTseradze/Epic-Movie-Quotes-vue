import { useAuthStore } from "@/stores/auth";

export const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/forbidden";
  } 
}
export const isNotAuthenticated = () => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    return "/news-feed";
  } 
};