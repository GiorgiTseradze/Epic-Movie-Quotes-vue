<template>
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[50rem] lg:mt-20 bg-black">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-34">
                <p class="text-white">write new quote</p>
            </div>
            <div class="flex absolute w-full justify-end">
                <router-link :to="{name: 'newsFeed'}">
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
                <div class="flex items-center h-16 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field as="textarea" class="text-white w-[17rem] lg:w-[34rem] h-14 overflow-hidden resize-none px-3 py-3 border-0 placeholder-[#6C757D] outline-none bg-inherit" 
                    name="quote_en" placeholder="create new quote" />
                    <p class="lg:ml-10 text-white">Eng</p>
                </div>
                <div class="flex items-center h-16 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field as="textarea" class="text-white w-[17rem] lg:w-[34rem] h-14 px-3 py-3 placeholder-[#6C757D] resize-none outline-none bg-inherit" 
                    name="quote_ka" placeholder="ახალი ციტატა"/>
                    <p class="lg: ml-10 text-white">ქარ</p>
                </div>
                <file-input/>
                    <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                        <Field as="textarea" class="text-white w-[17rem] lg:w-[34rem] h-14 px-3 py-3 placeholder-white resize-none outline-none bg-inherit" 
                        name="movie_id" placeholder="movie_id"/>
                        <p class="lg:ml-10 text-[#6C757D]">ქარ</p>
                    </div>
                <div>
                    <button type="submit" class="text-white mt-10">Post</button>
                </div>
            </Form>
        </div>

    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import FileInput from '../form/FileInput.vue';
const router = useRouter()



const handleSubmit = (values) => {
    console.log(values)

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
          alert("Quote added Successfully!");
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        });
}
</script>