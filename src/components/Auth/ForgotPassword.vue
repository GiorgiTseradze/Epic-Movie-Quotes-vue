<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col md:w-[26.7rem] md:h-[25.1rem] md:mt-40 w-full h-screen fixed bg-[#181623] md:bg-[bg-[#24222F] z-50">
        <div v-if="loading" class="absolute flex items-center w-screen h-screen z-10">
            <div class="flex justify-center fixed w-screen h-screen backdrop-blur-sm"></div>        
                <div role="status" class="absolute ml-[45%] md:ml-[10rem] mb-[20rem] md:mb-[35rem]">
                    <svg aria-hidden="true" class="mr-2 w-14 h-14 md:h-24 md:w-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
        </div>  
        <div class="flex flex-col items-center w-full md:mt-16 mt-24 text-white">
            <p class="text-[2rem] font-medium">{{ $t("auth.forgot_password") }}</p>
            <p class="flex justify-center w-[20rem] text-sm mt-3 text-[#6C757D]">
                {{ $t("auth.enter_the_email_and_we_will_send_an_email_with") }}
            </p>
            <p class="flex justify-center w-[19rem] text-sm text-[#6C757D]">
                {{ $t("auth.instructions_to_reset_your_password") }}
            </p>
        </div>
        <div>
            <div class="flex flex-col">
                <Form @submit="handleSubmit"> 
                    <div class="flex flex-col items-center w-full mt-8">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field class="relative bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" name="email" rules="required|email" :placeholder="$t('auth.enter_your_email')" />
                        </div>
                    </div>
                <ErrorMessage class="absolute text-[#F15524] ml-8 mt-1" name="email" />
    
                    <div class="flex flex-col items-center w-full mt-10">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white" type="submit">{{ $t("auth.send_instructions") }}</button>
                        </div>
                    </div>
                </Form>

                    <div @click="$router.push({name: 'login'})" class="flex justify-center w-full mt-5">
                        <button>
                            <p class="flex text-[#6C757D]"><img class="mr-1" src="@/assets/back.svg" alt="back-icon" />{{ $t("auth.back_to_log_in") }}</p>
                        </button>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";
import router from "@/router";
import i18n from '@/i18n/index.js'


const loading = ref(false);

const handleSubmit = (values, actions) => {
    loading.value = true;
    axios
        .post("forgot-password", {
          email: values.email,
        })
        .then(() => {
          loading.value = false;
          router.push({ name: "checkEmail" });
        })
        .catch((error) => {
          loading.value = false;
          const errors = error.response.data.errors;
          if (i18n.global.locale == "en") {
            for(const err in errors){
                if (err === "email") {
                actions.setFieldError("email", "The selected email is invalid");
                break;
                } else {
                if (err === "email") {
                actions.setFieldError("email", "??????-??????????????? ???????????????????????? ?????? ????????????");
                break;
                }
                }
            }
            } 
        });
}

</script>