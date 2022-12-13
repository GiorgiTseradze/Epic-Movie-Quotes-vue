import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const user = ref([]);


  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/me");
          user.value = response.data.user;
    } catch(error) {
      console.log(error);
    }
  }


  return {user, getUser };
});