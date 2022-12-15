<template>
    <div class="flex flex-col md:w-[26.7rem] md:h-[30.3rem] md:mt-40 w-full h-screen fixed bg-[#181623] md:bg-[bg-[#24222F]">
        <div class="flex flex-col items-center w-full mt-16 text-white">
            <p class="text-[2rem] font-medium">{{ $t("auth.create_new_password") }}</p>
            <p class="flex justify-center w-[19rem] text-sm mt-3 text-[#6C757D]">
                {{ $t("auth.your_new_password_should_be_different_from") }}
            </p>
            <p class="flex justify-center w-[19rem] text-sm text-[#6C757D]">
                {{ $t("auth.previous_used_passwords") }}
            </p>
        </div>
        <div>
            <div class="flex flex-col">
                <Form @submit="handleSubmit">
                    <div class="flex flex-col items-center w-full mt-8">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.password") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem]">
                        <Field name="password" rules="required|min:8|max:15" v-slot="{ field, meta }"
                         :placeholder="$t('auth.password')">
                            <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" :type="showPassword ? 'text' : 'password'"
                                :class="[!meta.valid && meta.touched ? 'border-red-500 border-2' 
                                : '', meta.valid && meta.touched ? 'border-green-500 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" 
                            src="@/assets/valid.svg" alt="valid-icon" />
                        </Field>
                        <img v-if="showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" 
                        src="@/assets/eye.svg" alt="eye-icon" />
                        <img v-if="!showPassword" @click="handleShow" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" 
                        src="@/assets/closed-eye.svg" alt="closed-eye-icon" />
                        <ErrorMessage class="absolute mt-[2.8rem] py-1 text-sm text-[#F15524]" name="password" />
                    </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-6">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.password_confirmation") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex flex-col w-[22.5rem] relative pb-2">
                        <Field name="password_confirmation" rules="required|min:8|max:15" v-slot="{ field, meta }"
                        :placeholder="$t('auth.password_confirmation')">
                            <input class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" v-bind="field" :type="showPasswordConfirm ? 'text' : 'password'"
                                :class="[!meta.valid && meta.touched ? 'border-red-500 border-2' 
                                : '', meta.valid && meta.touched ? 'border-green-500 border-2' : '']" />
                            <img :class="meta.valid && meta.touched ? 'block' : 'hidden'" class="absolute ml-80 mt-3 cursor-pointer p-1" src="@/assets/valid.svg" />
                        </Field>
                        <img v-if="showPasswordConfirm" @click="handleShowConfirm" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" 
                        src="@/assets/eye.svg" alt="eye-icon" />
                        <img v-if="!showPasswordConfirm" @click="handleShowConfirm" class="absolute ml-[18.7rem] mt-[0.9rem] cursor-pointer py-1 px-1" 
                        src="@/assets/closed-eye.svg" alt="closed-eye-icon" />
                        <ErrorMessage class="absolute mt-[3rem] py-1 text-sm text-[#F15524]" name="password_confirmation" />
                    </div>

                    </div>
        
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white">{{ $t("auth.reset_password") }}</button>
                        </div>
                    </div>
                </Form>

                <div class="flex justify-center w-full mt-5" >
                    <button @click="$router.push({name:'login'})">
                        <p class="flex text-[#6C757D]"><img class="mr-1" src="@/assets/back.svg" alt="back-icon"/>{{ $t("auth.back_to_log_in")}}</p>
                    </button>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import i18n from '@/i18n/index.js'

const router = useRouter()
const token = ref();
const email = ref('');
const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const handleShow = () => {
    showPassword.value = !showPassword.value
}

const handleShowConfirm = () => {
    showPasswordConfirm.value = !showPasswordConfirm.value
}


onBeforeMount(()=>{
    if(useRoute().query.reset_password_token){
        token.value = useRoute().query.reset_password_token;
        email.value = useRoute().query.email;
    }
    else{
        router.push({name:'landing'});
    }
})


const handleSubmit = (values, actions) => {
    axiosInstance
        .post("reset-password", {
            email: email.value,
            token: token.value,
            password: values.password,
            password_confirmation: values.password_confirmation,
        })
        .then(() => {
          router.push({ name: "passwordSuccess" });
        })
        .catch((error) => {
        const errors = error.response.data.errors;
          for(const err in errors){
            if (i18n.global.locale == "en") {
                if (err === "password") {
                actions.setFieldError("password", "Password doesn't match");
                }
            } else {
                if (err === "password") {
                actions.setFieldError("password", "პაროლები არ ემთხვევა");
                }
            }
        }
        });
}
</script>