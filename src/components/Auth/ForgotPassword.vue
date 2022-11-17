<template>
    <div class="w-full h-screen fixed bg-black">
        <div class="flex flex-col items-center w-full mt-16 text-white">
            <p class="text-[2rem] font-medium">Forgot Password?</p>
            <p class="flex justify-center w-[19rem] text-sm mt-3 text-[#6C757D]">
                Enter the email and we’ll send an email with
            </p>
            <p class="flex justify-center w-[19rem] text-sm text-[#6C757D]">
                instructions to reset your password
            </p>
        </div>
        <div>
            <div class="flex flex-col">
                <Form  @submit="handleSubmit"> 
                    <div class="flex flex-col items-center w-full mt-8">
                        <div class="w-[22.5rem]">
                            <section class="flex text-white">Email<p class="text-red-500 ml-1"> *</p></section>
                        </div>
                        <div class="flex w-[22.5rem] justify-center">
                            <Field class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" name="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    <ErrorMessage class="text-[#F15524]" name="" />
    
                    <div class="flex flex-col items-center w-full mt-5">
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white" type="submit">Send instructions</button>
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
          alert(error.response.data.message);
        });
}

</script>