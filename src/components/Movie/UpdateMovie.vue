<template>
    <div @click="$router.push({name: 'movieList'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[50rem] lg:mt-20 bg-black z-50">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-28">
                <p class="text-white">Edit Movie</p>
            </div>
            <div class="flex absolute w-[22rem] lg:w-[45rem] justify-end">
                <router-link :to="{name: 'movieList'}">
                    <img class="mr-10" src="@/assets/x-grey.svg" alt="close-icon" />
                </router-link>
            </div>
        </div>

        <div class="flex items-center justify-center mt-8 w-full">
            <div class="flex items-center w-[20rem] lg:w-[40rem]">
                <div class="w-10">
                    <img class="w-10 h-10 object-cover rounded-full" :src="userStore?.user.thumbnail" alt="user-image" />
                </div>
                <div class="ml-4">
                    <p class="text-white text-lg">{{userStore?.user.name}}</p>
                </div>
            </div>
        </div>

        <div class="flex justify-center w-full mt-8">
            <Form @submit="handleSubmit" v-slot="{ field, meta }" class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center h-10 rounded">
                    <Field v-model="nameEn" v-slot="{ field, meta }" rules="required|en" name="name_en"> 
                        <input v-bind="field" placeholder="Movie name" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">Eng</p>
                </div>

                <div class="flex items-center h-10 rounded">
                    <Field v-model="nameKa" v-slot="{ field, meta }" rules="required|ge" name="name_ka"> 
                        <input v-bind="field" placeholder="ფილმის სახელი" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 mt-2 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">ქარ</p>
                </div>

                <div class="flex flex-wrap items-center h-max py-3 border-[0.06rem] mt-4 border-[#6C757D] rounded"
                :class="genres[0] ? 'border-1 border-green-500 outline-green-500 active:border-1 border-green-500 outline-green-500' : ''">
                    <div class="flex text-white" v-for="(tag, index) in genres" :key="'tag'+index">
                        <div class="flex w-max px-2 bg-gray-500 rounded ml-2">
                            <p>{{ tag }}</p>
                            <button class="ml-[0.3rem] w-2" @click="removeTag"><img src="@/assets/x-grey.svg" alt="close-icon" /> </button>
                        </div>
                    </div>
                        <div class="flex">
                            <Field v-model="genres" name="genre" rules="genre">
                                <input v-model="tagValue" @keydown.enter="addTag" class="flex text-white placeholder-white outline-none bg-inherit w-20 h-5 ml-3" placeholder="genre..."/>
                            </Field>
                        </div>
                </div>
                <div class="flex items-center h-10 rounded">
                    <Field v-model="dir" v-slot="{ field, meta }" rules="required|en" name="director_en"> 
                        <input v-bind="field" placeholder="Director" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 mt-2 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">Eng</p>
                </div>
                <div class="flex items-center h-10 rounded">
                    <Field v-model="dirKa" v-slot="{ field, meta }" rules="required|ge" name="director_ka"> 
                        <input v-bind="field" placeholder="Director" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 mt-2 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">ქარ</p>
                </div>
                <div class="flex items-center h-10 rounded">
                    <Field v-model="desc" v-slot="{ field, meta }" rules="required|en" name="description_en"> 
                        <input v-bind="field" placeholder="Description" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 mt-2 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">Eng</p>
                </div>
                <div class="flex items-center h-10 rounded">
                    <Field v-model="descKa" v-slot="{ field, meta }" rules="required|ge" name="description_ka"> 
                        <input v-bind="field" placeholder="აღწერა" 
                        class="outline-[0.06rem] outline-[#6C757D] text-white px-3 mt-2 py-1 rounded placeholder-white outline-none bg-inherit w-full"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        />
                    </Field>
                    <p class="ml-[17rem] lg:ml-[36.5rem] text-[#6C757D] absolute">ქარ</p>
                </div>
                <FileInput class="relative" />
                <div class="flex flex-col pb-5">
                    <ErrorMessage name="genre" class="absolute py-2 mt-4 text-sm text-[#F15524]" />
                </div>
                <div class="flex w-full rounded bg-red-600 hover:bg-[#CC0E10] active:bg-[#B80D0F] h-10 items-center justify-center mt-10">
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
import FileInput from '@/components/form/FileInputEdit.vue';
import { useCrudStore } from "@/stores/crud";
import { useUserStore } from "@/stores/userStore.js";
import { useGeneralStore } from "@/stores/general"

const generalStore = useGeneralStore();
const userStore = useUserStore();
const router = useRouter()
const movieId = useRoute().params.movieId;
const movie = ref();
const nameEn = ref('');
const nameKa = ref('');
const genres = ref([]);
const dir = ref('');
const dirKa = ref('');
const desc = ref('');
const descKa = ref('');
const movieStore = useCrudStore();

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
          movie_id: movieId
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          movieStore.getMovies();
          router.push({ name: 'movieList'});
          setTimeout(()=>generalStore.fileModel = null, 200)
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        });
}
</script>