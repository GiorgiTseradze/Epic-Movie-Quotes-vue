<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex flex-col md:w-[26.7rem] md:h-[25.1rem] md:mt-40 w-full h-screen fixed bg-[#181623] md:bg-[bg-[#24222F] z-50">
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
                <Form  @submit="handleSubmit"> 
                    <div class="flex flex-col items-center w-full mt-8">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" name="email" :placeholder="$t('auth.enter_your_email')" />
                        </div>
                    </div>
                <ErrorMessage class="text-[#F15524]" name="" />
    
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white" type="submit">{{ $t("auth.send_instructions") }}</button>
                        </div>
                    </div>
                </Form>

                    <div class="flex justify-center w-full mt-5">
                        <button>
                            <p class="flex text-[#6C757D]"><img class="mr-1" src="@/assets/back.svg" />{{ $t("auth.back_to_log_in") }}</p>
                        </button>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";

const handleSubmit = (values) => {
    axios
        .post("forgot-password", {
          email: values.email,
        })
        .then(() => {
          alert("Registration Successful!");
          this.$router.push({ name: "/landing" });
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
}

</script>