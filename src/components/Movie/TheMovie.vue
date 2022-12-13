<template>
<div class="flex items-center justify-center w-full h-full bg-[#181623]">
    <div @click="$router.push({name:'currentMovie',params:{movieId:id}})"  class="cursor-pointer flex flex-col justify-center lg:w-[30rem] h-full lg:ml-5 lg:px-3 w-[22.3rem] mt-14">
        <img class="object-fill w-[22rem] lg:w-[27rem] h-[20rem]" :src="image" />
        <p class="text-white mt-4">{{ name }}</p>
        <div class="flex mt-4">
            <p class="text-white">10</p>
            <img class="ml-2" src="@/assets/quote.svg" />
        </div>
    </div>
</div>
</template>

<script setup>

defineProps({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    id:{
        type:Number,
        required:true,
    }
})

</script>