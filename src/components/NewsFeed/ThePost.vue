<template>
    <div>
        <div class="flex flex-col items-center">
            <div class="flex flex-col items-center h-[22rem] w-[22.3rem] border-b-2 mt-7 border-[#54535A]">
                <div class="flex items-center w-full">
                    <img src="@/assets/purple-female.svg" alt="profile-thumbnail" />
                    <p class="ml-4 text-white">{{name}}</p>
                </div>
                <div class="flex w-full">
                    <div class="mt-4">
                        <p class="text-sm text-white">“Follow your dream.”movie- Billy Elliot. (2000)</p>
                    </div>
                </div>
                <div class="flex flex-col w-full h-[12.5rem]">
                    <div class="flex mt-4">
                        <img src="@/assets/post-photo.svg" alt="post-photo"/>
                    </div>
                    <div class="flex mt-4">
                        <p class="text-white">1</p>
                        <img class="ml-3" src="@/assets/comment.svg"/>
                        <p class="text-white ml-4">10</p>
                        <img class="ml-3" src="@/assets/heart.svg" />
                    </div>
                </div>

            </div>
            <div class="flex">
                <TheComment />
            </div>
        </div>

    </div>
</template>

<script setup>
import TheComment from '@/components/NewsFeed/TheComment.vue';
defineProps({
    name: {
        type: String,
        required: true,
    }
})
</script>
