<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="md:w-[37.5rem] md:h-[35.1rem] w-full lg:mt-28 h-screen fixed bg-[black] z-50">
        <div class="flex flex-col items-center w-full mt-16 text-white">
            <p class="text-2xl">{{$t("auth.log_in_to_your_account") }}</p>
            <p class="text-[#6C757D]">{{ $t("auth.please_enter_your_details") }}</p>
        </div>
        <div>
            <div class="flex flex-col">

                <Form @submit="handleSubmit" v-slot="{ field, meta }">
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex flex-col relative w-[22.5rem]">
                            <Field name="email" rules="required"
                                :placeholder="$t('auth.enter_your_email')" v-slot="{ field, meta }" >
                                <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" 
                                :class="[!meta.valid && meta.touched || inputError === 1 ? 'border-red-300 border-2' 
                                : '', meta.valid && meta.touched && inputError === 0 ? 'border-green-400 border-2' : '']" />
                                <img :class="meta.valid && meta.touched && inputError === 0 ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" 
                                src="@/assets/valid.svg" alt="valid-icon" />
                                <img :class="!meta.valid && meta.touched && inputError === 0 ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" 
                                src="@/assets/error.svg" alt="error-icon" />
                            </Field>
                            <ErrorMessage name="email" class="absolute mt-[3rem] text-sm text-[#F15524]" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-6">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.password") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex flex-col relative w-[22.5rem]">
                            <Field name="password" rules="required" :class="inputError === 1 ? 'bg-red-400 placeholder-white' : ''"
                             :placeholder="$t('auth.password')" v-slot="{ field, meta }">
                                <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none"  v-bind="field" 
                                :class="[!meta.valid && meta.touched || inputError === 1 ? 'border-[#E31221] border-2' 
                                : '', meta.valid && meta.touched && inputError === 0 ? 'border-green-400 border-2' : '']"  :type="showPassword ? 'text' : 'password'" />
                                <img :class="meta.valid && meta.touched && inputError === 0 ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" alt="valid-icon" />
                                <img :class="!meta.valid && meta.touched && inputError === 0 ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/error.svg" alt="error-icon" />
                            </Field> 
                            <ErrorMessage name="password" class="absolute mt-[3rem] text-sm text-[#F15524]" />
                            <img v-if="showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer p-1" 
                            src="@/assets/eye.svg" alt="eye-icon" />
                            <img v-if="!showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer p-1" 
                            src="@/assets/closed-eye.svg" alt="closed-eye-icon" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-7">
                        <div class="flex items-center w-[22.5rem]">
                            <Field name="remember" v-slot="{ field }">
                                <input v-bind="field" type="checkbox" name="remember" true-value="yes" false-value="no" class="cursor-pointer px-1 py-1" />   
                            </Field>
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
                            <img class="mr-2" src="@/assets/gmail.svg" alt="gmail-icon" /> 
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
import { ref } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/jwt-axios.js";
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import i18n from '@/i18n/index.js'

const authStore = useAuthStore();

const router = useRouter()
const inputError = ref(0);
const showPassword = ref(false);

const handleShow = () => {
    showPassword.value = !showPassword.value
}

const url = `${import.meta.env.VITE_API_BASE_URL}/google/login`;


const handleSubmit = (values, actions) => {
    axiosInstance
        .post("login", {
          email: values.email,
          password: values.password,
          remember: values.remember
        })
        .then(() => {
            authStore.authenticated = true;
            router.push({ name: 'newsFeed'});
            inputError.value = 0;
        })
        .catch((error) => {
            console.log(error)
            inputError.value = 1;
            const errors = error.response.data.errors;
            for(const err in errors){
                if (i18n.global.locale == "en") {
                if (err === "name") {
                actions.setFieldError("name", "Name does not exist");
                break;
                }
                if (err === "email") {
                actions.setFieldError("email", "Email does not exist");
                break;
                }
                if (err === "password") {
                actions.setFieldError("password", "Password is incorrect");
                }
                if (err === "verification") {
                actions.setFieldError("email", "Email is not verified");
                }
            } else {
                if (err === "name") {
                actions.setFieldError("name", "სახელი არ არსებობს");
                break;
                }
                if (err === "email") {
                actions.setFieldError("email", "ელ-ფოსტა არ არსებობს");
                break;
                }
                if (err === "password") {
                actions.setFieldError("password", "პაროლი არასწორია");
                }
                if (err === "verification") {
                actions.setFieldError("email", "ელ-ფოსტა არ არის გააქტიურებული");
                }
            }
        } 
        });
}

</script>