<template>
    <div class="flex flex-col bg-[#171623] w-full h-screen fixed">
        <div class="flex justify-center items-center px-9 h-20 bg-[#24222F]">
            <div class="flex justify-between w-[20rem]">
                <TheBurger />
                <div>
                    <img src="@/assets/bell.svg" />
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center h-[4rem]">
            <div class="w-[20rem]">
                <img src="@/assets/back.svg" class="w-5" />
            </div>
        </div>

        <Form @submit="handleSubmit">
            <div class="flex flex-col h-[12rem]">

                <div>
                    <div class="flex flex-col items-center mt-[3rem] w-full">
                        <div class="flex flex-col w-[23rem] h-[10rem] py-15 bg-[#24222F] rounded">
                            <label class="text-white mt-10 ml-6" for="new_username">{{ $t("profile.add_new_username") }}</label>
                            <div class="flex w-full justify-center">
                                <Field name="new_username" class="bg-[#CED4DA] w-[20rem] h-[3rem] rounded px-3 mt-2 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center mt-20">
                <div class=" text-[1.1rem]">
                    <button>
                        <p class="text-gray-300">{{ $t("profile.cancel") }}</p>
                    </button>
                </div>
                <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] h-10 w-[5rem] rounded">
                    <button class="flex text-white">{{ $t("profile.add") }}</button>
                </div>
            </div>
        </Form>

        <div>

        </div>
    </div>
</template>

<script setup>

import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";
import TheBurger from '@/components/General/TheBurger.vue';

//to be changed
const handleSubmit = (values) => {
    axios
        .post("login", {
          email: values.new_username,
        })
        .then(() => {
          alert("Login Successful!");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
}

</script>