<template>
<div class="md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-black">
    <div class="flex flex-col items-center w-full mt-16 text-white">
        <p class="text-2xl">Create an account</p>
        <p class="text-[#6C757D]">Start your journey!</p>
    </div>
    <div>
    <div class="flex flex-col">
        <Form @submit="handleSubmit">

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-[22.5rem]">
                    <section class="flex text-white">Name<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-[22.5rem] justify-center">
                    <Field name="name" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" placeholder="Enter your name" />
                </div>
                <ErrorMessage class="text-[#F15524]" name="name" />
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-[22.5rem]">
                    <section class="flex text-white">Email<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-[22.5rem] justify-center">
                    <Field name="email" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" placeholder="Enter your email" />
                </div>
                <ErrorMessage class="text-[#F15524]" name="email" />
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-[22.5rem]">
                    <section class="flex text-white">Password<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-[22.5rem] justify-center">
                    <Field name="password" type="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" placeholder="Password" />
                </div>
                <ErrorMessage class="text-[#F15524]" name="password" />
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-[22.5rem]">
                    <section class="flex text-white">Confirm Password<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-[22.5rem] justify-center">
                    <Field name="password_confirmation" type="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" placeholder="Password" />
                </div>
                <ErrorMessage class="text-[#F15524]" name="password_confirmation" />
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                        <button class="flex text-white" type="submit">Get Started</button>
                </div>
            </div>
        </Form>
       

            <div class="flex flex-col items-center w-full mt-3">
                <div class="flex items-center justify-center bg-black border rounded border-white h-10 w-[22.5rem]">
                    <button class="flex items-center text-white">
                        <img class="mr-2" src="@/assets/gmail.svg" /> 
                        Sign up with Google
                    </button>
                </div>
            </div>

            <div class="flex justify-center w-full mt-5">
                <p class="text-[#6C757D]">Already have an account?</p>
                <button class="text-[#0D6EFD] underline ml-1">Log in</button>
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";

const handleSubmit = (values) => {
    console.log(values.name)

    axios
        .post("register", {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then((response) => {
          alert("Registration Successful!");
          this.$router.push('checkEmail');
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

</script>