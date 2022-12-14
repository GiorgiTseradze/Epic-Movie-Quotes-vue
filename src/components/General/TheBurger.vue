<template>
    <div v-if="burger" @click="handleBurger" class="lg:hidden flex justify-center fixed w-screen h-[100rem] backdrop-blur-sm z-40"></div>        
    <div class="z-41">
        <div @click="handleBurger" class="cursor-pointer flex lg:hidden z-41">
            <img src="@/assets/list.svg" />
        </div>
        
        <div v-if="burger" class="absolute md:mx-auto lg:hidden w-2/3 left-0 top-0 bg-[#11101A] h-[35rem] z-50">
            <div class="flex flex-col sm:items-center h-full w-full">
                <div class="flex mt-8 w-[12rem] sm:w-[16rem] ml-6">
                    <div class="w-[3.5rem] md:w-[4rem] rounded-full">
                        <img class="w-[3.5rem] rounded-full" :src="userStore?.user?.thumbnail" />
                    </div>
                    <div class="ml-4 md:ml-0">
                        <p class="text-white md:text-lg">{{ userStore?.user?.name }}</p>
                        <p @click="$router.push({name: 'profile'})" class="cursor-pointer lg:text-base md:text-lg text-[#CED4DA]">{{ $t("texts.edit_your_profile")}}</p>
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
                <div class="flex justify-center items-center text-white border-[0.06rem] p-2 mr-10 rounded w-24 ml-5 mt-7">
                    <form @click="handleLogout">
                        <button>{{ $t("auth.log_out")}}</button>
                    </form>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const burger = ref(false);

const handleBurger = () => {
    burger.value = !burger.value
}

const handleLogout = () => {
    axiosInstance
        .post("logout")
        .then(() => {
            authStore.authenticated = false
            setTimeout(()=> {router.push({name: "landing"})}, 200) 
        })
        .catch((error) => {
          console.log(error)    
        });
}

</script>