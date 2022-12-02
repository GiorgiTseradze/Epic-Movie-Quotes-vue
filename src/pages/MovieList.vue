<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex flex-col items-center w-full h-screen bg-[#181623]">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <div class="flex lg:hidden">
                            <img src="@/assets/list.svg" />
                        </div>

                        <div class="flex lg:hidden">
                            <div class="flex">
                                <img src="@/assets/notification.svg" />
                            </div>
                        </div>

                        <div class="hidden lg:flex w-full justify-between">
                            <div class="flex items-center text-[#DDCCAA] text-medium font-bold ml-20">
                            MOVIE QUOTES
                            </div>
                            <div class="flex items-center">
                                <div>
                                    <img src="@/assets/notification.svg" />
                                </div>
                                <div class="flex px-7">
                                    <div>
                                        <button @click="handleLang" class="flex items-center">
                                            <p class="text-white">{{i18n.global.locale === 'en' ? "ENG" : "KA"}}</p>
                                            <img class="w-3 ml-2" src="@/assets/down-arrow.svg" />
                                        </button>
                                    </div>

                                    <div v-if="lang" class="text-white bg-[#24222F] fixed mt-8 rounded">
                                        <div class="pr-5 pb-2 border-b-[0.06rem] border-[#CED4DA]">
                                            <button @click="changeLangEn">ENG</button>
                                        </div>
                                        <div class="py-2"> 
                                            <button @click="changeLangKa">KA</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center text-white border-[0.06rem] p-2 mr-10 rounded w-24">
                                    <form @click="handleLogout">
                                        <button>{{ $t("auth.log_out")}}</button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center lg:hidden w-full bg-[#181623]">
                <div class="flex flex-col justify-center w-[22.3rem] h-24">
                    <div class="flex items-center justify-between w-full">
                        <div class="h-full">
                            <p class="text-white font-medium text-2xl">{{ $t("movie.my_list_of_movies") }}</p>
                        </div>
                        <div class="flex items-center justify-center bg-[rgb(227,18,33)] h-10 w-[7.9rem] text-sm rounded">
                            <router-link :to="{name: 'addMovie'}">
                                <button class="flex items-center justify-center text-white"><img class="mr-2" src="@/assets/add.svg"/>{{ $t("movie.add_movie")}}</button>
                            </router-link>
                        </div>
                    </div>
                    <div>
                        <p class="text-white">
                            ({{ $t("movie.total")}} 25)
                        </p>
                    </div>
                </div>
            </div>

            <div class="lg:flex w-full lg:w-full bg-[#181623]">
                <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/5">
                    <div class="flex mt-8 w-[15rem] ml-3">
                        <div>
                            <img src="@/assets/movie-female.svg" />
                        </div>
                        <div class="md:ml-4 ml-6">
                            <p class="text-white lg:text-lg xl:text-2xl">Nino Tabagari</p>
                            <p class="lg:text-base 2xl:text-lg text-[#CED4DA]">{{ $t("texts.edit_your_profile") }}</p>
                        </div>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <HomeIcon />
                        <p class="ml-4 text-white fill-red-500">{{ $t("texts.news_feed") }}</p>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <CameraIcon />
                        <p class="ml-4 text-white">{{ $t("texts.list_of_movies") }}</p>
                    </div>
                </div>
                <div>
                    <div class="hidden lg:block w-full px-7 bg-[#181623] h-[5rem]">
                        <div class="flex items-center justify-between w-full">
                            <div class="flex h-full">
                                <p class="text-white font-medium text-2xl">{{ $t("movie.my_list_of_movies") }}</p>
                                <p class="text-white ml-4 font-medium text-2xl">({{ $t("movie.total") }} 25)</p>
                            </div>
                            
                            <div class="flex items-center justify-center h-[5rem]">
                                    <div class="flex lg:ml-36 xl:ml-60 2xl:ml-80">
                                        <img src="@/assets/search.svg" />
                                        <input class="w-16 ml-3 outline-none bg-inherit text-[#CED4DA]" placeholder="Search" />
                                    </div>
                                    <div class="flex items-center justify-center bg-[#E31221] h-10 w-[7rem] rounded">
                                    <router-link :to="{name: 'addMovie'}">
                                        <button class="flex items-center justify-center text-white text-sm"><img class="px-2" src="@/assets/add.svg"/>{{ $t("movie.add_movie") }}</button>
                                    </router-link> 
                                </div>
                            </div>
                            
                     </div>
                    </div>
                    <div class="flex flex-col lg:grid lg:grid-cols-3 w-full lg:w-full">
                        <TheMovie 
                        v-for="movie in movieStore.movies"
                        :key="movie.id"
                        v-bind:key="movie.name"
                        :name="i18n.global.locale === 'en' ? movie.name.en : movie.name.ka"
                        :id="movie.id"
                        :image="imgUrl + movie.image"
                        />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TheMovie from '@/components/Movie/TheMovie.vue';
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import i18n from '@/i18n/index.js'
import { useAuthStore } from "@/stores/auth";
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useRouter } from 'vue-router'
import { useCrudStore } from "@/stores/crud";

const movieStore = useCrudStore();
const authStore = useAuthStore();
const router = useRouter();

const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;

const handleLogout = () => {
    axiosInstance
        .post("logout")
        .then(() => {
            authStore.authenticated = false;
            router.push({name: "landing"})
        })
        .catch((error) => {
          console.log(error)    
        });
}

const lang = ref(false);

const handleLang = () => {
    return lang.value = !lang.value
}

const changeLangEn = () => {
    i18n.global.locale = 'en'
    lang.value = !lang.value
}

const changeLangKa = () => {
    i18n.global.locale = 'ka'
    lang.value = !lang.value
}
</script>