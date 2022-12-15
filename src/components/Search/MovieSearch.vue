<template>
    <div v-if="search" @click="handleSearch" class="lg:hidden flex justify-center fixed w-screen h-[100rem] z-40"></div>        
    <div class="z-41 lg:hidden">
        <div @click="handleSearch" class="flex lg:hidden ml-64 z-50">
            <img src="@/assets/search.svg" />
        </div>
        
        <div v-if="search" class="absolute flex flex-col md:mx-auto lg:hidden w-full left-0 top-0 bg-[#11101A] h-[35rem] z-50">
            <div class="flex h-20 border-b-[0.06rem] border-[#40414A] w-full">
                <div @click="handleSearch" class="cursor-pointer flex items-center ml-10">
                    <img class="w-5" src="@/assets/back.svg" />
                </div>
                <div class="flex mt-7 ml-2">
                    <Form>
                        <Field @keypress="submitSearch" v-model="searchValue" class="w-60 ml-3 outline-none bg-inherit text-[#CED4DA] placeholder-white" 
                        name="search" placeholder="Search" />
                    </Form>
                </div>
            </div>
            <div class="flex flex-col text-[#65646A] ml-16 mt-5">
            <p>{{ $t("movie.enter_movie_name") }}</p>
                <p class="text-white mt-2">{{result}}</p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import { Field, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useCrudStore } from "@/stores/crud";

const quoteStore = useCrudStore();
const search = ref(false);
const handleSearch = () => {
    search.value = !search.value
    result.value = '';
}
const movieStore = useCrudStore();
const searchValue = ref(null);
const result = ref('');

const submitSearch = computed(() => {
    result.value = "Nothing found yet!"
    movieStore.movies.filter((item) => {
        if(item.name.en.includes(searchValue.value)) {
            result.value = "Content found!"
            return item; 
        } else if (searchValue.value === "") {
            return item;
        }
    })
})

</script>