<template>
    <div @click="$router.push({name: 'newsFeed'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center z-50 w-screen h-screen fixed overflow-scroll lg:w-[50rem] lg:h-[60rem] pb-20 bg-inherit">
        <div class="flex flex-col items-center w-screen fixed lg:w-[50rem] lg:mt-20 bg-[#11101A] z-50">
            <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
                <div class="flex w-34 items-center">
                    <p class="flex text-white">{{$t("feed.write_new_quote")}}</p>
                </div>
                <div class="flex absolute w-[22rem] lg:w-[40rem] justify-end">
                    <router-link :to="{name: 'newsFeed'}">
                        <img class="mr-10" src="@/assets/x-grey.svg" alt="close-icon" />
                    </router-link>
                </div>
            </div>

            <div class="flex items-center justify-center mt-8 w-full">
                <div class="flex items-center w-[20rem] lg:w-[40rem]">
                    <div class="w-10">
                        <img class="rounded-3xl w-12 h-12 object-cover" :src="userStore.user?.thumbnail" alt="profile-image" />
                    </div>
                    <div class="ml-4">
                        <p class="text-white text-lg">{{ userStore.user?.name }}</p>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center w-full mt-8 pb-10">
                <Form @submit="handleSubmit" class="flex flex-col w-[20rem] lg:w-[40rem]">
                    <div class="flex items-center h-16 lg:h-20 mt-4">
                        <Field v-slot="{ field, meta }" rules="required|en" name="quote_en" >
                            <input type="textarea" v-bind="field" placeholder="Write new quote" 
                                class="outline-[0.06rem] outline-[#6C757D] rounded text-white w-full h-14 overflow-hidden resize-none px-3 py-3 placeholder-[#6C757D] outline-none bg-inherit"
                                :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                                : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                            />
                        </Field>
                        <p class="ml-[17rem] lg:ml-[36rem] text-white absolute">Eng</p>
                    </div>
                    <div class="flex items-center h-16 lg:h-20 mt-4">
                        <Field v-slot="{ field, meta }" rules="required|ge" name="quote_ka" >
                            <input type="textarea" v-bind="field" placeholder="??????????????? ??????????????????" 
                                class="outline-[0.06rem] outline-[#6C757D] rounded text-white w-full h-14 overflow-hidden resize-none px-3 py-3 placeholder-[#6C757D] outline-none bg-inherit"
                                :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                                : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                            />
                        </Field>
                        <p class="ml-[17rem] lg:ml-[36rem] text-white absolute">?????????</p>
                    </div>
                    <FileInput/>
                        <div @click="handleChoose" class="flex cursor-pointer items-center h-16 mt-4 rounded bg-[#000000]">
                            <img class="absolute ml-4 w-6" src="@/assets/camera-white.svg" alt="camera-icon" />
                            <div class="flex items-center text-white w-[17rem] h-14 px-14 py-3 placeholder-white resize-none outline-none bg-inherit">
                                <p>{{selected?selected:$t('feed.choose_movie')}}</p>
                            </div>
                            <img :class="chooseMovie ? 'rotate-180' : 'rotate-0'" class="transition-all ease-linear ml-6 lg:ml-80 w-4" 
                            src="@/assets/down-arrow.svg" alt="down-arrow" />
                        </div>
                    <div>
                            <Field v-model="movieId" name="movie_id" class="hidden bg-inherit text-white">
                            </Field>
                            <div @click="handleChoose" class="flex flex-col w-[20rem] lg:w-[40rem] bg-[#000000]  max-h-[14rem] overflow-y-auto overflow-x-hidden rounded" v-if="chooseMovie">
                                <div v-for="movie in movieStore.movies" :key="movie.id" 
                                class="flex items-center border-2 border-[#40414A] overflow-scrollable w-[20rem] lg:w-[40rem] rounded bg-[#000000] py-2 px-2">
                                    <p @click="setMovie" :id="movie.id" class="pr-[36rem] text-white cursor-pointer" >{{i18n.global.locale === 'en' ? movie?.name.en : movie?.name.ka }}</p>
                                </div>
                            </div>
                        <div class="flex w-[20rem] lg:w-[40rem] rounded bg-red-500 h-10 items-center justify-center mt-10">
                            <button type="submit" class="text-white px-72">{{ $t("feed.post") }}</button>
                        </div>                
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import i18n from '@/i18n/index.js'
import FileInput from '../form/FileInput.vue';
import { useCrudStore } from "@/stores/crud";
import { useUserStore } from "@/stores/userStore.js"
import { useGeneralStore } from "@/stores/general"

const generalStore = useGeneralStore();
const userStore = useUserStore();
const movieStore = useCrudStore(); 
const quoteStore = useCrudStore();
const router = useRouter()
const chooseMovie = ref(false);
const movieId = ref();
const selected = ref();

const handleChoose = () => {
    chooseMovie.value = !chooseMovie.value
}

const setMovie = (e) => {
    selected.value = e.target.textContent;
    movieId.value=e.target.id;
}

const handleSubmit = (values) => {

    axiosInstance
        .post("add-quote", {
          quote_en: values.quote_en,
          quote_ka: values.quote_ka,
          image: values.image,
          movie_id: values.movie_id
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          quoteStore.getQuotes(true);
          router.push({ name: 'newsFeed'});
          setTimeout(()=>generalStore.fileModel = null, 200)
        })
        .catch((error) => {
        });
}
</script>