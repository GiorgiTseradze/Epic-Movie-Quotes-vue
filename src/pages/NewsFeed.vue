<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex flex-col items-center w-full h-full bg-[#101019]">
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
                                <div class="flex flex-col px-7">
                                    <div>
                                        <button @click="handleLang" class="flex items-center">
                                            <p class="text-white">Eng</p>
                                            <img class="w-3 ml-2" src="@/assets/down-arrow.svg" />
                                        </button>
                                    </div>

                                    <div v-if="lang" class="text-white bg-[#24222F] fixed mt-8 rounded">
                                        <div class="pr-5 pb-2 border-b-[0.06rem] border-[#CED4DA]">
                                            <button>ENG</button>
                                        </div>
                                        <div class="py-2">
                                            <button>KA</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center text-white border-[0.06rem] p-2 mr-10 rounded w-24">
                                    <button>Log out</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="flex lg:w-full lg:bg-[#181624]">
                <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/4">
                    <div class="flex mt-8 w-[15rem] ml-3">
                        <div>
                            <img src="@/assets/movie-female.svg" />
                        </div>
                        <div class="ml-6">
                            <p class="text-white text-2xl">Nino Tabagari</p>
                            <p class="text-[#CED4DA]">Edit your profile</p>
                        </div>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <HomeIcon />
                        <p class="ml-4 text-white fill-red-500">News Feed</p>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <CameraIcon />
                        <p class="ml-4 text-white">List of movies</p>
                    </div>
                </div>

                <div class="w-full">
                    <div class="flex items-center w-full">
                        <div class="flex items-center lg:ml-20 w-[22.3rem] lg:w-[27rem] xl:w-[37rem] 2xl:w-[42rem] h-24 lg:h-[3.2rem] lg:mt-8 lg:bg-[#24222F] border-0 rounded">
                            <img class="ml-4" src="@/assets/type.svg" />
                            <p class="ml-2 text-white">Write new quote</p>
                        </div>
                        <div class="hidden lg:flex items-center mt-8 ml-4">
                            <button class="flex">
                                <img src="@/assets/search-grey.svg" />
                                <p class="ml-2 text-[#CED4DA]"> Search by</p>
                            </button>
                        </div>
                    </div>

                    <div class="bg-[#181624]">
                        <ThePost />
                        <ThePost />
                    </div>
                </div>

            </div>
            

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import ThePost from '@/components/NewsFeed/ThePost.vue';

const lang = ref(false);

const handleLang = () => {
    console.log(lang)
    return lang.value = !lang.value
}
</script>