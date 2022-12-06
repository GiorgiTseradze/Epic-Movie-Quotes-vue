<template>
    <div class="px-5 w-[22rem] lg:w-[35rem] xl:w-[45rem] 2xl:w-[50rem] lg:py-5 rounded lg:bg-[#11101A]">
        <div class="flex flex-col w-full mt-5 lg:bg-[#11101A]">
            <div class="flex flex-col w-full lg:w-[33rem] xl:w-[43rem] 2xl:w-[48rem] border-b-2 pb-6 border-[#54535A]">
                <div class="flex items-center">
                    <div class="">
                        <img src="@/assets/red-female.svg" />
                    </div>
                    <div>
                        <p class="text-white ml-4">Nika Tsetskhladze</p>
                    </div>
                </div>
                <div class="flex mt-3">
                    <p class="text-white">
                        {{ comment }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    comment: {
        required: false
    }
})
</script>p