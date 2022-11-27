import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/index.js";

export const useCrudStore = defineStore("crud", () => {
  const movies = ref([]);
  
  onMounted(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get("movies/show");
          response.data.forEach((movie) => {
            movies.value.push({
              id: movie.id,
              image: movie.image,
              title: movie.title,
              director: movie.director,
              description: movie.description
            });
          });
          console.log(response.data)
      } catch(error) {
        console.log(error);
      }
    }
    getMovies();
  })


  return { movies };
});