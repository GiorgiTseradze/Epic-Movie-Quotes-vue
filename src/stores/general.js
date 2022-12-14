import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  const fileModel = ref(null)
  return { fileModel };
});