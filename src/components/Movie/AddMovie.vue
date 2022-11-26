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
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="name_en" placeholder="Movie name" />
                    <p class="text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-inherit" name="name_ka" placeholder="ფილმის სახელი" />
                    <p class="text-[#6C757D]">ქარ</p>
                </div>
                <div class="flex items-center h-10 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field class="text-white px-3 placeholder-white outline-none bg-gray-500 w-20 h-5 ml-5" name="genre" placeholder="Drama" />
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
                    <Field name="image" v-slot="{ handleChange, handleBlur, meta, value }" v-model="img">
                        <div
                            @dragenter="onDragEnter"
                            @dragleave="onDragLeave"
                            @dragover.prevent
                            @drop="onDrop"
                            class="relative mt-4 bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-4 rounded lg:py-2 outline-none"
                            :class="{
                            'border-niceRed': !meta.valid && meta.touched,
                            'border-validGreen': meta.valid && meta.touched,
                            'border-dotted border-4 border-blue-700': isDragging,
                            }"
                        >
                            <div class="flex justify-between lg:justify-start lg:gap-3">
                            <div class="flex gap-3 items-center">
                                <camera-icon></camera-icon>
                                <span class="mt-1 lg:hidden">Upload image</span>
                                <span class="mt-1 invisible lg:visible">Drag and Drop</span>
                            </div>
                            <label for="movieImage" class="bg-fadePurple px-2 py-2">Choose File</label
                            >
                            </div>
                            <div v-if="value">
                            {{ value.name }}
                            </div>
                            <input type="file" @change="handleChange" @blur="handleBlur" id="movieImage" placeholder="Choose file" />
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
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'

const router = useRouter()

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
          genre: values.genre,
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