<template>
    <div @click="$router.push({name: 'newsFeed'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>
    <div class="flex flex-col items-center w-screen h-full fixed overflow-scroll lg:w-[50rem] lg:mt-20 lg:bg-[#11101A] bg-black z-50">
        <div class="flex justify-center items-center h-20 w-full border-b-[0.06rem] border-[#40414A]">
            <div class="flex absolute justify-start w-[20rem] lg:w-full h-10 lg:ml-40">
                <div class="flex items-center justify-center w-14 border-[#40414A] border-r-2 ">
                    <button class="pr-3 py-3 z-10" @click="$router.push({name:'updateQuote',params:{quoteId:quote.id}})">
                        <img src="@/assets/edit.svg" />
                    </button>
                </div>
                <div class="flex items-center justify-center h-10">
                    <button @click="handleDelete" class="px-5 py-3 z-10">
                        <img src="@/assets/delete.svg" />
                    </button>
                </div>
            </div>
            <div class="flex w-34 h-14 items-center">
                <p class="hidden lg:block text-white">{{ $t("feed.view_quote")}}</p>
            </div>
            <div class="flex absolute ml-[20rem] lg:w-full lg:ml-[87rem] z-0">
                <router-link :to="{name: 'newsFeed'}">
                    <img class="mr-10" src="@/assets/x-grey.svg" />
                </router-link>
            </div>
        </div>

        <div class="flex items-center justify-center mt-8 w-full h-10">
            <div class="flex items-center w-[20rem] lg:w-[40rem] h-10">
                <div class="w-10">
                    <img src="@/assets/movie-female.svg" />
                </div>
                <div class="ml-4">
                    <p class="text-white text-lg">Nino Tabagari</p>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col items-center w-full mt-8 h-full lg:pb-40">
            <div class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center h-16 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <p class="text-white w-[17rem] lg:w-[34rem] h-14 overflow-hidden resize-none px-3 py-3 border-0 bg-inherit">
                        {{ quote?.quote.en }}
                    </p>
                    <p class="lg:ml-10 text-white">Eng</p>
                </div>
                <div class="flex items-center h-16 lg:h-20 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <p class="text-white w-[17rem] lg:w-[34rem] h-14 px-3 py-3 resize-none bg-inherit">
                        {{ quote?.quote.ka }}
                    </p>
                    <p class="lg:ml-10 text-white">ქარ</p>
                </div>
                <div class="mt-5 rounded">
                    <img class="w-[20rem] lg:w-[40rem]" :src="imgUrl + quote?.image" />
                </div>
                <div class="flex mt-4 xl:mt-7">
                        <p class="text-white">1</p>
                        <img class="ml-3" src="@/assets/comment.svg"/>
                        <p class="text-white ml-4">10</p>
                        <img class="ml-3" src="@/assets/heart.svg" />
                    </div>  

            </div>
            <div class="flex flex-col mt-5">
                <div class="flex flex-col lg:mt-0">
                    <TheComment
                        v-for="comment in quote?.comments"
                            v-bind:key="comment.id"
                            :key="comment.id"
                            :id="comment.id"
                            :comment="comment.comment"
                    />
                </div>
                <div class="flex items-center px-5 lg:px-0  w-[22.3rem] h-14 lg:w-[20rem] xl:w-[45rem] 2xl:w-[50rem] lg:h-20 rounded bg-[#11101A]">
                    <div class="lg:ml-5">
                        <img src="@/assets/purple-female.svg" />
                    </div>
                    <Form @submit="handleSubmit">
                        <div class="bg-[#1C1B27] rounded lg:py-2 ml-2 w-full lg:ml-15 lg:w-[30rem] xl:w-[40rem] 2xl:w-[45rem]">
                            <Field class="bg-inherit ml-2 outline-none text-[#CED4DA]" name="comment" :placeholder="$t('feed.write_a_comment')" />  
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/i18n/index.js'
import TheComment from '@/components/NewsFeed/TheComment.vue';

const quoteId = useRoute().params.quoteId;
const quote = ref();
const router = useRouter()

const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;

onBeforeMount(() => {
    axiosInstance.get('quotes/'+quoteId).then((response)=>{
        console.log(response.data);
        quote.value = response.data
    })
});

const handleSubmit = (values) => {
    axiosInstance
        .post("add-comment", {
            comment: values.comment,
            quote_id: quoteId,
        })
        .then((response) => {
          alert("Comment added Successfully!");
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

const handleDelete = (values) => {
    axiosInstance
        .post('delete-quote/'+quoteId)
        .then((response) => {
          alert("Quote deleted Successfully!");
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

</script>