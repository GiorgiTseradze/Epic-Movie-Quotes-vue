<template>
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:overflow-hidden lg:w-[50rem] lg:h-[50rem] lg:mt-20 bg-black">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex w-34">
                <p class="text-white">{{ $t("feed.edit_quote")}}</p>
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
                <div class="flex items-center h-16 lg:h-24 border-[0.06rem] mt-4 border-[#6C757D] rounded">
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
                            // 'border-dotted border-4 border-blue-700': isDragging,
                            }"
                        >
                            <div class="flex justify-between lg:justify-start lg:gap-3">
                            <div class="flex gap-3 items-center">
                                <img src="@/assets/photocamera.svg" />
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
                    <div class="hidden items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                        <Field value="1" class="text-white w-[17rem] lg:w-[34rem] h-14 px-3 py-3 placeholder-white resize-none outline-none bg-inherit" 
                        name="quote_id" placeholder="quote_id"/>
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

const router = useRouter()

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
        .post("update-quote", {
          quote_en: values.quote_en,
          quote_ka: values.quote_ka,
          image: values.image,
          quote_id: values.quote_id
        },{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          alert("Quote updated Successfully!");
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}
</script>