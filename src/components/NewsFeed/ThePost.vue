<template>
    <div>
        <div class="flex flex-col">
            <div class="flex flex-col items-center h-[22rem] lg:h-[38rem] lg:px-10 lg:py-10 w-[22.3rem] lg:ml-[4.8rem] lg:w-[35rem] xl:w-[45rem] 2xl:w-[50rem] border-b-2 mt-7 border-[#54535A] lg:bg-[#11101A]">
                <div class="flex items-center w-full">
                    <img src="@/assets/purple-female.svg" alt="profile-thumbnail" />
                    <p class="ml-4 text-white">Maia Nakashidze</p>
                </div>
                <div class="flex w-full">
                    <div class="mt-4">
                        <p class="text-sm text-white">“Follow your dream.”movie- Billy Elliot. (2000)</p>
                    </div>
                </div>
                <div class="flex flex-col w-full h-[12.5rem]">
                    <div class="flex w-full mt-4">
                        <img class="lg:w-full lg:h-full" src="@/assets/post-photo.svg" alt="post-photo"/>
                    </div>
                    <div class="flex mt-4">
                        <p class="text-white">1</p>
                        <img class="ml-3" src="@/assets/comment.svg"/>
                        <p class="text-white ml-4">10</p>
                        <img class="ml-3" src="@/assets/heart.svg" />
                    </div>  
                </div>

            </div>
                
            <TheComment />
        </div>

    </div>
</template>

<script setup>
import TheComment from '@/components/NewsFeed/TheComment.vue';
// defineProps({
//     name: {
//         type: String,
//         required: true,
//     }
// })
</script>
