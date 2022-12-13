<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>
        <div class="flex flex-col items-center w-full h-full overflow-scroll bg-[#181623]">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <TheBurger />
                        <div class="flex lg:hidden">
                            <div class="flex">
                                <TheNotification />
                            </div>
                        </div>

                        <div class="hidden lg:flex w-full justify-between">
                            <div class="flex items-center text-[#DDCCAA] text-medium font-bold ml-20">
                            MOVIE QUOTES
                            </div>
                            <div class="flex items-center">
                                <div>
                                    <TheNotification />
                                </div>
                                <div class="flex px-7">
                                    <div>
                                        <button @click="handleLang" class="flex items-center cursor-pointer">
                                            <p class="text-white">{{locale === 'en' ? "ENG" : "KA"}}</p>
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

            <div class="flex flex-col items-center justify-center lg:hidden w-full bg-[#181623]">
                <div class="flex flex-col w-[20rem] border-b-2 pb-10 border-[#54535A]">
                    <div class="flex flex-col justify-center h-40 mt-10">
                        <img class="w-[20rem]  h-[18rem] object-fill rounded" :src="imgUrl + movie?.image" />
                    </div>
                    <div>
                        <p class="flex items-center text-[#DDCCAA] text-2xl font-bold mt-7">
                            {{ locale === 'en' ? movie?.name?.en : movie?.name?.ka }}
                        </p>
                    </div>
                    <div class="flex">
                        <div v-for="genre in genres" :key="genre" class="w-max mt-7 mr-2 bg-gray-500 rounded">
                            <p class="font-bold text-white px-2 py-1" >
                                {{ genre }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold mt-7 text-[#CED4DA]">
                            {{ $t("movie.director") }}: {{ locale === 'en' ? movie?.director.en : movie?.director.ka }}
                        </p>
                    </div>
                    <div>
                        <p class="text-[#CED4DA] mt-7">
                            {{ $t("movie.description") }}: {{ locale === 'en' ? movie?.description.en : movie?.description.ka }}
                        </p>
                    </div>
                    <div>
                        <div class="flex items-center justify-center bg-[rgb(227,18,33)] h-10 w-[7.9rem] mt-5 text-sm rounded">
                            <router-link :to="{name: 'addMovieQuote', params:{movieId:movieId}}" class="cursor-pointer">
                                <div class="flex items-center justify-center text-white">
                                    <img class="mr-2 p-1" src="@/assets/add.svg"/>
                                    {{ $t("feed.add_quote")}}
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-center w-full pb-10 pt-10">
                    <div class="flex flex-col w-[20rem]">
                        <div class="flex flex-col text-white">
                            <p>
                                All Quotes
                            </p>
                            <p>
                                (Total {{ quotes?.length }})
                            </p>
                        </div>
                        <div class="flex flex-col w-full bg-[#181623]">
                            <div v-for="quote in quotes" :key="quote.id" class="flex flex-col mt-7 rounded">
                                <div>
                                    <img class="w-[20rem] h-[10rem] object-fill" :src="imgUrl + quote?.image" />
                                </div>
                                <div class="mt-5 pb-5 border-b-2 border-[#54535A]">
                                    <p class="flex text-white">{{ locale === 'en' ? quote?.quote.en : quote?.quote.ka }}</p>
                                </div>
                                <div class="flex relative items-center justify-between text-white mt-5">
                                    <div class="flex">
                                            <div class="flex">
                                                <p>{{quote.comments?.length}}</p>
                                            <img class="ml-2" src="@/assets/comment.svg" />
                                        </div>
                                        <div class="flex ml-2">
                                                <p>{{quote.likes?.length}}</p>
                                            <img class="ml-2" src="@/assets/heart.svg" />
                                        </div>
                                    </div>
                                    <div class="flex absolute right-0">
                                        <DotsMobile :id="quote.id" :movieId="movieId"/>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:flex w-full lg:w-full h-screen">
                <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/5">
                    <div class="flex mt-8 w-[15rem] ml-3">
                        <div>
                            <img class="rounded-full w-12 h-12 object-cover" :src="userStore.user?.thumbnail" />
                        </div>
                        <div class="md:ml-4 ml-6">
                            <p class="text-white lg:text-lg xl:text-2xl">{{userStore.user?.name}}</p>
                            <p @click="$router.push({name: 'profile'})" class="cursor-pointer lg:text-base 2xl:text-lg text-[#CED4DA]">{{ $t("texts.edit_your_profile") }}</p>
                        </div>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <router-link class="flex" :to="{name: 'newsFeed'}">
                            <HomeIcon />
                            <p class="ml-4 text-white fill-red-500">{{ $t("texts.news_feed") }}</p>
                        </router-link>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <router-link class="flex" :to="{name: 'movieList'}">
                            <CameraIcon />
                            <p class="ml-4 text-white">{{ $t("texts.list_of_movies") }}</p>
                        </router-link>
                    </div>
                </div>

                <div>
                    <div class="hidden lg:block w-full px-7 bg-[#181623]">
                        <div class="flex flex-col items-center justify-between w-full">
                            <div class="flex flex-col lg:w-[40rem] xl:w-[55rem] 2xl:w-[60rem] border-b-2 pb-10 border-[#54535A]">
                                <div class="flex">
                                    <div class="flex flex-col lg:w-[20rem] xl:w-[30rem] lg:h-[15rem] xl:h-[20rem] mt-10 rounded">
                                        <img class="w-[100%] h-[70%] rounded object-fill" :src="imgUrl + movie?.image" />
                                    </div>
                                    <div class="flex flex-col lg:w-[20rem] xl:w-[25rem] 2xl:w-[30rem] ml-4">
                                        <div class="flex items-center justify-between">
                                            <p class="flex items-center text-[#DDCCAA] text-2xl font-bold mt-7">
                                                {{ locale === 'en' ? movie?.name.en : movie?.name.ka }}
                                            </p>
                                            <div class="flex">
                                                <div class="flex items-center justify-center w-14 mt-5 border-[#40414A] border-r-2 ">
                                                    <button class="pr-2 z-10" @click="$router.push({name:'updateMovie',params:{movieId:movie.id}})">
                                                        <img src="@/assets/edit.svg" />
                                                    </button>
                                                </div>
                                                <div class="flex items-center justify-center mt-5 h-10">
                                                    <button @click="handleDelete" class="px-5  z-10">
                                                        <img src="@/assets/delete.svg" />
                                                    </button>
                                                </div>
                                            </div>
          
                                        </div>
                                        <div class="flex">
                                            <div v-for="genre in genres" :key="genre" class="flex w-max mt-4 mr-2 bg-gray-500 rounded">
                                                <p class="font-bold text-white px-2 py-1" >
                                                    {{ genre }}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="font-bold mt-4 text-[#CED4DA]">
                                                {{ $t("movie.director") }}: {{ locale === 'en' ? movie?.director.en : movie.director?.ka }}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-[#CED4DA] mt-4">
                                                {{ $t("movie.description") }}: {{ locale === 'en' ? movie?.description.en : movie?.description.ka }}
                                            </p>
                                        </div>
                                    </div> 
                                </div>
                                
                                <div class="flex items-center h-10">
                                    <div class="flex h-8 text-white border-r-2 border-[#54535A] pr-3">
                                        <div class="flex mt-1">
                                            <p>
                                                {{ $t("movie.quotes") }}
                                            </p>
                                            <p class="ml-2">
                                                ({{ $t("movie.total") }} {{movie?.quotes?.length}})
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center bg-[rgb(227,18,33)] h-10 w-[7.9rem] ml-5 text-sm rounded">
                                        <router-link :to="{name: 'addMovieQuote', params:{movieId:movieId}}" class="cursor-pointer">
                                            <button class="flex items-center justify-center text-white">
                                                <img class="mr-2 p-1" src="@/assets/add.svg"/>
                                                {{ $t("feed.add_quote")}}
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>       

                            <div class="flex w-full pb-10 pt-10">
                                <div class="flex flex-col lg:w-[30rem] xl:w-[35rem]">

                                    <div v-for="quote in quotes" :key="quote" class="flex flex-col w-[30rem] xl:w-[35rem] pb-10">
                                        <div class="flex w-full justify-center bg-[#11101A] pb-5 rounded">
                                            <div class="flex flex-col mt-7 rounded">
                                                <div class="flex relative w-[28rem] xl:w-[32rem] lg:h-[11rem] border-b-2 border-[#54535A]">
                                                    <div class="w-[12rem] h-[8rem]">
                                                        <img class="object-fill w-[12rem] h-[8rem]" :src="imgUrl + quote?.image" />
                                                    </div>
                                                    <div class="w-[17rem] mt-5 ml-3 pb-5">
                                                        <p class="flex text-white">{{ locale === 'en' ? quote?.quote.en : quote?.quote.ka }}</p>
                                                    </div>
                                                    <Dots :id="quote.id" :movieId="movieId"/>   
                                                </div>
                                                <div class="flex items-center justify-between text-white mt-5">
                                                    <div class="flex">
                                                            <div class="flex">
                                                                <p class="text-white">{{quote.comments?.length}}</p>
                                                            <img class="ml-2" src="@/assets/comment.svg" />
                                                        </div>
                                                        <div class="flex ml-2">
                                                                <p class="text-white">{{quote.likes?.length}}</p>
                                                            <img class="ml-2" src="@/assets/heart.svg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import Dots from '@/components/Movie/Dots.vue';
import TheNotification from '@/components/General/TheNotification.vue';
import DotsMobile from '@/components/Movie/DotsMobile.vue';
import i18n from '@/i18n/index.js';
import { useAuthStore } from "@/stores/auth";
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useRoute, useRouter } from 'vue-router';
import { useCrudStore } from "@/stores/crud";
import TheBurger from '@/components/General/TheBurger.vue';
import { useUserStore } from "@/stores/userStore.js"

const userStore = useUserStore();
const movieStore = useCrudStore();
const authStore = useAuthStore();
const router = useRouter();
const movie = ref();
const quotes = ref();
const genres = ref();
const movieId = useRoute().params.movieId;

const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;

const locale = computed(() => i18n.global.locale)
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

const handleDelete = (values) => {
    console.log(values)

    axiosInstance
        .post('delete-movie/'+movieId)
        .then((response) => {
          alert("Movie deleted Successfully!");
          movieStore.getMovies();
          router.push({ name: 'movieList'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

onBeforeMount(()=>{
    axiosInstance.get('movies/'+movieId).then((response)=>{
        console.log(response);
        movie.value = response.data;
        genres.value = JSON.parse(response.data.genre);
        quotes.value = response.data.quotes;
    })

});
</script>