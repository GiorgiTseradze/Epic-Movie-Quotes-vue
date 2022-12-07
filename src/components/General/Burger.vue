<template>
    <div v-if="burger" @click="handleBurger" class="lg:hidden flex justify-center fixed w-screen h-[100rem] backdrop-blur-sm z-40"></div>        
    <div class="z-50">
        <div @click="handleBurger" class="flex lg:hidden z-50">
            <img src="@/assets/list.svg" />
        </div>
        
        <div v-if="burger" class="absolute md:mx-auto lg:hidden w-2/3 left-0 top-0 bg-[#11101A] h-[35rem] z-50">
            <div class="flex flex-col h-full w-full">
                <div class="flex mt-8 w-[12rem] md:w-[16rem] ml-6">
                    <div class="w-[3rem] md:w-[5rem]">
                        <img src="@/assets/movie-female.svg" />
                    </div>
                    <div class="ml-4 md:ml-2">
                        <p class="text-white md:text-lg">Nino Tabagari</p>
                        <p class="lg:text-base md:text-lg text-[#CED4DA]">{{ $t("texts.edit_your_profile")}}</p>
                    </div>
                </div>
                <div class="flex items-center w-[15rem] ml-6 mt-10">
                    <router-link class="flex" :to="{name: 'newsFeed'}">
                        <img src="@/assets/home.svg" />
                        <p class="ml-4 md:text-lg text-white fill-red-500">{{ $t("texts.news_feed") }}</p>
                    </router-link>
                </div>
                <div class="flex items-center w-[15rem] ml-6 mt-10">
                    <router-link class="flex" :to="{name: 'movieList'}">
                        <CameraIcon />
                        <p class="ml-4 md:text-lg text-white">{{ $t("texts.list_of_movies") }}</p>
                    </router-link>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';

const burger = ref(false);

const handleBurger = () => {
    burger.value = !burger.value
}

</script>