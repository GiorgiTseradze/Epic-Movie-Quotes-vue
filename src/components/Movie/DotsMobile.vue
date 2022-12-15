<template>
    <div v-if="open" @click="handleDots" class="flex justify-center fixed w-screen h-screen z-40"></div>        
    <div class="relative z-50">
        <div @click="handleDots" class="cursor-pointer relative">
            <img src="@/assets/dots.svg" alt="dots-icon" />
        </div>
        <div v-if="open" class="flex flex-col absolute rounded mt-2 bg-[#24222F] w-36 h-32 right-0 bottom-2">
            <div class="flex mt-4 ml-4">
                <button @click="$router.push({name:'currentQuote',params:{quoteId:id}})" class="flex items-center">
                    <img src="@/assets/eye.svg" alt="eye-icon" />
                    <p class="ml-2 text-white">{{ $t("feed.view_quote") }}</p>
                </button>
            </div>
            <div class="flex mt-3 ml-4">
                <button @click="$router.push({name:'updateQuote',params:{quoteId:id}})" class="flex items-center">
                    <img src="@/assets/edit.svg" alt="edit-icon" />
                    <p class="ml-2 text-white">{{ $t("profile.edit") }}</p>
                </button>
            </div>
            <div class="flex ml-4 mt-3">
                <button @click="handleDelete" class="flex items-center">
                    <img src="@/assets/delete.svg" alt="delete-icon" />
                    <p class="ml-2 text-white">{{ $t("texts.delete") }}</p>
                </button>
            </div>
        </div>               
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from "@/config/axios/index.js";
import { useCrudStore } from "@/stores/crud";

const quoteStore = useCrudStore();
const movieStore = useCrudStore();
const open = ref(false)

const id = props.id

const handleDots = () => {
    open.value = !open.value;
}

const handleDelete = () => {
    axiosInstance
        .post('delete-quote/'+id)
        .then((response) => {
          movieStore.getMovies();
          quoteStore.quotesRefresh();
          quoteStore.getQuotes();
          router.push({name: 'newsFeed'});
        })
        .catch((error) => {
        });
}

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    }
})

</script>