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
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 placeholder-text-xs outline-none" :placeholder="$t('auth.at_least_x_lower_case_characters')" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-6">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.password_confirmation") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="password_confirmation" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.password_confirmation')" />
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
import { Field, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

const router = useRouter()
const token = ref();
const email = ref('');
onBeforeMount(()=>{
    if(useRoute().query.reset_password_token){
        token.value = useRoute().query.reset_password_token;
        email.value = useRoute().query.email;
    }
    else{
        router.push({name:'landing'});
    }
})


const handleSubmit = (values) => {
    axiosInstance
        .post("reset-password", {
            email: email.value,
            token: token.value,
            password: values.password,
            password_confirmation: values.password_confirmation,
        })
        .then(() => {
          router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
}
</script>