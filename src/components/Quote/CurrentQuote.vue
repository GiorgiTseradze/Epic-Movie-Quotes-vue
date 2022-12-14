<template>
    <div @click="$router.push({name: 'newsFeed'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col items-center z-50 w-screen h-screen fixed overflow-scroll lg:w-[50rem] lg:h-[60rem] pb-20 lg:mt-20 bg-black">
        <div class="flex items-center py-5 lg:py-0 w-[22rem] lg:w-full lg:h-16 border-b-[0.06rem] bg-inherit border-[#40414A]">
            <div class="flex mt-3 ml-2 lg:ml-16 px-3 h-5 border-r-[0.06rem] border-[#40414A]">
                <button @click="$router.push({name:'updateQuote',params:{quoteId}})" class="flex items-center">
                    <img src="@/assets/edit.svg" />
                </button>
            </div>
            <div class="flex ml-4 mt-3">
                <button @click="handleDelete" class="flex items-center">
                    <img src="@/assets/delete.svg" />
                </button>
            </div>
            <div class="flex w-34 ml-14 lg:mt-12 lg:ml-[13rem] h-10 lg:mb-12 items-center">
                <p class="text-white">{{ $t("feed.view_quote")}}</p>
            </div>
            <div class="flex absolute w-[21rem] lg:w-[42rem] justify-end ml-3 lg:ml-10">
                <router-link :to="{name: 'newsFeed'}">
                    <img class="mr-4" src="@/assets/x-grey.svg" />
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
            <div class="flex flex-col w-[20rem] lg:w-[40rem]">
                <div class="flex items-center border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <div class="flex text-white w-[17rem] lg:w-[34rem] overflow-hidden break-word
                    resize-none px-3 py-5 border-0 placeholder-[#6C757D] outline-none bg-inherit">
                        <p class="break-all">
                            "{{quoteEn}}"
                        </p>
                    </div>
                    <p class="lg:ml-10 text-[#6C757D]">Eng</p>
                </div>
                <div class="flex items-center border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <div class="flex text-white w-[17rem] lg:w-[34rem] overflow-hidden break-word
                    resize-none px-3 py-5 border-0 placeholder-[#6C757D] outline-none bg-inherit">
                        <p class="break-all">
                            "{{quoteKa}}"
                        </p>
                    </div>
                    <p class="lg:ml-10 text-[#6C757D]">ქარ</p>
                </div>
                <div class="flex items-center h-80 border-[0.06rem] mt-4 border-[#6C757D] rounded">
                    <img class="object-fill w-[20rem] lg:w-[40rem] h-[19.6rem] lg:h-[20rem]" :src="imgUrl+quoteImg" />
                </div>
            </div>
            
        </div>
        <div class="flex w-[20rem] lg:w-[40rem] mt-4 xl:mt-7">
            <p class="text-white">{{comments?.length}}</p>
            <img class="ml-3" src="@/assets/comment.svg"/>
            <p class="text-white ml-4">{{likes?.length}}</p>
            <img class="ml-3" src="@/assets/heart.svg" />
        </div> 
                <div v-for="comment in comments" v-bind:key="comment.id" class="px-5 w-[22rem] lg:w-[40rem] lg:py-2 rounded">
                    <div class="flex flex-col w-full mt-5">
                        <div class="flex flex-col w-full lg:w-[39rem] border-b-2 pb-6 border-[#54535A]">
                            <div class="flex items-center">
                                <div class="">
                                    <img class="rounded-full w-12 h-12 object-cover" :src="userStore.user?.thumbnail" />
                                </div>
                                <div>
                                    <p class="text-white ml-4">{{userStore.user?.name}}</p>
                                </div>
                            </div>
                            <div class="flex ml-14 lg:ml-4 mt-3">
                                <p class="text-white lg:ml-10">
                                    {{ comment.comment }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from "@/config/axios/index.js";
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from "@/stores/userStore.js"

const userStore = useUserStore();
const fileModel = ref(null);
const imgUrl = import.meta.env.VITE_API_BASE_URL_IMG;

const router = useRouter()
const quoteId = useRoute().params.quoteId;

const likes = ref();
const quoteEn = ref('');
const quoteKa = ref('');
const quoteImg = ref('');
const comments = ref();


const handleDelete = () => {
    axiosInstance
        .post('delete-quote/'+quoteId)
        .then((response) => {
          quoteStore.quotesRefresh();
          quoteStore.getQuotes();
          router.push({name:'currentMovie',params:{movieId:movieId}});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

onMounted(()=>{
    axiosInstance.get('quotes/'+quoteId).then((response)=>{
        likes.value = response.data.likes
        quoteEn.value = response.data.quote.en
        quoteKa.value = response.data.quote.ka
        quoteImg.value = response.data.image
        comments.value = response.data.comments
    })
});

</script>