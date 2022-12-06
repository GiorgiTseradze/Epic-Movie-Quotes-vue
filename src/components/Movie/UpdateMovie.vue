<template>
    <div @click="$router.push({name: 'movieList'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[50rem] lg:mt-20 bg-black z-50">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-28">
                <p class="text-white">Edit Movie</p>
            </div>
            <div class="flex absolute w-[22rem] lg:w-[45rem] justify-end">
                <router-link :to="{name: 'movieList'}">
                    <img class="mr-10" src="@/assets/x-grey.svg" />
                </router-link>
            </div>
        </div>

        <div class="flex items-center justify-center mt-8 w-full">
            <div class="flex items-center w-[20rem] lg:w-[40rem]">
                <div class="w-10">
                    <img src="@/assets/movie-female.svg" />
                </div>
                <div class="ml-4">
                    <p class="text-white text-lg">Nino Tabagari</p>
                </div>
            </div>
        </div>

        <div class="flex justify-center w-full mt-8">
            <Form @submit="handleSubmit" class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center h-10 border-[0.06rem] border-[#6C757D] rounded">
                    <Field v-model="nameEn" class="text-white px-3 placeholder-white outline-none bg-inherit lg:w-[36rem]" name="name_en" placeholder="Movie name" rules="required" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <ErrorMessage name="name_en" class="text-red-500" />

                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="nameKa" class="text-white px-3 placeholder-white outline-none bg-inherit lg:w-[36rem]" name="name_ka" placeholder="ფილმის სახელი" rules="required" />
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <ErrorMessage name="name_ka" class="text-red-500" />

                <div class="flex flex-wrap items-center h-max py-3 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <div class="flex text-white" v-for="(tag, index) in genres" :key="'tag'+index">
                        <div class="flex w-max px-2 bg-gray-500 rounded ml-2">
                            <p>{{ tag }}</p>
                            <button class="ml-[0.3rem] w-2" @click="removeTag"><img src="@/assets/x-grey.svg" /> </button>
                        </div>
                    </div>
                        <div class="flex">
                            <Field v-model="genres" name="genre" >
                            <input v-model="tagValue" @keydown.enter="addTag" class="flex text-white placeholder-white outline-none bg-inherit w-20 h-5 ml-3" placeholder="genre..."/>
                            </Field>
                        </div>
                </div>

                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="dir" class="text-white px-3 placeholder-white outline-none bg-inherit lg:w-[36rem]" name="director_en" placeholder="Director" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="dirKa" class="text-white px-3 placeholder-white outline-none bg-inherit lg:w-[36rem]" name="director_ka" placeholder="რეჟისორი" />
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="desc" as="textarea" class="text-white w-[17rem] lg:w-[36rem] h-14 overflow-hidden resize-none px-3 py-3 border-0 placeholder-white outline-none bg-inherit" name="description_en" placeholder="Movie description" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="descKa" as="textarea" class="text-white w-[17rem] h-14 px-3 py-3 lg:w-[36rem] placeholder-white resize-none outline-none bg-inherit" name="description_ka" placeholder="ფილმის აღწერა"/>
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <FileInput />

                <div class="flex w-[20rem] lg:w-[40rem] rounded bg-[#E31221] h-10 items-center justify-center mt-10">
                    <button type="submit" class="text-white">{{ $t("texts.save_changes") }}</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter, useRoute } from 'vue-router'
import FileInput from '@/components/form/FileInput.vue';

const router = useRouter()
const movieId = useRoute().params.movieId;
const movie = ref();
const nameEn = ref('');
const nameKa = ref('');
const genres = ref();
const dir = ref('');
const dirKa = ref('');
const desc = ref('');
const descKa = ref('');

//genre input logic
const tagValue = ref('');

//genre input functions
const addTag = (e) => {
    e.preventDefault();
    if(!tagValue.value == ''){
        genres.value.push(tagValue.value);
        tagValue.value = '';
    }
}

const removeTag = (index) => {
    genres.value.splice(index, 1);
}

//drag&&drop

//get movie data
onMounted(() => {
    axiosInstance.get('movies/'+movieId).then((response)=>{
        console.log(response.data);
        movie.value = response.data;
        nameEn.value = response.data.name.en;
        nameKa.value = response.data.name.ka;
        genres.value = JSON.parse(response.data.genre);
        dir.value = response.data.director.en;
        dirKa.value = response.data.director.ka;
        desc.value = response.data.description.en
        descKa.value = response.data.description.ka
    })
});

//post updated movie data to back-end
const handleSubmit = (values) => {
    console.log(values)

    axiosInstance
        .post("update-movie/"+movieId, {
          name_en: values.name_en,
          name_ka: values.name_ka,
          genre: JSON.stringify(genres.value),
          director_en: values.director_en,
          director_ka: values.director_ka,
          description_en: values.description_en,
          description_ka: values.description_ka,
          image: values.image,
          movie_id: values.movie_id
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          alert("Movie updated Successfully!");
          router.push({ name: 'movieList'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        });
}
</script>