<template>
    <div @click="$router.push({name: 'movieList'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[50rem] lg:mt-20 bg-black z-50">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-28">
                <p class="text-white">Add Movie</p>
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
            <Form @submit="handleSubmit" v-slot="{ field, meta }" class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center w-full">
                    <Field v-slot="{ field, meta }" name="name_en"  rules="required" >
                        <input class="h-10 border-[0.06rem] border-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                        placeholder="Movie name" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                    </Field>
                </div>

                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="name_ka" rules="required">
                        <input class="h-10 border-[0.06rem] border-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                        placeholder="ფილმის სახელი" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">ქარ</p>
                    </Field>
                </div>

                <div class="flex flex-wrap items-center h-max py-3 mt-4 border-[0.06rem] border-[#6C757D] rounded">
                    <div class="flex text-white" v-for="(tag, index) in tags" :key="'tag'+index">
                        <div class="flex w-max px-2 bg-gray-500 rounded ml-2">
                            <p>{{ tag }}</p>
                            <button class="ml-[0.3rem] w-2" @click="removeTag"><img src="@/assets/x-grey.svg" /> </button>
                        </div>
                    </div>
                        <div class="flex">
                            <Field v-model="tags" v-slot="{ field, meta }" name="genre" >
                                <input v-model="tagValue" @keydown.enter="addTag" class="flex text-white placeholder-white outline-none bg-inherit w-20 h-5 ml-3" placeholder="genre..."/>
                            </Field>
                        </div>
                </div>
                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="director_en" rules="required">
                        <input class="h-10 border-[0.06rem] border-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                        placeholder="Director" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                    </Field>
                </div>
                <div class="flex items-center h-10 mt-4">
                    <Field v-slot="{ field, meta }" name="director_ka" rules="required">
                        <input class="h-10 border-[0.06rem] border-[#6C757D] rounded px-3 text-white w-full placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']"
                        placeholder="რეჟისორი" v-bind="field" />
                        <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">ქარ</p>
                    </Field>
                </div>
                <div class="flex items-center h-16 mt-4 ">
                    <Field v-slot="{ field, meta }" name="description_en" rules="required">
                        <input placeholder="Movie description" type="textarea" v-bind="field"
                        class="text-white h-14 overflow-hidden w-full border-[0.06rem] border-[#6C757D] rounded resize-none px-3 py-3 placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']" />
                    </Field>
                    <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">Eng</p>
                </div>
                <div class="flex items-center h-16 mt-4 ">
                    <Field v-slot="{ field, meta }" name="description_ka" rules="required">
                        <input placeholder="ფილმის აღწერა" type="textarea" v-bind="field"
                        class="text-white h-14 overflow-hidden w-full border-[0.06rem] border-[#6C757D] rounded resize-none px-3 py-3 placeholder-white outline-none bg-inherit"
                        :class="[!meta.valid && meta.touched ? 'border-[#E31221]' 
                        : '', meta.valid && meta.touched ? 'border-green-500' : '']" />
                    </Field>
                    <p class="text-[#6C757D] absolute ml-[17rem] lg:ml-[36rem]">ქარ</p>
                </div>
                <FileInput />
                <div class="flex w-[20rem] lg:w-[40rem] rounded bg-red-500 h-10 items-center justify-center mt-10">
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
import { Field, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import { useCrudStore } from "@/stores/crud";
import FileInput from '@/components/form/FileInput.vue';


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

//drag&&drop
function onDragEnter(e) {
  e.preventDefault();
  dragCount.value++;
  isDragging.value = true;
}

function onDragLeave(e) {
  e.preventDefault();
  dragCount.value--;
  if (dragCount.value <= 0) {
    isDragging.value = false;
  }
}

function onDrop(e) {
  e.preventDefault();
  isDragging.value = false;
  document.getElementById("movieImage").files = e.dataTransfer.files;
  img.value = document.getElementById("movieImage").files[0];
}

const handleSubmit = (values) => {
    console.log(values)

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
          alert("Movie added Successfully!");
          movieStore.getMovies();
          router.push({ name: 'movieList'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        });
}
</script>