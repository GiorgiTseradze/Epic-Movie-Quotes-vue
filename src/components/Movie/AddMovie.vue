<template>
    <div @click="$router.push({name: 'movieList'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[87%] lg:mt-20 bg-black z-50">
        <div class="flex justify-center items-center h-20 lg:h-16 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-28 h-14 items-center">
                <p class="text-white">Add Movie</p>
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
                    <img class="rounded-full w-12 h-12 object-cover" :src="userStore.user?.thumbnail" alt="profile-image" />
                </div>
                <div class="ml-4">
                    <p class="text-white text-lg">{{userStore.user?.name}}</p>
                </div>
            </div>
        </div>
        
        <div class="flex justify-center w-full mt-8">
            <Form @submit="handleSubmit" v-slot="{ field, meta }" class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center w-full">
                    <Field v-slot="{ field, meta }" name="name_en" rules="required|en" >
                        <input :class="[!meta.valid && meta.touched ? 'border-1 border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        class="h-10 outline-[0.06rem] outline-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        placeholder="Movie name" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                    </Field>
                </div>

                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="name_ka" rules="required|ge">
                        <input class="h-10 outline outline-[0.06rem] outline-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        placeholder="?????????????????? ??????????????????" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">?????????</p>
                    </Field>
                </div>

                <div class="flex flex-wrap items-center h-max py-3 mt-4 outline outline-[0.06rem] rounded outline-[#6C757D]" 
                :class="tags[0] ? 'border-1 border-green-500 outline-green-500 active:border-1' : ''">
                    <div class="flex text-white" v-for="(tag, index) in tags" :key="'tag'+index">
                        <div class="flex w-max px-2 bg-gray-400 rounded ml-2">
                            <p>{{ tag }}</p>
                            <button class="ml-[0.3rem] w-2" @click="removeTag"><img src="@/assets/x-grey.svg" alt="close-icon" /> </button>
                        </div>
                    </div>
                        <div class="flex flex-col">
                            <Field v-model="tags" name="genre" rules="genre">
                                <input v-model="tagValue" @keydown.enter="addTag" class="relative flex text-white placeholder-white outline-none bg-inherit w-20 h-5 ml-3" placeholder="genre..."/>
                            </Field>
                        </div>
                </div>
                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="director_en" rules="required|en">
                        <input class="h-10 outline outline-[0.06rem] outline-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        placeholder="Director" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                    </Field>
                </div>
                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="director_ka" rules="required|ge">
                        <input class="h-10 outline outline-[0.06rem] outline-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']"
                        placeholder="????????????????????????" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">?????????</p>
                    </Field>
                </div>
                <div class="flex items-center h-16 mt-4 ">
                    <Field v-slot="{ field, meta }" name="description_en" rules="required|en">
                        <input placeholder="Movie description" type="textarea" v-bind="field"
                        class="text-white h-14 overflow-hidden w-full outline outline-[0.06rem] outline-[#6C757D] rounded resize-none px-3 py-3 placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']" />
                    </Field>
                    <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                </div>
                <div class="flex items-center h-16 mt-4 ">
                    <Field v-slot="{ field, meta }" name="description_ka" rules="required|ge">
                        <input placeholder="?????????????????? ??????????????????" type="textarea" v-bind="field"
                        class="text-white h-14 overflow-hidden w-full outline outline-[0.06rem] outline-[#6C757D] rounded resize-none px-3 py-3 placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-1 border-red-500 outline-red-500' 
                        : '', meta.valid && meta.touched ? 'border-1 border-green-500 outline-green-500' : '']" />
                    </Field>
                    <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">?????????</p>
                </div>
                <FileInput class="relative"/>
                <div class="flex flex-col pb-5">
                    <ErrorMessage name="genre" class="absolute py-2 mt-4 text-sm text-[#F15524]" />
                </div>
                <div class="flex w-[20rem] lg:w-[40rem] rounded bg-red-600 hover:bg-[#CC0E10] active:bg-[#B80D0F] items-center justify-center mt-10">
                    <button type="submit" class="outline-none text-white px-20 py-2 lg:px-60">
                        <p class="">{{ $t("movie.add_movie") }}</p>
                    </button>
                </div>
            </Form>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import { useCrudStore } from "@/stores/crud";
import FileInput from '@/components/form/FileInput.vue';
import { useUserStore } from "@/stores/userStore"
import { useGeneralStore } from "@/stores/general"

const generalStore = useGeneralStore();
const userStore = useUserStore();
const movieStore = useCrudStore();
const router = useRouter()

//genre input logic
const tagValue = ref('');
const tags = ref([]);

//genre input functions
const addTag = (e) => {
    e.preventDefault();
    if(!tagValue.value == ''){
        tags.value.push(tagValue.value);
        tagValue.value = '';
    }
}

const removeTag = (index) => {
    tags.value.splice(index, 1);
}

const handleSubmit = (values, actions) => {
    axiosInstance
        .post("add-movie", {
          name_en: values.name_en,
          name_ka: values.name_ka,
          genre: JSON.stringify(tags.value),
          director_en: values.director_en,
          director_ka: values.director_ka,
          description_en: values.description_en,
          description_ka: values.description_ka,
          image: values.image,
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          movieStore.getMovies();
          router.push({ name: 'movieList'});
          setTimeout(()=>generalStore.fileModel = null, 200)
        })
        .catch((error) => {
          const errors = error.response.data.errors;
            for(const key in errors){
            actions.setFieldError(key,errors[key]);
            } 
        });
}
</script>