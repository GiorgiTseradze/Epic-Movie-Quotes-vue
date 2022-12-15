<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>  
    <div class="md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-black z-50">
        <div v-if="loading" class="fixed flex items-center w-screen h-screen z-10">
            <div class="flex justify-center fixed w-screen h-screen backdrop-blur-sm"></div>        
                <div role="status" class="absolute ml-[45%] md:ml-[11rem] mb-[3rem] md:mb-[10rem]">
                    <svg aria-hidden="true" class="mr-2 w-14 h-14 md:h-24 md:w-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
        </div>      
        <div class="flex flex-col items-center w-full mt-10 lg:mt-16 text-white">
            <p class="text-2xl">{{ $t("auth.create_an_account")}}</p>
            <p class="text-[#6C757D]">{{ $t("auth.start_your_journey") }}</p>
        </div>
        <div>
        <div class="flex flex-col">
            <Form @submit="handleSubmit" v-slot="{ field, meta }">
                <div class="flex flex-col items-center w-full mt-5">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.name") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex flex-col relative w-[22.5rem]">
                        <Field name="name" rules="required|min:3|max:15|lowalphanumeric" v-slot="{ field, meta }"
                         :placeholder="$t('auth.enter_your_name')">
                            <input class="bg-[#CED4DA] relative w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field"
                            :class="[!meta.valid && meta.touched ? 'border-red-300 border-2' 
                            : '', meta.valid && meta.touched ? 'border-green-400 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" />
                        </Field>
                        <ErrorMessage class="absolute mt-[3rem] text-sm text-[#F15524]" name="name" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex flex-col w-[22.5rem] relative">
                        <Field name="email" rules="required|email"
                        :placeholder="$t('auth.enter_your_email')" v-slot="{ field, meta }" >
                            <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" 
                            :class="[!meta.valid && meta.touched ? 'border-red-300 border-2' 
                            : '', meta.valid && meta.touched ? 'border-green-400 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" />
                        </Field>
                        <ErrorMessage class="absolute mt-[3rem] text-sm text-[#F15524]" name="email" />
                    </div>
                </div>
                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.password") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex w-[22.5rem]">
                        <Field name="password" rules="required|min:8|max:15" v-slot="{ field, meta }"
                         :placeholder="$t('auth.password')">
                            <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" :type="showPassword ? 'text' : 'password'"
                                :class="[!meta.valid && meta.touched ? 'border-red-300 border-2' 
                                : '', meta.valid && meta.touched ? 'border-green-400 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" />
                        </Field>
                        <img v-if="showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" src="@/assets/eye.svg" />
                        <img v-if="!showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" src="@/assets/closed-eye.svg" />
                        <ErrorMessage class="absolute mt-[2.8rem] py-1 text-sm text-[#F15524]" name="password" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.password_confirmation")}}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex flex-col w-[22.5rem] relative pb-2">
                        <Field name="password_confirmation" rules="required|min:8|max:15" v-slot="{ field, meta }"
                        :placeholder="$t('auth.password_confirmation')">
                            <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" :type="showPasswordConfirm ? 'text' : 'password'"
                                :class="[!meta.valid && meta.touched ? 'border-red-300 border-2' 
                                : '', meta.valid && meta.touched ? 'border-green-400 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" />
                        </Field>
                        <img v-if="showPasswordConfirm" @click="handleShowConfirm" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" src="@/assets/eye.svg" />
                        <img v-if="!showPasswordConfirm" @click="handleShowConfirm" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" src="@/assets/closed-eye.svg" />
                        <ErrorMessage class="absolute mt-[3rem] py-1 text-sm text-[#F15524]" name="password_confirmation" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-7">
                    <div class="flex items-center justify-center bg-red-600 h-10 w-[22.5rem] rounded">
                            <button class="flex text-white" type="submit">{{ $t("auth.get_started") }}</button>
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

                <div @click="$router.push({name: 'login'})" class="flex justify-center w-full mt-5">
                    <p class="text-[#6C757D]">{{ $t("auth.already_have_an_account") }}</p>
                    <button class="text-[#0D6EFD] underline ml-1">{{ $t("auth.log_in") }}</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue';
import i18n from '@/i18n/index.js'

const router = useRouter()
const url = `${import.meta.env.VITE_API_BASE_URL}/google/login`;
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const inputError = ref(0);
const loading = ref(false);

const handleShow = () => {
    showPassword.value = !showPassword.value
}

const handleShowConfirm = () => {
    showPasswordConfirm.value = !showPasswordConfirm.value
}

const handleSubmit = (values, actions) => {
    console.log(values)
    loading.value = true;
    axiosInstance
        .post("register", {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then((response) => {
          router.push({ name: 'emailSent'});
          console.log(response);
          inputError.value = 0;
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
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