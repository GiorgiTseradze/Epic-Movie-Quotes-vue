
<template>
    <div v-if="notification" @click="handleNotification" class="flex justify-center top-20 lg:top-0 lg:right-0 fixed w-screen h-[100rem] z-40"></div>        
    <div class="z-41">
        <div @click="handleNotification" class="flex z-41 w-10 py-2 px-2">
            <img class="ml-[0.55rem]" src="@/assets/notification.svg" />
            <img v-if="notification" class="absolute hidden lg:block mt-8" src="@/assets/polygon.svg" />
        </div>
        
        <div v-if="notification" class="absolute flex flex-col items-center w-full lg:w-[40rem] 2xl:w-[50rem] right-0 lg:right-40 pb-10 top-20 bg-[#11101A] h-max z-50">
            <div class="flex flex-col h-max w-[22rem] lg:w-[40rem] 2xl:w-[50rem]">
                <div class="px-7 py-3 flex justify-between items-center text-white">
                    <p class="text-lg">{{ $t("texts.notifications") }}</p>
                    <p class="underline">{{ $t("texts.mark_all_as_read") }}</p>
                </div>
                <div class="flex mt-2 w-[20rem] lg:w-[37rem] 2xl:w-[47rem] ml-6 px-2 py-2 rounded border-[0.06rem] border-[#363A3E]">
                    <div class="flex flex-col items-center w-[3rem] lg:w-[5rem] lg:h-20 rounded-full">
                        <img class="lg:w-16 py-1" src="@/assets/movie-female.svg" />
                        <p class="mt-1 lg:hidden lg:text-lg text-[#198754]">New</p>
                    </div>
                    <div class="flex flex-col ml-4 lg:text-xl">
                        <div class="hidden lg:flex items-center">
                            <p class="text-white">Nino Tabagari</p>
                            <p class="ml-64 2xl:ml-96 text-[#CED4DA]">5
                            <section class="inline">{{$t("texts.min_ago")}}</section></p>
                        </div>
                        <div class="flex items-center py-1">
                            <img class="w-5 lg:w-7" src="@/assets/thought.svg" />
                            <p class="ml-2 lg:text-xl text-[#CED4DA]">{{$t("texts.commented_to_your")}}
                            <section class="inline"> quote</section>..</p>
                            <p class="mt-1 ml-36 2xl:ml-[17.3rem] hidden lg:block lg:text-lg text-[#198754]">New</p>
                        </div>
                        
                        <div class="lg:hidden">
                            <p class="text-white">Nino Tabagari</p>
                            <div class="flex py-1">
                                <img class="w-5 lg:w-7" src="@/assets/thought.svg" />
                                <p class="ml-2 lg:text-xl text-[#CED4DA]">{{$t("texts.commented_to_your")}}
                                <section class="inline"> quote</section>..</p>
                            </div>
                            <p class="lg:hidden text-[#CED4DA]">5
                            <section class="inline">{{$t("texts.min_ago")}}</section></p>
                        </div>
                    </div>
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

const authStore = useAuthStore();
const router = useRouter();
const notification = ref(false);

const handleNotification = () => {
    notification.value = !notification.value
}

</script>