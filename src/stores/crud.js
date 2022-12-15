import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/index.js";

export const useCrudStore = defineStore("crud", () => {
  const movies = ref([]);
  const quotes = ref([]);
  const savedQuotes = ref([]);
  const page = ref(1);
  
  const getMovies = async () => {
    try {
      const response = await axiosInstance.get("/movies/show");
          movies.value = response.data;
    } catch(error) {
    }
  }

  const quotesRefresh = async () => {
    try {
      const response = await axiosInstance.post("/refresh",{
        number:quotes.value.length
      });
          quotes.value = response.data;
    } catch(error) {
    }
  }

  const getQuotes = async (isRefresh=false) => {
    if(isRefresh){
      quotes.value = [];
      page.value = 1;
    }
    try {
      const response = await axiosInstance.get("/quotes/show?page="+page.value++);
          quotes.value.push(...response.data.data);
          savedQuotes.value.push(...response.data.data);
    } catch(error) {
    }
  }

  const getMovie=(movieId)=>{
    axiosInstance.get('movies/'+movieId).then((response)=>{
      movie.value = response.data;
      genres.value = JSON.parse(response.data.genre);
      quotes.value = response.data.quotes;
  })
  }

  onMounted(() => {
    getQuotes();
    getMovies();
  });


  return { movies, quotes, getMovies, getQuotes,savedQuotes,quotesRefresh ,getMovie};
});