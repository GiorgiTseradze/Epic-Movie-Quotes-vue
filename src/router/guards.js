import { useAuthStore } from "@/stores/auth";

export const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/forbidden";
  } 
};

export default isAuthenticated;