<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div :class="store.quotes.length > 0 ? 'flex flex-col items-center w-full h-full bg-[#101019]' : 'flex flex-col items-center w-full h-screen bg-[#101019]'">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <TheBurger />
                        <TheSearch />
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
                                <div class="flex flex-col px-7">
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

            <div class="flex lg:w-full h-full lg:bg-[#181624]">
                <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/4">
                    <div class="flex mt-8 w-[15rem] ml-3">
                        <div>
                            <img class="rounded-full w-12 h-12 object-cover" :src="userStore.user?.thumbnail" />
                        </div>
                        <div class="md:ml-4 ml-6">
                            <p class="text-white lg:text-lg xl:text-2xl">{{ userStore.user?.name }}</p>
                            <p class="lg:text-base 2xl:text-lg text-[#CED4DA]">{{ $t("texts.edit_your_profile")}}</p>
                        </div>
                    </div>
                    <div class="flex items-center w-[15rem] ml-3 mt-10">
                        <router-link class="flex" :to="{name: 'newsFeed'}">
                            <HomeIcon />
                            <p class="ml-4 text-white fill-red-500">{{ $t("texts.news_feed") }}</p>
                        </router-link>
                    </div>
                    <div class="flex items-center w-[15rem] ml-3 mt-10">
                        <router-link class="flex" :to="{name: 'movieList'}">
                            <CameraIcon />
                            <p class="ml-4 text-white">{{ $t("texts.list_of_movies") }}</p>
                        </router-link>
                    </div>
                </div>

                <div class="w-full">
                    <div class="flex items-center w-full">
                        <div class="flex items-center lg:ml-20 w-[22.3rem] lg:w-[27rem] xl:w-[37rem] 2xl:w-[42rem] h-24 lg:h-[3.2rem] lg:mt-8 lg:bg-[#24222F] border-0 rounded">
                            <img class="ml-4" src="@/assets/type.svg" />
                            <router-link :to="{name: 'addQuote'}">
                                <p class="ml-2 text-white">{{ $t("feed.write_new_quote") }}</p>
                            </router-link> 
                        </div>
                        <div class="hidden lg:flex items-center mt-8 ml-4">
                            <div class="flex">
                                <img src="@/assets/search-grey.svg" />
                                <Form>
                                    <Field @keypress="submitSearch" v-model="searchValue" class="w-60 ml-3 outline-none bg-inherit text-[#CED4DA] placeholder-white" 
                                    name="search" :placeholder="$t('texts.search')" />
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#181624]">
                        <ThePost 
                        v-for="quote in quoteStore.quotes"
                        v-bind:key="quote.quote"
                        :key="quote.id"
                        :quoteObj="quote"
                        :quote="i18n.global.locale === 'en' ? quote.quote.en : quote.quote.ka"
                        :id="quote.id"
                        :image="imgUrl + quote.image"
                        :comments="quote.comments"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Field, Form } from 'vee-validate';
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import TheBurger from '@/components/General/TheBurger.vue';
import TheSearch from '@/components/Search/TheSearch.vue';
import ThePost from '@/components/NewsFeed/ThePost.vue';
import i18n from '@/i18n/index.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useCrudStore } from "@/stores/crud";
import { useUserStore } from "@/stores/userStore.js"

const userStore = useUserStore();
const store = useCrudStore()
const authStore = useAuthStore();
const router = useRouter();
const quoteStore = useCrudStore();
const searchValue = ref('');
const lang = ref(false);
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

window.Echo.channel("add-comment").listen('.new-comment', (e) => {

    //fetch posts again
    console.log(e)
    quoteStore.getQuotes();
})

window.Echo.channel("add-like").listen('.new-like', (e) => {

//fetch posts again
console.log(e)
quoteStore.getQuotes();
})

onMounted(()=>{
    useUserStore().getUser();
})

const submitSearch = () => {
        axiosInstance
        .post("search", {
            search: searchValue.value
        })
        .then((response) => {
          quoteStore.quotes = [];
          quoteStore.quotes = response.data
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        }); 
}


</script>