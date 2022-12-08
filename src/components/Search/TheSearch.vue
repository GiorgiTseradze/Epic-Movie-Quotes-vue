<template>
    <div v-if="search" @click="handleSearch" class="lg:hidden flex justify-center fixed w-screen h-[100rem] z-40"></div>        
    <div class="z-50 lg:hidden">
        <div @click="handleSearch" class="flex lg:hidden ml-64 z-50">
            <img src="@/assets/search.svg" />
        </div>
        
        <div v-if="search" class="absolute flex flex-col md:mx-auto lg:hidden w-full left-0 top-0 bg-[#11101A] h-[35rem] z-50">
            <div class="flex h-20 border-b-[0.06rem] border-[#40414A] w-full">
                <div @click="handleSearch" class="cursor-pointer flex items-center ml-10">
                    <img class="w-5" src="@/assets/back.svg" />
                </div>
                <div class="flex mt-7 ml-2">
                    <Form>
                        <Field class="w-16 ml-3 outline-none bg-inherit text-[#CED4DA] placeholder-white" name="search" placeholder="Search" />
                    </Form>
                </div>
            </div>
            <div class="flex flex-col text-[#65646A] ml-16 mt-5">
                <p>Enter <section class="inline text-white">@</section> to search movies</p>
                <p class="mt-3">Enter <section class="inline text-white">#</section> to search quotes</p>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import { Field, Form } from 'vee-validate';

const search = ref(false);

const handleSearch = () => {
    search.value = !search.value
}

</script>