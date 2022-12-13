<template>
    <div class=" w-full lg:py-5 rounded lg:bg-[#11101A]">
        <div class="flex flex-col w-full mt-5 lg:bg-[#11101A]">
            <div class="flex flex-col w-full border-b-2 pb-6 border-[#54535A]">
                <div class="flex items-center">
                    <div class="">
                        <img class="rounded-3xl w-12 h-12 object-cover" :src="comment.user?.thumbnail" />
                    </div>
                    <div>
                        <p class="text-white ml-4">{{ comment?.user?.name }}</p>
                    </div>
                </div>
                <div class="flex mt-3 w-full">
                    <p class="text-white break-all">
                        {{ comment.comment }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
defineProps({
    comment: {
        required: false
    }
})
</script>