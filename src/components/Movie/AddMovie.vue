<template>
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[40rem] lg:h-[50rem] lg:mt-20 bg-black">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-28">
                <p class="text-white">Add Movie</p>
            </div>
            <div class="flex absolute w-full justify-end">
                <img class="mr-10" src="@/assets/x-grey.svg" />
            </div>
        </div>

        <div class="flex items-center justify-center mt-8 w-full">
            <div class="flex items-center w-[20rem]">
                <div class="w-10">
                    <img src="@/assets/movie-female.svg" />
                </div>
                <div class="ml-4">
                    <p class="text-white text-lg">Nino Tabagari</p>
                </div>
            </div>
        </div>
        
        <div class="flex justify-center w-full mt-8">
            <Form @submit="handleSubmit" class="flex flex-col w-[20rem]">
                <div class="flex items-center h-10 border-[0.06rem] border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="name_en" placeholder="Movie name" rules="required" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <ErrorMessage name="name_en" class="text-red-500" />

                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="name_ka" placeholder="ფილმის სახელი" rules="required" />
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <ErrorMessage name="name_ka" class="text-red-500" />

                <div class="flex flex-wrap items-center h-max py-3 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <div class="flex text-white" v-for="(tag, index) in tags" :key="'tag'+index">
                        <div class="flex w-max px-2 bg-gray-500 rounded ml-2">
                            <p>{{ tag }}</p>
                            <button class="ml-[0.3rem] w-2" @click="removeTag"><img src="@/assets/x-grey.svg" /> </button>
                        </div>
                    </div>
                        <div class="flex">
                            <Field v-model="tags" name="genre" >
                            <input v-model="tagValue" @keydown.enter="addTag" class="flex text-white placeholder-white outline-none bg-inherit w-20 h-5 ml-3" placeholder="genre..."/>
                            </Field>
                        </div>
                </div>

                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="director_en" placeholder="Director" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="director_ka" placeholder="რეჟისორი" />
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field as="textarea" class="text-white w-[17rem] h-14 overflow-hidden resize-none px-3 py-3 border-0 placeholder-white outline-none bg-inherit" name="description_en" placeholder="Movie description" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field as="textarea" class="text-white w-[17rem] h-14 px-3 py-3 placeholder-white resize-none outline-none bg-inherit" name="description_ka" placeholder="ფილმის აღწერა"/>
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field name="image" v-slot="{ handleChange, handleBlur, meta, value }">
                        <div
                            @dragenter="onDragEnter"
                            @dragleave="onDragLeave"
                            @dragover.prevent 
                            @drop="onDrop"
                            class="relative mt-4 bg-transparent border-1 border-gray-500 placeholder-white w-full px-2.5 py-4 rounded lg:py-2 outline-none"
                            :class="{
                            'border-red-500': !meta.valid && meta.touched,
                            'border-green-500': meta.valid && meta.touched,
                            'border-dotted border-4 border-blue-700': isDragging,
                            }"
                        >
                            <div class="flex justify-between lg:justify-start lg:gap-3">
                            <div class="flex gap-3 items-center">
                                <CameraIcon />
                                <span class="mt-1 text-white lg:hidden">Upload image</span>
                                <span class="mt-1 text-white invisible lg:visible">Drag and Drop</span>
                            </div>
                            <label for="movieImage" class="bg-purple-500 px-2 py-2">Choose File</label
                            >
                            </div>
                            <div v-if="value" class="text-white">
                            {{ value.name }}
                            </div>
                            <input type="file" class="placeholder-white text-white" @change="handleChange" @blur="handleBlur" id="movieImage" placeholder="Choose file" />
                        </div>
                    </Field> 
                </div>

                <div>
                    <button type="submit" class="text-white mt-10">Add movie</button>
                </div>
            </Form>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import CameraIcon from '@/components/Icons/CameraIcon.vue';

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
          image: values.image
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          alert("Movie added Successfully!");
          router.push({ name: 'movieList'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        });
}
</script>