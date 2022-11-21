<template>
    <div class="flex flex-col md:w-[26.7rem] md:h-[30.3rem] md:mt-40 w-full h-screen fixed bg-[#181623] md:bg-[bg-[#24222F]">
        <div class="flex flex-col items-center w-full mt-16 text-white">
            <p class="text-[2rem] font-medium">Create new password</p>
            <p class="flex justify-center w-[19rem] text-sm mt-3 text-[#6C757D]">
                Your new password should be different from 
            </p>
            <p class="flex justify-center w-[19rem] text-sm text-[#6C757D]">
                previous used passwords
            </p>
        </div>
        <div>
            <div class="flex flex-col">
                <Form @submit="handleSubmit">
                    <div class="flex flex-col items-center w-full mt-8">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">Password<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 placeholder-text-xs outline-none" placeholder="At least 8 & max.15 lower case characters" />
                        </div>
                    </div>

                    <div class="flex flex-col items-center w-full mt-6">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">Confirm password<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field name="password_confirmation" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" placeholder="Confirm password" />
                        </div>
                    </div>
        
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white">Reset password</button>
                        </div>
                    </div>
                </Form>

                <div class="flex justify-center w-full mt-5">
                    <p class="flex text-[#6C757D]"><img class="mr-1" src="@/assets/back.svg" />Back to log in</p>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";

//to be changed
const handleSubmit = (values) => {
    axios
        .post("reset", {
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then(() => {
          alert("reset Successful!");
          this.$router.push({ name: "landing" });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
}
</script>