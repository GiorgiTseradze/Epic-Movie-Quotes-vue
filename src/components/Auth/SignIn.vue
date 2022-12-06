<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="md:w-[37.5rem] md:h-[35.1rem] w-full lg:mt-28 h-screen fixed bg-[black] z-50">
        <div class="flex flex-col items-center w-full mt-16 text-white">
            <p class="text-2xl">{{$t("auth.log_in_to_your_account") }}</p>
            <p class="text-[#6C757D]">{{ $t("auth.please_enter_your_details") }}</p>
        </div>
        <div>
            <div class="flex flex-col">

                <Form @submit="handleSubmit">
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="email" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.email')" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.password") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="password" type="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.password')" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center w-[22.5rem]">
                            <input type="checkbox" />
                            <p class="text-white ml-1 text-base w-[8.5rem]">{{ $t("auth.remember_me") }}</p>
                            <router-link :to="{name: 'forgotPassword'}">
                                <p class="text-[#0D6EFD] text-base underline ml-[6rem] w-[8.5rem]">{{ $t("auth.forgot_password") }}</p>
                            </router-link>
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white">{{ $t("auth.sign_in") }}</button>
                        </div>
                    </div>
                </Form>

                <div class="flex flex-col items-center w-full mt-3">
                    <div class="flex items-center justify-center bg-black border rounded border-white h-10 w-[22.5rem]">
                        <form :action="url">
                            <button class="flex items-center text-white">
                            <img class="mr-2" src="@/assets/gmail.svg" /> 
                            {{ $t("auth.sign_in_with_google") }}
                            </button>
                        </form>

                    </div>
                </div>

                <div class="flex justify-center w-full mt-5">
                    <p class="text-[#6C757D]">{{ $t("auth.already_have_an_account") }}</p>
                    <router-link :to="{name: 'createAccount'}">
                        <button class="text-[#0D6EFD] underline ml-1">{{ $t("auth.sign_up")}}</button>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter()

const url = `${import.meta.env.VITE_API_BASE_URL}/google/login`;

const handleSubmit = (values) => {
    axiosInstance
        .post("login", {
          email: values.email,
          password: values.password,
        })
        .then(() => {
            authStore.authenticated = true;
            router.push({ name: 'newsFeed'});
        })
        .catch((error) => {
          console.log(error)    
        });
}

</script>