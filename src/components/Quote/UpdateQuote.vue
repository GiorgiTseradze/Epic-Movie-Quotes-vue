<template>
    <div class="flex flex-col items-center w-screen h-screen fixed overflow-scroll lg:w-[50rem] lg:h-[60rem] pb-20 lg:mt-20 bg-black">
        <div class="flex justify-center items-center h-16 w-full border-b-[0.06rem] lg:overflow-hidden  border-[#40414A]">
            <div class="flex w-34 h-10 items-center">
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
                <div class="flex items-center h-14 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="quoteEn" as="textarea" class="text-white w-[17rem] lg:w-[34rem] h-14 overflow-hidden 
                    resize-none px-3 py-3 border-0 placeholder-[#6C757D] outline-none bg-inherit" 
                    name="quote_en" placeholder="create new quote" />
                    <p class="lg:ml-10 text-white">Eng</p>
                </div>
                <div class="flex items-center h-14 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <Field v-model="quoteKa" as="textarea" class="text-white w-[17rem] lg:w-[34rem] h-14 px-3 py-3 placeholder-[#6C757D] resize-none outline-none bg-inherit" 
                    name="quote_ka" placeholder="ახალი ციტატა"/>
                    <p class="lg:ml-10 text-white">ქარ</p>
                </div>
                <div class="flex items-center h-80 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                <img class="object-fill w-[20rem] lg:w-[40rem] h-[19.6rem] lg:h-[20rem]" :src="imgUrl+quoteImg" />
            <Field name="image" v-slot="{ meta, value }" v-model="fileModel" >
                    <div
                        @dragover.prevent 
                        @drop.prevent="onDrop"
                        class="absolute mt-4 mr-80 bg-transparent border-1 border-gray-500 placeholder-white w-full lg:w-[40rem] lg:h-[10rem] px-2.5 py-4 rounded lg:py-2 outline-none"
                    >
                        <div class="lg:absolute flex ml-20 lg:ml-60">
                            <div v-if="fileModel" class="text-white bg-[#00000088] px-3 py-3 rounded font-bold ml-4 text-2xl">
                                {{ fileModel.name }}
                            </div>
                            <div v-else class="flex flex-col gap-3 bg-[#00000088] px-3 lg:py-3 rounded items-center">
                                <img class="mt-10 lg:mt-3" src="@/assets/photocamera.svg" />
                                <span class="mt-1 text-white lg:hidden">Upload image</span>
                                <label for="movieImage" class="py-1 text-white invisible lg:visible cursor-pointer">Change Photo</label>
                                <input type="file" class="placeholder-white text-white hidden cursor-pointer" @input="setValue" id="movieImage" placeholder="Choose file" />
                            </div>
                        </div>

                    </div>
                </Field> 
             </div>
                <div class="flex w-[20rem] lg:w-[40rem] rounded bg-red-500 h-10 items-center justify-center mt-10">
                    <button type="submit" class="text-white">{{ $t("texts.save_changes") }}</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter, useRoute } from 'vue-router'

const fileModel = ref(null);
const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;

function setValue(e) {
    fileModel.value = e.target.files[0];
}
function onDrop(e) {
  e.preventDefault();
  fileModel.value = e.dataTransfer.files[0];
  console.log(fileModel.value);
}

const router = useRouter()
const quoteId = useRoute().params.quoteId;

const quoteEn = ref('');
const quoteKa = ref('');
const quoteImg = ref('');
const image = ref(imgUrl + quoteImg);
console.log(quoteImg.value)

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

onMounted(()=>{
    axiosInstance.get('quotes/'+quoteId).then((response)=>{
        quoteEn.value = response.data.quote.en
        quoteKa.value = response.data.quote.ka
        quoteImg.value = response.data.image
    })
});


const handleSubmit = (values) => {
    console.log(values)

    axiosInstance
        .post('update-quote/'+quoteId, {
          quote_en: values.quote_en,
          quote_ka: values.quote_ka,
          image: values.image,
          quote_id: quoteId
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