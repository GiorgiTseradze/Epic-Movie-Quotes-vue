<template>
    <div @click="$router.push({name: 'currentMovie',params:{movieId:movieId}})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center z-50 w-screen h-screen fixed overflow-scroll lg:w-[50rem] lg:h-[60rem] pb-20 bg-inherit">
        <div class="flex flex-col items-center w-screen fixed lg:w-[50rem] lg:mt-20 bg-[#11101A] z-50">
            <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
                <div class="flex w-34 items-center">
                    <p class="flex text-white">{{$t("feed.write_new_quote")}}</p>
                </div>
                <div class="flex absolute w-[22rem] lg:w-[40rem] justify-end">
                    <router-link :to="{name: 'currentMovie',params:{movieId:movieId} }">
                        <img class="mr-10" src="@/assets/x-grey.svg" />
                    </router-link>
                </div>
            </div>

            <div class="flex items-center justify-center mt-8 w-full">
                <div class="flex items-center w-[20rem] lg:w-[40rem]">
                    <div class="w-10 lg:w-16 lg:h-16">
                        <img class="rounded-full w-12 h-12 lg:w-16 lg:h-16 object-cover" :src="userStore.user?.thumbnail" />
                    </div>
                    <div class="ml-4">
                        <p class="text-white text-lg lg:text-xl">{{ userStore.user?.name }}</p>
                    </div>
                </div>
            </div>

            <div class="flex w-[20rem] lg:w-[40rem] mt-5 py-2">
                <div class="flex flex-col justify-center px-2">
                    <img class="w-[8rem] lg:w-[16rem] object-fill h-[6rem] lg:h-[8rem] rounded" :src="imgUrl + movie?.image" />
                </div>
                <div>
                    <div class="">
                        <p class="flex items-center text-[#DDCCAA] text-base lg:text-2xl">
                            {{ i18n.global.locale === 'en' ? movie?.name?.en : movie?.name?.ka }}
                        </p>
                        <p class="flex items-center text-base mt-1 text-white lg:text-xl">
                            <section class="inline text-[#CED4DA] mr-2">Director:</section>{{ i18n.global.locale === 'en' ? movie?.director?.en : movie?.director?.ka }}
                        </p>
                    </div>
                    <div class="flex">
                        <div v-for="genre in genres" :key="genre" class="w-max mt-2 mr-2 bg-gray-500 rounded">
                            <p class="text-[#CED4DA] px-1 lg:text-xl">
                                {{ genre }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center w-full pb-10">
                <Form @submit="handleSubmit" class="flex flex-col w-[20rem] lg:w-[40rem]">
                    <div class="flex items-center h-16 lg:h-20 mt-4">
                        <Field v-slot="{ field, meta }" rules="required" name="quote_en" >
                            <input type="textarea" v-bind="field" placeholder="Write new quote" 
                                class=" border-[0.06rem] border-[#6C757D] rounded text-white w-full h-14 overflow-hidden resize-none px-3 py-3 placeholder-[#6C757D] outline-none bg-inherit"
                                :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                                : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                            />
                        </Field>
                        <p class="ml-[17rem] lg:ml-[36rem] text-white absolute">Eng</p>
                    </div>
                    <div class="flex items-center h-16 lg:h-20 mt-4">
                        <Field v-slot="{ field, meta }" rules="required" name="quote_ka" >
                            <input type="textarea" v-bind="field" placeholder="ახალი ციტატა" 
                                class=" border-[0.06rem] border-[#6C757D] rounded text-white w-full h-14 overflow-hidden resize-none px-3 py-3 placeholder-[#6C757D] outline-none bg-inherit"
                                :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                                : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                            />
                        </Field>
                        <p class="ml-[17rem] lg:ml-[36rem] text-white absolute">ქარ</p>
                    </div>
                    <FileInput/>
                    <div>
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
import { ref, onBeforeMount } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/i18n/index.js'
import FileInput from '../form/FileInput.vue';
import { useCrudStore } from "@/stores/crud";
import { useUserStore } from "@/stores/userStore.js"

const movie = ref();
const quotes = ref();
const genres = ref();
const userStore = useUserStore();
const quoteStore = useCrudStore();
const router = useRouter()
const chooseMovie = ref(false);
const movieId = useRoute().params.movieId
const handleChoose = () => {
    chooseMovie.value = !chooseMovie.value
}
const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;


onBeforeMount(()=>{
    axiosInstance.get('movies/'+movieId).then((response)=>{
        console.log(response.data.quotes);
        movie.value = response.data;
        genres.value = JSON.parse(response.data.genre);
        quotes.value = response.data.quotes;
    })
});

const handleSubmit = (values) => {
    console.log(values)

    axiosInstance
        .post("add-quote", {
          quote_en: values.quote_en,
          quote_ka: values.quote_ka,
          image: values.image,
          movie_id: movieId
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          alert("Quote added Successfully!");
          quoteStore.getQuotes();
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}
</script>