import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/index.js";

export const useCrudStore = defineStore("crud", () => {
  const movies = ref([]);
  const quotes = ref([]);
  
  const getMovies = async () => {
    try {
      const response = await axiosInstance.get("/movies/show");
        response.data.forEach((movie) => {
          movies.value.push({
            id: movie.id,
            name: movie.name,
            genre: movie.genre,
            director: movie.director,
            description: movie.description,
            image: movie.image,
          });
        });
        console.log(response)
    } catch(error) {
      console.log(error);
    }
  }

  const getQuotes = async () => {
    try {
      const response = await axiosInstance.get("/quotes/show");
        response.data.forEach((quote) => {
          quotes.value.push({
            id: quote.id,
            quote: quote.quote,
            image: quote.image,
            movie: quote.movie_id,
            user: quote.user_id,
            comments: quote.comments,
          });
        });
        console.log(response)
    } catch(error) {
      console.log(error);
    }
  }

  onMounted(() => {
    getQuotes();
    getMovies();
  });


  return { movies, quotes, getMovies, getQuotes };
});