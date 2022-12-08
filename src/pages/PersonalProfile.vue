<template>

    <div class="flex flex-col bg-[#171623] w-full h-screen">
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <TheBurger />
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
                                    <form @click="handleLogout" :action="url" >
                                        <button>Log out</button>
                                    </form>
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
                        <p class="text-[#CED4DA]">{{ $t("texts.edit_your_profile")}}</p>
                    </div>
                </div>
                <div @click="$router.push({name: 'newsFeed'})" class="cursor-pointer flex items-center w-[15rem] ml-3 mt-10">
                    <HomeIcon />
                    <p class="ml-4 text-white fill-red-500">{{ $t("texts.news_feed") }}</p>
                </div>
                <div @click="$router.push({name: 'movieList'})" class="cursor-pointer flex items-center w-[15rem] ml-3 mt-10">
                    <CameraIcon />
                    <p class="ml-4 text-white">{{ $t("texts.list_of_movies") }}</p>
                </div>
            </div>

            <div class="w-full">
                <div class="lg:w-[35rem] xl:w-[45rem] 2xl:w-[60rem] bg-[#181624]">
                    <div class="flex items-center justify-center lg:justify-start h-[4rem]">
                        <div class="lg:hidden w-[20rem]">
                            <img src="@/assets/back.svg" class="w-5" />
                        </div>
                        <div class="hidden lg:flex ml-20 xl:ml-10 w-40">
                            <p class="text-white font-medium">My Profile</p>
                        </div>
                        <div class="hidden lg:flex lg:w-[15rem] xl:w-[25rem] 2xl:w-[40rem] justify-center mt-48 mr-20 xl:mr-32">
                            <img class="w-40" src="@/assets/profpic.svg" />
                        </div>
                    </div>

                <div class="flex flex-col lg:w-[35rem] xl:w-[45rem] 2xl:w-[60rem] bg-[#24222F] lg:bg-[#11101A] h-max py-10 lg:ml-20 xl:ml-10 lg:mt-20">
                    <div class="lg:hidden flex justify-center mt-8">
                        <img src="@/assets/profpic.svg" />
                    </div>
                    <div class="flex justify-center lg:mt-20">
                        <p class="text-white text-xl mt-2">{{ $t("profile.upload_new_photo")}}</p>
                    </div>

                    <div>
                        <Form class="hidden lg:flex flex-col lg:w-[35rem] xl:w-[45rem] 2xl:w-[60rem] lg:ml-10 xl:ml-20">
                            <div class="flex flex-col items-center w-full mt-5">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.username") }}</section>
                                </div>
                                <div class="flex w-full">
                                    <div class="border-b-2 pb-10 border-[#40414A]">
                                        <Field name="name" class="bg-[#CED4DA] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2 outline-none placeholder-black" :placeholder="$t('profile.dummy_name')" />
                                    </div>
                                    <div class="ml-6 py-3">
                                        <button class="text-[#CED4DA]">{{ $t("profile.edit") }}</button>
                                    </div>
                                </div>
                                <ErrorMessage class="text-[#F15524]" name="name" />
                            </div>

                            <div class="flex flex-col items-center w-full mt-10">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.email") }}</section>
                                </div>
                                <div class="flex w-full">
                                    <div class="">
                                        <Field name="email" class="bg-[#CED4DA] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('profile.dummy_email')" />
                                    </div>
                                    <div class="ml-6 py-3">
                                        <button class="text-[#CED4DA]">{{ $t("profile.primary_email") }}</button>
                                    </div>
                                </div>
                                <ErrorMessage class="text-[#F15524]" name="email" />
                            </div>

                            <div class="flex flex-col items-center w-full mt-10">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.email") }}</section>
                                </div>
                                <div class="flex w-full items-center">
                                    <div class="">
                                        <Field name="email" class="bg-[#CED4DA] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('profile.dummy_email')" />
                                    </div>
                                    <div class="ml-6 pr-5 h-5 border-r-[0.06rem] border-[#40414A]">
                                        <button class="text-[#CED4DA]">{{ $t("profile.make_this_primary") }}</button>
                                    </div>
                                    <div class="ml-6 py-3">
                                        <button class="text-[#CED4DA]">{{ $t("profile.remove") }}</button>
                                    </div>
                                </div>
                                <ErrorMessage class="text-[#F15524]" name="email" />
                            </div>

                            <div class="flex flex-col lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] mt-5 border-b-2 pb-8 border-[#40414A]">
                                <button class="flex justify-center items-center w-52 h-10 border-[0.06rem] rounded">
                                    <img src="@/assets/add.svg" />
                                    <p class="ml-2 text-white">{{ $t("profile.add_new_email")}}</p>
                                </button>
                            </div>

                            <div class="flex flex-col items-center w-full mt-5">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.password") }}</section>
                                </div>
                                <div class="flex w-full">
                                    <div>
                                        <Field name="password" type="password" class="bg-[#CED4DA] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.password')" />
                                    </div>
                                    <div class="ml-6 py-3">
                                        <button class="text-[#CED4DA]">{{ $t("profile.edit") }}</button>
                                    </div>
                                </div>
                                <ErrorMessage class="text-[#F15524]" name="password" />
                            </div>
                        </Form>

                        <Form @submit="handleSubmit" class="lg:hidden flex flex-col items-center mt-[3rem] w-full">
                            <div class="flex flex-col border-b-2 border-gray-500 w-[20rem]">
                                <label class="text-white" for="username">{{ $t("profile.username")}}</label>
                                <div class="flex justify-between w-full">
                                    <Field name="username" class="bg-[#24222F] outline-none text-red-500 placeholder-white" />
                                    <button class="text-[#CED4DA]">{{ $t("profile.edit") }}</button>
                                </div>
                            </div>
                            <div class="flex flex-col mt-6 border-b-2 border-gray-500 w-[20rem]">
                                <label class="text-white" for="password">{{ $t("auth.password") }}</label>
                                <div class="flex justify-between w-full">
                                    <Field name="username" class="bg-[#24222F] text-gray-400 placeholder-white outline-none" type="password" />
                                    <button class="text-[#CED4DA]">{{ $t("profile.edit") }}</button>
                                </div>
                            </div>

                            <div class="flex justify-between items-center text-white w-[20rem] mt-8">
                                <div>
                                    <p>{{ $t("auth.email") }}</p>
                                </div>
                                <div>
                                    <img src="@/assets/next.svg" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
</template>

<script setup>
import { ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";
import i18n from '@/i18n/index.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import TheBurger from '@/components/General/TheBurger.vue';

const authStore = useAuthStore();
const router = useRouter();

const lang = ref(false);

const url = "http://127.0.0.1:8000/api/logout";

const handleLogout = () => {
    router.push({name: "landing"})
    authStore.authenticated = false;
    console.log(authStore.authenticated)
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


//to be changed
const handleSubmit = (values) => {
    axios
        .post("login", {
          email: values.email,
          password: values.password,
        })
        .then(() => {
          alert("Login Successful!");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
}
</script>