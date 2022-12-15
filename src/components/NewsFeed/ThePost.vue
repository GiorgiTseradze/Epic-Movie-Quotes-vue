<template>
    <div>
        <div class="flex flex-col">
            <div class="flex flex-col items-center  px-[2%] lg:ml-[4.8rem] 
            lg:w-[64%] border-b-2 mt-7 border-[#54535A] lg:bg-[#11101A]">
                <div class="flex items-center w-full py-3">
                    <img class="rounded-3xl w-12 h-12 object-fill " :src="quoteObj.user?.thumbnail" alt="profile-thumbnail" />
                    <p class="ml-4 text-white">{{quoteObj.user?.name}}</p>
                </div>
                <div class="flex w-full">
                    <div class="mt-4">
                        <p class="text-sm text-white break-all">{{ quote }}</p>
                    </div>
                </div>
                <div class="flex flex-col w-full h-full pb-10 border-b border-gray-600 ">
                    <div class="flex w-full mt-4 lg:h-[50%]">
                        <img class="w-full object-fill min-h-[15rem] lg:min-h-[25rem] rounded-lg lg:w-full max-h-[25rem] lg:max-h-[40rem] pb-2" :src="image" alt="post-photo"/>
                    </div>
                    <div class="flex mt-4 xl:mt-7 pb lg:pb-0">
                        <p class="text-white">{{comments?.length}}</p>
                        <img class="ml-3" src="@/assets/comment.svg" alt="comment-icon"/>
                        <p class="text-white ml-4">{{quoteObj.likes?.length}}</p>
                        <img v-if="!liked" @click="handleLike" class="ml-3 cursor-pointer" src="@/assets/heart.svg" alt="heart-icon" />
                        <img v-if="liked" @click="handleLike" class="ml-3 w-6 cursor-pointer" src="@/assets/red-heart.svg" alt="red-heart-icon" />
                    </div>  
                </div>
                <div class="flex flex-col w-full  overflow-auto max-h-[20rem]">
                <TheComment
                v-for="comment in comments"
                        v-bind:key="comment.id"
                        :key="comment.id"
                        :id="comment.id"
                        :comment="comment"
                />
            </div>
            <div class="flex items-center gap-4 w-full px-2 lg:px-0  h-14 lg:h-20 rounded bg-[#11101A]">
                <div class=" w-8">
                    <img :src="userStore?.user?.thumbnail" alt="user-image" />
                </div>
                <Form @submit="handleSubmit" class="w-full">
                    <div class="bg-[#1C1B27] rounded py-2  w-full">
                        <Field class="bg-inherit  outline-none text-[#CED4DA]" name="comment" :placeholder="$t('feed.write_a_comment')" />
                    </div>
                </Form>
            </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TheComment from '@/components/NewsFeed/TheComment.vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import { useRouter } from 'vue-router'
import axiosInstance from "@/config/axios/index.js";
import { useUserStore } from "@/stores/userStore.js"

const userStore = useUserStore();
const router = useRouter()
const quoteId = props.id
const liked = ref(false);


const handleSubmit = (values) => {
    axiosInstance
        .post("add-comment", {
            comment: values.comment,
            quote_id: quoteId,
            to_id: props.quoteObj.user.id
        })
        .then((response) => {
          router.push({ name: 'newsFeed'});
        })
        .catch((error) => {
        });
}

const handleLike = () => {
    axiosInstance
        .post("add-like", {
            quote_id: quoteId,
            to_id: props.quoteObj.user.id
        })
        .then((response) => {
          router.push({ name: 'newsFeed'});
        })
        .catch((error) => {
        });
}



onMounted(()=>{
    setTimeout(() => {
        const likes = props.quoteObj.likes;
        for(let i = 0; i < likes?.length; i++){
            if(likes[i].user_id === useUserStore().user.id){
                liked.value = true;
                break;
            }
        }
    }, 100);
})

const props = defineProps({
    quote: {
        type: String,
        required: true,
    },
    quoteObj: {
        type: Object,
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
