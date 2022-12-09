<template>
    <div>
        <div class="flex flex-col">
            <div class="flex flex-col items-center cursor-pointer h-[26.5rem] lg:h-[38rem] xl:h-[43rem] 2xl:h-[46rem] px-5 lg:px-10 lg:py-10 w-[22.3rem] lg:ml-[4.8rem] 
            lg:w-[35rem] xl:w-[45rem] 2xl:w-[50rem] border-b-2 mt-7 border-[#54535A] lg:bg-[#11101A]">
                <div class="flex items-center w-full">
                    <img src="@/assets/purple-female.svg" alt="profile-thumbnail" />
                    <p class="ml-4 text-white">Maia Nakashidze</p>
                </div>
                <div class="flex w-full">
                    <div class="mt-4">
                        <p class="text-sm text-white">{{ quote }}</p>
                    </div>
                </div>
                <div class="flex flex-col w-full h-full">
                    <div class="flex w-full mt-4 lg:h-[25rem] xl:h-[30rem] 2xl:h-[33rem]">
                        <img class="object-fill w-[22rem] h-[16rem] lg:w-full lg:h-full" :src="image" alt="post-photo"/>
                    </div>
                    <div class="flex mt-4 xl:mt-7">
                        <p class="text-white">1</p>
                        <img class="ml-3" src="@/assets/comment.svg"/>
                        <p class="text-white ml-4">10</p>
                        <img class="ml-3" src="@/assets/heart.svg" />
                    </div>  
                </div>
            </div>
                
            <div class="flex flex-col lg:mt-0 lg:ml-20 lg:w-[30rem]">
                <TheComment
                v-for="comment in comments"
                        v-bind:key="comment.id"
                        :key="comment.id"
                        :id="comment.id"
                        :comment="comment.comment"
                />
            </div>

            <div class="flex items-center px-2 lg:px-0  w-[22.3rem] h-14 lg:ml-20 lg:w-[35rem] xl:w-[45rem] 2xl:w-[50rem] lg:h-20 rounded bg-[#11101A]">
                <div class="lg:ml-5 w-8">
                    <img src="@/assets/purple-female.svg" />
                </div>
                <Form @submit="handleSubmit">
                    <div class="bg-[#1C1B27] rounded lg:py-2 py-2 ml-2 lg:ml-15 w-[18rem] lg:w-[30rem] xl:w-[40rem] 2xl:w-[45rem]">
                        <Field class="bg-inherit ml-2 outline-none text-[#CED4DA]" name="comment" :placeholder="$t('feed.write_a_comment')" />
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheComment from '@/components/NewsFeed/TheComment.vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import { useRouter } from 'vue-router'
import axiosInstance from "@/config/axios/index.js";

const router = useRouter()
const quoteId = props.id

const handleSubmit = (values) => {
    axiosInstance
        .post("add-comment", {
            comment: values.comment,
            quote_id: quoteId,
        })
        .then((response) => {
          router.push({ name: 'newsFeed'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

const props = defineProps({
    quote: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    id: {
        type:Number,
        required: true,
    },
    comments: {
        required: false
    }
})
</script>
